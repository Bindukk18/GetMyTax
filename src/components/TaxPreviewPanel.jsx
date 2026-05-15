import { useState } from 'react';
import { computeTax } from '../taxEngine';
import { fmt, toNum } from '../utils';
import { NEW_REGIME_SLABS, OLD_REGIME_SLABS_BELOW60, OLD_REGIME_SLABS_SENIOR, OLD_REGIME_SLABS_SUPER_SENIOR } from '../constants';
import { Calculator } from 'lucide-react';

const EMPTY_REGIME = {
  grossIncome: 0, taxableIncome: 0, standardDeduction: 0,
  professionalTaxDeduction: 0, hraExemption: 0, deduction80C: 0,
  deduction80D: 0, deductionPersonalNPS: 0, employerNPSDeduction: 0,
  deductionHomeLoanInterest: 0, deduction80TTA_TTB: 0,
  slabTax: 0, rebate: 0, marginalRelief: 0, cess: 0, totalTax: 0,
};

function getOldSlabs(ageGroup) {
  if (ageGroup === 'superSenior') return OLD_REGIME_SLABS_SUPER_SENIOR;
  if (ageGroup === 'senior') return OLD_REGIME_SLABS_SENIOR;
  return OLD_REGIME_SLABS_BELOW60;
}

function fmtL(n) {
  if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  return Number(n).toLocaleString('en-IN');
}

function slabLabel(prevLimit, upTo) {
  if (prevLimit === 0) return upTo === null ? 'All' : `Up to ₹${fmtL(upTo)}`;
  return upTo === null ? `Above ₹${fmtL(prevLimit)}` : `₹${fmtL(prevLimit)} – ₹${fmtL(upTo)}`;
}

function computeSlabRows(taxableIncome, slabs) {
  let prev = 0;
  const rows = [];
  for (const slab of slabs) {
    const { upTo, rate } = slab;
    let incomeInBand = 0;
    if (upTo === null) {
      incomeInBand = Math.max(0, taxableIncome - prev);
    } else {
      incomeInBand = Math.max(0, Math.min(taxableIncome, upTo) - prev);
    }
    const tax = Math.round(incomeInBand * rate);
    const active = incomeInBand > 0 && rate > 0;
    rows.push({
      label: slabLabel(prev, upTo),
      rate: `${(rate * 100).toFixed(0)}%`,
      rateNum: rate,
      incomeInBand,
      tax,
      active
    });
    if (upTo === null) break;
    prev = upTo;
  }
  return rows;
}

function SectionLabel({ letter, text }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0">
        {letter}
      </div>
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{text}</span>
    </div>
  );
}

function LineRow({ label, amount, green, muted }) {
  let labelClass = "text-xs ";
  labelClass += muted ? "text-gray-400" : "text-gray-600";
  
  let amountClass = "text-xs font-semibold ";
  if (green) amountClass += "text-green-600";
  else if (muted) amountClass += "text-gray-400";
  else amountClass += "text-gray-700";

  return (
    <div className="flex justify-between items-center py-0.5">
      <span className={labelClass}>{label}</span>
      <span className={amountClass}>{amount}</span>
    </div>
  );
}

function ResultBox({ label, amount, indigo }) {
  let containerClass = "flex justify-between items-center rounded-lg px-3 py-2 mt-1.5 ";
  let labelClass = "text-xs ";
  let amountClass = "text-sm font-bold ";

  if (indigo) {
    containerClass += "bg-orange-50 border border-orange-100";
    labelClass += "text-orange-700";
    amountClass += "text-orange-800";
  } else {
    containerClass += "bg-gray-100 border border-gray-200";
    labelClass += "text-gray-500";
    amountClass += "text-gray-800";
  }

  return (
    <div className={containerClass}>
      <span className={labelClass}>= {label}</span>
      <span className={amountClass}>{amount}</span>
    </div>
  );
}

export default function TaxPreviewPanel({ data }) {
  const [userPickedRegime, setUserPickedRegime] = useState(null);

  const takeHomeSalary = (toNum(data.takeHomeSalaryMonthly) || 0) * 12;
  const bonus = (data.hasBonus && toNum(data.bonus) > 0) ? (toNum(data.bonus) || 0) : 0;
  const fdInterest = (data.hasOtherIncome && toNum(data.fdInterest) > 0) ? (toNum(data.fdInterest) || 0) : 0;
  const savingsInterest = (data.hasOtherIncome && toNum(data.savingsInterest) > 0) ? (toNum(data.savingsInterest) || 0) : 0;
  const hasIncome = takeHomeSalary > 0;

  let newRegimeData = { ...EMPTY_REGIME };
  let oldRegimeData = { ...EMPTY_REGIME };
  let computeSuccess = false;

  if (hasIncome) {
    try {
      const results = computeTax(data);
      newRegimeData = results.newRegime;
      oldRegimeData = results.oldRegime;
      computeSuccess = true;
    } catch {
      // Incomplete data — use zeroes
    }
  }

  const newTotal = newRegimeData.totalTax || 0;
  const oldTotal = oldRegimeData.totalTax || 0;
  const savings = Math.abs(newTotal - oldTotal);
  const betterRegime = newTotal <= oldTotal ? 'new' : 'old';
  const regime = userPickedRegime !== null ? userPickedRegime : (computeSuccess ? betterRegime : 'new');

  const activeData = regime === 'new' ? newRegimeData : oldRegimeData;
  const slabs = regime === 'new' ? NEW_REGIME_SLABS : getOldSlabs(data.ageGroup);
  const slabRows = computeSuccess ? computeSlabRows(activeData.taxableIncome, slabs) : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <span className="text-sm font-bold text-gray-900">Your Live Tax Estimate</span>
        <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-2.5 py-0.5">
          FY 2025-26
        </span>
      </div>

      <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between gap-2">
        <div className="flex rounded-full border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
          <button
            onClick={() => setUserPickedRegime('new')}
            className={`py-1.5 px-3 text-xs font-semibold transition-all rounded-full flex items-center ${
              regime === 'new' ? 'bg-white text-orange-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            New
            {betterRegime === 'new' && <span className="ml-1 text-green-600 text-[10px] font-bold">Best</span>}
          </button>
          <button
            onClick={() => setUserPickedRegime('old')}
            className={`py-1.5 px-3 text-xs font-semibold transition-all rounded-full flex items-center ${
              regime === 'old' ? 'bg-white text-orange-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Old
            {betterRegime === 'old' && <span className="ml-1 text-green-600 text-[10px] font-bold">Best</span>}
          </button>
        </div>
        <button 
          onClick={() => setUserPickedRegime(regime === 'new' ? 'old' : 'new')}
          className="text-[11px] text-orange-500 hover:text-orange-700 underline decoration-dotted underline-offset-2 shrink-0"
        >
          Compare {regime === 'new' ? 'old' : 'new'} regime
        </button>
      </div>

      {!hasIncome ? (
        <div className="px-4 py-8 text-center flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
            <Calculator className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">
            {"Enter your salary to\nsee a live tax estimate"}
          </p>
        </div>
      ) : (
        <div className="space-y-1 pb-2">
          {computeSuccess && (
            <div className="mx-4 mt-3 rounded-xl bg-gradient-to-br from-orange-600 via-orange-700 to-amber-700 p-4 text-white">
              <div className="text-xs text-orange-200 font-medium mb-1">Estimated Tax Payable</div>
              <div className="text-2xl font-black tracking-tight">{fmt(activeData.totalTax)}</div>
              <div className="text-xs text-orange-300 mt-1">On annual income of {fmt(activeData.grossIncome)}</div>
            </div>
          )}

          <div className="px-4 pt-3 pb-1">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">BREAKDOWN</span>
          </div>

          <div className="px-4">
            <SectionLabel letter="A" text="Your Income" />
            <div className="space-y-0.5 pl-7">
              <LineRow label="Annual salary (take-home)" amount={fmt(takeHomeSalary)} />
              {bonus > 0 && <LineRow label="Bonus / incentive" amount={fmt(bonus)} />}
              {fdInterest > 0 && <LineRow label="FD interest" amount={fmt(fdInterest)} />}
              {savingsInterest > 0 && <LineRow label="Savings account interest" amount={fmt(savingsInterest)} />}
              <ResultBox label="Gross Income" amount={fmt(activeData.grossIncome || 0)} />
            </div>
          </div>

          <div className="px-4 mt-4">
            <SectionLabel letter="B" text="Deductions (−)" />
            <div className="space-y-0.5 pl-7">
              <LineRow label="Standard deduction" amount={fmt(activeData.standardDeduction)} green />
              {activeData.professionalTaxDeduction > 0 && <LineRow label="Professional tax" amount={fmt(activeData.professionalTaxDeduction)} green />}
              {activeData.employerNPSDeduction > 0 && <LineRow label="Employer NPS (80CCD(2))" amount={fmt(activeData.employerNPSDeduction)} green />}
              
              {regime === 'old' && activeData.hraExemption > 0 && <LineRow label="HRA Exemption" amount={fmt(activeData.hraExemption)} green />}
              {regime === 'old' && activeData.deduction80C > 0 && <LineRow label="80C Investments" amount={fmt(activeData.deduction80C)} green />}
              {regime === 'old' && activeData.deduction80D > 0 && <LineRow label="Health Insurance (80D)" amount={fmt(activeData.deduction80D)} green />}
              {regime === 'old' && activeData.deductionPersonalNPS > 0 && <LineRow label="Personal NPS (80CCD(1B))" amount={fmt(activeData.deductionPersonalNPS)} green />}
              {regime === 'old' && activeData.deductionHomeLoanInterest > 0 && <LineRow label="Home Loan Interest (24B)" amount={fmt(activeData.deductionHomeLoanInterest)} green />}
              {regime === 'old' && activeData.deduction80TTA_TTB > 0 && <LineRow label="Savings Interest (80TTA/TTB)" amount={fmt(activeData.deduction80TTA_TTB)} green />}
              
              {regime === 'new' && !activeData.employerNPSDeduction && (
                <div className="flex items-start gap-1.5 mt-1.5 p-2 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">New regime: only standard deduction applies.</p>
                </div>
              )}
              
              <ResultBox label="Taxable Income" amount={fmt(activeData.taxableIncome)} indigo />
            </div>
          </div>

          <div className="px-4 mt-4">
            <SectionLabel letter="C" text="Tax on Slabs" />
            <div className="pl-7">
              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mb-2">
                <div className="grid grid-cols-4 gap-1 px-2.5 py-2 border-b border-gray-200 bg-gray-100/50">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">Income Slab</span>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase text-center">Rate</span>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase text-right">Your Income</span>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase text-right">Tax</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {slabRows.map((r, i) => (
                    <div key={i} className={`grid grid-cols-4 gap-1 px-2.5 py-1.5 text-[11px] ${r.active ? 'bg-orange-50/60 text-orange-700 font-medium' : 'text-gray-400'}`}>
                      <span className="truncate">{r.label}</span>
                      <span className="text-center">{r.rate}</span>
                      <span className="text-right">{r.incomeInBand > 0 ? fmt(r.incomeInBand) : '0'}</span>
                      <span className="text-right">{r.tax > 0 ? fmt(r.tax) : '0'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-0.5">
                {activeData.rebate > 0 && <LineRow label="Section 87A Rebate" amount={`− ${fmt(activeData.rebate)}`} green />}
                {activeData.marginalRelief > 0 && <LineRow label="Marginal Relief" amount={`− ${fmt(activeData.marginalRelief)}`} green />}
                <LineRow label="Health & Education Cess (4%)" amount={activeData.cess > 0 ? `+ ${fmt(activeData.cess)}` : '₹0'} muted={activeData.cess === 0} />
              </div>

              <div className="mt-2 flex justify-between items-center bg-orange-600 rounded-xl px-3 py-2.5">
                <span className="text-xs font-bold text-orange-200">Total Tax Payable</span>
                <span className="text-lg font-black text-white">{fmt(activeData.totalTax)}</span>
              </div>
            </div>
          </div>

          {computeSuccess && savings > 0 && (
            <div className="mx-4 mt-4 mb-3 flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-green-500 text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-green-800">{betterRegime === 'new' ? 'New' : 'Old'} Regime saves you {fmt(savings)}</span>
                <span className="text-[10px] text-green-600 font-medium">vs {betterRegime === 'new' ? 'Old' : 'New'} Regime ({fmt(betterRegime === 'new' ? oldTotal : newTotal)})</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span className="text-[11px] text-gray-400">100% Private & Secure · Data never leaves your browser</span>
      </div>
    </div>
  );
}

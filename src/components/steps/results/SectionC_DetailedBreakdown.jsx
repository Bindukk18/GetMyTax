import { fmt } from '../../../utils';

function BreakdownRow({ label, newVal, oldVal, isSub, bold, isRed }) {
  let textClass = "text-sm ";
  if (bold) textClass += "font-bold text-gray-900";
  else if (isSub) textClass += "text-gray-500 pl-4";
  else textClass += "font-medium text-gray-700";

  let valClass = "text-sm text-right ";
  if (bold) valClass += "font-bold text-gray-900";
  else if (isRed) valClass += "text-red-600";
  else valClass += "text-gray-700";

  return (
    <div className={`grid grid-cols-12 gap-2 py-2.5 ${bold ? 'border-t border-gray-200 mt-1' : 'border-t border-gray-50'}`}>
      <div className={`col-span-6 ${textClass}`}>{label}</div>
      <div className={`col-span-3 ${valClass}`}>{newVal}</div>
      <div className={`col-span-3 ${valClass}`}>{oldVal}</div>
    </div>
  );
}

export default function SectionC_DetailedBreakdown({ results }) {
  const n = results.newRegime;
  const o = results.oldRegime;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50">
        <h3 className="font-bold text-gray-900">Detailed Calculation</h3>
        <p className="text-xs text-gray-500">A side-by-side comparison of how your tax was calculated.</p>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-12 gap-2 pb-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-6">Component</div>
          <div className="col-span-3 text-right text-orange-600">New Regime</div>
          <div className="col-span-3 text-right">Old Regime</div>
        </div>

        <div className="mt-2">
          <BreakdownRow label="Gross Income" newVal={fmt(n.grossIncome)} oldVal={fmt(o.grossIncome)} bold />
          
          <BreakdownRow label="Total Deductions" newVal={fmt(n.grossIncome - n.taxableIncome)} oldVal={fmt(o.grossIncome - o.taxableIncome)} bold isRed />
          
          <BreakdownRow label="Standard Deduction" newVal={fmt(n.standardDeduction)} oldVal={fmt(o.standardDeduction)} isSub isRed />
          {o.professionalTaxDeduction > 0 && <BreakdownRow label="Professional Tax" newVal="-" oldVal={fmt(o.professionalTaxDeduction)} isSub isRed />}
          {o.hraExemption > 0 && <BreakdownRow label="HRA Exemption" newVal="-" oldVal={fmt(o.hraExemption)} isSub isRed />}
          {o.deduction80C > 0 && <BreakdownRow label="80C Investments" newVal="-" oldVal={fmt(o.deduction80C)} isSub isRed />}
          {o.deduction80D > 0 && <BreakdownRow label="80D Medical" newVal="-" oldVal={fmt(o.deduction80D)} isSub isRed />}
          {o.deductionPersonalNPS > 0 && <BreakdownRow label="80CCD(1B) NPS" newVal="-" oldVal={fmt(o.deductionPersonalNPS)} isSub isRed />}
          {n.employerNPSDeduction > 0 && <BreakdownRow label="Employer NPS" newVal={fmt(n.employerNPSDeduction)} oldVal={fmt(o.employerNPSDeduction)} isSub isRed />}
          {o.deductionHomeLoanInterest > 0 && <BreakdownRow label="24B Home Loan" newVal="-" oldVal={fmt(o.deductionHomeLoanInterest)} isSub isRed />}
          {o.deduction80TTA_TTB > 0 && <BreakdownRow label="80TTA/TTB Interest" newVal="-" oldVal={fmt(o.deduction80TTA_TTB)} isSub isRed />}

          <BreakdownRow label="Net Taxable Income" newVal={fmt(n.taxableIncome)} oldVal={fmt(o.taxableIncome)} bold />
          
          <BreakdownRow label="Tax on Income (Slabs)" newVal={fmt(n.slabTax)} oldVal={fmt(o.slabTax)} />
          {Math.max(n.rebate, o.rebate) > 0 && <BreakdownRow label="Rebate 87A" newVal={fmt(n.rebate)} oldVal={fmt(o.rebate)} isSub isRed />}
          {n.marginalRelief > 0 && <BreakdownRow label="Marginal Relief" newVal={fmt(n.marginalRelief)} oldVal={fmt(o.marginalRelief)} isSub isRed />}
          
          <BreakdownRow label="Health & Education Cess (4%)" newVal={fmt(n.cess)} oldVal={fmt(o.cess)} isSub />
          
          <div className="grid grid-cols-12 gap-2 py-3 border-t-2 border-gray-900 mt-2 bg-gray-50/50 -mx-5 px-5">
            <div className="col-span-6 font-black text-gray-900">Total Tax Payable</div>
            <div className={`col-span-3 text-right font-black ${results.recommended === 'new' ? 'text-orange-700' : 'text-gray-900'}`}>{fmt(n.totalTax)}</div>
            <div className={`col-span-3 text-right font-black ${results.recommended === 'old' ? 'text-orange-700' : 'text-gray-900'}`}>{fmt(o.totalTax)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

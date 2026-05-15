import { useState, useRef } from 'react';
import NumberInput from '../NumberInput';
import FrequencyInput from '../FrequencyInput';
import CommonQuestions from '../CommonQuestions';
import ConfusedLink from '../ConfusedLink';

const COMPONENTS = [
  { key: 'hasHRA', label: 'HRA — House Rent Allowance', tag: 'Section 10(13A)', emoji: '🏠', desc: 'A part of your salary meant for rent. Can be partially tax-free if you pay rent.' },
  { key: 'hasProfTax', label: 'Professional Tax', tag: 'Section 16(iii)', emoji: '🏛️', desc: 'State govt tax deducted monthly from your salary. Usually ₹200/month (max ₹2,400/year).' },
  { key: 'hasEmployerNPS', label: 'Employer NPS contribution', tag: 'Section 80CCD(2)', emoji: '🏦', desc: "Your company puts money into your NPS retirement account as part of your pay package." }
];

export default function S05_SalaryComponents({ data, update, goNext }) {
  const [errors, setErrors] = useState({});
  const faqRef = useRef(null);

  const toggleComponent = (key) => {
    update({ [key]: !data[key] });
    setErrors(e => ({ ...e, [key]: false }));
  };

  const handleNext = () => {
    const errs = {};
    if (data.hasHRA && !data.hraMonthly) errs.hasHRA = true;
    if (data.hasProfTax && !data.professionalTax) errs.hasProfTax = true;
    if (data.hasEmployerNPS && !data.employerNPS) errs.hasEmployerNPS = true;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    goNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">📋</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Salary Components</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Does your salary slip show any of these?</h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">Tick all that appear on your slip. Leave the rest blank.</p>
          <ConfusedLink faqRef={faqRef} label="What are these?" />
        </div>
      </div>

      <div className="space-y-4">
        {COMPONENTS.map(comp => {
          const isChecked = data[comp.key];
          return (
            <div key={comp.key} className={`rounded-xl border-2 overflow-hidden transition-all ${isChecked ? 'border-orange-600' : 'border-gray-200'}`}>
              <div 
                className={`p-4 cursor-pointer transition-colors ${isChecked ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => toggleComponent(comp.key)}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isChecked ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
                    {isChecked && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base">{comp.emoji}</span>
                      <span className={`font-semibold ${isChecked ? 'text-orange-900' : 'text-gray-900'}`}>{comp.label}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-orange-600 bg-orange-100/50 border border-orange-100 px-2 py-0.5 rounded-full">{comp.tag}</span>
                    </div>
                    <div className={`text-sm mt-1 leading-relaxed ${isChecked ? 'text-orange-700' : 'text-gray-500'}`}>{comp.desc}</div>
                  </div>
                </div>
              </div>

              {isChecked && (
                <div className="px-4 pb-4 bg-orange-50 border-t border-orange-100 reveal">
                  <div className="pt-4">
                    {comp.key === 'hasHRA' && (
                      <NumberInput 
                        id="hra"
                        label="How much HRA do you receive per month?"
                        value={data.hraMonthly}
                        onChange={(val) => { update({ hraMonthly: val }); setErrors(e => ({...e, hasHRA: false})) }}
                        placeholder="e.g. 15000"
                        hint="Find it on your salary slip under Earnings."
                      />
                    )}
                    {comp.key === 'hasProfTax' && (
                      <FrequencyInput 
                        id="pt"
                        label="How much Professional Tax is deducted?"
                        value={data.professionalTax}
                        onChange={(val) => { update({ professionalTax: val }); setErrors(e => ({...e, hasProfTax: false})) }}
                        placeholder="200"
                        note="Usually ₹200/month = ₹2,400/year. Maximum is ₹2,500 per year."
                      />
                    )}
                    {comp.key === 'hasEmployerNPS' && (
                      <FrequencyInput 
                        id="empNps"
                        label="How much does your employer contribute to NPS?"
                        value={data.employerNPS}
                        onChange={(val) => { update({ employerNPS: val }); setErrors(e => ({...e, hasEmployerNPS: false})) }}
                        placeholder="0"
                        hint="Check your CTC breakdown or salary slip. This is your employer's contribution, not yours."
                      />
                    )}
                    {errors[comp.key] && <div className="text-red-600 text-xs mt-1">Required</div>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center">If none of these appear on your slip, leave them all unticked and continue.</p>

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "What is HRA?", a: "House Rent Allowance. It is given by employers to help employees meet their rental expenses. If you don't pay rent, this amount is fully taxable."},
        {q: "What is Professional Tax?", a: "It is a tax levied by state governments on salaried individuals. It's usually deducted directly from your salary by your employer (around ₹200 per month)."},
        {q: "What is Employer NPS?", a: "Some companies offer to put up to 14% of your Basic Pay into an NPS (National Pension System) account as part of your CTC. This is highly tax efficient."},
        {q: "What if I get HRA but live in my own house?", a: "Tick the HRA box here and enter the amount you receive. Later in the calculator, when asked if you pay rent, select 'No'."},
        {q: "Where do I enter my EPF contribution?", a: "Employee Provident Fund (EPF) is an 80C investment. You will be able to enter it in the 'Investments' section later."}
      ]} />
    </div>
  );
}

import { useState, useRef } from 'react';
import FrequencyInput from '../FrequencyInput';
import CommonQuestions from '../CommonQuestions';
import ConfusedLink from '../ConfusedLink';

const INVESTMENTS_80C = [
  { key: 'epf', label: 'EPF (Employee Provident Fund)', desc: 'Deducted monthly from salary (usually 12% of basic).' },
  { key: 'lic', label: 'Life Insurance Premium', desc: 'Premiums for Term or Life insurance policies.' },
  { key: 'ppf', label: 'PPF (Public Provident Fund)', desc: 'Deposits into your PPF account.' },
  { key: 'elss', label: 'ELSS Mutual Funds', desc: 'Tax saving mutual funds with 3 year lock-in.' },
  { key: 'tuition', label: "Children's Tuition Fee", desc: 'School/College tuition fees (max 2 children).' },
  { key: 'homeLoanPrincipal', label: 'Home Loan Principal', desc: 'The principal portion of your home loan EMI.' },
  { key: 'nsc', label: 'NSC / Tax Saving FD', desc: 'National Savings Certificate or 5-year FDs.' }
];

export default function S09_TaxSavingInvestments({ data, update, goNext }) {
  const faqRef = useRef(null);

  const toggleItem = (key) => {
    let current = [...data.has80CItems];
    if (current.includes(key)) {
      current = current.filter(item => item !== key);
      update({ has80CItems: current, investments80C: { ...data.investments80C, [key]: '' } });
    } else {
      current.push(key);
      update({ has80CItems: current });
    }
  };

  const updateVal = (key, val) => {
    update({ investments80C: { ...data.investments80C, [key]: val } });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">📈</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Investments (80C)</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Do you invest in any of these to save tax?</h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">Tick all that apply. (Section 80C)</p>
          <ConfusedLink faqRef={faqRef} label="What is 80C?" />
        </div>
      </div>

      <div className="space-y-3">
        {INVESTMENTS_80C.map(item => {
          const isChecked = data.has80CItems.includes(item.key);
          return (
            <div key={item.key} className={`rounded-xl border-2 transition-all ${isChecked ? 'border-orange-600 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div 
                className="p-4 cursor-pointer flex items-start gap-3"
                onClick={() => toggleItem(item.key)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${isChecked ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
                  {isChecked && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div>
                  <div className={`font-semibold ${isChecked ? 'text-orange-900' : 'text-gray-900'}`}>{item.label}</div>
                  <div className={`text-sm mt-0.5 ${isChecked ? 'text-orange-700' : 'text-gray-500'}`}>{item.desc}</div>
                </div>
              </div>

              {isChecked && (
                <div className="px-4 pb-4 reveal">
                  <div className="pt-2">
                    <FrequencyInput 
                      id={`inv-${item.key}`}
                      label="Amount invested"
                      value={data.investments80C[item.key]}
                      onChange={(val) => updateVal(item.key, val)}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="text-base font-bold text-gray-900 mb-1">Personal NPS (80CCD 1B)</h3>
        <p className="text-sm text-gray-500 mb-3">Do you voluntarily invest in NPS to get the extra ₹50k deduction?</p>
        
        <div className="flex gap-3 mb-3">
          <button 
            type="button"
            onClick={() => update({ hasPersonalNPS: true })}
            className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${data.hasPersonalNPS === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Yes
          </button>
          <button 
            type="button"
            onClick={() => update({ hasPersonalNPS: false, personalNPS: '' })}
            className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${data.hasPersonalNPS === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            No
          </button>
        </div>

        {data.hasPersonalNPS === true && (
          <div className="reveal p-4 bg-orange-50 border border-orange-100 rounded-xl">
            <FrequencyInput 
              id="personalNPS"
              label="Amount invested in NPS Tier 1"
              value={data.personalNPS}
              onChange={(val) => update({ personalNPS: val })}
              hint="Max ₹50,000 extra deduction allowed."
            />
          </div>
        )}
      </div>

      <button onClick={goNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "What is Section 80C?", a: "It's the most popular tax-saving section. You can claim up to ₹1.5 Lakhs as a deduction from your taxable income by investing in specific instruments like EPF, PPF, ELSS, etc."},
        {q: "I invest more than 1.5L in EPF alone, should I enter it?", a: "Yes, enter the actual amount. Our calculator will automatically cap the deduction at ₹1.5 Lakhs according to the law."},
        {q: "What's the difference between Personal and Employer NPS?", a: "Employer NPS is deducted from your salary by your company (80CCD 2). Personal NPS is what you invest voluntarily from your own bank account (80CCD 1B), which gives you an extra ₹50,000 deduction on top of the 80C limit."}
      ]} />
    </div>
  );
}

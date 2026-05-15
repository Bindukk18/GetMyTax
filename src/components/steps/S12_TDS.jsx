import { useState, useRef } from 'react';
import NumberInput from '../NumberInput';
import CommonQuestions from '../CommonQuestions';
import ConfusedLink from '../ConfusedLink';

export default function S12_TDS({ data, update, goNext }) {
  const [errors, setErrors] = useState({});
  const faqRef = useRef(null);

  const handleNext = () => {
    const errs = {};
    if (data.hasTDS === null) errs.hasTDS = true;
    if (data.hasTDS && !data.tdsDeducted) errs.tdsDeducted = true;

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
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">✂️</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">TDS (Tax Deducted at Source)</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Has your employer already deducted some tax?</h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">This helps us calculate your refund or final payable amount.</p>
          <ConfusedLink faqRef={faqRef} />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => { update({ hasTDS: true }); setErrors(e => ({...e, hasTDS: false})) }} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${data.hasTDS === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>Yes</button>
        <button type="button" onClick={() => { update({ hasTDS: false, tdsDeducted: '' }); setErrors(e => ({...e, hasTDS: false})) }} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${data.hasTDS === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>No</button>
      </div>
      {errors.hasTDS && <div className="text-red-600 text-xs mt-1">Required</div>}

      {data.hasTDS && (
        <div className="reveal space-y-4 p-5 bg-orange-50 border border-orange-100 rounded-xl">
          <div>
            <NumberInput 
              id="tds"
              label="Total TDS deducted by Employer so far"
              value={data.tdsDeducted}
              onChange={(val) => { update({ tdsDeducted: val }); setErrors(e => ({...e, tdsDeducted: false})) }}
              hint="Check your latest payslip. It should show a 'YTD' (Year to Date) TDS figure."
              required={true}
            />
            {errors.tdsDeducted && <div className="text-red-600 text-xs mt-1">Required</div>}
          </div>
        </div>
      )}

      {data.hasOtherIncome && data.fdInterest > 0 && (
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">TDS on Fixed Deposits</h3>
            <p className="text-xs text-gray-500 mb-3">Did the bank deduct any TDS on your FD interest?</p>
            <NumberInput 
              id="bankTds"
              label="TDS deducted by Bank"
              value={data.bankTDS}
              onChange={(val) => update({ bankTDS: val })}
              hint="Usually 10% of interest if interest exceeds ₹40,000. Enter 0 if not sure."
            />
          </div>
        </div>
      )}

      <button onClick={handleNext} className="w-full bg-orange-900 hover:bg-orange-950 text-white font-bold py-4 px-6 rounded-xl text-base transition-all shadow-xl shadow-orange-900/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2">
        Calculate My Taxes <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "Where do I find my TDS?", a: "Look at your most recent salary slip. There is usually a deductions section showing 'Income Tax' or 'TDS'. Look for the YTD (Year To Date) column, which shows the total tax deducted since April."},
        {q: "What if I don't know the exact amount?", a: "Give an estimate based on your monthly deduction (Monthly TDS × Number of months passed). Or you can check your Form 26AS on the Income Tax portal."},
        {q: "Do I have to fill this?", a: "No, but if you do, the final result will tell you exactly how much extra tax you have to pay, or how much refund you will get from the government."}
      ]} />
    </div>
  );
}

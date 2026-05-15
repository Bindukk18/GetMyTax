import { useState, useRef } from 'react';
import FrequencyInput from '../FrequencyInput';
import CommonQuestions from '../CommonQuestions';
import ConfusedLink from '../ConfusedLink';

export default function S06_OtherIncome({ data, update, goNext }) {
  const [error, setError] = useState(false);
  const faqRef = useRef(null);

  const handleNext = () => {
    if (data.hasOtherIncome === null) {
      setError(true);
      return;
    }
    if (data.hasOtherIncome === false) {
      update({ fdInterest: '', savingsInterest: '' });
    }
    goNext();
  };

  const setHasOtherIncome = (val) => {
    update({ hasOtherIncome: val });
    setError(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">💵</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Other Income</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Did your bank pay you any interest this year?</h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">Interest from Fixed Deposits (FD) and Savings accounts is added to your income and taxed. Many people forget this.</p>
        </div>
        <div className="mt-1">
          <ConfusedLink faqRef={faqRef} label="What counts as interest income?" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
          <div className="text-xl mb-2">🏦</div>
          <div className="font-semibold text-gray-900 text-sm">Fixed Deposit (FD)</div>
          <div className="text-xs text-gray-500 mt-1 leading-relaxed">Interest earned on money locked in an FD for 1–5 years.</div>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
          <div className="text-xl mb-2">💳</div>
          <div className="font-semibold text-gray-900 text-sm">Savings Account</div>
          <div className="text-xs text-gray-500 mt-1 leading-relaxed">The small interest your bank pays on the balance in your regular account.</div>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Did you earn any interest from FDs or savings accounts in FY 2025-26? <span className="text-red-600">*</span></h3>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => setHasOtherIncome(true)}
            className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${data.hasOtherIncome === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Yes
          </button>
          <button 
            type="button"
            onClick={() => setHasOtherIncome(false)}
            className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${data.hasOtherIncome === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            No
          </button>
        </div>
        {error && <div className="text-red-600 text-xs mt-1">Please answer yes or no.</div>}
      </div>

      {data.hasOtherIncome === true && (
        <div className="reveal space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <FrequencyInput 
            id="fd"
            label="FD Interest earned"
            value={data.fdInterest}
            onChange={(val) => update({ fdInterest: val })}
            hint="Add all FDs together. Enter 0 if you have no FDs."
          />
          <hr className="border-blue-100" />
          <FrequencyInput 
            id="savings"
            label="Savings Account Interest earned"
            value={data.savingsInterest}
            onChange={(val) => update({ savingsInterest: val })}
            hint="Usually a small amount. Check your annual bank statement. Enter 0 if negligible."
          />
          <div className="text-xs text-blue-700 bg-blue-100/50 p-2 rounded-lg">
            Tip: open your bank app → Statements → search for "Interest Credit" entries.
          </div>
        </div>
      )}

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "How do I find my FD interest?", a: "Banks provide an 'Interest Certificate' for the financial year. You can download this from your net banking portal."},
        {q: "How do I find savings account interest?", a: "This is usually credited quarterly. Check your bank statement for entries like 'Int.Pd' or 'Interest Credit'."},
        {q: "What if the bank already deducted TDS?", a: "You must still declare the full interest amount here. You will get to enter the TDS amount in the final step."},
        {q: "What about FDs in my spouse's or parent's name?", a: "Do not include interest from FDs held in the name of your spouse or parents. Only include FDs held in your own name (first holder)."},
        {q: "Is PPF interest taxable?", a: "No. Interest earned on Public Provident Fund (PPF) is completely tax-free and should not be entered here."},
        {q: "I don't know the exact amount yet.", a: "Give your best estimate. You can always come back and edit this later once you have your bank statements."}
      ]} />
    </div>
  );
}

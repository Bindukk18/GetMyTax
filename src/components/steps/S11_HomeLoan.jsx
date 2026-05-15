import { useState, useRef } from 'react';
import FrequencyInput from '../FrequencyInput';
import CommonQuestions from '../CommonQuestions';
import ConfusedLink from '../ConfusedLink';

export default function S11_HomeLoan({ data, update, goNext }) {
  const [errors, setErrors] = useState({});
  const faqRef = useRef(null);

  const handleNext = () => {
    const errs = {};
    if (data.hasHomeLoan === null) errs.hasHomeLoan = true;
    if (data.hasHomeLoan && !data.loanOwnership) errs.loanOwnership = true;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    goNext();
  };

  const setOwnership = (val) => {
    update({ loanOwnership: val });
    setErrors(e => ({...e, loanOwnership: false}));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">🏡</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Home Loan (Sec 24B)</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Are you paying an EMI for a home loan?</h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">You can get a deduction of up to ₹2,00,000 on the interest paid.</p>
          <ConfusedLink faqRef={faqRef} />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => { update({ hasHomeLoan: true }); setErrors(e => ({...e, hasHomeLoan: false})) }} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${data.hasHomeLoan === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>Yes</button>
        <button type="button" onClick={() => { update({ hasHomeLoan: false, homeLoanInterest: '', loanOwnership: null }); setErrors(e => ({...e, hasHomeLoan: false})) }} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${data.hasHomeLoan === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>No</button>
      </div>
      {errors.hasHomeLoan && <div className="text-red-600 text-xs mt-1">Required</div>}

      {data.hasHomeLoan && (
        <div className="reveal space-y-6 p-5 bg-blue-50 border border-blue-100 rounded-xl">
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Who is the owner of the property? <span className="text-red-600">*</span></h3>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => setOwnership('own')} className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${data.loanOwnership === 'own' ? 'border-orange-600 bg-orange-100 text-orange-800' : 'border-gray-200 bg-white text-gray-700'}`}>I am the sole owner</button>
              <button type="button" onClick={() => setOwnership('joint')} className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${data.loanOwnership === 'joint' ? 'border-orange-600 bg-orange-100 text-orange-800' : 'border-gray-200 bg-white text-gray-700'}`}>I am a joint owner (with spouse/parents)</button>
              <button type="button" onClick={() => setOwnership('other')} className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${data.loanOwnership === 'other' ? 'border-orange-600 bg-orange-100 text-orange-800' : 'border-gray-200 bg-white text-gray-700'}`}>Someone else owns it, I just pay the EMI</button>
            </div>
            {errors.loanOwnership && <div className="text-red-600 text-xs mt-1">Required</div>}
          </div>

          {data.loanOwnership === 'other' && (
            <div className="bg-amber-100 border border-amber-200 text-amber-800 p-3 rounded-lg text-xs leading-relaxed">
              <strong>Note:</strong> You can only claim a home loan tax deduction if you are an owner or co-owner of the property. Since you are not, you cannot claim this deduction. We will ignore this for the calculation.
            </div>
          )}

          {(data.loanOwnership === 'own' || data.loanOwnership === 'joint') && (
            <div className="pt-2 border-t border-blue-200">
              <FrequencyInput 
                id="hlInterest"
                label="Home Loan Interest Paid"
                value={data.homeLoanInterest}
                onChange={(val) => update({ homeLoanInterest: val })}
                hint="Only the interest portion, not the principal. Ask your bank for a 'Provisional Interest Certificate'."
              />
              {data.loanOwnership === 'joint' && (
                <p className="text-xs text-blue-700 mt-2 bg-blue-100/50 p-2 rounded-lg">
                  Since it's a joint loan, enter only your share of the interest paid.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "Where do I find the interest amount?", a: "Log into your loan account online and download the 'Provisional Interest Certificate' for the current financial year. It will show the exact breakdown of principal and interest."},
        {q: "What about the Principal amount?", a: "The principal repayment portion falls under Section 80C. If you haven't exhausted your ₹1.5L limit, you can enter it in the Investments step."},
        {q: "Can I claim deduction if the house is under construction?", a: "No. You can only claim the interest deduction starting from the financial year in which construction is completed. You can claim pre-construction interest in 5 equal installments after completion."}
      ]} />
    </div>
  );
}

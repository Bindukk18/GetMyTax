import { useState, useRef } from 'react';
import NumberInput from '../NumberInput';
import FrequencyInput from '../FrequencyInput';
import CommonQuestions from '../CommonQuestions';
import ConfusedLink from '../ConfusedLink';

export default function S04_SalaryDetails({ data, update, goNext }) {
  const [errors, setErrors] = useState({});
  const faqRef = useRef(null);

  const takeHome = Number(data.takeHomeSalaryMonthly) || 0;
  const basic = Number(data.basicSalaryMonthly) || 0;

  const handleNext = () => {
    const errs = {};
    if (!data.takeHomeSalaryMonthly) errs.takeHome = true;
    if (!data.basicSalaryMonthly) errs.basic = true;
    if (data.hasBonus === null) errs.hasBonus = true;
    if (data.hasBonus && !data.bonus) errs.bonus = true;

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
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">💰</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Your Salary</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">What does your salary look like?</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <NumberInput 
            id="takeHome"
            label="Take-home monthly"
            value={data.takeHomeSalaryMonthly}
            onChange={(val) => { update({ takeHomeSalaryMonthly: val }); setErrors(e => ({...e, takeHome: false})) }}
            hint="The amount credited to your bank account each month — not your CTC or gross salary."
            required={true}
          />
          {errors.takeHome && <div className="text-red-600 text-xs mt-1">Required</div>}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700">Basic Pay monthly <span className="text-red-600">*</span></label>
            <ConfusedLink faqRef={faqRef} />
          </div>
          <NumberInput 
            id="basic"
            value={data.basicSalaryMonthly}
            onChange={(val) => { update({ basicSalaryMonthly: val }); setErrors(e => ({...e, basic: false})) }}
            hint="Usually 40-50% of your total salary. Check your salary slip."
          />
          {errors.basic && <div className="text-red-600 text-xs mt-1">Required</div>}
        </div>
      </div>

      {takeHome > 0 && basic > takeHome && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm reveal">
          <strong>Wait, basic pay should be lower.</strong> Basic pay is just one part of your salary and should be lower than your total take-home. Please double check your salary slip.
        </div>
      )}

      {takeHome * 12 > 5000000 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm reveal">
          <strong>High income warning:</strong> Incomes above ₹50,00,000 may attract surcharge which this calculator does not cover. Please consult a tax professional.
        </div>
      )}

      {takeHome > 0 && basic > 0 && basic <= takeHome && (
        <div className="px-4 py-2.5 bg-orange-50 border border-orange-100 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between reveal">
          <span className="text-sm text-orange-700 font-medium">Estimated Annual Salary</span>
          <span className="text-lg font-bold text-orange-900">₹{(takeHome * 12).toLocaleString('en-IN')}</span>
        </div>
      )}

      <hr className="border-gray-100" />

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Do you get any extra money apart from your fixed monthly salary? <span className="text-red-600">*</span></h3>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => { update({ hasBonus: true }); setErrors(e => ({...e, hasBonus: false})) }}
            className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${data.hasBonus === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Yes
          </button>
          <button 
            type="button"
            onClick={() => { update({ hasBonus: false, bonus: '' }); setErrors(e => ({...e, hasBonus: false, bonus: false})) }}
            className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${data.hasBonus === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            No
          </button>
        </div>
        {errors.hasBonus && <div className="text-red-600 text-xs mt-1">Please answer yes or no.</div>}
      </div>

      {data.hasBonus === true && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl reveal space-y-4">
          <FrequencyInput 
            id="bonus"
            label="How much extra do you receive?"
            value={data.bonus}
            onChange={(val) => { update({ bonus: val }); setErrors(e => ({...e, bonus: false})) }}
            required={true}
          />
          {errors.bonus && <div className="text-red-600 text-xs">Required</div>}
          
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <span className="text-sm font-semibold text-gray-700 block mb-1">Not sure of the exact amount?</span>
            <span className="text-xs text-gray-500 block leading-relaxed">Give an estimate. Common examples include year-end bonuses, performance incentives, joining bonuses, or leave encashment. Don't include your fixed monthly salary or reimbursements.</span>
          </div>
        </div>
      )}

      {data.hasBonus === false && (
        <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl reveal">
          <span className="text-sm text-gray-600">Got it — we'll use only your fixed monthly salary.</span>
        </div>
      )}

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "What counts as Take-home salary?", a: "This is the amount physically credited to your bank account every month. Do not enter your CTC (Cost to Company) or Gross Salary. We use Take-home because it's easiest for most people to check on their bank statement."},
        {q: "What counts as Basic Pay?", a: "Basic Pay is the core component of your salary structure, usually 40% to 50% of your CTC. You can find this on any of your monthly salary slips. It is essential for calculating HRA and NPS deductions accurately."},
        {q: "Why do you need both?", a: "Take-home gives us your total actual income. Basic Pay lets us calculate rule-based deductions like HRA (which is capped based on Basic) and Employer NPS (capped at 14% of Basic)."},
        {q: "What if my bonus is paid monthly?", a: "If your bonus or incentive is fixed and paid out every month, you can just include it in your Take-home salary and say 'No' to the bonus question."},
        {q: "Should I include reimbursements?", a: "No. Internet, phone, or fuel reimbursements that you submit bills for are not taxable income and should not be included anywhere here."}
      ]} />
    </div>
  );
}

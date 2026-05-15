import { useState } from 'react';
import FrequencyInput from '../FrequencyInput';

export default function S10_HealthInsurance({ data, update, goNext }) {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const errs = {};
    if (data.hasSelfInsurance === null) errs.hasSelfInsurance = true;
    if (data.hasParentInsurance === null) errs.hasParentInsurance = true;
    if (data.hasParentInsurance && data.parentsAbove60 === null) errs.parentsAbove60 = true;
    
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
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">🏥</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Health Insurance (80D)</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Do you pay health insurance premiums?</h2>
      </div>

      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">For Self, Spouse, and Children</h3>
          <p className="text-xs text-gray-500 mb-2">Do you pay premiums for your own family?</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => { update({ hasSelfInsurance: true }); setErrors(e => ({...e, hasSelfInsurance: false})) }} className={`flex-1 py-1.5 rounded-lg border-2 font-medium text-sm transition-colors ${data.hasSelfInsurance === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}>Yes</button>
            <button type="button" onClick={() => { update({ hasSelfInsurance: false, selfInsurancePremium: '' }); setErrors(e => ({...e, hasSelfInsurance: false})) }} className={`flex-1 py-1.5 rounded-lg border-2 font-medium text-sm transition-colors ${data.hasSelfInsurance === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}>No</button>
          </div>
          {errors.hasSelfInsurance && <div className="text-red-600 text-xs mt-1">Required</div>}
        </div>

        {data.hasSelfInsurance && (
          <div className="reveal">
            <FrequencyInput id="selfIns" label="Annual Premium Paid" value={data.selfInsurancePremium} onChange={(val) => update({ selfInsurancePremium: val })} hint="Max limit: ₹25,000 (or ₹50,000 if you are 60+)" />
          </div>
        )}
      </div>

      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">For Parents</h3>
          <p className="text-xs text-gray-500 mb-2">Do you pay premiums for your parents?</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => { update({ hasParentInsurance: true }); setErrors(e => ({...e, hasParentInsurance: false})) }} className={`flex-1 py-1.5 rounded-lg border-2 font-medium text-sm transition-colors ${data.hasParentInsurance === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}>Yes</button>
            <button type="button" onClick={() => { update({ hasParentInsurance: false, parentInsurancePremium: '', parentsAbove60: null }); setErrors(e => ({...e, hasParentInsurance: false})) }} className={`flex-1 py-1.5 rounded-lg border-2 font-medium text-sm transition-colors ${data.hasParentInsurance === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}>No</button>
          </div>
          {errors.hasParentInsurance && <div className="text-red-600 text-xs mt-1">Required</div>}
        </div>

        {data.hasParentInsurance && (
          <div className="reveal space-y-4 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Are any of your parents aged 60 or above?</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => { update({ parentsAbove60: true }); setErrors(e => ({...e, parentsAbove60: false})) }} className={`flex-1 py-1.5 rounded-lg border-2 font-medium text-sm transition-colors ${data.parentsAbove60 === true ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}>Yes</button>
                <button type="button" onClick={() => { update({ parentsAbove60: false }); setErrors(e => ({...e, parentsAbove60: false})) }} className={`flex-1 py-1.5 rounded-lg border-2 font-medium text-sm transition-colors ${data.parentsAbove60 === false ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}>No</button>
              </div>
              {errors.parentsAbove60 && <div className="text-red-600 text-xs mt-1">Required</div>}
            </div>

            <FrequencyInput id="parentIns" label="Annual Premium Paid" value={data.parentInsurancePremium} onChange={(val) => update({ parentInsurancePremium: val })} hint="Max limit: ₹25,000 (or ₹50,000 if parents are 60+)" />
          </div>
        )}
      </div>

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>
    </div>
  );
}

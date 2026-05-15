import { useState } from 'react';
import NumberInput from '../NumberInput';

export default function S08_RentDetails({ data, update, goNext }) {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const errs = {};
    if (!data.monthlyRent) errs.monthlyRent = true;
    if (!data.cityType) errs.cityType = true;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    goNext();
  };

  const setCity = (val) => {
    update({ cityType: val });
    setErrors(e => ({...e, cityType: false}));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">📍</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Rent Details</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Tell us about your rent</h2>
      </div>

      <div>
        <NumberInput 
          id="rent"
          label="How much rent do you pay per month?"
          value={data.monthlyRent}
          onChange={(val) => { update({ monthlyRent: val }); setErrors(e => ({...e, monthlyRent: false})) }}
          placeholder="e.g. 20000"
          required={true}
        />
        {errors.monthlyRent && <div className="text-red-600 text-xs mt-1">Required</div>}
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Where is this rented house located? <span className="text-red-600">*</span></h3>
        <p className="text-xs text-gray-500 mb-3">HRA exemption limits are higher for Metro cities.</p>
        
        <div className="flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => setCity('metro')}
            className={`p-4 rounded-xl border-2 transition-all text-left flex items-center ${data.cityType === 'metro' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
          >
            <div className={`mr-3 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${data.cityType === 'metro' ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
              {data.cityType === 'metro' && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <div>
              <div className={`font-semibold ${data.cityType === 'metro' ? 'text-orange-900' : 'text-gray-900'}`}>Metro City</div>
              <div className="text-xs text-gray-500 mt-1 leading-relaxed">Delhi, Mumbai, Kolkata, or Chennai only</div>
            </div>
          </button>
          
          <button 
            type="button"
            onClick={() => setCity('nonMetro')}
            className={`p-4 rounded-xl border-2 transition-all text-left flex items-center ${data.cityType === 'nonMetro' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
          >
            <div className={`mr-3 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${data.cityType === 'nonMetro' ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
              {data.cityType === 'nonMetro' && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <div>
              <div className={`font-semibold ${data.cityType === 'nonMetro' ? 'text-orange-900' : 'text-gray-900'}`}>Non-Metro City</div>
              <div className="text-xs text-gray-500 mt-1 leading-relaxed">Bangalore, Hyderabad, Pune, Gurgaon, Noida, and all other cities</div>
            </div>
          </button>
        </div>
        {errors.cityType && <div className="text-red-600 text-xs mt-1">Please select a city type.</div>}
      </div>

      {!data.hasHRA && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm mt-4 reveal">
          <strong>Note:</strong> You mentioned earlier that you don't receive HRA. Since you don't receive HRA, paying rent will not give you tax benefits under the standard HRA rules. (Section 80GG is outside the scope of this calculator).
        </div>
      )}

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>
    </div>
  );
}

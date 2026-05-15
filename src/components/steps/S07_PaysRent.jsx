import { useState, useRef } from 'react';
import CommonQuestions from '../CommonQuestions';

export default function S07_PaysRent({ data, update, goNext, skipTo }) {
  const [error, setError] = useState(false);
  const faqRef = useRef(null);

  const handleNext = () => {
    if (data.paysRent === null) {
      setError(true);
      return;
    }
    if (data.paysRent === false) {
      update({ monthlyRent: '', cityType: null });
      skipTo(9); // Skip rent details
    } else {
      goNext();
    }
  };

  const setPaysRent = (val) => {
    update({ paysRent: val });
    setError(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">🏠</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Housing</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Do you live in a rented house?</h2>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => setPaysRent(true)}
          className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${data.paysRent === true ? 'border-orange-600 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
        >
          <div className={`mr-4 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${data.paysRent === true ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
            {data.paysRent === true && <div className="w-2 h-2 rounded-full bg-white"></div>}
          </div>
          <div>
            <div className={`font-semibold ${data.paysRent === true ? 'text-orange-900' : 'text-gray-900'}`}>Yes, I pay rent</div>
            <div className={`text-sm mt-0.5 ${data.paysRent === true ? 'text-orange-700' : 'text-gray-500'}`}>I live in a rented property</div>
          </div>
        </button>

        <button 
          onClick={() => setPaysRent(false)}
          className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${data.paysRent === false ? 'border-orange-600 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
        >
          <div className={`mr-4 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${data.paysRent === false ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
            {data.paysRent === false && <div className="w-2 h-2 rounded-full bg-white"></div>}
          </div>
          <div>
            <div className={`font-semibold ${data.paysRent === false ? 'text-orange-900' : 'text-gray-900'}`}>No, I don't pay rent</div>
            <div className={`text-sm mt-0.5 ${data.paysRent === false ? 'text-orange-700' : 'text-gray-500'}`}>I live in my own house, or with parents without paying rent</div>
          </div>
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mt-2" role="alert">Please make a selection to continue.</div>}

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={[
        {q: "Why are you asking this?", a: "If you receive HRA (House Rent Allowance) from your employer, you can claim a tax exemption on it, but only if you actually pay rent."},
        {q: "I pay rent to my parents, does that count?", a: "Yes. If the property is owned by your parents and you actually transfer rent money to them (and they declare it as income), you can claim it."},
        {q: "I live in a hostel/PG, does that count?", a: "Yes, rent paid for a PG or hostel is eligible for HRA exemption. You should ask the owner for rent receipts."}
      ]} />
    </div>
  );
}

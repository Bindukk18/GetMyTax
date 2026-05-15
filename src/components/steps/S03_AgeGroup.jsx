import { useState } from 'react';
import CommonQuestions from '../CommonQuestions';

const AGE_OPTIONS = [
  { value: 'below60', label: 'Below 60 years', desc: 'Basic exemption: ₹2,50,000 under old regime' },
  { value: 'senior', label: '60 to 79 years', tag: 'Senior Citizen', desc: 'Basic exemption: ₹3,00,000 under old regime' },
  { value: 'superSenior', label: '80 years or above', tag: 'Super Senior Citizen', desc: 'Basic exemption: ₹5,00,000 under old regime' }
];

export default function S03_AgeGroup({ data, update, goNext }) {
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!data.ageGroup) {
      setError(true);
      return;
    }
    goNext();
  };

  const handleSelect = (val) => {
    update({ ageGroup: val });
    setError(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">🎂</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">About You</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Which age group do you fall in?</h2>
      </div>

      <div className="space-y-3">
        {AGE_OPTIONS.map(opt => {
          const selected = data.ageGroup === opt.value;
          return (
            <div 
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selected ? 'border-orange-600 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-orange-600 bg-orange-600' : 'border-gray-300 bg-white'}`}>
                  {selected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${selected ? 'text-orange-900' : 'text-gray-900'}`}>{opt.label}</span>
                    {opt.tag && <span className="text-[10px] font-bold uppercase tracking-wide text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">{opt.tag}</span>}
                  </div>
                  <div className={`text-sm mt-1 ${selected ? 'text-orange-700' : 'text-gray-500'}`}>{opt.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
        {error && <div className="text-red-600 text-sm mt-2" role="alert">Please select an age group to continue.</div>}
      </div>

      <button onClick={handleNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>

      <CommonQuestions questions={[
        {q: "Why does age matter for tax?", a: "Senior and super senior citizens get higher basic exemption limits under the old tax regime."},
        {q: "What if I turn 60 this year?", a: "If you turn 60 at any time during the financial year, you are considered a senior citizen for the entire year."},
        {q: "Is age relevant for the new regime?", a: "No. Under the new tax regime, the slab rates are the same for all age groups."}
      ]} />
    </div>
  );
}

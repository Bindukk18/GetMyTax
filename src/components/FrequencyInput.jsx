import { useState } from 'react';
import { Check } from 'lucide-react';

export default function FrequencyInput({ id, label, value, onChange, placeholder = '0', hint, note, required = false, max, prefix = '₹' }) {
  const [freq, setFreq] = useState('annual');

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let num = raw ? Number(raw) : '';
    if (num !== '' && freq === 'monthly') {
      num = num * 12;
    }
    onChange(num);
  };

  const displayValue = () => {
    if (value === '' || value === null || value === undefined) return '';
    const num = freq === 'monthly' ? Math.round(Number(value) / 12) : Number(value);
    return num === 0 ? '' : num.toLocaleString('en-IN');
  };

  const isValid = value !== '' && value !== null && value !== undefined && Number(value) > 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <div className="flex rounded-full border border-gray-200 overflow-hidden bg-gray-50 p-0.5 gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setFreq('monthly')}
            className={`px-3 py-1 text-xs transition-all rounded-full ${
              freq === 'monthly' ? 'bg-orange-600 text-white shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700 font-medium'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setFreq('annual')}
            className={`px-3 py-1 text-xs transition-all rounded-full ${
              freq === 'annual' ? 'bg-orange-600 text-white shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700 font-medium'
            }`}
          >
            Per year
          </button>
        </div>
      </div>

      <div className="relative rounded-xl">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 text-sm font-medium">{prefix}</span>
          </div>
        )}
        <input
          type="text"
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          value={displayValue()}
          onChange={handleChange}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`block w-full rounded-xl border py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none placeholder:text-gray-400 transition-colors ${
            isValid ? 'border-green-300 bg-green-50/30' : 'border-gray-200 bg-white'
          } ${prefix ? 'pl-8 pr-9' : 'px-3'}`}
        />
        {isValid && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Check className="w-4 h-4 text-green-500" strokeWidth={2.5} />
          </div>
        )}
      </div>
      
      {freq === 'monthly' && isValid && (
        <div className="text-xs text-orange-600 font-medium reveal">
          = ₹{Number(value).toLocaleString('en-IN')} per year (auto-calculated)
        </div>
      )}

      {note && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 mt-1">
          {note}
        </div>
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-gray-400 mt-1">
          {hint}
        </p>
      )}
    </div>
  );
}

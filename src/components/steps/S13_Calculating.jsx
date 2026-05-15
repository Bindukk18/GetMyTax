import { useEffect } from 'react';
import { computeTax } from '../../taxEngine';
import { Calculator } from 'lucide-react';

export default function S13_Calculating({ data, goNext, setResults }) {
  useEffect(() => {
    try {
      const results = computeTax(data);
      setResults(results);
    } catch (e) {
      console.error(e);
    }
    
    const timer = setTimeout(() => {
      goNext();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [data, goNext, setResults]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="absolute inset-0 bg-orange-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
        <div className="relative w-24 h-24 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center animate-bounce-slow">
          <Calculator className="w-10 h-10 text-orange-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-2">Calculating your taxes...</h2>
      
      <div className="flex flex-col items-center gap-2 mt-4 text-sm text-gray-500 font-medium">
        <div className="flex items-center gap-2 slide-up-1">
          <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></div>
          Applying standard deductions
        </div>
        <div className="flex items-center gap-2 slide-up-2">
          <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
          Checking HRA and 80C limits
        </div>
        <div className="flex items-center gap-2 slide-up-3">
          <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
          Comparing old vs new regime
        </div>
      </div>
    </div>
  );
}

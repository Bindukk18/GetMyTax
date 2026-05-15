import { RotateCcw } from 'lucide-react';

export default function SectionE_NextSteps({ reset }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center space-y-4">
      <h3 className="font-bold text-gray-900">What's next?</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        When your employer asks for your "Tax Declaration" or "Regime Choice" at the start of the year, declare the recommended regime.
      </p>
      
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={reset} className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors">
          <RotateCcw className="w-4 h-4" /> Start Over
        </button>
      </div>
    </div>
  );
}

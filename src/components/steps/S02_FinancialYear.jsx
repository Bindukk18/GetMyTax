export default function S02_FinancialYear({ goNext }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">📅</div>
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Financial Year</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">Which financial year are you calculating tax for?</h2>
      </div>

      <div className="p-4 bg-orange-50 border-2 border-orange-600 rounded-xl cursor-default">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-orange-900">FY 2025-26</div>
            <div className="text-sm text-orange-700 mt-0.5">April 2025 to March 2026</div>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-orange-600 bg-orange-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p>This calculator is updated with the latest tax rules from the Budget.</p>
      </div>

      <button onClick={goNext} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:from-orange-800 active:to-amber-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Continue →
      </button>
    </div>
  );
}

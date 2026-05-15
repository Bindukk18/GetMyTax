import { fmt } from '../../../utils';

export default function SectionB_TaxSummary({ results }) {
  const { newRegime, oldRegime, recommended } = results;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-amber-600"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        <div className={`p-5 rounded-2xl border-2 transition-all ${recommended === 'new' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">New Regime</h3>
              <p className="text-xs text-gray-500 mt-0.5">Default for FY 25-26</p>
            </div>
            {recommended === 'new' && (
              <span className="text-[10px] font-bold uppercase tracking-wide text-white bg-orange-600 px-2 py-0.5 rounded-full">Winner</span>
            )}
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight">{fmt(newRegime.totalTax)}</div>
        </div>

        <div className={`p-5 rounded-2xl border-2 transition-all ${recommended === 'old' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Old Regime</h3>
              <p className="text-xs text-gray-500 mt-0.5">Requires claiming deductions</p>
            </div>
            {recommended === 'old' && (
              <span className="text-[10px] font-bold uppercase tracking-wide text-white bg-orange-600 px-2 py-0.5 rounded-full">Winner</span>
            )}
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight">{fmt(oldRegime.totalTax)}</div>
        </div>

      </div>

      {results.tdsDeducted > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className={`p-5 rounded-2xl flex items-center justify-between ${results.tds.type === 'refund' ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`}>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {results.tds.type === 'refund' ? 'You will get a Refund 🎉' : 'You still need to pay ⚠️'}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                You already paid {fmt(results.tdsDeducted)} via TDS.
              </div>
            </div>
            <div className={`text-2xl font-black ${results.tds.type === 'refund' ? 'text-green-700' : 'text-amber-700'}`}>
              {fmt(results.tds.amount)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

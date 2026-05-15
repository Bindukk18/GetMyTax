import { Calculator, PlayCircle, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function S01_Landing({ goNext }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="GetMyTax Logo" className="w-14 h-14 object-contain rounded-xl shadow-sm bg-white" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">GetMyTax</span>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">FY 2025-26</span>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 w-fit mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
              Know. Compare. Save.
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Find out <span className="text-orange-600 underline decoration-orange-200 decoration-4 underline-offset-4">which tax regime</span> saves you more money this year.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Answer a few simple questions about your salary and expenses. We'll compare both tax regimes and show you which one saves you more money — with a clear rupee-by-rupee estimate.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600"><Clock className="w-4 h-4 text-gray-400" /> 2 min</div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> 100% Free</div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600"><ShieldCheck className="w-4 h-4 text-gray-400" /> Private</div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button onClick={goNext} className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold py-3.5 px-7 rounded-2xl text-sm transition-colors shadow-md shadow-orange-200 flex items-center gap-2">
                Start calculation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <p className="mt-4 text-xs text-gray-400">Built for salaried individuals only · FY 2025-26</p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-orange-100 rounded-3xl blur-3xl opacity-40 scale-95 translate-y-4"></div>
            <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Your Tax Summary</h3>
                <p className="text-sm text-gray-500">You Save ₹18,540</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center mb-4">
                <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Recommended</span>
                <div className="text-xl font-bold text-orange-900 mt-1">New Regime</div>
                <div className="text-sm text-orange-600 mt-1">Total Tax: ₹1,14,400</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-sm font-medium text-gray-600">Old Regime</div>
                <div className="text-xs text-gray-500 mt-1">Total Tax: ₹1,32,940</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 lg:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-16">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Old vs New</h4>
            <p className="text-sm text-gray-500">Side-by-side comparison</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Exact Savings</h4>
            <p className="text-sm text-gray-500">See the exact rupee amount</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Refund Status</h4>
            <p className="text-sm text-gray-500">Know if you'll get money back</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Plain English</h4>
            <p className="text-sm text-gray-500">No CA jargon or confusing forms</p>
          </div>
        </div>
      </main>
    </div>
  );
}

import ProgressBar from './ProgressBar'
import TaxPreviewPanel from './TaxPreviewPanel'
import { ChevronLeft, Calculator, ShieldCheck } from 'lucide-react'

export default function StepWrapper({ children, goBack, reset, showProgress, progressStep, TOTAL_PROGRESS, step, data, stepName }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-3">
          <button onClick={reset} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="GetMyTax Logo" className="w-12 h-12 object-contain rounded-xl shadow-sm bg-white" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">GetMyTax</span>
              <span className="text-xs text-gray-500 leading-none mt-1 hidden sm:block">India Tax Calculator</span>
            </div>
          </button>

          {step > 1 && (
            <button 
              onClick={goBack}
              className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-colors shrink-0 ml-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back
            </button>
          )}

          {showProgress ? (
            <div className="flex-1 min-w-0 flex justify-end md:justify-center px-4">
              <ProgressBar current={progressStep} total={TOTAL_PROGRESS} stepName={stepName} />
            </div>
          ) : <div className="flex-1"></div>}
          
          <div className="hidden md:flex items-center gap-1.5 shrink-0 ml-auto">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-600 leading-none">100% Private</span>
              <span className="text-[10px] text-gray-400 leading-none mt-0.5">Data stays in your browser</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <main className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
              {children}
            </div>
          </main>
          
          {data && (
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-20">
                <TaxPreviewPanel data={data} />
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-8 pb-4 mt-auto">
        <p className="text-xs text-center text-gray-300">
          Salaried individuals · FY 2025-26 · No data saved
        </p>
      </footer>
    </div>
  )
}

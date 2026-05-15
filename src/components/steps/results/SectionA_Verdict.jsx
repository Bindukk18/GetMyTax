import { fmt } from '../../../utils';

export default function SectionA_Verdict({ results }) {
  const { recommended, savings } = results;
  const isNew = recommended === 'new';

  return (
    <div className="text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50 blur-3xl rounded-[100%] opacity-70 pointer-events-none"></div>
      
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100/80 backdrop-blur border border-orange-200 rounded-full px-3 py-1 w-fit mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></div>
          Analysis Complete
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
          You should choose the <br className="hidden sm:block" />
          <span className="text-orange-600 underline decoration-orange-200 decoration-4 underline-offset-4">
            {isNew ? 'New Tax Regime' : 'Old Tax Regime'}
          </span>
        </h2>
        
        {savings > 0 ? (
          <p className="text-lg text-gray-600 mt-4 max-w-lg mx-auto">
            By choosing the {isNew ? 'New' : 'Old'} Regime, you will legally save <strong className="text-green-600 font-black px-1.5 py-0.5 bg-green-50 rounded-lg">{fmt(savings)}</strong> in taxes this year compared to the other option.
          </p>
        ) : (
          <p className="text-lg text-gray-600 mt-4 max-w-lg mx-auto">
            Both regimes result in the exact same tax amount for you. We recommend the <strong className="text-orange-600">New Regime</strong> as it requires less paperwork.
          </p>
        )}
      </div>
    </div>
  );
}

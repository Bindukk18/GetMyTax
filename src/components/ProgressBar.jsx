export default function ProgressBar({ current, total, stepName }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-semibold text-gray-700">Step {current} of {total}</span>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <span className="text-xs text-gray-500 truncate max-w-[160px] hidden sm:inline">{stepName}</span>
      </div>
      <div className="flex items-center gap-1.5 flex-1 justify-end">
        {Array.from({ length: total }).map((_, i) => {
          const index = i + 1;
          const isCompleted = index < current;
          const isCurrent = index === current;
          
          return (
            <div 
              key={index}
              role="progressbar"
              aria-valuenow={isCurrent ? 100 : (isCompleted ? 100 : 0)}
              aria-valuemin={0}
              aria-valuemax={100}
              className={`rounded-full transition-all duration-300 ${
                isCompleted ? 'w-2 h-2 bg-orange-600' :
                isCurrent ? 'w-2 h-2 bg-orange-300' :
                'w-1.5 h-1.5 bg-gray-200'
              }`}
            />
          );
        })}
      </div>
    </div>
  )
}

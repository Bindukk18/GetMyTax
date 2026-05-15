import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const CommonQuestions = forwardRef(({ questions }, ref) => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openAndScroll: () => {
      setOpen(true);
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  }));

  if (!questions || questions.length === 0) return null;

  return (
    <div ref={containerRef} className="border border-gray-200 rounded-xl overflow-hidden mt-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-orange-500" />
          <span>Common questions about this</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="divide-y divide-gray-100 bg-white border-t border-gray-100">
          {questions.map((q, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-start justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 pr-4 leading-snug">{q.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 reveal">
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{q.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

CommonQuestions.displayName = 'CommonQuestions';
export default CommonQuestions;

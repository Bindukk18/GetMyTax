import { HelpCircle } from 'lucide-react';

export default function ConfusedLink({ faqRef, label = 'Not sure? See examples' }) {
  return (
    <button
      type="button"
      onClick={() => faqRef?.current?.openAndScroll()}
      className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 underline decoration-dotted underline-offset-2 transition-colors"
    >
      <HelpCircle className="w-3 h-3" />
      {label}
    </button>
  );
}

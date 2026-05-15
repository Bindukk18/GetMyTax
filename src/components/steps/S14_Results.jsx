import SectionA_Verdict from './results/SectionA_Verdict';
import SectionB_TaxSummary from './results/SectionB_TaxSummary';
import SectionC_DetailedBreakdown from './results/SectionC_DetailedBreakdown';
import SectionD_Education from './results/SectionD_Education';
import SectionE_NextSteps from './results/SectionE_NextSteps';

export default function S14_Results({ results, reset }) {
  if (!results) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      <SectionA_Verdict results={results} />
      <SectionB_TaxSummary results={results} />
      <SectionC_DetailedBreakdown results={results} />
      <SectionD_Education results={results} />
      <SectionE_NextSteps reset={reset} />
    </div>
  );
}

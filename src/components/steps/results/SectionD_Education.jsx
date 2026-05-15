export default function SectionD_Education({ results }) {
  const isNew = results.recommended === 'new';
  
  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 sm:p-6">
      <h3 className="font-bold text-orange-900 mb-3">Why did we recommend this?</h3>
      
      {isNew ? (
        <div className="text-sm text-orange-800 leading-relaxed space-y-3">
          <p>The <strong>New Tax Regime</strong> has lower tax rates (slabs) but doesn't allow most deductions like 80C or HRA. In your case, the benefit of these lower rates outweighs the deductions you would have claimed in the old regime.</p>
          <p><strong>Good news:</strong> You don't need to lock your money into 80C tax-saving investments just for the sake of saving tax! You can invest wherever you want (like direct mutual funds) without worrying about tax locks.</p>
        </div>
      ) : (
        <div className="text-sm text-orange-800 leading-relaxed space-y-3">
          <p>The <strong>Old Tax Regime</strong> allows you to reduce your taxable income by claiming deductions like HRA, 80C, 80D, etc. Because you have significant deductions, they bring your taxable income down enough to beat the lower slab rates of the new regime.</p>
          <p><strong>Action required:</strong> Make sure you actually make these investments (like EPF, PPF, Insurance) before March 31, and submit the proofs to your employer on time, otherwise your tax will be much higher!</p>
        </div>
      )}
    </div>
  );
}

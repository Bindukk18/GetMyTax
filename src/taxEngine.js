import * as C from './constants'
import { toNum, calc80CTotal } from './utils'

function n(val) {
  const num = Number(val)
  return isNaN(num) ? 0 : num
}

export function applySlabs(income, slabs) {
  if (income <= 0) return 0
  let tax = 0, prev = 0
  for (const { upTo, rate } of slabs) {
    if (upTo === null) { tax += (income - prev) * rate; break }
    if (income <= upTo) { tax += (income - prev) * rate; break }
    tax += (upTo - prev) * rate
    prev = upTo
  }
  return Math.round(tax)
}

export function calculateGrossIncome(data) {
  const takeHome = n(data.takeHomeSalaryMonthly) * 12
  const bonus = (data.hasBonus && n(data.bonus) > 0) ? n(data.bonus) : 0
  const fdInterest = (data.hasOtherIncome && n(data.fdInterest) > 0) ? n(data.fdInterest) : 0
  const savingsInterest = (data.hasOtherIncome && n(data.savingsInterest) > 0) ? n(data.savingsInterest) : 0
  
  return takeHome + bonus + fdInterest + savingsInterest
}

export function calculateHRAExemption(data) {
  if (data.paysRent && data.hasHRA && n(data.hraMonthly) > 0) {
    const annualHRAReceived = n(data.hraMonthly) * 12
    const annualBasic = n(data.basicSalaryMonthly) * 12
    const hraPct = data.cityType === 'metro' ? C.HRA_METRO_PCT : C.HRA_NONMETRO_PCT
    const condition2 = hraPct * annualBasic
    const annualRentPaid = n(data.monthlyRent) * 12
    const condition3 = annualRentPaid - (0.10 * annualBasic)
    
    return Math.max(0, Math.min(annualHRAReceived, condition2, condition3))
  }
  return 0
}

export function calculateNewRegimeTax(data) {
  const grossIncome = calculateGrossIncome(data)
  const annualBasic = n(data.basicSalaryMonthly) * 12
  const employerNPS = data.hasEmployerNPS ? Math.min(n(data.employerNPS), C.EMPLOYER_NPS_PCT_OF_BASIC * annualBasic) : 0
  
  const deductions = C.STANDARD_DEDUCTION_NEW + employerNPS
  const taxableIncome = Math.max(0, grossIncome - deductions)
  const slabTax = applySlabs(taxableIncome, C.NEW_REGIME_SLABS)
  
  const rebate = (taxableIncome <= C.REBATE_87A_NEW_INCOME_LIMIT) ? Math.min(slabTax, C.REBATE_87A_NEW_MAX) : 0
  let taxAfterRebate = Math.max(0, slabTax - rebate)
  
  const excess = taxableIncome - C.REBATE_87A_NEW_INCOME_LIMIT
  let marginalRelief = 0
  if (taxableIncome > C.REBATE_87A_NEW_INCOME_LIMIT && rebate === 0 && taxAfterRebate > excess) {
    marginalRelief = taxAfterRebate - excess
    taxAfterRebate = excess
  }
  
  const cess = Math.round(taxAfterRebate * C.CESS_RATE)
  const totalTax = taxAfterRebate + cess
  
  return {
    grossIncome,
    taxableIncome,
    standardDeduction: C.STANDARD_DEDUCTION_NEW,
    professionalTaxDeduction: 0,
    hraExemption: 0,
    deduction80C: 0,
    deduction80D: 0,
    deductionPersonalNPS: 0,
    employerNPSDeduction: employerNPS,
    deductionHomeLoanInterest: 0,
    deduction80TTA_TTB: 0,
    slabTax,
    rebate,
    marginalRelief,
    cess,
    totalTax
  }
}

function getOldSlabs(ageGroup) {
  if (ageGroup === 'superSenior') return C.OLD_REGIME_SLABS_SUPER_SENIOR
  if (ageGroup === 'senior') return C.OLD_REGIME_SLABS_SENIOR
  return C.OLD_REGIME_SLABS_BELOW60
}

export function calculateOldRegimeTax(data) {
  const grossIncome = calculateGrossIncome(data)
  const annualBasic = n(data.basicSalaryMonthly) * 12
  
  const professionalTax = data.hasProfTax ? Math.min(n(data.professionalTax), C.PROF_TAX_CAP) : 0
  const hraExemption = calculateHRAExemption(data)
  const raw80C = calc80CTotal(data)
  const deduction80C = data.has80CItems && data.has80CItems.length > 0 ? Math.min(raw80C, C.CAP_80C) : 0
  
  let deduction80D = 0;
  if (data.hasSelfInsurance) {
    const selfCap = (data.ageGroup === 'senior' || data.ageGroup === 'superSenior') ? C.CAP_80D_SELF_ABOVE60 : C.CAP_80D_SELF_BELOW60;
    deduction80D += Math.min(n(data.selfInsurancePremium), selfCap);
  }
  if (data.hasParentInsurance) {
    const parentCap = data.parentsAbove60 ? C.CAP_80D_PARENTS_ABOVE60 : C.CAP_80D_PARENTS_BELOW60;
    deduction80D += Math.min(n(data.parentInsurancePremium), parentCap);
  }
  
  const deductionHomeLoanInterest = (data.hasHomeLoan && data.loanOwnership !== 'other') ? Math.min(n(data.homeLoanInterest), C.CAP_24B) : 0
  
  let deduction80TTA_TTB = 0;
  if (data.hasOtherIncome) {
    if (data.ageGroup === 'senior' || data.ageGroup === 'superSenior') {
      deduction80TTA_TTB = Math.min(n(data.savingsInterest) + n(data.fdInterest), C.CAP_80TTB)
    } else {
      deduction80TTA_TTB = Math.min(n(data.savingsInterest), C.CAP_80TTA)
    }
  }
  
  const deductionPersonalNPS = data.hasPersonalNPS ? Math.min(n(data.personalNPS), C.CAP_80CCD1B) : 0
  const employerNPSDeduction = data.hasEmployerNPS ? Math.min(n(data.employerNPS), C.EMPLOYER_NPS_PCT_OF_BASIC * annualBasic) : 0
  
  const totalDeductions = C.STANDARD_DEDUCTION_OLD + professionalTax + hraExemption + deduction80C + 
    deduction80D + deductionHomeLoanInterest + deduction80TTA_TTB + deductionPersonalNPS + employerNPSDeduction
    
  const taxableIncome = Math.max(0, grossIncome - totalDeductions)
  const slabs = getOldSlabs(data.ageGroup)
  const slabTax = applySlabs(taxableIncome, slabs)
  
  const rebate = (data.ageGroup !== 'superSenior' && taxableIncome <= C.REBATE_87A_OLD_INCOME_LIMIT) ? Math.min(slabTax, C.REBATE_87A_OLD_MAX) : 0
  const taxAfterRebate = Math.max(0, slabTax - rebate)
  
  const cess = Math.round(taxAfterRebate * C.CESS_RATE)
  const totalTax = taxAfterRebate + cess
  
  return {
    grossIncome,
    taxableIncome,
    standardDeduction: C.STANDARD_DEDUCTION_OLD,
    professionalTaxDeduction: professionalTax,
    hraExemption,
    deduction80C,
    deduction80D,
    deductionPersonalNPS,
    employerNPSDeduction,
    deductionHomeLoanInterest,
    deduction80TTA_TTB,
    slabTax,
    rebate,
    marginalRelief: 0,
    cess,
    totalTax
  }
}

export function compareRegimes(newResult, oldResult) {
  const savings = Math.abs(newResult.totalTax - oldResult.totalTax)
  const recommended = newResult.totalTax <= oldResult.totalTax ? 'new' : 'old'
  return { recommended, savings }
}

export function calculateTDSPosition(totalTax, tdsDeducted) {
  const amount = Math.abs(tdsDeducted - totalTax)
  let type = 'settled'
  if (tdsDeducted > totalTax) type = 'refund'
  else if (tdsDeducted < totalTax) type = 'payable'
  
  return { type, amount }
}

export function computeTax(data) {
  const newRegime = calculateNewRegimeTax(data)
  const oldRegime = calculateOldRegimeTax(data)
  
  const { recommended, savings } = compareRegimes(newRegime, oldRegime)
  
  const employerTDS = data.hasTDS ? n(data.tdsDeducted) : 0
  const bankTDS = (data.hasOtherIncome && n(data.fdInterest) > 0) ? n(data.bankTDS) : 0
  const tdsDeducted = employerTDS + bankTDS
  
  const activeTax = recommended === 'new' ? newRegime.totalTax : oldRegime.totalTax
  const tds = calculateTDSPosition(activeTax, tdsDeducted)
  
  return { newRegime, oldRegime, recommended, savings, tds, tdsDeducted, employerTDS, bankTDS }
}

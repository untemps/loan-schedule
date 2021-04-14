import deepMerge from './utils/deepMerge'
import LoanScheduleAmortization from './LoanScheduleAmortization'
import LoanScheduleConfig from './LoanScheduleConfig'
import LoanScheduleAmortizationType from './LoanScheduleAmortizationType'
import LoanScheduleYears from './LoanScheduleYears'
import LoanScheduleSettings from './LoanScheduleSettings'
import LoanScheduleHeader from './LoanScheduleHeader'
import LoanScheduleCompute from './LoanScheduleCompute'
import defaultConfig from './config'

export interface ILoanSchedule {
	readonly loanSettings: LoanScheduleSettings
	readonly years: LoanScheduleYears
}

export default class LoanSchedule implements ILoanSchedule {
	readonly loanSettings: LoanScheduleSettings
	private readonly loanAmortizations: LoanScheduleAmortization[]
	private readonly config: LoanScheduleConfig

	constructor(loanSettings?: LoanScheduleSettings, loanAmortizations?: LoanScheduleAmortization[], config?: LoanScheduleConfig) {
		this.loanSettings = loanSettings
		this.loanAmortizations = loanAmortizations
		this.config = deepMerge(config || {}, defaultConfig)
	}

	get years(): LoanScheduleYears {
		return {
			headers: this.getHeaders(),
			values: this.getYears(),
		}
	}

	private getHeaders(): LoanScheduleHeader[] {
		const { year: yearHeader, balance: balanceHeader } = this.config.headers
		const amortizationHeaders: LoanScheduleHeader[] = this.loanAmortizations.map(({ label, type }: LoanScheduleHeader) => ({
			label,
			type,
		}))
		return [yearHeader, ...amortizationHeaders, balanceHeader]
	}

	private getYears(): number[][] {
		const years: number[][] = []
		for (let i: number = 0; i < this.loanSettings.term; i++) {
			years.push(this.mapValues(this.loanAmortizations, i))
		}
		return years
	}

	private mapValues(amortizations: LoanScheduleAmortization[], index: number): number[] {
		const currentYear: number = new Date().getFullYear()
		let balance: number = 0
		const res: number[] = amortizations.reduce(
			(acc: number[], { value, rate, type, compute }: LoanScheduleAmortization) => {
				!!compute && (value = LoanSchedule.getComputedValue(compute, this.loanSettings))
				!!rate && (value = LoanSchedule.getDynamicValue(value, rate, index))
				balance += value * (type === LoanScheduleAmortizationType.CREDIT ? 1 : -1)
				return [...acc, value]
			},
			[currentYear + index]
		)
		res.push(balance)
		return res
	}

	private static getMonthlyPayment(amount: number, term: number, interestRate: number): number {
		if (!amount || !term || !interestRate) return 0
		const rate: number = interestRate / 1200
		const pvif: number = Math.pow(1 + rate, term * 12)
		return (rate / (pvif - 1)) * (amount * pvif)
	}

	private static getMonthlyInsurance(amount: number, insuranceRate: number): number {
		if (!amount || !insuranceRate) return 0
		return (amount * insuranceRate) / 100 / 12
	}

	private static getDynamicValue(baseValue: number, rate: number, index: number): number {
		if (!baseValue || !rate) return 0
		return baseValue * Math.pow(1 + rate / 100, index)
	}

	private static getComputedValue(compute: string, settings: LoanScheduleSettings): number {
		if (!settings) return 0
		const { amount, term, interestRate, insuranceRate } = settings
		switch (compute) {
			case LoanScheduleCompute.PAYMENT:
				return LoanSchedule.getMonthlyPayment(amount, term, interestRate)
			case LoanScheduleCompute.INSURANCE:
				return LoanSchedule.getMonthlyInsurance(amount, insuranceRate)
			default:
				return 0
		}
	}
}

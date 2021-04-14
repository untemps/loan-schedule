import LoanScheduleAmortizationType from './LoanScheduleAmortizationType'

type LoanScheduleAmortization = {
	label?: string
	value?: number
	rate?: number
	type?: LoanScheduleAmortizationType,
	compute?: string
}

export default LoanScheduleAmortization

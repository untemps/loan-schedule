import LoanScheduleAmortizationType from './LoanScheduleAmortizationType'
import LoanScheduleCompute from './LoanScheduleCompute'

type LoanScheduleAmortization = {
	label?: string
	value?: number
	rate?: number
	type?: LoanScheduleAmortizationType,
	compute?: LoanScheduleCompute
}

export default LoanScheduleAmortization

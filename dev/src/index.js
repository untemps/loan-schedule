import { LoanSchedule, LoanScheduleCompute, LoanScheduleAmortizationType } from '../../dist'

import draw from './draw'

const schedule = new LoanSchedule(
	{
		amount: 79950,
		term: 25,
		interestRate: 2,
		insuranceRate: 0.5,
	},
	[
		{
			label: 'Loyer',
			value: 600,
			type: LoanScheduleAmortizationType.CREDIT,
		},
		{
			label: 'Mensualité',
			type: LoanScheduleAmortizationType.DEBIT,
			compute: LoanScheduleCompute.PAYMENT,
		},
		{
			label: 'Assurance',
			type: LoanScheduleAmortizationType.DEBIT,
			compute: LoanScheduleCompute.INSURANCE,
		},
		{
			label: 'Taxe foncière',
			value: 30,
			rate: 5,
			type: LoanScheduleAmortizationType.DEBIT,
		},
		{
			label: 'Charges de copro',
			value: 40,
			rate: 5,
			type: LoanScheduleAmortizationType.DEBIT,
		},
	],
	{
		headers: {
			year: {
				label: 'Année',
			},
			balance: {
				label: 'Solde',
			},
		},
	}
)
console.log(schedule.years)
draw(schedule.years)

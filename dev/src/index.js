import { LoanSchedule } from '../../dist'

import draw from './draw'

const schedule = new LoanSchedule(
	79950,
	25,
	2,
	0.5,
	[
		{
			label: "Rent",
			value: 600
		}
	],
	[
		{
			label: "Property Tax",
			value: 30,
			rate: 5
		},
		{
			label: "Condominium Fees",
			value: 40,
			rate: 5
		}
	]
);
draw(schedule.years);

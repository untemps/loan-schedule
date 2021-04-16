# @untemps/loan-schedule

Class to generate a schedule of monthly loan payments.

It has been built with a single purpose in mind so far, but features will be added in the next fews weeks.  
Don't hesitate to contact the team if you think about a specific usage we may address.

![npm](https://img.shields.io/npm/v/@untemps/loan-schedule?style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/untemps/loan-schedule/deploy?style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/untemps/loan-schedule?style=for-the-badge)

## Installation

```bash
yarn add @untemps/loan-schedule
```

## Usage

Import `LoanSchedule`:

```javascript
import { LoanSchedule } from '@untemps/loan-schedule'
```

Create an instance of `LoanSchedule` passing three objects:

```javascript
// Settings object that describes the properties of the loan (see below "Loan Settings")
const loanSettings = {
	amount: 79950, // Amount of the loan in any currency
	term: 25, // Loan term in years
	interestRate: 2, // Interest rate in percentage
	insuranceRate: 0.5, // Insurance rate in percentage
}

// List of amortizations monthly paid until the term of the loan (see below "Loan Amortizations")
const loanAmortizations = [
	{
		label: 'Rent', // Label of the amortization.
		value: 600, // Amount of the maortization.
		type: LoanScheduleAmortizationType.CREDIT, // Type of the amortization: "credit" or "debit"
	},
	{
		label: 'Payment',
		type: LoanScheduleAmortizationType.DEBIT,
		compute: LoanScheduleCompute.PAYMENT, // Computation method of the amortization (optional). That means the amount has to be automatically calculated by the class. "payment" and "insurance" are available so far.
	},
	{
		label: 'Property Tax',
		value: 30,
		rate: 5, // Yearly inflation rate of the amortization (optional).
		type: LoanScheduleAmortizationType.DEBIT,
	},
]

// Configuration of the output (see below "Configuration")
const config = {
    headers: {
        year: {
            label: 'Année',
        },
        balance: {
            label: 'Solde',
        },
    },
}

const schedule = new LoanSchedule(loanSettings, loanAmortizations, config);
```

### Constructor parameters

| Parameter             | Type                        | Description                                                                                        |
| --------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------|
| loanSettings          | LoanScheduleSettings        | Settings object that describes the properties of the loan (see below **"Loan Settings"**)            |
| loanAmortizations     | LoanScheduleAmortization[]  | List of amortizations monthly paid until the term of the loan (see below **"Loan Amortizations"**)   |
| config                | LoanScheduleConfig          | Configuration of the output (see below **"Configuration"**)                                          |

### Loan Settings

Settings object that describes the properties of the loan

#### LoanScheduleSettings type

| Property              | Type                        | Description                                                                                        |
| --------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------|
| amount                | number                      | Amount of the loan in any currencyAmount of the loan in any currency                               |
| term                  | number                      | Loan term in years                                                                                 |
| interestRate          | number                      | Interest rate in percentage                                                                        |
| insuranceRate         | number                      | Insurance rate in percentage                                                                       |

### Loan Amortizations

List of amortizations monthly paid until the term of the loan

#### LoanScheduleAmortization type

| Property              | Type                          | Description                                                                                                                                                                |
| --------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| label                 | string                        | Label of the amortization                                                                                                                                                  |
| value                 | number                        | Monthly amount of the amortization                                                                                                                                         |
| rate                  | number                        | Yearly inflation rate of the amortization (optional).                                                                                                                      |
| type                  | LoanScheduleAmortizationType  | Type of the amortization: "credit" or "debit"                                                                                                                              |
| compute               | LoanScheduleCompute           | Computation method of the amortization (optional). That means the amount has to be automatically calculated by the class. "payment" and "insurance" are available so far.  |

### Configuration

The configuration object allows to change the output to reflect your specific needs.

#### LoanScheduleConfig type

| Property              | Type                          | Description                                             |
| --------------------- | ----------------------------- | --------------------------------------------------------|
| headers               |                               |                                                         |
| --- payment           |                               |                                                         |
| ------- label         | string                        | Label of the payment amortization                       |
| --- insurance         |                               |                                                         |
| ------- label         | string                        | Label of the insurance amortization                     |

## Development

A demo can be served for development purpose on `http://localhost:10001/` running:

```
yarn dev
```

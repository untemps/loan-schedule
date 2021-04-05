# @untemps/loan-schedule

Class to generate a schedule of monthly loan payments.

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

Create an instance of `LoanSchedule`:

```javascript
const schedule = new LoanSchedule(79950, 25, 2, 0.5,
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
	], 2020
);
```

### Constructor parameters

| Props             | Type                  | Description                                           | Default        |
| ----------------- | --------------------- | ----------------------------------------------------- | ---------------|
| amount            | Number                | Total amount of the loan                              | `0`            |
| length            | Number                | Length of the loan (in years)                         | `0`            |
| interest rate     | Number                | Rate of the loan interests                            | `0`            |
| insurance rate    | Number                | Rate of the loan insurance                            | `0`            |
| credit values     | `IScheduleValue`[]    | Array of values to consider as credit (see below)     | `[]`           |
| debit values      | `IScheduleValue`[]    | Array of values to consider as debit (see below)      | `[]`           |
| base year         | Number                | Base year of the loan                                 | Current year   |

## `IScheduleValue` Object

To describe schedule values, you may use the special interface `IScheduleValue` which ensures you provide the right fields to do the schedule calculation.

### Properties

| Props      | Type       | Description                                                                                                                           |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `label`    | String     | Label of the value (useful if you need to display the value)                                                                          |
| `value`    | Number     | Schedule value                                                                                                                        |
| `rate`     | Number     | Rate of value increase along loan length (useful if you need to simulate increasing of any kind of fees during the time of the loan)  |

## Debit Values

Even if you don't specify any debit values in the constructor, the `LoanSchedule` class will fill the `debitValues` property with two default entries for each year:

| Props         | Description                              |
| ------------- | ---------------------------------------- |
| `Payment`     | Monthly payment of the loan              |
| `Insurance`   | Monthly insurance cost of the loan       |

## Development

A demo can be served for development purpose on `http://localhost:10001/` running:

```
yarn dev
```

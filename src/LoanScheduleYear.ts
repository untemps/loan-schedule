import ILoanScheduleValue from "./ILoanScheduleValue";

export interface ILoanScheduleYear {
  readonly year: number;
  readonly isBase: boolean;
  readonly creditValues: Omit<ILoanScheduleValue, 'rate'>[];
  readonly debitValues: Omit<ILoanScheduleValue, 'rate'>[];
  readonly balance: number;
}

export default class LoanScheduleYear implements ILoanScheduleYear {
  readonly year: number;
  readonly creditValues: Omit<ILoanScheduleValue, 'rate'>[];
  readonly debitValues: Omit<ILoanScheduleValue, 'rate'>[];
  readonly isBase: boolean;

  constructor(
    year?: number,
    creditValues?: Omit<ILoanScheduleValue, 'rate'>[],
    debitValues?: Omit<ILoanScheduleValue, 'rate'>[],
    isBase?: boolean
  ) {
    this.year = year || new Date().getFullYear();
    this.creditValues = creditValues || [];
    this.debitValues = debitValues || [];
    this.isBase = isBase || false;
  }

  get balance(): number {
    return this.sum(this.creditValues) - this.sum(this.debitValues);
  }

  private sum(values: Omit<ILoanScheduleValue, 'rate'>[]): number {
    return values.reduce(
      (acc: number, item: Omit<ILoanScheduleValue, 'rate'>): number => (acc += (item.value || 0)),
      0
    );
  }
}


import ILoanScheduleValue from "./ILoanScheduleValue";

class LoanScheduleYear {
  readonly year: number;
  readonly creditValues: ILoanScheduleValue[];
  readonly debitValues: ILoanScheduleValue[];
  readonly isBase: boolean;

  constructor(
    year?: number,
    creditValues?: ILoanScheduleValue[],
    debitValues?: ILoanScheduleValue[],
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

  private sum(values: ILoanScheduleValue[]): number {
    return values.reduce(
      (acc: number, item: ILoanScheduleValue): number => (acc += (item.value || 0)),
      0
    );
  }
}

export default LoanScheduleYear;

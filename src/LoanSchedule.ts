import ILoanScheduleValue from "./ILoanScheduleValue";
import LoanScheduleYear from "./LoanScheduleYear";

class LoanSchedule {
  readonly amount: number;
  readonly length: number; // In years
  readonly interestRate: number;
  readonly insuranceRate: number;
  private readonly creditValues: ILoanScheduleValue[];
  private readonly debitValues: ILoanScheduleValue[];
  readonly baseYear: number;

  constructor(
    amount?: number,
    length?: number,
    interestRate?: number,
    insuranceRate?: number,
    creditValues?: ILoanScheduleValue[],
    debitValues?: ILoanScheduleValue[],
    baseYear?: number
  ) {
    this.amount = amount || 0;
    this.length = length || 0;
    this.interestRate = interestRate || 0;
    this.insuranceRate = insuranceRate || 0;
    this.creditValues = creditValues || [];
    this.debitValues = debitValues || [];
    this.baseYear = baseYear || new Date().getFullYear();
  }

  get years(): LoanScheduleYear[] {
    const y: LoanScheduleYear[] = [];
    for (let i: number = 0; i < this.length; i++) {
      y.push(
        new LoanScheduleYear(
          this.baseYear + i,
          this.mapValues(this.creditValues, i),
          [
            {
              label: "Payment",
              value: this.getPMT()
            },
            {
              label: "Insurance",
              value: (this.amount * this.insuranceRate) / 100 / 12
            },
            ...this.mapValues(this.debitValues, i)
          ],
          i === 0
        )
      );
    }
    return y;
  }

  public getPMT(): number {
    if (!this.amount || !this.length || !this.interestRate) return 0;
    const rate = this.interestRate / 1200;
    const pvif: number = Math.pow(1 + rate, this.length * 12);
    return (rate / (pvif - 1)) * (this.amount * pvif);
  }

  private mapValues(
    values: ILoanScheduleValue[],
    index: number
  ): ILoanScheduleValue[] {
    return values.map((item) => ({
      ...item,
      value: !!item.rate
        ? LoanSchedule.getDynamicValue(item.value || 0, item.rate || 0, index)
        : item.value
    }));
  }

  private static getDynamicValue(
    baseValue: number,
    rate: number,
    index: number
  ): number {
    if(!baseValue || !rate) return 0
    return baseValue * Math.pow(1 + rate / 100, index);
  }
}

export default LoanSchedule;

import LoanSchedule from "../LoanSchedule";
import LoanScheduleYear from "../LoanScheduleYear";

describe("LoanSchedule", () => {
  it("should instantiate properly", () => {
    expect(new LoanSchedule()).toBeInstanceOf(LoanSchedule);
  });

  describe("amount", () => {
    it.each([
      [2015, 2015],
      [undefined, 0],
      [0, 0],
      [1, 1]
    ])("should get amount", (amount, expected) => {
      expect(new LoanSchedule(amount).amount).toBe(expected);
    });
  });

  describe("length", () => {
    it.each([
      [2015, 2015],
      [undefined, 0],
      [0, 0],
      [1, 1]
    ])("should get length", (length, expected) => {
      expect(new LoanSchedule(0, length).length).toBe(expected);
    });
  });

  describe("interestRate", () => {
    it.each([
      [2015, 2015],
      [undefined, 0],
      [0, 0],
      [1, 1]
    ])("should get interestRate", (interestRate, expected) => {
      expect(new LoanSchedule(0, 0, interestRate).interestRate).toBe(expected);
    });
  });

  describe("insuranceRate", () => {
    it.each([
      [2015, 2015],
      [undefined, 0],
      [0, 0],
      [1, 1]
    ])("should get insuranceRate", (insuranceRate, expected) => {
      expect(new LoanSchedule(0, 0, 0, insuranceRate).insuranceRate).toBe(
        expected
      );
    });
  });

  describe("baseYear", () => {
    it.each([
      [2015, 2015],
      [undefined, 2021],
      [0, 2021],
      [1, 1]
    ])("should get baseYear", (baseYear, expected) => {
      expect(new LoanSchedule(0, 0, 0, 0, [], [], baseYear).baseYear).toBe(
        expected
      );
    });
  });

  describe("get years", () => {
    it("should get years", () => {
      const schedule = new LoanSchedule(0, 10, 0, 0, [], [], 0);
      const years = schedule.years;
      expect(years).toHaveLength(10);
      expect(years[0]).toBeInstanceOf(LoanScheduleYear);
    });

    it.each([
      [undefined, undefined, [0, 2]],
      [[{ value: 100 }], [{ value: 50 }], [1, 3]],
      [
        [{ value: 100 }, { value: 0, rate: 2 }, { value: 100 }],
        [{ value: 50, rate: 1 }],
        [3, 3]
      ],
      [[], [], [0, 2]],
      [undefined, [], [0, 2]],
      [[{ value: 50 }], undefined, [1, 2]]
    ])(
      "should get creditValues and debitValues",
      (creditValues, debitValues, expected) => {
        const schedule = new LoanSchedule(
          100000,
          10,
          1,
          1,
          creditValues,
          debitValues,
          0
        );
        const years = schedule.years;
        expect(years[0].creditValues).toHaveLength(expected[0]);
        expect(years[0].debitValues).toHaveLength(expected[1]);
      }
    );
  });

  describe("getPMT", () => {
    it.each([
      [100000, 15, 1, 598],
      [398411, 25, 1.35, 1565],
      [40000, 18, 5, 281],
      [undefined, 18, 5, 0],
      [100000, undefined, 5, 0],
      [100000, 18, undefined, 0],
      [100000, undefined, 0, 0],
      [100000, undefined, undefined, 0],
      [100000, 0, 0, 0],
      [undefined, 0, 0, 0]
    ])("should get PMT", (amount, length, interestRate, expected) => {
      const schedule = new LoanSchedule(
        amount,
        length,
        interestRate
      );
      expect(schedule.getPMT()).toBeCloseTo(expected, 0);
    });
  });
});

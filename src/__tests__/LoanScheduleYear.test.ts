import LoanScheduleYear from "../LoanScheduleYear";

describe("LoanScheduleYear", () => {
  it("should instantiate properly", () => {
    expect(new LoanScheduleYear()).toBeInstanceOf(LoanScheduleYear);
  });

  describe("year", () => {
    it.each([
      [2015, 2015],
      [undefined, 2021],
      [0, 2021],
      [1, 1]
    ])("should get year", (year, expected) => {
      expect(new LoanScheduleYear(year).year).toBe(expected);
    });
  });

  describe("creditValues", () => {
    it.each([
      [[{ value: 0 }], [{ value: 0 }]],
      [undefined, []]
    ])("should get creditValues", (creditValues, expected) => {
      expect(new LoanScheduleYear(2021, creditValues).creditValues).toEqual(
        expected
      );
    });
  });

  describe("debitValues", () => {
    it.each([
      [[{ value: 0 }], [{ value: 0 }]],
      [undefined, []]
    ])("should get debitValues", (debitValues, expected) => {
      expect(new LoanScheduleYear(2021, [], debitValues).debitValues).toEqual(
        expected
      );
    });
  });

  describe("isBase", () => {
    it.each([
      [true, true],
      [false, false],
      [undefined, false]
    ])("should get isBase", (isBase, expected) => {
      expect(new LoanScheduleYear(2021, [], [], isBase).isBase).toEqual(
        expected
      );
    });
  });

  describe("get balance", () => {
    it("should calculate balance if no values are passed to the constructor", () => {
      expect(new LoanScheduleYear().balance).toBe(0);
    });

    it.each([
      [[{ value: 100 }], [{ value: 50 }], 50],
      [[{ value: 50 }], [{ value: 100 }], -50],
      [[{ value: 100 }], [{ value: 100 }], 0],
      [[{ value: -100 }], [{ value: 100 }], -200],
      [[{ value: -100 }], [{ value: -100 }], 0],
      [[{ value: undefined }], [{ value: 100 }], -100],
      [[{ value: 100 }], [{ value: undefined }], 100],
      [[{ value: undefined }], [{ value: undefined }], 0],
      [[], [{ value: 100 }], -100],
      [[{ value: 100 }], [], 100],
      [[], [], 0],
      [undefined, [{ value: 100 }], -100],
      [[{ value: 100 }], undefined, 100],
      [undefined, undefined, 0]
    ])("should calculate balance", (creditValues, debitValues, expected) => {
      expect(
        new LoanScheduleYear(2021, creditValues, debitValues).balance
      ).toBe(expected);
    });
  });
});

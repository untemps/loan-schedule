import LoanSchedule from "../LoanSchedule";

describe("LoanSchedule", () => {
  it("should instantiate properly", () => {
    expect(new LoanSchedule()).toBeInstanceOf(LoanSchedule);
  });
});

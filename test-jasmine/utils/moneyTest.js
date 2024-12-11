import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("Normal functionality testing", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  }),
    it("Boundary value testing", () => {
      expect(formatCurrency(0)).toEqual("0.00");
    }),
    it("Extreme value testing", () => {
      expect(formatCurrency(1000000)).toEqual("10000.00");
    }),
    it("Decimal rounding testing", () => {
      expect(formatCurrency(2000.5)).toEqual("20.01");
    });
});

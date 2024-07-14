const { fahrenheitToCelsius } = require("./math");
test("Should convert 32 F to 0 C", () => {
  const value = fahrenheitToCelsius(32);
  expect(value).toBe(0);
});

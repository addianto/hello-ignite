import { YearModel } from "./Year"

test("can be created", () => {
  const instance = YearModel.create({ year: 1970 })

  expect(instance).toBeTruthy()
})

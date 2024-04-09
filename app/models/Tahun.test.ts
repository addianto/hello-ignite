import { TahunModel } from "./Tahun"

test("can be created", () => {
  const instance = TahunModel.create({ tahun: 0 })

  expect(instance).toBeTruthy()
})

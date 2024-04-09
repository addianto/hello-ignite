import { DaerahModel } from "./Daerah"

test("can be created", () => {
  const instance = DaerahModel.create({ id: 0, daerah: "" })

  expect(instance).toBeTruthy()
})

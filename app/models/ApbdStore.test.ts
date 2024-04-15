import { ApbdStoreModel } from "./ApbdStore"

test("can be created", () => {
  const instance = ApbdStoreModel.create({})

  expect(instance).toBeTruthy()
})

import { ApbdModel } from "./Apbd"

test("can be created", () => {
  const instance = ApbdModel.create({
    id: 0,
    id_daerah: 0,
    tahun: 0,
    anggaran: 0.0,
    realisasi: 0.0,
  })

  expect(instance).toBeTruthy()
})

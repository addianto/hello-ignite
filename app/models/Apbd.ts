import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { DaerahModel } from "./Daerah"

/**
 * Model description here for TypeScript hints.
 */
export const ApbdModel = types
  .model("Apbd")
  .props({
    id: types.identifierNumber,
    id_daerah: types.reference(DaerahModel),
    tahun: types.number,
    anggaran: types.float,
    realisasi: types.float,
  })
  .actions(withSetPropAction)
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((apbd) => ({
    get ratio() {
      return apbd.realisasi / apbd.anggaran
    },
  }))

export interface Apbd extends Instance<typeof ApbdModel> {}
export interface ApbdSnapshotOut extends SnapshotOut<typeof ApbdModel> {}
export interface ApbdSnapshotIn extends SnapshotIn<typeof ApbdModel> {}
export const createApbdDefaultModel = () =>
  types.optional(ApbdModel, {
    id: 0,
    id_daerah: 0,
    tahun: 0,
    anggaran: 0.0,
    realisasi: 0.0,
  })

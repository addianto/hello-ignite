import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const TahunModel = types
  .model("Tahun")
  .props({
    tahun: types.maybeNull(types.number),
  })
  .actions(withSetPropAction)

export interface Tahun extends Instance<typeof TahunModel> {}
export interface TahunSnapshotOut extends SnapshotOut<typeof TahunModel> {}
export interface TahunSnapshotIn extends SnapshotIn<typeof TahunModel> {}
export const createTahunDefaultModel = () => types.optional(TahunModel, { tahun: 0 })

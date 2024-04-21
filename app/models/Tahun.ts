import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Represents a unique tahun (year) from the corresponding database view.
 */
export const TahunModel = types
  .model("Tahun")
  .props({
    tahun: types.number,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Tahun extends Instance<typeof TahunModel> {}
export interface TahunSnapshotOut extends SnapshotOut<typeof TahunModel> {}
export interface TahunSnapshotIn extends SnapshotIn<typeof TahunModel> {}

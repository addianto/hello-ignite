import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ApbdStoreModel = types
  .model("ApbdStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ApbdStore extends Instance<typeof ApbdStoreModel> {}
export interface ApbdStoreSnapshotOut extends SnapshotOut<typeof ApbdStoreModel> {}
export interface ApbdStoreSnapshotIn extends SnapshotIn<typeof ApbdStoreModel> {}
export const createApbdStoreDefaultModel = () => types.optional(ApbdStoreModel, {})

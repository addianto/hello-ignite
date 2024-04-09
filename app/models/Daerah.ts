import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const DaerahModel = types
  .model("Daerah")
  .props({
    id: types.identifierNumber,
    daerah: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Daerah extends Instance<typeof DaerahModel> {}
export interface DaerahSnapshotOut extends SnapshotOut<typeof DaerahModel> {}
export interface DaerahSnapshotIn extends SnapshotIn<typeof DaerahModel> {}
export const createDaerahDefaultModel = () => types.optional(DaerahModel, { id: 0, daerah: "" })

import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const YearModel = types
  .model("Year")
  .props({
    year: types.number,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Year extends Instance<typeof YearModel> {}
export interface YearSnapshotOut extends SnapshotOut<typeof YearModel> {}
export interface YearSnapshotIn extends SnapshotIn<typeof YearModel> {}
export const createYearDefaultModel = () =>
  types.optional(YearModel, {
    year: 1970,
  })

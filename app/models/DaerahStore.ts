import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { DaerahModel } from "./Daerah"
import { supabase } from "app/services/api/supabase"

/**
 * Model description here for TypeScript hints.
 */
export const DaerahStoreModel = types
  .model("DaerahStore")
  .props({
    daerahs: types.array(DaerahModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchDaerahs() {
      const response = await supabase.getDaerahs()
      
      if (response.kind === "ok") {
        store.setProp("daerahs", response.data)
      } else {
        console.error(`Error fetching daerahs: ${JSON.stringify(response)}`)
      }
    },
  }))

export interface DaerahStore extends Instance<typeof DaerahStoreModel> {}
export interface DaerahStoreSnapshotOut extends SnapshotOut<typeof DaerahStoreModel> {}
export interface DaerahStoreSnapshotIn extends SnapshotIn<typeof DaerahStoreModel> {}
export const createDaerahStoreDefaultModel = () => types.optional(DaerahStoreModel, {})

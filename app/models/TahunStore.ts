import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { TahunModel } from "./Tahun"
import { supabase } from "app/services/api/supabase"

/**
 * Model description here for TypeScript hints.
 */
export const TahunStoreModel = types
  .model("TahunStore")
  .props({
    tahuns: types.array(TahunModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchTahuns() {
      const response = await supabase.getTahuns()

      if (response.kind === "ok") {
        store.setProp("tahuns", response.data)
      } else {
        console.error(`Error fetching tahuns: ${JSON.stringify(response)}`)
      }
    },
  }))
  .views((store) => ({
    getTahuns() {
      return store.tahuns
    },
  }))

export interface TahunStore extends Instance<typeof TahunStoreModel> {}
export interface TahunStoreSnapshotOut extends SnapshotOut<typeof TahunStoreModel> {}
export interface TahunStoreSnapshotIn extends SnapshotIn<typeof TahunStoreModel> {}
export const createTahunStoreDefaultModel = () => types.optional(TahunStoreModel, {})

import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { supabase } from "app/services/api/supabase"
import { ApbdModel } from "./Apbd"
import { Daerah } from "./Daerah"
import { Tahun } from "./Tahun"

/**
 * Model description here for TypeScript hints.
 */
export const ApbdStoreModel = types
  .model("ApbdStore")
  .props({
    apbd: types.maybe(ApbdModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    async fetchApbdByDaerahAndTahun(daerah: Daerah, tahun: Tahun) {
      const response = await supabase.getApbdByIdDaerahAndTahun(daerah.id ?? 0, tahun.tahun)

      if (response.kind === "ok") {
        self.setProp("apbd", response.data)
      } else {
        console.error(`Error fetching APBD: ${JSON.stringify(response)}`)
      }
    },
  }))
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ApbdStore extends Instance<typeof ApbdStoreModel> {}
export interface ApbdStoreSnapshotOut extends SnapshotOut<typeof ApbdStoreModel> {}
export interface ApbdStoreSnapshotIn extends SnapshotIn<typeof ApbdStoreModel> {}

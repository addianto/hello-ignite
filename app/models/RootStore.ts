import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TahunStoreModel } from "./TahunStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { EpisodeStoreModel } from "./EpisodeStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  tahunStore: types.optional(TahunStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

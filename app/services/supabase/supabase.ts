import "react-native-url-polyfill"
import { createClient, PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { SupabaseConfig } from "./supabase.types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Database, Tables } from "types/supabase.types"
import Config from "app/config"
import { YearSnapshotIn } from "app/models"

/**
 * Terminate the process if one of the required config values is missing.
 *
 * See: https://nodejs.org/api/process.html#process_exit_codes
 */
const INVALID_ARGUMENT = 9

export const DEFAULT_CONFIG: SupabaseConfig = {
  url: Config.SUPABASE_URL ?? process.exit(INVALID_ARGUMENT),
  key: Config.SUPABASE_KEY ?? process.exit(INVALID_ARGUMENT),
  debug: Boolean(Config.SUPABASE_DEBUG),
}

export class Supabase {
  supabase: SupabaseClient
  config: SupabaseConfig

  constructor(config: SupabaseConfig = DEFAULT_CONFIG) {
    this.config = config
    this.supabase = createClient<Database>(config.url, config.key, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        debug: this.config.debug,
      },
    })
  }

  async getYears(): Promise<YearSnapshotIn[] | PostgrestError> {
    const { data, error } = await this.supabase
      .from("years")
      .select("*")
      .returns<Tables<"years">[]>()

    if (error) {
      return error
    }

    return data.map((y) => ({ year: y.year })) ?? []
  }

  async getSubdivisions() {
    const { data } = await this.supabase
      .from("subdivisions")
      .select("*")
      .returns<Tables<"subdivisions">[]>()

    return data
  }

  async getApbdBySubdivisionAndYear(idSubdivision: number, year: number) {
    const { data } = await this.supabase
      .from("apbd")
      .select("*")
      .eq("id_subdivision", idSubdivision)
      .eq("year", year)
      .returns<Tables<"apbd">>()

    return data
  }
}

export const supabase = new Supabase()

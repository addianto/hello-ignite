import "react-native-url-polyfill"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { SupabaseConfig } from "./supabase.types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Database, Tables } from "types/supabase.types"

export const DEFAULT_CONFIG: SupabaseConfig = {
  url: "http://localhost",
  key: "TODO",
  debug: true,
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

  async getYears() {
    const { data } = await this.supabase.from("years").select("*").returns<Tables<"years">[]>()

    return data
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

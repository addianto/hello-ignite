import "react-native-url-polyfill"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import Config from "../../config"
import { SupabaseApiConfig } from "./supabase.types"
import { Database, Tables } from "../../database"
import { getSupabaseProblem, SupabaseProblem } from "./supabaseProblem"

export const DEFAULT_API_CONFIG: SupabaseApiConfig = {
    url: Config.SUPABASE_URL,
    key: Config.SUPABASE_KEY,
    debug: Config.SUPABASE_DEBUG,
    timeout: 10000,
}

export class Supabase {
    supabase: SupabaseClient
    config: SupabaseApiConfig

    constructor(config: SupabaseApiConfig = DEFAULT_API_CONFIG) {
        this.config = config
        this.supabase = createClient<Database>(this.config.url, this.config.key, {
            auth: {
                storage: AsyncStorage,
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false,
                debug: this.config.debug,
            },
        })
    }

    async getDaerahs(): Promise<{ kind: "ok"; data: Tables<"daerah">[] } | SupabaseProblem> {
        const { data, error } = await this.supabase.from("daerah").select().returns<Tables<"daerah">[]>()
        
        if (error) {
            const problem = getSupabaseProblem(error)
            
            if (problem) {
                console.error(problem)
                return problem
            }
        }
        
        if (!data) {
            console.error("data is empty")
            return { "kind": "unknown" }
        }
        
        return { kind: "ok", data }
    }
    
    async getTahuns(): Promise<{ kind: "ok"; data: number[] } | SupabaseProblem> {
        const { data, error } = await this.supabase.from("tahun").select().returns<number[]>()
        
        if (error) {
            const problem = getSupabaseProblem(error)
            
            if (problem) {
                console.error(problem)
                return problem
            }
        }
        
        if (!data) {
            console.error("data is empty")
            return { kind: "unknown" }
        }
        
        return { kind: "ok", data }
    }
}

export const supabase = new Supabase()
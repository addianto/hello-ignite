import { ApiConfig } from "./api.types"

/**
 * The options to configure Supabase.
 */
export interface SupabaseApiConfig extends ApiConfig {
  /**
   * The anonymous (anon) key of Supabase project.
   */
  key: string

  /**
   * Flag to enable debug messages.
   */
  debug: boolean
}

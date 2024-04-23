/**
 * The options to configure Supabase.
 */
export interface SupabaseConfig {
  /**
   * The URL of the Supabase project.
   */
  url: string

  /**
   * The anonymous (anon) key of the Supabase project.
   */
  key: string

  /**
   * The flag to enable debug messages.
   */
  debug: boolean
}

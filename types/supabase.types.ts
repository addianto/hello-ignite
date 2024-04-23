import { MergeDeep } from "type-fest"
import { Database as DatabaseGenerated } from "./supabase-generated.types"
export { Json } from "./supabase-generated.types"

/**
 * Overrides the type for a specific column in a view.
 * 
 * Based from: https://supabase.com/docs/guides/api/rest/generating-types
 */
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        years: {
          Row: {
            // `year` is a unique number and always exist in the original table, so it must be not null
            year: number
          }
        }
      }
    }
  }
>
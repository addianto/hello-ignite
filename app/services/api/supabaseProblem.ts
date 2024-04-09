import { PostgrestError } from "@supabase/supabase-js"

/**
 * See: https://postgrest.org/en/v12/references/errors.html#postgrest-error-codes
 */
export type SupabaseProblem = 
    | { kind: "connection", error: PostgrestError }
    | { kind: "api request", error: PostgrestError }
    | { kind: "schema cache", error: PostgrestError }
    | { kind: "jwt", error: PostgrestError }
    | { kind: "internal", error: PostgrestError }
    | { kind: "unknown" }

export function getSupabaseProblem(error: PostgrestError): SupabaseProblem {
    const errorGroup: string = error.code[5]
    
    switch (errorGroup) {
        case "0":
            return { kind: "connection", error }
        case "1":
            return { kind: "api request", error }
        case "2":
            return { kind: "schema cache", error }
        case "3":
            return { kind: "jwt", error }
        case "X":
            return { kind: "internal", error }
    }
    
    return { kind: "unknown" }
}
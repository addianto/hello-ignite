/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
require("dotenv").config()

export default {
  API_URL: "https://api.rss2json.com/v1/",
  SUPABASE_URL: process.env.SUPABASE_URL ?? "https://bpgfvaqypwjsalhmcgtj.supabase.co",
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  SUPABASE_DEBUG: process.env.SUPABASE_DEBUG ?? "true",
}

"use server"
import { createClient } from "@supabase/supabase-js"

export async function addWord(word: string) {
  const supabaseUrl = "https://cmaesneutenjsfynvjnm.supabase.co"
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
}

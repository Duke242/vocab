"use server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export async function addWord(word: string, definition: string) {
  const supabaseUrl = "https://cmaesneutenjsfynvjnm.supabase.co"
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  const supabaseUser = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabaseUser.auth.getSession()

  const { data, error } = await supabase
    .from("words")
    .insert([
      { word: word, definition: definition, creator_id: session.user.id },
    ])
    .select()
}

export async function deleteWord(wordId: string) {
  const supabaseUrl = "https://cmaesneutenjsfynvjnm.supabase.co"
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { data, error } = await supabase
      .from("words")
      .delete()
      .eq("id", wordId)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting word:", error.message)
    throw error
  }
}

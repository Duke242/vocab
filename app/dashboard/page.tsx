import ButtonAccount from "@/components/ButtonAccount"
import WordInput from "@/components/WordInput"
import WordsList from "@/components/WordsList" // Import the WordsList component
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Words from "@/components/Words"
export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: words, error } = await supabase
    .from("words")
    .select("*")
    .eq("creator_id", session.user.id)

  if (error) {
    console.error("Error fetching words:", error.message)
  }

  interface Word {
    id: string
    word: string
    definition: string
  }

  return (
    <main className="min-h-screen p-8 pb-24 bg-base-100">
      <header className="max-w-xl mr-auto space-y-8 flex align-center">
        <ButtonAccount />
      </header>
      <section>
        <Words words={words} />
      </section>
    </main>
  )
}

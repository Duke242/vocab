import ButtonAccount from "@/components/ButtonAccount"
import WordInput from "@/components/WordInput"
import WordsList from "@/components/WordsList" // Import the WordsList component

export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  // const user = await supabase.auth.getUser()
  // const { data: words, error } = await supabase
  //   .from("words")
  //   .select("*")
  //   .eq("user_id", user.data.user.id)

  // if (error) {
  //   console.error("Error fetching words:", error.message)
  // }

  const mockWords = [
    {
      id: "1",
      word: "React",
      definition: "A JavaScript library for building user interfaces.",
    },
    {
      id: "2",
      word: "JavaScript",
      definition:
        "A programming language that enables web pages to be interactive.",
    },
    {
      id: "3",
      word: "HTML",
      definition: "Hypertext Markup Language, used to create web pages.",
    },
    {
      id: "4",
      word: "CSS",
      definition: "Cascading Style Sheets, used for styling web pages.",
    },
    {
      id: "5",
      word: "Node.js",
      definition:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    },
    {
      id: "6",
      word: "Express.js",
      definition: "A web application framework for Node.js.",
    },
    {
      id: "7",
      word: "MongoDB",
      definition: "A NoSQL database program.",
    },
    {
      id: "8",
      word: "SQL",
      definition:
        "Structured Query Language, used to manage and manipulate relational databases.",
    },
    {
      id: "9",
      word: "API",
      definition:
        "Application Programming Interface, allows different software applications to communicate with each other.",
    },
    {
      id: "10",
      word: "JSON",
      definition:
        "JavaScript Object Notation, a lightweight data-interchange format.",
    },
  ]

  return (
    <main className="min-h-screen p-8 pb-24">
      <header className="max-w-xl mr-auto space-y-8">
        <ButtonAccount />
      </header>
      <section>
        <WordInput />
        <WordsList words={mockWords} /> {/* Pass the words data */}
      </section>
    </main>
  )
}

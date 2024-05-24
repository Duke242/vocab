"use client"
import React, { useState } from "react"
import { deleteWord, addWord } from "@/libs/serverActions"
import toast from "react-hot-toast"

interface Word {
  id: string
  word: string
  definition: string
}

interface WordsListProps {
  words: Word[]
}

const Words: React.FC<WordsListProps> = ({ words: initialWords }) => {
  const [words, setWords] = useState<Word[]>(initialWords)
  const [newWord, setNewWord] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteWord = (id: string) => {
    // Optimistically remove the word from the UI
    const updatedWords = words.filter((word) => word.id !== id)
    setWords(updatedWords)

    // Asynchronously delete the word from the server
    deleteWord(id)
      .then(() => {
        // Success
        toast.error("Word deleted successfully.")
      })
      .catch((error) => {
        // If there's an error, revert the UI to the previous state
        console.error("Error deleting word:", error)
        setWords(initialWords)
      })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: newWord }),
      })

      if (res.ok) {
        const data = await res.json()
        const definitionString = data.definition

        const updatedWords = [
          ...words,
          {
            id: Date.now().toString(),
            word: newWord,
            definition: definitionString,
          },
        ]
        setWords(updatedWords)
        addWord(newWord, definitionString)
        toast.success("Word added successfully")
        setNewWord("")
      } else {
        console.error("Error:", res.statusText)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <WordInput
        newWord={newWord}
        setNewWord={setNewWord}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <h2 className="text-2xl font-bold mb-4">My Words</h2>

      {words.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {words.map((word) => (
            <div
              key={word.id}
              className="bg-white p-4 flex flex-col justify-between border-b border-gray-300"
            >
              <div>
                <h3 className="text-lg font-semibold">{word.word}</h3>
                <p className="text-gray-500">{word.definition}</p>
              </div>
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-fit"
                onClick={() => handleDeleteWord(word.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Type in a word above to begin boosting your vocabulary!
        </p>
      )}
    </div>
  )
}

interface WordInputProps {
  newWord: string
  setNewWord: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void
  isLoading: boolean
}

const WordInput: React.FC<WordInputProps> = ({
  newWord,
  setNewWord,
  handleSubmit,
  isLoading,
}) => {
  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Enter a new word"
          className="w-full max-w-lg px-4 py-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg focus:shadow-lg"
          required
          minLength={3}
          maxLength={30}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none transition hover:scale-105 mb-6 md:mb-0 align-center"
          disabled={isLoading}
        >
          Add Word{" "}
          {isLoading ? (
            <span className="flex-row loading-spinner loading loading-xs"></span>
          ) : null}
        </button>
      </form>
    </section>
  )
}

export default Words

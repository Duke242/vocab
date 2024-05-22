"use client"
import React, { useState } from "react"

const WordInput = () => {
  const [newWord, setNewWord] = useState("")

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault() // Prevent default form submission behavior

    // Handle the submission of the new word
    console.log("New word:", newWord)

    // Reset the input field
    setNewWord("")
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Enter a new word"
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Word
        </button>
      </form>
    </section>
  )
}

export default WordInput

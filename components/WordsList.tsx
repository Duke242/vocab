const WordsList = ({
  words,
}: {
  words: { id: string; word: string; definition: string }[]
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Words</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map((word) => (
          <div
            key={word.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{word.word}</h3>
              <p className="text-gray-600">{word.definition}</p>
            </div>
            {/* Add any additional actions or buttons here */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WordsList

import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request, res: Response) {
  const payload = await req.json()
  const openai = new OpenAI()

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to output JSON. Please define the word:",
        },
        { role: "user", content: `Define the word "${payload.word}"` },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    })

    const responseData = JSON.parse(completion.choices[0].message.content)
    const definition = responseData.definition

    console.log(definition)

    return NextResponse.json({ definition }, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

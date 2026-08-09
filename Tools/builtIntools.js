import path from "path";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: "What is the weather in Tokyo?",
        },
      ],
      
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Get current weather for a location",
            parameters: {
              type: "object",
              properties: {
                location: { type: "string" },
              },
              required: ["location"],
            },
          },
        },
      ],
    });

    console.log(completion.choices[0]?.message);
  } catch (error) {
    console.error("Error executing completion:", error);
  }
}

main();
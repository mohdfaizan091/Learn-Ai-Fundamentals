// web search with builtintools as model: "groq/compund" support internal web search

import path from "path";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  const response = await groq.chat.completions.create({
  model: "groq/compound",
  messages: [
    {
      role: "user",
      content: "What happened in AI last week? Provide a list of the most important model releases and updates."
    },
  ]
});

// Final output
console.log(response.choices[0].message.content);

// Reasoning + internal tool calls
console.log(response.choices[0].message.reasoning);

// Search results from the tool calls
console.log(response.choices[0].message.executed_tools?.[0].search_results);

}

main();
import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq();

export async function main() {
    const stream = await getGroqChatStream();
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

export const getGroqChatStream = async () => {
  return groq.chat.completions.create({
    messages: [
      
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "openai/gpt-oss-20b",

    //temprature -- to make the response of LLM comsistent 
    temperature : 0.5,

    //maximum token to generate
    max_completion_tokens: 4096,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    stop : null,
    stream : true,
  });
};

main();
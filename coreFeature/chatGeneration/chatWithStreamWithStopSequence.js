import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq();

export async function main() {
    const completion = await getGroqChatCompletion();
    console.log(completion.choices[0]?.message?.content || "");
}

export const  getGroqChatCompletion = async () => {
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
    // stop sequence -- when LLM counter the valve 6 it will stop generating. we can use multiple text in form array for stop sequence.

    stop : ", 6",

    stream : false,
  });
};

main();
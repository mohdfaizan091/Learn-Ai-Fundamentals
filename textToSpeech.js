import fs from "fs";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const speechFilePath = "orpheus-english.wav";
const text = "Hi i am Mohammad Faizan, Welcome to my short documentation that will help you to learn the fundamentals of Large Language Model (LLM) that will help in your AI learning Journey.";
const responseFormat = "wav";

async function main() {
  try {
    const response = await groq.audio.speech.create({
      model: "canopylabs/orpheus-v1-english",
      voice: "hannah",
      input: text,
      response_format: responseFormat,
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile(speechFilePath, buffer);

    console.log(`Audio generated successfully: ${speechFilePath}`);

  } catch (error) {
    console.error("Error generating speech:", error);
  }
}

main();
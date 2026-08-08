import fs from "fs";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  try {
    const transcription = await groq.audio.transcriptions.create({
      // add the path of your audio file
      file: fs.createReadStream("C:/Users/mohdf/OneDrive/Documents/HowAreYou.ogg"),
      model: "whisper-large-v3-turbo",
      prompt: "Specify context or spelling", // Optional prompt to help guide context
      response_format: "verbose_json",
      timestamp_granularities: ["word", "segment"],
      temperature: 0.0,
    });

    console.log(JSON.stringify(transcription, null, 2));
  } catch (error) {
    console.error("Error creating transcription:", error);
  }
}

main();
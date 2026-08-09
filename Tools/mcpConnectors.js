import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
  model: "openai/gpt-oss-120b",
  tools: [{
    type: "mcp",
    server_label: "Google Calendar",
    connector_id: "connector_googlecalendar", 
    authorization: "ya29.A0AR3da...", // Your OAuth access token
    require_approval: "never"
  }],
  input: "What's on my calendar for today?"
});

// The response will include calendar events if found
console.log(response.output_text);

//output
// I’m unable to retrieve your calendar data
//  because the request isn’t authenticated. To see today’s events,
//   please make sure you’re signed in and have granted the necessary 
//   permissions for me to access your Google Calendar. 
// Once that’s set up, I can pull the events for you.
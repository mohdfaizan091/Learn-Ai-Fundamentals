import fs from "fs";
import dotenv from "dotenv";
import Groq from "groq-sdk";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


async function main() {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
        {
            role: "user",
            content: "A student scored 80% in the first exam and 60% in the second exam. If the second exam has twice the weightage of the first exam, what is the student's overall percentage?"
        }
    ],
    temperature: 0.6,
    max_completion_tokens: 1024,
    top_p: 0.95,
    stream: true
});

for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0].delta.content || "");
}

}

main();


// output-text
// Overall percentage

// The overall score is a weighted average of the two exam marks, with the second exam counting twice as much as the first.

// \[
// \text{Overall} = \frac{(\text{Exam 1} \times 1) + (\text{Exam 2} \times 2)}{1 + 2}
// \]

// Plugging in the given percentages:

// \[
// \text{Overall} = \frac{(80 \times 1) + (60 \times 2)}{3}
//                = \frac{80 + 120}{3}
//                = \frac{200}{3}
//                \approx 66.67\%
// \]

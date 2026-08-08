import fs from "fs";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What's in this image?"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://www.mattmahoney.net/ocr/plaid_c150.jpg"
            }
          }
        ]
      }
    ],
    "model": "qwen/qwen3.6-27b",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

   console.log(chatCompletion.choices[0].message.content);
}

main();

// output-text

// <think>
// The user wants me to describe the image.

// **1. Overall Impression:**
// The image shows a newspaper advertisement for a musical. It's a black and white (greyscale) photo of a printed page. The ad is repeated or cropped in a way that shows parts of the same ad multiple times, suggesting a collage or just a messy crop of the original image. Wait, looking closely, it looks like the original image is a vertical strip that has been tiled or repeated. No, actually, looking at the very bottom, there's a tiny bit of another ad (orange/yellow). The main image is a single newspaper ad for "Forever Plaid".

// **2. Detailed Analysis of the Content:**
// *   **Headline/Title:** "Forever PLAID" is written in a stylized, retro font. "Forever" is in a cursive script, and "PLAID" is in large, bold, block letters with a plaid pattern inside.
// *   **Subtitle:** "The Heavenly Musical Hit" is curved underneath the main title.
// *   **Logos:**
//     *   Top left: "The Henegar Center for the Arts in historic downtown Melbourne". The font is script-like for "Henegar" and "Arts".
//     *   Top right: "RED Carpet Productions" with the tagline "Get Swept Away!".
// *   **Dates & Times:**
//     *   "January 6-29" is in a dark box.
//     *   "Fridays & Saturdays at 8 pm"
//     *   "Sunday Matinees at 2 pm"
// *   **Ticket Info:**
//     *   "Tickets: $20 & $22"
//     *   "www.henegar.org"
//     *   Phone number: "723-8698"
// *   **Footer:** "Henegar Center for the Arts, Historic Downtown Melbourne" and "Presented by Special Arrangement with Music Theatre International, NY". There's also a small code "E114709" at the very bottom right.

// **3. Visual Style:**
// *   It's a newspaper ad, so the quality is grainy (halftone dots are visible).
// *   The background has a subtle plaid pattern (grey and white stripes) matching the "PLAID" theme.
// *   There are stars scattered around the title.

// **4. Structure of the Description:**
// *   Start with a high-level summary: It's a newspaper ad for a musical called "Forever Plaid".
// *   Describe the main visual element: The title logo.
// *   List the key details: Venue, dates, times, ticket prices, contact info.
// *   Mention the logos of the presenting organizations.
// *   Note the visual style (black and white, newspaper print).

// **Refining the description:**
// *   The image actually looks like it might be a composite of three identical crops stacked vertically? No, looking at the seams, it looks like one full ad at the top, and then zoomed-in crops below it. Let me re-examine.
// *   Actually, looking at the full image provided, it looks like a single vertical strip where the ad is shown fully at the top, and then below it are zoomed-in sections of the *same* ad.
//     *   **Top section:** Full ad visible.
//     *   **Middle section:** Zoomed in on the top part (Henegar logo, Red Carpet logo, top of "Forever").
//     *   **Bottom section:** Zoomed in on the middle/bottom part ("PLAID", dates, tickets, phone number).
//     *   Wait, let's look closer.
//     *   The top part shows the full ad.
//     *   The middle part shows the top logo area again but zoomed in.
//     *   The bottom part shows the title "Forever PLAID" and the dates/tickets again but zoomed in.
//     *   Actually, it looks like a single image that has been stitched together or is just a very long crop. Let's look at the edges.
//     *   Top image: Full ad.
//     *   Below that: A duplicate of the top logo area.
//     *   Below that: A duplicate of the title area.
//     *   Below that: A duplicate of the bottom info area.
//     *   It seems the user uploaded an image that is a vertical scroll of the same ad repeated or zoomed in.
//     *   Let's look at the "seams".
//     *   Seam 1: Below the first full ad. The next section starts with "The Henegar...". This is a zoomed-in version of the top left.
//     *   Seam 2: Below that. Shows "RED Carpet...". This is a
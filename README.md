# Learn AI Fundamentals

Short, hands-on docs and code snippets for learning the fundamentals of Large Language Models (LLMs) — written while building AI-integrated products. Everything here runs against the [Groq API](https://groq.com) (OpenAI-compatible), covering core chat features, tool/function calling, MCP, and multimodal capabilities (speech, OCR, reasoning).

## Repository Structure

```
Learn-Ai-Fundamentals/
├── Tools/
│   ├── toolsTheory.md         # Concept notes: tool calling workflow & request/response format
│   ├── builtIntools.js        # Function/tool calling with a model-defined tool (get_weather)
│   ├── mcpConnectors.js       # MCP tool calling via a hosted connector (Google Calendar)
│   ├── MCP.js                 # MCP tool calling via a remote MCP server (Hugging Face)
│   └── webSearch.js           # Built-in web search tool (browser_search) with groq/compound
│
├── coreFeature/
│   ├── chatGeneration/
│   │   ├── chatCompletion.js                  # Basic chat completion request
│   │   ├── chatWithStream.js                  # Streaming chat completion
│   │   └── chatWithStreamWithStopSequence.js   # Streaming with stop sequences
│   │
│   ├── contentModer_safeGuard/
│   │   └── contentModeration.js       # Prompt-injection / content moderation via policy prompt
│   │
│   ├── convert/
│   │   ├── speechToText.js            # Audio transcription (Whisper)
│   │   ├── textToSpeech.js            # Text-to-speech generation
│   │   └── orpheus-english.wav        # Sample TTS output
│   │
│   ├── prompt/
│   │   └── promptCaching.js           # Multi-turn conversation with prompt caching
│   │
│   └── reasonin&OCR/
│       ├── OCR.js                     # Image understanding / OCR with a vision model
│       └── reasoningModel.js          # Reasoning model example (step-by-step problem solving)
│
├── package.json
├── package-lock.json
└── .gitignore
```

## What's Covered

- **Chat generation** — basic completions, streaming, and stop sequences
- **Tool calling** — built-in tools, custom function calling, and the request → tool call → execution → response loop
- **MCP (Model Context Protocol)** — connecting to remote MCP servers and hosted connectors
- **Web search** — built-in browser search tool
- **Speech** — speech-to-text and text-to-speech
- **Vision / OCR** — image understanding
- **Reasoning models** — multi-step reasoning
- **Prompt caching** — reducing latency/cost on repeated system prompts
- **Content moderation** — guarding against prompt injection

## Getting Started

### Prerequisites

- Node.js (with ES modules support)
- A [Groq API key](https://console.groq.com)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/mohdfaizan091/Learn-Ai-Fundamentals.git
   cd Learn-Ai-Fundamentals
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your API key. Create a `.env` file in the root:
   ```
   GROQ_API_KEY=your_api_key_here
   ```

4. Run any example:
   ```bash
   node coreFeature/chatGeneration/chatCompletion.js
   ```
   Or explore other files directly, e.g.:
   ```bash
   node Tools/builtIntools.js
   node coreFeature/convert/textToSpeech.js
   ```

## Dependencies

- [`groq-sdk`](https://www.npmjs.com/package/groq-sdk) — Groq's official SDK
- [`openai`](https://www.npmjs.com/package/openai) — used for OpenAI-compatible endpoints (MCP, responses API)
- [`dotenv`](https://www.npmjs.com/package/dotenv) — environment variable management

## Notes

- Some files use relative `.env` paths (`../.env`) depending on their folder depth — check the `dotenv.config()` line in each file if you hit a "missing API key" error.
- `mcpConnectors.js` requires a valid OAuth token for the target connector (e.g. Google Calendar) to return real data.
- These are learning/reference snippets, not a packaged library — copy what you need into your own project.

## Author

**Mohd Faizan**
- GitHub: [@mohdfaizan091](https://github.com/mohdfaizan091)
- LinkedIn: [mohd-faizan](https://linkedin.com/in/mohd-faizan-27270732a/)
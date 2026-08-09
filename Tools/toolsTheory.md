# Tools in LLM

Tools LLM ko external resources ke sath interact karne dete hain.

## Workflow

```
Request to LLM (with tool definitions)
        ↓
LLM returns tool call request
        ↓
Tool execution → result returned to LLM
        ↓
Model evaluates result → final response
```

## 1. Tool Definition

Sample request body with tool definitions and messages:

```json
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  "messages": [
    {
      "role": "system",
      "content": "You are a weather assistant. Respond to the user question and use tools if needed to answer the query."
    },
    {
      "role": "user",
      "content": "What's the weather in San Francisco?"
    }
  ]
}
```

## 2. Model Returns Tool Call Request

```json
{
  "role": "assistant",
  "tool_calls": [
    {
      "id": "call_abc123",
      "type": "function",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\": \"San Francisco, CA\", \"unit\": \"fahrenheit\"}"
      }
    }
  ]
}
```

## 3. Tool Execution and Results

```json
{
  "role": "tool",
  "tool_call_id": "call_abc123",
  "name": "get_weather",
  "content": "{\"temperature\": 72, \"condition\": \"sunny\", \"unit\": \"fahrenheit\"}"
}
```

> `tool_call_id` must match the `id` from the assistant's `tool_calls`.

## 4. Model Evaluates Result

Model tool result ko evaluate karke decide karta hai next steps kya honge, aur final JSON output return karta hai.

## Models that Support Tool Execution

- `openai/gpt-oss-20b`
- `openai/gpt-oss-120b`
- `qwen/qwen3.6-27b` *(naam double-check kar lena, ye version thoda unusual lag raha hai)*

## Ways to Use Tools

| Method | Description |
|---|---|
| **Built-in tools** | LLM provider ke apne pre-built tools |
| **Remote tool calling (MCP)** | Model Context Protocol — external tools/servers se connect karne ka standard |
| **Local tool calling (function calling)** | Apne khud ke custom tools/functions implement karna — custom business logic ke liye |

## Parallel Tool Use

Kai models parallel tool use support karte hain — jaha ek hi request me multiple tools simultaneously call ho sakte hain (sequential round-trips ki jagah).
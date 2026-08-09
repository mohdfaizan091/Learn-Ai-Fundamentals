# Tools in LLM

Tools in LLM allow you to interact with external resources.

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

Model evaluates the results, decides the next steps, and returns a JSON output.

## Models that Support Tool Execution

* `openai/gpt-oss-20b`
* `openai/gpt-oss-120b`
* `qwen/qwen3.6-27b`

## Ways to Use Tools

| Method                                    | Description                                                                  |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| **Built-in tools**                        | LLM provider's own pre-built tools                                           |
| **Remote tool calling (MCP)**             | Model Context Protocol — a standard for connecting to external tools/servers |
| **Local tool calling (function calling)** | Implementing your own custom tools/functions — for custom business logic     |

## Parallel Tool Use

* Many models support parallel tool use, where multiple tools can be called simultaneously

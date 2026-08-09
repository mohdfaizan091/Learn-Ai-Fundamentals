 ## Tools in LLM will let yov interact with external resource.

## work flow
request to LLM with (tool definition) => return tool call request => tools execution and return to LLM => model evaluate result

## tool definition

1. 
// Sample request body with tool definitions and messages
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
          // JSON Schema object
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
  ],
}

2. Model Returns Tool Call Requests
- {
  "role": "assistant",
  "tool_calls": [{
    "id": "call_abc123",
    "type": "function",
    "function": {
      "name": "get_weather",
      "arguments": "{\"location\": \"San Francisco, CA\", \"unit\": \"fahrenheit\"}"
    }
  }]
}

3. Tool Execution and Results
- {
  "role": "tool",
  # must match the `id` from the assistant's `tool_calls`
  "tool_call_id": "call_abc123",
  "name": "get_weather",
  "content": "{\"temperature\": 72, \"condition\": \"sunny\", \"unit\": \"fahrenheit\"}"
}

4. Model Evaluates Results and Decides Next Steps.
- and return json output.

## Model that support tool execution
- openai/gpt-oss-20b
- openai/gpt-oss-120b
- qwen/qwen3.6-27b

## We can use tools in 3 ways
- built in tools of that LLM
- Remote tool calling MCP(Model Context Protocol) - Allow to connect with external tools
- Local tool Calling (function calling) - you can implemnt of your own tools or function. help in custom buisness logic 

## parallel tool use 
- many model support parallel tool use, where multiple tool can be called simultaneously
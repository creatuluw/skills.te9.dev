# Integration Patterns

## Table of Contents
- [AI SDK Integration (TypeScript/JavaScript)](#ai-sdk-integration-typescriptjavascript)
- [Direct REST API Calls](#direct-rest-api-calls)
- [Python Integration](#python-integration)
- [Server-Side Proxy Pattern](#server-side-proxy-pattern)
- [Streaming Patterns](#streaming-patterns)
- [Usage Tracking](#usage-tracking)
- [Error Handling & Quota Management](#error-handling--quota-management)
- [Desktop App Patterns (Electron/Tauri)](#desktop-app-patterns-electrontauri)

## AI SDK Integration (TypeScript/JavaScript)

The [Vercel AI SDK](https://sdk.vercel.ai/) provides the cleanest integration path. Each model group uses a different SDK package.

### OpenAI-Compatible Models (GLM, Kimi, DeepSeek, MiMo)

```typescript
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const opencode = createOpenAICompatible({
  name: 'opencode-go',
  baseURL: 'https://opencode.ai/zen/go/v1',
  headers: {
    Authorization: `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
  },
});

// Use a model
const model = opencode('kimi-k2.6');
```

### Anthropic-Compatible Models (MiniMax)

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.OPENCODE_GO_API_KEY,
  baseURL: 'https://opencode.ai/zen/go/v1',
});

const response = await client.messages.create({
  model: 'minimax-m2.7',
  max_tokens: 4096,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

### Alibaba-Compatible Models (Qwen)

```typescript
import { createAlibaba } from '@ai-sdk/alibaba';

const alibaba = createAlibaba({
  baseURL: 'https://opencode.ai/zen/go/v1',
  apiKey: process.env.OPENCODE_GO_API_KEY,
});

const model = alibaba('qwen3.6-plus');
```

### Using with AI SDK Core (generateText / streamText)

```typescript
import { generateText, streamText } from 'ai';

// Non-streaming
const { text } = await generateText({
  model: opencode('deepseek-v4-pro'),
  prompt: 'Explain quantum computing in one paragraph.',
});

// Streaming
const result = streamText({
  model: opencode('deepseek-v4-flash'),
  prompt: 'Write a haiku about coding.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

### React/Next.js Chat Hook

```typescript
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat', // your server-side route
  });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} disabled={isLoading} />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}
```

### Next.js API Route (Server-Side Proxy)

```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const opencode = createOpenAICompatible({
  name: 'opencode-go',
  baseURL: 'https://opencode.ai/zen/go/v1',
  headers: {
    Authorization: `Bearer ${process.env.OPENCODE_GO_API_KEY!}`,
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: opencode('deepseek-v4-flash'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

## Direct REST API Calls

For frameworks or environments where the AI SDK is not suitable.

### fetch (Browser/Node)

```typescript
async function chatCompletion(
  messages: Array<{ role: string; content: string }>,
  model: string = 'deepseek-v4-flash'
) {
  const response = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
```

### Streaming with fetch (SSE)

```typescript
async function streamChat(
  messages: Array<{ role: string; content: string }>,
  model: string = 'deepseek-v4-flash',
  onChunk: (text: string) => void
) {
  const response = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));

    for (const line of lines) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      const parsed = JSON.parse(data);
      const content = parsed.choices?.[0]?.delta?.content;
      if (content) onChunk(content);
    }
  }
}
```

## Python Integration

### Using openai SDK

```python
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["OPENCODE_GO_API_KEY"],
    base_url="https://opencode.ai/zen/go/v1",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"},
    ],
)
print(response.choices[0].message.content)
```

### Streaming in Python

```python
stream = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Write a poem"}],
    stream=True,
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

### Using anthropic SDK (for MiniMax models)

```python
import anthropic

client = anthropic.Anthropic(
    api_key=os.environ["OPENCODE_GO_API_KEY"],
    base_url="https://opencode.ai/zen/go/v1",
)

message = client.messages.create(
    model="minimax-m2.7",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Hello!"}],
)
print(message.content[0].text)
```

## Server-Side Proxy Pattern

**Always use a server-side proxy in production web apps** to protect the API key.

### Architecture
```
Browser -> Your API Route (/api/chat) -> OpenCode Go API
              |
              +-- API key lives here (server env var)
              +-- Optional: rate limiting, usage tracking, auth
```

### Express.js Proxy

```typescript
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages, model = 'deepseek-v4-flash' } = req.body;

  const response = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(decoder.decode(value));
  }

  res.end();
});
```

## Streaming Patterns

### React with Streaming

```typescript
'use client';
import { useState, useRef } from 'react';

export function StreamingChat() {
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handleSubmit(prompt: string) {
    setIsStreaming(true);
    setResponse('');
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          model: 'deepseek-v4-flash',
          stream: true,
        }),
        signal: abortRef.current.signal,
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResponse((prev) => prev + decoder.decode(value));
      }
    } finally {
      setIsStreaming(false);
    }
  }

  function handleCancel() {
    abortRef.current?.abort();
    setIsStreaming(false);
  }

  return (
    <div>
      <pre>{response}</pre>
      {isStreaming && <button onClick={handleCancel}>Stop</button>}
    </div>
  );
}
```

## Usage Tracking

Track estimated usage client-side to avoid hitting quotas unexpectedly.

### Usage Tracker Utility

```typescript
interface UsageEstimate {
  window5h: number;   // dollars spent in current 5h window
  windowWeek: number; // dollars spent in current weekly window
  windowMonth: number;// dollars spent in current monthly window
}

const QUOTA_LIMITS = {
  window5h: 12,
  windowWeek: 30,
  windowMonth: 60,
};

// Rough cost estimates per 1K tokens (based on average patterns)
// These are approximate - adjust based on actual billing
const COST_PER_1K_TOKENS: Record<string, { input: number; output: number }> = {
  'glm-5.1':      { input: 0.002, output: 0.008 },
  'glm-5':        { input: 0.0015, output: 0.006 },
  'kimi-k2.5':    { input: 0.001, output: 0.004 },
  'kimi-k2.6':    { input: 0.0015, output: 0.006 },
  'deepseek-v4-pro':   { input: 0.001, output: 0.004 },
  'deepseek-v4-flash': { input: 0.0001, output: 0.0004 },
  'qwen3.5-plus': { input: 0.0003, output: 0.0012 },
  'qwen3.6-plus': { input: 0.001, output: 0.004 },
  'minimax-m2.7': { input: 0.001, output: 0.004 },
  'minimax-m2.5': { input: 0.0005, output: 0.002 },
  'mimo-v2.5':    { input: 0.001, output: 0.004 },
  'mimo-v2.5-pro':{ input: 0.0015, output: 0.006 },
};

class UsageTracker {
  private usage: UsageEstimate = { window5h: 0, windowWeek: 0, windowMonth: 0 };
  private requests: Array<{ timestamp: number; cost: number }> = [];

  recordUsage(model: string, inputTokens: number, outputTokens: number) {
    const costs = COST_PER_1K_TOKENS[model] || { input: 0.001, output: 0.004 };
    const cost = (inputTokens / 1000) * costs.input + (outputTokens / 1000) * costs.output;

    this.requests.push({ timestamp: Date.now(), cost });
    this.recalculate();
  }

  private recalculate() {
    const now = Date.now();
    const fiveHours = 5 * 60 * 60 * 1000;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    this.usage.window5h = this.sumSince(now - fiveHours);
    this.usage.windowWeek = this.sumSince(now - oneWeek);
    this.usage.windowMonth = this.sumSince(now - oneMonth);
  }

  private sumSince(since: number): number {
    return this.requests
      .filter((r) => r.timestamp >= since)
      .reduce((sum, r) => sum + r.cost, 0);
  }

  getUsage(): UsageEstimate { return this.usage; }

  getRemainingQuota(): UsageEstimate {
    return {
      window5h: QUOTA_LIMITS.window5h - this.usage.window5h,
      windowWeek: QUOTA_LIMITS.windowWeek - this.usage.windowWeek,
      windowMonth: QUOTA_LIMITS.windowMonth - this.usage.windowMonth,
    };
  }

  isQuotaLow(): boolean {
    const remaining = this.getRemainingQuota();
    return remaining.window5h < 1 || remaining.windowWeek < 3 || remaining.windowMonth < 5;
  }
}
```

### React Hook for Usage

```typescript
import { useContext, createContext, useState, useCallback } from 'react';

const UsageContext = createContext(new UsageTracker());

export function useLLMUsage() {
  const tracker = useContext(UsageContext);
  const [, forceUpdate] = useState(0);

  const recordUsage = useCallback((model: string, inputTokens: number, outputTokens: number) => {
    tracker.recordUsage(model, inputTokens, outputTokens);
    forceUpdate((n) => n + 1);
  }, [tracker]);

  return {
    usage: tracker.getUsage(),
    remaining: tracker.getRemainingQuota(),
    isLow: tracker.isQuotaLow(),
    recordUsage,
  };
}
```

## Error Handling & Quota Management

### Robust Error Handler

```typescript
async function callWithFallback(
  messages: Array<{ role: string; content: string }>,
  models: string[] = ['deepseek-v4-pro', 'deepseek-v4-flash', 'qwen3.5-plus']
): Promise<string> {
  for (const model of models) {
    try {
      const response = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
        },
        body: JSON.stringify({ model, messages }),
      });

      if (response.status === 429) {
        console.warn(`Rate limited on ${model}, trying next...`);
        continue;
      }

      if (!response.ok) {
        console.warn(`Error ${response.status} on ${model}, trying next...`);
        continue;
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.warn(`Failed on ${model}:`, err);
      continue;
    }
  }

  throw new Error('All models exhausted. Quota may be depleted. Try again later.');
}
```

### Retry with Exponential Backoff

```typescript
async function callWithRetry(
  messages: Array<{ role: string; content: string }>,
  model: string = 'deepseek-v4-flash',
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
        },
        body: JSON.stringify({ model, messages }),
      });

      if (response.status === 429) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }
  throw new Error('Max retries exceeded');
}
```

## Desktop App Patterns (Electron/Tauri)

### Electron: Server-Side in Main Process

```typescript
// main.ts (Electron main process)
import { ipcMain } from 'electron';

ipcMain.handle('llm:chat', async (_event, messages, model = 'deepseek-v4-flash') => {
  const response = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENCODE_GO_API_KEY}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
});

// renderer.ts (Electron renderer)
const result = await window.electron.ipcRenderer.invoke('llm:chat', [
  { role: 'user', content: 'Hello!' }
]);
```

### Tauri: Rust Backend Proxy

```rust
// src-tauri/src/main.rs
use reqwest;
use serde_json::json;

#[tauri::command]
async fn chat(messages: Vec<serde_json::Value>, model: String) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let api_key = std::env::var("OPENCODE_GO_API_KEY").map_err(|e| e.to_string())?;

    let resp = client
        .post("https://opencode.ai/zen/go/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&json!({
            "model": model,
            "messages": messages,
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let data: serde_json::Value = resp.json().await.map_err(|e| e.to_string())?;
    Ok(data)
}
```

### Tauri: TypeScript Frontend

```typescript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke('chat', {
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'deepseek-v4-flash',
});
```

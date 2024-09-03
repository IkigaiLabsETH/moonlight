To set up and use the Vercel AI SDK 3.3, follow these steps:

### 1. Install the SDK
First, install the Vercel AI SDK in your project:
```bash
npm install @vercel/ai
```

### 2. Enable Tracing with OpenTelemetry
To enable tracing, create an `instrumentation.ts` file and register OpenTelemetry:
```typescript:instrumentation.ts
import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel({ serviceName: 'your-project-name' });
}
```
Enable tracing in your function calls:
```typescript
const result = await generateText({
  model: anthropic('claude-3-5-sonnet-20240620'),
  prompt: 'Write a short story about a cat.',
  experimental_telemetry: { 
    isEnabled: true,
    functionId: 'my-awesome-function',
    metadata: {
      something: 'custom',
      someOtherThing: 'other-value',
    },
  },
});
```

### 3. Use Multi-Modal File Attachments
To send file attachments with `useChat`, use the `experimental_attachments` option:
```typescript
const { input, handleSubmit, handleInputChange } = useChat();
const [files, setFiles] = useState<FileList | undefined>(undefined);

return (
  <form onSubmit={(event) => handleSubmit(event, { experimental_attachments: files })}>
    <input type="file" onChange={(event) => setFiles(event.target.files)} multiple />
    <input type="text" value={input} onChange={handleInputChange} />
  </form>
);
```

### 4. Stream Structured Objects with `useObject`
To stream structured objects, define a schema and use the `useObject` hook:
```typescript:app/api/expense/schema.ts
import { z } from 'zod';

export const expenseSchema = z.object({
  expense: z.object({
    category: z.string().describe('Category of the expense.'),
    amount: z.number().describe('Amount of the expense in USD.'),
    date: z.string().describe('Date of the expense.'),
    details: z.string().describe('Details of the expense.'),
  }),
});

export type PartialExpense = DeepPartial<typeof expenseSchema>['expense'];
export type Expense = z.infer<typeof expenseSchema>['expense'];
```
```typescript:app/api/expense/route.ts
import { anthropic } from '@ai-sdk/anthropic';
import { streamObject } from 'ai';
import { expenseSchema } from './schema';

export async function POST(req: Request) {
  const { expense }: { expense: string } = await req.json();
  const result = await streamObject({
    model: anthropic('claude-3-5-sonnet-20240620'),
    prompt: `Please categorize the following expense: "${expense}"`,
    schema: expenseSchema,
    onFinish({ object }) {
      // Save the expense to a database here
    },
  });
  return result.toTextStreamResponse();
}
```
```typescript:app/expense-tracker/page.tsx
'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { Expense, expenseSchema, PartialExpense } from '../api/expense/schema';
import { useState } from 'react';

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { submit, isLoading, object } = useObject({
    api: '/api/expense',
    schema: expenseSchema,
    onFinish({ object }) {
      if (object != null) {
        setExpenses(prev => [object.expense, ...prev]);
      }
    },
  });

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        const input = e.currentTarget.expense as HTMLInputElement;
        if (input.value.trim()) {
          submit({ expense: input.value });
          e.currentTarget.reset();
        }
      }}>
        <input type="text" name="expense" placeholder="Enter expense details"/>
        <button type="submit" disabled={isLoading}>Log expense</button>
      </form>
      {isLoading && object?.expense && <ExpenseView expense={object.expense} />}
      {expenses.map((expense, index) => <ExpenseView key={index} expense={expense} />)}
    </div>
  );
}

const ExpenseView = ({ expense }: { expense: PartialExpense | Expense }) => (
  <div>
    <div>{expense?.date ?? ''}</div>
    <div>${expense?.amount?.toFixed(2) ?? ''}</div>
    <div>{expense?.category ?? ''}</div>
    <div>{expense?.details ?? ''}</div>
  </div>
);
```

### 5. Additional LLM Settings
You can now use JSON schemas, stop sequences, and custom headers in your AI SDK functions:
```typescript
const result = await generateText({
  model: anthropic('claude-3-5-sonnet-20240620'),
  prompt: 'Write a short story about a cat.',
  stopSequences: ['\n'],
  headers: { 'X-Custom-Header': 'value' },
});
```

For more details, visit the [Vercel AI SDK 3.3 blog post](https://vercel.com/blog/vercel-ai-sdk-3-3-3OnRtxG6a0rwvcJVu3qADv).
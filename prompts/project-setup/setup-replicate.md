Sure! Here are the instructions for building a Next.js web application that uses Replicate to run a machine learning model, based on the guide from [Replicate's documentation](https://replicate.com/docs/get-started/nextjs):

## Prerequisites

1. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
2. **Replicate Account**: Sign up at [Replicate](https://replicate.com/).
3. **GitHub Account**: Sign up at [GitHub](https://github.com/).
4. **Vercel Account**: Sign up at [Vercel](https://vercel.com/).

## Step 1: Create the App

Run the following command to create a new Next.js app:

```bash
npx create-next-app@latest --js --eslint
```

## Step 2: Run the App Locally

Navigate to your project directory and start the development server:

```bash
cd my-app
npm run dev
```

Visit `localhost:3000` in your browser to see the starter app.

## Step 3: Configure Your Environment

Generate an API token at [Replicate](https://replicate.com/account/api-tokens) and add it to a `.env.local` file in your project root:

```bash
touch .env.local
```

Add the following line to `.env.local`:

```env
REPLICATE_API_TOKEN=your_api_token_here
```

## Step 4: Build the Backend

Create a directory for API endpoints:

```bash
mkdir -p app/api/predictions
```

Create `app/api/predictions/route.js` with the following content:

```javascript:app/api/predictions/route.js
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export async function POST(request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('The REPLICATE_API_TOKEN environment variable is not set.');
  }

  const { prompt } = await request.json();
  const options = {
    version: '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
    input: { prompt }
  };

  if (WEBHOOK_HOST) {
    options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
    options.webhook_events_filter = ["start", "completed"];
  }

  const prediction = await replicate.predictions.create(options);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
}
```

Create `app/api/predictions/[id]/route.js` with the following content:

```javascript:app/api/predictions/[id]/route.js
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(request, { params }) {
  const { id } = params;
  const prediction = await replicate.predictions.get(id);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction);
}
```

## Step 5: Build the Frontend

Replace the content of `app/page.js` with the following:

```javascript:app/page.js
'use client';

import { useState } from "react";
import Image from "next/image";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-5">
      <h1 className="py-6 text-center font-bold text-2xl">
        Dream something with{" "}
        <a href="https://replicate.com/stability-ai/sdxl?utm_source=project&utm_project=getting-started">
          SDXL
        </a>
      </h1>

      <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow"
          name="prompt"
          placeholder="Enter a prompt to display an image"
        />
        <button className="button" type="submit">
          Go!
        </button>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <>
          {prediction.output && (
            <div className="image-wrapper mt-5">
              <Image
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
                height={768}
                width={768}
              />
            </div>
          )}
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
        </>
      )}
    </div>
  );
}
```

## Step 6: Add Basic Styles

Replace the content of `app/globals.css` with the following:

```css:app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

.container {
  padding: 2rem;
  font-size: 1.3rem;
  max-width: 48rem;
  margin: 0 auto;
}

form {
  display: flex;
  margin-bottom: 2rem;
}

form input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
  font-size: 1.3rem;
  margin-right: 1rem;
}

form button {
  padding: 1rem;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.3rem;
}

.imageWrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
}
```

## Step 7: Configure Image Hosts

Edit `next.config.js` to allow external images from `replicate.com` and `replicate.delivery`:

```javascript:next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
```

## Step 8: Create a Prediction

Visit `localhost:3000`, enter a prompt, and see the results.

## Step 9: Publish to GitHub

Commit your changes and push to a new GitHub repository:

```bash
git add .
git commit -m "First working version! 🎉"
gh repo create my-replicate-app --public --push --source=.
```

## Step 10: Deploy to Vercel

Deploy your app to Vercel:

```bash
npx vercel
```

Add your API token to Vercel's environment variables:

```bash
npx vercel env add REPLICATE_API_TOKEN
```

Deploy again:

```bash
npx vercel deploy --prod
```

## Next Steps

Explore further enhancements like integrating other models, fine-tuning models, or adding webhooks.

For more details, refer to the [Replicate documentation](https://replicate.com/docs/get-started/nextjs).
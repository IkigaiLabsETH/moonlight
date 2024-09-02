``````markdown:prompts/project-setup/setup-dune.md

# Dune Setup Instructions

Use this guide to set up Dune for this project.

It uses Dune for DeFi data functionalities.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the Dune setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [Dune](https://dune.com/)
- [Dune Docs](https://docs.dune.com/api-reference/markets/endpoint/marketplace_marketshare)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
DUNE_API_KEY=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i axios
```

## Setup Steps

- Create a `lib/dune.ts` file with the following code:

```ts
import axios from "axios";

const apiKey = process.env.DUNE_API_KEY;
const baseURL = "https://api.dune.com/v1";

export const dune = axios.create({
  baseURL,
  headers: {
    "X-Dune-Api-Key": apiKey,
  },
});

export const getMarketShare = async (market: string, chain: string) => {
  try {
    const response = await dune.get(`/marketshare/${market}/${chain}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Dune:", error);
    throw error;
  }
};
```

- Create a `components/DuneProvider.tsx` file with the following code:

```tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getMarketShare } from "../lib/dune";

const DuneContext = createContext(null);

export const useDune = () => useContext(DuneContext);

const DuneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMarketShare("nft", "ethereum");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <DuneContext.Provider value={data}>
      {children}
    </DuneContext.Provider>
  );
};

export default DuneProvider;
```

- Wrap your application with the `DuneProvider` in `pages/_app.tsx`:

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import DuneProvider from "../components/DuneProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DuneProvider>
      <Component {...pageProps} />
    </DuneProvider>
  );
}

export default MyApp;
```

- Create a `pages/api/dune/[market]/[chain].ts` file with the following code:

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { getMarketShare } from "../../../../lib/dune";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { market, chain } = req.query;

  try {
    const data = await getMarketShare(market as string, chain as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

- The Dune system is now set up.
``````

This guide provides a comprehensive setup for integrating Dune into your project, ensuring you have all the necessary steps and code snippets to get started. For more detailed information, refer to the [Dune Docs](https://docs.dune.com/api-reference/markets/endpoint/marketplace_marketshare).
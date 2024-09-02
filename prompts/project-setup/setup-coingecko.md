``````markdown:prompts/project-setup/setup-coingecko.md

# CoinGecko Setup Instructions

Use this guide to set up CoinGecko for this project.

It uses CoinGecko for general market data, price, market cap, volume, circulating supply, etc.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the CoinGecko setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [CoinGecko](https://www.coingecko.com/)
- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
COINGECKO_API_KEY=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i axios
```

## Setup Steps

- Create a `lib/coingecko.ts` file with the following code:

```ts
import axios from "axios";

const apiKey = process.env.COINGECKO_API_KEY;
const baseURL = "https://api.coingecko.com/api/v3";

export const coingecko = axios.create({
  baseURL,
  headers: {
    "Authorization": `Bearer ${apiKey}`,
  },
});

export const getMarketData = async (id: string) => {
  try {
    const response = await coingecko.get(`/coins/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    throw error;
  }
};
```

- Create a `components/CoinGeckoProvider.tsx` file with the following code:

```tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getMarketData } from "../lib/coingecko";

const CoinGeckoContext = createContext(null);

export const useCoinGecko = () => useContext(CoinGeckoContext);

const CoinGeckoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMarketData("bitcoin");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <CoinGeckoContext.Provider value={data}>
      {children}
    </CoinGeckoContext.Provider>
  );
};

export default CoinGeckoProvider;
```

- Wrap your application with the `CoinGeckoProvider` in `pages/_app.tsx`:

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import CoinGeckoProvider from "../components/CoinGeckoProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoinGeckoProvider>
      <Component {...pageProps} />
    </CoinGeckoProvider>
  );
}

export default MyApp;
```

- Create a `pages/api/coingecko/[id].ts` file with the following code:

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { getMarketData } from "../../../lib/coingecko";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const data = await getMarketData(id as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

- The CoinGecko system is now set up.
``````

This guide provides a comprehensive setup for integrating CoinGecko into your project, ensuring you have all the necessary steps and code snippets to get started. For more detailed information, refer to the [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation).
``````

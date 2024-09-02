
# DefiLlama Setup Instructions

Use this guide to set up DefiLlama for this project.

It uses DefiLlama for DeFi data functionalities.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the DefiLlama setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [DefiLlama](https://defillama.com/)
- [DefiLlama Docs](https://defillama.com/docs/api)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
DEFILLAMA_API_KEY=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i axios
```

## Setup Steps

- Create a `lib/defillama.ts` file with the following code:

```ts
import axios from "axios";

const apiKey = process.env.DEFILLAMA_API_KEY;
const baseURL = "https://api.llama.fi";

export const defillama = axios.create({
  baseURL,
  headers: {
    "Authorization": `Bearer ${apiKey}`,
  },
});

export const getDefiData = async (endpoint: string) => {
  try {
    const response = await defillama.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from DefiLlama:", error);
    throw error;
  }
};
```

- Create a `components/DefiLlamaProvider.tsx` file with the following code:

```tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getDefiData } from "../lib/defillama";

const DefiLlamaContext = createContext(null);

export const useDefiLlama = () => useContext(DefiLlamaContext);

const DefiLlamaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDefiData("/protocols");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <DefiLlamaContext.Provider value={data}>
      {children}
    </DefiLlamaContext.Provider>
  );
};

export default DefiLlamaProvider;
```

- Wrap your application with the `DefiLlamaProvider` in `pages/_app.tsx`:

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefiLlamaProvider from "../components/DefiLlamaProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefiLlamaProvider>
      <Component {...pageProps} />
    </DefiLlamaProvider>
  );
}

export default MyApp;
```

- Create a `pages/api/defillama/[endpoint].ts` file with the following code:

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { getDefiData } from "../../../lib/defillama";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { endpoint } = req.query;

  try {
    const data = await getDefiData(`/${endpoint}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

- The DefiLlama system is now set up.
``````

This guide provides a comprehensive setup for integrating DefiLlama into your project, ensuring you have all the necessary steps and code snippets to get started. For more detailed information, refer to the [DefiLlama Docs](https://defillama.com/docs/api).
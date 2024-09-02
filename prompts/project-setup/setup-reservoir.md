`````````markdown:prompts/project-setup/setup-reservoir.md

# Reservoir Setup Instructions

Use this guide to set up Reservoir for this project.

It uses Reservoir for NFT data functionalities.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the Reservoir setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [Reservoir](https://reservoir.tools/)
- [Reservoir API Docs](https://docs.reservoir.tools/)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
RESERVOIR_API_KEY=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i axios
```

## Setup Steps

- Create a `lib/reservoir.ts` file with the following code:

```typescript:lib/reservoir.ts
import axios from "axios";

const apiKey = process.env.RESERVOIR_API_KEY;
const baseURL = "https://api.reservoir.tools";

export const reservoir = axios.create({
  baseURL,
  headers: {
    "Authorization": `Bearer ${apiKey}`,
  },
});

export const getNFTData = async (contract: string, tokenId: string) => {
  try {
    const response = await reservoir.get(`/tokens/${contract}:${tokenId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Reservoir:", error);
    throw error;
  }
};
```

- Create a `components/ReservoirProvider.tsx` file with the following code:

```typescript:components/ReservoirProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getNFTData } from "../lib/reservoir";

const ReservoirContext = createContext(null);

export const useReservoir = () => useContext(ReservoirContext);

const ReservoirProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNFTData("0x...", "1");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <ReservoirContext.Provider value={data}>
      {children}
    </ReservoirContext.Provider>
  );
};

export default ReservoirProvider;
```

- Wrap your application with the `ReservoirProvider` in `pages/_app.tsx`:

```typescript:pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ReservoirProvider from "../components/ReservoirProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReservoirProvider>
      <Component {...pageProps} />
    </ReservoirProvider>
  );
}

export default MyApp;
```

- Create a `pages/api/reservoir/[contract]/[tokenId].ts` file with the following code:

```typescript:pages/api/reservoir/[contract]/[tokenId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getNFTData } from "../../../../lib/reservoir";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contract, tokenId } = req.query;

  try {
    const data = await getNFTData(contract as string, tokenId as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

- The Reservoir system is now set up.
```

This guide provides a comprehensive setup for integrating Reservoir into your project, ensuring you have all the necessary steps and code snippets to get started. For more detailed information, refer to the [Reservoir API Docs](https://docs.reservoir.tools/).
````````
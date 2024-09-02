
# Thirdweb Setup Instructions

Use this guide to set up Thirdweb for this project.

It uses Thirdweb for web3 functionalities.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the Thirdweb setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [Thirdweb](https://thirdweb.com/)
- [Thirdweb Docs](https://portal.thirdweb.com/)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
THIRDWEB_AUTH_PRIVATE_KEY=
NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=
NEXT_PUBLIC_THIRDWEB_API_KEY=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i @thirdweb-dev/sdk @thirdweb-dev/react
```

## Setup Steps

- Create a `lib/thirdweb.ts` file with the following code:

```ts
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const sdk = new ThirdwebSDK("mainnet", {
  secretKey: process.env.THIRDWEB_AUTH_PRIVATE_KEY,
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY,
});
```

- Create a `components/ThirdwebProvider.tsx` file with the following code:

```tsx
import { ThirdwebProvider as Provider, ChainId } from "@thirdweb-dev/react";
import React from "react";

const ThirdwebProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider desiredChainId={ChainId.Mainnet}>
      {children}
    </Provider>
  );
};

export default ThirdwebProvider;
```

- Wrap your application with the `ThirdwebProvider` in `pages/_app.tsx`:

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThirdwebProvider from "../components/ThirdwebProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
```

- Create a `pages/api/auth/[...thirdweb].ts` file with the following code:

```ts
import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { sdk } from "../../../lib/thirdweb";

export default ThirdwebAuth({
  sdk,
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN,
});
```

- Create a `pages/api/auth/login.ts` file with the following code:

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { sdk } from "../../../lib/thirdweb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, signature } = req.body;

  try {
    const token = await sdk.auth.login(address, signature);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

- Create a `pages/api/auth/logout.ts` file with the following code:

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { sdk } from "../../../lib/thirdweb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  try {
    await sdk.auth.logout(token);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

- The Thirdweb system is now set up.
`````

This guide provides a comprehensive setup for integrating Thirdweb into your project, ensuring you have all the necessary steps and code snippets to get started. For more detailed information, refer to the [Thirdweb Docs](https://portal.thirdweb.com/).
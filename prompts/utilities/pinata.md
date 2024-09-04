Sure, here are the instructions for setting up Pinata in a Next.js application based on the [Pinata documentation](https://docs.pinata.cloud/frameworks/next-js):

## Setting Up Pinata in a Next.js Application

### 1. Create an API Key and Get Gateway URL

1. Visit the [Keys Page](https://app.pinata.cloud/keys) on Pinata.
2. Click the “New Key” button in the top right.
3. Select the privileges for your key (Admin or scoped).
4. Name your key and click "Create Key".
5. Copy the **API Key**, **API Secret**, and **JWT**. Save them securely.
6. Visit the [Gateways Page](https://app.pinata.cloud/gateways) to get your Gateway domain.

### 2. Start a Next.js Project

1. Create a new Next.js project:
    ```bash
    npx create-next-app@latest
    ```
2. Navigate into the project directory:
    ```bash
    cd your-project-name
    ```
3. Install the Pinata SDK:
    ```bash
    npm install pinata
    ```

### 3. Setup Environment Variables

1. Create a `.env.local` file in the root of your project.
2. Add the following variables:
    ```
    PINATA_JWT=your_pinata_jwt
    NEXT_PUBLIC_GATEWAY_URL=your_gateway_url
    ```

### 4. Configure Pinata SDK

1. Create a `utils` directory in the root of your project.
2. Inside `utils`, create a `config.ts` file.
3. Add the following code to `config.ts`:
    ```typescript
    import { PinataSDK } from "pinata";

    export const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT,
      pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL
    });
    ```

### 5. Create Client-Side Upload Form

1. In the `app` directory, open `page.tsx`.
2. Replace the boilerplate code with the following:
    ```typescript:app/page.tsx
    "use client";

    import { useState, useRef } from "react";

    export default function Home() {
      const [file, setFile] = useState("");
      const [url, setUrl] = useState("");
      const [uploading, setUploading] = useState(false);
      const inputFile = useRef(null);

      const uploadFile = async () => {
        try {
          setUploading(true);
          const data = new FormData();
          data.set("file", file);
          const uploadRequest = await fetch("/api/files", {
            method: "POST",
            body: data,
          });
          const signedUrl = await uploadRequest.json();
          setUrl(signedUrl);
          setUploading(false);
        } catch (e) {
          console.log(e);
          setUploading(false);
          alert("Trouble uploading file");
        }
      };

      const handleChange = (e) => {
        setFile(e.target.files[0]);
      };

      return (
        <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
          <input type="file" id="file" ref={inputFile} onChange={handleChange} />
          <button disabled={uploading} onClick={uploadFile}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {url && <img src={url} alt="Image from Pinata" />}
        </main>
      );
    }
    ```

### 6. Create API Route for File Upload

1. Create a new file at `app/api/files/route.ts`.
2. Add the following code to handle file uploads:
    ```typescript:app/api/files/route.ts
    import { NextResponse, NextRequest } from "next/server";
    import { pinata } from "@/utils/config";

    export const config = {
      api: {
        bodyParser: false,
      },
    };

    export async function POST(request: NextRequest) {
      try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file);
        const url = await pinata.gateways.createSignedURL({
          cid: uploadData.cid,
          expires: 3600,
        });
        return NextResponse.json(url, { status: 200 });
      } catch (e) {
        console.log(e);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
    ```

### 7. Display Uploaded Image

1. Update the `page.tsx` file to display the uploaded image:
    ```typescript:app/page.tsx
    return (
      <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
        <input type="file" id="file" ref={inputFile} onChange={handleChange} />
        <button disabled={uploading} onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {url && <img src={url} alt="Image from Pinata" />}
      </main>
    );
    ```

By following these steps, you will have a Next.js application integrated with Pinata for uploading and displaying files. For more details, refer to the [Pinata documentation](https://docs.pinata.cloud/frameworks/next-js).
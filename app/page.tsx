"use client"; // Add this line to mark the component as a Client Component

import { useRouter } from 'next/navigation'; // Update the import

export default function Tokens() {
  const router = useRouter(); // Initialize router

  const handleRedirect = () => {
    router.push('/tokens'); // Adjust the path as necessary
  };

  return (
    <main className="bg-black h-screen"> {/* Set background to black and full height */}
      <div className="m-auto flex flex-col items-center justify-center h-full"> {/* Center the button vertically and horizontally */}
        <div className="max-w-screen-2xl m-auto py-5 md:py-10 lg:py-20">
          <video className="w-full max-w-[480px]" controls> {/* Center video with max width 480px */}
            <source src="/meteora.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleRedirect} className="mt-4 p-6 bg-yellow-500 text-black rounded text-2xl text-center"> {/* Rename button and center it */}
            Explore 8 Cult Coins by Degen Vibes LLC
          </button>
          <video className="w-full max-w-[480px] mt-4" controls> {/* Second video with max width 480px */}
            <source src="/meteora_.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
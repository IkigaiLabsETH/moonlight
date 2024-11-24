"use client"; // Add this line to mark the component as a Client Component

import { useRouter } from 'next/navigation'; // Update the import

export default function Tokens() {
  const router = useRouter(); // Initialize router

  const videoSources = [
    '/METEORA_1.mp4',
    '/METEORA_2.mp4',
    '/METEORA_3.mp4',
    '/METEORA_4.mp4',
    '/METEORA_5.mp4',
    '/METEORA_6.mp4',
    '/METEORA_7.mp4',
    '/METEORA_8.mp4',
    '/METEORA_9.mp4',
    '/METEORA_10.mp4',
    '/METEORA_11.mp4',
    '/METEORA_12.mp4',
  ];

  const getRandomVideos = () => {
    const shuffled = videoSources.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 2); // Return the first two videos
  };

  const [video1, video2] = getRandomVideos(); // Get two random videos

  const handleRedirect = () => {
    router.push('/tokens'); // Adjust the path as necessary
  };

  return (
    <main className="bg-black h-screen"> {/* Set background to black and full height */}
      <div className="m-auto flex flex-col items-center justify-center h-full"> {/* Center the button vertically and horizontally */}
        <h1 className="text-5xl text-yellow mb-6 mt-14">AICOINS WIF PICTURES</h1> {/* Add title with big font */}
        <div className="max-w-screen-2xl m-auto py-5 md:py-10 lg:py-20">
          <video className="w-full max-w-[480px]" controls> {/* Center video with max width 480px */}
            <source src={video1} type="video/mp4" /> {/* Use random video 1 */}
            Your browser does not support the video tag.
          </video>
          <button onClick={handleRedirect} className="mt-4 p-6 bg-yellow-500 text-black rounded text-2xl text-center"> {/* Rename button and center it */}
            Explore 8 Cult Coins by Degen Vibes LLC
          </button>
          <video className="w-full max-w-[480px] mt-4" controls> {/* Second video with max width 480px */}
            <source src={video2} type="video/mp4" /> {/* Use random video 2 */}
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}

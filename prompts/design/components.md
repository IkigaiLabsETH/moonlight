@tailwind components;

@layer components {
  .tab {
    @apply text-lg text-black bg-white border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-2;
  }

  .tab.inactive {
    @apply border-black hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all hover:text-red;
  }

  .tab.active {
    @apply border-white hover:text-yellow text-yellow bg-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-[10px];
  }
}
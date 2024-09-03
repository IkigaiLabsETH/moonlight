@tailwind base;

@layer base {
  body {
    font-family: 'satoshi';
    @apply text-white bg-neutral-900;
  }

  h1, h2, h3, h4 {
    @apply font-bold leading-none mb-4 tracking-tighter text-yellow;
    font-family: 'epilogue';
  }

  h1 {
    @apply text-5xl;
  }
  
  h2 {
    @apply text-5xl;
  }

  p {
    font-family: 'satoshi';
    margin-bottom: 1.5rem;
  }

  a {
    @apply transition-colors;
  }

  a:hover {
    @apply text-yellow;
  }

  .boska {
    font-family: 'boska';
  }

  .epilogue {
    font-family: 'epilogue';
    @apply tracking-wide;
  }

  .satoshi {
    font-family: 'satoshi';
  }
}

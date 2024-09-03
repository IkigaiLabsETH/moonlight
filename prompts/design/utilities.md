@tailwind utilities;

.bg-gradient {
  background: linear-gradient(-45deg, #141100, #171717, #090909, #000000);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
      background-position: 0 50%;
  }

  50% {
      background-position: 100% 50%;
  }

  to {
      background-position: 0 50%;
  }
}

.without-ring {
  @apply focus:ring-0 focus:ring-offset-0;
}

.Toastify__toast {
  @apply shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] satoshi font-bold text-black rounded-none border-2 border-black;
}

.Toastify__progress-bar--info, .Toastify__progress-bar--success, .Toastify__progress-bar--warning, .Toastify__progress-bar--error {
  @apply bg-black;
}

.info-tab p {
  @apply !text-black;
}

.info-tab a {
  @apply text-yellow hover:text-yellow-600;
}
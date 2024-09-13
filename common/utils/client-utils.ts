export function debounce<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): Promise<ReturnType<T>> {
    // Clear the previous timeout if the function is called again within the delay
    clearTimeout(timeoutId);

    // Return a promise that resolves when the debounced function executes
    return new Promise((resolve, reject) => {
      // Set a new timeout
      timeoutId = setTimeout(() => {
        // Call the original function with the correct 'this' context and arguments
        func.apply(this, args)
          .then(resolve) // Resolve the promise if the original function succeeds
          .catch(reject); // Reject the promise if the original function fails
      }, delay);
    });
  };
}

export const currencyFormatter = Intl.NumberFormat('en', { notation: 'compact' })

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  // Combine into a readable format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * Timeout utility functions for async operations
 * Prevents infinite loading states by providing fallback values after timeout
 */

/**
 * Wraps a promise with a timeout. If the promise doesn't resolve within
 * the specified time, returns the fallback value instead.
 *
 * @param promise - The promise to wrap
 * @param ms - Timeout in milliseconds
 * @param fallback - Value to return if timeout occurs
 * @returns The promise result or fallback value
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  fallback: T
): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => {
      console.warn(`Request timed out after ${ms}ms, using fallback value`);
      resolve(fallback);
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    console.warn('Request failed, using fallback value:', error);
    return fallback;
  }
}

/**
 * Wraps a promise with a timeout that rejects on timeout.
 * Use when you need to handle the timeout as an error.
 *
 * @param promise - The promise to wrap
 * @param ms - Timeout in milliseconds
 * @param errorMessage - Error message for timeout
 * @returns The promise result
 * @throws Error if timeout occurs
 */
export async function withTimeoutReject<T>(
  promise: Promise<T>,
  ms: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(errorMessage));
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

/**
 * Creates a debounced version of an async function
 * Useful for search inputs to prevent too many API calls
 *
 * @param fn - The async function to debounce
 * @param ms - Debounce delay in milliseconds
 * @returns Debounced function
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout | null = null;
  let pendingPromise: Promise<ReturnType<T>> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, ms);
    });
  };
}

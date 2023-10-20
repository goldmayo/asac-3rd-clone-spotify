export const throttle = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let waiting = true
  return (...args: Parameters<T>) => {
    if (waiting) {
      fn(...args)
      waiting = false
      setTimeout(() => {
        waiting = true
      }, delay)
    }
  }
}

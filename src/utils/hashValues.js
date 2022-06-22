export function hashValues(...args) {
  // implement real hashing here
  return Object.values(args[0]).join();
}

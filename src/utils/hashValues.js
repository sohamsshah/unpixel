export function hashValues(...args) {
  // implement real hashing algo here
  return Object.values(args[0]).join();
}

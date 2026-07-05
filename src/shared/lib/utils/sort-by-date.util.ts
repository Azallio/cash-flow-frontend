export function sortByField<T>(field: keyof T): (a: T, b: T) => number {
  return (a, b) => new Date(String(a[field])).getTime() - new Date(String(b[field])).getTime()
}

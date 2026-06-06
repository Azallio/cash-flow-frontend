export function buildQueryParams(params: Record<string, string | number | boolean | undefined>) {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value))
    }
  })

  return queryParams.toString()
}

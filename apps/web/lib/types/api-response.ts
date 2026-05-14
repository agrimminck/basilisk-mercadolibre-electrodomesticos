/**
 * Discriminated union for API route responses.
 *
 * Replaces the legacy `{ data: T; error?: string }` shape which forced
 * callers to handle `data = null as unknown as T` casts on error paths.
 *
 * Discriminate via `ok`:
 *   if (!body.ok) handleError(body.error)
 *   else useData(body.data)
 */
export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; statusCode?: number }

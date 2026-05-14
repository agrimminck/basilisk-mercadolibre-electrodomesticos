import { describe, it, expect, beforeEach, vi } from 'vitest'

const OAUTH_URL = 'https://api.mercadolibre.com/oauth/token'

async function loadFresh() {
  vi.resetModules()
  return import('./meli-auth')
}

function mockOk(token: string, expiresIn = 3600) {
  return {
    ok: true,
    status: 200,
    json: async () => ({ access_token: token, expires_in: expiresIn }),
    text: async () => '',
  } as unknown as Response
}

function mockErr(status: number, body = 'invalid_client') {
  return {
    ok: false,
    status,
    json: async () => ({}),
    text: async () => body,
  } as unknown as Response
}

beforeEach(() => {
  vi.restoreAllMocks()
  process.env.MELI_APP_ID = 'app-id-123'
  process.env.MELI_CLIENT_SECRET = 'secret-xyz'
})

describe('getAccessToken', () => {
  it('throws if env credentials are missing', async () => {
    delete process.env.MELI_APP_ID
    const { getAccessToken } = await loadFresh()
    await expect(getAccessToken()).rejects.toThrow(/MELI_APP_ID/)
  })

  it('fetches and caches token on first call (cache miss)', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockOk('TOKEN-A'))
    const { getAccessToken } = await loadFresh()
    const token = await getAccessToken()

    expect(token).toBe('TOKEN-A')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe(OAUTH_URL)
    expect((init as RequestInit).method).toBe('POST')
    const body = String((init as RequestInit).body)
    expect(body).toContain('grant_type=client_credentials')
    expect(body).toContain('client_id=app-id-123')
    expect(body).toContain('client_secret=secret-xyz')
  })

  it('reuses cached token on subsequent call (cache hit)', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockOk('TOKEN-B'))
    const { getAccessToken } = await loadFresh()

    const first = await getAccessToken()
    const second = await getAccessToken()

    expect(first).toBe('TOKEN-B')
    expect(second).toBe('TOKEN-B')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('refetches when cached token expired', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(mockOk('TOKEN-OLD', 60)) // expiresAt = now + 0ms (60-60s buffer)
      .mockResolvedValueOnce(mockOk('TOKEN-NEW', 3600))
    const { getAccessToken } = await loadFresh()

    const first = await getAccessToken()
    expect(first).toBe('TOKEN-OLD')

    // Advance system clock past expiry
    vi.useFakeTimers()
    vi.setSystemTime(Date.now() + 5_000)
    const second = await getAccessToken()
    vi.useRealTimers()

    expect(second).toBe('TOKEN-NEW')
    expect(fetchSpy).toHaveBeenCalledTimes(2)
  })

  it('throws with status + body on OAuth error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockErr(401, 'invalid_client'))
    const { getAccessToken } = await loadFresh()
    await expect(getAccessToken()).rejects.toThrow(/ML OAuth error 401: invalid_client/)
  })
})

interface TokenCache {
  accessToken: string
  expiresAt: number
}

let cache: TokenCache | null = null

export async function getAccessToken(): Promise<string> {
  const now = Date.now()

  if (cache && cache.expiresAt > now) {
    return cache.accessToken
  }

  const clientId = process.env.MELI_APP_ID?.trim()
  const clientSecret = process.env.MELI_CLIENT_SECRET?.trim()

  if (!clientId || !clientSecret) {
    throw new Error('MELI_APP_ID and MELI_CLIENT_SECRET are required')
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  })

  const res = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`ML OAuth error ${res.status}: ${text}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }

  // Refresh 60s before expiry
  cache = {
    accessToken: data.access_token,
    expiresAt: now + (data.expires_in - 60) * 1000,
  }

  return cache.accessToken
}

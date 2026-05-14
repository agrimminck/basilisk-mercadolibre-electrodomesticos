import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

const contactsCreate = vi.fn()

vi.mock('resend', () => {
  class Resend {
    contacts = { create: contactsCreate }
    constructor(_key: string) {}
  }
  return { Resend }
})

function makeReq(body: unknown): NextRequest {
  return new NextRequest(
    new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  process.env.RESEND_API_KEY = 'test-key'
  process.env.RESEND_AUDIENCE_ID = 'aud-1'
})

async function loadRoute() {
  vi.resetModules()
  return import('./route')
}

describe('POST /api/newsletter', () => {
  it('subscribes on valid email', async () => {
    contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' }, error: null })
    const { POST } = await loadRoute()
    const res = await POST(makeReq({ email: 'User@Example.com' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ ok: true })
    expect(contactsCreate).toHaveBeenCalledWith({
      email: 'user@example.com',
      audienceId: 'aud-1',
      unsubscribed: false,
    })
  })

  it('returns 422 on invalid email', async () => {
    const { POST } = await loadRoute()
    const res = await POST(makeReq({ email: 'not-an-email' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.error).toMatch(/inválido/i)
    expect(contactsCreate).not.toHaveBeenCalled()
  })

  it('returns 422 when email missing', async () => {
    const { POST } = await loadRoute()
    const res = await POST(makeReq({}))
    expect(res.status).toBe(422)
  })

  it('returns 400 on malformed JSON body', async () => {
    const { POST } = await loadRoute()
    const res = await POST(makeReq('{not json'))
    expect(res.status).toBe(400)
  })

  it('treats 409 as idempotent success (already subscribed)', async () => {
    contactsCreate.mockResolvedValueOnce({ data: null, error: { statusCode: 409, message: 'exists' } })
    const { POST } = await loadRoute()
    const res = await POST(makeReq({ email: 'dup@example.com' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ ok: true, already: true })
  })

  it('returns 500 on generic Resend error', async () => {
    contactsCreate.mockResolvedValueOnce({ data: null, error: { statusCode: 500, message: 'boom' } })
    const { POST } = await loadRoute()
    const res = await POST(makeReq({ email: 'ok@example.com' }))
    expect(res.status).toBe(500)
  })

  it('returns 500 when audience id is misconfigured', async () => {
    delete process.env.RESEND_AUDIENCE_ID
    const { POST } = await loadRoute()
    const res = await POST(makeReq({ email: 'ok@example.com' }))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toMatch(/misconfiguration/i)
  })
})

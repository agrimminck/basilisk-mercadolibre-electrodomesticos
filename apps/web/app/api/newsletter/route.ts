import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

// Lazy init — Resend throws at construction when API key is undefined (build-time safe)
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not set')
  return new Resend(key)
}
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let email: string
  try {
    const body = await req.json() as { email?: unknown }
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  if (!AUDIENCE_ID) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const { error } = await getResend().contacts.create({
    email,
    audienceId: AUDIENCE_ID,
    unsubscribed: false,
  })

  if (error) {
    if ((error as { statusCode?: number }).statusCode === 409) {
      return NextResponse.json({ ok: true, already: true })
    }
    return NextResponse.json({ error: 'Error al suscribir' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

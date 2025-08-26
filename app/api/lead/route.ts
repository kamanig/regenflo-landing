// app/api/lead/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

async function sendEmail(payload: { name:string; email:string; phone?:string; purpose?:string; message?:string }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM = 'ReGenflo <no-reply@lifely.health>' } =
    process.env as Record<string, string>

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('[lead] SMTP not configured; skipping email send')
    return { ok: false, skipped: true }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif">
      <h2>New ReGenflō Lead</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone || '—'}</p>
      <p><strong>Purpose:</strong> ${payload.purpose || '—'}</p>
      <p><strong>Message:</strong> ${payload.message || '—'}</p>
      <hr />
      <p>Calendly: <a href="https://calendly.com/mehul-lifely">https://calendly.com/mehul-lifely</a></p>
    </div>
  `

  await transporter.sendMail({
    from: SMTP_FROM,
    to: 'care@lifely.ae',
    subject: 'New ReGenflō Lead',
    html,
  })

  return { ok: true }
}

async function sendWhatsApp(payload: { name:string; email:string; phone?:string; purpose?:string; message?:string }) {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_ID } = process.env as Record<string, string>
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn('[lead] WhatsApp not configured; skipping WA send')
    return { ok: false, skipped: true }
  }

  const body = {
    messaging_product: 'whatsapp',
    to: '919726616008', // +91 97266 16008
    type: 'text',
    text: {
      preview_url: false,
      body: `New ReGenflō Lead
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || '—'}
Purpose: ${payload.purpose || '—'}
Message: ${payload.message || '—'}
Calendly: https://calendly.com/mehul-lifely`,
    },
  }

  const res = await fetch(`https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`[WhatsApp] ${res.status}: ${await res.text()}`)
  return { ok: true }
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, purpose, message } = await req.json()
    if (!name || !email) {
      return NextResponse.json({ ok: false, error: 'Missing name/email' }, { status: 400 })
    }

    const results = await Promise.allSettled([
      sendEmail({ name, email, phone, purpose, message }),
      sendWhatsApp({ name, email, phone, purpose, message }),
    ])

    const emailOk = results[0].status === 'fulfilled'
    const waOk = results[1].status === 'fulfilled'

    if (!emailOk && !waOk) {
      return NextResponse.json({ ok: false, error: 'Delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true, emailOk, waOk })
  } catch (e) {
    console.error('[lead:POST] error', e)
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }
}

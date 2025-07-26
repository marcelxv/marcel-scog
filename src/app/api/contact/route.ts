import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// In-memory rate limit store (for demo; use Redis or DB in production)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per IP per window
const ipHits: Record<string, { count: number; last: number }> = {};

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  _honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  if (!ipHits[ip]) ipHits[ip] = { count: 0, last: now };
  if (now - ipHits[ip].last > RATE_LIMIT_WINDOW) {
    ipHits[ip] = { count: 1, last: now };
  } else {
    ipHits[ip].count++;
    ipHits[ip].last = now;
    if (ipHits[ip].count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  // Parse and validate body
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request.' },
      { status: 400 }
    );
  }
  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed.' },
      { status: 400 }
    );
  }
  // Honeypot spam check
  if (data._honeypot) {
    return NextResponse.json(
      { success: false, error: 'Spam detected.' },
      { status: 400 }
    );
  }

  // --- Email sending logic (Nodemailer + Gmail) ---
  try {
    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // or another recipient
      subject: `Contact Form from Website: ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    );
  }
}

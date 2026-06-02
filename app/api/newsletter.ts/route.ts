import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { sendConfirmationEmail, sendNotificationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      firstName, lastName, email, phone,
      date, time, guests, seating, requests,
    } = body

    // ── Validate ──────────────────────────────────
    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // ── Save to Supabase ──────────────────────────
    const supabase = createAdminClient()

    const { data, error: dbError } = await supabase
      .from('reservations')
      .insert({
        first_name:       firstName,
        last_name:        lastName,
        email,
        phone,
        date,
        time,
        guests,
        seating,
        special_requests: requests || null,
        status:           'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Failed to save reservation. Please try again.' },
        { status: 500 }
      )
    }

    // ── Send emails (both in parallel) ───────────
    await Promise.allSettled([
      sendConfirmationEmail({
        firstName, lastName, email, date, time, guests, seating,
      }),
      sendNotificationEmail({
        firstName, lastName, email, phone,
        date, time, guests, seating,
        specialRequests: requests || '',
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Reservation confirmed!',
      id:      data.id,
    })

  } catch (err) {
    console.error('Reservation API error:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email required.' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        { email, subscribed_at: new Date().toISOString() },
        { onConflict: 'email' }
      )

    if (error) {
      console.error('Newsletter error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list!",
    })

  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}

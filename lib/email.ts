import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendConfirmationEmail(data: {
  firstName: string
  lastName:  string
  email:     string
  date:      string
  time:      string
  guests:    string
  seating:   string
}) {
  return resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      data.email,
    subject: `Reservation Confirmed — Empire Luxe, ${data.date}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:Georgia,serif;background:#050305;color:#F5EDD8;margin:0;padding:0;">
        <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

          <div style="text-align:center;border-bottom:1px solid #8A6A28;padding-bottom:28px;margin-bottom:28px;">
            <p style="font-size:11px;letter-spacing:0.4em;color:#C9A84C;margin:0 0 6px">EMPIRE</p>
            <h1 style="font-size:30px;font-weight:300;color:#C9A84C;margin:0;letter-spacing:0.15em">LUXE</h1>
            <p style="font-size:10px;letter-spacing:0.4em;color:#9A8A7A;margin:6px 0 0">LOUNGE</p>
          </div>

          <h2 style="font-size:20px;font-weight:300;color:#F5EDD8;text-align:center;margin-bottom:6px;">
            Your reservation is confirmed
          </h2>
          <p style="text-align:center;color:#9A8A7A;font-size:13px;margin-bottom:28px;">
            We look forward to welcoming you, ${data.firstName}.
          </p>

          <div style="border:1px solid #8A6A28;padding:20px;background:rgba(201,168,76,0.04);margin-bottom:20px;">
            <table style="width:100%;font-size:13px;border-collapse:collapse;">
              <tr>
                <td style="color:#9A8A7A;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">Name</td>
                <td style="color:#F5EDD8;text-align:right;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="color:#9A8A7A;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">Date</td>
                <td style="color:#F5EDD8;text-align:right;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">${data.date}</td>
              </tr>
              <tr>
                <td style="color:#9A8A7A;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">Time</td>
                <td style="color:#F5EDD8;text-align:right;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">${data.time}</td>
              </tr>
              <tr>
                <td style="color:#9A8A7A;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">Guests</td>
                <td style="color:#F5EDD8;text-align:right;padding:7px 0;border-bottom:1px solid rgba(201,168,76,0.1);">${data.guests}</td>
              </tr>
              <tr>
                <td style="color:#9A8A7A;padding:7px 0;">Seating</td>
                <td style="color:#F5EDD8;text-align:right;padding:7px 0;text-transform:capitalize;">${data.seating}</td>
              </tr>
            </table>
          </div>

          <div style="background:rgba(123,47,190,0.12);border:1px solid rgba(159,94,255,0.3);padding:14px;text-align:center;margin-bottom:20px;">
            <p style="font-size:11px;letter-spacing:0.2em;color:#BF5FFF;margin:0 0 4px">IMPORTANT</p>
            <p style="font-size:12px;color:#9A8A7A;margin:0;">
              Please arrive 10 minutes before your reservation.
              Tables are held for 15 minutes.
            </p>
          </div>

          <div style="text-align:center;border-top:1px solid #8A6A28;padding-top:20px;margin-top:28px;">
            <p style="font-size:12px;color:#9A8A7A;margin:0 0 4px">123 Nightlife Blvd, City Center</p>
            <p style="font-size:12px;color:#9A8A7A;margin:0 0 4px">+1 (555) 123-4567</p>
            <p style="font-size:11px;color:#8A6A28;margin:0">hello@empireluxe.com</p>
          </div>

        </div>
      </body>
      </html>
    `,
  })
}

export async function sendNotificationEmail(data: {
  firstName:       string
  lastName:        string
  email:           string
  phone:           string
  date:            string
  time:            string
  guests:          string
  seating:         string
  specialRequests: string
}) {
  return resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      process.env.RESERVATION_NOTIFY_EMAIL!,
    subject: `New Reservation — ${data.firstName} ${data.lastName} · ${data.date} ${data.time}`,
    html: `
      <h2>New reservation received</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Time:</strong> ${data.time}</p>
      <p><strong>Guests:</strong> ${data.guests}</p>
      <p><strong>Seating:</strong> ${data.seating}</p>
      <p><strong>Special Requests:</strong> ${data.specialRequests || 'None'}</p>
    `,
  })
}
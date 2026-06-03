import { Resend } from 'resend'

const resend = new Resend('re_JXRRbTMY_8W8ouGVrFptC3796Kqk1to2K')

const { data, error } = await resend.emails.send({
  from:    'onboarding@resend.dev',
  to:      'dagij7890@gmail.com',
  subject: 'Test from Empire Luxe',
  html:    '<p>Reservation system is working!</p>',
})

console.log('Data:',  data)
console.log('Error:', error)
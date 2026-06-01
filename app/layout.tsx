import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Empire Luxe Lounge — Bar & Lounge',
  description:
    'Where luxury meets the nightlife. Premium cocktails, live DJs, VIP tables and unforgettable nights.',
  keywords: ['bar', 'lounge', 'nightlife', 'cocktails', 'VIP', 'Empire Luxe'],
  openGraph: {
    title: 'Empire Luxe Lounge',
    description: 'Indulge. Unwind. Be Iconic.',
    url: 'https://empireluxelounge.com',
    siteName: 'Empire Luxe Lounge',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Josefin+Sans:wght@100;300;400;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

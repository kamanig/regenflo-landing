
export const metadata = {
  title: 'ReGenflō — Landing',
  description: 'Build a body that works.',
}

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased">{children}</body>
    </html>
  )
}

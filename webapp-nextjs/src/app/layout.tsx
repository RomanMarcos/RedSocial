import './global.css'
import 'font-awesome/css/font-awesome.min.css'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-400 h-screen'>
        {children}
      </body>
    </html>
  )
}
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login - SJCE-STEP',
  description: 'Login to SJCE-STEP admin panel',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


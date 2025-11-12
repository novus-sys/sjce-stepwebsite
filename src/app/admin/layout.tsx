import { Metadata } from 'next'
import { AuthProvider } from '@/components/admin/AuthProvider'
import { AdminLayoutContent } from '@/components/admin/AdminLayoutContent'
import { ToastProvider } from '@/components/ui/toast'

export const metadata: Metadata = {
  title: 'SJCE-STEP Admin Panel',
  description: 'Admin panel for managing SJCE-STEP website content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <AuthProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AuthProvider>
    </ToastProvider>
  )
}

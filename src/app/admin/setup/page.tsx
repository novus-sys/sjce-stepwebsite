'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function AdminSetup() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const createAdminUser = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const supabase = createClient()
      
      // Try to sign up the admin user
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@sjce-step.com',
        password: 'password123',
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Admin user created successfully! You can now login.')
      }
    } catch (err) {
      setError('Failed to create admin user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Setup
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create the initial admin user
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">
                This will create an admin user with:
              </p>
              <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                <li>Email: admin@sjce-step.com</li>
                <li>Password: password123</li>
              </ul>
            </div>

            <button
              onClick={createAdminUser}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Admin User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


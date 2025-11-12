import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    // Create admin client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Create the admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@sjce-step.com',
      password: 'password123',
      email_confirm: true
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ 
      message: 'Admin user created successfully',
      user: data.user 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create admin user' 
    }, { status: 500 })
  }
}


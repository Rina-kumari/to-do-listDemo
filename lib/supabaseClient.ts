import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  console.error('Invalid Supabase URL:', supabaseUrl)
  throw new Error('Invalid Supabase URL format')
}

console.log('Initializing Supabase client with URL:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

// Test the connection
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
    } else {
      console.log('Supabase connection test successful')
    }
  } catch (error: unknown) {
    console.error('Supabase connection test error:', error)
  }
}

testSupabaseConnection() 



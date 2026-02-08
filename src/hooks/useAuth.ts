'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Member } from '@/lib/supabase/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  // Memoize supabase client to ensure stable reference
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let isMounted = true

    const fetchMemberData = async (email: string) => {
      const { data, error } = await supabase
        .from('member')
        .select('*')
        .eq('email', email)
        .single()

      if (!error && data && isMounted) {
        setMember(data as Member)
      }
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!isMounted) return

      setUser(session?.user ?? null)

      if (session?.user?.email) {
        await fetchMemberData(session.user.email)
      }

      setLoading(false)
    }

    getInitialSession()

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return

      setUser(session?.user ?? null)

      if (session?.user?.email) {
        await fetchMemberData(session.user.email)
      } else {
        setMember(null)
      }

      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabase]) // supabase is now stable via useMemo

  const signIn = useCallback(async (username: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || '로그인에 실패했습니다.')
    }

    // Set the session on the client (don't await - let it run in background)
    // The page will do a full reload anyway which will pick up the session from cookies
    if (result.data?.session) {
      supabase.auth.setSession({
        access_token: result.data.session.access_token,
        refresh_token: result.data.session.refresh_token,
      }).catch(console.error)
    }

    return result.data
  }, [supabase])

  const signUp = useCallback(async (params: {
    email: string
    password: string
    username: string
    fullName: string
    companyName: string
    ceoName: string
    bizRegNum: string
    businessType: 'WHOLESALE' | 'RETAIL'
    zipCode: string
    addressMain: string
    addressDetail: string
    bizRegImageUrl?: string
  }) => {
    // Use the server-side API route for signup (handles RLS via service role)
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
        username: params.username,
        fullName: params.fullName,
        companyName: params.companyName,
        ceoName: params.ceoName,
        bizRegNum: params.bizRegNum,
        businessType: params.businessType,
        zipCode: params.zipCode,
        addressMain: params.addressMain,
        addressDetail: params.addressDetail,
        bizRegImageUrl: params.bizRegImageUrl,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Signup failed')
    }

    return result.data
  }, [])

  const signOut = useCallback(async () => {
    setUser(null)
    setMember(null)

    // Server clears cookies first (while browser still sends them with request)
    await fetch('/api/auth/logout', { method: 'POST' })

    // Client cleanup - don't throw if session already gone
    try {
      await supabase.auth.signOut({ scope: 'local' })
    } catch {
      // Server already cleared session, safe to ignore
    }
  }, [supabase])

  return {
    user,
    member,
    loading,
    signIn,
    signUp,
    signOut,
  }
}

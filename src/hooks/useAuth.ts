'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Member } from '@/lib/supabase/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchMemberData(session.user.email!)
      }

      setLoading(false)
    }

    getInitialSession()

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchMemberData(session.user.email!)
      } else {
        setMember(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchMemberData = async (email: string) => {
    const { data, error } = await supabase
      .from('member')
      .select('*')
      .eq('email', email)
      .single()

    if (!error && data) {
      setMember(data as Member)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return data
  }

  const signUp = async (params: {
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
  }) => {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          username: params.username,
          full_name: params.fullName,
        }
      }
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Failed to create user')

    // 2. Create member record
    const { error: memberError } = await supabase
      .from('member')
      .insert({
        username: params.username,
        email: params.email,
        password: 'SUPABASE_AUTH', // Placeholder - actual password in auth
        business_type: params.businessType,
        company_name: params.companyName,
        ceo_name: params.ceoName,
        biz_reg_num: params.bizRegNum,
        zip_code: params.zipCode,
        address_line1: params.addressMain,
        address_line2: params.addressDetail,
        approval_status: 'PENDING',
      })

    if (memberError) {
      // Rollback auth user if member creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw memberError
    }

    return authData
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    user,
    member,
    loading,
    signIn,
    signUp,
    signOut,
  }
}

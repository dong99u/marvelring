import { Database } from './database.types'

export type Member = Database['public']['Tables']['member']['Row']
export type MemberInsert = Database['public']['Tables']['member']['Insert']
export type MemberUpdate = Database['public']['Tables']['member']['Update']

export type BusinessType = 'WHOLESALE' | 'RETAIL'
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

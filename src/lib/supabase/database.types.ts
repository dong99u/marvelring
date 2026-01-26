export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      member: {
        Row: {
          id: number
          username: string
          email: string
          password: string
          company_name: string | null
          ceo_name: string | null
          biz_reg_num: string | null
          biz_reg_image_url: string | null
          business_type: 'WHOLESALE' | 'RETAIL'
          approval_status: 'PENDING' | 'APPROVED' | 'REJECTED'
          zip_code: string | null
          address_line1: string | null
          address_line2: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          username: string
          email: string
          password: string
          company_name?: string | null
          ceo_name?: string | null
          biz_reg_num?: string | null
          biz_reg_image_url?: string | null
          business_type?: 'WHOLESALE' | 'RETAIL'
          approval_status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          zip_code?: string | null
          address_line1?: string | null
          address_line2?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          username?: string
          email?: string
          password?: string
          company_name?: string | null
          ceo_name?: string | null
          biz_reg_num?: string | null
          biz_reg_image_url?: string | null
          business_type?: 'WHOLESALE' | 'RETAIL'
          approval_status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          zip_code?: string | null
          address_line1?: string | null
          address_line2?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

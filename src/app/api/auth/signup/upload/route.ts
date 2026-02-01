import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const userId = formData.get('userId') as string | null
    const email = formData.get('email') as string | null

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'File and userId are required' },
        { status: 400 }
      )
    }

    // Use admin client with service role to bypass storage RLS
    const supabase = createAdminClient()

    // Convert File to ArrayBuffer then to Uint8Array for upload
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Include user ID in path for organization
    const fileName = `${userId}/${Date.now()}-${file.name}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('business-documents')
      .upload(fileName, uint8Array, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('business-documents')
      .getPublicUrl(uploadData.path)

    // Update the member record with the file URL if email is provided
    if (email) {
      await supabase
        .from('member')
        .update({ biz_reg_image_url: urlData.publicUrl })
        .eq('email', email)
    }

    return NextResponse.json({
      url: urlData.publicUrl,
      path: uploadData.path,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'File upload failed'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

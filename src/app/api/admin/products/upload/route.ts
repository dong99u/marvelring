import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const productId = formData.get('productId') as string | null
    const displayOrder = formData.get('displayOrder') as string | null
    const isMain = formData.get('isMain') as string | null

    if (!file || !productId) {
      return NextResponse.json(
        { error: 'File and productId are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Upload file to storage
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    // Sanitize filename: extract extension, use timestamp as name
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${productId}/${Date.now()}.${ext}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
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
      .from('product-images')
      .getPublicUrl(uploadData.path)

    // Insert record in product_image table
    const { data: imageRecord, error: dbError } = await supabase
      .from('product_image')
      .insert({
        product_id: Number(productId),
        image_url: urlData.publicUrl,
        display_order: displayOrder ? Number(displayOrder) : 0,
        is_main: isMain === 'true',
      })
      .select()
      .single()

    if (dbError) {
      // Clean up uploaded file if DB insert fails
      await supabase.storage.from('product-images').remove([uploadData.path])
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      url: urlData.publicUrl,
      imageId: imageRecord.id,
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

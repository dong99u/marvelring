'use client'

/**
 * Product Edit Form - Client Component
 * Pre-populated form for editing existing products
 */

import React, { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  updateProduct,
  deleteProductImage,
  updateProductImageOrders,
  syncProductMainImage,
} from '@/app/actions/admin'
import type { Product, Category, Collection } from '@/types/database'
import { isValidMediaFile, isVideoFile, isVideoUrl, validateVideoDuration, ACCEPT_MEDIA_INPUT, MAX_FILE_SIZE_MB, MAX_VIDEO_DURATION_SECONDS } from '@/lib/utils/media'

interface ProductWithRelations extends Product {
  category: Category | null
  collection: Collection | null
}

interface ProductImage {
  product_image_id: number
  product_id: number
  image_url: string
  title: string | null
  description: string | null
  display_order: number
  is_main: boolean
  media_type?: string | null
}

interface ProductPricingFormValues {
  retail_price: number
  wholesale_price: number
  retail_base_labor_cost: number | null
  retail_stone_setting_cost: number | null
  wholesale_base_labor_cost: number | null
  wholesale_stone_setting_cost: number | null
}

interface ProductEditFormProps {
  product: ProductWithRelations
  pricing: ProductPricingFormValues
  categories: Category[]
  collections: Collection[]
  materialInfo: Array<{ material_type: string; weight: number | null }>
  diamondInfo: Array<{ diamond_size: number; diamond_amount: number }>
  productImages: ProductImage[]
}

type MediaKey = `e:${number}` | `n:${string}`

type MediaItem =
  | { key: MediaKey; kind: 'existing'; image: ProductImage }
  | { key: MediaKey; kind: 'new'; file: File; previewUrl: string }

export default function ProductEditForm({
  product,
  pricing,
  categories,
  collections,
  materialInfo,
  diamondInfo,
  productImages,
}: ProductEditFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { '14K': false, '18K': false, '24K': false }
    materialInfo.forEach((m) => { initial[m.material_type] = true })
    return initial
  })

  const [materialWeights, setMaterialWeights] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = { '14K': '', '18K': '', '24K': '' }
    materialInfo.forEach((m) => { initial[m.material_type] = m.weight?.toString() || '' })
    return initial
  })

  const [diamondRows, setDiamondRows] = useState<Array<{ size: string; amount: string }>>(() =>
    diamondInfo.map((d) => ({
      size: d.diamond_size.toString(),
      amount: d.diamond_amount.toString(),
    }))
  )

  const initialSortedImages = [...productImages].sort(
    (a, b) =>
      a.display_order - b.display_order ||
      a.product_image_id - b.product_image_id
  )
  const initialMainImage =
    initialSortedImages.find((image) => image.is_main) || initialSortedImages[0]

  const newMediaCounterRef = useRef(0)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() =>
    initialSortedImages.map((image) => ({
      key: `e:${image.product_image_id}`,
      kind: 'existing',
      image,
    }))
  )
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([])
  const [replacementFiles, setReplacementFiles] = useState<Record<number, File>>({})
  const [replacementPreviews, setReplacementPreviews] = useState<Record<number, string>>({})
  const [draggingMediaKey, setDraggingMediaKey] = useState<MediaKey | null>(null)
  const [dragOverMediaKey, setDragOverMediaKey] = useState<MediaKey | null>(null)
  const [mainMediaKey, setMainMediaKey] = useState<MediaKey | null>(
    initialMainImage ? `e:${initialMainImage.product_image_id}` : null
  )

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const files = Array.from(e.target.files || [])
    e.currentTarget.value = ''
    const validFiles = files.filter((file) => isValidMediaFile(file))

    const validatedFiles: File[] = []
    for (const file of validFiles) {
      if (isVideoFile(file)) {
        const validDuration = await validateVideoDuration(file)
        if (!validDuration) {
          setError(`영상은 ${MAX_VIDEO_DURATION_SECONDS}초 이하만 가능합니다.`)
          continue
        }
      }
      validatedFiles.push(file)
    }

    const newItems: MediaItem[] = validatedFiles.map((file) => {
      newMediaCounterRef.current += 1
      const key = `n:${Date.now()}-${newMediaCounterRef.current}` as MediaKey
      return {
        key,
        kind: 'new',
        file,
        previewUrl: URL.createObjectURL(file),
      }
    })

    setMediaItems((prev) => [...prev, ...newItems])
  }

  const removeMediaItem = (key: MediaKey) => {
    setMediaItems((prev) => {
      const item = prev.find((it) => it.key === key)
      if (!item) {
        return prev
      }

      if (item.kind === 'new') {
        URL.revokeObjectURL(item.previewUrl)
      }

      return prev.filter((it) => it.key !== key)
    })

    if (key.startsWith('e:')) {
      const id = Number(key.slice(2))
      setDeletedImageIds((prev) => [...prev, id])
      setReplacementFiles((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      setReplacementPreviews((prev) => {
        const next = { ...prev }
        if (next[id]) {
          URL.revokeObjectURL(next[id])
        }
        delete next[id]
        return next
      })
    }

    setMainMediaKey((prev) => (prev === key ? null : prev))
  }

  const replaceNewMediaItem = async (
    key: MediaKey,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null)
    const file = e.target.files?.[0]
    e.currentTarget.value = ''

    if (!file) {
      return
    }

    if (!isValidMediaFile(file)) {
      setError('지원하지 않는 파일 형식입니다.')
      return
    }

    if (isVideoFile(file)) {
      const validDuration = await validateVideoDuration(file)
      if (!validDuration) {
        setError(`영상은 ${MAX_VIDEO_DURATION_SECONDS}초 이하만 가능합니다.`)
        return
      }
    }

    const previewUrl = URL.createObjectURL(file)
    setMediaItems((prev) =>
      prev.map((it) => {
        if (it.key !== key || it.kind !== 'new') {
          return it
        }
        URL.revokeObjectURL(it.previewUrl)
        return { ...it, file, previewUrl }
      })
    )
  }

  const handleReplaceExistingImage = async (
    imageId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null)
    const file = e.target.files?.[0]
    e.currentTarget.value = ''

    if (!file) {
      return
    }

    if (!isValidMediaFile(file)) {
      setError('지원하지 않는 파일 형식입니다.')
      return
    }

    if (isVideoFile(file)) {
      const validDuration = await validateVideoDuration(file)
      if (!validDuration) {
        setError(`영상은 ${MAX_VIDEO_DURATION_SECONDS}초 이하만 가능합니다.`)
        return
      }
    }

    const previewUrl = URL.createObjectURL(file)

    setReplacementPreviews((prev) => {
      if (prev[imageId]) {
        URL.revokeObjectURL(prev[imageId])
      }
      return { ...prev, [imageId]: previewUrl }
    })
    setReplacementFiles((prev) => ({ ...prev, [imageId]: file }))
  }

  const clearReplacement = (imageId: number) => {
    setReplacementFiles((prev) => {
      const next = { ...prev }
      delete next[imageId]
      return next
    })
    setReplacementPreviews((prev) => {
      const next = { ...prev }
      if (next[imageId]) {
        URL.revokeObjectURL(next[imageId])
      }
      delete next[imageId]
      return next
    })
  }

  const reorderMediaItems = (dragKey: MediaKey, targetKey: MediaKey) => {
    setMediaItems((prev) => {
      const fromIndex = prev.findIndex((it) => it.key === dragKey)
      const toIndex = prev.findIndex((it) => it.key === targetKey)
      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return prev
      }

      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }

  const moveMediaItem = (key: MediaKey, delta: number) => {
    setMediaItems((prev) => {
      const fromIndex = prev.findIndex((it) => it.key === key)
      const toIndex = fromIndex + delta
      if (fromIndex === -1 || toIndex < 0 || toIndex >= prev.length) {
        return prev
      }
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updateProduct(product.product_id, formData)

      if (result.success) {
        try {
          const deletedSet = new Set(deletedImageIds)
          const replacedImageIdMap = new Map<number, number>()
          const uploadedNewMediaIdMap = new Map<MediaKey, number>()

          // Delete removed images
          for (const imageId of deletedImageIds) {
            const deleteResult = await deleteProductImage(imageId)
            if (!deleteResult.success) {
              throw new Error(deleteResult.error || '기존 미디어 삭제에 실패했습니다.')
            }
          }

          // Replace existing + upload new based on unified order (mediaItems)
          for (let i = 0; i < mediaItems.length; i++) {
            const item = mediaItems[i]

            if (item.kind === 'existing') {
              const oldId = item.image.product_image_id
              if (deletedSet.has(oldId)) {
                continue
              }

              const replacementFile = replacementFiles[oldId]
              if (!replacementFile) {
                continue
              }

              const deleteResult = await deleteProductImage(oldId)
              if (!deleteResult.success) {
                throw new Error(deleteResult.error || '기존 미디어 교체에 실패했습니다.')
              }

              const uploadFormData = new FormData()
              uploadFormData.append('file', replacementFile)
              uploadFormData.append('productId', String(product.product_id))
              uploadFormData.append('displayOrder', String(i))
              uploadFormData.append('isMain', 'false')

              const uploadResponse = await fetch('/api/admin/products/upload', {
                method: 'POST',
                body: uploadFormData,
              })

              if (!uploadResponse.ok) {
                const payload = await uploadResponse
                  .json()
                  .catch(() => ({ error: '교체 미디어 업로드에 실패했습니다.' }))
                throw new Error(payload.error || '교체 미디어 업로드에 실패했습니다.')
              }

              const payload = await uploadResponse.json()
              replacedImageIdMap.set(oldId, Number(payload.imageId))
              continue
            }

            // item.kind === 'new'
            const uploadFormData = new FormData()
            uploadFormData.append('file', item.file)
            uploadFormData.append('productId', String(product.product_id))
            uploadFormData.append('displayOrder', String(i))
            uploadFormData.append('isMain', 'false')

            const uploadResponse = await fetch('/api/admin/products/upload', {
              method: 'POST',
              body: uploadFormData,
            })

            if (!uploadResponse.ok) {
              const payload = await uploadResponse
                .json()
                .catch(() => ({ error: '새 미디어 업로드에 실패했습니다.' }))
              throw new Error(payload.error || '새 미디어 업로드에 실패했습니다.')
            }

            const payload = await uploadResponse.json()
            uploadedNewMediaIdMap.set(item.key, Number(payload.imageId))
          }

          const finalOrderedImageIds = [
            ...mediaItems
              .map((item) => {
                if (item.kind === 'existing') {
                  const oldId = item.image.product_image_id
                  if (deletedSet.has(oldId)) {
                    return null
                  }
                  return replacedImageIdMap.get(oldId) ?? oldId
                }
                return uploadedNewMediaIdMap.get(item.key) ?? null
              })
              .filter((imageId): imageId is number => imageId !== null),
          ]

          const orderResult = await updateProductImageOrders(
            product.product_id,
            finalOrderedImageIds.map((imageId, index) => ({
              imageId,
              displayOrder: index,
            }))
          )

          if (!orderResult.success) {
            throw new Error(orderResult.error || '미디어 순서 저장에 실패했습니다.')
          }

          let preferredMainImageId: number | null = null

          if (mainMediaKey) {
            if (mainMediaKey.startsWith('e:')) {
              const selectedId = Number(mainMediaKey.slice(2))
              if (replacedImageIdMap.has(selectedId)) {
                preferredMainImageId = replacedImageIdMap.get(selectedId) || null
              } else if (!deletedSet.has(selectedId)) {
                preferredMainImageId = selectedId
              }
            } else {
              preferredMainImageId = uploadedNewMediaIdMap.get(mainMediaKey) || null
            }
          }

          const syncResult = await syncProductMainImage(
            product.product_id,
            preferredMainImageId
          )

          if (!syncResult.success) {
            throw new Error(syncResult.error || '대표 미디어 설정에 실패했습니다.')
          }

          router.push('/admin/products')
          router.refresh()
        } catch (mediaError) {
          setError(
            mediaError instanceof Error
              ? mediaError.message
              : '미디어 저장 중 오류가 발생했습니다.'
          )
        }
      } else {
        setError(result.error || '상품 수정에 실패했습니다.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            기본 정보
          </h2>

          {/* Product Name */}
          <div>
            <label
              htmlFor="product_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              상품명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              required
              defaultValue={product.product_name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Product Code */}
          <div>
            <label
              htmlFor="product_code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              상품코드 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="product_code"
              name="product_code"
              required
              defaultValue={product.product_code}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              defaultValue={product.category_id}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">카테고리 선택</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Collection */}
          <div>
            <label
              htmlFor="collection_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              컬렉션 (선택사항)
            </label>
            <select
              id="collection_id"
              name="collection_id"
              defaultValue={product.collection_id || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">컬렉션 없음</option>
              {collections.map((collection) => (
                <option
                  key={collection.collection_id}
                  value={collection.collection_id}
                >
                  {collection.brand_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            가격 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">소매(리테일)</h3>
              <div>
                <label
                  htmlFor="retail_price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  소매가 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="retail_price"
                  name="retail_price"
                  required
                  min="0"
                  step="1000"
                  defaultValue={pricing.retail_price}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="retail_base_labor_cost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  기본 공임비
                </label>
                <input
                  type="number"
                  id="retail_base_labor_cost"
                  name="retail_base_labor_cost"
                  min="0"
                  step="1000"
                  defaultValue={pricing.retail_base_labor_cost ?? ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="retail_stone_setting_cost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  알 공임 비용
                </label>
                <input
                  type="number"
                  id="retail_stone_setting_cost"
                  name="retail_stone_setting_cost"
                  min="0"
                  step="1000"
                  defaultValue={pricing.retail_stone_setting_cost ?? ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">도매(홀세일)</h3>
              <div>
                <label
                  htmlFor="wholesale_price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  도매가 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="wholesale_price"
                  name="wholesale_price"
                  required
                  min="0"
                  step="1000"
                  defaultValue={pricing.wholesale_price}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="wholesale_base_labor_cost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  기본 공임비
                </label>
                <input
                  type="number"
                  id="wholesale_base_labor_cost"
                  name="wholesale_base_labor_cost"
                  min="0"
                  step="1000"
                  defaultValue={pricing.wholesale_base_labor_cost ?? ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="wholesale_stone_setting_cost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  알 공임 비용
                </label>
                <input
                  type="number"
                  id="wholesale_stone_setting_cost"
                  name="wholesale_stone_setting_cost"
                  min="0"
                  step="1000"
                  defaultValue={pricing.wholesale_stone_setting_cost ?? ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Sale Price */}
          <div>
            <label
              htmlFor="sale_price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              세일가 (선택사항)
            </label>
            <input
              type="number"
              id="sale_price"
              name="sale_price"
              min="0"
              step="1000"
              defaultValue={product.sale_price || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            상품 상세
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Weight */}
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                무게 (g)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="0"
                step="0.01"
                defaultValue={product.weight || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Ring Size */}
            <div>
              <label
                htmlFor="ring_size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                반지 사이즈
              </label>
              <input
                type="number"
                id="ring_size"
                name="ring_size"
                min="0"
                step="0.5"
                defaultValue={product.ring_size || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                사이즈
              </label>
              <input
                type="number"
                id="size"
                name="size"
                min="0"
                step="0.1"
                defaultValue={product.size || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* 소재 정보 */}
          <div className="pt-4">
            <h3 className="text-base font-semibold mb-2">소재 정보</h3>
            <p className="text-sm text-gray-500 mb-4">지원하는 K수를 선택하고 각각의 중량을 입력하세요.</p>

            <div className="space-y-4">
              {(['14K', '18K', '24K'] as const).map((karat) => (
                <div key={karat} className="flex items-center gap-4">
                  <label className="flex items-center gap-2 w-24">
                    <input
                      type="checkbox"
                      checked={checkedMaterials[karat]}
                      onChange={(e) => {
                        setCheckedMaterials((prev) => ({ ...prev, [karat]: e.target.checked }))
                        if (!e.target.checked) {
                          setMaterialWeights((prev) => ({ ...prev, [karat]: '' }))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium">{karat}</span>
                  </label>
                  {checkedMaterials[karat] && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">중량:</label>
                      <input
                        type="number"
                        value={materialWeights[karat]}
                        onChange={(e) => {
                          setMaterialWeights((prev) => ({ ...prev, [karat]: e.target.value }))
                        }}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <span className="text-sm text-gray-500">g</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden inputs for material data */}
          {(['14K', '18K', '24K'] as const).map((karat) => (
            <React.Fragment key={`hidden-${karat}`}>
              <input type="hidden" name={`material_${karat}`} value={String(checkedMaterials[karat])} />
              {checkedMaterials[karat] && materialWeights[karat] && (
                <input type="hidden" name={`material_weight_${karat}`} value={materialWeights[karat]} />
              )}
            </React.Fragment>
          ))}

          {/* 다이아 정보 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">다이아 정보</h2>
            <p className="text-sm text-gray-500 mb-4">다이아몬드가 포함된 제품인 경우 사이즈와 수량을 입력하세요.</p>

            <div className="space-y-3">
              {diamondRows.map((row, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-16">사이즈:</label>
                    <input
                      type="number"
                      value={row.size}
                      onChange={(e) => {
                        setDiamondRows((prev) =>
                          prev.map((r, i) => (i === index ? { ...r, size: e.target.value } : r))
                        )
                      }}
                      step="0.001"
                      min="0"
                      placeholder="0.000"
                      className="w-28 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span className="text-sm text-gray-500">ct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-12">수량:</label>
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) => {
                        setDiamondRows((prev) =>
                          prev.map((r, i) => (i === index ? { ...r, amount: e.target.value } : r))
                        )
                      }}
                      step="1"
                      min="1"
                      placeholder="0"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span className="text-sm text-gray-500">개</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDiamondRows((prev) => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDiamondRows((prev) => [...prev, { size: '', amount: '' }])}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + 다이아 추가
            </button>
          </div>

          {/* Hidden inputs for diamond data */}
          <input type="hidden" name="diamond_count" value={String(diamondRows.length)} />
          {diamondRows.map((row, index) => (
            <React.Fragment key={`diamond-hidden-${index}`}>
              {row.size && row.amount && (
                <>
                  <input type="hidden" name={`diamond_size_${index}`} value={row.size} />
                  <input type="hidden" name={`diamond_amount_${index}`} value={row.amount} />
                </>
              )}
            </React.Fragment>
          ))}

          {/* 상품 이미지 */}
          <div className="pt-4">
            <h3 className="text-base font-semibold mb-2">상품 미디어</h3>
            <p className="text-sm text-gray-500 mb-4">
              상품 이미지/영상을 관리하세요. (최대 {MAX_FILE_SIZE_MB}MB, 영상 {MAX_VIDEO_DURATION_SECONDS}초 이내)
            </p>
            {mediaItems.length > 1 && (
              <p className="text-xs text-gray-500 mb-3">
                미디어는 드래그해서 순서를 바꾸거나, 앞으로/뒤로 버튼으로 순서를 조정할 수 있습니다.
              </p>
            )}

            {mediaItems.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {mediaItems.map((item, index) => {
                  const isMain = mainMediaKey === item.key
                  const isDragging = draggingMediaKey === item.key
                  const isDropTarget =
                    dragOverMediaKey === item.key && draggingMediaKey !== item.key

                  const previewIsVideo =
                    item.kind === 'existing'
                      ? replacementFiles[item.image.product_image_id]
                        ? isVideoFile(replacementFiles[item.image.product_image_id])
                        : isVideoUrl(item.image.image_url)
                      : isVideoFile(item.file)

                  const previewUrl =
                    item.kind === 'existing'
                      ? replacementPreviews[item.image.product_image_id] ||
                        item.image.image_url
                      : item.previewUrl

                  const existingId =
                    item.kind === 'existing' ? item.image.product_image_id : null
                  const replacementFile =
                    existingId !== null ? replacementFiles[existingId] : null

                  return (
                    <div
                      key={item.key}
                      className={`space-y-2 ${isDragging ? 'opacity-70' : ''}`}
                      onDragOver={(e) => {
                        if (!draggingMediaKey) return
                        e.preventDefault()
                        setDragOverMediaKey(item.key)
                      }}
                      onDragLeave={() => {
                        if (dragOverMediaKey === item.key) {
                          setDragOverMediaKey(null)
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        const dragKey = (e.dataTransfer.getData('text/plain') || draggingMediaKey) as MediaKey | ''
                        if (dragKey && dragKey !== item.key) {
                          reorderMediaItems(dragKey as MediaKey, item.key)
                        }
                        setDraggingMediaKey(null)
                        setDragOverMediaKey(null)
                      }}
                    >
                      <div
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                          isMain
                            ? 'border-blue-500'
                            : isDropTarget
                              ? 'border-indigo-500 border-dashed'
                              : 'border-gray-200'
                        } ${isDropTarget ? 'ring-2 ring-indigo-200' : ''}`}
                      >
                        <span className="absolute mt-1 ml-1 z-10 text-[11px] px-1.5 py-0.5 rounded bg-black/65 text-white">
                          {index + 1}
                        </span>

                        <span
                          className="absolute top-1 right-1 z-10 inline-flex items-center gap-1 px-2 py-1 rounded bg-white/85 border border-gray-200 text-[11px] text-gray-700"
                          draggable
                          onDragStart={(e) => {
                            setDraggingMediaKey(item.key)
                            setDragOverMediaKey(null)
                            e.dataTransfer.setData('text/plain', item.key)
                            e.dataTransfer.effectAllowed = 'move'
                          }}
                          onDragEnd={() => {
                            setDraggingMediaKey(null)
                            setDragOverMediaKey(null)
                          }}
                          title="드래그해서 순서 변경"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            drag_indicator
                          </span>
                          <span className="hidden sm:inline">이동</span>
                        </span>

                        {previewIsVideo ? (
                          <video
                            src={previewUrl}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={previewUrl}
                            alt={
                              item.kind === 'existing'
                                ? item.image.title || '상품 이미지'
                                : `새 미디어 ${index + 1}`
                            }
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-1">
                        {item.kind === 'existing' ? (
                          <>
                            <label
                              htmlFor={`replace-media-${existingId}`}
                              className="text-xs py-1 text-center rounded border border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer"
                            >
                              교체
                            </label>
                            <button
                              type="button"
                              onClick={() => setMainMediaKey(item.key)}
                              className={`text-xs py-1 rounded border ${
                                isMain
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {isMain ? '대표 이미지' : '대표로 설정'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeMediaItem(item.key)}
                              className="text-xs py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                            >
                              삭제
                            </button>
                            <button
                              type="button"
                              onClick={() => moveMediaItem(item.key, -1)}
                              disabled={index === 0}
                              className="text-xs py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              앞으로
                            </button>
                            <button
                              type="button"
                              onClick={() => moveMediaItem(item.key, 1)}
                              disabled={index === mediaItems.length - 1}
                              className="text-xs py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              뒤로
                            </button>
                            {replacementFile ? (
                              <button
                                type="button"
                                onClick={() => clearReplacement(existingId as number)}
                                className="text-xs py-1 rounded border border-amber-300 text-amber-700 hover:bg-amber-50"
                              >
                                교체 취소
                              </button>
                            ) : (
                              <div className="text-xs py-1 rounded border border-gray-200 text-gray-400 text-center">
                                원본 유지
                              </div>
                            )}
                            <input
                              id={`replace-media-${existingId}`}
                              type="file"
                              accept={ACCEPT_MEDIA_INPUT}
                              className="hidden"
                              onChange={(e) =>
                                handleReplaceExistingImage(existingId as number, e)
                              }
                              disabled={isPending}
                            />
                          </>
                        ) : (
                          <>
                            <label
                              htmlFor={`replace-new-media-${item.key}`}
                              className="text-xs py-1 text-center rounded border border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer"
                            >
                              변경
                            </label>
                            <button
                              type="button"
                              onClick={() => setMainMediaKey(item.key)}
                              className={`text-xs py-1 rounded border ${
                                isMain
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {isMain ? '대표 이미지' : '대표로 설정'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeMediaItem(item.key)}
                              className="text-xs py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                            >
                              삭제
                            </button>
                            <button
                              type="button"
                              onClick={() => moveMediaItem(item.key, -1)}
                              disabled={index === 0}
                              className="text-xs py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              앞으로
                            </button>
                            <button
                              type="button"
                              onClick={() => moveMediaItem(item.key, 1)}
                              disabled={index === mediaItems.length - 1}
                              className="text-xs py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              뒤로
                            </button>
                            <div className="text-xs py-1 rounded border border-green-200 text-green-700 text-center bg-green-50">
                              새 미디어
                            </div>
                            <input
                              id={`replace-new-media-${item.key}`}
                              type="file"
                              accept={ACCEPT_MEDIA_INPUT}
                              className="hidden"
                              onChange={(e) => replaceNewMediaItem(item.key, e)}
                              disabled={isPending}
                            />
                          </>
                        )}
                      </div>

                      {item.kind === 'existing' && replacementFile && (
                        <p className="text-[11px] text-amber-700">교체 예정</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <label className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
              + 미디어 추가
              <input
                type="file"
                accept={ACCEPT_MEDIA_INPUT}
                multiple
                onChange={handleImageSelect}
                className="hidden"
                disabled={isPending}
              />
            </label>
            {mediaItems.length > 0 && (
              <span className="ml-3 text-sm text-gray-500">
                총 {mediaItems.length}개
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              상품 설명
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {/* Additional Information */}
          <div>
            <label
              htmlFor="additional_information"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              추가 정보
            </label>
            <textarea
              id="additional_information"
              name="additional_information"
              rows={4}
              defaultValue={product.additional_information || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>

        {/* Status Flags */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            상태 설정
          </h2>

          <div className="space-y-3">
            {/* Is New */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_new"
                value="true"
                defaultChecked={product.is_new}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-700">신상품</span>
            </label>

            {/* Is Sale */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_sale"
                value="true"
                defaultChecked={product.is_sale}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-700">세일 상품</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? '저장 중...' : '수정 완료'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  )
}

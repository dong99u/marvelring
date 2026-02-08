'use client'

/**
 * Collection Form Component
 * Modal form for creating and editing collections
 */

import { useState, useEffect } from 'react'
import { createCollectionAction, updateCollectionAction } from '@/app/actions/collections'

type Collection = {
  collection_id: string
  brand_name: string
  slug: string
  logo_url: string | null
  display_order: number
}

type CollectionFormProps = {
  collection?: Collection | null
  onClose: () => void
}

export function CollectionForm({ collection, onClose }: CollectionFormProps) {
  const [formData, setFormData] = useState({
    brand_name: collection?.brand_name || '',
    slug: collection?.slug || '',
    logo_url: collection?.logo_url || '',
    display_order: collection?.display_order || 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!collection

  // Auto-generate slug from brand name
  useEffect(() => {
    if (!isEditing && formData.brand_name && !formData.slug) {
      const generatedSlug = formData.brand_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.brand_name, formData.slug, isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = isEditing
        ? await updateCollectionAction(collection.collection_id, formData)
        : await createCollectionAction(formData)

      if (result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? 'Edit Collection' : 'Add Collection'}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700 mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Nike"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                pattern="[a-z0-9-]+"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="e.g., nike"
              />
              <p className="mt-1 text-xs text-gray-500">
                URL-friendly identifier (lowercase, numbers, hyphens only)
              </p>
            </div>

            <div>
              <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="url"
                id="logo_url"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/logo.png"
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional: URL to brand logo image
              </p>
            </div>

            <div>
              <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                id="display_order"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers appear first
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

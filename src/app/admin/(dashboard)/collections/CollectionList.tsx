'use client'

/**
 * Collection List Component
 * Client component for displaying and managing collections
 */

import { useState } from 'react'
import Image from 'next/image'
import { CollectionForm } from './CollectionForm'
import { deleteCollectionAction } from '@/app/actions/collections'

type Collection = {
  collection_id: string
  brand_name: string
  slug: string
  logo_image_url: string | null
  display_order: number
  created_at: string
  products?: { count: number }[]
}

type CollectionListProps = {
  collections: Collection[]
}

export function CollectionList({ collections }: CollectionListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string, brandName: string) => {
    if (!confirm(`Are you sure you want to delete "${brandName}"? This action cannot be undone.`)) {
      return
    }

    setDeletingId(id)
    const result = await deleteCollectionAction(id)
    setDeletingId(null)

    if (result.error) {
      alert(`Failed to delete: ${result.error}`)
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingCollection(null)
  }

  const productCount = (collection: Collection) => {
    return collection.products?.[0]?.count ?? 0
  }

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Collection
        </button>
      </div>

      {collections.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No collections yet. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collections.map((collection) => (
                <tr key={collection.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {collection.logo_image_url ? (
                      <div className="relative w-12 h-12">
                        <Image
                          src={collection.logo_image_url}
                          alt={collection.brand_name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No logo</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {collection.brand_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-mono">
                      {collection.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {collection.display_order}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {productCount(collection)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(collection)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(collection.collection_id, collection.brand_name)}
                      disabled={deletingId === collection.collection_id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deletingId === collection.collection_id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <CollectionForm
          collection={editingCollection}
          onClose={handleCloseForm}
        />
      )}
    </>
  )
}

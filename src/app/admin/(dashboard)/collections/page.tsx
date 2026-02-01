/**
 * Admin Collections Page
 * Manage product collections (brands)
 */

import { createClient } from '@/lib/supabase/server'
import { CollectionList } from './CollectionList'

export default async function AdminCollectionsPage() {
  const supabase = await createClient()

  const { data: collections, error } = await supabase
    .from('collection')
    .select(`
      *,
      products:product(count)
    `)
    .order('display_order', { ascending: true })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Collection Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Failed to load collections: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Collection Management</h1>
          <p className="text-gray-600 mt-1">
            Manage product collections and brands
          </p>
        </div>
      </div>

      <CollectionList collections={collections || []} />
    </div>
  )
}

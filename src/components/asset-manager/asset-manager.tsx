"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

interface Asset {
  id: string
  name: string
  type: string
  url: string
  thumbnailUrl: string | null
  size: number
  mimeType: string
  width: number | null
  height: number | null
  duration: number | null
  projectId: string | null
  tags: string[]
  metadata: unknown
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const TYPE_COLORS: Record<string, string> = {
  IMAGE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  VIDEO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  AUDIO: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  MODEL_3D: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  DOCUMENT: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  OTHER: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function AssetManager() {
  const { data: _session } = useSession()
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [editForm, setEditForm] = useState<{ name: string; tags: string; projectId: string }>({ name: "", tags: "", projectId: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    let mounted = true
    const loadAssets = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
        })
        if (selectedType) params.set("type", selectedType)

        const res = await fetch(`/api/assets?${params}`)
        if (!res.ok) throw new Error("Failed to fetch assets")
        const data = await res.json()
        if (mounted) {
          setAssets(data.assets)
          setPagination(data.pagination)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch assets")
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }
    loadAssets()
    return () => { mounted = false }
  }, [pagination.page, pagination.limit, selectedType])

  const handleDelete = async (assetId: string) => {
    try {
      const res = await fetch(`/api/assets/${assetId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete asset")
      setAssets((prev) => prev.filter((a) => a.id !== assetId))
      setShowDeleteConfirm(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete asset")
    }
  }

  const handleFileUpload = async (files: FileList) => {
    for (const file of Array.from(files)) {
      try {
        // In a real app, you'd upload to a storage service (S3, Vercel Blob, etc.)
        // For now, we'll create a mock asset entry
        const formData = new FormData()
        formData.append("file", file)

        // Create a local object URL for preview
        const url = URL.createObjectURL(file)
        const thumbnailUrl = file.type.startsWith("image/") ? url : null

        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }))
        const res = await fetch("/api/assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            type: file.type.startsWith("image/") ? "IMAGE" :
                  file.type.startsWith("video/") ? "VIDEO" :
                  file.type.startsWith("audio/") ? "AUDIO" :
                  file.type.includes("3d") || file.type.includes("model") ? "MODEL_3D" :
                  file.type.includes("pdf") || file.type.includes("document") ? "DOCUMENT" : "OTHER",
            url,
            thumbnailUrl,
            size: file.size,
            mimeType: file.type,
            width: null,
            height: null,
            duration: null,
            projectId: null,
            tags: [],
            metadata: {},
          }),
        })
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }))

        if (!res.ok) throw new Error("Failed to create asset")
        const newAsset = await res.json()
        setAssets((prev) => [newAsset, ...prev])
      } catch (err) {
        console.error("Upload error:", err)
      }
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ""
    setUploadProgress({})
  }

  const handleUpdateAsset = async () => {
    if (!editingAsset) return
    try {
      const res = await fetch(`/api/assets/${editingAsset.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          tags: editForm.tags.split(",").map(t => t.trim()).filter(Boolean),
          projectId: editForm.projectId || null,
        }),
      })
      if (!res.ok) throw new Error("Failed to update asset")
      const updated = await res.json()
      setAssets((prev) => prev.map((a) => (a.id === editingAsset.id ? updated : a)))
      setEditingAsset(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update asset")
    }
  }

  const handleEditClick = (asset: Asset) => {
    setEditingAsset(asset)
    setEditForm({
      name: asset.name,
      tags: asset.tags.join(", "),
      projectId: asset.projectId || "",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "IMAGE": return "🖼️"
      case "VIDEO": return "🎬"
      case "AUDIO": return "🔊"
      case "MODEL_3D": return "📦"
      case "DOCUMENT": return "📄"
      default: return "📁"
    }
  }

  const renderAssetPreview = (asset: Asset) => {
    if (asset.type === "IMAGE" && asset.thumbnailUrl) {
      return <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-32 object-cover rounded-lg" />
    }
    if (asset.type === "VIDEO" && asset.thumbnailUrl) {
      return (
        <video src={asset.thumbnailUrl} className="w-full h-32 object-cover rounded-lg" muted loop />
      )
    }
    return (
      <div className="w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <span className="text-4xl">{getTypeIcon(asset.type)}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Asset Manager</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage images, videos, 3D models, and documents
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.obj,.fbx,.gltf,.glb"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Upload Assets
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              Add Files
            </Button>
          </div>
        </div>
        {Object.keys(uploadProgress).length > 0 && (
          <div className="max-w-7xl mx-auto px-4 pb-4">
            <div className="space-y-2">
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <div key={fileName} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">{fileName}</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">{progress}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Filter Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by type:</span>
          {["", "IMAGE", "VIDEO", "AUDIO", "MODEL_3D", "DOCUMENT", "OTHER"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type)
                setPagination((p) => ({ ...p, page: 1 }))
              }}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
              }`}
            >
              {type || "All"}
            </button>
          ))}
          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {pagination.total} assets
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Assets Grid */}
      <main className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="text-center py-12">Loading assets...</div>
        ) : assets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">No assets yet</p>
            <Button onClick={() => fileInputRef.current?.click()}>
              Upload your first asset
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {renderAssetPreview(asset)}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => setSelectedAsset(asset)}>
                        Preview
                      </Button>
                      <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleEditClick(asset); }}>
                        Edit
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => setShowDeleteConfirm(asset.id)}>
                        Delete
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${TYPE_COLORS[asset.type] || TYPE_COLORS.OTHER}`}>
                        {asset.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-gray-900 dark:text-white truncate" title={asset.name}>
                      {asset.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatSize(asset.size)} • {formatDate(asset.createdAt)}
                    </p>
                    {asset.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {asset.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                        {asset.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                            +{asset.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="max-w-7xl mx-auto mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedAsset(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedAsset.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAsset(null)}>
                ✕
              </Button>
            </div>
            <div className="p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 min-w-0">
                {selectedAsset.type === "IMAGE" && selectedAsset.thumbnailUrl && (
                  <img src={selectedAsset.thumbnailUrl} alt={selectedAsset.name} className="w-full max-h-[60vh] object-contain rounded-lg" />
                )}
                {selectedAsset.type === "VIDEO" && selectedAsset.thumbnailUrl && (
                  <video src={selectedAsset.thumbnailUrl} controls className="w-full max-h-[60vh] rounded-lg" />
                )}
                {selectedAsset.type === "AUDIO" && selectedAsset.thumbnailUrl && (
                  <audio src={selectedAsset.thumbnailUrl} controls className="w-full" />
                )}
                {selectedAsset.type === "MODEL_3D" && (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="text-6xl">📦</span>
                    <p className="ml-4 text-gray-600 dark:text-gray-400">3D Model Preview (requires WebGL)</p>
                  </div>
                )}
                {!["IMAGE", "VIDEO", "AUDIO", "MODEL_3D"].includes(selectedAsset.type) && (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="text-6xl">{getTypeIcon(selectedAsset.type)}</span>
                  </div>
                )}
              </div>
              <div className="w-full md:w-80 space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Details</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Type</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{selectedAsset.type}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Size</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{formatSize(selectedAsset.size)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">MIME Type</dt>
                      <dd className="font-medium text-gray-900 dark:text-white font-mono text-xs">{selectedAsset.mimeType}</dd>
                    </div>
                    {selectedAsset.width && selectedAsset.height && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500 dark:text-gray-400">Dimensions</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">{selectedAsset.width} × {selectedAsset.height}</dd>
                      </div>
                    )}
                    {selectedAsset.duration && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500 dark:text-gray-400">Duration</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">{selectedAsset.duration.toFixed(1)}s</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Created</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{formatDate(selectedAsset.createdAt)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Updated</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{formatDate(selectedAsset.updatedAt)}</dd>
                    </div>
                    {selectedAsset.tags.length > 0 && (
                      <div>
                        <dt className="text-gray-500 dark:text-gray-400">Tags</dt>
                        <dd className="mt-1 flex flex-wrap gap-1">
                          {selectedAsset.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                              {tag}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedAsset(null)}>Close</Button>
                  <Button variant="secondary" onClick={() => handleEditClick(selectedAsset)}>Edit</Button>
                  <Button variant="destructive" onClick={() => { setShowDeleteConfirm(selectedAsset.id); setSelectedAsset(null); }}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Asset Modal */}
      {editingAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEditingAsset(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Asset</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project ID (optional)</label>
                <input
                  type="text"
                  value={editForm.projectId}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, projectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Project ID"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingAsset(null)}>Cancel</Button>
              <Button onClick={handleUpdateAsset}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Asset?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
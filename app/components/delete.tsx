'use client'

import { useState } from 'react'

interface DeleteProps {
  id: string
  onDelete: (id: string) => void
}

const Delete: React.FC<DeleteProps> = ({ id, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await onDelete(id)
    } catch (err) {
      console.error('Error deleting todo:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
    >
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default Delete 
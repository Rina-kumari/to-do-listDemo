'use client'

import { useState } from 'react'

interface DeleteProps {
  id: string
  onDelete: () => void
}

const Delete: React.FC<DeleteProps> = ({ id, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      // Since we're working with local state, we can just call onDelete directly
      onDelete()
    } catch (error) {
      console.error('Error deleting todo:', error)
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
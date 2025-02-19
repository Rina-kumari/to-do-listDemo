import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log(`Deleting todo with id: ${id}`)
    
    // Here you would typically delete from your database
    // For now, we'll just return a success response
    
    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error deleting todo:', err)
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
} 
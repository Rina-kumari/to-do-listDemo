import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Here you would typically delete from your database
    // For now, we'll just return a success response
    
    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
} 
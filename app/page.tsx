"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Delete from './components/delete'
import { supabase } from '@/lib/supabaseClient'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('id, task_name, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        const formattedTodos: Todo[] = data.map(todo => ({
          id: todo.id,
          text: todo.task_name,
          completed: false // Default value since the field doesn't exist yet
        }))
        setTodos(formattedTodos)
      }
    } catch (error) {
      console.error('Error fetching todos:', error)
      setError('Failed to fetch todos')
    }
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTodo.trim()) return; // Don't add empty todos
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          {
            task_name: newTodo.trim(),
            is_complete: false,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      
      if (data) {
        const newTodoItem: Todo = {
          id: data[0].id,
          text: data[0].task_name,
          completed: false
        };
        setTodos(prevTodos => [newTodoItem, ...prevTodos]);
        setNewTodo("");
      }
    } catch (error) {
      const err = error as { message?: string };
      console.error('Error adding todo:', error);
      setError(err.message || 'Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const getRandomColor = () => {
    const colors = ["blue", "green", "yellow", "red", "purple"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vibrant-blue to-vibrant-purple p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-vibrant-green to-vibrant-yellow p-6">
          <h1 className="text-3xl font-bold text-white mb-4">To-Do List</h1>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a new task"
              className="flex-grow border-2 border-white bg-white/50 placeholder-white/70 text-white"
              disabled={isLoading}
            />
            <Button
              onClick={handleAddTodo}
              className="bg-white text-vibrant-purple hover:bg-vibrant-yellow hover:text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 px-6 py-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`py-3 flex items-center space-x-3 ${todo.id === todos[0].id ? "pt-0" : ""} ${todo.id === todos[todos.length - 1].id ? "pb-0" : ""}`}
              >
                <span className={`w-3 h-3 rounded-full bg-vibrant-${getRandomColor()}`}></span>
                <span className="flex-grow text-gray-800">{todo.text}</span>
                <Delete id={todo.id} onDelete={() => handleDeleteTodo(todo.id)} />
              </li>
            ))
          ) : (
            <li className="py-3 text-center text-gray-500">No tasks yet. Add one above!</li>
          )}
        </ul>
      </div>
    </div>
  )
}
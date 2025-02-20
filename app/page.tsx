"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Delete from './components/delete'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Math.random().toString(36).substring(7),
        text: newTodo,
        completed: false
      }
      setTodos([...todos, todo])
      setNewTodo("")
    }
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
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
            />
            <Button
              onClick={handleAddTodo}
              className="bg-white text-vibrant-purple hover:bg-vibrant-yellow hover:text-white transition-colors"
            >
              Add ToDo
            </Button>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 px-6 py-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`py-3 flex items-center space-x-3 ${todo.id === todos[0].id ? "pt-0" : ""} ${todo.id === todos[todos.length - 1].id ? "pb-0" : ""}`}
            >
              <span className={`w-3 h-3 rounded-full bg-vibrant-${getRandomColor()}`}></span>
              <span className="flex-grow text-gray-800">{todo.text}</span>
              <Delete id={todo.id} onDelete={() => handleDeleteTodo(todo.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


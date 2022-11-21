import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectFirestore } from '../firebase'
import { checkDate } from '../utils/date'
import { ITodo, ITodoItem } from '../utils/types'
import { useUpdate } from './useUpdate'

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodoItem[]>([])
  const { loading, updateTodo } = useUpdate()
  const navigate = useNavigate()

  useEffect(() => {
    const todosRef = collection(projectFirestore, 'todos')
    const unsub = onSnapshot(query(todosRef), (todo) => {
      const state: any[] = []

      todo.forEach((d) => {
        state.push({ ...(d.data() as ITodoItem), id: d.id })
      })

      setTodos(state)
    })

    checkOutdatedTodos()

    return () => unsub()
  }, [loading, setTodos])

  const checkOutdatedTodos = () => {
    try {
      todos.forEach((todo) => {
        if (!checkDate(todo.completion)) {
          updateTodo(todo.id, {
            ...todo,
            status: 'outdated',
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const createTodo = async (data: ITodo) => {
    const todoRef = collection(projectFirestore, 'todos')

    const res = await addDoc(todoRef, {
      title: data.title,
      description: data.description,
      completion: data.completion,
      status: data.status,
    })
    navigate('/')
    return res.id
  }

  const deleteTodo = async (id: string) => {
    try {
      const todoRef = doc(projectFirestore, 'todos', id)

      await deleteDoc(todoRef)
    } catch (error) {
      console.log(error)
    }
  }

  return { todos, loading, createTodo, deleteTodo }
}

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
        state.push(d.data())
      })

      setTodos(state)
    })
    const f = async () => {
      await getTodos()
    }
    checkOutdatedTodos()
    f()
    return () => unsub()
  }, [loading, setTodos])

  const getTodos = async () => {
    const todosRef = collection(projectFirestore, 'todos')
    const state: ITodoItem[] = []

    try {
      const querySnapshot = await getDocs(todosRef)

      querySnapshot.forEach((todo) => {
        state.push({ ...(todo.data() as ITodo), id: todo.id })
      })
    } catch (error) {
      console.log(error)
    }

    setTodos(state)
    return state
  }

  const checkOutdatedTodos = () => {
    const currentDate = new Date()

    try {
      todos.forEach((todo) => {
        console.log(new Date(todo.completion) < currentDate)

        if (new Date(todo.completion) < currentDate) {
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
    const todoRef = doc(projectFirestore, 'todos', id)

    await deleteDoc(todoRef)
    await getTodos()
  }

  return { todos, createTodo, deleteTodo }
}

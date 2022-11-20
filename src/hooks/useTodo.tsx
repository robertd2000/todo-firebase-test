import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase'
import { ITodo, ITodoItem } from '../utils/types'
import { useUpdate } from './useUpdate'

export const useTodo = (id: string) => {
  const [todo, setTodo] = useState<ITodo>()
  const todoRef = doc(projectFirestore, 'todos', id)
  const { loading } = useUpdate()

  useEffect(() => {
    const f = async () => {
      const data = await getTodo()
      setTodo(data as ITodo)
    }

    f()
  }, [loading])

  const getTodo = async () => {
    return (await getDoc(todoRef)).data()
  }

  const deleteTodo = async () => {
    await deleteDoc(todoRef)
  }

  return { todo, deleteTodo }
}

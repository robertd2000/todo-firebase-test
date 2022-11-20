import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectFirestore } from '../firebase'
import { ITodo } from '../utils/types'

export const useUpdate = () => {
  const [loading, setLoading] = useState(false)

  const navigation = useNavigate()

  const updateTodo = async (id: string, data: ITodo) => {
    const todoRef = doc(projectFirestore, 'todos', id)
    setLoading(true)

    try {
      await updateDoc(todoRef, {
        ...data,
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    navigation('/')
  }

  const onCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    todo: ITodo
  ) => {
    setLoading(true)
    if (e.target.checked) {
      updateTodo(id!, {
        ...todo,
        status: 'done',
      })
    } else {
      updateTodo(id!, {
        ...todo,
        status: 'active',
      })
    }
    setLoading(false)
  }

  return { loading, updateTodo, onCheck }
}

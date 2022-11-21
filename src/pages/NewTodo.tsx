import React, { useState } from 'react'
import Form from '../components/Form'
import { useFiles } from '../hooks/useFiles'
import { useInput } from '../hooks/useInput'
import { useTodos } from '../hooks/useTodos'

const NewTodo = () => {
  const { createTodo } = useTodos()
  const { uploadFile } = useFiles('')
  const { inputData, setInputData } = useInput({
    title: '',
    description: '',
    completion: null,
  })
  const [files, setFiles] = useState<any>([])

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    })
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files && e.target.files)
  }

  const create = async () => {
    const id = await createTodo({ ...inputData, status: 'active' })

    uploadFile(id, files)
  }

  return (
    <>
      <Form
        text="Создать"
        inputData={inputData}
        onInput={onInput}
        onFile={onFile}
        onSubmit={create}
      />
    </>
  )
}

export default NewTodo

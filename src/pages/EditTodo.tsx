import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FilesItem from '../components/FilesItem'
import Form from '../components/Form'
import { useFiles } from '../hooks/useFiles'
import { useInput } from '../hooks/useInput'
import { useTodo } from '../hooks/useTodo'
import { useUpdate } from '../hooks/useUpdate'

const EditTodo = () => {
  const { id } = useParams()
  const { todo } = useTodo(id!)
  const { updateTodo } = useUpdate()
  const { uploadFile, files, deleteFile } = useFiles(id!)

  const { inputData, onInput, setInputData } = useInput({
    title: todo?.title || '',
    description: todo?.description || '',
    completion: todo?.completion ? new Date(todo?.completion!) : null,
  })
  const [filesState, setFiles] = useState<any>([])

  useEffect(() => {
    setInputData({
      title: todo?.title || '',
      description: todo?.description || '',
      completion: null,
    })
  }, [todo])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files && e.target.files)
  }

  const update = async () => {
    await updateTodo(id!, { ...todo!, ...inputData })

    uploadFile(id!, filesState)
  }

  return (
    <div>
      <Form
        text="Edit"
        inputData={inputData}
        onInput={onInput}
        onFile={onFile}
        onSubmit={update}
      />

      {files && <FilesItem files={files} deleteFile={deleteFile} />}
    </div>
  )
}

export default EditTodo

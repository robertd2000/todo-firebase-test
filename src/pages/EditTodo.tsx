import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
    completion: new Date(),
  })
  const [filesState, setFiles] = useState<any>([])

  useEffect(() => {
    setInputData({
      title: todo?.title || '',
      description: todo?.description || '',
      completion: todo?.completion ? new Date(todo?.completion!) : new Date(),
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

      {files && (
        <div className="">
          {files
            .filter((i) => !i.name.includes('item'))
            .map((file) => (
              <img
                className="img"
                key={file.name + Math.random() * 1000}
                src={file.url}
                alt=""
                onClick={() => deleteFile(file.name)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default EditTodo

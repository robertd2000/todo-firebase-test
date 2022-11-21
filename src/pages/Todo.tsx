import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import FilesItem from '../components/FilesItem'
import { useFiles } from '../hooks/useFiles'
import { useTodo } from '../hooks/useTodo'

const Todo = () => {
  const { id } = useParams()
  const { todo, deleteTodo } = useTodo(id!)
  const { files } = useFiles(id!)
  const navigate = useNavigate()

  const onDelete = () => {
    deleteTodo()
    navigate('/')
  }

  if (!todo) {
    return <div>Нет записей...</div>
  }

  return (
    <div className="todo">
      <div className="todo__item">
        <div className="todo__content">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>
            Выполнить до{' '}
            {todo.completion && new Date(todo.completion).toLocaleDateString()}
          </p>
          <p>Статус задачи: {todo.status}</p>
        </div>
      </div>

      <div className="controls">
        <Link to={`/todos/edit/${id}`}>
          <button className="btn"> Изменить </button>
        </Link>

        <button className="btn delete" onClick={onDelete}>
          {' '}
          Удалить{' '}
        </button>
      </div>

      {files && (
        <div className="">
          <FilesItem files={files} />
        </div>
      )}
    </div>
  )
}

export default Todo

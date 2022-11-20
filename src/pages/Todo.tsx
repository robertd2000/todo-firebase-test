import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useFiles } from '../hooks/useFiles'
import { useTodo } from '../hooks/useTodo'

const Todo = () => {
  const { id } = useParams()
  const { todo } = useTodo(id!)
  const { files } = useFiles(id!)

  if (!todo) {
    return <div>No data</div>
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

      <Link to={`/todos/edit/${id}`}>
        <button className="btn"> Edit </button>
      </Link>

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
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default Todo

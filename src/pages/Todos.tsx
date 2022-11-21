import Loading from '../components/Loading'
import TodoItem from '../components/TodoItem'
import { useTodos } from '../hooks/useTodos'

const Todos = () => {
  const { todos, loading } = useTodos()

  if (loading) return <Loading />
  return (
    <div className="todo__content">
      <h2>Todos</h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default Todos

import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTodo } from '../hooks/useTodo'
import { useTodos } from '../hooks/useTodos'
import { useUpdate } from '../hooks/useUpdate'
import { ITodoItem } from '../utils/types'

const TodoItem: FC<{ todo: ITodoItem }> = ({ todo }) => {
  const [check, setCheck] = useState(todo?.status === 'done')
  const { onCheck } = useUpdate()
  const { deleteTodo } = useTodos()

  const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(e, todo.id, todo)
    setCheck(!check)
  }

  const todoItemStatus =
    todo.status === 'outdated'
      ? 'outdated'
      : todo.status === 'done'
      ? 'done'
      : ''

  return (
    <div className={`todo__item ${todoItemStatus}`} key={todo.id}>
      <input
        className="check__box"
        type="checkbox"
        onChange={onCheckChange}
        checked={check}
        disabled={todo.status === 'outdated'}
      />

      <div className="todo__content">
        <Link to={`todos/${todo.id}`}>
          <h3>{todo.title}</h3>
        </Link>
        <p>{todo.description}</p>
      </div>
      <div className="trash" onClick={() => deleteTodo(todo.id)}>
        🗑
      </div>
    </div>
  )
}

export default TodoItem

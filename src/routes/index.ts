import EditTodo from '../pages/EditTodo'
import NewTodo from '../pages/NewTodo'
import Todo from '../pages/Todo'
import Todos from '../pages/Todos'

export interface IRoute {
  path: string
  element: React.ComponentType
}

export enum RouteNames {
  HOME = '/',
  TODO = '/todos/:id',
  NEW_TODO = '/todos/new',
  EDIT_TODO = '/todos/edit/:id',
}

export const routes: IRoute[] = [
  { path: RouteNames.HOME, element: Todos },
  { path: RouteNames.TODO, element: Todo },
  { path: RouteNames.NEW_TODO, element: NewTodo },
  { path: RouteNames.EDIT_TODO, element: EditTodo },
]

export interface ITodo {
  title: string
  description: string
  completion: Date

  status: 'done' | 'active' | 'outdated'
}

export interface ITodoItem extends ITodo {
  id: string
}

export interface IInputData {
  title: string
  description: string
  completion: Date
}

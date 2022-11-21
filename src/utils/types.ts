export interface ITodo {
  title: string
  description: string
  completion: Date | null

  status: 'done' | 'active' | 'outdated'
}

export interface ITodoItem extends ITodo {
  id: string
}

export interface IInputData {
  title: string
  description: string
  completion: Date | null
}

export interface IFile {
  name: string
  url: string
}

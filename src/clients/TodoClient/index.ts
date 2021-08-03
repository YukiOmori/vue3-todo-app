import { Params, Todo } from '@/store/todo/types'
import { TodoClientInterface } from './types'

export class TodoClient implements TodoClientInterface {
  getAll (): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      resolve(Object.keys(localStorage)
        .filter((key) => !isNaN(Number(key)))
        .map((key) => {
          const todo = JSON.parse(localStorage.getItem(key) as string) as Todo
          todo.createdAt = new Date(todo.createdAt)
          todo.updatedAt = new Date(todo.updatedAt)
          return todo
        }))
    }
    )
  }

  get (id: number): Promise<Todo> {
    return new Promise((resolve, reject) => {
      const item = localStorage.getItem(String(id))
      if (item === null) {
        reject(new Error(`id: ${id} is not found`))
      } else {
        resolve(JSON.parse(item) as Todo)
      }
    })
  }

  create (params: Params): Promise<Todo> {
    return new Promise((resolve, reject) => {
      const todo = this.intitializeTodo(params)
      localStorage.setItem(String(todo.id), JSON.stringify(todo))
      resolve(todo)
    })
  }

  update (todo: Todo): Promise<Todo> {
    const { id } = todo
    localStorage.removeItem(String(id))
    todo.updatedAt = new Date()
    localStorage.setItem(String(id), JSON.stringify(todo))
    return Promise.resolve(todo)
  }

  delete (id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(String(id))
      resolve()
    })
  }

  intitializeTodo (todo: Params) {
    const date = new Date()
    return {
      id: date.getTime(),
      title: todo.title,
      description: todo.description,
      status: todo.status,
      createdAt: date,
      updatedAt: date
    } as Todo
  }
}

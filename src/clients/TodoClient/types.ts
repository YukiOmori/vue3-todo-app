import { Todo, Params } from '@/store/todo/types'

export interface TodoClientInterface {
  getAll(): Promise<Todo[]>

  get(id: number): Promise<Todo>

  create(params: Params): Promise<Todo>

  update(todo: Todo): Promise<Todo>

  delete(id: number): Promise<void>
}

<template>
  <h1>TODO一覧</h1>

  <todo-item v-for="todo in todoStore.state.todos" :key="todo.id" @on-click-title="onClickTitle" @on-click-delete="onClickDelete" :todo="todo" />

  <router-link to="/new">新規作成</router-link>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { todoKey } from '@/store/todo'
import TodoItem from '@/components/TodoItem.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    TodoItem
  },
  setup () {
    const todoStore = inject(todoKey)
    const router = useRouter()

    if (!todoStore) {
      throw new Error('todoStore is not provided')
    }
    const onClickTitle = (id: number) => {
      console.log(todoStore.getTodo(id))
      router.push(`/edit/${id}`)
    }

    const onClickDelete = (id: number) => {
      console.log(`${id} dlete clicked`)
      todoStore.deleteTodo(id)
    }
    return {
      todoStore,
      onClickTitle,
      onClickDelete
    }
  }
})

</script>

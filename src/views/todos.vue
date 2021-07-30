<template>
  <div id="todo-list">
    <div v-for="todo in todoStore.state.todos" :key="todo.id">
      <p>{{ todo.title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { todoKey } from '@/store/todo'

export default defineComponent({
  setup () {
    const todoStore = inject(todoKey)
    if (!todoStore) {
      throw new Error('todoStore is not provided')
    }

    return {
      todoStore
    }
  }
})
</script>

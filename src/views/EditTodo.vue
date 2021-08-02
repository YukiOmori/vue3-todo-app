<template>
  <h1>TODOの編集</h1>
  <div v-if="error">id: {{ $route.params.id }}のtodoは存在しません</div>
  <form v-else @submit="onSubmit">
    <div>
      <label for="title">title</label>
      <input id="title" v-model="data.title" />
    </div>

    <div>
      <label for="description">description</label>
      <input id="description" v-model="data.description" />
    </div>

    <div>
      <select-status :status="data.status" @onChangeOption="onChangeOption"/>
    </div>

    <button>更新</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { todoKey } from '@/store/todo'
import { inject, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { Params, Status } from '@/store/todo/types'
import SelectStatus from '@/components/common/SelectStatus.vue'

export default defineComponent({
  components: {
    SelectStatus
  },
  setup () {
    const todoStore = inject(todoKey)

    if (!todoStore) {
      throw new Error('cannot find todo')
    }

    const router = useRouter()
    const route = useRoute()

    const id = Number(route.params.id)

    try {
      const todo = todoStore.getTodo(id)

      const data = reactive<Params>({
        title: todo.title,
        description: todo.description,
        status: todo.status
      })
      const onSubmit = () => {
        todoStore.updateTodo({
          id,
          ...data,
          createdAt: todo.createdAt,
          updatedAt: new Date()
        })
        router.push('/')
      }

      const onChangeOption = (option: Status) => {
        data.status = option
      }

      return {
        error: false,
        data,
        onSubmit,
        onChangeOption
      }
    } catch (e) {
      console.error(e)
      return {
        error: true
      }
    }
  }
})
</script>

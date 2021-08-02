<template>
  <h1>TODOを作成する</h1>

  <form action="" @submit.prevent="onSubmit">
    <div>
    <label for="title">title</label>
    <input id="title" v-model="data.title" />
    </div>

    <div>
    <label for="description">description</label>
    <textarea id="description" v-model="data.description" />
    </div>

    <div>
      <label for="status">status</label>
        <select id="status" v-model="data.status">
          <option  v-for="option, index in options" :key="index" :value="option">{{ option }}</option>
        </select>
    </div>

    <button>作成</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { todoKey } from '@/store/todo'
import { Params } from '@/store/todo/types'

export default defineComponent({
  setup () {
    const todoStore = inject(todoKey)
    if (!todoStore) {
      throw new Error('todoStore does not exist')
    }

    const router = useRouter()

    const options = ['waiting', 'working', 'completed', 'pending']

    const data = reactive<Params>({
      title: '',
      description: '',
      status: 'waiting'
    })
    console.log(data)

    const onSubmit = () => {
      console.log(data)
      todoStore.addTodo(data)
      router.push('/')
    }

    return {
      data,
      options,
      onSubmit
    }
  }
})
</script>

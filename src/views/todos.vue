<template>
  <h1>TODO一覧</h1>

  <div v-if="error">
    {{ error.message }}
  </div>
  <Suspense v-else>
    <template #default>
      <AsyncTodos />
    </template>
    <template #fallback>
      <div>...</div>
    </template>
  </Suspense>
  <router-link to="/new">新規作成</router-link>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'
import AsyncTodos from '@/components/AsyncTodos.vue'

export default defineComponent({
  components: {
    AsyncTodos
  },
  setup () {
    const error = ref<unknown>(null)
    onErrorCaptured((e) => {
      error.value = e
      return true
    })

    return {
      error
    }
  }
})

</script>

<template>
  <label for="status">status</label>
  <select name="status" id="status" @change="onChangeOption">
    <option v-for="option, index in options" :key="index" :value="option" :selected="option === status">{{ option }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Status } from '@/store/todo/types'

export default defineComponent({
  name: 'Se;ectStatus',
  props: {
    status: {
      type: String as PropType<Status>,
      required: true
    }
  },
  emits: ['onChangeOption'],
  setup (_, { emit }) {
    const options = ['waiting', 'working', 'completed', 'pending']

    const onChangeOption = (event: Event) => {
      if (event.target instanceof HTMLSelectElement) {
        emit('onChangeOption', event.target.value)
      }
    }

    return {
      options,
      onChangeOption
    }
  }
})
</script>

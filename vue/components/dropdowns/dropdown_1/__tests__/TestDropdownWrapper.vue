<template>
  <dropdown>
    <template #trigger>
      <button class="trigger-button">
        ...
      </button>
    </template>
    <li
      v-for="(item, index) in actions"
      :key="index"
    >
      <a href="#">
        {{ item }}
      </a>
    </li>
  </dropdown>
</template>

<script>
import Dropdown from '../Dropdown'

export default {
  components: { Dropdown },
  props: {
    actions: {
      type: Array,
      default: () => []
    }
  }
}
</script>

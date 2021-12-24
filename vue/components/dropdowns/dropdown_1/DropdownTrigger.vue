<template>
  <button
    :class="[
      'dropdown-trigger__button',
      `dropdown-trigger__button--${size}`
    ]"
  >
    <Icon
      icon="DotsVerticalIcon"
      height="15px"
      width="15px"
    />
  </button>
</template>

<script>
import { Icon } from '../index'
export default {
  components: { Icon },
  props: {
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

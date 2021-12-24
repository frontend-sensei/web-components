<template>
  <button
    :class="[
      'btn',
      btnVariantClass
    ]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
const ALLOWED_VARIANTS = [
  'blue',
  'green',

  'outline-blue',
  'outline-green',

  'link-blue',
  'link-green'
]

export default {
  props: {
    variant: {
      type: String,
      default: '',
      validator(variant) {
        return ALLOWED_VARIANTS.includes(variant)
      }
    }
  },
  computed: {
    btnVariantClass() {
      return `btn-${this.variant}`
    }
  }
}
</script>

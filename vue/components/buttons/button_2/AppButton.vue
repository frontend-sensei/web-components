<template>
  <button
    :class="[
      'btn',
      btnClasses,
      btnModifierClasses
    ]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
const ALLOWED_VARIANTS = new Set([
  'primary',
  'secondary',
  'blue',
  'gray',

  'outline-primary',
  'outline-secondary',
  'outline-blue',
  'outline-gray',

  'link-primary',
  'link-secondary',
  'link-blue',
  'link-gray'
])
const ALLOWED_SIZES = new Set([
  'lg',
  'md',
  'sm'
])
const ALLOWED_MODIFIERS = new Set([
  'fluid'
])

export default {
  props: {
    variant: {
      type: String,
      default: '',
      validator (variant) {
        return ALLOWED_VARIANTS.has(variant)
      }
    },
    size: {
      type: String,
      default: 'md',
      validator (size) {
        return ALLOWED_SIZES.has(size)
      }
    },
    modifiers: {
      type: String,
      validator (modifiers) {
        return modifiers.split(' ')
          .every(modifierName => {
            return ALLOWED_MODIFIERS.has(modifierName)
          })
      }
    }
  },
  computed: {
    btnClasses () {
      return `btn-${this.variant} btn-${this.size}`
    },
    btnModifierClasses () {
      if (!this.modifiers) {
        return ''
      }
      return this.modifiers.split(' ')
        .map(modifierName => `btn--${modifierName}`)
        .join(' ')
    }
  }
}
</script>

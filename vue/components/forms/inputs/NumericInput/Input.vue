<template>
  <div
    :class="[
      'input-wrapper',
      wrapperClasses
    ]"
  >
    <div
      :class="[
        'input__icon',
        iconPositioningClass,
        'flex-centered-y'
      ]"
    >
      <slot name="icon" />
    </div>
    <input
      :class="[
        'input',
        inputClasses
      ]"
      :value="value"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="listeners"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { default: '' },
    wrapperClasses: {
      type: String,
      default: ''
    },
    inputClasses: {
      type: String,
      default: ''
    },

    /**
     * Side for positioning
     * @values: left, right
     */
    iconPositioning: {
      type: String,
      default: 'left',
      validator(value) {
        return Boolean(value)
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    },
    iconPositioningClass() {
      return `input__icon--${this.iconPositioning}`
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

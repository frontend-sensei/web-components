<template>
  <div :class="['input-wrapper', wrapperClasses]">
    <div :class="['input__icon', iconPositioningClass, 'flex-centered-y']">
      <slot name="icon" />
    </div>
    <input
      :class="['input', inputClasses]"
      :value="value"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { default: "" },
    wrapperClasses: {
      type: String,
      default: "",
    },
    inputClasses: {
      type: String,
      default: "",
    },

    /**
     * Side for positioning
     * @values: left, right
     */
    iconPositioning: {
      type: String,
      default: "left",
      validator(value) {
        return Boolean(value);
      },
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
    iconPositioningClass() {
      return `input__icon--${this.iconPositioning}`;
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 8px 15px;
  max-height: 36px;
  font-size: 0.9rem;
  border: 0;
  box-shadow: none;
  border-radius: 30px;
  background-color: #f3f5f7;
  transition: 0.25s ease-in-out;

  &:focus {
    border: none;
    box-shadow: inset 0 0 0 2px #0e4f9c;
  }

  &-wrapper {
    position: relative;
    width: 100%;
  }

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &--left:not(:empty) {
      left: 8px;

      + {
        .input {
          padding: 8px 15px 8px 30px;
        }
      }
    }
    &--right:not(:empty) {
      right: 8px;

      + {
        .input {
          padding: 8px 30px 8px 15px;
          [type="search"] {
            padding: 8px 30px 8px 15px;
          }
        }
      }
    }
  }

  &-style {
    &--1 {
      background-color: #fff;
      box-shadow: inset 0 0 0 2px #cccccc;
    }
  }
}
</style>

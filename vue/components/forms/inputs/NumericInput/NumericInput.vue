<template>
  <div class="numeric-input-wrapper">
    <button class="numeric-input-button" @click="decrease">-</button>
    <input
      type="number"
      class="numeric-input"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    />
    <button class="numeric-input-button" @click="increase">+</button>
  </div>
</template>

<script>
export default {
  name: "NumericInput",
  inheritAttrs: false,
  model: {
    prop: "propValue",
    event: "input",
  },
  props: {
    propValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    propValue: {
      immediate: true,
      handler() {
        this.setInputValue(this.propValue);
      },
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.inputHandler,
      };
    },
  },
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    inputHandler(event) {
      this.setInputValue(event.target.value);
    },
    setInputValue(value) {
      const number = Number(value);
      this.value = "";
      this.value = number ? Math.max(this.min, number) : this.min;
      this.updateValue();
    },
    increase() {
      this.setInputValue(++this.value);
    },
    decrease() {
      this.setInputValue(--this.value);
    },
    updateValue() {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.numeric-input {
  margin: 0 -2px;
  width: 52px;
  height: 100%;
  color: #333333;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #c6cbd4;
  &-wrapper {
    height: 32px;
    white-space: nowrap;
  }
  &-button {
    padding: 10px;
    width: 32px;
    height: 100%;
    line-height: 0;
    font-size: 16px;
    border-radius: 2px;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #c6cbd4;
  }
}
</style>

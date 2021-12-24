<template>
  <div class="progress-bar">
    <div class="progress-bar__line" :style="progressBarLineStyles"></div>
  </div>
</template>

<script>
const PROGRESS_BAR_LINE_BG_COLORS = new Map(
  Object.entries({
    primary: "RGB(var(--color-primary))",
  })
);

export default {
  name: "ProgressBar",
  props: {
    color: {
      type: String,
      validator(color) {
        return PROGRESS_BAR_LINE_BG_COLORS.has(color);
      },
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    progressBarLineColor() {
      return PROGRESS_BAR_LINE_BG_COLORS[this.color];
    },
    progressBarLineStyles() {
      return {
        width: `${this.progress}%`,
        backgroundColor: "RGB(var(--color-primary))",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.progress-bar {
  height: 20px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.14);
  &__line {
    height: 100%;
    transition: 0.2s ease-in-out;
  }
}
</style>

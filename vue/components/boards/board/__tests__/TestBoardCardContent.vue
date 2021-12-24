<template>
  <div>
    <div class="board-card__head mb-3">
      <span class="text-uppercase font-size--16 text-color--blue-200">
        {{ card.job_id }}
      </span>
      <span class="font--semi">
        {{ card.title }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => Object(),
    },
  },
};
</script>

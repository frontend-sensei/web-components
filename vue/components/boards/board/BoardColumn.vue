<template>
  <div class="board__column">
    <header class="board-column__header">
      <slot name="column-header" :column="column" :cards="cards" />
    </header>
    <draggable
      class="board-column__body board-scrollbar"
      tag="ul"
      group="cards"
      ghost-class="moving-card"
      handle=".board-card__handler"
      :data-status="column.name"
      :list="cards"
      :animation="200"
      :move="emitEvent"
      @start="emitEvent"
      @add="emitEvent"
      @remove="emitEvent"
      @end="emitEvent"
    >
      <li
        v-for="(card, index) in cards"
        :key="index"
        :data-id="setId(card)"
        class="board__card"
      >
        <span
          :class="[
            'board__card-border-left',
            `status-bg-color--${column.color}`,
          ]"
        />
        <div class="board-card__handler">
          <!-- <icon icon="DragCardIcon" color="#7c878b" width="12px" /> -->
        </div>
        <!-- Card content -->
        <div class="board-card__content">
          <slot name="card-content" :card="card" />
        </div>
      </li>
    </draggable>
  </div>
</template>

<script>
// "vuedraggable": "^2.24.0"
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    column: {
      type: Object,
      default: () => [],
    },
    cards: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    setId(card) {
      return card?.id ? card.id : "";
    },
    emitEvent(event) {
      if (event.hasOwnProperty("dragged")) event.type = "move";
      this.$emit(event.type, event);
    },
  },
};
</script>

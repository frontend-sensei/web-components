<template>
  <section v-on="$listeners">
    <board-column
      v-for="(column, index) in columns"
      :key="index"
      :column="column"
      :cards="sortedCardsByColumns[column.name]"
      @start="onStart($event, column)"
      @move="onMove($event, column)"
      @add="onAdd($event, column)"
      @remove="onRemove($event, column)"
      @end="onEnd($event, column)"
    >
      <template #column-header="{ column, cards }">
        <slot name="column-header" :column="column" :cards="cards" />
      </template>
      <template #card-content="{ card }">
        <slot name="card-content" :card="card" />
      </template>
    </board-column>
  </section>
</template>

<script>
import BoardColumn from "./BoardColumn";
import { isFunction } from "./isFunction";
import { keyBy } from "lodash";

const DEFAULT_SORT_COLUMN = "status";

export default {
  components: { BoardColumn },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    cards: {
      type: Array,
      default: () => [],
    },
    sortColumn: {
      type: String,
      default: () => DEFAULT_SORT_COLUMN,
    },
  },
  data() {
    return {
      sortedCardsByColumns: {},
      draggedElement: null,
      cardsList: [],
    };
  },
  watch: {
    cards: {
      immediate: true,
      handler() {
        this.cardsList = keyBy(this.cards, "id");
        this.sortCardsByColumns();
      },
    },
    cardsList() {
      this.sortCardsByColumns();
    },
  },
  methods: {
    onStart(event, column) {
      if (
        column.hasOwnProperty("onStartCallback") &&
        isFunction(column.onStartCallback)
      ) {
        return column.onStartCallback(event, column);
      }
    },
    onMove(event, column) {
      this.draggedElement = event.draggedContext.element;
      if (
        column.hasOwnProperty("onMoveCallback") &&
        isFunction(column.onMoveCallback)
      ) {
        return column.onMoveCallback(event, column);
      }
    },
    onAdd(event, column) {
      if (column.hasOwnProperty("onAddHook") && isFunction(column.onAddHook)) {
        return column.onAddHook(event, column, this.updateCardStatus);
      }
      if (
        column.hasOwnProperty("onAddCallback") &&
        isFunction(column.onAddCallback)
      ) {
        return new Promise((resolve, reject) => {
          const options = {
            resolve,
            reject,
          };
          column.onAddCallback(event, column, options);
        })
          .then(() => this.updateCardStatus(event))
          .catch(() => {
            delete this.cardsList[this.draggedElement.id];
            this.$set(
              this.cardsList,
              this.draggedElement.id,
              this.draggedElement
            );
          });
      }
      this.updateCardStatus(event);
    },
    onRemove(event, column) {
      if (
        column.hasOwnProperty("onRemoveCallback") &&
        isFunction(column.onRemoveCallback)
      ) {
        return column.onRemoveCallback(event, column);
      }
    },
    onEnd(event, column) {
      if (
        column.hasOwnProperty("onEndCallback") &&
        isFunction(column.onEndCallback)
      ) {
        return column.onEndCallback(event, column);
      }
    },

    updateCardStatus(event) {
      this.draggedElement.status = event.to.dataset.status;
    },
    sortCardsByColumns() {
      const columns = this.columns.map((column) => {
        const { name } = column;
        this.$set(this.sortedCardsByColumns, name, []);

        return name;
      });

      Object.values(this.cardsList).map(
        (card) =>
          columns.includes(card[this.sortColumn]) &&
          this.sortedCardsByColumns[card[this.sortColumn]].push(card)
      );
    },
  },
};
</script>

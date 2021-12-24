<template>
  <div>
    <Board
      :columns="columns"
      :cards="cards"
    >
      <template #card-content="{ card }">
        <test-board-card-content :card="card" />
      </template>
    </Board>
  </div>
</template>

<script>
import Board from '../Board'
import TestBoardCardContent from './TestBoardCardContent'

export default {
  components: {
    Board,
    TestBoardCardContent
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    cards: {
      type: Array,
      default: () => []
    }
  }
}
</script>

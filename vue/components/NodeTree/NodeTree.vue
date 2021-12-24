<template>
  <div class="root-tree">
    <NodeTreeItem
      v-for="(node, nodeIndex) in nodes"
      :key="nodeIndex"
      :node="node"
    >
      <template #node-label="{ node }">
        <slot
          name="node-label"
          :node="node"
        />
      </template>
    </NodeTreeItem>
  </div>
</template>

<script>
import NodeTreeItem from './NodeTreeItem'

export default {
  name: 'NodeTree',
  components: { NodeTreeItem },
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    dropdown: {
      type: Boolean,
      default: true
    },
    checkable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    nodes: {
      immediate: true,
      handler() {
        this.setData()
      }
    }
  },
  methods: {
    setData() {
      this.nodes.forEach((node) => {
        if(this.checkable) {
          this.$set(node, 'checked', node.checked || false)
        }

        if(this.dropdown) {
          this.$set(node, 'isExpanded', true)
        }

        this.setDataToChildren(node)
      })
    },
    setDataToChildren(node) {
      node.children.forEach((child) => {
        if(this.checkable) {
          this.$set(child, 'checked', child.checked || false)
        }

        if(this.dropdown) {
          this.$set(child, 'isExpanded', true)
        }

        child.parentNode = node

        this.setDataToChildren(child)
      })
    }
  }
}
</script>

<style lang="scss">
.root-tree {
  & > .node-tree {
    margin: 0
  }
}
.node-tree {
  margin-left: 1rem;

  &__label {
    padding: 5px;
    display: flex
  }

  &__arrow {
    cursor: pointer;
    transform: rotate(-90deg);
    transition: .2s ease-in-out;

    &--expanded {
      transform: rotate(90deg);
    }
  }

  &--not-expanded {
    & > .node-tree {
      display: none;
    }
  }
}
</style>

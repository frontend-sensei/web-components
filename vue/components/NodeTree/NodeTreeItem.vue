<template>
  <div
    :class="[
      'node-tree',
      !isExpanded && 'node-tree--not-expanded',
    ]"
  >
    <div class="node-tree__label">
      <slot
        name="node-label"
        :node="node"
      />
      <div
        v-if="showExpandArrow"
        :class="[
          'node-tree__arrow',
          isExpanded && 'node-tree__arrow--expanded'
        ]"
        @click="toggleExpand"
      >
        <slot
          name="node-label-arrow"
          :node="node"
        >
          <div>
            >
          </div>
        </slot>
      </div>
    </div>

    <NodeTreeItem
      v-for="(child, childIndex) in node.children"
      :key="childIndex"
      :node="child"
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
export default {
  name: 'NodeTreeItem',
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isExpandable() {
      return this.node.hasOwnProperty('isExpanded')
    },
    hasChildren() {
      return this.node.children.length
    },
    showExpandArrow() {
      return this.isExpandable && this.hasChildren
    },
    isExpanded() {
      return this.node.isExpanded
    }
  },
  methods: {
    toggleExpand() {
      this.node.isExpanded = !this.node.isExpanded
    }
  }
}
</script>

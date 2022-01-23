<template>
  <div :class="['tabs', wrapperClass]">
    <ul :class="['tabs-header-list', headerClass]" v-if="tabs.length">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="[
          'tabs-header-list__item',
          headerItemClass,
          isSelected(index) && `tab--selected ${headerItemSelectedClass}`
        ]"
        v-html="tab.title"
      ></li>
    </ul>
    <div :class="tabsContentClass">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wrapperClass: {
      type: String,
      default: ''
    },
    headerClass: {
      type: String,
      default: ''
    },
    headerItemClass: {
      type: String,
      default: ''
    },
    headerItemSelectedClass: {
      type: String,
      default: ''
    },
    tabsContentClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedIndex: 0,
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    isSelected (index) {
      return this.selectedIndex === index
    },
    selectTab (index) {
      this.selectedIndex = index

      this.tabs.forEach((tab, tabIndex) => {
        tab.isActive = (tabIndex === index)
      })
    }
  }
}
</script>

<style lang="scss">
.tabs-header-list {
  list-style-type: none;
}
</style>

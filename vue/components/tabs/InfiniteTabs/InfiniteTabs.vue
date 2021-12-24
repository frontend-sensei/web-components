<template>
  <div class="tabs">
    <div
      :class="['tab', getTabActiveClass(tab.id)]"
      v-for="tab in tabsPerView"
      :key="tab.id"
      @click="switchByClickHandler(tab.id)"
    >
      {{ tab.id }}
    </div>
  </div>
</template>

<script>
const TABS_PER_VIEW_COUNT = 4;

export default {
  name: "HelloWorld",
  data() {
    return {
      tabs: [],
      tabsPerView: [],
      activeTabId: this.$route.params.id,
    };
  },
  methods: {
    getCurrentTabs() {
      const activeTabIndex = this.getActiveTabIndex(this.activeTabId);

      // get first tabs
      if (activeTabIndex < TABS_PER_VIEW_COUNT) {
        this.tabsPerView = this.getFirstTabs();
        return;
      }

      // get last tabs
      if (this.tabs.length <= activeTabIndex + TABS_PER_VIEW_COUNT) {
        this.tabsPerView = this.getLastTabs();
        return;
      }

      // get tabs by index
      this.tabsPerView = this.getTabsFromIndex(
        activeTabIndex,
        activeTabIndex + TABS_PER_VIEW_COUNT
      );
    },
    getActiveTabIndex(tabId) {
      return this.tabs.findIndex((tab) => +tab.id === +tabId);
    },
    getTabsFromIndex(from, to) {
      return this.tabs.slice(from, to);
    },
    getFirstTabs() {
      return this.tabs.slice(0, TABS_PER_VIEW_COUNT);
    },
    getLastTabs() {
      return this.tabs.slice(
        this.tabs.length - TABS_PER_VIEW_COUNT,
        this.tabs.length
      );
    },

    // setup navigation tabs view
    addNavigationListeners() {
      window.addEventListener("keydown", this.navigationHandler);
    },
    removeNavigationListeners() {
      window.removeEventListener("keydown", this.navigationHandler);
    },
    navigationHandler(event) {
      // left
      if (event.keyCode === 37) {
        this.switchToPreviousTab();
      }

      // right
      if (event.keyCode === 39) {
        this.switchToNextTab();
      }
    },

    // change tabs view by switching
    switchToPreviousTab() {
      const tabIndexInCurrentTabs = this.getTabIndexInCurrentTabs();

      if (tabIndexInCurrentTabs === 0) {
        const activeTabIndex = this.getActiveTabIndex(this.activeTabId);
        const previousTab = this.tabs[activeTabIndex - 1];

        if (!previousTab) {
          this.tabsPerView = this.getLastTabs();
          this.activeTabId = this.tabsPerView[TABS_PER_VIEW_COUNT - 1].id;
          return;
        }

        this.tabsPerView.pop();
        this.tabsPerView.unshift(previousTab);
        this.activeTabId = previousTab.id;
        return;
      }
      this.activeTabId = this.tabsPerView[tabIndexInCurrentTabs - 1].id;
    },
    switchToNextTab() {
      const tabIndexInCurrentTabs = this.getTabIndexInCurrentTabs();

      if (tabIndexInCurrentTabs === TABS_PER_VIEW_COUNT - 1) {
        const activeTabIndex = this.getActiveTabIndex(this.activeTabId);
        const nextTab = this.tabs[activeTabIndex + 1];

        if (!nextTab) {
          this.tabsPerView = this.getFirstTabs();
          this.activeTabId = this.tabsPerView[0].id;
          return;
        }

        this.tabsPerView.shift();
        this.tabsPerView.push(nextTab);
        this.activeTabId = nextTab.id;
        return;
      }
      this.activeTabId = this.tabsPerView[tabIndexInCurrentTabs + 1].id;
    },
    getTabIndexInCurrentTabs() {
      return this.tabsPerView.findIndex((tab) => +tab.id === +this.activeTabId);
    },

    switchByClickHandler(tabId) {
      this.activeTabId = +tabId;
    },

    // setup initial tabs
    setTabs() {
      for (let index = 1; index < 51; index++) {
        this.tabs.push({
          id: index,
        });
      }
    },
    getTabActiveClass(tabId) {
      return +tabId === +this.activeTabId ? "active" : "";
    },
  },
  mounted() {
    this.setTabs();
    this.getCurrentTabs();
    this.addNavigationListeners();
  },
  beforeDestroy() {
    this.removeNavigationListeners();
  },
};
</script>

<style scoped lang="scss">
.tabs {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
}
.tab {
  margin: 3px;
  padding: 5px;
  width: 25%;
  color: white;
  background-color: darkcyan;
  &.active {
    background-color: indigo;
  }
}
</style>

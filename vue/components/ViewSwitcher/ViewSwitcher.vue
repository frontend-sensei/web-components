<template>
  <div class="ui-view-switcher" @change="setActiveView">
    <label
      v-for="(view, index) in views"
      :key="index"
      class="ui-view-switcher__item"
      :for="getViewId(view.name)"
    >
      <input
        v-model="activeView"
        :id="getViewId(view.name)"
        :value="view.name"
        :disabled="view.disabled"
        type="radio"
        class="ui-view-switcher__input visually-hidden"
      />
      <span class="ui-view-switcher__view">
        <Icon :icon="view.iconName" width="17px" height="17px" />
      </span>
    </label>
  </div>
</template>

<script>
import Icon from "./Icon";
import { ERRORS } from "./errors";

export default {
  components: { Icon },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    views: {
      type: Array,
      default: () => [],
      validator(views) {
        if (views.length < 2) {
          throw new Error(ERRORS.COUNT);
        }

        const allViewsHaveRightStructure = views.every((view) => {
          const hasAllProperties =
            view.hasOwnProperty("name") && view.hasOwnProperty("iconName");

          return hasAllProperties;
        });

        if (!allViewsHaveRightStructure) {
          throw new Error(ERRORS.STRUCTURE);
        }

        return true;
      },
    },
  },
  data() {
    return { activeView: this.views[0].name };
  },
  created() {
    this.checkPassingView();
    this.setActiveView();
  },
  methods: {
    checkPassingView() {
      const viewNames = this.views.map((view) => view.name);
      if (!this.value || !viewNames.includes(this.value)) {
        return;
      }
      this.activeView = this.value;
    },
    setActiveView() {
      this.$emit("input", this.activeView);
    },
    getViewId(viewName) {
      return `display_as_${viewName}`;
    },
  },
};
</script>

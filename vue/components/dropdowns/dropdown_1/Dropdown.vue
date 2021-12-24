<template>
  <div :id="dropdownId" class="dropdown" v-on="$listeners">
    <div
      :class="['dropdown__trigger', triggerActiveClass]"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click.prevent="isOpen = !isOpen"
    >
      <!-- @slot Use this slot for any button -->
      <slot name="trigger">
        <dropdown-trigger :size="triggerSize" />
      </slot>
    </div>

    <transition name="pop-out-quick">
      <ul
        v-show="isOpen"
        :class="['dropdown__menu', positioning, 'font-size--14']"
        @click="onActionClick"
      >
        <!-- @slot Use this slot for actions -->
        <slot />
      </ul>
    </transition>
  </div>
</template>

<script>
import DropdownTrigger from "./DropdownTrigger";
import { uniqueId as generateUniqueId } from "lodash";

const ALLOWED_TRIGGER_SIZES = ["lg", "md"];

/**
 * Dropdown component.
 * Each component instance generates unique id with 'dropdown_{id} prefix'
 */
export default {
  components: { DropdownTrigger },
  props: {
    /**
     * CSS Classes for positioning
     * @values: center, center-sm, center-md, center-lg, center-xl, center-xxl, right, left, top, bottom, right-sm, right-md, right-lg, right-xl, right-xxl, left-sm, left-md, left-lg, left-xl, left-xxl, top-sm, top-md, top-lg, top-xl, top-xxl, bottom-sm, bottom-md, bottom-lg, bottom-xl, bottom-xxl
     */
    positioning: {
      type: String,
      default: "",
    },

    /**
     * The condition for closing dropdown when menu item clicked
     */
    closeOnClick: {
      type: Boolean,
      default: true,
    },

    /**
     * The trigger button size
     * @values: lg, md
     */
    triggerSize: {
      type: String,
      default: "lg",
      validator(size) {
        return ALLOWED_TRIGGER_SIZES.includes(size);
      },
    },
  },
  data() {
    return {
      isOpen: false,
      dropdownId: generateUniqueId("dropdown_"),
    };
  },
  computed: {
    triggerActiveClass() {
      return this.isOpen && "dropdown__trigger--active";
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    closeDropdown(event) {
      if (event.target.closest(`#${this.dropdownId}`)) return;
      this.isOpen = false;
    },
    onActionClick(event) {
      const isActionDisabled = event.target.querySelector("[disabled]");
      if (!this.closeOnClick || isActionDisabled) return;
      this.isOpen = false;
    },
  },
};
</script>

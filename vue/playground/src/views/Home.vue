<template>
  <div class="home">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import DisplayComponent from "../../../components/tabs/InfiniteTabs/InfiniteTabs.vue";

export default {
  name: "Home",
  computed: {
    currentComponent() {
      return DisplayComponent || null;
    },
  },
};
</script>

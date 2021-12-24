<template>
  <div class="rating">
    <star-icon
      v-for="index in 5"
      :key="index"
      class="rating__star rating__star--selected"
    />
    <span class="rating__value">{{ rating }}</span>
  </div>
</template>

<script>
import StarIcon from '@/components/common/icons/Star'
export default {
  name: 'Rating',
  components: {
    StarIcon
  },
  props: {
    rating: {
      type: Number,
      default: 9.5
    }
  }
}
</script>

<style lang="scss">
.rating {
  display: flex;
  align-items: center;
  &__star {
    width: 17px;
    height: 17px;
    margin: 0 3px 0 0;
    path {
      stroke: #CBD0D6;
      stroke-width: 20px;
      fill: RGB(var(--color-white));
    }
    &--selected {
      path {
        fill: RGB(var(--color-primary));
      }
    }
  }
  &__value {
    margin: 0 0 0 5px;
    font-size: 13px;
  }
}
</style>

<template>
  <section class="CommunityNeighborhoods">
    <div class="CommunityNeighborhoods__title">
      <AppSectionTitle
        :title="`neighborhoods in ${title}`"
        class="text-center"
      />
    </div>

    <CommunityNeighborhoodsSlider
      :list="neighborhoods"
      @activeIndex="activeIndex"
    />

    <CommunityNeighborhoodsCard
      :card="neighborhoods[activeSlideIndex]"
      class="d-block d-lg-flex"
    />
  </section>
</template>

<script>
export default {
  props: {
    neighborhoods: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      activeSlideIndex: 0,
    };
  },

  methods: {
    activeIndex(value) {
      this.activeSlideIndex = value;
      this.$emit("activeIndex", value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.CommunityNeighborhoods {
  position: relative;

  &__title {
    padding-bottom: 40px;
  }

  @media (min-width: $large-devices-width) {
    padding-bottom: 150px;
  }
}
</style>

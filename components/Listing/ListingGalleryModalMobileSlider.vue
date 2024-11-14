<template>
  <div class="ListingGalleryModalMobileSlider">
    <swiper
      ref="modalSlider"
      class="swiper"
      :options="swiperOptions"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="false"
    >
      <ListingGalleryModalMobileSliderItem
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },

    activeIndex: {
      type: Function,
      default: null,
    },

    followActiveSlide: {
      type: Number,
      default: null,
    },

    currentIndex: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 0,
        direction: "vertical",
        pagination: {
          el: ".swiper-modal-pagination",
          type: "fraction",
        },
        mousewheel: true,
      },
    };
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.ListingGalleryModalMobileSlider {
  position: relative;
  height: calc(100vh - 120px);
}

.swiper-container {
  width: 100%;
  height: calc(100vh - 120px);
}
</style>

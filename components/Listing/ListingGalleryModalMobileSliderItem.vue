<template>
  <swiper-slide class="ListingGalleryModalMobileSliderItem">
    <div>
      <img
        class="ListingGalleryModalMobileSliderItem__image"
        :src="item"
        alt=""
      >
    </div>
  </swiper-slide>
</template>

<script>

export default {
  props: {
    item: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" >
  @import "~/assets/styles/common/variables.scss";

  .ListingGalleryModalMobileSliderItem {
    overflow: hidden;
    display: flex;
    align-items: center;
    height: auto!important;
    padding: 2px 3px;

    &__image {
      width: calc(100% - 6px);
      object-fit: contain;
      overflow: hidden;
      border-radius: 6px;
    }
  }
</style>

<template>
  <swiper-slide>
    <div class="ListingGalleryModalSliderItem">
      <img
        class="ListingGalleryModalSliderItem__image"
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

  .ListingGalleryModalSliderItem {
    margin: 0 15px;
    overflow: hidden;
    max-width: 100%;
    height: calc(100% - 60px);
    display: flex;
    align-items: center;

    &__image {
      border-radius: 8px;
      width: 100%;
      height: calc(100% - 60px);
      max-height: 720px;
      object-fit: contain;
      overflow: hidden;
    }

    @media (min-width: $medium-devices-width) {
      margin: 0 30px;

      &__image {
        border-radius: 8px;
        width: 100%;
        height: calc(100% - 60px);
        max-height: 720px;
        object-fit: contain;
        overflow: hidden;
      }
    }
  }
</style>

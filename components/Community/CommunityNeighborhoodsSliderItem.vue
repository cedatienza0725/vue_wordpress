<template>
  <swiper-slide>
    <div class="CommunityNeighborhoodsSliderItem">
      <img
        class="HomePromo__img img--bg"
        :src="item.neighborhood_image"
        alt="image"
      />
    </div>
  </swiper-slide>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

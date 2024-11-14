<template>
  <a
    v-if="item.press_featured_image.file"
    class="MediaPressItem"
    :href="item.press_featured_image.file.url"
    target="_blank"
  >
    <h3 class="MediaPressItem__title">
      {{ item.press_title }}
    </h3>

    <img
      :src="item.press_featured_image.featured_image"
      class="MediaPressItem__image"
    />

    <p class="MediaPressItem__subtitle">
      {{ item.press_headline }}
    </p>

    <p class="MediaPressItem__date">
      {{ item.press_date }}
    </p>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    openFile() {
      window.open(`${this.item.press_featured_image.file.url}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.MediaPressItem {
  position: relative;
  cursor: pointer;

  &__title {
    font-size: 28px;
    font-weight: 300;
    line-height: 1.3;
    color: #212121;
    padding-bottom: 24px;
    letter-spacing: 0px;
  }

  &__subtitle {
    color: gray;
    font-weight: 300;
    line-height: 1.5;
    font-size: 18;
  }

  &__image {
    width: 100%;
    object-fit: cover;
    padding-bottom: 16px;
  }

  &__date {
    font-weight: 300;
    line-height: 1.3;
    color: #212121;
    margin-bottom: 16px;
  }

  &:hover {
    text-decoration: none;
    .MediaPressItem__date {
      text-decoration: underline;
    }

    .MediaPressItem__subtitle {
      text-decoration: underline;
    }
  }
}
</style>

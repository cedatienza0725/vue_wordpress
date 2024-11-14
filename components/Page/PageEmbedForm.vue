<template>
  <section class="PageEmbedForm">
    <div v-html="content.code" class="PageEmbedForm__content"/>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .PageEmbedForm {
    position: relative;
    padding-top: 90px;
    &__content {
      width: 80%;
      margin: auto;
    }

    @media (min-width: $medium-devices-width) {
      &__content {
        width: 60%;
      }
    }
  }
</style>

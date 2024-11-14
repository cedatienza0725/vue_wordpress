<template>
  <section class="SellingProcessContent">
    <span class="SellingProcessContent__header">
      {{ title }}
    </span>
    <iframe
      src="https://e.infogram.com/51de5c63-3cdf-418c-bcb6-9e001c61caf6?parent_url=https%3A%2F%2Fpardeeproperties.com%2Fthe-selling-process%2F&amp;src=embed#async_embed"
      scrolling="no"
      frameborder="0"
      allowfullscreen=""
      title="Home Selling Process"
      class="SellingProcessContent__iframe"
    />
  </section>
</template>

<script>

export default {

  data () {
    return {
      title: 'The Pardee Way',
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .SellingProcessContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;

    &__header {
      font-size: 24px;
      font-weight: 600;
      line-height: 120%;
      margin-top: 40px;
      text-align: center;
      color: #212121;
    }

    &__iframe {
      width: 396px;
      height: 1280px;
      margin: auto;
    }

    @media (min-width: $medium-devices-width) {
      &__header {
        font-size: 36px;
        margin-top: 44px;
      }

      &__iframe {
        width: 576px;
        height: 1862px;
      }
    }

    @media (min-width: $large-devices-width) {
      &__header {
        font-size: 44px;
        margin-top: 48px;
      }

      &__iframe {
        width: 786px;
        height: 2500px;
      }
    }

    @media (min-width: $extra-large-devices-width) {
      &__header {
        font-size: 60px;
        margin-top: 60px;
      }

      &__iframe {
        width: 1088px;
        height: 3420px;
      }
    }

  }
</style>

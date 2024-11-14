<template>
  <section
    class="BuyingHomeIntro"
    :class="{
      'BuyingHomeIntro--light': content.color_scheme === 'light',
      'BuyingHomeIntro--dkblue': content.color_scheme === 'dkblue',
      'BuyingHomeIntro--dark': content.color_scheme === 'dark',
    }"
  >
    <div class="container">
      <h3 v-if="content.section_headline" class="BuyingHomeIntro__title">
        {{ content.section_headline }}
      </h3>

      <p
        v-if="content.content"
        class="BuyingHomeIntro__subtitle"
        v-html="content.content"
      />

      <AppLinkButton
        v-if="content && content.cta_link"
        color="pink"
        :text="content.cta_link.title.toUpperCase()"
        :navigate-to="content.cta_link.url"
      />
    </div>
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
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.BuyingHomeIntro {
  position: relative;
  padding: 40px 0;
  text-align: center;

  &--light {
    background: transparent;

    .BuyingHomeIntro__title {
      color: $color-primary;
    }

    .BuyingHomeIntro__subtitle {
      color: $color-primary;
    }
  }
  &--dkblue {
    background: #003b5c;

    .BuyingHomeIntro__title {
      color: #fff;
    }

    .BuyingHomeIntro__subtitle {
      color: #fff;
    }
  }

  &--dark {
    background: #226492;

    .BuyingHomeIntro__title {
      color: #fff;
    }

    .BuyingHomeIntro__subtitle {
      color: #fff;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 1.5rem;
    letter-spacing: 0px;
    text-align: center;
  }

  &__subtitle {
    font-size: 22px;
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 32px;
    letter-spacing: 0px;
  }

  @media (min-width: $medium-devices-width) {
    padding: 60px 0;

    &__title {
      font-size: 32px;
    }

    &__subtitle {
      font-size: 30px;
    }
  }
}
</style>

<template>
  <section class="SellingProcessLearnMore">
    <div class="SellingProcessLearnMore__header">
      What does an agent do?
    </div>
    <div class="SellingProcessLearnMore__description">
      A Listing Agent is a fiduciary — this means they have a legal obligation to work for your best interests.
      They are experts in the field who guide you along the way.
    </div>
    <AppLinkButton
      color="pink"
      :text="learnMore.toUpperCase()"
      :navigate-to="link"
    />
  </section>
</template>

<script>

export default {

  props: {

  },

  data () {
    return {
      learnMore: 'Learn More About Selling With Us',
      link: '/looking-to-sell'
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .SellingProcessLearnMore {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $color-primary;
    padding: 24px 36px;
    color: white;

    &__header {
      font-size: 24px;
      line-height: 120%;
      margin-bottom: 12px;
      text-align: center;
    }

    &__description {
      font-size: 18px;
      line-height: 120%;
      text-align: center;
      margin-bottom: 18px;
    }

    @media (min-width: $medium-devices-width) {
      padding: 36px 60px;

      &__header {
        font-size: 28px;
        line-height: 120%;
        margin-bottom: 14px;
        text-align: center;
      }

      &__description {
        font-size: 22px;
        line-height: 120%;
        text-align: center;
        margin-bottom: 24px;
      }
    }

    @media (min-width: $large-devices-width) {
      padding: 60px 120px;

      &__header {
        font-size: 44px;
        line-height: 120%;
        margin-bottom: 18px;
        text-align: center;
      }

      &__description {
        font-size: 28px;
        line-height: 120%;
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
</style>

<template>
  <div class="HomeContact">
    <div class="HomeContact__block-red">
      <HomeContactItem :item="contacts.location_los_angeles.location[0]" />

      <HomeContactItem :item="contacts.location_los_angeles.location[1]" />
    </div>

    <div class="HomeContact__block-right">
      <div class="HomeContact__block-right__img">
        <img :src="contacts.image.url" />
      </div>

      <div class="HomeContact__block-right__love">
        <span>{{ contacts.tagline }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    contacts: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .HomeContact {
    position: relative;
    padding: 0;

    &__block-red {
      padding: 50px 50px 20px 50px;
      background: $lightest-blush;
    }

    &__block-right {
      position: relative;
      img {
        width: 100%;
        object-fit: contain;
      }

      &__love {
        display: none;
      }
    }

    @media (min-width: $medium-devices-width) {
      &__block-red {
        padding: 50px;
        display: flex;
        justify-content: space-between;
      }
    }

    @media (min-width: $large-devices-width) {
      padding: 90px 60px;

      &__block-red {
        width: 70%;
        padding: 72px 100px;
        background: $lightest-blush;
        display: flex;
        justify-content: space-between;
      }

      &__block-right {
        position: absolute;
        top: 0;
        right: 60px;
        width: 34%;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__love {
          display: block;
          max-width: 150px;
          text-align: center;
          word-break: break-word;
          opacity: 0.5;
          color: $main-pink;
          font-family: 'Bayshore', sans-serif;
          font-weight: normal;
          font-size: 58px;
          line-height: 60%;
          text-transform: lowercase;
          margin-top: 20px;
        }
      }
    }

    @media (min-width: $extra-large-devices-width) {
      padding: 120px 135px;

      &__block-red {
        width: 70%;
        padding: 84px 120px;
        background: $lightest-blush;
        display: flex;
        justify-content: space-between;
      }

      &__block-right {
        position: absolute;
        top: 0;
        right: 120px;
        width: 32%;

        &__love {
          max-width: 200px;
          margin-top: 36px;
        }
      }
    }

    @media (min-width: 2100px) {
      &__block-red {
        width: 70%;
        padding: 7rem 12rem;
        background: $lightest-blush;
        display: flex;
        justify-content: space-between;
      }

      img {
        width: 80%;
        max-height: 600px;
        object-fit: cover;
      }
    }
  }
</style>

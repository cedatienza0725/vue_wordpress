<template>
  <div class="CommunityNeighborhoodsCard">
    <div class="CommunityNeighborhoodsCard__block">
      <h2 class="CommunityNeighborhoodsCard__name">
        {{ card.neighborhood_name }}
      </h2>

      <h3 class="CommunityNeighborhoodsCard__description">
        {{ card.neighborhood_info }}
      </h3>

      <div class="CommunityNeighborhoodsCard__info">
        <div
          v-for="(item, index) in card.neighborhood_tags"
          :key="index"
          class="CommunityNeighborhoodsCard__info-item"
        >
          <p>{{ item.neighborhood_tagxx }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.CommunityNeighborhoodsCard {
  position: relative;
  background: #fffdfc;
  width: 100%;
  z-index: 4;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  &__block {
    padding: 26px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }

  &__name {
    font-weight: bold;
    font-size: 28px;
    line-height: 120%;
    padding-bottom: 30px;
  }

  &__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 120%;
    color: #000000;
  }

  &__info {
    display: flex;
    padding-top: 30px;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: #f2f2f2;
      border-radius: 20px;

      p {
        padding: 2px 5px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        color: #4f4f4f;
      }

      &:not(:last-of-type) {
        margin-right: 10px;
      }
    }
  }

  @media (min-width: $large-devices-width) {
    position: absolute;
    bottom: 0;
    right: 6%;
    max-width: 715px;
    display: flex;
  }
}
</style>

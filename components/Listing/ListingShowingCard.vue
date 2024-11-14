<template>
  <div class="ListingShowingCard">
    <img
      class="ListingShowingCard__image"
      :src="getAgentPhoto()"
      alt="image"
      @click.prevent="navigateToAgent()"
    />

    <div class="ListingShowingCard__content">
      <div class="ListingShowingCard__wrapper">
        <div class="ListingShowingCard__rating">
          <star-rating
            :rating="getAgentStarRating()"
            :increment="0.5"
            :star-size="16"
            :border-width="2"
            active-color="#024E79"
            inactive-color="transparent"
            border-color="#024E79"
            readOnly
            :rounded-corners="true"
            :show-rating="false"
            :star-points="[
              51, 0, 61, 35, 98, 35, 68, 57, 79, 91, 50, 70, 21, 91, 32, 57, 2,
              35, 39, 35,
            ]"
          />

          <span class="ListingShowingCard__count"
            >({{ getAgentStarCount() }})</span
          >
        </div>

        <div
          v-if="card.name"
          class="ListingShowingCard__title"
          @click.prevent="navigateToAgent()"
        >
          {{ card.name }}
        </div>

        <p class="ListingShowingCard__job">
          {{ getJob() }}
        </p>
      </div>

      <div class="ListingShowingCard__icons">
        <div
          v-for="(icon, index) in getIcons()"
          :key="index"
          class="ListingShowingCard__item"
        >
          <AppIcons :icon="icon" />
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

  methods: {
    getAgentPhoto() {
      return (
        this.card.photo ||
        "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
      );
    },

    getJob() {
      return this.card.dre;
    },

    getAgentStarRating() {
      return this.card.starRating || 0;
    },

    getAgentStarCount() {
      return this.card.starCount || 0;
    },

    getIcons() {
      return [
        {
          icon: "fas fa-phone-alt",
          url: `tel:${this.card.mobile ? this.card.mobile : ""}`,
        },
        {
          icon: "fas fa-envelope",
          url: `mailto:${this.card.email || ""}`,
        },
      ];
    },

    navigateToAgent() {
      this.$router.push(`/team/${this.card.slug}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.ListingShowingCard {
  position: relative;
  max-height: 470px;
  height: 100%;
  background: #fffdfc;
  display: flex;
  flex-direction: column;

  &__image {
    max-height: 250px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;
    background: #f2f2f2;
    height: 100%;
  }

  &__rating {
    display: flex;
  }

  &__count {
    font-weight: normal;
    font-size: 16px;
    line-height: 140%;
    margin-left: 8px;
  }

  &__title {
    font-weight: bold;
    font-size: 28px;
    line-height: 120%;
    color: #1f2021;
    padding-top: 10px;
    cursor: pointer;
  }

  &__job {
    font-weight: normal;
    font-size: 20px;
    line-height: 120%;
    color: #1f2021;
    padding-top: 12px;
  }

  &__icons {
    margin-top: 26px;
    display: flex;
    flex-direction: row;
    min-height: 46px;
  }

  &__item {
    max-height: 46px;
    max-width: 46px;
    height: 100%;
    width: 100%;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: $darkest-pink;
    color: white;
    transition: opacity 0.3s ease;

    &:not(:last-of-type) {
      margin-right: 14px;
    }

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>

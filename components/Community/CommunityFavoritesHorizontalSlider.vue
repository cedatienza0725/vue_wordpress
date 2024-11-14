<template>
  <ClientOnly>
    <div class="CommuntiyFavorites">
      <div class="col-12 d-flex align-items-center justify-content-end h-80">
        <div class="CommunityFavorites__left">
          <ArrowNextImage
            class="CommunityFavorites__left__arrow"
            @click.prevent="prevTab"
          />
        </div>
        <AppTabsList
          v-if="Array.isArray(list)"
          id="tabFavoritesItems"
          ref="favoritesList"
          :list="names"
          :active-item="activeItem"
          color="pink"
          @changeTab="changeTab"
        />

        <div class="CommunityFavorites__right">
          <ArrowNextImage
            class="CommunityFavorites__right__arrow"
            @click.prevent="nextTab"
          />
        </div>
      </div>
      <div
        class="CommunityFavorites__container"
        ref="favoritesContentList"
        id="tabFavoritesContentItems"
      >
        <CommunityFavoritesHorizontalSliderItem
          v-for="(item, id) in list"
          :key="id"
          :item="item"
          class="CommunityFavorites__wrapper"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import ArrowNextImage from "~/assets/images/arrow-down-pink.svg?inline";

export default {
  components: {
    ArrowNextImage,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      activeItem: 1,
      names: [],
      scrollX: 0,
    };
  },

  watch: {
    activeItem(value) {
      this.scrollElements();
    },
  },

  mounted() {
    this.list.forEach((item) => {
      return this.names.push({ tab_label: item.community_favourite_name });
    });
    setTimeout(() => {
      const contentElement = document.querySelector(
        "#tabFavoritesContentItems"
      );
      if (contentElement) {
        contentElement.addEventListener(
          "touchend",
          () => this.runOnScroll(contentElement),
          { passive: false }
        );
      }
    }, 1000);
  },

  methods: {
    runOnScroll(element) {
      const scrollPosition = Math.abs(
        element.children[0].getBoundingClientRect().x
      );
      const itemWidth = element.children[0].getBoundingClientRect().width;
      if (this.scrollX < scrollPosition && this.activeItem < this.list.length) {
        this.activeItem = this.activeItem + 1;
      }
      if (this.scrollX > scrollPosition && this.activeItem > 1) {
        this.activeItem = this.activeItem - 1;
      }
      this.scrollX = (this.activeItem - 1) * itemWidth;
    },

    scrollElements() {
      const list = this.$refs.favoritesList.$el;
      const element =
        list.getElementsByClassName("AppTabsListItem")[this.activeItem - 1];

      this.$scrollTo(element, 300, {
        container: "#tabFavoritesItems",
        easing: "ease-in",
        lazy: false,
        offset: -60,
        force: true,
        cancelable: true,
        x: true,
        y: false,
      });
      const contentList = this.$refs.favoritesContentList;
      const contentEl = contentList.getElementsByClassName(
        "CommunityFavorites__wrapper"
      )[this.activeItem - 1];
      setTimeout(() => {
        this.$scrollTo(contentEl, 300, {
          container: "#tabFavoritesContentItems",
          easing: "ease-in",
          lazy: false,
          offset: 0,
          force: true,
          cancelable: false,
          x: true,
          y: false,
        });
      }, 300);
    },

    changeTab(tab) {
      this.activeItem = tab;
      const contentElement = document.querySelector(
        "#tabFavoritesContentItems"
      );
      this.scrollX = Math.abs(
        contentElement.children[0].getBoundingClientRect().x
      );
    },

    nextTab() {
      if (this.list.length > this.activeItem) {
        this.activeItem += 1;
      } else {
        this.activeItem = 1;
      }
      const contentElement = document.querySelector(
        "#tabFavoritesContentItems"
      );
      this.scrollX = Math.abs(
        contentElement.children[0].getBoundingClientRect().x
      );
    },

    prevTab() {
      if (this.activeItem > 1) {
        this.activeItem -= 1;
      } else {
        this.activeItem = 1;
      }
      const contentElement = document.querySelector(
        "#tabFavoritesContentItems"
      );
      this.scrollX = Math.abs(
        contentElement.children[0].getBoundingClientRect().x
      );
    },

    renderBulletFunction(index, className) {
      return (
        '<span class="' +
        className +
        '" aria-label="Go to ' +
        this.names[index] +
        '">' +
        this.names[index] +
        "</span>"
      );
    },

    communitiesSwipeNextSlide() {
      return this.$refs.communitySlider.$swiper.slidePrev();
    },

    communitiesSwipePrevSlide() {
      return this.$refs.communitySlider.$swiper.slidePrev();
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/styles/common/variables.scss";
.CommunityFavorites {
  position: relative;
  padding: 80px 0;

  &__container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }

  &__wrapper {
    min-width: 100vw;
  }

  &__right {
    position: absolute;
    top: 26px;
    right: -2px;
    background: linear-gradient(90deg, rgba(255, 253, 252, 0) 0%, #fffdfc 50%);
    width: 50px;
    height: 40px;

    &__arrow {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 15px;
      transform: rotate(-90deg);
    }
  }

  &__left {
    position: absolute;
    top: 26px;
    left: -2px;
    background: linear-gradient(-90deg, rgba(255, 253, 252, 0) 0%, #fffdfc 50%);
    width: 50px;
    height: 40px;
    z-index: 3;

    &__arrow {
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 15px;
      transform: rotate(90deg);
    }
  }
}

@media (max-width: $medium-devices-width) {
}
</style>

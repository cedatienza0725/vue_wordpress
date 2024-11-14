<template>
  <section class="SearchHomeListingsTile">
    <div class="SearchHomeListingsTile__bg" />

    <div
      class="SearchHomeListingsTile__container"
    >
      <div class="SearchHomeListingsTile__line" />

      <template v-if="isAuthor">
        <div
          v-if="searchHomeByAuthorLoading"
          class="SearchHomeListingsTile__loading"
        >
          <AppLoader />
        </div>

        <div class="SearchHomeListingsTile__content">
          <SearchHomeListingsTileCardAuthor
            v-for="(item, index) in listing.properties_data"
            :key="index"
            :item="item"
            showingType="List"
          />
        </div>
        <div class="SearchHomeListingsTile__loadMore">
          <AppButton
            :text="isLastPageByAuthor ? 'No More' : 'Load More'"
            :color="isLastPageByAuthor ? 'pink' : 'blue'"
            @click.native="loadMoreByAuthor()"
            :disabled="isLastPageByAuthor"
          />
        </div>
      </template>

      <template v-else>
        <div
          v-if="searchHomeLoading"
          class="SearchHomeListingsTile__loading"
        >
          <AppLoader />
        </div>

        <div class="SearchHomeListingsTile__content">
          <template v-if="listing.propertiessearch.length === 0">
            <span v-html="listing.not_found_text" class="SearchHomeListingsTile__content-not-found"></span>
          </template>
          <template v-else>
            <SearchHomeListingsTileCard
              v-for="(item, index) in listing.propertiessearch"
              :key="index"
              :item="item"
              showingType="List"
            />
          </template>
        </div>
        <div class="SearchHomeListingsTile__loadMore">
          <AppButton
            :text="isLastPage ? 'No More' : 'Load More'"
            :color="isLastPage ? 'pink' : 'blue'"
            @click.native="loadMore()"
            :disabled="isLastPage"
          />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import queryString from 'query-string'

export default {

  props: {
    listing: {
      type: Object,
      default: () => {},
    },

    isAuthor: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      currentPage: 1,
      currentPageByAuthor: 1,
      windowTop: 0,
    }
  },

  computed: {
    ...mapGetters({
      searchHomeLoading: 'search-home/searchHomeLoading',
      searchHomeByAuthorLoading: 'search-home/searchHomeByAuthorLoading',
      isLastPage: 'search-home/isLastPage',
      isLastPageByAuthor: 'search-home/isLastPageByAuthor',
    }),
  },

  mounted () {
    if (this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page)
    }
    window.addEventListener("scroll", this.onScroll)
    console.log(this.listing)
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },

  methods: {
    ...mapActions({
      getSearchHome: 'search-home/getSearchHome',
      getSearchHomeMore: 'search-home/getSearchHomeMore',
      getSearchHomeByAuthor: 'search-home/getSearchHomeByAuthor',
      getSearchHomeByAuthorMore: 'search-home/getSearchHomeByAuthorMore',
    }),
    
    async loadMore () {
      let pagination = { ...this.$route.query }
      this.currentPage = this.currentPage + 1;
      pagination.page = this.currentPage
      const queryParams = queryString.stringify(pagination)
      try {
        const prevTop = this.windowTop
        await this.getSearchHomeMore(queryParams)
        window.scrollTo(0, prevTop)
      } catch (err) {
        console.log('************', err)
      } 
    },

    async loadMoreByAuthor () {
      let pagination = { ...this.$route.query }
      this.currentPageByAuthor = this.currentPageByAuthor + 1;
      pagination.page = this.currentPageByAuthor
      const queryParams = queryString.stringify(pagination)
      try {
        await this.getSearchHomeByAuthorMore(queryParams)
        window.scrollTo(0, prevTop)
      } catch (err) {
        console.log('************', err)
      } 
    },

    onScroll(e) {
      this.windowTop = window.top.scrollY
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/styles/common/variables.scss";

  .SearchHomeListingsTile {
    position: relative;
    padding: 10px 0 80px 0;

    &__container {
      max-width: 80%;
      display: flex;
      flex-direction: column;
      margin: auto;
    }

    &__line {
      margin-bottom: 60px;
      height: 1px;
      background: #C4C4C4;
      z-index: 11;
    }

    &__bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 400px;
      height: 100%;
      background: $lightest-blush;
    }

    &__content {
      position: relative;
      z-index: 2;
      padding-bottom: 80px;
      display: grid;
      grid-gap: 20px;
      grid-template-columns: minmax(200px, 1fr);
    }

    &__content-not-found {
      grid-column: 1 / 4;
      width: 100%;
      text-align: center;
    }

    &__loading {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      z-index: 100;
      background: rgba($color: #F2F2F2, $alpha: 0.4);
    }

    &__loadMore {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    @media (min-width: $medium-devices-width) {
      padding: 10px 0 130px 0;

      &__content {
        display: grid;
        grid-gap: 30px;
        grid-template-columns: minmax(200px, 1fr) minmax(200px, 1fr);
      }
    }

    @media (min-width: $large-devices-width) {
      &__content {
        grid-gap: 40px;
        grid-template-columns: minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr);
      }
    }
  }

  .pagination {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    position: relative;
    z-index: 2;
    justify-content: center;
  }

  .text-item {
    display: none;
  }

  .page-item {
    padding: 8px 12px;
    font-weight: normal;
    font-size: 16px;
    line-height: 140%;
    text-decoration-line: underline;
    color: #073C5C;
    border-radius: 6px;
    background: transparent;
    border: none;
    outline: none;
    transition: background .3s ease;

    &--active {
      background: $darkest-pink;
      color: #FFFFFF;
    }

    &:hover {
      background: #F2F2F2;
      color: #073C5C;
    }

    &:focus {
      @include focus-blue;
    }
  }

  @media (min-width: $small-devices-width) {
    .page-item {
      padding: 12px 16px;
    }

    .text-item {
      display: block;
    }
  }
</style>

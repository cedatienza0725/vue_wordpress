<template>
  <section
    data-component-name="SearchHomeListingsList"
    class="SearchHomeListingsList"
  >
    <div class="SearchHomeListingsList__container">
      <div class="SearchHomeListingsList__line" />

      <template v-if="isAuthor">
        <div
          v-if="searchHomeLoading"
          class="SearchHomeListingsList__loading"
        >
          <AppLoader />
        </div>

        <div class="SearchHomeListingsList__content">
          <SearchHomeListingsListCardAuthor
            v-for="(item, index) in listing.propertiessearch"
            :key="index"
            :item="item"
          />
        </div>

        <div class="SearchHomeListingsList__loadMore">
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
          class="SearchHomeListingsList__loading"
        >
          <AppLoader />
        </div>

        <div class="SearchHomeListingsList__content">
          <SearchHomeListingsListCard
            v-for="(item, index) in listing.propertiessearch"
            :key="index"
            :item="item"
          />
        </div>
        <div class="SearchHomeListingsList__loadMore">
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
    console.log(this.listing)
  },

  methods: {
    ...mapActions({
      getSearchHome: 'search-home/getSearchHome',
      getSearchHomeMore: 'search-home/getSearchHomeMore',
      getSearchHomeByAuthor: 'search-home/getSearchHomeByAuthor',
      getSearchHomeByAuthorMore: 'search-home/getSearchHomeByAuthorMore',
    }),
    
    loadMore () {
      let pagination = { ...this.$route.query }
      this.currentPage = this.currentPage + 1;
      pagination.page = this.currentPage
      const queryParams = queryString.stringify(pagination)
      try {
        this.getSearchHomeMore(queryParams)
      } catch (err) {
        console.log('************', err)
      } 
    },

    loadMoreByAuthor () {
      let pagination = { ...this.$route.query }
      this.currentPageByAuthor = this.currentPageByAuthor + 1;
      pagination.page = this.currentPageByAuthor
      const queryParams = queryString.stringify(pagination)
      try {
        this.getSearchHomeByAuthorMore(queryParams)
      } catch (err) {
        console.log('************', err)
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .SearchHomeListingsList {
    position: relative;
    padding: 60px 0 80px 0;

    &__line {
      margin-bottom: 60px;
      height: 1px;
      background: #C4C4C4;
      z-index: 11;
    }

    &__container {
      max-width: 80%;
      display: flex;
      flex-direction: column;
      margin: auto;
    }

    &__content {
      position: relative;
      z-index: 2;
      padding-bottom: 80px;
      display: grid;
      grid-gap: 56px;
      grid-template-rows: minmax(150px, 1fr);
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
  }
</style>

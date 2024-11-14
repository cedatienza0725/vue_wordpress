<template>
  <section
    data-component-name="SearchHomeListingsTileMap"
    class="SearchHomeListingsTileMap"
  >
    <div class="SearchHomeListingsTileMap__line" />

    <template v-if="isAuthor">
      <div
        v-if="searchHomeByAuthorLoading"
        class="SearchHomeListingsTileMap__loading"
      >
        <AppLoader />
      </div>

      <div class="SearchHomeListingsTileMap__wrapper">
        <div
          v-if="mapData"
          class="SearchHomeListingsTileMap__map"
        >
          <GmapMap
            id="mMap"
            ref="myMap"
            :center="{lat: Number(mapData.lat), lng: Number(mapData.lng)}"
            :zoom="15"
            map-type-id="roadmap"
            style="width: 100%; height: 100%"
          >
            <GmapMarker
              v-for="(marker, index) in listing.propertiessearch"
              :key="index"
              :position="calculateGeo(marker, index)"
              :clickable="true"
              :icon="isActive(index)"
              :label="{
                text: `$${marker.listPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`,
                color: 'white'
              }"
              @click="selectMapItem(index)"
            />
          </GmapMap>
        </div>

        <div
          v-else
          class="SearchHomeListingsTileMap__map"
        >
          <img
            src="~/assets/images/search-map.png"
            alt=""
          >
        </div>

        <div
          id="listingItems"
          ref="list"
          class="SearchHomeListingsTileMap__content"
          style="border: 10px solid red;"
        >
          <SearchHomeListingsTileCardAuthor
            v-for="(item, index) in listing.propertiessearch"
            :key="index"
            :item="item"
            :index="index"
            :selected-index="selectedIndex"
            style="margin-bottom: 38px"
            showingType="Map"
            @findMap="findMap"
          />
        </div>
      </div>

      <div class="SearchHomeListingsTileMap__loadMore">
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
        class="SearchHomeListingsTileMap__loading"
      >
        <AppLoader />
      </div>

      <div class="SearchHomeListingsTileMap__wrapper">
        <div
          v-if="mapData"
          class="SearchHomeListingsTileMap__map"
        >
          <GmapMap
            id="mMap"
            ref="myMap"
            :center="{lat: Number(mapData.lat), lng: Number(mapData.lng)}"
            :zoom="15"
            @zoom_changed="getCurrentZoom"
            map-type-id="roadmap"
            :options="{
              zoomControl: true,
              mapTypeControl: false,
              fullscreenControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              disableDefaultUi: false,
              clickableIcons: false,
              keyboardShortcuts: false,
              noClear: true,
            }"
            style="width: 100%; height: 100%"
          >
            <GmapMarker
              v-for="(marker, index) in listing.propertiessearch"
              :key="index"
              :position="calculateGeo(marker, index)"
              :clickable="true"
              :icon="isActive(index)"
              :label="{
                text: `$${marker.listPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`,
                color: 'white'
              }"
              @click="selectMapItem(index)"
            />
          </GmapMap>
        </div>

        <div
          v-else
          class="SearchHomeListingsTileMap__map"
        >
          <img
            src="~/assets/images/search-map.png"
            alt=""
          >
        </div>

        <div
          id="listingItems"
          ref="list"
          class="SearchHomeListingsTileMap__content"
        >
          <SearchHomeListingsTileCard
            v-for="(item, index) in listing.propertiessearch"
            :key="index"
            :item="item"
            :index="index"
            :selected-index="selectedIndex"
            style="margin-bottom: 38px"
            showingType="Map"
            @findMap="findMap"
          />
        </div>
      </div>

      <div class="pt-60">
        <div class="SearchHomeListingsTileMap__loadMore">
          <AppButton
            :text="isLastPage ? 'No More' : 'Load More'"
            :color="isLastPage ? 'pink' : 'blue'"
            @click.native="loadMore()"
            :disabled="isLastPage"
          />
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import * as VueGoogleMaps from 'vue2-google-maps'

import queryString from 'query-string'

const mapMarker = require('~/assets/images/label.png')
const mapMarkerActive = require('~/assets/images/label-active.png')

// import Paginate from 'vuejs-paginate/src/components/Paginate'

export default {
  // components: {
  //   Paginate,
  // },

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

      mapData: null,

      selectedIndex: 0,

      markerOptions: {
        url: mapMarker,
        size: { width: 102, height: 80, f: 'px', b: 'px' },
        scaledSize: { width: 102, height: 80, f: 'px', b: 'px' },
      },
      zoomLevel: 15,
      prevListing: null,
    }
  },

  computed: {
    ...mapGetters({
      searchHomeLoading: 'search-home/searchHomeLoading',
      searchHomeByAuthorLoading: 'search-home/searchHomeByAuthorLoading',
      isLastPage: 'search-home/isLastPage',
      isLastPageByAuthor: 'search-home/isLastPageByAuthor',
    }),

    google: VueGoogleMaps.gmapApi,

    activePage: {
      get () {
        return (this.$route.query.page === '1') ? 1 : this.currentPage
      },

      set (val) {
        this.currentPage = val
      }
    },
  },

  updated() {
    if (this.prevListing !== this.listing) {
      this.prevListing = this.listing
      this.selectedIndex = 0
      this.mapData = this.listing.propertiessearch[0].geo
    }
  },

  mounted () {
    if (this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page)
    }

    if (!this.mapData && !this.isAuthor) {
      this.mapData = this.listing.propertiessearch[0].geo
    }

    if (!this.mapData && this.isAuthor) {
      this.mapData = this.listing.propertiessearch[0].geo
    }

  },

  methods: {
    ...mapActions({
      getSearchHome: 'search-home/getSearchHome',
      getSearchHomeMore: 'search-home/getSearchHomeMore',
      getSearchHomeByAuthor: 'search-home/getSearchHomeByAuthor',
      getSearchHomeByAuthorMore: 'search-home/getSearchHomeByAuthorMore',
    }),

    getCurrentZoom(zoom) {
      this.zoomLevel = zoom;
    },

    calculateGeo(marker, id) {
      const index = this.listing.propertiessearch.findIndex(list => list.geo.lat === marker.geo.lat && list.mlsId !== marker.mlsId);
      if (index !== -1) {
        return {
          lat: marker.geo.lat + (id - index) * 0.00002 * 2 ** (15 - this.zoomLevel),
          lng: marker.geo.lng + (id - index) * 0.00002 * 2 ** (15 - this.zoomLevel)
        }
      } else {
        return marker.geo
      }
    },

    selectMapItem (index) {
      this.markerOptions.url = mapMarkerActive

      const list = this.$refs.list

      this.selectedIndex = index

      const element = list.getElementsByClassName('SearchHomeListingsTileCard')[index]

      this.$scrollTo(element, 1000, {
        container: '#listingItems',
        easing: 'ease-in',
        lazy: false,
        offset: -60,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    },

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
    },

    findMap (value, index) {
      this.mapData = value
      this.selectMapItem(index)
    },

    isActive (index) {
      if (index === this.selectedIndex) {
        return mapMarkerActive
      } else {
        return mapMarker
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .SearchHomeListingsTileMap {
    position: relative;
    padding: 60px 0 80px 0;

    &__wrapper {
      display: flex;
      flex-direction: column;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__line {
      margin-bottom: 0;
      height: 1px;
      background: #C4C4C4;
      z-index: 11;
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

    &__map {
      width: 100%;
      height: 50vh;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      padding: 60px 25px 0 25px;
      z-index: 2;
      padding-bottom: 90px;
      display: flex;
      flex-direction: column;
    }

    @media (min-width: $large-devices-width) {
      &__wrapper {
        display: flex;
        flex-direction: row;
        height: 700px;
      }

      &__map {
        width: 70%;
        height: 100%;
        position: sticky;
        top: 0;
        left: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__loadMore {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      &__content {
        padding: 60px 80px 0 55px;
        width: 30%;
        min-width: 460px;
        max-width: 530px;
        position: relative;
        z-index: 2;
        padding-bottom: 90px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        overflow-x: hidden;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>

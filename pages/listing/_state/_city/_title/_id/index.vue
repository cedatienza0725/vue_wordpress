<template>
  <div>
    <ListingAddress
      class="container mb-4 listing_title"
      :address="properties.propertymlsid_data.address"
    />

    <ListingGallery
      v-if="properties"
      :photos="properties.propertymlsid_data.photos"
      :tour="properties.propertymlsid_data.virtualTourUrl"
      :map="properties.propertymlsid_data.geo"
      class="d-block d-md-none"
    />

    <ListingInfo v-if="properties" :info="properties.propertymlsid_data" />

    <ListingGallery
      v-if="properties"
      :photos="properties.propertymlsid_data.photos"
      :tour="properties.propertymlsid_data.virtualTourUrl"
      :map="properties.propertymlsid_data.geo"
      class="d-none d-md-block"
    />

    <ListingShowing
      v-if="properties"
      :showing="properties.propertymlsid_data"
    />

    <!-- <ListingExplore /> -->

    <ListingListings
      :mlsid="properties.propertymlsid_data.mlsId"
      :properties="homes"
    />
  </div>
</template>

<script>
import queryString from "query-string";

import { mapActions, mapGetters } from "vuex";
import ListingAddress from "~/components/Listing/ListingAddress";
// import MetaTagsHelpers from '~/helpers/meta-tags'

export default {
  async asyncData({ store, route }) {
    await store.dispatch("footer/getFooter");
    await store.dispatch("header/getHeader");
    await store.dispatch("properties-listing/getProperties", route.params.id);
  },

  computed: {
    ...mapGetters({
      header: "header/header",
      properties: "properties-listing/properties",
      homes: "search-home/searchHome",
    }),
  },

  async mounted() {
    this.setIsDarkMode(true);
    if (this.properties && this.properties.propertymlsid_data) {
      const searchHome = {};
      searchHome.cities = this.properties.propertymlsid_data.address.city;
      searchHome.beds = this.properties.propertymlsid_data.property.bedrooms;
      searchHome.baths = this.properties.propertymlsid_data.property.bathsFull;
      searchHome.limit = 4;

      const queryParams = queryString.stringify(searchHome, {
        arrayFormat: "bracket",
      });
      await this.getSearchHome(queryParams);
    }
  },

  methods: {
    ...mapActions({
      setIsDarkMode: "app/setIsDarkMode",
      getSearchHome: "search-home/getSearchHome",
    }),
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/common/variables.scss";

.listing_title {
  line-height: 200%;
}

@media (min-width: $medium-devices-width) {
  [data-component-name="ListingAddress"] {
    display: none;
  }
}
</style>

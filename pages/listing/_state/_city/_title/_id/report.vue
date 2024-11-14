<template>
  <div>
    <div class="report-header">
      <img
        src="~/assets/images/logo-dark.png"
        alt="Eye"
      >
    </div>
    <h1 class="report--title">weekly marketing report</h1>
    <ReportReach />
    <ReportPropertyPerformance
      :address="properties.propertymlsid_data.address"
      :stats="this.stats" />
    <ReportPropertyStats
      :stats="this.stats"
      :bars="this.bars" />
    <ReportPropertyLinks
      :stats="this.stats" />
  </div>
</template>

<script>
import queryString from "query-string";

import { mapActions, mapGetters } from "vuex";
import ReportReach from "@/components/Listing/ReportReach";
import ReportPropertyPerformance from "@/components/Listing/ReportPropertyPerformance";
import ReportPropertyStats from "@/components/Listing/ReportPropertyStats";
import ReportPropertyLinks from "@/components/Listing/ReportPropertyLinks";


// http://localhost:3000/listing/CA/Venice/927-Marco-Pl/174934221/report
export default {
  components: {
    ReportReach,
    ReportPropertyPerformance,
    ReportPropertyStats,
    ReportPropertyLinks
  },

  computed: {
    ...mapGetters({
      properties: "properties-listing/properties",
    }),
  },

  data() {
    return {
      stats: {},
      bars: []
    };
  },

  mounted() {
    this.fetchMarketingData();
  },

  async asyncData({ store, route }) {
    await store.dispatch("properties-listing/getProperties", route.params.id);
  },

  methods: {
    async fetchMarketingData() {
      const stats = await this.$axios.get(
        "https://milodigital-pardeeproperties.pantheonsite.io/wp-json/api/v1/propertymarketing?mlsId=" + this.$route.params.id
      );
      this.stats = stats.data.data;
      this.bars = this.stats.graph_values.map( el => ({ value: el, height: (el / this.stats.graph_scale_max) * 100 }) );
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/common/variables.scss";

.report-header {
  text-align: center;

  img {
    display: block;
    margin: 40px auto 100px;
  }
}

h1.report--title {
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  margin: 70px 0;
}

h3.report--section_title {
  display: flex;
  align-items: center;
  font-size: 28px;
  margin: 40px 0;

  span {
    flex: 1 0 auto;
    color: #000000;
  }

  &:after {
    display: block;
    content: '';
    border-bottom: 2px solid #003B5C;
    margin-left: 20px;
    width: 100%;
  }
}
</style>
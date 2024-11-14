<template>
  <div class="container">
    <h1 class="MarketPulse__title">
      {{ this.marketPulse.title.rendered }}
    </h1>
    <div class="MarketPulse__list" v-if="marketPulse.acf.current_market_pulses">
      <MarketPulseList :marketPulses="marketPulse.acf.current_market_pulses" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async asyncData({ store }) {
    await store.dispatch("header/getHeader");
    await store.dispatch("footer/getFooter");
    await store.dispatch("market-pulse/getMarketPulse");
  },

  computed: {
    ...mapGetters({
      header: "header/header",
      marketPulse: "market-pulse/marketPulse",
      gravityForm: "gravity-form/gravityForm",
    }),
  },

  mounted() {
    this.setIsDarkMode(true);
    this.getGravityForm(3);
  },

  methods: {
    ...mapActions({
      setIsDarkMode: "app/setIsDarkMode",
      getGravityForm: "gravity-form/getGravityForm",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.MarketPulse {
  &__title {
    margin: 60px 0;
    font-size: 48px;
    text-align: center;
  }
}
</style>

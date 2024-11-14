<template>
  <div>
    <PageHero
      v-if="marketInsights.main_sliders.slider_type === 'hero'"
      :content="marketInsights.main_sliders"
    />
    <div v-for="(data, index) in marketInsights.content_data" :key="index">
      <PageIntroText
        v-if="data.acf_fc_layout === 'intro_text'"
        :content="data"
      />
      <PageCtaBgPhoto
        v-if="data.acf_fc_layout === 'cta_bg_photo'"
        :content="data"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import MetaTagsHelpers from "~/helpers/meta-tags";

export default {
  async asyncData({ store }) {
    await store.dispatch("header/getHeader");
    await store.dispatch("footer/getFooter");
    await store.dispatch("market-insights/getMarketInsights", 61497);
  },

  head() {
    const params = {
      title: this.marketInsights.meta_tags["twitter:title"],
      image: this.marketInsights.meta_tags["twitter:image"],
      card: this.marketInsights.meta_tags["twitter:card"],
      site: this.marketInsights.meta_tags["twitter:site"],
    };

    const headData = MetaTagsHelpers.generateHeadData(params);

    return headData;
  },

  computed: {
    ...mapGetters({
      header: "header/header",
      marketInsights: "market-insights/marketInsights",
    }),
  },
  mounted() {
    console.log(this.marketInsights);
  },
};
</script>

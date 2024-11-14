<template>
  <div>
    <PageHero
      v-if="marketInsights.main_sliders.slider_type === 'hero'"
      :content="marketInsights.main_sliders"
    />
    <div v-for="(data, index) in marketInsights.content_data" :key="index">
      <PageTextBlock
        v-if="data.acf_fc_layout === 'text_block'"
        :content="data"
      />
      <PageEmbedForm
        v-if="data.acf_fc_layout === 'embed_form'"
        :content="data"
      />
      <AppContactForm
        v-if="data.acf_fc_layout === 'gravity_form'"
        :form="gravityForm"
        :content="data"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import MetaTagsHelpers from "~/helpers/meta-tags";

export default {
  async asyncData({ store }) {
    await store.dispatch("header/getHeader");
    await store.dispatch("footer/getFooter");
    await store.dispatch("market-insights/getMarketInsights", 61145);
    await store.dispatch("gravity-form/getGravityForm", 12);
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
      gravityForm: "gravity-form/gravityForm",
    }),
  },
  mounted() {
    console.log(this.marketInsights);
    this.getGravityForm(12);
  },

  methods: {
    ...mapActions({
      getGravityForm: "gravity-form/getGravityForm",
    }),
  },
};
</script>

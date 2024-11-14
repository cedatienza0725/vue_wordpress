<template>
  <div>
    <BuyingHomeHero :content="buyingHome.main_sliders" />
    <div v-for="(data, index) in buyingHome.content_data" :key="index">
      <BuyingHomeIntro
        v-if="data.acf_fc_layout === 'intro_text'"
        :content="data"
      />
      <PageCtaBgPhoto
        v-if="data.acf_fc_layout === 'cta_bg_photo'"
        :content="data"
      />
      <PageAffordabilityCalculator
        v-if="data.acf_fc_layout === 'affordability_calculator'"
        :content="data"
      />
      <PageTwoColumnCta
        v-if="data.acf_fc_layout === 'two_column_cta'"
        :content="data"
      />
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
        :form="buyingHome.form_data"
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
    await store.dispatch("buying-home/getBuyingHome");
  },

  head() {
    const params = {
      title: this.buyingHome.meta_tags["twitter:title"],
      image: this.buyingHome.meta_tags["twitter:image"],
      card: this.buyingHome.meta_tags["twitter:card"],
      site: this.buyingHome.meta_tags["twitter:site"],
    };

    const headData = MetaTagsHelpers.generateHeadData(params);

    return headData;
  },

  computed: {
    ...mapGetters({
      header: "header/header",
      buyingHome: "buying-home/buyingHome",
    }),
  },
  mounted() {
    console.log(this.buyingHome);
  },
};
</script>

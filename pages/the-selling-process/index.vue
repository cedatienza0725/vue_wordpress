<template>
  <div>
    <client-only>
      <h1 class="PageTitle">
        {{ checkData.page_title }}
      </h1>
      <div class="iframe_container">
        <iframe 
          src="https://e.infogram.com/51de5c63-3cdf-418c-bcb6-9e001c61caf6" 
          scrolling="no" 
          frameborder="0" 
          allowfullscreen="" 
          title="Home Selling Process" 
          style="border: none; width: 80%; height: 250vw;">
        </iframe>
      </div>
      <div
        v-for="(data, index) in checkData.content_data"
        :key="index"
      > 
        <PageIntroText
          v-show="data.acf_fc_layout === 'intro_text'"
          :content="data"
        />

        <AppContactForm
          v-show="data.acf_fc_layout === 'gravity_form'"
          :form="checkData.form_data"
          :content="data"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async asyncData ({ store }) {
    await store.dispatch('header/getHeader')
    await store.dispatch('footer/getFooter')
    await store.dispatch('selling-process/getSellingProcess')
  },

  computed: {
    ...mapGetters({
      header: 'header/header',
      sellingProcess: 'selling-process/sellingProcess',
    }),

    checkData () {
      return this.sellingProcess
    }
  },

  mounted () {
    this.setIsDarkMode(true)
  },

  methods: {
    ...mapActions({
      setIsDarkMode: 'app/setIsDarkMode',
    }),
  },
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .iframe_container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .PageTitle {
    text-align: center;
    font-size: 64px;
    margin-top: 120px;

    @media (min-width: $small-devices-width) {
      font-size: 36px;
      margin-top: 60px;
    }

    @media (min-width: $medium-devices-width) {
      font-size: 44px;
      margin-top: 90px;
    }

    @media (min-width: $large-devices-width) {
      font-size: 56px;
    }
  }

</style>

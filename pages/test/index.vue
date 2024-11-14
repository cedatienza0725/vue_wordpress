<template>
  <div class="test_page_container">
    <h1 class="test_page_title">
      CORS Error Testing Page
    </h1>
    <div class="test_page_content">
      <div
        v-for="(config, key) in configuration"
        :key="key"
        class="request_data"> 
        <span class="request_data__key">{{ key }}: </span>
        <span class="request_data__value"> {{ config }} </span>
      </div>

      <AppButton
        text="Call API"
        color="pink"
        @click.native.prevent="handleCallAPI()"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters({
      header: 'header/header',
      sellingProcess: 'selling-process/sellingProcess',
    }),
  },

  data() {
    return {
      configuration: {
        method: 'get',
        url: 'https://live-pardeeproperties.pantheonsite.io/wp-json/gf/v2/forms/23?oauth_consumer_key=ck_07337a53e4d0a212be1b62d3b59e9399d5363264&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1647942962&oauth_nonce=AdNtpLQDZKi&oauth_version=1.0&oauth_signature=qHneTiyRMj0kthsQlLfRGi7DnHM%3D',
        headers: { 
          'content-Type': 'application/json',
          "Accept": "/",
          "Cache-Control": "no-cache",
          'Cookie': 'PHPSESSID=c6c2de85523f9c710b5d5874666d31af',
        },
        credentials: 'same-origin'
      }
    }
  },

  methods: {
    handleCallAPI () {
      var config = {
        method: 'get',
        url: 'https://live-pardeeproperties.pantheonsite.io/wp-json/gf/v2/forms/25?oauth_consumer_key=ck_07337a53e4d0a212be1b62d3b59e9399d5363264&oauth_consumer_secret=cs_005f288c1a315873373bc13fc201241222dcc1ad&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1649650865&oauth_nonce=gOzzzlLW11D&oauth_version=1.0&oauth_signature=L2RsLa8za1AkvrHZURQuUwPyX6A%3D',
        headers: { 
          'content-Type': 'application/json',
          "Accept": "/",
          "Cache-Control": "no-cache",
        },
        credentials: 'same-origin'
      }

      this.$axios(config).then((response) => {
        console.log('******response: ', response)
      }).catch((error) => {
        console.log('*******error: ', error)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .test_page_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px;
    position: relative;


    .test_page_content {
      width: 100%;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      .request_data {
        display: flex;
        flex-direction: row;
        padding: 12px;
        width: 100%;
        text-align: left;

        &__key {
          color: $darkest-pink;
          font-size: 24px;
          margin-right: 12px;
          line-height: 120%;
        }

        &__value {
          color: $darkest-navy;
          line-height: 120%;
          font-size: 20px;
        }
      }
    }
  }

  
</style>

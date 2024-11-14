<template>
  <section class="ReportReach">
    <div class="container">
      <h3 class="report--section_title"><span>Pardee Company Stats</span></h3>

      <div class="row">
        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-facebook.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.facebook_supporting_text }}</p>
            <p>{{ this.reach.facebook_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-twitter.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.twitter_supporting_text }}</p>
            <p>{{ this.reach.twitter_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-instagram.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.instagram_supporting_text }}</p>
            <p>{{ this.reach.instagram_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-youtube.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.youtube_supporting_text }}</p>
            <p>{{ this.reach.youtube_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-tiktok.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.tiktok_supporting_text }}</p>
            <p>{{ this.reach.tiktok_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-eye.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.website_supporting_text }}</p>
            <p>{{ this.reach.website_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-envelope.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.email_supporting_text }}</p>
            <p>{{ this.reach.email_reach }}</p>
          </div>
        </div>

        <div class="col-sm-6 col-md-3">
          <div class="report-stats">
            <div class="report-stats--icon">
              <img
                src="~/assets/images/icon-3d.png"
                alt="Eye"
              >
            </div>
            <p>{{ this.reach.blog_supporting_text }}</p>
            <p>{{ this.reach.blog_reach }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReportReach',

  data() {
    return {
      reach: {}
    };
  },

  mounted() {
    this.fetchMarketingData();
  },
  
  methods: {
    async fetchMarketingData() {
      const reach = await this.$axios.get(
        "https://milodigital-pardeeproperties.pantheonsite.io/wp-json/api/v1/marketreach"
      );

      this.reach = reach.data.data;
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
}

.report-stats {
  background-color: #FFF2F8;
  color: #1f2021;
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;

  p {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;

    & + p {
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 0;
    }
  }
}

.report-stats--icon {
  display: flex;
  align-items: center;
  background-color: #FF41B9;
  width: 36px;
  height: 36px;
  padding: 5px;
  margin: 0 auto 12px auto;
  border-radius: 36px;
}
</style>
<template>
  <div class="AppAgentsSliderItem">
    <span v-if="agent.specialization_tag" class="AppAgentsSliderItem__tag">
      {{ agent.specialization_tag }}
    </span>

    <ListingShowingCard :card="getAgent" />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      agent: {},
    };
  },

  computed: {
    getAgent() {
      return this.agent;
    },
  },

  methods: {
    async fetchAgents() {
      const agentData = await this.$axios.get(
        "https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/team-member?per_page=100"
      );

      agentData.data.forEach((item) => {
        if (item.id === this.item.ID) {
          this.agent = {
            dre: item.acf.title,
            starRating: item.acf.star_rating,
            starCount: item.acf.star_rating_count,
            email: item.acf.email,
            mobile: item.acf.mobile_phone
              ? item.acf.mobile_phone.replaceAll(".", "-")
              : item.acf.phone.replace(".", "-"),
            photo: item._links["wp:featuredmedia"][0].href,
            name: item.title.rendered,
            slug: item.slug,
            specialization_tag: item.specialization_tag,
          };
        }
      });

      const imageUrl = await this.$axios.get(this.agent.photo);
      this.agent.photo = imageUrl.data.source_url;
    },
  },
  mounted() {
    this.fetchAgents();
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.AppAgentsSliderItem {
  position: relative;
  max-height: 470px;
  height: 100%;
  background: #fffdfc;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);

  &__tag {
    position: absolute;
    top: 24px;
    left: 24px;
    padding: 4px 10px;
    background: #fffdfc;
    border-radius: 20px;
    font-weight: 600;
    font-size: 12px;
    line-height: 175%;
    color: #1f2021;
  }
}
</style>

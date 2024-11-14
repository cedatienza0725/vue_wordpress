<template>
  <section class="MarketPulseList">
    <div
      v-for="marketPulse in marketPulses"
      :key="marketPulse.location"
      class="MarketPulseList__item"
    >
      <img
        :src="marketPulse.thumbnailcover.url"
        @click.prevent="handleClickLink(marketPulse.pdf_link)"
      />
      <div class="MarketPulseList__item__title">
        {{ marketPulse.location }}
      </div>
    </div>
  </section>
</template>

<script>
import AppFormModal from "~/components/App/AppFormModal.vue";

export default {
  props: {
    marketPulses: {
      type: Array,
      default: () => [],
    },
    form_data: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    handleClickLink(link) {
      const options = {
        form_data: this.form_data,
      };

      this.$modal.show(AppFormModal, options, {
        width: "600px",
        height: "700px",
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.MarketPulseList {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  &__item {
    max-width: 30%;
    img {
      width: 100%;
      margin: 24px 0;
      cursor: pointer;
    }

    div {
      width: 100%;
      text-align: center;
      font-size: 24px;
      margin-bottom: 24px;
    }
  }

  @media (min-width: $medium-devices-width) {
  }
}
</style>

<template>
  <div class="HomeMeet" :class="getHomeMeetClass()">
    <div class="HomeMeet__articles" :class="getHomeMeetClass()">
      <div
        v-for="(item, index) in meet.media_items"
        :key="index"
        class="HomeMeet__item"
        :class="[
          `HomeMeet__item-${index + 1}`
        ]"
      >
        <HomeMeetCard :item="item" />
      </div>
    </div>

    <div class="HomeMeet__block">
      <div class="HomeMeet__content" :class="getHomeMeetClass()">
        <AppSectionTitle
          :display="meet.text_content.pretitle"
          :title="meet.text_content.title"
          :subtitle="meet.text_content.subtitle.toLowerCase()"
          :lead="meet.text_content.body"
          color="blue"
        />

        <div class="HomeMeet__navigation">
          <AppLinkButton
            type="common"
            color="blue"
            :text="meet.text_content.primary_link.title"
            style="margin: 0;"
            :navigate-to="meet.text_content.primary_link.url"
          />

          <AppLink
            class="ml-25 mt-3 mt-md-0"
            color="grey"
            :text="meet.text_content.secondary_link.title"
            :navigate-to="meet.text_content.secondary_link.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meet: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    redirect () {
      window.open(`${this.meet.text_content.primary_link.url}`, '_blank')
    },

    getHomeMeetClass () {
      return {
        '': this.meet.display_options.layout_options === 'media-left',
        'reverse': this.meet.display_options.layout_options === 'media-right'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/common/variables.scss";

  .HomeMeet {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__articles {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      gap: 0px 0px;
      grid-template-areas:
        "item-1"
        "item-2"
        "item-3";
    }

    &__item-1 { grid-area: item-1; }
    &__item-2 { grid-area: item-2; }
    &__item-3 { grid-area: item-3; }

    &__block {
      width: 100%;
      padding: 80px 25px;
      background: $lightest-powder-blue;
    }

    &__content {
      padding: 0;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    &__navigation {
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: $extra-large-devices-width) {
      flex-direction: column;
      &__articles {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 300px 300px;
        gap: 0px 0px;
        grid-template-areas:
          "item-1 item-3"
          "item-2 item-3";
      }
    }
    @media (min-width: $extra-large-devices-width) {
      padding-top: 110px;

      &__articles {
        position: relative;
        max-width: 50%;
        height: 100%;

        grid-template-columns: 1fr 1fr;
        grid-template-rows: 250px 250px;
        gap: 0px 0px;
        grid-template-areas:
          "item-1 item-3"
          "item-2 item-3";
      }

      &__block {
        float: right;
        max-width: 65%;
        padding: 0 25px;
        margin-left: -170px;
        background: $lightest-powder-blue;
      }

      &__content {
        padding: 95px 200px;
      }

      &__navigation {
        flex-direction: row;
      }

      &__content.reverse {
        padding: 95px 200px 95px 130px;
      }

      &__articles.reverse {
        margin-left: -170px;
      }

    }

    @media (min-width: 2100px) {
      padding: 120px;
      &__block {
        max-width: 60%;
      }
    }
  }

  .HomeMeet.reverse {
    flex-direction: row-reverse;

    @media (max-width: $extra-large-devices-width) {
      flex-direction: column;
    }
  }
</style>

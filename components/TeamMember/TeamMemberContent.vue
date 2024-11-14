<template>
  <section class="TeamMemberContent">
    <div class="container_hero">
      <div class="container_left">
        <AppSectionTitle
          display="meet"
          :title="content.team_member_title"
          :lead="content.team_member_bio"
          color="blue"
        />
      </div>
      <div class="container_right">
        <ListingShowingCard :card="getAgent" />
      </div>
    </div>
    <div
      v-if="
        content.content_blocks && content.content_blocks.featured_testimonial
      "
      class="container_success_story"
    >
      <div class="testimonial_title">
        {{ content.content_blocks.featured_testimonial.headline.toLowerCase() }}
      </div>
      <div class="testimonial_content">
        <img
          :src="content.content_blocks.featured_testimonial.background_image"
        />
        <div class="testimonial_quote">
          {{ content.content_blocks.featured_testimonial.quote }}
        </div>
        <p
          class="testimonial_attribution"
          v-html="content.content_blocks.featured_testimonial.attribution"
        />
      </div>
    </div>
    <div v-if="content.team_member_testimonials" class="container_testimonial">
      <h1 class="testimonial_title">more success stories</h1>
      <div
        v-for="(item, index) in content.team_member_testimonials"
        :key="index"
        class="testimonial_item"
      >
        <div
          class="testimonial_heading_container"
          @click.prevent="popTestimonialContent(index)"
        >
          <h2 class="testimonial_heading">
            {{ item.attribution }}
          </h2>
          <font-awesome-icon
            class="testimonial_down_icon"
            :icon="['fas', 'angle-down']"
            :id="`testimonial_down_icon_${index}`"
          />
          <font-awesome-icon
            class="testimonial_up_icon"
            :icon="['fas', 'angle-up']"
            :id="`testimonial_up_icon_${index}`"
          />
        </div>
        <p
          class="testimonial_content"
          v-html="item.content"
          :id="`testimonial_content_${index}`"
        />
      </div>
    </div>
    <PageFeaturedProperty
      v-if="content.content_blocks && content.content_blocks.featured_property"
      :content="content.content_blocks.featured_property"
    />
  </section>
</template>

<script>
export default {
  props: {
    content: {
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

  mounted() {
    this.fetchAgents();
  },

  methods: {
    async fetchAgents() {
      const agentData = await this.$axios.get(
        "https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/team-member?per_page=100"
      );
      agentData.data.forEach((item) => {
        if (item.title.rendered === this.content.team_member_title) {
          this.agent = {
            dre: item.acf.title,
            starRating: item.acf.star_rating,
            starCount: item.acf.star_rating_count,
            email: item.acf.email,
            mobile: item.acf.mobile_phone
              ? item.acf.mobile_phone.replaceAll(".", "-")
              : item.acf.phone.replace(".", "-"),
            photo: this.content.team_member_featured_image,
            name: item.title.rendered,
            slug: item.slug,
          };
        }
      });
    },

    popTestimonialContent(id) {
      const contentElement = document.getElementById(
        `testimonial_content_${id}`
      );
      const upIcon = document.getElementById(`testimonial_up_icon_${id}`);
      const downIcon = document.getElementById(`testimonial_down_icon_${id}`);
      if (contentElement.style.display === "block") {
        contentElement.style.display = "none";
        upIcon.style.display = "none";
        downIcon.style.display = "block";
      } else {
        contentElement.style.display = "block";
        upIcon.style.display = "block";
        downIcon.style.display = "none";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.TeamMemberContent {
  position: relative;
  padding: 90px 0;

  .container_hero {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    padding: 0 8rem;
    .container_left {
      width: 60%;
    }

    .container_right {
      margin-top: 60px;
      width: 30%;
    }
  }

  .container_success_story {
    display: flex;
    flex-direction: column;
    text-align: center;

    .testimonial_title {
      font-size: 48px;
      font-weight: 300;
      margin-bottom: 24px;
      line-height: 125%;
      margin: 4rem 0;
    }

    .testimonial_content {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 8rem;
      overflow: hidden;

      .testimonial_quote {
        color: white;
        font-size: 1.8rem;
        font-weight: 700;
        position: relative;
        line-height: 150%;
        width: 40%;
        text-align: left;
      }

      .testimonial_attribution {
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
        position: relative;
        line-height: 150%;
        width: 40%;
        text-align: left;
        margin-top: 24px;
      }

      img {
        width: 100%;
        position: absolute;
        inset: 0 0;
        object-fit: contain;
      }
    }
  }

  .container_testimonial {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8rem;

    .testimonial_title {
      font-size: 48px;
      font-weight: 300;
      margin-bottom: 24px;
      line-height: 125%;
    }
    .testimonial_item {
      border-bottom: 1px solid #cecece;
      width: 80%;

      .testimonial_heading_container {
        padding: 18px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;

        .testimonial_heading {
          font-size: 18px;
          font-weight: 400;
          color: $lightest-navy;
        }

        .testimonial_up_icon {
          color: $darkest-pink;
          height: 24px;
          display: none;
        }

        .testimonial_down_icon {
          color: $darkest-pink;
          font-size: 24px;
          display: block;
        }
      }

      .testimonial_content {
        color: black;
        font-size: 18px;
        line-height: 125%;
        padding-bottom: 24px;
        display: none;
      }
    }
  }

  @media (max-width: $medium-devices-width) {
    .container_hero {
      justify-content: center;
      .container_left {
        width: 80% !important;
        margin-top: 40px;
      }

      .container_right {
        width: 80% !important;
        margin-top: 0 !important;
      }
    }

    .testimonial_content {
      padding: 4rem !important;
    }

    .testimonial_attribution {
      width: 100% !important;
    }

    .testimonial_quote {
      width: 100% !important;
    }
  }
}
</style>

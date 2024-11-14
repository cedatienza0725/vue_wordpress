<template>
  <section class="ListingShowing">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-7">
          <div class="ListingShowing__title">Request a Showing</div>

          <ListingShowingReservationCard
            :card="reservationCard"
            :mlsId="this.showing.mlsId"
          />

          <p class="ListingShowing__header">
            {{ getHeadings.title }}
          </p>

          <p class="ListingShowing__description">
            {{ getHeadings.description }}
          </p>

          <div class="ListingShowing__highlights">
            <div class="ListingShowing__subtitle">Highlights</div>

            <div
              v-for="(item, index) in getHighLights()"
              :key="index"
              class="ListingShowing__highlight"
            >
              <font-awesome-icon
                class="ListingShowing__icon fa-xs"
                far
                icon="check-circle"
              />

              <template v-if="item === 'Single Family Residence'">
                Single Family Home
              </template>

              <template v-else>
                {{ item }}
              </template>
            </div>
          </div>

          <div class="ListingShowing__features">
            <div class="ListingShowing__subtitle">Features</div>

            <div class="ListingShowing__tags">
              <div
                v-for="(item, index) in getFeatures()"
                :key="index"
                class="ListingShowing__feature"
              >
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-12 col-lg-4 offset-lg-1 d-flex align-items-center flex-column"
        >
          <div class="ListingShowing__listed">
            {{ getAgentTitle() }}
          </div>

          <ListingShowingCard :card="getAgent" />

          <div class="ListingShowing__code">
            {{ getListedBy() }}
          </div>

          <div class="ListingShowing__share">
            <div
              :class="{
                ListingShowing__share__clipboard: true,
                ListingShowing__share__showClip: showClip,
              }"
              ref="clipboard"
            >
              Copied to clipboard
            </div>
            <div class="ListingShowing__share__popup" ref="sharePopup">
              <ShareNetwork
                v-for="link in socialLinks"
                :key="link.network"
                :network="link.network"
                :url="getFullPath"
                title=""
              >
                <font-awesome-icon
                  class="ListingShowing__share__icon"
                  :icon="link.icon"
                />
              </ShareNetwork>
              <font-awesome-icon
                class="ListingShowing__share__icon"
                :icon="['fas', 'link']"
                @click.prevent="copyURL()"
              />
              <a :href="`mailto:?body=${getFullPath}`">
                <font-awesome-icon
                  class="ListingShowing__share__icon"
                  :icon="['fas', 'envelope']"
                />
              </a>
            </div>
            <button
              class="ListingShowing__share__btn"
              @click.prevent="toggleSharePopup()"
            >
              <font-awesome-icon
                class="ListingShowing__icon"
                :icon="['fas', 'share']"
              />

              Share Listing
            </button>
          </div>
          <div
            v-if="!['RNT'].includes(propertyType)"
            class="mortgage-calculator"
          >
            <h2>Monthly Payment Estimate</h2>

            <MortgageCalculator
              v-if="isCalculatorVisible"
              :price-info="{
                propPrice: showing.listPrice,
                downPayment: 0.2,
                taxRate: (showing.listPrice * 0.0125) / 12,
                insuranceRate: (showing.listPrice * 0.0022) / 12,
                hoaFee: showing.association.fee || 0,
                disclaimer: showing.disclaimer,
                term: 30,
                rates: {
                  fixed: rates.fixed,
                  adjustable: rates.adjustable,
                },
              }"
            />

            <font-awesome-icon
              v-else
              style="height: 75px; margin-bottom: 12px"
              :icon="['fas', 'chart-pie']"
            />

            <AppLink
              text="Show Details"
              color="grey"
              size="medium"
              @click.native.prevent="toggleCalculatorVisibility"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MortgageCalculator from "@/components/Listing/MortgageCalculator";

export default {
  async asyncData({ store }) {
    await store.dispatch("gravity-form/getGravityForm", 25);
  },

  name: "ListingShowing",

  components: {
    MortgageCalculator,
  },

  props: {
    showing: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      reservationCard: {
        firstFormTitle: "When would you like to see it?",
        secondFormTitle: "Who will be attending the showing?",
        time: [
          { value: "9:00" },
          { value: "9:30" },
          { value: "10:00" },
          { value: "10:30" },
          { value: "11:00" },
          { value: "12:00" },
          { value: "12:30" },
          { value: "1:00" },
          { value: "1:30" },
          { value: "2:00" },
          { value: "2:30" },
          { value: "3:00" },
          { value: "3:30" },
          { value: "4:00" },
          { value: "4:30" },
          { value: "5:00" },
          { value: "5:30" },
          { value: "6:00" },
          { value: "6:30" },
          { value: "7:00" },
        ],
        date: this.getDateRange(),
        firstFormButton: {
          title: "Next",
          url: "/",
        },
        secondFormButton: {
          title: "Submit",
          url: "/",
        },
      },

      socialLinks: [
        {
          network: "facebook",
          icon: ["fab", "facebook-f"],
        },
        {
          network: "twitter",
          icon: ["fab", "twitter"],
        },
        {
          network: "linkedin",
          icon: ["fab", "linkedin"],
        },
      ],

      showClip: false,

      isCalculatorVisible: false,

      rates: {
        fixed: null,
        adjustable: null,
      },

      agent: {},
    };
  },

  mounted() {
    this.getGravityForm(25);
    this.fetchAgents();
  },

  computed: {
    ...mapGetters({
      gravityForm: "gravity-form/gravityForm",
    }),

    getHeadings() {
      const { remarks } = this.showing;
      if (!remarks)
        return {
          title: "",
          description: "",
        };
      const dotIndex = remarks.indexOf(".");

      return {
        title: remarks.substring(0, dotIndex + 1),
        description: remarks.substring(dotIndex + 1).trim(),
      };
    },

    getAgent() {
      return this.agent;
    },

    getFullPath() {
      return `https://tami-pardee.herokuapp.com/${this.$route.fullPath}`;
    },

    propertyType() {
      return this.showing.property.type;
    },
  },

  methods: {
    ...mapActions({
      getGravityForm: "gravity-form/getGravityForm",
    }),

    async copyURL() {
      try {
        await navigator.clipboard.writeText(this.getFullPath);
        this.showClip = true;
        setTimeout(() => {
          this.showClip = false;
        }, 4000);
      } catch ($e) {
        alert("Cannot copy");
      }
    },

    getHighLights() {
      const items = [];

      if (this.showing.mls && this.showing.mls.daysOnMarket) {
        items.push(`${this.showing.mls.daysOnMarket} days on market`);
      }
      if (this.showing.property && this.showing.property.yearBuilt) {
        items.push(`Built in ${this.showing.property.yearBuilt}`);
      }
      if (this.showing.property && this.showing.property.parking) {
        items.push(
          `Total parking spaces - ${this.showing.property.parking.spaces} Car`
        );
        items.push(`${this.showing.property.parking.description}`);
      }
      if (this.showing.property && this.showing.property.subTypeText) {
        items.push(`${this.showing.property.subTypeText}`);
      }
      if (this.showing.mls && this.showing.mls.area) {
        items.push(`Community | ${this.showing.mls.area}`);
      }
      if (this.showing.listingId) {
        items.push(`MLS# | ${this.showing.listingId}`);
      }

      return items;
    },

    getFeatures() {
      const items = [];

      if (this.showing.property && this.showing.property.cooling) {
        items.push({
          icon: "home",
          text: `${this.showing.property.cooling} Cooling`,
        });
      }

      if (this.showing.property && this.showing.property.heating) {
        items.push({
          icon: "home",
          text: `${this.showing.property.heating} Heat`,
        });
      }

      if (this.showing.property && this.showing.property.flooring) {
        items.push({
          icon: "home",
          text: `${this.showing.property.flooring
            .split(", ")
            .map((floor) => `${floor} Floors`)
            .join(", ")}`,
        });
      }

      if (
        this.showing.property &&
        this.showing.property.view &&
        this.showing.property.view !== "None"
      ) {
        items.push({
          icon: "home",
          text: "Has View",
        });

        items.push({
          icon: "home",
          text: `${this.showing.property.view} Views `,
        });
      }

      if (
        this.showing.property &&
        this.showing.property.pool &&
        this.showing.property.pool !== "None"
      ) {
        items.push({
          icon: "home",
          text: `${this.showing.property.pool} Pool`,
        });
      }

      return items;
    },

    getDateRange() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((day) => {
        return { value: this.$moment().add(day, "days").format("MMM D ddd") };
      });
    },

    getAgentTitle() {
      return this.showing.agent.officeMlsId === "X77543"
        ? "Listed By"
        : "Connect with an agent";
    },

    getListedBy() {
      return this.showing.agent.officeMlsId === "X77543"
        ? "Listed By Pardee + Partners"
        : `Listed By ${this.showing.agent.firstName} ${this.showing.agent.lastName} • ${this.showing.office.name}`;
    },

    async fetchAgents() {
      const agentData = await this.$axios.get(
        "https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/team-member?per_page=100"
      );

      if (
        this.showing.agent.firstName === "Tamra (Tami)" &&
        this.showing.agent.lastName === "Pardee"
      ) {
        const ownerData = agentData.data.filter(
          (item) => item.title.rendered === "Tami Pardee"
        )[0];
        this.agent = {
          ...this.showing.agent,
          dre: ownerData.acf.title,
          starRating: ownerData.acf.star_rating,
          starCount: ownerData.acf.star_rating_count,
          email: ownerData.acf.email,
          mobile: ownerData.acf.mobile_phone
            ? ownerData.acf.mobile_phone.replaceAll(".", "-")
            : ownerData.acf.phone.replace(".", "-"),
          photo:
            "https://live-pardeeproperties.pantheonsite.io/wp-content/uploads/2021/01/tami-landscape-1200x800.jpg",
          name: ownerData.title.rendered,
          slug: ownerData.slug,
        };
      } else if (this.showing.agent.officeMlsId === "X77543") {
        agentData.data.forEach((item) => {
          if (
            item.title.rendered ===
            this.showing.agent.firstName + " " + this.showing.agent.lastName
          ) {
            this.agent = {
              ...this.showing.agent,
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
            };
          }
        });
        const imageUrl = await this.$axios.get(this.agent.photo);
        this.agent.photo = imageUrl.data.source_url;
      } else {
        const availableMembers = agentData.data.filter((member) =>
          member.team_member_category.includes(1353)
        );
        const randomMember =
          availableMembers[Math.floor(Math.random() * availableMembers.length)];
        this.agent = {
          ...this.showing.agent,
          dre: randomMember.acf.title,
          starRating: randomMember.acf.star_rating,
          starCount: randomMember.acf.star_rating_count,
          email: randomMember.acf.email,
          mobile: randomMember.acf.mobile_phone
            ? randomMember.acf.mobile_phone.replaceAll(".", "-")
            : randomMember.acf.phone.replace(".", "-"),
          photo: randomMember._links["wp:featuredmedia"][0].href,
          name: randomMember.title.rendered,
          slug: randomMember.slug,
        };
        const imageUrl = await this.$axios.get(this.agent.photo);
        this.agent.photo = imageUrl.data.source_url;
      }
    },

    requestRates() {
      const urls = {
        fixed: new URL("https://www.quandl.com/api/v3/datasets/FMAC/30US.json"),
        adjustable: new URL(
          "https://www.quandl.com/api/v3/datasets/FMAC/5US.json"
        ),
      };

      Object.keys(urls).forEach((key) =>
        urls[key].searchParams.append(
          "api_key",
          process.env.NUXT_ENV_QUANDL_API_KEY
        )
      );

      Promise.all(
        Object.keys(urls).map((key) => this.$axios.get(urls[key]))
      ).then((responses = []) =>
        responses.forEach((response, index) => {
          const key = Object.keys(urls)[index];
          this.rates[key] = response.data.dataset.data[0][1];
        })
      );
    },

    toggleCalculatorVisibility() {
      this.isCalculatorVisible = !this.isCalculatorVisible;
    },

    toggleSharePopup() {
      const popup = this.$refs.sharePopup;
      popup.classList.toggle("ListingShowing__show");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.ListingShowing {
  position: relative;
  padding: 30px 0;

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    padding-bottom: 18px;
  }

  &__listed {
    padding-top: 60px;
    font-weight: 600;
    font-size: 18px;
    padding-bottom: 18px;
    line-height: 120%;
    text-align: center;
    color: #1f2021;
  }

  &__code {
    padding-top: 14px;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    max-width: 80%;
    color: #747b7e;
  }

  &__share {
    margin-top: 24px;
    width: 100%;
    padding: 13px 0;
    background: #f3f3f3;
    position: relative;

    &__clipboard {
      position: absolute;
      bottom: 0;
      left: 50%;
      border-radius: 25px;
      color: white;
      background-color: $darkest-pink;
      padding: 4px 16px;
      transform: translateX(-50%);
      opacity: 0;
    }

    &__showClip {
      animation: flicker 4s infinite;
    }

    &__popup {
      visibility: hidden;
      position: absolute;
      bottom: 110%;
      left: 50%;
      width: 90%;
      height: 50px;
      border-radius: 25px;
      background-color: $darkest-pink;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 0 16px;
      transform: translateX(-50%);
    }

    &__icon {
      color: white;
      height: 32px;
      cursor: pointer;
      opacity: 1;
      &:hover {
        opacity: 0.75;
      }
    }

    &__btn {
      width: 100%;
      border: none;
      outline: none;
      font-weight: normal;
      font-size: 20px;
      line-height: 120%;
      color: #000000;
      opacity: 1;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.75;
      }
    }
  }

  &__show {
    visibility: visible;
    -webkit-animation: fadeIn 0.5s;
    animation: fadeIn 0.5s;
  }

  .mortgage-calculator {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f3f3f3;
    padding: 24px;
    width: 100%;

    h2 {
      text-align: center;
      line-height: 1.1em;
      font-size: 1.3em;
    }

    svg {
      margin-top: 20px;
    }

    a {
      margin-top: 15px;
    }
  }

  &__header {
    font-weight: bold;
    font-size: 18px;
    line-height: 120%;
  }

  &__description {
    padding-top: 16px;
    padding-bottom: 66px;
    font-weight: normal;
    font-size: 18px;
    line-height: 120%;
    color: #000000;
  }

  &__questions {
    padding-bottom: 48px;
  }

  &__subtitle {
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    padding-bottom: 20px;
  }

  &__text {
    font-weight: normal;
    font-size: 16px;
    line-height: 140%;
    color: #000000;

    &:not(:last-of-type) {
      padding-bottom: 20px;
    }
  }

  &__highlights {
    padding-bottom: 48px;
  }

  &__icon {
    margin-right: 10px;
    height: 20px;
    width: 20px;
  }

  &__highlight {
    font-weight: normal;
    font-size: 20px;
    line-height: 120%;
    color: #000000;
    display: flex;
    align-items: center;

    &__icon {
      height: 15px;
      width: 15px;
    }

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
  }

  &__feature {
    color: #000000;
    padding: 6px 12px;
    background: #f2f2f2;
    border-radius: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 120%;

    &:not(:last-of-type) {
      margin-right: 20px;
    }
  }

  @media (min-width: $medium-devices-width) {
    padding: 60px 0;

    &__header {
      font-weight: bold;
      font-size: 20px;
      line-height: 120%;
    }

    &__description {
      padding-top: 8px;
      padding-bottom: 44px;
      font-size: 20px;
    }

    &__questions {
      padding-bottom: 44px;
    }

    &__highlights {
      padding-bottom: 44px;
    }

    &__listed {
      padding-top: 0;
    }
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes flicker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes flicker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

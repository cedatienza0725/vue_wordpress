<template>
  <section class="ListingInfo">
    <div class="container">
      <div class="row">
        <div class="ListingInfo__openHouses" v-if="openHouses">
          {{ openHouses }}
        </div>
        <div class="col-12 col-md-6">
          <div v-if="checkInEscrow()" class="ListingInfo__badge-escrow">
            In Escrow
          </div>

          <div v-else-if="checkSold()" class="ListingInfo__badge-sold">
            Sold
          </div>
          <div v-else-if="checkNewListing()" class="ListingInfo__badge">
            <font-awesome-icon
              class="ListingInfo__badge-icon"
              :icon="['fas', 'star']"
            />

            <p class="ListingInfo__badge-name">New listing!</p>
          </div>

          <ListingAddress :address="info.address" />

          <p class="ListingInfo__description" v-if="info.remarks">
            {{ `${info.remarks.split(".")[0]}.` }}
          </p>
        </div>

        <div class="col-12 col-md-5 d-flex flex-column justify-content-end">
          <div class="ListingInfo__top">
            <p class="ListingInfo__price">
              <strong>{{
                info.property.type === "RNT" ? "Lease Price" : "Sales Price"
              }}</strong>

              ${{
                info.listPrice &&
                info.listPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
              }}{{ info.property.type === "RNT" ? "/mo" : "" }}
            </p>

            <p v-if="info.property.subTypeText" class="ListingInfo__type">
              {{ info.address.city }}

              <template
                v-if="info.property.subTypeText === 'Single Family Residence'"
              >
                Single Family Home
              </template>

              <template v-else>
                {{ info.property.subTypeText }}
              </template>
            </p>
          </div>

          <div class="ListingInfo__details">
            <div
              v-for="(detail, index) in list"
              :key="index"
              class="ListingInfo__detail"
              :class="{
                'ListingInfo__detail-center':
                  detail.name === 'Beds' || detail.name === 'Baths',
              }"
            >
              <p class="ListingInfo__details-name" v-html="detail.name" />

              <p class="ListingInfo__details-value" v-html="detail.value" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      list: [
        {
          name: "Beds",
          value: this.info.property.bedrooms,
        },
        {
          name: "Baths",
          value: this.info.property.bathsFull + this.info.property.bathsHalf,
        },
        {
          name: "Home Size",
          value: `${
            this.info.property.area &&
            this.info.property.area
              .toString()
              .replace(/(\d)(?=(\d{3})+$)/g, "$1,")
          } Sq. Ft.`,
        },
        {
          name: "Lot Size",
          value: `${
            this.info.property.lotSizeArea &&
            this.info.property.lotSizeArea
              .toString()
              .replace(/(\d)(?=(\d{3})+$)/g, "$1,")
          } Sq. Ft.`,
        },
      ],
      openHouses: "",
    };
  },

  methods: {
    async getOpenHouses() {
      const config = {
        method: "get",
        url: `https://api.simplyrets.com/openhouses?listingId=${this.info.listingId}`,
        headers: {
          Authorization: `Basic ${process.env.SIMPLYRETS_AUTH}`,
          accept: "application/json",
        },
      };
      const resp = await this.$axios(config);
      if (resp?.data && resp.data.length > 0) {
        resp.data.map((house) => {
          const startTime = this.$moment(house.startTime).format("MMM. DD, ha");
          const endTime = this.$moment(house.endTime).format("ha");
          const time = `${startTime}-${endTime}`;
          if (this.openHouses) {
            this.openHouses = `${this.openHouses} & ${time}`;
          } else {
            this.openHouses = `Upcoming Open Houses: ${time}`;
          }
        });
      }
    },
    checkNewListing() {
      return !this.$moment(this.info.listDate).isBefore(
        this.$moment().subtract(7, "days")
      );
    },
    checkInEscrow() {
      return (
        this.info.mls.status === "Pending" ||
        this.info.mls.status === "ActiveUnderContract"
      );
    },
    checkSold() {
      return this.info.mls.status === "Closed";
    },
  },

  mounted() {
    this.getOpenHouses();
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.ListingInfo {
  padding: 22px 0 50px;

  &__openHouses {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: $lightest-powder-blue;
    border-radius: 8px;
    color: $color-primary;
    padding: 12px;
    margin: 0 15px 24px;
  }

  &__badge {
    display: flex;
    padding: 8px 12px;
    background: $burnt-orange;
    border-radius: 4px;
    width: fit-content;
    margin-bottom: 20px;

    &-icon {
      color: #fffdfc;
      margin-right: 6px;
      height: 1em;
    }

    &-name {
      font-weight: 600;
      font-size: 12px;
      line-height: 140%;
      text-align: center;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #fffdfc;
    }
  }

  &__badge-escrow {
    display: flex;
    padding: 8px 12px;
    border-radius: 4px;
    width: fit-content;
    margin-bottom: 20px;
    background: $color-primary;
    color: #fffdfc;
    text-transform: uppercase;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
  }

  &__badge-sold {
    display: flex;
    padding: 8px 12px;
    border-radius: 4px;
    width: fit-content;
    margin-bottom: 20px;
    background: #dc013b;
    color: #fffdfc;
    text-transform: uppercase;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
  }

  &__description {
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    color: #000000;
    padding-bottom: 24px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
  }

  &__price {
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    font-weight: normal;
    font-size: 16px;
    line-height: 140%;
    color: #1f2021;

    strong {
      font-weight: 600;
      font-size: 12px;
      line-height: 175%;
    }
  }

  &__type {
    font-weight: normal;
    font-size: 20px;
    line-height: 120%;
    color: #000000;
  }

  &__details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 175%;
    color: #1f2021;
    padding-bottom: 0;

    &-name {
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    }

    &-value {
      font-size: 16px;
    }
  }

  &__detail {
    &-center {
      text-align: center;
    }
  }

  @media (min-width: $medium-devices-width) {
    &__description {
      padding-bottom: 0;
    }
  }

  @media (max-width: $medium-devices-width) {
    [data-component-name="ListingAddress"] {
      display: none;
    }
  }
}
</style>

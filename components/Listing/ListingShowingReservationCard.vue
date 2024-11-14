<template>
  <div class="ListingShowingReservationCard">
    <div class="ListingShowingReservationCard__submitted" v-if="isSubmitted">
      Thanks for contacting us! We will get in touch with you shortly.
    </div>
    <div v-else>
      <div class="ListingShowingReservationCard__title">
        {{ isFirstForm ? card.firstFormTitle : card.secondFormTitle }}
      </div>

      <div v-if="isFirstForm" class="ListingShowingReservationCard__actions">
        <div class="ListingShowingReservationCard__date">
          <label class="ListingShowingReservationCard__label" for="date">
            Select a date
          </label>

          <ArrowRightImage
            v-if="index > 0"
            class="ListingShowingReservationCard__arrow-left"
            @click="loadPreviousDate()"
          />

          <div
            id="datesListItems"
            ref="datesList"
            class="ListingShowingReservationCard__date-items d-none d-md-flex"
          >
            <div
              v-for="(item, index) in card.date"
              :key="index"
              class="ListingShowingReservationCard__date-item"
              :class="{
                'ListingShowingReservationCard__date-item--active':
                  date === index,
              }"
              @click="selectDate(index)"
            >
              {{ item.value }}
            </div>
          </div>

          <ArrowRightImage
            class="ListingShowingReservationCard__arrow-right"
            @click="loadNewDate()"
          />

          <select
            id="date"
            v-model="date"
            class="ListingShowingReservationCard__date-select d-block d-md-none"
            @change="selectDate($event.target.value)"
          >
            <option
              v-for="(item, index) in card.date"
              :key="index"
              :value="index"
            >
              {{ item.value }}
            </option>
          </select>
        </div>

        <div class="ListingShowingReservationCard__time">
          <label class="ListingShowingReservationCard__label" for="time">
            Time
          </label>

          <div class="ListingShowingReservationCard__time-actions">
            <select
              id="time"
              v-model="time"
              class="ListingShowingReservationCard__time-select"
              @change="selectTime($event.target.value)"
            >
              <option
                v-for="(item, index) in card.time"
                :key="index"
                :value="item.value"
              >
                {{ item.value }}
              </option>
            </select>

            <button
              class="ListingShowingReservationCard__time-button"
              :class="{
                'ListingShowingReservationCard__time-button--active':
                  beforeMidday,
              }"
              @click.prevent="beforeMidday = !beforeMidday"
            >
              AM
            </button>

            <button
              class="ListingShowingReservationCard__time-button"
              :class="{
                'ListingShowingReservationCard__time-button--active':
                  !beforeMidday,
              }"
              @click.prevent="beforeMidday = !beforeMidday"
            >
              PM
            </button>
          </div>
        </div>

        <div class="ListingShowingReservationCard__step">
          <label
            class="ListingShowingReservationCard__step-label ListingShowingReservationCard__label"
            for="date"
          >
            Step 1 of 2
          </label>

          <AppButton
            :text="card.firstFormButton.title"
            color="orange"
            type="small"
            @click.native.prevent="handleClickNext()"
          />
        </div>
      </div>
      <div v-else class="ListingShowingReservationCard__actions">
        <div class="ListingShowingReservationCard__container">
          <div class="ListingShowingReservationCard__container__field">
            <label for="name"> Contact Name </label>
            <input
              type="text"
              placeholder="First and Last"
              @input="handleChange('name', $event.target.value)"
            />
          </div>
          <div class="ListingShowingReservationCard__container__field">
            <label for="name"> Phone Number </label>
            <input
              type="number"
              placeholder="310-555-1234"
              @input="handleChange('phone', $event.target.value)"
            />
          </div>
        </div>
        <div class="ListingShowingReservationCard__container">
          <div class="ListingShowingReservationCard__container__field">
            <label for="name"> Email Address </label>
            <input
              type="text"
              placeholder="name@example.com"
              @input="handleChange('email', $event.target.value)"
            />
          </div>
          <div class="ListingShowingReservationCard__container__submit">
            <label
              class="ListingShowingReservationCard__step-label ListingShowingReservationCard__label"
              for="date"
            >
              Step 2 of 2
            </label>
            <AppLoader v-if="isSubmitting" :height="24" :width="24" />
            <AppButton
              v-else
              :text="card.secondFormButton.title"
              color="orange"
              type="small"
              @click.native.prevent="handleClickNext()"
            />

            <button
              class="ListingShowingReservationCard__step-link ListingShowingReservationCard__label"
              for="date"
              @click.prevent="isFirstForm = true"
            >
              &lt; Back to Step 1
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ArrowRightImage from "~/assets/images/arrow-dark-right.svg?inline";

export default {
  components: {
    ArrowRightImage,
  },

  props: {
    card: {
      type: Object,
      default: () => {},
    },
    mlsId: {
      type: Number,
      default: () => 0,
    },
  },

  data() {
    return {
      beforeMidday: true,
      isFirstForm: true,
      date: null,
      time: null,
      index: 0,
      data: {},
      isSubmitted: false,
      isSubmitting: false,
    };
  },

  methods: {
    ...mapActions({
      postGravityForm: "gravity-form/postGravityForm",
    }),

    selectDate(index) {
      this.date = index;
    },

    selectTime(value) {
      this.time = value;
    },

    handleChange(key, value) {
      this.data = { ...this.data, [key]: value };
    },

    loadPreviousDate() {
      if (this.index + 3 >= -3) {
        this.index = this.index - 3;
      } else {
        this.index = this.card.date.length;
      }

      console.log(this.index);

      const list = this.$refs.datesList;

      const element = list.getElementsByClassName(
        "ListingShowingReservationCard__date-item"
      )[this.index];

      this.$scrollTo(element, 300, {
        container: "#datesListItems",
        easing: "ease-in",
        lazy: false,
        offset: -60,
        force: true,
        cancelable: true,
        x: true,
        y: false,
      });
    },

    loadNewDate() {
      if (this.index + 3 < this.card.date.length) {
        this.index = this.index + 3;
      } else {
        this.index = 0;
      }

      const list = this.$refs.datesList;

      const element = list.getElementsByClassName(
        "ListingShowingReservationCard__date-item"
      )[this.index];

      this.$scrollTo(element, 300, {
        container: "#datesListItems",
        easing: "ease-in",
        lazy: false,
        offset: -60,
        force: true,
        cancelable: true,
        x: true,
        y: false,
      });
    },

    async handleClickNext() {
      if (this.isFirstForm) {
        this.isFirstForm = false;
      } else {
        this.isSubmitting = true;
        const selectedDate = this.$moment()
          .add(this.date + 1, "days")
          .format("yyyy-MM-DD");
        const phoneNumber = this.data.phone
          ? `(${this.data.phone.split("-")[0]}) ${
              this.data.phone.split("-")[1]
            }-${this.data.phone.split("-")[2]}`
          : "";
        const params = JSON.stringify({
          form_id: 25,
          1: selectedDate,
          3: this.time,
          5: this.data.email,
          6: phoneNumber,
          7: this.mlsId,
          8: this.data.name,
        });
        await this.postGravityForm(params);
        this.isSubmitting = false;
        this.isSubmitted = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.ListingShowingReservationCard {
  position: relative;
  padding: 22px 10px;
  background: $rose-white;
  margin-bottom: 40px;

  &__submitted {
    padding: 24px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 150%;
  }

  &__title {
    font-weight: normal;
    text-align: center;
    font-size: 14px;
    line-height: 140%;
    padding-bottom: 10px;
  }

  &__label {
    font-weight: 600;
    font-size: 12px;
    line-height: 175%;
    color: #747b7e;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__date {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    width: fit-content;

    &-items {
      display: flex;
      align-items: flex-start;
      width: 180px;
      overflow-y: hidden;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }
    }

    &-item {
      width: 60px;
      min-width: 60px;
      font-weight: normal;
      font-size: 14px;
      line-height: 140%;
      text-decoration: underline;
      display: flex;
      cursor: pointer;
      align-items: center;
      text-align: center;
      color: #747b7e;
      padding: 3px;

      &--active {
        font-weight: 600;
        color: #1f2021;
        background: #ddbcb0;
        border-radius: 7px;
      }
    }

    &-select {
      max-width: 100px;
      padding: 12px 20px;
      background: #fffdfc;
      border: 2px solid #dddddd;
      outline: none;
      border-radius: 11px;
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      color: #1f2021;
      margin-right: 10px;
      appearance: none;
      background: url("~/assets/images/arrow-down-simple.svg") 80% 50% no-repeat
        #fffdfc;
    }
  }

  &__arrow {
    &-left {
      display: none;
    }

    &-right {
      display: none;
    }
  }

  &__time {
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;

    &-select {
      position: relative;
      padding: 12px 20px;
      min-width: 100px;
      background: #fffdfc;
      border: 2px solid #dddddd;
      outline: none;
      box-sizing: border-box;
      border-radius: 11px;
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      color: #1f2021;
      margin-right: 10px;
      appearance: none;
      background: url("~/assets/images/arrow-down-simple.svg") 80% 50% no-repeat
        #fffdfc;
    }

    &-button {
      padding: 11px 9px;
      background: transparent;
      font-weight: 600;
      font-size: 12px;
      line-height: 175%;
      border: none;
      outline: none;
      color: #747b7e;

      &--active {
        font-weight: 600;
        font-size: 12px;
        line-height: 175%;
        text-decoration-line: underline;
        color: #000000;
        background: #ddbcb0;
        border-radius: 5px;
      }
    }
  }

  &__step {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-label {
      text-align: center;
    }

    &-link {
      text-align: center;
      text-decoration: underline;
      cursor: pointer;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }

  &__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 12px;
    label {
      font-weight: 600;
      font-size: 12px;
      color: #747b7e;
      margin-bottom: 0;
    }
    input {
      width: 100%;
      border: 2px solid #dddddd;
      padding: 12px 20px;
      border-radius: 11px;
      outline: none;
      background: #fffdfc;
      font-weight: 600;
      font-size: 14px;
    }
    &__field:nth-of-type(2n + 1) {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: 12px;
    }

    &__field:nth-of-type(2n) {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 12px;
    }

    &__submit {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
    }
  }

  @media (min-width: $medium-devices-width) {
    padding: 30px 40px;

    &__title {
      text-align: left;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
    }

    &__date {
      padding-bottom: 0;
    }

    &__arrow {
      &-left {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(50%);
        left: -15px;
        transform: rotate(180deg);
        cursor: pointer;
      }

      &-right {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(50%);
        transform: rotate(360deg);
        right: -15px;
        cursor: pointer;
      }
    }

    &__time {
      padding-bottom: 0;
    }
  }
}
</style>

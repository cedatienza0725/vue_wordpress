<template>
  <section class="SearchHomeFilterDesktop">
    <div class="SearchHomeFilterDesktop__bg" />
    <client-only>
      <div class="SearchHomeFilterDesktop__container">
        <div class="row pb-md-80">
          <div class="col-12 col-md-6">
            <AppSectionTitle :title="search.title" />
          </div>
          <div class="col-12 col-md-4 offset-md-2">
            <div class="SearchHomeFilterDesktop__subtitle">
              <p class="SearchHomeFilterDesktop__text">
                {{ search.properties }}
              </p>

              <div class="SearchHomeFilterDesktop__author">
                <input
                  id="properties"
                  v-model="isAuthor"
                  type="checkbox"
                  name="properties"
                  class="SearchHomeFilterDesktop__checkbox"
                  :value="search.properties_checkbox"
                />
                <label for="properties">{{ search.properties_checkbox }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="SearchHomeFilterDesktop__content">
          <form
            class="SearchHomeFilterDesktop__form"
            :class="{
              'SearchHomeFilterDesktop__form--hide': showMore,
            }"
          >
            <div class="SearchHomeFilterDesktop__location">
              <label class="SearchHomeFilterDesktop__label" for="location">
                {{ search.form.location.label }}
              </label>

              <input
                id="location"
                v-model="location"
                class="SearchHomeFilterDesktop__input"
                type="text"
                :placeholder="search.form.location.placeholder"
                @change.prevent="onSearchLocation()"
              />

              <div class="SearchHomeFilterDesktop__search">
                <font-awesome-icon
                  v-if="!disabledButton"
                  class="fa-lg"
                  style="color: white; height: 1.25em"
                  :icon="['fas', 'search']"
                  @click.prevent="onSearchLocation()"
                />

                <AppLoader v-else :height="24" :width="24" />
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__sort">
              <label
                class="SearchHomeFilterDesktop__sort SearchHomeFilterDesktop__label"
                for="sort"
              >
                {{ search.form.sort_by.label }}
              </label>

              <select
                id="sort"
                v-model="sort_by"
                class="SearchHomeFilterDesktop__sort-select"
                @change.prevent="onSubmit()"
              >
                <option
                  v-for="(item, index) in search.form.sort_by.list"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </select>
            </div>

            <div class="SearchHomeFilterDesktop__tags">
              <div
                v-for="(item, index) in tags"
                :key="index"
                class="SearchHomeFilterDesktop__tags-item"
              >
                <font-awesome-icon
                  class="SearchHomeFilterDesktop__tags-icon fa-sm"
                  :icon="['fas', 'times-circle']"
                  @click="deleteTag(item)"
                />

                <p class="SearchHomeFilterDesktop__tags-text">
                  {{ getTagItemText(item) }}
                </p>
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__view">
              <label class="SearchHomeFilterDesktop__view-label"> View: </label>

              <font-awesome-icon
                class="SearchHomeFilterDesktop__view-icon fa-lg"
                :class="{
                  'SearchHomeFilterDesktop__view-icon--active': !tableView,
                }"
                :icon="['fas', 'th-list']"
                tabindex="0"
                @click="changeView()"
              />

              <font-awesome-icon
                class="SearchHomeFilterDesktop__view-icon fa-lg"
                :class="{
                  'SearchHomeFilterDesktop__view-icon--active': tableView,
                }"
                :icon="['fas', 'th-large']"
                tabindex="0"
                @click="changeView()"
              />
            </div>

            <div class="SearchHomeFilterDesktop__map">
              <label class="SearchHomeFilterDesktop__map-label"> Map: </label>

              <div
                class="SearchHomeFilterDesktop__map-toggle"
                :class="{
                  'SearchHomeFilterDesktop__map-toggle--active': activeMap,
                }"
              >
                <button
                  class="SearchHomeFilterDesktop__map-button"
                  :class="{
                    'SearchHomeFilterDesktop__map-button--active': activeMap,
                  }"
                  @click.prevent="setActiveMap()"
                />
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__type">
              <label class="SearchHomeFilterDesktop__label">
                {{ search.form.type.label }}
              </label>

              <div class="SearchHomeFilterDesktop__list">
                <label
                  v-for="(item, index) in search.form.type.list"
                  :key="index"
                  class="SearchHomeFilterDesktop__type-checkbox"
                >
                  <input
                    type="checkbox"
                    :checked="
                      !!tags.includes(item.value) ||
                      !!selectedTagsType.includes(item.value)
                    "
                    name="type"
                    @click="selectType($event, item.value)"
                  />

                  {{ item.text }}
                </label>
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__status">
              <label class="SearchHomeFilterDesktop__label">
                {{ search.form.status.label }}
              </label>

              <div class="SearchHomeFilterDesktop__list">
                <label
                  v-for="(item, index) in search.form.status.list"
                  :key="index"
                  class="SearchHomeFilterDesktop__status-checkbox"
                >
                  <input
                    type="checkbox"
                    :checked="
                      !!tags.includes(item.value) ||
                      !!selectedTagsStatus.includes(item.value)
                    "
                    name="status"
                    @click="selectStatus($event, item.value)"
                  />

                  {{ item.text }}
                </label>
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__price">
              <label class="SearchHomeFilterDesktop__label">
                {{ search.form.price.label }}
              </label>

              <div class="SearchHomeFilterDesktop__price-content">
                <select
                  v-model="priceFrom"
                  class="SearchHomeFilterDesktop__price-select"
                >
                  <option
                    v-for="(item, index) in search.form.price.from"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </option>
                </select>

                <span class="SearchHomeFilterDesktop__to">to</span>

                <select
                  v-model="priceTo"
                  class="SearchHomeFilterDesktop__price-select"
                >
                  <option
                    v-for="(item, index) in search.form.price.to"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </option>
                </select>
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__beds">
              <label
                class="SearchHomeFilterDesktop__beds SearchHomeFilterDesktop__label"
                for="beds"
              >
                {{ search.form.beds.label }}
              </label>
              <div class="SearchHomeFilterDesktop__beds-container">
                <button
                  class="SearchHomeFilterDesktop__beds-button"
                  @click.prevent="decreaseBeds()"
                >
                  -
                </button>

                <select
                  v-model="bedsIndex"
                  class="SearchHomeFilterDesktop__beds-select"
                >
                  <option
                    v-for="(item, index) in search.form.beds.list"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </option>
                </select>

                <button
                  class="SearchHomeFilterDesktop__beds-button"
                  @click.prevent="increaseBeds()"
                >
                  +
                </button>
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__baths">
              <label
                class="SearchHomeFilterDesktop__baths SearchHomeFilterDesktop__label"
                for="baths"
              >
                {{ search.form.baths.label }}
              </label>

              <div class="SearchHomeFilterDesktop__baths-container">
                <button
                  class="SearchHomeFilterDesktop__baths-button"
                  @click.prevent="decreaseBaths()"
                >
                  -
                </button>

                <select
                  v-model="bathsIndex"
                  class="SearchHomeFilterDesktop__baths-select"
                >
                  <option
                    v-for="(item, index) in search.form.baths.list"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </option>
                </select>

                <button
                  class="SearchHomeFilterDesktop__baths-button"
                  @click.prevent="increaseBaths()"
                >
                  +
                </button>
              </div>
            </div>

            <div class="SearchHomeFilterDesktop__show">
              <button
                :class="{
                  SearchHomeFilterDesktop__more: !showMore,
                  SearchHomeFilterDesktop__fewer: showMore,
                }"
                @click.prevent="showMore = !showMore"
              >
                <template v-if="showMore">
                  <p>More Filters</p>

                  <font-awesome-icon
                    :icon="['fas', 'chevron-down']"
                    style="height: 1.25em"
                  />
                </template>

                <template v-else>
                  <p>Fewer Filters</p>

                  <font-awesome-icon
                    :icon="['fas', 'chevron-up']"
                    style="height: 1.25em"
                  />
                </template>
              </button>
            </div>

            <div class="SearchHomeFilterDesktop__submit">
              <button
                v-if="!showResetButton"
                class="SearchHomeFilterDesktop__reset"
                @click.prevent="clearAll()"
              >
                Reset all
              </button>

              <AppButton
                v-if="!disabledButton"
                text="Apply Filters"
                color="pink"
                :disabled="disabledButton || searchHomeLoading"
                @click.native.prevent="onSubmit()"
              />

              <button
                v-else
                class="SearchHomeFilterDesktop__loading"
                :disabled="true"
              >
                <AppLoader :height="24" :width="24" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </client-only>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import queryString from "query-string";

export default {
  props: {
    search: {
      type: Object,
      default: () => {},
    },

    // isMap: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  data() {
    return {
      showMore: true,
      activeMap: false,
      tableView: true,

      disabledButton: false,
      isAuthor: false,

      location: null,

      priceFrom: 0,
      priceTo: 0,

      sort_by: "-listdate",

      bedsIndex: 0,
      bathsIndex: 0,

      tags: [],

      selectedTagsType: [],
      selectedTagsLocation: [],
      selectedTagsPrice: [],
      selectedTagsStatus: [],
    };
  },

  computed: {
    ...mapGetters({
      metaData: "search-home/metaData",
      searchHomeLoading: "search-home/searchHomeLoading",
    }),

    showResetButton() {
      return (
        this.selectedTagsType.length === 0 &&
        this.selectedTagsLocation.length === 0 &&
        this.selectedTagsPrice.length === 0 &&
        this.selectedTagsStatus.length === 0 &&
        this.bedsIndex === 0 &&
        this.bathsIndex === 0 &&
        this.priceFrom === 0 &&
        this.priceTo === 0 &&
        !this.location
      );
    },
  },

  watch: {
    isAuthor(value) {
      if (value) {
        this.addTag("Pardee Properties");
      } else {
        this.tags = this.tags.filter((tag) => tag !== "Pardee Properties");
      }

      this.onSearchHome();
    },
  },

  created() {
    if (this.$route.query.q) {
      this.location = this.$route.query.q;
    } else if (this.$route.query.counties) {
      this.location = this.$route.query.counties;
    } else if (this.$route.query.postalCode) {
      this.location = this.$route.query.postalCode;
    } else if (this.$route.query.features) {
      this.location = this.$route.query.features;
    } else if (this.$route.query.neighborhoods) {
      this.location = this.$route.query.neighborhoods;
    } else if (this.$route.query.cities) {
      this.location = this.$route.query.cities;
    }
    if (this.$route.query.baths) {
      this.bathsIndex = this.$route.query.baths;
    }
    if (this.$route.query.beds) {
      this.bedsIndex = this.$route.query.beds;
    }
    if (this.$route.query.minprice) {
      this.priceFrom = this.$route.query.minprice;
    }
    if (this.$route.query.maxprice) {
      this.priceTo = this.$route.query.maxprice;
    }
    if (this.$route.query.type && Array.isArray(this.$route.query.type)) {
      this.selectedTagsType = this.$route.query.type;
    } else if (
      this.$route.query.type &&
      !Array.isArray(this.$route.query.type)
    ) {
      this.selectedTagsType = [this.$route.query.type];
    }
    if (this.$route.query.status && Array.isArray(this.$route.query.status)) {
      this.selectedTagsStatus = this.$route.query.status;
    } else if (
      this.$route.query.status &&
      !Array.isArray(this.$route.query.status)
    ) {
      this.selectedTagsStatus = [this.$route.query.status];
    }
    if (this.$route.query.brokers) {
      this.isAuthor = true;
      this.addTag("Pardee Properties");
    }
    if (this.$route.query.sort) {
      this.sort_by = this.$route.query.sort;
    }

    this.tags = [
      ...this.selectedTagsType,
      ...this.selectedTagsStatus,
      ...this.selectedTagsPrice,
      ...this.selectedTagsLocation,
    ];
    this.onSubmit();
  },

  methods: {
    ...mapActions({
      getSearchHome: "search-home/getSearchHome",
      getSearchHomeByAuthor: "search-home/getSearchHomeByAuthor",
      getMetaDataListing: "search-home/getMetaDataListing",
    }),

    getTagItemText(item) {
      let text = item;
      this.search.form.status.list.forEach((statusItem) => {
        if (statusItem.value === item) {
          text = statusItem.text;
        }
      });
      return text;
    },

    setActiveMap() {
      this.activeMap = !this.activeMap;

      this.$emit("changeMap", this.activeMap);
    },

    changeView() {
      this.tableView = !this.tableView;

      this.$emit("changeView", this.tableView);
    },

    searchLocation() {
      if (this.location) {
        this.selectedTagsLocation = [];
        this.selectedTagsLocation.push(this.location);
      }
    },

    selectType(event, item) {
      if (event.target.checked) {
        this.selectedTagsType.push(item);
      } else {
        const index = this.selectedTagsType.indexOf(item);

        this.selectedTagsType.splice(index, 1);
      }

      this.selectedTagsType = this.selectedTagsType.filter(Boolean);
    },

    selectStatus(event, item) {
      this.tags = this.tags.filter(
        (tag) =>
          this.search.form.status.list.findIndex(
            (listItem) => listItem.value === tag
          ) === -1
      );

      this.selectedTagsStatus = [];
      if (event.target.checked) {
        this.selectedTagsStatus.push(item);
      } else {
        const index = this.tags.indexOf(item);
        this.tags.splice(index, 1);
      }

      this.selectedTagsStatus = this.selectedTagsStatus.filter(Boolean);
    },

    deleteTag(tagName) {
      if (this.selectedTagsLocation.includes(tagName)) {
        this.location = "";
        this.selectedTagsLocation = [];
      }

      if (this.selectedTagsType.includes(tagName)) {
        this.selectedTagsType = this.selectedTagsType.filter(
          (tag) => tag !== tagName
        );
      }

      if (this.selectedTagsStatus.includes(tagName)) {
        this.selectedTagsStatus = this.selectedTagsStatus.filter(
          (tag) => tag !== tagName
        );
      }

      if (this.selectedTagsPrice.includes(tagName)) {
        this.selectedTagsPrice = this.selectedTagsPrice.filter(
          (tag) => tag !== tagName
        );
      }

      if (tagName === "Pardee Properties") {
        this.isAuthor = false;
      }

      this.onSearchHome();
    },

    changePrice() {
      if (this.priceFrom !== 0 && this.priceTo !== 0) {
        let priceFrom = 0;
        let priceTo = 0;

        if (this.priceFrom >= 1e3 && this.priceFrom < 1e6) {
          priceFrom = this.priceFrom / 1e3 + "K";
        }

        if (this.priceFrom >= 1e6 && this.priceFrom < 1e9) {
          priceFrom = this.priceFrom / 1e6 + "M";
        }

        if (this.priceTo >= 1e3 && this.priceTo < 1e6) {
          priceTo = this.priceTo / 1e3 + "K";
        }

        if (this.priceTo >= 1e6 && this.priceTo < 1e9) {
          priceTo = this.priceTo / 1e6 + "M";
        }
        const price = `$${priceFrom} - $${priceTo}`;

        this.selectedTagsPrice.push(price);
      }
    },

    decreaseBeds() {
      if (this.bedsIndex > 1) {
        this.bedsIndex = this.bedsIndex - 1;
      }
    },

    increaseBeds() {
      if (this.search.form.beds.list.length - 1 > this.bedsIndex) {
        this.bedsIndex = this.bedsIndex + 1;
      }
    },

    decreaseBaths() {
      if (this.bathsIndex > 1) {
        this.bathsIndex = this.bathsIndex - 1;
      }
    },

    increaseBaths() {
      if (this.search.form.baths.list.length - 1 > this.bathsIndex) {
        this.bathsIndex = this.bathsIndex + 1;
      }
    },

    clearAll() {
      this.location = null;
      this.priceFrom = 0;
      this.priceTo = 0;
      this.bedsIndex = 0;
      this.bathsIndex = 0;
      this.tags = [];
      this.selectedTagsType = [];
      this.selectedTagsStatus = [];
      this.selectedTagsLocation = [];
      this.selectedTagsPrice = [];
      this.isAuthor = false;
      this.$router.push({
        query: "",
      });

      this.onSubmit();
    },

    addTag(tagName) {
      this.tags.push(tagName);
    },

    onSubmit() {
      this.changePrice();
      this.searchLocation();
      this.onSearchHome();
    },

    onSearchLocation() {
      this.searchLocation();
      this.onSearchHome();
    },

    async onSearchHome() {
      this.disabledButton = true;
      this.showMore = true;
      await this.getMetaDataListing();

      this.tags = [
        ...this.selectedTagsType,
        ...this.selectedTagsStatus,
        ...this.selectedTagsPrice,
        ...this.selectedTagsLocation,
      ];

      const searchHome = {};

      if (this.bedsIndex && this.bedsIndex > 0) {
        searchHome.beds = this.bedsIndex;
      }

      if (this.bathsIndex && this.bathsIndex > 0) {
        searchHome.baths = this.bathsIndex;
      }

      if (this.location) {
        searchHome.q = this.location;
      }

      if (
        this.location &&
        this.metaData.metadata.fields.cities.includes(this.location)
      ) {
        searchHome.cities = this.location;
      }

      if (
        this.location &&
        this.metaData.metadata.fields.features.includes(this.location)
      ) {
        searchHome.features = this.location;
      }

      if (
        this.location &&
        this.metaData.metadata.fields.neighborhoods.includes(this.location)
      ) {
        searchHome.neighborhoods = this.location;
      }

      if (
        this.location &&
        this.metaData.metadata.fields.counties.includes(this.location)
      ) {
        searchHome.counties = this.location;
      }

      if (this.sort_by) {
        searchHome.sort = this.sort_by;
      }

      if (this.priceTo) {
        searchHome.maxprice = this.priceTo;
      }

      if (this.selectedTagsType.length > 0) {
        searchHome.type = this.selectedTagsType;
      }

      if (this.selectedTagsStatus.length > 0) {
        searchHome.status = this.selectedTagsStatus;
      }

      if (this.priceFrom) {
        searchHome.minprice = this.priceFrom;
      }

      if (this.isAuthor) {
        searchHome.brokers = "X77543";
      }

      searchHome.page = "1";

      const queryParams = queryString.stringify(searchHome);

      this.$router.push({
        path: this.$route.path,
        query: searchHome,
      });

      try {
        await this.getSearchHome(queryParams);
      } catch (err) {
        console.log(err);
      }

      this.disabledButton = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.SearchHomeFilterDesktop {
  position: relative;
  padding: 80px 0 50px 0;

  &__container {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 130%;
    background: $lightest-blush;
  }

  &__content {
    position: relative;
    z-index: 222;
  }

  &__subtitle {
    padding: 40px 0 35px 0;
  }

  &__text {
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    padding-bottom: 15px;
  }

  &__form {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(1fr, auto);
    grid-template-rows: 2fr;

    &--hide {
      .SearchHomeFilterDesktop__sort,
      .SearchHomeFilterDesktop__type,
      .SearchHomeFilterDesktop__price,
      .SearchHomeFilterDesktop__beds,
      .SearchHomeFilterDesktop__baths {
        display: none;
      }
    }
  }

  &__location {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    position: relative;
  }

  &__tags {
    grid-column: 1 / 3;
    grid-row: 2 / 3;

    display: flex;
    flex-wrap: wrap;

    &-item {
      background: #f2f2f2;
      border-radius: 20px;
      padding: 2px 5px;
      height: fit-content;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &:not(:last-of-type) {
        margin-right: 10px;
      }
    }

    &-icon {
      height: 12px;
      color: #4f4f4f;
      cursor: pointer;
    }

    &-text {
      padding-left: 5px;
      font-weight: 600;
      font-size: 12px;
      line-height: 175%;
      color: #4f4f4f;
    }
  }

  &__label {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    color: #1f2021;
  }

  &__author {
    display: flex;
    align-items: center;

    label {
      margin: 0;
    }
  }

  &__checkbox {
    margin-right: 8px;

    &:focus {
      @include focus-dark;
    }
  }

  &__input {
    width: 100%;
    background: #fffdfc;
    border: 2px solid #dddddd;
    box-sizing: border-box;
    outline: none;
    border-radius: 24px;
    padding: 13px 22px;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    color: #747b7e;

    &:focus {
      @include focus-dark;
    }
  }

  &__search {
    position: absolute;
    bottom: 2px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 46px;
    max-height: 46px;
    height: 100%;
    width: 100%;
    background: $darkest-pink;
    border-radius: 24px;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  &__sort {
    grid-column: 1 / 3;
    grid-row: 7 / 8;

    &-select {
      padding: 13px 22px;
      width: 100%;
      outline: none;
      background: #fffdfc;
      border: 2px solid #dddddd;
      border-radius: 24px;
      font-weight: normal;
      font-size: 14px;
      line-height: 140%;
      color: #747b7e;

      appearance: none;

      &:focus {
        @include focus-dark;
      }
    }
  }

  &__view {
    display: none;

    &-label {
      padding-right: 10px;
      font-weight: normal;
      font-size: 16px;
      line-height: 140%;
      color: #747b7e;
      margin: 0;
    }

    &-icon {
      color: #dddddd;
      height: 1.25em;

      &:not(:last-of-type) {
        margin-right: 16px;
      }

      &--active {
        color: $color-primary;
      }

      &:focus {
        @include focus-dark;
      }
    }
  }

  &__map {
    grid-column: 2 / 3;
    grid-row: 9 / 10;
    display: flex;
    position: relative;

    &-label {
      margin: 0;
      display: flex;
      align-items: center;
      padding-right: 10px;
      font-weight: normal;
      font-size: 16px;
      line-height: 140%;
      color: #747b7e;
    }

    &-toggle {
      position: relative;
      background: rgba(120, 120, 128, 0.32);
      padding: 2px;
      height: 31px !important;
      max-width: 51px;
      width: 100%;
      border-radius: 25px;

      &--active {
        background: #32d74b;
      }
    }

    &-button {
      position: absolute;
      max-width: 27px;
      max-height: 27px;
      width: 100%;
      height: 100%;
      left: calc(50% - 27px / 2 - 10px);
      top: calc(50% - 27px / 2);
      outline: none;
      border: none;
      border-radius: 50%;
      background: #ffffff;
      border: 0.5px solid rgba(0, 0, 0, 0.04);
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15),
        0px 3px 1px rgba(0, 0, 0, 0.06);

      &:focus {
        @include focus-dark;
      }

      &--active {
        left: calc(50% - 27px / 2 + 10px);
        top: calc(50% - 27px / 2);
      }
    }
  }

  &__type {
    grid-column: 1 / 3;
    grid-row: 6 / 7;
    color: #000000;
    font-size: 16px;
    line-height: 140%;

    &-checkbox {
      width: 50%;

      &:focus {
        @include focus-dark;
      }

      input {
        &:focus {
          @include focus-dark;
        }
      }
    }
  }

  &__status {
    grid-column: 1 / 3;
    grid-row: 5 / 6;
    color: #000000;
    font-size: 16px;
    line-height: 140%;

    &-checkbox {
      width: 50%;

      &:focus {
        @include focus-dark;
      }

      input {
        &:focus {
          @include focus-dark;
        }
      }
    }
  }

  &__list {
    width: 100%;
  }

  &__price {
    grid-column: 1 / 3;
    grid-row: 4 / 5;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-select {
      padding: 11px 4px 11px 18px;
      width: 40%;
      background: #fffdfc;
      border: 2px solid #dddddd;
      border-radius: 32px;
      font-weight: normal;
      font-size: 14px;
      line-height: 140%;
      color: #747b7e;

      appearance: none;

      &:focus {
        @include focus-dark;
      }
    }
  }

  &__to {
    padding: 0 12px;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    color: #747b7e;
  }

  &__beds {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
  }

  &__beds,
  &__baths {
    position: relative;

    &-button {
      position: absolute;
      top: 0;
      background: #fffdfc;
      border: 2px solid #dddddd;
      border-radius: 31px;
      max-width: 44px;
      max-height: 44px;
      width: 100%;
      height: 100%;
      font-weight: normal;
      font-size: 30px;
      line-height: 30px;
      text-align: center;
      outline: none;

      &:first-of-type {
        left: 0;
      }

      &:last-of-type {
        right: 0;
      }

      &:focus {
        @include focus-dark;
      }
    }

    &-select {
      padding: 10px 50px;
      outline: none;
      background: #fffdfc;
      border: 2px solid #dddddd;
      border-radius: 31px;
      appearance: none;
      width: 100%;
      font-size: 14px;
      line-height: 140%;
      color: #747b7e;
      text-align: center;
      text-align-last: center;

      option {
        text-align: center;
      }

      &:focus {
        @include focus-dark;
      }
    }
  }

  &__baths {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }

  &__show {
    grid-column: 1 / 2;
    grid-row: 9 / 10;
  }

  &__more {
    background: none;
    outline: none;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $darkest-pink;

    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 140%;
      text-decoration: underline;
      margin-right: 8px;
    }

    &:focus {
      @include focus-dark;
    }
  }

  &__fewer {
    background: none;
    outline: none;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #747b7e;

    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 140%;
      text-decoration: underline;
      margin-right: 8px;
    }

    &:focus {
      @include focus-dark;
    }
  }

  &__submit {
    grid-column: 1 / 3;
    grid-row: 8 / 9;

    display: flex;
    justify-content: flex-end;
  }

  &__reset {
    padding: 0 20px;
    font-weight: normal;
    background: none;
    outline: none;
    border: none;
    font-size: 16px;
    line-height: 140%;
    text-decoration-line: underline;
    color: #747b7e;

    &:focus {
      @include focus-dark;
    }
  }

  &__loading {
    width: 200px;
    position: relative;
    border: none;
    outline: none;
    transition: all 0.2s;
    border-radius: 24px;
    padding: 12px 44px;
    background: $darkest-pink;

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  @media (min-width: $large-devices-width) {
    &__subtitle {
      padding: 0;
    }

    &__form {
      display: grid;
      row-gap: 20px;
      column-gap: 20px;
      grid-template-columns: repeat(18, 1fr);
      grid-template-rows: 1fr;

      &--hide {
        .SearchHomeFilterDesktop__type,
        .SearchHomeFilterDesktop__status,
        .SearchHomeFilterDesktop__price,
        .SearchHomeFilterDesktop__beds,
        .SearchHomeFilterDesktop__baths {
          display: none;
        }

        .SearchHomeFilterDesktop__sort {
          display: block;
        }
      }
    }

    &__location {
      grid-column: 1 / 7;
      grid-row: 1 / 2;
    }

    &__sort {
      grid-column: 13 / 19;
      grid-row: 1 / 2;
    }

    &__tags {
      grid-column: 1 / 7;
      grid-row: 2 / 3;
    }

    &__view {
      display: flex;
      align-items: center;
      grid-column: 13 / 16;
      grid-row: 2 / 3;
      margin-bottom: 10px;
    }

    &__map {
      grid-column: 16 / 19;
      grid-row: 2 / 3;
      margin-bottom: 10px;
    }

    &__type {
      grid-column: 1 / 5;
      grid-row: 3 / 4;
      margin-bottom: 0px;
    }

    &__status {
      grid-column: 5 / 9;
      grid-row: 3 / 4;
      margin-bottom: 0px;
    }

    &__price {
      grid-column: 9 / 13;
      grid-row: 3 / 4;
      margin-bottom: 0px;

      &-select {
        border-radius: 0;
      }
    }

    &__beds {
      grid-column: 13 / 16;
      grid-row: 3 / 4;

      &-container {
        max-width: 200px;
        position: relative;
      }

      &-button {
        border-radius: 0;

        &:first-of-type {
          left: 0;
        }

        &:last-of-type {
          right: 0;
        }
      }

      &-select {
        border-radius: 0;
      }
    }

    &__baths {
      grid-column: 16 / 19;
      grid-row: 3 / 4;

      &-container {
        max-width: 200px;
        position: relative;
      }

      &-button {
        border-radius: 0;

        &:first-of-type {
          left: 0;
        }

        &:last-of-type {
          right: 0;
        }
      }

      &-select {
        border-radius: 0;
      }
    }

    &__show {
      grid-column: 1 / 4;
      grid-row: 4 / 5;
    }

    &__submit {
      grid-column: 13 / 19;
      grid-row: 4 / 5;
    }
  }
}
</style>

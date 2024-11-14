<template>
  <section class="BlogSearch">
    <img
      class="BlogSearch__star"
      src="~/assets/images/star-blog.png"
      alt="star"
    />
    <div class="container">
      <span
        v-if="search.page_pre_title"
        class="BlogSearch__pretitle"
        v-html="search.page_pre_title"
      />

      <AppSectionTitle
        v-if="search.page_title.search"
        :title="`'${search.page_title}'`"
        class="text-center"
      />

      <div v-if="blogSearchLoading" class="BlogSearch__loading">
        <AppLoader />
      </div>

      <BlogCardsList :list="content_data" />

      <paginate
        v-if="search.pagination.total_pages > 0"
        v-model="currentPage"
        :page-count="search.pagination.total_pages"
        :page-range="3"
        :margin-pages="1"
        :click-handler="navigateToPage"
        :prev-text="'‹  Prev'"
        :next-text="'Next  ›'"
        :first-last-button="true"
        first-button-text="«  First"
        last-button-text="Last  »"
        :container-class="'pagination'"
        active-class="page-item--active"
        page-link-class="page-item"
        :no-li-surround="true"
        prev-link-class="page-item text-item"
        next-link-class="page-item text-item"
      />
    </div>
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
  },

  data() {
    return {
      currentPage: null,
      content_data: [],
    };
  },

  computed: {
    ...mapGetters({
      blogSearchLoading: "blog/blogSearchLoading",
    }),
  },

  mounted() {
    if (this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }

    this.navigateToPage(this.currentPage);
    this.updateContent();
  },

  methods: {
    ...mapActions({
      getBlogSearch: "blog/getBlogSearch",
    }),

    async updateContent() {
      this.content_data = [];
      const blogData = await this.$axios.get(
        "https://live-pardeeproperties.pantheonsite.io/wp-json/api/v1/all_blogs"
      );
      this.search.content_data.forEach((item) => {
        const blogItem = blogData.data.data.blogs_data.filter(
          (blog) => blog.id === item.ID
        )[0];
        const newItem = {
          ...item,
          post_image: blogItem?.attachment_image.img_src[0],
        };
        this.content_data.push(newItem);
      });
    },

    navigateToPage(pageNumber) {
      const pagination = { ...this.$route.query };

      pagination.page = pageNumber.toString();

      this.$router.push({
        path: this.$route.path,
        query: pagination,
      });

      const queryParams = queryString.stringify(pagination);

      try {
        this.getBlogSearch(queryParams);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/styles/common/variables.scss";

.BlogSearch {
  position: relative;
  padding: 104px 0 72px 0;

  &__pretitle {
    position: relative;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    color: #747b7e;
    z-index: 10;
  }

  &__star {
    position: absolute;
    width: 60%;
    top: 0;
    left: 0;
  }

  &__loading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 100;
    background: rgba($color: #f2f2f2, $alpha: 0.4);
  }

  @media (min-width: $medium-devices-width) {
    padding: 90px 0 164px 0;

    &__star {
      width: 40%;
      top: -2%;
    }
  }

  @media (min-width: $extra-large-devices-width) {
    &__star {
      width: 30%;
    }
  }
}

.pagination {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  position: relative;
  z-index: 2;
  justify-content: center;
}

.text-item {
  display: none;
}

.page-item {
  padding: 8px 12px;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  text-decoration-line: underline;
  color: #073c5c;
  border-radius: 6px;
  background: transparent;
  border: none;
  outline: none;
  transition: background 0.3s ease;

  &--active {
    background: $darkest-pink;
    color: #ffffff;
  }

  &:hover {
    background: #f2f2f2;
    color: #073c5c;
  }
}

@media (min-width: $small-devices-width) {
  .page-item {
    padding: 12px 16px;
  }

  .text-item {
    display: block;
  }
}
</style>

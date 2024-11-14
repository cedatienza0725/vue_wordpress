<template>
  <div>
    <BlogSearch :search="blogSearch" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import queryString from "query-string";

export default {
  async asyncData({ store, route }) {
    await Promise.all([
      store.dispatch("footer/getFooter"),
      store.dispatch("header/getHeader"),
      store.dispatch("blog/getBlogSearch", queryString.stringify(route.query)),
    ]);
  },

  computed: {
    ...mapGetters({
      header: "header/header",
      blogSearch: "blog/blogSearch",
    }),
  },

  mounted() {
    this.setIsDarkMode(true);

    console.log(this.blogSearch);
  },

  methods: {
    ...mapActions({
      setIsDarkMode: "app/setIsDarkMode",
    }),
  },
};
</script>

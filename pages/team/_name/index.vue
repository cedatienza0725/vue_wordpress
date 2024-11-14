<template>
  <div>
    <TeamMemberContent :content="teamMember" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import MetaTagsHelpers from '~/helpers/meta-tags'

export default {
  async asyncData({ store, route }) {
    await store.dispatch("header/getHeader");
    await store.dispatch("footer/getFooter");
    await store.dispatch("team/getTeamMember", route.params.name);
  },

  computed: {
    ...mapGetters({
      header: "header/header",
      teamMember: "team/teamMember",
    }),
  },

  mounted() {
    this.setIsDarkMode(true);
    console.log("*********teamMember: ", this.teamMember);
  },

  methods: {
    ...mapActions({
      setIsDarkMode: "app/setIsDarkMode",
    }),
  },
};
</script>

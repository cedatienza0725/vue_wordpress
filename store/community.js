export const state = () => ({
  community: null,
  communityLoading: false,
});

export const getters = {
  community: (state) => state.community,
  communityLoading: (state) => state.communityLoading,
};

export const mutations = {
  GET_COMMUNITIES_REQUEST: (state) => {
    state.communityLoading = true;
  },

  GET_COMMUNITIES_SUCCESS: (state, payload) => {
    state.community = payload;
    state.communityLoading = false;
  },

  GET_COMMUNITIES_FAILURE: (state) => {
    state.community = null;
    state.communityLoading = false;
  },
};

export const actions = {
  async getCommunities({ commit }, params) {
    commit("GET_COMMUNITIES_REQUEST");

    try {
      const community = await this.$axios.get(`singlecommunity?slug=${params}`);
      const communityV2 = await this.$axios.get(
        `https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/communities?per_page=100&slug=${params}`
      );
      const neighborhoods = communityV2?.data[0]?.acf?.neighborhoods;
      let communityData = community.data.data;
      if (neighborhoods) {
        communityData = { ...communityData, neighborhoods: neighborhoods };
      }

      commit("GET_COMMUNITIES_SUCCESS", communityData);
    } catch {
      commit("GET_COMMUNITIES_FAILURE");
    }
  },
};

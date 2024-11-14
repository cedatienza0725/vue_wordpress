export const state = () => ({
  team: null,
  teamLoading: false,

  teamMember: null,
  teamMemberLoading: false,
})

export const getters = {
  team: state => state.team,
  teamLoading: state => state.teamLoading,

  teamMember: state => state.teamMember,
  teamMemberLoading: state => state.teamMemberLoading,
}

export const mutations = {
  'GET_TEAM_REQUEST': (state) => {
    state.teamLoading = true
  },

  'GET_TEAM_SUCCESS': (state, payload) => {
    state.team = payload
    state.teamLoading = false
  },

  'GET_TEAM_FAILURE': (state) => {
    state.team = null
    state.teamLoading = false
  },

  'GET_TEAM_MEMBER_REQUEST': (state) => {
    state.teamMemberLoading = true
  },

  'GET_TEAM_MEMBER_SUCCESS': (state, payload) => {
    state.teamMember = payload
    state.teamMemberLoading = false
  },

  'GET_TEAM_MEMBER_FAILURE': (state) => {
    state.teamMember = null
    state.teamMemberLoading = false
  },
}

export const actions = {
  async getTeam({ commit }) {
    commit('GET_TEAM_REQUEST')

    try {
      const team = await this.$axios.get('meet_the_team')

      commit('GET_TEAM_SUCCESS', team.data.data)
    } catch {
      commit('GET_TEAM_FAILURE')
    }
  },

  async getTeamMember({ commit }, params) {
    commit('GET_TEAM_MEMBER_REQUEST')

    try {
      const team = await this.$axios.get(`team/singleteam?slug=${params}`)
      let teamData = team.data.data;
      const teamV2 = await this.$axios.get(`https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/team-member?slug=${params}`)
      let content_blocks = teamV2?.data[0]?.acf?.content_blocks;
      let newContentBlocks = {}
      if (content_blocks) {
        let featured_property = content_blocks.filter((content) => content.acf_fc_layout === "featured_property")[0];
        let featured_testimonial = content_blocks.filter((content) => content.acf_fc_layout === "featured_testimonial")[0];
        if (featured_property) {
          const config = {
            method: 'get',
            url: `https://api.simplyrets.com/properties?q=${featured_property.mls_id}`,
            headers: {
              Authorization: `Basic ${process.env.SIMPLYRETS_AUTH}`,
              accept: "application/json",
            }
          }
          const mls_data = await this.$axios(config);
          featured_property = { ...featured_property, mls_data: mls_data.data[0] }
          newContentBlocks = { ...newContentBlocks, featured_property: featured_property }
        }

        if (featured_testimonial) {
          const imageData = await this.$axios.get(`https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/media/${featured_testimonial.background_image}`)
          featured_testimonial = { ...featured_testimonial, background_image: imageData.data.source_url }
          newContentBlocks = { ...newContentBlocks, featured_testimonial: featured_testimonial }
        }
        teamData = { ...teamData, content_blocks: newContentBlocks }
      }
      commit('GET_TEAM_MEMBER_SUCCESS', teamData)
    } catch {
      commit('GET_TEAM_MEMBER_FAILURE')
    }
  },
}

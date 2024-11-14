export const state = () => ({
  buyingHome: null,
  buyingHomeLoading: false
})

export const getters = {
  buyingHome: state => state.buyingHome,
  buyingHomeLoading: state => state.buyingHomeLoading
}

export const mutations = {
  'GET_BUYING_HOME_REQUEST': (state) => {
    state.buyingHomeLoading = true
  },

  'GET_BUYING_HOME_SUCCESS': (state, payload) => {
    state.buyingHome = payload
    state.buyingHomeLoading = false
  },

  'GET_BUYING_HOME_FAILURE': (state) => {
    state.buyingHome = null
    state.buyingHomeLoading = false
  }
}

export const actions = {
  async getBuyingHome({ commit }) {
    commit('GET_BUYING_HOME_REQUEST')

    try {
      const buyingHome = await this.$axios.get('page?id=75944')

      commit('GET_BUYING_HOME_SUCCESS', buyingHome.data.data)
    } catch {
      commit('GET_BUYING_HOME_FAILURE')
    }
  }
}

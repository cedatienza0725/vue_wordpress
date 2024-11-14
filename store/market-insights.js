export const state = () => ({
  marketInsights: null,
  marketInsightsLoading: false
})

export const getters = {
  marketInsights: state => state.marketInsights,
  marketInsightsLoading: state => state.marketInsightsLoading
}

export const mutations = {
  'GET_MARKET_INSIGHTS_REQUEST': (state) => {
    state.marketInsightsLoading = true
  },

  'GET_MARKET_INSIGHTS_SUCCESS': (state, payload) => {
    state.marketInsights = payload
    state.marketInsightsLoading = false
  },

  'GET_MARKET_INSIGHTS_FAILURE': (state) => {
    state.marketInsights = null
    state.marketInsightsLoading = false
  }
}

export const actions = {
  async getMarketInsights({ commit }, pageNumber) {
    commit('GET_MARKET_INSIGHTS_REQUEST')

    try {
      const marketInsights = await this.$axios.get(`page?id=${pageNumber}`)

      commit('GET_MARKET_INSIGHTS_SUCCESS', marketInsights.data.data)
    } catch {
      commit('GET_MARKET_INSIGHTS_FAILURE')
    }
  }
}

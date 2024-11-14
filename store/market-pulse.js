export const state = () => ({
  marketPulse: null,
  marketPulseLoading: false
})

export const getters = {
  marketPulse: state => state.marketPulse,
  marketPulseLoading: state => state.marketPulseLoading
}

export const mutations = {
  'GET_MARKET_PULSE_REQUEST': (state) => {
    state.marketPulseLoading = true
  },

  'GET_MARKET_PULSE_SUCCESS': (state, payload) => {
    state.marketPulse = payload
    state.marketPulseLoading = false
  },

  'GET_MARKET_PULSE_FAILURE': (state) => {
    state.marketPulse = null
    state.marketPulseLoading = false
  },

  'SEND_MARKET_PULSE_REQUEST': (state) => {
    state.marketPulseLoading = true
  },

  'SEND_MARKET_PULSE_SUCCESS': (state, payload) => {
    state.marketPulseLoading = false
  },

  'SEND_MARKET_PULSE_FAILURE': (state) => {
    state.marketPulseLoading = false
  }
}

export const actions = {
  async getMarketPulse({ commit }) {
    commit('GET_MARKET_PULSE_REQUEST')

    try {
      const marketPulse = await this.$axios.get('https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/pages/1842')
      commit('GET_MARKET_PULSE_SUCCESS', marketPulse.data)
    } catch {
      commit('GET_MARKET_PULSE_FAILURE')
    }
  },

  async sendMarketPulse({ commit }, params) {
    commit('SEND_MARKET_PULSE_REQUEST')

    try {
      await this.$axios.post('https://live-pardeeproperties.pantheonsite.io/wp-json/wp/v2/pages/1842', params)

      commit('SEND_MARKET_PULSE_SUCCESS')
    } catch {
      commit('SEND_MARKET_PULSE_FAILURE')
    }
  }
}

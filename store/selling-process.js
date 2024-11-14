export const state = () => ({
  sellingProcess: null,
  sellingProcessLoading: false
})

export const getters = {
  sellingProcess: state => state.sellingProcess,
  sellingProcessLoading: state => state.sellingProcessLoading
}

export const mutations = {
  'GET_SELLING_PROCESS_REQUEST': (state) => {
    state.sellingProcessLoading = true
  },

  'GET_SELLING_PROCESS_SUCCESS': (state, payload) => {
    state.sellingProcess = payload
    state.sellingProcessLoading = false
  },

  'GET_SELLING_PROCESS_FAILURE': (state) => {
    state.sellingProcess = null
    state.sellingProcessLoading = false
  }
}

export const actions = {
  async getSellingProcess ({ commit }) {
    commit('GET_SELLING_PROCESS_REQUEST')

    try {
      // TODO
      // Creat new api on backend and integrate it...
      const sellingProcess = await this.$axios.get('page?id=75791')

      commit('GET_SELLING_PROCESS_SUCCESS', sellingProcess.data.data)
    } catch {
      commit('GET_SELLING_PROCESS_FAILURE')
    }
  }
}

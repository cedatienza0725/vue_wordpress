export const state = () => ({
  contact: null,
  contactLoading: false
})

export const getters = {
  contact: state => state.contact,
  contactLoading: state => state.contactLoading
}

export const mutations = {
  'GET_CONTACT_REQUEST': (state) => {
    state.contactLoading = true
  },

  'GET_CONTACT_SUCCESS': (state, payload) => {
    state.contact = payload
    state.contactLoading = false
  },

  'GET_CONTACT_FAILURE': (state) => {
    state.contact = null
    state.contactLoading = false
  },

  'SEND_CONTACT_REQUEST': (state) => {
    state.contactLoading = true
  },

  'SEND_CONTACT_SUCCESS': (state, payload) => {
    state.contactLoading = false
  },

  'SEND_CONTACT_FAILURE': (state) => {
    state.contactLoading = false
  }
}

export const actions = {
  async getContact({ commit }) {
    commit('GET_CONTACT_REQUEST')

    try {
      const contact = await this.$axios.get('page?id=42417')

      commit('GET_CONTACT_SUCCESS', contact.data.data)
    } catch {
      commit('GET_CONTACT_FAILURE')
    }
  },

  async sendContact({ commit }, params) {
    commit('SEND_CONTACT_REQUEST')
    const config = {
      method: 'post',
      url: `https://live-pardeeproperties.pantheonsite.io/wp-json/gf/v2/entries`,
      headers: {
        'Authorization': `Basic ${process.env.AUTHORIZATION}`,
        'Content-Type': 'application/json',
      },
      data: params,
    }

    this.$axios(config).then((res) => {
      commit('SEND_CONTACT_SUCCESS')
    }).catch((error) => {
      commit('SEND_CONTACT_FAILURE')
    })
  }
}

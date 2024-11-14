export const state = () => ({
  gravityForm: null,
  gravityFormLoading: false
})

export const getters = {
  gravityForm: state => state.gravityForm,
  gravityFormLoading: state => state.gravityFormLoading
}

export const mutations = {
  'GET_GRAVITY_FORM_REQUEST': (state) => {
    state.gravityFormLoading = true
  },

  'GET_GRAVITY_FORM_SUCCESS': (state, payload) => {
    state.gravityForm = payload
    state.gravityFormLoading = false
  },

  'GET_GRAVITY_FORM_FAILURE': (state) => {
    state.gravityForm = null
    state.gravityFormLoading = false
  },

  'POST_GRAVITY_FORM_REQUEST': (state) => {
    state.gravityFormLoading = true
  },

  'POST_GRAVITY_FORM_SUCCESS': (state, payload) => {
    state.gravityFormLoading = false
  },

  'POST_GRAVITY_FORM_FAILURE': (state) => {
    state.gravityFormLoading = false
  }
}

export const actions = {
  async getGravityForm({ commit }, formId) {
    commit('GET_GRAVITY_FORM_REQUEST')
    const config = {
      method: 'get',
      url: `https://live-pardeeproperties.pantheonsite.io/wp-json/gf/v2/forms/${formId}`,
      headers: {
        'Authorization': `Basic ${process.env.AUTHORIZATION}`,
      }
    }

    const resp = await this.$axios(config);
    commit('GET_GRAVITY_FORM_SUCCESS', resp.data)

  },

  async postGravityForm({ commit }, data) {
    commit('GET_GRAVITY_FORM_REQUEST')
    const config = {
      method: 'post',
      url: `https://live-pardeeproperties.pantheonsite.io/wp-json/gf/v2/entries`,
      headers: {
        'Authorization': `Basic ${process.env.AUTHORIZATION}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    this.$axios(config).then(() => {
      commit('POST_GRAVITY_FORM_SUCCESS')
    }).catch((error) => {
      commit('POST_GRAVITY_FORM_FAILURE')
    })
  }
}

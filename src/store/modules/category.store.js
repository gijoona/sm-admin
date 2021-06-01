// initial state
const state = () => ({
  all: [],
  code: '',
  name: '부식'
})

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  setCategoryCode(state, payload) {
    state.code = payload;
  },
  setCategoryName(state, payload) {
    state.name = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
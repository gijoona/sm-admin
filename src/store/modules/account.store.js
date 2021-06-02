import axios from 'axios'

// initial state
const state = () => ({
  pageNum: 0,
  limit: 15,
  count: 15,
  total: 0,
  loading: false,
  accounts: []
})

// getters
const getters = {
  pageNum(state) {
    return state.pageNum;
  },
  total(state) {
    return state.total;
  },
  limit(state) {
    return state.limit;
  },
  loading(state) {
    return state.loading;
  },
  accounts(state) {
    return state.accounts;
  }
}

// actions
const actions = {
  async find({ commit, state }, payload) {
    commit('enableLoading');
    await axios.get(`http://localhost:5000/user/find?page=${state.pageNum}&limit=${state.limit}&search=${payload.search}`)
              .then(res => {
                commit('setTotal', res.data.count);
                if (res.data.rows.length > 0) commit('setAccounts', res.data.rows);
                commit('disableLoading');
              })
  },
  async save({ commit }) {
    commit('enableLoading');
    await axios.post('')
              .then(res => {
                console.log(res.data);
                commit('disableLoading');
              })
  },
  async delete({ commit }) {
    commit('enableLoading');
    await axios.delete('')
              .then(res => {
                console.log(res.data);
                commit('disableLoading');
              })
  }
}

// mutations
const mutations = {
  setPageNum(state, payload) {
    state.pageNum = payload;
  },
  setAccounts(state, payload) {
    state.accounts = payload;
  },
  setTotal(state, payload) {
    state.total = payload
  },
  enableLoading(state) {
    state.loading = true;
  },
  disableLoading(state) {
    state.loading = false;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
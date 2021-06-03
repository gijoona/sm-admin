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
    await axios
              .get(`http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/user/find?page=${state.pageNum}&limit=${state.limit}&search=${payload.search}`)
              // .get(`http://localhost:5000/user/find?page=${state.pageNum}&limit=${state.limit}&search=${payload.search}`)
              .then(res => {
                commit('setTotal', res.data.count);
                if (res.data.rows.length > 0) commit('setAccounts', res.data.rows);
                commit('disableLoading');
              })
  },
  async save({ dispatch, commit }, payload) {
    commit('enableLoading');
    await axios.post('http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/user/save', payload.savedItem )
              .then(() => dispatch('find', { search: '' }));
  },
  async delete({ dispatch, commit }, payload) {
    commit('enableLoading');
    await axios.delete(`http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/user/delete?id=${payload.id}`)
              .then(() => dispatch('find', { search: '' }));
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
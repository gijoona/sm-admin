import instance from './../../plugins/axios';

// initial state
const state = () => ({
  pageNum: 0,
  limit: 15,
  count: 15,
  total: 0,
  loading: false,
  items: []
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
  items(state) {
    return state.items;
  }
}

// actions
const actions = {
  async find({ commit, state }, payload) {
    commit('enableLoading');
    await instance
              .get(`/items/find?page=${state.pageNum}&limit=${state.limit}&search=${payload.search}`)
              .then(res => {
                commit('setTotal', res.data.count);
                if (res.data.rows.length > 0) commit('setItems', res.data.rows);
                commit('disableLoading');
              })
  },
  async save({ dispatch, commit }, payload) {
    commit('enableLoading');
    await instance
              .post('/items/save', payload.savedItem )
              .then(() => dispatch('find', { search: '' }));
  },
  async delete({ dispatch, commit }, payload) {
    commit('enableLoading');
    await instance
              .delete(`/items/remove/${payload.code}`)
              .then(() => dispatch('find', { search: '' }));
  },
  async fileUpload(obj, payload) {
    console.log(payload);
    await instance
              .post('/items/fileUpload', payload)
              .then((res) => console.log(res));
  }
}

// mutations
const mutations = {
  setPageNum(state, payload) {
    state.pageNum = payload;
  },
  setItems(state, payload) {
    state.items = payload;
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
import instance from './../../plugins/axios';

// initial state
const state = () => ({
  masters: [],
  slaves: [],
  loading: false
})

// getters
const getters = {
  masters(state) {
    return state.masters;
  },
  slaves(state) {
    return state.slaves;
  },
  loading(state) {
    return state.loading;
  }
}

// actions
const actions = {
  async findAll({ commit }) {
    await instance
            .get('/lang/findAll')
            .then(res => {
              console.log(res);
              commit('setMasters', res.data.rows);
            })
  },
  async save({ dispatch, commit }, payload) {
    commit('enableLoading');
    await instance
              .post('/lang/slave/save', payload.savedItem )
              .then(() => dispatch('findAll'));
  },
  async delete({ dispatch, commit }, payload) {
    commit('enableLoading');
    await instance
              .delete(`/lang/slave/remove/${payload.id}`)
              .then(() => dispatch('findAll'));
  }
}

// mutations
const mutations = {
  setMasters(state, payload) {
    state.masters = payload;
  },
  setSlaves(state, payload) {
    state.slaves = payload;
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
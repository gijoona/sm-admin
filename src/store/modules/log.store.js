import instance from './../../plugins/axios';

// initial state
const state = () => ({
  all: [],
  code: '',
  loading: false,
  chartData: []
})

// getters
const getters = {
  getChartData(state) {
    return state.chartData;
  },
  getLoginData(state) {
    return state.chartData
                .filter(data => data.action === 'login')
                .map(data => {
                  const { action, createdAt, type } = data;
                  return { action, createdAt, type };
                });
  }
}

// actions
const actions = {
  async findChart({ commit }, payload) {
    commit('enableLoading');

    console.log(payload);
    await instance
              .get('/logs/findChart')
              .then(res => {
                if (res.data.length > 0) commit('setChartData', res.data);
                commit('disableLoading');
              })
  },
}

// mutations
const mutations = {
  setChartData(state, payload) {
    state.chartData = payload;
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
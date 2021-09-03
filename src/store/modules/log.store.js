import moment from 'moment'
import instance from './../../plugins/axios';

// initial state
const state = () => ({
  all: [],
  code: '',
  loading: false,
  logData: [],
  loginLogs: {}
})

// getters
const getters = {
  getLogData(state) {
    return state.logData;
  },
  getLoginData(state) {
    const data = {
      labels: [],
      values: []
    };
    for(let key in state.loginLogs) {
      data.labels.push(moment(key).format('MM/DD'));
      data.values.push(state.loginLogs[key]);
    }
    return data;
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
                if (res.data.length > 0) commit('setLogData', res.data);

                commit('setLoginLogs');
                commit('disableLoading');
              })
  },
}

// mutations
const mutations = {
  setLogData(state, payload) {
    state.logData = payload;
  },
  setLoginLogs(state) {
    state.loginLogs = {};
    state.logData
                .filter(data => data.action === 'login')
                .forEach(data => {
                  const { createdAt } = data;
                  if (state.loginLogs[createdAt]) state.loginLogs[createdAt]++;
                  else state.loginLogs[createdAt] = 1;
                });
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
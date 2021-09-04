import moment from 'moment'
import instance from './../../plugins/axios';

// initial state
const state = () => ({
  all: [],
  code: '',
  loading: false,
  logData: [],
  loginLogs: {},
  joinLogs: {},
  cartLogs: {}
})

// getters
const getters = {
  getLogData(state) {
    return state.logData;
  },
  // 로그인 데이터
  getLoginData(state) {
    const data = {
      labels: [],
      values: [],
      accs: [],
      avg: 0,
      total: 0
    };
    // 일자별 카운트
    for(let key in state.loginLogs) {
      data.labels.push(moment(key).format('MM/DD'));
      data.values.push(state.loginLogs[key]);
    }
    // 누적 증가현황
    let accNum = 0;
    for(let cnt of data.values) {
      accNum += cnt;
      data.accs.push(accNum);
    }
    // 전체 방문자 수
    if (data.values.length > 0) data.total = data.values.reduce((acc, curr) => acc + curr);
    // 평균 방문자 수
    if (data.total > 0) data.avg = (data.total / data.values.length).toFixed(0);
    return data;
  },
  // 회원가입 데이터
  getJoinData(state) {
    const data = {
      labels: [],
      values: [],
      accs: [],
      total: 0
    };
    // 일자별 카운트
    for(let key in state.joinLogs) {
      data.labels.push(moment(key).format('MM/DD'));
      data.values.push(state.joinLogs[key]);
    }
    // 누적 증가현황
    let accNum = 0;
    for(let cnt of data.values) {
      accNum += cnt;
      data.accs.push(accNum);
    }
    // 전체 수 카운트
    if(data.values.length > 0) data.total = data.values.reduce((acc, curr) => acc + curr);
    return data;
  },
  // 카트추가 제품 데이터
  getCartData(state) {
    const data = {
      labels: [],
      values: [],
      jsonArr: []
    };
    // 제품별 카운트
    for(let key in state.cartLogs) {
      data.labels.push(key);
      data.values.push(state.cartLogs[key]);
      let json = {
        itemCd: key,
        count: state.cartLogs[key]
      }
      data.jsonArr.push(json);
    }
    // count 역순으로 정렬
    data.jsonArr.sort((a, b) => {
      if(a.count > b.count) return -1;
      if(a.count < b.count) return 1;
      return 0;
    })
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
                commit('setJoinLogs');
                commit('setCartLogs');
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
  setJoinLogs(state) {
    state.joinLogs = {};
    state.logData
                .filter(data => data.action === 'join')
                .forEach(data => {
                  const { createdAt } = data;
                  if (state.joinLogs[createdAt]) state.joinLogs[createdAt]++;
                  else state.joinLogs[createdAt] = 1;
                });
  },
  setCartLogs(state) {
    state.cartLogs = {};
    state.logData
                .filter(data => data.action === 'add')
                .forEach(data => {
                  const { keyword } = data;
                  if (state.cartLogs[keyword]) state.cartLogs[keyword]++;
                  else state.cartLogs[keyword] = 1;
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
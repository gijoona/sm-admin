import instance from './../../plugins/axios';

// initial state
const state = () => ({
  username: '',
  password: '',
  userinfo: {},
  isLogin: false
})

// getters
const getters = {
  username(state) {
    return state.username;
  },
  password(state) {
    return state.password;
  },
  userinfo(state) {
    return state.userinfo;
  },
  isLogin(state) {
    return state.isLogin;
  }
}

// actions
const actions = {
  async login({ commit, state }) {
    await instance
            .post('/auth/login', { username: state.username, password: state.password })
            .then(res => {
              commit('loginSuccess', res.data);
            })
            .catch(err => {
              console.error(err);
              commit('setUsername', '');
              commit('setPassword', '');
              alert('로그인 정보를 확인해주세요.');
            })
  },
  logout({commit}) {
    commit('logoutSuccess');
  }
}

// mutations
const mutations = {
  setUsername(state, payload) {
    state.username = payload;
  },
  setPassword(state, payload) {
    state.password = payload;
  },
  loginSuccess(state, payload) {
    sessionStorage.setItem('userinfo', payload.user);
    sessionStorage.setItem('access_token', payload.access_token);
    state.userinfo = payload.user;
    state.isLogin = true;
  },
  logoutSuccess(state) {
    state.userinfo = {};
    state.isLogin = false;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
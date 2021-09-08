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
    // 브라우저 새로고침 시 로그인여부를 유지하기 위해 sessionStorage 활용
    if (!state.isLogin) {
      if (sessionStorage.getItem('isLogin') === 'true') {
        return JSON.parse(sessionStorage.getItem('userinfo'));
      }
    }

    return state.userinfo;
  },
  isLogin(state) {
    // 브라우저 새로고침 시 로그인여부를 유지하기 위해 sessionStorage 활용
    if (!state.isLogin) return sessionStorage.getItem('isLogin');
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
            .catch(() => {
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
    state.userinfo = payload.user;
    state.isLogin = true;
    sessionStorage.setItem('isLogin', state.isLogin);
    sessionStorage.setItem('userinfo', JSON.stringify(payload.user));
    sessionStorage.setItem('access_token', payload.access_token);
  },
  logoutSuccess(state) {
    state.userinfo = {};
    state.isLogin = false;
    sessionStorage.setItem('isLogin', state.isLogin);
    sessionStorage.setItem('userinfo', {});
    sessionStorage.setItem('access_token', '');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
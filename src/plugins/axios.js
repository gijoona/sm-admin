import axios from 'axios';

import store from './../store';

// axios 인스턴스를 생성합니다.
const instance = axios.create({
  // baseURL: 'http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000',
  baseURL: 'http://localhost:5000',
  timeout: 10000
});

/*
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('access_token')}`;
    return config;
  }, 
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/*
  2. 응답 인터셉터
  2개의 콜백 함수를 받습니다.
*/
instance.interceptors.response.use(
  function (response) {
  /*
    http status가 200인 경우 응답 성공 직전 호출.
    .then() 으로 이어집니다.
  */
    return response;
  },

  function (error) {
  /*
    http status가 200이 아닌 경우 응답 에러 직전 호출.
    .catch() 으로 이어집니다.
  */
    if (error.response.status === 401) {
      console.log('Unauthorized');
      if (store.getters['user/isLogin']) {
        alert('세션이 만료되었습니다.');
      } else {
        alert('로그인이 필요합니다.');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
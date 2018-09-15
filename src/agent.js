import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const API_ROOT = process.env.REACT_APP_API_ROOT;

const superagent = superagentPromise(_superagent, global.Promise);

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  req.set('X-Requested-With', 'XMLHttpRequest');
  req.set('Accept', 'application/json');
  req.set('Content-Type', 'application/json');
  if (commonStore.accessToken) {
    req.set('Authorization', `Bearer ${commonStore.accessToken}`);
    req.set('Accept', 'application/json');
    req.set('Content-Type', 'application/json');
  }
};

const requests = {
  notAuthGet: (url, query) =>
    superagent
      .get(`${API_ROOT}${url}`, query)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: async (url, query) => {
    if (!commonStore.accessToken) {
      await commonStore.setRefreshToken();
    }
    return superagent
      .get(`${API_ROOT}${url}`, query)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
  post: async (url, body) => {
    if (!commonStore.accessToken) {
      await commonStore.setRefreshToken();
    }
    return superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
  put: async (url, body) => {
    if (!commonStore.accessToken) {
      await commonStore.setRefreshToken();
    }
    return superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
  patch: async (url, body) => {
    if (!commonStore.accessToken) {
      await commonStore.setRefreshToken();
    }
    return superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
};

const Auth = {
  login: (email, password) =>
    requests.post('/oauth/login', {
      email,
      password,
    }),
  refreshToken: refreshToken => requests.notAuthGet(`/oauth/refresh/${refreshToken}`),
};

const users = {
  getAll: () => requests.get('/api/users'),
};

export default {
  Auth,
  users,
};

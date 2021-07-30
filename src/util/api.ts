import axios from 'axios';
import _ from 'lodash';

const API_HOST = process.env.RUNTIME_API_HOST
  ? process.env.RUNTIME_API_HOST
  : 'http://localhost:5001';
const API_PREFIX = '/api';

// urls without authentication bearer
const whitelistUrls = ['/auth/login'];

/*axios.interceptors.request.use(async config => {
  if (
    !whitelistUrls.includes(config.url ? config.url : '') &&
    SessionStore.isLoggedIn
  ) {
    config.headers = {
      Authorization: `Bearer ${SessionStore.getJwt()}`,
    };
  }
  return config;
});*/

const API = {
  get: (endpoint: string, data?: any) => {
    if (_.isUndefined(data)) {
      return axios.get(API_HOST + API_PREFIX + endpoint);
    } else {
      return axios.get(API_HOST + API_PREFIX + endpoint, data);
    }
  },

  post: (endpoint: string, data: any, header?: any) => {
    return axios.post(API_HOST + API_PREFIX + endpoint, data, header);
  },

  put: (endpoint: string, data: any, header?: any) => {
    return axios.put(API_HOST + API_PREFIX + endpoint, data, header);
  },

  delete: (endpoint: string, header?: any) => {
    return axios.delete(API_HOST + API_PREFIX + endpoint, header);
  },

  patch: (endpoint: string, data: any, header?: any) => {
    return axios.patch(API_HOST + API_PREFIX + endpoint, data, header);
  },
};

export default API;

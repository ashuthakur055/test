import axios from 'axios';
import { getCookie } from './cookies';
const axiosApi = (url, method, data, headers = { 'Content-Type': 'application/json' }, reqOptions = {}) => {
  let accessToken = getCookie('ssfToken');
  let options = {
    url,
    method,
    headers: {
      //'Authorization': 'Bearer ' + accessToken,
      ...headers,
    },
    ...reqOptions,
  };

  if (accessToken && accessToken !== undefined && accessToken !== 'undefined') {
    options.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  if (method && method.toLowerCase() === 'get') {
    options.params = data;
  } else {
    options.data = data;
  }

  return axios(options)
    .then(res => {
      let imageType = res?.headers['content-type'];
      if (imageType?.indexOf('image') !== -1) {
        let buffer = Buffer.from(res.data).toString('base64');
        let url = 'data:' + imageType + ';base64,' + buffer;
        return url;
      }
      return res?.data;
    })
    .catch(err => {
      //throw new Error(':( something went wrong. please contact support');
      return Promise.reject(err?.response?.data);
    });
};

export default axiosApi;

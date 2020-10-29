import axios from 'axios';

export default () => {
  const token = localStorage.getItem('token');
  return axios.create({
    // baseURL: 'http://localhost:5001',
    headers: {
      authorization: token,
    },
  });
};

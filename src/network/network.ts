import axios from 'axios';

const network = axios.create({
  baseURL: 'http://104.251.211.125:8055',
});

export { network };
import axios from 'axios';
import { storage } from '../local-storage/local-storage';

const BASE_URL = 'http://104.251.211.125:8055';

const network = axios.create({
  baseURL: BASE_URL,
});

const networkWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${storage.getAccessToken()}` },
});

export { network, networkWithAuth };

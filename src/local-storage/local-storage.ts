const setAccessToken = (accessToken: string) =>
  localStorage.setItem('access_token', accessToken);
const getAccessToken = () => localStorage.getItem('access_token') || undefined;
const clearAccessToken = () => localStorage.removeItem('access_token');

const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem('refresh_token', refreshToken);
const getRefreshToken = () =>
  localStorage.getItem('refresh_token') || undefined;
const clearRefreshToken = () => localStorage.removeItem('refresh_token');

const storage = {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearRefreshToken,
};

export { storage };

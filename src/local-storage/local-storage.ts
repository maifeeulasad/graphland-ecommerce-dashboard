const setAccessToken = (accessToken: string) =>
  localStorage.setItem('access_token', accessToken);
const getAccessToken = () => localStorage.getItem('access_token') || undefined;

const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem('refresh_token', refreshToken);
const getRefreshToken = () =>
  localStorage.getItem('refresh_token') || undefined;

const storage = {
  setAccessToken, getAccessToken, setRefreshToken, getRefreshToken,
};

export { storage };

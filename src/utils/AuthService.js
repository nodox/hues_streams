import axios from 'axios';
import decode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'access_token';


export const getTokenExpirationDate = (encodedToken) => {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
};


export const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};


export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (value) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, value);
};

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};




export const logout = () => {
  clearAccessToken();
};


export const isLoggedIn = () => {
  let token = getAccessToken();
  // console.log('isLoggedIn', token);
  return !!token;
  // return !!token && !isTokenExpired(token); // !! converts to boolean value (null, undefined) become false
};

export const requireAuth = () => {
  if (!isLoggedIn()) {
    history.push('/login');
  }
};



export const login = () => {
  axios.get('/api/login')
    .then(res => {
      if (res.data.success) {
        console.log('AuthService login: ', res.data);
        return res.data;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};






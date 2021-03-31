import AuthService from './service';

export default function authHeader() {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { authorization: 'Bearer ' + user.token };
    // return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}

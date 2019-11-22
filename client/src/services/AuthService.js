import decode from 'jwt-decode';

export default class AuthService {
  /**
     * checks if the token is expired. It also checks if the token is a valid jwt token
     * @param token
     * @returns {boolean}
     */
    isTokenExpired (token) {
      try {
          const decodedToken = decode(token);
          if (decodedToken.exp < Date.now() / 1000) {
              return true;
          }
      }
      catch (e) {
          return true;
      }
      return false;
  }

  getUsername (token) {
    try {
        const decodedToken = decode(token);
        return decodedToken.sub;
    }
    catch (e) {
        return true;
    }
}

}
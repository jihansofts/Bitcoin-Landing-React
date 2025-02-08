class setToken {
  static setToken(token) {
    localStorage.setItem("token", token);
  }
}
class getToken {
  static getToken() {
    return localStorage.getItem("token");
  }
}
class removeToken {
  static removeToken() {
    localStorage.removeItem("token");
  }
}
export { setToken, getToken, removeToken };

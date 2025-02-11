class setToken {
  static setToken(token) {
    localStorage.setItem("token", token);
  }
}
class setCourseIds {
  static setCourseId(courseId) {
    localStorage.setItem("courseId", courseId);
  }
}
class getCourseId {
  static getCourseId() {
    return localStorage.getItem("courseId");
  }
}
class removeCourseId {
  static removeCourseId() {
    localStorage.removeItem("courseId");
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
export {
  setToken,
  getToken,
  removeToken,
  setCourseIds,
  getCourseId,
  removeCourseId,
};

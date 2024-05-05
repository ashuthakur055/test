
function setCookie(cname, cvalue, expire, path = '/') {
    let date = new Date();
    date.setTime(date.getTime() + expire);
    document.cookie = `${cname}=${cvalue};expires=${date.toUTCString()};path=${path}`;
  }
  
  function getCookie(cname) {
    if (typeof window == "undefined") return undefined;
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        if (c.substring(name.length, c.length) !== "") {
          return c.substring(name.length, c.length);
        } else {
          return undefined;
        }
      }
    }
    return undefined;
  }
  
  function removeCookie(cname, path = "/") {
    document.cookie = cname + "=;expires=" + new Date().toUTCString() + ";path=" + path;
  }
  
  
  module.exports = { setCookie, removeCookie, getCookie };
  
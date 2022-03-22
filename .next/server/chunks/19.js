exports.id = 19;
exports.ids = [19];
exports.modules = {

/***/ 5019:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ot": function() { return /* binding */ getThemeProps; }
/* harmony export */ });
/* unused harmony exports defaultCSSThemeProps, defaultThemeProps */
const defaultCSSThemeProps = {
  colorMode: 'auto',
  // light, dark, auto
  nightScheme: 'dark',
  dayScheme: 'light'
};
const defaultThemeProps = {
  colorMode: 'auto',
  // day, night, auto
  nightScheme: 'dark',
  dayScheme: 'light'
};
const cssColorModeToJs = {
  auto: 'auto',
  light: 'day',
  dark: 'night'
};
const getThemeProps = (req, mode) => {
  var _req$cookies, _cookieValue$dark_the, _cookieValue$light_th;

  let cookieValue = {};
  const defaultProps = mode === 'css' ? defaultCSSThemeProps : defaultThemeProps;

  if ((_req$cookies = req.cookies) !== null && _req$cookies !== void 0 && _req$cookies.color_mode) {
    try {
      cookieValue = JSON.parse(decodeURIComponent(req.cookies.color_mode));
    } catch {// do nothing
    }
  }

  return {
    // the cookie uses primer/css color_mode, sometimes we need to convert that to a primer/components compatible version
    colorMode: (mode === 'css' ? cookieValue.color_mode : cssColorModeToJs[cookieValue.color_mode || '']) || defaultProps.colorMode,
    nightScheme: ((_cookieValue$dark_the = cookieValue.dark_theme) === null || _cookieValue$dark_the === void 0 ? void 0 : _cookieValue$dark_the.name) || defaultProps.nightScheme,
    dayScheme: ((_cookieValue$light_th = cookieValue.light_theme) === null || _cookieValue$light_th === void 0 ? void 0 : _cookieValue$light_th.name) || defaultProps.dayScheme
  };
};

/***/ })

};
;
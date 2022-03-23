(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./components/lib/getThemeProps.tsx":
/*!******************************************!*\
  !*** ./components/lib/getThemeProps.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultCSSThemeProps": () => (/* binding */ defaultCSSThemeProps),
/* harmony export */   "defaultThemeProps": () => (/* binding */ defaultThemeProps),
/* harmony export */   "getThemeProps": () => (/* binding */ getThemeProps)
/* harmony export */ });
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

/***/ }),

/***/ "./javascripts/events.ts":
/*!*******************************!*\
  !*** ./javascripts/events.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserEventsId": () => (/* binding */ getUserEventsId),
/* harmony export */   "EventType": () => (/* binding */ EventType),
/* harmony export */   "sendEvent": () => (/* binding */ sendEvent),
/* harmony export */   "default": () => (/* binding */ initializeEvents)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "js-cookie");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _get_csrf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-csrf */ "./javascripts/get-csrf.ts");
/* harmony import */ var _user_agent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-agent */ "./javascripts/user-agent.ts");
const _excluded = ["type", "version"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable camelcase */




const COOKIE_NAME = '_docs-events';
const startVisitTime = Date.now();
let cookieValue;
let pageEventId;
let maxScrollY = 0;
let pauseScrolling = false;
let sentExit = false;
function getUserEventsId() {
  if (cookieValue) return cookieValue;
  cookieValue = js_cookie__WEBPACK_IMPORTED_MODULE_1___default().get(COOKIE_NAME);
  if (cookieValue) return cookieValue;
  cookieValue = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
  js_cookie__WEBPACK_IMPORTED_MODULE_1___default().set(COOKIE_NAME, cookieValue, {
    secure: true,
    sameSite: 'strict',
    expires: 365
  });
  return cookieValue;
}
let EventType;

(function (EventType) {
  EventType["page"] = "page";
  EventType["exit"] = "exit";
  EventType["link"] = "link";
  EventType["search"] = "search";
  EventType["navigate"] = "navigate";
  EventType["survey"] = "survey";
  EventType["experiment"] = "experiment";
  EventType["preference"] = "preference";
  EventType["clipboard"] = "clipboard";
  EventType["print"] = "print";
})(EventType || (EventType = {}));

function sendEvent(_ref) {
  var _navigator;

  let {
    type,
    version = '1.0.0'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const body = _objectSpread({
    _csrf: (0,_get_csrf__WEBPACK_IMPORTED_MODULE_2__.default)(),
    type,
    context: _objectSpread(_objectSpread({
      // Primitives
      event_id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),
      user: getUserEventsId(),
      version,
      created: new Date().toISOString(),
      page_event_id: pageEventId,
      // Content information
      path: location.pathname,
      hostname: location.hostname,
      referrer: document.referrer,
      search: location.search,
      href: location.href,
      site_language: location.pathname.split('/')[1]
    }, (0,_user_agent__WEBPACK_IMPORTED_MODULE_3__.default)()), {}, {
      viewport_width: document.documentElement.clientWidth,
      viewport_height: document.documentElement.clientHeight,
      // Location information
      timezone: new Date().getTimezoneOffset() / -60,
      user_language: navigator.language,
      // Preference information
      application_preference: js_cookie__WEBPACK_IMPORTED_MODULE_1___default().get('toolPreferred')
    })
  }, props); // Only send the beacon if the feature is not disabled in the user's browser


  if ((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(body)], {
      type: 'application/json'
    });
    navigator.sendBeacon('/events', blob);
  }

  return body;
}

function getPerformance() {
  var _performance, _performance$getEntri, _performance2, _performance2$getEntr;

  const paint = (_performance = performance) === null || _performance === void 0 ? void 0 : (_performance$getEntri = _performance.getEntriesByType('paint')) === null || _performance$getEntri === void 0 ? void 0 : _performance$getEntri.find(({
    name
  }) => name === 'first-contentful-paint');
  const nav = (_performance2 = performance) === null || _performance2 === void 0 ? void 0 : (_performance2$getEntr = _performance2.getEntriesByType('navigation')) === null || _performance2$getEntr === void 0 ? void 0 : _performance2$getEntr[0];
  return {
    firstContentfulPaint: paint ? paint.startTime / 1000 : undefined,
    domInteractive: nav ? nav.domInteractive / 1000 : undefined,
    domComplete: nav ? nav.domComplete / 1000 : undefined,
    render: nav ? (nav.responseEnd - nav.requestStart) / 1000 : undefined
  };
}

function trackScroll() {
  // Throttle the calculations to no more than five per second
  if (pauseScrolling) return;
  pauseScrolling = true;
  setTimeout(() => {
    pauseScrolling = false;
  }, 200); // Update maximum scroll position reached

  const scrollPixels = window.scrollY + window.innerHeight;
  const scrollPosition = scrollPixels / document.documentElement.scrollHeight;
  if (scrollPosition > maxScrollY) maxScrollY = scrollPosition;
}

function sendExit() {
  if (sentExit) return;
  if (document.visibilityState !== 'hidden') return;
  sentExit = true;
  const {
    render,
    firstContentfulPaint,
    domInteractive,
    domComplete
  } = getPerformance();
  return sendEvent({
    type: EventType.exit,
    exit_render_duration: render,
    exit_first_paint: firstContentfulPaint,
    exit_dom_interactive: domInteractive,
    exit_dom_complete: domComplete,
    exit_visit_duration: (Date.now() - startVisitTime) / 1000,
    exit_scroll_length: maxScrollY
  });
}

function initPageEvent() {
  var _pageEvent$context;

  const pageEvent = sendEvent({
    type: EventType.page
  });
  pageEventId = pageEvent === null || pageEvent === void 0 ? void 0 : (_pageEvent$context = pageEvent.context) === null || _pageEvent$context === void 0 ? void 0 : _pageEvent$context.event_id;
}

function initClipboardEvent() {
  ;
  ['copy', 'cut', 'paste'].forEach(verb => {
    document.documentElement.addEventListener(verb, () => {
      sendEvent({
        type: EventType.clipboard,
        clipboard_operation: verb
      });
    });
  });
}

function initLinkEvent() {
  document.documentElement.addEventListener('click', evt => {
    const target = evt.target;
    const link = target.closest('a[href^="http"]');
    if (!link) return;
    sendEvent({
      type: EventType.link,
      link_url: link.href
    });
  });
}

function initExitEvent() {
  window.addEventListener('scroll', trackScroll);
  document.addEventListener('visibilitychange', sendExit);
}

function initNavigateEvent() {
  var _document$querySelect;

  if (!document.querySelector('.sidebar-products')) return;
  Array.from(document.querySelectorAll('.sidebar-products details')).forEach(details => details.addEventListener('toggle', evt => {
    var _target$querySelector;

    const target = evt.target;
    sendEvent({
      type: EventType.navigate,
      navigate_label: `details ${target.open ? 'open' : 'close'}: ${target === null || target === void 0 ? void 0 : (_target$querySelector = target.querySelector('summary')) === null || _target$querySelector === void 0 ? void 0 : _target$querySelector.innerText}`
    });
  }));
  (_document$querySelect = document.querySelector('.sidebar-products')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', evt => {
    const target = evt.target;
    const link = target.closest('a');
    if (!link) return;
    sendEvent({
      type: EventType.navigate,
      navigate_label: `link: ${link.href}`
    });
  });
}

function initializeEvents() {
  initPageEvent(); // must come first

  initExitEvent();
  initLinkEvent();
  initClipboardEvent();
  initNavigateEvent(); // print event in ./print.js
  // survey event in ./survey.js
  // experiment event in ./experiment.js
  // search event in ./search.js
  // redirect event in middleware/record-redirect.js
  // preference event in ./display-tool-specific-content.js
}

/***/ }),

/***/ "./javascripts/experiment.ts":
/*!***********************************!*\
  !*** ./javascripts/experiment.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bucket": () => (/* binding */ bucket),
/* harmony export */   "sendSuccess": () => (/* binding */ sendSuccess),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var imurmurhash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! imurmurhash */ "imurmurhash");
/* harmony import */ var imurmurhash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(imurmurhash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./javascripts/events.ts");


const TREATMENT = 'TREATMENT';
const CONTROL = 'CONTROL';
function bucket(test) {
  const id = (0,_events__WEBPACK_IMPORTED_MODULE_1__.getUserEventsId)();
  const hash = imurmurhash__WEBPACK_IMPORTED_MODULE_0___default()(test).hash(id).result();
  return hash % 2 ? TREATMENT : CONTROL;
}
function sendSuccess(test) {
  return (0,_events__WEBPACK_IMPORTED_MODULE_1__.sendEvent)({
    type: _events__WEBPACK_IMPORTED_MODULE_1__.EventType.experiment,
    experiment_name: test,
    experiment_variation: bucket(test).toLowerCase(),
    experiment_success: true
  });
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {// *** Example test code ***
  // const testName = '$test-name$'
  // const xbucket = bucket(testName)
  // const x = document.querySelector(...)
  // x.addEventListener('click', () => { sendSuccess(testName) })
  // if (xbucket === TREATMENT) applyTreatment(x)
}

/***/ }),

/***/ "./javascripts/get-csrf.ts":
/*!*********************************!*\
  !*** ./javascripts/get-csrf.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCsrf)
/* harmony export */ });
function getCsrf() {
  const csrfEl = document.querySelector('meta[name="csrf-token"]');
  if (!csrfEl) return '';
  return csrfEl.getAttribute('content');
}

/***/ }),

/***/ "./javascripts/set-next-env.ts":
/*!*************************************!*\
  !*** ./javascripts/set-next-env.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setNextEnv)
/* harmony export */ });
function setNextEnv() {
  // @ts-ignore
  window.IS_NEXTJS_PAGE = !!document.querySelector('#__next');
}

/***/ }),

/***/ "./javascripts/user-agent.ts":
/*!***********************************!*\
  !*** ./javascripts/user-agent.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseUserAgent)
/* harmony export */ });
// A tiny user agent checking RegExp for analytics purposes
// The order matters with these
const OS_REGEXPS = [/(iphone os|ipad os) ([^);]+)/i, /(mac) os x ([^);]+)/i, /(windows) ([^);]+)/i, /(android) ([^);]+)/i, /(cros) ([^);]+)/i, /(linux) ([^);]+)/i]; // The order matters with these

const BROWSER_REGEXPS = [/(firefox)\/([^\s)]+)/i, /(edge)\/([^\s)]+)/i, /(chrome)\/([^\s)]+)/i, /(safari)\/([^\s)]+)/i, /ms(ie)\/([^\s)]+)/i];
function parseUserAgent(ua = navigator.userAgent) {
  ua = ua.toLowerCase();
  const osRe = OS_REGEXPS.find(re => re.test(ua));
  let [, os = 'other', os_version = '0'] = osRe && ua.match(osRe) || [];
  if (os === 'iphone os' || os === 'ipad os') os = 'ios';
  const browserRe = BROWSER_REGEXPS.find(re => re.test(ua));
  const [, browser = 'other', browser_version = '0'] = browserRe && ua.match(browserRe) || [];
  return {
    os,
    os_version,
    browser,
    browser_version
  };
}

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "AppInitialProps", ({
  enumerable: true,
  get: function () {
    return _utils.AppInitialProps;
  }
}));
Object.defineProperty(exports, "NextWebVitalsMetric", ({
  enumerable: true,
  get: function () {
    return _utils.NextWebVitalsMetric;
  }
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../shared/lib/utils */ "../shared/lib/utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _appGetInitialProps() {
  _appGetInitialProps =
  /**
  * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
  * This allows for keeping state between navigation, custom error handling, injecting additional data.
  */
  _asyncToGenerator(function* ({
    Component,
    ctx
  }) {
    const pageProps = yield (0, _utils).loadGetInitialProps(Component, ctx);
    return {
      pageProps
    };
  });
  return _appGetInitialProps.apply(this, arguments);
}

function appGetInitialProps(_) {
  return _appGetInitialProps.apply(this, arguments);
}

class App extends _react.default.Component {
  render() {
    const {
      Component,
      pageProps
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps));
  }

}

App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
exports.default = App;

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _primer_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @primer/components */ "@primer/components");
/* harmony import */ var _primer_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_primer_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_lib_getThemeProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/lib/getThemeProps */ "./components/lib/getThemeProps.tsx");
/* harmony import */ var _stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stylesheets/index.scss */ "./stylesheets/index.scss");
/* harmony import */ var _stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var javascripts_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! javascripts/events */ "./javascripts/events.ts");
/* harmony import */ var javascripts_experiment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! javascripts/experiment */ "./javascripts/experiment.ts");
/* harmony import */ var javascripts_set_next_env__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! javascripts/set-next-env */ "./javascripts/set-next-env.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "C:\\Users\\michi\\3D Objects\\baydig-wiki\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const MyApp = ({
  Component,
  pageProps,
  csrfToken,
  themeProps
}) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,javascripts_events__WEBPACK_IMPORTED_MODULE_6__.default)();
    (0,javascripts_experiment__WEBPACK_IMPORTED_MODULE_7__.default)();
    (0,javascripts_set_next_env__WEBPACK_IMPORTED_MODULE_8__.default)();
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("meta", {
        charSet: "utf-8"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("title", {
        children: "BayDiG Wiki"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("link", {
        rel: "alternate icon",
        type: "image/png",
        href: "/assets/images/site/favicon.png"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/images/site/favicon.svg"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("meta", {
        name: "google-site-verification",
        content: "OgdQc0GZfjDI52wDv1bkMT-SLpBUo_h5nn9mI9L22xQ"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("meta", {
        name: "google-site-verification",
        content: "c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("meta", {
        name: "csrf-token",
        content: csrfToken
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_primer_components__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(SetTheme, {
        themeProps: themeProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

MyApp.getInitialProps = async appContext => {
  var _req$csrfToken;

  const {
    ctx
  } = appContext; // calls page's `getInitialProps` and fills `appProps.pageProps`

  const appProps = await next_app__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(appContext);
  const req = ctx.req;
  return _objectSpread(_objectSpread({}, appProps), {}, {
    themeProps: (0,components_lib_getThemeProps__WEBPACK_IMPORTED_MODULE_4__.getThemeProps)(req),
    csrfToken: (req === null || req === void 0 ? void 0 : (_req$csrfToken = req.csrfToken) === null || _req$csrfToken === void 0 ? void 0 : _req$csrfToken.call(req)) || ''
  });
};

const SetTheme = ({
  themeProps
}) => {
  // Cause primer/components to re-evaluate the 'auto' color mode on client side render
  const {
    setColorMode
  } = (0,_primer_components__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTimeout(() => {
      setColorMode(themeProps.colorMode);
    });
  }, []);
  return null;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

/***/ }),

/***/ "./stylesheets/index.scss":
/*!********************************!*\
  !*** ./stylesheets/index.scss ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@primer/components":
/*!*************************************!*\
  !*** external "@primer/components" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@primer/components");

/***/ }),

/***/ "imurmurhash":
/*!******************************!*\
  !*** external "imurmurhash" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("imurmurhash");

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("js-cookie");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLENBQUMsTUFBTTtBQUNkeEgsSUFBQUEsVUFBVSxDQUFDLE1BQU07QUFDZm1JLE1BQUFBLFlBQVksQ0FBQ0osVUFBVSxDQUFDNU4sU0FBWixDQUFaO0FBQ0QsS0FGUyxDQUFWO0FBR0QsR0FKUSxFQUlOLEVBSk0sQ0FBVDtBQUtBLFNBQU8sSUFBUDtBQUNELENBVEQ7O0FBV0EsaUVBQWUwTixLQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUV0RUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vY29tcG9uZW50cy9saWIvZ2V0VGhlbWVQcm9wcy50c3giLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vamF2YXNjcmlwdHMvZXZlbnRzLnRzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL2phdmFzY3JpcHRzL2V4cGVyaW1lbnQudHMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vamF2YXNjcmlwdHMvZ2V0LWNzcmYudHMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vamF2YXNjcmlwdHMvc2V0LW5leHQtZW52LnRzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL2phdmFzY3JpcHRzL3VzZXItYWdlbnQudHMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9wYWdlcy9fYXBwLmpzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL3N0eWxlc2hlZXRzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tL2V4dGVybmFsIFwiQHByaW1lci9jb21wb25lbnRzXCIiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tL2V4dGVybmFsIFwiaW11cm11cmhhc2hcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJqcy1jb29raWVcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tL2V4dGVybmFsIFwidXVpZFwiIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L3BhZ2VzL19hcHAnKVxuIiwiZXhwb3J0IGNvbnN0IGRlZmF1bHRDU1NUaGVtZVByb3BzID0ge1xyXG4gIGNvbG9yTW9kZTogJ2F1dG8nLCAvLyBsaWdodCwgZGFyaywgYXV0b1xyXG4gIG5pZ2h0U2NoZW1lOiAnZGFyaycsXHJcbiAgZGF5U2NoZW1lOiAnbGlnaHQnLFxyXG59XHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0VGhlbWVQcm9wcyA9IHtcclxuICBjb2xvck1vZGU6ICdhdXRvJywgLy8gZGF5LCBuaWdodCwgYXV0b1xyXG4gIG5pZ2h0U2NoZW1lOiAnZGFyaycsXHJcbiAgZGF5U2NoZW1lOiAnbGlnaHQnLFxyXG59XHJcblxyXG5jb25zdCBjc3NDb2xvck1vZGVUb0pzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIGF1dG86ICdhdXRvJyxcclxuICBsaWdodDogJ2RheScsXHJcbiAgZGFyazogJ25pZ2h0JyxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFRoZW1lUHJvcHMgPSAocmVxOiBhbnksIG1vZGU/OiAnY3NzJykgPT4ge1xyXG4gIGxldCBjb29raWVWYWx1ZToge1xyXG4gICAgY29sb3JfbW9kZT86ICdhdXRvJyB8ICdsaWdodCcgfCAnZGFyaydcclxuICAgIGRhcmtfdGhlbWU/OiB7IG5hbWU6IHN0cmluZyB9XHJcbiAgICBsaWdodF90aGVtZT86IHsgbmFtZTogc3RyaW5nIH1cclxuICB9ID0ge31cclxuICBjb25zdCBkZWZhdWx0UHJvcHMgPSBtb2RlID09PSAnY3NzJyA/IGRlZmF1bHRDU1NUaGVtZVByb3BzIDogZGVmYXVsdFRoZW1lUHJvcHNcclxuXHJcbiAgaWYgKHJlcS5jb29raWVzPy5jb2xvcl9tb2RlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb29raWVWYWx1ZSA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHJlcS5jb29raWVzLmNvbG9yX21vZGUpKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAvLyB0aGUgY29va2llIHVzZXMgcHJpbWVyL2NzcyBjb2xvcl9tb2RlLCBzb21ldGltZXMgd2UgbmVlZCB0byBjb252ZXJ0IHRoYXQgdG8gYSBwcmltZXIvY29tcG9uZW50cyBjb21wYXRpYmxlIHZlcnNpb25cclxuICAgIGNvbG9yTW9kZTpcclxuICAgICAgKG1vZGUgPT09ICdjc3MnID8gY29va2llVmFsdWUuY29sb3JfbW9kZSA6IGNzc0NvbG9yTW9kZVRvSnNbY29va2llVmFsdWUuY29sb3JfbW9kZSB8fCAnJ10pIHx8XHJcbiAgICAgIGRlZmF1bHRQcm9wcy5jb2xvck1vZGUsXHJcbiAgICBuaWdodFNjaGVtZTogY29va2llVmFsdWUuZGFya190aGVtZT8ubmFtZSB8fCBkZWZhdWx0UHJvcHMubmlnaHRTY2hlbWUsXHJcbiAgICBkYXlTY2hlbWU6IGNvb2tpZVZhbHVlLmxpZ2h0X3RoZW1lPy5uYW1lIHx8IGRlZmF1bHRQcm9wcy5kYXlTY2hlbWUsXHJcbiAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xyXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xyXG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnXHJcbmltcG9ydCBnZXRDc3JmIGZyb20gJy4vZ2V0LWNzcmYnXHJcbmltcG9ydCBwYXJzZVVzZXJBZ2VudCBmcm9tICcuL3VzZXItYWdlbnQnXHJcblxyXG5jb25zdCBDT09LSUVfTkFNRSA9ICdfZG9jcy1ldmVudHMnXHJcblxyXG5jb25zdCBzdGFydFZpc2l0VGltZSA9IERhdGUubm93KClcclxuXHJcbmxldCBjb29raWVWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbmxldCBwYWdlRXZlbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbmxldCBtYXhTY3JvbGxZID0gMFxyXG5sZXQgcGF1c2VTY3JvbGxpbmcgPSBmYWxzZVxyXG5sZXQgc2VudEV4aXQgPSBmYWxzZVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJFdmVudHNJZCgpIHtcclxuICBpZiAoY29va2llVmFsdWUpIHJldHVybiBjb29raWVWYWx1ZVxyXG4gIGNvb2tpZVZhbHVlID0gQ29va2llcy5nZXQoQ09PS0lFX05BTUUpXHJcbiAgaWYgKGNvb2tpZVZhbHVlKSByZXR1cm4gY29va2llVmFsdWVcclxuICBjb29raWVWYWx1ZSA9IHV1aWR2NCgpXHJcbiAgQ29va2llcy5zZXQoQ09PS0lFX05BTUUsIGNvb2tpZVZhbHVlLCB7XHJcbiAgICBzZWN1cmU6IHRydWUsXHJcbiAgICBzYW1lU2l0ZTogJ3N0cmljdCcsXHJcbiAgICBleHBpcmVzOiAzNjUsXHJcbiAgfSlcclxuICByZXR1cm4gY29va2llVmFsdWVcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRXZlbnRUeXBlIHtcclxuICBwYWdlID0gJ3BhZ2UnLFxyXG4gIGV4aXQgPSAnZXhpdCcsXHJcbiAgbGluayA9ICdsaW5rJyxcclxuICBzZWFyY2ggPSAnc2VhcmNoJyxcclxuICBuYXZpZ2F0ZSA9ICduYXZpZ2F0ZScsXHJcbiAgc3VydmV5ID0gJ3N1cnZleScsXHJcbiAgZXhwZXJpbWVudCA9ICdleHBlcmltZW50JyxcclxuICBwcmVmZXJlbmNlID0gJ3ByZWZlcmVuY2UnLFxyXG4gIGNsaXBib2FyZCA9ICdjbGlwYm9hcmQnLFxyXG4gIHByaW50ID0gJ3ByaW50JyxcclxufVxyXG5cclxudHlwZSBTZW5kRXZlbnRQcm9wcyA9IHtcclxuICB0eXBlOiBFdmVudFR5cGVcclxuICB2ZXJzaW9uPzogc3RyaW5nXHJcbiAgZXhpdF9yZW5kZXJfZHVyYXRpb24/OiBudW1iZXJcclxuICBleGl0X2ZpcnN0X3BhaW50PzogbnVtYmVyXHJcbiAgZXhpdF9kb21faW50ZXJhY3RpdmU/OiBudW1iZXJcclxuICBleGl0X2RvbV9jb21wbGV0ZT86IG51bWJlclxyXG4gIGV4aXRfdmlzaXRfZHVyYXRpb24/OiBudW1iZXJcclxuICBleGl0X3Njcm9sbF9sZW5ndGg/OiBudW1iZXJcclxuICBsaW5rX3VybD86IHN0cmluZ1xyXG4gIHNlYXJjaF9xdWVyeT86IHN0cmluZ1xyXG4gIHNlYXJjaF9jb250ZXh0Pzogc3RyaW5nXHJcbiAgbmF2aWdhdGVfbGFiZWw/OiBzdHJpbmdcclxuICBzdXJ2ZXlfdG9rZW4/OiBzdHJpbmcgLy8gSG9uZXlwb3QsIGRvZXNuJ3QgZXhpc3QgaW4gc2NoZW1hXHJcbiAgc3VydmV5X3ZvdGU/OiBib29sZWFuXHJcbiAgc3VydmV5X2NvbW1lbnQ/OiBzdHJpbmdcclxuICBzdXJ2ZXlfZW1haWw/OiBzdHJpbmdcclxuICBleHBlcmltZW50X25hbWU/OiBzdHJpbmdcclxuICBleHBlcmltZW50X3ZhcmlhdGlvbj86IHN0cmluZ1xyXG4gIGV4cGVyaW1lbnRfc3VjY2Vzcz86IGJvb2xlYW5cclxuICBjbGlwYm9hcmRfb3BlcmF0aW9uPzogc3RyaW5nXHJcbiAgcHJlZmVyZW5jZV9uYW1lPzogc3RyaW5nXHJcbiAgcHJlZmVyZW5jZV92YWx1ZT86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VuZEV2ZW50KHsgdHlwZSwgdmVyc2lvbiA9ICcxLjAuMCcsIC4uLnByb3BzIH06IFNlbmRFdmVudFByb3BzKSB7XHJcbiAgY29uc3QgYm9keSA9IHtcclxuICAgIF9jc3JmOiBnZXRDc3JmKCksXHJcblxyXG4gICAgdHlwZSxcclxuXHJcbiAgICBjb250ZXh0OiB7XHJcbiAgICAgIC8vIFByaW1pdGl2ZXNcclxuICAgICAgZXZlbnRfaWQ6IHV1aWR2NCgpLFxyXG4gICAgICB1c2VyOiBnZXRVc2VyRXZlbnRzSWQoKSxcclxuICAgICAgdmVyc2lvbixcclxuICAgICAgY3JlYXRlZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICBwYWdlX2V2ZW50X2lkOiBwYWdlRXZlbnRJZCxcclxuXHJcbiAgICAgIC8vIENvbnRlbnQgaW5mb3JtYXRpb25cclxuICAgICAgcGF0aDogbG9jYXRpb24ucGF0aG5hbWUsXHJcbiAgICAgIGhvc3RuYW1lOiBsb2NhdGlvbi5ob3N0bmFtZSxcclxuICAgICAgcmVmZXJyZXI6IGRvY3VtZW50LnJlZmVycmVyLFxyXG4gICAgICBzZWFyY2g6IGxvY2F0aW9uLnNlYXJjaCxcclxuICAgICAgaHJlZjogbG9jYXRpb24uaHJlZixcclxuICAgICAgc2l0ZV9sYW5ndWFnZTogbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsxXSxcclxuXHJcbiAgICAgIC8vIERldmljZSBpbmZvcm1hdGlvblxyXG4gICAgICAvLyBvcywgb3NfdmVyc2lvbiwgYnJvd3NlciwgYnJvd3Nlcl92ZXJzaW9uOlxyXG4gICAgICAuLi5wYXJzZVVzZXJBZ2VudCgpLFxyXG4gICAgICB2aWV3cG9ydF93aWR0aDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxyXG4gICAgICB2aWV3cG9ydF9oZWlnaHQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXHJcblxyXG4gICAgICAvLyBMb2NhdGlvbiBpbmZvcm1hdGlvblxyXG4gICAgICB0aW1lem9uZTogbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpIC8gLTYwLFxyXG4gICAgICB1c2VyX2xhbmd1YWdlOiBuYXZpZ2F0b3IubGFuZ3VhZ2UsXHJcblxyXG4gICAgICAvLyBQcmVmZXJlbmNlIGluZm9ybWF0aW9uXHJcbiAgICAgIGFwcGxpY2F0aW9uX3ByZWZlcmVuY2U6IENvb2tpZXMuZ2V0KCd0b29sUHJlZmVycmVkJyksXHJcbiAgICB9LFxyXG5cclxuICAgIC4uLnByb3BzLFxyXG4gIH1cclxuXHJcbiAgLy8gT25seSBzZW5kIHRoZSBiZWFjb24gaWYgdGhlIGZlYXR1cmUgaXMgbm90IGRpc2FibGVkIGluIHRoZSB1c2VyJ3MgYnJvd3NlclxyXG4gIGlmIChuYXZpZ2F0b3I/LnNlbmRCZWFjb24pIHtcclxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KVxyXG4gICAgbmF2aWdhdG9yLnNlbmRCZWFjb24oJy9ldmVudHMnLCBibG9iKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJvZHlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGVyZm9ybWFuY2UoKSB7XHJcbiAgY29uc3QgcGFpbnQgPSBwZXJmb3JtYW5jZVxyXG4gICAgPy5nZXRFbnRyaWVzQnlUeXBlKCdwYWludCcpXHJcbiAgICA/LmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09PSAnZmlyc3QtY29udGVudGZ1bC1wYWludCcpXHJcbiAgY29uc3QgbmF2ID0gcGVyZm9ybWFuY2U/LmdldEVudHJpZXNCeVR5cGUoJ25hdmlnYXRpb24nKT8uWzBdIGFzXHJcbiAgICB8IFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZ1xyXG4gICAgfCB1bmRlZmluZWRcclxuICByZXR1cm4ge1xyXG4gICAgZmlyc3RDb250ZW50ZnVsUGFpbnQ6IHBhaW50ID8gcGFpbnQuc3RhcnRUaW1lIC8gMTAwMCA6IHVuZGVmaW5lZCxcclxuICAgIGRvbUludGVyYWN0aXZlOiBuYXYgPyBuYXYuZG9tSW50ZXJhY3RpdmUgLyAxMDAwIDogdW5kZWZpbmVkLFxyXG4gICAgZG9tQ29tcGxldGU6IG5hdiA/IG5hdi5kb21Db21wbGV0ZSAvIDEwMDAgOiB1bmRlZmluZWQsXHJcbiAgICByZW5kZXI6IG5hdiA/IChuYXYucmVzcG9uc2VFbmQgLSBuYXYucmVxdWVzdFN0YXJ0KSAvIDEwMDAgOiB1bmRlZmluZWQsXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0cmFja1Njcm9sbCgpIHtcclxuICAvLyBUaHJvdHRsZSB0aGUgY2FsY3VsYXRpb25zIHRvIG5vIG1vcmUgdGhhbiBmaXZlIHBlciBzZWNvbmRcclxuICBpZiAocGF1c2VTY3JvbGxpbmcpIHJldHVyblxyXG4gIHBhdXNlU2Nyb2xsaW5nID0gdHJ1ZVxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgcGF1c2VTY3JvbGxpbmcgPSBmYWxzZVxyXG4gIH0sIDIwMClcclxuXHJcbiAgLy8gVXBkYXRlIG1heGltdW0gc2Nyb2xsIHBvc2l0aW9uIHJlYWNoZWRcclxuICBjb25zdCBzY3JvbGxQaXhlbHMgPSB3aW5kb3cuc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodFxyXG4gIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gc2Nyb2xsUGl4ZWxzIC8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodFxyXG4gIGlmIChzY3JvbGxQb3NpdGlvbiA+IG1heFNjcm9sbFkpIG1heFNjcm9sbFkgPSBzY3JvbGxQb3NpdGlvblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kRXhpdCgpIHtcclxuICBpZiAoc2VudEV4aXQpIHJldHVyblxyXG4gIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgIT09ICdoaWRkZW4nKSByZXR1cm5cclxuICBzZW50RXhpdCA9IHRydWVcclxuICBjb25zdCB7IHJlbmRlciwgZmlyc3RDb250ZW50ZnVsUGFpbnQsIGRvbUludGVyYWN0aXZlLCBkb21Db21wbGV0ZSB9ID0gZ2V0UGVyZm9ybWFuY2UoKVxyXG4gIHJldHVybiBzZW5kRXZlbnQoe1xyXG4gICAgdHlwZTogRXZlbnRUeXBlLmV4aXQsXHJcbiAgICBleGl0X3JlbmRlcl9kdXJhdGlvbjogcmVuZGVyLFxyXG4gICAgZXhpdF9maXJzdF9wYWludDogZmlyc3RDb250ZW50ZnVsUGFpbnQsXHJcbiAgICBleGl0X2RvbV9pbnRlcmFjdGl2ZTogZG9tSW50ZXJhY3RpdmUsXHJcbiAgICBleGl0X2RvbV9jb21wbGV0ZTogZG9tQ29tcGxldGUsXHJcbiAgICBleGl0X3Zpc2l0X2R1cmF0aW9uOiAoRGF0ZS5ub3coKSAtIHN0YXJ0VmlzaXRUaW1lKSAvIDEwMDAsXHJcbiAgICBleGl0X3Njcm9sbF9sZW5ndGg6IG1heFNjcm9sbFksXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBhZ2VFdmVudCgpIHtcclxuICBjb25zdCBwYWdlRXZlbnQgPSBzZW5kRXZlbnQoeyB0eXBlOiBFdmVudFR5cGUucGFnZSB9KVxyXG4gIHBhZ2VFdmVudElkID0gcGFnZUV2ZW50Py5jb250ZXh0Py5ldmVudF9pZFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2xpcGJvYXJkRXZlbnQoKSB7XHJcbiAgO1snY29weScsICdjdXQnLCAncGFzdGUnXS5mb3JFYWNoKCh2ZXJiKSA9PiB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih2ZXJiLCAoKSA9PiB7XHJcbiAgICAgIHNlbmRFdmVudCh7IHR5cGU6IEV2ZW50VHlwZS5jbGlwYm9hcmQsIGNsaXBib2FyZF9vcGVyYXRpb246IHZlcmIgfSlcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdExpbmtFdmVudCgpIHtcclxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50XHJcbiAgICBjb25zdCBsaW5rID0gdGFyZ2V0LmNsb3Nlc3QoJ2FbaHJlZl49XCJodHRwXCJdJykgYXMgSFRNTEFuY2hvckVsZW1lbnRcclxuICAgIGlmICghbGluaykgcmV0dXJuXHJcbiAgICBzZW5kRXZlbnQoe1xyXG4gICAgICB0eXBlOiBFdmVudFR5cGUubGluayxcclxuICAgICAgbGlua191cmw6IGxpbmsuaHJlZixcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEV4aXRFdmVudCgpIHtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIHNlbmRFeGl0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0TmF2aWdhdGVFdmVudCgpIHtcclxuICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLXByb2R1Y3RzJykpIHJldHVyblxyXG5cclxuICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyLXByb2R1Y3RzIGRldGFpbHMnKSkuZm9yRWFjaCgoZGV0YWlscykgPT5cclxuICAgIGRldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcigndG9nZ2xlJywgKGV2dCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxEZXRhaWxzRWxlbWVudFxyXG4gICAgICBzZW5kRXZlbnQoe1xyXG4gICAgICAgIHR5cGU6IEV2ZW50VHlwZS5uYXZpZ2F0ZSxcclxuICAgICAgICBuYXZpZ2F0ZV9sYWJlbDogYGRldGFpbHMgJHt0YXJnZXQub3BlbiA/ICdvcGVuJyA6ICdjbG9zZSd9OiAke1xyXG4gICAgICAgICAgdGFyZ2V0Py5xdWVyeVNlbGVjdG9yKCdzdW1tYXJ5Jyk/LmlubmVyVGV4dFxyXG4gICAgICAgIH1gLFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICApXHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLXByb2R1Y3RzJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudFxyXG4gICAgY29uc3QgbGluayA9IHRhcmdldC5jbG9zZXN0KCdhJykgYXMgSFRNTEFuY2hvckVsZW1lbnRcclxuICAgIGlmICghbGluaykgcmV0dXJuXHJcbiAgICBzZW5kRXZlbnQoe1xyXG4gICAgICB0eXBlOiBFdmVudFR5cGUubmF2aWdhdGUsXHJcbiAgICAgIG5hdmlnYXRlX2xhYmVsOiBgbGluazogJHtsaW5rLmhyZWZ9YCxcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZUV2ZW50cygpIHtcclxuICBpbml0UGFnZUV2ZW50KCkgLy8gbXVzdCBjb21lIGZpcnN0XHJcbiAgaW5pdEV4aXRFdmVudCgpXHJcbiAgaW5pdExpbmtFdmVudCgpXHJcbiAgaW5pdENsaXBib2FyZEV2ZW50KClcclxuICBpbml0TmF2aWdhdGVFdmVudCgpXHJcbiAgLy8gcHJpbnQgZXZlbnQgaW4gLi9wcmludC5qc1xyXG4gIC8vIHN1cnZleSBldmVudCBpbiAuL3N1cnZleS5qc1xyXG4gIC8vIGV4cGVyaW1lbnQgZXZlbnQgaW4gLi9leHBlcmltZW50LmpzXHJcbiAgLy8gc2VhcmNoIGV2ZW50IGluIC4vc2VhcmNoLmpzXHJcbiAgLy8gcmVkaXJlY3QgZXZlbnQgaW4gbWlkZGxld2FyZS9yZWNvcmQtcmVkaXJlY3QuanNcclxuICAvLyBwcmVmZXJlbmNlIGV2ZW50IGluIC4vZGlzcGxheS10b29sLXNwZWNpZmljLWNvbnRlbnQuanNcclxufVxyXG4iLCJpbXBvcnQgbXVybXVyIGZyb20gJ2ltdXJtdXJoYXNoJ1xyXG5pbXBvcnQgeyBnZXRVc2VyRXZlbnRzSWQsIHNlbmRFdmVudCwgRXZlbnRUeXBlIH0gZnJvbSAnLi9ldmVudHMnXHJcblxyXG5jb25zdCBUUkVBVE1FTlQgPSAnVFJFQVRNRU5UJ1xyXG5jb25zdCBDT05UUk9MID0gJ0NPTlRST0wnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVja2V0KHRlc3Q6IHN0cmluZykge1xyXG4gIGNvbnN0IGlkID0gZ2V0VXNlckV2ZW50c0lkKClcclxuICBjb25zdCBoYXNoID0gbXVybXVyKHRlc3QpLmhhc2goaWQpLnJlc3VsdCgpXHJcbiAgcmV0dXJuIGhhc2ggJSAyID8gVFJFQVRNRU5UIDogQ09OVFJPTFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VuZFN1Y2Nlc3ModGVzdDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHNlbmRFdmVudCh7XHJcbiAgICB0eXBlOiBFdmVudFR5cGUuZXhwZXJpbWVudCxcclxuICAgIGV4cGVyaW1lbnRfbmFtZTogdGVzdCxcclxuICAgIGV4cGVyaW1lbnRfdmFyaWF0aW9uOiBidWNrZXQodGVzdCkudG9Mb3dlckNhc2UoKSxcclxuICAgIGV4cGVyaW1lbnRfc3VjY2VzczogdHJ1ZSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gKioqIEV4YW1wbGUgdGVzdCBjb2RlICoqKlxyXG4gIC8vIGNvbnN0IHRlc3ROYW1lID0gJyR0ZXN0LW5hbWUkJ1xyXG4gIC8vIGNvbnN0IHhidWNrZXQgPSBidWNrZXQodGVzdE5hbWUpXHJcbiAgLy8gY29uc3QgeCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoLi4uKVxyXG4gIC8vIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHNlbmRTdWNjZXNzKHRlc3ROYW1lKSB9KVxyXG4gIC8vIGlmICh4YnVja2V0ID09PSBUUkVBVE1FTlQpIGFwcGx5VHJlYXRtZW50KHgpXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q3NyZigpIHtcclxuICBjb25zdCBjc3JmRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJylcclxuICBpZiAoIWNzcmZFbCkgcmV0dXJuICcnXHJcbiAgcmV0dXJuIGNzcmZFbC5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldE5leHRFbnYoKSB7XHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIHdpbmRvdy5JU19ORVhUSlNfUEFHRSA9ICEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI19fbmV4dCcpXHJcbn1cclxuIiwiLy8gQSB0aW55IHVzZXIgYWdlbnQgY2hlY2tpbmcgUmVnRXhwIGZvciBhbmFseXRpY3MgcHVycG9zZXNcclxuXHJcbi8vIFRoZSBvcmRlciBtYXR0ZXJzIHdpdGggdGhlc2VcclxuY29uc3QgT1NfUkVHRVhQUyA9IFtcclxuICAvKGlwaG9uZSBvc3xpcGFkIG9zKSAoW14pO10rKS9pLFxyXG4gIC8obWFjKSBvcyB4IChbXik7XSspL2ksXHJcbiAgLyh3aW5kb3dzKSAoW14pO10rKS9pLFxyXG4gIC8oYW5kcm9pZCkgKFteKTtdKykvaSxcclxuICAvKGNyb3MpIChbXik7XSspL2ksXHJcbiAgLyhsaW51eCkgKFteKTtdKykvaSxcclxuXVxyXG5cclxuLy8gVGhlIG9yZGVyIG1hdHRlcnMgd2l0aCB0aGVzZVxyXG5jb25zdCBCUk9XU0VSX1JFR0VYUFMgPSBbXHJcbiAgLyhmaXJlZm94KVxcLyhbXlxccyldKykvaSxcclxuICAvKGVkZ2UpXFwvKFteXFxzKV0rKS9pLFxyXG4gIC8oY2hyb21lKVxcLyhbXlxccyldKykvaSxcclxuICAvKHNhZmFyaSlcXC8oW15cXHMpXSspL2ksXHJcbiAgL21zKGllKVxcLyhbXlxccyldKykvaSxcclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VVc2VyQWdlbnQodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XHJcbiAgdWEgPSB1YS50b0xvd2VyQ2FzZSgpXHJcbiAgY29uc3Qgb3NSZSA9IE9TX1JFR0VYUFMuZmluZCgocmUpID0+IHJlLnRlc3QodWEpKVxyXG4gIGxldCBbLCBvcyA9ICdvdGhlcicsIG9zX3ZlcnNpb24gPSAnMCddID0gKG9zUmUgJiYgdWEubWF0Y2gob3NSZSkpIHx8IFtdXHJcbiAgaWYgKG9zID09PSAnaXBob25lIG9zJyB8fCBvcyA9PT0gJ2lwYWQgb3MnKSBvcyA9ICdpb3MnXHJcbiAgY29uc3QgYnJvd3NlclJlID0gQlJPV1NFUl9SRUdFWFBTLmZpbmQoKHJlKSA9PiByZS50ZXN0KHVhKSlcclxuICBjb25zdCBbLCBicm93c2VyID0gJ290aGVyJywgYnJvd3Nlcl92ZXJzaW9uID0gJzAnXSA9IChicm93c2VyUmUgJiYgdWEubWF0Y2goYnJvd3NlclJlKSkgfHwgW11cclxuICByZXR1cm4geyBvcywgb3NfdmVyc2lvbiwgYnJvd3NlciwgYnJvd3Nlcl92ZXJzaW9uIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFwcEluaXRpYWxQcm9wc1wiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3V0aWxzLkFwcEluaXRpYWxQcm9wcztcbiAgICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5leHRXZWJWaXRhbHNNZXRyaWNcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF91dGlscy5OZXh0V2ViVml0YWxzTWV0cmljO1xuICAgIH1cbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi91dGlsc1wiKTtcbmZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgICB9XG59XG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICAgICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5mdW5jdGlvbiBfYXBwR2V0SW5pdGlhbFByb3BzKCkge1xuICAgIF9hcHBHZXRJbml0aWFsUHJvcHMgPSAvKipcbiAqIGBBcHBgIGNvbXBvbmVudCBpcyB1c2VkIGZvciBpbml0aWFsaXplIG9mIHBhZ2VzLiBJdCBhbGxvd3MgZm9yIG92ZXJ3cml0aW5nIGFuZCBmdWxsIGNvbnRyb2wgb2YgdGhlIGBwYWdlYCBpbml0aWFsaXphdGlvbi5cbiAqIFRoaXMgYWxsb3dzIGZvciBrZWVwaW5nIHN0YXRlIGJldHdlZW4gbmF2aWdhdGlvbiwgY3VzdG9tIGVycm9yIGhhbmRsaW5nLCBpbmplY3RpbmcgYWRkaXRpb25hbCBkYXRhLlxuICovIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKih7IENvbXBvbmVudCAsIGN0eCAgfSkge1xuICAgICAgICBjb25zdCBwYWdlUHJvcHMgPSB5aWVsZCAoMCwgX3V0aWxzKS5sb2FkR2V0SW5pdGlhbFByb3BzKENvbXBvbmVudCwgY3R4KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VQcm9wc1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBfYXBwR2V0SW5pdGlhbFByb3BzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5mdW5jdGlvbiBhcHBHZXRJbml0aWFsUHJvcHMoXykge1xuICAgIHJldHVybiBfYXBwR2V0SW5pdGlhbFByb3BzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5jbGFzcyBBcHAgZXh0ZW5kcyBfcmVhY3QuZGVmYXVsdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBDb21wb25lbnQgLCBwYWdlUHJvcHMgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIH0sIHBhZ2VQcm9wcykpKTtcbiAgICB9XG59XG5BcHAub3JpZ0dldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wcztcbkFwcC5nZXRJbml0aWFsUHJvcHMgPSBhcHBHZXRJbml0aWFsUHJvcHM7XG5leHBvcnRzLmRlZmF1bHQgPSBBcHA7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPV9hcHAuanMubWFwIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgQXBwIGZyb20gJ25leHQvYXBwJ1xyXG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzLCBBcHBDb250ZXh0IH0gZnJvbSAnbmV4dC9hcHAnXHJcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcclxuaW1wb3J0IHsgdXNlVGhlbWUsIFRoZW1lUHJvdmlkZXIgfSBmcm9tICdAcHJpbWVyL2NvbXBvbmVudHMnXHJcbmltcG9ydCB7IGRlZmF1bHRUaGVtZVByb3BzLCBnZXRUaGVtZVByb3BzIH0gZnJvbSAnY29tcG9uZW50cy9saWIvZ2V0VGhlbWVQcm9wcydcclxuXHJcbmltcG9ydCAnLi4vc3R5bGVzaGVldHMvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCBldmVudHMgZnJvbSAnamF2YXNjcmlwdHMvZXZlbnRzJ1xyXG5pbXBvcnQgZXhwZXJpbWVudCBmcm9tICdqYXZhc2NyaXB0cy9leHBlcmltZW50J1xyXG5pbXBvcnQgc2V0TmV4dEVudiBmcm9tICdqYXZhc2NyaXB0cy9zZXQtbmV4dC1lbnYnXHJcblxyXG50eXBlIE15QXBwUHJvcHMgPSBBcHBQcm9wcyAmIHsgY3NyZlRva2VuOiBzdHJpbmc7IHRoZW1lUHJvcHM6IHR5cGVvZiBkZWZhdWx0VGhlbWVQcm9wcyB9XHJcbmNvbnN0IE15QXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMsIGNzcmZUb2tlbiwgdGhlbWVQcm9wcyB9OiBNeUFwcFByb3BzKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGV2ZW50cygpXHJcbiAgICBleHBlcmltZW50KClcclxuICAgIHNldE5leHRFbnYoKVxyXG4gIH0sIFtdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cclxuICAgICAgICA8dGl0bGU+QmF5RGlHIFdpa2k8L3RpdGxlPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiIC8+XHJcblxyXG4gICAgICAgIDxsaW5rIHJlbD1cImFsdGVybmF0ZSBpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCIvYXNzZXRzL2ltYWdlcy9zaXRlL2Zhdmljb24ucG5nXCIgLz5cclxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiBocmVmPVwiL2Fzc2V0cy9pbWFnZXMvc2l0ZS9mYXZpY29uLnN2Z1wiIC8+XHJcblxyXG4gICAgICAgIDxtZXRhXHJcbiAgICAgICAgICBuYW1lPVwiZ29vZ2xlLXNpdGUtdmVyaWZpY2F0aW9uXCJcclxuICAgICAgICAgIGNvbnRlbnQ9XCJPZ2RRYzBHWmZqREk1MndEdjFia01ULVNMcEJVb19oNW5uOW1JOUwyMnhRXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxtZXRhXHJcbiAgICAgICAgICBuYW1lPVwiZ29vZ2xlLXNpdGUtdmVyaWZpY2F0aW9uXCJcclxuICAgICAgICAgIGNvbnRlbnQ9XCJjMWt1RC1LMkhJVkY2MzVseXBjc1dQb0Q0a2lsbzUtakFfd0JGeVQ0dU1ZXCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8bWV0YSBuYW1lPVwiY3NyZi10b2tlblwiIGNvbnRlbnQ9e2NzcmZUb2tlbn0gLz5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8VGhlbWVQcm92aWRlcj5cclxuICAgICAgICA8U2V0VGhlbWUgdGhlbWVQcm9wcz17dGhlbWVQcm9wc30gLz5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICAgIDwvPlxyXG4gIClcclxufVxyXG5cclxuTXlBcHAuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGFwcENvbnRleHQ6IEFwcENvbnRleHQpID0+IHtcclxuICBjb25zdCB7IGN0eCB9ID0gYXBwQ29udGV4dFxyXG4gIC8vIGNhbGxzIHBhZ2UncyBgZ2V0SW5pdGlhbFByb3BzYCBhbmQgZmlsbHMgYGFwcFByb3BzLnBhZ2VQcm9wc2BcclxuICBjb25zdCBhcHBQcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoYXBwQ29udGV4dClcclxuICBjb25zdCByZXE6IGFueSA9IGN0eC5yZXFcclxuXHJcbiAgcmV0dXJuIHsgLi4uYXBwUHJvcHMsIHRoZW1lUHJvcHM6IGdldFRoZW1lUHJvcHMocmVxKSwgY3NyZlRva2VuOiByZXE/LmNzcmZUb2tlbj8uKCkgfHwgJycgfVxyXG59XHJcblxyXG5jb25zdCBTZXRUaGVtZSA9ICh7IHRoZW1lUHJvcHMgfTogeyB0aGVtZVByb3BzOiB0eXBlb2YgZGVmYXVsdFRoZW1lUHJvcHMgfSkgPT4ge1xyXG4gIC8vIENhdXNlIHByaW1lci9jb21wb25lbnRzIHRvIHJlLWV2YWx1YXRlIHRoZSAnYXV0bycgY29sb3IgbW9kZSBvbiBjbGllbnQgc2lkZSByZW5kZXJcclxuICBjb25zdCB7IHNldENvbG9yTW9kZSB9ID0gdXNlVGhlbWUoKVxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgc2V0Q29sb3JNb2RlKHRoZW1lUHJvcHMuY29sb3JNb2RlIGFzIGFueSlcclxuICAgIH0pXHJcbiAgfSwgW10pXHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHBcclxuIiwiIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHByaW1lci9jb21wb25lbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltdXJtdXJoYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzLWNvb2tpZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7Il0sIm5hbWVzIjpbImRlZmF1bHRDU1NUaGVtZVByb3BzIiwiY29sb3JNb2RlIiwibmlnaHRTY2hlbWUiLCJkYXlTY2hlbWUiLCJkZWZhdWx0VGhlbWVQcm9wcyIsImNzc0NvbG9yTW9kZVRvSnMiLCJhdXRvIiwibGlnaHQiLCJkYXJrIiwiZ2V0VGhlbWVQcm9wcyIsInJlcSIsIm1vZGUiLCJjb29raWVWYWx1ZSIsImRlZmF1bHRQcm9wcyIsImNvb2tpZXMiLCJjb2xvcl9tb2RlIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZGFya190aGVtZSIsIm5hbWUiLCJsaWdodF90aGVtZSIsInY0IiwidXVpZHY0IiwiQ29va2llcyIsImdldENzcmYiLCJwYXJzZVVzZXJBZ2VudCIsIkNPT0tJRV9OQU1FIiwic3RhcnRWaXNpdFRpbWUiLCJEYXRlIiwibm93IiwicGFnZUV2ZW50SWQiLCJtYXhTY3JvbGxZIiwicGF1c2VTY3JvbGxpbmciLCJzZW50RXhpdCIsImdldFVzZXJFdmVudHNJZCIsImdldCIsInNldCIsInNlY3VyZSIsInNhbWVTaXRlIiwiZXhwaXJlcyIsIkV2ZW50VHlwZSIsInNlbmRFdmVudCIsInR5cGUiLCJ2ZXJzaW9uIiwicHJvcHMiLCJib2R5IiwiX2NzcmYiLCJjb250ZXh0IiwiZXZlbnRfaWQiLCJ1c2VyIiwiY3JlYXRlZCIsInRvSVNPU3RyaW5nIiwicGFnZV9ldmVudF9pZCIsInBhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiaG9zdG5hbWUiLCJyZWZlcnJlciIsImRvY3VtZW50Iiwic2VhcmNoIiwiaHJlZiIsInNpdGVfbGFuZ3VhZ2UiLCJzcGxpdCIsInZpZXdwb3J0X3dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJ2aWV3cG9ydF9oZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJ0aW1lem9uZSIsImdldFRpbWV6b25lT2Zmc2V0IiwidXNlcl9sYW5ndWFnZSIsIm5hdmlnYXRvciIsImxhbmd1YWdlIiwiYXBwbGljYXRpb25fcHJlZmVyZW5jZSIsInNlbmRCZWFjb24iLCJibG9iIiwiQmxvYiIsInN0cmluZ2lmeSIsImdldFBlcmZvcm1hbmNlIiwicGFpbnQiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJmaW5kIiwibmF2IiwiZmlyc3RDb250ZW50ZnVsUGFpbnQiLCJzdGFydFRpbWUiLCJ1bmRlZmluZWQiLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwicmVuZGVyIiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJ0cmFja1Njcm9sbCIsInNldFRpbWVvdXQiLCJzY3JvbGxQaXhlbHMiLCJ3aW5kb3ciLCJzY3JvbGxZIiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxQb3NpdGlvbiIsInNjcm9sbEhlaWdodCIsInNlbmRFeGl0IiwidmlzaWJpbGl0eVN0YXRlIiwiZXhpdCIsImV4aXRfcmVuZGVyX2R1cmF0aW9uIiwiZXhpdF9maXJzdF9wYWludCIsImV4aXRfZG9tX2ludGVyYWN0aXZlIiwiZXhpdF9kb21fY29tcGxldGUiLCJleGl0X3Zpc2l0X2R1cmF0aW9uIiwiZXhpdF9zY3JvbGxfbGVuZ3RoIiwiaW5pdFBhZ2VFdmVudCIsInBhZ2VFdmVudCIsInBhZ2UiLCJpbml0Q2xpcGJvYXJkRXZlbnQiLCJmb3JFYWNoIiwidmVyYiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGlwYm9hcmQiLCJjbGlwYm9hcmRfb3BlcmF0aW9uIiwiaW5pdExpbmtFdmVudCIsImV2dCIsInRhcmdldCIsImxpbmsiLCJjbG9zZXN0IiwibGlua191cmwiLCJpbml0RXhpdEV2ZW50IiwiaW5pdE5hdmlnYXRlRXZlbnQiLCJxdWVyeVNlbGVjdG9yIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImRldGFpbHMiLCJuYXZpZ2F0ZSIsIm5hdmlnYXRlX2xhYmVsIiwib3BlbiIsImlubmVyVGV4dCIsImluaXRpYWxpemVFdmVudHMiLCJtdXJtdXIiLCJUUkVBVE1FTlQiLCJDT05UUk9MIiwiYnVja2V0IiwidGVzdCIsImlkIiwiaGFzaCIsInJlc3VsdCIsInNlbmRTdWNjZXNzIiwiZXhwZXJpbWVudCIsImV4cGVyaW1lbnRfbmFtZSIsImV4cGVyaW1lbnRfdmFyaWF0aW9uIiwidG9Mb3dlckNhc2UiLCJleHBlcmltZW50X3N1Y2Nlc3MiLCJjc3JmRWwiLCJnZXRBdHRyaWJ1dGUiLCJzZXROZXh0RW52IiwiSVNfTkVYVEpTX1BBR0UiLCJPU19SRUdFWFBTIiwiQlJPV1NFUl9SRUdFWFBTIiwidWEiLCJ1c2VyQWdlbnQiLCJvc1JlIiwicmUiLCJvcyIsIm9zX3ZlcnNpb24iLCJtYXRjaCIsImJyb3dzZXJSZSIsImJyb3dzZXIiLCJicm93c2VyX3ZlcnNpb24iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImVudW1lcmFibGUiLCJfdXRpbHMiLCJBcHBJbml0aWFsUHJvcHMiLCJOZXh0V2ViVml0YWxzTWV0cmljIiwiZGVmYXVsdCIsIl9yZWFjdCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwicmVzb2x2ZSIsInJlamVjdCIsIl9uZXh0IiwiX3Rocm93Iiwia2V5IiwiYXJnIiwiaW5mbyIsImVycm9yIiwiZG9uZSIsIlByb21pc2UiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJmbiIsInNlbGYiLCJhcmdzIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJlcnIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiX2FwcEdldEluaXRpYWxQcm9wcyIsIkNvbXBvbmVudCIsImN0eCIsInBhZ2VQcm9wcyIsImxvYWRHZXRJbml0aWFsUHJvcHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJfIiwiQXBwIiwiY3JlYXRlRWxlbWVudCIsImFzc2lnbiIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJSZWFjdCIsInVzZUVmZmVjdCIsIkhlYWQiLCJ1c2VUaGVtZSIsIlRoZW1lUHJvdmlkZXIiLCJldmVudHMiLCJNeUFwcCIsImNzcmZUb2tlbiIsInRoZW1lUHJvcHMiLCJhcHBDb250ZXh0IiwiYXBwUHJvcHMiLCJTZXRUaGVtZSIsInNldENvbG9yTW9kZSJdLCJzb3VyY2VSb290IjoiIn0=
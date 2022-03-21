(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./components/lib/getThemeProps.tsx":
/*!******************************************!*\
  !*** ./components/lib/getThemeProps.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultCSSThemeProps": function() { return /* binding */ defaultCSSThemeProps; },
/* harmony export */   "defaultThemeProps": function() { return /* binding */ defaultThemeProps; },
/* harmony export */   "getThemeProps": function() { return /* binding */ getThemeProps; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserEventsId": function() { return /* binding */ getUserEventsId; },
/* harmony export */   "EventType": function() { return /* binding */ EventType; },
/* harmony export */   "sendEvent": function() { return /* binding */ sendEvent; },
/* harmony export */   "default": function() { return /* binding */ initializeEvents; }
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "js-cookie");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _get_csrf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-csrf */ "./javascripts/get-csrf.ts");
/* harmony import */ var _user_agent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-agent */ "./javascripts/user-agent.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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
      props = _objectWithoutProperties(_ref, ["type", "version"]);

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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bucket": function() { return /* binding */ bucket; },
/* harmony export */   "sendSuccess": function() { return /* binding */ sendSuccess; },
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCsrf; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ setNextEnv; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ parseUserAgent; }
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.AppInitialProps = _utils.AppInitialProps;
exports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps({
  Component,
  ctx
}) {
  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  render() {
    const {
      Component,
      pageProps
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, pageProps);
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _primer_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @primer/components */ "@primer/components");
/* harmony import */ var _primer_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_primer_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var components_lib_getThemeProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/lib/getThemeProps */ "./components/lib/getThemeProps.tsx");
/* harmony import */ var _stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../stylesheets/index.scss */ "./stylesheets/index.scss");
/* harmony import */ var _stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var javascripts_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! javascripts/events */ "./javascripts/events.ts");
/* harmony import */ var javascripts_experiment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! javascripts/experiment */ "./javascripts/experiment.ts");
/* harmony import */ var javascripts_set_next_env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! javascripts/set-next-env */ "./javascripts/set-next-env.ts");


var _jsxFileName = "C:\\Users\\michi\\3D Objects\\baydig-wiki\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const MyApp = ({
  Component,
  pageProps,
  csrfToken,
  themeProps
}) => {
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,javascripts_events__WEBPACK_IMPORTED_MODULE_7__.default)();
    (0,javascripts_experiment__WEBPACK_IMPORTED_MODULE_8__.default)();
    (0,javascripts_set_next_env__WEBPACK_IMPORTED_MODULE_9__.default)();
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
        charSet: "utf-8"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("title", {
        children: "BayDiG Wiki"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
        rel: "alternate icon",
        type: "image/png",
        href: "/assets/images/site/favicon.png"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/images/site/favicon.svg"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
        name: "google-site-verification",
        content: "OgdQc0GZfjDI52wDv1bkMT-SLpBUo_h5nn9mI9L22xQ"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
        name: "google-site-verification",
        content: "c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
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
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_primer_components__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SetTheme, {
        themeProps: themeProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
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

  const appProps = await next_app__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(appContext);
  const req = ctx.req;
  return _objectSpread(_objectSpread({}, appProps), {}, {
    themeProps: (0,components_lib_getThemeProps__WEBPACK_IMPORTED_MODULE_5__.getThemeProps)(req),
    csrfToken: (req === null || req === void 0 ? void 0 : (_req$csrfToken = req.csrfToken) === null || _req$csrfToken === void 0 ? void 0 : _req$csrfToken.call(req)) || ''
  });
};

const SetTheme = ({
  themeProps
}) => {
  // Cause primer/components to re-evaluate the 'auto' color mode on client side render
  const {
    setColorMode
  } = (0,_primer_components__WEBPACK_IMPORTED_MODULE_4__.useTheme)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setTimeout(() => {
      setColorMode(themeProps.colorMode);
    });
  }, []);
  return null;
};

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "./stylesheets/index.scss":
/*!********************************!*\
  !*** ./stylesheets/index.scss ***!
  \********************************/
/***/ (function() {



/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "@primer/components":
/*!*************************************!*\
  !*** external "@primer/components" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("@primer/components");;

/***/ }),

/***/ "imurmurhash":
/*!******************************!*\
  !*** external "imurmurhash" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("imurmurhash");;

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("js-cookie");;

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ (function(module) {

"use strict";
module.exports = require("uuid");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vY29tcG9uZW50cy9saWIvZ2V0VGhlbWVQcm9wcy50c3giLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vamF2YXNjcmlwdHMvZXZlbnRzLnRzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL2phdmFzY3JpcHRzL2V4cGVyaW1lbnQudHMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vamF2YXNjcmlwdHMvZ2V0LWNzcmYudHMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vamF2YXNjcmlwdHMvc2V0LW5leHQtZW52LnRzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL2phdmFzY3JpcHRzL3VzZXItYWdlbnQudHMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9wYWdlcy9fYXBwLmpzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJAcHJpbWVyL2NvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJpbXVybXVyaGFzaFwiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcImpzLWNvb2tpZVwiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcInV1aWRcIiJdLCJuYW1lcyI6WyJkZWZhdWx0Q1NTVGhlbWVQcm9wcyIsImNvbG9yTW9kZSIsIm5pZ2h0U2NoZW1lIiwiZGF5U2NoZW1lIiwiZGVmYXVsdFRoZW1lUHJvcHMiLCJjc3NDb2xvck1vZGVUb0pzIiwiYXV0byIsImxpZ2h0IiwiZGFyayIsImdldFRoZW1lUHJvcHMiLCJyZXEiLCJtb2RlIiwiY29va2llVmFsdWUiLCJkZWZhdWx0UHJvcHMiLCJjb29raWVzIiwiY29sb3JfbW9kZSIsIkpTT04iLCJwYXJzZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImRhcmtfdGhlbWUiLCJuYW1lIiwibGlnaHRfdGhlbWUiLCJDT09LSUVfTkFNRSIsInN0YXJ0VmlzaXRUaW1lIiwiRGF0ZSIsIm5vdyIsInBhZ2VFdmVudElkIiwibWF4U2Nyb2xsWSIsInBhdXNlU2Nyb2xsaW5nIiwic2VudEV4aXQiLCJnZXRVc2VyRXZlbnRzSWQiLCJDb29raWVzIiwidXVpZHY0Iiwic2VjdXJlIiwic2FtZVNpdGUiLCJleHBpcmVzIiwiRXZlbnRUeXBlIiwic2VuZEV2ZW50IiwidHlwZSIsInZlcnNpb24iLCJwcm9wcyIsImJvZHkiLCJfY3NyZiIsImdldENzcmYiLCJjb250ZXh0IiwiZXZlbnRfaWQiLCJ1c2VyIiwiY3JlYXRlZCIsInRvSVNPU3RyaW5nIiwicGFnZV9ldmVudF9pZCIsInBhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiaG9zdG5hbWUiLCJyZWZlcnJlciIsImRvY3VtZW50Iiwic2VhcmNoIiwiaHJlZiIsInNpdGVfbGFuZ3VhZ2UiLCJzcGxpdCIsInBhcnNlVXNlckFnZW50Iiwidmlld3BvcnRfd2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsInZpZXdwb3J0X2hlaWdodCIsImNsaWVudEhlaWdodCIsInRpbWV6b25lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1c2VyX2xhbmd1YWdlIiwibmF2aWdhdG9yIiwibGFuZ3VhZ2UiLCJhcHBsaWNhdGlvbl9wcmVmZXJlbmNlIiwic2VuZEJlYWNvbiIsImJsb2IiLCJCbG9iIiwic3RyaW5naWZ5IiwiZ2V0UGVyZm9ybWFuY2UiLCJwYWludCIsInBlcmZvcm1hbmNlIiwiZ2V0RW50cmllc0J5VHlwZSIsImZpbmQiLCJuYXYiLCJmaXJzdENvbnRlbnRmdWxQYWludCIsInN0YXJ0VGltZSIsInVuZGVmaW5lZCIsImRvbUludGVyYWN0aXZlIiwiZG9tQ29tcGxldGUiLCJyZW5kZXIiLCJyZXNwb25zZUVuZCIsInJlcXVlc3RTdGFydCIsInRyYWNrU2Nyb2xsIiwic2V0VGltZW91dCIsInNjcm9sbFBpeGVscyIsIndpbmRvdyIsInNjcm9sbFkiLCJpbm5lckhlaWdodCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsSGVpZ2h0Iiwic2VuZEV4aXQiLCJ2aXNpYmlsaXR5U3RhdGUiLCJleGl0IiwiZXhpdF9yZW5kZXJfZHVyYXRpb24iLCJleGl0X2ZpcnN0X3BhaW50IiwiZXhpdF9kb21faW50ZXJhY3RpdmUiLCJleGl0X2RvbV9jb21wbGV0ZSIsImV4aXRfdmlzaXRfZHVyYXRpb24iLCJleGl0X3Njcm9sbF9sZW5ndGgiLCJpbml0UGFnZUV2ZW50IiwicGFnZUV2ZW50IiwicGFnZSIsImluaXRDbGlwYm9hcmRFdmVudCIsImZvckVhY2giLCJ2ZXJiIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsaXBib2FyZCIsImNsaXBib2FyZF9vcGVyYXRpb24iLCJpbml0TGlua0V2ZW50IiwiZXZ0IiwidGFyZ2V0IiwibGluayIsImNsb3Nlc3QiLCJsaW5rX3VybCIsImluaXRFeGl0RXZlbnQiLCJpbml0TmF2aWdhdGVFdmVudCIsInF1ZXJ5U2VsZWN0b3IiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsIm5hdmlnYXRlIiwibmF2aWdhdGVfbGFiZWwiLCJvcGVuIiwiaW5uZXJUZXh0IiwiaW5pdGlhbGl6ZUV2ZW50cyIsIlRSRUFUTUVOVCIsIkNPTlRST0wiLCJidWNrZXQiLCJ0ZXN0IiwiaWQiLCJoYXNoIiwibXVybXVyIiwicmVzdWx0Iiwic2VuZFN1Y2Nlc3MiLCJleHBlcmltZW50X25hbWUiLCJleHBlcmltZW50X3ZhcmlhdGlvbiIsInRvTG93ZXJDYXNlIiwiZXhwZXJpbWVudF9zdWNjZXNzIiwiY3NyZkVsIiwiZ2V0QXR0cmlidXRlIiwic2V0TmV4dEVudiIsIklTX05FWFRKU19QQUdFIiwiT1NfUkVHRVhQUyIsIkJST1dTRVJfUkVHRVhQUyIsInVhIiwidXNlckFnZW50Iiwib3NSZSIsInJlIiwib3MiLCJvc192ZXJzaW9uIiwibWF0Y2giLCJicm93c2VyUmUiLCJicm93c2VyIiwiYnJvd3Nlcl92ZXJzaW9uIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJleHBvcnRzIiwiX3JlYWN0IiwiX3V0aWxzIiwiQXBwSW5pdGlhbFByb3BzIiwiTmV4dFdlYlZpdGFsc01ldHJpYyIsImFwcEdldEluaXRpYWxQcm9wcyIsIkNvbXBvbmVudCIsImN0eCIsInBhZ2VQcm9wcyIsImxvYWRHZXRJbml0aWFsUHJvcHMiLCJBcHAiLCJkZWZhdWx0IiwiY3JlYXRlRWxlbWVudCIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJNeUFwcCIsImNzcmZUb2tlbiIsInRoZW1lUHJvcHMiLCJ1c2VFZmZlY3QiLCJldmVudHMiLCJleHBlcmltZW50IiwiYXBwQ29udGV4dCIsImFwcFByb3BzIiwiU2V0VGhlbWUiLCJzZXRDb2xvck1vZGUiLCJ1c2VUaGVtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUdBQTZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBdEMsTUFBTUEsb0JB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Q0FBWWlMLFFBQVo7QUFBc0JMLGNBQVUsRUFBRTdLLDJFQUFhLENBQUNDLEdBQUQsQ0FBL0M7QUFBc0QySyxhQUFTLEVBQUUsQ0FBQTNLLEdBQUcsU0FBSCxJQUFBQSxHQUFHLFdBQUgsOEJBQUFBLEdBQUcsQ0FBRTJLLFNBQUwsdUVBQUEzSyxHQUFHLE1BQW1CO0FBQXZGO0FBQ0QsQ0FQRDs7QUFTQSxNQUFNa0wsUUFBUSxHQUFHLENBQUM7QUFBRU47QUFBRixDQUFELEtBQThEO0FBQzdFO0FBQ0EsUUFBTTtBQUFFTztBQUFGLE1BQW1CQyw0REFBUSxFQUFqQztBQUNBUCxrREFBUyxDQUFDLE1BQU07QUFDZDVGLGNBQVUsQ0FBQyxNQUFNO0FBQ2ZrRyxrQkFBWSxDQUFDUCxVQUFVLENBQUNyTCxTQUFaLENBQVo7QUFDRCxLQUZTLENBQVY7QUFHRCxHQUpRLEVBSU4sRUFKTSxDQUFUO0FBS0EsU0FBTyxJQUFQO0FBQ0QsQ0FURDs7QUFXQSwrREFBZW1MLEtBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Qzs7Ozs7Ozs7Ozs7QUNOQSxnRDs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxnRTs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxrQyIsImZpbGUiOiJwYWdlcy9fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2FwcCcpXG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdENTU1RoZW1lUHJvcHMgPSB7XHJcbiAgY29sb3JNb2RlOiAnYXV0bycsIC8vIGxpZ2h0LCBkYXJrLCBhdXRvXHJcbiAgbmlnaHRTY2hlbWU6ICdkYXJrJyxcclxuICBkYXlTY2hlbWU6ICdsaWdodCcsXHJcbn1cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRUaGVtZVByb3BzID0ge1xyXG4gIGNvbG9yTW9kZTogJ2F1dG8nLCAvLyBkYXksIG5pZ2h0LCBhdXRvXHJcbiAgbmlnaHRTY2hlbWU6ICdkYXJrJyxcclxuICBkYXlTY2hlbWU6ICdsaWdodCcsXHJcbn1cclxuXHJcbmNvbnN0IGNzc0NvbG9yTW9kZVRvSnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgYXV0bzogJ2F1dG8nLFxyXG4gIGxpZ2h0OiAnZGF5JyxcclxuICBkYXJrOiAnbmlnaHQnLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VGhlbWVQcm9wcyA9IChyZXE6IGFueSwgbW9kZT86ICdjc3MnKSA9PiB7XHJcbiAgbGV0IGNvb2tpZVZhbHVlOiB7XHJcbiAgICBjb2xvcl9tb2RlPzogJ2F1dG8nIHwgJ2xpZ2h0JyB8ICdkYXJrJ1xyXG4gICAgZGFya190aGVtZT86IHsgbmFtZTogc3RyaW5nIH1cclxuICAgIGxpZ2h0X3RoZW1lPzogeyBuYW1lOiBzdHJpbmcgfVxyXG4gIH0gPSB7fVxyXG4gIGNvbnN0IGRlZmF1bHRQcm9wcyA9IG1vZGUgPT09ICdjc3MnID8gZGVmYXVsdENTU1RoZW1lUHJvcHMgOiBkZWZhdWx0VGhlbWVQcm9wc1xyXG5cclxuICBpZiAocmVxLmNvb2tpZXM/LmNvbG9yX21vZGUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvb2tpZVZhbHVlID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQocmVxLmNvb2tpZXMuY29sb3JfbW9kZSkpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC8vIHRoZSBjb29raWUgdXNlcyBwcmltZXIvY3NzIGNvbG9yX21vZGUsIHNvbWV0aW1lcyB3ZSBuZWVkIHRvIGNvbnZlcnQgdGhhdCB0byBhIHByaW1lci9jb21wb25lbnRzIGNvbXBhdGlibGUgdmVyc2lvblxyXG4gICAgY29sb3JNb2RlOlxyXG4gICAgICAobW9kZSA9PT0gJ2NzcycgPyBjb29raWVWYWx1ZS5jb2xvcl9tb2RlIDogY3NzQ29sb3JNb2RlVG9Kc1tjb29raWVWYWx1ZS5jb2xvcl9tb2RlIHx8ICcnXSkgfHxcclxuICAgICAgZGVmYXVsdFByb3BzLmNvbG9yTW9kZSxcclxuICAgIG5pZ2h0U2NoZW1lOiBjb29raWVWYWx1ZS5kYXJrX3RoZW1lPy5uYW1lIHx8IGRlZmF1bHRQcm9wcy5uaWdodFNjaGVtZSxcclxuICAgIGRheVNjaGVtZTogY29va2llVmFsdWUubGlnaHRfdGhlbWU/Lm5hbWUgfHwgZGVmYXVsdFByb3BzLmRheVNjaGVtZSxcclxuICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXHJcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXHJcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSdcclxuaW1wb3J0IGdldENzcmYgZnJvbSAnLi9nZXQtY3NyZidcclxuaW1wb3J0IHBhcnNlVXNlckFnZW50IGZyb20gJy4vdXNlci1hZ2VudCdcclxuXHJcbmNvbnN0IENPT0tJRV9OQU1FID0gJ19kb2NzLWV2ZW50cydcclxuXHJcbmNvbnN0IHN0YXJ0VmlzaXRUaW1lID0gRGF0ZS5ub3coKVxyXG5cclxubGV0IGNvb2tpZVZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWRcclxubGV0IHBhZ2VFdmVudElkOiBzdHJpbmcgfCB1bmRlZmluZWRcclxubGV0IG1heFNjcm9sbFkgPSAwXHJcbmxldCBwYXVzZVNjcm9sbGluZyA9IGZhbHNlXHJcbmxldCBzZW50RXhpdCA9IGZhbHNlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckV2ZW50c0lkKCkge1xyXG4gIGlmIChjb29raWVWYWx1ZSkgcmV0dXJuIGNvb2tpZVZhbHVlXHJcbiAgY29va2llVmFsdWUgPSBDb29raWVzLmdldChDT09LSUVfTkFNRSlcclxuICBpZiAoY29va2llVmFsdWUpIHJldHVybiBjb29raWVWYWx1ZVxyXG4gIGNvb2tpZVZhbHVlID0gdXVpZHY0KClcclxuICBDb29raWVzLnNldChDT09LSUVfTkFNRSwgY29va2llVmFsdWUsIHtcclxuICAgIHNlY3VyZTogdHJ1ZSxcclxuICAgIHNhbWVTaXRlOiAnc3RyaWN0JyxcclxuICAgIGV4cGlyZXM6IDM2NSxcclxuICB9KVxyXG4gIHJldHVybiBjb29raWVWYWx1ZVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBFdmVudFR5cGUge1xyXG4gIHBhZ2UgPSAncGFnZScsXHJcbiAgZXhpdCA9ICdleGl0JyxcclxuICBsaW5rID0gJ2xpbmsnLFxyXG4gIHNlYXJjaCA9ICdzZWFyY2gnLFxyXG4gIG5hdmlnYXRlID0gJ25hdmlnYXRlJyxcclxuICBzdXJ2ZXkgPSAnc3VydmV5JyxcclxuICBleHBlcmltZW50ID0gJ2V4cGVyaW1lbnQnLFxyXG4gIHByZWZlcmVuY2UgPSAncHJlZmVyZW5jZScsXHJcbiAgY2xpcGJvYXJkID0gJ2NsaXBib2FyZCcsXHJcbiAgcHJpbnQgPSAncHJpbnQnLFxyXG59XHJcblxyXG50eXBlIFNlbmRFdmVudFByb3BzID0ge1xyXG4gIHR5cGU6IEV2ZW50VHlwZVxyXG4gIHZlcnNpb24/OiBzdHJpbmdcclxuICBleGl0X3JlbmRlcl9kdXJhdGlvbj86IG51bWJlclxyXG4gIGV4aXRfZmlyc3RfcGFpbnQ/OiBudW1iZXJcclxuICBleGl0X2RvbV9pbnRlcmFjdGl2ZT86IG51bWJlclxyXG4gIGV4aXRfZG9tX2NvbXBsZXRlPzogbnVtYmVyXHJcbiAgZXhpdF92aXNpdF9kdXJhdGlvbj86IG51bWJlclxyXG4gIGV4aXRfc2Nyb2xsX2xlbmd0aD86IG51bWJlclxyXG4gIGxpbmtfdXJsPzogc3RyaW5nXHJcbiAgc2VhcmNoX3F1ZXJ5Pzogc3RyaW5nXHJcbiAgc2VhcmNoX2NvbnRleHQ/OiBzdHJpbmdcclxuICBuYXZpZ2F0ZV9sYWJlbD86IHN0cmluZ1xyXG4gIHN1cnZleV90b2tlbj86IHN0cmluZyAvLyBIb25leXBvdCwgZG9lc24ndCBleGlzdCBpbiBzY2hlbWFcclxuICBzdXJ2ZXlfdm90ZT86IGJvb2xlYW5cclxuICBzdXJ2ZXlfY29tbWVudD86IHN0cmluZ1xyXG4gIHN1cnZleV9lbWFpbD86IHN0cmluZ1xyXG4gIGV4cGVyaW1lbnRfbmFtZT86IHN0cmluZ1xyXG4gIGV4cGVyaW1lbnRfdmFyaWF0aW9uPzogc3RyaW5nXHJcbiAgZXhwZXJpbWVudF9zdWNjZXNzPzogYm9vbGVhblxyXG4gIGNsaXBib2FyZF9vcGVyYXRpb24/OiBzdHJpbmdcclxuICBwcmVmZXJlbmNlX25hbWU/OiBzdHJpbmdcclxuICBwcmVmZXJlbmNlX3ZhbHVlPzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZW5kRXZlbnQoeyB0eXBlLCB2ZXJzaW9uID0gJzEuMC4wJywgLi4ucHJvcHMgfTogU2VuZEV2ZW50UHJvcHMpIHtcclxuICBjb25zdCBib2R5ID0ge1xyXG4gICAgX2NzcmY6IGdldENzcmYoKSxcclxuXHJcbiAgICB0eXBlLFxyXG5cclxuICAgIGNvbnRleHQ6IHtcclxuICAgICAgLy8gUHJpbWl0aXZlc1xyXG4gICAgICBldmVudF9pZDogdXVpZHY0KCksXHJcbiAgICAgIHVzZXI6IGdldFVzZXJFdmVudHNJZCgpLFxyXG4gICAgICB2ZXJzaW9uLFxyXG4gICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgIHBhZ2VfZXZlbnRfaWQ6IHBhZ2VFdmVudElkLFxyXG5cclxuICAgICAgLy8gQ29udGVudCBpbmZvcm1hdGlvblxyXG4gICAgICBwYXRoOiBsb2NhdGlvbi5wYXRobmFtZSxcclxuICAgICAgaG9zdG5hbWU6IGxvY2F0aW9uLmhvc3RuYW1lLFxyXG4gICAgICByZWZlcnJlcjogZG9jdW1lbnQucmVmZXJyZXIsXHJcbiAgICAgIHNlYXJjaDogbG9jYXRpb24uc2VhcmNoLFxyXG4gICAgICBocmVmOiBsb2NhdGlvbi5ocmVmLFxyXG4gICAgICBzaXRlX2xhbmd1YWdlOiBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzFdLFxyXG5cclxuICAgICAgLy8gRGV2aWNlIGluZm9ybWF0aW9uXHJcbiAgICAgIC8vIG9zLCBvc192ZXJzaW9uLCBicm93c2VyLCBicm93c2VyX3ZlcnNpb246XHJcbiAgICAgIC4uLnBhcnNlVXNlckFnZW50KCksXHJcbiAgICAgIHZpZXdwb3J0X3dpZHRoOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsXHJcbiAgICAgIHZpZXdwb3J0X2hlaWdodDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcclxuXHJcbiAgICAgIC8vIExvY2F0aW9uIGluZm9ybWF0aW9uXHJcbiAgICAgIHRpbWV6b25lOiBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgLyAtNjAsXHJcbiAgICAgIHVzZXJfbGFuZ3VhZ2U6IG5hdmlnYXRvci5sYW5ndWFnZSxcclxuXHJcbiAgICAgIC8vIFByZWZlcmVuY2UgaW5mb3JtYXRpb25cclxuICAgICAgYXBwbGljYXRpb25fcHJlZmVyZW5jZTogQ29va2llcy5nZXQoJ3Rvb2xQcmVmZXJyZWQnKSxcclxuICAgIH0sXHJcblxyXG4gICAgLi4ucHJvcHMsXHJcbiAgfVxyXG5cclxuICAvLyBPbmx5IHNlbmQgdGhlIGJlYWNvbiBpZiB0aGUgZmVhdHVyZSBpcyBub3QgZGlzYWJsZWQgaW4gdGhlIHVzZXIncyBicm93c2VyXHJcbiAgaWYgKG5hdmlnYXRvcj8uc2VuZEJlYWNvbikge1xyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pXHJcbiAgICBuYXZpZ2F0b3Iuc2VuZEJlYWNvbignL2V2ZW50cycsIGJsb2IpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gYm9keVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQZXJmb3JtYW5jZSgpIHtcclxuICBjb25zdCBwYWludCA9IHBlcmZvcm1hbmNlXHJcbiAgICA/LmdldEVudHJpZXNCeVR5cGUoJ3BhaW50JylcclxuICAgID8uZmluZCgoeyBuYW1lIH0pID0+IG5hbWUgPT09ICdmaXJzdC1jb250ZW50ZnVsLXBhaW50JylcclxuICBjb25zdCBuYXYgPSBwZXJmb3JtYW5jZT8uZ2V0RW50cmllc0J5VHlwZSgnbmF2aWdhdGlvbicpPy5bMF0gYXNcclxuICAgIHwgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nXHJcbiAgICB8IHVuZGVmaW5lZFxyXG4gIHJldHVybiB7XHJcbiAgICBmaXJzdENvbnRlbnRmdWxQYWludDogcGFpbnQgPyBwYWludC5zdGFydFRpbWUgLyAxMDAwIDogdW5kZWZpbmVkLFxyXG4gICAgZG9tSW50ZXJhY3RpdmU6IG5hdiA/IG5hdi5kb21JbnRlcmFjdGl2ZSAvIDEwMDAgOiB1bmRlZmluZWQsXHJcbiAgICBkb21Db21wbGV0ZTogbmF2ID8gbmF2LmRvbUNvbXBsZXRlIC8gMTAwMCA6IHVuZGVmaW5lZCxcclxuICAgIHJlbmRlcjogbmF2ID8gKG5hdi5yZXNwb25zZUVuZCAtIG5hdi5yZXF1ZXN0U3RhcnQpIC8gMTAwMCA6IHVuZGVmaW5lZCxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYWNrU2Nyb2xsKCkge1xyXG4gIC8vIFRocm90dGxlIHRoZSBjYWxjdWxhdGlvbnMgdG8gbm8gbW9yZSB0aGFuIGZpdmUgcGVyIHNlY29uZFxyXG4gIGlmIChwYXVzZVNjcm9sbGluZykgcmV0dXJuXHJcbiAgcGF1c2VTY3JvbGxpbmcgPSB0cnVlXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBwYXVzZVNjcm9sbGluZyA9IGZhbHNlXHJcbiAgfSwgMjAwKVxyXG5cclxuICAvLyBVcGRhdGUgbWF4aW11bSBzY3JvbGwgcG9zaXRpb24gcmVhY2hlZFxyXG4gIGNvbnN0IHNjcm9sbFBpeGVscyA9IHdpbmRvdy5zY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0XHJcbiAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBzY3JvbGxQaXhlbHMgLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0XHJcbiAgaWYgKHNjcm9sbFBvc2l0aW9uID4gbWF4U2Nyb2xsWSkgbWF4U2Nyb2xsWSA9IHNjcm9sbFBvc2l0aW9uXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRFeGl0KCkge1xyXG4gIGlmIChzZW50RXhpdCkgcmV0dXJuXHJcbiAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSAhPT0gJ2hpZGRlbicpIHJldHVyblxyXG4gIHNlbnRFeGl0ID0gdHJ1ZVxyXG4gIGNvbnN0IHsgcmVuZGVyLCBmaXJzdENvbnRlbnRmdWxQYWludCwgZG9tSW50ZXJhY3RpdmUsIGRvbUNvbXBsZXRlIH0gPSBnZXRQZXJmb3JtYW5jZSgpXHJcbiAgcmV0dXJuIHNlbmRFdmVudCh7XHJcbiAgICB0eXBlOiBFdmVudFR5cGUuZXhpdCxcclxuICAgIGV4aXRfcmVuZGVyX2R1cmF0aW9uOiByZW5kZXIsXHJcbiAgICBleGl0X2ZpcnN0X3BhaW50OiBmaXJzdENvbnRlbnRmdWxQYWludCxcclxuICAgIGV4aXRfZG9tX2ludGVyYWN0aXZlOiBkb21JbnRlcmFjdGl2ZSxcclxuICAgIGV4aXRfZG9tX2NvbXBsZXRlOiBkb21Db21wbGV0ZSxcclxuICAgIGV4aXRfdmlzaXRfZHVyYXRpb246IChEYXRlLm5vdygpIC0gc3RhcnRWaXNpdFRpbWUpIC8gMTAwMCxcclxuICAgIGV4aXRfc2Nyb2xsX2xlbmd0aDogbWF4U2Nyb2xsWSxcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UGFnZUV2ZW50KCkge1xyXG4gIGNvbnN0IHBhZ2VFdmVudCA9IHNlbmRFdmVudCh7IHR5cGU6IEV2ZW50VHlwZS5wYWdlIH0pXHJcbiAgcGFnZUV2ZW50SWQgPSBwYWdlRXZlbnQ/LmNvbnRleHQ/LmV2ZW50X2lkXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDbGlwYm9hcmRFdmVudCgpIHtcclxuICA7Wydjb3B5JywgJ2N1dCcsICdwYXN0ZSddLmZvckVhY2goKHZlcmIpID0+IHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHZlcmIsICgpID0+IHtcclxuICAgICAgc2VuZEV2ZW50KHsgdHlwZTogRXZlbnRUeXBlLmNsaXBib2FyZCwgY2xpcGJvYXJkX29wZXJhdGlvbjogdmVyYiB9KVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0TGlua0V2ZW50KCkge1xyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTEVsZW1lbnRcclxuICAgIGNvbnN0IGxpbmsgPSB0YXJnZXQuY2xvc2VzdCgnYVtocmVmXj1cImh0dHBcIl0nKSBhcyBIVE1MQW5jaG9yRWxlbWVudFxyXG4gICAgaWYgKCFsaW5rKSByZXR1cm5cclxuICAgIHNlbmRFdmVudCh7XHJcbiAgICAgIHR5cGU6IEV2ZW50VHlwZS5saW5rLFxyXG4gICAgICBsaW5rX3VybDogbGluay5ocmVmLFxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RXhpdEV2ZW50KCkge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbClcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgc2VuZEV4aXQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXROYXZpZ2F0ZUV2ZW50KCkge1xyXG4gIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItcHJvZHVjdHMnKSkgcmV0dXJuXHJcblxyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXItcHJvZHVjdHMgZGV0YWlscycpKS5mb3JFYWNoKChkZXRhaWxzKSA9PlxyXG4gICAgZGV0YWlscy5hZGRFdmVudExpc3RlbmVyKCd0b2dnbGUnLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTERldGFpbHNFbGVtZW50XHJcbiAgICAgIHNlbmRFdmVudCh7XHJcbiAgICAgICAgdHlwZTogRXZlbnRUeXBlLm5hdmlnYXRlLFxyXG4gICAgICAgIG5hdmlnYXRlX2xhYmVsOiBgZGV0YWlscyAke3RhcmdldC5vcGVuID8gJ29wZW4nIDogJ2Nsb3NlJ306ICR7XHJcbiAgICAgICAgICB0YXJnZXQ/LnF1ZXJ5U2VsZWN0b3IoJ3N1bW1hcnknKT8uaW5uZXJUZXh0XHJcbiAgICAgICAgfWAsXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIClcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItcHJvZHVjdHMnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50XHJcbiAgICBjb25zdCBsaW5rID0gdGFyZ2V0LmNsb3Nlc3QoJ2EnKSBhcyBIVE1MQW5jaG9yRWxlbWVudFxyXG4gICAgaWYgKCFsaW5rKSByZXR1cm5cclxuICAgIHNlbmRFdmVudCh7XHJcbiAgICAgIHR5cGU6IEV2ZW50VHlwZS5uYXZpZ2F0ZSxcclxuICAgICAgbmF2aWdhdGVfbGFiZWw6IGBsaW5rOiAke2xpbmsuaHJlZn1gLFxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xyXG4gIGluaXRQYWdlRXZlbnQoKSAvLyBtdXN0IGNvbWUgZmlyc3RcclxuICBpbml0RXhpdEV2ZW50KClcclxuICBpbml0TGlua0V2ZW50KClcclxuICBpbml0Q2xpcGJvYXJkRXZlbnQoKVxyXG4gIGluaXROYXZpZ2F0ZUV2ZW50KClcclxuICAvLyBwcmludCBldmVudCBpbiAuL3ByaW50LmpzXHJcbiAgLy8gc3VydmV5IGV2ZW50IGluIC4vc3VydmV5LmpzXHJcbiAgLy8gZXhwZXJpbWVudCBldmVudCBpbiAuL2V4cGVyaW1lbnQuanNcclxuICAvLyBzZWFyY2ggZXZlbnQgaW4gLi9zZWFyY2guanNcclxuICAvLyByZWRpcmVjdCBldmVudCBpbiBtaWRkbGV3YXJlL3JlY29yZC1yZWRpcmVjdC5qc1xyXG4gIC8vIHByZWZlcmVuY2UgZXZlbnQgaW4gLi9kaXNwbGF5LXRvb2wtc3BlY2lmaWMtY29udGVudC5qc1xyXG59XHJcbiIsImltcG9ydCBtdXJtdXIgZnJvbSAnaW11cm11cmhhc2gnXHJcbmltcG9ydCB7IGdldFVzZXJFdmVudHNJZCwgc2VuZEV2ZW50LCBFdmVudFR5cGUgfSBmcm9tICcuL2V2ZW50cydcclxuXHJcbmNvbnN0IFRSRUFUTUVOVCA9ICdUUkVBVE1FTlQnXHJcbmNvbnN0IENPTlRST0wgPSAnQ09OVFJPTCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWNrZXQodGVzdDogc3RyaW5nKSB7XHJcbiAgY29uc3QgaWQgPSBnZXRVc2VyRXZlbnRzSWQoKVxyXG4gIGNvbnN0IGhhc2ggPSBtdXJtdXIodGVzdCkuaGFzaChpZCkucmVzdWx0KClcclxuICByZXR1cm4gaGFzaCAlIDIgPyBUUkVBVE1FTlQgOiBDT05UUk9MXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZW5kU3VjY2Vzcyh0ZXN0OiBzdHJpbmcpIHtcclxuICByZXR1cm4gc2VuZEV2ZW50KHtcclxuICAgIHR5cGU6IEV2ZW50VHlwZS5leHBlcmltZW50LFxyXG4gICAgZXhwZXJpbWVudF9uYW1lOiB0ZXN0LFxyXG4gICAgZXhwZXJpbWVudF92YXJpYXRpb246IGJ1Y2tldCh0ZXN0KS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgZXhwZXJpbWVudF9zdWNjZXNzOiB0cnVlLFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICAvLyAqKiogRXhhbXBsZSB0ZXN0IGNvZGUgKioqXHJcbiAgLy8gY29uc3QgdGVzdE5hbWUgPSAnJHRlc3QtbmFtZSQnXHJcbiAgLy8gY29uc3QgeGJ1Y2tldCA9IGJ1Y2tldCh0ZXN0TmFtZSlcclxuICAvLyBjb25zdCB4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciguLi4pXHJcbiAgLy8geC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgc2VuZFN1Y2Nlc3ModGVzdE5hbWUpIH0pXHJcbiAgLy8gaWYgKHhidWNrZXQgPT09IFRSRUFUTUVOVCkgYXBwbHlUcmVhdG1lbnQoeClcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDc3JmKCkge1xyXG4gIGNvbnN0IGNzcmZFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKVxyXG4gIGlmICghY3NyZkVsKSByZXR1cm4gJydcclxuICByZXR1cm4gY3NyZkVsLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0TmV4dEVudigpIHtcclxuICAvLyBAdHMtaWdub3JlXHJcbiAgd2luZG93LklTX05FWFRKU19QQUdFID0gISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjX19uZXh0JylcclxufVxyXG4iLCIvLyBBIHRpbnkgdXNlciBhZ2VudCBjaGVja2luZyBSZWdFeHAgZm9yIGFuYWx5dGljcyBwdXJwb3Nlc1xyXG5cclxuLy8gVGhlIG9yZGVyIG1hdHRlcnMgd2l0aCB0aGVzZVxyXG5jb25zdCBPU19SRUdFWFBTID0gW1xyXG4gIC8oaXBob25lIG9zfGlwYWQgb3MpIChbXik7XSspL2ksXHJcbiAgLyhtYWMpIG9zIHggKFteKTtdKykvaSxcclxuICAvKHdpbmRvd3MpIChbXik7XSspL2ksXHJcbiAgLyhhbmRyb2lkKSAoW14pO10rKS9pLFxyXG4gIC8oY3JvcykgKFteKTtdKykvaSxcclxuICAvKGxpbnV4KSAoW14pO10rKS9pLFxyXG5dXHJcblxyXG4vLyBUaGUgb3JkZXIgbWF0dGVycyB3aXRoIHRoZXNlXHJcbmNvbnN0IEJST1dTRVJfUkVHRVhQUyA9IFtcclxuICAvKGZpcmVmb3gpXFwvKFteXFxzKV0rKS9pLFxyXG4gIC8oZWRnZSlcXC8oW15cXHMpXSspL2ksXHJcbiAgLyhjaHJvbWUpXFwvKFteXFxzKV0rKS9pLFxyXG4gIC8oc2FmYXJpKVxcLyhbXlxccyldKykvaSxcclxuICAvbXMoaWUpXFwvKFteXFxzKV0rKS9pLFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVVzZXJBZ2VudCh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcclxuICB1YSA9IHVhLnRvTG93ZXJDYXNlKClcclxuICBjb25zdCBvc1JlID0gT1NfUkVHRVhQUy5maW5kKChyZSkgPT4gcmUudGVzdCh1YSkpXHJcbiAgbGV0IFssIG9zID0gJ290aGVyJywgb3NfdmVyc2lvbiA9ICcwJ10gPSAob3NSZSAmJiB1YS5tYXRjaChvc1JlKSkgfHwgW11cclxuICBpZiAob3MgPT09ICdpcGhvbmUgb3MnIHx8IG9zID09PSAnaXBhZCBvcycpIG9zID0gJ2lvcydcclxuICBjb25zdCBicm93c2VyUmUgPSBCUk9XU0VSX1JFR0VYUFMuZmluZCgocmUpID0+IHJlLnRlc3QodWEpKVxyXG4gIGNvbnN0IFssIGJyb3dzZXIgPSAnb3RoZXInLCBicm93c2VyX3ZlcnNpb24gPSAnMCddID0gKGJyb3dzZXJSZSAmJiB1YS5tYXRjaChicm93c2VyUmUpKSB8fCBbXVxyXG4gIHJldHVybiB7IG9zLCBvc192ZXJzaW9uLCBicm93c2VyLCBicm93c2VyX3ZlcnNpb24gfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO3ZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0PXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmRlZmF1bHQ9dm9pZCAwO3ZhciBfcmVhY3Q9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO3ZhciBfdXRpbHM9cmVxdWlyZShcIi4uL25leHQtc2VydmVyL2xpYi91dGlsc1wiKTtleHBvcnRzLkFwcEluaXRpYWxQcm9wcz1fdXRpbHMuQXBwSW5pdGlhbFByb3BzO2V4cG9ydHMuTmV4dFdlYlZpdGFsc01ldHJpYz1fdXRpbHMuTmV4dFdlYlZpdGFsc01ldHJpYzsvKipcbiAqIGBBcHBgIGNvbXBvbmVudCBpcyB1c2VkIGZvciBpbml0aWFsaXplIG9mIHBhZ2VzLiBJdCBhbGxvd3MgZm9yIG92ZXJ3cml0aW5nIGFuZCBmdWxsIGNvbnRyb2wgb2YgdGhlIGBwYWdlYCBpbml0aWFsaXphdGlvbi5cbiAqIFRoaXMgYWxsb3dzIGZvciBrZWVwaW5nIHN0YXRlIGJldHdlZW4gbmF2aWdhdGlvbiwgY3VzdG9tIGVycm9yIGhhbmRsaW5nLCBpbmplY3RpbmcgYWRkaXRpb25hbCBkYXRhLlxuICovYXN5bmMgZnVuY3Rpb24gYXBwR2V0SW5pdGlhbFByb3BzKHtDb21wb25lbnQsY3R4fSl7Y29uc3QgcGFnZVByb3BzPWF3YWl0KDAsX3V0aWxzLmxvYWRHZXRJbml0aWFsUHJvcHMpKENvbXBvbmVudCxjdHgpO3JldHVybntwYWdlUHJvcHN9O31jbGFzcyBBcHAgZXh0ZW5kcyBfcmVhY3QuZGVmYXVsdC5Db21wb25lbnR7cmVuZGVyKCl7Y29uc3R7Q29tcG9uZW50LHBhZ2VQcm9wc309dGhpcy5wcm9wcztyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChDb21wb25lbnQscGFnZVByb3BzKTt9fWV4cG9ydHMuZGVmYXVsdD1BcHA7QXBwLm9yaWdHZXRJbml0aWFsUHJvcHM9YXBwR2V0SW5pdGlhbFByb3BzO0FwcC5nZXRJbml0aWFsUHJvcHM9YXBwR2V0SW5pdGlhbFByb3BzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9X2FwcC5qcy5tYXAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBBcHAgZnJvbSAnbmV4dC9hcHAnXHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMsIEFwcENvbnRleHQgfSBmcm9tICduZXh0L2FwcCdcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgeyB1c2VUaGVtZSwgVGhlbWVQcm92aWRlciB9IGZyb20gJ0BwcmltZXIvY29tcG9uZW50cydcclxuaW1wb3J0IHsgZGVmYXVsdFRoZW1lUHJvcHMsIGdldFRoZW1lUHJvcHMgfSBmcm9tICdjb21wb25lbnRzL2xpYi9nZXRUaGVtZVByb3BzJ1xyXG5cclxuaW1wb3J0ICcuLi9zdHlsZXNoZWV0cy9pbmRleC5zY3NzJ1xyXG5cclxuaW1wb3J0IGV2ZW50cyBmcm9tICdqYXZhc2NyaXB0cy9ldmVudHMnXHJcbmltcG9ydCBleHBlcmltZW50IGZyb20gJ2phdmFzY3JpcHRzL2V4cGVyaW1lbnQnXHJcbmltcG9ydCBzZXROZXh0RW52IGZyb20gJ2phdmFzY3JpcHRzL3NldC1uZXh0LWVudidcclxuXHJcbnR5cGUgTXlBcHBQcm9wcyA9IEFwcFByb3BzICYgeyBjc3JmVG9rZW46IHN0cmluZzsgdGhlbWVQcm9wczogdHlwZW9mIGRlZmF1bHRUaGVtZVByb3BzIH1cclxuY29uc3QgTXlBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcywgY3NyZlRva2VuLCB0aGVtZVByb3BzIH06IE15QXBwUHJvcHMpID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZXZlbnRzKClcclxuICAgIGV4cGVyaW1lbnQoKVxyXG4gICAgc2V0TmV4dEVudigpXHJcbiAgfSwgW10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8SGVhZD5cclxuICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxyXG4gICAgICAgIDx0aXRsZT5CYXlEaUcgV2lraTwvdGl0bGU+XHJcbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cclxuXHJcbiAgICAgICAgPGxpbmsgcmVsPVwiYWx0ZXJuYXRlIGljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cIi9hc3NldHMvaW1hZ2VzL3NpdGUvZmF2aWNvbi5wbmdcIiAvPlxyXG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGhyZWY9XCIvYXNzZXRzL2ltYWdlcy9zaXRlL2Zhdmljb24uc3ZnXCIgLz5cclxuXHJcbiAgICAgICAgPG1ldGFcclxuICAgICAgICAgIG5hbWU9XCJnb29nbGUtc2l0ZS12ZXJpZmljYXRpb25cIlxyXG4gICAgICAgICAgY29udGVudD1cIk9nZFFjMEdaZmpESTUyd0R2MWJrTVQtU0xwQlVvX2g1bm45bUk5TDIyeFFcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPG1ldGFcclxuICAgICAgICAgIG5hbWU9XCJnb29nbGUtc2l0ZS12ZXJpZmljYXRpb25cIlxyXG4gICAgICAgICAgY29udGVudD1cImMxa3VELUsySElWRjYzNWx5cGNzV1BvRDRraWxvNS1qQV93QkZ5VDR1TVlcIlxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJjc3JmLXRva2VuXCIgY29udGVudD17Y3NyZlRva2VufSAvPlxyXG4gICAgICA8L0hlYWQ+XHJcbiAgICAgIDxUaGVtZVByb3ZpZGVyPlxyXG4gICAgICAgIDxTZXRUaGVtZSB0aGVtZVByb3BzPXt0aGVtZVByb3BzfSAvPlxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgPC9UaGVtZVByb3ZpZGVyPlxyXG4gICAgPC8+XHJcbiAgKVxyXG59XHJcblxyXG5NeUFwcC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoYXBwQ29udGV4dDogQXBwQ29udGV4dCkgPT4ge1xyXG4gIGNvbnN0IHsgY3R4IH0gPSBhcHBDb250ZXh0XHJcbiAgLy8gY2FsbHMgcGFnZSdzIGBnZXRJbml0aWFsUHJvcHNgIGFuZCBmaWxscyBgYXBwUHJvcHMucGFnZVByb3BzYFxyXG4gIGNvbnN0IGFwcFByb3BzID0gYXdhaXQgQXBwLmdldEluaXRpYWxQcm9wcyhhcHBDb250ZXh0KVxyXG4gIGNvbnN0IHJlcTogYW55ID0gY3R4LnJlcVxyXG5cclxuICByZXR1cm4geyAuLi5hcHBQcm9wcywgdGhlbWVQcm9wczogZ2V0VGhlbWVQcm9wcyhyZXEpLCBjc3JmVG9rZW46IHJlcT8uY3NyZlRva2VuPy4oKSB8fCAnJyB9XHJcbn1cclxuXHJcbmNvbnN0IFNldFRoZW1lID0gKHsgdGhlbWVQcm9wcyB9OiB7IHRoZW1lUHJvcHM6IHR5cGVvZiBkZWZhdWx0VGhlbWVQcm9wcyB9KSA9PiB7XHJcbiAgLy8gQ2F1c2UgcHJpbWVyL2NvbXBvbmVudHMgdG8gcmUtZXZhbHVhdGUgdGhlICdhdXRvJyBjb2xvciBtb2RlIG9uIGNsaWVudCBzaWRlIHJlbmRlclxyXG4gIGNvbnN0IHsgc2V0Q29sb3JNb2RlIH0gPSB1c2VUaGVtZSgpXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBzZXRDb2xvck1vZGUodGhlbWVQcm9wcy5jb2xvck1vZGUgYXMgYW55KVxyXG4gICAgfSlcclxuICB9LCBbXSlcclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxyXG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBwcmltZXIvY29tcG9uZW50c1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW11cm11cmhhc2hcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzLWNvb2tpZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscy5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOzsiXSwic291cmNlUm9vdCI6IiJ9
exports.id = 143;
exports.ids = [143];
exports.modules = {

/***/ 6143:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "tw": function() { return /* binding */ EventType; },
  "ZP": function() { return /* binding */ initializeEvents; },
  "qP": function() { return /* binding */ sendEvent; }
});

// UNUSED EXPORTS: getUserEventsId

// EXTERNAL MODULE: external "uuid"
var external_uuid_ = __webpack_require__(1231);
// EXTERNAL MODULE: external "js-cookie"
var external_js_cookie_ = __webpack_require__(6155);
var external_js_cookie_default = /*#__PURE__*/__webpack_require__.n(external_js_cookie_);
;// CONCATENATED MODULE: ./javascripts/get-csrf.ts
function getCsrf() {
  const csrfEl = document.querySelector('meta[name="csrf-token"]');
  if (!csrfEl) return '';
  return csrfEl.getAttribute('content');
}
// EXTERNAL MODULE: ./javascripts/user-agent.ts
var user_agent = __webpack_require__(3162);
;// CONCATENATED MODULE: ./javascripts/events.ts
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
  cookieValue = external_js_cookie_default().get(COOKIE_NAME);
  if (cookieValue) return cookieValue;
  cookieValue = (0,external_uuid_.v4)();
  external_js_cookie_default().set(COOKIE_NAME, cookieValue, {
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
    _csrf: getCsrf(),
    type,
    context: _objectSpread(_objectSpread({
      // Primitives
      event_id: (0,external_uuid_.v4)(),
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
    }, (0,user_agent/* default */.Z)()), {}, {
      viewport_width: document.documentElement.clientWidth,
      viewport_height: document.documentElement.clientHeight,
      // Location information
      timezone: new Date().getTimezoneOffset() / -60,
      user_language: navigator.language,
      // Preference information
      application_preference: external_js_cookie_default().get('toolPreferred')
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

/***/ 3162:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ parseUserAgent; }
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

/***/ })

};
;
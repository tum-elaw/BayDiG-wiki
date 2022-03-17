(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3397:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _app; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__(7544);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "@primer/components"
var components_ = __webpack_require__(988);
// EXTERNAL MODULE: ./components/lib/getThemeProps.tsx
var getThemeProps = __webpack_require__(5019);
// EXTERNAL MODULE: ./javascripts/events.ts + 1 modules
var events = __webpack_require__(6143);
;// CONCATENATED MODULE: external "imurmurhash"
var external_imurmurhash_namespaceObject = require("imurmurhash");;
;// CONCATENATED MODULE: ./javascripts/experiment.ts


const TREATMENT = 'TREATMENT';
const CONTROL = 'CONTROL';
function bucket(test) {
  const id = getUserEventsId();
  const hash = murmur(test).hash(id).result();
  return hash % 2 ? TREATMENT : CONTROL;
}
function sendSuccess(test) {
  return sendEvent({
    type: EventType.experiment,
    experiment_name: test,
    experiment_variation: bucket(test).toLowerCase(),
    experiment_success: true
  });
}
/* harmony default export */ function experiment() {// *** Example test code ***
  // const testName = '$test-name$'
  // const xbucket = bucket(testName)
  // const x = document.querySelector(...)
  // x.addEventListener('click', () => { sendSuccess(testName) })
  // if (xbucket === TREATMENT) applyTreatment(x)
}
;// CONCATENATED MODULE: ./javascripts/set-next-env.ts
function setNextEnv() {
  // @ts-ignore
  window.IS_NEXTJS_PAGE = !!document.querySelector('#__next');
}
;// CONCATENATED MODULE: ./pages/_app.tsx




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const MyApp = ({
  Component,
  pageProps,
  csrfToken,
  themeProps
}) => {
  (0,external_react_.useEffect)(() => {
    (0,events/* default */.ZP)();
    experiment();
    setNextEnv();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("meta", {
        charSet: "utf-8"
      }), /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "BayDiG Wiki"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "alternate icon",
        type: "image/png",
        href: "/assets/images/site/favicon.png"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/images/site/favicon.svg"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "google-site-verification",
        content: "OgdQc0GZfjDI52wDv1bkMT-SLpBUo_h5nn9mI9L22xQ"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "google-site-verification",
        content: "c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "csrf-token",
        content: csrfToken
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(components_.ThemeProvider, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(SetTheme, {
        themeProps: themeProps
      }), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
    })]
  });
};

MyApp.getInitialProps = async appContext => {
  var _req$csrfToken;

  const {
    ctx
  } = appContext; // calls page's `getInitialProps` and fills `appProps.pageProps`

  const appProps = await app.default.getInitialProps(appContext);
  const req = ctx.req;
  return _objectSpread(_objectSpread({}, appProps), {}, {
    themeProps: (0,getThemeProps/* getThemeProps */.Ot)(req),
    csrfToken: (req === null || req === void 0 ? void 0 : (_req$csrfToken = req.csrfToken) === null || _req$csrfToken === void 0 ? void 0 : _req$csrfToken.call(req)) || ''
  });
};

const SetTheme = ({
  themeProps
}) => {
  // Cause primer/components to re-evaluate the 'auto' color mode on client side render
  const {
    setColorMode
  } = (0,components_.useTheme)();
  (0,external_react_.useEffect)(() => {
    setTimeout(() => {
      setColorMode(themeProps.colorMode);
    });
  }, []);
  return null;
};

/* harmony default export */ var _app = (MyApp);

/***/ }),

/***/ 988:
/***/ (function(module) {

"use strict";
module.exports = require("@primer/components");;

/***/ }),

/***/ 6155:
/***/ (function(module) {

"use strict";
module.exports = require("js-cookie");;

/***/ }),

/***/ 7579:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ 701:
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ }),

/***/ 1231:
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
var __webpack_exports__ = __webpack_require__.X(0, [544,143,19], function() { return __webpack_exec__(3397); });
module.exports = __webpack_exports__;

})();
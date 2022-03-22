(function() {
var exports = {};
exports.id = 344;
exports.ids = [344];
exports.modules = {

/***/ 7631:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GQLExplorer; },
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_context_MainContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1013);
/* harmony import */ var components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4054);
/* harmony import */ var components_DefaultLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8977);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);






function GQLExplorer({
  mainContext,
  graphqlExplorerUrl
}) {
  const {
    page,
    airGap
  } = mainContext;
  const graphiqlRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (false) { var _graphiqlRef$current, _graphiqlRef$current$; }
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_context_MainContext__WEBPACK_IMPORTED_MODULE_1__/* .MainContext.Provider */ .Tr.Provider, {
    value: mainContext,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_DefaultLayout__WEBPACK_IMPORTED_MODULE_3__/* .DefaultLayout */ .H, {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        className: "container-xl px-3 px-md-6 my-4 my-lg-4 d-xl-flex",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("article", {
          className: "markdown-body width-full",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "d-lg-flex flex-justify-between",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
              className: "d-flex flex-items-center breadcrumbs-wrapper",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__/* .Breadcrumbs */ .O, {})
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            className: "border-bottom-0",
            children: page.title
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "mt-2",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
              children: airGap ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: "GraphQL explorer is not available on this environment."
              }) :
              /*#__PURE__*/

              /* eslint-disable-next-line jsx-a11y/iframe-has-title */
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("iframe", {
                ref: graphiqlRef,
                id: "graphiql",
                scrolling: "no",
                src: graphqlExplorerUrl,
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                  children: "You must have iframes enabled to use this feature."
                })
              })
            })
          })]
        })
      })
    })
  });
}
const getServerSideProps = async context => {
  const req = context.req;
  return {
    props: {
      mainContext: (0,components_context_MainContext__WEBPACK_IMPORTED_MODULE_1__/* .getMainContextFromRequest */ .tO)(req),
      graphqlExplorerUrl: req.context.graphql.explorerUrl
    }
  };
};

/***/ }),

/***/ 988:
/***/ (function(module) {

"use strict";
module.exports = require("@primer/components");;

/***/ }),

/***/ 3887:
/***/ (function(module) {

"use strict";
module.exports = require("@primer/octicons-react");;

/***/ }),

/***/ 4058:
/***/ (function(module) {

"use strict";
module.exports = require("classnames");;

/***/ }),

/***/ 6155:
/***/ (function(module) {

"use strict";
module.exports = require("js-cookie");;

/***/ }),

/***/ 223:
/***/ (function(module) {

"use strict";
module.exports = require("lodash/debounce");;

/***/ }),

/***/ 2566:
/***/ (function(module) {

"use strict";
module.exports = require("lodash/get");;

/***/ }),

/***/ 9116:
/***/ (function(module) {

"use strict";
module.exports = require("lodash/pick");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 701:
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

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

/***/ 9914:
/***/ (function(module) {

"use strict";
module.exports = require("styled-components");;

/***/ }),

/***/ 3289:
/***/ (function(module) {

"use strict";
module.exports = require("styled-jsx/style");;

/***/ }),

/***/ 1231:
/***/ (function(module) {

"use strict";
module.exports = require("uuid");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,143,368,977,54], function() { return __webpack_exec__(7631); });
module.exports = __webpack_exports__;

})();
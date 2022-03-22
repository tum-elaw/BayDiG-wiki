exports.id = 201;
exports.ids = [201];
exports.modules = {

/***/ 1541:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": function() { return /* binding */ TruncateLines; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3289);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4058);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);





const TruncateLines = props => {
  const {
    as,
    maxLines,
    className,
    children
  } = props;
  const Component = as || 'div';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Component, {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default().dynamic([["2410937954", [maxLines]]]) + " " + (classnames__WEBPACK_IMPORTED_MODULE_3___default()('root', className) || ""),
    children: [children, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default()), {
      id: "2410937954",
      dynamic: [maxLines],
      children: [`.root.__jsx-style-dynamic-selector{display:-webkit-box;-webkit-line-clamp:${maxLines};-webkit-box-orient:vertical;overflow:hidden;}`]
    })]
  });
};

/***/ }),

/***/ 5201:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": function() { return /* binding */ ArticleList; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4058);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8349);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6359);
/* harmony import */ var _primer_octicons_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3887);
/* harmony import */ var _primer_octicons_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_primer_octicons_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var components_TruncateLines__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1541);








const ArticleList = ({
  title,
  viewAllHref,
  articles,
  variant = 'compact',
  titleVariant = 'default'
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mb-4 d-flex flex-items-baseline",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(titleVariant === 'large' ? 'f4 text-normal text-mono text-uppercase' : 'f5 text-normal text-mono underline-dashed color-text-secondary'),
        children: title
      }), viewAllHref && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(components_Link__WEBPACK_IMPORTED_MODULE_3__/* .Link */ .r, {
        href: viewAllHref,
        className: "ml-4",
        children: ["View all ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_primer_octicons_react__WEBPACK_IMPORTED_MODULE_4__.ArrowRightIcon, {
          size: 14,
          className: "v-align-middle"
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
      className: "list-style-none",
      "data-testid": "article-list",
      children: articles.map(link => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(variant === 'compact' && 'border-top'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(components_Link__WEBPACK_IMPORTED_MODULE_3__/* .Link */ .r, {
            href: link.href,
            className: "link-with-intro Bump-link--hover no-underline d-block py-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
              className: "link-with-intro-title",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                dangerouslySetInnerHTML: {
                  __html: link.title
                }
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "Bump-link-symbol",
                children: "\u2192"
              })]
            }), !link.hideIntro && link.intro && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_TruncateLines__WEBPACK_IMPORTED_MODULE_5__/* .TruncateLines */ .u, {
              as: "p",
              maxLines: variant === 'spaced' ? 6 : 2,
              className: "link-with-intro-intro color-text-secondary mb-0 mt-1",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                dangerouslySetInnerHTML: {
                  __html: link.intro
                }
              })
            }), link.date && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
              className: "tooltipped tooltipped-n color-text-tertiary text-mono mt-1",
              "aria-label": dayjs__WEBPACK_IMPORTED_MODULE_2___default()(link.date).format('LLL'),
              children: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(link.date).format('MMMM DD')
            })]
          })
        }, link.href);
      })
    })]
  });
};

/***/ })

};
;
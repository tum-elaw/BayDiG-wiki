(function() {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

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

/***/ "./node_modules/next/dist/client/head-manager.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/head-manager.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.default = initHeadManager;
exports.DOMAttributeNames = void 0;
const DOMAttributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;

function reactElementToDOM({
  type,
  props
}) {
  const el = document.createElement(type);

  for (const p in props) {
    if (!props.hasOwnProperty(p)) continue;
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue; // we don't render undefined props to the DOM

    if (props[p] === undefined) continue;
    const attr = DOMAttributeNames[p] || p.toLowerCase();

    if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
      ;
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  const {
    children,
    dangerouslySetInnerHTML
  } = props;

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }

  return el;
}

function updateElements(type, components) {
  const headEl = document.getElementsByTagName('head')[0];
  const headCountEl = headEl.querySelector('meta[name=next-head-count]');

  if (true) {
    if (!headCountEl) {
      console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
      return;
    }
  }

  const headCount = Number(headCountEl.content);
  const oldTags = [];

  for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = j.previousElementSibling) {
    if (j.tagName.toLowerCase() === type) {
      oldTags.push(j);
    }
  }

  const newTags = components.map(reactElementToDOM).filter(newTag => {
    for (let k = 0, len = oldTags.length; k < len; k++) {
      const oldTag = oldTags[k];

      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(k, 1);
        return false;
      }
    }

    return true;
  });
  oldTags.forEach(t => t.parentNode.removeChild(t));
  newTags.forEach(t => headEl.insertBefore(t, headCountEl));
  headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}

function initHeadManager() {
  let updatePromise = null;
  return {
    mountedInstances: new Set(),
    updateHead: head => {
      const promise = updatePromise = Promise.resolve().then(() => {
        if (promise !== updatePromise) return;
        updatePromise = null;
        const tags = {};
        head.forEach(h => {
          if ( // If the font tag is loaded only on client navigation
          // it won't be inlined. In this case revert to the original behavior
          h.type === 'link' && h.props['data-optimized-fonts'] && !document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
            h.props.href = h.props['data-href'];
            h.props['data-href'] = undefined;
          }

          const components = tags[h.type] || [];
          components.push(h);
          tags[h.type] = components;
        });
        const titleComponent = tags.title ? tags.title[0] : null;
        let title = '';

        if (titleComponent) {
          const {
            children
          } = titleComponent.props;
          title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        }

        if (title !== document.title) document.title = title;
        ['meta', 'base', 'link', 'style', 'script'].forEach(type => {
          updateElements(type, tags[type] || []);
        });
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/script.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/script.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.initScriptLoader = initScriptLoader;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _react = __webpack_require__(/*! react */ "react");

var _headManagerContext = __webpack_require__(/*! ../next-server/lib/head-manager-context */ "../next-server/lib/head-manager-context");

var _headManager = __webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = ['onLoad', 'dangerouslySetInnerHTML', 'children', 'onError', 'strategy'];

const loadScript = props => {
  const {
    src,
    id,
    onLoad = () => {},
    dangerouslySetInnerHTML,
    children = '',
    onError
  } = props;
  const cacheKey = id || src;

  if (ScriptCache.has(src)) {
    if (!LoadCache.has(cacheKey)) {
      LoadCache.add(cacheKey); // Execute onLoad since the script loading has begun

      ScriptCache.get(src).then(onLoad, onError);
    }

    return;
  }

  const el = document.createElement('script');
  const loadPromise = new Promise((resolve, reject) => {
    el.addEventListener('load', function () {
      resolve();

      if (onLoad) {
        onLoad.call(this);
      }
    });
    el.addEventListener('error', function () {
      reject();

      if (onError) {
        onError();
      }
    });
  });

  if (src) {
    ScriptCache.set(src, loadPromise);
    LoadCache.add(cacheKey);
  }

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  } else if (src) {
    el.src = src;
  }

  for (const [k, value] of Object.entries(props)) {
    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
    el.setAttribute(attr, value);
  }

  document.body.appendChild(el);
};

function handleClientScriptLoad(props) {
  const {
    strategy = 'afterInteractive'
  } = props;

  if (strategy === 'afterInteractive') {
    loadScript(props);
  } else if (strategy === 'lazyOnload') {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback.requestIdleCallback)(() => loadScript(props));
    });
  }
}

function loadLazyScript(props) {
  if (document.readyState === 'complete') {
    (0, _requestIdleCallback.requestIdleCallback)(() => loadScript(props));
  } else {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback.requestIdleCallback)(() => loadScript(props));
    });
  }
}

function initScriptLoader(scriptLoaderItems) {
  scriptLoaderItems.forEach(handleClientScriptLoad);
}

function Script(props) {
  const {
    src = '',
    onLoad = () => {},
    strategy = 'afterInteractive',
    onError
  } = props,
        restProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["src", "onLoad", "dangerouslySetInnerHTML", "strategy", "onError"]); // Context is available only during SSR

  const {
    updateScripts,
    scripts
  } = (0, _react.useContext)(_headManagerContext.HeadManagerContext);
  (0, _react.useEffect)(() => {
    if (strategy === 'afterInteractive') {
      loadScript(props);
    } else if (strategy === 'lazyOnload') {
      loadLazyScript(props);
    }
  }, [props, strategy]);

  if (strategy === 'beforeInteractive') {
    if (updateScripts) {
      scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([(0, _extends2.default)({
        src,
        onLoad,
        onError
      }, restProps)]);
      updateScripts(scripts);
    }
  }

  return null;
}

var _default = Script;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

exports.__esModule = true;
exports.Html = Html;
exports.Main = Main;
exports.NextScript = exports.Head = exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../next-server/lib/constants */ "../next-server/lib/constants");

var _documentContext = __webpack_require__(/*! ../next-server/lib/document-context */ "../next-server/lib/document-context");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.DocumentContext = _utils.DocumentContext;
exports.DocumentInitialProps = _utils.DocumentInitialProps;
exports.DocumentProps = _utils.DocumentProps;

var _getPageFiles = __webpack_require__(/*! ../next-server/server/get-page-files */ "../next-server/server/get-page-files");

var _utils2 = __webpack_require__(/*! ../next-server/server/utils */ "../next-server/server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "./node_modules/next/dist/server/htmlescape.js");

var _script = _interopRequireDefault(__webpack_require__(/*! ../client/script */ "./node_modules/next/dist/client/script.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  const sharedFiles = (0, _getPageFiles.getPageFiles)(buildManifest, '/_app');
  const pageFiles = inAmpMode ? [] : (0, _getPageFiles.getPageFiles)(buildManifest, pathname);
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])]
  };
}

function getPolyfillScripts(context, props) {
  // polyfills.js has to be rendered as nomodule without async
  // It also has to be the first script to load
  const {
    assetPrefix,
    buildManifest,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return buildManifest.polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map(polyfill => /*#__PURE__*/_react.default.createElement("script", {
    key: polyfill,
    defer: !disableOptimizedLoading,
    nonce: props.nonce,
    crossOrigin: props.crossOrigin || undefined,
    noModule: true,
    src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
  }));
}

function getPreNextScripts(context, props) {
  const {
    scriptLoader,
    disableOptimizedLoading
  } = context;
  return (scriptLoader.beforeInteractive || []).map(file => {
    const {
      strategy
    } = file,
          scriptProps = _objectWithoutProperties(file, ["strategy"]);

    return /*#__PURE__*/_react.default.createElement("script", Object.assign({}, scriptProps, {
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    }));
  });
}

function getDynamicChunks(context, props, files) {
  const {
    dynamicImports,
    assetPrefix,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return dynamicImports.map(file => {
    if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
    return /*#__PURE__*/_react.default.createElement("script", {
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

function getScripts(context, props, files) {
  var _buildManifest$lowPri;

  const {
    assetPrefix,
    buildManifest,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  const normalScripts = files.allFiles.filter(file => file.endsWith('.js'));
  const lowPriorityScripts = (_buildManifest$lowPri = buildManifest.lowPriorityFiles) == null ? void 0 : _buildManifest$lowPri.filter(file => file.endsWith('.js'));
  return [...normalScripts, ...lowPriorityScripts].map(file => {
    return /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}
/**
* `Document` component handles the initial `document` markup and renders only on the server side.
* Commonly used for implementing server side rendering for `css-in-js` libraries.
*/


class Document extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhanceApp = App => {
      return props => /*#__PURE__*/_react.default.createElement(App, props);
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server.default)()];
    return {
      html,
      head,
      styles
    };
  }

  static renderDocument(DocumentComponent, props) {
    return /*#__PURE__*/_react.default.createElement(_documentContext.DocumentContext.Provider, {
      value: props
    }, /*#__PURE__*/_react.default.createElement(DocumentComponent, props));
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(Html, null, /*#__PURE__*/_react.default.createElement(Head, null), /*#__PURE__*/_react.default.createElement("body", null, /*#__PURE__*/_react.default.createElement(Main, null), /*#__PURE__*/_react.default.createElement(NextScript, null)));
  }

}

exports.default = Document;

function Html(props) {
  const {
    inAmpMode,
    docComponentsRendered,
    locale
  } = (0, _react.useContext)(_documentContext.DocumentContext);
  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react.default.createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

class Head extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).

    let unmangedFiles = new Set([]);
    let dynamicCssFiles = Array.from(new Set(dynamicImports.filter(file => file.endsWith('.css'))));

    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(f => !(existing.has(f) || sharedFiles.has(f)));
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    let cssLinkElements = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);

      if (true) {
        cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
          key: `${file}-preload`,
          nonce: this.props.nonce,
          rel: "preload",
          href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
          as: "style",
          crossOrigin: this.props.crossOrigin || undefined
        }));
      }

      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
        "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
      }));
    });

    if (false) {}

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dynamicImports.map(file => {
      if (!file.endsWith('.js')) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("link", {
        rel: "preload",
        key: file,
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      scriptLoader
    } = this.context;
    const preloadFiles = files.allFiles.filter(file => {
      return file.endsWith('.js');
    });
    return [...(scriptLoader.beforeInteractive || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file.src,
      nonce: this.props.nonce,
      rel: "preload",
      href: file.src,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...preloadFiles.map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    }))];
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  handleDocumentScriptLoaderItems(children) {
    const {
      scriptLoader
    } = this.context;
    const scriptLoaderItems = [];
    const filteredChildren = [];

    _react.default.Children.forEach(children, child => {
      if (child.type === _script.default) {
        if (child.props.strategy === 'beforeInteractive') {
          scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([_objectSpread({}, child.props)]);
          return;
        } else if (['lazyOnload', 'afterInteractive'].includes(child.props.strategy)) {
          scriptLoaderItems.push(child.props);
          return;
        }
      }

      filteredChildren.push(child);
    });

    this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
    return filteredChildren;
  }

  makeStylesheetInert(node) {
    return _react.default.Children.map(node, c => {
      if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(({
        url
      }) => c.props['href'].startsWith(url))) {
        const newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined;
        return /*#__PURE__*/_react.default.cloneElement(c, newProps);
      } else if (c.props && c.props['children']) {
        c.props['children'] = this.makeStylesheetInert(c.props['children']);
      }

      return c;
    });
  }

  render() {
    var _this$props$nonce, _this$props$nonce2;

    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
      unstable_runtimeJS,
      unstable_JsPreload,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
    this.context.docComponentsRendered.Head = true;
    let {
      head
    } = this.context;
    let cssPreloads = [];
    let otherHeadElements = [];

    if (head) {
      head.forEach(c => {
        if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
          cssPreloads.push(c);
        } else {
          c && otherHeadElements.push(c);
        }
      });
      head = cssPreloads.concat(otherHeadElements);
    }

    let children = _react.default.Children.toArray(this.props.children).filter(Boolean); // show a warning if Head contains <title> (only in development)


    if (true) {
      children = _react.default.Children.map(children, child => {
        var _child$props;

        const isReactHelmet = child == null ? void 0 : (_child$props = child.props) == null ? void 0 : _child$props['data-react-helmet'];

        if (!isReactHelmet) {
          var _child$props2;

          if ((child == null ? void 0 : child.type) === 'title') {
            console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
          } else if ((child == null ? void 0 : child.type) === 'meta' && (child == null ? void 0 : (_child$props2 = child.props) == null ? void 0 : _child$props2.name) === 'viewport') {
            console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
          }
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    if (false) {}

    children = this.handleDocumentScriptLoaderItems(children);
    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://nextjs.org/docs/messages/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => {
        var _el$props, _el$props$dangerously;

        return el == null ? void 0 : (_el$props = el.props) == null ? void 0 : (_el$props$dangerously = _el$props.dangerouslySetInnerHTML) == null ? void 0 : _el$props$dangerously.__html;
      }; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement("head", this.props, this.context.isDevelopment && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children,  false && /*#__PURE__*/0, head, /*#__PURE__*/_react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils2.cleanAmpPath)(dangerousAsPath)
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && /*#__PURE__*/_react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), /*#__PURE__*/_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react.default.createElement("noscript", {
      "data-n-css": (_this$props$nonce = this.props.nonce) != null ? _this$props$nonce : ''
    }),  false && /*#__PURE__*/0, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),  false && 0,  false && /*#__PURE__*/0, this.context.isDevelopment &&
    /*#__PURE__*/
    // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _documentContext.DocumentContext;
Head.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};

function Main() {
  const {
    inAmpMode,
    html,
    docComponentsRendered
  } = (0, _react.useContext)(_documentContext.DocumentContext);
  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _constants.AMP_RENDER_TARGET);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "__next",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}

class NextScript extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  static getInlineScriptSource(documentProps) {
    const {
      __NEXT_DATA__
    } = documentProps;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape.htmlEscapeJsonString)(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      assetPrefix,
      inAmpMode,
      buildManifest,
      unstable_runtimeJS,
      docComponentsRendered,
      devOnlyCacheBusterQueryString,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    docComponentsRendered.NextScript = true;

    if (inAmpMode) {
      if (false) {}

      const ampDevFiles = [...buildManifest.devFiles, ...buildManifest.polyfillFiles, ...buildManifest.ampDevFiles];
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        },
        "data-ampdevmode": true
      }), ampDevFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })));
    }

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context)
      }
    }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _documentContext.DocumentContext;
NextScript.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

/***/ }),

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MyDocument; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ "./node_modules/next/document.js");
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_lib_getThemeProps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/lib/getThemeProps */ "./components/lib/getThemeProps.tsx");


var _jsxFileName = "C:\\Users\\michi\\3D Objects\\baydig-wiki\\pages\\_document.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {
  static async getInitialProps(ctx) {
    const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_2__.ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, _objectSpread({}, props), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 15,
          columnNumber: 63
        }, this))
      });

      const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);
      return _objectSpread(_objectSpread({}, initialProps), {}, {
        cssThemeProps: (0,components_lib_getThemeProps__WEBPACK_IMPORTED_MODULE_3__.getThemeProps)(ctx.req, 'css'),
        styles: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [initialProps.styles, sheet.getStyleElement()]
        }, void 0, true)
      });
    } finally {
      sheet.seal();
    }
  }

  render() {
    const {
      colorMode,
      nightScheme,
      dayScheme
    } = this.props.cssThemeProps;
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("body", {
        "data-color-mode": colorMode,
        "data-dark-theme": nightScheme,
        "data-light-theme": dayScheme,
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, this);
  }

}

/***/ }),

/***/ "./node_modules/next/dist/server/htmlescape.js":
/*!*****************************************************!*\
  !*** ./node_modules/next/dist/server/htmlescape.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
exports.__esModule=true;exports.htmlEscapeJsonString=htmlEscapeJsonString;// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP={'&':'\\u0026','>':'\\u003e','<':'\\u003c','\u2028':'\\u2028','\u2029':'\\u2029'};const ESCAPE_REGEX=/[&><\u2028\u2029]/g;function htmlEscapeJsonString(str){return str.replace(ESCAPE_REGEX,match=>ESCAPE_LOOKUP[match]);}
//# sourceMappingURL=htmlescape.js.map

/***/ }),

/***/ "./node_modules/next/document.js":
/*!***************************************!*\
  !*** ./node_modules/next/document.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_document */ "./node_modules/next/dist/pages/_document.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js":
/*!**************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/extends.js ***!
  \**************************************************************************/
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

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

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***********************************************************************************************/
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../next-server/lib/constants":
/*!*********************************************************!*\
  !*** external "next/dist/next-server/lib/constants.js" ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/constants.js");;

/***/ }),

/***/ "../next-server/lib/document-context":
/*!****************************************************************!*\
  !*** external "next/dist/next-server/lib/document-context.js" ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/document-context.js");;

/***/ }),

/***/ "../next-server/lib/head-manager-context":
/*!********************************************************************!*\
  !*** external "next/dist/next-server/lib/head-manager-context.js" ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head-manager-context.js");;

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "../next-server/server/get-page-files":
/*!*****************************************************************!*\
  !*** external "next/dist/next-server/server/get-page-files.js" ***!
  \*****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/get-page-files.js");;

/***/ }),

/***/ "../next-server/server/utils":
/*!********************************************************!*\
  !*** external "next/dist/next-server/server/utils.js" ***!
  \********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/utils.js");;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

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

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-components");;

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-jsx/server");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_document.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9jb21wb25lbnRzL2xpYi9nZXRUaGVtZVByb3BzLnRzeCIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9oZWFkLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvcmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9wYWdlcy9fZG9jdW1lbnQudHN4Iiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3Qvc2VydmVyL2h0bWxlc2NhcGUuanMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vbm9kZV9tb2R1bGVzL25leHQvZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2NvbnN0YW50cy5qc1wiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvZG9jdW1lbnQtY29udGV4dC5qc1wiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9nZXQtcGFnZS1maWxlcy5qc1wiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCIiLCJ3ZWJwYWNrOi8vZG9jcy5naXRodWIuY29tL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9kb2NzLmdpdGh1Yi5jb20vZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiIiwid2VicGFjazovL2RvY3MuZ2l0aHViLmNvbS9leHRlcm5hbCBcInN0eWxlZC1qc3gvc2VydmVyXCIiXSwibmFtZXMiOlsiZGVmYXVsdENTU1RoZW1lUHJvcHMiLCJjb2xvck1vZGUiLCJuaWdodFNjaGVtZSIsImRheVNjaGVtZSIsImRlZmF1bHRUaGVtZVByb3BzIiwiY3NzQ29sb3JNb2RlVG9KcyIsImF1dG8iLCJsaWdodCIsImRhcmsiLCJnZXRUaGVtZVByb3BzIiwicmVxIiwibW9kZSIsImNvb2tpZVZhbHVlIiwiZGVmYXVsdFByb3BzIiwiY29va2llcyIsImNvbG9yX21vZGUiLCJKU09OIiwicGFyc2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJkYXJrX3RoZW1lIiwibmFtZSIsImxpZ2h0X3RoZW1lIiwiZXhwb3J0cyIsImluaXRIZWFkTWFuYWdlciIsIkRPTUF0dHJpYnV0ZU5hbWVzIiwiYWNjZXB0Q2hhcnNldCIsImNsYXNzTmFtZSIsImh0bWxGb3IiLCJodHRwRXF1aXYiLCJub01vZHVsZSIsInJlYWN0RWxlbWVudFRvRE9NIiwidHlwZSIsInByb3BzIiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJhdHRyIiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiaW5uZXJIVE1MIiwiX19odG1sIiwidGV4dENvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJqb2luIiwidXBkYXRlRWxlbWVudHMiLCJjb21wb25lbnRzIiwiaGVhZEVsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJoZWFkQ291bnRFbCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJoZWFkQ291bnQiLCJOdW1iZXIiLCJjb250ZW50Iiwib2xkVGFncyIsImkiLCJqIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJwdXNoIiwibmV3VGFncyIsIm1hcCIsImZpbHRlciIsIm5ld1RhZyIsImsiLCJsZW4iLCJsZW5ndGgiLCJvbGRUYWciLCJpc0VxdWFsTm9kZSIsInNwbGljZSIsImZvckVhY2giLCJ0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0QmVmb3JlIiwidG9TdHJpbmciLCJ1cGRhdGVQcm9taXNlIiwibW91bnRlZEluc3RhbmNlcyIsIlNldCIsInVwZGF0ZUhlYWQiLCJoZWFkIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsInRhZ3MiLCJoIiwiaHJlZiIsInRpdGxlQ29tcG9uZW50IiwidGl0bGUiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwic2VsZiIsImNiIiwic3RhcnQiLCJEYXRlIiwibm93Iiwic2V0VGltZW91dCIsImRpZFRpbWVvdXQiLCJ0aW1lUmVtYWluaW5nIiwiTWF0aCIsIm1heCIsImNhbmNlbElkbGVDYWxsYmFjayIsImlkIiwiY2xlYXJUaW1lb3V0IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJpbml0U2NyaXB0TG9hZGVyIiwiX2V4dGVuZHMyIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UyIiwiX3JlYWN0IiwiX2hlYWRNYW5hZ2VyQ29udGV4dCIsIl9oZWFkTWFuYWdlciIsIl9yZXF1ZXN0SWRsZUNhbGxiYWNrIiwiU2NyaXB0Q2FjaGUiLCJNYXAiLCJMb2FkQ2FjaGUiLCJpZ25vcmVQcm9wcyIsImxvYWRTY3JpcHQiLCJzcmMiLCJvbkxvYWQiLCJvbkVycm9yIiwiY2FjaGVLZXkiLCJoYXMiLCJhZGQiLCJnZXQiLCJsb2FkUHJvbWlzZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYWxsIiwic2V0IiwidmFsdWUiLCJPYmplY3QiLCJlbnRyaWVzIiwiaW5jbHVkZXMiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVDbGllbnRTY3JpcHRMb2FkIiwic3RyYXRlZ3kiLCJ3aW5kb3ciLCJsb2FkTGF6eVNjcmlwdCIsInJlYWR5U3RhdGUiLCJzY3JpcHRMb2FkZXJJdGVtcyIsIlNjcmlwdCIsInJlc3RQcm9wcyIsImRlZmF1bHQiLCJ1cGRhdGVTY3JpcHRzIiwic2NyaXB0cyIsInVzZUNvbnRleHQiLCJIZWFkTWFuYWdlckNvbnRleHQiLCJ1c2VFZmZlY3QiLCJiZWZvcmVJbnRlcmFjdGl2ZSIsImNvbmNhdCIsIl9kZWZhdWx0IiwiSHRtbCIsIk1haW4iLCJfcHJvcFR5cGVzIiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJfc2VydmVyIiwiX2NvbnN0YW50cyIsIl9kb2N1bWVudENvbnRleHQiLCJfdXRpbHMiLCJEb2N1bWVudENvbnRleHQiLCJEb2N1bWVudEluaXRpYWxQcm9wcyIsIkRvY3VtZW50UHJvcHMiLCJfZ2V0UGFnZUZpbGVzIiwiX3V0aWxzMiIsIl9odG1sZXNjYXBlIiwiX3NjcmlwdCIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIldlYWtNYXAiLCJjYWNoZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImRlc2MiLCJnZXREb2N1bWVudEZpbGVzIiwiYnVpbGRNYW5pZmVzdCIsInBhdGhuYW1lIiwiaW5BbXBNb2RlIiwic2hhcmVkRmlsZXMiLCJnZXRQYWdlRmlsZXMiLCJwYWdlRmlsZXMiLCJhbGxGaWxlcyIsImdldFBvbHlmaWxsU2NyaXB0cyIsImNvbnRleHQiLCJhc3NldFByZWZpeCIsImRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nIiwiZGlzYWJsZU9wdGltaXplZExvYWRpbmciLCJwb2x5ZmlsbEZpbGVzIiwicG9seWZpbGwiLCJlbmRzV2l0aCIsImRlZmVyIiwibm9uY2UiLCJjcm9zc09yaWdpbiIsInByb2Nlc3MiLCJnZXRQcmVOZXh0U2NyaXB0cyIsInNjcmlwdExvYWRlciIsImZpbGUiLCJzY3JpcHRQcm9wcyIsImFzc2lnbiIsIl9fTkVYVF9DUk9TU19PUklHSU4iLCJnZXREeW5hbWljQ2h1bmtzIiwiZmlsZXMiLCJkeW5hbWljSW1wb3J0cyIsImlzRGV2ZWxvcG1lbnQiLCJhc3luYyIsImVuY29kZVVSSSIsImdldFNjcmlwdHMiLCJfYnVpbGRNYW5pZmVzdCRsb3dQcmkiLCJub3JtYWxTY3JpcHRzIiwibG93UHJpb3JpdHlTY3JpcHRzIiwibG93UHJpb3JpdHlGaWxlcyIsIkRvY3VtZW50IiwiQ29tcG9uZW50IiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4IiwiZW5oYW5jZUFwcCIsIkFwcCIsImh0bWwiLCJyZW5kZXJQYWdlIiwic3R5bGVzIiwicmVuZGVyRG9jdW1lbnQiLCJEb2N1bWVudENvbXBvbmVudCIsIlByb3ZpZGVyIiwicmVuZGVyIiwiSGVhZCIsIk5leHRTY3JpcHQiLCJkb2NDb21wb25lbnRzUmVuZGVyZWQiLCJsb2NhbGUiLCJsYW5nIiwiYW1wIiwiY29uc3RydWN0b3IiLCJhcmdzIiwiZ2V0Q3NzTGlua3MiLCJjc3NGaWxlcyIsImYiLCJ1bm1hbmdlZEZpbGVzIiwiZHluYW1pY0Nzc0ZpbGVzIiwiZnJvbSIsImV4aXN0aW5nIiwiY3NzTGlua0VsZW1lbnRzIiwiaXNTaGFyZWRGaWxlIiwicmVsIiwiYXMiLCJpc1VubWFuYWdlZEZpbGUiLCJnZXRQcmVsb2FkRHluYW1pY0NodW5rcyIsIkJvb2xlYW4iLCJnZXRQcmVsb2FkTWFpbkxpbmtzIiwicHJlbG9hZEZpbGVzIiwiaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyIsImZpbHRlcmVkQ2hpbGRyZW4iLCJDaGlsZHJlbiIsImNoaWxkIiwiX19ORVhUX0RBVEFfXyIsIm1ha2VTdHlsZXNoZWV0SW5lcnQiLCJub2RlIiwiYyIsIk9QVElNSVpFRF9GT05UX1BST1ZJREVSUyIsInNvbWUiLCJ1cmwiLCJzdGFydHNXaXRoIiwibmV3UHJvcHMiLCJjbG9uZUVsZW1lbnQiLCJfdGhpcyRwcm9wcyRub25jZSIsIl90aGlzJHByb3BzJG5vbmNlMiIsImFtcFBhdGgiLCJoeWJyaWRBbXAiLCJjYW5vbmljYWxCYXNlIiwiZGFuZ2Vyb3VzQXNQYXRoIiwiaGVhZFRhZ3MiLCJ1bnN0YWJsZV9ydW50aW1lSlMiLCJ1bnN0YWJsZV9Kc1ByZWxvYWQiLCJkaXNhYmxlUnVudGltZUpTIiwiZGlzYWJsZUpzUHJlbG9hZCIsImNzc1ByZWxvYWRzIiwib3RoZXJIZWFkRWxlbWVudHMiLCJ0b0FycmF5IiwiX2NoaWxkJHByb3BzIiwiaXNSZWFjdEhlbG1ldCIsIl9jaGlsZCRwcm9wczIiLCJ3YXJuIiwiaGFzQW1waHRtbFJlbCIsImhhc0Nhbm9uaWNhbFJlbCIsImJhZFByb3AiLCJpbmRleE9mIiwia2V5cyIsInByb3AiLCJwYWdlIiwiY3VyU3R5bGVzIiwiaGFzU3R5bGVzIiwiX2VsJHByb3BzIiwiX2VsJHByb3BzJGRhbmdlcm91c2x5IiwiRnJhZ21lbnQiLCJjb3VudCIsImNsZWFuQW1wUGF0aCIsInN0eWxlIiwicmVwbGFjZSIsImdldEFtcFBhdGgiLCJjb250ZXh0VHlwZSIsInByb3BUeXBlcyIsInN0cmluZyIsIkFNUF9SRU5ERVJfVEFSR0VUIiwiZ2V0SW5saW5lU2NyaXB0U291cmNlIiwiZG9jdW1lbnRQcm9wcyIsImRhdGEiLCJzdHJpbmdpZnkiLCJodG1sRXNjYXBlSnNvblN0cmluZyIsImVyciIsIm1lc3NhZ2UiLCJFcnJvciIsImFtcERldkZpbGVzIiwiZGV2RmlsZXMiLCJzYWZhcmlOb21vZHVsZUZpeCIsImFzUGF0aCIsIk15RG9jdW1lbnQiLCJzaGVldCIsIlNlcnZlclN0eWxlU2hlZXQiLCJvcmlnaW5hbFJlbmRlclBhZ2UiLCJjb2xsZWN0U3R5bGVzIiwiaW5pdGlhbFByb3BzIiwiY3NzVGhlbWVQcm9wcyIsImdldFN0eWxlRWxlbWVudCIsInNlYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxvQkFBb0IsR0FBRztBQUNsQ0MsV0FBUyxFQUFFLE1BRHVCO0FBQ2Y7QUFDbkJDLGFBQVcsRUFBRSxNQUZxQjtBQUdsQ0MsV0FBUyxFQUFFO0FBSHVCLENBQTdCO0FBS0EsTUFBTUMsaUJBQWlCLEdBQUc7QUFDL0JILFdBQVMsRUFBRSxNQURvQjtBQUNaO0FBQ25CQyxhQUFXLEVBQUUsTUFGa0I7QUFHL0JDLFdBQVMsRUFBRTtBQUhvQixDQUExQjtBQU1QLE1BQU1FLGdCQUF3QyxHQUFHO0FBQy9DQyxNQUFJLEVBQUUsTUFEeUM7QUFFL0NDLE9BQUssRUFBRSxLQUZ3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Ozs7Ozs7O0FDQUEsK0U7Ozs7Ozs7Ozs7O0FDQUEsZ0U7Ozs7Ozs7Ozs7O0FDQUEsNEU7Ozs7Ozs7Ozs7O0FDQUEsbUU7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQUEsK0MiLCJmaWxlIjoicGFnZXMvX2RvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlZmF1bHRDU1NUaGVtZVByb3BzID0ge1xyXG4gIGNvbG9yTW9kZTogJ2F1dG8nLCAvLyBsaWdodCwgZGFyaywgYXV0b1xyXG4gIG5pZ2h0U2NoZW1lOiAnZGFyaycsXHJcbiAgZGF5U2NoZW1lOiAnbGlnaHQnLFxyXG59XHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0VGhlbWVQcm9wcyA9IHtcclxuICBjb2xvck1vZGU6ICdhdXRvJywgLy8gZGF5LCBuaWdodCwgYXV0b1xyXG4gIG5pZ2h0U2NoZW1lOiAnZGFyaycsXHJcbiAgZGF5U2NoZW1lOiAnbGlnaHQnLFxyXG59XHJcblxyXG5jb25zdCBjc3NDb2xvck1vZGVUb0pzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIGF1dG86ICdhdXRvJyxcclxuICBsaWdodDogJ2RheScsXHJcbiAgZGFyazogJ25pZ2h0JyxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFRoZW1lUHJvcHMgPSAocmVxOiBhbnksIG1vZGU/OiAnY3NzJykgPT4ge1xyXG4gIGxldCBjb29raWVWYWx1ZToge1xyXG4gICAgY29sb3JfbW9kZT86ICdhdXRvJyB8ICdsaWdodCcgfCAnZGFyaydcclxuICAgIGRhcmtfdGhlbWU/OiB7IG5hbWU6IHN0cmluZyB9XHJcbiAgICBsaWdodF90aGVtZT86IHsgbmFtZTogc3RyaW5nIH1cclxuICB9ID0ge31cclxuICBjb25zdCBkZWZhdWx0UHJvcHMgPSBtb2RlID09PSAnY3NzJyA/IGRlZmF1bHRDU1NUaGVtZVByb3BzIDogZGVmYXVsdFRoZW1lUHJvcHNcclxuXHJcbiAgaWYgKHJlcS5jb29raWVzPy5jb2xvcl9tb2RlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb29raWVWYWx1ZSA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHJlcS5jb29raWVzLmNvbG9yX21vZGUpKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAvLyB0aGUgY29va2llIHVzZXMgcHJpbWVyL2NzcyBjb2xvcl9tb2RlLCBzb21ldGltZXMgd2UgbmVlZCB0byBjb252ZXJ0IHRoYXQgdG8gYSBwcmltZXIvY29tcG9uZW50cyBjb21wYXRpYmxlIHZlcnNpb25cclxuICAgIGNvbG9yTW9kZTpcclxuICAgICAgKG1vZGUgPT09ICdjc3MnID8gY29va2llVmFsdWUuY29sb3JfbW9kZSA6IGNzc0NvbG9yTW9kZVRvSnNbY29va2llVmFsdWUuY29sb3JfbW9kZSB8fCAnJ10pIHx8XHJcbiAgICAgIGRlZmF1bHRQcm9wcy5jb2xvck1vZGUsXHJcbiAgICBuaWdodFNjaGVtZTogY29va2llVmFsdWUuZGFya190aGVtZT8ubmFtZSB8fCBkZWZhdWx0UHJvcHMubmlnaHRTY2hlbWUsXHJcbiAgICBkYXlTY2hlbWU6IGNvb2tpZVZhbHVlLmxpZ2h0X3RoZW1lPy5uYW1lIHx8IGRlZmF1bHRQcm9wcy5kYXlTY2hlbWUsXHJcbiAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuZGVmYXVsdD1pbml0SGVhZE1hbmFnZXI7ZXhwb3J0cy5ET01BdHRyaWJ1dGVOYW1lcz12b2lkIDA7Y29uc3QgRE9NQXR0cmlidXRlTmFtZXM9e2FjY2VwdENoYXJzZXQ6J2FjY2VwdC1jaGFyc2V0JyxjbGFzc05hbWU6J2NsYXNzJyxodG1sRm9yOidmb3InLGh0dHBFcXVpdjonaHR0cC1lcXVpdicsbm9Nb2R1bGU6J25vTW9kdWxlJ307ZXhwb3J0cy5ET01BdHRyaWJ1dGVOYW1lcz1ET01BdHRyaWJ1dGVOYW1lcztmdW5jdGlvbiByZWFjdEVsZW1lbnRUb0RPTSh7dHlwZSxwcm9wc30pe2NvbnN0IGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7Zm9yKGNvbnN0IHAgaW4gcHJvcHMpe2lmKCFwcm9wcy5oYXNPd25Qcm9wZXJ0eShwKSljb250aW51ZTtpZihwPT09J2NoaWxkcmVuJ3x8cD09PSdkYW5nZXJvdXNseVNldElubmVySFRNTCcpY29udGludWU7Ly8gd2UgZG9uJ3QgcmVuZGVyIHVuZGVmaW5lZCBwcm9wcyB0byB0aGUgRE9NXG5pZihwcm9wc1twXT09PXVuZGVmaW5lZCljb250aW51ZTtjb25zdCBhdHRyPURPTUF0dHJpYnV0ZU5hbWVzW3BdfHxwLnRvTG93ZXJDYXNlKCk7aWYodHlwZT09PSdzY3JpcHQnJiYoYXR0cj09PSdhc3luYyd8fGF0dHI9PT0nZGVmZXInfHxhdHRyPT09J25vTW9kdWxlJykpeztlbFthdHRyXT0hIXByb3BzW3BdO31lbHNle2VsLnNldEF0dHJpYnV0ZShhdHRyLHByb3BzW3BdKTt9fWNvbnN0e2NoaWxkcmVuLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MfT1wcm9wcztpZihkYW5nZXJvdXNseVNldElubmVySFRNTCl7ZWwuaW5uZXJIVE1MPWRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbHx8Jyc7fWVsc2UgaWYoY2hpbGRyZW4pe2VsLnRleHRDb250ZW50PXR5cGVvZiBjaGlsZHJlbj09PSdzdHJpbmcnP2NoaWxkcmVuOkFycmF5LmlzQXJyYXkoY2hpbGRyZW4pP2NoaWxkcmVuLmpvaW4oJycpOicnO31yZXR1cm4gZWw7fWZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRzKHR5cGUsY29tcG9uZW50cyl7Y29uc3QgaGVhZEVsPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07Y29uc3QgaGVhZENvdW50RWw9aGVhZEVsLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1uZXh0LWhlYWQtY291bnRdJyk7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbicpe2lmKCFoZWFkQ291bnRFbCl7Y29uc29sZS5lcnJvcignV2FybmluZzogbmV4dC1oZWFkLWNvdW50IGlzIG1pc3NpbmcuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaGVhZC1jb3VudC1taXNzaW5nJyk7cmV0dXJuO319Y29uc3QgaGVhZENvdW50PU51bWJlcihoZWFkQ291bnRFbC5jb250ZW50KTtjb25zdCBvbGRUYWdzPVtdO2ZvcihsZXQgaT0wLGo9aGVhZENvdW50RWwucHJldmlvdXNFbGVtZW50U2libGluZztpPGhlYWRDb3VudDtpKyssaj1qLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpe2lmKGoudGFnTmFtZS50b0xvd2VyQ2FzZSgpPT09dHlwZSl7b2xkVGFncy5wdXNoKGopO319Y29uc3QgbmV3VGFncz1jb21wb25lbnRzLm1hcChyZWFjdEVsZW1lbnRUb0RPTSkuZmlsdGVyKG5ld1RhZz0+e2ZvcihsZXQgaz0wLGxlbj1vbGRUYWdzLmxlbmd0aDtrPGxlbjtrKyspe2NvbnN0IG9sZFRhZz1vbGRUYWdzW2tdO2lmKG9sZFRhZy5pc0VxdWFsTm9kZShuZXdUYWcpKXtvbGRUYWdzLnNwbGljZShrLDEpO3JldHVybiBmYWxzZTt9fXJldHVybiB0cnVlO30pO29sZFRhZ3MuZm9yRWFjaCh0PT50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCkpO25ld1RhZ3MuZm9yRWFjaCh0PT5oZWFkRWwuaW5zZXJ0QmVmb3JlKHQsaGVhZENvdW50RWwpKTtoZWFkQ291bnRFbC5jb250ZW50PShoZWFkQ291bnQtb2xkVGFncy5sZW5ndGgrbmV3VGFncy5sZW5ndGgpLnRvU3RyaW5nKCk7fWZ1bmN0aW9uIGluaXRIZWFkTWFuYWdlcigpe2xldCB1cGRhdGVQcm9taXNlPW51bGw7cmV0dXJue21vdW50ZWRJbnN0YW5jZXM6bmV3IFNldCgpLHVwZGF0ZUhlYWQ6aGVhZD0+e2NvbnN0IHByb21pc2U9dXBkYXRlUHJvbWlzZT1Qcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT57aWYocHJvbWlzZSE9PXVwZGF0ZVByb21pc2UpcmV0dXJuO3VwZGF0ZVByb21pc2U9bnVsbDtjb25zdCB0YWdzPXt9O2hlYWQuZm9yRWFjaChoPT57aWYoLy8gSWYgdGhlIGZvbnQgdGFnIGlzIGxvYWRlZCBvbmx5IG9uIGNsaWVudCBuYXZpZ2F0aW9uXG4vLyBpdCB3b24ndCBiZSBpbmxpbmVkLiBJbiB0aGlzIGNhc2UgcmV2ZXJ0IHRvIHRoZSBvcmlnaW5hbCBiZWhhdmlvclxuaC50eXBlPT09J2xpbmsnJiZoLnByb3BzWydkYXRhLW9wdGltaXplZC1mb250cyddJiYhZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3R5bGVbZGF0YS1ocmVmPVwiJHtoLnByb3BzWydkYXRhLWhyZWYnXX1cIl1gKSl7aC5wcm9wcy5ocmVmPWgucHJvcHNbJ2RhdGEtaHJlZiddO2gucHJvcHNbJ2RhdGEtaHJlZiddPXVuZGVmaW5lZDt9Y29uc3QgY29tcG9uZW50cz10YWdzW2gudHlwZV18fFtdO2NvbXBvbmVudHMucHVzaChoKTt0YWdzW2gudHlwZV09Y29tcG9uZW50czt9KTtjb25zdCB0aXRsZUNvbXBvbmVudD10YWdzLnRpdGxlP3RhZ3MudGl0bGVbMF06bnVsbDtsZXQgdGl0bGU9Jyc7aWYodGl0bGVDb21wb25lbnQpe2NvbnN0e2NoaWxkcmVufT10aXRsZUNvbXBvbmVudC5wcm9wczt0aXRsZT10eXBlb2YgY2hpbGRyZW49PT0nc3RyaW5nJz9jaGlsZHJlbjpBcnJheS5pc0FycmF5KGNoaWxkcmVuKT9jaGlsZHJlbi5qb2luKCcnKTonJzt9aWYodGl0bGUhPT1kb2N1bWVudC50aXRsZSlkb2N1bWVudC50aXRsZT10aXRsZTtbJ21ldGEnLCdiYXNlJywnbGluaycsJ3N0eWxlJywnc2NyaXB0J10uZm9yRWFjaCh0eXBlPT57dXBkYXRlRWxlbWVudHModHlwZSx0YWdzW3R5cGVdfHxbXSk7fSk7fSk7fX07fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVhZC1tYW5hZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrPWV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjaz12b2lkIDA7Y29uc3QgcmVxdWVzdElkbGVDYWxsYmFjaz10eXBlb2Ygc2VsZiE9PSd1bmRlZmluZWQnJiZzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2t8fGZ1bmN0aW9uKGNiKXtsZXQgc3RhcnQ9RGF0ZS5ub3coKTtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe2NiKHtkaWRUaW1lb3V0OmZhbHNlLHRpbWVSZW1haW5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5tYXgoMCw1MC0oRGF0ZS5ub3coKS1zdGFydCkpO319KTt9LDEpO307ZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrPXJlcXVlc3RJZGxlQ2FsbGJhY2s7Y29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrPXR5cGVvZiBzZWxmIT09J3VuZGVmaW5lZCcmJnNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrfHxmdW5jdGlvbihpZCl7cmV0dXJuIGNsZWFyVGltZW91dChpZCk7fTtleHBvcnRzLmNhbmNlbElkbGVDYWxsYmFjaz1jYW5jZWxJZGxlQ2FsbGJhY2s7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ9cmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuaW5pdFNjcmlwdExvYWRlcj1pbml0U2NyaXB0TG9hZGVyO2V4cG9ydHMuZGVmYXVsdD12b2lkIDA7dmFyIF9leHRlbmRzMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHNcIikpO3ZhciBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpKTt2YXIgX3JlYWN0PXJlcXVpcmUoXCJyZWFjdFwiKTt2YXIgX2hlYWRNYW5hZ2VyQ29udGV4dD1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvbGliL2hlYWQtbWFuYWdlci1jb250ZXh0XCIpO3ZhciBfaGVhZE1hbmFnZXI9cmVxdWlyZShcIi4vaGVhZC1tYW5hZ2VyXCIpO3ZhciBfcmVxdWVzdElkbGVDYWxsYmFjaz1yZXF1aXJlKFwiLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2tcIik7Y29uc3QgU2NyaXB0Q2FjaGU9bmV3IE1hcCgpO2NvbnN0IExvYWRDYWNoZT1uZXcgU2V0KCk7Y29uc3QgaWdub3JlUHJvcHM9WydvbkxvYWQnLCdkYW5nZXJvdXNseVNldElubmVySFRNTCcsJ2NoaWxkcmVuJywnb25FcnJvcicsJ3N0cmF0ZWd5J107Y29uc3QgbG9hZFNjcmlwdD1wcm9wcz0+e2NvbnN0e3NyYyxpZCxvbkxvYWQ9KCk9Pnt9LGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLGNoaWxkcmVuPScnLG9uRXJyb3J9PXByb3BzO2NvbnN0IGNhY2hlS2V5PWlkfHxzcmM7aWYoU2NyaXB0Q2FjaGUuaGFzKHNyYykpe2lmKCFMb2FkQ2FjaGUuaGFzKGNhY2hlS2V5KSl7TG9hZENhY2hlLmFkZChjYWNoZUtleSk7Ly8gRXhlY3V0ZSBvbkxvYWQgc2luY2UgdGhlIHNjcmlwdCBsb2FkaW5nIGhhcyBiZWd1blxuU2NyaXB0Q2FjaGUuZ2V0KHNyYykudGhlbihvbkxvYWQsb25FcnJvcik7fXJldHVybjt9Y29uc3QgZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7Y29uc3QgbG9hZFByb21pc2U9bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLGZ1bmN0aW9uKCl7cmVzb2x2ZSgpO2lmKG9uTG9hZCl7b25Mb2FkLmNhbGwodGhpcyk7fX0pO2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJyxmdW5jdGlvbigpe3JlamVjdCgpO2lmKG9uRXJyb3Ipe29uRXJyb3IoKTt9fSk7fSk7aWYoc3JjKXtTY3JpcHRDYWNoZS5zZXQoc3JjLGxvYWRQcm9taXNlKTtMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTt9aWYoZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpe2VsLmlubmVySFRNTD1kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWx8fCcnO31lbHNlIGlmKGNoaWxkcmVuKXtlbC50ZXh0Q29udGVudD10eXBlb2YgY2hpbGRyZW49PT0nc3RyaW5nJz9jaGlsZHJlbjpBcnJheS5pc0FycmF5KGNoaWxkcmVuKT9jaGlsZHJlbi5qb2luKCcnKTonJzt9ZWxzZSBpZihzcmMpe2VsLnNyYz1zcmM7fWZvcihjb25zdFtrLHZhbHVlXW9mIE9iamVjdC5lbnRyaWVzKHByb3BzKSl7aWYodmFsdWU9PT11bmRlZmluZWR8fGlnbm9yZVByb3BzLmluY2x1ZGVzKGspKXtjb250aW51ZTt9Y29uc3QgYXR0cj1faGVhZE1hbmFnZXIuRE9NQXR0cmlidXRlTmFtZXNba118fGsudG9Mb3dlckNhc2UoKTtlbC5zZXRBdHRyaWJ1dGUoYXR0cix2YWx1ZSk7fWRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO307ZnVuY3Rpb24gaGFuZGxlQ2xpZW50U2NyaXB0TG9hZChwcm9wcyl7Y29uc3R7c3RyYXRlZ3k9J2FmdGVySW50ZXJhY3RpdmUnfT1wcm9wcztpZihzdHJhdGVneT09PSdhZnRlckludGVyYWN0aXZlJyl7bG9hZFNjcmlwdChwcm9wcyk7fWVsc2UgaWYoc3RyYXRlZ3k9PT0nbGF6eU9ubG9hZCcpe3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywoKT0+eygwLF9yZXF1ZXN0SWRsZUNhbGxiYWNrLnJlcXVlc3RJZGxlQ2FsbGJhY2spKCgpPT5sb2FkU2NyaXB0KHByb3BzKSk7fSk7fX1mdW5jdGlvbiBsb2FkTGF6eVNjcmlwdChwcm9wcyl7aWYoZG9jdW1lbnQucmVhZHlTdGF0ZT09PSdjb21wbGV0ZScpeygwLF9yZXF1ZXN0SWRsZUNhbGxiYWNrLnJlcXVlc3RJZGxlQ2FsbGJhY2spKCgpPT5sb2FkU2NyaXB0KHByb3BzKSk7fWVsc2V7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCgpPT57KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2sucmVxdWVzdElkbGVDYWxsYmFjaykoKCk9PmxvYWRTY3JpcHQocHJvcHMpKTt9KTt9fWZ1bmN0aW9uIGluaXRTY3JpcHRMb2FkZXIoc2NyaXB0TG9hZGVySXRlbXMpe3NjcmlwdExvYWRlckl0ZW1zLmZvckVhY2goaGFuZGxlQ2xpZW50U2NyaXB0TG9hZCk7fWZ1bmN0aW9uIFNjcmlwdChwcm9wcyl7Y29uc3R7c3JjPScnLG9uTG9hZD0oKT0+e30sc3RyYXRlZ3k9J2FmdGVySW50ZXJhY3RpdmUnLG9uRXJyb3J9PXByb3BzLHJlc3RQcm9wcz0oMCxfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTIuZGVmYXVsdCkocHJvcHMsW1wic3JjXCIsXCJvbkxvYWRcIixcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCIsXCJzdHJhdGVneVwiLFwib25FcnJvclwiXSk7Ly8gQ29udGV4dCBpcyBhdmFpbGFibGUgb25seSBkdXJpbmcgU1NSXG5jb25zdHt1cGRhdGVTY3JpcHRzLHNjcmlwdHN9PSgwLF9yZWFjdC51c2VDb250ZXh0KShfaGVhZE1hbmFnZXJDb250ZXh0LkhlYWRNYW5hZ2VyQ29udGV4dCk7KDAsX3JlYWN0LnVzZUVmZmVjdCkoKCk9PntpZihzdHJhdGVneT09PSdhZnRlckludGVyYWN0aXZlJyl7bG9hZFNjcmlwdChwcm9wcyk7fWVsc2UgaWYoc3RyYXRlZ3k9PT0nbGF6eU9ubG9hZCcpe2xvYWRMYXp5U2NyaXB0KHByb3BzKTt9fSxbcHJvcHMsc3RyYXRlZ3ldKTtpZihzdHJhdGVneT09PSdiZWZvcmVJbnRlcmFjdGl2ZScpe2lmKHVwZGF0ZVNjcmlwdHMpe3NjcmlwdHMuYmVmb3JlSW50ZXJhY3RpdmU9KHNjcmlwdHMuYmVmb3JlSW50ZXJhY3RpdmV8fFtdKS5jb25jYXQoWygwLF9leHRlbmRzMi5kZWZhdWx0KSh7c3JjLG9uTG9hZCxvbkVycm9yfSxyZXN0UHJvcHMpXSk7dXBkYXRlU2NyaXB0cyhzY3JpcHRzKTt9fXJldHVybiBudWxsO312YXIgX2RlZmF1bHQ9U2NyaXB0O2V4cG9ydHMuZGVmYXVsdD1fZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjcmlwdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLkh0bWw9SHRtbDtleHBvcnRzLk1haW49TWFpbjtleHBvcnRzLk5leHRTY3JpcHQ9ZXhwb3J0cy5IZWFkPWV4cG9ydHMuZGVmYXVsdD12b2lkIDA7dmFyIF9wcm9wVHlwZXM9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicHJvcC10eXBlc1wiKSk7dmFyIF9yZWFjdD1faW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwicmVhY3RcIikpO3ZhciBfc2VydmVyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInN0eWxlZC1qc3gvc2VydmVyXCIpKTt2YXIgX2NvbnN0YW50cz1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvbGliL2NvbnN0YW50c1wiKTt2YXIgX2RvY3VtZW50Q29udGV4dD1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvbGliL2RvY3VtZW50LWNvbnRleHRcIik7dmFyIF91dGlscz1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzXCIpO2V4cG9ydHMuRG9jdW1lbnRDb250ZXh0PV91dGlscy5Eb2N1bWVudENvbnRleHQ7ZXhwb3J0cy5Eb2N1bWVudEluaXRpYWxQcm9wcz1fdXRpbHMuRG9jdW1lbnRJbml0aWFsUHJvcHM7ZXhwb3J0cy5Eb2N1bWVudFByb3BzPV91dGlscy5Eb2N1bWVudFByb3BzO3ZhciBfZ2V0UGFnZUZpbGVzPXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXNcIik7dmFyIF91dGlsczI9cmVxdWlyZShcIi4uL25leHQtc2VydmVyL3NlcnZlci91dGlsc1wiKTt2YXIgX2h0bWxlc2NhcGU9cmVxdWlyZShcIi4uL3NlcnZlci9odG1sZXNjYXBlXCIpO3ZhciBfc2NyaXB0PV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2NsaWVudC9zY3JpcHRcIikpO2Z1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpe2lmKHR5cGVvZiBXZWFrTWFwIT09XCJmdW5jdGlvblwiKXJldHVybiBudWxsO3ZhciBjYWNoZT1uZXcgV2Vha01hcCgpO19nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZT1mdW5jdGlvbigpe3JldHVybiBjYWNoZTt9O3JldHVybiBjYWNoZTt9ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKXtpZihvYmomJm9iai5fX2VzTW9kdWxlKXtyZXR1cm4gb2JqO31pZihvYmo9PT1udWxsfHx0eXBlb2Ygb2JqIT09XCJvYmplY3RcIiYmdHlwZW9mIG9iaiE9PVwiZnVuY3Rpb25cIil7cmV0dXJue2RlZmF1bHQ6b2JqfTt9dmFyIGNhY2hlPV9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpO2lmKGNhY2hlJiZjYWNoZS5oYXMob2JqKSl7cmV0dXJuIGNhY2hlLmdldChvYmopO312YXIgbmV3T2JqPXt9O3ZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3I9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIga2V5IGluIG9iail7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaixrZXkpKXt2YXIgZGVzYz1oYXNQcm9wZXJ0eURlc2NyaXB0b3I/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosa2V5KTpudWxsO2lmKGRlc2MmJihkZXNjLmdldHx8ZGVzYy5zZXQpKXtPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLGtleSxkZXNjKTt9ZWxzZXtuZXdPYmpba2V5XT1vYmpba2V5XTt9fX1uZXdPYmouZGVmYXVsdD1vYmo7aWYoY2FjaGUpe2NhY2hlLnNldChvYmosbmV3T2JqKTt9cmV0dXJuIG5ld09iajt9ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9O31mdW5jdGlvbiBnZXREb2N1bWVudEZpbGVzKGJ1aWxkTWFuaWZlc3QscGF0aG5hbWUsaW5BbXBNb2RlKXtjb25zdCBzaGFyZWRGaWxlcz0oMCxfZ2V0UGFnZUZpbGVzLmdldFBhZ2VGaWxlcykoYnVpbGRNYW5pZmVzdCwnL19hcHAnKTtjb25zdCBwYWdlRmlsZXM9aW5BbXBNb2RlP1tdOigwLF9nZXRQYWdlRmlsZXMuZ2V0UGFnZUZpbGVzKShidWlsZE1hbmlmZXN0LHBhdGhuYW1lKTtyZXR1cm57c2hhcmVkRmlsZXMscGFnZUZpbGVzLGFsbEZpbGVzOlsuLi5uZXcgU2V0KFsuLi5zaGFyZWRGaWxlcywuLi5wYWdlRmlsZXNdKV19O31mdW5jdGlvbiBnZXRQb2x5ZmlsbFNjcmlwdHMoY29udGV4dCxwcm9wcyl7Ly8gcG9seWZpbGxzLmpzIGhhcyB0byBiZSByZW5kZXJlZCBhcyBub21vZHVsZSB3aXRob3V0IGFzeW5jXG4vLyBJdCBhbHNvIGhhcyB0byBiZSB0aGUgZmlyc3Qgc2NyaXB0IHRvIGxvYWRcbmNvbnN0e2Fzc2V0UHJlZml4LGJ1aWxkTWFuaWZlc3QsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PWNvbnRleHQ7cmV0dXJuIGJ1aWxkTWFuaWZlc3QucG9seWZpbGxGaWxlcy5maWx0ZXIocG9seWZpbGw9PnBvbHlmaWxsLmVuZHNXaXRoKCcuanMnKSYmIXBvbHlmaWxsLmVuZHNXaXRoKCcubW9kdWxlLmpzJykpLm1hcChwb2x5ZmlsbD0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7a2V5OnBvbHlmaWxsLGRlZmVyOiFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxub25jZTpwcm9wcy5ub25jZSxjcm9zc09yaWdpbjpwcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixub01vZHVsZTp0cnVlLHNyYzpgJHthc3NldFByZWZpeH0vX25leHQvJHtwb2x5ZmlsbH0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWB9KSk7fWZ1bmN0aW9uIGdldFByZU5leHRTY3JpcHRzKGNvbnRleHQscHJvcHMpe2NvbnN0e3NjcmlwdExvYWRlcixkaXNhYmxlT3B0aW1pemVkTG9hZGluZ309Y29udGV4dDtyZXR1cm4oc2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlfHxbXSkubWFwKGZpbGU9Pntjb25zdHtzdHJhdGVneSwuLi5zY3JpcHRQcm9wc309ZmlsZTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLE9iamVjdC5hc3NpZ24oe30sc2NyaXB0UHJvcHMse2RlZmVyOiFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxub25jZTpwcm9wcy5ub25jZSxjcm9zc09yaWdpbjpwcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pKTt9KTt9ZnVuY3Rpb24gZ2V0RHluYW1pY0NodW5rcyhjb250ZXh0LHByb3BzLGZpbGVzKXtjb25zdHtkeW5hbWljSW1wb3J0cyxhc3NldFByZWZpeCxpc0RldmVsb3BtZW50LGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nfT1jb250ZXh0O3JldHVybiBkeW5hbWljSW1wb3J0cy5tYXAoZmlsZT0+e2lmKCFmaWxlLmVuZHNXaXRoKCcuanMnKXx8ZmlsZXMuYWxsRmlsZXMuaW5jbHVkZXMoZmlsZSkpcmV0dXJuIG51bGw7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7YXN5bmM6IWlzRGV2ZWxvcG1lbnQmJmRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLGRlZmVyOiFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxrZXk6ZmlsZSxzcmM6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxub25jZTpwcm9wcy5ub25jZSxjcm9zc09yaWdpbjpwcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pO30pO31mdW5jdGlvbiBnZXRTY3JpcHRzKGNvbnRleHQscHJvcHMsZmlsZXMpe3ZhciBfYnVpbGRNYW5pZmVzdCRsb3dQcmk7Y29uc3R7YXNzZXRQcmVmaXgsYnVpbGRNYW5pZmVzdCxpc0RldmVsb3BtZW50LGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nfT1jb250ZXh0O2NvbnN0IG5vcm1hbFNjcmlwdHM9ZmlsZXMuYWxsRmlsZXMuZmlsdGVyKGZpbGU9PmZpbGUuZW5kc1dpdGgoJy5qcycpKTtjb25zdCBsb3dQcmlvcml0eVNjcmlwdHM9KF9idWlsZE1hbmlmZXN0JGxvd1ByaT1idWlsZE1hbmlmZXN0Lmxvd1ByaW9yaXR5RmlsZXMpPT1udWxsP3ZvaWQgMDpfYnVpbGRNYW5pZmVzdCRsb3dQcmkuZmlsdGVyKGZpbGU9PmZpbGUuZW5kc1dpdGgoJy5qcycpKTtyZXR1cm5bLi4ubm9ybWFsU2NyaXB0cywuLi5sb3dQcmlvcml0eVNjcmlwdHNdLm1hcChmaWxlPT57cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7a2V5OmZpbGUsc3JjOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsbm9uY2U6cHJvcHMubm9uY2UsYXN5bmM6IWlzRGV2ZWxvcG1lbnQmJmRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLGRlZmVyOiFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxjcm9zc09yaWdpbjpwcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pO30pO30vKipcbiAqIGBEb2N1bWVudGAgY29tcG9uZW50IGhhbmRsZXMgdGhlIGluaXRpYWwgYGRvY3VtZW50YCBtYXJrdXAgYW5kIHJlbmRlcnMgb25seSBvbiB0aGUgc2VydmVyIHNpZGUuXG4gKiBDb21tb25seSB1c2VkIGZvciBpbXBsZW1lbnRpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nIGZvciBgY3NzLWluLWpzYCBsaWJyYXJpZXMuXG4gKi9jbGFzcyBEb2N1bWVudCBleHRlbmRzIF9yZWFjdC5Db21wb25lbnR7LyoqXG4gICAqIGBnZXRJbml0aWFsUHJvcHNgIGhvb2sgcmV0dXJucyB0aGUgY29udGV4dCBvYmplY3Qgd2l0aCB0aGUgYWRkaXRpb24gb2YgYHJlbmRlclBhZ2VgLlxuICAgKiBgcmVuZGVyUGFnZWAgY2FsbGJhY2sgZXhlY3V0ZXMgYFJlYWN0YCByZW5kZXJpbmcgbG9naWMgc3luY2hyb25vdXNseSB0byBzdXBwb3J0IHNlcnZlci1yZW5kZXJpbmcgd3JhcHBlcnNcbiAgICovc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyhjdHgpe2NvbnN0IGVuaGFuY2VBcHA9QXBwPT57cmV0dXJuIHByb3BzPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChBcHAscHJvcHMpO307Y29uc3R7aHRtbCxoZWFkfT1hd2FpdCBjdHgucmVuZGVyUGFnZSh7ZW5oYW5jZUFwcH0pO2NvbnN0IHN0eWxlcz1bLi4uKDAsX3NlcnZlci5kZWZhdWx0KSgpXTtyZXR1cm57aHRtbCxoZWFkLHN0eWxlc307fXN0YXRpYyByZW5kZXJEb2N1bWVudChEb2N1bWVudENvbXBvbmVudCxwcm9wcyl7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX2RvY3VtZW50Q29udGV4dC5Eb2N1bWVudENvbnRleHQuUHJvdmlkZXIse3ZhbHVlOnByb3BzfSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChEb2N1bWVudENvbXBvbmVudCxwcm9wcykpO31yZW5kZXIoKXtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChIdG1sLG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSGVhZCxudWxsKSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJvZHlcIixudWxsLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1haW4sbnVsbCksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTmV4dFNjcmlwdCxudWxsKSkpO319ZXhwb3J0cy5kZWZhdWx0PURvY3VtZW50O2Z1bmN0aW9uIEh0bWwocHJvcHMpe2NvbnN0e2luQW1wTW9kZSxkb2NDb21wb25lbnRzUmVuZGVyZWQsbG9jYWxlfT0oMCxfcmVhY3QudXNlQ29udGV4dCkoX2RvY3VtZW50Q29udGV4dC5Eb2N1bWVudENvbnRleHQpO2RvY0NvbXBvbmVudHNSZW5kZXJlZC5IdG1sPXRydWU7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJodG1sXCIsT2JqZWN0LmFzc2lnbih7fSxwcm9wcyx7bGFuZzpwcm9wcy5sYW5nfHxsb2NhbGV8fHVuZGVmaW5lZCxhbXA6aW5BbXBNb2RlPycnOnVuZGVmaW5lZCxcImRhdGEtYW1wZGV2bW9kZVwiOmluQW1wTW9kZSYmcHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbic/Jyc6dW5kZWZpbmVkfSkpO31jbGFzcyBIZWFkIGV4dGVuZHMgX3JlYWN0LkNvbXBvbmVudHtjb25zdHJ1Y3RvciguLi5hcmdzKXtzdXBlciguLi5hcmdzKTt0aGlzLmNvbnRleHQ9dm9pZCAwO31nZXRDc3NMaW5rcyhmaWxlcyl7Y29uc3R7YXNzZXRQcmVmaXgsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZHluYW1pY0ltcG9ydHN9PXRoaXMuY29udGV4dDtjb25zdCBjc3NGaWxlcz1maWxlcy5hbGxGaWxlcy5maWx0ZXIoZj0+Zi5lbmRzV2l0aCgnLmNzcycpKTtjb25zdCBzaGFyZWRGaWxlcz1uZXcgU2V0KGZpbGVzLnNoYXJlZEZpbGVzKTsvLyBVbm1hbmFnZWQgZmlsZXMgYXJlIENTUyBmaWxlcyB0aGF0IHdpbGwgYmUgaGFuZGxlZCBkaXJlY3RseSBieSB0aGVcbi8vIHdlYnBhY2sgcnVudGltZSAoYG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luYCkuXG5sZXQgdW5tYW5nZWRGaWxlcz1uZXcgU2V0KFtdKTtsZXQgZHluYW1pY0Nzc0ZpbGVzPUFycmF5LmZyb20obmV3IFNldChkeW5hbWljSW1wb3J0cy5maWx0ZXIoZmlsZT0+ZmlsZS5lbmRzV2l0aCgnLmNzcycpKSkpO2lmKGR5bmFtaWNDc3NGaWxlcy5sZW5ndGgpe2NvbnN0IGV4aXN0aW5nPW5ldyBTZXQoY3NzRmlsZXMpO2R5bmFtaWNDc3NGaWxlcz1keW5hbWljQ3NzRmlsZXMuZmlsdGVyKGY9PiEoZXhpc3RpbmcuaGFzKGYpfHxzaGFyZWRGaWxlcy5oYXMoZikpKTt1bm1hbmdlZEZpbGVzPW5ldyBTZXQoZHluYW1pY0Nzc0ZpbGVzKTtjc3NGaWxlcy5wdXNoKC4uLmR5bmFtaWNDc3NGaWxlcyk7fWxldCBjc3NMaW5rRWxlbWVudHM9W107Y3NzRmlsZXMuZm9yRWFjaChmaWxlPT57Y29uc3QgaXNTaGFyZWRGaWxlPXNoYXJlZEZpbGVzLmhhcyhmaWxlKTtpZighcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0NTUyl7Y3NzTGlua0VsZW1lbnRzLnB1c2goLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse2tleTpgJHtmaWxlfS1wcmVsb2FkYCxub25jZTp0aGlzLnByb3BzLm5vbmNlLHJlbDpcInByZWxvYWRcIixocmVmOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsYXM6XCJzdHlsZVwiLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU59KSk7fWNvbnN0IGlzVW5tYW5hZ2VkRmlsZT11bm1hbmdlZEZpbGVzLmhhcyhmaWxlKTtjc3NMaW5rRWxlbWVudHMucHVzaCgvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7a2V5OmZpbGUsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxyZWw6XCJzdHlsZXNoZWV0XCIsaHJlZjpgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXCJkYXRhLW4tZ1wiOmlzVW5tYW5hZ2VkRmlsZT91bmRlZmluZWQ6aXNTaGFyZWRGaWxlPycnOnVuZGVmaW5lZCxcImRhdGEtbi1wXCI6aXNVbm1hbmFnZWRGaWxlP3VuZGVmaW5lZDppc1NoYXJlZEZpbGU/dW5kZWZpbmVkOicnfSkpO30pO2lmKHByb2Nlc3MuZW52Lk5PREVfRU5WIT09J2RldmVsb3BtZW50JyYmcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTKXtjc3NMaW5rRWxlbWVudHM9dGhpcy5tYWtlU3R5bGVzaGVldEluZXJ0KGNzc0xpbmtFbGVtZW50cyk7fXJldHVybiBjc3NMaW5rRWxlbWVudHMubGVuZ3RoPT09MD9udWxsOmNzc0xpbmtFbGVtZW50czt9Z2V0UHJlbG9hZER5bmFtaWNDaHVua3MoKXtjb25zdHtkeW5hbWljSW1wb3J0cyxhc3NldFByZWZpeCxkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ309dGhpcy5jb250ZXh0O3JldHVybiBkeW5hbWljSW1wb3J0cy5tYXAoZmlsZT0+e2lmKCFmaWxlLmVuZHNXaXRoKCcuanMnKSl7cmV0dXJuIG51bGw7fXJldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtyZWw6XCJwcmVsb2FkXCIsa2V5OmZpbGUsaHJlZjpgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLGFzOlwic2NyaXB0XCIsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSk7fSkvLyBGaWx0ZXIgb3V0IG51bGxlZCBzY3JpcHRzXG4uZmlsdGVyKEJvb2xlYW4pO31nZXRQcmVsb2FkTWFpbkxpbmtzKGZpbGVzKXtjb25zdHthc3NldFByZWZpeCxkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxzY3JpcHRMb2FkZXJ9PXRoaXMuY29udGV4dDtjb25zdCBwcmVsb2FkRmlsZXM9ZmlsZXMuYWxsRmlsZXMuZmlsdGVyKGZpbGU9PntyZXR1cm4gZmlsZS5lbmRzV2l0aCgnLmpzJyk7fSk7cmV0dXJuWy4uLihzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmV8fFtdKS5tYXAoZmlsZT0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse2tleTpmaWxlLnNyYyxub25jZTp0aGlzLnByb3BzLm5vbmNlLHJlbDpcInByZWxvYWRcIixocmVmOmZpbGUuc3JjLGFzOlwic2NyaXB0XCIsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pKSwuLi5wcmVsb2FkRmlsZXMubWFwKGZpbGU9Pi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtrZXk6ZmlsZSxub25jZTp0aGlzLnByb3BzLm5vbmNlLHJlbDpcInByZWxvYWRcIixocmVmOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsYXM6XCJzY3JpcHRcIixjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpXTt9Z2V0RHluYW1pY0NodW5rcyhmaWxlcyl7cmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LHRoaXMucHJvcHMsZmlsZXMpO31nZXRQcmVOZXh0U2NyaXB0cygpe3JldHVybiBnZXRQcmVOZXh0U2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyk7fWdldFNjcmlwdHMoZmlsZXMpe3JldHVybiBnZXRTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzLGZpbGVzKTt9Z2V0UG9seWZpbGxTY3JpcHRzKCl7cmV0dXJuIGdldFBvbHlmaWxsU2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyk7fWhhbmRsZURvY3VtZW50U2NyaXB0TG9hZGVySXRlbXMoY2hpbGRyZW4pe2NvbnN0e3NjcmlwdExvYWRlcn09dGhpcy5jb250ZXh0O2NvbnN0IHNjcmlwdExvYWRlckl0ZW1zPVtdO2NvbnN0IGZpbHRlcmVkQ2hpbGRyZW49W107X3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbixjaGlsZD0+e2lmKGNoaWxkLnR5cGU9PT1fc2NyaXB0LmRlZmF1bHQpe2lmKGNoaWxkLnByb3BzLnN0cmF0ZWd5PT09J2JlZm9yZUludGVyYWN0aXZlJyl7c2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlPShzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmV8fFtdKS5jb25jYXQoW3suLi5jaGlsZC5wcm9wc31dKTtyZXR1cm47fWVsc2UgaWYoWydsYXp5T25sb2FkJywnYWZ0ZXJJbnRlcmFjdGl2ZSddLmluY2x1ZGVzKGNoaWxkLnByb3BzLnN0cmF0ZWd5KSl7c2NyaXB0TG9hZGVySXRlbXMucHVzaChjaGlsZC5wcm9wcyk7cmV0dXJuO319ZmlsdGVyZWRDaGlsZHJlbi5wdXNoKGNoaWxkKTt9KTt0aGlzLmNvbnRleHQuX19ORVhUX0RBVEFfXy5zY3JpcHRMb2FkZXI9c2NyaXB0TG9hZGVySXRlbXM7cmV0dXJuIGZpbHRlcmVkQ2hpbGRyZW47fW1ha2VTdHlsZXNoZWV0SW5lcnQobm9kZSl7cmV0dXJuIF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChub2RlLGM9PntpZihjLnR5cGU9PT0nbGluaycmJmMucHJvcHNbJ2hyZWYnXSYmX2NvbnN0YW50cy5PUFRJTUlaRURfRk9OVF9QUk9WSURFUlMuc29tZSgoe3VybH0pPT5jLnByb3BzWydocmVmJ10uc3RhcnRzV2l0aCh1cmwpKSl7Y29uc3QgbmV3UHJvcHM9ey4uLihjLnByb3BzfHx7fSl9O25ld1Byb3BzWydkYXRhLWhyZWYnXT1uZXdQcm9wc1snaHJlZiddO25ld1Byb3BzWydocmVmJ109dW5kZWZpbmVkO3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jbG9uZUVsZW1lbnQoYyxuZXdQcm9wcyk7fWVsc2UgaWYoYy5wcm9wcyYmYy5wcm9wc1snY2hpbGRyZW4nXSl7Yy5wcm9wc1snY2hpbGRyZW4nXT10aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoYy5wcm9wc1snY2hpbGRyZW4nXSk7fXJldHVybiBjO30pO31yZW5kZXIoKXt2YXIgX3RoaXMkcHJvcHMkbm9uY2UsX3RoaXMkcHJvcHMkbm9uY2UyO2NvbnN0e3N0eWxlcyxhbXBQYXRoLGluQW1wTW9kZSxoeWJyaWRBbXAsY2Fub25pY2FsQmFzZSxfX05FWFRfREFUQV9fLGRhbmdlcm91c0FzUGF0aCxoZWFkVGFncyx1bnN0YWJsZV9ydW50aW1lSlMsdW5zdGFibGVfSnNQcmVsb2FkLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nfT10aGlzLmNvbnRleHQ7Y29uc3QgZGlzYWJsZVJ1bnRpbWVKUz11bnN0YWJsZV9ydW50aW1lSlM9PT1mYWxzZTtjb25zdCBkaXNhYmxlSnNQcmVsb2FkPXVuc3RhYmxlX0pzUHJlbG9hZD09PWZhbHNlfHwhZGlzYWJsZU9wdGltaXplZExvYWRpbmc7dGhpcy5jb250ZXh0LmRvY0NvbXBvbmVudHNSZW5kZXJlZC5IZWFkPXRydWU7bGV0e2hlYWR9PXRoaXMuY29udGV4dDtsZXQgY3NzUHJlbG9hZHM9W107bGV0IG90aGVySGVhZEVsZW1lbnRzPVtdO2lmKGhlYWQpe2hlYWQuZm9yRWFjaChjPT57aWYoYyYmYy50eXBlPT09J2xpbmsnJiZjLnByb3BzWydyZWwnXT09PSdwcmVsb2FkJyYmYy5wcm9wc1snYXMnXT09PSdzdHlsZScpe2Nzc1ByZWxvYWRzLnB1c2goYyk7fWVsc2V7YyYmb3RoZXJIZWFkRWxlbWVudHMucHVzaChjKTt9fSk7aGVhZD1jc3NQcmVsb2Fkcy5jb25jYXQob3RoZXJIZWFkRWxlbWVudHMpO31sZXQgY2hpbGRyZW49X3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKS5maWx0ZXIoQm9vbGVhbik7Ly8gc2hvdyBhIHdhcm5pbmcgaWYgSGVhZCBjb250YWlucyA8dGl0bGU+IChvbmx5IGluIGRldmVsb3BtZW50KVxuaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbicpe2NoaWxkcmVuPV9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChjaGlsZHJlbixjaGlsZD0+e3ZhciBfY2hpbGQkcHJvcHM7Y29uc3QgaXNSZWFjdEhlbG1ldD1jaGlsZD09bnVsbD92b2lkIDA6KF9jaGlsZCRwcm9wcz1jaGlsZC5wcm9wcyk9PW51bGw/dm9pZCAwOl9jaGlsZCRwcm9wc1snZGF0YS1yZWFjdC1oZWxtZXQnXTtpZighaXNSZWFjdEhlbG1ldCl7dmFyIF9jaGlsZCRwcm9wczI7aWYoKGNoaWxkPT1udWxsP3ZvaWQgMDpjaGlsZC50eXBlKT09PSd0aXRsZScpe2NvbnNvbGUud2FybihcIldhcm5pbmc6IDx0aXRsZT4gc2hvdWxkIG5vdCBiZSB1c2VkIGluIF9kb2N1bWVudC5qcydzIDxIZWFkPi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbm8tZG9jdW1lbnQtdGl0bGVcIik7fWVsc2UgaWYoKGNoaWxkPT1udWxsP3ZvaWQgMDpjaGlsZC50eXBlKT09PSdtZXRhJyYmKGNoaWxkPT1udWxsP3ZvaWQgMDooX2NoaWxkJHByb3BzMj1jaGlsZC5wcm9wcyk9PW51bGw/dm9pZCAwOl9jaGlsZCRwcm9wczIubmFtZSk9PT0ndmlld3BvcnQnKXtjb25zb2xlLndhcm4oXCJXYXJuaW5nOiB2aWV3cG9ydCBtZXRhIHRhZ3Mgc2hvdWxkIG5vdCBiZSB1c2VkIGluIF9kb2N1bWVudC5qcydzIDxIZWFkPi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbm8tZG9jdW1lbnQtdmlld3BvcnQtbWV0YVwiKTt9fXJldHVybiBjaGlsZDt9KTtpZih0aGlzLnByb3BzLmNyb3NzT3JpZ2luKWNvbnNvbGUud2FybignV2FybmluZzogYEhlYWRgIGF0dHJpYnV0ZSBgY3Jvc3NPcmlnaW5gIGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2RvYy1jcm9zc29yaWdpbi1kZXByZWNhdGVkJyk7fWlmKHByb2Nlc3MuZW52Lk5PREVfRU5WIT09J2RldmVsb3BtZW50JyYmcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTJiYhaW5BbXBNb2RlKXtjaGlsZHJlbj10aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoY2hpbGRyZW4pO31jaGlsZHJlbj10aGlzLmhhbmRsZURvY3VtZW50U2NyaXB0TG9hZGVySXRlbXMoY2hpbGRyZW4pO2xldCBoYXNBbXBodG1sUmVsPWZhbHNlO2xldCBoYXNDYW5vbmljYWxSZWw9ZmFsc2U7Ly8gc2hvdyB3YXJuaW5nIGFuZCByZW1vdmUgY29uZmxpY3RpbmcgYW1wIGhlYWQgdGFnc1xuaGVhZD1fcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5tYXAoaGVhZHx8W10sY2hpbGQ9PntpZighY2hpbGQpcmV0dXJuIGNoaWxkO2NvbnN0e3R5cGUscHJvcHN9PWNoaWxkO2lmKGluQW1wTW9kZSl7bGV0IGJhZFByb3A9Jyc7aWYodHlwZT09PSdtZXRhJyYmcHJvcHMubmFtZT09PSd2aWV3cG9ydCcpe2JhZFByb3A9J25hbWU9XCJ2aWV3cG9ydFwiJzt9ZWxzZSBpZih0eXBlPT09J2xpbmsnJiZwcm9wcy5yZWw9PT0nY2Fub25pY2FsJyl7aGFzQ2Fub25pY2FsUmVsPXRydWU7fWVsc2UgaWYodHlwZT09PSdzY3JpcHQnKXsvLyBvbmx5IGJsb2NrIGlmXG4vLyAxLiBpdCBoYXMgYSBzcmMgYW5kIGlzbid0IHBvaW50aW5nIHRvIGFtcHByb2plY3QncyBDRE5cbi8vIDIuIGl0IGlzIHVzaW5nIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIHdpdGhvdXQgYSB0eXBlIG9yXG4vLyBhIHR5cGUgb2YgdGV4dC9qYXZhc2NyaXB0XG5pZihwcm9wcy5zcmMmJnByb3BzLnNyYy5pbmRleE9mKCdhbXBwcm9qZWN0Jyk8LTF8fHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MJiYoIXByb3BzLnR5cGV8fHByb3BzLnR5cGU9PT0ndGV4dC9qYXZhc2NyaXB0Jykpe2JhZFByb3A9JzxzY3JpcHQnO09iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKHByb3A9PntiYWRQcm9wKz1gICR7cHJvcH09XCIke3Byb3BzW3Byb3BdfVwiYDt9KTtiYWRQcm9wKz0nLz4nO319aWYoYmFkUHJvcCl7Y29uc29sZS53YXJuKGBGb3VuZCBjb25mbGljdGluZyBhbXAgdGFnIFwiJHtjaGlsZC50eXBlfVwiIHdpdGggY29uZmxpY3RpbmcgcHJvcCAke2JhZFByb3B9IGluICR7X19ORVhUX0RBVEFfXy5wYWdlfS4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvY29uZmxpY3RpbmctYW1wLXRhZ2ApO3JldHVybiBudWxsO319ZWxzZXsvLyBub24tYW1wIG1vZGVcbmlmKHR5cGU9PT0nbGluaycmJnByb3BzLnJlbD09PSdhbXBodG1sJyl7aGFzQW1waHRtbFJlbD10cnVlO319cmV0dXJuIGNoaWxkO30pOy8vIHRyeSB0byBwYXJzZSBzdHlsZXMgZnJvbSBmcmFnbWVudCBmb3IgYmFja3dhcmRzIGNvbXBhdFxuY29uc3QgY3VyU3R5bGVzPUFycmF5LmlzQXJyYXkoc3R5bGVzKT9zdHlsZXM6W107aWYoaW5BbXBNb2RlJiZzdHlsZXMmJi8vIEB0cy1pZ25vcmUgUHJvcGVydHkgJ3Byb3BzJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIFJlYWN0RWxlbWVudFxuc3R5bGVzLnByb3BzJiYvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcbkFycmF5LmlzQXJyYXkoc3R5bGVzLnByb3BzLmNoaWxkcmVuKSl7Y29uc3QgaGFzU3R5bGVzPWVsPT57dmFyIF9lbCRwcm9wcyxfZWwkcHJvcHMkZGFuZ2Vyb3VzbHk7cmV0dXJuIGVsPT1udWxsP3ZvaWQgMDooX2VsJHByb3BzPWVsLnByb3BzKT09bnVsbD92b2lkIDA6KF9lbCRwcm9wcyRkYW5nZXJvdXNseT1fZWwkcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpPT1udWxsP3ZvaWQgMDpfZWwkcHJvcHMkZGFuZ2Vyb3VzbHkuX19odG1sO307Ly8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XG5zdHlsZXMucHJvcHMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZD0+e2lmKEFycmF5LmlzQXJyYXkoY2hpbGQpKXtjaGlsZC5mb3JFYWNoKGVsPT5oYXNTdHlsZXMoZWwpJiZjdXJTdHlsZXMucHVzaChlbCkpO31lbHNlIGlmKGhhc1N0eWxlcyhjaGlsZCkpe2N1clN0eWxlcy5wdXNoKGNoaWxkKTt9fSk7fWNvbnN0IGZpbGVzPWdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsdGhpcy5jb250ZXh0Ll9fTkVYVF9EQVRBX18ucGFnZSxpbkFtcE1vZGUpO3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaGVhZFwiLHRoaXMucHJvcHMsdGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtcImRhdGEtbmV4dC1oaWRlLWZvdWNcIjp0cnVlLFwiZGF0YS1hbXBkZXZtb2RlXCI6aW5BbXBNb2RlPyd0cnVlJzp1bmRlZmluZWQsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpgYm9keXtkaXNwbGF5Om5vbmV9YH19KSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIse1wiZGF0YS1uZXh0LWhpZGUtZm91Y1wiOnRydWUsXCJkYXRhLWFtcGRldm1vZGVcIjppbkFtcE1vZGU/J3RydWUnOnVuZGVmaW5lZH0sLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOmBib2R5e2Rpc3BsYXk6YmxvY2t9YH19KSkpLGNoaWxkcmVuLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9GT05UUyYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIse25hbWU6XCJuZXh0LWZvbnQtcHJlY29ubmVjdFwifSksaGVhZCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIix7bmFtZTpcIm5leHQtaGVhZC1jb3VudFwiLGNvbnRlbnQ6X3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4uY291bnQoaGVhZHx8W10pLnRvU3RyaW5nKCl9KSxpbkFtcE1vZGUmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIse25hbWU6XCJ2aWV3cG9ydFwiLGNvbnRlbnQ6XCJ3aWR0aD1kZXZpY2Utd2lkdGgsbWluaW11bS1zY2FsZT0xLGluaXRpYWwtc2NhbGU9MVwifSksIWhhc0Nhbm9uaWNhbFJlbCYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse3JlbDpcImNhbm9uaWNhbFwiLGhyZWY6Y2Fub25pY2FsQmFzZSsoMCxfdXRpbHMyLmNsZWFuQW1wUGF0aCkoZGFuZ2Vyb3VzQXNQYXRoKX0pLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtyZWw6XCJwcmVsb2FkXCIsYXM6XCJzY3JpcHRcIixocmVmOlwiaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanNcIn0pLHN0eWxlcyYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtcImFtcC1jdXN0b21cIjpcIlwiLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6Y3VyU3R5bGVzLm1hcChzdHlsZT0+c3R5bGUucHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sKS5qb2luKCcnKS5yZXBsYWNlKC9cXC9cXCojIHNvdXJjZU1hcHBpbmdVUkw9LipcXCpcXC8vZywnJykucmVwbGFjZSgvXFwvXFwqQCBzb3VyY2VVUkw9Lio/XFwqXFwvL2csJycpfX0pLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIix7XCJhbXAtYm9pbGVycGxhdGVcIjpcIlwiLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6YGJvZHl7LXdlYmtpdC1hbmltYXRpb246LWFtcC1zdGFydCA4cyBzdGVwcygxLGVuZCkgMHMgMSBub3JtYWwgYm90aDstbW96LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tcy1hbmltYXRpb246LWFtcC1zdGFydCA4cyBzdGVwcygxLGVuZCkgMHMgMSBub3JtYWwgYm90aDthbmltYXRpb246LWFtcC1zdGFydCA4cyBzdGVwcygxLGVuZCkgMHMgMSBub3JtYWwgYm90aH1ALXdlYmtpdC1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tb3ota2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fUAtbXMta2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fUAtby1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QGtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1gfX0pLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIixudWxsLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIix7XCJhbXAtYm9pbGVycGxhdGVcIjpcIlwiLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6YGJvZHl7LXdlYmtpdC1hbmltYXRpb246bm9uZTstbW96LWFuaW1hdGlvbjpub25lOy1tcy1hbmltYXRpb246bm9uZTthbmltYXRpb246bm9uZX1gfX0pKSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHthc3luYzp0cnVlLHNyYzpcImh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwLmpzXCJ9KSksIWluQW1wTW9kZSYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCwhaGFzQW1waHRtbFJlbCYmaHlicmlkQW1wJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7cmVsOlwiYW1waHRtbFwiLGhyZWY6Y2Fub25pY2FsQmFzZStnZXRBbXBQYXRoKGFtcFBhdGgsZGFuZ2Vyb3VzQXNQYXRoKX0pLCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTJiZ0aGlzLmdldENzc0xpbmtzKGZpbGVzKSwhcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0NTUyYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLHtcImRhdGEtbi1jc3NcIjooX3RoaXMkcHJvcHMkbm9uY2U9dGhpcy5wcm9wcy5ub25jZSkhPW51bGw/X3RoaXMkcHJvcHMkbm9uY2U6Jyd9KSxwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfSU1BR0VTJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIix7bmFtZTpcIm5leHQtaW1hZ2UtcHJlbG9hZFwifSksIWRpc2FibGVSdW50aW1lSlMmJiFkaXNhYmxlSnNQcmVsb2FkJiZ0aGlzLmdldFByZWxvYWREeW5hbWljQ2h1bmtzKCksIWRpc2FibGVSdW50aW1lSlMmJiFkaXNhYmxlSnNQcmVsb2FkJiZ0aGlzLmdldFByZWxvYWRNYWluTGlua3MoZmlsZXMpLCFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyYmIWRpc2FibGVSdW50aW1lSlMmJnRoaXMuZ2V0UG9seWZpbGxTY3JpcHRzKCksIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyYmIWRpc2FibGVSdW50aW1lSlMmJnRoaXMuZ2V0RHluYW1pY0NodW5rcyhmaWxlcyksIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRTY3JpcHRzKGZpbGVzKSxwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTJiZ0aGlzLmdldENzc0xpbmtzKGZpbGVzKSxwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIse1wiZGF0YS1uLWNzc1wiOihfdGhpcyRwcm9wcyRub25jZTI9dGhpcy5wcm9wcy5ub25jZSkhPW51bGw/X3RoaXMkcHJvcHMkbm9uY2UyOicnfSksdGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQmJi8qI19fUFVSRV9fKi8gLy8gdGhpcyBlbGVtZW50IGlzIHVzZWQgdG8gbW91bnQgZGV2ZWxvcG1lbnQgc3R5bGVzIHNvIHRoZVxuLy8gb3JkZXJpbmcgbWF0Y2hlcyBwcm9kdWN0aW9uXG4vLyAoYnkgZGVmYXVsdCwgc3R5bGUtbG9hZGVyIGluamVjdHMgYXQgdGhlIGJvdHRvbSBvZiA8aGVhZCAvPilcbl9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLHtpZDpcIl9fbmV4dF9jc3NfX0RPX05PVF9VU0VfX1wifSksc3R5bGVzfHxudWxsKSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCx7fSwuLi4oaGVhZFRhZ3N8fFtdKSkpO319ZXhwb3J0cy5IZWFkPUhlYWQ7SGVhZC5jb250ZXh0VHlwZT1fZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dDtIZWFkLnByb3BUeXBlcz17bm9uY2U6X3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxjcm9zc09yaWdpbjpfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nfTtmdW5jdGlvbiBNYWluKCl7Y29uc3R7aW5BbXBNb2RlLGh0bWwsZG9jQ29tcG9uZW50c1JlbmRlcmVkfT0oMCxfcmVhY3QudXNlQ29udGV4dCkoX2RvY3VtZW50Q29udGV4dC5Eb2N1bWVudENvbnRleHQpO2RvY0NvbXBvbmVudHNSZW5kZXJlZC5NYWluPXRydWU7aWYoaW5BbXBNb2RlKXJldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LG51bGwsX2NvbnN0YW50cy5BTVBfUkVOREVSX1RBUkdFVCk7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7aWQ6XCJfX25leHRcIixkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOmh0bWx9fSk7fWNsYXNzIE5leHRTY3JpcHQgZXh0ZW5kcyBfcmVhY3QuQ29tcG9uZW50e2NvbnN0cnVjdG9yKC4uLmFyZ3Mpe3N1cGVyKC4uLmFyZ3MpO3RoaXMuY29udGV4dD12b2lkIDA7fWdldER5bmFtaWNDaHVua3MoZmlsZXMpe3JldHVybiBnZXREeW5hbWljQ2h1bmtzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzLGZpbGVzKTt9Z2V0UHJlTmV4dFNjcmlwdHMoKXtyZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LHRoaXMucHJvcHMpO31nZXRTY3JpcHRzKGZpbGVzKXtyZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyxmaWxlcyk7fWdldFBvbHlmaWxsU2NyaXB0cygpe3JldHVybiBnZXRQb2x5ZmlsbFNjcmlwdHModGhpcy5jb250ZXh0LHRoaXMucHJvcHMpO31zdGF0aWMgZ2V0SW5saW5lU2NyaXB0U291cmNlKGRvY3VtZW50UHJvcHMpe2NvbnN0e19fTkVYVF9EQVRBX199PWRvY3VtZW50UHJvcHM7dHJ5e2NvbnN0IGRhdGE9SlNPTi5zdHJpbmdpZnkoX19ORVhUX0RBVEFfXyk7cmV0dXJuKDAsX2h0bWxlc2NhcGUuaHRtbEVzY2FwZUpzb25TdHJpbmcpKGRhdGEpO31jYXRjaChlcnIpe2lmKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NpcmN1bGFyIHN0cnVjdHVyZScpKXt0aHJvdyBuZXcgRXJyb3IoYENpcmN1bGFyIHN0cnVjdHVyZSBpbiBcImdldEluaXRpYWxQcm9wc1wiIHJlc3VsdCBvZiBwYWdlIFwiJHtfX05FWFRfREFUQV9fLnBhZ2V9XCIuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2NpcmN1bGFyLXN0cnVjdHVyZWApO310aHJvdyBlcnI7fX1yZW5kZXIoKXtjb25zdHthc3NldFByZWZpeCxpbkFtcE1vZGUsYnVpbGRNYW5pZmVzdCx1bnN0YWJsZV9ydW50aW1lSlMsZG9jQ29tcG9uZW50c1JlbmRlcmVkLGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nfT10aGlzLmNvbnRleHQ7Y29uc3QgZGlzYWJsZVJ1bnRpbWVKUz11bnN0YWJsZV9ydW50aW1lSlM9PT1mYWxzZTtkb2NDb21wb25lbnRzUmVuZGVyZWQuTmV4dFNjcmlwdD10cnVlO2lmKGluQW1wTW9kZSl7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlY9PT0ncHJvZHVjdGlvbicpe3JldHVybiBudWxsO31jb25zdCBhbXBEZXZGaWxlcz1bLi4uYnVpbGRNYW5pZmVzdC5kZXZGaWxlcywuLi5idWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMsLi4uYnVpbGRNYW5pZmVzdC5hbXBEZXZGaWxlc107cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCxkaXNhYmxlUnVudGltZUpTP251bGw6LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7aWQ6XCJfX05FWFRfREFUQV9fXCIsdHlwZTpcImFwcGxpY2F0aW9uL2pzb25cIixub25jZTp0aGlzLnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpOZXh0U2NyaXB0LmdldElubGluZVNjcmlwdFNvdXJjZSh0aGlzLmNvbnRleHQpfSxcImRhdGEtYW1wZGV2bW9kZVwiOnRydWV9KSxhbXBEZXZGaWxlcy5tYXAoZmlsZT0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7a2V5OmZpbGUsc3JjOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2ZpbGV9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLG5vbmNlOnRoaXMucHJvcHMubm9uY2UsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixcImRhdGEtYW1wZGV2bW9kZVwiOnRydWV9KSkpO31pZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7aWYodGhpcy5wcm9wcy5jcm9zc09yaWdpbiljb25zb2xlLndhcm4oJ1dhcm5pbmc6IGBOZXh0U2NyaXB0YCBhdHRyaWJ1dGUgYGNyb3NzT3JpZ2luYCBpcyBkZXByZWNhdGVkLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9kb2MtY3Jvc3NvcmlnaW4tZGVwcmVjYXRlZCcpO31jb25zdCBmaWxlcz1nZXREb2N1bWVudEZpbGVzKHRoaXMuY29udGV4dC5idWlsZE1hbmlmZXN0LHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsaW5BbXBNb2RlKTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCxudWxsLCFkaXNhYmxlUnVudGltZUpTJiZidWlsZE1hbmlmZXN0LmRldkZpbGVzP2J1aWxkTWFuaWZlc3QuZGV2RmlsZXMubWFwKGZpbGU9Pi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIse2tleTpmaWxlLHNyYzpgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLG5vbmNlOnRoaXMucHJvcHMubm9uY2UsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pKTpudWxsLGRpc2FibGVSdW50aW1lSlM/bnVsbDovKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtpZDpcIl9fTkVYVF9EQVRBX19cIix0eXBlOlwiYXBwbGljYXRpb24vanNvblwiLG5vbmNlOnRoaXMucHJvcHMubm9uY2UsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOk5leHRTY3JpcHQuZ2V0SW5saW5lU2NyaXB0U291cmNlKHRoaXMuY29udGV4dCl9fSksZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFBvbHlmaWxsU2NyaXB0cygpLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXREeW5hbWljQ2h1bmtzKGZpbGVzKSxkaXNhYmxlT3B0aW1pemVkTG9hZGluZyYmIWRpc2FibGVSdW50aW1lSlMmJnRoaXMuZ2V0U2NyaXB0cyhmaWxlcykpO319ZXhwb3J0cy5OZXh0U2NyaXB0PU5leHRTY3JpcHQ7TmV4dFNjcmlwdC5jb250ZXh0VHlwZT1fZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dDtOZXh0U2NyaXB0LnByb3BUeXBlcz17bm9uY2U6X3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxjcm9zc09yaWdpbjpfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nfTtOZXh0U2NyaXB0LnNhZmFyaU5vbW9kdWxlRml4PSchZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudCx0PWUuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtpZighKFwibm9Nb2R1bGVcImluIHQpJiZcIm9uYmVmb3JlbG9hZFwiaW4gdCl7dmFyIG49ITE7ZS5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JlbG9hZFwiLGZ1bmN0aW9uKGUpe2lmKGUudGFyZ2V0PT09dCluPSEwO2Vsc2UgaWYoIWUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcIm5vbW9kdWxlXCIpfHwhbilyZXR1cm47ZS5wcmV2ZW50RGVmYXVsdCgpfSwhMCksdC50eXBlPVwibW9kdWxlXCIsdC5zcmM9XCIuXCIsZS5oZWFkLmFwcGVuZENoaWxkKHQpLHQucmVtb3ZlKCl9fSgpOyc7ZnVuY3Rpb24gZ2V0QW1wUGF0aChhbXBQYXRoLGFzUGF0aCl7cmV0dXJuIGFtcFBhdGh8fGAke2FzUGF0aH0ke2FzUGF0aC5pbmNsdWRlcygnPycpPycmJzonPyd9YW1wPTFgO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPV9kb2N1bWVudC5qcy5tYXAiLCJpbXBvcnQgRG9jdW1lbnQsIHsgRG9jdW1lbnRDb250ZXh0LCBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCdcclxuXHJcbmltcG9ydCB7IFNlcnZlclN0eWxlU2hlZXQgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcclxuXHJcbmltcG9ydCB7IGdldFRoZW1lUHJvcHMgfSBmcm9tICdjb21wb25lbnRzL2xpYi9nZXRUaGVtZVByb3BzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcclxuICBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eDogRG9jdW1lbnRDb250ZXh0KSB7XHJcbiAgICBjb25zdCBzaGVldCA9IG5ldyBTZXJ2ZXJTdHlsZVNoZWV0KClcclxuICAgIGNvbnN0IG9yaWdpbmFsUmVuZGVyUGFnZSA9IGN0eC5yZW5kZXJQYWdlXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY3R4LnJlbmRlclBhZ2UgPSAoKSA9PlxyXG4gICAgICAgIG9yaWdpbmFsUmVuZGVyUGFnZSh7XHJcbiAgICAgICAgICBlbmhhbmNlQXBwOiAoQXBwKSA9PiAocHJvcHMpID0+IHNoZWV0LmNvbGxlY3RTdHlsZXMoPEFwcCB7Li4ucHJvcHN9IC8+KSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eClcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5pbml0aWFsUHJvcHMsXHJcbiAgICAgICAgY3NzVGhlbWVQcm9wczogZ2V0VGhlbWVQcm9wcyhjdHgucmVxLCAnY3NzJyksXHJcbiAgICAgICAgc3R5bGVzOiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICB7aW5pdGlhbFByb3BzLnN0eWxlc31cclxuICAgICAgICAgICAge3NoZWV0LmdldFN0eWxlRWxlbWVudCgpfVxyXG4gICAgICAgICAgPC8+XHJcbiAgICAgICAgKSxcclxuICAgICAgfVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2hlZXQuc2VhbCgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGNvbG9yTW9kZSwgbmlnaHRTY2hlbWUsIGRheVNjaGVtZSB9ID0gKHRoaXMucHJvcHMgYXMgYW55KS5jc3NUaGVtZVByb3BzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8SHRtbD5cclxuICAgICAgICA8SGVhZCAvPlxyXG4gICAgICAgIDxib2R5XHJcbiAgICAgICAgICBkYXRhLWNvbG9yLW1vZGU9e2NvbG9yTW9kZX1cclxuICAgICAgICAgIGRhdGEtZGFyay10aGVtZT17bmlnaHRTY2hlbWV9XHJcbiAgICAgICAgICBkYXRhLWxpZ2h0LXRoZW1lPXtkYXlTY2hlbWV9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPE1haW4gLz5cclxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XHJcbiAgICAgICAgPC9ib2R5PlxyXG4gICAgICA8L0h0bWw+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuaHRtbEVzY2FwZUpzb25TdHJpbmc9aHRtbEVzY2FwZUpzb25TdHJpbmc7Ly8gVGhpcyB1dGlsaXR5IGlzIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2h0bWxlc2NhcGVcbi8vIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2h0bWxlc2NhcGUvYmxvYi8wNTI3Y2E3MTU2YTUyNGQyNTYxMDFiYjMxMGE5Zjk3MGY2MzA3OGFkL0xJQ0VOU0VcbmNvbnN0IEVTQ0FQRV9MT09LVVA9eycmJzonXFxcXHUwMDI2JywnPic6J1xcXFx1MDAzZScsJzwnOidcXFxcdTAwM2MnLCdcXHUyMDI4JzonXFxcXHUyMDI4JywnXFx1MjAyOSc6J1xcXFx1MjAyOSd9O2NvbnN0IEVTQ0FQRV9SRUdFWD0vWyY+PFxcdTIwMjhcXHUyMDI5XS9nO2Z1bmN0aW9uIGh0bWxFc2NhcGVKc29uU3RyaW5nKHN0cil7cmV0dXJuIHN0ci5yZXBsYWNlKEVTQ0FQRV9SRUdFWCxtYXRjaD0+RVNDQVBFX0xPT0tVUFttYXRjaF0pO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxlc2NhcGUuanMubWFwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2RvY3VtZW50JylcbiIsImZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kczsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvY29uc3RhbnRzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2RvY3VtZW50LWNvbnRleHQuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHQuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdXRpbHMuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXMuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvdXRpbHMuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtanN4L3NlcnZlclwiKTs7Il0sInNvdXJjZVJvb3QiOiIifQ==
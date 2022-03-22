exports.id = 410;
exports.ids = [410];
exports.modules = {

/***/ 3718:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": function() { return /* binding */ PrintAction; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function PrintAction({
  children
}) {
  const onClick = () => {
    try {
      document.execCommand('print', false);
    } catch (e) {
      window.print();
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().cloneElement(react__WEBPACK_IMPORTED_MODULE_0___default().Children.only(children), {
    onClick
  });
}

/***/ }),

/***/ 3410:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _productId_; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./javascripts/copy-code.ts
function copyCode() {
  const buttons = Array.from(document.querySelectorAll('button.js-btn-copy'));
  if (!buttons) return;
  buttons.forEach(button => button.addEventListener('click', async () => {
    const text = button.dataset.clipboardText;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    const beforeTooltip = button.getAttribute('aria-label') || '';
    button.setAttribute('aria-label', 'Copied!');
    setTimeout(() => {
      button.setAttribute('aria-label', beforeTooltip);
    }, 2000);
  }));
}
// EXTERNAL MODULE: ./javascripts/user-agent.ts
var user_agent = __webpack_require__(3162);
;// CONCATENATED MODULE: ./javascripts/display-platform-specific-content.ts

const supportedPlatforms = ['mac', 'windows', 'linux'];
const detectedPlatforms = new Set(); // Emphasize content for the visitor's OS (inferred from user agent string)

function displayPlatformSpecificContent() {
  let platform = getDefaultPlatform() || (0,user_agent/* default */.Z)().os; // adjust platform names to fit existing mac/windows/linux scheme

  if (!platform) platform = 'linux';
  if (platform === 'ios') platform = 'mac';
  const platformsInContent = getDetectedPlatforms(); // when the `defaultPlatform` frontmatter isn't set and the article
  // does not define all platforms in the content, documentation is hidden
  // for users with the undefined platform. This sets a default
  // platform for those users to prevent unintentionally hiding content

  if (!platformsInContent.includes(platform)) {
    // uses the order of the supportedPlatforms array to
    // determine the default platform
    platform = supportedPlatforms.filter(elem => platformsInContent.includes(elem))[0];
  }

  showPlatformSpecificContent(platform);
  hideSwitcherLinks(platformsInContent);
  setActiveSwitcherLinks(platform); // configure links for switching platform content

  switcherLinks().forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      setActiveSwitcherLinks(target.dataset.platform || '');
      showPlatformSpecificContent(target.dataset.platform || '');
    });
  });
}

function setActiveSwitcherLinks(platform) {
  // (de)activate switcher link appearances
  switcherLinks().forEach(link => {
    link.dataset.platform === platform ? link.classList.add('selected') : link.classList.remove('selected');
  });
}

function showPlatformSpecificContent(platform) {
  // find all platform-specific *block* elements and hide or show as appropriate
  // example: {{ #mac }} block content {{/mac}}
  const markdowns = Array.from(document.querySelectorAll('.extended-markdown'));
  markdowns.filter(el => supportedPlatforms.some(platform => el.classList.contains(platform))).forEach(el => {
    el.style.display = el.classList.contains(platform) ? '' : 'none';
  }); // find all platform-specific *inline* elements and hide or show as appropriate
  // example: <span class="platform-mac">inline content</span>

  const platforms = Array.from(document.querySelectorAll('.platform-mac, .platform-windows, .platform-linux'));
  platforms.forEach(el => {
    el.style.display = el.classList.contains('platform-' + platform) ? '' : 'none';
  });
} // hide links for any platform-specific sections that are not present


function hideSwitcherLinks(platformsInContent) {
  const links = Array.from(document.querySelectorAll('a.platform-switcher'));
  links.forEach(link => {
    if (platformsInContent.includes(link.dataset.platform || '')) return;
    link.style.display = 'none';
  });
} // gets the list of detected platforms in the current article


function getDetectedPlatforms() {
  // find all platform-specific *block* elements and hide or show as appropriate
  // example: {{ #mac }} block content {{/mac}}
  const allEls = Array.from(document.querySelectorAll('.extended-markdown'));
  allEls.filter(el => supportedPlatforms.some(platform => el.classList.contains(platform))).forEach(el => detectPlatforms(el)); // find all platform-specific *inline* elements and hide or show as appropriate
  // example: <span class="platform-mac">inline content</span>

  const platformEls = Array.from(document.querySelectorAll('.platform-mac, .platform-windows, .platform-linux'));
  platformEls.forEach(el => detectPlatforms(el));
  return Array.from(detectedPlatforms);
}

function detectPlatforms(el) {
  el.classList.forEach(elClass => {
    const value = elClass.replace(/platform-/, '');
    if (supportedPlatforms.includes(value)) detectedPlatforms.add(value);
  });
}

function getDefaultPlatform() {
  const el = document.querySelector('[data-default-platform]');
  if (el) return el.dataset.defaultPlatform;
}

function switcherLinks() {
  return Array.from(document.querySelectorAll('a.platform-switcher'));
}
// EXTERNAL MODULE: external "js-cookie"
var external_js_cookie_ = __webpack_require__(6155);
var external_js_cookie_default = /*#__PURE__*/__webpack_require__.n(external_js_cookie_);
// EXTERNAL MODULE: external "scroll-anchoring"
var external_scroll_anchoring_ = __webpack_require__(2802);
// EXTERNAL MODULE: ./javascripts/events.ts + 1 modules
var events = __webpack_require__(6143);
;// CONCATENATED MODULE: ./javascripts/display-tool-specific-content.ts



const supportedTools = ['cli', 'desktop', 'webui', 'curl'];
function displayToolSpecificContent() {
  const toolElements = Array.from(document.querySelectorAll('.extended-markdown')).filter(el => supportedTools.some(tool => el.classList.contains(tool)));
  if (!toolElements.length) return;
  const detectedTools = toolElements.flatMap(el => Array.from(el.classList).filter(className => supportedTools.includes(className)));
  const tool = getDefaultTool(detectedTools);
  showToolSpecificContent(tool, toolElements);
  display_tool_specific_content_hideSwitcherLinks(detectedTools);
  highlightTabForTool(tool); // configure links for switching tool content

  display_tool_specific_content_switcherLinks().forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      highlightTabForTool(target.dataset.tool || '');
      (0,external_scroll_anchoring_.preserveAnchorNodePosition)(document, () => {
        showToolSpecificContent(target.dataset.tool || '', toolElements);
      }); // Save this preference as a cookie.

      external_js_cookie_default().set('toolPreferred', target.dataset.tool || '', {
        sameSite: 'strict',
        secure: true
      }); // Send event data

      (0,events/* sendEvent */.qP)({
        type: events/* EventType.preference */.tw.preference,
        preference_name: 'application',
        preference_value: target.dataset.tool
      });
    });
  });
}

function highlightTabForTool(tool) {
  // (de)activate switcher link appearances
  display_tool_specific_content_switcherLinks().forEach(link => {
    link.dataset.tool === tool ? link.classList.add('selected') : link.classList.remove('selected');
  });
}

function showToolSpecificContent(tool, toolElements) {
  // show the content only for the highlighted tool
  toolElements.filter(el => supportedTools.some(tool => el.classList.contains(tool))).forEach(el => {
    el.style.display = el.classList.contains(tool) ? '' : 'none';
  });
} // hide links for any tool-specific sections that are not present


function display_tool_specific_content_hideSwitcherLinks(detectedTools) {
  const links = Array.from(document.querySelectorAll('a.tool-switcher'));
  links.forEach(link => {
    if (detectedTools.includes(link.dataset.tool || '')) return;
    link.style.display = 'none';
  });
}

function getDefaultTool(detectedTools) {
  // If the user selected a tool preference and the tool is present on this page
  const cookieValue = external_js_cookie_default().get('toolPreferred');
  if (cookieValue && detectedTools.includes(cookieValue)) return cookieValue; // If there is a default tool and the tool is present on this page

  const defaultToolEl = document.querySelector('[data-default-tool]');
  const defaultToolValue = defaultToolEl ? defaultToolEl.dataset.defaultTool : '';

  if (defaultToolValue && detectedTools.includes(defaultToolValue)) {
    return defaultToolValue;
  } // Default to webui if present (this is generally the case where we show UI/CLI/Desktop info)


  if (detectedTools.includes('webui')) return 'webui'; // Default to cli if present (this is generally the case where we show curl/CLI info)

  if (detectedTools.includes('cli')) return 'cli'; // Otherwise, just choose the first detected tool

  return detectedTools[0];
}

function display_tool_specific_content_switcherLinks() {
  return Array.from(document.querySelectorAll('a.tool-switcher'));
}
;// CONCATENATED MODULE: ./javascripts/localization.ts
/* harmony default export */ function localization() {
  const linkToEnglish = document.querySelector('#to-english-doc');

  if (linkToEnglish) {
    const pathname = window.location.pathname.split('/');
    pathname[1] = 'en';
    linkToEnglish.href = pathname.join('/');
  }
}
;// CONCATENATED MODULE: ./javascripts/toggle-images.ts
// import { sendEvent } from './events'
 // Determines whether images are hidden or displayed on first visit.

const hideImagesByDefault = false; // Set the image placeholder icon here.

const placeholderImagePath = '/assets/images/octicons/image.svg';
/*
 * This module adds a new icon button in the margin to toggle all images on the page.
 * It uses cookies to keep track of a user's selected image preference.
 */

/* harmony default export */ function toggle_images() {
  const toggleImagesBtn = document.getElementById('js-toggle-images');
  if (!toggleImagesBtn) return; // If there are no images on the page, return!
  // Don't include images in tables, which are already small and shouldn't be hidden.

  const images = Array.from(document.querySelectorAll('img')).filter(img => !img.closest('table'));
  if (!images.length) return; // The button is hidden by default so it doesn't appear on browsers with JS disabled.
  // If there are images on a docs page and JS is enabled, display the toggle button.

  toggleImagesBtn.removeAttribute('hidden'); // Look for a cookie with image visibility preference; otherwise, use the default.

  const hideImagesPreferred = external_js_cookie_default().get('hideImagesPreferred') === 'true' || hideImagesByDefault; // Hide the images if that is the preference.

  if (hideImagesPreferred) {
    toggleImages(images, 'hide');
  } // Get the span elements containing the off and on icons.


  const offIcon = document.getElementById('js-off-icon');
  const onIcon = document.getElementById('js-on-icon'); // Get the aria-labels from the span elements for the tooltips.

  const tooltipImagesOff = (offIcon === null || offIcon === void 0 ? void 0 : offIcon.getAttribute('aria-label')) || '';
  const tooltipImagesOn = (onIcon === null || onIcon === void 0 ? void 0 : onIcon.getAttribute('aria-label')) || ''; // Set the starting state depending on user preferences.

  if (hideImagesPreferred) {
    offIcon === null || offIcon === void 0 ? void 0 : offIcon.removeAttribute('hidden');
    toggleImagesBtn.setAttribute('aria-label', tooltipImagesOff);
  } else {
    onIcon === null || onIcon === void 0 ? void 0 : onIcon.removeAttribute('hidden');
    toggleImagesBtn.setAttribute('aria-label', tooltipImagesOn);
  } // If images are hidden by default, showOnNextClick should be false.
  // If images are not hidden by default, showOnNextClick should be true.


  let showOnNextClick = !hideImagesPreferred;
  toggleImagesBtn.addEventListener('click', () => {
    if (showOnNextClick) {
      // Button should say "Images are off" on first click (depending on prefs)
      offIcon === null || offIcon === void 0 ? void 0 : offIcon.removeAttribute('hidden');
      onIcon === null || onIcon === void 0 ? void 0 : onIcon.setAttribute('hidden', 'hidden');
      toggleImagesBtn.setAttribute('aria-label', tooltipImagesOff);
      toggleImages(images, 'hide');
    } else {
      // Button should say "Images are on" on another click
      offIcon === null || offIcon === void 0 ? void 0 : offIcon.setAttribute('hidden', 'hidden');
      onIcon === null || onIcon === void 0 ? void 0 : onIcon.removeAttribute('hidden');
      toggleImagesBtn.setAttribute('aria-label', tooltipImagesOn);
      toggleImages(images, 'show');
    } // Remove focus from the button after click so the tooltip does not stay displayed.
    // Use settimeout to work around Firefox-specific issue.


    setTimeout(() => {
      toggleImagesBtn.blur();
    }, 100); // Save this preference as a cookie.

    external_js_cookie_default().set('hideImagesPreferred', showOnNextClick.toString(), {
      sameSite: 'strict',
      secure: true
    }); // Toggle the action on every click.

    showOnNextClick = !showOnNextClick; // TODO Track image toggle events
    // sendEvent({ type: 'imageToggle' })
  });
}

function toggleImages(images, action) {
  for (const img of images) {
    toggleImage(img, action);
  }
}

function toggleImage(img, action) {
  const parentEl = img.parentNode; // Style the parent element and image depending on the state.

  if (action === 'show') {
    img.src = img.getAttribute('originalSrc') || '';
    img.style.border = '2px solid var(--color-auto-gray-2)';
    parentEl.style.display = 'block';
    parentEl.style.marginTop = '20px';
    parentEl.style.padding = '10px 0';
  } else {
    if (!img.getAttribute('originalSrc')) img.setAttribute('originalSrc', img.src);
    img.src = placeholderImagePath;
    img.style.border = 'none';
    parentEl.style.display = 'inline';
    parentEl.style.marginTop = '0';
    parentEl.style.padding = '1px 6px';
  }
}
// EXTERNAL MODULE: external "lodash/escape"
var escape_ = __webpack_require__(1790);
var escape_default = /*#__PURE__*/__webpack_require__.n(escape_);
;// CONCATENATED MODULE: ./javascripts/wrap-code-terms.ts

const wordsLongerThan18Chars = /[\S]{18,}/g;
const camelCaseChars = /([a-z])([A-Z])/g;
const underscoresAfter12thChar = /([\w:]{12}[^_]*?)_/g;
const slashChars = /([/\\])/g; // This module improves table rendering on reference pages by inserting a <wbr>
// tag in code terms that use camelcase, slashes, or underscores, inspired by
// http://heap.ch/blog/2016/01/19/camelwrap/

/* harmony default export */ function wrap_code_terms() {
  const codeTerms = document.querySelectorAll('#article-contents table code');
  if (!codeTerms) return;
  codeTerms.forEach(node => {
    // Return early if a child node is an anchor element
    const hasChildAnchor = Array.from(node.childNodes).some(child => child.nodeName === 'A');
    if (hasChildAnchor) return; // Do the wrapping on the inner text only

    const oldText = escape_default()(node.textContent || '');
    const newText = oldText.replace(wordsLongerThan18Chars, str => {
      return str // GraphQL code terms use camelcase
      .replace(camelCaseChars, '$1<wbr>$2') // REST code terms use underscores
      // to keep word breaks looking nice, only break on underscores after the 12th char
      // so `has_organization_projects` will break after `has_organization` instead of after `has_`
      .replace(underscoresAfter12thChar, '$1_<wbr>') // Some Actions reference pages have tables with code terms separated by slashes
      .replace(slashChars, '$1<wbr>');
    });
    node.innerHTML = node.innerHTML.replace(oldText, newText);
  });
}
// EXTERNAL MODULE: ./components/context/MainContext.tsx
var MainContext = __webpack_require__(1013);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "lodash/pick"
var pick_ = __webpack_require__(9116);
var pick_default = /*#__PURE__*/__webpack_require__.n(pick_);
;// CONCATENATED MODULE: ./components/context/ProductLandingContext.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const ProductLandingContext = /*#__PURE__*/(0,external_react_.createContext)(null);
const useProductLandingContext = () => {
  const context = (0,external_react_.useContext)(ProductLandingContext);

  if (!context) {
    throw new Error('"useProductLandingContext" may only be used inside "ProductLandingContext.Provider"');
  }

  return context;
};
const getFeaturedLinksFromReq = req => {
  return Object.fromEntries(Object.entries(req.context.featuredLinks || {}).map(([key, entries]) => {
    return [key, (entries || []).map(entry => ({
      href: entry.href,
      title: entry.title,
      intro: entry.intro,
      authors: entry.page.authors || []
    }))];
  }));
};
const getProductLandingContextFromRequest = req => {
  const productTree = req.context.currentProductTree;
  const page = req.context.page;
  const hasGuidesPage = (page.children || []).includes('/guides');
  return _objectSpread(_objectSpread({}, pick_default()(page, ['title', 'shortTitle', 'introPlainText', 'beta_product', 'intro', 'product_video'])), {}, {
    hasGuidesPage,
    product: {
      href: productTree.href,
      title: productTree.renderedShortTitle || productTree.renderedFullTitle
    },
    whatsNewChangelog: req.context.whatsNewChangelog || [],
    changelogUrl: req.context.changelogUrl || [],
    productCodeExamples: req.context.productCodeExamples || [],
    productCommunityExamples: req.context.productCommunityExamples || [],
    releases: req.context.releases || [],
    productUserExamples: (req.context.productUserExamples || []).map(({
      user,
      description
    }) => ({
      username: user,
      description
    })),
    introLinks: page.introLinks ? {
      quickstart: page.introLinks.quickstart,
      reference: page.introLinks.reference,
      overview: page.introLinks.overview
    } : null,
    featuredLinks: getFeaturedLinksFromReq(req),
    tocItems: req.context.tocItems || [],
    featuredArticles: Object.entries(req.context.featuredLinks || []).filter(([key]) => {
      return key === 'guides' || key === 'popular';
    }).map(([key, links]) => {
      return {
        label: key === 'popular' ? req.context.page.featuredLinks.popularHeading || req.context.site.data.ui.toc[key] : req.context.site.data.ui.toc[key],
        viewAllHref: key === 'guides' && !req.context.currentCategory && hasGuidesPage ? `${req.context.currentPath}/guides` : '',
        articles: links.map(link => {
          return {
            hideIntro: key === 'popular',
            href: link.href,
            title: link.title,
            intro: link.intro,
            authors: link.page.authors || []
          };
        })
      };
    })
  });
};
;// CONCATENATED MODULE: ./components/context/ProductSubLandingContext.tsx
function ProductSubLandingContext_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ProductSubLandingContext_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ProductSubLandingContext_ownKeys(Object(source), true).forEach(function (key) { ProductSubLandingContext_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ProductSubLandingContext_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ProductSubLandingContext_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const ProductSubLandingContext = /*#__PURE__*/(0,external_react_.createContext)(null);
const useProductSubLandingContext = () => {
  const context = (0,external_react_.useContext)(ProductSubLandingContext);

  if (!context) {
    throw new Error('"useProductSubLandingContext" may only be used inside "ProductSubLandingContext.Provider"');
  }

  return context;
};
const getProductSubLandingContextFromRequest = req => {
  var _page$featuredTrack;

  const page = req.context.page;
  return ProductSubLandingContext_objectSpread(ProductSubLandingContext_objectSpread({}, pick_default()(page, ['intro', 'allTopics'])), {}, {
    title: req.context.productMap[req.context.currentProduct].name,
    featuredTrack: page.featuredTrack ? ProductSubLandingContext_objectSpread(ProductSubLandingContext_objectSpread({}, pick_default()(page.featuredTrack, ['title', 'description', 'trackName'])), {}, {
      guides: (((_page$featuredTrack = page.featuredTrack) === null || _page$featuredTrack === void 0 ? void 0 : _page$featuredTrack.guides) || []).map(guide => {
        return pick_default()(guide, ['title', 'intro', 'href', 'page.type']);
      })
    }) : null,
    learningTracks: (page.learningTracks || []).map(track => ProductSubLandingContext_objectSpread(ProductSubLandingContext_objectSpread({}, pick_default()(track, ['title', 'description', 'trackName'])), {}, {
      guides: (track.guides || []).map(guide => {
        return pick_default()(guide, ['title', 'intro', 'href', 'page.type']);
      })
    })),
    includeGuides: (page.includeGuides || []).map(guide => {
      return ProductSubLandingContext_objectSpread(ProductSubLandingContext_objectSpread({}, pick_default()(guide, ['href', 'title', 'intro', 'topics'])), {}, {
        type: guide.type || ''
      });
    })
  });
};
;// CONCATENATED MODULE: ./components/context/ArticleContext.tsx

const ArticleContext = /*#__PURE__*/(0,external_react_.createContext)(null);
const useArticleContext = () => {
  const context = (0,external_react_.useContext)(ArticleContext);

  if (!context) {
    throw new Error('"useArticleContext" may only be used inside "ArticleContext.Provider"');
  }

  return context;
};
const getArticleContextFromRequest = req => {
  const page = req.context.page;
  return {
    title: page.titlePlainText,
    intro: page.introPlainText,
    renderedPage: req.context.renderedPage || '',
    miniTocItems: (req.context.miniTocItems || []).map(item => {
      return {
        indentationLevel: item.indentationLevel || 0,
        platform: item.platform || '',
        contents: item.contents || ''
      };
    }) || [],
    contributor: page.contributor || null,
    permissions: page.permissions || '',
    includesPlatformSpecificContent: page.includesPlatformSpecificContent || false,
    defaultPlatform: page.defaultPlatform || '',
    product: page.product || '',
    currentLearningTrack: req.context.currentLearningTrack
  };
};
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(4058);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./components/DefaultLayout.tsx + 14 modules
var DefaultLayout = __webpack_require__(8977);
// EXTERNAL MODULE: ./components/Breadcrumbs.tsx
var Breadcrumbs = __webpack_require__(4054);
// EXTERNAL MODULE: external "@primer/components"
var components_ = __webpack_require__(988);
;// CONCATENATED MODULE: ./components/article/PrinterIcon.tsx

// From https://heroicons.com
const PrinterIcon = () => {
  return /*#__PURE__*/jsx_runtime_.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: 18,
    width: 18,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    children: /*#__PURE__*/jsx_runtime_.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
    })
  });
};
;// CONCATENATED MODULE: ./components/article/EditIcon.tsx

// From https://heroicons.com
const EditIcon = () => {
  return /*#__PURE__*/jsx_runtime_.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: 18,
    width: 18,
    fill: "currentColor",
    viewBox: "0 0 19 19",
    children: /*#__PURE__*/jsx_runtime_.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
    })
  });
};
// EXTERNAL MODULE: ./components/PrintAction.tsx
var PrintAction = __webpack_require__(3718);
;// CONCATENATED MODULE: ./components/article/ArticleTitle.tsx







const ArticleTitle = ({
  children
}) => {
  const {
    relativePath
  } = (0,MainContext/* useMainContext */.Hv)();
  const contributionHref = relativePath ? `https://github.com/tum-elaw/baydig-wiki/edit/main/content/${relativePath}` : 'https://github.com/tum-elaw/baydig-wiki';
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "d-flex flex-items-baseline flex-justify-between",
    children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
      className: "my-4 border-bottom-0",
      children: children
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "d-none d-lg-block ml-2",
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_.Tooltip, {
        "aria-label": "Edit this article",
        noDelay: true,
        direction: "n",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: contributionHref,
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn-link Link--muted",
            children: /*#__PURE__*/jsx_runtime_.jsx(EditIcon, {})
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(components_.Tooltip, {
        "aria-label": "Print this article",
        noDelay: true,
        direction: "n",
        children: /*#__PURE__*/jsx_runtime_.jsx(PrintAction/* PrintAction */.P, {
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn-link Link--muted",
            children: /*#__PURE__*/jsx_runtime_.jsx(PrinterIcon, {})
          })
        })
      })]
    })]
  });
};
// EXTERNAL MODULE: external "@primer/octicons-react"
var octicons_react_ = __webpack_require__(3887);
// EXTERNAL MODULE: ./components/hooks/useTranslation.tsx
var useTranslation = __webpack_require__(4433);
;// CONCATENATED MODULE: ./components/article/LearningTrackNav.tsx




function LearningTrackNav({
  track
}) {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('learning_track_nav');
  const {
    prevGuide,
    nextGuide,
    trackName
  } = track;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "py-3 px-4 rounded color-bg-primary border-gradient--purple-pink d-flex flex-justify-between learning-track-nav",
    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
      className: "d-flex flex-column",
      children: prevGuide && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "f6 color-text-secondary",
          children: t('prevGuide')
        }), /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: `${prevGuide.href}?learn=${trackName}`,
          className: "text-bold color-text-secondary",
          children: prevGuide.title
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
      className: "d-flex flex-column flex-items-end",
      children: nextGuide && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "f6 color-text-secondary",
          children: t('nextGuide')
        }), /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: `${nextGuide.href}?learn=${trackName}`,
          className: "text-bold color-text-secondary text-right",
          children: nextGuide.title
        })]
      })
    })]
  });
}
// EXTERNAL MODULE: external "@giscus/react"
var react_ = __webpack_require__(5030);
;// CONCATENATED MODULE: ./components/article/ArticlePage.tsx












const ArticlePage = () => {
  const {
    title,
    intro,
    renderedPage,
    contributor,
    permissions,
    includesPlatformSpecificContent,
    defaultPlatform,
    product,
    miniTocItems,
    currentLearningTrack
  } = useArticleContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('pages');
  return /*#__PURE__*/jsx_runtime_.jsx(DefaultLayout/* DefaultLayout */.H, {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "container-xl px-3 px-md-6 my-4 my-lg-4",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("article", {
        className: "markdown-body",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "d-lg-flex flex-justify-between",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "d-block d-lg-none"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "d-flex flex-items-center",
            children: /*#__PURE__*/jsx_runtime_.jsx(Breadcrumbs/* Breadcrumbs */.O, {})
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "d-none d-lg-block"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "article-grid-container mt-2",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "article-grid-head",
            children: [/*#__PURE__*/jsx_runtime_.jsx(ArticleTitle, {
              children: title
            }), contributor && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "contributor-callout border rounded-1 mb-4 p-3 color-border-info color-bg-info f5",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "mr-2",
                  children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.InfoIcon, {})
                }), t('contributor_callout'), " ", /*#__PURE__*/jsx_runtime_.jsx("a", {
                  href: contributor.URL,
                  target: "_blank",
                  children: contributor.name
                }), "."]
              })
            }), intro && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "lead-mktg",
              children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                children: intro
              })
            }), permissions && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "permissions-statement",
              dangerouslySetInnerHTML: {
                __html: permissions
              }
            }), includesPlatformSpecificContent && /*#__PURE__*/jsx_runtime_.jsx("nav", {
              className: "UnderlineNav my-3",
              "data-default-platform": defaultPlatform || undefined,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "UnderlineNav-body",
                children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
                  href: "#",
                  className: "UnderlineNav-item platform-switcher",
                  "data-platform": "mac",
                  children: "Mac"
                }), /*#__PURE__*/jsx_runtime_.jsx("a", {
                  href: "#",
                  className: "UnderlineNav-item platform-switcher",
                  "data-platform": "windows",
                  children: "Windows"
                }), /*#__PURE__*/jsx_runtime_.jsx("a", {
                  href: "#",
                  className: "UnderlineNav-item platform-switcher",
                  "data-platform": "linux",
                  children: "Linux"
                })]
              })
            }), product && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "product-callout border rounded-1 mb-4 p-3 color-border-success color-bg-success",
              dangerouslySetInnerHTML: {
                __html: product
              }
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "article-grid-toc border-bottom border-xl-0 pb-4 mb-5 pb-xl-0 mb-xl-0",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "article-grid-toc-content",
              children: miniTocItems.length > 1 && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                  id: "in-this-article",
                  className: "f5 mb-2",
                  children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                    className: "Link--primary",
                    href: "#in-this-article",
                    children: t('miniToc')
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
                  className: "list-style-none pl-0 f5 mb-0",
                  children: miniTocItems.map(item => {
                    return /*#__PURE__*/jsx_runtime_.jsx("li", {
                      className: external_classnames_default()(`ml-${item.indentationLevel * 3}`, item.platform, 'mb-2 lh-condensed'),
                      dangerouslySetInnerHTML: {
                        __html: item.contents
                      }
                    }, item.contents);
                  })
                })]
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "markdown-body",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              id: "article-contents",
              className: "article-grid-body",
              dangerouslySetInnerHTML: {
                __html: renderedPage
              }
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "no-print",
            children: /*#__PURE__*/jsx_runtime_.jsx(react_.Giscus, {
              repo: "tum-elaw/baydig-wiki",
              repoId: "R_kgDOG7uxDw",
              category: "General",
              categoryId: "DIC_kwDOG7uxD84CN7U1",
              mapping: "title",
              reactionsEnabled: "1",
              emitMetadata: "0",
              theme: "preferred_color_scheme",
              lang: "de"
            })
          })]
        }), currentLearningTrack !== null && currentLearningTrack !== void 0 && currentLearningTrack.trackName ? /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "d-block mt-4 markdown-body",
          children: /*#__PURE__*/jsx_runtime_.jsx(LearningTrackNav, {
            track: currentLearningTrack
          })
        }) : null]
      })
    })
  });
};
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./components/Link.tsx
var Link = __webpack_require__(6359);
// EXTERNAL MODULE: ./components/hooks/useVersion.tsx
var useVersion = __webpack_require__(6613);
;// CONCATENATED MODULE: ./components/landing/LandingHero.tsx










const LandingHero = () => {
  const {
    airGap
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    product_video,
    shortTitle,
    beta_product,
    intro,
    introLinks
  } = useProductLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_landing');
  const {
    0: renderIFrame,
    1: setRenderIFrame
  } = (0,external_react_.useState)(false); // delay iFrame rendering so that dom ready happens sooner

  (0,external_react_.useEffect)(() => {
    setRenderIFrame(true);
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
    className: "d-lg-flex gutter-lg mb-6",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: external_classnames_default()(product_video && 'col-12 col-lg-6 mb-3 mb-lg-0'),
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "text-mono color-text-secondary",
        children: "Product"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h1", {
        className: "mb-3 font-mktg",
        children: [shortTitle, ' ', beta_product && /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "Label Label--success v-align-middle",
          children: "Beta"
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "lead-mktg color-text-secondary",
        dangerouslySetInnerHTML: {
          __html: intro
        }
      }), introLinks && Object.entries(introLinks).filter(([key, link]) => {
        return link && !key.includes('raw');
      }).map(([key, link], i) => {
        if (!link) {
          return null;
        }

        return /*#__PURE__*/jsx_runtime_.jsx(FullLink, {
          href: link,
          className: external_classnames_default()('btn-mktg bt-large f4 mt-3 mr-3', i !== 0 && 'btn-outline-mktg'),
          children: t(key)
        }, link);
      })]
    }), product_video && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "col-12 col-lg-6",
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "position-relative",
        style: {
          paddingBottom: '56.25%'
        },
        children: !airGap && /*#__PURE__*/jsx_runtime_.jsx("iframe", {
          title: `${shortTitle} Video`,
          className: "top-0 left-0 position-absolute color-shadow-large rounded-1 width-full height-full",
          src: renderIFrame ? product_video : '',
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        })
      })
    })]
  });
}; // Fully Qualified Link - it includes the version and locale in the path

const FullLink = ({
  href,
  children,
  className
}) => {
  const router = (0,router_.useRouter)();
  const {
    currentVersion
  } = (0,useVersion/* useVersion */.a)();
  const locale = router.locale || 'en';
  const fullyQualifiedHref = `/${locale}${currentVersion !== 'free-pro-team@latest' ? `/${currentVersion}` : ''}${href}`;
  return /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
    href: fullyQualifiedHref,
    className: className,
    children: children
  });
};
// EXTERNAL MODULE: ./components/landing/ArticleList.tsx
var ArticleList = __webpack_require__(5201);
;// CONCATENATED MODULE: ./components/landing/FeaturedArticles.tsx






const FeaturedArticles = () => {
  const {
    featuredArticles = [],
    whatsNewChangelog,
    changelogUrl
  } = useProductLandingContext();
  const hasWhatsNewChangelog = whatsNewChangelog && whatsNewChangelog.length > 0;
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('toc');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "d-lg-flex gutter my-6 py-6",
    children: [featuredArticles.map((section, i) => {
      return /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: external_classnames_default()('col-12 mb-4 mb-lg-0', hasWhatsNewChangelog ? 'col-lg-4' : 'col-lg-6'),
        children: /*#__PURE__*/jsx_runtime_.jsx(ArticleList/* ArticleList */.w, {
          title: section.label,
          titleVariant: "large",
          viewAllHref: section.viewAllHref,
          articles: section.articles
        })
      }, section.label + i);
    }), hasWhatsNewChangelog && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: external_classnames_default()('col-12 mb-4 mb-lg-0 col-lg-4'),
      children: /*#__PURE__*/jsx_runtime_.jsx(ArticleList/* ArticleList */.w, {
        title: t('whats_new'),
        titleVariant: "large",
        viewAllHref: changelogUrl,
        articles: (whatsNewChangelog || []).map(link => {
          return {
            title: link.title,
            date: link.date,
            href: link.href
          };
        })
      })
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/GuideCard.tsx


const GuideCard = ({
  guide
}) => {
  const authors = guide.authors && guide.authors.length > 0 ? guide.authors : ['GitHub'];
  const authorString = `@${authors.join(', @')}`;
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "col-lg-4 col-12 mb-4",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      className: "Box color-shadow-medium height-full d-block hover-shadow-large no-underline color-text-primary p-5",
      href: guide.href,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
        children: guide.title
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "mt-2 mb-4 color-text-tertiary",
        children: guide.intro
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("footer", {
        className: "d-flex",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "mr-1",
          children: authors.length === 1 ? /*#__PURE__*/jsx_runtime_.jsx("img", {
            className: "avatar avatar-2 circle mr-1",
            src: `https://github.com/${authors[0]}.png`,
            alt: `@${authors[0]}`
          }) : /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "AvatarStack AvatarStack--three-plus",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "AvatarStack-body tooltipped tooltipped-se tooltipped-align-left-1",
              "aria-label": authorString,
              children: authors.map(author => {
                return /*#__PURE__*/jsx_runtime_.jsx("img", {
                  className: "avatar circle",
                  alt: `@${author}`,
                  src: `https://github.com/${author}.png`
                });
              })
            })
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          children: authorString
        })]
      })]
    })
  });
};
;// CONCATENATED MODULE: ./components/landing/GuideCards.tsx








const GuideCards = () => {
  const router = (0,router_.useRouter)();
  const {
    currentCategory
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    featuredLinks,
    hasGuidesPage
  } = useProductLandingContext();
  const routePath = `/${router.locale}${router.asPath.split('?')[0]}`; // remove query string

  if (!featuredLinks.guideCards) {
    return null;
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-lg-flex gutter-lg flex-items-stretch",
      children: (featuredLinks.guideCards || []).map(guide => {
        return /*#__PURE__*/jsx_runtime_.jsx(GuideCard, {
          guide: guide
        }, guide.href);
      })
    }), !currentCategory && hasGuidesPage && /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
      href: `${routePath}/guides`,
      className: "btn btn-outline float-right",
      children: ["Explore guides ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {})]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/UserCard.tsx


const UserCard = ({
  user,
  href
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
    className: "Box d-flex height-full color-shadow-medium hover-shadow-large no-underline color-text-primary p-4",
    href: href || `https://github.com/${user.username}`,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "flex-shrink-0 mr-3",
      children: /*#__PURE__*/jsx_runtime_.jsx("img", {
        src: `https://github.com/${user.username}.png`,
        alt: user.username,
        className: "avatar avatar-8 circle"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "flex-auto",
      children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
        children: user.username
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "mt-1 color-text-tertiary",
        children: user.description
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/SponsorsExamples.tsx







const SponsorsExamples = () => {
  const {
    productUserExamples
  } = useProductLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_landing');

  if (!productUserExamples) {
    return null;
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex flex-wrap gutter",
      children: productUserExamples.slice(0, 6).map(user => {
        return /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "col-12 col-xl-4 col-lg-6 mb-4",
          children: /*#__PURE__*/jsx_runtime_.jsx(UserCard, {
            href: `https://github.com/sponsors/${user.username}`,
            user: user
          })
        }, user.username);
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
      href: `https://github.com/sponsors/community`,
      className: "btn btn-outline float-right",
      children: [t('explore_people_and_projects'), " ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {})]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/RepoCard.tsx


const RepoCard = ({
  repo,
  href
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
    className: "Box d-flex height-full color-shadow-medium hover-shadow-large no-underline color-text-primary p-4",
    href: href || `https://github.com/${repo.repo}`,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "flex-shrink-0 mr-3",
      children: /*#__PURE__*/jsx_runtime_.jsx("img", {
        src: `https://github.com/${repo.repo.split('/')[0]}.png`,
        alt: repo.repo,
        className: "avatar avatar-8"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "flex-auto",
      children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
        children: repo.repo
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "mt-1 color-text-tertiary",
        children: repo.description
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/CommunityExamples.tsx







const CommunityExamples = () => {
  const {
    productCommunityExamples
  } = useProductLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_landing');
  const {
    0: numVisible,
    1: setNumVisible
  } = (0,external_react_.useState)(6);

  if (!productCommunityExamples) {
    return null;
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex flex-wrap gutter",
      children: productCommunityExamples.slice(0, numVisible).map(repo => {
        return /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "col-12 col-xl-4 col-lg-6 mb-4",
          children: /*#__PURE__*/jsx_runtime_.jsx(RepoCard, {
            repo: repo
          })
        }, repo.repo);
      })
    }), numVisible < productCommunityExamples.length && /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
      className: "btn btn-outline float-right",
      onClick: () => setNumVisible(productCommunityExamples.length),
      children: [t('show_more'), " ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {})]
    })]
  });
};
// EXTERNAL MODULE: ./components/TruncateLines.tsx
var TruncateLines = __webpack_require__(1541);
;// CONCATENATED MODULE: ./components/landing/CodeExampleCard.tsx




const CodeExampleCard = ({
  example
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
    className: "Box d-flex flex-column flex-justify-between height-full color-shadow-medium hover-shadow-large no-underline color-text-primary",
    "data-testid": "code-example-card",
    href: `https://github.com/${example.href}`,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "p-4",
      children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
        children: example.title
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "mt-2 mb-4 color-text-tertiary",
        children: example.description
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "d-flex flex-wrap",
        children: example.tags.map(tag => {
          return /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "IssueLabel color-text-inverse color-bg-info-inverse mr-2 mb-1",
            children: tag
          }, tag);
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("footer", {
      className: "border-top p-4 color-text-secondary d-flex flex-items-center",
      children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.RepoIcon, {
        className: "flex-shrink-0"
      }), /*#__PURE__*/jsx_runtime_.jsx(TruncateLines/* TruncateLines */.u, {
        as: "span",
        maxLines: 1,
        className: "ml-2 text-mono text-small color-text-link line-break-anywhere",
        children: example.href
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/CodeExamples.tsx








const PAGE_SIZE = 6;
const CodeExamples = () => {
  const {
    productCodeExamples
  } = useProductLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_landing');
  const {
    0: numVisible,
    1: setNumVisible
  } = (0,external_react_.useState)(PAGE_SIZE);
  const {
    0: search,
    1: setSearch
  } = (0,external_react_.useState)('');

  const onSearchChange = e => {
    setSearch(e.target.value);
    setNumVisible(PAGE_SIZE); // reset the visible count (only matters after searching)
  };

  const isSearching = !!search;
  let searchResults = [];

  if (isSearching) {
    const matchReg = new RegExp(search, 'i');
    searchResults = productCodeExamples.filter(example => {
      const searchableStr = `${example.tags.join(' ')} ${example.title} ${example.description}`;
      return matchReg.test(searchableStr);
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "pr-lg-3 mb-5 mt-3",
      children: /*#__PURE__*/jsx_runtime_.jsx("input", {
        "data-testid": "code-examples-input",
        className: "input-lg py-2 px-3 col-12 col-lg-8 form-control",
        placeholder: t('search_code_examples'),
        type: "search",
        autoComplete: "off",
        "aria-label": t('search_code_examples'),
        onChange: onSearchChange
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex flex-wrap gutter",
      children: (isSearching ? searchResults : productCodeExamples.slice(0, numVisible)).map(example => {
        return /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "col-12 col-xl-4 col-lg-6 mb-4",
          children: /*#__PURE__*/jsx_runtime_.jsx(CodeExampleCard, {
            example: example
          })
        }, example.href);
      })
    }), numVisible < productCodeExamples.length && !isSearching && /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
      "data-testid": "code-examples-show-more",
      className: "btn btn-outline float-right",
      onClick: () => setNumVisible(numVisible + PAGE_SIZE),
      children: [t('show_more'), " ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {})]
    }), isSearching && searchResults.length === 0 && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      "data-testid": "code-examples-no-results",
      className: "py-4 text-center color-text-secondary font-mktg",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "mb-3",
        children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.SearchIcon, {
          size: 24
        }), ' ']
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h3", {
        className: "text-normal",
        children: [t('sorry'), " ", /*#__PURE__*/jsx_runtime_.jsx("strong", {
          children: search
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "my-3 f4",
        children: [t('no_example'), " ", /*#__PURE__*/jsx_runtime_.jsx("br", {}), " ", t('try_another')]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
        href: "https://github.com/github/docs/blob/main/data/variables/actions_code_examples.yml",
        children: [t('learn'), " ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {})]
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/LandingSection.tsx



const LandingSection = ({
  title,
  children,
  className,
  sectionLink,
  description
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: external_classnames_default()('container-xl px-3 px-md-6', className),
    id: sectionLink,
    children: [title && /*#__PURE__*/jsx_runtime_.jsx("h2", {
      className: external_classnames_default()('font-mktg h1 color-text-primary', !description ? 'mb-3' : 'mb-4'),
      children: sectionLink ? /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "color-unset",
        href: `#${sectionLink}`,
        children: title
      }) : title
    }), description && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "lead-mktg color-text-secondary f4 description-text",
      dangerouslySetInnerHTML: {
        __html: description
      }
    }), children]
  });
};
;// CONCATENATED MODULE: ./components/landing/ProductArticlesList.tsx







const maxArticles = 10;
const ProductArticlesList = () => {
  const {
    currentProductTree
  } = (0,MainContext/* useMainContext */.Hv)();

  if (!currentProductTree) {
    return null;
  }

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "d-flex gutter flex-wrap",
    "data-testid": "product-articles-list",
    children: currentProductTree.childPages.map((treeNode, i) => {
      if (treeNode.page.documentType === 'article') {
        return null;
      }

      return /*#__PURE__*/jsx_runtime_.jsx(ProductTreeNodeList, {
        treeNode: treeNode
      }, treeNode.href + i);
    })
  });
};

const ProductTreeNodeList = ({
  treeNode
}) => {
  const {
    0: isShowingMore,
    1: setIsShowingMore
  } = (0,external_react_.useState)(false);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "col-12 col-lg-4 mb-6 height-full",
    children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
      className: "mb-3",
      children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
        className: "color-unset",
        href: treeNode.href,
        children: treeNode.renderedFullTitle
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
      className: "list-style-none",
      children: treeNode.childPages.map((childNode, index) => {
        if (treeNode.childPages[0].page.documentType === 'mapTopic' && childNode.page.hidden) {
          return null;
        }

        return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
          className: external_classnames_default()('mb-3', !isShowingMore && index >= maxArticles ? 'd-none' : null),
          children: [/*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
            href: childNode.href,
            children: childNode.page.title
          }), childNode.page.documentType === 'mapTopic' ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("small", {
            className: "color-text-secondary d-inline-block",
            children: ["\xA0\u2022 ", treeNode.childPages.length, " articles"]
          }) : null]
        }, childNode.href + index);
      })
    }), !isShowingMore && treeNode.childPages.length > maxArticles && /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
      onClick: () => setIsShowingMore(true),
      className: "btn-link Link--secondary",
      children: ["Show ", treeNode.childPages.length - maxArticles, " more", ' ', /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronDownIcon, {
        className: "v-align-text-bottom"
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/ProductReleases.tsx








function ProductReleases() {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_landing');
  const router = (0,router_.useRouter)();
  const {
    enterpriseServerReleases,
    allVersions
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    releases
  } = useProductLandingContext();
  const currentPath = router.asPath.split('?')[0];
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-lg-flex gutter-lg flex-items-stretch",
      children: releases.map(release => {
        const releaseNumber = release.version;

        if (!enterpriseServerReleases.supported.includes(releaseNumber)) {
          return null;
        }

        const releaseVersion = `enterprise-server@${releaseNumber}`;
        const latestPatch = release.patches[0];
        const firstPreviousVersion = `enterprise-server@${release.firstPreviousRelease}`;
        const secondPreviousVersion = `enterprise-server@${release.secondPreviousRelease}`;
        return /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "col-lg-4 col-12 mb-4",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "Box color-shadow-medium height-full d-block hover-shadow-large no-underline color-text-primary p-5",
            children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
              children: allVersions[releaseVersion].versionTitle
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
              className: "mt-2 mb-4 color-text-tertiary",
              children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ListUnorderedIcon, {}), ' ', /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
                href: `/${router.locale}/${releaseVersion}/admin/release-notes#${latestPatch.version}`,
                children: [t('release_notes_for'), " ", latestPatch.version]
              }), ' ', "(", latestPatch.date, ")"]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
              className: "mt-2 mb-4 color-text-tertiary",
              children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowUpIcon, {}), " ", t('upgrade_from'), ' ', /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
                href: `/${router.locale}/${firstPreviousVersion}/admin/enterprise-management/upgrading-github-enterprise-server`,
                children: release.firstPreviousRelease
              }), ' ', "or", ' ', /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
                href: `/${router.locale}/${secondPreviousVersion}/admin/enterprise-management/upgrading-github-enterprise-server`,
                children: release.secondPreviousRelease
              })]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
              className: "mt-2 mb-4 color-text-tertiary",
              children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.FileIcon, {}), ' ', /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
                href: `/${router.locale}/${releaseVersion}`,
                children: t('browse_all_docs')
              })]
            })]
          })
        }, releaseNumber);
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
      href: `${currentPath}/release-notes`,
      className: "btn btn-outline float-right",
      children: [t('explore_release_notes'), " ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {})]
    })]
  });
}
;// CONCATENATED MODULE: ./components/landing/ProductLanding.tsx
















const ProductLanding = () => {
  var _featuredLinks$guideC;

  const router = (0,router_.useRouter)();
  const {
    isEnterpriseServer
  } = (0,useVersion/* useVersion */.a)();
  const {
    shortTitle,
    featuredLinks,
    productUserExamples,
    productCommunityExamples,
    productCodeExamples
  } = useProductLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_landing');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(DefaultLayout/* DefaultLayout */.H, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      className: "pt-3",
      children: /*#__PURE__*/jsx_runtime_.jsx(LandingHero, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      children: /*#__PURE__*/jsx_runtime_.jsx(FeaturedArticles, {})
    }), productCodeExamples.length > 0 && /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: t('code_examples'),
      sectionLink: "code-examples",
      className: "my-6 pb-6",
      children: /*#__PURE__*/jsx_runtime_.jsx(CodeExamples, {})
    }), productCommunityExamples.length > 0 && /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: t('communities_using_discussions'),
      className: "my-6 pb-6",
      children: /*#__PURE__*/jsx_runtime_.jsx(CommunityExamples, {})
    }), productUserExamples.length > 0 && /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: t('sponsor_community'),
      className: "my-6 pb-6",
      children: /*#__PURE__*/jsx_runtime_.jsx(SponsorsExamples, {})
    }), router.query.productId === 'admin' && isEnterpriseServer && /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: t('supported_releases'),
      className: "my-6 pb-6",
      children: /*#__PURE__*/jsx_runtime_.jsx(ProductReleases, {})
    }), ((_featuredLinks$guideC = featuredLinks.guideCards) === null || _featuredLinks$guideC === void 0 ? void 0 : _featuredLinks$guideC.length) > 0 && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "color-bg-tertiary py-6",
      children: /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
        title: t('guides'),
        sectionLink: "guides-2",
        className: "my-6",
        children: /*#__PURE__*/jsx_runtime_.jsx(GuideCards, {})
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: `All ${shortTitle} docs`,
      sectionLink: "all-docs",
      className: "pt-9",
      children: /*#__PURE__*/jsx_runtime_.jsx(ProductArticlesList, {})
    })]
  });
};
;// CONCATENATED MODULE: ./components/sublanding/SubLandingHero.tsx







const SubLandingHero = () => {
  var _featuredTrack$guides;

  const {
    title,
    intro,
    featuredTrack
  } = useProductSubLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_sublanding');
  const guideItems = featuredTrack === null || featuredTrack === void 0 ? void 0 : (_featuredTrack$guides = featuredTrack.guides) === null || _featuredTrack$guides === void 0 ? void 0 : _featuredTrack$guides.map(guide => {
    var _featuredTrack$guides2, _guide$page;

    return /*#__PURE__*/jsx_runtime_.jsx("li", {
      className: "px-2 d-flex flex-shrink-0",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
        href: `${guide.href}?learn=${featuredTrack.trackName}`,
        className: "d-inline-block Box p-5 color-bg-primary color-border-primary no-underline",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "d-flex flex-justify-between flex-items-center",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "circle color-bg-primary color-text-link border-gradient--pink-blue-dark d-inline-flex",
            children: featuredTrack.guides && /*#__PURE__*/jsx_runtime_.jsx("span", {
              className: "m-2 f2 lh-condensed-ultra text-center text-bold step-circle-text",
              style: {
                width: '24px',
                height: '24px'
              },
              children: ((_featuredTrack$guides2 = featuredTrack.guides) === null || _featuredTrack$guides2 === void 0 ? void 0 : _featuredTrack$guides2.indexOf(guide)) + 1
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "color-text-tertiary h6 text-uppercase",
            children: t('guide_types')[((_guide$page = guide.page) === null || _guide$page === void 0 ? void 0 : _guide$page.type) || '']
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "font-mktg h3-mktg my-4 color-text-primary",
          children: guide.title
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "lead-mktg color-text-secondary f5 my-4 truncate-overflow-8",
          children: guide.intro
        })]
      })
    }, guide.href);
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("header", {
      className: "d-flex gutter mb-6",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "col-12",
        children: [/*#__PURE__*/jsx_runtime_.jsx(Breadcrumbs/* Breadcrumbs */.O, {
          variant: "large"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h1", {
          className: "my-3 font-mktg",
          children: [title, " guides"]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "lead-mktg color-text-secondary f4 description-text",
          dangerouslySetInnerHTML: {
            __html: intro
          }
        })]
      })
    }), featuredTrack && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "mb-6 position-relative overflow-hidden mr-n3 ml-n3 px-3",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
        className: "list-style-none d-flex flex-nowrap overflow-x-scroll px-2 feature-track",
        children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
          className: "px-2 d-flex flex-shrink-0",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "d-inline-block Box p-5 bg-gradient--blue-pink color-text-inverse",
            children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "circle color-text-inverse d-inline-flex",
              style: {
                border: '2px white solid'
              },
              children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.StarFillIcon, {
                className: "v-align-middle m-2",
                size: 24
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
              className: "font-mktg h3-mktg my-4",
              children: featuredTrack.title
            }), /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "lead-mktg color-text-inverse f5 my-4",
              children: featuredTrack.description
            }), featuredTrack.guides && /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
              className: "d-inline-block border color-border-inverse color-text-inverse px-4 py-2 f5 no-underline text-bold",
              role: "button",
              href: `${featuredTrack.guides[0].href}?learn=${featuredTrack.trackName}`,
              children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                className: "mr-2",
                children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {
                  size: 20
                })
              }), t(`start_path`)]
            })]
          })
        }), guideItems]
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "position-absolute top-0 bottom-0 left-0 ml-3 pl-3 fade-background-left"
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "position-absolute top-0 bottom-0 right-0 mr-3 pr-3 fade-background-right"
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/sublanding/LearningTrack.tsx





const DEFAULT_VISIBLE_GUIDES = 4;
const LearningTrack = ({
  track
}) => {
  var _track$guides2, _track$guides4, _track$guides5;

  const {
    0: numVisible,
    1: setNumVisible
  } = (0,external_react_.useState)(DEFAULT_VISIBLE_GUIDES);

  const showAll = () => {
    var _track$guides;

    setNumVisible((track === null || track === void 0 ? void 0 : (_track$guides = track.guides) === null || _track$guides === void 0 ? void 0 : _track$guides.length) || 0);
  };

  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_sublanding');
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "my-3 px-4 col-12 col-md-6 learning-track",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "Box d-flex flex-column",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "Box-header bg-gradient--blue-pink p-4 d-flex flex-1 flex-items-start flex-wrap",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "d-flex flex-auto flex-items-start col-8 col-md-12 col-xl-8",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "my-xl-0 mr-xl-3",
            children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
              className: "mb-3 color-text-inverse font-mktg h3-mktg ",
              children: track === null || track === void 0 ? void 0 : track.title
            }), /*#__PURE__*/jsx_runtime_.jsx("p", {
              className: "color-text-inverse truncate-overflow-3 learning-track--description",
              children: track === null || track === void 0 ? void 0 : track.description
            })]
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
          className: "d-inline-block border color-border-inverse color-text-inverse px-3 py-2 f5 no-underline text-bold no-wrap mt-3 mt-md-0",
          role: "button",
          href: `${(track === null || track === void 0 ? void 0 : track.guides) && (track === null || track === void 0 ? void 0 : track.guides[0].href)}?learn=${track === null || track === void 0 ? void 0 : track.trackName}`,
          children: [t('start'), /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "mr-2",
            children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ArrowRightIcon, {
              size: 20
            })
          })]
        })]
      }), track === null || track === void 0 ? void 0 : (_track$guides2 = track.guides) === null || _track$guides2 === void 0 ? void 0 : _track$guides2.slice(0, numVisible).map(guide => {
        var _track$guides3, _guide$page;

        return /*#__PURE__*/jsx_runtime_.jsx("div", {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
            className: "Box-row d-flex flex-items-center color-text-primary no-underline",
            href: `${guide.href}?learn=${track === null || track === void 0 ? void 0 : track.trackName}`,
            children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "circle color-bg-tertiary d-inline-flex mr-4",
              children: (track === null || track === void 0 ? void 0 : track.guides) && /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: "m-2 f3 lh-condensed-ultra text-center text-bold step-circle-text",
                children: ((_track$guides3 = track.guides) === null || _track$guides3 === void 0 ? void 0 : _track$guides3.indexOf(guide)) + 1
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("h5", {
              className: "flex-auto pr-2",
              children: guide.title
            }), /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "color-text-tertiary h6 text-uppercase flex-shrink-0",
              children: t('guide_types')[((_guide$page = guide.page) === null || _guide$page === void 0 ? void 0 : _guide$page.type) || '']
            })]
          })
        }, guide.href + (track === null || track === void 0 ? void 0 : track.trackName));
      }), ((track === null || track === void 0 ? void 0 : (_track$guides4 = track.guides) === null || _track$guides4 === void 0 ? void 0 : _track$guides4.length) || 0) > numVisible ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
        className: "Box-footer btn-link border-top-0 position-relative text-center text-bold color-text-link pt-1 pb-3 col-12",
        onClick: showAll,
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "position-absolute left-0 right-0 py-5 fade-background-bottom",
          style: {
            bottom: '50px'
          }
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
          children: ["Show ", ((track === null || track === void 0 ? void 0 : (_track$guides5 = track.guides) === null || _track$guides5 === void 0 ? void 0 : _track$guides5.length) || 0) - numVisible, " ", t(`more_guides`)]
        })]
      }) : /*#__PURE__*/jsx_runtime_.jsx("div", {})]
    })
  });
};
;// CONCATENATED MODULE: ./components/sublanding/LearningTracks.tsx



const LearningTracks = () => {
  const {
    learningTracks
  } = useProductSubLandingContext();
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex flex-wrap flex-items-start my-5 gutter",
      children: (learningTracks || []).map(track => {
        return /*#__PURE__*/jsx_runtime_.jsx(LearningTrack, {
          track: track
        }, track === null || track === void 0 ? void 0 : track.title);
      })
    })
  });
};
;// CONCATENATED MODULE: ./components/sublanding/ArticleCard.tsx


const ArticleCard = ({
  card,
  typeLabel
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    "data-testid": "article-card",
    className: "d-flex col-12 col-md-4 pr-0 pr-md-6 pr-lg-8",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      className: "no-underline d-flex flex-column py-3 border-bottom",
      href: card.href,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
        className: "h4 color-text-primary mb-1",
        children: card.title
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "h6 text-uppercase",
        "data-testid": "article-card-type",
        children: typeLabel
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "color-text-secondary my-3",
        children: card.intro
      }), card.topics.length > 0 && /*#__PURE__*/jsx_runtime_.jsx("div", {
        children: card.topics.map(topic => {
          return /*#__PURE__*/jsx_runtime_.jsx("span", {
            "data-testid": "article-card-topic",
            className: "IssueLabel bg-gradient--pink-blue color-text-inverse mr-1",
            children: topic
          }, topic);
        })
      })]
    })
  });
};
;// CONCATENATED MODULE: ./components/sublanding/ArticleCards.tsx






const ArticleCards_PAGE_SIZE = 9;
const ArticleCards = () => {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('product_sublanding');
  const guideTypes = t('guide_types');
  const {
    allTopics,
    includeGuides
  } = useProductSubLandingContext();
  const {
    0: numVisible,
    1: setNumVisible
  } = (0,external_react_.useState)(ArticleCards_PAGE_SIZE);
  const {
    0: typeFilter,
    1: setTypeFilter
  } = (0,external_react_.useState)('');
  const {
    0: topicFilter,
    1: setTopicFilter
  } = (0,external_react_.useState)('');
  const {
    0: filteredResults,
    1: setFilteredResults
  } = (0,external_react_.useState)([]);
  (0,external_react_.useEffect)(() => {
    setNumVisible(ArticleCards_PAGE_SIZE);
    setFilteredResults((includeGuides || []).filter(card => {
      const matchesType = card.type === typeFilter;
      const matchesTopic = card.topics.some(key => key === topicFilter);
      return (typeFilter ? matchesType : true) && (topicFilter ? matchesTopic : true);
    }));
  }, [typeFilter, topicFilter]);
  const isUserFiltering = typeFilter !== '' || topicFilter !== '';

  const onChangeTypeFilter = e => {
    setTypeFilter(e.target.value);
  };

  const onChangeTopicFilter = e => {
    setTopicFilter(e.target.value);
  };

  const guides = isUserFiltering ? filteredResults : includeGuides || [];
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
      className: "mt-2 mb-5 d-flex d-flex",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
          htmlFor: "type",
          className: "text-uppercase f6 color-text-secondary d-block",
          children: t('filters.type')
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
          value: typeFilter,
          className: "form-select f4 text-bold border-0 rounded-0 border-top box-shadow-none pl-0",
          name: "type",
          "aria-label": "guide types",
          "data-testid": "card-filter-dropdown",
          onChange: onChangeTypeFilter,
          children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
            value: "",
            children: t('filters.all')
          }), Object.entries(guideTypes).map(([key, val]) => {
            return /*#__PURE__*/jsx_runtime_.jsx("option", {
              value: key,
              children: val
            }, key);
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "mx-4",
        children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
          htmlFor: "topic",
          className: "text-uppercase f6 color-text-secondary d-block",
          children: t('filters.topic')
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
          value: topicFilter,
          className: "form-select f4 text-bold border-0 rounded-0 border-top box-shadow-none pl-0",
          name: "topics",
          "data-testid": "card-filter-dropdown",
          "aria-label": "guide topics",
          onChange: onChangeTopicFilter,
          children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
            value: "",
            children: t('filters.all')
          }), allTopics === null || allTopics === void 0 ? void 0 : allTopics.map(topic => {
            return /*#__PURE__*/jsx_runtime_.jsx("option", {
              value: topic,
              children: topic
            }, topic);
          })]
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex flex-wrap mr-0 mr-md-n6 mr-lg-n8",
      children: guides.slice(0, numVisible).map(card => {
        return /*#__PURE__*/jsx_runtime_.jsx(ArticleCard, {
          card: card,
          typeLabel: guideTypes[card.type]
        }, card.href);
      })
    }), guides.length > numVisible && /*#__PURE__*/jsx_runtime_.jsx("button", {
      className: "col-12 mt-5 text-center text-bold color-text-link btn-link",
      onClick: () => setNumVisible(numVisible + ArticleCards_PAGE_SIZE),
      children: t('load_more')
    }), guides.length === 0 && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "py-4 text-center color-text-secondary",
      children: /*#__PURE__*/jsx_runtime_.jsx("h4", {
        className: "text-normal",
        children: t('no_result')
      })
    })]
  });
};
;// CONCATENATED MODULE: ./components/sublanding/ProductSubLanding.tsx










const ProductSubLanding = () => {
  const {
    title,
    learningTracks,
    includeGuides
  } = useProductSubLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('sub_landing');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(DefaultLayout/* DefaultLayout */.H, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      className: "pt-3",
      children: /*#__PURE__*/jsx_runtime_.jsx(SubLandingHero, {})
    }), learningTracks && learningTracks.length > 0 && /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: `${title} learning paths`,
      className: "border-top py-6",
      sectionLink: "learning-paths",
      description: t('learning_paths_desc'),
      children: /*#__PURE__*/jsx_runtime_.jsx(LearningTracks, {})
    }), includeGuides && /*#__PURE__*/jsx_runtime_.jsx(LandingSection, {
      title: `All ${title} guides`,
      className: "border-top py-6 color-border-primary",
      sectionLink: "all-guides",
      children: /*#__PURE__*/jsx_runtime_.jsx(ArticleCards, {})
    })]
  });
};
;// CONCATENATED MODULE: ./components/landing/TableOfContents.tsx





const TableOfContents = props => {
  const {
    items,
    variant = 'expanded'
  } = props;
  const router = (0,router_.useRouter)();
  return /*#__PURE__*/jsx_runtime_.jsx("ul", {
    className: external_classnames_default()(variant === 'compact' ? 'list-style-inside pl-2' : 'list-style-none'),
    children: (items || []).map(item => {
      if (!item) {
        return null;
      }

      const {
        fullPath: href,
        title,
        intro
      } = item;
      const isActive = router.pathname === href;
      return variant === 'compact' ? /*#__PURE__*/jsx_runtime_.jsx("li", {
        className: "f4 my-1",
        children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
          href: href,
          children: title
        })
      }, href) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
        className: external_classnames_default()('mb-5', isActive && 'color-auto-gray-4'),
        children: [/*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
          href: href,
          className: "Bump-link--hover no-underline d-block py-1 border-bottom color-border-primary",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("h4", {
            children: [title, /*#__PURE__*/jsx_runtime_.jsx("span", {
              className: "Bump-link-symbol",
              children: "\u2192"
            })]
          })
        }), intro && /*#__PURE__*/jsx_runtime_.jsx("p", {
          className: "f4 mt-3",
          dangerouslySetInnerHTML: {
            __html: intro
          }
        })]
      }, href);
    })
  });
};
;// CONCATENATED MODULE: ./components/context/TocLandingContext.tsx



const TocLandingContext = /*#__PURE__*/(0,external_react_.createContext)(null);
const useTocLandingContext = () => {
  const context = (0,external_react_.useContext)(TocLandingContext);

  if (!context) {
    throw new Error('"useTocLandingContext" may only be used inside "TocLandingContext.Provider"');
  }

  return context;
};
const getTocLandingContextFromRequest = req => {
  var _req$context$page;

  return {
    title: req.context.page.title,
    productCallout: req.context.page.product || '',
    introPlainText: req.context.page.introPlainText,
    isEarlyAccess: ((_req$context$page = req.context.page) === null || _req$context$page === void 0 ? void 0 : _req$context$page.documentType) === 'early-access',
    tocItems: (req.context.genericTocFlat || req.context.genericTocNested || []).map(obj => pick_default()(obj, ['fullPath', 'title', 'intro'])),
    variant: req.context.genericTocFlat ? 'expanded' : 'compact',
    featuredLinks: getFeaturedLinksFromReq(req),
    renderedEarlyAccessPage: req.context.renderedPage
  };
};
;// CONCATENATED MODULE: ./components/landing/TocLanding.tsx









const TocLanding = () => {
  const {
    title,
    introPlainText,
    tocItems,
    productCallout,
    variant,
    featuredLinks,
    isEarlyAccess,
    renderedEarlyAccessPage
  } = useTocLandingContext();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('toc');
  return /*#__PURE__*/jsx_runtime_.jsx(DefaultLayout/* DefaultLayout */.H, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "container-xl px-3 px-md-6 my-4 my-lg-4",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-lg-flex flex-justify-between",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "d-block d-lg-none"
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "d-flex flex-items-center",
          children: /*#__PURE__*/jsx_runtime_.jsx(Breadcrumbs/* Breadcrumbs */.O, {})
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "d-none d-lg-block"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "article-grid-container",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "mt-7",
            children: [/*#__PURE__*/jsx_runtime_.jsx(ArticleTitle, {
              children: title
            }), /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "lead-mktg",
              children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                children: introPlainText
              })
            }), productCallout && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "product-callout border rounded-1 mb-4 p-3 color-border-success color-bg-success",
              dangerouslySetInnerHTML: {
                __html: productCallout
              }
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "border-bottom border-xl-0 pb-4 mb-5 pb-xl-0 mb-xl-0"
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: variant === 'expanded' ? 'mt-7' : 'mt-2',
            children: [featuredLinks.gettingStarted && featuredLinks.popular && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "pb-8 container-xl",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "gutter gutter-xl-spacious clearfix",
                children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                  className: "col-12 col-lg-6 mb-md-4 mb-lg-0 float-left",
                  children: /*#__PURE__*/jsx_runtime_.jsx(ArticleList/* ArticleList */.w, {
                    title: t('getting_started'),
                    variant: "spaced",
                    articles: featuredLinks.gettingStarted
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                  className: "col-12 col-lg-6 float-left",
                  children: /*#__PURE__*/jsx_runtime_.jsx(ArticleList/* ArticleList */.w, {
                    title: t('popular'),
                    variant: "spaced",
                    articles: featuredLinks.popular
                  })
                })]
              })
            }), isEarlyAccess && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "markdown-body",
              children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                id: "article-contents",
                className: "article-grid-body",
                dangerouslySetInnerHTML: {
                  __html: renderedEarlyAccessPage
                }
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(TableOfContents, {
              items: tocItems,
              variant: variant
            })]
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {})]
      })]
    })
  });
};
;// CONCATENATED MODULE: ./pages/[versionId]/[productId]/index.tsx

// "legacy" javascript needed to maintain existing functionality
// typically operating on elements **within** an article.

















const GlobalPage = ({
  mainContext,
  productLandingContext,
  productSubLandingContext,
  tocLandingContext,
  articleContext
}) => {
  const {
    currentLayoutName,
    relativePath
  } = mainContext;
  (0,external_react_.useEffect)(() => {
    copyCode();
    displayPlatformSpecificContent();
    displayToolSpecificContent();
    localization();
    toggle_images();
    wrap_code_terms();
  }, []);
  let content;

  if (currentLayoutName === 'product-landing') {
    content = /*#__PURE__*/jsx_runtime_.jsx(ProductLandingContext.Provider, {
      value: productLandingContext,
      children: /*#__PURE__*/jsx_runtime_.jsx(ProductLanding, {})
    });
  } else if (currentLayoutName === 'product-sublanding') {
    content = /*#__PURE__*/jsx_runtime_.jsx(ProductSubLandingContext.Provider, {
      value: productSubLandingContext,
      children: /*#__PURE__*/jsx_runtime_.jsx(ProductSubLanding, {})
    });
  } else if (relativePath !== null && relativePath !== void 0 && relativePath.endsWith('index.md')) {
    content = /*#__PURE__*/jsx_runtime_.jsx(TocLandingContext.Provider, {
      value: tocLandingContext,
      children: /*#__PURE__*/jsx_runtime_.jsx(TocLanding, {})
    });
  } else {
    content = /*#__PURE__*/jsx_runtime_.jsx(ArticleContext.Provider, {
      value: articleContext,
      children: /*#__PURE__*/jsx_runtime_.jsx(ArticlePage, {})
    });
  }

  return /*#__PURE__*/jsx_runtime_.jsx(MainContext/* MainContext.Provider */.Tr.Provider, {
    value: mainContext,
    children: content
  });
};

/* harmony default export */ var _productId_ = (GlobalPage);
const getServerSideProps = async context => {
  const req = context.req;
  return {
    props: {
      mainContext: (0,MainContext/* getMainContextFromRequest */.tO)(req),
      productLandingContext: getProductLandingContextFromRequest(req),
      productSubLandingContext: getProductSubLandingContextFromRequest(req),
      tocLandingContext: getTocLandingContextFromRequest(req),
      articleContext: getArticleContextFromRequest(req)
    }
  };
};

/***/ })

};
;
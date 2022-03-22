exports.id = 977;
exports.ids = [977];
exports.modules = {

/***/ 8977:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "H": function() { return /* binding */ DefaultLayout; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__(3289);
var style_default = /*#__PURE__*/__webpack_require__.n(style_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: external "@primer/octicons-react"
var octicons_react_ = __webpack_require__(3887);
// EXTERNAL MODULE: ./components/Link.tsx
var Link = __webpack_require__(6359);
// EXTERNAL MODULE: ./components/hooks/useTranslation.tsx
var useTranslation = __webpack_require__(4433);
// EXTERNAL MODULE: ./components/context/MainContext.tsx
var MainContext = __webpack_require__(1013);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(4058);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./components/product/AllProductsLink.tsx
var AllProductsLink = __webpack_require__(2880);
;// CONCATENATED MODULE: ./components/product/SidebarProduct.tsx










const SidebarProduct = () => {
  const router = (0,router_.useRouter)();
  const {
    currentProductTree
  } = (0,MainContext/* useMainContext */.Hv)();
  (0,external_react_.useEffect)(() => {
    var _window;

    const activeArticle = document.querySelector('.sidebar-article.active'); // Setting to the top doesn't give enough context of surrounding categories

    activeArticle === null || activeArticle === void 0 ? void 0 : activeArticle.scrollIntoView({
      block: 'center'
    }); // scrollIntoView affects some articles that are very low in the sidebar
    // The content scrolls down a bit. This sets the article content back up top

    (_window = window) === null || _window === void 0 ? void 0 : _window.scrollTo(0, 0);
  }, []);

  if (!currentProductTree) {
    return null;
  }

  const productTitle = currentProductTree.renderedShortTitle || currentProductTree.renderedFullTitle;
  const routePath = `/${router.locale}${router.asPath.split('?')[0]}`; // remove query string

  const hasExactCategory = currentProductTree.childPages.find(({
    href
  }) => routePath.includes(href));
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(AllProductsLink/* AllProductsLink */.H, {}), !currentProductTree.page.hidden && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
        title: "",
        className: "sidebar-product mb-2",
        children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
          href: currentProductTree.href,
          className: "pl-4 pr-5 pb-1 f4 color-text-primary no-underline",
          children: productTitle
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
          className: "sidebar-categories list-style-none",
          children: currentProductTree.childPages.map((childPage, i) => {
            const isStandaloneCategory = childPage.page.documentType === 'article';
            const childTitle = childPage.renderedShortTitle || childPage.renderedFullTitle;
            const isActive = routePath.includes(`${childPage.href}/`);
            const isCurrent = routePath === childPage.href;
            const defaultOpen = hasExactCategory ? isActive || isCurrent : false;
            return /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: external_classnames_default()('sidebar-category py-1', isActive && 'active', isCurrent && 'is-current-page', isStandaloneCategory && 'standalone-category'),
              children: isStandaloneCategory ? /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
                href: childPage.href,
                className: "pl-4 pr-2 py-2 d-block flex-auto mr-3 color-text-primary no-underline text-bold",
                children: childTitle
              }) : /*#__PURE__*/jsx_runtime_.jsx(CollapsibleSection, {
                defaultOpen: defaultOpen,
                routePath: routePath,
                title: childTitle,
                page: childPage
              })
            }, childPage.href + i);
          })
        })
      })]
    })]
  });
};

const CollapsibleSection = props => {
  var _page$childPages$, _page$childPages$2;

  const {
    routePath,
    defaultOpen,
    title,
    page
  } = props;
  const {
    0: isOpen,
    1: setIsOpen
  } = (0,external_react_.useState)(defaultOpen);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("details", {
    open: defaultOpen,
    onToggle: e => setIsOpen(e.target.open),
    children: [/*#__PURE__*/jsx_runtime_.jsx("summary", {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex flex-justify-between",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "pl-4 pr-1 py-2 f6 text-uppercase d-block flex-auto mr-3 color-text-primary no-underline text-bold",
          children: title
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          style: {
            marginTop: 7
          },
          className: "flex-shrink-0 pr-3",
          children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronDownIcon, {
            className: external_classnames_default()('opacity-60', isOpen && 'rotate-180')
          })
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
      children: ((_page$childPages$ = page.childPages[0]) === null || _page$childPages$ === void 0 ? void 0 : _page$childPages$.page.documentType) === 'mapTopic' ? /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "sidebar-topics list-style-none position-relative",
        children: page.childPages.map((childPage, i) => {
          const childTitle = childPage.renderedShortTitle || childPage.renderedFullTitle;
          const isActive = routePath.includes(childPage.href);
          const isCurrent = routePath === childPage.href;
          return /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: external_classnames_default()('sidebar-maptopic', isActive && 'active', isCurrent && 'is-current-page'),
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("details", {
              open: isActive,
              onToggle: e => e.stopPropagation(),
              children: [/*#__PURE__*/jsx_runtime_.jsx("summary", {
                children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                  className: external_classnames_default()('pl-4 pr-5 py-2 no-underline'),
                  children: childTitle
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
                className: "sidebar-articles my-2",
                children: childPage.childPages.map((grandchildPage, i, arr) => {
                  const grandchildTitle = grandchildPage.renderedShortTitle || grandchildPage.renderedFullTitle;
                  const isLast = i === arr.length - 1;
                  const isActive = routePath === grandchildPage.href;
                  return /*#__PURE__*/jsx_runtime_.jsx("li", {
                    className: external_classnames_default()('sidebar-article', isActive && 'active'),
                    children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
                      href: grandchildPage.href,
                      className: external_classnames_default()('pl-6 pr-5 py-1 no-underline', isLast && 'pb-2', isActive && 'color-text-link'),
                      children: grandchildTitle
                    })
                  }, grandchildPage.href + i);
                })
              })]
            })
          }, childPage.href + i);
        })
      }) : ((_page$childPages$2 = page.childPages[0]) === null || _page$childPages$2 === void 0 ? void 0 : _page$childPages$2.page.documentType) === 'article' ? /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "sidebar-articles list-style-none",
        children: page.childPages.map((childPage, i, arr) => {
          const childTitle = childPage.renderedShortTitle || childPage.renderedFullTitle;
          const isLast = i === arr.length - 1;
          const isActive = routePath.includes(childPage.href);
          const isCurrent = routePath === childPage.href;
          return /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: external_classnames_default()('sidebar-article', isActive && 'active', isCurrent && 'is-current-page'),
            children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
              href: childPage.href,
              className: external_classnames_default()('pl-6 pr-5 py-1 no-underline', isLast && 'pb-2', isActive && 'color-text-link'),
              children: childTitle
            })
          }, childPage.href + i);
        })
      }) : null
    })]
  });
};
// EXTERNAL MODULE: ./components/hooks/useVersion.tsx
var useVersion = __webpack_require__(6613);
;// CONCATENATED MODULE: ./components/SidebarNav.tsx












const SidebarNav = () => {
  const router = (0,router_.useRouter)();
  const {
    error,
    relativePath,
    isFPT
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('header');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "jsx-4031964419" + " " + "d-none d-lg-block color-bg-tertiary position-sticky top-0 overflow-y-auto root",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      style: {
        zIndex: 3
      },
      id: "github-logo",
      role: "banner",
      className: "jsx-4031964419" + " " + "d-flex flex-items-center p-4 position-sticky top-0 color-bg-tertiary",
      children: [/*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
        href: `/${router.locale}`,
        className: "color-text-primary",
        "aria-hidden": "true",
        tabIndex: -1,
        children: /*#__PURE__*/jsx_runtime_.jsx("img", {
          src: "assets/images/site/govlogo.png",
          width: "50px",
          className: "jsx-4031964419"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
        href: `/${router.locale}`,
        className: "h4-mktg color-text-primary no-underline no-wrap pl-2 flex-auto",
        children: "BayDiG Wiki"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("nav", {
      className: "jsx-4031964419",
      children: error === '404' || relativePath === 'index.md' ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
        className: "jsx-4031964419" + " " + "sidebar-products mt-4",
        children: [!isFPT && /*#__PURE__*/jsx_runtime_.jsx(AllProductsLink/* AllProductsLink */.H, {}), /*#__PURE__*/jsx_runtime_.jsx(SidebarHomepage, {})]
      }) : /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "jsx-4031964419" + " " + "sidebar-products",
        children: /*#__PURE__*/jsx_runtime_.jsx(SidebarProduct, {})
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((style_default()), {
      id: "4031964419",
      children: [".root.jsx-4031964419{width:286px;height:100vh;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding-bottom:32px;}"]
    })]
  });
};

const SidebarHomepage = () => {
  const router = (0,router_.useRouter)();
  const {
    currentVersion
  } = (0,useVersion/* useVersion */.a)();
  const {
    activeProducts,
    isFPT
  } = (0,MainContext/* useMainContext */.Hv)();
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: activeProducts.map(product => {
      var _product$versions, _product$versions2;

      if (!isFPT && !((_product$versions = product.versions) !== null && _product$versions !== void 0 && _product$versions.includes(currentVersion)) && !product.external) {
        return null;
      }

      const href = `${!product.external ? `/${router.locale}` : ''}${(_product$versions2 = product.versions) !== null && _product$versions2 !== void 0 && _product$versions2.includes(currentVersion) && !isFPT ? `/${currentVersion}/${product.id}` : product.href}`;
      return /*#__PURE__*/jsx_runtime_.jsx("li", {
        title: `${product.name}${product.external ? '(External Site)' : ''}`,
        className: "sidebar-product",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
          href: href,
          target: product.external ? '_blank' : undefined,
          className: "f4 pl-4 pr-5 py-2 color-text-primary",
          children: [product.name, product.external && /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "ml-1",
            children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.LinkExternalIcon, {
              size: "small"
            })
          })]
        })
      }, product.id);
    })
  });
};
// EXTERNAL MODULE: external "@primer/components"
var components_ = __webpack_require__(988);
;// CONCATENATED MODULE: ./components/lib/ExcludesNull.tsx
function ExcludesNull(x) {
  return x !== null;
}
;// CONCATENATED MODULE: ./components/HeaderNotifications.tsx








var NotificationType;

(function (NotificationType) {
  NotificationType["RELEASE"] = "RELEASE";
  NotificationType["TRANSLATION"] = "TRANSLATION";
  NotificationType["EARLY_ACCESS"] = "EARLY_ACCESS";
})(NotificationType || (NotificationType = {}));

const HeaderNotifications = () => {
  const router = (0,router_.useRouter)();
  const {
    currentVersion
  } = (0,useVersion/* useVersion */.a)();
  const {
    relativePath,
    allVersions,
    data,
    languages,
    currentLanguage,
    userLanguage,
    currentPathWithoutLanguage
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('header');
  const translationNotices = [];

  if (router.locale !== 'en') {
    if (relativePath !== null && relativePath !== void 0 && relativePath.includes('/site-policy')) {
      translationNotices.push({
        type: NotificationType.TRANSLATION,
        content: data.reusables.policies.translation
      });
    } else if (languages[currentLanguage].wip !== true) {
      translationNotices.push({
        type: NotificationType.TRANSLATION,
        content: t('notices.localization_complete')
      });
    } else if (languages[currentLanguage].wip) {
      translationNotices.push({
        type: NotificationType.TRANSLATION,
        content: t('notices.localization_in_progress')
      });
    }
  } else {
    var _languages$userLangua;

    if (userLanguage && userLanguage !== 'en' && ((_languages$userLangua = languages[userLanguage]) === null || _languages$userLangua === void 0 ? void 0 : _languages$userLangua.wip) === false) {
      translationNotices.push({
        type: NotificationType.TRANSLATION,
        content: `This article is also available in your language of choice. Click <a href="/${userLanguage}${currentPathWithoutLanguage}">here</a>`
      });
    }
  }

  const releaseNotices = [];

  if (currentVersion === 'github-ae@latest') {
    releaseNotices.push({
      type: NotificationType.RELEASE,
      content: t('notices.ghae_silent_launch')
    });
  } else if (currentVersion === data.variables.release_candidate.version) {
    releaseNotices.push({
      type: NotificationType.RELEASE,
      content: `${allVersions[currentVersion].versionTitle}${t('notices.release_candidate')}`
    });
  }

  const allNotifications = [...translationNotices, ...releaseNotices, // ONEOFF EARLY ACCESS NOTICE
  (relativePath || '').includes('early-access/') ? {
    type: NotificationType.EARLY_ACCESS,
    content: t('notices.early_access')
  } : null].filter(ExcludesNull);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: allNotifications.map(({
      type,
      content
    }, i) => {
      const isLast = i === allNotifications.length - 1;
      return /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: external_classnames_default()('header-notifications text-center f5 color-text-primary py-4 px-6', type === NotificationType.TRANSLATION && 'translation_notice color-bg-info', type === NotificationType.RELEASE && 'release_notice color-bg-info', type === NotificationType.EARLY_ACCESS && 'early_access color-bg-danger', !isLast && 'border-bottom color-border-tertiary'),
        dangerouslySetInnerHTML: {
          __html: content
        }
      }, content);
    })
  });
};
;// CONCATENATED MODULE: ./components/ProductPicker.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const ProductPicker = () => {
  const router = (0,router_.useRouter)();
  const {
    activeProducts,
    currentProduct
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    getDetailsProps
  } = (0,components_.useDetails)({});
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(components_.Details, _objectSpread(_objectSpread({}, getDetailsProps()), {}, {
    className: "details-reset",
    children: [/*#__PURE__*/jsx_runtime_.jsx("summary", {
      className: "color-text-link",
      role: "button",
      "aria-label": "Toggle products list",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        id: "current-product",
        className: "d-flex flex-items-center flex-justify-between py-2",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          children: (currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.name) || 'Alle Inhalte und Links'
        }), /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronDownIcon, {
          size: 24,
          className: "arrow ml-md-1"
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      id: "homepages",
      style: {
        zIndex: 6
      },
      children: activeProducts.map(product => {
        return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
          href: `${product.external ? '' : `/${router.locale}`}${product.href}`,
          className: external_classnames_default()('d-block py-2', product.id === (currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.id) ? 'color-text-link text-underline active' : 'Link--primary no-underline'),
          children: [product.name, product.external && /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "ml-1",
            children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.LinkExternalIcon, {
              size: "small"
            })
          })]
        }, product.id);
      })
    })]
  }));
};
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./components/landing/HomepageVersionPicker.tsx




function HomepageVersionPicker_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function HomepageVersionPicker_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { HomepageVersionPicker_ownKeys(Object(source), true).forEach(function (key) { HomepageVersionPicker_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { HomepageVersionPicker_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function HomepageVersionPicker_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var _StyledDropdown = external_styled_components_default()(components_.Dropdown).withConfig({
  displayName: "HomepageVersionPicker___StyledDropdown",
  componentId: "zwy8n-0"
})(["ul{width:unset;}"]);

const HomepageVersionPicker = ({
  variant
}) => {
  const router = (0,router_.useRouter)();
  const {
    currentVersion
  } = (0,useVersion/* useVersion */.a)();
  const {
    getDetailsProps
  } = (0,components_.useDetails)({});
  const {
    allVersions,
    page,
    enterpriseServerVersions
  } = (0,MainContext/* useMainContext */.Hv)();

  if (page.permalinks && page.permalinks.length <= 1) {
    return null;
  }

  const label = allVersions[currentVersion].versionTitle;

  if (variant === 'inline') {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(components_.Details, HomepageVersionPicker_objectSpread(HomepageVersionPicker_objectSpread({}, getDetailsProps()), {}, {
      className: "details-reset",
      children: [/*#__PURE__*/jsx_runtime_.jsx("summary", {
        "aria-label": "Toggle language list",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "d-flex flex-items-center flex-justify-between py-2",
          children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
            children: label
          }), /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronDownIcon, {
            size: 24,
            className: "arrow ml-md-1"
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        children: [(page.permalinks || []).map(permalink => {
          return /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
            href: permalink.href,
            className: external_classnames_default()('d-block py-2', permalink.href === router.asPath ? 'color-text-link text-underline active' : 'Link--primary no-underline'),
            children: permalink.pageVersionTitle
          }, permalink.href);
        }), /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
          href: `/${router.locale}/${enterpriseServerVersions[0]}/admin/all-releases`,
          className: "f6 no-underline color-text-tertiary no-wrap",
          children: "See all Enterprise releases"
        })]
      })]
    }));
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(_StyledDropdown, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("summary", {
      children: [label, /*#__PURE__*/jsx_runtime_.jsx(components_.Dropdown.Caret, {})]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(components_.Dropdown.Menu, {
      direction: "sw",
      children: [(page.permalinks || []).map(permalink => {
        return /*#__PURE__*/jsx_runtime_.jsx(components_.Dropdown.Item, {
          children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
            href: permalink.href,
            children: permalink.pageVersionTitle
          })
        }, permalink.href);
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "pb-1",
        children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
          href: `/${router.locale}/${enterpriseServerVersions[0]}/admin/all-releases`,
          className: "f6 no-underline color-text-tertiary pl-3 pr-2 no-wrap",
          children: "See all Enterprise releases"
        })
      })]
    })]
  });
};
// EXTERNAL MODULE: ./components/Search.tsx
var Search = __webpack_require__(1125);
;// CONCATENATED MODULE: ./components/Header.tsx














const Header = () => {
  const router = (0,router_.useRouter)();
  const {
    relativePath,
    currentLayoutName,
    error
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)(['header', 'homepage']);
  const {
    0: isMenuOpen,
    1: setIsMenuOpen
  } = (0,external_react_.useState)(false);
  const showVersionPicker = relativePath == 'iwqsqwsqws.md';
  /* relativePath === 'index.md' ||
   currentLayoutName === 'product-landing' ||
   currentLayoutName === 'product-sublanding' ||
   currentLayoutName === 'release-notes'                     commented out to remove version Picker*/

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "border-bottom color-border-secondary no-print",
    children: [error !== '404' && /*#__PURE__*/jsx_runtime_.jsx(HeaderNotifications, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
      className: "container-xl px-3 px-md-6 pt-3 pb-3 position-relative",
      style: {
        zIndex: 2
      },
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-none d-lg-flex flex-justify-end",
        "data-testid": "desktop-header",
        children: [showVersionPicker && /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "py-2 mr-4",
          children: /*#__PURE__*/jsx_runtime_.jsx(HomepageVersionPicker, {})
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "py-2",
          children: /*#__PURE__*/jsx_runtime_.jsx("svg", {
            width: "60px",
            height: "32px",
            viewBox: "0 0 740 390",
            version: "1.1",
            children: /*#__PURE__*/jsx_runtime_.jsx("g", {
              id: "Page-1",
              stroke: "none",
              strokeWidth: "1",
              fill: "none",
              fillRule: "evenodd",
              children: /*#__PURE__*/jsx_runtime_.jsx("g", {
                id: "2015_Logo_TUM_neg_RGB",
                fill: "#e3e3e3",
                children: /*#__PURE__*/jsx_runtime_.jsx("path", {
                  d: "M405,9.13352234e-15 L370,2.70412665e-15 L370,320 L290,320 L290,1.5562918e-14 L255,9.13352234e-15 L0,1.35206332e-15 L0,70 L70,70 L70,390 L140,390 L140,70 L220,70 L220,390 L255,390 L405,390 L440,390 L440,70 L520,70 L520,390 L590,390 L590,70 L670,70 L670,390 L740,390 L740,35 L740,1.35206332e-15 L405,1.35206332e-15 Z",
                  id: "Rectangle-1"
                })
              })
            })
          })
        }), relativePath !== 'index.md' && error !== '404' && /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "d-inline-block ml-4",
          children: /*#__PURE__*/jsx_runtime_.jsx(Search/* Search */.o, {})
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-lg-none",
        "data-testid": "mobile-header",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "d-flex flex-justify-between",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "d-flex flex-items-center",
            id: "github-logo-mobile",
            role: "banner",
            children: [/*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
              "aria-hidden": "true",
              tabIndex: -1,
              href: `/${router.locale}`,
              children: /*#__PURE__*/jsx_runtime_.jsx("img", {
                src: "assets/images/site/govlogo.png",
                width: "32px"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
              href: `/${router.locale}`,
              className: "h4-mktg color-text-primary no-underline no-wrap pl-2",
              children: t('github_docs')
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            children: /*#__PURE__*/jsx_runtime_.jsx(components_.ButtonOutline, {
              "data-testid": "mobile-menu-button",
              css: true,
              onClick: () => setIsMenuOpen(!isMenuOpen),
              "aria-label": "Navigation Menu",
              children: isMenuOpen ? /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.XIcon, {
                size: "small"
              }) : /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ThreeBarsIcon, {
                size: "small"
              })
            })
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "relative",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: external_classnames_default()('width-full position-absolute left-0 right-0 color-shadow-large color-bg-primary px-3 px-md-6 pb-3', isMenuOpen ? 'd-block' : 'd-none'),
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "mt-3 mb-2",
              children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
                className: "text-mono f5 text-normal color-text-secondary",
                children: t('explore_by_product')
              }), /*#__PURE__*/jsx_runtime_.jsx(ProductPicker, {})]
            }), showVersionPicker && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "border-top py-2",
              children: /*#__PURE__*/jsx_runtime_.jsx(HomepageVersionPicker, {
                variant: "inline"
              })
            }), relativePath !== 'index.md' && error !== '404' && /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "pt-3 border-top",
              children: /*#__PURE__*/jsx_runtime_.jsx(Search/* Search */.o, {})
            })]
          })
        })]
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/SmallFooter.tsx



const SmallFooter = () => {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('footer');
  return /*#__PURE__*/jsx_runtime_.jsx("footer", {
    className: "py-6 text-small",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "container-xl d-flex px-3 px-md-6",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
        className: "d-flex list-style-none flex-wrap flex-justify-center flex-xl-justify-start",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
          className: "d-flex mr-xl-3 color-text-secondary",
          children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
            src: "assets/images/site/govlogo.png",
            width: "18px"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            style: {
              marginLeft: 1 + 'em'
            },
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
              children: ["\xA9 ", new Date().getFullYear(), " Lehrstuhl f\xFCr Recht und Sicherheit der Digitalisierung"]
            })
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("li", {
          className: "ml-3 no-print",
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            href: "https://www.gov.tum.de/elaw",
            children: `Bedingungen`
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("li", {
          className: "ml-3 no-print",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
            href: "https://www.gov.tum.de/elaw",
            children: [`Impressum`, " "]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("li", {
          className: "ml-3",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
            href: "https://digitalgesetz.wiki",
            children: [`digitalgesetz.wiki`, " "]
          })
        })]
      })
    })
  });
};
;// CONCATENATED MODULE: ./components/ScrollButton.tsx





const ScrollButton = () => {
  const {
    0: show,
    1: setShow
  } = (0,external_react_.useState)(false);
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('scroll_button');
  (0,external_react_.useEffect)(() => {
    // show scroll button only when view is scrolled down
    const onScroll = function () {
      const y = document.documentElement.scrollTop; // get the height from page top

      if (y < 100) {
        setShow(false);
      } else if (y >= 100) {
        setShow(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: external_classnames_default()('position-fixed bottom-3 right-3 transition-200', show ? 'opacity-100' : 'opacity-0'),
    children: /*#__PURE__*/jsx_runtime_.jsx("button", {
      onClick: onClick,
      className: external_classnames_default()('tooltipped tooltipped-n tooltipped-no-delay color-bg-info-inverse color-text-inverse circle border-0'),
      style: {
        width: 40,
        height: 40
      },
      "aria-label": t('scroll_to_top'),
      children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronUpIcon, {})
    })
  });
};
// EXTERNAL MODULE: ./javascripts/events.ts + 1 modules
var events = __webpack_require__(6143);
;// CONCATENATED MODULE: ./components/Survey.tsx








var ViewState;

(function (ViewState) {
  ViewState["START"] = "START";
  ViewState["YES"] = "YES";
  ViewState["NO"] = "NO";
  ViewState["END"] = "END";
})(ViewState || (ViewState = {}));

const Survey = () => {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('survey');
  const {
    0: state,
    1: setState
  } = (0,external_react_.useState)(ViewState.START);
  const formRef = (0,external_react_.useRef)(null);

  function vote(state) {
    return () => {
      trackEvent(getFormData());
      setState(state);
    };
  }

  function submit(evt) {
    evt.preventDefault();
    trackEvent(getFormData());
    setState(ViewState.END);
  }

  function getFormData() {
    if (!formRef.current) return;
    return new FormData(formRef.current);
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
    className: "f5",
    onSubmit: submit,
    ref: formRef,
    "data-testid": "survey-form",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h2", {
      className: "mb-1 f4",
      children: [t`able_to_find`, /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
        className: "f6 text-normal ml-3 color-text-link",
        href: "/github/site-policy/github-privacy-statement",
        target: "_blank",
        children: t`privacy_policy`
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("input", {
      type: "text",
      className: "d-none",
      name: "survey-token",
      "aria-hidden": "true"
    }), state !== ViewState.END && /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
      className: "radio-group",
      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
        id: "survey-yes",
        type: "radio",
        name: "survey-vote",
        value: "Y",
        "aria-label": t`yes`,
        hidden: true,
        onChange: vote(ViewState.YES),
        defaultChecked: state === ViewState.YES
      }), /*#__PURE__*/jsx_runtime_.jsx("label", {
        className: "btn x-radio-label mr-1",
        htmlFor: "survey-yes",
        children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ThumbsupIcon, {
          size: 24,
          className: "color-text-tertiary"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("input", {
        id: "survey-no",
        type: "radio",
        name: "survey-vote",
        value: "N",
        "aria-label": t`no`,
        hidden: true,
        onChange: vote(ViewState.NO),
        defaultChecked: state === ViewState.NO
      }), /*#__PURE__*/jsx_runtime_.jsx("label", {
        className: "btn x-radio-label",
        htmlFor: "survey-no",
        children: /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ThumbsdownIcon, {
          size: 24,
          className: "color-text-tertiary"
        })
      })]
    }), [ViewState.YES, ViewState.NO].includes(state) && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "color-text-secondary f6",
        children: [state === ViewState.YES && t`yes_feedback`, state === ViewState.NO && t`no_feedback`]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "mb-3",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
          className: "d-block mb-1 f6",
          htmlFor: "survey-comment",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
            children: [state === ViewState.YES && t`comment_yes_label`, state === ViewState.NO && t`comment_no_label`]
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "text-normal color-text-tertiary float-right ml-1",
            children: t`optional`
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("textarea", {
          className: "form-control input-sm width-full",
          name: "survey-comment",
          id: "survey-comment"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
          className: "d-block mb-1 f6",
          htmlFor: "survey-email",
          children: [t`email_label`, /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "text-normal color-text-tertiary float-right ml-1",
            children: t`optional`
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("input", {
          type: "email",
          className: "form-control input-sm width-full",
          name: "survey-email",
          id: "survey-email",
          placeholder: t`email_placeholder`
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "f6 color-text-secondary",
          children: t`not_support`
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "text-right",
        children: /*#__PURE__*/jsx_runtime_.jsx("button", {
          type: "submit",
          className: "btn btn-sm",
          children: t`send`
        })
      })]
    }), state === ViewState.END && /*#__PURE__*/jsx_runtime_.jsx("p", {
      className: "color-text-secondary f6",
      "data-testid": "survey-end",
      children: t`feedback`
    })]
  });
};

function trackEvent(formData) {
  if (!formData) return; // Nota bene: convert empty strings to undefined

  return (0,events/* sendEvent */.qP)({
    type: events/* EventType.survey */.tw.survey,
    survey_token: formData.get('survey-token') || undefined,
    // Honeypot
    survey_vote: formData.get('survey-vote') === 'Y',
    survey_comment: formData.get('survey-comment') || undefined,
    survey_email: formData.get('survey-email') || undefined
  });
}
;// CONCATENATED MODULE: ./components/Contribution.tsx





const Contribution = () => {
  const {
    relativePath
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('contribution_cta');
  const contributionHref = relativePath ? `https://github.com/tum-elaw/baydig-wiki/edit/main/content/${relativePath}` : 'https://github.com/tum-elaw/baydig-wiki';
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "f5 contribution",
    children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
      className: "f4",
      children: t`title`
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      className: "color-text-secondary f6",
      children: t`body`
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      className: "btn btn-outline",
      href: contributionHref,
      children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.GitPullRequestIcon, {
        size: "small",
        className: "octicon mr-1"
      }), t`button`]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
      className: "color-text-secondary f6 mt-2",
      children: [t`or`, ' ', /*#__PURE__*/jsx_runtime_.jsx("a", {
        href: "https://github.com/github/docs/blob/main/CONTRIBUTING.md",
        target: "_blank",
        rel: "noopener",
        children: t`to_guidelines`
      })]
    })]
  });
};
;// CONCATENATED MODULE: ./components/Support.tsx





const Support = () => {
  const {
    isEnterprise
  } = (0,useVersion/* useVersion */.a)();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('support');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
      className: "mb-2 f4",
      children: t`still_need_help`
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      id: "ask-community",
      href: "https://chat.tum.de/invite/MxqZgg",
      target: "_blank",
      className: "btn btn-outline mr-4 mt-2",
      children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.PeopleIcon, {
        size: "small",
        className: "octicon mr-1"
      }), t`ask_community`]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      id: "qna",
      href: "https://github.com/tum-elaw/BayDiG-wiki/discussions/categories/q-a",
      target: "_blank",
      className: "btn btn-outline mr-4 mt-2",
      children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.QuestionIcon, {
        size: "small",
        className: "octicon mr-1"
      }), t`qna`]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      id: "contact-us",
      href: isEnterprise ? 'https://www.gov.sot.tum.de/elaw/team/michael-bressler/' : 'https://www.gov.sot.tum.de/elaw/team/michael-bressler/',
      target: "_blank",
      className: "btn btn-outline mt-2",
      children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.CommentDiscussionIcon, {
        size: "small",
        className: "octicon mr-1"
      }), t`contact_support`]
    })]
  });
};
;// CONCATENATED MODULE: ./components/SupportSection.tsx







const SupportSection = () => {
  const {
    currentVersion
  } = (0,useVersion/* useVersion */.a)();
  const {
    enterpriseServerReleases
  } = (0,MainContext/* useMainContext */.Hv)();
  const isDeprecated = enterpriseServerReleases.isOldestReleaseDeprecated && currentVersion.includes(enterpriseServerReleases.oldestSupported);
  return /*#__PURE__*/jsx_runtime_.jsx("section", {
    className: "mt-lg-9 py-7 px-3 px-md-6 no-print color-bg-tertiary",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "container-xl gutter-lg-spacious clearfix",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "col-12 col-lg-6 col-xl-4 mb-6 mb-xl-0 float-left",
        children: !isDeprecated && /*#__PURE__*/jsx_runtime_.jsx(Survey, {})
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "col-12 col-lg-6 col-xl-4 mb-6 mb-xl-0 float-left",
        children: !isDeprecated && /*#__PURE__*/jsx_runtime_.jsx(Contribution, {})
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "col-12 col-lg-12 col-xl-4 float-left",
        children: /*#__PURE__*/jsx_runtime_.jsx(Support, {})
      })]
    })
  });
};
;// CONCATENATED MODULE: ./components/DeprecationBanner.tsx




const DeprecationBanner = () => {
  const {
    data,
    enterpriseServerReleases
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    currentVersion
  } = (0,useVersion/* useVersion */.a)();

  if (!currentVersion.includes(enterpriseServerReleases.oldestSupported)) {
    return null;
  }

  const message = enterpriseServerReleases.isOldestReleaseDeprecated ? data.reusables.enterprise_deprecation.version_was_deprecated : data.reusables.enterprise_deprecation.version_will_be_deprecated;
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "deprecation-banner border rounded-1 mb-2 color-bg-warning p-3 color-border-warning f5",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("b", {
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          dangerouslySetInnerHTML: {
            __html: message
          }
        }), ' ', /*#__PURE__*/jsx_runtime_.jsx("span", {
          "data-date": enterpriseServerReleases.nextDeprecationDate,
          "data-format": "%B %d, %Y",
          title: enterpriseServerReleases.nextDeprecationDate,
          children: enterpriseServerReleases.nextDeprecationDate
        }), "."]
      }), ' ', /*#__PURE__*/jsx_runtime_.jsx("span", {
        dangerouslySetInnerHTML: {
          __html: data.reusables.enterprise_deprecation.deprecation_details
        }
      })]
    })
  });
};
;// CONCATENATED MODULE: ./components/DefaultLayout.tsx











const DefaultLayout = props => {
  const {
    page,
    error,
    isHomepageVersion
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('errors');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "d-lg-flex",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [error === '404' ? /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: t('oops')
      }) : !isHomepageVersion && page.fullTitle ? /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: page.fullTitle
      }) : null, page.introPlainText && /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: page.introPlainText
      }), page.topics.length > 0 && /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "keywords",
        content: page.topics.join(',')
      }), page.hidden && /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "robots",
        content: "noindex"
      }), page.languageVariants.map(languageVariant => {
        return /*#__PURE__*/jsx_runtime_.jsx("link", {
          rel: "alternate",
          hrefLang: languageVariant.hreflang,
          href: `https://docs.github.com${languageVariant.href}`
        }, languageVariant.href);
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(SidebarNav, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("main", {
      className: "flex-1 min-width-0",
      children: [/*#__PURE__*/jsx_runtime_.jsx(Header, {}), /*#__PURE__*/jsx_runtime_.jsx(DeprecationBanner, {}), props.children, /*#__PURE__*/jsx_runtime_.jsx(SupportSection, {}), /*#__PURE__*/jsx_runtime_.jsx(SmallFooter, {}), /*#__PURE__*/jsx_runtime_.jsx(ScrollButton, {})]
    })]
  });
};

/***/ }),

/***/ 6359:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": function() { return /* binding */ Link; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var components_context_MainContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1013);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const {
  NODE_ENV
} = process.env;
function Link(props) {
  const {
    airGap
  } = (0,components_context_MainContext__WEBPACK_IMPORTED_MODULE_2__/* .useMainContext */ .Hv)();

  const {
    href,
    locale,
    disableClientTransition = true
  } = props,
        restProps = _objectWithoutProperties(props, ["href", "locale", "disableClientTransition"]);

  if (!href && NODE_ENV !== 'production') {
    console.warn('Missing href on Link');
  }

  const isExternal = (href === null || href === void 0 ? void 0 : href.startsWith('http')) || (href === null || href === void 0 ? void 0 : href.startsWith('//')); // In airgap mode, add a tooltip to external links warning they may not work.

  if (airGap && isExternal) {
    if (restProps.className) {
      restProps.className += ' tooltipped';
    } else {
      restProps.className = 'tooltipped';
    }

    restProps['aria-label'] = 'This link may not work in this environment.';
  }

  if (disableClientTransition) {
    return (
      /*#__PURE__*/

      /* eslint-disable-next-line jsx-a11y/anchor-has-content */
      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", _objectSpread({
        href: locale ? `/${locale}${href}` : href,
        rel: isExternal ? 'noopener' : ''
      }, restProps))
    );
  }

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__.default, {
    href: href || '',
    locale: locale || false,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", _objectSpread({
      rel: isExternal ? 'noopener' : ''
    }, restProps))
  });
}

/***/ }),

/***/ 1125:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": function() { return /* binding */ Search; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(223);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_hooks_useTranslation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4433);
/* harmony import */ var _javascripts_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6143);
/* harmony import */ var _context_MainContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1013);
/* harmony import */ var components_hooks_useVersion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6613);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4058);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);











// Homepage and 404 should be `isStandalone`, all others not
// `updateSearchParams` should be false on the GraphQL explorer page
function Search({
  isStandalone = false,
  updateSearchParams = true,
  children
}) {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const {
    0: query,
    1: setQuery
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(router.query.query || '');
  const {
    0: results,
    1: setResults
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const {
    0: activeHit,
    1: setActiveHit
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    t
  } = (0,components_hooks_useTranslation__WEBPACK_IMPORTED_MODULE_4__/* .useTranslation */ .$)('search');
  const {
    currentVersion
  } = (0,components_hooks_useVersion__WEBPACK_IMPORTED_MODULE_7__/* .useVersion */ .a)(); // Figure out language and version for index

  const {
    languages,
    searchVersions,
    nonEnterpriseDefaultVersion
  } = (0,_context_MainContext__WEBPACK_IMPORTED_MODULE_6__/* .useMainContext */ .Hv)(); // fall back to the non-enterprise default version (FPT currently) on the homepage, 404 page, etc.

  const version = searchVersions[currentVersion] || searchVersions[nonEnterpriseDefaultVersion];
  const language = Object.keys(languages).includes(router.locale || '') && router.locale || 'en'; // If the user shows up with a query in the URL, go ahead and search for it

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (router.query.query) {
      /* await */
      fetchSearchResults(router.query.query.trim());
    }
  }, []); // Search with your keyboard

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    document.addEventListener('keydown', searchWithYourKeyboard);
    return () => document.removeEventListener('keydown', searchWithYourKeyboard);
  }, [results, activeHit]);

  function searchWithYourKeyboard(event) {
    var _document, _document$activeEleme, _inputRef$current, _results;

    switch (event.key) {
      case '/':
        // when an input is focused, `/` should have no special behavior
        if (['INPUT', 'TEXTAREA', 'SEARCH'].includes(((_document = document) === null || _document === void 0 ? void 0 : (_document$activeEleme = _document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.tagName) || '')) break;
        event.preventDefault(); // prevent slash from being typed into input

        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
        break;

      case 'Escape':
        closeSearch();
        break;

      case 'ArrowDown':
        if (!results.length) break;
        event.preventDefault(); // prevent window scrolling

        if (activeHit >= results.length) break;
        setActiveHit(activeHit + 1);
        break;

      case 'ArrowUp':
        if (!results.length) break;
        event.preventDefault(); // prevent window scrolling

        if (activeHit === 0) break;
        setActiveHit(activeHit - 1);
        break;

      case 'Enter':
        // look for a link in the given hit, then visit it
        if (activeHit === 0 || !results.length) break;
        window.location.href = (_results = results[activeHit - 1]) === null || _results === void 0 ? void 0 : _results.url;
        break;
    }
  } // When the user finishes typing, update the results


  async function onSearch(e) {
    var _e$target, _e$target$value;

    const xquery = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : (_e$target$value = _e$target.value) === null || _e$target$value === void 0 ? void 0 : _e$target$value.trim();
    setQuery(xquery); // Update the URL with the search parameters in the query string

    if (updateSearchParams) {
      const pushUrl = new URL(location.toString());
      pushUrl.searchParams.set('query', xquery);
      history.pushState({}, '', pushUrl.toString());
    } // deactivate any active hit when typing in search box


    setActiveHit(0);
    return await fetchSearchResults(xquery);
  } // If there's a query, call the endpoint
  // Otherwise, there's no results by default


  async function fetchSearchResults(xquery) {
    if (xquery) {
      const endpointUrl = new URL(location.origin);
      endpointUrl.pathname = '/search';
      const endpointParams = {
        language,
        version,
        query: xquery
      };
      endpointUrl.search = new URLSearchParams(endpointParams).toString();
      const response = await fetch(endpointUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResults(response.ok ? await response.json() : []);
    } else {
      setResults([]);
    } // Analytics tracking


    if (xquery) {
      (0,_javascripts_events__WEBPACK_IMPORTED_MODULE_5__/* .sendEvent */ .qP)({
        type: _javascripts_events__WEBPACK_IMPORTED_MODULE_5__/* .EventType.search */ .tw.search,
        search_query: xquery // search_context

      });
    }
  } // Close panel if overlay is clicked


  function closeSearch() {
    setQuery('');
    setResults([]);
  } // Prevent the page from refreshing when you "submit" the form


  function preventRefresh(evt) {
    evt.preventDefault();
  }

  const SearchResults = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
      id: "search-results-container",
      className: results.length ? 'js-open' : '',
      children: Boolean(results.length) && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "ais-Hits d-block",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ol", {
          className: "ais-Hits-list",
          children: results.map(({
            url,
            breadcrumbs,
            heading,
            title,
            content
          }, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
            className: 'ais-Hits-item' + (index + 1 === activeHit ? ' active' : ''),
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
              className: "search-result border-top color-border-secondary py-3 px-2",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                className: "no-underline",
                href: url,
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                  className: "search-result-breadcrumbs d-block color-text-primary opacity-60 text-small pb-1",
                  dangerouslySetInnerHTML: {
                    __html: breadcrumbs
                  }
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                  className: "search-result-title d-block h4-mktg color-text-primary",
                  dangerouslySetInnerHTML: {
                    __html: heading ? `${title}: ${heading}` : title
                  }
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                  className: "search-result-content d-block color-text-secondary",
                  dangerouslySetInnerHTML: {
                    __html: content
                  }
                })]
              })
            })
          }, url))
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_8___default()('search-overlay-desktop', !isStandalone && query ? 'js-open' : ''),
      onClick: closeSearch
    })]
  });

  const SearchInput = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    id: "search-input-container",
    "aria-hidden": "true",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
      className: "ais-SearchBox",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        role: "search",
        className: "ais-SearchBox-form",
        noValidate: true,
        onSubmit: preventRefresh,
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
          "data-testid": "site-search-input",
          ref: inputRef,
          className: classnames__WEBPACK_IMPORTED_MODULE_8___default()('ais-SearchBox-input', isStandalone || query ? 'js-open' : ''),
          type: "search",
          placeholder: t`placeholder`
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          ,
          autoFocus: isStandalone,
          autoComplete: "off",
          autoCorrect: "off",
          autoCapitalize: "off",
          spellCheck: "false",
          maxLength: 512,
          onChange: lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(onSearch, 200),
          defaultValue: query
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
          className: "ais-SearchBox-submit",
          type: "submit",
          title: "Submit the search query.",
          hidden: true
        })]
      })
    })
  });

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: typeof children === 'function' ? children({
      SearchInput,
      SearchResults
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [SearchInput, SearchResults]
    })
  });
}

/***/ }),

/***/ 1013:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tO": function() { return /* binding */ getMainContextFromRequest; },
/* harmony export */   "Tr": function() { return /* binding */ MainContext; },
/* harmony export */   "Hv": function() { return /* binding */ useMainContext; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9116);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_1__);


const getMainContextFromRequest = req => {
  var _req$context$page, _req$context$page2, _req$context$page3, _req$context$page4;

  return {
    breadcrumbs: req.context.breadcrumbs || {},
    activeProducts: req.context.activeProducts,
    currentProduct: req.context.productMap[req.context.currentProduct] || null,
    currentLayoutName: req.context.currentLayoutName,
    isHomepageVersion: ((_req$context$page = req.context.page) === null || _req$context$page === void 0 ? void 0 : _req$context$page.documentType) === 'homepage',
    isFPT: req.context.currentVersion === 'free-pro-team@latest',
    error: req.context.error ? req.context.error.toString() : '',
    data: {
      ui: req.context.site.data.ui,
      reusables: {
        enterprise_deprecation: req.context.site.data.reusables.enterprise_deprecation,
        policies: req.context.site.data.reusables.policies
      },
      variables: {
        release_candidate: req.context.site.data.variables.release_candidate
      }
    },
    airGap: req.context.AIRGAP || false,
    currentCategory: req.context.currentCategory || '',
    currentPathWithoutLanguage: req.context.currentPathWithoutLanguage,
    relativePath: (_req$context$page2 = req.context.page) === null || _req$context$page2 === void 0 ? void 0 : _req$context$page2.relativePath,
    page: {
      languageVariants: req.context.page.languageVariants,
      documentType: req.context.page.documentType,
      title: req.context.page.title,
      fullTitle: req.context.page.fullTitle,
      topics: req.context.page.topics || [],
      introPlainText: (_req$context$page3 = req.context.page) === null || _req$context$page3 === void 0 ? void 0 : _req$context$page3.introPlainText,
      permalinks: (_req$context$page4 = req.context.page) === null || _req$context$page4 === void 0 ? void 0 : _req$context$page4.permalinks.map(obj => lodash_pick__WEBPACK_IMPORTED_MODULE_1___default()(obj, ['title', 'pageVersionTitle', 'pageVersion', 'href', 'relativePath', 'languageCode'])),
      hidden: req.context.page.hidden || false
    },
    enterpriseServerReleases: lodash_pick__WEBPACK_IMPORTED_MODULE_1___default()(req.context.enterpriseServerReleases, ['isOldestReleaseDeprecated', 'oldestSupported', 'nextDeprecationDate', 'supported']),
    enterpriseServerVersions: req.context.enterpriseServerVersions,
    currentLanguage: req.context.currentLanguage,
    userLanguage: req.context.userLanguage || '',
    languages: Object.fromEntries(Object.entries(req.context.languages).map(([key, entry]) => {
      return [key, {
        name: entry.name,
        nativeName: entry.nativeName || '',
        code: entry.code,
        hreflang: entry.hreflang,
        wip: entry.wip || false
      }];
    })),
    allVersions: req.context.allVersions,
    currentProductTree: req.context.currentProductTree ? getCurrentProductTree(req.context.currentProductTree) : null,
    featureFlags: {},
    searchVersions: req.context.searchVersions,
    nonEnterpriseDefaultVersion: req.context.nonEnterpriseDefaultVersion
  };
}; // only pull things we need from the product tree, and make sure there are default values instead of `undefined`

const getCurrentProductTree = input => {
  return {
    href: input.href,
    renderedShortTitle: input.renderedShortTitle || '',
    renderedFullTitle: input.renderedFullTitle || '',
    page: {
      hidden: input.page.hidden || false,
      documentType: input.page.documentType,
      title: input.page.title,
      shortTitle: input.page.shortTitle || ''
    },
    childPages: (input.childPages || []).map(getCurrentProductTree)
  };
};

const MainContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const useMainContext = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MainContext);

  if (!context) {
    throw new Error('"useMainContext" may only be used inside "MainContext.Provider"');
  }

  return context;
};

/***/ }),

/***/ 4433:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": function() { return /* binding */ useTranslation; }
/* harmony export */ });
/* harmony import */ var components_context_MainContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1013);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2566);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);

 // The idea of this component is to mimic a popular i18n library (i18next)
// so that we can set ourselves up to transition to it (or a similar library) in the future

const useTranslation = namespaces => {
  const {
    data
  } = (0,components_context_MainContext__WEBPACK_IMPORTED_MODULE_0__/* .useMainContext */ .Hv)(); // this can eventually be an object constructed from the input namespaces param above, but for now everything is already loaded

  const loadedData = data.ui;
  return {
    // The compiled string supports prefixing with a namespace such as `my-namespace:path.to.value`
    t: (strings, ...values) => {
      const key = typeof strings === 'string' ? strings : String.raw(strings, ...values);
      const splitKey = key.split(':');

      if (splitKey.length > 2) {
        throw new Error('Multiple ":" not allowed in translation lookup path');
      }

      if (splitKey.length === 2) {
        const [namespace, path] = splitKey;
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(loadedData[namespace], path);
      }

      const [path] = splitKey;

      if (Array.isArray(namespaces)) {
        for (const namespace of namespaces) {
          const val = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(loadedData[namespace], path);

          if (val !== undefined) {
            return val;
          }
        }

        return undefined;
      } else {
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(loadedData[namespaces], path);
      }
    }
  };
};

/***/ })

};
;
(function() {
var exports = {};
exports.id = 488;
exports.ids = [488,405];
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

/***/ 6912:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ReleaseNotes; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: external "liquidjs"
var external_liquidjs_namespaceObject = require("liquidjs");;
// EXTERNAL MODULE: ./components/context/MainContext.tsx
var MainContext = __webpack_require__(1013);
// EXTERNAL MODULE: ./components/DefaultLayout.tsx + 14 modules
var DefaultLayout = __webpack_require__(8977);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(4058);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "@primer/octicons-react"
var octicons_react_ = __webpack_require__(3887);
// EXTERNAL MODULE: ./components/hooks/useTranslation.tsx
var useTranslation = __webpack_require__(4433);
;// CONCATENATED MODULE: ./components/hooks/useOnScreen.tsx

function useOnScreen(ref, rootMargin = '0px') {
  const {
    0: isIntersecting,
    1: setIntersecting
  } = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, {
      rootMargin
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, []);
  return isIntersecting;
}
;// CONCATENATED MODULE: external "github-slugger"
var external_github_slugger_namespaceObject = require("github-slugger");;
var external_github_slugger_default = /*#__PURE__*/__webpack_require__.n(external_github_slugger_namespaceObject);
// EXTERNAL MODULE: ./components/Link.tsx
var Link = __webpack_require__(6359);
;// CONCATENATED MODULE: ./components/release-notes/PatchNotes.tsx






const SectionToLabelMap = {
  features: 'Features',
  bugs: 'Bug fixes',
  known_issues: 'Known issues',
  security_fixes: 'Security fixes',
  changes: 'Changes',
  deprecations: 'Deprecations',
  backups: 'Backups'
};
function PatchNotes({
  patch,
  withReleaseNoteLabel
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: Object.entries(patch.sections).map(([key, sectionItems], i, arr) => {
      const isLast = i === arr.length - 1;
      return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: external_classnames_default()(`release-notes-section-${key}`, 'py-6 d-block d-xl-flex gutter-xl flex-items-baseline', !withReleaseNoteLabel && 'mx-6', !isLast && 'border-bottom'),
        children: [withReleaseNoteLabel && /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "col-12 col-xl-3 mb-5",
          children: /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "px-3 py-2 text-small text-bold text-uppercase text-mono color-text-inverse release-notes-section-label",
            children: SectionToLabelMap[key] || 'INVALID SECTION'
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
          className: external_classnames_default()(withReleaseNoteLabel && 'col-xl-9', 'col-12 release-notes-list'),
          children: sectionItems.map(item => {
            if (typeof item === 'string') {
              return /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "release-notes-list-item",
                children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                  dangerouslySetInnerHTML: {
                    __html: item
                  }
                })
              }, item);
            }

            const slug = item.heading ? external_github_slugger_default().slug(item.heading) : '';
            return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
              className: "release-notes-list-item list-style-none",
              children: [/*#__PURE__*/jsx_runtime_.jsx("h4", {
                id: slug,
                className: "release-notes-section-heading text-uppercase text-bold",
                children: /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
                  href: `#${slug}`,
                  className: "text-inherit",
                  children: item.heading
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
                className: "pl-0 pb-4 mt-2 release-notes-list",
                children: item.notes.map(note => {
                  return /*#__PURE__*/jsx_runtime_.jsx("li", {
                    className: "release-notes-list-item",
                    dangerouslySetInnerHTML: {
                      __html: note
                    }
                  }, note);
                })
              })]
            }, slug);
          })
        })]
      }, key);
    })
  });
}
;// CONCATENATED MODULE: ./components/release-notes/GHAEReleaseNotePatch.tsx






function GHAEReleaseNotePatch({
  patch,
  didEnterView
}) {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('release_notes');
  const containerRef = (0,external_react_.useRef)(null);
  const onScreen = useOnScreen(containerRef, '-40% 0px -50%');
  (0,external_react_.useEffect)(() => {
    if (onScreen) {
      didEnterView();
    }
  }, [onScreen]);
  const bannerText = patch.currentWeek ? t('banner_text_current') : `${t('banner_text_past')} ${patch.friendlyDate}.`;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    ref: containerRef,
    className: "mb-10 color-bg-secondary pb-6 border-bottom border-top",
    id: patch.date,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
      style: {
        zIndex: 1
      },
      className: "container-xl position-sticky top-0 color-bg-secondary border-bottom px-3 pt-4 pb-2",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex flex-items-center",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
          className: "border-bottom-0 m-0 p-0",
          children: patch.title
        }), patch.release_candidate && /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "IssueLabel color-bg-warning-inverse color-text-inverse ml-3",
          style: {
            whiteSpace: 'pre'
          },
          children: "Release Candidate"
        }), /*#__PURE__*/jsx_runtime_.jsx("button", {
          className: "js-print btn-link ml-3 text-small text-bold",
          children: "Print"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "color-text-secondary mt-1",
        children: [patch.friendlyDate, " - ", bannerText]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "container-xl px-3",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "mt-3",
        dangerouslySetInnerHTML: {
          __html: patch.intro
        }
      }), /*#__PURE__*/jsx_runtime_.jsx(PatchNotes, {
        patch: patch
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/release-notes/GHAEReleaseNotes.tsx






function GHAEReleaseNotes({
  context
}) {
  const {
    releaseNotes,
    releases,
    currentVersion
  } = context;
  const {
    0: focusedPatch,
    1: setFocusedPatch
  } = (0,external_react_.useState)('');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "d-flex",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("article", {
      className: "min-width-0 flex-1",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex flex-items-center flex-justify-between color-bg-primary px-5 py-2",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h1", {
          className: "f4 py-3 m-0",
          children: [currentVersion.planTitle, " release notes"]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {})]
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "markdown-body",
        children: releaseNotes.map(patch => {
          return /*#__PURE__*/jsx_runtime_.jsx(GHAEReleaseNotePatch, {
            patch: patch,
            didEnterView: () => setFocusedPatch(patch.version)
          }, patch.version);
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("aside", {
      className: "markdown-body position-sticky top-0 d-none d-md-block border-left no-print color-bg-primary flex-shrink-0",
      style: {
        width: 260,
        height: '100vh'
      },
      children: /*#__PURE__*/jsx_runtime_.jsx("nav", {
        className: "height-full overflow-auto",
        children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
          className: "list-style-none pl-0 text-bold",
          children: releases.map(release => {
            return /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "border-bottom",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("details", {
                className: "my-0 details-reset release-notes-version-picker",
                "aria-current": "page",
                open: true,
                children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("summary", {
                  className: "px-3 py-4 my-0 d-flex flex-items-center flex-justify-between",
                  children: [release.version, /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "d-flex",
                    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
                      className: "color-text-tertiary text-mono text-small text-normal mr-1",
                      children: [release.patches.length, " releases"]
                    }), /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronDownIcon, {})]
                  })]
                }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
                  className: "color-bg-tertiary border-top list-style-none py-4 px-0 my-0",
                  children: release.patches.map(patch => {
                    const isActive = patch.version === focusedPatch;
                    return /*#__PURE__*/jsx_runtime_.jsx("li", {
                      className: external_classnames_default()('js-release-notes-patch-link px-3 my-0 py-1', isActive && 'selected'),
                      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                        href: `#${patch.date}`,
                        className: "d-flex flex-items-center flex-justify-between",
                        children: patch.friendlyDate
                      })
                    }, patch.version);
                  })
                })]
              })
            }, release.version);
          })
        })
      })
    })]
  });
}
// EXTERNAL MODULE: external "dayjs"
var external_dayjs_ = __webpack_require__(8349);
var external_dayjs_default = /*#__PURE__*/__webpack_require__.n(external_dayjs_);
// EXTERNAL MODULE: ./components/PrintAction.tsx
var PrintAction = __webpack_require__(3718);
;// CONCATENATED MODULE: ./components/release-notes/GHESReleaseNotePatch.tsx









function GHESReleaseNotePatch({
  patch,
  currentVersion,
  latestPatch,
  latestRelease,
  message,
  didEnterView
}) {
  const {
    t
  } = (0,useTranslation/* useTranslation */.$)('header');
  const containerRef = (0,external_react_.useRef)(null);
  const onScreen = useOnScreen(containerRef, '-40% 0px -50%');
  (0,external_react_.useEffect)(() => {
    if (onScreen) {
      didEnterView();
    }
  }, [onScreen]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    ref: containerRef,
    className: "mb-10 color-bg-secondary pb-6 border-bottom border-top",
    id: patch.version,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
      style: {
        zIndex: 1
      },
      className: "container-xl position-sticky top-0 color-bg-secondary border-bottom px-3 pt-4 pb-2",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex flex-items-center",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h2", {
          className: "border-bottom-0 m-0 p-0",
          children: [currentVersion.versionTitle, ".", patch.patchVersion]
        }), patch.release_candidate && /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "IssueLabel color-bg-warning-inverse color-text-inverse ml-3",
          style: {
            whiteSpace: 'pre'
          },
          children: "Release Candidate"
        }), currentVersion.plan === 'enterprise-server' && /*#__PURE__*/jsx_runtime_.jsx(Link/* Link */.r, {
          href: `https://enterprise.github.com/releases/${patch.downloadVersion}/download`,
          className: "ml-3 text-small text-bold",
          children: "Download"
        }), /*#__PURE__*/jsx_runtime_.jsx(PrintAction/* PrintAction */.P, {
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn-link ml-3 text-small text-bold",
            children: "Print"
          })
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "color-text-secondary mt-1",
        children: external_dayjs_default()(patch.date).format('MMMM, DD, YYYY')
      }), patch.version !== latestPatch && currentVersion.currentRelease === latestRelease && /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "color-text-secondary mt-1",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          dangerouslySetInnerHTML: {
            __html: message.ghes_release_notes_upgrade_patch_only
          }
        }), ' ', t('notices.release_notes_use_latest')]
      }), patch.version === latestPatch && currentVersion.currentRelease !== latestRelease && /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "color-text-secondary mt-1",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          dangerouslySetInnerHTML: {
            __html: message.ghes_release_notes_upgrade_release_only
          }
        }), ' ', t('notices.release_notes_use_latest')]
      }), patch.version !== latestPatch && currentVersion.currentRelease !== latestRelease && /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "color-text-secondary mt-1",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          dangerouslySetInnerHTML: {
            __html: message.ghes_release_notes_upgrade_patch_and_release
          }
        }), ' ', t('notices.release_notes_use_latest')]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "container-xl px-3",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "mt-3",
        dangerouslySetInnerHTML: {
          __html: patch.intro
        }
      }), /*#__PURE__*/jsx_runtime_.jsx(PatchNotes, {
        patch: patch,
        withReleaseNoteLabel: true
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/release-notes/GHESReleaseNotes.tsx









function GHESReleaseNotes({
  context
}) {
  const {
    currentLanguage,
    currentProduct
  } = (0,MainContext/* useMainContext */.Hv)();
  const {
    0: focusedPatch,
    1: setFocusedPatch
  } = (0,external_react_.useState)('');
  const {
    prevRelease,
    nextRelease,
    latestPatch,
    latestRelease,
    currentVersion,
    releaseNotes,
    releases,
    message
  } = context;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "d-flex",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("article", {
      className: "min-width-0 flex-1",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex flex-items-center flex-justify-between color-bg-primary text-bold px-5 py-2",
        children: [prevRelease ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
          className: "btn btn-outline",
          href: `/${currentLanguage}/${currentVersion.plan}@${prevRelease}/${currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.id}/release-notes`,
          children: [/*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronLeftIcon, {}), " ", prevRelease]
        }) : /*#__PURE__*/jsx_runtime_.jsx("div", {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h1", {
          className: "f4 py-3 m-0",
          children: [currentVersion.planTitle, " ", currentVersion.currentRelease, " release notes"]
        }), nextRelease ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
          className: "btn btn-outline",
          href: `/${currentLanguage}/${currentVersion.plan}@${nextRelease}/${currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.id}/release-notes`,
          children: [nextRelease, " ", /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronRightIcon, {})]
        }) : /*#__PURE__*/jsx_runtime_.jsx("div", {})]
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "markdown-body",
        children: releaseNotes.map(patch => {
          return /*#__PURE__*/jsx_runtime_.jsx(GHESReleaseNotePatch, {
            patch: patch,
            currentVersion: currentVersion,
            latestPatch: latestPatch,
            latestRelease: latestRelease,
            message: message,
            didEnterView: () => {
              setFocusedPatch(patch.version);
            }
          }, patch.version);
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("aside", {
      className: "markdown-body position-sticky top-0 d-none d-md-block border-left no-print color-bg-primary flex-shrink-0",
      style: {
        width: 260,
        height: '100vh'
      },
      children: /*#__PURE__*/jsx_runtime_.jsx("nav", {
        className: "height-full overflow-auto",
        children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
          className: "list-style-none pl-0 text-bold",
          children: releases.map(release => {
            const releaseLink = `/${currentLanguage}/${currentVersion.plan}@${release.version}/${currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.id}/release-notes`;

            if (!release.patches || release.patches.length === 0) {
              return /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "border-bottom",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
                  href: releaseLink,
                  className: "Link--primary no-underline px-3 py-4 my-0 d-flex flex-items-center flex-justify-between",
                  children: [release.version, /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.LinkExternalIcon, {})]
                })
              }, release.version);
            }

            if (release.version === currentVersion.currentRelease) {
              return /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "border-bottom",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("details", {
                  className: "my-0 details-reset release-notes-version-picker",
                  "aria-current": "page",
                  open: true,
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("summary", {
                    className: "px-3 py-4 my-0 d-flex flex-items-center flex-justify-between",
                    children: [release.version, /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "d-flex",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
                        className: "color-text-tertiary text-mono text-small text-normal mr-1",
                        children: [release.patches.length, " releases"]
                      }), /*#__PURE__*/jsx_runtime_.jsx(octicons_react_.ChevronDownIcon, {})]
                    })]
                  }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
                    className: "color-bg-tertiary border-top list-style-none py-4 px-0 my-0",
                    children: release.patches.map(patch => {
                      const isActive = patch.version === focusedPatch;
                      return /*#__PURE__*/jsx_runtime_.jsx("li", {
                        className: external_classnames_default()('js-release-notes-patch-link px-3 my-0 py-1', isActive && 'selected'),
                        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
                          href: `${releaseLink}#${patch.version}`,
                          className: "d-flex flex-items-center flex-justify-between",
                          children: [patch.version, /*#__PURE__*/jsx_runtime_.jsx("span", {
                            className: "color-text-tertiary text-mono text-small text-normal",
                            children: external_dayjs_default()(patch.date).format('MMMM DD, YYYY')
                          })]
                        })
                      }, patch.version);
                    })
                  })]
                })
              }, release.version);
            }

            return /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "border-bottom",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Link/* Link */.r, {
                className: "px-3 py-4 my-0 d-flex flex-items-center flex-justify-between",
                href: releaseLink,
                children: [release.version, /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
                  className: "color-text-tertiary text-mono text-small text-normal mr-1",
                  children: [release.patches.length, " releases"]
                })]
              })
            }, release.version);
          })
        })
      })
    })]
  });
}
;// CONCATENATED MODULE: ./pages/[versionId]/admin/release-notes.tsx







const liquid = new external_liquidjs_namespaceObject.Liquid();
function ReleaseNotes({
  mainContext,
  ghesContext,
  ghaeContext,
  currentVersion
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(MainContext/* MainContext.Provider */.Tr.Provider, {
    value: mainContext,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(DefaultLayout/* DefaultLayout */.H, {
      children: [currentVersion.plan === 'enterprise-server' && /*#__PURE__*/jsx_runtime_.jsx(GHESReleaseNotes, {
        context: ghesContext
      }), currentVersion.plan === 'github-ae' && /*#__PURE__*/jsx_runtime_.jsx(GHAEReleaseNotes, {
        context: ghaeContext
      })]
    })
  });
}
const getServerSideProps = async context => {
  const req = context.req;
  const currentVersion = req.context.allVersions[req.context.currentVersion];
  const {
    latestPatch = '',
    latestRelease = ''
  } = req.context;
  return {
    props: {
      mainContext: (0,MainContext/* getMainContextFromRequest */.tO)(req),
      currentVersion,
      ghesContext: {
        currentVersion,
        latestPatch,
        latestRelease,
        prevRelease: req.context.prevRelease || '',
        nextRelease: req.context.nextRelease || '',
        releaseNotes: req.context.releaseNotes,
        releases: req.context.releases,
        message: {
          ghes_release_notes_upgrade_patch_only: liquid.parseAndRenderSync(req.context.site.data.ui.header.notices.ghes_release_notes_upgrade_patch_only, {
            latestPatch,
            latestRelease
          }),
          ghes_release_notes_upgrade_release_only: liquid.parseAndRenderSync(req.context.site.data.ui.header.notices.ghes_release_notes_upgrade_release_only, {
            latestPatch,
            latestRelease
          }),
          ghes_release_notes_upgrade_patch_and_release: liquid.parseAndRenderSync(req.context.site.data.ui.header.notices.ghes_release_notes_upgrade_patch_and_release, {
            latestPatch,
            latestRelease
          })
        }
      },
      ghaeContext: {
        currentVersion,
        releaseNotes: req.context.releaseNotes,
        releases: req.context.releases
      }
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

/***/ 8349:
/***/ (function(module) {

"use strict";
module.exports = require("dayjs");;

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,143,368,977], function() { return __webpack_exec__(6912); });
module.exports = __webpack_exports__;

})();
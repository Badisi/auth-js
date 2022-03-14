(self["webpackChunk"] = self["webpackChunk"] || []).push([["main"],{

/***/ 8824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthManager": () => (/* binding */ AuthManager)
/* harmony export */ });
class AuthManager {
  isCapacitor() {
    const capacitor = window.Capacitor;
    return !!(capacitor != null && capacitor.isNativePlatform());
  }

  isCordova() {
    return !!(window.cordova || window.phonegap || window.PhoneGap);
  }

  isNative() {
    return this.isCapacitor() || this.isCordova();
  }

}

/***/ }),

/***/ 3698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthSubscriptions": () => (/* binding */ AuthSubscriptions)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8868);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4861);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @internal
 */
class AuthSubscriptions {
  constructor() {
    this.subscribers = [];
    this.lastNotified = void 0;
  }

  add(subscriber) {
    this.subscribers.push(subscriber);

    if (this.lastNotified) {
      void subscriber(...this.lastNotified);
    }

    return {
      unsubscribe: () => this.unsubscribe(subscriber)
    };
  }

  notify(...args) {
    this.lastNotified = args;
    this.subscribers.forEach(subscriber => void subscriber(...args));
  }

  unsubscribe(subscriber) {
    if (subscriber) {
      const index = this.subscribers.indexOf(subscriber);

      if (index !== -1) {
        this.subscribers.splice(index, 1);
      }
    } else {
      this.subscribers = [];
    }
  }

}

/***/ }),

/***/ 9416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAuthManager": () => (/* binding */ createAuthManager)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__);

const createAuthManager = async (settings, impl) => {
  const manager = new impl();
  await manager.init(settings);
  return manager;
};

/***/ }),

/***/ 4387:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initOidc": () => (/* binding */ initOidc)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3045);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9416);
/* harmony import */ var _oidc_auth_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(291);



const initOidc = async settings => await (0,_core_main__WEBPACK_IMPORTED_MODULE_1__.createAuthManager)(settings, _oidc_auth_manager__WEBPACK_IMPORTED_MODULE_2__.OIDCAuthManager);

/***/ }),

/***/ 3343:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MobileStorage": () => (/* binding */ MobileStorage)
/* harmony export */ });
// import { Log } from 'oidc-client-ts';
// TODO: fallback to localStorage if plugin does not exists
class MobileStorage {
  get length() {
    return 0;
  }

  clear() {
    throw new Error('Method not implemented.');
  }

  getItem(_key) {
    throw new Error('Method not implemented.');
  }

  key(_index) {
    throw new Error('Method not implemented.');
  }

  removeItem(_key) {
    throw new Error('Method not implemented.');
  }

  setItem(_key, _value) {
    throw new Error('Method not implemented.');
  }
  /* private _secureStorage: any;
   set(key: string, value: string): Promise<void> {
      Log.logger.debug('CordovaPluginSecureStorageEcho.setItem', key);
      return new Promise(async (resolve) => {
          const store = await this.getStore();
          store.set(
              () => resolve(),
              (error: any) => {
                  Log.logger.error(error);
                  resolve();
              },
              key,
              value
          );
      });
  }
   get(key: string): Promise<string | null> {
      Log.logger.debug('CordovaPluginSecureStorageEcho.getItem', key);
      return new Promise(async (resolve) => {
          const store = await this.getStore();
          store.get(
              (value: any) => resolve(value),
              (error: any) => {
                  Log.logger.error(error);
                  resolve(null);
              },
              key
          );
      });
  }
   remove(key: string): Promise<string | null> {
      Log.logger.debug('CordovaPluginSecureStorageEcho.removeItem', key);
      return new Promise(async (resolve) => {
          const store = await this.getStore();
          store.remove(
              () => resolve(null),
              (error: any) => {
                  Log.logger.error(error);
                  resolve(null);
              },
              key
          );
      });
  }
   getAllKeys(): Promise<string[]> {
      Log.logger.debug('CordovaPluginSecureStorageEcho.getAllKeys');
      return new Promise(async (resolve) => {
          const store = await this.getStore();
          store.keys(
              (keys: string[]) => resolve(keys),
              (error: any) => {
                  Log.logger.error(error);
                  resolve([]);
              },
          );
      });
  }
   // --- HELPER(s) ---
   private getStore(): Promise<any> {
      return new Promise((resolve, reject) => {
          if (!this._secureStorage) {
              const cordova = (window as any).cordova;
              if (cordova && cordova.plugins.SecureStorage) {
                  const storage = new cordova.plugins.SecureStorage(
                      () => {
                          this._secureStorage = storage;
                          resolve(this._secureStorage);
                      },
                      (error: any) => reject(error),
                      'NGX_AUTH'
                  );
              } else {
                  reject('CordovaPluginSecureStorageEcho: cordova.plugins.SecureStorage is undefined');
              }
          } else {
              resolve(this._secureStorage);
          }
      });
  }*/


}

/***/ }),

/***/ 1846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Navigation": () => (/* binding */ Navigation)
/* harmony export */ });
let Navigation; // TODO: check if `monitorSession` and `revokeAccessTokenOnSignout` might be useful too ?

(function (Navigation) {
  Navigation["REDIRECT"] = "REDIRECT";
  Navigation["POPUP"] = "POPUP";
})(Navigation || (Navigation = {}));

/***/ }),

/***/ 9853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSession": () => (/* binding */ UserSession)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8868);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4861);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);



/* eslint-disable @typescript-eslint/naming-convention, camelcase */
class UserSession {
  constructor() {
    this.expired = void 0;
    this.expires_in = void 0;
    this.expires_at = void 0;
  }

  static deserialize(data) {
    const ref = new UserSession();
    const keys = Object.keys(ref); // eslint-disable-next-line no-loops/no-loops

    for (const key of keys) {
      ref[key] = data[key];
    }

    return ref;
  }

}

/***/ }),

/***/ 291:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OIDCAuthManager": () => (/* binding */ OIDCAuthManager)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8868);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4861);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3045);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6609);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2295);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5761);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5654);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3616);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2307);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5263);
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3382);
/* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7425);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(612);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(419);
/* harmony import */ var oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4209);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8824);
/* harmony import */ var _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(3698);
/* harmony import */ var _mobile_mobile_storage__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(3343);
/* harmony import */ var _models_oidc_auth_settings_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1846);
/* harmony import */ var _models_user_session_model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9853);













/* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/naming-convention, camelcase */








const REDIRECT_URL_KEY = 'auth-js:oidc_manager:redirect_url';
const DEFAULT_SETTINGS = {
  loginRequired: true,
  loadSession: true,
  loadUserInfo: false,
  automaticSilentRenew: true,
  navigationType: _models_oidc_auth_settings_model__WEBPACK_IMPORTED_MODULE_14__.Navigation.REDIRECT,
  scope: 'openid profile email phone',
  logLevel: oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.Log.NONE,
  internal: {
    response_type: 'code',
    redirectMethod: 'replace',
    redirect_uri: '?oidc-callback=login',
    post_logout_redirect_uri: '?oidc-callback=logout',
    popup_redirect_uri: 'oidc/callback/popup_redirect.html',
    popup_post_logout_redirect_uri: 'oidc/callback/popup_redirect.html',
    silent_redirect_uri: 'oidc/callback/silent_redirect.html'
  }
};
class OIDCAuthManager extends _core__WEBPACK_IMPORTED_MODULE_15__.AuthManager {
  constructor(...args) {
    super(...args);
    this.idTokenSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.accessTokenSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.userProfileSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.userSessionSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.authenticatedSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.renewingSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.redirectSubs = new _core_auth_subscriptions__WEBPACK_IMPORTED_MODULE_16__.AuthSubscriptions();
    this.userManagerSubs = [];
    this._idToken = void 0;
    this._accessToken = void 0;
    this._userProfile = void 0;
    this._userSession = void 0;
    this._isAuthenticated = void 0;
    this._isRenewing = false;
    this.userManager = void 0;
    this.settings = DEFAULT_SETTINGS;
    this._user = void 0;
  }

  set user(value) {
    if (this._user !== value) {
      this._user = value;
      this._idToken = value ? value.id_token : undefined;
      this._accessToken = value ? value.access_token : undefined;
      this._userProfile = value != null && value.profile ? value.profile : undefined;
      this._userSession = value ? _models_user_session_model__WEBPACK_IMPORTED_MODULE_17__.UserSession.deserialize(value) : undefined;
      this._isAuthenticated = !!(value && !value.expired);
      this.idTokenSubs.notify(this._idToken);
      this.accessTokenSubs.notify(this._accessToken);
      this.userProfileSubs.notify(this._userProfile);
      this.userSessionSubs.notify(this._userSession);
      this.authenticatedSubs.notify(this._isAuthenticated);
    }
  } // --- PUBLIC API(s) ---


  async init(userSettings) {
    var _DEFAULT_SETTINGS$int,
        _DEFAULT_SETTINGS$int2,
        _DEFAULT_SETTINGS$int3,
        _DEFAULT_SETTINGS$int4,
        _DEFAULT_SETTINGS$int5,
        _this$settings$intern,
        _this$settings$intern2,
        _this = this;

    oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.Log.setLevel(userSettings.logLevel || DEFAULT_SETTINGS.logLevel || oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.Log.NONE);
    oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.Log.setLogger(console);
    const isNative = this.isNative();
    const baseUrl = isNative ? `${userSettings.schemeUri}://` : this.getBaseUrl(); // Initialize settings

    this.settings = (0,lodash_es__WEBPACK_IMPORTED_MODULE_18__["default"])({}, DEFAULT_SETTINGS, {
      internal: {
        userStore: new oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.WebStorageStateStore({
          store: isNative ? new _mobile_mobile_storage__WEBPACK_IMPORTED_MODULE_19__.MobileStorage() : new oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.InMemoryWebStorage()
        }),
        redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int.redirect_uri}`,
        popup_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int2 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int2.popup_redirect_uri}`,
        post_logout_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int3 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int3.post_logout_redirect_uri}`,
        popup_post_logout_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int4 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int4.popup_post_logout_redirect_uri}`,
        silent_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int5 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int5.silent_redirect_uri}`
      }
    }, userSettings); // Apply some patches

    this.patchAuth0Logout(); // Configure the user manager

    this.userManager = new oidc_client_ts__WEBPACK_IMPORTED_MODULE_13__.UserManager(Object.assign({
      authority: this.settings.authorityUrl,
      client_id: this.settings.clientId,
      scope: this.settings.scope,
      loadUserInfo: this.settings.loadUserInfo,
      automaticSilentRenew: this.settings.automaticSilentRenew
    }, this.settings.internal)); // Listen for events

    this.userManagerSubs.push(this.userManager.events.addUserLoaded(user => {
      this.user = user;
    }), this.userManager.events.addUserUnloaded(() => {
      this.user = null;
    }), this.userManager.events.addAccessTokenExpired(() => {
      // Token can expire while the app is in background
      //   -> try a silent renew in that case and otherwise redirect to home
      if (this.settings.automaticSilentRenew) {
        this.signinSilent().catch(error => this.redirect('/', error));
      }
    })); // Make sure we are not trapped in the inception loop

    this.assertNotInInceptionLoop(); // Decide what to do..

    if (isNative) {
      this.installCustomUrlSchemeCallback();
      /* if (this.settings.autoLoginOnInit) {
          // Try to load user from storage
          await this.loadUser();
           // If user credentials have expired -> try a silent renew
          if (this.user) {
              return (!this.user.expired) ? this.userProfile : this.signinSilent();
          }
          return null;
      }*/
    } else if (this.urlMatching(location.href, (_this$settings$intern = this.settings.internal) == null ? void 0 : _this$settings$intern.redirect_uri)) {
      await this.backFromLogin();
    } else if (this.urlMatching(location.href, (_this$settings$intern2 = this.settings.internal) == null ? void 0 : _this$settings$intern2.post_logout_redirect_uri)) {
      await this.backFromLogout();
    } else if (this.settings.loadSession) {
      await this.signinSilent().catch(async function (signinSilentError) {
        if (_this.settings.loginRequired) {
          if (signinSilentError.message === 'login_required') {
            await _this.login();
          } else {
            throw signinSilentError;
          }
        }
      });
    } else if (this.settings.loginRequired) {
      await this.login();
    }
  }

  async login(redirectUrl = location.href, navigationType) {
    var _this$userManager, _this$userManager2;

    switch (navigationType || this.settings.navigationType) {
      case _models_oidc_auth_settings_model__WEBPACK_IMPORTED_MODULE_14__.Navigation.POPUP:
        await ((_this$userManager = this.userManager) == null ? void 0 : _this$userManager.signinPopup().catch(error => {
          var _error;

          if (((_error = error) == null ? void 0 : _error.message) === 'Attempted to navigate on a disposed window') {
            error = new Error('[OIDCAuthManager] Attempted to navigate on a disposed window.');
            error.stack = undefined;
            error.message += '\n\nⓘ This may be due to an ad blocker.';
          }

          throw error;
        }));
        await this.redirect(redirectUrl);
        break;

      default:
        sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
        await ((_this$userManager2 = this.userManager) == null ? void 0 : _this$userManager2.signinRedirect());
        break;
    }

    return this._isAuthenticated === true;
  }

  async logout(redirectUrl = location.href, navigationType) {
    var _this$userManager3, _this$userManager4;

    switch (navigationType || this.settings.navigationType) {
      case _models_oidc_auth_settings_model__WEBPACK_IMPORTED_MODULE_14__.Navigation.POPUP:
        await ((_this$userManager3 = this.userManager) == null ? void 0 : _this$userManager3.signoutPopup());
        await this.redirect(redirectUrl);
        break;

      default:
        sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
        await ((_this$userManager4 = this.userManager) == null ? void 0 : _this$userManager4.signoutRedirect());
        break;
    }
  }

  async renew() {
    return this.signinSilent().catch(error => console.error(error));
  }

  decodeJwt(value) {
    try {
      if (value) {
        return (0,jwt_decode__WEBPACK_IMPORTED_MODULE_12__["default"])(value);
      }

      return value;
    } catch (_unused) {
      console.warn('[OIDCAuthManager] Access token was not decoded as it is not a valid JWT.');
      return value;
    }
  }

  getSettings() {
    return this.settings;
  }

  isRenewing() {
    return this._isRenewing;
  }

  async isAuthenticated() {
    await this.waitForRenew('isAuthenticated()');
    return this._isAuthenticated;
  }

  async getUserProfile() {
    await this.waitForRenew('getUserProfile()');
    return this._userProfile;
  }

  async getUserSession() {
    await this.waitForRenew('getUserSession()');
    return this._userSession;
  }

  async getIdToken() {
    await this.waitForRenew('getIdToken()');
    return this._idToken;
  }

  async getIdTokenDecoded() {
    await this.waitForRenew('getIdTokenDecoded()');
    return this.decodeJwt(this._idToken);
  }

  async getAccessToken() {
    await this.waitForRenew('getAccessToken()');
    return this._accessToken;
  }

  async getAccessTokenDecoded() {
    await this.waitForRenew('getAccessTokenDecoded()');
    return this.decodeJwt(this._accessToken);
  } // --- DESTROY ---


  destroy() {
    this.idTokenSubs.unsubscribe();
    this.accessTokenSubs.unsubscribe();
    this.userProfileSubs.unsubscribe();
    this.userSessionSubs.unsubscribe();
    this.authenticatedSubs.unsubscribe();
    this.renewingSubs.unsubscribe();
    this.redirectSubs.unsubscribe();
    this.userManagerSubs.forEach(unsub => unsub());
  } // --- HANDLER(s) ---


  onIdTokenChanged(handler) {
    return this.idTokenSubs.add(handler);
  }

  onAccessTokenChanged(handler) {
    return this.accessTokenSubs.add(handler);
  }

  onUserProfileChanged(handler) {
    return this.userProfileSubs.add(handler);
  }

  onUserSessionChanged(handler) {
    return this.userSessionSubs.add(handler);
  }

  onAuthenticatedChanged(handler) {
    return this.authenticatedSubs.add(handler);
  }

  onRenewingChanged(handler) {
    return this.renewingSubs.add(handler);
  }

  onRedirect(handler) {
    return this.redirectSubs.add(handler);
  } // --- HELPER(s) ---

  /**
   *  Scenario :
   *  1) signinSilent or signinPopup was asked
   *  2) iframe or popup was created and navigation was made to OP
   *  3) redirection occurs in iframe or popup
   *  4) `silent_redirect_uri` or `popup_redirect_uri` is not found
   *  5) the angular app is loaded in the iframe or popup instead
   *  6) an inception loop occurs -> app in iframe in iframe in iframe or popup in popup in popup..
   */


  assertNotInInceptionLoop() {
    var _this$settings$intern3, _this$settings$intern4;

    [(_this$settings$intern3 = this.settings.internal) == null ? void 0 : _this$settings$intern3.silent_redirect_uri, (_this$settings$intern4 = this.settings.internal) == null ? void 0 : _this$settings$intern4.popup_redirect_uri].forEach(uri => {
      var _RegExp$exec;

      const htmlFileName = (_RegExp$exec = new RegExp(/^.*\/(.*).html$/gm).exec(uri || '')) == null ? void 0 : _RegExp$exec[1];
      const error = new Error(`[OIDCAuthManager] ${uri || 'redirect uri'} was not found.`);
      error.stack = undefined;

      if (this.urlMatching(location.href, uri)) {
        error.message += '\n\nⓘ This usually means you forgot to include the redirect html files in your application assets.';
        throw error;
      } else if (this.urlMatching(location.href, `/${htmlFileName}.html`)) {
        error.message += '\n\nⓘ This usually means your redirect urls are misconfigured.';
        throw error;
      }
    });
  }
  /**
   *  Scenario example :
   *  1) isNative = true + app is in background
   *  2) access token expires
   *  3) app is brought back to foreground
   *  4) addAccessTokenExpired event is called
   *  5) signinSilent is called
   *  6) in parallel user navigates somewhere and triggers isAuthenticated
   *  7) isAuthenticated should wait signinSilent to finish before returning
   */


  async waitForRenew(caller) {
    const startTime = new Date().getTime(); // eslint-disable-next-line no-loops/no-loops

    while (this._isRenewing) {
      if (new Date().getTime() > startTime + 5000) {
        console.warn('[OIDCAuthManager]', caller, 'timed out waiting for renew to finish.');
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  urlMatching(url1, url2) {
    return url2 !== undefined && url1.includes(url2);
  }

  getBaseUrl() {
    var _document$querySelect;

    const baseUrl = document.baseURI || ((_document$querySelect = document.querySelector('base')) == null ? void 0 : _document$querySelect.href) || location.origin;
    return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  }

  getURL(url) {
    try {
      return new URL(url);
    } catch (_unused2) {
      const pathUrl = !url.startsWith('/') ? url : url.substring(1, url.length);
      return new URL(`${this.getBaseUrl()}${pathUrl}`);
    }
  }

  async redirect(url, error) {
    if (error) {
      console.error(error);
      await this.removeUser();
    }

    const redirectUrl = this.getURL(url || '/'); // History cannot be rewritten when origin is different

    if (location.origin === redirectUrl.origin) {
      history.replaceState(history.state, '', redirectUrl.href);
      this.redirectSubs.notify(redirectUrl);
    } else {
      location.href = redirectUrl.href;
    }
  }

  async removeUser() {
    var _this$userManager5, _this$userManager6;

    this.user = null;
    await Promise.all([(_this$userManager5 = this.userManager) == null ? void 0 : _this$userManager5.clearStaleState(), (_this$userManager6 = this.userManager) == null ? void 0 : _this$userManager6.removeUser()]);
  }
  /* private async loadUser(): Promise<void> {
      this.user = await this.userManager?.getUser();
  }*/


  async signinSilent() {
    this._isRenewing = true;
    this.renewingSubs.notify(true);

    try {
      var _this$userManager7;

      await ((_this$userManager7 = this.userManager) == null ? void 0 : _this$userManager7.signinSilent());
    } catch (error) {
      await this.removeUser();
      throw error;
    } finally {
      this._isRenewing = false;
      this.renewingSubs.notify(false);
    }
  }

  async backFromLogin(url) {
    try {
      var _this$userManager8;

      await ((_this$userManager8 = this.userManager) == null ? void 0 : _this$userManager8.signinCallback(url));
      await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
    } catch (error) {
      await this.redirect('/', error);
    } finally {
      sessionStorage.removeItem(REDIRECT_URL_KEY);
    }
  }

  async backFromLogout(url) {
    try {
      var _this$userManager9;

      await ((_this$userManager9 = this.userManager) == null ? void 0 : _this$userManager9.signoutCallback(url));
      await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
      await this.removeUser();
    } catch (error) {
      await this.redirect('/', error);
    } finally {
      sessionStorage.removeItem(REDIRECT_URL_KEY);
    }
  }

  installCustomUrlSchemeCallback() {
    const onCallback = url => {
      var _this$settings$intern5, _this$settings$intern6;

      if (this.urlMatching(url, (_this$settings$intern5 = this.settings.internal) == null ? void 0 : _this$settings$intern5.redirect_uri)) {
        void this.backFromLogin(url);
      } else if (this.urlMatching(url, (_this$settings$intern6 = this.settings.internal) == null ? void 0 : _this$settings$intern6.post_logout_redirect_uri)) {
        void this.backFromLogout(url);
      }
    };

    if (this.isCapacitor()) {
      window.Capacitor.addListener('App', 'appUrlOpen', data => {
        onCallback(data.url);
      });
    } else if (this.isCordova()) {
      window.handleOpenURL = url => {
        onCallback(url);
      };
    }
  } // --- PATCHE(s) ---

  /**
   * Auth0 does not conform to OIDC's logout session and as such does not provide an `end_session_endpoint`.
   * This patch make sure the `end_session_endpoint` is set in that case.
   * @see https://github.com/damienbod/angular-auth-oidc-client/issues/1197
   * @see https://auth0.com/docs/api/authentication#logout
   */


  patchAuth0Logout() {
    if (this.settings.authorityUrl.endsWith('auth0.com')) {
      var _this$settings$intern7, _this$settings$intern8;

      const {
        authorityUrl,
        clientId,
        navigationType
      } = this.settings;
      const returnTo = navigationType === _models_oidc_auth_settings_model__WEBPACK_IMPORTED_MODULE_14__.Navigation.POPUP ? (_this$settings$intern7 = this.settings.internal) == null ? void 0 : _this$settings$intern7.popup_post_logout_redirect_uri : (_this$settings$intern8 = this.settings.internal) == null ? void 0 : _this$settings$intern8.post_logout_redirect_uri;
      this.settings.internal = (0,lodash_es__WEBPACK_IMPORTED_MODULE_18__["default"])({}, {
        metadataSeed: {
          end_session_endpoint: `${authorityUrl}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`
        }
      }, this.settings.internal);
    }
  }

}

/***/ }),

/***/ 9290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppElement": () => (/* binding */ AppElement)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2952);

const template = document.createElement('template');
template.innerHTML = `
    <demo-app-main>
        <demo-app-debug tabLabel="Debug"></demo-app-debug>
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
`;
class AppElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot;

    super();
    this.demoAppMainEl = void 0;
    this.demoAppDebugEl = void 0;
    this.authManagerSubs = [];
    this.listeners = [];
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(template.content, true));
  }

  connectedCallback() {
    var _this$shadowRoot2, _this$shadowRoot3, _this$shadowRoot4;

    this.demoAppMainEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('demo-app-main');
    this.demoAppDebugEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('demo-app-debug');
    const demoAppSettingsEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('demo-app-settings');
    demoAppSettingsEl.isDev = !_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production;
    this.listenForHeaderEvents();
    this.listenForAuthChanges();
  }

  disconnectedCallback() {
    this.authManagerSubs.forEach(sub => sub.unsubscribe());
    this.listeners.forEach(rm => rm());
  } // --- HELPER(s) ---


  refreshInfo(key, value) {
    if (window.authManager) {
      const manager = window.authManager;

      if (this.demoAppMainEl && this.demoAppDebugEl) {
        switch (key) {
          case 'authenticated':
            this.demoAppMainEl.isAuthenticated = value;
            this.demoAppDebugEl.isAuthenticated = value;
            break;

          case 'userSession':
            this.demoAppDebugEl.userSession = value;
            break;

          case 'accessToken':
            this.demoAppDebugEl.accessToken = value;
            this.demoAppDebugEl.accessTokenDecoded = manager.decodeJwt(value);
            break;

          case 'idToken':
            this.demoAppDebugEl.idToken = value;
            this.demoAppDebugEl.idTokenDecoded = manager.decodeJwt(value);
            break;

          case 'userProfile':
            this.demoAppDebugEl.userProfile = value;
            break;

          default:
            break;
        }
      }
    }
  }

  listenForAuthChanges() {
    const manager = window.authManager;

    if (manager) {
      this.authManagerSubs.push(manager.onAuthenticatedChanged(value => this.refreshInfo('authenticated', value)), manager.onUserSessionChanged(value => this.refreshInfo('userSession', value)), manager.onAccessTokenChanged(value => this.refreshInfo('accessToken', value)), manager.onIdTokenChanged(value => this.refreshInfo('idToken', value)), manager.onUserProfileChanged(value => this.refreshInfo('userProfile', value)));
    }
  }

  listenForHeaderEvents() {
    const manager = window.authManager;

    if (manager && this.demoAppMainEl) {
      const login = () => void manager.login();

      this.demoAppMainEl.addEventListener('login', login);

      const logout = () => void manager.logout('/');

      this.demoAppMainEl.addEventListener('logout', logout);

      const silentRenew = () => void manager.renew();

      this.demoAppMainEl.addEventListener('silentRenew', silentRenew);
      this.listeners.push(() => {
        var _this$demoAppMainEl;

        return (_this$demoAppMainEl = this.demoAppMainEl) == null ? void 0 : _this$demoAppMainEl.removeEventListener('login', login);
      }, () => {
        var _this$demoAppMainEl2;

        return (_this$demoAppMainEl2 = this.demoAppMainEl) == null ? void 0 : _this$demoAppMainEl2.removeEventListener('logout', logout);
      }, () => {
        var _this$demoAppMainEl3;

        return (_this$demoAppMainEl3 = this.demoAppMainEl) == null ? void 0 : _this$demoAppMainEl3.removeEventListener('silentRenew', silentRenew);
      });
    }
  }

}
customElements.define('app-root', AppElement);

/***/ }),

/***/ 8448:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authSettings": () => (/* binding */ authSettings)
/* harmony export */ });
/* harmony import */ var _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1846);
/* harmony import */ var _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4209);
/* harmony import */ var demo_app_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5779);
/* harmony import */ var _auth_js_package_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8161);



const settings = [{
  name: 'Auth0',
  librarySettings: {
    authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
    clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
    schemeUri: 'demo-app',
    scope: 'openid profile email phone read:current_user',
    internal: {
      extraQueryParams: {
        audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
      }
    },
    navigationType: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_1__.Navigation.REDIRECT,
    logLevel: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.NONE,
    loginRequired: false,
    loadSession: true,
    loadUserInfo: true,
    automaticSilentRenew: true
  }
}, {
  name: 'Keycloak (local)',
  librarySettings: {
    authorityUrl: 'http://localhost:8080/auth/realms/demo',
    clientId: 'demo-app',
    schemeUri: 'demo-app',
    scope: 'openid profile email phone',
    navigationType: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_1__.Navigation.REDIRECT,
    logLevel: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.NONE,
    loginRequired: false,
    loadSession: true,
    loadUserInfo: true,
    automaticSilentRenew: true
  }
}];
const librarySettingsDefinition = [{
  name: 'authorityUrl',
  label: 'Authority url',
  type: 'string',
  required: true
}, {
  name: 'clientId',
  label: 'Client id',
  type: 'string',
  required: true
}, {
  name: 'schemeUri',
  label: 'Scheme uri',
  type: 'string'
}, {
  name: 'scope',
  label: 'Scope',
  type: 'string'
}, {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  name: 'internal.extraQueryParams',
  label: 'Extra query params',
  type: 'json'
}, {
  name: 'navigationType',
  label: 'Navigation type',
  type: 'list',
  values: [{
    label: 'REDIRECT',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_1__.Navigation.REDIRECT
  }, {
    label: 'POPUP',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_1__.Navigation.POPUP
  }]
}, {
  name: 'logLevel',
  label: 'Log level',
  type: 'list',
  values: [{
    label: 'NONE',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.NONE
  }, {
    label: 'ERROR',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.ERROR
  }, {
    label: 'WARN',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.WARN
  }, {
    label: 'INFO',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.INFO
  }, {
    label: 'DEBUG',
    value: _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.Log.DEBUG
  }]
}, {
  name: 'loginRequired',
  label: 'Login required',
  type: 'boolean'
}, {
  name: 'loadSession',
  label: 'Load session',
  type: 'boolean'
}, {
  name: 'loadUserInfo',
  label: 'Load user info',
  type: 'boolean'
}, {
  name: 'automaticSilentRenew',
  label: 'Automatic silent renew',
  type: 'boolean'
}];
const authSettings = new demo_app_common__WEBPACK_IMPORTED_MODULE_0__.DemoAppSettings( // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
`auth-js:${_auth_js_package_json__WEBPACK_IMPORTED_MODULE_3__.version}:demo-app:settings`, {
  currentImplementationIndex: 0,
  currentTabIndex: 0,
  currentSettingsIndex: 0,
  librarySettingsDefinition,
  settings
});

/***/ }),

/***/ 2952:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
const environment = {
  name: 'DEV',
  production: false
};

/***/ }),

/***/ 9302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_app_element_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9290);
/* harmony import */ var _badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4387);
/* harmony import */ var _app_app_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8448);



void (async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.authSettings = _app_app_settings__WEBPACK_IMPORTED_MODULE_1__.authSettings;
  window.authManager = await (0,_badisi_auth_js_oidc__WEBPACK_IMPORTED_MODULE_2__.initOidc)(_app_app_settings__WEBPACK_IMPORTED_MODULE_1__.authSettings.getCurrentSettings().librarySettings);
  const template = document.createElement('template');

  if ((await window.authManager.isAuthenticated()) || !window.authManager.getSettings().loginRequired) {
    template.innerHTML = '<app-root></app-root>';
    document.body.appendChild(document.importNode(template.content, true));
  } else {
    var _document$body$queryS;

    template.innerHTML = 'Not authorized<br/><button id="loginNotAuthorized">Login</button>';
    document.body.appendChild(document.importNode(template.content, true));
    (_document$body$queryS = document.body.querySelector('#loginNotAuthorized')) == null ? void 0 : _document$body$queryS.addEventListener('click', () => {
      void window.authManager.login();
    }, {
      once: true
    });
  }
})();

/***/ }),

/***/ 4080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoAppDebugElement": () => (/* binding */ DemoAppDebugElement)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1898);

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${_core__WEBPACK_IMPORTED_MODULE_0__.globalStyle}

        :host {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 20px 28px;
        }

        :host .info {
            margin: 16px;
        }

        :host .info .title {
            min-width: 130px;
        }

        :host .info .value {
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        :host .info code {
            width: 100%;
        }
    </style>

    <div class="card">
        <div class="info column">
            <div class="title">Authenticated</div>
            <code>
                <pre id="isAuthenticated" class="value json-value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">User session</div>
            <code>
                <pre id="userSession" class="value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">Access token</div>
            <code>
                <pre id="accessToken" class="value json-value"></pre>
                <pre id="accessTokenDecoded" class="value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">Id token</div>
            <code>
                <pre id="idToken" class="value json-value"></pre>
                <pre id="idTokenDecoded" class="value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">User profile</div>
            <code>
                <pre id="userProfile" class="value"></pre>
            </code>
        </div>
    </div>
`;
class DemoAppDebugElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot;

    super();
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(template.content, true)); // Initialize

    this.isAuthenticated = false;
    this.userSession = undefined;
    this.accessToken = undefined;
    this.accessTokenDecoded = undefined;
    this.idToken = undefined;
    this.idTokenDecoded = undefined;
    this.userProfile = undefined;
  }

  set isAuthenticated(value) {
    this.update('#isAuthenticated', value);
  }

  set userSession(value) {
    this.update('#userSession', (0,_core__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(value, ['expires_at']));
  }

  set accessToken(value) {
    this.update('#accessToken', value);
  }

  set accessTokenDecoded(value) {
    const text = typeof value !== 'string' ? (0,_core__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(value, ['exp', 'iat', 'auth_time']) : '(no decoded info as it is not a JWT token)';
    this.update('#accessTokenDecoded', text);
  }

  set idToken(value) {
    this.update('#idToken', value);
  }

  set idTokenDecoded(value) {
    this.update('#idTokenDecoded', (0,_core__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(value, ['exp', 'iat', 'auth_time']));
  }

  set userProfile(value) {
    this.update('#userProfile', (0,_core__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(value));
  } // --- HELPER(s) ---


  update(elementName, value) {
    var _this$shadowRoot2;

    const element = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector(elementName);

    if (element) {
      if (value === undefined || value === null || value === '') {
        var _element$closest;

        (_element$closest = element.closest('.info')) == null ? void 0 : _element$closest.classList.add('hidden');
      } else {
        var _element$closest2;

        (_element$closest2 = element.closest('.info')) == null ? void 0 : _element$closest2.classList.remove('hidden');
        element.innerHTML = String(value);
      }
    }
  }

}
window.customElements.define('demo-app-debug', DemoAppDebugElement);

/***/ }),

/***/ 6794:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoAppHeaderElement": () => (/* binding */ DemoAppHeaderElement)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1898);

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${_core__WEBPACK_IMPORTED_MODULE_0__.globalStyle}

        :host header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            align-items: center;
            height: 110px;
            color: white;
            background: rgb(103, 58, 183);
            background: linear-gradient(180deg, rgba(103, 58, 183, 1) 0%, rgba(94, 53, 177, 1) 100%);
        }

        :host header .github-icon {
            position: absolute;
            top: 20px;
            right: 22px;
            width: 26px;
            height: 26px;
            color: white;
        }

        :host header .status.authenticated {
            background-color: #7CB342;
        }

        :host header .status {
            position: absolute;
            top: 25px;
            right: 56px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #EC407A;
            margin-top: 1px;
            margin-right: 8px;
        }

        :host header .title {
            align-items: center;
            margin: 10px 0;
            font-size: 28px;
            font-weight: 400;
            color: #ede7f6;
        }

        :host header .title select {
            cursor: pointer;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #ede7f6;
            background: none;
            border: none;
            outline: none;
        }

        :host header button {
            margin-top: 2px;
        }

        :host header button:not(:last-child) {
            margin-right: 10px;
        }
    </style>

    <header class="column">
        <div class="status"></div>

        <a class="github-icon"
            href="https://github.com/Badisi/auth-js"
            target="_blank"
            title="View it on GitHub"
            aria-label="GitHub repository">
            <span>
                <svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                    </path>
                </svg>
            </span>
        </a>

        <div class="title row">
            &#123; <select id="implementation-select"></select> &#125; Demo app
        </div>

        <div class="row">
            <button id="login-button">LOGIN</button>
            <button id="logout-button">LOGOUT</button>
            <button id="silent-renew-button">SILENT RENEW</button>
        </div>
    </header>
`;
class DemoAppHeaderElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot, _this$shadowRoot2, _this$shadowRoot3, _this$shadowRoot4, _this$shadowRoot5;

    super();
    this.listeners = [];
    this.statusEl = void 0;
    this.loginButtonEl = void 0;
    this.logoutButtonEl = void 0;
    this.silentRenewButtonEl = void 0;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(template.content, true));
    this.statusEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('.status');
    this.loginButtonEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('#login-button');
    this.logoutButtonEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('#logout-button');
    this.silentRenewButtonEl = (_this$shadowRoot5 = this.shadowRoot) == null ? void 0 : _this$shadowRoot5.querySelector('#silent-renew-button');
    this.refreshStatus(false);
  }

  set isAuthenticated(value) {
    this.refreshStatus(value);
  }

  connectedCallback() {
    var _this$shadowRoot6;

    const selectEl = (_this$shadowRoot6 = this.shadowRoot) == null ? void 0 : _this$shadowRoot6.querySelector('#implementation-select');
    window.authSettings.getImplementations().forEach((item, index) => {
      const optionEl = document.createElement('option');
      optionEl.selected = index === window.authSettings.getCurrentImplementationIndex();
      optionEl.value = String(item.label);
      optionEl.textContent = item.label;
      selectEl == null ? void 0 : selectEl.appendChild(optionEl);
    });

    const changeCb = () => {
      window.authSettings.saveCurrentImplementationIndex(selectEl.selectedIndex);
      window.location.href = window.authSettings.getImplementations()[selectEl.selectedIndex].url;
    };

    selectEl == null ? void 0 : selectEl.addEventListener('change', changeCb);
    this.listeners.push(() => selectEl.removeEventListener('change', changeCb));
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.listeners.forEach(rm => rm());
  } // --- HELPER(s) ---


  addEventListeners() {
    var _this$loginButtonEl, _this$logoutButtonEl, _this$silentRenewButt;

    const login = () => this.dispatchEvent(new Event('login', {
      bubbles: true,
      composed: true
    }));

    (_this$loginButtonEl = this.loginButtonEl) == null ? void 0 : _this$loginButtonEl.addEventListener('click', login);

    const logout = () => this.dispatchEvent(new Event('logout', {
      bubbles: true,
      composed: true
    }));

    (_this$logoutButtonEl = this.logoutButtonEl) == null ? void 0 : _this$logoutButtonEl.addEventListener('click', logout);

    const silentRenew = () => this.dispatchEvent(new Event('silentRenew', {
      bubbles: true,
      composed: true
    }));

    (_this$silentRenewButt = this.silentRenewButtonEl) == null ? void 0 : _this$silentRenewButt.addEventListener('click', silentRenew);
    this.listeners.push(() => {
      var _this$loginButtonEl2;

      return (_this$loginButtonEl2 = this.loginButtonEl) == null ? void 0 : _this$loginButtonEl2.removeEventListener('click', login);
    }, () => {
      var _this$logoutButtonEl2;

      return (_this$logoutButtonEl2 = this.logoutButtonEl) == null ? void 0 : _this$logoutButtonEl2.removeEventListener('click', logout);
    }, () => {
      var _this$silentRenewButt2;

      return (_this$silentRenewButt2 = this.silentRenewButtonEl) == null ? void 0 : _this$silentRenewButt2.removeEventListener('click', silentRenew);
    });
  }

  refreshStatus(value) {
    if (this.statusEl) {
      this.statusEl.title = value ? 'Authenticated' : 'Not authenticated';
      this.statusEl.classList[value ? 'add' : 'remove']('authenticated');
    }
  }

}
window.customElements.define('demo-app-header', DemoAppHeaderElement);

/***/ }),

/***/ 3626:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoAppMainElement": () => (/* binding */ DemoAppMainElement)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1898);

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${_core__WEBPACK_IMPORTED_MODULE_0__.globalStyle}

        :host .tabs {
            position: fixed;
            top: 110px;
            left: 0;
            right: 0;
            z-index: 1;
            align-self: normal;
            padding: 10px 0;
            padding-left: 36px;
            background-color: #7043bf;
            box-shadow: 0 3px 5px -1px #0003, 0 6px 10px #00000024, 0 1px 18px #0000001f;
        }

        :host .tabs a {
            cursor: pointer;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            transition: background-color 150ms cubic-bezier(0.35, 0, 0.25, 1);
        }

        :host .tabs a.selected {
            background-color: #512da8;
        }

        :host .tabs a:hover {
            background-color: #4527a0;
        }

        :host .tabs a:not(:last-child) {
            margin-right: 10px;
        }

        :host .tabs-content {
            position: fixed;
            top: 165px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
        }

        @media only screen and (max-width: 600px) {
            :host .tabs {
                padding-left: 0;
                justify-content: center;
            }
        }
    </style>

    <demo-app-header></demo-app-header>
    <nav id="tabs" class="tabs row"></nav>
    <div class="tabs-content">
        <slot id="views"></slot>
    </div>
`;
class DemoAppMainElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot;

    super();
    this.listeners = [];
    this.tabsContentEl = void 0;
    this.tabs = [];
    this.views = [];
    this.currentTabIndex = -1;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(template.content, true));
  }

  set isAuthenticated(value) {
    var _this$shadowRoot2;

    const demoAppHeader = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('demo-app-header');
    demoAppHeader.isAuthenticated = value;
  }

  connectedCallback() {
    var _this$shadowRoot3;

    this.tabsContentEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('.tabs-content');
    this.drawTabs();
    const settings = window.authSettings;
    this.showView(settings ? settings.getCurrentTabIndex() : 0);
  }

  disconnectedCallback() {
    this.listeners.forEach(rm => rm());
  } // --- HELPER(s) ---


  drawTabs() {
    var _this$shadowRoot4, _this$shadowRoot5;

    const viewsEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('#views');
    const tabsEl = (_this$shadowRoot5 = this.shadowRoot) == null ? void 0 : _this$shadowRoot5.querySelector('#tabs');

    if (viewsEl && tabsEl) {
      this.views = viewsEl.assignedElements();
      this.views.forEach((view, index) => {
        // Hide view by default
        view.style.display = 'none'; // Create associated tab

        const tab = document.createElement('a');
        tab.textContent = view.getAttribute('tabLabel') || '?';

        const cb = () => this.showView(index);

        tab.addEventListener('click', cb);
        this.listeners.push(() => tab.removeEventListener('click', cb));
        tabsEl.appendChild(tab); // Add it to collection

        this.tabs.push(tab);
      });
    }
  }

  showView(index) {
    if (this.currentTabIndex !== index) {
      var _this$tabsContentEl, _window$authSettings;

      this.currentTabIndex = index;
      this.tabs.forEach((tab, i) => {
        tab.classList[i !== index ? 'remove' : 'add']('selected');
      });
      this.views.forEach((view, i) => {
        view.style.display = i !== index ? 'none' : 'flex';
      });
      (_this$tabsContentEl = this.tabsContentEl) == null ? void 0 : _this$tabsContentEl.scrollTo(0, 0);
      (_window$authSettings = window.authSettings) == null ? void 0 : _window$authSettings.saveCurrentTabIndex(index);
    }
  }

}
window.customElements.define('demo-app-main', DemoAppMainElement);

/***/ }),

/***/ 4798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoAppSettingsElement": () => (/* binding */ DemoAppSettingsElement)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2295);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6305);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2937);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7285);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4994);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8868);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4861);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9150);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1898);









/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${_core__WEBPACK_IMPORTED_MODULE_8__.globalStyle}

        :host {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 20px 28px;
        }

        :host .card {
            padding: 16px;
        }

        :host .form-content > * {
            margin-bottom: 24px;
        }

        :host .form-content label {
            margin-bottom: 8px;
        }

        :host .form-actions {
            padding: 0 8px;
            align-items: center;
        }

        :host .form-actions button {
            padding: 2px 12px;
        }

        :host .form-actions button:not(:last-of-type) {
            margin-right: 12px;
        }

        :host(.dirty) .form-actions #apply-settings-button,
        :host(.dirty) .form-actions #cancel-settings-button {
            display: flex !important;
        }
    </style>

    <form class="column">
        <div class="form-content card flex"></div>

        <div class="form-actions row">
            <div id="reset-settings-dev" class="hidden">
                RESET DEFAULT TO:
                <select id="reset-settings-select">
                    <option value disabled selected>Choose an option</option>
                </select>
            </div>
            <button id="reset-settings-button" type="button">RESET TO DEFAULT</button>
            <span class="flex"></span>
            <button id="apply-settings-button" type="submit" class="hidden">APPLY</button>
            <button id="cancel-settings-button" type="button" class="hidden">CANCEL</button>
        </div>
    </form>
`;
class DemoAppSettingsElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot, _this$shadowRoot2, _this$shadowRoot3;

    super();
    this.listeners = [];
    this.formEl = void 0;
    this.resetEl = void 0;
    this.resetDevEl = void 0;
    this.formContentEl = void 0;
    this.formIsDirty = false;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(template.content, true));
    this.resetEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('#reset-settings-button');
    this.resetDevEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('#reset-settings-dev');
    this.isDev = false;
  }

  set isDev(value) {
    if (value) {
      var _this$resetDevEl, _this$resetEl;

      (_this$resetDevEl = this.resetDevEl) == null ? void 0 : _this$resetDevEl.classList.remove('hidden');
      (_this$resetEl = this.resetEl) == null ? void 0 : _this$resetEl.classList.add('hidden');
    } else {
      var _this$resetDevEl2, _this$resetEl2;

      (_this$resetDevEl2 = this.resetDevEl) == null ? void 0 : _this$resetDevEl2.classList.add('hidden');
      (_this$resetEl2 = this.resetEl) == null ? void 0 : _this$resetEl2.classList.remove('hidden');
    }
  }

  connectedCallback() {
    var _this$shadowRoot4, _this$shadowRoot5, _this$resetEl3, _this$shadowRoot6, _window$authSettings, _this$shadowRoot7;

    this.formEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('form');
    this.formContentEl = (_this$shadowRoot5 = this.shadowRoot) == null ? void 0 : _this$shadowRoot5.querySelector('.form-content'); // Form events

    this.formEl.onsubmit = () => false;

    this.formEl.addEventListener('submit', () => this.saveAndReload(), {
      once: true
    });

    const inputCb = e => {
      if (!this.formIsDirty && e.target.id !== 'reset-settings-select') {
        this.formIsDirty = true;
        this.classList.add('dirty');
      }
    };

    this.formEl.addEventListener('input', inputCb);
    this.listeners.push(() => this.formEl.removeEventListener('input', inputCb)); // Reset

    (_this$resetEl3 = this.resetEl) == null ? void 0 : _this$resetEl3.addEventListener('click', () => this.resetAndReload(), {
      once: true
    });
    const resetSelectEl = (_this$shadowRoot6 = this.shadowRoot) == null ? void 0 : _this$shadowRoot6.querySelector('#reset-settings-select');
    (_window$authSettings = window.authSettings) == null ? void 0 : _window$authSettings.getSettings().forEach(item => {
      const optionEl = document.createElement('option');
      optionEl.value = String(item.name);
      optionEl.textContent = item.name;
      resetSelectEl == null ? void 0 : resetSelectEl.appendChild(optionEl);
    });

    const changeCb = () => this.resetAndReload(resetSelectEl.value);

    resetSelectEl == null ? void 0 : resetSelectEl.addEventListener('change', changeCb);
    this.listeners.push(() => resetSelectEl.removeEventListener('change', changeCb)); // Cancel

    const cancelEl = (_this$shadowRoot7 = this.shadowRoot) == null ? void 0 : _this$shadowRoot7.querySelector('#cancel-settings-button');

    const cancelCb = () => this.cancel();

    cancelEl == null ? void 0 : cancelEl.addEventListener('click', cancelCb);
    this.listeners.push(() => cancelEl == null ? void 0 : cancelEl.removeEventListener('click', cancelCb)); // Initialize form

    this.refreshFormContent();
  }

  disconnectedCallback() {
    this.listeners.forEach(rm => rm());
  } // --- HANDLER(s) ---


  resetAndReload(settingsName) {
    var _window$authSettings2;

    (_window$authSettings2 = window.authSettings) == null ? void 0 : _window$authSettings2.resetCurrentSettings(settingsName);
    location.reload();
  }

  cancel() {
    this.formIsDirty = false;
    this.classList.remove('dirty');
    this.refreshFormContent();
  } // --- HELPER(s) ---


  setPathValue(settings, path, value) {
    const props = path.split('.');
    props.reduce((obj, prop, index) => {
      if (index === props.length - 1) {
        obj[prop] = value;
      } else if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
        obj[prop] = {}; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

        return obj[prop];
      }

      return obj;
    }, settings);
  }

  getPathValue(settings, path) {
    return path.split('.').reduce((obj, prop) => // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    obj ? obj[prop] : obj, settings);
  }

  refreshFormContent() {
    // Clear the page
    this.formContentEl.innerHTML = ''; // Draw the form

    window.authSettings.getLibrarySettingsDefinition().sort((a, b) => (b._index || 0) - (a._index || 0)).forEach(item => {
      var _item$values;

      const formItemContainerEl = document.createElement('div');
      this.formContentEl.prepend(formItemContainerEl);
      const formItemLabelEl = document.createElement('label');
      formItemLabelEl.htmlFor = item.name.replace('.', '');
      formItemLabelEl.textContent = `${item.label}${item.required ? ' *' : ''}`;
      const formItemEl = document.createElement(item.type === 'list' ? 'select' : 'input');
      formItemEl.id = item.name.replace('.', '');
      formItemEl.name = item.name.replace('.', '');
      formItemEl.required = item.required === true;
      const librarySettings = window.authSettings.getCurrentSettings().librarySettings;

      switch (item.type) {
        case 'boolean':
          formItemEl.checked = this.getPathValue(librarySettings, item.name);
          formItemEl.type = 'checkbox';
          formItemContainerEl.appendChild(formItemEl);
          formItemContainerEl.appendChild(formItemLabelEl);
          break;

        case 'list':
          (_item$values = item.values) == null ? void 0 : _item$values.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = String(option.value);
            optionEl.textContent = option.label;
            formItemEl.appendChild(optionEl);
          });
          formItemEl.value = this.getPathValue(librarySettings, item.name);
          formItemEl.classList.add('flex');
          formItemContainerEl.classList.add('input', 'column');
          formItemContainerEl.appendChild(formItemLabelEl);
          formItemContainerEl.appendChild(formItemEl);
          break;

        default:
          {
            const value = this.getPathValue(librarySettings, item.name);

            if (item.type === 'json') {
              formItemEl.value = value ? JSON.stringify(value) : '';
            } else {
              formItemEl.value = value;
            }

            formItemContainerEl.classList.add('input', 'column');
            formItemContainerEl.appendChild(formItemLabelEl);
            formItemContainerEl.appendChild(formItemEl);
            break;
          }
      }
    });
  }

  saveAndReload() {
    if (this.formEl.reportValidity()) {
      var _window$authSettings3;

      const settings = {};
      window.authSettings.getLibrarySettingsDefinition().forEach(item => {
        var _this$shadowRoot8;

        const formItemEl = (_this$shadowRoot8 = this.shadowRoot) == null ? void 0 : _this$shadowRoot8.querySelector(`#${item.name.replace('.', '')}`);
        let value;

        switch (item.type) {
          case 'boolean':
            value = formItemEl.checked;
            break;

          case 'list':
            value = formItemEl.value;
            break;

          case 'json':
            try {
              const val = formItemEl.value;

              if (val && val.trim() !== '') {
                value = JSON.parse(val);
              }
            } catch (err) {
              console.error(err);
            }

            break;

          default:
            value = formItemEl.value;
            break;
        }

        this.setPathValue(settings, item.name, value);
      });
      (_window$authSettings3 = window.authSettings) == null ? void 0 : _window$authSettings3.saveCurrentLibrarySettings(settings);
      location.reload();
    }
  }

}
window.customElements.define('demo-app-settings', DemoAppSettingsElement);

/***/ }),

/***/ 1898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "globalStyle": () => (/* binding */ globalStyle),
/* harmony export */   "prettyPrint": () => (/* binding */ prettyPrint)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2295);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4994);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7425);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3616);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__);




const globalStyle = `
    .flex {
        flex: 1;
    }

    .hidden {
        display: none !important;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .card {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        background-color: white;
        margin: 12px 6px;
    }

    .card-title {
        padding: 16px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
        align-items: center;
    }

    .json-key {
        color: rgb(124, 77, 255);
    }

    .json-value {
        color: rgb(67, 122, 237);
    }

    .json-string {
        color: rgb(83, 160, 83);
    }

    .json-date {
        color: rgb(200, 56, 198);
    }

    input {
        color: #5e35b1;
        padding: 10px;
        border: 1px solid #0000001f;
        border-radius: 4px;
        font-size: 14px;
    }

    input:invalid {
        border-color: #f44336;
    }

    input[type="checkbox"] {
        margin-right: 10px;
    }

    select {
        color: #5e35b1;
        padding: 8px 6px;
        border: 1px solid #0000001f;
        border-radius: 4px;
    }

    @media only screen and (max-width: 600px) {
        :host {
            padding: 0 !important;
        }

        :host .card {
            border: 0;
            margin: 0;
        }
    }
`;
const prettyPrint = (value, dateAttrs = []) => {
  const jsonLine = /^( *)("[\w-]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;

  const replacer = (_match, pIndent, pKey, pVal, pEnd) => {
    let r = pIndent || '';
    const key = pKey ? pKey.replace(/[": ]/g, '') : undefined;

    if (key) {
      r += `<span class="json-key">${key}</span>: `;
    }

    if (pVal) {
      r += `<span class="${pVal.startsWith('"') ? 'json-string' : 'json-value'}">${pVal}</span>`;

      if (key && dateAttrs.includes(key)) {
        const date = new Date(Number(pVal) * 1000);
        const pValAsDate = `${date.toDateString()}, ${date.toLocaleTimeString()}`;

        if (pValAsDate) {
          r += ` <span class="json-date">(${pValAsDate})</span>`;
        }
      }
    }

    return r + (pEnd || '');
  };

  return value ? JSON.stringify(value, null, 2).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(jsonLine, replacer) : '';
};

/***/ }),

/***/ 5779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoAppHeaderElement": () => (/* reexport safe */ _components_demo_app_header_element__WEBPACK_IMPORTED_MODULE_0__.DemoAppHeaderElement),
/* harmony export */   "DemoAppMainElement": () => (/* reexport safe */ _components_demo_app_main_element__WEBPACK_IMPORTED_MODULE_1__.DemoAppMainElement),
/* harmony export */   "DemoAppDebugElement": () => (/* reexport safe */ _components_demo_app_debug_element__WEBPACK_IMPORTED_MODULE_2__.DemoAppDebugElement),
/* harmony export */   "DemoAppSettingsElement": () => (/* reexport safe */ _components_demo_app_settings_element__WEBPACK_IMPORTED_MODULE_3__.DemoAppSettingsElement),
/* harmony export */   "DemoAppSettings": () => (/* reexport safe */ _services_demo_app_settings_service__WEBPACK_IMPORTED_MODULE_4__.DemoAppSettings),
/* harmony export */   "globalStyle": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_5__.globalStyle),
/* harmony export */   "prettyPrint": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_5__.prettyPrint)
/* harmony export */ });
/* harmony import */ var _components_demo_app_header_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6794);
/* harmony import */ var _components_demo_app_main_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3626);
/* harmony import */ var _components_demo_app_debug_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4080);
/* harmony import */ var _components_demo_app_settings_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4798);
/* harmony import */ var _services_demo_app_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5966);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1898);







/***/ }),

/***/ 5966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoAppSettings": () => (/* binding */ DemoAppSettings)
/* harmony export */ });
class DemoAppSettings {
  constructor(storageKey, defaultAppSettings) {
    this.storageKey = storageKey;
    this.defaultAppSettings = defaultAppSettings;
    this.implementations = [{
      label: 'auth-js',
      url: 'https://badisi.github.io/auth-js/demo-app/auth-js'
    }, {
      label: 'ngx-auth',
      url: 'https://badisi.github.io/auth-js/demo-app/ngx-auth'
    }];
    this.defaultAppSettings.librarySettingsDefinition.forEach((item, index) => item._index = index);
  }

  getCurrentImplementationIndex() {
    return this.getAppSettings().currentImplementationIndex;
  }

  saveCurrentImplementationIndex(index) {
    const appSettings = this.getAppSettings();
    appSettings.currentImplementationIndex = index;
    this.saveAppSettings(appSettings);
  }

  getCurrentTabIndex() {
    return this.getAppSettings().currentTabIndex;
  }

  saveCurrentTabIndex(index) {
    const appSettings = this.getAppSettings();
    appSettings.currentTabIndex = index;
    this.saveAppSettings(appSettings);
  }

  getImplementations() {
    return this.implementations;
  }

  getSettings() {
    return this.getAppSettings().settings;
  }

  getCurrentSettings() {
    const appSettings = this.getAppSettings();
    return appSettings.settings[appSettings.currentSettingsIndex];
  }

  resetCurrentSettings(settingsName) {
    const appSettings = this.getAppSettings();
    let index = appSettings.currentSettingsIndex;

    if (settingsName) {
      const findIndex = appSettings.settings.findIndex(s => s.name === settingsName);

      if (findIndex !== -1) {
        index = findIndex;
      }
    }

    appSettings.settings[index] = this.defaultAppSettings.settings[index];
    appSettings.currentSettingsIndex = index;
    this.saveAppSettings(appSettings);
  }

  getLibrarySettingsDefinition() {
    return this.getAppSettings().librarySettingsDefinition;
  }

  saveCurrentLibrarySettings(value) {
    const appSettings = this.getAppSettings();
    appSettings.settings[appSettings.currentSettingsIndex].librarySettings = value;
    this.saveAppSettings(appSettings);
  }

  saveCurrentOtherSettings(value) {
    const appSettings = this.getAppSettings();
    appSettings.settings[appSettings.currentSettingsIndex].otherSettings = value;
    this.saveAppSettings(appSettings);
  } // --- HELPER(s) ---


  saveAppSettings(settings) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(settings));
  }

  getAppSettings() {
    const data = sessionStorage.getItem(this.storageKey);

    if (data) {
      return JSON.parse(data);
    }

    return this.defaultAppSettings;
  }

}

/***/ }),

/***/ 8056:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 8161:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@badisi/auth-js","version":"1.0.0-beta.5","description":"Authentication and authorization support for web based desktop and mobile applications.","homepage":"https://github.com/Badisi/auth-js/tree/main/projects/auth-js","license":"GPL-3.0","author":"Badisi","repository":{"type":"git","url":"https://github.com/Badisi/auth-js.git"},"keywords":["ionic","capacitor","cordova","hybrid","authentication","authorization","oidc","openidconnect","openid","security","identity","oauth2","oauth","auth","authn"],"sideEffects":false,"dependencies":{"oidc-client-ts":"2.0.1","lodash-es":"^4.17.21","jwt-decode":"^3.1.2"},"exports":{"core":{"import":"./esm/core/index.js","require":"./umd/core/index.js","browser":"./browser/core/index.min.js","types":"./core/index.d.ts"},"oidc":{"import":"./esm/oidc/index.js","require":"./umd/oidc/index.js","browser":"./browser/oidc/index.min.js","types":"./oidc/index.d.ts"}}}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(9302)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map
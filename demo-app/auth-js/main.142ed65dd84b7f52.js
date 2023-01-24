(self["webpackChunk_badisi_auth_js"] = self["webpackChunk_badisi_auth_js"] || []).push([[179],{

/***/ 7796:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/*! Capacitor: https://capacitorjs.com/ - MIT License */


__webpack_unused_export__ = ({ value: true });

const createCapacitorPlatforms = (win) => {
    const defaultPlatformMap = new Map();
    defaultPlatformMap.set('web', { name: 'web' });
    const capPlatforms = win.CapacitorPlatforms || {
        currentPlatform: { name: 'web' },
        platforms: defaultPlatformMap,
    };
    const addPlatform = (name, platform) => {
        capPlatforms.platforms.set(name, platform);
    };
    const setPlatform = (name) => {
        if (capPlatforms.platforms.has(name)) {
            capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
        }
    };
    capPlatforms.addPlatform = addPlatform;
    capPlatforms.setPlatform = setPlatform;
    return capPlatforms;
};
const initPlatforms = (win) => (win.CapacitorPlatforms = createCapacitorPlatforms(win));
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
const CapacitorPlatforms = /*#__PURE__*/ initPlatforms((typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {}));
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
const addPlatform = CapacitorPlatforms.addPlatform;
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
const setPlatform = CapacitorPlatforms.setPlatform;

const legacyRegisterWebPlugin = (cap, webPlugin) => {
    var _a;
    const config = webPlugin.config;
    const Plugins = cap.Plugins;
    if (!config || !config.name) {
        // TODO: add link to upgrade guide
        throw new Error(`Capacitor WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."`);
    }
    // TODO: add link to upgrade guide
    console.warn(`Capacitor plugin "${config.name}" is using the deprecated "registerWebPlugin()" function`);
    if (!Plugins[config.name] || ((_a = config === null || config === void 0 ? void 0 : config.platforms) === null || _a === void 0 ? void 0 : _a.includes(cap.getPlatform()))) {
        // Add the web plugin into the plugins registry if there already isn't
        // an existing one. If it doesn't already exist, that means
        // there's no existing native implementation for it.
        // - OR -
        // If we already have a plugin registered (meaning it was defined in the native layer),
        // then we should only overwrite it if the corresponding web plugin activates on
        // a certain platform. For example: Geolocation uses the WebPlugin on Android but not iOS
        Plugins[config.name] = webPlugin;
    }
};

exports.ur = void 0;
(function (ExceptionCode) {
    /**
     * API is not implemented.
     *
     * This usually means the API can't be used because it is not implemented for
     * the current platform.
     */
    ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
    /**
     * API is not available.
     *
     * This means the API can't be used right now because:
     *   - it is currently missing a prerequisite, such as network connectivity
     *   - it requires a particular platform or browser version
     */
    ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(exports.ur || (exports.ur = {}));
class CapacitorException extends Error {
    constructor(message, code, data) {
        super(message);
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
const getPlatformId = (win) => {
    var _a, _b;
    if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return 'android';
    }
    else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return 'ios';
    }
    else {
        return 'web';
    }
};

const createCapacitor = (win) => {
    var _a, _b, _c, _d, _e;
    const capCustomPlatform = win.CapacitorCustomPlatform || null;
    const cap = win.Capacitor || {};
    const Plugins = (cap.Plugins = cap.Plugins || {});
    /**
     * @deprecated Use `capCustomPlatform` instead, default functions like registerPlugin will function with the new object.
     */
    const capPlatforms = win.CapacitorPlatforms;
    const defaultGetPlatform = () => {
        return capCustomPlatform !== null
            ? capCustomPlatform.name
            : getPlatformId(win);
    };
    const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
    const defaultIsNativePlatform = () => getPlatform() !== 'web';
    const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
    const defaultIsPluginAvailable = (pluginName) => {
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
            // JS implementation available for the current platform.
            return true;
        }
        if (getPluginHeader(pluginName)) {
            // Native implementation available.
            return true;
        }
        return false;
    };
    const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) ||
        defaultIsPluginAvailable;
    const defaultGetPluginHeader = (pluginName) => { var _a; return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find(h => h.name === pluginName); };
    const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
    const handleError = (err) => win.console.error(err);
    const pluginMethodNoop = (_target, prop, pluginName) => {
        return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
    };
    const registeredPlugins = new Map();
    const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
            console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
            return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async () => {
            if (!jsImplementation && platform in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations[platform] === 'function'
                        ? (jsImplementation = await jsImplementations[platform]())
                        : (jsImplementation = jsImplementations[platform]);
            }
            else if (capCustomPlatform !== null &&
                !jsImplementation &&
                'web' in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations['web'] === 'function'
                        ? (jsImplementation = await jsImplementations['web']())
                        : (jsImplementation = jsImplementations['web']);
            }
            return jsImplementation;
        };
        const createPluginMethod = (impl, prop) => {
            var _a, _b;
            if (pluginHeader) {
                const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find(m => prop === m.name);
                if (methodHeader) {
                    if (methodHeader.rtype === 'promise') {
                        return (options) => cap.nativePromise(pluginName, prop.toString(), options);
                    }
                    else {
                        return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
                    }
                }
                else if (impl) {
                    return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
                }
            }
            else if (impl) {
                return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
            }
            else {
                throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, exports.ur.Unimplemented);
            }
        };
        const createPluginMethodWrapper = (prop) => {
            let remove;
            const wrapper = (...args) => {
                const p = loadPluginImplementation().then(impl => {
                    const fn = createPluginMethod(impl, prop);
                    if (fn) {
                        const p = fn(...args);
                        remove = p === null || p === void 0 ? void 0 : p.remove;
                        return p;
                    }
                    else {
                        throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, exports.ur.Unimplemented);
                    }
                });
                if (prop === 'addListener') {
                    p.remove = async () => remove();
                }
                return p;
            };
            // Some flair ✨
            wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
            Object.defineProperty(wrapper, 'name', {
                value: prop,
                writable: false,
                configurable: false,
            });
            return wrapper;
        };
        const addListener = createPluginMethodWrapper('addListener');
        const removeListener = createPluginMethodWrapper('removeListener');
        const addListenerNative = (eventName, callback) => {
            const call = addListener({ eventName }, callback);
            const remove = async () => {
                const callbackId = await call;
                removeListener({
                    eventName,
                    callbackId,
                }, callback);
            };
            const p = new Promise(resolve => call.then(() => resolve({ remove })));
            p.remove = async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            };
            return p;
        };
        const proxy = new Proxy({}, {
            get(_, prop) {
                switch (prop) {
                    // https://github.com/facebook/react/issues/20030
                    case '$$typeof':
                        return undefined;
                    case 'toJSON':
                        return () => ({});
                    case 'addListener':
                        return pluginHeader ? addListenerNative : addListener;
                    case 'removeListener':
                        return removeListener;
                    default:
                        return createPluginMethodWrapper(prop);
                }
            },
        });
        Plugins[pluginName] = proxy;
        registeredPlugins.set(pluginName, {
            name: pluginName,
            proxy,
            platforms: new Set([
                ...Object.keys(jsImplementations),
                ...(pluginHeader ? [platform] : []),
            ]),
        });
        return proxy;
    };
    const registerPlugin = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
    // Add in convertFileSrc for web, it will already be available in native context
    if (!cap.convertFileSrc) {
        cap.convertFileSrc = filePath => filePath;
    }
    cap.getPlatform = getPlatform;
    cap.handleError = handleError;
    cap.isNativePlatform = isNativePlatform;
    cap.isPluginAvailable = isPluginAvailable;
    cap.pluginMethodNoop = pluginMethodNoop;
    cap.registerPlugin = registerPlugin;
    cap.Exception = CapacitorException;
    cap.DEBUG = !!cap.DEBUG;
    cap.isLoggingEnabled = !!cap.isLoggingEnabled;
    // Deprecated props
    cap.platform = cap.getPlatform();
    cap.isNative = cap.isNativePlatform();
    return cap;
};
const initCapacitorGlobal = (win) => (win.Capacitor = createCapacitor(win));

const Capacitor = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {});
const registerPlugin = Capacitor.registerPlugin;
/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */
const Plugins = Capacitor.Plugins;
/**
 * Provided for backwards compatibility. Use the registerPlugin() API
 * instead, and provide the web plugin as the "web" implmenetation.
 * For example
 *
 * export const Example = registerPlugin('Example', {
 *   web: () => import('./web').then(m => new m.Example())
 * })
 *
 * @deprecated Deprecated in v3, will be removed from v4.
 */
const registerWebPlugin = (plugin) => legacyRegisterWebPlugin(Capacitor, plugin);

/**
 * Base class web plugins should extend.
 */
class WebPlugin {
    constructor(config) {
        this.listeners = {};
        this.windowListeners = {};
        if (config) {
            // TODO: add link to upgrade guide
            console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
            this.config = config;
        }
    }
    addListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listenerFunc);
        // If we haven't added a window listener for this event and it requires one,
        // go ahead and add it
        const windowListener = this.windowListeners[eventName];
        if (windowListener && !windowListener.registered) {
            this.addWindowListener(windowListener);
        }
        const remove = async () => this.removeListener(eventName, listenerFunc);
        const p = Promise.resolve({ remove });
        Object.defineProperty(p, 'remove', {
            value: async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            },
        });
        return p;
    }
    async removeAllListeners() {
        this.listeners = {};
        for (const listener in this.windowListeners) {
            this.removeWindowListener(this.windowListeners[listener]);
        }
        this.windowListeners = {};
    }
    notifyListeners(eventName, data) {
        const listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }
    hasListeners(eventName) {
        return !!this.listeners[eventName].length;
    }
    registerWindowListener(windowEventName, pluginEventName) {
        this.windowListeners[pluginEventName] = {
            registered: false,
            windowEventName,
            pluginEventName,
            handler: event => {
                this.notifyListeners(pluginEventName, event);
            },
        };
    }
    unimplemented(msg = 'not implemented') {
        return new Capacitor.Exception(msg, exports.ur.Unimplemented);
    }
    unavailable(msg = 'not available') {
        return new Capacitor.Exception(msg, exports.ur.Unavailable);
    }
    async removeListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(listenerFunc);
        this.listeners[eventName].splice(index, 1);
        // If there are no more listeners for this type of event,
        // remove the window listener
        if (!this.listeners[eventName].length) {
            this.removeWindowListener(this.windowListeners[eventName]);
        }
    }
    addWindowListener(handle) {
        window.addEventListener(handle.windowEventName, handle.handler);
        handle.registered = true;
    }
    removeWindowListener(handle) {
        if (!handle) {
            return;
        }
        window.removeEventListener(handle.windowEventName, handle.handler);
        handle.registered = false;
    }
}

const WebView = /*#__PURE__*/ registerPlugin('WebView');
/******** END WEB VIEW PLUGIN ********/
/******** COOKIES PLUGIN ********/
/**
 * Safely web encode a string value (inspired by js-cookie)
 * @param str The string value to encode
 */
const encode = (str) => encodeURIComponent(str)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);
/**
 * Safely web decode a string value (inspired by js-cookie)
 * @param str The string value to decode
 */
const decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
    async getCookies() {
        const cookies = document.cookie;
        const cookieMap = {};
        cookies.split(';').forEach(cookie => {
            if (cookie.length <= 0)
                return;
            // Replace first "=" with CAP_COOKIE to prevent splitting on additional "="
            let [key, value] = cookie.replace(/=/, 'CAP_COOKIE').split('CAP_COOKIE');
            key = decode(key).trim();
            value = decode(value).trim();
            cookieMap[key] = value;
        });
        return cookieMap;
    }
    async setCookie(options) {
        try {
            // Safely Encoded Key/Value
            const encodedKey = encode(options.key);
            const encodedValue = encode(options.value);
            // Clean & sanitize options
            const expires = `; expires=${(options.expires || '').replace('expires=', '')}`; // Default is "; expires="
            const path = (options.path || '/').replace('path=', ''); // Default is "path=/"
            const domain = options.url != null && options.url.length > 0
                ? `domain=${options.url}`
                : '';
            document.cookie = `${encodedKey}=${encodedValue || ''}${expires}; path=${path}; ${domain};`;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async deleteCookie(options) {
        try {
            document.cookie = `${options.key}=; Max-Age=0`;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async clearCookies() {
        try {
            const cookies = document.cookie.split(';') || [];
            for (const cookie of cookies) {
                document.cookie = cookie
                    .replace(/^ +/, '')
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async clearAllCookies() {
        try {
            await this.clearCookies();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
const CapacitorCookies = registerPlugin('CapacitorCookies', {
    web: () => new CapacitorCookiesPluginWeb(),
});
// UTILITY FUNCTIONS
/**
 * Read in a Blob value and return it as a base64 string
 * @param blob The blob value to convert to a base64 string
 */
const readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const base64String = reader.result;
        // remove prefix "data:application/pdf;base64,"
        resolve(base64String.indexOf(',') >= 0
            ? base64String.split(',')[1]
            : base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
});
/**
 * Normalize an HttpHeaders map by lowercasing all of the values
 * @param headers The HttpHeaders object to normalize
 */
const normalizeHttpHeaders = (headers = {}) => {
    const originalKeys = Object.keys(headers);
    const loweredKeys = Object.keys(headers).map(k => k.toLocaleLowerCase());
    const normalized = loweredKeys.reduce((acc, key, index) => {
        acc[key] = headers[originalKeys[index]];
        return acc;
    }, {});
    return normalized;
};
/**
 * Builds a string of url parameters that
 * @param params A map of url parameters
 * @param shouldEncode true if you should encodeURIComponent() the values (true by default)
 */
const buildUrlParams = (params, shouldEncode = true) => {
    if (!params)
        return null;
    const output = Object.entries(params).reduce((accumulator, entry) => {
        const [key, value] = entry;
        let encodedValue;
        let item;
        if (Array.isArray(value)) {
            item = '';
            value.forEach(str => {
                encodedValue = shouldEncode ? encodeURIComponent(str) : str;
                item += `${key}=${encodedValue}&`;
            });
            // last character will always be "&" so slice it off
            item.slice(0, -1);
        }
        else {
            encodedValue = shouldEncode ? encodeURIComponent(value) : value;
            item = `${key}=${encodedValue}`;
        }
        return `${accumulator}&${item}`;
    }, '');
    // Remove initial "&" from the reduce
    return output.substr(1);
};
/**
 * Build the RequestInit object based on the options passed into the initial request
 * @param options The Http plugin options
 * @param extra Any extra RequestInit values
 */
const buildRequestInit = (options, extra = {}) => {
    const output = Object.assign({ method: options.method || 'GET', headers: options.headers }, extra);
    // Get the content-type
    const headers = normalizeHttpHeaders(options.headers);
    const type = headers['content-type'] || '';
    // If body is already a string, then pass it through as-is.
    if (typeof options.data === 'string') {
        output.body = options.data;
    }
    // Build request initializers based off of content-type
    else if (type.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(options.data || {})) {
            params.set(key, value);
        }
        output.body = params.toString();
    }
    else if (type.includes('multipart/form-data')) {
        const form = new FormData();
        if (options.data instanceof FormData) {
            options.data.forEach((value, key) => {
                form.append(key, value);
            });
        }
        else {
            for (const key of Object.keys(options.data)) {
                form.append(key, options.data[key]);
            }
        }
        output.body = form;
        const headers = new Headers(output.headers);
        headers.delete('content-type'); // content-type will be set by `window.fetch` to includy boundary
        output.headers = headers;
    }
    else if (type.includes('application/json') ||
        typeof options.data === 'object') {
        output.body = JSON.stringify(options.data);
    }
    return output;
};
// WEB IMPLEMENTATION
class CapacitorHttpPluginWeb extends WebPlugin {
    /**
     * Perform an Http request given a set of options
     * @param options Options to build the HTTP request
     */
    async request(options) {
        const requestInit = buildRequestInit(options, options.webFetchExtra);
        const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
        const url = urlParams ? `${options.url}?${urlParams}` : options.url;
        const response = await fetch(url, requestInit);
        const contentType = response.headers.get('content-type') || '';
        // Default to 'text' responseType so no parsing happens
        let { responseType = 'text' } = response.ok ? options : {};
        // If the response content-type is json, force the response to be json
        if (contentType.includes('application/json')) {
            responseType = 'json';
        }
        let data;
        let blob;
        switch (responseType) {
            case 'arraybuffer':
            case 'blob':
                blob = await response.blob();
                data = await readBlobAsBase64(blob);
                break;
            case 'json':
                data = await response.json();
                break;
            case 'document':
            case 'text':
            default:
                data = await response.text();
        }
        // Convert fetch headers to Capacitor HttpHeaders
        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });
        return {
            data,
            headers,
            status: response.status,
            url: response.url,
        };
    }
    /**
     * Perform an Http GET request given a set of options
     * @param options Options to build the HTTP request
     */
    async get(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'GET' }));
    }
    /**
     * Perform an Http POST request given a set of options
     * @param options Options to build the HTTP request
     */
    async post(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'POST' }));
    }
    /**
     * Perform an Http PUT request given a set of options
     * @param options Options to build the HTTP request
     */
    async put(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'PUT' }));
    }
    /**
     * Perform an Http PATCH request given a set of options
     * @param options Options to build the HTTP request
     */
    async patch(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'PATCH' }));
    }
    /**
     * Perform an Http DELETE request given a set of options
     * @param options Options to build the HTTP request
     */
    async delete(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'DELETE' }));
    }
}
const CapacitorHttp = registerPlugin('CapacitorHttp', {
    web: () => new CapacitorHttpPluginWeb(),
});
/******** END HTTP PLUGIN ********/

__webpack_unused_export__ = Capacitor;
__webpack_unused_export__ = CapacitorCookies;
__webpack_unused_export__ = CapacitorException;
__webpack_unused_export__ = CapacitorHttp;
__webpack_unused_export__ = CapacitorPlatforms;
__webpack_unused_export__ = Plugins;
__webpack_unused_export__ = WebPlugin;
__webpack_unused_export__ = WebView;
__webpack_unused_export__ = addPlatform;
__webpack_unused_export__ = registerPlugin;
__webpack_unused_export__ = registerWebPlugin;
__webpack_unused_export__ = setPlatform;
//# sourceMappingURL=index.cjs.js.map


/***/ }),

/***/ 2282:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(285);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__(1637);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(2023);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.ends-with.js
var es_string_ends_with = __webpack_require__(7852);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__(3157);
// EXTERNAL MODULE: ./node_modules/jwt-decode/build/jwt-decode.cjs.js
var jwt_decode_cjs = __webpack_require__(4580);
var jwt_decode_cjs_default = /*#__PURE__*/__webpack_require__.n(jwt_decode_cjs);
;// CONCATENATED MODULE: ./projects/auth-js/core/auth-utils.ts









class AuthUtils {}

AuthUtils.isCordova = () => !!(window.cordova || window.phonegap || window.PhoneGap);

AuthUtils.isCapacitor = () => {
  var _window$Capacitor;

  return !!((_window$Capacitor = window.Capacitor) != null && _window$Capacitor.isNativePlatform());
};

AuthUtils.isNativeMobile = () => AuthUtils.isCapacitor() || AuthUtils.isCordova();

AuthUtils.decodeJwt = value => {
  try {
    if (value) {
      return jwt_decode_cjs_default()(value);
    }

    return value;
  } catch (_unused) {
    console.warn('[@badisi/auth-js] Access token was not decoded as it is not a valid JWT.');
    return value;
  }
};

AuthUtils.isUrlMatching = (url1, url2) => {
  if (url2 !== undefined) {
    const uri1 = new URL(url1, 'http://test');
    const uri2 = new URL(url2, 'http://test'); // Check pathnames

    if (uri2.pathname !== '' && uri2.pathname !== '/') {
      if (!uri1.pathname.includes(uri2.pathname)) {
        return false;
      }
    } // Check origins (if uri2 has one)


    if (uri2.origin !== 'http://test') {
      if (uri1.protocol !== uri2.protocol || uri1.origin !== uri2.origin || !`${uri1.origin}${uri1.pathname}}`.includes(`${uri2.origin}${uri2.pathname}`)) {
        return false;
      }
    } // Check search params


    let matching = true;
    uri2.searchParams.forEach((value, key) => {
      if (!uri1.searchParams.getAll(key).includes(value)) {
        matching = false;
      }
    });
    return matching;
  }

  return false;
};

AuthUtils.getBaseUrl = () => {
  var _document$querySelect;

  const baseUrl = document.baseURI || ((_document$querySelect = document.querySelector('base')) == null ? void 0 : _document$querySelect.href) || location.origin;
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
};

AuthUtils.stringToURL = url => {
  try {
    return new URL(url);
  } catch (_unused2) {
    const pathUrl = !url.startsWith('/') ? url : url.substring(1, url.length);
    return new URL(`${AuthUtils.getBaseUrl()}${pathUrl}`);
  }
};
;// CONCATENATED MODULE: ./projects/demo-app/web/auth-js/src/app/app.element.ts

const template = document.createElement('template');
template.innerHTML = `
    <demo-app-main>
        <demo-app-playground tabLabel="Playground"></demo-app-playground>
        <demo-app-debug tabLabel="Debug"></demo-app-debug>
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
`;
class AppElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot;

    super();
    this.demoAppMainEl = void 0;
    this.demoAppPlaygroundEl = void 0;
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
    this.demoAppPlaygroundEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('demo-app-playground');
    this.demoAppDebugEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('demo-app-debug');
    this.listenForHeaderEvents();
    this.listenForPlaygroundEvents();
    this.listenForAuthChanges();
  }

  disconnectedCallback() {
    this.authManagerSubs.forEach(sub => sub.unsubscribe());
    this.listeners.forEach(rm => rm());
  } // --- HELPER(s) ---


  async callPrivateApi(url, headers) {
    if (window.authManager && url) {
      var _await$window$authMan;

      const token = (_await$window$authMan = await window.authManager.getAccessToken()) != null ? _await$window$authMan : '';
      const req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          var _this$demoAppPlaygrou;

          // 4 = DONE
          let resp;

          try {
            var _req$responseText;

            resp = JSON.parse((_req$responseText = req.responseText) != null ? _req$responseText : '');
          } catch (_unused) {
            resp = `${req.status} ${req.statusText}`;
          }

          (_this$demoAppPlaygrou = this.demoAppPlaygroundEl) == null ? void 0 : _this$demoAppPlaygrou.setApiStatus(resp, req.status !== 200);
        }
      };

      req.open('GET', url, true);
      req.setRequestHeader('Authorization', `Bearer ${token}`);
      headers == null ? void 0 : headers.split(';').forEach(header => {
        if (header) {
          var _item$, _item$2;

          const item = header.split(':');
          req.setRequestHeader((_item$ = item[0]) == null ? void 0 : _item$.trim(), ((_item$2 = item[1]) == null ? void 0 : _item$2.trim()) || '');
        }
      });
      req.send();
    }
  }

  refreshInfo(key, value) {
    if (window.authManager) {
      if (this.demoAppMainEl && this.demoAppDebugEl) {
        switch (key) {
          case 'renewing':
            this.demoAppMainEl.isRenewing = value;
            break;

          case 'authenticated':
            this.demoAppMainEl.isAuthenticated = value;
            this.demoAppDebugEl.isAuthenticated = value;
            break;

          case 'userSession':
            this.demoAppDebugEl.userSession = value;
            break;

          case 'accessToken':
            this.demoAppDebugEl.accessToken = value;
            this.demoAppDebugEl.accessTokenDecoded = AuthUtils.decodeJwt(value);
            break;

          case 'idToken':
            this.demoAppDebugEl.idToken = value;
            this.demoAppDebugEl.idTokenDecoded = AuthUtils.decodeJwt(value);
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
      this.authManagerSubs.push(manager.onRenewingChanged(value => this.refreshInfo('renewing', value)), manager.onAuthenticatedChanged(value => this.refreshInfo('authenticated', value)), manager.onUserSessionChanged(value => this.refreshInfo('userSession', value)), manager.onAccessTokenChanged(value => this.refreshInfo('accessToken', value)), manager.onIdTokenChanged(value => this.refreshInfo('idToken', value)), manager.onUserProfileChanged(value => this.refreshInfo('userProfile', value)));
    }
  }

  listenForPlaygroundEvents() {
    if (this.demoAppPlaygroundEl) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const callApi = event => {
        var _event$detail, _event$detail2;

        return void this.callPrivateApi((_event$detail = event.detail) == null ? void 0 : _event$detail.url, (_event$detail2 = event.detail) == null ? void 0 : _event$detail2.headers);
      };

      this.demoAppPlaygroundEl.addEventListener('api', callApi);
      this.listeners.push(() => {
        var _this$demoAppPlaygrou2;

        return (_this$demoAppPlaygrou2 = this.demoAppPlaygroundEl) == null ? void 0 : _this$demoAppPlaygrou2.removeEventListener('api', callApi);
      });
    }
  }

  listenForHeaderEvents() {
    const manager = window.authManager;

    if (manager && this.demoAppMainEl) {
      const login = () => void manager.login();

      this.demoAppMainEl.addEventListener('login', login);

      const logout = () => void manager.logout('/').then(() => {
        var _document$querySelect;

        const baseUrl = document.baseURI || ((_document$querySelect = document.querySelector('base')) == null ? void 0 : _document$querySelect.href) || location.origin;
        location.href = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      });

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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
;// CONCATENATED MODULE: ./projects/auth-js/core/main.ts

const createAuthManager = async (settings, impl) => {
  const manager = new impl();
  await manager.init(settings);
  return manager;
};
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__(7727);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__(4603);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(9714);
;// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheClear.js
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/* harmony default export */ const _listCacheClear = (listCacheClear);

;// CONCATENATED MODULE: ./node_modules/lodash-es/eq.js
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/* harmony default export */ const lodash_es_eq = (eq);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_assocIndexOf.js


/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (lodash_es_eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/* harmony default export */ const _assocIndexOf = (assocIndexOf);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheDelete.js


/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/* harmony default export */ const _listCacheDelete = (listCacheDelete);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheGet.js


/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/* harmony default export */ const _listCacheGet = (listCacheGet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheHas.js


/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

/* harmony default export */ const _listCacheHas = (listCacheHas);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheSet.js


/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/* harmony default export */ const _listCacheSet = (listCacheSet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_ListCache.js






/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

/* harmony default export */ const _ListCache = (ListCache);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_stackClear.js


/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

/* harmony default export */ const _stackClear = (stackClear);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_stackDelete.js
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/* harmony default export */ const _stackDelete = (stackDelete);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_stackGet.js
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/* harmony default export */ const _stackGet = (stackGet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_stackHas.js
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/* harmony default export */ const _stackHas = (stackHas);

// EXTERNAL MODULE: ./node_modules/lodash-es/_root.js
var _root = __webpack_require__(6169);
;// CONCATENATED MODULE: ./node_modules/lodash-es/_Symbol.js


/** Built-in value references. */
var Symbol = _root/* default.Symbol */.Z.Symbol;

/* harmony default export */ const _Symbol = (Symbol);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_getRawTag.js


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ const _getRawTag = (getRawTag);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_objectToString.js
/** Used for built-in method references. */
var _objectToString_objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return _objectToString_nativeObjectToString.call(value);
}

/* harmony default export */ const _objectToString = (objectToString);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseGetTag.js




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (_baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

/* harmony default export */ const _baseGetTag = (baseGetTag);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isObject.js
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ const lodash_es_isObject = (isObject);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isFunction.js



/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!lodash_es_isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/* harmony default export */ const lodash_es_isFunction = (isFunction);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_coreJsData.js


/** Used to detect overreaching core-js shims. */
var coreJsData = _root/* default.__core-js_shared__ */.Z["__core-js_shared__"];

/* harmony default export */ const _coreJsData = (coreJsData);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_isMasked.js


/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/* harmony default export */ const _isMasked = (isMasked);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_toSource.js
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/* harmony default export */ const _toSource = (toSource);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseIsNative.js





/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var _baseIsNative_funcProto = Function.prototype,
    _baseIsNative_objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var _baseIsNative_funcToString = _baseIsNative_funcProto.toString;

/** Used to check objects for own properties. */
var _baseIsNative_hasOwnProperty = _baseIsNative_objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  _baseIsNative_funcToString.call(_baseIsNative_hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!lodash_es_isObject(value) || _isMasked(value)) {
    return false;
  }
  var pattern = lodash_es_isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

/* harmony default export */ const _baseIsNative = (baseIsNative);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_getValue.js
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/* harmony default export */ const _getValue = (getValue);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_getNative.js



/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

/* harmony default export */ const _getNative = (getNative);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_Map.js



/* Built-in method references that are verified to be native. */
var Map = _getNative(_root/* default */.Z, 'Map');

/* harmony default export */ const _Map = (Map);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_nativeCreate.js


/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

/* harmony default export */ const _nativeCreate = (nativeCreate);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_hashClear.js


/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

/* harmony default export */ const _hashClear = (hashClear);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_hashDelete.js
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/* harmony default export */ const _hashDelete = (hashDelete);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_hashGet.js


/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var _hashGet_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _hashGet_hasOwnProperty = _hashGet_objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return _hashGet_hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/* harmony default export */ const _hashGet = (hashGet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_hashHas.js


/** Used for built-in method references. */
var _hashHas_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _hashHas_hasOwnProperty = _hashHas_objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : _hashHas_hasOwnProperty.call(data, key);
}

/* harmony default export */ const _hashHas = (hashHas);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_hashSet.js


/** Used to stand-in for `undefined` hash values. */
var _hashSet_HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? _hashSet_HASH_UNDEFINED : value;
  return this;
}

/* harmony default export */ const _hashSet = (hashSet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_Hash.js






/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

/* harmony default export */ const _Hash = (Hash);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheClear.js




/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

/* harmony default export */ const _mapCacheClear = (mapCacheClear);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_isKeyable.js
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/* harmony default export */ const _isKeyable = (isKeyable);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_getMapData.js


/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/* harmony default export */ const _getMapData = (getMapData);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheDelete.js


/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/* harmony default export */ const _mapCacheDelete = (mapCacheDelete);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheGet.js


/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

/* harmony default export */ const _mapCacheGet = (mapCacheGet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheHas.js


/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

/* harmony default export */ const _mapCacheHas = (mapCacheHas);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheSet.js


/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/* harmony default export */ const _mapCacheSet = (mapCacheSet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_MapCache.js






/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

/* harmony default export */ const _MapCache = (MapCache);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_stackSet.js




/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/* harmony default export */ const _stackSet = (stackSet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_Stack.js







/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

/* harmony default export */ const _Stack = (Stack);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_defineProperty.js


var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/* harmony default export */ const _defineProperty = (defineProperty);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseAssignValue.js


/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/* harmony default export */ const _baseAssignValue = (baseAssignValue);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_assignMergeValue.js



/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !lodash_es_eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

/* harmony default export */ const _assignMergeValue = (assignMergeValue);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_createBaseFor.js
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/* harmony default export */ const _createBaseFor = (createBaseFor);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseFor.js


/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

/* harmony default export */ const _baseFor = (baseFor);

// EXTERNAL MODULE: ./node_modules/lodash-es/_cloneBuffer.js
var _cloneBuffer = __webpack_require__(2896);
;// CONCATENATED MODULE: ./node_modules/lodash-es/_Uint8Array.js


/** Built-in value references. */
var Uint8Array = _root/* default.Uint8Array */.Z.Uint8Array;

/* harmony default export */ const _Uint8Array = (Uint8Array);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_cloneArrayBuffer.js


/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

/* harmony default export */ const _cloneArrayBuffer = (cloneArrayBuffer);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_cloneTypedArray.js


/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/* harmony default export */ const _cloneTypedArray = (cloneTypedArray);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_copyArray.js
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/* harmony default export */ const _copyArray = (copyArray);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseCreate.js


/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!lodash_es_isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/* harmony default export */ const _baseCreate = (baseCreate);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_overArg.js
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ const _overArg = (overArg);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_getPrototype.js


/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

/* harmony default export */ const _getPrototype = (getPrototype);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_isPrototype.js
/** Used for built-in method references. */
var _isPrototype_objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || _isPrototype_objectProto;

  return value === proto;
}

/* harmony default export */ const _isPrototype = (isPrototype);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_initCloneObject.js




/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

/* harmony default export */ const _initCloneObject = (initCloneObject);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isObjectLike.js
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ const lodash_es_isObjectLike = (isObjectLike);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseIsArguments.js



/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return lodash_es_isObjectLike(value) && _baseGetTag(value) == argsTag;
}

/* harmony default export */ const _baseIsArguments = (baseIsArguments);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isArguments.js



/** Used for built-in method references. */
var isArguments_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var isArguments_hasOwnProperty = isArguments_objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = isArguments_objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return lodash_es_isObjectLike(value) && isArguments_hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/* harmony default export */ const lodash_es_isArguments = (isArguments);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isArray.js
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/* harmony default export */ const lodash_es_isArray = (isArray);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/* harmony default export */ const lodash_es_isLength = (isLength);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isArrayLike.js



/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && lodash_es_isLength(value.length) && !lodash_es_isFunction(value);
}

/* harmony default export */ const lodash_es_isArrayLike = (isArrayLike);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isArrayLikeObject.js



/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return lodash_es_isObjectLike(value) && lodash_es_isArrayLike(value);
}

/* harmony default export */ const lodash_es_isArrayLikeObject = (isArrayLikeObject);

// EXTERNAL MODULE: ./node_modules/lodash-es/isBuffer.js + 1 modules
var isBuffer = __webpack_require__(9591);
;// CONCATENATED MODULE: ./node_modules/lodash-es/isPlainObject.js




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var isPlainObject_funcProto = Function.prototype,
    isPlainObject_objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var isPlainObject_funcToString = isPlainObject_funcProto.toString;

/** Used to check objects for own properties. */
var isPlainObject_hasOwnProperty = isPlainObject_objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = isPlainObject_funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!lodash_es_isObjectLike(value) || _baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = _getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = isPlainObject_hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    isPlainObject_funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ const lodash_es_isPlainObject = (isPlainObject);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseIsTypedArray.js




/** `Object#toString` result references. */
var _baseIsTypedArray_argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    _baseIsTypedArray_funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    _baseIsTypedArray_objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[_baseIsTypedArray_argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[_baseIsTypedArray_funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[_baseIsTypedArray_objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return lodash_es_isObjectLike(value) &&
    lodash_es_isLength(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

/* harmony default export */ const _baseIsTypedArray = (baseIsTypedArray);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseUnary.js
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/* harmony default export */ const _baseUnary = (baseUnary);

// EXTERNAL MODULE: ./node_modules/lodash-es/_nodeUtil.js
var _nodeUtil = __webpack_require__(9730);
;// CONCATENATED MODULE: ./node_modules/lodash-es/isTypedArray.js




/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil/* default */.Z && _nodeUtil/* default.isTypedArray */.Z.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

/* harmony default export */ const lodash_es_isTypedArray = (isTypedArray);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_safeGet.js
/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/* harmony default export */ const _safeGet = (safeGet);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_assignValue.js



/** Used for built-in method references. */
var _assignValue_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _assignValue_hasOwnProperty = _assignValue_objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(_assignValue_hasOwnProperty.call(object, key) && lodash_es_eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

/* harmony default export */ const _assignValue = (assignValue);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_copyObject.js



/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

/* harmony default export */ const _copyObject = (copyObject);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseTimes.js
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/* harmony default export */ const _baseTimes = (baseTimes);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_isIndex.js
/** Used as references for various `Number` constants. */
var _isIndex_MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? _isIndex_MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/* harmony default export */ const _isIndex = (isIndex);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_arrayLikeKeys.js







/** Used for built-in method references. */
var _arrayLikeKeys_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _arrayLikeKeys_hasOwnProperty = _arrayLikeKeys_objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = lodash_es_isArray(value),
      isArg = !isArr && lodash_es_isArguments(value),
      isBuff = !isArr && !isArg && (0,isBuffer/* default */.Z)(value),
      isType = !isArr && !isArg && !isBuff && lodash_es_isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || _arrayLikeKeys_hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/* harmony default export */ const _arrayLikeKeys = (arrayLikeKeys);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_nativeKeysIn.js
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/* harmony default export */ const _nativeKeysIn = (nativeKeysIn);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseKeysIn.js




/** Used for built-in method references. */
var _baseKeysIn_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _baseKeysIn_hasOwnProperty = _baseKeysIn_objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!lodash_es_isObject(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !_baseKeysIn_hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/* harmony default export */ const _baseKeysIn = (baseKeysIn);

;// CONCATENATED MODULE: ./node_modules/lodash-es/keysIn.js




/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return lodash_es_isArrayLike(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

/* harmony default export */ const lodash_es_keysIn = (keysIn);

;// CONCATENATED MODULE: ./node_modules/lodash-es/toPlainObject.js



/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return _copyObject(value, lodash_es_keysIn(value));
}

/* harmony default export */ const lodash_es_toPlainObject = (toPlainObject);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseMergeDeep.js
















/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key),
      srcValue = _safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    _assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = lodash_es_isArray(srcValue),
        isBuff = !isArr && (0,isBuffer/* default */.Z)(srcValue),
        isTyped = !isArr && !isBuff && lodash_es_isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (lodash_es_isArray(objValue)) {
        newValue = objValue;
      }
      else if (lodash_es_isArrayLikeObject(objValue)) {
        newValue = _copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = (0,_cloneBuffer/* default */.Z)(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (lodash_es_isPlainObject(srcValue) || lodash_es_isArguments(srcValue)) {
      newValue = objValue;
      if (lodash_es_isArguments(objValue)) {
        newValue = lodash_es_toPlainObject(objValue);
      }
      else if (!lodash_es_isObject(objValue) || lodash_es_isFunction(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  _assignMergeValue(object, key, newValue);
}

/* harmony default export */ const _baseMergeDeep = (baseMergeDeep);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseMerge.js








/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, function(srcValue, key) {
    stack || (stack = new _Stack);
    if (lodash_es_isObject(srcValue)) {
      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, lodash_es_keysIn);
}

/* harmony default export */ const _baseMerge = (baseMerge);

;// CONCATENATED MODULE: ./node_modules/lodash-es/identity.js
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/* harmony default export */ const lodash_es_identity = (identity);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_apply.js
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/* harmony default export */ const _apply = (apply);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_overRest.js


/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

/* harmony default export */ const _overRest = (overRest);

;// CONCATENATED MODULE: ./node_modules/lodash-es/constant.js
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/* harmony default export */ const lodash_es_constant = (constant);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseSetToString.js




/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty ? lodash_es_identity : function(func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': lodash_es_constant(string),
    'writable': true
  });
};

/* harmony default export */ const _baseSetToString = (baseSetToString);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_shortOut.js
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/* harmony default export */ const _shortOut = (shortOut);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_setToString.js



/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

/* harmony default export */ const _setToString = (setToString);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseRest.js




/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, lodash_es_identity), func + '');
}

/* harmony default export */ const _baseRest = (baseRest);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_isIterateeCall.js





/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!lodash_es_isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (lodash_es_isArrayLike(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return lodash_es_eq(object[index], value);
  }
  return false;
}

/* harmony default export */ const _isIterateeCall = (isIterateeCall);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_createAssigner.js



/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/* harmony default export */ const _createAssigner = (createAssigner);

;// CONCATENATED MODULE: ./node_modules/lodash-es/merge.js



/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = _createAssigner(function(object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});

/* harmony default export */ const lodash_es_merge = (merge);

// EXTERNAL MODULE: ./node_modules/crypto-js/core.js
var core = __webpack_require__(8249);
var core_default = /*#__PURE__*/__webpack_require__.n(core);
// EXTERNAL MODULE: ./node_modules/crypto-js/sha256.js
var sha256 = __webpack_require__(2153);
var sha256_default = /*#__PURE__*/__webpack_require__.n(sha256);
// EXTERNAL MODULE: ./node_modules/crypto-js/enc-base64.js
var enc_base64 = __webpack_require__(8269);
var enc_base64_default = /*#__PURE__*/__webpack_require__.n(enc_base64);
// EXTERNAL MODULE: ./node_modules/crypto-js/enc-utf8.js
var enc_utf8 = __webpack_require__(5743);
var enc_utf8_default = /*#__PURE__*/__webpack_require__.n(enc_utf8);
;// CONCATENATED MODULE: ./node_modules/oidc-client-ts/dist/esm/oidc-client-ts.js
// src/utils/CryptoUtils.ts





// src/utils/Logger.ts
var nopLogger = {
  debug: () => void 0,
  info: () => void 0,
  warn: () => void 0,
  error: () => void 0
};
var level;
var logger;
var Log = /* @__PURE__ */ ((Log2) => {
  Log2[Log2["NONE"] = 0] = "NONE";
  Log2[Log2["ERROR"] = 1] = "ERROR";
  Log2[Log2["WARN"] = 2] = "WARN";
  Log2[Log2["INFO"] = 3] = "INFO";
  Log2[Log2["DEBUG"] = 4] = "DEBUG";
  return Log2;
})(Log || {});
((Log2) => {
  function reset() {
    level = 3 /* INFO */;
    logger = nopLogger;
  }
  Log2.reset = reset;
  function setLevel(value) {
    if (!(0 /* NONE */ <= value && value <= 4 /* DEBUG */)) {
      throw new Error("Invalid log level");
    }
    level = value;
  }
  Log2.setLevel = setLevel;
  function setLogger(value) {
    logger = value;
  }
  Log2.setLogger = setLogger;
})(Log || (Log = {}));
var Logger = class {
  constructor(_name) {
    this._name = _name;
  }
  debug(...args) {
    if (level >= 4 /* DEBUG */) {
      logger.debug(Logger._format(this._name, this._method), ...args);
    }
  }
  info(...args) {
    if (level >= 3 /* INFO */) {
      logger.info(Logger._format(this._name, this._method), ...args);
    }
  }
  warn(...args) {
    if (level >= 2 /* WARN */) {
      logger.warn(Logger._format(this._name, this._method), ...args);
    }
  }
  error(...args) {
    if (level >= 1 /* ERROR */) {
      logger.error(Logger._format(this._name, this._method), ...args);
    }
  }
  throw(err) {
    this.error(err);
    throw err;
  }
  create(method) {
    const methodLogger = Object.create(this);
    methodLogger._method = method;
    methodLogger.debug("begin");
    return methodLogger;
  }
  static createStatic(name, staticMethod) {
    const staticLogger = new Logger(`${name}.${staticMethod}`);
    staticLogger.debug("begin");
    return staticLogger;
  }
  static _format(name, method) {
    const prefix = `[${name}]`;
    return method ? `${prefix} ${method}:` : prefix;
  }
  static debug(name, ...args) {
    if (level >= 4 /* DEBUG */) {
      logger.debug(Logger._format(name), ...args);
    }
  }
  static info(name, ...args) {
    if (level >= 3 /* INFO */) {
      logger.info(Logger._format(name), ...args);
    }
  }
  static warn(name, ...args) {
    if (level >= 2 /* WARN */) {
      logger.warn(Logger._format(name), ...args);
    }
  }
  static error(name, ...args) {
    if (level >= 1 /* ERROR */) {
      logger.error(Logger._format(name), ...args);
    }
  }
};
Log.reset();

// src/utils/CryptoUtils.ts
var UUID_V4_TEMPLATE = "10000000-1000-4000-8000-100000000000";
var CryptoUtils = class {
  static _randomWord() {
    return core_default().lib.WordArray.random(1).words[0];
  }
  static generateUUIDv4() {
    const uuid = UUID_V4_TEMPLATE.replace(
      /[018]/g,
      (c) => (+c ^ CryptoUtils._randomWord() & 15 >> +c / 4).toString(16)
    );
    return uuid.replace(/-/g, "");
  }
  static generateCodeVerifier() {
    return CryptoUtils.generateUUIDv4() + CryptoUtils.generateUUIDv4() + CryptoUtils.generateUUIDv4();
  }
  static generateCodeChallenge(code_verifier) {
    try {
      const hashed = sha256_default()(code_verifier);
      return enc_base64_default().stringify(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (err) {
      Logger.error("CryptoUtils.generateCodeChallenge", err);
      throw err;
    }
  }
  static generateBasicAuth(client_id, client_secret) {
    const basicAuth = enc_utf8_default().parse([client_id, client_secret].join(":"));
    return enc_base64_default().stringify(basicAuth);
  }
};

// src/utils/Event.ts
var oidc_client_ts_Event = class {
  constructor(_name) {
    this._name = _name;
    this._logger = new Logger(`Event('${this._name}')`);
    this._callbacks = [];
  }
  addHandler(cb) {
    this._callbacks.push(cb);
    return () => this.removeHandler(cb);
  }
  removeHandler(cb) {
    const idx = this._callbacks.lastIndexOf(cb);
    if (idx >= 0) {
      this._callbacks.splice(idx, 1);
    }
  }
  raise(...ev) {
    this._logger.debug("raise:", ...ev);
    for (const cb of this._callbacks) {
      void cb(...ev);
    }
  }
};

// src/utils/JwtUtils.ts

var JwtUtils = class {
  static decode(token) {
    try {
      return jwt_decode_cjs_default()(token);
    } catch (err) {
      Logger.error("JwtUtils.decode", err);
      throw err;
    }
  }
};

// src/utils/PopupUtils.ts
var PopupUtils = class {
  static center({ ...features }) {
    var _a, _b, _c;
    if (features.width == null)
      features.width = (_a = [800, 720, 600, 480].find((width) => width <= window.outerWidth / 1.618)) != null ? _a : 360;
    (_b = features.left) != null ? _b : features.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - features.width) / 2));
    if (features.height != null)
      (_c = features.top) != null ? _c : features.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - features.height) / 2));
    return features;
  }
  static serialize(features) {
    return Object.entries(features).filter(([, value]) => value != null).map(([key, value]) => `${key}=${typeof value !== "boolean" ? value : value ? "yes" : "no"}`).join(",");
  }
};

// src/utils/Timer.ts
var Timer = class extends oidc_client_ts_Event {
  constructor() {
    super(...arguments);
    this._logger = new Logger(`Timer('${this._name}')`);
    this._timerHandle = null;
    this._expiration = 0;
    this._callback = () => {
      const diff = this._expiration - Timer.getEpochTime();
      this._logger.debug("timer completes in", diff);
      if (this._expiration <= Timer.getEpochTime()) {
        this.cancel();
        super.raise();
      }
    };
  }
  static getEpochTime() {
    return Math.floor(Date.now() / 1e3);
  }
  init(durationInSeconds) {
    const logger2 = this._logger.create("init");
    durationInSeconds = Math.max(Math.floor(durationInSeconds), 1);
    const expiration = Timer.getEpochTime() + durationInSeconds;
    if (this.expiration === expiration && this._timerHandle) {
      logger2.debug("skipping since already initialized for expiration at", this.expiration);
      return;
    }
    this.cancel();
    logger2.debug("using duration", durationInSeconds);
    this._expiration = expiration;
    const timerDurationInSeconds = Math.min(durationInSeconds, 5);
    this._timerHandle = setInterval(this._callback, timerDurationInSeconds * 1e3);
  }
  get expiration() {
    return this._expiration;
  }
  cancel() {
    this._logger.create("cancel");
    if (this._timerHandle) {
      clearInterval(this._timerHandle);
      this._timerHandle = null;
    }
  }
};

// src/utils/UrlUtils.ts
var UrlUtils = class {
  static readParams(url, responseMode = "query") {
    if (!url)
      throw new TypeError("Invalid URL");
    const parsedUrl = new URL(url, window.location.origin);
    const params = parsedUrl[responseMode === "fragment" ? "hash" : "search"];
    return new URLSearchParams(params.slice(1));
  }
};

// src/errors/ErrorResponse.ts
var ErrorResponse = class extends Error {
  constructor(args, form) {
    var _a, _b, _c;
    super(args.error_description || args.error || "");
    this.form = form;
    this.name = "ErrorResponse";
    if (!args.error) {
      Logger.error("ErrorResponse", "No error passed");
      throw new Error("No error passed");
    }
    this.error = args.error;
    this.error_description = (_a = args.error_description) != null ? _a : null;
    this.error_uri = (_b = args.error_uri) != null ? _b : null;
    this.state = args.userState;
    this.session_state = (_c = args.session_state) != null ? _c : null;
  }
};

// src/errors/ErrorTimeout.ts
var ErrorTimeout = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ErrorTimeout";
  }
};

// src/AccessTokenEvents.ts
var AccessTokenEvents = class {
  constructor(args) {
    this._logger = new Logger("AccessTokenEvents");
    this._expiringTimer = new Timer("Access token expiring");
    this._expiredTimer = new Timer("Access token expired");
    this._expiringNotificationTimeInSeconds = args.expiringNotificationTimeInSeconds;
  }
  load(container) {
    const logger2 = this._logger.create("load");
    if (container.access_token && container.expires_in !== void 0) {
      const duration = container.expires_in;
      logger2.debug("access token present, remaining duration:", duration);
      if (duration > 0) {
        let expiring = duration - this._expiringNotificationTimeInSeconds;
        if (expiring <= 0) {
          expiring = 1;
        }
        logger2.debug("registering expiring timer, raising in", expiring, "seconds");
        this._expiringTimer.init(expiring);
      } else {
        logger2.debug("canceling existing expiring timer because we're past expiration.");
        this._expiringTimer.cancel();
      }
      const expired = duration + 1;
      logger2.debug("registering expired timer, raising in", expired, "seconds");
      this._expiredTimer.init(expired);
    } else {
      this._expiringTimer.cancel();
      this._expiredTimer.cancel();
    }
  }
  unload() {
    this._logger.debug("unload: canceling existing access token timers");
    this._expiringTimer.cancel();
    this._expiredTimer.cancel();
  }
  addAccessTokenExpiring(cb) {
    return this._expiringTimer.addHandler(cb);
  }
  removeAccessTokenExpiring(cb) {
    this._expiringTimer.removeHandler(cb);
  }
  addAccessTokenExpired(cb) {
    return this._expiredTimer.addHandler(cb);
  }
  removeAccessTokenExpired(cb) {
    this._expiredTimer.removeHandler(cb);
  }
};

// src/CheckSessionIFrame.ts
var CheckSessionIFrame = class {
  constructor(_callback, _client_id, url, _intervalInSeconds, _stopOnError) {
    this._callback = _callback;
    this._client_id = _client_id;
    this._intervalInSeconds = _intervalInSeconds;
    this._stopOnError = _stopOnError;
    this._logger = new Logger("CheckSessionIFrame");
    this._timer = null;
    this._session_state = null;
    this._message = (e) => {
      if (e.origin === this._frame_origin && e.source === this._frame.contentWindow) {
        if (e.data === "error") {
          this._logger.error("error message from check session op iframe");
          if (this._stopOnError) {
            this.stop();
          }
        } else if (e.data === "changed") {
          this._logger.debug("changed message from check session op iframe");
          this.stop();
          void this._callback();
        } else {
          this._logger.debug(e.data + " message from check session op iframe");
        }
      }
    };
    const parsedUrl = new URL(url);
    this._frame_origin = parsedUrl.origin;
    this._frame = window.document.createElement("iframe");
    this._frame.style.visibility = "hidden";
    this._frame.style.position = "fixed";
    this._frame.style.left = "-1000px";
    this._frame.style.top = "0";
    this._frame.width = "0";
    this._frame.height = "0";
    this._frame.src = parsedUrl.href;
  }
  load() {
    return new Promise((resolve) => {
      this._frame.onload = () => {
        resolve();
      };
      window.document.body.appendChild(this._frame);
      window.addEventListener("message", this._message, false);
    });
  }
  start(session_state) {
    if (this._session_state === session_state) {
      return;
    }
    this._logger.create("start");
    this.stop();
    this._session_state = session_state;
    const send = () => {
      if (!this._frame.contentWindow || !this._session_state) {
        return;
      }
      this._frame.contentWindow.postMessage(this._client_id + " " + this._session_state, this._frame_origin);
    };
    send();
    this._timer = setInterval(send, this._intervalInSeconds * 1e3);
  }
  stop() {
    this._logger.create("stop");
    this._session_state = null;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
};

// src/InMemoryWebStorage.ts
var InMemoryWebStorage = class {
  constructor() {
    this._logger = new Logger("InMemoryWebStorage");
    this._data = {};
  }
  clear() {
    this._logger.create("clear");
    this._data = {};
  }
  getItem(key) {
    this._logger.create(`getItem('${key}')`);
    return this._data[key];
  }
  setItem(key, value) {
    this._logger.create(`setItem('${key}')`);
    this._data[key] = value;
  }
  removeItem(key) {
    this._logger.create(`removeItem('${key}')`);
    delete this._data[key];
  }
  get length() {
    return Object.getOwnPropertyNames(this._data).length;
  }
  key(index) {
    return Object.getOwnPropertyNames(this._data)[index];
  }
};

// src/JsonService.ts
var JsonService = class {
  constructor(additionalContentTypes = [], _jwtHandler = null) {
    this._jwtHandler = _jwtHandler;
    this._logger = new Logger("JsonService");
    this._contentTypes = [];
    this._contentTypes.push(...additionalContentTypes, "application/json");
    if (_jwtHandler) {
      this._contentTypes.push("application/jwt");
    }
  }
  async fetchWithTimeout(input, init = {}) {
    const { timeoutInSeconds, ...initFetch } = init;
    if (!timeoutInSeconds) {
      return await fetch(input, initFetch);
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutInSeconds * 1e3);
    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal
      });
      return response;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw new ErrorTimeout("Network timed out");
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  async getJson(url, {
    token,
    credentials
  } = {}) {
    const logger2 = this._logger.create("getJson");
    const headers = {
      "Accept": this._contentTypes.join(", ")
    };
    if (token) {
      logger2.debug("token passed, setting Authorization header");
      headers["Authorization"] = "Bearer " + token;
    }
    let response;
    try {
      logger2.debug("url:", url);
      response = await this.fetchWithTimeout(url, { method: "GET", headers, credentials });
    } catch (err) {
      logger2.error("Network Error");
      throw err;
    }
    logger2.debug("HTTP response received, status", response.status);
    const contentType = response.headers.get("Content-Type");
    if (contentType && !this._contentTypes.find((item) => contentType.startsWith(item))) {
      logger2.throw(new Error(`Invalid response Content-Type: ${contentType != null ? contentType : "undefined"}, from URL: ${url}`));
    }
    if (response.ok && this._jwtHandler && (contentType == null ? void 0 : contentType.startsWith("application/jwt"))) {
      return await this._jwtHandler(await response.text());
    }
    let json;
    try {
      json = await response.json();
    } catch (err) {
      logger2.error("Error parsing JSON response", err);
      if (response.ok)
        throw err;
      throw new Error(`${response.statusText} (${response.status})`);
    }
    if (!response.ok) {
      logger2.error("Error from server:", json);
      if (json.error) {
        throw new ErrorResponse(json);
      }
      throw new Error(`${response.statusText} (${response.status}): ${JSON.stringify(json)}`);
    }
    return json;
  }
  async postForm(url, {
    body,
    basicAuth,
    timeoutInSeconds,
    initCredentials
  }) {
    const logger2 = this._logger.create("postForm");
    const headers = {
      "Accept": this._contentTypes.join(", "),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    if (basicAuth !== void 0) {
      headers["Authorization"] = "Basic " + basicAuth;
    }
    let response;
    try {
      logger2.debug("url:", url);
      response = await this.fetchWithTimeout(url, { method: "POST", headers, body, timeoutInSeconds, credentials: initCredentials });
    } catch (err) {
      logger2.error("Network error");
      throw err;
    }
    logger2.debug("HTTP response received, status", response.status);
    const contentType = response.headers.get("Content-Type");
    if (contentType && !this._contentTypes.find((item) => contentType.startsWith(item))) {
      throw new Error(`Invalid response Content-Type: ${contentType != null ? contentType : "undefined"}, from URL: ${url}`);
    }
    const responseText = await response.text();
    let json = {};
    if (responseText) {
      try {
        json = JSON.parse(responseText);
      } catch (err) {
        logger2.error("Error parsing JSON response", err);
        if (response.ok)
          throw err;
        throw new Error(`${response.statusText} (${response.status})`);
      }
    }
    if (!response.ok) {
      logger2.error("Error from server:", json);
      if (json.error) {
        throw new ErrorResponse(json, body);
      }
      throw new Error(`${response.statusText} (${response.status}): ${JSON.stringify(json)}`);
    }
    return json;
  }
};

// src/MetadataService.ts
var MetadataService = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("MetadataService");
    this._jsonService = new JsonService(["application/jwk-set+json"]);
    this._signingKeys = null;
    this._metadata = null;
    this._metadataUrl = this._settings.metadataUrl;
    if (this._settings.signingKeys) {
      this._logger.debug("using signingKeys from settings");
      this._signingKeys = this._settings.signingKeys;
    }
    if (this._settings.metadata) {
      this._logger.debug("using metadata from settings");
      this._metadata = this._settings.metadata;
    }
    if (this._settings.fetchRequestCredentials) {
      this._logger.debug("using fetchRequestCredentials from settings");
      this._fetchRequestCredentials = this._settings.fetchRequestCredentials;
    }
  }
  resetSigningKeys() {
    this._signingKeys = null;
  }
  async getMetadata() {
    const logger2 = this._logger.create("getMetadata");
    if (this._metadata) {
      logger2.debug("using cached values");
      return this._metadata;
    }
    if (!this._metadataUrl) {
      logger2.throw(new Error("No authority or metadataUrl configured on settings"));
      throw null;
    }
    logger2.debug("getting metadata from", this._metadataUrl);
    const metadata = await this._jsonService.getJson(this._metadataUrl, { credentials: this._fetchRequestCredentials });
    logger2.debug("merging remote JSON with seed metadata");
    this._metadata = Object.assign({}, this._settings.metadataSeed, metadata);
    return this._metadata;
  }
  getIssuer() {
    return this._getMetadataProperty("issuer");
  }
  getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  }
  getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  }
  getTokenEndpoint(optional = true) {
    return this._getMetadataProperty("token_endpoint", optional);
  }
  getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", true);
  }
  getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", true);
  }
  getRevocationEndpoint(optional = true) {
    return this._getMetadataProperty("revocation_endpoint", optional);
  }
  getKeysEndpoint(optional = true) {
    return this._getMetadataProperty("jwks_uri", optional);
  }
  async _getMetadataProperty(name, optional = false) {
    const logger2 = this._logger.create(`_getMetadataProperty('${name}')`);
    const metadata = await this.getMetadata();
    logger2.debug("resolved");
    if (metadata[name] === void 0) {
      if (optional === true) {
        logger2.warn("Metadata does not contain optional property");
        return void 0;
      }
      logger2.throw(new Error("Metadata does not contain property " + name));
    }
    return metadata[name];
  }
  async getSigningKeys() {
    const logger2 = this._logger.create("getSigningKeys");
    if (this._signingKeys) {
      logger2.debug("returning signingKeys from cache");
      return this._signingKeys;
    }
    const jwks_uri = await this.getKeysEndpoint(false);
    logger2.debug("got jwks_uri", jwks_uri);
    const keySet = await this._jsonService.getJson(jwks_uri);
    logger2.debug("got key set", keySet);
    if (!Array.isArray(keySet.keys)) {
      logger2.throw(new Error("Missing keys on keyset"));
      throw null;
    }
    this._signingKeys = keySet.keys;
    return this._signingKeys;
  }
};

// src/WebStorageStateStore.ts
var WebStorageStateStore = class {
  constructor({
    prefix = "oidc.",
    store = localStorage
  } = {}) {
    this._logger = new Logger("WebStorageStateStore");
    this._store = store;
    this._prefix = prefix;
  }
  async set(key, value) {
    this._logger.create(`set('${key}')`);
    key = this._prefix + key;
    await this._store.setItem(key, value);
  }
  async get(key) {
    this._logger.create(`get('${key}')`);
    key = this._prefix + key;
    const item = await this._store.getItem(key);
    return item;
  }
  async remove(key) {
    this._logger.create(`remove('${key}')`);
    key = this._prefix + key;
    const item = await this._store.getItem(key);
    await this._store.removeItem(key);
    return item;
  }
  async getAllKeys() {
    this._logger.create("getAllKeys");
    const len = await this._store.length;
    const keys = [];
    for (let index = 0; index < len; index++) {
      const key = await this._store.key(index);
      if (key && key.indexOf(this._prefix) === 0) {
        keys.push(key.substr(this._prefix.length));
      }
    }
    return keys;
  }
};

// src/OidcClientSettings.ts
var DefaultResponseType = "code";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post";
var DefaultResponseMode = "query";
var DefaultStaleStateAgeInSeconds = 60 * 15;
var DefaultClockSkewInSeconds = 60 * 5;
var OidcClientSettingsStore = class {
  constructor({
    authority,
    metadataUrl,
    metadata,
    signingKeys,
    metadataSeed,
    client_id,
    client_secret,
    response_type = DefaultResponseType,
    scope = DefaultScope,
    redirect_uri,
    post_logout_redirect_uri,
    client_authentication = DefaultClientAuthentication,
    prompt,
    display,
    max_age,
    ui_locales,
    acr_values,
    resource,
    response_mode = DefaultResponseMode,
    filterProtocolClaims = true,
    loadUserInfo = false,
    staleStateAgeInSeconds = DefaultStaleStateAgeInSeconds,
    clockSkewInSeconds = DefaultClockSkewInSeconds,
    userInfoJwtIssuer = "OP",
    mergeClaims = false,
    stateStore,
    refreshTokenCredentials,
    revokeTokenAdditionalContentTypes,
    fetchRequestCredentials,
    extraQueryParams = {},
    extraTokenParams = {}
  }) {
    this.authority = authority;
    if (metadataUrl) {
      this.metadataUrl = metadataUrl;
    } else {
      this.metadataUrl = authority;
      if (authority) {
        if (!this.metadataUrl.endsWith("/")) {
          this.metadataUrl += "/";
        }
        this.metadataUrl += ".well-known/openid-configuration";
      }
    }
    this.metadata = metadata;
    this.metadataSeed = metadataSeed;
    this.signingKeys = signingKeys;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.response_type = response_type;
    this.scope = scope;
    this.redirect_uri = redirect_uri;
    this.post_logout_redirect_uri = post_logout_redirect_uri;
    this.client_authentication = client_authentication;
    this.prompt = prompt;
    this.display = display;
    this.max_age = max_age;
    this.ui_locales = ui_locales;
    this.acr_values = acr_values;
    this.resource = resource;
    this.response_mode = response_mode;
    this.filterProtocolClaims = !!filterProtocolClaims;
    this.loadUserInfo = !!loadUserInfo;
    this.staleStateAgeInSeconds = staleStateAgeInSeconds;
    this.clockSkewInSeconds = clockSkewInSeconds;
    this.userInfoJwtIssuer = userInfoJwtIssuer;
    this.mergeClaims = !!mergeClaims;
    this.revokeTokenAdditionalContentTypes = revokeTokenAdditionalContentTypes;
    if (fetchRequestCredentials && refreshTokenCredentials) {
      console.warn("Both fetchRequestCredentials and refreshTokenCredentials is set. Only fetchRequestCredentials will be used.");
    }
    this.fetchRequestCredentials = fetchRequestCredentials ? fetchRequestCredentials : refreshTokenCredentials ? refreshTokenCredentials : "same-origin";
    if (stateStore) {
      this.stateStore = stateStore;
    } else {
      const store = typeof window !== "undefined" ? window.localStorage : new InMemoryWebStorage();
      this.stateStore = new WebStorageStateStore({ store });
    }
    this.extraQueryParams = extraQueryParams;
    this.extraTokenParams = extraTokenParams;
  }
};

// src/UserInfoService.ts
var UserInfoService = class {
  constructor(_settings, _metadataService) {
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new Logger("UserInfoService");
    this._getClaimsFromJwt = async (responseText) => {
      const logger2 = this._logger.create("_getClaimsFromJwt");
      try {
        const payload = JwtUtils.decode(responseText);
        logger2.debug("JWT decoding successful");
        return payload;
      } catch (err) {
        logger2.error("Error parsing JWT response");
        throw err;
      }
    };
    this._jsonService = new JsonService(void 0, this._getClaimsFromJwt);
  }
  async getClaims(token) {
    const logger2 = this._logger.create("getClaims");
    if (!token) {
      this._logger.throw(new Error("No token passed"));
    }
    const url = await this._metadataService.getUserInfoEndpoint();
    logger2.debug("got userinfo url", url);
    const claims = await this._jsonService.getJson(url, {
      token,
      credentials: this._settings.fetchRequestCredentials
    });
    logger2.debug("got claims", claims);
    return claims;
  }
};

// src/TokenClient.ts
var TokenClient = class {
  constructor(_settings, _metadataService) {
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new Logger("TokenClient");
    this._jsonService = new JsonService(this._settings.revokeTokenAdditionalContentTypes);
  }
  async exchangeCode({
    grant_type = "authorization_code",
    redirect_uri = this._settings.redirect_uri,
    client_id = this._settings.client_id,
    client_secret = this._settings.client_secret,
    ...args
  }) {
    const logger2 = this._logger.create("exchangeCode");
    if (!client_id) {
      logger2.throw(new Error("A client_id is required"));
    }
    if (!redirect_uri) {
      logger2.throw(new Error("A redirect_uri is required"));
    }
    if (!args.code) {
      logger2.throw(new Error("A code is required"));
    }
    if (!args.code_verifier) {
      logger2.throw(new Error("A code_verifier is required"));
    }
    const params = new URLSearchParams({ grant_type, redirect_uri });
    for (const [key, value] of Object.entries(args)) {
      if (value != null) {
        params.set(key, value);
      }
    }
    let basicAuth;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!client_secret) {
          logger2.throw(new Error("A client_secret is required"));
          throw null;
        }
        basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
        break;
      case "client_secret_post":
        params.append("client_id", client_id);
        if (client_secret) {
          params.append("client_secret", client_secret);
        }
        break;
    }
    const url = await this._metadataService.getTokenEndpoint(false);
    logger2.debug("got token endpoint");
    const response = await this._jsonService.postForm(url, { body: params, basicAuth, initCredentials: this._settings.fetchRequestCredentials });
    logger2.debug("got response");
    return response;
  }
  async exchangeCredentials({
    grant_type = "password",
    client_id = this._settings.client_id,
    client_secret = this._settings.client_secret,
    scope = this._settings.scope,
    username,
    password
  }) {
    const logger2 = this._logger.create("exchangeCredentials");
    if (!client_id) {
      logger2.throw(new Error("A client_id is required"));
    }
    const params = new URLSearchParams({ grant_type, username, password, scope });
    let basicAuth;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!client_secret) {
          logger2.throw(new Error("A client_secret is required"));
          throw null;
        }
        basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
        break;
      case "client_secret_post":
        params.append("client_id", client_id);
        if (client_secret) {
          params.append("client_secret", client_secret);
        }
        break;
    }
    const url = await this._metadataService.getTokenEndpoint(false);
    logger2.debug("got token endpoint");
    const response = await this._jsonService.postForm(url, { body: params, basicAuth, initCredentials: this._settings.fetchRequestCredentials });
    logger2.debug("got response");
    return response;
  }
  async exchangeRefreshToken({
    grant_type = "refresh_token",
    client_id = this._settings.client_id,
    client_secret = this._settings.client_secret,
    timeoutInSeconds,
    ...args
  }) {
    const logger2 = this._logger.create("exchangeRefreshToken");
    if (!client_id) {
      logger2.throw(new Error("A client_id is required"));
    }
    if (!args.refresh_token) {
      logger2.throw(new Error("A refresh_token is required"));
    }
    const params = new URLSearchParams({ grant_type });
    for (const [key, value] of Object.entries(args)) {
      if (value != null) {
        params.set(key, value);
      }
    }
    let basicAuth;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!client_secret) {
          logger2.throw(new Error("A client_secret is required"));
          throw null;
        }
        basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
        break;
      case "client_secret_post":
        params.append("client_id", client_id);
        if (client_secret) {
          params.append("client_secret", client_secret);
        }
        break;
    }
    const url = await this._metadataService.getTokenEndpoint(false);
    logger2.debug("got token endpoint");
    const response = await this._jsonService.postForm(url, { body: params, basicAuth, timeoutInSeconds, initCredentials: this._settings.fetchRequestCredentials });
    logger2.debug("got response");
    return response;
  }
  async revoke(args) {
    var _a;
    const logger2 = this._logger.create("revoke");
    if (!args.token) {
      logger2.throw(new Error("A token is required"));
    }
    const url = await this._metadataService.getRevocationEndpoint(false);
    logger2.debug(`got revocation endpoint, revoking ${(_a = args.token_type_hint) != null ? _a : "default token type"}`);
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(args)) {
      if (value != null) {
        params.set(key, value);
      }
    }
    params.set("client_id", this._settings.client_id);
    if (this._settings.client_secret) {
      params.set("client_secret", this._settings.client_secret);
    }
    await this._jsonService.postForm(url, { body: params });
    logger2.debug("got response");
  }
};

// src/ResponseValidator.ts
var ProtocolClaims = [
  "iss",
  "aud",
  "exp",
  "nbf",
  "iat",
  "jti",
  "auth_time",
  "nonce",
  "acr",
  "amr",
  "azp",
  "at_hash"
];
var ResponseValidator = class {
  constructor(_settings, _metadataService) {
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new Logger("ResponseValidator");
    this._userInfoService = new UserInfoService(this._settings, this._metadataService);
    this._tokenClient = new TokenClient(this._settings, this._metadataService);
  }
  async validateSigninResponse(response, state) {
    const logger2 = this._logger.create("validateSigninResponse");
    this._processSigninState(response, state);
    logger2.debug("state processed");
    await this._processCode(response, state);
    logger2.debug("code processed");
    if (response.isOpenId) {
      this._validateIdTokenAttributes(response);
    }
    logger2.debug("tokens validated");
    await this._processClaims(response, state == null ? void 0 : state.skipUserInfo, response.isOpenId);
    logger2.debug("claims processed");
  }
  async validateCredentialsResponse(response, skipUserInfo) {
    const logger2 = this._logger.create("validateCredentialsResponse");
    if (response.isOpenId) {
      this._validateIdTokenAttributes(response);
    }
    logger2.debug("tokens validated");
    await this._processClaims(response, skipUserInfo, response.isOpenId);
    logger2.debug("claims processed");
  }
  async validateRefreshResponse(response, state) {
    var _a, _b;
    const logger2 = this._logger.create("validateRefreshResponse");
    response.userState = state.data;
    (_a = response.session_state) != null ? _a : response.session_state = state.session_state;
    (_b = response.scope) != null ? _b : response.scope = state.scope;
    if (response.isOpenId && !!response.id_token) {
      this._validateIdTokenAttributes(response, state.id_token);
      logger2.debug("ID Token validated");
    }
    if (!response.id_token) {
      response.id_token = state.id_token;
      response.profile = state.profile;
    }
    const hasIdToken = response.isOpenId && !!response.id_token;
    await this._processClaims(response, false, hasIdToken);
    logger2.debug("claims processed");
  }
  validateSignoutResponse(response, state) {
    const logger2 = this._logger.create("validateSignoutResponse");
    if (state.id !== response.state) {
      logger2.throw(new Error("State does not match"));
    }
    logger2.debug("state validated");
    response.userState = state.data;
    if (response.error) {
      logger2.warn("Response was error", response.error);
      throw new ErrorResponse(response);
    }
  }
  _processSigninState(response, state) {
    var _a;
    const logger2 = this._logger.create("_processSigninState");
    if (state.id !== response.state) {
      logger2.throw(new Error("State does not match"));
    }
    if (!state.client_id) {
      logger2.throw(new Error("No client_id on state"));
    }
    if (!state.authority) {
      logger2.throw(new Error("No authority on state"));
    }
    if (this._settings.authority !== state.authority) {
      logger2.throw(new Error("authority mismatch on settings vs. signin state"));
    }
    if (this._settings.client_id && this._settings.client_id !== state.client_id) {
      logger2.throw(new Error("client_id mismatch on settings vs. signin state"));
    }
    logger2.debug("state validated");
    response.userState = state.data;
    (_a = response.scope) != null ? _a : response.scope = state.scope;
    if (response.error) {
      logger2.warn("Response was error", response.error);
      throw new ErrorResponse(response);
    }
    if (state.code_verifier && !response.code) {
      logger2.throw(new Error("Expected code in response"));
    }
    if (!state.code_verifier && response.code) {
      logger2.throw(new Error("Unexpected code in response"));
    }
  }
  async _processClaims(response, skipUserInfo = false, validateSub = true) {
    const logger2 = this._logger.create("_processClaims");
    response.profile = this._filterProtocolClaims(response.profile);
    if (skipUserInfo || !this._settings.loadUserInfo || !response.access_token) {
      logger2.debug("not loading user info");
      return;
    }
    logger2.debug("loading user info");
    const claims = await this._userInfoService.getClaims(response.access_token);
    logger2.debug("user info claims received from user info endpoint");
    if (validateSub && claims.sub !== response.profile.sub) {
      logger2.throw(new Error("subject from UserInfo response does not match subject in ID Token"));
    }
    response.profile = this._mergeClaims(response.profile, this._filterProtocolClaims(claims));
    logger2.debug("user info claims received, updated profile:", response.profile);
  }
  _mergeClaims(claims1, claims2) {
    const result = { ...claims1 };
    for (const [claim, values] of Object.entries(claims2)) {
      for (const value of Array.isArray(values) ? values : [values]) {
        const previousValue = result[claim];
        if (!previousValue) {
          result[claim] = value;
        } else if (Array.isArray(previousValue)) {
          if (!previousValue.includes(value)) {
            previousValue.push(value);
          }
        } else if (result[claim] !== value) {
          if (typeof value === "object" && this._settings.mergeClaims) {
            result[claim] = this._mergeClaims(previousValue, value);
          } else {
            result[claim] = [previousValue, value];
          }
        }
      }
    }
    return result;
  }
  _filterProtocolClaims(claims) {
    const result = { ...claims };
    if (this._settings.filterProtocolClaims) {
      for (const type of ProtocolClaims) {
        delete result[type];
      }
    }
    return result;
  }
  async _processCode(response, state) {
    const logger2 = this._logger.create("_processCode");
    if (response.code) {
      logger2.debug("Validating code");
      const tokenResponse = await this._tokenClient.exchangeCode({
        client_id: state.client_id,
        client_secret: state.client_secret,
        code: response.code,
        redirect_uri: state.redirect_uri,
        code_verifier: state.code_verifier,
        ...state.extraTokenParams
      });
      Object.assign(response, tokenResponse);
    } else {
      logger2.debug("No code to process");
    }
  }
  _validateIdTokenAttributes(response, currentToken) {
    var _a;
    const logger2 = this._logger.create("_validateIdTokenAttributes");
    logger2.debug("decoding ID Token JWT");
    const profile = JwtUtils.decode((_a = response.id_token) != null ? _a : "");
    if (!profile.sub) {
      logger2.throw(new Error("ID Token is missing a subject claim"));
    }
    if (currentToken) {
      const current = JwtUtils.decode(currentToken);
      if (current.sub !== profile.sub) {
        logger2.throw(new Error("sub in id_token does not match current sub"));
      }
      if (current.auth_time && current.auth_time !== profile.auth_time) {
        logger2.throw(new Error("auth_time in id_token does not match original auth_time"));
      }
      if (current.azp && current.azp !== profile.azp) {
        logger2.throw(new Error("azp in id_token does not match original azp"));
      }
      if (!current.azp && profile.azp) {
        logger2.throw(new Error("azp not in id_token, but present in original id_token"));
      }
    }
    response.profile = profile;
  }
};

// src/State.ts
var State = class {
  constructor(args) {
    this.id = args.id || CryptoUtils.generateUUIDv4();
    this.data = args.data;
    if (args.created && args.created > 0) {
      this.created = args.created;
    } else {
      this.created = Timer.getEpochTime();
    }
    this.request_type = args.request_type;
  }
  toStorageString() {
    new Logger("State").create("toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  }
  static fromStorageString(storageString) {
    Logger.createStatic("State", "fromStorageString");
    return new State(JSON.parse(storageString));
  }
  static async clearStaleState(storage, age) {
    const logger2 = Logger.createStatic("State", "clearStaleState");
    const cutoff = Timer.getEpochTime() - age;
    const keys = await storage.getAllKeys();
    logger2.debug("got keys", keys);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = await storage.get(key);
      let remove = false;
      if (item) {
        try {
          const state = State.fromStorageString(item);
          logger2.debug("got item from key:", key, state.created);
          if (state.created <= cutoff) {
            remove = true;
          }
        } catch (err) {
          logger2.error("Error parsing state for key:", key, err);
          remove = true;
        }
      } else {
        logger2.debug("no item in storage for key:", key);
        remove = true;
      }
      if (remove) {
        logger2.debug("removed item for key:", key);
        void storage.remove(key);
      }
    }
  }
};

// src/SigninState.ts
var SigninState = class extends State {
  constructor(args) {
    super(args);
    if (args.code_verifier === true) {
      this.code_verifier = CryptoUtils.generateCodeVerifier();
    } else if (args.code_verifier) {
      this.code_verifier = args.code_verifier;
    }
    if (this.code_verifier) {
      this.code_challenge = CryptoUtils.generateCodeChallenge(this.code_verifier);
    }
    this.authority = args.authority;
    this.client_id = args.client_id;
    this.redirect_uri = args.redirect_uri;
    this.scope = args.scope;
    this.client_secret = args.client_secret;
    this.extraTokenParams = args.extraTokenParams;
    this.response_mode = args.response_mode;
    this.skipUserInfo = args.skipUserInfo;
  }
  toStorageString() {
    new Logger("SigninState").create("toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      code_verifier: this.code_verifier,
      authority: this.authority,
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: this.scope,
      client_secret: this.client_secret,
      extraTokenParams: this.extraTokenParams,
      response_mode: this.response_mode,
      skipUserInfo: this.skipUserInfo
    });
  }
  static fromStorageString(storageString) {
    Logger.createStatic("SigninState", "fromStorageString");
    const data = JSON.parse(storageString);
    return new SigninState(data);
  }
};

// src/SigninRequest.ts
var SigninRequest = class {
  constructor({
    url,
    authority,
    client_id,
    redirect_uri,
    response_type,
    scope,
    state_data,
    response_mode,
    request_type,
    client_secret,
    nonce,
    skipUserInfo,
    extraQueryParams,
    extraTokenParams,
    ...optionalParams
  }) {
    this._logger = new Logger("SigninRequest");
    if (!url) {
      this._logger.error("ctor: No url passed");
      throw new Error("url");
    }
    if (!client_id) {
      this._logger.error("ctor: No client_id passed");
      throw new Error("client_id");
    }
    if (!redirect_uri) {
      this._logger.error("ctor: No redirect_uri passed");
      throw new Error("redirect_uri");
    }
    if (!response_type) {
      this._logger.error("ctor: No response_type passed");
      throw new Error("response_type");
    }
    if (!scope) {
      this._logger.error("ctor: No scope passed");
      throw new Error("scope");
    }
    if (!authority) {
      this._logger.error("ctor: No authority passed");
      throw new Error("authority");
    }
    this.state = new SigninState({
      data: state_data,
      request_type,
      code_verifier: true,
      client_id,
      authority,
      redirect_uri,
      response_mode,
      client_secret,
      scope,
      extraTokenParams,
      skipUserInfo
    });
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.append("client_id", client_id);
    parsedUrl.searchParams.append("redirect_uri", redirect_uri);
    parsedUrl.searchParams.append("response_type", response_type);
    parsedUrl.searchParams.append("scope", scope);
    if (nonce) {
      parsedUrl.searchParams.append("nonce", nonce);
    }
    parsedUrl.searchParams.append("state", this.state.id);
    if (this.state.code_challenge) {
      parsedUrl.searchParams.append("code_challenge", this.state.code_challenge);
      parsedUrl.searchParams.append("code_challenge_method", "S256");
    }
    for (const [key, value] of Object.entries({ response_mode, ...optionalParams, ...extraQueryParams })) {
      if (value != null) {
        parsedUrl.searchParams.append(key, value.toString());
      }
    }
    this.url = parsedUrl.href;
  }
};

// src/SigninResponse.ts
var OidcScope = "openid";
var SigninResponse = class {
  constructor(params) {
    this.access_token = "";
    this.token_type = "";
    this.profile = {};
    this.state = params.get("state");
    this.session_state = params.get("session_state");
    this.error = params.get("error");
    this.error_description = params.get("error_description");
    this.error_uri = params.get("error_uri");
    this.code = params.get("code");
  }
  get expires_in() {
    if (this.expires_at === void 0) {
      return void 0;
    }
    return this.expires_at - Timer.getEpochTime();
  }
  set expires_in(value) {
    if (typeof value === "string")
      value = Number(value);
    if (value !== void 0 && value >= 0) {
      this.expires_at = Math.floor(value) + Timer.getEpochTime();
    }
  }
  get isOpenId() {
    var _a;
    return ((_a = this.scope) == null ? void 0 : _a.split(" ").includes(OidcScope)) || !!this.id_token;
  }
};

// src/SignoutRequest.ts
var SignoutRequest = class {
  constructor({
    url,
    state_data,
    id_token_hint,
    post_logout_redirect_uri,
    extraQueryParams,
    request_type
  }) {
    this._logger = new Logger("SignoutRequest");
    if (!url) {
      this._logger.error("ctor: No url passed");
      throw new Error("url");
    }
    const parsedUrl = new URL(url);
    if (id_token_hint) {
      parsedUrl.searchParams.append("id_token_hint", id_token_hint);
    }
    if (post_logout_redirect_uri) {
      parsedUrl.searchParams.append("post_logout_redirect_uri", post_logout_redirect_uri);
      if (state_data) {
        this.state = new State({ data: state_data, request_type });
        parsedUrl.searchParams.append("state", this.state.id);
      }
    }
    for (const [key, value] of Object.entries({ ...extraQueryParams })) {
      if (value != null) {
        parsedUrl.searchParams.append(key, value.toString());
      }
    }
    this.url = parsedUrl.href;
  }
};

// src/SignoutResponse.ts
var SignoutResponse = class {
  constructor(params) {
    this.state = params.get("state");
    this.error = params.get("error");
    this.error_description = params.get("error_description");
    this.error_uri = params.get("error_uri");
  }
};

// src/OidcClient.ts
var OidcClient = class {
  constructor(settings) {
    this._logger = new Logger("OidcClient");
    this.settings = new OidcClientSettingsStore(settings);
    this.metadataService = new MetadataService(this.settings);
    this._validator = new ResponseValidator(this.settings, this.metadataService);
    this._tokenClient = new TokenClient(this.settings, this.metadataService);
  }
  async createSigninRequest({
    state,
    request,
    request_uri,
    request_type,
    id_token_hint,
    login_hint,
    skipUserInfo,
    nonce,
    response_type = this.settings.response_type,
    scope = this.settings.scope,
    redirect_uri = this.settings.redirect_uri,
    prompt = this.settings.prompt,
    display = this.settings.display,
    max_age = this.settings.max_age,
    ui_locales = this.settings.ui_locales,
    acr_values = this.settings.acr_values,
    resource = this.settings.resource,
    response_mode = this.settings.response_mode,
    extraQueryParams = this.settings.extraQueryParams,
    extraTokenParams = this.settings.extraTokenParams
  }) {
    const logger2 = this._logger.create("createSigninRequest");
    if (response_type !== "code") {
      throw new Error("Only the Authorization Code flow (with PKCE) is supported");
    }
    const url = await this.metadataService.getAuthorizationEndpoint();
    logger2.debug("Received authorization endpoint", url);
    const signinRequest = new SigninRequest({
      url,
      authority: this.settings.authority,
      client_id: this.settings.client_id,
      redirect_uri,
      response_type,
      scope,
      state_data: state,
      prompt,
      display,
      max_age,
      ui_locales,
      id_token_hint,
      login_hint,
      acr_values,
      resource,
      request,
      request_uri,
      extraQueryParams,
      extraTokenParams,
      request_type,
      response_mode,
      client_secret: this.settings.client_secret,
      skipUserInfo,
      nonce
    });
    await this.clearStaleState();
    const signinState = signinRequest.state;
    await this.settings.stateStore.set(signinState.id, signinState.toStorageString());
    return signinRequest;
  }
  async readSigninResponseState(url, removeState = false) {
    const logger2 = this._logger.create("readSigninResponseState");
    const response = new SigninResponse(UrlUtils.readParams(url, this.settings.response_mode));
    if (!response.state) {
      logger2.throw(new Error("No state in response"));
      throw null;
    }
    const storedStateString = await this.settings.stateStore[removeState ? "remove" : "get"](response.state);
    if (!storedStateString) {
      logger2.throw(new Error("No matching state found in storage"));
      throw null;
    }
    const state = SigninState.fromStorageString(storedStateString);
    return { state, response };
  }
  async processSigninResponse(url) {
    const logger2 = this._logger.create("processSigninResponse");
    const { state, response } = await this.readSigninResponseState(url, true);
    logger2.debug("received state from storage; validating response");
    await this._validator.validateSigninResponse(response, state);
    return response;
  }
  async processResourceOwnerPasswordCredentials({
    username,
    password,
    skipUserInfo = false
  }) {
    const tokenResponse = await this._tokenClient.exchangeCredentials({ username, password });
    const signinResponse = new SigninResponse(new URLSearchParams());
    Object.assign(signinResponse, tokenResponse);
    await this._validator.validateCredentialsResponse(signinResponse, skipUserInfo);
    return signinResponse;
  }
  async useRefreshToken({
    state,
    timeoutInSeconds
  }) {
    const logger2 = this._logger.create("useRefreshToken");
    const result = await this._tokenClient.exchangeRefreshToken({
      refresh_token: state.refresh_token,
      scope: state.scope,
      timeoutInSeconds
    });
    const response = new SigninResponse(new URLSearchParams());
    Object.assign(response, result);
    logger2.debug("validating response", response);
    await this._validator.validateRefreshResponse(response, state);
    return response;
  }
  async createSignoutRequest({
    state,
    id_token_hint,
    request_type,
    post_logout_redirect_uri = this.settings.post_logout_redirect_uri,
    extraQueryParams = this.settings.extraQueryParams
  } = {}) {
    const logger2 = this._logger.create("createSignoutRequest");
    const url = await this.metadataService.getEndSessionEndpoint();
    if (!url) {
      logger2.throw(new Error("No end session endpoint"));
      throw null;
    }
    logger2.debug("Received end session endpoint", url);
    const request = new SignoutRequest({
      url,
      id_token_hint,
      post_logout_redirect_uri,
      state_data: state,
      extraQueryParams,
      request_type
    });
    await this.clearStaleState();
    const signoutState = request.state;
    if (signoutState) {
      logger2.debug("Signout request has state to persist");
      await this.settings.stateStore.set(signoutState.id, signoutState.toStorageString());
    }
    return request;
  }
  async readSignoutResponseState(url, removeState = false) {
    const logger2 = this._logger.create("readSignoutResponseState");
    const response = new SignoutResponse(UrlUtils.readParams(url, this.settings.response_mode));
    if (!response.state) {
      logger2.debug("No state in response");
      if (response.error) {
        logger2.warn("Response was error:", response.error);
        throw new ErrorResponse(response);
      }
      return { state: void 0, response };
    }
    const storedStateString = await this.settings.stateStore[removeState ? "remove" : "get"](response.state);
    if (!storedStateString) {
      logger2.throw(new Error("No matching state found in storage"));
      throw null;
    }
    const state = State.fromStorageString(storedStateString);
    return { state, response };
  }
  async processSignoutResponse(url) {
    const logger2 = this._logger.create("processSignoutResponse");
    const { state, response } = await this.readSignoutResponseState(url, true);
    if (state) {
      logger2.debug("Received state from storage; validating response");
      this._validator.validateSignoutResponse(response, state);
    } else {
      logger2.debug("No state from storage; skipping response validation");
    }
    return response;
  }
  clearStaleState() {
    this._logger.create("clearStaleState");
    return State.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  }
  async revokeToken(token, type) {
    this._logger.create("revokeToken");
    return await this._tokenClient.revoke({
      token,
      token_type_hint: type
    });
  }
};

// src/SessionMonitor.ts
var SessionMonitor = class {
  constructor(_userManager) {
    this._userManager = _userManager;
    this._logger = new Logger("SessionMonitor");
    this._start = async (user) => {
      const session_state = user.session_state;
      if (!session_state) {
        return;
      }
      const logger2 = this._logger.create("_start");
      if (user.profile) {
        this._sub = user.profile.sub;
        this._sid = user.profile.sid;
        logger2.debug("session_state", session_state, ", sub", this._sub);
      } else {
        this._sub = void 0;
        this._sid = void 0;
        logger2.debug("session_state", session_state, ", anonymous user");
      }
      if (this._checkSessionIFrame) {
        this._checkSessionIFrame.start(session_state);
        return;
      }
      try {
        const url = await this._userManager.metadataService.getCheckSessionIframe();
        if (url) {
          logger2.debug("initializing check session iframe");
          const client_id = this._userManager.settings.client_id;
          const intervalInSeconds = this._userManager.settings.checkSessionIntervalInSeconds;
          const stopOnError = this._userManager.settings.stopCheckSessionOnError;
          const checkSessionIFrame = new CheckSessionIFrame(this._callback, client_id, url, intervalInSeconds, stopOnError);
          await checkSessionIFrame.load();
          this._checkSessionIFrame = checkSessionIFrame;
          checkSessionIFrame.start(session_state);
        } else {
          logger2.warn("no check session iframe found in the metadata");
        }
      } catch (err) {
        logger2.error("Error from getCheckSessionIframe:", err instanceof Error ? err.message : err);
      }
    };
    this._stop = () => {
      const logger2 = this._logger.create("_stop");
      this._sub = void 0;
      this._sid = void 0;
      if (this._checkSessionIFrame) {
        this._checkSessionIFrame.stop();
      }
      if (this._userManager.settings.monitorAnonymousSession) {
        const timerHandle = setInterval(async () => {
          clearInterval(timerHandle);
          try {
            const session = await this._userManager.querySessionStatus();
            if (session) {
              const tmpUser = {
                session_state: session.session_state,
                profile: session.sub && session.sid ? {
                  sub: session.sub,
                  sid: session.sid
                } : null
              };
              void this._start(tmpUser);
            }
          } catch (err) {
            logger2.error("error from querySessionStatus", err instanceof Error ? err.message : err);
          }
        }, 1e3);
      }
    };
    this._callback = async () => {
      const logger2 = this._logger.create("_callback");
      try {
        const session = await this._userManager.querySessionStatus();
        let raiseEvent = true;
        if (session && this._checkSessionIFrame) {
          if (session.sub === this._sub) {
            raiseEvent = false;
            this._checkSessionIFrame.start(session.session_state);
            if (session.sid === this._sid) {
              logger2.debug("same sub still logged in at OP, restarting check session iframe; session_state", session.session_state);
            } else {
              logger2.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", session.session_state);
              this._userManager.events._raiseUserSessionChanged();
            }
          } else {
            logger2.debug("different subject signed into OP", session.sub);
          }
        } else {
          logger2.debug("subject no longer signed into OP");
        }
        if (raiseEvent) {
          if (this._sub) {
            this._userManager.events._raiseUserSignedOut();
          } else {
            this._userManager.events._raiseUserSignedIn();
          }
        } else {
          logger2.debug("no change in session detected, no event to raise");
        }
      } catch (err) {
        if (this._sub) {
          logger2.debug("Error calling queryCurrentSigninSession; raising signed out event", err);
          this._userManager.events._raiseUserSignedOut();
        }
      }
    };
    if (!_userManager) {
      this._logger.throw(new Error("No user manager passed"));
    }
    this._userManager.events.addUserLoaded(this._start);
    this._userManager.events.addUserUnloaded(this._stop);
    this._init().catch((err) => {
      this._logger.error(err);
    });
  }
  async _init() {
    this._logger.create("_init");
    const user = await this._userManager.getUser();
    if (user) {
      void this._start(user);
    } else if (this._userManager.settings.monitorAnonymousSession) {
      const session = await this._userManager.querySessionStatus();
      if (session) {
        const tmpUser = {
          session_state: session.session_state,
          profile: session.sub && session.sid ? {
            sub: session.sub,
            sid: session.sid
          } : null
        };
        void this._start(tmpUser);
      }
    }
  }
};

// src/User.ts
var User = class {
  constructor(args) {
    var _a;
    this.id_token = args.id_token;
    this.session_state = (_a = args.session_state) != null ? _a : null;
    this.access_token = args.access_token;
    this.refresh_token = args.refresh_token;
    this.token_type = args.token_type;
    this.scope = args.scope;
    this.profile = args.profile;
    this.expires_at = args.expires_at;
    this.state = args.userState;
  }
  get expires_in() {
    if (this.expires_at === void 0) {
      return void 0;
    }
    return this.expires_at - Timer.getEpochTime();
  }
  set expires_in(value) {
    if (value !== void 0) {
      this.expires_at = Math.floor(value) + Timer.getEpochTime();
    }
  }
  get expired() {
    const expires_in = this.expires_in;
    if (expires_in === void 0) {
      return void 0;
    }
    return expires_in <= 0;
  }
  get scopes() {
    var _a, _b;
    return (_b = (_a = this.scope) == null ? void 0 : _a.split(" ")) != null ? _b : [];
  }
  toStorageString() {
    new Logger("User").create("toStorageString");
    return JSON.stringify({
      id_token: this.id_token,
      session_state: this.session_state,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      token_type: this.token_type,
      scope: this.scope,
      profile: this.profile,
      expires_at: this.expires_at
    });
  }
  static fromStorageString(storageString) {
    Logger.createStatic("User", "fromStorageString");
    return new User(JSON.parse(storageString));
  }
};

// src/navigators/AbstractChildWindow.ts
var messageSource = "oidc-client";
var AbstractChildWindow = class {
  constructor() {
    this._abort = new oidc_client_ts_Event("Window navigation aborted");
    this._disposeHandlers = /* @__PURE__ */ new Set();
    this._window = null;
  }
  async navigate(params) {
    const logger2 = this._logger.create("navigate");
    if (!this._window) {
      throw new Error("Attempted to navigate on a disposed window");
    }
    logger2.debug("setting URL in window");
    this._window.location.replace(params.url);
    const { url, keepOpen } = await new Promise((resolve, reject) => {
      const listener = (e) => {
        var _a;
        const data = e.data;
        const origin = (_a = params.scriptOrigin) != null ? _a : window.location.origin;
        if (e.origin !== origin || (data == null ? void 0 : data.source) !== messageSource) {
          return;
        }
        try {
          const state = UrlUtils.readParams(data.url, params.response_mode).get("state");
          if (!state) {
            logger2.warn("no state found in response url");
          }
          if (e.source !== this._window && state !== params.state) {
            return;
          }
        } catch (err) {
          this._dispose();
          reject(new Error("Invalid response from window"));
        }
        resolve(data);
      };
      window.addEventListener("message", listener, false);
      this._disposeHandlers.add(() => window.removeEventListener("message", listener, false));
      this._disposeHandlers.add(this._abort.addHandler((reason) => {
        this._dispose();
        reject(reason);
      }));
    });
    logger2.debug("got response from window");
    this._dispose();
    if (!keepOpen) {
      this.close();
    }
    return { url };
  }
  _dispose() {
    this._logger.create("_dispose");
    for (const dispose of this._disposeHandlers) {
      dispose();
    }
    this._disposeHandlers.clear();
  }
  static _notifyParent(parent, url, keepOpen = false, targetOrigin = window.location.origin) {
    parent.postMessage({
      source: messageSource,
      url,
      keepOpen
    }, targetOrigin);
  }
};

// src/UserManagerSettings.ts
var DefaultPopupWindowFeatures = {
  location: false,
  toolbar: false,
  height: 640
};
var DefaultPopupTarget = "_blank";
var DefaultAccessTokenExpiringNotificationTimeInSeconds = 60;
var DefaultCheckSessionIntervalInSeconds = 2;
var DefaultSilentRequestTimeoutInSeconds = 10;
var UserManagerSettingsStore = class extends OidcClientSettingsStore {
  constructor(args) {
    const {
      popup_redirect_uri = args.redirect_uri,
      popup_post_logout_redirect_uri = args.post_logout_redirect_uri,
      popupWindowFeatures = DefaultPopupWindowFeatures,
      popupWindowTarget = DefaultPopupTarget,
      redirectMethod = "assign",
      redirectTarget = "self",
      iframeNotifyParentOrigin = args.iframeNotifyParentOrigin,
      iframeScriptOrigin = args.iframeScriptOrigin,
      silent_redirect_uri = args.redirect_uri,
      silentRequestTimeoutInSeconds = DefaultSilentRequestTimeoutInSeconds,
      automaticSilentRenew = true,
      validateSubOnSilentRenew = true,
      includeIdTokenInSilentRenew = false,
      monitorSession = false,
      monitorAnonymousSession = false,
      checkSessionIntervalInSeconds = DefaultCheckSessionIntervalInSeconds,
      query_status_response_type = "code",
      stopCheckSessionOnError = true,
      revokeTokenTypes = ["access_token", "refresh_token"],
      revokeTokensOnSignout = false,
      includeIdTokenInSilentSignout = false,
      accessTokenExpiringNotificationTimeInSeconds = DefaultAccessTokenExpiringNotificationTimeInSeconds,
      userStore
    } = args;
    super(args);
    this.popup_redirect_uri = popup_redirect_uri;
    this.popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
    this.popupWindowFeatures = popupWindowFeatures;
    this.popupWindowTarget = popupWindowTarget;
    this.redirectMethod = redirectMethod;
    this.redirectTarget = redirectTarget;
    this.iframeNotifyParentOrigin = iframeNotifyParentOrigin;
    this.iframeScriptOrigin = iframeScriptOrigin;
    this.silent_redirect_uri = silent_redirect_uri;
    this.silentRequestTimeoutInSeconds = silentRequestTimeoutInSeconds;
    this.automaticSilentRenew = automaticSilentRenew;
    this.validateSubOnSilentRenew = validateSubOnSilentRenew;
    this.includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
    this.monitorSession = monitorSession;
    this.monitorAnonymousSession = monitorAnonymousSession;
    this.checkSessionIntervalInSeconds = checkSessionIntervalInSeconds;
    this.stopCheckSessionOnError = stopCheckSessionOnError;
    this.query_status_response_type = query_status_response_type;
    this.revokeTokenTypes = revokeTokenTypes;
    this.revokeTokensOnSignout = revokeTokensOnSignout;
    this.includeIdTokenInSilentSignout = includeIdTokenInSilentSignout;
    this.accessTokenExpiringNotificationTimeInSeconds = accessTokenExpiringNotificationTimeInSeconds;
    if (userStore) {
      this.userStore = userStore;
    } else {
      const store = typeof window !== "undefined" ? window.sessionStorage : new InMemoryWebStorage();
      this.userStore = new WebStorageStateStore({ store });
    }
  }
};

// src/navigators/IFrameWindow.ts
var IFrameWindow = class extends AbstractChildWindow {
  constructor({
    silentRequestTimeoutInSeconds = DefaultSilentRequestTimeoutInSeconds
  }) {
    super();
    this._logger = new Logger("IFrameWindow");
    this._timeoutInSeconds = silentRequestTimeoutInSeconds;
    this._frame = IFrameWindow.createHiddenIframe();
    this._window = this._frame.contentWindow;
  }
  static createHiddenIframe() {
    const iframe = window.document.createElement("iframe");
    iframe.style.visibility = "hidden";
    iframe.style.position = "fixed";
    iframe.style.left = "-1000px";
    iframe.style.top = "0";
    iframe.width = "0";
    iframe.height = "0";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
    window.document.body.appendChild(iframe);
    return iframe;
  }
  async navigate(params) {
    this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
    const timer = setTimeout(() => this._abort.raise(new ErrorTimeout("IFrame timed out without a response")), this._timeoutInSeconds * 1e3);
    this._disposeHandlers.add(() => clearTimeout(timer));
    return await super.navigate(params);
  }
  close() {
    var _a;
    if (this._frame) {
      if (this._frame.parentNode) {
        this._frame.addEventListener("load", (ev) => {
          var _a2;
          const frame = ev.target;
          (_a2 = frame.parentNode) == null ? void 0 : _a2.removeChild(frame);
          this._abort.raise(new Error("IFrame removed from DOM"));
        }, true);
        (_a = this._frame.contentWindow) == null ? void 0 : _a.location.replace("about:blank");
      }
      this._frame = null;
    }
    this._window = null;
  }
  static notifyParent(url, targetOrigin) {
    return super._notifyParent(window.parent, url, false, targetOrigin);
  }
};

// src/navigators/IFrameNavigator.ts
var IFrameNavigator = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("IFrameNavigator");
  }
  async prepare({
    silentRequestTimeoutInSeconds = this._settings.silentRequestTimeoutInSeconds
  }) {
    return new IFrameWindow({ silentRequestTimeoutInSeconds });
  }
  async callback(url) {
    this._logger.create("callback");
    IFrameWindow.notifyParent(url, this._settings.iframeNotifyParentOrigin);
  }
};

// src/navigators/PopupWindow.ts
var checkForPopupClosedInterval = 500;
var PopupWindow = class extends AbstractChildWindow {
  constructor({
    popupWindowTarget = DefaultPopupTarget,
    popupWindowFeatures = {}
  }) {
    super();
    this._logger = new Logger("PopupWindow");
    const centeredPopup = PopupUtils.center({ ...DefaultPopupWindowFeatures, ...popupWindowFeatures });
    this._window = window.open(void 0, popupWindowTarget, PopupUtils.serialize(centeredPopup));
  }
  async navigate(params) {
    var _a;
    (_a = this._window) == null ? void 0 : _a.focus();
    const popupClosedInterval = setInterval(() => {
      if (!this._window || this._window.closed) {
        this._abort.raise(new Error("Popup closed by user"));
      }
    }, checkForPopupClosedInterval);
    this._disposeHandlers.add(() => clearInterval(popupClosedInterval));
    return await super.navigate(params);
  }
  close() {
    if (this._window) {
      if (!this._window.closed) {
        this._window.close();
        this._abort.raise(new Error("Popup closed"));
      }
    }
    this._window = null;
  }
  static notifyOpener(url, keepOpen) {
    if (!window.opener) {
      throw new Error("No window.opener. Can't complete notification.");
    }
    return super._notifyParent(window.opener, url, keepOpen);
  }
};

// src/navigators/PopupNavigator.ts
var PopupNavigator = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("PopupNavigator");
  }
  async prepare({
    popupWindowFeatures = this._settings.popupWindowFeatures,
    popupWindowTarget = this._settings.popupWindowTarget
  }) {
    return new PopupWindow({ popupWindowFeatures, popupWindowTarget });
  }
  async callback(url, keepOpen = false) {
    this._logger.create("callback");
    PopupWindow.notifyOpener(url, keepOpen);
  }
};

// src/navigators/RedirectNavigator.ts
var RedirectNavigator = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("RedirectNavigator");
  }
  async prepare({
    redirectMethod = this._settings.redirectMethod,
    redirectTarget = this._settings.redirectTarget
  }) {
    var _a;
    this._logger.create("prepare");
    let targetWindow = window.self;
    if (redirectTarget === "top") {
      targetWindow = (_a = window.top) != null ? _a : window.self;
    }
    const redirect = targetWindow.location[redirectMethod].bind(targetWindow.location);
    let abort;
    return {
      navigate: async (params) => {
        this._logger.create("navigate");
        const promise = new Promise((resolve, reject) => {
          abort = reject;
        });
        redirect(params.url);
        return await promise;
      },
      close: () => {
        this._logger.create("close");
        abort == null ? void 0 : abort(new Error("Redirect aborted"));
        targetWindow.stop();
      }
    };
  }
};

// src/UserManagerEvents.ts
var UserManagerEvents = class extends AccessTokenEvents {
  constructor(settings) {
    super({ expiringNotificationTimeInSeconds: settings.accessTokenExpiringNotificationTimeInSeconds });
    this._logger = new Logger("UserManagerEvents");
    this._userLoaded = new oidc_client_ts_Event("User loaded");
    this._userUnloaded = new oidc_client_ts_Event("User unloaded");
    this._silentRenewError = new oidc_client_ts_Event("Silent renew error");
    this._userSignedIn = new oidc_client_ts_Event("User signed in");
    this._userSignedOut = new oidc_client_ts_Event("User signed out");
    this._userSessionChanged = new oidc_client_ts_Event("User session changed");
  }
  load(user, raiseEvent = true) {
    super.load(user);
    if (raiseEvent) {
      this._userLoaded.raise(user);
    }
  }
  unload() {
    super.unload();
    this._userUnloaded.raise();
  }
  addUserLoaded(cb) {
    return this._userLoaded.addHandler(cb);
  }
  removeUserLoaded(cb) {
    return this._userLoaded.removeHandler(cb);
  }
  addUserUnloaded(cb) {
    return this._userUnloaded.addHandler(cb);
  }
  removeUserUnloaded(cb) {
    return this._userUnloaded.removeHandler(cb);
  }
  addSilentRenewError(cb) {
    return this._silentRenewError.addHandler(cb);
  }
  removeSilentRenewError(cb) {
    return this._silentRenewError.removeHandler(cb);
  }
  _raiseSilentRenewError(e) {
    this._silentRenewError.raise(e);
  }
  addUserSignedIn(cb) {
    return this._userSignedIn.addHandler(cb);
  }
  removeUserSignedIn(cb) {
    this._userSignedIn.removeHandler(cb);
  }
  _raiseUserSignedIn() {
    this._userSignedIn.raise();
  }
  addUserSignedOut(cb) {
    return this._userSignedOut.addHandler(cb);
  }
  removeUserSignedOut(cb) {
    this._userSignedOut.removeHandler(cb);
  }
  _raiseUserSignedOut() {
    this._userSignedOut.raise();
  }
  addUserSessionChanged(cb) {
    return this._userSessionChanged.addHandler(cb);
  }
  removeUserSessionChanged(cb) {
    this._userSessionChanged.removeHandler(cb);
  }
  _raiseUserSessionChanged() {
    this._userSessionChanged.raise();
  }
};

// src/SilentRenewService.ts
var SilentRenewService = class {
  constructor(_userManager) {
    this._userManager = _userManager;
    this._logger = new Logger("SilentRenewService");
    this._isStarted = false;
    this._retryTimer = new Timer("Retry Silent Renew");
    this._tokenExpiring = async () => {
      const logger2 = this._logger.create("_tokenExpiring");
      try {
        await this._userManager.signinSilent();
        logger2.debug("silent token renewal successful");
      } catch (err) {
        if (err instanceof ErrorTimeout) {
          logger2.warn("ErrorTimeout from signinSilent:", err, "retry in 5s");
          this._retryTimer.init(5);
          return;
        }
        logger2.error("Error from signinSilent:", err);
        this._userManager.events._raiseSilentRenewError(err);
      }
    };
  }
  async start() {
    const logger2 = this._logger.create("start");
    if (!this._isStarted) {
      this._isStarted = true;
      this._userManager.events.addAccessTokenExpiring(this._tokenExpiring);
      this._retryTimer.addHandler(this._tokenExpiring);
      try {
        await this._userManager.getUser();
      } catch (err) {
        logger2.error("getUser error", err);
      }
    }
  }
  stop() {
    if (this._isStarted) {
      this._retryTimer.cancel();
      this._retryTimer.removeHandler(this._tokenExpiring);
      this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring);
      this._isStarted = false;
    }
  }
};

// src/RefreshState.ts
var RefreshState = class {
  constructor(args) {
    this.refresh_token = args.refresh_token;
    this.id_token = args.id_token;
    this.session_state = args.session_state;
    this.scope = args.scope;
    this.profile = args.profile;
    this.data = args.state;
  }
};

// src/UserManager.ts
var oidc_client_ts_UserManager = class {
  constructor(settings) {
    this._logger = new Logger("UserManager");
    this.settings = new UserManagerSettingsStore(settings);
    this._client = new OidcClient(settings);
    this._redirectNavigator = new RedirectNavigator(this.settings);
    this._popupNavigator = new PopupNavigator(this.settings);
    this._iframeNavigator = new IFrameNavigator(this.settings);
    this._events = new UserManagerEvents(this.settings);
    this._silentRenewService = new SilentRenewService(this);
    if (this.settings.automaticSilentRenew) {
      this.startSilentRenew();
    }
    this._sessionMonitor = null;
    if (this.settings.monitorSession) {
      this._sessionMonitor = new SessionMonitor(this);
    }
  }
  get events() {
    return this._events;
  }
  get metadataService() {
    return this._client.metadataService;
  }
  async getUser() {
    const logger2 = this._logger.create("getUser");
    const user = await this._loadUser();
    if (user) {
      logger2.info("user loaded");
      this._events.load(user, false);
      return user;
    }
    logger2.info("user not found in storage");
    return null;
  }
  async removeUser() {
    const logger2 = this._logger.create("removeUser");
    await this.storeUser(null);
    logger2.info("user removed from storage");
    this._events.unload();
  }
  async signinRedirect(args = {}) {
    this._logger.create("signinRedirect");
    const {
      redirectMethod,
      ...requestArgs
    } = args;
    const handle = await this._redirectNavigator.prepare({ redirectMethod });
    await this._signinStart({
      request_type: "si:r",
      ...requestArgs
    }, handle);
  }
  async signinRedirectCallback(url = window.location.href) {
    const logger2 = this._logger.create("signinRedirectCallback");
    const user = await this._signinEnd(url);
    if (user.profile && user.profile.sub) {
      logger2.info("success, signed in subject", user.profile.sub);
    } else {
      logger2.info("no subject");
    }
    return user;
  }
  async signinResourceOwnerCredentials({
    username,
    password,
    skipUserInfo = false
  }) {
    const logger2 = this._logger.create("signinResourceOwnerCredential");
    const signinResponse = await this._client.processResourceOwnerPasswordCredentials({ username, password, skipUserInfo });
    logger2.debug("got signin response");
    const user = await this._buildUser(signinResponse);
    if (user.profile && user.profile.sub) {
      logger2.info("success, signed in subject", user.profile.sub);
    } else {
      logger2.info("no subject");
    }
    return user;
  }
  async signinPopup(args = {}) {
    const logger2 = this._logger.create("signinPopup");
    const {
      popupWindowFeatures,
      popupWindowTarget,
      ...requestArgs
    } = args;
    const url = this.settings.popup_redirect_uri;
    if (!url) {
      logger2.throw(new Error("No popup_redirect_uri configured"));
    }
    const handle = await this._popupNavigator.prepare({ popupWindowFeatures, popupWindowTarget });
    const user = await this._signin({
      request_type: "si:p",
      redirect_uri: url,
      display: "popup",
      ...requestArgs
    }, handle);
    if (user) {
      if (user.profile && user.profile.sub) {
        logger2.info("success, signed in subject", user.profile.sub);
      } else {
        logger2.info("no subject");
      }
    }
    return user;
  }
  async signinPopupCallback(url = window.location.href, keepOpen = false) {
    const logger2 = this._logger.create("signinPopupCallback");
    await this._popupNavigator.callback(url, keepOpen);
    logger2.info("success");
  }
  async signinSilent(args = {}) {
    var _a;
    const logger2 = this._logger.create("signinSilent");
    const {
      silentRequestTimeoutInSeconds,
      ...requestArgs
    } = args;
    let user = await this._loadUser();
    if (user == null ? void 0 : user.refresh_token) {
      logger2.debug("using refresh token");
      const state = new RefreshState(user);
      return await this._useRefreshToken(state);
    }
    const url = this.settings.silent_redirect_uri;
    if (!url) {
      logger2.throw(new Error("No silent_redirect_uri configured"));
    }
    let verifySub;
    if (user && this.settings.validateSubOnSilentRenew) {
      logger2.debug("subject prior to silent renew:", user.profile.sub);
      verifySub = user.profile.sub;
    }
    const handle = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
    user = await this._signin({
      request_type: "si:s",
      redirect_uri: url,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0,
      ...requestArgs
    }, handle, verifySub);
    if (user) {
      if ((_a = user.profile) == null ? void 0 : _a.sub) {
        logger2.info("success, signed in subject", user.profile.sub);
      } else {
        logger2.info("no subject");
      }
    }
    return user;
  }
  async _useRefreshToken(state) {
    const response = await this._client.useRefreshToken({
      state,
      timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
    });
    const user = new User({ ...state, ...response });
    await this.storeUser(user);
    this._events.load(user);
    return user;
  }
  async signinSilentCallback(url = window.location.href) {
    const logger2 = this._logger.create("signinSilentCallback");
    await this._iframeNavigator.callback(url);
    logger2.info("success");
  }
  async signinCallback(url = window.location.href) {
    const { state } = await this._client.readSigninResponseState(url);
    switch (state.request_type) {
      case "si:r":
        return await this.signinRedirectCallback(url);
      case "si:p":
        return await this.signinPopupCallback(url);
      case "si:s":
        return await this.signinSilentCallback(url);
      default:
        throw new Error("invalid response_type in state");
    }
  }
  async signoutCallback(url = window.location.href, keepOpen = false) {
    const { state } = await this._client.readSignoutResponseState(url);
    if (!state) {
      return;
    }
    switch (state.request_type) {
      case "so:r":
        await this.signoutRedirectCallback(url);
        break;
      case "so:p":
        await this.signoutPopupCallback(url, keepOpen);
        break;
      case "so:s":
        await this.signoutSilentCallback(url);
        break;
      default:
        throw new Error("invalid response_type in state");
    }
  }
  async querySessionStatus(args = {}) {
    const logger2 = this._logger.create("querySessionStatus");
    const {
      silentRequestTimeoutInSeconds,
      ...requestArgs
    } = args;
    const url = this.settings.silent_redirect_uri;
    if (!url) {
      logger2.throw(new Error("No silent_redirect_uri configured"));
    }
    const user = await this._loadUser();
    const handle = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
    const navResponse = await this._signinStart({
      request_type: "si:s",
      redirect_uri: url,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0,
      response_type: this.settings.query_status_response_type,
      scope: "openid",
      skipUserInfo: true,
      ...requestArgs
    }, handle);
    try {
      const signinResponse = await this._client.processSigninResponse(navResponse.url);
      logger2.debug("got signin response");
      if (signinResponse.session_state && signinResponse.profile.sub) {
        logger2.info("success for subject", signinResponse.profile.sub);
        return {
          session_state: signinResponse.session_state,
          sub: signinResponse.profile.sub,
          sid: signinResponse.profile.sid
        };
      }
      logger2.info("success, user not authenticated");
      return null;
    } catch (err) {
      if (this.settings.monitorAnonymousSession && err instanceof ErrorResponse) {
        switch (err.error) {
          case "login_required":
          case "consent_required":
          case "interaction_required":
          case "account_selection_required":
            logger2.info("success for anonymous user");
            return {
              session_state: err.session_state
            };
        }
      }
      throw err;
    }
  }
  async _signin(args, handle, verifySub) {
    const navResponse = await this._signinStart(args, handle);
    return await this._signinEnd(navResponse.url, verifySub);
  }
  async _signinStart(args, handle) {
    const logger2 = this._logger.create("_signinStart");
    try {
      const signinRequest = await this._client.createSigninRequest(args);
      logger2.debug("got signin request");
      return await handle.navigate({
        url: signinRequest.url,
        state: signinRequest.state.id,
        response_mode: signinRequest.state.response_mode,
        scriptOrigin: this.settings.iframeScriptOrigin
      });
    } catch (err) {
      logger2.debug("error after preparing navigator, closing navigator window");
      handle.close();
      throw err;
    }
  }
  async _signinEnd(url, verifySub) {
    const logger2 = this._logger.create("_signinEnd");
    const signinResponse = await this._client.processSigninResponse(url);
    logger2.debug("got signin response");
    const user = await this._buildUser(signinResponse, verifySub);
    return user;
  }
  async _buildUser(signinResponse, verifySub) {
    const logger2 = this._logger.create("_buildUser");
    const user = new User(signinResponse);
    if (verifySub) {
      if (verifySub !== user.profile.sub) {
        logger2.debug("current user does not match user returned from signin. sub from signin:", user.profile.sub);
        throw new ErrorResponse({ ...signinResponse, error: "login_required" });
      }
      logger2.debug("current user matches user returned from signin");
    }
    await this.storeUser(user);
    logger2.debug("user stored");
    this._events.load(user);
    return user;
  }
  async signoutRedirect(args = {}) {
    const logger2 = this._logger.create("signoutRedirect");
    const {
      redirectMethod,
      ...requestArgs
    } = args;
    const handle = await this._redirectNavigator.prepare({ redirectMethod });
    await this._signoutStart({
      request_type: "so:r",
      post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
      ...requestArgs
    }, handle);
    logger2.info("success");
  }
  async signoutRedirectCallback(url = window.location.href) {
    const logger2 = this._logger.create("signoutRedirectCallback");
    const response = await this._signoutEnd(url);
    logger2.info("success");
    return response;
  }
  async signoutPopup(args = {}) {
    const logger2 = this._logger.create("signoutPopup");
    const {
      popupWindowFeatures,
      popupWindowTarget,
      ...requestArgs
    } = args;
    const url = this.settings.popup_post_logout_redirect_uri;
    const handle = await this._popupNavigator.prepare({ popupWindowFeatures, popupWindowTarget });
    await this._signout({
      request_type: "so:p",
      post_logout_redirect_uri: url,
      state: url == null ? void 0 : {},
      ...requestArgs
    }, handle);
    logger2.info("success");
  }
  async signoutPopupCallback(url = window.location.href, keepOpen = false) {
    const logger2 = this._logger.create("signoutPopupCallback");
    await this._popupNavigator.callback(url, keepOpen);
    logger2.info("success");
  }
  async _signout(args, handle) {
    const navResponse = await this._signoutStart(args, handle);
    return await this._signoutEnd(navResponse.url);
  }
  async _signoutStart(args = {}, handle) {
    var _a;
    const logger2 = this._logger.create("_signoutStart");
    try {
      const user = await this._loadUser();
      logger2.debug("loaded current user from storage");
      if (this.settings.revokeTokensOnSignout) {
        await this._revokeInternal(user);
      }
      const id_token = args.id_token_hint || user && user.id_token;
      if (id_token) {
        logger2.debug("setting id_token_hint in signout request");
        args.id_token_hint = id_token;
      }
      await this.removeUser();
      logger2.debug("user removed, creating signout request");
      const signoutRequest = await this._client.createSignoutRequest(args);
      logger2.debug("got signout request");
      return await handle.navigate({
        url: signoutRequest.url,
        state: (_a = signoutRequest.state) == null ? void 0 : _a.id
      });
    } catch (err) {
      logger2.debug("error after preparing navigator, closing navigator window");
      handle.close();
      throw err;
    }
  }
  async _signoutEnd(url) {
    const logger2 = this._logger.create("_signoutEnd");
    const signoutResponse = await this._client.processSignoutResponse(url);
    logger2.debug("got signout response");
    return signoutResponse;
  }
  async signoutSilent(args = {}) {
    var _a;
    const logger2 = this._logger.create("signoutSilent");
    const {
      silentRequestTimeoutInSeconds,
      ...requestArgs
    } = args;
    const id_token_hint = this.settings.includeIdTokenInSilentSignout ? (_a = await this._loadUser()) == null ? void 0 : _a.id_token : void 0;
    const url = this.settings.popup_post_logout_redirect_uri;
    const handle = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
    await this._signout({
      request_type: "so:s",
      post_logout_redirect_uri: url,
      id_token_hint,
      ...requestArgs
    }, handle);
    logger2.info("success");
  }
  async signoutSilentCallback(url = window.location.href) {
    const logger2 = this._logger.create("signoutSilentCallback");
    await this._iframeNavigator.callback(url);
    logger2.info("success");
  }
  async revokeTokens(types) {
    const user = await this._loadUser();
    await this._revokeInternal(user, types);
  }
  async _revokeInternal(user, types = this.settings.revokeTokenTypes) {
    const logger2 = this._logger.create("_revokeInternal");
    if (!user)
      return;
    const typesPresent = types.filter((type) => typeof user[type] === "string");
    if (!typesPresent.length) {
      logger2.debug("no need to revoke due to no token(s)");
      return;
    }
    for (const type of typesPresent) {
      await this._client.revokeToken(
        user[type],
        type
      );
      logger2.info(`${type} revoked successfully`);
      if (type !== "access_token") {
        user[type] = null;
      }
    }
    await this.storeUser(user);
    logger2.debug("user stored");
    this._events.load(user);
  }
  startSilentRenew() {
    this._logger.create("startSilentRenew");
    void this._silentRenewService.start();
  }
  stopSilentRenew() {
    this._silentRenewService.stop();
  }
  get _userStoreKey() {
    return `user:${this.settings.authority}:${this.settings.client_id}`;
  }
  async _loadUser() {
    const logger2 = this._logger.create("_loadUser");
    const storageString = await this.settings.userStore.get(this._userStoreKey);
    if (storageString) {
      logger2.debug("user storageString loaded");
      return User.fromStorageString(storageString);
    }
    logger2.debug("no user storageString");
    return null;
  }
  async storeUser(user) {
    const logger2 = this._logger.create("storeUser");
    if (user) {
      logger2.debug("storing user");
      const storageString = user.toStorageString();
      await this.settings.userStore.set(this._userStoreKey, storageString);
    } else {
      this._logger.debug("removing user");
      await this.settings.userStore.remove(this._userStoreKey);
    }
  }
  async clearStaleState() {
    await this._client.clearStaleState();
  }
};

// package.json
var version = "2.2.0";

// src/Version.ts
var Version = (/* unused pure expression or super */ null && (version));

//# sourceMappingURL=oidc-client-ts.js.map

;// CONCATENATED MODULE: ./projects/auth-js/core/auth-manager.ts
class AuthManager {}
;// CONCATENATED MODULE: ./projects/auth-js/core/auth-subscriptions.ts


class AuthSubscriptions {
  constructor() {
    this.subscribers = [];
    this.lastNotifiedValue = void 0;
  }

  add(subscriber) {
    this.subscribers.push(subscriber);

    if (this.lastNotifiedValue) {
      void subscriber(...this.lastNotifiedValue);
    }

    return {
      unsubscribe: () => this.unsubscribe(subscriber)
    };
  }

  notify(...args) {
    this.lastNotifiedValue = args;
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
;// CONCATENATED MODULE: ./projects/auth-js/oidc/mobile/mobile-storage.ts
var _window$Capacitor, _window$Capacitor$Plu, _window$Capacitor2, _window$Capacitor2$Pl, _window$Capacitor3, _window$Capacitor3$Pl;





/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */
 // defaults

const LOCAL_STORAGE = window.localStorage; // @capacitor < 4.x

const CAPACITOR_STORAGE = (_window$Capacitor = window.Capacitor) == null ? void 0 : (_window$Capacitor$Plu = _window$Capacitor.Plugins) == null ? void 0 : _window$Capacitor$Plu.Storage; // @capacitor >= 4.x (`Storage` was renamed `Preferences`)

const CAPACITOR_PREFERENCES = (_window$Capacitor2 = window.Capacitor) == null ? void 0 : (_window$Capacitor2$Pl = _window$Capacitor2.Plugins) == null ? void 0 : _window$Capacitor2$Pl.Preferences; // most secured

const CAPACITOR_SECURE_STORAGE = (_window$Capacitor3 = window.Capacitor) == null ? void 0 : (_window$Capacitor3$Pl = _window$Capacitor3.Plugins) == null ? void 0 : _window$Capacitor3$Pl.SecureStoragePlugin;
class MobileStorage {
  constructor() {
    this._logger = new Logger('MobileStorage');

    if (!CAPACITOR_SECURE_STORAGE) {
      let message = '[@badisi/auth-js] This application is currently using an unsafe storage.\n\n';
      message += 'ⓘ Please follow the recommended guide and use `capacitor-secure-storage-plugin` instead.';
      console.warn(message);
    }

    if (CAPACITOR_SECURE_STORAGE) {
      this._logger.debug('Using `capacitor-secure-storage-plugin` implementation');
    } else if (CAPACITOR_PREFERENCES) {
      this._logger.debug('Using `@capacitor/preferences` implementation');
    } else if (CAPACITOR_STORAGE) {
      this._logger.debug('Using `@capacitor/storage` implementation');
    } else {
      this._logger.debug('Using `localStorage` implementation');
    }
  }

  get length() {
    return async function () {
      if (CAPACITOR_SECURE_STORAGE) {
        return (await CAPACITOR_SECURE_STORAGE.keys()).value.length;
      } else if (CAPACITOR_PREFERENCES) {
        return (await CAPACITOR_PREFERENCES.keys()).keys.length;
      } else if (CAPACITOR_STORAGE) {
        return (await CAPACITOR_STORAGE.keys()).keys.length;
      } else {
        return LOCAL_STORAGE.length;
      }
    }();
  }

  async key(index) {
    if (CAPACITOR_SECURE_STORAGE) {
      return (await CAPACITOR_SECURE_STORAGE.keys()).value[index];
    } else if (CAPACITOR_PREFERENCES) {
      return (await CAPACITOR_PREFERENCES.keys()).keys[index];
    } else if (CAPACITOR_STORAGE) {
      return (await CAPACITOR_STORAGE.keys()).keys[index];
    } else {
      return LOCAL_STORAGE.key(index);
    }
  }

  async clear() {
    this._logger.create('clear');

    if (CAPACITOR_SECURE_STORAGE) {
      await CAPACITOR_SECURE_STORAGE.clear();
    } else if (CAPACITOR_PREFERENCES) {
      await CAPACITOR_PREFERENCES.clear();
    } else if (CAPACITOR_STORAGE) {
      await CAPACITOR_STORAGE.clear();
    } else {
      LOCAL_STORAGE.clear();
    }
  }

  async getItem(key) {
    this._logger.create(`getItem('${key}')`);

    if (CAPACITOR_SECURE_STORAGE) {
      try {
        return (await CAPACITOR_SECURE_STORAGE.get({
          key
        })).value;
      } catch (_unused) {
        return null;
      }
    } else if (CAPACITOR_PREFERENCES) {
      return (await CAPACITOR_PREFERENCES.get({
        key
      })).value;
    } else if (CAPACITOR_STORAGE) {
      return (await CAPACITOR_STORAGE.get({
        key
      })).value;
    } else {
      return LOCAL_STORAGE.getItem(key);
    }
  }

  async setItem(key, value) {
    this._logger.create(`setItem('${key}')`);

    if (CAPACITOR_SECURE_STORAGE) {
      await CAPACITOR_SECURE_STORAGE.set({
        key,
        value
      });
    } else if (CAPACITOR_PREFERENCES) {
      await CAPACITOR_PREFERENCES.set({
        key,
        value
      });
    } else if (CAPACITOR_STORAGE) {
      await CAPACITOR_STORAGE.set({
        key,
        value
      });
    } else {
      LOCAL_STORAGE.setItem(key, value);
    }
  }

  async removeItem(key) {
    this._logger.create(`removeItem('${key}')`);

    if (CAPACITOR_SECURE_STORAGE) {
      await CAPACITOR_SECURE_STORAGE.remove({
        key
      });
    } else if (CAPACITOR_PREFERENCES) {
      await CAPACITOR_PREFERENCES.remove({
        key
      });
    } else if (CAPACITOR_STORAGE) {
      await CAPACITOR_STORAGE.remove({
        key
      });
    } else {
      LOCAL_STORAGE.removeItem(key);
    }
  }

}
;// CONCATENATED MODULE: ./projects/auth-js/oidc/models/oidc-auth-settings.model.ts
let Navigation; // TODO: check if `monitorSession` and `revokeAccessTokenOnSignout` might be useful too ?

(function (Navigation) {
  Navigation["REDIRECT"] = "REDIRECT";
  Navigation["POPUP"] = "POPUP";
})(Navigation || (Navigation = {}));
;// CONCATENATED MODULE: ./projects/auth-js/oidc/models/user-session.model.ts



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
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
;// CONCATENATED MODULE: ./projects/auth-js/oidc/mobile/mobile-window.ts
var mobile_window_window$Capacitor, mobile_window_window$Capacitor$Plu, mobile_window_window$Capacitor2, mobile_window_window$Capacitor2$Pl;



/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */


const CUSTOM_URL_SCHEME_HANDLER_TIMEOUT = 10 * 1000; // 10s

const CAPACITOR_APP = (mobile_window_window$Capacitor = window.Capacitor) == null ? void 0 : (mobile_window_window$Capacitor$Plu = mobile_window_window$Capacitor.Plugins) == null ? void 0 : mobile_window_window$Capacitor$Plu.App;
const CAPACITOR_BROWSER = (mobile_window_window$Capacitor2 = window.Capacitor) == null ? void 0 : (mobile_window_window$Capacitor2$Pl = mobile_window_window$Capacitor2.Plugins) == null ? void 0 : mobile_window_window$Capacitor2$Pl.Browser;
const BROWSER_TAB = undefined; // cordova?.plugins?.browsertab;

class MobileWindow {
  constructor(options, redirectUrl) {
    this.options = options;
    this.redirectUrl = redirectUrl;
    this._logger = new Logger('MobileWindow');
    this.capacitorAppUrlOpenHandle = void 0;
    this.capacitorBrowserFinishedHandle = void 0;
    this.originalHandleOpenURL = window.handleOpenURL;
    this.timer = void 0;
    this.navigateLogger = void 0;
    this._resolve = void 0;
    this._reject = void 0;

    if (!AuthUtils.isCapacitor() && !AuthUtils.isCordova()) {
      let message = '[@badisi/auth-js] Required core dependency not found.\n\n';
      message += 'ⓘ Please follow the recommended guide and install either `Capacitor` or `Cordova` dependency.';
      console.error(message);
    }

    if (!BROWSER_TAB && !CAPACITOR_BROWSER) {
      let message = '[@badisi/auth-js] Required plugin not found.\n\n';
      message += 'ⓘ Please follow the recommended guide and install either `@badisi/capacitor-browsertab` or `@capacitor/browser` plugin.';
      console.error(message);
    }

    if (!BROWSER_TAB && CAPACITOR_BROWSER) {
      let message = '[@badisi/auth-js] This application is currently using a non recommended browser plugin.\n\n';
      message += 'ⓘ Please follow the recommended guide and use `@badisi/capacitor-browsertab` instead.';
      console.warn(message);
    }

    if (BROWSER_TAB) {
      this._logger.debug('Using `@badisi/capacitor-browsertab` implementation');
    } else if (CAPACITOR_BROWSER) {
      this._logger.debug('Using `@capacitor/browser` implementation');
    }
  }

  async navigate(params) {
    this.navigateLogger = this._logger.create('navigate');
    this.navigateLogger.debug('url', params.url);
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      void this.installCustomUrlSchemeHandler().then(() => {
        if (BROWSER_TAB) {
          void this.useBrowserTab(params);
        } else if (CAPACITOR_BROWSER) {
          void this.useCapacitorBrowser(params);
        }
      });
    });
  }

  async close() {
    const logger = this._logger.create('close');

    await (CAPACITOR_BROWSER == null ? void 0 : CAPACITOR_BROWSER.close().catch(err => logger.error(err))); // TODO: BROWSER_TAB?.close();

    logger.debug('success');
  } // --- HELPER(s) ---


  async cleanup() {
    var _this$capacitorBrowse, _this$capacitorAppUrl;

    const logger = this._logger.create('cleanup');

    window.handleOpenURL = this.originalHandleOpenURL;
    await ((_this$capacitorBrowse = this.capacitorBrowserFinishedHandle) == null ? void 0 : _this$capacitorBrowse.remove());
    await ((_this$capacitorAppUrl = this.capacitorAppUrlOpenHandle) == null ? void 0 : _this$capacitorAppUrl.remove());
    clearTimeout(this.timer);
    logger.debug('success');
  }

  async onError(message) {
    var _this$navigateLogger, _this$_reject;

    (_this$navigateLogger = this.navigateLogger) == null ? void 0 : _this$navigateLogger.error('error response:', message);
    await this.cleanup();
    await this.close();
    (_this$_reject = this._reject) == null ? void 0 : _this$_reject.call(this, new Error(message));
  }

  async onSuccess(url) {
    var _this$navigateLogger2, _this$_resolve;

    (_this$navigateLogger2 = this.navigateLogger) == null ? void 0 : _this$navigateLogger2.debug('successful response:', url);
    await this.cleanup();
    await this.close();
    (_this$_resolve = this._resolve) == null ? void 0 : _this$_resolve.call(this, {
      url
    });
  }

  async useCapacitorBrowser(params) {
    this.capacitorBrowserFinishedHandle = await (CAPACITOR_BROWSER == null ? void 0 : CAPACITOR_BROWSER.addListener('browserFinished', () => void this.onError('Capacitor browser closed by user')));
    await (CAPACITOR_BROWSER == null ? void 0 : CAPACITOR_BROWSER.open({
      url: params.url,
      presentationStyle: 'popover'
    }));
  }

  async useBrowserTab(_params) {
    /* TODO: BROWSER_TAB?.openUrl(
        url,
        { scheme: this.params.redirect_uri },
        (event: string) => this.onSuccess(event),
        () => this.onError('BrowserTab: error opening browser')
    );*/
  }

  async installCustomUrlSchemeHandler() {
    const logger = this._logger.create('installCustomUrlSchemeHandler'); // Set a timeout in case no response is received


    this.timer = setTimeout(() => void this.onError('Installing custom url scheme handler, timed out without a response'), CUSTOM_URL_SCHEME_HANDLER_TIMEOUT); // Clean-up

    await this.cleanup(); // Install handler

    if (AuthUtils.isCapacitor()) {
      logger.debug('listening to Capacitor `appUrlOpen` event');
      this.capacitorAppUrlOpenHandle = await (CAPACITOR_APP == null ? void 0 : CAPACITOR_APP.addListener == null ? void 0 : CAPACITOR_APP.addListener('appUrlOpen', ({
        url
      }) => {
        if (AuthUtils.isUrlMatching(url, this.redirectUrl)) {
          void this.onSuccess(url);
        }
      }));
    } else if (AuthUtils.isCordova()) {
      logger.debug('waiting for Cordova `handleOpenURL` callback');

      window.handleOpenURL = url => {
        var _this$originalHandleO;

        (_this$originalHandleO = this.originalHandleOpenURL) == null ? void 0 : _this$originalHandleO.call(this, url);

        if (AuthUtils.isUrlMatching(url, this.redirectUrl)) {
          void this.onSuccess(url);
        }
      };
    }

    logger.debug('success');
  }

}
;// CONCATENATED MODULE: ./projects/auth-js/oidc/mobile/mobile-navigator.ts


class MobileNavigator {
  constructor(settings) {// TODO: manage settings

    this.settings = settings;
    this._logger = new Logger('MobileNavigator');
  }

  prepare(options, redirectUrl) {
    // TODO: manage options
    this._logger.create('prepare');

    return new MobileWindow(options, redirectUrl);
  }

}
;// CONCATENATED MODULE: ./projects/auth-js/oidc/user-manager.ts

const _excluded = ["name"],
      _excluded2 = ["name"];



/* eslint-disable @typescript-eslint/naming-convention, camelcase */



/**
 * Extended UserManager class that adds helpers and mobile capabilities
 * (ex: signinMobile, signoutMobile, MobileNavigator, MobileWindow)
 */
class UserManager extends oidc_client_ts_UserManager {
  constructor(libSettings) {
    super(Object.assign({
      authority: libSettings.authorityUrl,
      client_id: libSettings.clientId,
      scope: libSettings.scope,
      loadUserInfo: libSettings.loadUserInfo,
      automaticSilentRenew: libSettings.automaticSilentRenew
    }, libSettings.internal));
    this.libSettings = libSettings;
    this._mobileNavigator = void 0;
    this._mobileNavigator = new MobileNavigator(this.settings);
  }
  /* public async readRequestTypeFromState(url = location.href): Promise<string | null> {
      const parsedUrl = new URL(url, location.origin);
      const params = parsedUrl[this.settings.response_mode === 'fragment' ? 'hash' : 'search'];
      const stateParam = new URLSearchParams(params.slice(1)).get('state');
      if (stateParam) {
          const storedStateString = await this.settings.stateStore.get(stateParam);
          if (storedStateString) {
              const state = JSON.parse(storedStateString) as { request_type: string };
              return state.request_type;
          }
      }
      return null;
  }*/


  async signoutMobile(args = {}) {
    const logger = this._logger.create('signout');

    const {
      name
    } = args,
          requestArgs = _objectWithoutPropertiesLoose(args, _excluded);

    const handle = this._mobileNavigator.prepare({
      name
    }, this.settings.post_logout_redirect_uri);

    await this._signout(Object.assign({
      request_type: 'so:m',
      post_logout_redirect_uri: this.settings.post_logout_redirect_uri
    }, requestArgs), handle);
    logger.info('success');
  }

  async signinMobile(args = {}) {
    var _user$profile;

    const logger = this._logger.create('signin');

    const {
      name
    } = args,
          requestArgs = _objectWithoutPropertiesLoose(args, _excluded2);

    const handle = this._mobileNavigator.prepare({
      name
    }, this.settings.redirect_uri);

    const user = await this._signin(Object.assign({
      request_type: 'si:m',
      redirect_uri: this.settings.redirect_uri
    }, requestArgs), handle);

    if (user != null && (_user$profile = user.profile) != null && _user$profile.sub) {
      logger.info('success, signed in subject', user.profile.sub);
    } else {
      logger.info('no subject');
    }
  }

}
;// CONCATENATED MODULE: ./projects/auth-js/oidc/oidc-auth-manager.ts











/* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/naming-convention, camelcase */







const REDIRECT_URL_KEY = 'auth-js:oidc_manager:redirect_url';
const DEFAULT_SETTINGS = {
  loginRequired: false,
  retrieveUserSession: true,
  loadUserInfo: false,
  automaticSilentRenew: true,
  navigationType: Navigation.REDIRECT,
  scope: 'openid profile email phone',
  logLevel: Log.NONE,
  internal: {
    response_type: 'code',
    redirect_uri: '?oidc-callback=login',
    post_logout_redirect_uri: '?oidc-callback=logout',
    popup_redirect_uri: 'oidc/callback/popup_redirect.html',
    popup_post_logout_redirect_uri: 'oidc/callback/popup_redirect.html',
    silent_redirect_uri: 'oidc/callback/silent_redirect.html'
  }
};
class OIDCAuthManager extends AuthManager {
  constructor(...args) {
    super(...args);
    this.idTokenSubs = new AuthSubscriptions();
    this.accessTokenSubs = new AuthSubscriptions();
    this.userProfileSubs = new AuthSubscriptions();
    this.userSessionSubs = new AuthSubscriptions();
    this.authenticatedSubs = new AuthSubscriptions();
    this.renewingSubs = new AuthSubscriptions();
    this.redirectSubs = new AuthSubscriptions();
    this.userManagerSubs = [];
    this._idToken = void 0;
    this._accessToken = void 0;
    this._userProfile = void 0;
    this._userSession = void 0;
    this._isAuthenticated = false;
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
      this._userSession = value ? UserSession.deserialize(value) : undefined;
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
        _this = this,
        _this$settings$intern,
        _this$settings$intern2;

    Log.setLevel(userSettings.logLevel || DEFAULT_SETTINGS.logLevel || Log.NONE);
    Log.setLogger(console);
    const isNativeMobile = AuthUtils.isNativeMobile();
    /**
     * Providers like Keycloak does not handle custom redirect urls like `demo-app://?oidc-callback=login`,
     * because they lack a host name. To fix this, `demo-app://localhost/?oidc-callback=login` is used instead.
     */

    const baseUrl = isNativeMobile ? `${userSettings.mobileScheme}://localhost/` : AuthUtils.getBaseUrl(); // Initialize settings

    this.settings = lodash_es_merge({}, DEFAULT_SETTINGS, {
      internal: {
        userStore: new WebStorageStateStore({
          store: isNativeMobile ? new MobileStorage() : new InMemoryWebStorage()
        }),
        redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int.redirect_uri}`,
        post_logout_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int2 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int2.post_logout_redirect_uri}`,
        popup_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int3 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int3.popup_redirect_uri}`,
        popup_post_logout_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int4 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int4.popup_post_logout_redirect_uri}`,
        silent_redirect_uri: `${baseUrl}${(_DEFAULT_SETTINGS$int5 = DEFAULT_SETTINGS.internal) == null ? void 0 : _DEFAULT_SETTINGS$int5.silent_redirect_uri}`
      }
    }, userSettings); // Apply some patches

    this.patchAuth0Logout(); // Configure the user manager

    this.userManager = new UserManager(this.settings); // Listen for events

    this.userManagerSubs.push(this.userManager.events.addUserLoaded(user => {
      this.user = user;
    }), this.userManager.events.addUserUnloaded(() => {
      this.user = null;
    }), this.userManager.events.addSilentRenewError(async function () {
      await _this.removeUser();
    })); // Make sure we are not trapped in the inception loop

    this.assertNotInInceptionLoop(); // Decide what to do..

    if (AuthUtils.isUrlMatching(location.href, (_this$settings$intern = this.settings.internal) == null ? void 0 : _this$settings$intern.redirect_uri)) {
      await this.runSyncOrAsync(() => this.backFromSigninRedirect());
    } else if (AuthUtils.isUrlMatching(location.href, (_this$settings$intern2 = this.settings.internal) == null ? void 0 : _this$settings$intern2.post_logout_redirect_uri)) {
      await this.runSyncOrAsync(() => this.backFromSignoutRedirect());
    } else if (this.settings.retrieveUserSession || this.settings.loginRequired) {
      var _this$userManager;

      const signinSilent = async function signinSilent() {
        await _this.runSyncOrAsync(() => _this.signinSilent().catch(async function (signinSilentError) {
          if (_this.settings.loginRequired) {
            const {
              error,
              message
            } = signinSilentError; // ex: login_required, consent_required, interaction_required, account_selection_required

            if (error != null && error.includes('_required') || message != null && message.includes('_required')) {
              await _this.login();
              return;
            }
          }

          console.error(signinSilentError);

          _this.authenticatedSubs.notify(false);
        }));
      }; // Try to load user from storage


      const user = await ((_this$userManager = this.userManager) == null ? void 0 : _this$userManager.getUser());

      if (!user || user.expired) {
        // on desktop -> try a silent renew with iframe
        if (!isNativeMobile && this.settings.retrieveUserSession) {
          await signinSilent(); // else -> force login if required
        } else if (this.settings.loginRequired) {
          await this.login(); // else -> gracefully notify that we are not authenticated
        } else {
          this.authenticatedSubs.notify(false);
        }
      } else {
        this.user = user;
      }
    } else {
      this.authenticatedSubs.notify(false);
    }
  }

  async logout(redirectUrl = location.href, navigationType) {
    var _this$userManager3, _this$userManager4;

    if (AuthUtils.isNativeMobile()) {
      var _this$userManager2;

      await ((_this$userManager2 = this.userManager) == null ? void 0 : _this$userManager2.signoutMobile());
      await this.redirect(redirectUrl);
      this.postLogoutVerification(redirectUrl);
    } else {
      switch (navigationType || this.settings.navigationType) {
        case Navigation.POPUP:
          await ((_this$userManager3 = this.userManager) == null ? void 0 : _this$userManager3.signoutPopup());
          await this.redirect(redirectUrl);
          break;

        case Navigation.REDIRECT:
        default:
          sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
          await ((_this$userManager4 = this.userManager) == null ? void 0 : _this$userManager4.signoutRedirect());
          break;
      }
    }
  }

  async login(redirectUrl = location.href, navigationType) {
    var _this$userManager6, _this$userManager7;

    if (AuthUtils.isNativeMobile()) {
      var _this$userManager5;

      this.notifyRenew(true);
      await ((_this$userManager5 = this.userManager) == null ? void 0 : _this$userManager5.signinMobile().finally(() => this.notifyRenew(false)));
      await this.redirect(redirectUrl);
    } else {
      switch (navigationType || this.settings.navigationType) {
        case Navigation.POPUP:
          this.notifyRenew(true);
          await ((_this$userManager6 = this.userManager) == null ? void 0 : _this$userManager6.signinPopup().catch(error => {
            var _error;

            if (((_error = error) == null ? void 0 : _error.message) === 'Attempted to navigate on a disposed window') {
              error = new Error('[OIDCAuthManager] Attempted to navigate on a disposed window.');
              error.stack = undefined;
              error.message += '\n\nⓘ This may be due to an ad blocker.';
            }

            throw error;
          }).finally(() => this.notifyRenew(false)));
          await this.redirect(redirectUrl);
          break;

        case Navigation.REDIRECT:
        default:
          sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
          await ((_this$userManager7 = this.userManager) == null ? void 0 : _this$userManager7.signinRedirect());
          break;
      }
    }

    return this._isAuthenticated;
  }

  async renew() {
    return this.signinSilent().catch(error => console.error(error));
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
    return AuthUtils.decodeJwt(this._idToken);
  }

  async getAccessToken() {
    await this.waitForRenew('getAccessToken()');
    return this._accessToken;
  }

  async getAccessTokenDecoded() {
    await this.waitForRenew('getAccessTokenDecoded()');
    return AuthUtils.decodeJwt(this._accessToken);
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
   * Makes sure that the execution code is not trapped in an infinite loop.
   *
   * @example
   * 1) signinSilent or signinPopup was asked
   * 2) iframe or popup was created and navigation was made to OP
   * 3) redirection occurs in iframe or popup
   * 4) `silent_redirect_uri` or `popup_redirect_uri` is not found
   * 5) the web app (instead of the proper redirect_uri) is loaded in the iframe or popup
   * 6) an inception loop occurs -> app in iframe in iframe in iframe or popup in popup in popup..
   */


  assertNotInInceptionLoop() {
    var _this$settings$intern3, _this$settings$intern4;

    [(_this$settings$intern3 = this.settings.internal) == null ? void 0 : _this$settings$intern3.silent_redirect_uri, (_this$settings$intern4 = this.settings.internal) == null ? void 0 : _this$settings$intern4.popup_redirect_uri].forEach(uri => {
      var _RegExp$exec;

      const htmlFileName = (_RegExp$exec = new RegExp(/^.*\/(.*).html$/gm).exec(uri || '')) == null ? void 0 : _RegExp$exec[1];
      const error = new Error(`[OIDCAuthManager] ${uri || 'redirect uri'} was not found.`);
      error.stack = undefined;

      if (AuthUtils.isUrlMatching(location.href, uri)) {
        error.message += '\n\nⓘ This usually means you forgot to include the redirect html files in your application assets.';
        throw error;
      } else if (location.href.includes(`/${htmlFileName}.html`)) {
        error.message += '\n\nⓘ This usually means your redirect urls are misconfigured.';
        throw error;
      }
    });
  }
  /**
   * Waits for a renew to finish or times out after 5s.
   *
   * @example
   * 1) isNativeMobile = true + app is in background
   * 2) access token expires
   * 3) app is brought back to foreground
   * 4) addAccessTokenExpired event is called
   * 5) signinSilent is called
   * 6) in parallel user navigates somewhere and triggers isAuthenticated
   * 7) isAuthenticated should wait signinSilent to finish before returning
   */


  async waitForRenew(caller) {
    const startTime = Date.now(); // eslint-disable-next-line no-loops/no-loops

    while (this._isRenewing) {
      if (Date.now() > startTime + 5000) {
        console.warn('[@badisi/auth-js]', `\`${caller}\``, 'timed out waiting for renew to finish.');
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  /**
   * Triggers a re-login after a logout (if required).
   *
   * @example
   * 1) user is at http://my-app.com, logged-in and loginRequired=true
   * 2) user triggers a logout and gets redirected to '/'
   * 3) url did not changed, so no navigation occured and no guards either
   * 4) at this point, user is logged-out but still inside the app and able to see it
   */


  postLogoutVerification(redirectUrlAskedAfterLogout) {
    const postLogoutUrl = AuthUtils.stringToURL(redirectUrlAskedAfterLogout || '/');

    if (this.settings.loginRequired && location.origin === postLogoutUrl.origin) {
      location.reload();
    }
  }

  notifyRenew(value) {
    this._isRenewing = value;
    this.renewingSubs.notify(value);
  }

  async runSyncOrAsync(job) {
    // eslint-disable-next-line @typescript-eslint/brace-style, max-statements-per-line
    if (this.settings.loginRequired) {
      await job();
    } else {
      void job();
    }
  }

  async redirect(url, error) {
    if (error) {
      console.error(error);
      await this.removeUser();
    }

    const redirectUrl = AuthUtils.stringToURL(url || '/'); // History cannot be rewritten when origin is different

    if (location.origin === redirectUrl.origin) {
      history.replaceState(history.state, '', redirectUrl.href);
      this.redirectSubs.notify(redirectUrl);
    } else {
      location.href = redirectUrl.href;
    }
  }

  async removeUser() {
    var _this$userManager8, _this$userManager9;

    this.user = null;
    await Promise.all([(_this$userManager8 = this.userManager) == null ? void 0 : _this$userManager8.clearStaleState(), (_this$userManager9 = this.userManager) == null ? void 0 : _this$userManager9.removeUser()]);
  }

  async signinSilent() {
    this.notifyRenew(true);

    try {
      var _this$userManager10;

      await ((_this$userManager10 = this.userManager) == null ? void 0 : _this$userManager10.signinSilent());
    } catch (error) {
      await this.removeUser();
      throw error;
    } finally {
      this.notifyRenew(false);
    }
  }

  async backFromSigninRedirect() {
    try {
      var _this$userManager11;

      await ((_this$userManager11 = this.userManager) == null ? void 0 : _this$userManager11.signinRedirectCallback(location.href));
      await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
    } catch (error) {
      await this.redirect('/', error);
      throw error;
    } finally {
      sessionStorage.removeItem(REDIRECT_URL_KEY);
    }
  }

  async backFromSignoutRedirect() {
    let redirectUrl = sessionStorage.getItem(REDIRECT_URL_KEY);

    try {
      var _this$userManager12;

      await ((_this$userManager12 = this.userManager) == null ? void 0 : _this$userManager12.signoutRedirectCallback(location.href));
      await this.redirect(redirectUrl);
      await this.removeUser();
    } catch (error) {
      redirectUrl = '/';
      await this.redirect(redirectUrl, error);
      throw error;
    } finally {
      sessionStorage.removeItem(REDIRECT_URL_KEY);
      this.postLogoutVerification(redirectUrl);
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
      var _this$settings$intern5, _this$settings$intern6;

      const {
        authorityUrl,
        clientId,
        navigationType
      } = this.settings;
      const returnTo = navigationType === Navigation.POPUP ? (_this$settings$intern5 = this.settings.internal) == null ? void 0 : _this$settings$intern5.popup_post_logout_redirect_uri : (_this$settings$intern6 = this.settings.internal) == null ? void 0 : _this$settings$intern6.post_logout_redirect_uri;
      this.settings.internal = lodash_es_merge({}, {
        metadataSeed: {
          end_session_endpoint: `${authorityUrl}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`
        }
      }, this.settings.internal);
    }
  }

}
;// CONCATENATED MODULE: ./projects/auth-js/oidc/main.ts



const initOidc = async settings => await createAuthManager(settings, OIDCAuthManager);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
// EXTERNAL MODULE: ./node_modules/@capacitor/core/dist/index.cjs.js
var index_cjs = __webpack_require__(7796);
;// CONCATENATED MODULE: ./projects/demo-app/web/common/core/index.ts






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

    .card .card-status {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-left: 8px;
        background-color: #f2f2f2;
    }
    .card .card-status.error {
        background-color: #ef5350;
    }
    .card .card-status.success {
        background-color: #66bb6a;
    }

    .card .card-title {
        padding: 16px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
        align-items: center;
    }

    .card .box {
        height: 200px;
        border-top: 1px solid lightgray;
        word-break: break-all;
        overflow: auto;
        background-color: #f2f2f2;
        padding: 12px;
    }
    .card .box pre {
        margin: 0;
    }

    .card .card-actions {
        padding: 0 14px 8px 14px;
        min-height: 50px;
    }
    .card .card-actions .input {
        display: flex;
        align-items: center;
    }
    .card .card-actions .input:not(:last-child) {
        margin-bottom: 8px;
    }
    .card .card-actions .input label {
        width: 125px;
        text-align: right;
        margin-right: 14px;
    }
    .card .card-actions .input input {
        padding: 4px;
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
            padding-bottom: 24px !important;
        }

        :host .card {
            border: 0;
            margin: 0;
            margin-bottom: 6px;
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
;// CONCATENATED MODULE: ./projects/demo-app/web/common/components/demo-app-header.element.ts



const demo_app_header_element_template = document.createElement('template');
demo_app_header_element_template.innerHTML = `
    <style>
        ${globalStyle}

        :host header {
            z-index: 1;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding-top: calc(0px + var(--safe-area-inset-top));
            align-items: center;
            height: 130px;
            color: white;
            background: rgb(103, 58, 183);
            background: linear-gradient(180deg, rgba(103, 58, 183, 1) 0%, rgba(94, 53, 177, 1) 100%);
        }

        :host header .github-icon {
            position: absolute;
            top: calc(20px + var(--safe-area-inset-top));
            right: 34px;
            width: 26px;
            height: 26px;
            color: white;
        }

        @keyframes statusLoadingAnimation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        :host header .status.loading {
            background: none;
        }

        :host header .status.loading:after {
            display: block;
            content: " ";
            width: 11px;
            height: 11px;
            border-radius: 50%;
            border: 2px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: statusLoadingAnimation 1.2s linear infinite;
        }

        :host header .status.not-authenticated {
            background-color: #EC407A;
        }

        :host header .status.authenticated {
            background-color: #7CB342;
        }

        :host header .status {
            position: absolute;
            top: calc(25px + var(--safe-area-inset-top));
            right: 70px;
            width: 15px;
            height: 15px;
            z-index: 1;
            border-radius: 50%;
            margin-top: 1px;
            margin-right: 8px;
        }

        :host header .version {
            position: absolute;
            bottom: 13px;
        }

        :host header .version a {
            font-size: 13px;
            font-weight: 300;
            font-style: italic;
            text-decoration: none;
            color: #bda9e1;
        }

        :host header .version a:hover {
            text-decoration: underline;
        }

        :host header .title {
            position: relative;
            align-items: center;
            margin: 8px 0;
            font-size: 1.4em;
            font-weight: 400;
            color: #ede7f6;
        }

        :host header .title .icon {
            margin-top: 3px;
            margin-right: 4px;
        }

        :host header .title select {
            cursor: pointer;
            text-align: center;
            font-size: 1.1em;
            font-weight: bold;
            color: #ede7f6;
            background: none;
            border: none;
            outline: none;
        }

        :host header .title .tip {
            position: absolute;
            right: -204px;
            font-size: 15px;
            font-weight: 300;
            font-style: italic;
            color: #ffd341;
        }

        :host header .title .tip .hand {
            font-size: 18px;
        }

        :host header button {
            margin-top: 2px;
        }

        :host header button:not(:last-child) {
            margin-right: 10px;
        }

        @media only screen and (max-width: 600px) {
            :host header .title {
                align-self: flex-start;
                margin-left: 18px;
            }

            :host header .status {
                right: 54px;
            }

            :host header .github-icon {
                right: 24px;
            }
        }
        @media only screen and (max-width: 1000px) {
            :host header .title .tip {
                display: none;
            }
        }
    </style>

    <header class="column">
        <div class="status loading"></div>

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
            <span class="icon">🛡️</span>Demo app &#123; <select id="implementation-select"></select> &#125;
            <div class="tip"><span class="hand">👈</span> choose an implementation</div>
        </div>

        <div class="version"></div>

        <div class="row">
            <button id="login-button">LOGIN</button>
            <button id="logout-button">LOGOUT</button>
            <button id="silent-renew-button">SILENT RENEW</button>
        </div>
    </header>
`;
class DemoAppHeaderElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot, _this$shadowRoot2, _this$shadowRoot3, _this$shadowRoot4, _this$shadowRoot5, _this$shadowRoot6, _this$shadowRoot7;

    super();
    this.listeners = [];
    this.implSelectEl = void 0;
    this.statusEl = void 0;
    this.versionEl = void 0;
    this.loginButtonEl = void 0;
    this.logoutButtonEl = void 0;
    this.silentRenewButtonEl = void 0;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(demo_app_header_element_template.content, true));
    this.implSelectEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('#implementation-select');
    this.statusEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('.status');
    this.versionEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('.version');
    this.loginButtonEl = (_this$shadowRoot5 = this.shadowRoot) == null ? void 0 : _this$shadowRoot5.querySelector('#login-button');
    this.logoutButtonEl = (_this$shadowRoot6 = this.shadowRoot) == null ? void 0 : _this$shadowRoot6.querySelector('#logout-button');
    this.silentRenewButtonEl = (_this$shadowRoot7 = this.shadowRoot) == null ? void 0 : _this$shadowRoot7.querySelector('#silent-renew-button');
  }

  set isRenewing(value) {
    if (this.statusEl) {
      this.statusEl.classList[value ? 'add' : 'remove']('loading');
    }
  }

  set isAuthenticated(value) {
    if (this.statusEl && value !== null) {
      this.statusEl.classList.remove('loading');
      this.statusEl.title = value ? 'Authenticated' : 'Not authenticated';
      this.statusEl.classList[value ? 'add' : 'remove']('authenticated');
      this.statusEl.classList[value ? 'remove' : 'add']('not-authenticated');
    }
  }

  connectedCallback() {
    if (window.location.href.includes('localhost')) {
      const optionEl = document.createElement('option');
      optionEl.textContent = 'localhost';
      this.implSelectEl.appendChild(optionEl);
    } else {
      window.appSettings.getImplementations().forEach(item => {
        const optionEl = document.createElement('option');
        optionEl.value = String(item.label);
        optionEl.textContent = item.label;
        this.implSelectEl.appendChild(optionEl);
      });

      const changeCb = () => {
        window.location.href = window.appSettings.getImplementations()[this.implSelectEl.selectedIndex].demoUrl;
      };

      this.implSelectEl.addEventListener('change', changeCb);
      this.listeners.push(() => this.implSelectEl.removeEventListener('change', changeCb));
    }

    const clickCb = () => {
      var _this$shadowRoot8, _this$shadowRoot8$que;

      (_this$shadowRoot8 = this.shadowRoot) == null ? void 0 : (_this$shadowRoot8$que = _this$shadowRoot8.querySelector('header .title .tip')) == null ? void 0 : _this$shadowRoot8$que.remove();
      window.appSettings.setShowTip(false);
    };

    if (window.appSettings.get().showTip) {
      this.implSelectEl.addEventListener('click', clickCb, {
        once: true
      });
      this.listeners.push(() => this.implSelectEl.removeEventListener('click', clickCb));
    } else {
      clickCb();
    }

    this.refreshImplementation();
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

  refreshImplementation() {
    const impls = window.appSettings.getImplementations();

    if (!window.location.href.includes('localhost')) {
      const implIndex = impls.findIndex(item => window.location.href.includes(item.demoUrl));
      const impl = implIndex !== -1 ? impls[implIndex] : impls[0];
      this.implSelectEl.selectedIndex = implIndex !== -1 ? implIndex : 0;
      this.versionEl.innerHTML = impl.version;
    } else {
      this.implSelectEl.selectedIndex = 0;
      this.versionEl.innerHTML = '<a>@localhost</a>';
    }
  }

}
window.customElements.define('demo-app-header', DemoAppHeaderElement);
;// CONCATENATED MODULE: ./projects/demo-app/web/common/components/demo-app-main.element.ts

const demo_app_main_element_template = document.createElement('template');
demo_app_main_element_template.innerHTML = `
    <style>
        ${globalStyle}

        :host .tabs {
            position: fixed;
            top: calc(130px + var(--safe-area-inset-top));
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
            top: calc(130px + 55px + var(--safe-area-inset-top));
            left: 0;
            right: 0;
            bottom: calc(0px + var(--safe-area-inset-bottom));
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
    var _this$shadowRoot, _this$shadowRoot2, _this$shadowRoot3;

    super();
    this.listeners = [];
    this.tabsContentEl = void 0;
    this.demoAppHeaderEl = void 0;
    this.tabs = [];
    this.views = [];
    this.currentTabIndex = -1;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(demo_app_main_element_template.content, true));
    this.tabsContentEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('.tabs-content');
    this.demoAppHeaderEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('demo-app-header');
  }

  set isRenewing(value) {
    this.demoAppHeaderEl.isRenewing = value;
  }

  set isAuthenticated(value) {
    this.demoAppHeaderEl.isAuthenticated = value;
  }

  connectedCallback() {
    this.drawTabs();
    this.showView(window.appSettings ? window.appSettings.get().currentTabIndex : 0);
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
      var _this$tabsContentEl;

      this.currentTabIndex = index;
      this.tabs.forEach((tab, i) => {
        tab.classList[i !== index ? 'remove' : 'add']('selected');
      });
      this.views.forEach((view, i) => {
        view.style.display = i !== index ? 'none' : 'flex';
      });
      (_this$tabsContentEl = this.tabsContentEl) == null ? void 0 : _this$tabsContentEl.scrollTo(0, 0);
      window.appSettings.setCurrentTabIndex(index);
    }
  }

}
window.customElements.define('demo-app-main', DemoAppMainElement);
;// CONCATENATED MODULE: ./projects/demo-app/web/common/components/demo-app-playground.element.ts


const demo_app_playground_element_template = document.createElement('template');
demo_app_playground_element_template.innerHTML = `
    <style>
        ${globalStyle}

        :host {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 20px 28px;
        }

        :host .card.apis input {
            width: 100%; /* fix for android-chrome */
        }

        :host .card.apis .card-actions {
            padding-bottom: 16px;
        }

        :host .card.apis .card-actions button {
            margin-left: 14px;
        }
    </style>

    <div class="card apis">
        <div class="card-title row">
            APIs access
            <div id="api-status" class="card-status"></div>
        </div>
        <div class="card-actions row">
            <div class="column flex">
                <div class="input row">
                    <label for="api-url-input">Url</label>
                    <input id="api-url-input" class="flex" />
                </div>
                <div class="input row">
                    <label for="api-headers-input">Custom headers</label>
                    <input id="api-headers-input" class="flex" placeholder='"name": "value";' />
                </div>
            </div>
            <button id="api-get-button">GET</button>
        </div>
        <div class="box">
            <code>
                <pre id="api-response"></pre>
            </code>
        </div>
    </div>

    <slot id="cards"></slot>
`;
class DemoAppPlaygroundElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot, _this$shadowRoot2, _this$shadowRoot3, _this$shadowRoot4, _this$shadowRoot5;

    super();
    this.listeners = [];
    this.apiStatusEl = void 0;
    this.apiResponseEl = void 0;
    this.apiUrlEl = void 0;
    this.apiHeadersEl = void 0;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(demo_app_playground_element_template.content, true));
    this.apiStatusEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('#api-status');
    this.apiResponseEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('#api-response');
    this.apiUrlEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('#api-url-input');
    this.apiHeadersEl = (_this$shadowRoot5 = this.shadowRoot) == null ? void 0 : _this$shadowRoot5.querySelector('#api-headers-input');
  }

  connectedCallback() {
    var _this$shadowRoot6, _this$apiUrlEl, _this$apiHeadersEl;

    // Event listeners
    const apiBtnEl = (_this$shadowRoot6 = this.shadowRoot) == null ? void 0 : _this$shadowRoot6.querySelector('#api-get-button');

    const apiBtnCb = () => {
      const customEvent = new CustomEvent('api', {
        bubbles: true,
        composed: true,
        detail: {
          url: this.apiUrlEl.value,
          headers: this.apiHeadersEl.value
        }
      });
      return this.dispatchEvent(customEvent);
    };

    apiBtnEl == null ? void 0 : apiBtnEl.addEventListener('click', apiBtnCb);

    const apiUrlCb = () => this.saveSettings({
      privateApiUrl: this.apiUrlEl.value
    });

    (_this$apiUrlEl = this.apiUrlEl) == null ? void 0 : _this$apiUrlEl.addEventListener('input', apiUrlCb);

    const apiHeadersCb = () => this.saveSettings({
      privateApiHeaders: this.apiHeadersEl.value
    });

    (_this$apiHeadersEl = this.apiHeadersEl) == null ? void 0 : _this$apiHeadersEl.addEventListener('input', apiHeadersCb);
    this.listeners.push(() => apiBtnEl == null ? void 0 : apiBtnEl.removeEventListener('click', apiBtnCb), () => {
      var _this$apiUrlEl2;

      return (_this$apiUrlEl2 = this.apiUrlEl) == null ? void 0 : _this$apiUrlEl2.removeEventListener('input', apiUrlCb);
    }, () => {
      var _this$apiHeadersEl2;

      return (_this$apiHeadersEl2 = this.apiHeadersEl) == null ? void 0 : _this$apiHeadersEl2.removeEventListener('input', apiHeadersCb);
    }); // Initialize form

    const {
      otherSettings
    } = window.appSettings.getCurrentUserSettings();
    this.apiUrlEl.value = otherSettings == null ? void 0 : otherSettings['privateApiUrl'];
    this.apiHeadersEl.value = otherSettings == null ? void 0 : otherSettings['privateApiHeaders'];
  }

  disconnectedCallback() {
    this.listeners.forEach(rm => rm());
  } // --- API(s) ---


  setApiStatus(data, isError) {
    this.apiStatusEl.classList.remove(isError ? 'success' : 'error');
    this.apiStatusEl.classList.add(isError ? 'error' : 'success');
    this.apiResponseEl.innerHTML = prettyPrint(data);
  }

  saveSettings(value) {
    const currentUserSettings = window.appSettings.getCurrentUserSettings();
    currentUserSettings.otherSettings = Object.assign({}, currentUserSettings.otherSettings, value);
    window.appSettings.addOrUpdateUserSettings(currentUserSettings);
  }

}
window.customElements.define('demo-app-playground', DemoAppPlaygroundElement);
;// CONCATENATED MODULE: ./projects/demo-app/web/common/components/demo-app-debug.element.ts

const demo_app_debug_element_template = document.createElement('template');
demo_app_debug_element_template.innerHTML = `
    <style>
        ${globalStyle}

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
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(demo_app_debug_element_template.content, true)); // Initialize

    this.isAuthenticated = false;
    this.userSession = undefined;
    this.accessToken = undefined;
    this.accessTokenDecoded = undefined;
    this.idToken = undefined;
    this.idTokenDecoded = undefined;
    this.userProfile = undefined;
  }

  set isAuthenticated(value) {
    if (value !== null) {
      this.update('#isAuthenticated', value);
    }
  }

  set userSession(value) {
    this.update('#userSession', prettyPrint(value, ['expires_at']));
  }

  set accessToken(value) {
    this.update('#accessToken', value);
  }

  set accessTokenDecoded(value) {
    const text = typeof value !== 'string' ? prettyPrint(value, ['exp', 'iat', 'auth_time']) : '(no decoded info as it is not a JWT token)';
    this.update('#accessTokenDecoded', text);
  }

  set idToken(value) {
    this.update('#idToken', value);
  }

  set idTokenDecoded(value) {
    this.update('#idTokenDecoded', prettyPrint(value, ['exp', 'iat', 'auth_time']));
  }

  set userProfile(value) {
    this.update('#userProfile', prettyPrint(value));
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(5827);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(2707);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
;// CONCATENATED MODULE: ./projects/demo-app/web/common/components/demo-app-settings.element.ts








/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */

const demo_app_settings_element_template = document.createElement('template');
demo_app_settings_element_template.innerHTML = `
    <style>
        ${globalStyle}

        :host {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 20px 28px;
        }

        :host .card {
            padding: 40px 16px 16px 16px;
        }

        :host form {
            position: relative;
        }

        :host form .input, :host .form-content > * {
            margin-bottom: 24px;
        }

        :host form label {
            margin-bottom: 8px;
        }

        :host .form-actions {
            z-index: 10;
            position: fixed;
            bottom: calc(12px + var(--safe-area-inset-bottom));
            left: calc(50% - 120px);
            padding: 14px 0;
            border-radius: 4px;
            background-color: #E0E0E0;
            width: 240px;
            justify-content: center;
        }

        :host .form-actions button {
            padding: 2px 12px;
        }

        :host .form-actions button:not(:last-of-type) {
            margin-right: 12px;
        }

        :host button {
            cursor: pointer;
        }

        :host #settings-select {
            margin-left: 6px;
            color: black;
        }

        :host #add-settings-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            color: darkgray;
        }

        :host #delete-settings-button {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #EF5350;
        }

        :host #save-settings-button {
            color: white;
            padding: 4px 24px;
            border: none;
            border-radius: 4px;
            transition: background-color 150ms cubic-bezier(0.35, 0, 0.25, 1);
            background-color: #512da8;
        }

        :host #cancel-settings-button {
            padding: 4px 18px;
            border: none;
            border-radius: 4px;
            transition: background-color 150ms cubic-bezier(0.35, 0, 0.25, 1);
            background-color: white;
        }

        :host #save-settings-button:hover {
            background-color: #4527a0;
        }

        :host(.dirty) .form-actions {
            display: flex !important;
        }

        :host(.dirty) #delete-settings-button {
            display: none;
        }

        @media only screen and (max-width: 600px) {
            :host .settings-select {
                margin: 12px 8px;
            }
        }
    </style>

    <div class="settings-select row">
        <select id="settings-select"></select>
        <div id="add-settings-button" title="Create new settings">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>
    </div>

    <div class="form-actions row hidden">
        <button id="save-settings-button" type="button">SAVE</button>
        <button id="cancel-settings-button" type="button">CANCEL</button>
    </div>

    <form class="column card">
        <div id="delete-settings-button">
            DELETE
        </div>
        <div class="input column">
            <label for="settingsName">Settings name *</label>
            <input id="settingsName" name="settingsName" required="">
        </div>
        <div class="form-content flex"></div>
    </form>
`;
class DemoAppSettingsElement extends HTMLElement {
  constructor() {
    var _this$shadowRoot;

    super();
    this.listeners = [];
    this.formEl = void 0;
    this.formContentEl = void 0;
    this.selectEl = void 0;
    this.settingsNameEl = void 0;
    this.formIsDirty = false;
    this.formIsNew = false;
    this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = this.shadowRoot) == null ? void 0 : _this$shadowRoot.appendChild(document.importNode(demo_app_settings_element_template.content, true));
  }

  connectedCallback() {
    var _this$shadowRoot2, _this$shadowRoot3, _this$shadowRoot4, _this$shadowRoot5, _this$selectEl, _this$shadowRoot6, _this$shadowRoot7, _this$shadowRoot8, _this$shadowRoot9;

    this.formEl = (_this$shadowRoot2 = this.shadowRoot) == null ? void 0 : _this$shadowRoot2.querySelector('form');
    this.formContentEl = (_this$shadowRoot3 = this.shadowRoot) == null ? void 0 : _this$shadowRoot3.querySelector('.form-content');
    this.selectEl = (_this$shadowRoot4 = this.shadowRoot) == null ? void 0 : _this$shadowRoot4.querySelector('#settings-select');
    this.settingsNameEl = (_this$shadowRoot5 = this.shadowRoot) == null ? void 0 : _this$shadowRoot5.querySelector('#settingsName'); // Form events

    const inputCb = e => {
      if (!this.formIsDirty && e.target.id !== 'settings-select') {
        this.formIsDirty = true;
        this.classList.add('dirty');
      }
    };

    this.formEl.addEventListener('input', inputCb);
    this.listeners.push(() => this.formEl.removeEventListener('input', inputCb)); // Select

    this.refreshSelect();

    const changeCb = () => this.loadSettings(this.selectEl.value);

    (_this$selectEl = this.selectEl) == null ? void 0 : _this$selectEl.addEventListener('change', changeCb);
    this.listeners.push(() => this.selectEl.removeEventListener('change', changeCb)); // Add

    const addEl = (_this$shadowRoot6 = this.shadowRoot) == null ? void 0 : _this$shadowRoot6.querySelector('#add-settings-button');

    const addCb = () => this.add();

    addEl == null ? void 0 : addEl.addEventListener('click', addCb);
    this.listeners.push(() => addEl == null ? void 0 : addEl.removeEventListener('click', addCb)); // Delete

    const deleteEl = (_this$shadowRoot7 = this.shadowRoot) == null ? void 0 : _this$shadowRoot7.querySelector('#delete-settings-button');

    const deleteCb = () => this.delete();

    deleteEl == null ? void 0 : deleteEl.addEventListener('click', deleteCb);
    this.listeners.push(() => deleteEl == null ? void 0 : deleteEl.removeEventListener('click', deleteCb)); // Save

    const saveEl = (_this$shadowRoot8 = this.shadowRoot) == null ? void 0 : _this$shadowRoot8.querySelector('#save-settings-button');

    const saveCb = () => this.saveAndReload();

    saveEl == null ? void 0 : saveEl.addEventListener('click', saveCb);
    this.listeners.push(() => saveEl == null ? void 0 : saveEl.removeEventListener('click', saveCb)); // Cancel

    const cancelEl = (_this$shadowRoot9 = this.shadowRoot) == null ? void 0 : _this$shadowRoot9.querySelector('#cancel-settings-button');

    const cancelCb = () => this.cancel();

    cancelEl == null ? void 0 : cancelEl.addEventListener('click', cancelCb);
    this.listeners.push(() => cancelEl == null ? void 0 : cancelEl.removeEventListener('click', cancelCb)); // Initialize form

    this.refreshFormContent(window.appSettings.getCurrentUserSettings());
  }

  disconnectedCallback() {
    this.listeners.forEach(rm => rm());
  } // --- HANDLER(s) ---


  loadSettings(name) {
    window.appSettings.setCurrentUserSettings(name);
    location.reload();
  }

  add() {
    const name = 'New settings';
    const optionEl = document.createElement('option');
    optionEl.selected = true;
    optionEl.value = name;
    optionEl.textContent = name;
    this.selectEl.appendChild(optionEl);
    this.formIsNew = true;
    this.formIsDirty = true;
    this.classList.add('dirty');
    this.refreshFormContent({
      name,
      librarySettings: {}
    });
  }

  delete() {
    window.appSettings.deleteCurrentUserSettings();
    location.reload();
  }

  cancel() {
    this.formIsNew = false;
    this.formIsDirty = false;
    this.classList.remove('dirty');
    this.refreshSelect();
    this.refreshFormContent(window.appSettings.getCurrentUserSettings());
  } // --- HELPER(s) ---


  setPathValue(settings, path, value) {
    const props = path.split('.');
    props.reduce((obj, prop, index) => {
      if (index === props.length - 1) {
        obj[prop] = value;
      } else if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
        obj[prop] = {};
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return obj[prop];
    }, settings);
  }

  getPathValue(settings, path) {
    return path.split('.').reduce((obj, prop) => // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    obj ? obj[prop] : obj, settings);
  }

  refreshSelect() {
    // Clear the select
    this.selectEl.innerHTML = ''; // Redraw it

    const {
      userSettings,
      currentUserSettingsId
    } = window.appSettings.get();
    userSettings.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
      const optionEl = document.createElement('option');
      optionEl.selected = item.name === currentUserSettingsId;
      optionEl.value = String(item.name);
      optionEl.textContent = item.name;
      this.selectEl.appendChild(optionEl);
    });
  }

  refreshFormContent(userSettings) {
    // Clear the page
    this.formContentEl.innerHTML = ''; // Draw the form

    const {
      librarySettingsDefinition
    } = window.appSettings.get();
    const {
      name: settingName,
      librarySettings
    } = userSettings;
    this.settingsNameEl.value = settingName;
    librarySettingsDefinition.sort((a, b) => (b._sortIndex || 0) - (a._sortIndex || 0)).forEach(item => {
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
              formItemEl.value = value != null ? value : '';
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
      const {
        librarySettingsDefinition
      } = window.appSettings.get();
      const currentUserSettings = !this.formIsNew ? window.appSettings.getCurrentUserSettings() : {
        name: '',
        librarySettings: {}
      };
      currentUserSettings.name = this.settingsNameEl.value;
      librarySettingsDefinition.forEach(item => {
        var _this$shadowRoot10;

        const formItemEl = (_this$shadowRoot10 = this.shadowRoot) == null ? void 0 : _this$shadowRoot10.querySelector(`#${item.name.replace('.', '')}`);
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

        this.setPathValue(currentUserSettings.librarySettings, item.name, value);
      });
      window.appSettings.addOrUpdateUserSettings(currentUserSettings);

      if (this.formIsNew) {
        window.appSettings.setCurrentUserSettings(currentUserSettings.name);
      }

      location.reload();
    }
  }

}
window.customElements.define('demo-app-settings', DemoAppSettingsElement);
;// CONCATENATED MODULE: ./projects/auth-js/package.json
const package_namespaceObject = JSON.parse('{"u2":"@badisi/auth-js","i8":"0.0.0-semantically-released","Xh":"https://github.com/Badisi/auth-js/tree/main/projects/auth-js"}');
;// CONCATENATED MODULE: ./projects/ngx-auth/package.json
const ngx_auth_package_namespaceObject = JSON.parse('{"u2":"@badisi/ngx-auth","Xh":"https://github.com/Badisi/auth-js/tree/main/projects/ngx-auth"}');
;// CONCATENATED MODULE: ./projects/demo-app/web/common/settings/demo-app-settings.service.ts




class DemoAppSettings {
  constructor(storageKey, defaultAppSettings) {
    this.storageKey = storageKey;
    this.defaultAppSettings = defaultAppSettings;
    this.implementations = [{
      label: 'VanillaJS',
      demoUrl: 'https://badisi.github.io/auth-js/demo-app/auth-js',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      version: `<a href="${package_namespaceObject.Xh}" target="_blank">${package_namespaceObject.u2}@main</a>`
    }, {
      label: 'Angular',
      demoUrl: 'https://badisi.github.io/auth-js/demo-app/ngx-auth',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      version: `<a href="${ngx_auth_package_namespaceObject.Xh}" target="_blank">${ngx_auth_package_namespaceObject.u2}@main</a>`
    }];
    this.defaultAppSettings.librarySettingsDefinition.forEach((item, index) => item._sortIndex = index);
  }

  getImplementations() {
    return this.implementations;
  }

  setShowTip(value) {
    const appSettings = this.get();
    appSettings.showTip = value;
    this.saveAppSettings(appSettings);
  }

  setCurrentTabIndex(index) {
    const appSettings = this.get();
    appSettings.currentTabIndex = index;
    this.saveAppSettings(appSettings);
  }

  addOrUpdateUserSettings(settings) {
    const appSettings = this.get();
    const findIndex = appSettings.userSettings.findIndex(s => s.name === settings.name);

    if (findIndex !== -1) {
      appSettings.userSettings[findIndex] = settings;
    } else {
      appSettings.userSettings.push(settings);
    }

    this.saveAppSettings(appSettings);
  }

  deleteCurrentUserSettings() {
    const appSettings = this.get();
    const {
      name
    } = this.getCurrentUserSettings();
    const findIndex = appSettings.userSettings.findIndex(s => s.name === name);

    if (findIndex !== -1) {
      appSettings.userSettings.splice(findIndex, 1);
      delete appSettings.currentUserSettingsId;
      this.saveAppSettings(appSettings);
    }
  }

  setCurrentUserSettings(name) {
    const appSettings = this.get();
    const findIndex = appSettings.userSettings.findIndex(s => s.name === name);

    if (findIndex !== -1) {
      appSettings.currentUserSettingsId = name;
      this.saveAppSettings(appSettings);
    }
  }

  getCurrentUserSettings() {
    const appSettings = this.get();
    const findIndex = appSettings.userSettings.findIndex(s => s.name === appSettings.currentUserSettingsId);

    if (findIndex !== -1) {
      return appSettings.userSettings[findIndex];
    }

    return appSettings.userSettings.sort((a, b) => a.name.localeCompare(b.name))[0];
  }

  get() {
    const data = sessionStorage.getItem(this.storageKey);

    if (data) {
      const settings = Object.assign({}, this.defaultAppSettings, JSON.parse(data));
      this.defaultAppSettings.userSettings.forEach(defaultUserSettings => {
        if (!settings.userSettings.find(s => s.name === defaultUserSettings.name)) {
          settings.userSettings.push(defaultUserSettings);
        }
      });
      return settings;
    }

    return Object.assign({}, this.defaultAppSettings);
  } // --- HELPER(s) ---


  saveAppSettings(settings) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    delete settings.librarySettingsDefinition;
    sessionStorage.setItem(this.storageKey, JSON.stringify(settings));
  }

}
;// CONCATENATED MODULE: ./projects/demo-app/web/common/settings/library-settings-definition.ts



const AUTH_JS_LIBRARY_SETTINGS_DEFINITION = [{
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
  name: 'mobileScheme',
  label: 'Custom mobile scheme name',
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
    value: Navigation.REDIRECT
  }, {
    label: 'POPUP',
    value: Navigation.POPUP
  }]
}, {
  name: 'logLevel',
  label: 'Log level',
  type: 'list',
  values: [{
    label: 'NONE',
    value: Log.NONE
  }, {
    label: 'ERROR',
    value: Log.ERROR
  }, {
    label: 'WARN',
    value: Log.WARN
  }, {
    label: 'INFO',
    value: Log.INFO
  }, {
    label: 'DEBUG',
    value: Log.DEBUG
  }]
}, {
  name: 'loginRequired',
  label: 'Login required',
  type: 'boolean'
}, {
  name: 'retrieveUserSession',
  label: 'Retrieve user\'s session',
  type: 'boolean'
}, {
  name: 'loadUserInfo',
  label: 'Load user\'s info',
  type: 'boolean'
}, {
  name: 'automaticSilentRenew',
  label: 'Automatic silent renew',
  type: 'boolean'
}];
const ngxAuthLibSettingsDef = [...AUTH_JS_LIBRARY_SETTINGS_DEFINITION, {
  name: 'automaticLoginOn401',
  label: 'Automatic login on 401',
  type: 'boolean'
}, {
  name: 'automaticInjectToken',
  label: 'Automatic inject token',
  type: 'boolean'
}];
ngxAuthLibSettingsDef.splice(3, 0, {
  name: 'authGuardRedirectUrl',
  label: 'AuthGuard redirect url',
  type: 'string'
});
const NGX_AUTH_LIBRARY_SETTINGS_DEFINITION = (/* unused pure expression or super */ null && (ngxAuthLibSettingsDef));
;// CONCATENATED MODULE: ./projects/demo-app/web/common/settings/default-settings.ts


/* eslint-disable @typescript-eslint/naming-convention */

const DEFAULT_AUTH_JS_SETTINGS = (production = false) => {
  const settings = [{
    name: 'Auth0',
    otherSettings: {
      privateApiUrl: 'https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|631b171682c639d40cb84d5c',
      privateApiHeaders: ''
    },
    librarySettings: {
      authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
      clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
      mobileScheme: 'demo-app',
      scope: 'openid profile email phone offline_access read:current_user',
      internal: {
        extraQueryParams: {
          audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
        }
      },
      navigationType: Navigation.REDIRECT,
      logLevel: Log.NONE,
      loginRequired: false,
      retrieveUserSession: true,
      loadUserInfo: true,
      automaticSilentRenew: true
    }
  }, {
    name: 'Zitadel',
    otherSettings: {
      privateApiUrl: '',
      privateApiHeaders: ''
    },
    librarySettings: {
      authorityUrl: 'https://auth-js-0pdipf.zitadel.cloud',
      clientId: '178200751804317953@demo-app',
      mobileScheme: 'demo-app',
      scope: 'openid profile email phone offline_access',
      navigationType: Navigation.REDIRECT,
      logLevel: Log.NONE,
      loginRequired: false,
      retrieveUserSession: true,
      loadUserInfo: true,
      automaticSilentRenew: true
    }
  }];

  if (!production) {
    settings.push({
      name: 'Keycloak (local)',
      otherSettings: {
        privateApiUrl: '/api/my-api',
        privateApiHeaders: ''
      },
      librarySettings: {
        authorityUrl: 'http://localhost:8080/auth/realms/demo',
        clientId: 'demo-app',
        mobileScheme: 'demo-app',
        scope: 'openid profile email phone',
        navigationType: Navigation.REDIRECT,
        logLevel: Log.NONE,
        loginRequired: false,
        retrieveUserSession: true,
        loadUserInfo: true,
        automaticSilentRenew: true
      }
    });
  }

  return settings;
};
const DEFAULT_NGX_AUTH_SETTINGS = (production = false) => {
  const defaultAuthJsSettings = DEFAULT_AUTH_JS_SETTINGS(production);
  const settings = [{
    name: 'Auth0',
    otherSettings: Object.assign({}, defaultAuthJsSettings[0].otherSettings, {
      roles: 'view-profile'
    }),
    librarySettings: Object.assign({}, defaultAuthJsSettings[0].librarySettings, {
      authGuardRedirectUrl: '/forbidden',
      automaticLoginOn401: true,
      automaticInjectToken: true
    })
  }, {
    name: 'Zitadel',
    otherSettings: Object.assign({}, defaultAuthJsSettings[1].otherSettings, {
      roles: 'view-profile'
    }),
    librarySettings: Object.assign({}, defaultAuthJsSettings[1].librarySettings, {
      authGuardRedirectUrl: '/forbidden',
      automaticLoginOn401: true,
      automaticInjectToken: true
    })
  }];

  if (!production) {
    settings.push({
      name: 'Keycloak (local)',
      otherSettings: Object.assign({}, defaultAuthJsSettings[defaultAuthJsSettings.length - 1].otherSettings, {
        roles: 'view-profile'
      }),
      librarySettings: Object.assign({}, defaultAuthJsSettings[defaultAuthJsSettings.length - 1].librarySettings, {
        authGuardRedirectUrl: '/forbidden',
        automaticLoginOn401: true,
        automaticInjectToken: true
      })
    });
  }

  return settings;
};
;// CONCATENATED MODULE: ./projects/demo-app/web/common/index.ts









;// CONCATENATED MODULE: ./projects/demo-app/web/auth-js/src/environments/environment.prod.ts
const environment = {
  name: 'PROD',
  production: true
};
;// CONCATENATED MODULE: ./projects/demo-app/web/auth-js/src/app/app.settings.ts



const appSettings = new DemoAppSettings( // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
`auth-js:${package_namespaceObject.i8}:demo-app:settings`, {
  showTip: true,
  currentTabIndex: 0,
  userSettings: DEFAULT_AUTH_JS_SETTINGS(environment.production),
  librarySettingsDefinition: AUTH_JS_LIBRARY_SETTINGS_DEFINITION
});
;// CONCATENATED MODULE: ./projects/demo-app/web/auth-js/src/main.ts




(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.appSettings = appSettings;
  const el = document.createElement('div');
  el.innerHTML = 'Loading...';
  document.body.appendChild(el);
  initOidc(appSettings.getCurrentUserSettings().librarySettings).then(manager => {
    window.authManager = manager;
    el.replaceWith(document.createElement('app-root'));
  }).catch(err => {
    var _document$body$queryS;

    console.error(err);
    el.innerHTML = `${err.message}<br/><button id="loginButton">Login</button>`;
    (_document$body$queryS = document.body.querySelector('#loginButton')) == null ? void 0 : _document$body$queryS.addEventListener('click', () => location.reload(), {
      once: true
    });
  });
})();

/***/ }),

/***/ 3099:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ 6077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var definePropertyModule = __webpack_require__(3070);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 1530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(8710).charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 5787:
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ 9670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ 8457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(9974);
var toObject = __webpack_require__(7908);
var callWithSafeIterationClosing = __webpack_require__(3411);
var isArrayIteratorMethod = __webpack_require__(7659);
var toLength = __webpack_require__(7466);
var createProperty = __webpack_require__(6135);
var getIteratorMethod = __webpack_require__(1246);

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 1318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var toLength = __webpack_require__(7466);
var toAbsoluteIndex = __webpack_require__(1400);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 9341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 3671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3099);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);
var toLength = __webpack_require__(7466);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ 4362:
/***/ ((module) => {

// TODO: use something more complex like timsort?
var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    mergeSort(array.slice(0, middle), comparefn),
    mergeSort(array.slice(middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;
  var result = [];

  while (lindex < llength || rindex < rlength) {
    if (lindex < llength && rindex < rlength) {
      result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
    } else {
      result.push(lindex < llength ? left[lindex++] : right[rindex++]);
    }
  } return result;
};

module.exports = mergeSort;


/***/ }),

/***/ 3411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var iteratorClose = __webpack_require__(9212);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};


/***/ }),

/***/ 7072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 4326:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ 9920:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 4964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 8544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 4994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(3383).IteratorPrototype);
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var setToStringTag = __webpack_require__(8003);
var Iterators = __webpack_require__(7497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6135:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(4948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var createIteratorConstructor = __webpack_require__(4994);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);
var Iterators = __webpack_require__(7497);
var IteratorsCore = __webpack_require__(3383);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8324:
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8886:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ 7871:
/***/ ((module) => {

module.exports = typeof window == 'object';


/***/ }),

/***/ 256:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var UA = __webpack_require__(8113);

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ 6833:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 5268:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var global = __webpack_require__(7854);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 1036:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 8113:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ 8008:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ 748:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7007:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var redefine = __webpack_require__(1320);
var regexpExec = __webpack_require__(2261);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var createNonEnumerableProperty = __webpack_require__(8880);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 9974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3099);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 1246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(648);
var Iterators = __webpack_require__(7497);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 8554:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var getIteratorMethod = __webpack_require__(1246);

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ 647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 7854:
/***/ ((module) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 6656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(5465);

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var objectHas = __webpack_require__(6656);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 7659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 4705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 1913:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 2190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};


/***/ }),

/***/ 408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isArrayIteratorMethod = __webpack_require__(7659);
var toLength = __webpack_require__(7466);
var bind = __webpack_require__(9974);
var getIteratorMethod = __webpack_require__(1246);
var iteratorClose = __webpack_require__(9212);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ 9212:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),

/***/ 3383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);
var getPrototypeOf = __webpack_require__(9518);
var createNonEnumerableProperty = __webpack_require__(8880);
var has = __webpack_require__(6656);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7497:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 5948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var macrotask = (__webpack_require__(261).set);
var IS_IOS = __webpack_require__(6833);
var IS_WEBOS_WEBKIT = __webpack_require__(1036);
var IS_NODE = __webpack_require__(5268);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 3366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = global.Promise;


/***/ }),

/***/ 133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ 8536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 8523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(3099);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 3929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isRegExp = __webpack_require__(7850);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 1574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var objectKeys = __webpack_require__(1956);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var propertyIsEnumerableModule = __webpack_require__(5296);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var defineProperties = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  if (iframe.style) {
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = document.domain && activeXDocument ?
    NullProtoObjectViaActiveX(activeXDocument) : // old IE
    NullProtoObjectViaIFrame() ||
    NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var has = __webpack_require__(6656);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 6324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 2534:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 9478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var newPromiseCapability = __webpack_require__(8523);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 2248:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(1320);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 1320:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var createNonEnumerableProperty = __webpack_require__(8880);
var has = __webpack_require__(6656);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 7651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var toString = __webpack_require__(1340);
var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);
var create = __webpack_require__(30);
var getInternalState = (__webpack_require__(9909).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(8173);

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = str.slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

exports.UNSUPPORTED_Y = fails(function () {
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 9441:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 8173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 4488:
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var definePropertyModule = __webpack_require__(3070);
var wellKnownSymbol = __webpack_require__(5112);
var DESCRIPTORS = __webpack_require__(9781);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 8003:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(3070).f);
var has = __webpack_require__(6656);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.16.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 6707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var aFunction = __webpack_require__(3099);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ 8710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);

// `String.prototype.codePointAt` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 3197:
/***/ ((module) => {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line max-statements -- TODO
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),

/***/ 6091:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var whitespaces = __webpack_require__(1361);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ 3111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var whitespaces = __webpack_require__(1361);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var fails = __webpack_require__(7293);
var bind = __webpack_require__(9974);
var html = __webpack_require__(490);
var createElement = __webpack_require__(317);
var IS_IOS = __webpack_require__(6833);
var IS_NODE = __webpack_require__(5268);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;
    while (argumentsLength > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 1400:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9958:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ 7466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE];
  var result;
  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};


/***/ }),

/***/ 1694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(2190);

module.exports = function (argument) {
  if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 9711:
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ 3307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 5112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var has = __webpack_require__(6656);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 1361:
/***/ ((module) => {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 6699:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $includes = (__webpack_require__(1318).includes);
var addToUnscopables = __webpack_require__(1223);

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 6992:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var addToUnscopables = __webpack_require__(1223);
var Iterators = __webpack_require__(7497);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 5827:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $reduce = (__webpack_require__(3671).left);
var arrayMethodIsStrict = __webpack_require__(9341);
var CHROME_VERSION = __webpack_require__(7392);
var IS_NODE = __webpack_require__(5268);

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 2707:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var aFunction = __webpack_require__(3099);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var fails = __webpack_require__(7293);
var internalSort = __webpack_require__(4362);
var arrayMethodIsStrict = __webpack_require__(9341);
var FF = __webpack_require__(8886);
var IE_OR_EDGE = __webpack_require__(256);
var V8 = __webpack_require__(7392);
var WEBKIT = __webpack_require__(8008);

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aFunction(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);

    var items = [];
    var arrayLength = toLength(array.length);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) items.push(array[index]);
    }

    items = internalSort(items, getSortCompare(comparefn));
    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});


/***/ }),

/***/ 9601:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var assign = __webpack_require__(1574);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ 7727:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var NativePromise = __webpack_require__(3366);
var fails = __webpack_require__(7293);
var getBuiltIn = __webpack_require__(5005);
var speciesConstructor = __webpack_require__(6707);
var promiseResolve = __webpack_require__(9478);
var redefine = __webpack_require__(1320);

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && typeof NativePromise == 'function') {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}


/***/ }),

/***/ 8674:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var NativePromise = __webpack_require__(3366);
var redefine = __webpack_require__(1320);
var redefineAll = __webpack_require__(2248);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var setSpecies = __webpack_require__(6340);
var isObject = __webpack_require__(111);
var aFunction = __webpack_require__(3099);
var anInstance = __webpack_require__(5787);
var inspectSource = __webpack_require__(2788);
var iterate = __webpack_require__(408);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var speciesConstructor = __webpack_require__(6707);
var task = (__webpack_require__(261).set);
var microtask = __webpack_require__(5948);
var promiseResolve = __webpack_require__(9478);
var hostReportErrors = __webpack_require__(842);
var newPromiseCapabilityModule = __webpack_require__(8523);
var perform = __webpack_require__(2534);
var InternalStateModule = __webpack_require__(9909);
var isForced = __webpack_require__(4705);
var wellKnownSymbol = __webpack_require__(5112);
var IS_BROWSER = __webpack_require__(7871);
var IS_NODE = __webpack_require__(5268);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 4603:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isForced = __webpack_require__(4705);
var inheritIfRequired = __webpack_require__(9587);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineProperty = (__webpack_require__(3070).f);
var getOwnPropertyNames = (__webpack_require__(8006).f);
var isRegExp = __webpack_require__(7850);
var toString = __webpack_require__(1340);
var getFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var redefine = __webpack_require__(1320);
var fails = __webpack_require__(7293);
var has = __webpack_require__(6656);
var enforceInternalState = (__webpack_require__(9909).enforce);
var setSpecies = __webpack_require__(6340);
var wellKnownSymbol = __webpack_require__(5112);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(8173);

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      result += chr + string.charAt(++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      chr = chr + string.charAt(++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (IS_NCG.test(string.slice(index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || has(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named.push([groupname, groupid]);
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || pattern instanceof RegExpWrapper) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && flags.indexOf('s') > -1;
      if (dotAll) flags = flags.replace(/s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y && 'sticky' in re1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxy(keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ 4916:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 9714:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var redefine = __webpack_require__(1320);
var anObject = __webpack_require__(9670);
var $toString = __webpack_require__(1340);
var fails = __webpack_require__(7293);
var flags = __webpack_require__(7066);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ 7852:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var correctIsRegExpLogic = __webpack_require__(4964);
var IS_PURE = __webpack_require__(1913);

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var $endsWith = ''.endsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ 2023:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var correctIsRegExpLogic = __webpack_require__(4964);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~toString(requireObjectCoercible(this))
      .indexOf(toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 8783:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(8710).charAt);
var toString = __webpack_require__(1340);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 5306:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var fails = __webpack_require__(7293);
var anObject = __webpack_require__(9670);
var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var getSubstitution = __webpack_require__(647);
var regExpExec = __webpack_require__(7651);
var wellKnownSymbol = __webpack_require__(5112);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue === 'string' &&
        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
        replaceValue.indexOf('$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = toString(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 3157:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var correctIsRegExpLogic = __webpack_require__(4964);
var IS_PURE = __webpack_require__(1913);

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var $startsWith = ''.startsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ 3210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $trim = (__webpack_require__(3111).trim);
var forcedStringTrimMethod = __webpack_require__(6091);

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ 3948:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var ArrayIteratorMethods = __webpack_require__(6992);
var createNonEnumerableProperty = __webpack_require__(8880);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ 1637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(6992);
var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var USE_NATIVE_URL = __webpack_require__(590);
var redefine = __webpack_require__(1320);
var redefineAll = __webpack_require__(2248);
var setToStringTag = __webpack_require__(8003);
var createIteratorConstructor = __webpack_require__(4994);
var InternalStateModule = __webpack_require__(9909);
var anInstance = __webpack_require__(5787);
var hasOwn = __webpack_require__(6656);
var bind = __webpack_require__(9974);
var classof = __webpack_require__(648);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var $toString = __webpack_require__(1340);
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);
var wellKnownSymbol = __webpack_require__(5112);

var nativeFetch = getBuiltIn('fetch');
var NativeRequest = getBuiltIn('Request');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: $toString(first.value), value: $toString(second.value) });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: $toString(init[key]) });
    } else {
      parseSearchParams(
        entries,
        typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : $toString(init)
      );
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: $toString(name), value: $toString(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && typeof Headers == 'function') {
  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headers.has('content-type')) {
          headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, String(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (typeof nativeFetch == 'function') {
    $({ global: true, enumerable: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (typeof NativeRequest == 'function') {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestConstructor, 'Request');
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ 285:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(8783);
var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var USE_NATIVE_URL = __webpack_require__(590);
var global = __webpack_require__(7854);
var defineProperties = __webpack_require__(6048);
var redefine = __webpack_require__(1320);
var anInstance = __webpack_require__(5787);
var has = __webpack_require__(6656);
var assign = __webpack_require__(1574);
var arrayFrom = __webpack_require__(8457);
var codeAt = (__webpack_require__(8710).codeAt);
var toASCII = __webpack_require__(3197);
var $toString = __webpack_require__(1340);
var setToStringTag = __webpack_require__(8003);
var URLSearchParamsModule = __webpack_require__(1637);
var InternalStateModule = __webpack_require__(9909);

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
/* eslint-disable no-control-regex -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable no-control-regex -- safe */
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements -- TODO
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = $toString(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, $toString(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URLConstructor(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = $toString(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, $toString(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = $toString(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, $toString(pathname), PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = $toString(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = $toString(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ 8249:
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native crypto in web worker (Browser)
	    if (typeof self !== 'undefined' && self.crypto) {
	        crypto = self.crypto;
	    }

	    // Native crypto from worker
	    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
	        crypto = globalThis.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof global !== 'undefined' && global.crypto) {
	        crypto = global.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && "function" === 'function') {
	        try {
	            crypto = __webpack_require__(2480);
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var j = 0; j < thatSigBytes; j += 4) {
	                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ 8269:
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(8249));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),

/***/ 5743:
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(8249));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Utf8;

}));

/***/ }),

/***/ 2153:
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(8249));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),

/***/ 4580:
/***/ ((module) => {

"use strict";
function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;
//# sourceMappingURL=jwt-decode.cjs.js.map


/***/ }),

/***/ 2896:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6169);
/* module decorator */ module = __webpack_require__.hmd(module);


/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].Buffer */ .Z.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneBuffer);


/***/ }),

/***/ 8277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);


/***/ }),

/***/ 9730:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8277);
/* module decorator */ module = __webpack_require__.hmd(module);


/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].process */ .Z.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nodeUtil);


/***/ }),

/***/ 6169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8277);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z || freeSelf || Function('return this')();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);


/***/ }),

/***/ 9591:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lodash_es_isBuffer)
});

// EXTERNAL MODULE: ./node_modules/lodash-es/_root.js
var _root = __webpack_require__(6169);
;// CONCATENATED MODULE: ./node_modules/lodash-es/stubFalse.js
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/* harmony default export */ const lodash_es_stubFalse = (stubFalse);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isBuffer.js
/* module decorator */ module = __webpack_require__.hmd(module);



/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root/* default.Buffer */.Z.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || lodash_es_stubFalse;

/* harmony default export */ const lodash_es_isBuffer = (isBuffer);


/***/ }),

/***/ 2480:
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(2282));
/******/ }
]);
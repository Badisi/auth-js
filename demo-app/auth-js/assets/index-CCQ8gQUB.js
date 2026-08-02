(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();var Q=(t=>(t[t.NONE=0]="NONE",t[t.ERROR=1]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=3]="INFO",t[t.DEBUG=4]="DEBUG",t))(Q||{});class R{static#e=console;static#t=1;static#i="???";#o=[];constructor(e){e&&this.#o.push(e)}static setLibName(e){this.#i=e}static setLogLevel(e){this.#t=e}static setLogger(e){this.#e=e}createChild(e){const s=new R;return s.#o.push(...this.#o,e),s}debug(...e){R.#t>=4&&R.#e.debug(this.#n(),...e)}info(...e){R.#t>=3&&R.#e.info(this.#n(),...e)}warn(...e){R.#t>=2&&R.#e.warn(this.#n(),...e)}error(...e){R.#t>=1&&R.#e.error(this.#n(),...e)}getError(e,s=!1){return R.#e.error(this.#n(s),e),new Error(e)}notif(...e){R.#e.warn(this.#n(!1),...e)}#n(e=!0){let s=`[${R.#i}]`;return e&&(s+=`[${this.#o.join(".")}]`),s}}class _t{}class K{#e=[];#t;add(e,s){const i={subscriber:e,options:s};return this.#e.push(i),this.#t&&(e(this.#t),s?.once&&this.unsubscribe(e)),{unsubscribe:()=>{this.unsubscribe(e)}}}notify(e){this.#t=e,this.#e.forEach(s=>{s.subscriber(e),s.options?.once&&this.unsubscribe(s.subscriber)})}unsubscribe(e){if(e){const s=this.#e.findIndex(i=>i.subscriber===e);s!==-1&&this.#e.splice(s,1)}else this.#e=[]}}function Pe(t){this.message=t}Pe.prototype=new Error,Pe.prototype.name="InvalidCharacterError";var Fe=typeof window<"u"&&window.atob&&window.atob.bind(window)||function(t){var e=String(t).replace(/=+$/,"");if(e.length%4==1)throw new Pe("'atob' failed: The string to be decoded is not correctly encoded.");for(var s,i,r=0,n=0,o="";i=e.charAt(n++);~i&&(s=r%4?64*s+i:i,r++%4)?o+=String.fromCharCode(255&s>>(-2*r&6)):0)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);return o};function vt(t){var e=t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw"Illegal base64url string!"}try{return(function(s){return decodeURIComponent(Fe(s).replace(/(.)/g,(function(i,r){var n=r.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n})))})(e)}catch{return Fe(e)}}function ve(t){this.message=t}function st(t,e){if(typeof t!="string")throw new ve("Invalid token specified");var s=(e=e||{}).header===!0?0:1;try{return JSON.parse(vt(t.split(".")[s]))}catch(i){throw new ve("Invalid token specified: "+i.message)}}ve.prototype=new Error,ve.prototype.name="InvalidTokenError";let bt;const yt=()=>bt??=new R("AuthUtils"),Ue=()=>typeof window.cordova<"u"||typeof window.phonegap<"u"||typeof window.PhoneGap<"u",Ae=()=>!!window.Capacitor?.isNativePlatform(),Ce=()=>Ae()||Ue(),be=t=>{try{return t&&st(t)}catch{return yt().createChild("decodeJwt").warn("Token was not decoded as it is not a valid JWT."),t}},de=(t,e)=>{if(e!==void 0){const s=new URL(t,"http://test"),i=new URL(e,"http://test");if(i.pathname!==""&&i.pathname!=="/"&&!s.pathname.includes(i.pathname)||i.origin!=="http://test"&&(s.protocol!==i.protocol||s.origin!==i.origin||!`${s.origin}${s.pathname}}`.includes(`${i.origin}${i.pathname}`)))return!1;let r=!0;return i.searchParams.forEach((n,o)=>{s.searchParams.getAll(o).includes(n)||(r=!1)}),r}return!1},it=()=>{let t=document.querySelector("base")?.href??window.location.origin;const e=new URL(t);return t=`${e.origin}${e.pathname}`,t.endsWith("/")?t:`${t}/`},ze=t=>{try{return new URL(t)}catch{const e=t.startsWith("/")?t.substring(1,t.length):t;return new URL(`${it()}${e}`)}},ee=t=>{if(t&&typeof t=="object"){const e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}return!1},Le=(t,...e)=>{const s=ee(t)?t:{};return e.reduce((i,r)=>(ee(r)&&Object.keys(r).forEach(n=>{const o=r[n],a=i[n];if(ee(o))ee(a)||(i[n]={}),Le(i[n],o);else if(Array.isArray(o)){Array.isArray(a)||(i[n]=[]);const c=i[n];o.forEach((l,h)=>{ee(l)?(ee(c[h])||(c[h]={}),Le(c[h],l)):c[h]=l})}else o!==void 0&&(i[n]=o)}),i),s),s},St=async(t,e)=>{const s=new e;return await s.init(t),s};const Et=t=>{const e=new Map;e.set("web",{name:"web"});const s=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},i=(n,o)=>{s.platforms.set(n,o)},r=n=>{s.platforms.has(n)&&(s.currentPlatform=s.platforms.get(n))};return s.addPlatform=i,s.setPlatform=r,s},xt=t=>t.CapacitorPlatforms=Et(t),rt=xt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});rt.addPlatform;rt.setPlatform;var re;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(re||(re={}));class Re extends Error{constructor(e,s,i){super(e),this.message=e,this.code=s,this.data=i}}const kt=t=>{var e,s;return t?.androidBridge?"android":!((s=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||s===void 0)&&s.bridge?"ios":"web"},Ct=t=>{var e,s,i,r,n;const o=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},c=a.Plugins=a.Plugins||{},l=t.CapacitorPlatforms,h=()=>o!==null?o.name:kt(t),u=((e=l?.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||h,m=()=>u()!=="web",w=((s=l?.currentPlatform)===null||s===void 0?void 0:s.isNativePlatform)||m,E=_=>{const b=f.get(_);return!!(b?.platforms.has(u())||k(_))},p=((i=l?.currentPlatform)===null||i===void 0?void 0:i.isPluginAvailable)||E,S=_=>{var b;return(b=a.PluginHeaders)===null||b===void 0?void 0:b.find(C=>C.name===_)},k=((r=l?.currentPlatform)===null||r===void 0?void 0:r.getPluginHeader)||S,d=_=>t.console.error(_),g=(_,b,C)=>Promise.reject(`${C} does not have an implementation of "${b}".`),f=new Map,v=(_,b={})=>{const C=f.get(_);if(C)return console.warn(`Capacitor plugin "${_}" already registered. Cannot register plugins twice.`),C.proxy;const I=u(),T=k(_);let P;const z=async()=>(!P&&I in b?P=typeof b[I]=="function"?P=await b[I]():P=b[I]:o!==null&&!P&&"web"in b&&(P=typeof b.web=="function"?P=await b.web():P=b.web),P),ae=(U,A)=>{var q,$;if(T){const D=T?.methods.find(O=>A===O.name);if(D)return D.rtype==="promise"?O=>a.nativePromise(_,A.toString(),O):(O,ue)=>a.nativeCallback(_,A.toString(),O,ue);if(U)return(q=U[A])===null||q===void 0?void 0:q.bind(U)}else{if(U)return($=U[A])===null||$===void 0?void 0:$.bind(U);throw new Re(`"${_}" plugin is not implemented on ${I}`,re.Unimplemented)}},J=U=>{let A;const q=(...$)=>{const D=z().then(O=>{const ue=ae(O,U);if(ue){const ge=ue(...$);return A=ge?.remove,ge}else throw new Re(`"${_}.${U}()" is not implemented on ${I}`,re.Unimplemented)});return U==="addListener"&&(D.remove=async()=>A()),D};return q.toString=()=>`${U.toString()}() { [capacitor code] }`,Object.defineProperty(q,"name",{value:U,writable:!1,configurable:!1}),q},Z=J("addListener"),G=J("removeListener"),ce=(U,A)=>{const q=Z({eventName:U},A),$=async()=>{const O=await q;G({eventName:U,callbackId:O},A)},D=new Promise(O=>q.then(()=>O({remove:$})));return D.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await $()},D},ke=new Proxy({},{get(U,A){switch(A){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return T?ce:Z;case"removeListener":return G;default:return J(A)}}});return c[_]=ke,f.set(_,{name:_,proxy:ke,platforms:new Set([...Object.keys(b),...T?[I]:[]])}),ke},x=((n=l?.currentPlatform)===null||n===void 0?void 0:n.registerPlugin)||v;return a.convertFileSrc||(a.convertFileSrc=_=>_),a.getPlatform=u,a.handleError=d,a.isNativePlatform=w,a.isPluginAvailable=p,a.pluginMethodNoop=g,a.registerPlugin=x,a.Exception=Re,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},Rt=t=>t.Capacitor=Ct(t),ye=Rt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),nt=ye.registerPlugin;ye.Plugins;class ot{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,s){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(s);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r);const n=async()=>this.removeListener(e,s),o=Promise.resolve({remove:n});return Object.defineProperty(o,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await n()}}),o}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,s){const i=this.listeners[e];i&&i.forEach(r=>r(s))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,s){this.windowListeners[s]={registered:!1,windowEventName:e,pluginEventName:s,handler:i=>{this.notifyListeners(s,i)}}}unimplemented(e="not implemented"){return new ye.Exception(e,re.Unimplemented)}unavailable(e="not available"){return new ye.Exception(e,re.Unavailable)}async removeListener(e,s){const i=this.listeners[e];if(!i)return;const r=i.indexOf(s);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const Je=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ge=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Tt extends ot{async getCookies(){const e=document.cookie,s={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[r,n]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ge(r).trim(),n=Ge(n).trim(),s[r]=n}),s}async setCookie(e){try{const s=Je(e.key),i=Je(e.value),r=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${s}=${i||""}${r}; path=${n}; ${o};`}catch(s){return Promise.reject(s)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(s){return Promise.reject(s)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const s of e)document.cookie=s.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}nt("CapacitorCookies",{web:()=>new Tt});const It=async t=>new Promise((e,s)=>{const i=new FileReader;i.onload=()=>{const r=i.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},i.onerror=r=>s(r),i.readAsDataURL(t)}),Pt=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(r=>r.toLocaleLowerCase()).reduce((r,n,o)=>(r[n]=t[e[o]],r),{})},Ut=(t,e=!0)=>t?Object.entries(t).reduce((i,r)=>{const[n,o]=r;let a,c;return Array.isArray(o)?(c="",o.forEach(l=>{a=e?encodeURIComponent(l):l,c+=`${n}=${a}&`}),c.slice(0,-1)):(a=e?encodeURIComponent(o):o,c=`${n}=${a}`),`${i}&${c}`},"").substr(1):null,At=(t,e={})=>{const s=Object.assign({method:t.method||"GET",headers:t.headers},e),r=Pt(t.headers)["content-type"]||"";if(typeof t.data=="string")s.body=t.data;else if(r.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[o,a]of Object.entries(t.data||{}))n.set(o,a);s.body=n.toString()}else if(r.includes("multipart/form-data")||t.data instanceof FormData){const n=new FormData;if(t.data instanceof FormData)t.data.forEach((a,c)=>{n.append(c,a)});else for(const a of Object.keys(t.data))n.append(a,t.data[a]);s.body=n;const o=new Headers(s.headers);o.delete("content-type"),s.headers=o}else(r.includes("application/json")||typeof t.data=="object")&&(s.body=JSON.stringify(t.data));return s};class Lt extends ot{async request(e){const s=At(e,e.webFetchExtra),i=Ut(e.params,e.shouldEncodeUrlParams),r=i?`${e.url}?${i}`:e.url,n=await fetch(r,s),o=n.headers.get("content-type")||"";let{responseType:a="text"}=n.ok?e:{};o.includes("application/json")&&(a="json");let c,l;switch(a){case"arraybuffer":case"blob":l=await n.blob(),c=await It(l);break;case"json":c=await n.json();break;default:c=await n.text()}const h={};return n.headers.forEach((u,m)=>{h[m]=u}),{data:c,headers:h,status:n.status,url:n.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}nt("CapacitorHttp",{web:()=>new Lt});const le=(t,e=[])=>{const s=/^( *)("[\w-]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg,i=(r,n,o,a,c)=>{let l=n||"";const h=o?o.replace(/[": ]/g,""):void 0;if(h&&(l+=`<span class="json-key">${h}</span>: `),a&&(l+=`<span class="${a.startsWith('"')?"json-string":"json-value"}">${a}</span>`,h&&e.includes(h))){const u=new Date(Number(a)*1e3),m=`${u.toDateString()}, ${u.toLocaleTimeString()}`;m&&(l+=` <span class="json-date">(${m})</span>`)}return l+(c||"")};return t?JSON.stringify(t,null,2).replace(/&/g,"&amp;").replace(/\\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(s,i):""},Ot=()=>(t,e)=>{const{otherSettings:s,librarySettings:i}=window.appSettings.getCurrentSettings(),r=s?(s.roles??"").split(","):[];let n;if(i.authorityUrl.includes("auth0"))n=e["http://ngx-auth.com/roles"];else if(i.authorityUrl.includes("zitadel")){const a=e["urn:zitadel:iam:org:project:roles"];n=Object.keys(a??{})}else n=e?.resource_access?.account?.roles;return r.every(a=>(n??[]).includes(a))?!0:"forbidden"},he=`
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

    button {
        cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
        :host {
            padding: 0 !important;
            padding-bottom: 24px !important;
        }

        :host .card {
            border-left: 0;
            border-right: 0;
            border-radius: 0;
            margin: 0;
            margin-bottom: 6px;
        }
    }
`,at=document.createElement("template");at.innerHTML=`
    <style>
        ${he}

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
            <div class="title">User profile</div>
            <code>
                <pre id="userProfile" class="value"></pre>
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
    </div>
`;class qt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(at.content,!0)),this.isAuthenticated=!1,this.userSession=void 0,this.accessToken=void 0,this.accessTokenDecoded=void 0,this.idToken=void 0,this.idTokenDecoded=void 0,this.userProfile=void 0}set isAuthenticated(e){e!==null&&this.update("#isAuthenticated",typeof e=="boolean"?String(e):e)}set userSession(e){this.update("#userSession",le(e,["expires_at"]))}set accessToken(e){this.update("#accessToken",e)}set accessTokenDecoded(e){const s=typeof e!="string"?le(e,["exp","iat","auth_time"]):"(no decoded info as it is not a JWT token)";this.update("#accessTokenDecoded",s)}set idToken(e){this.update("#idToken",e)}set idTokenDecoded(e){this.update("#idTokenDecoded",le(e,["exp","iat","auth_time"]))}set userProfile(e){this.update("#userProfile",le(e))}connectedCallback(){}disconnectedCallback(){}update(e,s){const i=this.shadowRoot?.querySelector(e);i&&(s==null||s===""?i.closest(".info")?.classList.add("hidden"):(i.closest(".info")?.classList.remove("hidden"),i.innerHTML=s))}}window.customElements.define("demo-app-debug",qt);const ct=document.createElement("template");ct.innerHTML=`
    <style>
        ${he}

        :host header {
            z-index: 1;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: calc(8px + var(--safe-area-inset-top)) 16px 30px 16px;
            align-items: center;
            justify-content: space-between;
            height: 142px;
            color: white;
            background: rgb(103, 58, 183);
            background: linear-gradient(180deg, rgba(103, 58, 183, 1) 0%, rgba(94, 53, 177, 1) 100%);
        }

        :host header .row {
            align-items: center;
        }

        :host header .row.top {
            width: 100%;
            gap: 14px;
        }

        :host header .row.select {
            font-size: 1.4em;
            color: #ede7f6;
            padding-bottom: 4px;
        }

        :host header h1 {
            font-size: 18px;
            font-weight: 200;
            letter-spacing: 1px;
            color: #ede7f6;
            margin: 0;
            text-transform: uppercase;
        }

        :host header a.doc {
            padding: 4px 16px;
            font-size: 16px;
            color: white;
            text-decoration: none;
        }

        :host header a.github-icon {
            right: 34px;
            width: 26px;
            height: 26px;
            color: white;
            text-decoration: none;
        }

        @keyframes statusLoadingAnimation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        :host header .status.loading {
            background: none !important;
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
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-top: 1px;
            margin-right: 8px;
        }

        :host header .title {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            color: white;
            text-decoration: none;
        }

        :host header .title .icon {
            font-size: 22px;
            margin-right: 0.5rem;
        }

        :host header select {
            cursor: pointer;
            font-size: 1.1em;
            font-weight: bold;
            color: #ede7f6;
            background: rgba(0, 0, 0, 0.01);  /** fix for Safari Mobile so that select's icon is visible */
            border: none;
            outline: none;
            padding: 0;
            margin: 0;
        }

        :host header button {
            margin-top: 2px;
        }

        :host header button:not(:last-child) {
            margin-right: 10px;
        }

        :host header .content {
            align-items: center;
            gap: 10px;
        }

        @media only screen and (max-width: 1000px) {
            :host header {
                padding-bottom: 24px;
                height: 148px;
            }

            :host header .row.select {
                font-size: 1.1em;
            }

            :host header a.doc {
                padding-right: 6px;
            }

            :host header .content {
                gap: 2px;
            }
        }
    </style>

    <header class="column">
        <div class="row top" style="height: 44px;">
            <a class="title"
                href="https://badisi.github.io/auth-js/"
                target="_self">
                <span class="icon">🛡️</span>Auth-js
            </a>

            <div class="status loading"></div>

            <span style="flex: 1"></span>

            <a class="doc"
                href="https://badisi.github.io/auth-js/getting-started/playground"
                target="_self">
                <span>
                    Documentation
                    <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                    </svg>
                </span>
            </a>

            <a class="github-icon"
                href="https://github.com/Badisi/auth-js"
                target="_self"
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
        </div>

        <div class="column content">
            <h1>Playground</h1>

            <div class="row select">
                <span>&#123;&nbsp;<select id="implementation-select"></select>&nbsp;&#125;</span>
                &nbsp;&nbsp;
                <span>&#123;&nbsp;<select id="setting-select"></select>&nbsp;&#125;</span>
            </div>

            <div class="row">
                <button id="login-button">LOGIN</button>
                <button id="logout-button">LOGOUT</button>
                <button id="silent-renew-button">SILENT RENEW</button>
            </div>
        </div>
    </header>
`;class Ht extends HTMLElement{listeners=[];implSelectEl;settingsSelectEl;statusEl;loginButtonEl;logoutButtonEl;silentRenewButtonEl;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(ct.content,!0)),this.implSelectEl=this.shadowRoot?.querySelector("#implementation-select"),this.settingsSelectEl=this.shadowRoot?.querySelector("#setting-select"),this.statusEl=this.shadowRoot?.querySelector(".status"),this.loginButtonEl=this.shadowRoot?.querySelector("#login-button"),this.logoutButtonEl=this.shadowRoot?.querySelector("#logout-button"),this.silentRenewButtonEl=this.shadowRoot?.querySelector("#silent-renew-button")}set isRenewing(e){this.statusEl&&this.statusEl.classList[e?"add":"remove"]("loading")}set isAuthenticated(e){this.statusEl&&e!==null&&e!==void 0&&(this.statusEl.classList.remove("loading"),this.statusEl.title=e?"Authenticated":"Not authenticated",this.statusEl.classList[e?"add":"remove"]("authenticated"),this.statusEl.classList[e?"remove":"add"]("not-authenticated"))}connectedCallback(){if(window.location.href.includes(":4200")){const s=document.createElement("option");s.textContent="localhost",this.implSelectEl?.appendChild(s)}else{window.appSettings.getLibraryImplementations().forEach(i=>{const r=document.createElement("option");r.value=i.label,r.textContent=i.label,this.implSelectEl?.appendChild(r)});const s=()=>{const i=this.implSelectEl?.selectedIndex;i!==void 0&&(window.location.href=window.appSettings.getLibraryImplementations()[i].demoUrl)};this.implSelectEl?.addEventListener("change",s),this.listeners.push(()=>{this.implSelectEl?.removeEventListener("change",s)})}window.appSettings.getSettings().forEach(s=>{const i=document.createElement("option");i.value=s.name,i.textContent=s.name,this.settingsSelectEl?.appendChild(i)}),this.refreshImplementation(),this.refreshSettings(),this.addEventListeners();const e=s=>{const i=s.options[s.selectedIndex].text||"",r=document.createElement("span");r.textContent=i;const n=window.getComputedStyle(s);r.style.font=n.font,r.style.fontSize=n.fontSize,r.style.fontFamily=n.fontFamily,r.style.fontWeight=n.fontWeight,r.style.letterSpacing=n.letterSpacing,r.style.whiteSpace="nowrap",r.style.position="absolute",r.style.visibility="hidden",r.style.top="-9999px",document.body.appendChild(r);const o=r.offsetWidth;r.remove();const a=/iP(hone|ad|od)/.test(navigator.userAgent)&&!!/WebKit/.exec(navigator.userAgent)&&!/CriOS|FxiOS/.exec(navigator.userAgent)?40:navigator.userAgent.includes("Chrome")?25:35,c=Math.ceil(o+a);s.style.width=`${c}px`};window.requestAnimationFrame(()=>{this.implSelectEl&&e(this.implSelectEl),this.settingsSelectEl&&e(this.settingsSelectEl)})}disconnectedCallback(){this.listeners.forEach(e=>{e()})}addEventListeners(){const e=()=>{this.settingsSelectEl&&(window.appSettings.setCurrentSettingsIndex(this.settingsSelectEl.selectedIndex),location.reload())};this.settingsSelectEl?.addEventListener("change",e);const s=()=>this.dispatchEvent(new Event("login",{bubbles:!0,composed:!0}));this.loginButtonEl?.addEventListener("click",s);const i=()=>this.dispatchEvent(new Event("logout",{bubbles:!0,composed:!0}));this.logoutButtonEl?.addEventListener("click",i);const r=()=>this.dispatchEvent(new Event("silentRenew",{bubbles:!0,composed:!0}));this.silentRenewButtonEl?.addEventListener("click",r),this.listeners.push(()=>{this.settingsSelectEl?.removeEventListener("change",e)},()=>{this.loginButtonEl?.removeEventListener("click",s)},()=>{this.logoutButtonEl?.removeEventListener("click",i)},()=>{this.silentRenewButtonEl?.removeEventListener("click",r)})}refreshImplementation(){const e=window.appSettings.getLibraryImplementations();if(window.location.href.includes(":4200"))this.implSelectEl&&(this.implSelectEl.selectedIndex=0);else{const s=e.findIndex(i=>window.location.href.includes(i.demoUrl));this.implSelectEl&&(this.implSelectEl.selectedIndex=s!==-1?s:0)}}refreshSettings(){this.settingsSelectEl&&(this.settingsSelectEl.selectedIndex=window.appSettings.get().currentSettingsIndex)}}window.customElements.define("demo-app-header",Ht);const lt=document.createElement("template");lt.innerHTML=`
    <style>
        ${he}

        :host .tabs {
            position: fixed;
            top: calc(180px + var(--safe-area-inset-top));
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
            top: calc(180px + 55px + var(--safe-area-inset-top));
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
`;class Nt extends HTMLElement{listeners=[];tabsContentEl;demoAppHeaderEl;tabs=[];views=[];currentTabIndex=-1;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(lt.content,!0)),this.tabsContentEl=this.shadowRoot?.querySelector(".tabs-content"),this.demoAppHeaderEl=this.shadowRoot?.querySelector("demo-app-header")}set isRenewing(e){this.demoAppHeaderEl&&(this.demoAppHeaderEl.isRenewing=e)}set isAuthenticated(e){this.demoAppHeaderEl&&(this.demoAppHeaderEl.isAuthenticated=e)}connectedCallback(){this.drawTabs(),this.showView(window.appSettings.get().currentTabIndex)}disconnectedCallback(){this.listeners.forEach(e=>{e()})}drawTabs(){const e=this.shadowRoot?.querySelector("#views"),s=this.shadowRoot?.querySelector("#tabs");e&&s&&(this.views=e.assignedElements(),this.views.forEach((i,r)=>{i.style.display="none";const n=document.createElement("a");n.id=`${(i.getAttribute("tabLabel")??"?").toLowerCase()}-button`,n.textContent=i.getAttribute("tabLabel")??"?";const o=()=>{this.showView(r)};n.addEventListener("click",o),this.listeners.push(()=>{n.removeEventListener("click",o)}),s.appendChild(n),this.tabs.push(n)}))}showView(e){this.currentTabIndex!==e&&(this.currentTabIndex=e,this.tabs.forEach((s,i)=>{s.classList[i!==e?"remove":"add"]("selected")}),this.views.forEach((s,i)=>{s.style.display=i!==e?"none":"flex"}),this.tabsContentEl?.scrollTo(0,0),window.appSettings.setCurrentTabIndex(e))}}window.customElements.define("demo-app-main",Nt);const dt=document.createElement("template");dt.innerHTML=`
    <style>
        ${he}

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

        :host .card.routes {
            margin-top: 20px;
        }

        :host .card.routes .route {
            display: flex;
            align-items: center;
        }

        :host .card.routes .route.query-params {
            margin: 0 0 10px 10px;
        }

        :host .card.routes .route.query-params .info {
            display: flex;
            flex-direction: row;
        }

        :host .card.routes .route.query-params .info .text {
            font-size: 16px;
            color: black;
            margin-right: 12px;
        }

        :host .card.routes .route.query-params .info input {
            width: 500px;
        }

        :host .card.routes .route button {
            padding: 2px 10px;
            min-width: 104px;
            margin: 8px 12px 8px 8px;
        }

        :host .card.routes .route input {
            margin: 0 2px;
            padding: 4px;
        }

        :host .card.routes .route .info {
            padding-bottom: 2px;
            font-size: 14px;
            line-height: 22px;
            text-align: left;
            color: #0000008a;
        }

        :host .card.routes .box {
            height: 100px;
        }

        @media only screen and (max-width: 600px) {
            :host .card.apis .card-actions {
                flex-direction: column;
                margin-left: 3px;
            }
            :host .card.apis .card-actions button {
                margin-top: 12px;
                margin-left: 0;
                padding: 2px 10px;
                min-width: 104px;
                align-self: flex-start;
            }
            :host .card.apis .input label {
                text-align: left;
            }
            :host .card.apis .input {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            :host .card.apis input {
                width: inherit;
                align-self: normal;
            }

            :host .card.routes {
                margin-top: 12px;
            }
            :host .card.routes .route {
                margin-left: 3px !important;
            }
            :host .card.routes .route.query-params .info {
                display: flex;
                flex-direction: column;
                flex: 1;
                gap: 8px;
            }
            :host .card.routes .route.query-params .info input {
                margin: 0;
                width: inherit;
                align-self: normal;
            }
            :host .card.routes .route #roles-input {
                width: 90%;
            }
            :host .card.routes .route button {
                margin-left: 3px;
            }
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
                    <input id="api-headers-input" class="flex" placeholder='ex: name1:one, name2=two' />
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

    <div class="card routes">
        <div class="card-title">
            Guards access
        </div>
        <div class="card-actions column">
            <div class="route query-params">
                <div class="info">
                    <div class="text">Query params</div>
                    <input
                        id="guards-query-params-input"
                        placeholder="ex: param1=one&param2=two" />
                </div>
            </div>
            <div class="route">
                <button id="guards-home-button">HOME</button>
                <div class="info">Home page</div>
            </div>
            <div class="route">
                <button id="guards-public-button">PUBLIC</button>
                <div class="info">Public content (no login required)</div>
            </div>
            <div class="route">
                <button id="guards-private-button">PRIVATE</button>
                <div class="info">Private content (login required)</div>
            </div>
            <div class="route">
                <button id="guards-protected-button">PROTECTED</button>
                <div class="info">
                    Protected content (login required + role(s):<input id="guards-roles-input" />)
                </div>
            </div>
        </div>
        <div class="box">
            <slot id="cards"></slot>
        </div>
    </div>
`;class Mt extends HTMLElement{listeners=[];apiStatusEl;apiResponseEl;apiUrlEl;apiHeadersEl;apiBtnEl;guardsHomeBtnEl;guardsPublicBtnEl;guardsPrivateBtnEl;guardsProtectedBtnEl;guardsQueryParamsEl;guardsRolesEl;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(dt.content,!0)),this.apiStatusEl=this.shadowRoot?.querySelector("#api-status"),this.apiResponseEl=this.shadowRoot?.querySelector("#api-response"),this.apiUrlEl=this.shadowRoot?.querySelector("#api-url-input"),this.apiHeadersEl=this.shadowRoot?.querySelector("#api-headers-input"),this.apiBtnEl=this.shadowRoot?.querySelector("#api-get-button"),this.guardsHomeBtnEl=this.shadowRoot?.querySelector("#guards-home-button"),this.guardsPublicBtnEl=this.shadowRoot?.querySelector("#guards-public-button"),this.guardsPrivateBtnEl=this.shadowRoot?.querySelector("#guards-private-button"),this.guardsProtectedBtnEl=this.shadowRoot?.querySelector("#guards-protected-button"),this.guardsQueryParamsEl=this.shadowRoot?.querySelector("#guards-query-params-input"),this.guardsRolesEl=this.shadowRoot?.querySelector("#guards-roles-input")}connectedCallback(){const e=m=>{if("key"in m&&m.key!=="Enter")return!0;{const w=this.apiHeadersEl?.value.split(",").reduce((p,S)=>{if(S){const k=/^"?([^"]*)"?$/,d=S.split(":"),g=k.exec(d[0]?.trim())?.[1]??"",f=k.exec(d[1]?.trim())?.[1]??"";g&&(p[g]=f)}return p},{}),E=new CustomEvent("api",{bubbles:!0,composed:!0,detail:{url:this.apiUrlEl?.value,headers:w}});return this.dispatchEvent(E)}};this.apiBtnEl?.addEventListener("click",e),this.apiUrlEl?.addEventListener("keydown",e),this.apiHeadersEl?.addEventListener("keydown",e);const s=()=>{this.saveSettings({apiUrl:this.apiUrlEl?.value})};this.apiUrlEl?.addEventListener("input",s);const i=()=>{this.saveSettings({apiHeaders:this.apiHeadersEl?.value})};this.apiHeadersEl?.addEventListener("input",i);const r=()=>{this.saveSettings({queryParams:this.guardsQueryParamsEl?.value})};this.guardsQueryParamsEl?.addEventListener("input",r);const n=()=>{this.saveSettings({roles:this.guardsRolesEl?.value})};this.guardsRolesEl?.addEventListener("input",n);const o=m=>{const w={};return this.guardsQueryParamsEl?.value.split("&").forEach(E=>{const p=E.split("=");p.length===2&&(w[p[0]]=p[1])}),this.dispatchEvent(new CustomEvent(m,{bubbles:!0,composed:!0,detail:{queryParams:w}}))},a=()=>o("home");this.guardsHomeBtnEl?.addEventListener("click",a);const c=()=>o("public");this.guardsPublicBtnEl?.addEventListener("click",c);const l=()=>o("private");this.guardsPrivateBtnEl?.addEventListener("click",l);const h=m=>"key"in m&&m.key!=="Enter"?!0:o("protected");this.guardsProtectedBtnEl?.addEventListener("click",h),this.guardsRolesEl?.addEventListener("keydown",h),this.listeners.push(()=>this.apiBtnEl?.removeEventListener("click",e),()=>this.apiUrlEl?.removeEventListener("keydown",e),()=>this.apiHeadersEl?.removeEventListener("keydown",e),()=>this.apiUrlEl?.removeEventListener("input",s),()=>this.apiHeadersEl?.removeEventListener("input",i),()=>this.guardsQueryParamsEl?.removeEventListener("input",r),()=>this.guardsRolesEl?.removeEventListener("input",n),()=>this.guardsHomeBtnEl?.removeEventListener("click",a),()=>this.guardsPrivateBtnEl?.removeEventListener("click",l),()=>this.guardsProtectedBtnEl?.removeEventListener("click",h),()=>this.guardsRolesEl?.removeEventListener("keydown",h));const{otherSettings:u}=window.appSettings.getCurrentSettings();this.apiUrlEl&&(this.apiUrlEl.value=u?.apiUrl??""),this.apiHeadersEl&&(this.apiHeadersEl.value=u?.apiHeaders??""),this.guardsQueryParamsEl&&(this.guardsQueryParamsEl.value=u?.queryParams??""),this.guardsRolesEl&&(this.guardsRolesEl.value=u?.roles??"")}disconnectedCallback(){this.listeners.forEach(e=>{e()})}setApiStatus(e,s){this.apiStatusEl?.classList.remove(s?"success":"error"),this.apiStatusEl?.classList.add(s?"error":"success"),this.apiResponseEl&&(this.apiResponseEl.innerHTML=le(e))}saveSettings(e){const s=window.appSettings.getCurrentSettings();s.otherSettings={...s.otherSettings,...e},window.appSettings.addOrUpdateSettings(s,window.appSettings.get().currentSettingsIndex)}}window.customElements.define("demo-app-playground",Mt);const jt="1.1.6",$t={version:jt},Dt="1.0.7",Wt={version:Dt},Bt="4.0.7",Ft={version:Bt};var F=(t=>(t.REDIRECT="REDIRECT",t.POPUP="POPUP",t))(F||{});const te="auth-js:oidc_manager:redirect_url",j={loginRequired:!1,loadUserInfo:!1,retrieveUserSession:!0,automaticSilentRenew:!0,automaticLoginOn401:!0,automaticInjectToken:{headerName:"Authorization",include:t=>{const e=new URL(t,"http://default-base");return e.hostname.startsWith("api")||e.pathname.startsWith("/api")||!1}},scope:"openid profile email phone",desktopNavigationType:F.REDIRECT,logLevel:Q.NONE,internal:{response_type:"code",redirect_uri:"?oidc-callback=login",post_logout_redirect_uri:"?oidc-callback=logout",popup_redirect_uri:"oidc/callback/popup_redirect.html",popup_post_logout_redirect_uri:"oidc/callback/popup_redirect.html",silent_redirect_uri:"oidc/callback/silent_redirect.html",mobileWindowPresentationStyle:"popover"}},zt=[{label:"VanillaJS",demoUrl:"https://badisi.github.io/auth-js/demo-app/auth-js",version:$t.version},{label:"Angular",demoUrl:"https://badisi.github.io/auth-js/demo-app/ngx-auth",version:Ft.version},{label:"Vue.js",demoUrl:"https://badisi.github.io/auth-js/demo-app/auth-vue",version:Wt.version}],Se={...j,automaticInjectToken:{headerName:"Authorization",include:["/api"]}},Jt={name:"Auth0",otherSettings:{apiUrl:"https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|631b171682c639d40cb84d5c",apiHeaders:"",roles:"view-profile"},librarySettings:{...Se,authorityUrl:"https://dev-fijd1e9x.us.auth0.com",clientId:"kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt",mobileScheme:"demo-app",loadUserInfo:!0,scope:"openid profile email phone offline_access read:current_user",internal:{extraQueryParams:{audience:"https://dev-fijd1e9x.us.auth0.com/api/v2/"}}}},Gt={name:"Zitadel",otherSettings:{apiUrl:"http://localhost:8080/api/my-api",apiHeaders:"",roles:"view-profile"},librarySettings:{...Se,authorityUrl:"https://auth-js-0pdipf.zitadel.cloud",clientId:"178200751804317953@demo-app",mobileScheme:"demo-app",loadUserInfo:!0,scope:"openid profile email phone offline_access",internal:{extraQueryParams:{login_hint:"demo"}}}},Kt={name:"Keycloak (local)",otherSettings:{apiUrl:"http://localhost:8080/api/my-api",apiHeaders:"",roles:"view-profile"},librarySettings:{...Se,authorityUrl:"http://localhost:8080/auth/realms/demo",clientId:"demo-app",mobileScheme:"demo-app",loadUserInfo:!0}},Vt=(t=!1)=>[Jt,Gt,...t?[Kt]:[]],ht=document.createElement("template");ht.innerHTML=`
    <style>
        ${he}

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

        :host form div:has(#automaticInjectToken:not(:checked)) > div:has(#automaticInjectTokenheaderName),
        :host form div:has(#automaticInjectToken:not(:checked)) > div:has(#automaticInjectTokeninclude),
        :host form div:has(#automaticInjectToken:not(:checked)) > div:has(#automaticInjectTokenexclude) {
            label {
                color: lightgray;
            }
            input {
                opacity: 50%;
            }
        }

        :host form div.input:has(#automaticInjectTokenheaderName),
        :host form div.input:has(#automaticInjectTokeninclude),
        :host form div.input:has(#automaticInjectTokenexclude) {
            flex-direction: row;
            align-items: center;
            margin-left: 32px;

            label {
                margin-bottom: 0;
                margin-right: 8px;
            }

            input {
                flex: 1;
            }
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

        :host #setting-select {
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
            :host .setting-select {
                margin: 12px 8px;
            }
        }
    </style>

    <div class="setting-select row">
        <select id="setting-select"></select>
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
`;class Xt extends HTMLElement{listeners=[];formEl;formContentEl;selectEl;settingsNameEl;formIsDirty=!1;formIsNew=!1;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(ht.content,!0))}connectedCallback(){this.formEl=this.shadowRoot?.querySelector("form"),this.formContentEl=this.shadowRoot?.querySelector(".form-content"),this.selectEl=this.shadowRoot?.querySelector("#setting-select"),this.settingsNameEl=this.shadowRoot?.querySelector("#settingsName");const e=u=>{!this.formIsDirty&&u.target.id!=="setting-select"&&(this.formIsDirty=!0,this.classList.add("dirty"))};this.formEl?.addEventListener("input",e),this.listeners.push(()=>{this.formEl?.removeEventListener("input",e)}),this.refreshSelect();const s=()=>{this.selectEl&&this.loadSettings(this.selectEl.selectedIndex)};this.selectEl?.addEventListener("change",s),this.listeners.push(()=>{this.selectEl?.removeEventListener("change",s)});const i=this.shadowRoot?.querySelector("#add-settings-button"),r=()=>{this.add()};i?.addEventListener("click",r),this.listeners.push(()=>i?.removeEventListener("click",r));const n=this.shadowRoot?.querySelector("#delete-settings-button"),o=()=>{this.delete()};n?.addEventListener("click",o),this.listeners.push(()=>n?.removeEventListener("click",o));const a=this.shadowRoot?.querySelector("#save-settings-button"),c=()=>{this.saveAndReload()};a?.addEventListener("click",c),this.listeners.push(()=>a?.removeEventListener("click",c));const l=this.shadowRoot?.querySelector("#cancel-settings-button"),h=()=>{this.cancel()};l?.addEventListener("click",h),this.listeners.push(()=>l?.removeEventListener("click",h)),this.refreshFormContent(window.appSettings.getCurrentSettings())}disconnectedCallback(){this.listeners.forEach(e=>{e()})}loadSettings(e){window.appSettings.setCurrentSettingsIndex(e),location.reload()}add(){const e="New settings",s=document.createElement("option");s.selected=!0,s.value=e,s.textContent=e,this.selectEl?.appendChild(s),this.formIsNew=!0,this.formIsDirty=!0,this.classList.add("dirty"),this.refreshFormContent({name:e,librarySettings:Se})}delete(){window.appSettings.deleteCurrentSettings(),window.appSettings.setCurrentSettingsIndex(0),location.reload()}cancel(){this.formIsNew=!1,this.formIsDirty=!1,this.classList.remove("dirty"),this.refreshSelect(),this.refreshFormContent(window.appSettings.getCurrentSettings())}setPathValue(e,s,i){const r=s.split(".");r.reduce((n,o,a)=>(a===r.length-1?(typeof i=="string"&&i.trim()===""&&(i=void 0),n[o]=i):(!(o in n)||typeof n[o]!="object"||n[o]===null)&&(n[o]={}),n[o]),e)}getPathValue(e,s){return s.split(".").reduce((i,r)=>i&&typeof i=="object"&&r in i?i[r]:void 0,e)}refreshSelect(){this.selectEl&&(this.selectEl.innerHTML="");const{settings:e,currentSettingsIndex:s}=window.appSettings.get();e.forEach((i,r)=>{const n=document.createElement("option");n.selected=r===s,n.value=i.name,n.textContent=i.name,this.selectEl?.appendChild(n)})}refreshFormContent(e){if(this.formContentEl&&(this.formContentEl.innerHTML=""),this.settingsNameEl){const s=window.appSettings.getLibrarySettingsDefinition(),{name:i,librarySettings:r}=e;this.settingsNameEl.value=i,s.sort((o,a)=>(a._sortIndex||0)-(o._sortIndex||0)).forEach(o=>{const a=document.createElement("div");this.formContentEl?.prepend(a);const c=document.createElement("label");c.htmlFor=o.name.replace(".",""),c.textContent=`${o.label}${o.required?" *":""}`;const l=document.createElement(o.type==="list"?"select":"input");switch(l.id=o.name.replace(".",""),l.name=o.name.replace(".",""),l.required=o.required===!0,o.type){case"boolean":l.checked=this.getPathValue(r,o.name),l.type="checkbox",a.appendChild(l),a.appendChild(c);break;case"list":o.values?.forEach(h=>{const u=document.createElement("option");u.value=String(h.value),u.textContent=h.label,l.appendChild(u)}),l.value=this.getPathValue(r,o.name),l.classList.add("flex"),a.classList.add("input","column"),a.appendChild(c),a.appendChild(l);break;default:{const h=this.getPathValue(r,o.name);o.type==="json"?l.value=h?JSON.stringify(h):"":l.value=h??"",o.placeholder&&(l.placeholder=o.placeholder),a.classList.add("input","column"),a.appendChild(c),a.appendChild(l);break}}});const n=this.shadowRoot?.querySelector("#automaticInjectToken");n&&(n.onclick=()=>{if(!n.checked){const o=this.shadowRoot?.querySelector("#automaticInjectTokenheaderName");o&&(o.disabled=!0,o.value="");const a=this.shadowRoot?.querySelector("#automaticInjectTokeninclude");a&&(a.disabled=!0,a.value="");const c=this.shadowRoot?.querySelector("#automaticInjectTokenexclude");c&&(c.disabled=!0,c.value="")}})}}saveAndReload(){if(this.formEl?.reportValidity()&&this.settingsNameEl){const e=window.appSettings.getLibrarySettingsDefinition(),s=this.formIsNew?{name:"",librarySettings:{}}:window.appSettings.getCurrentSettings();if(s.name=this.settingsNameEl.value,e.sort((r,n)=>(r._sortIndex||0)-(n._sortIndex||0)).forEach(r=>{const n=this.shadowRoot?.querySelector(`#${r.name.replace(".","")}`);let o;switch(r.type){case"boolean":o=n.checked;break;case"list":o=n.value;break;case"json":try{const a=n.value;a&&a.trim()!==""&&(o=JSON.parse(a))}catch(a){console.error(a)}break;default:o=n.value;break}this.setPathValue(s.librarySettings,r.name,o)}),!this.shadowRoot?.querySelector("#automaticInjectToken")?.checked)s.librarySettings.automaticInjectToken=!1;else{let r=s.librarySettings.automaticInjectToken;typeof r=="object"&&((!r.headerName||r.headerName.trim()==="")&&(!r.include||r.include.trim()==="")&&(!r.exclude||r.exclude.trim()==="")?r=!0:(r.include&&(r.include=r.include.split(",")),r.exclude&&(r.exclude=r.exclude.split(","))),s.librarySettings.automaticInjectToken=r)}if(this.formIsNew){const r=window.appSettings.addOrUpdateSettings(s);this.selectEl&&r&&window.appSettings.setCurrentSettingsIndex(r)}else window.appSettings.addOrUpdateSettings(s,window.appSettings.get().currentSettingsIndex);location.reload()}}}window.customElements.define("demo-app-settings",Xt);var Te=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ee(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Qt(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var e=t.default;if(typeof e=="function"){var s=function i(){var r=!1;try{r=this instanceof i}catch{}return r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};s.prototype=e.prototype}else s={};return Object.defineProperty(s,"__esModule",{value:!0}),Object.keys(t).forEach(function(i){var r=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(s,i,r.get?r:{enumerable:!0,get:function(){return t[i]}})}),s}function Yt(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var pe={exports:{}};const Zt={},es=Object.freeze(Object.defineProperty({__proto__:null,default:Zt},Symbol.toStringTag,{value:"Module"})),ts=Qt(es);var ss=pe.exports,Ke;function xe(){return Ke||(Ke=1,(function(t,e){(function(s,i){t.exports=i()})(ss,function(){var s=s||(function(i,r){var n;if(typeof window<"u"&&window.crypto&&(n=window.crypto),typeof self<"u"&&self.crypto&&(n=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(n=globalThis.crypto),!n&&typeof window<"u"&&window.msCrypto&&(n=window.msCrypto),!n&&typeof Te<"u"&&Te.crypto&&(n=Te.crypto),!n&&typeof Yt=="function")try{n=ts}catch{}var o=function(){if(n){if(typeof n.getRandomValues=="function")try{return n.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof n.randomBytes=="function")try{return n.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},a=Object.create||(function(){function d(){}return function(g){var f;return d.prototype=g,f=new d,d.prototype=null,f}})(),c={},l=c.lib={},h=l.Base=(function(){return{extend:function(d){var g=a(this);return d&&g.mixIn(d),(!g.hasOwnProperty("init")||this.init===g.init)&&(g.init=function(){g.$super.init.apply(this,arguments)}),g.init.prototype=g,g.$super=this,g},create:function(){var d=this.extend();return d.init.apply(d,arguments),d},init:function(){},mixIn:function(d){for(var g in d)d.hasOwnProperty(g)&&(this[g]=d[g]);d.hasOwnProperty("toString")&&(this.toString=d.toString)},clone:function(){return this.init.prototype.extend(this)}}})(),u=l.WordArray=h.extend({init:function(d,g){d=this.words=d||[],g!=r?this.sigBytes=g:this.sigBytes=d.length*4},toString:function(d){return(d||w).stringify(this)},concat:function(d){var g=this.words,f=d.words,v=this.sigBytes,x=d.sigBytes;if(this.clamp(),v%4)for(var _=0;_<x;_++){var b=f[_>>>2]>>>24-_%4*8&255;g[v+_>>>2]|=b<<24-(v+_)%4*8}else for(var C=0;C<x;C+=4)g[v+C>>>2]=f[C>>>2];return this.sigBytes+=x,this},clamp:function(){var d=this.words,g=this.sigBytes;d[g>>>2]&=4294967295<<32-g%4*8,d.length=i.ceil(g/4)},clone:function(){var d=h.clone.call(this);return d.words=this.words.slice(0),d},random:function(d){for(var g=[],f=0;f<d;f+=4)g.push(o());return new u.init(g,d)}}),m=c.enc={},w=m.Hex={stringify:function(d){for(var g=d.words,f=d.sigBytes,v=[],x=0;x<f;x++){var _=g[x>>>2]>>>24-x%4*8&255;v.push((_>>>4).toString(16)),v.push((_&15).toString(16))}return v.join("")},parse:function(d){for(var g=d.length,f=[],v=0;v<g;v+=2)f[v>>>3]|=parseInt(d.substr(v,2),16)<<24-v%8*4;return new u.init(f,g/2)}},E=m.Latin1={stringify:function(d){for(var g=d.words,f=d.sigBytes,v=[],x=0;x<f;x++){var _=g[x>>>2]>>>24-x%4*8&255;v.push(String.fromCharCode(_))}return v.join("")},parse:function(d){for(var g=d.length,f=[],v=0;v<g;v++)f[v>>>2]|=(d.charCodeAt(v)&255)<<24-v%4*8;return new u.init(f,g)}},p=m.Utf8={stringify:function(d){try{return decodeURIComponent(escape(E.stringify(d)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(d){return E.parse(unescape(encodeURIComponent(d)))}},S=l.BufferedBlockAlgorithm=h.extend({reset:function(){this._data=new u.init,this._nDataBytes=0},_append:function(d){typeof d=="string"&&(d=p.parse(d)),this._data.concat(d),this._nDataBytes+=d.sigBytes},_process:function(d){var g,f=this._data,v=f.words,x=f.sigBytes,_=this.blockSize,b=_*4,C=x/b;d?C=i.ceil(C):C=i.max((C|0)-this._minBufferSize,0);var I=C*_,T=i.min(I*4,x);if(I){for(var P=0;P<I;P+=_)this._doProcessBlock(v,P);g=v.splice(0,I),f.sigBytes-=T}return new u.init(g,T)},clone:function(){var d=h.clone.call(this);return d._data=this._data.clone(),d},_minBufferSize:0});l.Hasher=S.extend({cfg:h.extend(),init:function(d){this.cfg=this.cfg.extend(d),this.reset()},reset:function(){S.reset.call(this),this._doReset()},update:function(d){return this._append(d),this._process(),this},finalize:function(d){d&&this._append(d);var g=this._doFinalize();return g},blockSize:16,_createHelper:function(d){return function(g,f){return new d.init(f).finalize(g)}},_createHmacHelper:function(d){return function(g,f){return new k.HMAC.init(d,f).finalize(g)}}});var k=c.algo={};return c})(Math);return s})})(pe)),pe.exports}var is=xe();const rs=Ee(is);var fe={exports:{}},ns=fe.exports,Ve;function os(){return Ve||(Ve=1,(function(t,e){(function(s,i){t.exports=i(xe())})(ns,function(s){return(function(i){var r=s,n=r.lib,o=n.WordArray,a=n.Hasher,c=r.algo,l=[],h=[];(function(){function w(k){for(var d=i.sqrt(k),g=2;g<=d;g++)if(!(k%g))return!1;return!0}function E(k){return(k-(k|0))*4294967296|0}for(var p=2,S=0;S<64;)w(p)&&(S<8&&(l[S]=E(i.pow(p,1/2))),h[S]=E(i.pow(p,1/3)),S++),p++})();var u=[],m=c.SHA256=a.extend({_doReset:function(){this._hash=new o.init(l.slice(0))},_doProcessBlock:function(w,E){for(var p=this._hash.words,S=p[0],k=p[1],d=p[2],g=p[3],f=p[4],v=p[5],x=p[6],_=p[7],b=0;b<64;b++){if(b<16)u[b]=w[E+b]|0;else{var C=u[b-15],I=(C<<25|C>>>7)^(C<<14|C>>>18)^C>>>3,T=u[b-2],P=(T<<15|T>>>17)^(T<<13|T>>>19)^T>>>10;u[b]=I+u[b-7]+P+u[b-16]}var z=f&v^~f&x,ae=S&k^S&d^k&d,J=(S<<30|S>>>2)^(S<<19|S>>>13)^(S<<10|S>>>22),Z=(f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25),G=_+Z+z+h[b]+u[b],ce=J+ae;_=x,x=v,v=f,f=g+G|0,g=d,d=k,k=S,S=G+ce|0}p[0]=p[0]+S|0,p[1]=p[1]+k|0,p[2]=p[2]+d|0,p[3]=p[3]+g|0,p[4]=p[4]+f|0,p[5]=p[5]+v|0,p[6]=p[6]+x|0,p[7]=p[7]+_|0},_doFinalize:function(){var w=this._data,E=w.words,p=this._nDataBytes*8,S=w.sigBytes*8;return E[S>>>5]|=128<<24-S%32,E[(S+64>>>9<<4)+14]=i.floor(p/4294967296),E[(S+64>>>9<<4)+15]=p,w.sigBytes=E.length*4,this._process(),this._hash},clone:function(){var w=a.clone.call(this);return w._hash=this._hash.clone(),w}});r.SHA256=a._createHelper(m),r.HmacSHA256=a._createHmacHelper(m)})(Math),s.SHA256})})(fe)),fe.exports}var as=os();const cs=Ee(as);var me={exports:{}},ls=me.exports,Xe;function ds(){return Xe||(Xe=1,(function(t,e){(function(s,i){t.exports=i(xe())})(ls,function(s){return(function(){var i=s,r=i.lib,n=r.WordArray,o=i.enc;o.Base64={stringify:function(c){var l=c.words,h=c.sigBytes,u=this._map;c.clamp();for(var m=[],w=0;w<h;w+=3)for(var E=l[w>>>2]>>>24-w%4*8&255,p=l[w+1>>>2]>>>24-(w+1)%4*8&255,S=l[w+2>>>2]>>>24-(w+2)%4*8&255,k=E<<16|p<<8|S,d=0;d<4&&w+d*.75<h;d++)m.push(u.charAt(k>>>6*(3-d)&63));var g=u.charAt(64);if(g)for(;m.length%4;)m.push(g);return m.join("")},parse:function(c){var l=c.length,h=this._map,u=this._reverseMap;if(!u){u=this._reverseMap=[];for(var m=0;m<h.length;m++)u[h.charCodeAt(m)]=m}var w=h.charAt(64);if(w){var E=c.indexOf(w);E!==-1&&(l=E)}return a(c,l,u)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function a(c,l,h){for(var u=[],m=0,w=0;w<l;w++)if(w%4){var E=h[c.charCodeAt(w-1)]<<w%4*2,p=h[c.charCodeAt(w)]>>>6-w%4*2,S=E|p;u[m>>>2]|=S<<24-m%4*8,m++}return n.create(u,m)}})(),s.enc.Base64})})(me)),me.exports}var hs=ds();const Qe=Ee(hs);var we={exports:{}},us=we.exports,Ye;function gs(){return Ye||(Ye=1,(function(t,e){(function(s,i){t.exports=i(xe())})(us,function(s){return s.enc.Utf8})})(we)),we.exports}var ps=gs();const fs=Ee(ps);var ms={debug:()=>{},info:()=>{},warn:()=>{},error:()=>{}},H,N,ne=(t=>(t[t.NONE=0]="NONE",t[t.ERROR=1]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=3]="INFO",t[t.DEBUG=4]="DEBUG",t))(ne||{});(t=>{function e(){H=3,N=ms}t.reset=e;function s(r){if(!(0<=r&&r<=4))throw new Error("Invalid log level");H=r}t.setLevel=s;function i(r){N=r}t.setLogger=i})(ne||(ne={}));var y=class{constructor(t){this._name=t}debug(...t){H>=4&&N.debug(y._format(this._name,this._method),...t)}info(...t){H>=3&&N.info(y._format(this._name,this._method),...t)}warn(...t){H>=2&&N.warn(y._format(this._name,this._method),...t)}error(...t){H>=1&&N.error(y._format(this._name,this._method),...t)}throw(t){throw this.error(t),t}create(t){const e=Object.create(this);return e._method=t,e.debug("begin"),e}static createStatic(t,e){const s=new y(`${t}.${e}`);return s.debug("begin"),s}static _format(t,e){const s=`[${t}]`;return e?`${s} ${e}:`:s}static debug(t,...e){H>=4&&N.debug(y._format(t),...e)}static info(t,...e){H>=3&&N.info(y._format(t),...e)}static warn(t,...e){H>=2&&N.warn(y._format(t),...e)}static error(t,...e){H>=1&&N.error(y._format(t),...e)}};ne.reset();var ws="10000000-1000-4000-8000-100000000000",M=class{static _randomWord(){return rs.lib.WordArray.random(1).words[0]}static generateUUIDv4(){return ws.replace(/[018]/g,e=>(+e^M._randomWord()&15>>+e/4).toString(16)).replace(/-/g,"")}static generateCodeVerifier(){return M.generateUUIDv4()+M.generateUUIDv4()+M.generateUUIDv4()}static generateCodeChallenge(t){try{const e=cs(t);return Qe.stringify(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}catch(e){throw y.error("CryptoUtils.generateCodeChallenge",e),e}}static generateBasicAuth(t,e){const s=fs.parse([t,e].join(":"));return Qe.stringify(s)}},B=class{constructor(e){this._name=e,this._logger=new y(`Event('${this._name}')`),this._callbacks=[]}addHandler(e){return this._callbacks.push(e),()=>this.removeHandler(e)}removeHandler(e){const s=this._callbacks.lastIndexOf(e);s>=0&&this._callbacks.splice(s,1)}raise(...e){this._logger.debug("raise:",...e);for(const s of this._callbacks)s(...e)}},Oe=class{static decode(t){try{return st(t)}catch(e){throw y.error("JwtUtils.decode",e),e}}},Ze=class{static center({...t}){var e,s,i;return t.width==null&&(t.width=(e=[800,720,600,480].find(r=>r<=window.outerWidth/1.618))!=null?e:360),(s=t.left)!=null||(t.left=Math.max(0,Math.round(window.screenX+(window.outerWidth-t.width)/2))),t.height!=null&&((i=t.top)!=null||(t.top=Math.max(0,Math.round(window.screenY+(window.outerHeight-t.height)/2)))),t}static serialize(t){return Object.entries(t).filter(([,e])=>e!=null).map(([e,s])=>`${e}=${typeof s!="boolean"?s:s?"yes":"no"}`).join(",")}},L=class extends B{constructor(){super(...arguments),this._logger=new y(`Timer('${this._name}')`),this._timerHandle=null,this._expiration=0,this._callback=()=>{const t=this._expiration-L.getEpochTime();this._logger.debug("timer completes in",t),this._expiration<=L.getEpochTime()&&(this.cancel(),super.raise())}}static getEpochTime(){return Math.floor(Date.now()/1e3)}init(t){const e=this._logger.create("init");t=Math.max(Math.floor(t),1);const s=L.getEpochTime()+t;if(this.expiration===s&&this._timerHandle){e.debug("skipping since already initialized for expiration at",this.expiration);return}this.cancel(),e.debug("using duration",t),this._expiration=s;const i=Math.min(t,5);this._timerHandle=setInterval(this._callback,i*1e3)}get expiration(){return this._expiration}cancel(){this._logger.create("cancel"),this._timerHandle&&(clearInterval(this._timerHandle),this._timerHandle=null)}},qe=class{static readParams(t,e="query"){if(!t)throw new TypeError("Invalid URL");const i=new URL(t,"http://127.0.0.1")[e==="fragment"?"hash":"search"];return new URLSearchParams(i.slice(1))}},He=";",Y=class extends Error{constructor(t,e){var s,i,r;if(super(t.error_description||t.error||""),this.form=e,this.name="ErrorResponse",!t.error)throw y.error("ErrorResponse","No error passed"),new Error("No error passed");this.error=t.error,this.error_description=(s=t.error_description)!=null?s:null,this.error_uri=(i=t.error_uri)!=null?i:null,this.state=t.userState,this.session_state=(r=t.session_state)!=null?r:null,this.url_state=t.url_state}},je=class extends Error{constructor(t){super(t),this.name="ErrorTimeout"}},_s=class{constructor(t){this._logger=new y("AccessTokenEvents"),this._expiringTimer=new L("Access token expiring"),this._expiredTimer=new L("Access token expired"),this._expiringNotificationTimeInSeconds=t.expiringNotificationTimeInSeconds}load(t){const e=this._logger.create("load");if(t.access_token&&t.expires_in!==void 0){const s=t.expires_in;if(e.debug("access token present, remaining duration:",s),s>0){let r=s-this._expiringNotificationTimeInSeconds;r<=0&&(r=1),e.debug("registering expiring timer, raising in",r,"seconds"),this._expiringTimer.init(r)}else e.debug("canceling existing expiring timer because we're past expiration."),this._expiringTimer.cancel();const i=s+1;e.debug("registering expired timer, raising in",i,"seconds"),this._expiredTimer.init(i)}else this._expiringTimer.cancel(),this._expiredTimer.cancel()}unload(){this._logger.debug("unload: canceling existing access token timers"),this._expiringTimer.cancel(),this._expiredTimer.cancel()}addAccessTokenExpiring(t){return this._expiringTimer.addHandler(t)}removeAccessTokenExpiring(t){this._expiringTimer.removeHandler(t)}addAccessTokenExpired(t){return this._expiredTimer.addHandler(t)}removeAccessTokenExpired(t){this._expiredTimer.removeHandler(t)}},vs=class{constructor(t,e,s,i,r){this._callback=t,this._client_id=e,this._intervalInSeconds=i,this._stopOnError=r,this._logger=new y("CheckSessionIFrame"),this._timer=null,this._session_state=null,this._message=o=>{o.origin===this._frame_origin&&o.source===this._frame.contentWindow&&(o.data==="error"?(this._logger.error("error message from check session op iframe"),this._stopOnError&&this.stop()):o.data==="changed"?(this._logger.debug("changed message from check session op iframe"),this.stop(),this._callback()):this._logger.debug(o.data+" message from check session op iframe"))};const n=new URL(s);this._frame_origin=n.origin,this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="fixed",this._frame.style.left="-1000px",this._frame.style.top="0",this._frame.width="0",this._frame.height="0",this._frame.src=n.href}load(){return new Promise(t=>{this._frame.onload=()=>{t()},window.document.body.appendChild(this._frame),window.addEventListener("message",this._message,!1)})}start(t){if(this._session_state===t)return;this._logger.create("start"),this.stop(),this._session_state=t;const e=()=>{!this._frame.contentWindow||!this._session_state||this._frame.contentWindow.postMessage(this._client_id+" "+this._session_state,this._frame_origin)};e(),this._timer=setInterval(e,this._intervalInSeconds*1e3)}stop(){this._logger.create("stop"),this._session_state=null,this._timer&&(clearInterval(this._timer),this._timer=null)}},$e=class{constructor(){this._logger=new y("InMemoryWebStorage"),this._data={}}clear(){this._logger.create("clear"),this._data={}}getItem(t){return this._logger.create(`getItem('${t}')`),this._data[t]}setItem(t,e){this._logger.create(`setItem('${t}')`),this._data[t]=e}removeItem(t){this._logger.create(`removeItem('${t}')`),delete this._data[t]}get length(){return Object.getOwnPropertyNames(this._data).length}key(t){return Object.getOwnPropertyNames(this._data)[t]}},De=class{constructor(t=[],e=null,s={}){this._jwtHandler=e,this._extraHeaders=s,this._logger=new y("JsonService"),this._contentTypes=[],this._contentTypes.push(...t,"application/json"),e&&this._contentTypes.push("application/jwt")}async fetchWithTimeout(t,e={}){const{timeoutInSeconds:s,...i}=e;if(!s)return await fetch(t,i);const r=new AbortController,n=setTimeout(()=>r.abort(),s*1e3);try{return await fetch(t,{...e,signal:r.signal})}catch(o){throw o instanceof DOMException&&o.name==="AbortError"?new je("Network timed out"):o}finally{clearTimeout(n)}}async getJson(t,{token:e,credentials:s}={}){const i=this._logger.create("getJson"),r={Accept:this._contentTypes.join(", ")};e&&(i.debug("token passed, setting Authorization header"),r.Authorization="Bearer "+e),this.appendExtraHeaders(r);let n;try{i.debug("url:",t),n=await this.fetchWithTimeout(t,{method:"GET",headers:r,credentials:s})}catch(c){throw i.error("Network Error"),c}i.debug("HTTP response received, status",n.status);const o=n.headers.get("Content-Type");if(o&&!this._contentTypes.find(c=>o.startsWith(c))&&i.throw(new Error(`Invalid response Content-Type: ${o??"undefined"}, from URL: ${t}`)),n.ok&&this._jwtHandler&&o?.startsWith("application/jwt"))return await this._jwtHandler(await n.text());let a;try{a=await n.json()}catch(c){throw i.error("Error parsing JSON response",c),n.ok?c:new Error(`${n.statusText} (${n.status})`)}if(!n.ok)throw i.error("Error from server:",a),a.error?new Y(a):new Error(`${n.statusText} (${n.status}): ${JSON.stringify(a)}`);return a}async postForm(t,{body:e,basicAuth:s,timeoutInSeconds:i,initCredentials:r}){const n=this._logger.create("postForm"),o={Accept:this._contentTypes.join(", "),"Content-Type":"application/x-www-form-urlencoded"};s!==void 0&&(o.Authorization="Basic "+s),this.appendExtraHeaders(o);let a;try{n.debug("url:",t),a=await this.fetchWithTimeout(t,{method:"POST",headers:o,body:e,timeoutInSeconds:i,credentials:r})}catch(u){throw n.error("Network error"),u}n.debug("HTTP response received, status",a.status);const c=a.headers.get("Content-Type");if(c&&!this._contentTypes.find(u=>c.startsWith(u)))throw new Error(`Invalid response Content-Type: ${c??"undefined"}, from URL: ${t}`);const l=await a.text();let h={};if(l)try{h=JSON.parse(l)}catch(u){throw n.error("Error parsing JSON response",u),a.ok?u:new Error(`${a.statusText} (${a.status})`)}if(!a.ok)throw n.error("Error from server:",h),h.error?new Y(h,e):new Error(`${a.statusText} (${a.status}): ${JSON.stringify(h)}`);return h}appendExtraHeaders(t){const e=this._logger.create("appendExtraHeaders"),s=Object.keys(this._extraHeaders),i=["authorization","accept","content-type"];s.length!==0&&s.forEach(r=>{if(i.includes(r.toLocaleLowerCase())){e.warn("Protected header could not be overridden",r,i);return}const n=typeof this._extraHeaders[r]=="function"?this._extraHeaders[r]():this._extraHeaders[r];n&&n!==""&&(t[r]=n)})}},bs=class{constructor(t){this._settings=t,this._logger=new y("MetadataService"),this._signingKeys=null,this._metadata=null,this._metadataUrl=this._settings.metadataUrl,this._jsonService=new De(["application/jwk-set+json"],null,this._settings.extraHeaders),this._settings.signingKeys&&(this._logger.debug("using signingKeys from settings"),this._signingKeys=this._settings.signingKeys),this._settings.metadata&&(this._logger.debug("using metadata from settings"),this._metadata=this._settings.metadata),this._settings.fetchRequestCredentials&&(this._logger.debug("using fetchRequestCredentials from settings"),this._fetchRequestCredentials=this._settings.fetchRequestCredentials)}resetSigningKeys(){this._signingKeys=null}async getMetadata(){const t=this._logger.create("getMetadata");if(this._metadata)return t.debug("using cached values"),this._metadata;if(!this._metadataUrl)throw t.throw(new Error("No authority or metadataUrl configured on settings")),null;t.debug("getting metadata from",this._metadataUrl);const e=await this._jsonService.getJson(this._metadataUrl,{credentials:this._fetchRequestCredentials});return t.debug("merging remote JSON with seed metadata"),this._metadata=Object.assign({},this._settings.metadataSeed,e),this._metadata}getIssuer(){return this._getMetadataProperty("issuer")}getAuthorizationEndpoint(){return this._getMetadataProperty("authorization_endpoint")}getUserInfoEndpoint(){return this._getMetadataProperty("userinfo_endpoint")}getTokenEndpoint(t=!0){return this._getMetadataProperty("token_endpoint",t)}getCheckSessionIframe(){return this._getMetadataProperty("check_session_iframe",!0)}getEndSessionEndpoint(){return this._getMetadataProperty("end_session_endpoint",!0)}getRevocationEndpoint(t=!0){return this._getMetadataProperty("revocation_endpoint",t)}getKeysEndpoint(t=!0){return this._getMetadataProperty("jwks_uri",t)}async _getMetadataProperty(t,e=!1){const s=this._logger.create(`_getMetadataProperty('${t}')`),i=await this.getMetadata();if(s.debug("resolved"),i[t]===void 0){if(e===!0){s.warn("Metadata does not contain optional property");return}s.throw(new Error("Metadata does not contain property "+t))}return i[t]}async getSigningKeys(){const t=this._logger.create("getSigningKeys");if(this._signingKeys)return t.debug("returning signingKeys from cache"),this._signingKeys;const e=await this.getKeysEndpoint(!1);t.debug("got jwks_uri",e);const s=await this._jsonService.getJson(e);if(t.debug("got key set",s),!Array.isArray(s.keys))throw t.throw(new Error("Missing keys on keyset")),null;return this._signingKeys=s.keys,this._signingKeys}},We=class{constructor({prefix:t="oidc.",store:e=localStorage}={}){this._logger=new y("WebStorageStateStore"),this._store=e,this._prefix=t}async set(t,e){this._logger.create(`set('${t}')`),t=this._prefix+t,await this._store.setItem(t,e)}async get(t){return this._logger.create(`get('${t}')`),t=this._prefix+t,await this._store.getItem(t)}async remove(t){this._logger.create(`remove('${t}')`),t=this._prefix+t;const e=await this._store.getItem(t);return await this._store.removeItem(t),e}async getAllKeys(){this._logger.create("getAllKeys");const t=await this._store.length,e=[];for(let s=0;s<t;s++){const i=await this._store.key(s);i&&i.indexOf(this._prefix)===0&&e.push(i.substr(this._prefix.length))}return e}},ys="code",Ss="openid",Es="client_secret_post",xs="query",ks=900,Cs=300,Ne=class{constructor({authority:t,metadataUrl:e,metadata:s,signingKeys:i,metadataSeed:r,client_id:n,client_secret:o,response_type:a=ys,scope:c=Ss,redirect_uri:l,post_logout_redirect_uri:h,client_authentication:u=Es,prompt:m,display:w,max_age:E,ui_locales:p,acr_values:S,resource:k,response_mode:d=xs,filterProtocolClaims:g=!0,loadUserInfo:f=!1,staleStateAgeInSeconds:v=ks,clockSkewInSeconds:x=Cs,userInfoJwtIssuer:_="OP",mergeClaims:b=!1,disablePKCE:C=!1,stateStore:I,refreshTokenCredentials:T,revokeTokenAdditionalContentTypes:P,fetchRequestCredentials:z,refreshTokenAllowedScope:ae,extraQueryParams:J={},extraTokenParams:Z={},extraHeaders:G={}}){if(this.authority=t,e?this.metadataUrl=e:(this.metadataUrl=t,t&&(this.metadataUrl.endsWith("/")||(this.metadataUrl+="/"),this.metadataUrl+=".well-known/openid-configuration")),this.metadata=s,this.metadataSeed=r,this.signingKeys=i,this.client_id=n,this.client_secret=o,this.response_type=a,this.scope=c,this.redirect_uri=l,this.post_logout_redirect_uri=h,this.client_authentication=u,this.prompt=m,this.display=w,this.max_age=E,this.ui_locales=p,this.acr_values=S,this.resource=k,this.response_mode=d,this.filterProtocolClaims=g??!0,this.loadUserInfo=!!f,this.staleStateAgeInSeconds=v,this.clockSkewInSeconds=x,this.userInfoJwtIssuer=_,this.mergeClaims=!!b,this.disablePKCE=!!C,this.revokeTokenAdditionalContentTypes=P,z&&T&&console.warn("Both fetchRequestCredentials and refreshTokenCredentials is set. Only fetchRequestCredentials will be used."),this.fetchRequestCredentials=z||T||"same-origin",I)this.stateStore=I;else{const ce=typeof window<"u"?window.localStorage:new $e;this.stateStore=new We({store:ce})}this.refreshTokenAllowedScope=ae,this.extraQueryParams=J,this.extraTokenParams=Z,this.extraHeaders=G}},Rs=class{constructor(t,e){this._settings=t,this._metadataService=e,this._logger=new y("UserInfoService"),this._getClaimsFromJwt=async s=>{const i=this._logger.create("_getClaimsFromJwt");try{const r=Oe.decode(s);return i.debug("JWT decoding successful"),r}catch(r){throw i.error("Error parsing JWT response"),r}},this._jsonService=new De(void 0,this._getClaimsFromJwt,this._settings.extraHeaders)}async getClaims(t){const e=this._logger.create("getClaims");t||this._logger.throw(new Error("No token passed"));const s=await this._metadataService.getUserInfoEndpoint();e.debug("got userinfo url",s);const i=await this._jsonService.getJson(s,{token:t,credentials:this._settings.fetchRequestCredentials});return e.debug("got claims",i),i}},ut=class{constructor(t,e){this._settings=t,this._metadataService=e,this._logger=new y("TokenClient"),this._jsonService=new De(this._settings.revokeTokenAdditionalContentTypes,null,this._settings.extraHeaders)}async exchangeCode({grant_type:t="authorization_code",redirect_uri:e=this._settings.redirect_uri,client_id:s=this._settings.client_id,client_secret:i=this._settings.client_secret,...r}){const n=this._logger.create("exchangeCode");s||n.throw(new Error("A client_id is required")),e||n.throw(new Error("A redirect_uri is required")),r.code||n.throw(new Error("A code is required"));const o=new URLSearchParams({grant_type:t,redirect_uri:e});for(const[h,u]of Object.entries(r))u!=null&&o.set(h,u);let a;switch(this._settings.client_authentication){case"client_secret_basic":if(!i)throw n.throw(new Error("A client_secret is required")),null;a=M.generateBasicAuth(s,i);break;case"client_secret_post":o.append("client_id",s),i&&o.append("client_secret",i);break}const c=await this._metadataService.getTokenEndpoint(!1);n.debug("got token endpoint");const l=await this._jsonService.postForm(c,{body:o,basicAuth:a,initCredentials:this._settings.fetchRequestCredentials});return n.debug("got response"),l}async exchangeCredentials({grant_type:t="password",client_id:e=this._settings.client_id,client_secret:s=this._settings.client_secret,scope:i=this._settings.scope,...r}){const n=this._logger.create("exchangeCredentials");e||n.throw(new Error("A client_id is required"));const o=new URLSearchParams({grant_type:t,scope:i});for(const[h,u]of Object.entries(r))u!=null&&o.set(h,u);let a;switch(this._settings.client_authentication){case"client_secret_basic":if(!s)throw n.throw(new Error("A client_secret is required")),null;a=M.generateBasicAuth(e,s);break;case"client_secret_post":o.append("client_id",e),s&&o.append("client_secret",s);break}const c=await this._metadataService.getTokenEndpoint(!1);n.debug("got token endpoint");const l=await this._jsonService.postForm(c,{body:o,basicAuth:a,initCredentials:this._settings.fetchRequestCredentials});return n.debug("got response"),l}async exchangeRefreshToken({grant_type:t="refresh_token",client_id:e=this._settings.client_id,client_secret:s=this._settings.client_secret,timeoutInSeconds:i,...r}){const n=this._logger.create("exchangeRefreshToken");e||n.throw(new Error("A client_id is required")),r.refresh_token||n.throw(new Error("A refresh_token is required"));const o=new URLSearchParams({grant_type:t});for(const[h,u]of Object.entries(r))Array.isArray(u)?u.forEach(m=>o.append(h,m)):u!=null&&o.set(h,u);let a;switch(this._settings.client_authentication){case"client_secret_basic":if(!s)throw n.throw(new Error("A client_secret is required")),null;a=M.generateBasicAuth(e,s);break;case"client_secret_post":o.append("client_id",e),s&&o.append("client_secret",s);break}const c=await this._metadataService.getTokenEndpoint(!1);n.debug("got token endpoint");const l=await this._jsonService.postForm(c,{body:o,basicAuth:a,timeoutInSeconds:i,initCredentials:this._settings.fetchRequestCredentials});return n.debug("got response"),l}async revoke(t){var e;const s=this._logger.create("revoke");t.token||s.throw(new Error("A token is required"));const i=await this._metadataService.getRevocationEndpoint(!1);s.debug(`got revocation endpoint, revoking ${(e=t.token_type_hint)!=null?e:"default token type"}`);const r=new URLSearchParams;for(const[n,o]of Object.entries(t))o!=null&&r.set(n,o);r.set("client_id",this._settings.client_id),this._settings.client_secret&&r.set("client_secret",this._settings.client_secret),await this._jsonService.postForm(i,{body:r}),s.debug("got response")}},Ts=class{constructor(t,e,s){this._settings=t,this._metadataService=e,this._claimsService=s,this._logger=new y("ResponseValidator"),this._userInfoService=new Rs(this._settings,this._metadataService),this._tokenClient=new ut(this._settings,this._metadataService)}async validateSigninResponse(t,e){const s=this._logger.create("validateSigninResponse");this._processSigninState(t,e),s.debug("state processed"),await this._processCode(t,e),s.debug("code processed"),t.isOpenId&&this._validateIdTokenAttributes(t),s.debug("tokens validated"),await this._processClaims(t,e?.skipUserInfo,t.isOpenId),s.debug("claims processed")}async validateCredentialsResponse(t,e){const s=this._logger.create("validateCredentialsResponse");t.isOpenId&&t.id_token&&this._validateIdTokenAttributes(t),s.debug("tokens validated"),await this._processClaims(t,e,t.isOpenId),s.debug("claims processed")}async validateRefreshResponse(t,e){var s,i;const r=this._logger.create("validateRefreshResponse");t.userState=e.data,(s=t.session_state)!=null||(t.session_state=e.session_state),(i=t.scope)!=null||(t.scope=e.scope),t.isOpenId&&t.id_token&&(this._validateIdTokenAttributes(t,e.id_token),r.debug("ID Token validated")),t.id_token||(t.id_token=e.id_token,t.profile=e.profile);const n=t.isOpenId&&!!t.id_token;await this._processClaims(t,!1,n),r.debug("claims processed")}validateSignoutResponse(t,e){const s=this._logger.create("validateSignoutResponse");if(e.id!==t.state&&s.throw(new Error("State does not match")),s.debug("state validated"),t.userState=e.data,t.error)throw s.warn("Response was error",t.error),new Y(t)}_processSigninState(t,e){var s;const i=this._logger.create("_processSigninState");if(e.id!==t.state&&i.throw(new Error("State does not match")),e.client_id||i.throw(new Error("No client_id on state")),e.authority||i.throw(new Error("No authority on state")),this._settings.authority!==e.authority&&i.throw(new Error("authority mismatch on settings vs. signin state")),this._settings.client_id&&this._settings.client_id!==e.client_id&&i.throw(new Error("client_id mismatch on settings vs. signin state")),i.debug("state validated"),t.userState=e.data,t.url_state=e.url_state,(s=t.scope)!=null||(t.scope=e.scope),t.error)throw i.warn("Response was error",t.error),new Y(t);e.code_verifier&&!t.code&&i.throw(new Error("Expected code in response"))}async _processClaims(t,e=!1,s=!0){const i=this._logger.create("_processClaims");if(t.profile=this._claimsService.filterProtocolClaims(t.profile),e||!this._settings.loadUserInfo||!t.access_token){i.debug("not loading user info");return}i.debug("loading user info");const r=await this._userInfoService.getClaims(t.access_token);i.debug("user info claims received from user info endpoint"),s&&r.sub!==t.profile.sub&&i.throw(new Error("subject from UserInfo response does not match subject in ID Token")),t.profile=this._claimsService.mergeClaims(t.profile,this._claimsService.filterProtocolClaims(r)),i.debug("user info claims received, updated profile:",t.profile)}async _processCode(t,e){const s=this._logger.create("_processCode");if(t.code){s.debug("Validating code");const i=await this._tokenClient.exchangeCode({client_id:e.client_id,client_secret:e.client_secret,code:t.code,redirect_uri:e.redirect_uri,code_verifier:e.code_verifier,...e.extraTokenParams});Object.assign(t,i)}else s.debug("No code to process")}_validateIdTokenAttributes(t,e){var s;const i=this._logger.create("_validateIdTokenAttributes");i.debug("decoding ID Token JWT");const r=Oe.decode((s=t.id_token)!=null?s:"");if(r.sub||i.throw(new Error("ID Token is missing a subject claim")),e){const n=Oe.decode(e);r.sub!==n.sub&&i.throw(new Error("sub in id_token does not match current sub")),r.auth_time&&r.auth_time!==n.auth_time&&i.throw(new Error("auth_time in id_token does not match original auth_time")),r.azp&&r.azp!==n.azp&&i.throw(new Error("azp in id_token does not match original azp")),!r.azp&&n.azp&&i.throw(new Error("azp not in id_token, but present in original id_token"))}t.profile=r}},oe=class{constructor(t){this.id=t.id||M.generateUUIDv4(),this.data=t.data,t.created&&t.created>0?this.created=t.created:this.created=L.getEpochTime(),this.request_type=t.request_type,this.url_state=t.url_state}toStorageString(){return new y("State").create("toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type,url_state:this.url_state})}static fromStorageString(t){return y.createStatic("State","fromStorageString"),new oe(JSON.parse(t))}static async clearStaleState(t,e){const s=y.createStatic("State","clearStaleState"),i=L.getEpochTime()-e,r=await t.getAllKeys();s.debug("got keys",r);for(let n=0;n<r.length;n++){const o=r[n],a=await t.get(o);let c=!1;if(a)try{const l=oe.fromStorageString(a);s.debug("got item from key:",o,l.created),l.created<=i&&(c=!0)}catch(l){s.error("Error parsing state for key:",o,l),c=!0}else s.debug("no item in storage for key:",o),c=!0;c&&(s.debug("removed item for key:",o),t.remove(o))}}},Be=class extends oe{constructor(t){super(t),t.code_verifier===!0?this.code_verifier=M.generateCodeVerifier():t.code_verifier&&(this.code_verifier=t.code_verifier),this.code_verifier&&(this.code_challenge=M.generateCodeChallenge(this.code_verifier)),this.authority=t.authority,this.client_id=t.client_id,this.redirect_uri=t.redirect_uri,this.scope=t.scope,this.client_secret=t.client_secret,this.extraTokenParams=t.extraTokenParams,this.response_mode=t.response_mode,this.skipUserInfo=t.skipUserInfo}toStorageString(){return new y("SigninState").create("toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type,url_state:this.url_state,code_verifier:this.code_verifier,authority:this.authority,client_id:this.client_id,redirect_uri:this.redirect_uri,scope:this.scope,client_secret:this.client_secret,extraTokenParams:this.extraTokenParams,response_mode:this.response_mode,skipUserInfo:this.skipUserInfo})}static fromStorageString(t){y.createStatic("SigninState","fromStorageString");const e=JSON.parse(t);return new Be(e)}},Is=class{constructor({url:t,authority:e,client_id:s,redirect_uri:i,response_type:r,scope:n,state_data:o,response_mode:a,request_type:c,client_secret:l,nonce:h,url_state:u,resource:m,skipUserInfo:w,extraQueryParams:E,extraTokenParams:p,disablePKCE:S,...k}){if(this._logger=new y("SigninRequest"),!t)throw this._logger.error("ctor: No url passed"),new Error("url");if(!s)throw this._logger.error("ctor: No client_id passed"),new Error("client_id");if(!i)throw this._logger.error("ctor: No redirect_uri passed"),new Error("redirect_uri");if(!r)throw this._logger.error("ctor: No response_type passed"),new Error("response_type");if(!n)throw this._logger.error("ctor: No scope passed"),new Error("scope");if(!e)throw this._logger.error("ctor: No authority passed"),new Error("authority");this.state=new Be({data:o,request_type:c,url_state:u,code_verifier:!S,client_id:s,authority:e,redirect_uri:i,response_mode:a,client_secret:l,scope:n,extraTokenParams:p,skipUserInfo:w});const d=new URL(t);d.searchParams.append("client_id",s),d.searchParams.append("redirect_uri",i),d.searchParams.append("response_type",r),d.searchParams.append("scope",n),h&&d.searchParams.append("nonce",h);let g=this.state.id;u&&(g=`${g}${He}${u}`),d.searchParams.append("state",g),this.state.code_challenge&&(d.searchParams.append("code_challenge",this.state.code_challenge),d.searchParams.append("code_challenge_method","S256")),m&&(Array.isArray(m)?m:[m]).forEach(v=>d.searchParams.append("resource",v));for(const[f,v]of Object.entries({response_mode:a,...k,...E}))v!=null&&d.searchParams.append(f,v.toString());this.url=d.href}},Ps="openid",Ie=class{constructor(t){if(this.access_token="",this.token_type="",this.profile={},this.state=t.get("state"),this.session_state=t.get("session_state"),this.state){const e=decodeURIComponent(this.state).split(He);this.state=e[0],e.length>1&&(this.url_state=e.slice(1).join(He))}this.error=t.get("error"),this.error_description=t.get("error_description"),this.error_uri=t.get("error_uri"),this.code=t.get("code")}get expires_in(){if(this.expires_at!==void 0)return this.expires_at-L.getEpochTime()}set expires_in(t){typeof t=="string"&&(t=Number(t)),t!==void 0&&t>=0&&(this.expires_at=Math.floor(t)+L.getEpochTime())}get isOpenId(){var t;return((t=this.scope)==null?void 0:t.split(" ").includes(Ps))||!!this.id_token}},Us=class{constructor({url:t,state_data:e,id_token_hint:s,post_logout_redirect_uri:i,extraQueryParams:r,request_type:n,client_id:o}){if(this._logger=new y("SignoutRequest"),!t)throw this._logger.error("ctor: No url passed"),new Error("url");const a=new URL(t);s&&a.searchParams.append("id_token_hint",s),o&&a.searchParams.append("client_id",o),i&&(a.searchParams.append("post_logout_redirect_uri",i),e&&(this.state=new oe({data:e,request_type:n}),a.searchParams.append("state",this.state.id)));for(const[c,l]of Object.entries({...r}))l!=null&&a.searchParams.append(c,l.toString());this.url=a.href}},As=class{constructor(t){this.state=t.get("state"),this.error=t.get("error"),this.error_description=t.get("error_description"),this.error_uri=t.get("error_uri")}},Ls=["nbf","jti","auth_time","nonce","acr","amr","azp","at_hash"],Os=["sub","iss","aud","exp","iat"],qs=class{constructor(t){this._settings=t,this._logger=new y("ClaimsService")}filterProtocolClaims(t){const e={...t};if(this._settings.filterProtocolClaims){let s;Array.isArray(this._settings.filterProtocolClaims)?s=this._settings.filterProtocolClaims:s=Ls;for(const i of s)Os.includes(i)||delete e[i]}return e}mergeClaims(t,e){const s={...t};for(const[i,r]of Object.entries(e))for(const n of Array.isArray(r)?r:[r]){const o=s[i];o===void 0?s[i]=n:Array.isArray(o)?o.includes(n)||o.push(n):s[i]!==n&&(typeof n=="object"&&this._settings.mergeClaims?s[i]=this.mergeClaims(o,n):s[i]=[o,n])}return s}},Hs=class{constructor(t,e){this._logger=new y("OidcClient"),this.settings=t instanceof Ne?t:new Ne(t),this.metadataService=e??new bs(this.settings),this._claimsService=new qs(this.settings),this._validator=new Ts(this.settings,this.metadataService,this._claimsService),this._tokenClient=new ut(this.settings,this.metadataService)}async createSigninRequest({state:t,request:e,request_uri:s,request_type:i,id_token_hint:r,login_hint:n,skipUserInfo:o,nonce:a,url_state:c,response_type:l=this.settings.response_type,scope:h=this.settings.scope,redirect_uri:u=this.settings.redirect_uri,prompt:m=this.settings.prompt,display:w=this.settings.display,max_age:E=this.settings.max_age,ui_locales:p=this.settings.ui_locales,acr_values:S=this.settings.acr_values,resource:k=this.settings.resource,response_mode:d=this.settings.response_mode,extraQueryParams:g=this.settings.extraQueryParams,extraTokenParams:f=this.settings.extraTokenParams}){const v=this._logger.create("createSigninRequest");if(l!=="code")throw new Error("Only the Authorization Code flow (with PKCE) is supported");const x=await this.metadataService.getAuthorizationEndpoint();v.debug("Received authorization endpoint",x);const _=new Is({url:x,authority:this.settings.authority,client_id:this.settings.client_id,redirect_uri:u,response_type:l,scope:h,state_data:t,url_state:c,prompt:m,display:w,max_age:E,ui_locales:p,id_token_hint:r,login_hint:n,acr_values:S,resource:k,request:e,request_uri:s,extraQueryParams:g,extraTokenParams:f,request_type:i,response_mode:d,client_secret:this.settings.client_secret,skipUserInfo:o,nonce:a,disablePKCE:this.settings.disablePKCE});await this.clearStaleState();const b=_.state;return await this.settings.stateStore.set(b.id,b.toStorageString()),_}async readSigninResponseState(t,e=!1){const s=this._logger.create("readSigninResponseState"),i=new Ie(qe.readParams(t,this.settings.response_mode));if(!i.state)throw s.throw(new Error("No state in response")),null;const r=await this.settings.stateStore[e?"remove":"get"](i.state);if(!r)throw s.throw(new Error("No matching state found in storage")),null;return{state:Be.fromStorageString(r),response:i}}async processSigninResponse(t){const e=this._logger.create("processSigninResponse"),{state:s,response:i}=await this.readSigninResponseState(t,!0);return e.debug("received state from storage; validating response"),await this._validator.validateSigninResponse(i,s),i}async processResourceOwnerPasswordCredentials({username:t,password:e,skipUserInfo:s=!1,extraTokenParams:i={}}){const r=await this._tokenClient.exchangeCredentials({username:t,password:e,...i}),n=new Ie(new URLSearchParams);return Object.assign(n,r),await this._validator.validateCredentialsResponse(n,s),n}async useRefreshToken({state:t,timeoutInSeconds:e}){var s;const i=this._logger.create("useRefreshToken");let r;if(this.settings.refreshTokenAllowedScope===void 0)r=t.scope;else{const a=this.settings.refreshTokenAllowedScope.split(" ");r=(((s=t.scope)==null?void 0:s.split(" "))||[]).filter(l=>a.includes(l)).join(" ")}const n=await this._tokenClient.exchangeRefreshToken({refresh_token:t.refresh_token,resource:t.resource,scope:r,timeoutInSeconds:e}),o=new Ie(new URLSearchParams);return Object.assign(o,n),i.debug("validating response",o),await this._validator.validateRefreshResponse(o,{...t,scope:r}),o}async createSignoutRequest({state:t,id_token_hint:e,client_id:s,request_type:i,post_logout_redirect_uri:r=this.settings.post_logout_redirect_uri,extraQueryParams:n=this.settings.extraQueryParams}={}){const o=this._logger.create("createSignoutRequest"),a=await this.metadataService.getEndSessionEndpoint();if(!a)throw o.throw(new Error("No end session endpoint")),null;o.debug("Received end session endpoint",a),!s&&r&&!e&&(s=this.settings.client_id);const c=new Us({url:a,id_token_hint:e,client_id:s,post_logout_redirect_uri:r,state_data:t,extraQueryParams:n,request_type:i});await this.clearStaleState();const l=c.state;return l&&(o.debug("Signout request has state to persist"),await this.settings.stateStore.set(l.id,l.toStorageString())),c}async readSignoutResponseState(t,e=!1){const s=this._logger.create("readSignoutResponseState"),i=new As(qe.readParams(t,this.settings.response_mode));if(!i.state){if(s.debug("No state in response"),i.error)throw s.warn("Response was error:",i.error),new Y(i);return{state:void 0,response:i}}const r=await this.settings.stateStore[e?"remove":"get"](i.state);if(!r)throw s.throw(new Error("No matching state found in storage")),null;return{state:oe.fromStorageString(r),response:i}}async processSignoutResponse(t){const e=this._logger.create("processSignoutResponse"),{state:s,response:i}=await this.readSignoutResponseState(t,!0);return s?(e.debug("Received state from storage; validating response"),this._validator.validateSignoutResponse(i,s)):e.debug("No state from storage; skipping response validation"),i}clearStaleState(){return this._logger.create("clearStaleState"),oe.clearStaleState(this.settings.stateStore,this.settings.staleStateAgeInSeconds)}async revokeToken(t,e){return this._logger.create("revokeToken"),await this._tokenClient.revoke({token:t,token_type_hint:e})}},Ns=class{constructor(t){this._userManager=t,this._logger=new y("SessionMonitor"),this._start=async e=>{const s=e.session_state;if(!s)return;const i=this._logger.create("_start");if(e.profile?(this._sub=e.profile.sub,this._sid=e.profile.sid,i.debug("session_state",s,", sub",this._sub)):(this._sub=void 0,this._sid=void 0,i.debug("session_state",s,", anonymous user")),this._checkSessionIFrame){this._checkSessionIFrame.start(s);return}try{const r=await this._userManager.metadataService.getCheckSessionIframe();if(r){i.debug("initializing check session iframe");const n=this._userManager.settings.client_id,o=this._userManager.settings.checkSessionIntervalInSeconds,a=this._userManager.settings.stopCheckSessionOnError,c=new vs(this._callback,n,r,o,a);await c.load(),this._checkSessionIFrame=c,c.start(s)}else i.warn("no check session iframe found in the metadata")}catch(r){i.error("Error from getCheckSessionIframe:",r instanceof Error?r.message:r)}},this._stop=()=>{const e=this._logger.create("_stop");if(this._sub=void 0,this._sid=void 0,this._checkSessionIFrame&&this._checkSessionIFrame.stop(),this._userManager.settings.monitorAnonymousSession){const s=setInterval(async()=>{clearInterval(s);try{const i=await this._userManager.querySessionStatus();if(i){const r={session_state:i.session_state,profile:i.sub&&i.sid?{sub:i.sub,sid:i.sid}:null};this._start(r)}}catch(i){e.error("error from querySessionStatus",i instanceof Error?i.message:i)}},1e3)}},this._callback=async()=>{const e=this._logger.create("_callback");try{const s=await this._userManager.querySessionStatus();let i=!0;s&&this._checkSessionIFrame?s.sub===this._sub?(i=!1,this._checkSessionIFrame.start(s.session_state),s.sid===this._sid?e.debug("same sub still logged in at OP, restarting check session iframe; session_state",s.session_state):(e.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state",s.session_state),this._userManager.events._raiseUserSessionChanged())):e.debug("different subject signed into OP",s.sub):e.debug("subject no longer signed into OP"),i?this._sub?this._userManager.events._raiseUserSignedOut():this._userManager.events._raiseUserSignedIn():e.debug("no change in session detected, no event to raise")}catch(s){this._sub&&(e.debug("Error calling queryCurrentSigninSession; raising signed out event",s),this._userManager.events._raiseUserSignedOut())}},t||this._logger.throw(new Error("No user manager passed")),this._userManager.events.addUserLoaded(this._start),this._userManager.events.addUserUnloaded(this._stop),this._init().catch(e=>{this._logger.error(e)})}async _init(){this._logger.create("_init");const t=await this._userManager.getUser();if(t)this._start(t);else if(this._userManager.settings.monitorAnonymousSession){const e=await this._userManager.querySessionStatus();if(e){const s={session_state:e.session_state,profile:e.sub&&e.sid?{sub:e.sub,sid:e.sid}:null};this._start(s)}}}},_e=class{constructor(t){var e;this.id_token=t.id_token,this.session_state=(e=t.session_state)!=null?e:null,this.access_token=t.access_token,this.refresh_token=t.refresh_token,this.token_type=t.token_type,this.scope=t.scope,this.profile=t.profile,this.expires_at=t.expires_at,this.state=t.userState,this.url_state=t.url_state}get expires_in(){if(this.expires_at!==void 0)return this.expires_at-L.getEpochTime()}set expires_in(t){t!==void 0&&(this.expires_at=Math.floor(t)+L.getEpochTime())}get expired(){const t=this.expires_in;if(t!==void 0)return t<=0}get scopes(){var t,e;return(e=(t=this.scope)==null?void 0:t.split(" "))!=null?e:[]}toStorageString(){return new y("User").create("toStorageString"),JSON.stringify({id_token:this.id_token,session_state:this.session_state,access_token:this.access_token,refresh_token:this.refresh_token,token_type:this.token_type,scope:this.scope,profile:this.profile,expires_at:this.expires_at})}static fromStorageString(t){return y.createStatic("User","fromStorageString"),new _e(JSON.parse(t))}},et="oidc-client",gt=class{constructor(){this._abort=new B("Window navigation aborted"),this._disposeHandlers=new Set,this._window=null}async navigate(t){const e=this._logger.create("navigate");if(!this._window)throw new Error("Attempted to navigate on a disposed window");e.debug("setting URL in window"),this._window.location.replace(t.url);const{url:s,keepOpen:i}=await new Promise((r,n)=>{const o=a=>{var c;const l=a.data,h=(c=t.scriptOrigin)!=null?c:window.location.origin;if(!(a.origin!==h||l?.source!==et)){try{const u=qe.readParams(l.url,t.response_mode).get("state");if(u||e.warn("no state found in response url"),a.source!==this._window&&u!==t.state)return}catch{this._dispose(),n(new Error("Invalid response from window"))}r(l)}};window.addEventListener("message",o,!1),this._disposeHandlers.add(()=>window.removeEventListener("message",o,!1)),this._disposeHandlers.add(this._abort.addHandler(a=>{this._dispose(),n(a)}))});return e.debug("got response from window"),this._dispose(),i||this.close(),{url:s}}_dispose(){this._logger.create("_dispose");for(const t of this._disposeHandlers)t();this._disposeHandlers.clear()}static _notifyParent(t,e,s=!1,i=window.location.origin){t.postMessage({source:et,url:e,keepOpen:s},i)}},pt={location:!1,toolbar:!1,height:640,closePopupWindowAfterInSeconds:-1},ft="_blank",Ms=60,js=2,mt=10,$s=class extends Ne{constructor(t){const{popup_redirect_uri:e=t.redirect_uri,popup_post_logout_redirect_uri:s=t.post_logout_redirect_uri,popupWindowFeatures:i=pt,popupWindowTarget:r=ft,redirectMethod:n="assign",redirectTarget:o="self",iframeNotifyParentOrigin:a=t.iframeNotifyParentOrigin,iframeScriptOrigin:c=t.iframeScriptOrigin,silent_redirect_uri:l=t.redirect_uri,silentRequestTimeoutInSeconds:h=mt,automaticSilentRenew:u=!0,validateSubOnSilentRenew:m=!0,includeIdTokenInSilentRenew:w=!1,monitorSession:E=!1,monitorAnonymousSession:p=!1,checkSessionIntervalInSeconds:S=js,query_status_response_type:k="code",stopCheckSessionOnError:d=!0,revokeTokenTypes:g=["access_token","refresh_token"],revokeTokensOnSignout:f=!1,includeIdTokenInSilentSignout:v=!1,accessTokenExpiringNotificationTimeInSeconds:x=Ms,userStore:_}=t;if(super(t),this.popup_redirect_uri=e,this.popup_post_logout_redirect_uri=s,this.popupWindowFeatures=i,this.popupWindowTarget=r,this.redirectMethod=n,this.redirectTarget=o,this.iframeNotifyParentOrigin=a,this.iframeScriptOrigin=c,this.silent_redirect_uri=l,this.silentRequestTimeoutInSeconds=h,this.automaticSilentRenew=u,this.validateSubOnSilentRenew=m,this.includeIdTokenInSilentRenew=w,this.monitorSession=E,this.monitorAnonymousSession=p,this.checkSessionIntervalInSeconds=S,this.stopCheckSessionOnError=d,this.query_status_response_type=k,this.revokeTokenTypes=g,this.revokeTokensOnSignout=f,this.includeIdTokenInSilentSignout=v,this.accessTokenExpiringNotificationTimeInSeconds=x,_)this.userStore=_;else{const b=typeof window<"u"?window.sessionStorage:new $e;this.userStore=new We({store:b})}}},Me=class extends gt{constructor({silentRequestTimeoutInSeconds:t=mt}){super(),this._logger=new y("IFrameWindow"),this._timeoutInSeconds=t,this._frame=Me.createHiddenIframe(),this._window=this._frame.contentWindow}static createHiddenIframe(){const t=window.document.createElement("iframe");return t.style.visibility="hidden",t.style.position="fixed",t.style.left="-1000px",t.style.top="0",t.width="0",t.height="0",window.document.body.appendChild(t),t}async navigate(t){this._logger.debug("navigate: Using timeout of:",this._timeoutInSeconds);const e=setTimeout(()=>this._abort.raise(new je("IFrame timed out without a response")),this._timeoutInSeconds*1e3);return this._disposeHandlers.add(()=>clearTimeout(e)),await super.navigate(t)}close(){var t;this._frame&&(this._frame.parentNode&&(this._frame.addEventListener("load",e=>{var s;const i=e.target;(s=i.parentNode)==null||s.removeChild(i),this._abort.raise(new Error("IFrame removed from DOM"))},!0),(t=this._frame.contentWindow)==null||t.location.replace("about:blank")),this._frame=null),this._window=null}static notifyParent(t,e){return super._notifyParent(window.parent,t,!1,e)}},Ds=class{constructor(t){this._settings=t,this._logger=new y("IFrameNavigator")}async prepare({silentRequestTimeoutInSeconds:t=this._settings.silentRequestTimeoutInSeconds}){return new Me({silentRequestTimeoutInSeconds:t})}async callback(t){this._logger.create("callback"),Me.notifyParent(t,this._settings.iframeNotifyParentOrigin)}},Ws=500,Bs=1e3,tt=class extends gt{constructor({popupWindowTarget:t=ft,popupWindowFeatures:e={}}){super(),this._logger=new y("PopupWindow");const s=Ze.center({...pt,...e});this._window=window.open(void 0,t,Ze.serialize(s)),e.closePopupWindowAfterInSeconds&&e.closePopupWindowAfterInSeconds>0&&setTimeout(()=>{if(!this._window||typeof this._window.closed!="boolean"||this._window.closed){this._abort.raise(new Error("Popup blocked by user"));return}this.close()},e.closePopupWindowAfterInSeconds*Bs)}async navigate(t){var e;(e=this._window)==null||e.focus();const s=setInterval(()=>{(!this._window||this._window.closed)&&this._abort.raise(new Error("Popup closed by user"))},Ws);return this._disposeHandlers.add(()=>clearInterval(s)),await super.navigate(t)}close(){this._window&&(this._window.closed||(this._window.close(),this._abort.raise(new Error("Popup closed")))),this._window=null}static notifyOpener(t,e){if(!window.opener)throw new Error("No window.opener. Can't complete notification.");return super._notifyParent(window.opener,t,e)}},Fs=class{constructor(t){this._settings=t,this._logger=new y("PopupNavigator")}async prepare({popupWindowFeatures:t=this._settings.popupWindowFeatures,popupWindowTarget:e=this._settings.popupWindowTarget}){return new tt({popupWindowFeatures:t,popupWindowTarget:e})}async callback(t,{keepOpen:e=!1}){this._logger.create("callback"),tt.notifyOpener(t,e)}},zs=class{constructor(t){this._settings=t,this._logger=new y("RedirectNavigator")}async prepare({redirectMethod:t=this._settings.redirectMethod,redirectTarget:e=this._settings.redirectTarget}){var s;this._logger.create("prepare");let i=window.self;e==="top"&&(i=(s=window.top)!=null?s:window.self);const r=i.location[t].bind(i.location);let n;return{navigate:async o=>{this._logger.create("navigate");const a=new Promise((c,l)=>{n=l});return r(o.url),await a},close:()=>{this._logger.create("close"),n?.(new Error("Redirect aborted")),i.stop()}}}async callback(){}},Js=class extends _s{constructor(t){super({expiringNotificationTimeInSeconds:t.accessTokenExpiringNotificationTimeInSeconds}),this._logger=new y("UserManagerEvents"),this._userLoaded=new B("User loaded"),this._userUnloaded=new B("User unloaded"),this._silentRenewError=new B("Silent renew error"),this._userSignedIn=new B("User signed in"),this._userSignedOut=new B("User signed out"),this._userSessionChanged=new B("User session changed")}load(t,e=!0){super.load(t),e&&this._userLoaded.raise(t)}unload(){super.unload(),this._userUnloaded.raise()}addUserLoaded(t){return this._userLoaded.addHandler(t)}removeUserLoaded(t){return this._userLoaded.removeHandler(t)}addUserUnloaded(t){return this._userUnloaded.addHandler(t)}removeUserUnloaded(t){return this._userUnloaded.removeHandler(t)}addSilentRenewError(t){return this._silentRenewError.addHandler(t)}removeSilentRenewError(t){return this._silentRenewError.removeHandler(t)}_raiseSilentRenewError(t){this._silentRenewError.raise(t)}addUserSignedIn(t){return this._userSignedIn.addHandler(t)}removeUserSignedIn(t){this._userSignedIn.removeHandler(t)}_raiseUserSignedIn(){this._userSignedIn.raise()}addUserSignedOut(t){return this._userSignedOut.addHandler(t)}removeUserSignedOut(t){this._userSignedOut.removeHandler(t)}_raiseUserSignedOut(){this._userSignedOut.raise()}addUserSessionChanged(t){return this._userSessionChanged.addHandler(t)}removeUserSessionChanged(t){this._userSessionChanged.removeHandler(t)}_raiseUserSessionChanged(){this._userSessionChanged.raise()}},Gs=class{constructor(t){this._userManager=t,this._logger=new y("SilentRenewService"),this._isStarted=!1,this._retryTimer=new L("Retry Silent Renew"),this._tokenExpiring=async()=>{const e=this._logger.create("_tokenExpiring");try{await this._userManager.signinSilent(),e.debug("silent token renewal successful")}catch(s){if(s instanceof je){e.warn("ErrorTimeout from signinSilent:",s,"retry in 5s"),this._retryTimer.init(5);return}e.error("Error from signinSilent:",s),this._userManager.events._raiseSilentRenewError(s)}}}async start(){const t=this._logger.create("start");if(!this._isStarted){this._isStarted=!0,this._userManager.events.addAccessTokenExpiring(this._tokenExpiring),this._retryTimer.addHandler(this._tokenExpiring);try{await this._userManager.getUser()}catch(e){t.error("getUser error",e)}}}stop(){this._isStarted&&(this._retryTimer.cancel(),this._retryTimer.removeHandler(this._tokenExpiring),this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring),this._isStarted=!1)}},Ks=class{constructor(t,e){this.refresh_token=t.refresh_token,this.id_token=t.id_token,this.session_state=t.session_state,this.scope=t.scope,this.profile=t.profile,this.resource=e,this.data=t.state}},Vs=class{constructor(t,e,s,i){this._logger=new y("UserManager"),this.settings=new $s(t),this._client=new Hs(t),this._redirectNavigator=e??new zs(this.settings),this._popupNavigator=s??new Fs(this.settings),this._iframeNavigator=i??new Ds(this.settings),this._events=new Js(this.settings),this._silentRenewService=new Gs(this),this.settings.automaticSilentRenew&&this.startSilentRenew(),this._sessionMonitor=null,this.settings.monitorSession&&(this._sessionMonitor=new Ns(this))}get events(){return this._events}get metadataService(){return this._client.metadataService}async getUser(){const t=this._logger.create("getUser"),e=await this._loadUser();return e?(t.info("user loaded"),this._events.load(e,!1),e):(t.info("user not found in storage"),null)}async removeUser(){const t=this._logger.create("removeUser");await this.storeUser(null),t.info("user removed from storage"),this._events.unload()}async signinRedirect(t={}){this._logger.create("signinRedirect");const{redirectMethod:e,...s}=t,i=await this._redirectNavigator.prepare({redirectMethod:e});await this._signinStart({request_type:"si:r",...s},i)}async signinRedirectCallback(t=window.location.href){const e=this._logger.create("signinRedirectCallback"),s=await this._signinEnd(t);return s.profile&&s.profile.sub?e.info("success, signed in subject",s.profile.sub):e.info("no subject"),s}async signinResourceOwnerCredentials({username:t,password:e,skipUserInfo:s=!1}){const i=this._logger.create("signinResourceOwnerCredential"),r=await this._client.processResourceOwnerPasswordCredentials({username:t,password:e,skipUserInfo:s,extraTokenParams:this.settings.extraTokenParams});i.debug("got signin response");const n=await this._buildUser(r);return n.profile&&n.profile.sub?i.info("success, signed in subject",n.profile.sub):i.info("no subject"),n}async signinPopup(t={}){const e=this._logger.create("signinPopup"),{popupWindowFeatures:s,popupWindowTarget:i,...r}=t,n=this.settings.popup_redirect_uri;n||e.throw(new Error("No popup_redirect_uri configured"));const o=await this._popupNavigator.prepare({popupWindowFeatures:s,popupWindowTarget:i}),a=await this._signin({request_type:"si:p",redirect_uri:n,display:"popup",...r},o);return a&&(a.profile&&a.profile.sub?e.info("success, signed in subject",a.profile.sub):e.info("no subject")),a}async signinPopupCallback(t=window.location.href,e=!1){const s=this._logger.create("signinPopupCallback");await this._popupNavigator.callback(t,{keepOpen:e}),s.info("success")}async signinSilent(t={}){var e;const s=this._logger.create("signinSilent"),{silentRequestTimeoutInSeconds:i,resource:r,...n}=t;let o=await this._loadUser();if(o?.refresh_token){s.debug("using refresh token");const h=new Ks(o,r);return await this._useRefreshToken(h)}const a=this.settings.silent_redirect_uri;a||s.throw(new Error("No silent_redirect_uri configured"));let c;o&&this.settings.validateSubOnSilentRenew&&(s.debug("subject prior to silent renew:",o.profile.sub),c=o.profile.sub);const l=await this._iframeNavigator.prepare({silentRequestTimeoutInSeconds:i});return o=await this._signin({request_type:"si:s",redirect_uri:a,prompt:"none",id_token_hint:this.settings.includeIdTokenInSilentRenew?o?.id_token:void 0,...n},l,c),o&&((e=o.profile)!=null&&e.sub?s.info("success, signed in subject",o.profile.sub):s.info("no subject")),o}async _useRefreshToken(t){const e=await this._client.useRefreshToken({state:t,timeoutInSeconds:this.settings.silentRequestTimeoutInSeconds}),s=new _e({...t,...e});return await this.storeUser(s),this._events.load(s),s}async signinSilentCallback(t=window.location.href){const e=this._logger.create("signinSilentCallback");await this._iframeNavigator.callback(t),e.info("success")}async signinCallback(t=window.location.href){const{state:e}=await this._client.readSigninResponseState(t);switch(e.request_type){case"si:r":return await this.signinRedirectCallback(t);case"si:p":return await this.signinPopupCallback(t);case"si:s":return await this.signinSilentCallback(t);default:throw new Error("invalid response_type in state")}}async signoutCallback(t=window.location.href,e=!1){const{state:s}=await this._client.readSignoutResponseState(t);if(s)switch(s.request_type){case"so:r":await this.signoutRedirectCallback(t);break;case"so:p":await this.signoutPopupCallback(t,e);break;case"so:s":await this.signoutSilentCallback(t);break;default:throw new Error("invalid response_type in state")}}async querySessionStatus(t={}){const e=this._logger.create("querySessionStatus"),{silentRequestTimeoutInSeconds:s,...i}=t,r=this.settings.silent_redirect_uri;r||e.throw(new Error("No silent_redirect_uri configured"));const n=await this._loadUser(),o=await this._iframeNavigator.prepare({silentRequestTimeoutInSeconds:s}),a=await this._signinStart({request_type:"si:s",redirect_uri:r,prompt:"none",id_token_hint:this.settings.includeIdTokenInSilentRenew?n?.id_token:void 0,response_type:this.settings.query_status_response_type,scope:"openid",skipUserInfo:!0,...i},o);try{const c=await this._client.processSigninResponse(a.url);return e.debug("got signin response"),c.session_state&&c.profile.sub?(e.info("success for subject",c.profile.sub),{session_state:c.session_state,sub:c.profile.sub,sid:c.profile.sid}):(e.info("success, user not authenticated"),null)}catch(c){if(this.settings.monitorAnonymousSession&&c instanceof Y)switch(c.error){case"login_required":case"consent_required":case"interaction_required":case"account_selection_required":return e.info("success for anonymous user"),{session_state:c.session_state}}throw c}}async _signin(t,e,s){const i=await this._signinStart(t,e);return await this._signinEnd(i.url,s)}async _signinStart(t,e){const s=this._logger.create("_signinStart");try{const i=await this._client.createSigninRequest(t);return s.debug("got signin request"),await e.navigate({url:i.url,state:i.state.id,response_mode:i.state.response_mode,scriptOrigin:this.settings.iframeScriptOrigin})}catch(i){throw s.debug("error after preparing navigator, closing navigator window"),e.close(),i}}async _signinEnd(t,e){const s=this._logger.create("_signinEnd"),i=await this._client.processSigninResponse(t);return s.debug("got signin response"),await this._buildUser(i,e)}async _buildUser(t,e){const s=this._logger.create("_buildUser"),i=new _e(t);if(e){if(e!==i.profile.sub)throw s.debug("current user does not match user returned from signin. sub from signin:",i.profile.sub),new Y({...t,error:"login_required"});s.debug("current user matches user returned from signin")}return await this.storeUser(i),s.debug("user stored"),this._events.load(i),i}async signoutRedirect(t={}){const e=this._logger.create("signoutRedirect"),{redirectMethod:s,...i}=t,r=await this._redirectNavigator.prepare({redirectMethod:s});await this._signoutStart({request_type:"so:r",post_logout_redirect_uri:this.settings.post_logout_redirect_uri,...i},r),e.info("success")}async signoutRedirectCallback(t=window.location.href){const e=this._logger.create("signoutRedirectCallback"),s=await this._signoutEnd(t);return e.info("success"),s}async signoutPopup(t={}){const e=this._logger.create("signoutPopup"),{popupWindowFeatures:s,popupWindowTarget:i,...r}=t,n=this.settings.popup_post_logout_redirect_uri,o=await this._popupNavigator.prepare({popupWindowFeatures:s,popupWindowTarget:i});await this._signout({request_type:"so:p",post_logout_redirect_uri:n,state:n==null?void 0:{},...r},o),e.info("success")}async signoutPopupCallback(t=window.location.href,e=!1){const s=this._logger.create("signoutPopupCallback");await this._popupNavigator.callback(t,{keepOpen:e}),s.info("success")}async _signout(t,e){const s=await this._signoutStart(t,e);return await this._signoutEnd(s.url)}async _signoutStart(t={},e){var s;const i=this._logger.create("_signoutStart");try{const r=await this._loadUser();i.debug("loaded current user from storage"),this.settings.revokeTokensOnSignout&&await this._revokeInternal(r);const n=t.id_token_hint||r&&r.id_token;n&&(i.debug("setting id_token_hint in signout request"),t.id_token_hint=n),await this.removeUser(),i.debug("user removed, creating signout request");const o=await this._client.createSignoutRequest(t);return i.debug("got signout request"),await e.navigate({url:o.url,state:(s=o.state)==null?void 0:s.id,scriptOrigin:this.settings.iframeScriptOrigin})}catch(r){throw i.debug("error after preparing navigator, closing navigator window"),e.close(),r}}async _signoutEnd(t){const e=this._logger.create("_signoutEnd"),s=await this._client.processSignoutResponse(t);return e.debug("got signout response"),s}async signoutSilent(t={}){var e;const s=this._logger.create("signoutSilent"),{silentRequestTimeoutInSeconds:i,...r}=t,n=this.settings.includeIdTokenInSilentSignout?(e=await this._loadUser())==null?void 0:e.id_token:void 0,o=this.settings.popup_post_logout_redirect_uri,a=await this._iframeNavigator.prepare({silentRequestTimeoutInSeconds:i});await this._signout({request_type:"so:s",post_logout_redirect_uri:o,id_token_hint:n,...r},a),s.info("success")}async signoutSilentCallback(t=window.location.href){const e=this._logger.create("signoutSilentCallback");await this._iframeNavigator.callback(t),e.info("success")}async revokeTokens(t){const e=await this._loadUser();await this._revokeInternal(e,t)}async _revokeInternal(t,e=this.settings.revokeTokenTypes){const s=this._logger.create("_revokeInternal");if(!t)return;const i=e.filter(r=>typeof t[r]=="string");if(!i.length){s.debug("no need to revoke due to no token(s)");return}for(const r of i)await this._client.revokeToken(t[r],r),s.info(`${r} revoked successfully`),r!=="access_token"&&(t[r]=null);await this.storeUser(t),s.debug("user stored"),this._events.load(t)}startSilentRenew(){this._logger.create("startSilentRenew"),this._silentRenewService.start()}stopSilentRenew(){this._silentRenewService.stop()}get _userStoreKey(){return`user:${this.settings.authority}:${this.settings.client_id}`}async _loadUser(){const t=this._logger.create("_loadUser"),e=await this.settings.userStore.get(this._userStoreKey);return e?(t.debug("user storageString loaded"),_e.fromStorageString(e)):(t.debug("no user storageString"),null)}async storeUser(t){const e=this._logger.create("storeUser");if(t){e.debug("storing user");const s=t.toStorageString();await this.settings.userStore.set(this._userStoreKey,s)}else this._logger.debug("removing user"),await this.settings.userStore.remove(this._userStoreKey)}async clearStaleState(){await this._client.clearStaleState()}};const se=()=>window.localStorage,V=()=>window.Capacitor?.Plugins.Storage,X=()=>window.Capacitor?.Plugins.Preferences,W=()=>window.Capacitor?.Plugins.SecureStoragePlugin;class Xs{#e=new R("MobileStorage");constructor(){if(!W()){let e=`[@badisi/auth-js] This application is currently using an unsafe storage.

`;e+="ⓘ Please follow the recommended guide and use `capacitor-secure-storage-plugin` instead.",this.#e.notif(e)}W()?this.#e.debug("Using `capacitor-secure-storage-plugin` implementation"):X()?this.#e.debug("Using `@capacitor/preferences` implementation"):V()?this.#e.debug("Using `@capacitor/storage` implementation"):this.#e.debug("Using `localStorage` implementation")}get length(){return(async()=>{const e=W();if(e)return(await e.keys()).value.length;const s=X();if(s)return(await s.keys()).keys.length;const i=V();return i?(await i.keys()).keys.length:se().length})()}async key(e){const s=W();if(s)return(await s.keys()).value[e];const i=X();if(i)return(await i.keys()).keys[e];const r=V();return r?(await r.keys()).keys[e]:se().key(e)}async clear(){this.#e.debug("clear");const e=W();if(e){await e.clear();return}const s=X();if(s){await s.clear();return}const i=V();if(i){await i.clear();return}se().clear()}async getItem(e){this.#e.debug(`getItem('${e}')`);const s=W();if(s)try{return(await s.get({key:e})).value}catch{return null}const i=X();if(i)return(await i.get({key:e})).value;const r=V();return r?(await r.get({key:e})).value:se().getItem(e)}async setItem(e,s){this.#e.debug(`setItem('${e}')`);const i=W();if(i){await i.set({key:e,value:s});return}const r=X();if(r){await r.set({key:e,value:s});return}const n=V();if(n){await n.set({key:e,value:s});return}se().setItem(e,s)}async removeItem(e){this.#e.debug(`removeItem('${e}')`);const s=W();if(s){try{await s.remove({key:e})}catch{}return}const i=X();if(i){await i.remove({key:e});return}const r=V();if(r){await r.remove({key:e});return}se().removeItem(e)}}class Qs{#e=new R("OIDCAuthGuard");#t;constructor(e){this.#t=e}async validate(e,s){let i=s?.fallbackUrl??this.#t.getSettings().authGuardFallbackUrl;if(i=i?.trim()!==""?i:void 0,await this.#t.isAuthenticated()){const n=await this.#i(s?.validator);return!n&&i?i:n}else return i??await this.#t.login({redirectUrl:e})}async#i(e){if(typeof e=="function"){const s=await this.#t.getUserProfile(),i=await this.#t.getAccessTokenDecoded();return await Promise.resolve(e(s,i))}else if(e)return this.#e.error("`authGuardValidator` must be a function"),!1;return!0}}class Ys{#e=new R("OIDCAuthInterceptor");#t;#i;#o=window.fetch;#n=XMLHttpRequest.prototype.open;#d=XMLHttpRequest.prototype.send;constructor(e,s){this.#e.debug("init"),this.#t=e,this.#i=s,this.#p(),this.#g()}#h(e){try{return new URL(e).href}catch{return new URL(`${location.origin}${e.startsWith("/")?"":"/"}${e}`).href}}#a(e,s){const i=this.#h(e);if(typeof s=="function")return s(i);if(typeof s=="string"){const r=s.replace(/\//g,"\\/").replace(/\./g,"\\.").replace(/\*\*/g,"*").replace(/\*/g,".*");return new RegExp(r).exec(i)!==null}else return s.exec(i)!==null}#u(e,s){let i=typeof s=="boolean"?s:!1;if(i){const r=this.#i.metadataService._metadata;if(!r&&e.includes(this.#t.getSettings().authorityUrl))this.#e.debug("matching authority domain but no metadata available yet"),i=!1;else if(r&&this.#t.isRenewing())this.#e.debug("matching authority domain but no token available yet"),i=!1;else if(r){const n=[r.authorization_endpoint,r.token_endpoint].find(o=>o&&e.includes(o));n&&(this.#e.debug("matching blacklisted authority url:",n),i=!1)}}if(typeof s=="object"){const{include:r,exclude:n}=s;if(Array.isArray(r)){const o=r.find(a=>this.#a(e,a));o&&(this.#e.debug("matching include pattern:",o),i=!0)}else r&&(i=this.#a(e,r),i&&this.#e.debug("matching include pattern:",r));if(Array.isArray(n)){const o=n.some(a=>this.#a(e,a));o&&(this.#e.debug("matching exclude pattern:",o),i=!1)}else n&&this.#a(e,n)&&(this.#e.debug("matching exclude pattern:",n),i=!1)}return i}#c(e){const s=this.#t.getSettings().automaticInjectToken??!1;return s!==!1&&this.#u(e,s)}#l(){const e=this.#t.getSettings().automaticInjectToken;return typeof e!="boolean"&&e?.headerName?e.headerName:"Authorization"}#p(e=!0){const s=this.#e.createChild("monkeyPathFetch");s.debug(e?"enabling..":"disabling.."),window.fetch&&(e?window.fetch=async(i,r)=>{const n=i instanceof Request?i.url:i.toString();if(this.#e.debug("received FETCH url:",n),this.#c(n)){const a=await this.#t.getAccessToken();if(r&&a){const c=this.#l();this.#e.debug(`adding "${c}" bearer to header request`),Array.isArray(r.headers)?r.headers.push([c,`Bearer ${a}`]):r.headers instanceof Headers?r.headers.append(c,`Bearer ${a}`):r.headers={...r.headers,[c]:`Bearer ${a}`}}}const o=await this.#o.apply(window,[i,r]);return o.status===401&&(this.#t.getSettings().automaticLoginOn401??!1)&&(await this.#t.isAuthenticated()||await this.#t.login()),o}:window.fetch=this.#o,s.debug("done"))}#g(e=!0){const s=this.#e.createChild("monkeyPatchXmlHttpRequest");if(s.debug(e?"enabling..":"disabling.."),XMLHttpRequest.prototype.open&&XMLHttpRequest.prototype.send){if(e){const i=this;XMLHttpRequest.prototype.open=function(r,n,...o){this.url=n,i.#n.apply(this,[r,n,...o])},XMLHttpRequest.prototype.send=function(r){const n=typeof this.url=="string"?this.url:this.url?.href;i.#e.debug("received XHR url:",n);const o=this.onreadystatechange;this.onreadystatechange=c=>{o?.apply(this,[c]),this.readyState===XMLHttpRequest.DONE&&this.status===401&&(i.#t.getSettings().automaticLoginOn401??!1)&&i.#t.isAuthenticated().then(h=>{h||i.#t.login()})};const a=n?i.#c(n):!1;this.readyState===XMLHttpRequest.OPENED&&a?i.#t.getAccessToken().then(c=>{if(c){const l=i.#l();i.#e.debug(`adding "${l}" bearer to header request`),this.setRequestHeader(l,`Bearer ${c}`)}}).catch(c=>{i.#e.error(c)}).finally(()=>{i.#d.apply(this,[r])}):i.#d.apply(this,[r])}}else XMLHttpRequest.prototype.open=this.#n,XMLHttpRequest.prototype.send=this.#d;s.debug("done")}}}const Zs=10*1e3,ei=()=>window.Capacitor?.Plugins.App,ie=()=>window.Capacitor?.Plugins.Browser;class ti{constructor(e,s){if(this.redirectUrl=e,this.params=s,!Ae()&&!Ue())throw this.#e.notif("ⓘ Please follow the installation guide and install either `Capacitor` or `Cordova` dependency."),this.#e.getError("Required core dependency `Capacitor` or `Cordova` not found");if(!ie())throw this.#e.notif("ⓘ Please follow the installation guide and install `@capacitor/browser` plugin."),this.#e.getError("Required browser plugin not found");ie()&&this.#e.debug("Using `@capacitor/browser` implementation")}redirectUrl;params;#e=new R("MobileWindow");#t=this.#e.createChild("navigate");#i;#o;#n=window.handleOpenURL;#d;#h;#a;#u=!0;#c=!1;async navigate(e){return this.#t.debug(e.url),this.#u=!1,this.#c=!1,new Promise((s,i)=>{this.#h=s,this.#a=i,this.#r().then(()=>{ie()&&this.#m(e)})})}async close(){const e=this.#e.createChild("cleanup");e.debug("begin"),this.#u||await ie()?.close().catch(s=>{e.error(s)}),e.debug("success")}async#l(){const e=this.#e.createChild("cleanup");e.debug("begin"),window.handleOpenURL=this.#n,await this.#o?.remove(),await this.#i?.remove(),clearTimeout(this.#d),e.debug("success")}async#p(e){this.#t.error("error response:",e),await this.close(),await this.#l(),this.#a?.(new Error(e)),this.#c=!0}async#g(e){this.#t.debug("successful response:",e),await this.close(),await this.#l(),this.#h?.({url:e}),this.#c=!0}async#m(e){this.#o=await ie()?.addListener("browserFinished",()=>{this.#u=!0,window.setTimeout(()=>{this.#c||(this.#l(),this.#a?.("Capacitor browser closed by user"))},1e3)}),await ie()?.open({url:e.url,toolbarColor:this.params.mobileWindowToolbarColor,presentationStyle:this.params.mobileWindowPresentationStyle,width:this.params.mobileWindowWidth,height:this.params.mobileWindowWidth})}async#w(e){}async#r(){const e=this.#e.createChild("installCustomUrlSchemeHandler");this.#d=window.setTimeout(()=>{this.#p("Installing custom url scheme handler, timed out without a response")},Zs),await this.#l(),Ae()?(e.debug("listening to Capacitor `appUrlOpen` event"),this.#i=await ei()?.addListener("appUrlOpen",({url:s})=>{de(s,this.redirectUrl)&&this.#g(s)})):Ue()&&(e.debug("waiting for Cordova `handleOpenURL` callback"),window.handleOpenURL=s=>{this.#n?.(s),de(s,this.redirectUrl)&&this.#g(s)}),e.debug("success")}}class si{#e=new R("MobileNavigator");prepare(e,s){return this.#e.debug("prepare"),new ti(e,s)}}class ii extends Vs{constructor(e){super({authority:e.authorityUrl,client_id:e.clientId,scope:e.scope,loadUserInfo:e.loadUserInfo,automaticSilentRenew:e.automaticSilentRenew,...e.internal}),this.libSettings=e,this.#e=new si}libSettings;#e;async signoutMobile(e={}){const s=this._logger.create("signout"),{mobileWindowToolbarColor:i,mobileWindowPresentationStyle:r,mobileWindowWidth:n,mobileWindowHeight:o,...a}=e,c={mobileWindowToolbarColor:i??this.libSettings.internal?.mobileWindowToolbarColor,mobileWindowPresentationStyle:r??this.libSettings.internal?.mobileWindowPresentationStyle,mobileWindowWidth:n??this.libSettings.internal?.mobileWindowWidth,mobileWindowHeight:o??this.libSettings.internal?.mobileWindowHeight},l=this.#e.prepare(this.settings.post_logout_redirect_uri,c);await this._signout({request_type:"so:m",post_logout_redirect_uri:this.settings.post_logout_redirect_uri,...a},l),s.info("success")}async signinMobile(e={}){const s=this._logger.create("signin"),{mobileWindowToolbarColor:i,mobileWindowPresentationStyle:r,mobileWindowWidth:n,mobileWindowHeight:o,...a}=e,c={mobileWindowToolbarColor:i??this.libSettings.internal?.mobileWindowToolbarColor,mobileWindowPresentationStyle:r??this.libSettings.internal?.mobileWindowPresentationStyle,mobileWindowWidth:n??this.libSettings.internal?.mobileWindowWidth,mobileWindowHeight:o??this.libSettings.internal?.mobileWindowHeight},l=this.#e.prepare(this.settings.redirect_uri,c),h=await this._signin({request_type:"si:m",redirect_uri:this.settings.redirect_uri,...a},l);h.profile.sub?s.info("success, signed in subject",h.profile.sub):s.info("no subject")}}class ri extends _t{#e=new R("OIDCAuthManager");#t=new K;#i=new K;#o=new K;#n=new K;#d=new K;#h=new K;#a=new K;#u=[];#c;#l;#p;#g;#m=!1;#w=!1;#r;#s=j;#y;set user(e){this.#y!==e&&(this.#y=e,this.#c=e?e.id_token:void 0,this.#l=e?e.access_token:void 0,this.#p=e?.profile??void 0,this.#g=e?{expired:e.expired,expires_in:e.expires_in,expires_at:e.expires_at,token_type:e.token_type,scope:e.scope,scopes:e.scopes,session_state:e.session_state}:void 0,this.#m=!!(e&&!e.expired),this.#t.notify(this.#c),this.#i.notify(this.#l),this.#o.notify(this.#p),this.#n.notify(this.#g),this.#d.notify(this.#m))}async init(e){const s=e.logLevel??j.logLevel;ne.setLogger(console),ne.setLevel(s),R.setLogLevel(s);const i=Ce();if(i&&!e.mobileScheme)throw this.#e.getError("Parameter `mobileScheme` is required for mobile platform");const r=i?`${e.mobileScheme}://localhost/`:it();if(this.#s=Le({},j,{internal:{userStore:new We({store:i?new Xs:new $e}),redirect_uri:`${r}${j.internal.redirect_uri}`,post_logout_redirect_uri:`${r}${j.internal.post_logout_redirect_uri}`,popup_redirect_uri:`${r}${j.internal.popup_redirect_uri}`,popup_post_logout_redirect_uri:`${r}${j.internal.popup_post_logout_redirect_uri}`,silent_redirect_uri:`${r}${j.internal.silent_redirect_uri}`}},e),this.#C(),this.#r=new ii(this.#s),(this.#s.automaticLoginOn401||this.#s.automaticInjectToken)&&new Ys(this,this.#r),this.#u.push(this.#r.events.addUserLoaded(n=>{this.user=n}),this.#r.events.addUserUnloaded(()=>{this.#y&&(this.user=null,this.#s.loginRequired&&location.reload())}),this.#r.events.addSilentRenewError(async()=>{await this.#b()})),de(location.href,this.#s.internal?.redirect_uri))await this.#S(async()=>{const n=sessionStorage.getItem(te);await this.#E(()=>this.#r.signinRedirectCallback(location.href),n),sessionStorage.removeItem(te)});else if(de(location.href,this.#s.internal?.post_logout_redirect_uri))await this.#S(async()=>{const n=sessionStorage.getItem(te);await this.#x(()=>this.#r.signoutRedirectCallback(location.href),n),sessionStorage.removeItem(te)});else if(this.#s.retrieveUserSession||this.#s.loginRequired){const n=await this.#r.getUser();!n||n.expired?!i&&this.#s.retrieveUserSession?await this.#S(()=>this.#k().catch(async o=>{const{error:a,message:c}=o;if(this.#s.loginRequired&&(a?.includes("_required")||c.includes("_required")))await this.login();else if(this.#e.warn("User's session cannot be retrieved:",c),this.#d.notify(!1),this.#s.loginRequired)throw o})):this.#s.loginRequired?await this.login():this.user=null:this.user=n}else this.user=null}async logout(e){const s=e?.redirectUrl??location.href;if(Ce())await this.#x(()=>this.#r.signoutMobile(e),s);else switch(e?.desktopNavigationType??this.#s.desktopNavigationType){case F.POPUP:await this.#x(()=>this.#r.signoutPopup(e),s);break;case F.REDIRECT:default:sessionStorage.setItem(te,s),await this.#r?.signoutRedirect(e);break}}async login(e){const s=e?.redirectUrl??location.href;if(Ce())await this.#E(()=>this.#r.signinMobile(e),s);else switch(e?.desktopNavigationType??this.#s.desktopNavigationType){case F.POPUP:await this.#E(()=>this.#r.signinPopup(e),s);break;case F.REDIRECT:default:sessionStorage.setItem(te,s),await this.#r?.signinRedirect(e);break}return this.#m}async renew(e){return this.#k(e).catch(s=>{this.#e.error(s)})}getSettings(){return this.#s}isRenewing(){return this.#w}async isAuthenticated(){return await this.#f("isAuthenticated()"),this.#m}async runGuard(e,s){return new Qs(this).validate(e,s)}async getUserProfile(){return await this.#f("getUserProfile()"),this.#p}async getUserSession(){return await this.#f("getUserSession()"),this.#g}async getIdToken(){return await this.#f("getIdToken()"),this.#c}async getIdTokenDecoded(){return await this.#f("getIdTokenDecoded()"),be(this.#c)}async getAccessToken(){return await this.#f("getAccessToken()"),this.#l}async getAccessTokenDecoded(){return await this.#f("getAccessTokenDecoded()"),be(this.#l)}destroy(){this.#t.unsubscribe(),this.#i.unsubscribe(),this.#o.unsubscribe(),this.#n.unsubscribe(),this.#d.unsubscribe(),this.#h.unsubscribe(),this.#a.unsubscribe(),this.#u.forEach(e=>{e()})}onIdTokenChanged(e,s){return this.#t.add(e,s)}onAccessTokenChanged(e,s){return this.#i.add(e,s)}onUserProfileChanged(e,s){return this.#o.add(e,s)}onUserSessionChanged(e,s){return this.#n.add(e,s)}onAuthenticatedChanged(e,s){return this.#d.add(e,s)}onRenewingChanged(e,s){return this.#h.add(e,s)}onRedirect(e,s){return this.#a.add(e,s)}#C(){[this.#s.internal?.silent_redirect_uri,this.#s.internal?.popup_redirect_uri].forEach(e=>{const s=new RegExp(/^.*\/(.*).html$/gm).exec(e??"")?.[1],i=new Error(`${e??"redirect uri"} was not found.`);if(i.stack=void 0,de(location.href,e))throw this.#e.notif("ⓘ Encountered an error that usually means you forgot to include the redirect html files in your application assets."),i;if(s&&location.href.includes(`/${s}.html`))throw this.#e.notif("ⓘ Encountered an error that usually means your redirect urls are misconfigured."),i})}async#f(e){const s=Date.now();for(;this.#w;){if(Date.now()>s+5e3){this.#e.error(`\`${e}\``,"timed out waiting for renew to finish.");break}await new Promise(i=>window.setTimeout(i,100))}}#R(e){const s=ze(e??"/");this.#s.loginRequired&&location.origin===s.origin&&location.reload()}#_(e){this.#w=e,this.#h.notify(e)}async#S(e){this.#s.loginRequired?await e():e()}async#v(e,s){s&&(this.#e.error(s),await this.#b());const i=ze(e??"/");location.origin===i.origin?(history.replaceState(history.state,"",i.href),this.#a.notify(i)):location.href=i.href}async#b(){this.user=null,await Promise.all([this.#r?.clearStaleState(),this.#r?.removeUser()])}async#k(e){this.#_(!0);try{await this.#r?.signinSilent(e)}catch(s){throw await this.#b(),s}finally{this.#_(!1)}}async#E(e,s){try{this.#_(!0),await e().catch(i=>{const r=i;throw r.message==="Attempted to navigate on a disposed window"&&(this.#e.notif("ⓘ Encountered an error that may be due to an ad blocker."),r.stack=void 0),r}),await this.#v(s)}catch(i){throw await this.#v("/",i),i}finally{this.#_(!1)}}async#x(e,s){try{await e().catch(i=>{const r=i;throw r.message==="Attempted to navigate on a disposed window"&&(this.#e.notif("ⓘ Encountered an error that may be due to an ad blocker."),r.stack=void 0),r}),await this.#v(s),await this.#b()}catch(i){throw s="/",await this.#v(s,i),i}finally{this.#R(s)}}}const ni=async(t,e="@badisi/auth-js")=>(R.setLibName(e),await St(t,ri)),oi=[{name:"authorityUrl",label:"Authority url",type:"string",required:!0},{name:"clientId",label:"Client id",type:"string",required:!0},{name:"mobileScheme",label:"Custom mobile scheme name",type:"string"},{name:"scope",label:"Scope",type:"string",placeholder:"ex: openid profile email phone offline_access"},{name:"internal.extraQueryParams",label:"Extra query params",type:"json",placeholder:'ex: {"audience":"value"}'},{name:"authGuardFallbackUrl",label:"AuthGuard fallback url",type:"string",placeholder:"ex: forbidden"},{name:"desktopNavigationType",label:"Desktop navigation type",type:"list",values:[{label:"REDIRECT",value:F.REDIRECT},{label:"POPUP",value:F.POPUP}]},{name:"logLevel",label:"Log level",type:"list",values:[{label:"NONE",value:Q.NONE},{label:"ERROR",value:Q.ERROR},{label:"WARN",value:Q.WARN},{label:"INFO",value:Q.INFO},{label:"DEBUG",value:Q.DEBUG}]},{name:"loginRequired",label:"Login required",type:"boolean"},{name:"retrieveUserSession",label:"Retrieve user's session",type:"boolean"},{name:"loadUserInfo",label:"Load user's info",type:"boolean"},{name:"automaticSilentRenew",label:"Automatic silent renew",type:"boolean"},{name:"automaticInjectToken",label:"Automatic inject token",type:"boolean"},{name:"automaticInjectToken.headerName",label:"Header name",type:"string"},{name:"automaticInjectToken.include",label:"Include url(s)",type:"string",placeholder:"ex: http://localhost, /pathname"},{name:"automaticInjectToken.exclude",label:"Exclude url(s)",type:"string",placeholder:"ex: http://localhost, /pathname"},{name:"automaticLoginOn401",label:"Automatic login on 401",type:"boolean"}];class ai{#e="auth-js:playground:settings";#t=oi;#i;constructor(e){this.#t.forEach((s,i)=>{s._sortIndex=i}),this.#i={currentTabIndex:0,currentSettingsIndex:0,settings:Vt(e)}}getLibrarySettingsDefinition(){return this.#t}getLibraryImplementations(){return zt}getSettings(){return this.get().settings}addOrUpdateSettings(e,s){const i=this.get();let r=s;return s!==void 0?i.settings[s]=e:(i.settings.push(e),r=i.settings.sort((o,a)=>o.name.localeCompare(a.name)).indexOf(e)),this.saveDemoAppSettings(i),r}deleteCurrentSettings(){const e=this.get(),s=e.currentSettingsIndex;s>=0&&s<e.settings.length&&(e.settings.splice(s,1),this.saveDemoAppSettings(e))}setCurrentTabIndex(e){const s=this.get();s.currentTabIndex=e,this.saveDemoAppSettings(s)}setCurrentSettingsIndex(e){const s=this.get();s.currentSettingsIndex=e,this.saveDemoAppSettings(s)}getCurrentSettings(){const e=this.get(),s=e.currentSettingsIndex;return s>=0&&s<e.settings.length?e.settings[s]:e.settings[0]}get(){const e=sessionStorage.getItem(this.#e);if(e){const s={...this.#i,...JSON.parse(e)};return this.#i.settings.forEach(i=>{s.settings.find(r=>r.name===i.name)||s.settings.push(i)}),s.settings=s.settings.sort((i,r)=>i.name.localeCompare(r.name)),s}return{...this.#i}}saveDemoAppSettings(e){delete e.librarySettingsDefinition,sessionStorage.setItem(this.#e,JSON.stringify(e))}}const wt=document.createElement("template");wt.innerHTML=`
    <style>
        :host #demo-app-playground-content {
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            height: 100%;
            margin: 0;
            color: #bdbdbd;
        }
    </style>

    <demo-app-main>
        <demo-app-playground tabLabel="Playground">
            <h2 id="demo-app-playground-content"></h2>
        </demo-app-playground>
        <demo-app-debug tabLabel="Debug"></demo-app-debug>
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
`;class ci extends HTMLElement{demoAppMainEl;demoAppPlaygroundEl;demoAppDebugEl;authManagerSubs=[];listeners=[];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(wt.content,!0))}connectedCallback(){this.demoAppMainEl=this.shadowRoot?.querySelector("demo-app-main"),this.demoAppPlaygroundEl=this.shadowRoot?.querySelector("demo-app-playground"),this.demoAppDebugEl=this.shadowRoot?.querySelector("demo-app-debug"),this.listenForHeaderEvents(),this.listenForPlaygroundEvents(),this.listenForAuthChanges(),this.installGuard()}disconnectedCallback(){this.authManagerSubs.forEach(e=>{e.unsubscribe()}),this.listeners.forEach(e=>{e()})}callPrivateApi(e,s){if(e){const i=new XMLHttpRequest;i.onreadystatechange=()=>{if(i.readyState===XMLHttpRequest.DONE){let r;try{r=JSON.parse(i.responseText)}catch{r={status:i.status,statusText:i.statusText!==""?i.statusText:"Unknown Error",url:i.responseURL}}this.demoAppPlaygroundEl?.setApiStatus(r,i.status!==200)}},i.open("GET",e,!0),s&&Object.entries(s).forEach(([r,n])=>{i.setRequestHeader(r,String(n))}),i.send()}}async callGuard(e=location.href){const s=this.demoAppPlaygroundEl?.querySelector("#demo-app-playground-content");if(s){const i=new URL(window.location.href),r=new URL(document.baseURI),n=i.pathname.replace(r.pathname,"");if(["protected","private"].includes(n)){const o=n==="protected"?{validator:Ot()}:void 0,a=await window.authManager.runGuard(e,o);typeof a=="string"?s.textContent=a:a&&(s.textContent=`${n} content`)}else n==="public"?s.textContent="public content":s.textContent=""}}installGuard(){const e=history.pushState.bind(history);history.pushState=(...i)=>{e(...i),this.callGuard()};const s=history.replaceState.bind(history);history.replaceState=(...i)=>{s(...i),this.callGuard()}}refreshInfo(e,s){if(this.demoAppMainEl&&this.demoAppDebugEl)switch(e){case"renewing":this.demoAppMainEl.isRenewing=s;break;case"authenticated":this.demoAppMainEl.isAuthenticated=s,this.demoAppDebugEl.isAuthenticated=s;break;case"userSession":this.demoAppDebugEl.userSession=s;break;case"accessToken":this.demoAppDebugEl.accessToken=s,this.demoAppDebugEl.accessTokenDecoded=be(s);break;case"idToken":this.demoAppDebugEl.idToken=s,this.demoAppDebugEl.idTokenDecoded=be(s);break;case"userProfile":this.demoAppDebugEl.userProfile=s;break}}listenForAuthChanges(){const e=window.authManager;this.authManagerSubs.push(e.onRenewingChanged(s=>{this.refreshInfo("renewing",s)}),e.onAuthenticatedChanged(s=>{this.refreshInfo("authenticated",s)}),e.onUserSessionChanged(s=>{this.refreshInfo("userSession",s)}),e.onAccessTokenChanged(s=>{this.refreshInfo("accessToken",s)}),e.onIdTokenChanged(s=>{this.refreshInfo("idToken",s)}),e.onUserProfileChanged(s=>{this.refreshInfo("userProfile",s)}))}listenForPlaygroundEvents(){if(this.demoAppPlaygroundEl){const e=(i=>{this.callPrivateApi(i.detail?.url,i.detail?.headers)});this.demoAppPlaygroundEl.addEventListener("api",e),this.listeners.push(()=>this.demoAppPlaygroundEl?.removeEventListener("api",e));const s=(i=>{const r=new URL(i.type==="home"?"./":i.type,location.href);Object.entries(i.detail?.queryParams).forEach(([n,o])=>{r.searchParams.set(n,o)}),history.pushState({},"",r)});this.demoAppPlaygroundEl.addEventListener("home",s),this.listeners.push(()=>this.demoAppPlaygroundEl?.removeEventListener("home",s)),this.demoAppPlaygroundEl.addEventListener("public",s),this.listeners.push(()=>this.demoAppPlaygroundEl?.removeEventListener("public",s)),this.demoAppPlaygroundEl.addEventListener("private",s),this.listeners.push(()=>this.demoAppPlaygroundEl?.removeEventListener("private",s)),this.demoAppPlaygroundEl.addEventListener("protected",s),this.listeners.push(()=>this.demoAppPlaygroundEl?.removeEventListener("protected",s))}}listenForHeaderEvents(){if(this.demoAppMainEl){const e=window.authManager,s=()=>{e.login()};this.demoAppMainEl.addEventListener("login",s);const i=()=>{e.logout({redirectUrl:"/"}).then(()=>{const n=document.baseURI||document.querySelector("base")?.href||location.origin;location.href=n.endsWith("/")?n:`${n}/`})};this.demoAppMainEl.addEventListener("logout",i);const r=()=>{e.renew()};this.demoAppMainEl.addEventListener("silentRenew",r),this.listeners.push(()=>this.demoAppMainEl?.removeEventListener("login",s),()=>this.demoAppMainEl?.removeEventListener("logout",i),()=>this.demoAppMainEl?.removeEventListener("silentRenew",r))}}}customElements.define("app-root",ci);(()=>{window.appSettings=new ai(!1);const t=document.createElement("div");t.innerHTML="Loading...",document.body.appendChild(t),ni(window.appSettings.getCurrentSettings().librarySettings).then(e=>{window.authManager=e,t.replaceWith(document.createElement("app-root"))}).catch(e=>{const s=e instanceof Error?e.message:String(e);t.innerHTML=`${s}<br/><button id="loginButton">Login</button>`,document.body.querySelector("#loginButton")?.addEventListener("click",()=>{location.reload()},{once:!0}),console.error(e)})})();

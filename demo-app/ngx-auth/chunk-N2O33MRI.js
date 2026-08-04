import{A as He,D as Be,E as ri,F as si,G as oi,J as $,K as W,N as te,O as ai,P as Tn,T as li,U as ci,W as Mn,Z as di,_ as _e,a as E,b as L,c as Zt,ca as yt,d as M,e as S,f as De,g as Fe,h as ht,i as l,j as ae,k as pt,l as X,m as Dn,n as gt,o as ft,p as je,q as N,r as ei,s as ti,u as ii,v as ni,w as mt,x as vt,y as _t,z as bt}from"./chunk-65LJV4OT.js";var T,wt=S(()=>{"use strict";T=class t{static#e=console;static#t=1;static#i="???";#a=[];constructor(e){e&&this.#a.push(e)}static setLibName(e){this.#i=e}static setLogLevel(e){this.#t=e}static setLogger(e){this.#e=e}createChild(e){let i=new t;return i.#a.push(...this.#a,e),i}debug(...e){t.#t>=4&&t.#e.debug(this.#s(),...e)}info(...e){t.#t>=3&&t.#e.info(this.#s(),...e)}warn(...e){t.#t>=2&&t.#e.warn(this.#s(),...e)}error(...e){t.#t>=1&&t.#e.error(this.#s(),...e)}getError(e,i=!1){return t.#e.error(this.#s(i),e),new Error(e)}notif(...e){t.#e.warn(this.#s(!1),...e)}#s(e=!0){let i=`[${t.#i}]`;return e&&(i+=`[${this.#a.join(".")}]`),i}}});var be,ui=S(()=>{"use strict";be=class{}});var F,hi=S(()=>{"use strict";F=class{#e=[];#t;add(e,i){let n={subscriber:e,options:i};return this.#e.push(n),this.#t&&(e(this.#t),i?.once&&this.unsubscribe(e)),{unsubscribe:()=>{this.unsubscribe(e)}}}notify(e){this.#t=e,this.#e.forEach(i=>{i.subscriber(e),i.options?.once&&this.unsubscribe(i.subscriber)})}unsubscribe(e){if(e){let i=this.#e.findIndex(n=>n.subscriber===e);i!==-1&&this.#e.splice(i,1)}else this.#e=[]}}});function St(t){this.message=t}function Pn(t){var e=t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw"Illegal base64url string!"}try{return(function(i){return decodeURIComponent(pi(i).replace(/(.)/g,function(n,r){var s=r.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))})(e)}catch(i){return pi(e)}}function qe(t){this.message=t}function Rn(t,e){if(typeof t!="string")throw new qe("Invalid token specified");var i=(e=e||{}).header===!0?0:1;try{return JSON.parse(Pn(t.split(".")[i]))}catch(n){throw new qe("Invalid token specified: "+n.message)}}var pi,$e,Et=S(()=>{"use strict";St.prototype=new Error,St.prototype.name="InvalidCharacterError";pi=typeof window<"u"&&window.atob&&window.atob.bind(window)||function(t){var e=String(t).replace(/=+$/,"");if(e.length%4==1)throw new St("'atob' failed: The string to be decoded is not correctly encoded.");for(var i,n,r=0,s=0,o="";n=e.charAt(s++);~n&&(i=r%4?64*i+n:n,r++%4)?o+=String.fromCharCode(255&i>>(-2*r&6)):0)n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);return o};qe.prototype=new Error,qe.prototype.name="InvalidTokenError";$e=Rn});var Vn,On,we,Se,Ee,ie,ne,le,We,ye,Te,gi=S(()=>{"use strict";Et();wt();On=()=>Vn??=new T("AuthUtils"),we=()=>typeof window.cordova<"u"||typeof window.phonegap<"u"||typeof window.PhoneGap<"u",Se=()=>!!window.Capacitor?.isNativePlatform(),Ee=()=>Se()||we(),ie=t=>{try{return t&&$e(t)}catch(e){return On().createChild("decodeJwt").warn("Token was not decoded as it is not a valid JWT."),t}},ne=(t,e)=>{if(e!==void 0){let i=new URL(t,"http://test"),n=new URL(e,"http://test");if(n.pathname!==""&&n.pathname!=="/"&&!i.pathname.includes(n.pathname)||n.origin!=="http://test"&&(i.protocol!==n.protocol||i.origin!==n.origin||!`${i.origin}${i.pathname}}`.includes(`${n.origin}${n.pathname}`)))return!1;let r=!0;return n.searchParams.forEach((s,o)=>{i.searchParams.getAll(o).includes(s)||(r=!1)}),r}return!1},le=()=>{let t=document.querySelector("base")?.href??window.location.origin,e=new URL(t);return t=`${e.origin}${e.pathname}`,t.endsWith("/")?t:`${t}/`},We=t=>{try{return new URL(t)}catch(e){let i=t.startsWith("/")?t.substring(1,t.length):t;return new URL(`${le()}${i}`)}},ye=t=>{if(t&&typeof t=="object"){let e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}return!1},Te=(t,...e)=>{let i=ye(t)?t:{};return e.reduce((n,r)=>(ye(r)&&Object.keys(r).forEach(s=>{let o=r[s],a=n[s];if(ye(o))ye(a)||(n[s]={}),Te(n[s],o);else if(Array.isArray(o)){Array.isArray(a)||(n[s]=[]);let d=n[s];o.forEach((c,h)=>{ye(c)?(ye(d[h])||(d[h]={}),Te(d[h],c)):d[h]=c})}else o!==void 0&&(n[s]=o)}),n),i),i}});var Ct,fi=S(()=>{"use strict";Ct=(t,e)=>l(null,null,function*(){let i=new e;return yield i.init(t),i})});var Q=S(()=>{"use strict";wt();ui();hi();gi();fi();});var mi=De(()=>{"use strict"});var Me=De((Ge,vi)=>{"use strict";(function(t,e){typeof Ge=="object"?vi.exports=Ge=e():typeof define=="function"&&define.amd?define([],e):t.CryptoJS=e()})(Ge,function(){var t=t||(function(e,i){var n;if(typeof window<"u"&&window.crypto&&(n=window.crypto),typeof self<"u"&&self.crypto&&(n=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(n=globalThis.crypto),!n&&typeof window<"u"&&window.msCrypto&&(n=window.msCrypto),!n&&typeof global<"u"&&global.crypto&&(n=global.crypto),!n&&typeof Zt=="function")try{n=mi()}catch(u){}var r=function(){if(n){if(typeof n.getRandomValues=="function")try{return n.getRandomValues(new Uint32Array(1))[0]}catch(u){}if(typeof n.randomBytes=="function")try{return n.randomBytes(4).readInt32LE()}catch(u){}}throw new Error("Native crypto module could not be used to get secure random number.")},s=Object.create||(function(){function u(){}return function(f){var _;return u.prototype=f,_=new u,u.prototype=null,_}})(),o={},a=o.lib={},d=a.Base=(function(){return{extend:function(u){var f=s(this);return u&&f.mixIn(u),(!f.hasOwnProperty("init")||this.init===f.init)&&(f.init=function(){f.$super.init.apply(this,arguments)}),f.init.prototype=f,f.$super=this,f},create:function(){var u=this.extend();return u.init.apply(u,arguments),u},init:function(){},mixIn:function(u){for(var f in u)u.hasOwnProperty(f)&&(this[f]=u[f]);u.hasOwnProperty("toString")&&(this.toString=u.toString)},clone:function(){return this.init.prototype.extend(this)}}})(),c=a.WordArray=d.extend({init:function(u,f){u=this.words=u||[],f!=i?this.sigBytes=f:this.sigBytes=u.length*4},toString:function(u){return(u||p).stringify(this)},concat:function(u){var f=this.words,_=u.words,v=this.sigBytes,k=u.sigBytes;if(this.clamp(),v%4)for(var C=0;C<k;C++){var y=_[C>>>2]>>>24-C%4*8&255;f[v+C>>>2]|=y<<24-(v+C)%4*8}else for(var x=0;x<k;x+=4)f[v+x>>>2]=_[x>>>2];return this.sigBytes+=k,this},clamp:function(){var u=this.words,f=this.sigBytes;u[f>>>2]&=4294967295<<32-f%4*8,u.length=e.ceil(f/4)},clone:function(){var u=d.clone.call(this);return u.words=this.words.slice(0),u},random:function(u){for(var f=[],_=0;_<u;_+=4)f.push(r());return new c.init(f,u)}}),h=o.enc={},p=h.Hex={stringify:function(u){for(var f=u.words,_=u.sigBytes,v=[],k=0;k<_;k++){var C=f[k>>>2]>>>24-k%4*8&255;v.push((C>>>4).toString(16)),v.push((C&15).toString(16))}return v.join("")},parse:function(u){for(var f=u.length,_=[],v=0;v<f;v+=2)_[v>>>3]|=parseInt(u.substr(v,2),16)<<24-v%8*4;return new c.init(_,f/2)}},g=h.Latin1={stringify:function(u){for(var f=u.words,_=u.sigBytes,v=[],k=0;k<_;k++){var C=f[k>>>2]>>>24-k%4*8&255;v.push(String.fromCharCode(C))}return v.join("")},parse:function(u){for(var f=u.length,_=[],v=0;v<f;v++)_[v>>>2]|=(u.charCodeAt(v)&255)<<24-v%4*8;return new c.init(_,f)}},m=h.Utf8={stringify:function(u){try{return decodeURIComponent(escape(g.stringify(u)))}catch(f){throw new Error("Malformed UTF-8 data")}},parse:function(u){return g.parse(unescape(encodeURIComponent(u)))}},b=a.BufferedBlockAlgorithm=d.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(u){typeof u=="string"&&(u=m.parse(u)),this._data.concat(u),this._nDataBytes+=u.sigBytes},_process:function(u){var f,_=this._data,v=_.words,k=_.sigBytes,C=this.blockSize,y=C*4,x=k/y;u?x=e.ceil(x):x=e.max((x|0)-this._minBufferSize,0);var D=x*C,V=e.min(D*4,k);if(D){for(var P=0;P<D;P+=C)this._doProcessBlock(v,P);f=v.splice(0,D),_.sigBytes-=V}return new c.init(f,V)},clone:function(){var u=d.clone.call(this);return u._data=this._data.clone(),u},_minBufferSize:0}),A=a.Hasher=b.extend({cfg:d.extend(),init:function(u){this.cfg=this.cfg.extend(u),this.reset()},reset:function(){b.reset.call(this),this._doReset()},update:function(u){return this._append(u),this._process(),this},finalize:function(u){u&&this._append(u);var f=this._doFinalize();return f},blockSize:512/32,_createHelper:function(u){return function(f,_){return new u.init(_).finalize(f)}},_createHmacHelper:function(u){return function(f,_){return new I.HMAC.init(u,_).finalize(f)}}}),I=o.algo={};return o})(Math);return t})});var bi=De((ze,_i)=>{"use strict";(function(t,e){typeof ze=="object"?_i.exports=ze=e(Me()):typeof define=="function"&&define.amd?define(["./core"],e):e(t.CryptoJS)})(ze,function(t){return(function(e){var i=t,n=i.lib,r=n.WordArray,s=n.Hasher,o=i.algo,a=[],d=[];(function(){function p(A){for(var I=e.sqrt(A),u=2;u<=I;u++)if(!(A%u))return!1;return!0}function g(A){return(A-(A|0))*4294967296|0}for(var m=2,b=0;b<64;)p(m)&&(b<8&&(a[b]=g(e.pow(m,1/2))),d[b]=g(e.pow(m,1/3)),b++),m++})();var c=[],h=o.SHA256=s.extend({_doReset:function(){this._hash=new r.init(a.slice(0))},_doProcessBlock:function(p,g){for(var m=this._hash.words,b=m[0],A=m[1],I=m[2],u=m[3],f=m[4],_=m[5],v=m[6],k=m[7],C=0;C<64;C++){if(C<16)c[C]=p[g+C]|0;else{var y=c[C-15],x=(y<<25|y>>>7)^(y<<14|y>>>18)^y>>>3,D=c[C-2],V=(D<<15|D>>>17)^(D<<13|D>>>19)^D>>>10;c[C]=x+c[C-7]+V+c[C-16]}var P=f&_^~f&v,U=b&A^b&I^A&I,oe=(b<<30|b>>>2)^(b<<19|b>>>13)^(b<<10|b>>>22),Ie=(f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25),Y=k+Ie+P+d[C]+c[C],ve=oe+U;k=v,v=_,_=f,f=u+Y|0,u=I,I=A,A=b,b=Y+ve|0}m[0]=m[0]+b|0,m[1]=m[1]+A|0,m[2]=m[2]+I|0,m[3]=m[3]+u|0,m[4]=m[4]+f|0,m[5]=m[5]+_|0,m[6]=m[6]+v|0,m[7]=m[7]+k|0},_doFinalize:function(){var p=this._data,g=p.words,m=this._nDataBytes*8,b=p.sigBytes*8;return g[b>>>5]|=128<<24-b%32,g[(b+64>>>9<<4)+14]=e.floor(m/4294967296),g[(b+64>>>9<<4)+15]=m,p.sigBytes=g.length*4,this._process(),this._hash},clone:function(){var p=s.clone.call(this);return p._hash=this._hash.clone(),p}});i.SHA256=s._createHelper(h),i.HmacSHA256=s._createHmacHelper(h)})(Math),t.SHA256})});var wi=De((Je,yi)=>{"use strict";(function(t,e){typeof Je=="object"?yi.exports=Je=e(Me()):typeof define=="function"&&define.amd?define(["./core"],e):e(t.CryptoJS)})(Je,function(t){return(function(){var e=t,i=e.lib,n=i.WordArray,r=e.enc,s=r.Base64={stringify:function(a){var d=a.words,c=a.sigBytes,h=this._map;a.clamp();for(var p=[],g=0;g<c;g+=3)for(var m=d[g>>>2]>>>24-g%4*8&255,b=d[g+1>>>2]>>>24-(g+1)%4*8&255,A=d[g+2>>>2]>>>24-(g+2)%4*8&255,I=m<<16|b<<8|A,u=0;u<4&&g+u*.75<c;u++)p.push(h.charAt(I>>>6*(3-u)&63));var f=h.charAt(64);if(f)for(;p.length%4;)p.push(f);return p.join("")},parse:function(a){var d=a.length,c=this._map,h=this._reverseMap;if(!h){h=this._reverseMap=[];for(var p=0;p<c.length;p++)h[c.charCodeAt(p)]=p}var g=c.charAt(64);if(g){var m=a.indexOf(g);m!==-1&&(d=m)}return o(a,d,h)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function o(a,d,c){for(var h=[],p=0,g=0;g<d;g++)if(g%4){var m=c[a.charCodeAt(g-1)]<<g%4*2,b=c[a.charCodeAt(g)]>>>6-g%4*2,A=m|b;h[p>>>2]|=A<<24-p%4*8,p++}return n.create(h,p)}})(),t.enc.Base64})});var Ei=De((Ke,Si)=>{"use strict";(function(t,e){typeof Ke=="object"?Si.exports=Ke=e(Me()):typeof define=="function"&&define.amd?define(["./core"],e):e(t.CryptoJS)})(Ke,function(t){return t.enc.Utf8})});var ki,Ii,At,Di,Ln,G,z,ce,w,Nn,J,re,kt,Ci,j,It,Dt,de,Pt,Fn,jn,Qe,Rt,Hn,Ye,Bn,qn,$n,Wn,Gn,zn,Tt,Jn,Ti,Kn,Ce,Vt,Xn,Qn,xt,Yn,Zn,er,tr,ir,nr,rr,Xe,xi,Mi,Pi,Ri,sr,or,Vi,ar,Mt,lr,cr,dr,Ai,ur,hr,pr,gr,fr,Oi,Ot=S(()=>{"use strict";ki=Fe(Me(),1),Ii=Fe(bi(),1),At=Fe(wi(),1),Di=Fe(Ei(),1);Et();Ln={debug:()=>{},info:()=>{},warn:()=>{},error:()=>{}},ce=(t=>(t[t.NONE=0]="NONE",t[t.ERROR=1]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=3]="INFO",t[t.DEBUG=4]="DEBUG",t))(ce||{});(t=>{function e(){G=3,z=Ln}t.reset=e;function i(r){if(!(0<=r&&r<=4))throw new Error("Invalid log level");G=r}t.setLevel=i;function n(r){z=r}t.setLogger=n})(ce||(ce={}));w=class{constructor(t){this._name=t}debug(...t){G>=4&&z.debug(w._format(this._name,this._method),...t)}info(...t){G>=3&&z.info(w._format(this._name,this._method),...t)}warn(...t){G>=2&&z.warn(w._format(this._name,this._method),...t)}error(...t){G>=1&&z.error(w._format(this._name,this._method),...t)}throw(t){throw this.error(t),t}create(t){let e=Object.create(this);return e._method=t,e.debug("begin"),e}static createStatic(t,e){let i=new w(`${t}.${e}`);return i.debug("begin"),i}static _format(t,e){let i=`[${t}]`;return e?`${i} ${e}:`:i}static debug(t,...e){G>=4&&z.debug(w._format(t),...e)}static info(t,...e){G>=3&&z.info(w._format(t),...e)}static warn(t,...e){G>=2&&z.warn(w._format(t),...e)}static error(t,...e){G>=1&&z.error(w._format(t),...e)}};ce.reset();Nn="10000000-1000-4000-8000-100000000000",J=class{static _randomWord(){return ki.default.lib.WordArray.random(1).words[0]}static generateUUIDv4(){return Nn.replace(/[018]/g,e=>(+e^J._randomWord()&15>>+e/4).toString(16)).replace(/-/g,"")}static generateCodeVerifier(){return J.generateUUIDv4()+J.generateUUIDv4()+J.generateUUIDv4()}static generateCodeChallenge(t){try{let e=(0,Ii.default)(t);return At.default.stringify(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}catch(e){throw w.error("CryptoUtils.generateCodeChallenge",e),e}}static generateBasicAuth(t,e){let i=Di.default.parse([t,e].join(":"));return At.default.stringify(i)}},re=class{constructor(t){this._name=t,this._logger=new w(`Event('${this._name}')`),this._callbacks=[]}addHandler(t){return this._callbacks.push(t),()=>this.removeHandler(t)}removeHandler(t){let e=this._callbacks.lastIndexOf(t);e>=0&&this._callbacks.splice(e,1)}raise(...t){this._logger.debug("raise:",...t);for(let e of this._callbacks)e(...t)}},kt=class{static decode(t){try{return $e(t)}catch(e){throw w.error("JwtUtils.decode",e),e}}},Ci=class{static center(e){var t=M(e,[]);var i,n,r;return t.width==null&&(t.width=(i=[800,720,600,480].find(s=>s<=window.outerWidth/1.618))!=null?i:360),(n=t.left)!=null||(t.left=Math.max(0,Math.round(window.screenX+(window.outerWidth-t.width)/2))),t.height!=null&&((r=t.top)!=null||(t.top=Math.max(0,Math.round(window.screenY+(window.outerHeight-t.height)/2)))),t}static serialize(t){return Object.entries(t).filter(([,e])=>e!=null).map(([e,i])=>`${e}=${typeof i!="boolean"?i:i?"yes":"no"}`).join(",")}},j=class extends re{constructor(){super(...arguments),this._logger=new w(`Timer('${this._name}')`),this._timerHandle=null,this._expiration=0,this._callback=()=>{let t=this._expiration-j.getEpochTime();this._logger.debug("timer completes in",t),this._expiration<=j.getEpochTime()&&(this.cancel(),super.raise())}}static getEpochTime(){return Math.floor(Date.now()/1e3)}init(t){let e=this._logger.create("init");t=Math.max(Math.floor(t),1);let i=j.getEpochTime()+t;if(this.expiration===i&&this._timerHandle){e.debug("skipping since already initialized for expiration at",this.expiration);return}this.cancel(),e.debug("using duration",t),this._expiration=i;let n=Math.min(t,5);this._timerHandle=setInterval(this._callback,n*1e3)}get expiration(){return this._expiration}cancel(){this._logger.create("cancel"),this._timerHandle&&(clearInterval(this._timerHandle),this._timerHandle=null)}},It=class{static readParams(t,e="query"){if(!t)throw new TypeError("Invalid URL");let n=new URL(t,"http://127.0.0.1")[e==="fragment"?"hash":"search"];return new URLSearchParams(n.slice(1))}},Dt=";",de=class extends Error{constructor(t,e){var i,n,r;if(super(t.error_description||t.error||""),this.form=e,this.name="ErrorResponse",!t.error)throw w.error("ErrorResponse","No error passed"),new Error("No error passed");this.error=t.error,this.error_description=(i=t.error_description)!=null?i:null,this.error_uri=(n=t.error_uri)!=null?n:null,this.state=t.userState,this.session_state=(r=t.session_state)!=null?r:null,this.url_state=t.url_state}},Pt=class extends Error{constructor(t){super(t),this.name="ErrorTimeout"}},Fn=class{constructor(t){this._logger=new w("AccessTokenEvents"),this._expiringTimer=new j("Access token expiring"),this._expiredTimer=new j("Access token expired"),this._expiringNotificationTimeInSeconds=t.expiringNotificationTimeInSeconds}load(t){let e=this._logger.create("load");if(t.access_token&&t.expires_in!==void 0){let i=t.expires_in;if(e.debug("access token present, remaining duration:",i),i>0){let r=i-this._expiringNotificationTimeInSeconds;r<=0&&(r=1),e.debug("registering expiring timer, raising in",r,"seconds"),this._expiringTimer.init(r)}else e.debug("canceling existing expiring timer because we're past expiration."),this._expiringTimer.cancel();let n=i+1;e.debug("registering expired timer, raising in",n,"seconds"),this._expiredTimer.init(n)}else this._expiringTimer.cancel(),this._expiredTimer.cancel()}unload(){this._logger.debug("unload: canceling existing access token timers"),this._expiringTimer.cancel(),this._expiredTimer.cancel()}addAccessTokenExpiring(t){return this._expiringTimer.addHandler(t)}removeAccessTokenExpiring(t){this._expiringTimer.removeHandler(t)}addAccessTokenExpired(t){return this._expiredTimer.addHandler(t)}removeAccessTokenExpired(t){this._expiredTimer.removeHandler(t)}},jn=class{constructor(t,e,i,n,r){this._callback=t,this._client_id=e,this._intervalInSeconds=n,this._stopOnError=r,this._logger=new w("CheckSessionIFrame"),this._timer=null,this._session_state=null,this._message=o=>{o.origin===this._frame_origin&&o.source===this._frame.contentWindow&&(o.data==="error"?(this._logger.error("error message from check session op iframe"),this._stopOnError&&this.stop()):o.data==="changed"?(this._logger.debug("changed message from check session op iframe"),this.stop(),this._callback()):this._logger.debug(o.data+" message from check session op iframe"))};let s=new URL(i);this._frame_origin=s.origin,this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="fixed",this._frame.style.left="-1000px",this._frame.style.top="0",this._frame.width="0",this._frame.height="0",this._frame.src=s.href}load(){return new Promise(t=>{this._frame.onload=()=>{t()},window.document.body.appendChild(this._frame),window.addEventListener("message",this._message,!1)})}start(t){if(this._session_state===t)return;this._logger.create("start"),this.stop(),this._session_state=t;let e=()=>{!this._frame.contentWindow||!this._session_state||this._frame.contentWindow.postMessage(this._client_id+" "+this._session_state,this._frame_origin)};e(),this._timer=setInterval(e,this._intervalInSeconds*1e3)}stop(){this._logger.create("stop"),this._session_state=null,this._timer&&(clearInterval(this._timer),this._timer=null)}},Qe=class{constructor(){this._logger=new w("InMemoryWebStorage"),this._data={}}clear(){this._logger.create("clear"),this._data={}}getItem(t){return this._logger.create(`getItem('${t}')`),this._data[t]}setItem(t,e){this._logger.create(`setItem('${t}')`),this._data[t]=e}removeItem(t){this._logger.create(`removeItem('${t}')`),delete this._data[t]}get length(){return Object.getOwnPropertyNames(this._data).length}key(t){return Object.getOwnPropertyNames(this._data)[t]}},Rt=class{constructor(t=[],e=null,i={}){this._jwtHandler=e,this._extraHeaders=i,this._logger=new w("JsonService"),this._contentTypes=[],this._contentTypes.push(...t,"application/json"),e&&this._contentTypes.push("application/jwt")}fetchWithTimeout(i){return l(this,arguments,function*(t,e={}){let a=e,{timeoutInSeconds:n}=a,r=M(a,["timeoutInSeconds"]);if(!n)return yield fetch(t,r);let s=new AbortController,o=setTimeout(()=>s.abort(),n*1e3);try{return yield fetch(t,L(E({},e),{signal:s.signal}))}catch(d){throw d instanceof DOMException&&d.name==="AbortError"?new Pt("Network timed out"):d}finally{clearTimeout(o)}})}getJson(n){return l(this,arguments,function*(t,{token:e,credentials:i}={}){let r=this._logger.create("getJson"),s={Accept:this._contentTypes.join(", ")};e&&(r.debug("token passed, setting Authorization header"),s.Authorization="Bearer "+e),this.appendExtraHeaders(s);let o;try{r.debug("url:",t),o=yield this.fetchWithTimeout(t,{method:"GET",headers:s,credentials:i})}catch(c){throw r.error("Network Error"),c}r.debug("HTTP response received, status",o.status);let a=o.headers.get("Content-Type");if(a&&!this._contentTypes.find(c=>a.startsWith(c))&&r.throw(new Error(`Invalid response Content-Type: ${a??"undefined"}, from URL: ${t}`)),o.ok&&this._jwtHandler&&a?.startsWith("application/jwt"))return yield this._jwtHandler(yield o.text());let d;try{d=yield o.json()}catch(c){throw r.error("Error parsing JSON response",c),o.ok?c:new Error(`${o.statusText} (${o.status})`)}if(!o.ok)throw r.error("Error from server:",d),d.error?new de(d):new Error(`${o.statusText} (${o.status}): ${JSON.stringify(d)}`);return d})}postForm(s,o){return l(this,arguments,function*(t,{body:e,basicAuth:i,timeoutInSeconds:n,initCredentials:r}){let a=this._logger.create("postForm"),d={Accept:this._contentTypes.join(", "),"Content-Type":"application/x-www-form-urlencoded"};i!==void 0&&(d.Authorization="Basic "+i),this.appendExtraHeaders(d);let c;try{a.debug("url:",t),c=yield this.fetchWithTimeout(t,{method:"POST",headers:d,body:e,timeoutInSeconds:n,credentials:r})}catch(m){throw a.error("Network error"),m}a.debug("HTTP response received, status",c.status);let h=c.headers.get("Content-Type");if(h&&!this._contentTypes.find(m=>h.startsWith(m)))throw new Error(`Invalid response Content-Type: ${h??"undefined"}, from URL: ${t}`);let p=yield c.text(),g={};if(p)try{g=JSON.parse(p)}catch(m){throw a.error("Error parsing JSON response",m),c.ok?m:new Error(`${c.statusText} (${c.status})`)}if(!c.ok)throw a.error("Error from server:",g),g.error?new de(g,e):new Error(`${c.statusText} (${c.status}): ${JSON.stringify(g)}`);return g})}appendExtraHeaders(t){let e=this._logger.create("appendExtraHeaders"),i=Object.keys(this._extraHeaders),n=["authorization","accept","content-type"];i.length!==0&&i.forEach(r=>{if(n.includes(r.toLocaleLowerCase())){e.warn("Protected header could not be overridden",r,n);return}let s=typeof this._extraHeaders[r]=="function"?this._extraHeaders[r]():this._extraHeaders[r];s&&s!==""&&(t[r]=s)})}},Hn=class{constructor(t){this._settings=t,this._logger=new w("MetadataService"),this._signingKeys=null,this._metadata=null,this._metadataUrl=this._settings.metadataUrl,this._jsonService=new Rt(["application/jwk-set+json"],null,this._settings.extraHeaders),this._settings.signingKeys&&(this._logger.debug("using signingKeys from settings"),this._signingKeys=this._settings.signingKeys),this._settings.metadata&&(this._logger.debug("using metadata from settings"),this._metadata=this._settings.metadata),this._settings.fetchRequestCredentials&&(this._logger.debug("using fetchRequestCredentials from settings"),this._fetchRequestCredentials=this._settings.fetchRequestCredentials)}resetSigningKeys(){this._signingKeys=null}getMetadata(){return l(this,null,function*(){let t=this._logger.create("getMetadata");if(this._metadata)return t.debug("using cached values"),this._metadata;if(!this._metadataUrl)throw t.throw(new Error("No authority or metadataUrl configured on settings")),null;t.debug("getting metadata from",this._metadataUrl);let e=yield this._jsonService.getJson(this._metadataUrl,{credentials:this._fetchRequestCredentials});return t.debug("merging remote JSON with seed metadata"),this._metadata=Object.assign({},this._settings.metadataSeed,e),this._metadata})}getIssuer(){return this._getMetadataProperty("issuer")}getAuthorizationEndpoint(){return this._getMetadataProperty("authorization_endpoint")}getUserInfoEndpoint(){return this._getMetadataProperty("userinfo_endpoint")}getTokenEndpoint(t=!0){return this._getMetadataProperty("token_endpoint",t)}getCheckSessionIframe(){return this._getMetadataProperty("check_session_iframe",!0)}getEndSessionEndpoint(){return this._getMetadataProperty("end_session_endpoint",!0)}getRevocationEndpoint(t=!0){return this._getMetadataProperty("revocation_endpoint",t)}getKeysEndpoint(t=!0){return this._getMetadataProperty("jwks_uri",t)}_getMetadataProperty(t,e=!1){return l(this,null,function*(){let i=this._logger.create(`_getMetadataProperty('${t}')`),n=yield this.getMetadata();if(i.debug("resolved"),n[t]===void 0){if(e===!0){i.warn("Metadata does not contain optional property");return}i.throw(new Error("Metadata does not contain property "+t))}return n[t]})}getSigningKeys(){return l(this,null,function*(){let t=this._logger.create("getSigningKeys");if(this._signingKeys)return t.debug("returning signingKeys from cache"),this._signingKeys;let e=yield this.getKeysEndpoint(!1);t.debug("got jwks_uri",e);let i=yield this._jsonService.getJson(e);if(t.debug("got key set",i),!Array.isArray(i.keys))throw t.throw(new Error("Missing keys on keyset")),null;return this._signingKeys=i.keys,this._signingKeys})}},Ye=class{constructor({prefix:t="oidc.",store:e=localStorage}={}){this._logger=new w("WebStorageStateStore"),this._store=e,this._prefix=t}set(t,e){return l(this,null,function*(){this._logger.create(`set('${t}')`),t=this._prefix+t,yield this._store.setItem(t,e)})}get(t){return l(this,null,function*(){return this._logger.create(`get('${t}')`),t=this._prefix+t,yield this._store.getItem(t)})}remove(t){return l(this,null,function*(){this._logger.create(`remove('${t}')`),t=this._prefix+t;let e=yield this._store.getItem(t);return yield this._store.removeItem(t),e})}getAllKeys(){return l(this,null,function*(){this._logger.create("getAllKeys");let t=yield this._store.length,e=[];for(let i=0;i<t;i++){let n=yield this._store.key(i);n&&n.indexOf(this._prefix)===0&&e.push(n.substr(this._prefix.length))}return e})}},Bn="code",qn="openid",$n="client_secret_post",Wn="query",Gn=900,zn=300,Tt=class{constructor({authority:t,metadataUrl:e,metadata:i,signingKeys:n,metadataSeed:r,client_id:s,client_secret:o,response_type:a=Bn,scope:d=qn,redirect_uri:c,post_logout_redirect_uri:h,client_authentication:p=$n,prompt:g,display:m,max_age:b,ui_locales:A,acr_values:I,resource:u,response_mode:f=Wn,filterProtocolClaims:_=!0,loadUserInfo:v=!1,staleStateAgeInSeconds:k=Gn,clockSkewInSeconds:C=zn,userInfoJwtIssuer:y="OP",mergeClaims:x=!1,disablePKCE:D=!1,stateStore:V,refreshTokenCredentials:P,revokeTokenAdditionalContentTypes:U,fetchRequestCredentials:oe,refreshTokenAllowedScope:Ie,extraQueryParams:Y={},extraTokenParams:ve={},extraHeaders:Ue={}}){if(this.authority=t,e?this.metadataUrl=e:(this.metadataUrl=t,t&&(this.metadataUrl.endsWith("/")||(this.metadataUrl+="/"),this.metadataUrl+=".well-known/openid-configuration")),this.metadata=i,this.metadataSeed=r,this.signingKeys=n,this.client_id=s,this.client_secret=o,this.response_type=a,this.scope=d,this.redirect_uri=c,this.post_logout_redirect_uri=h,this.client_authentication=p,this.prompt=g,this.display=m,this.max_age=b,this.ui_locales=A,this.acr_values=I,this.resource=u,this.response_mode=f,this.filterProtocolClaims=_??!0,this.loadUserInfo=!!v,this.staleStateAgeInSeconds=k,this.clockSkewInSeconds=C,this.userInfoJwtIssuer=y,this.mergeClaims=!!x,this.disablePKCE=!!D,this.revokeTokenAdditionalContentTypes=U,oe&&P&&console.warn("Both fetchRequestCredentials and refreshTokenCredentials is set. Only fetchRequestCredentials will be used."),this.fetchRequestCredentials=oe||P||"same-origin",V)this.stateStore=V;else{let dt=typeof window<"u"?window.localStorage:new Qe;this.stateStore=new Ye({store:dt})}this.refreshTokenAllowedScope=Ie,this.extraQueryParams=Y,this.extraTokenParams=ve,this.extraHeaders=Ue}},Jn=class{constructor(t,e){this._settings=t,this._metadataService=e,this._logger=new w("UserInfoService"),this._getClaimsFromJwt=i=>l(this,null,function*(){let n=this._logger.create("_getClaimsFromJwt");try{let r=kt.decode(i);return n.debug("JWT decoding successful"),r}catch(r){throw n.error("Error parsing JWT response"),r}}),this._jsonService=new Rt(void 0,this._getClaimsFromJwt,this._settings.extraHeaders)}getClaims(t){return l(this,null,function*(){let e=this._logger.create("getClaims");t||this._logger.throw(new Error("No token passed"));let i=yield this._metadataService.getUserInfoEndpoint();e.debug("got userinfo url",i);let n=yield this._jsonService.getJson(i,{token:t,credentials:this._settings.fetchRequestCredentials});return e.debug("got claims",n),n})}},Ti=class{constructor(t,e){this._settings=t,this._metadataService=e,this._logger=new w("TokenClient"),this._jsonService=new Rt(this._settings.revokeTokenAdditionalContentTypes,null,this._settings.extraHeaders)}exchangeCode(s){return l(this,null,function*(){var o=s,{grant_type:t="authorization_code",redirect_uri:e=this._settings.redirect_uri,client_id:i=this._settings.client_id,client_secret:n=this._settings.client_secret}=o,r=M(o,["grant_type","redirect_uri","client_id","client_secret"]);let a=this._logger.create("exchangeCode");i||a.throw(new Error("A client_id is required")),e||a.throw(new Error("A redirect_uri is required")),r.code||a.throw(new Error("A code is required"));let d=new URLSearchParams({grant_type:t,redirect_uri:e});for(let[g,m]of Object.entries(r))m!=null&&d.set(g,m);let c;switch(this._settings.client_authentication){case"client_secret_basic":if(!n)throw a.throw(new Error("A client_secret is required")),null;c=J.generateBasicAuth(i,n);break;case"client_secret_post":d.append("client_id",i),n&&d.append("client_secret",n);break}let h=yield this._metadataService.getTokenEndpoint(!1);a.debug("got token endpoint");let p=yield this._jsonService.postForm(h,{body:d,basicAuth:c,initCredentials:this._settings.fetchRequestCredentials});return a.debug("got response"),p})}exchangeCredentials(s){return l(this,null,function*(){var o=s,{grant_type:t="password",client_id:e=this._settings.client_id,client_secret:i=this._settings.client_secret,scope:n=this._settings.scope}=o,r=M(o,["grant_type","client_id","client_secret","scope"]);let a=this._logger.create("exchangeCredentials");e||a.throw(new Error("A client_id is required"));let d=new URLSearchParams({grant_type:t,scope:n});for(let[g,m]of Object.entries(r))m!=null&&d.set(g,m);let c;switch(this._settings.client_authentication){case"client_secret_basic":if(!i)throw a.throw(new Error("A client_secret is required")),null;c=J.generateBasicAuth(e,i);break;case"client_secret_post":d.append("client_id",e),i&&d.append("client_secret",i);break}let h=yield this._metadataService.getTokenEndpoint(!1);a.debug("got token endpoint");let p=yield this._jsonService.postForm(h,{body:d,basicAuth:c,initCredentials:this._settings.fetchRequestCredentials});return a.debug("got response"),p})}exchangeRefreshToken(s){return l(this,null,function*(){var o=s,{grant_type:t="refresh_token",client_id:e=this._settings.client_id,client_secret:i=this._settings.client_secret,timeoutInSeconds:n}=o,r=M(o,["grant_type","client_id","client_secret","timeoutInSeconds"]);let a=this._logger.create("exchangeRefreshToken");e||a.throw(new Error("A client_id is required")),r.refresh_token||a.throw(new Error("A refresh_token is required"));let d=new URLSearchParams({grant_type:t});for(let[g,m]of Object.entries(r))Array.isArray(m)?m.forEach(b=>d.append(g,b)):m!=null&&d.set(g,m);let c;switch(this._settings.client_authentication){case"client_secret_basic":if(!i)throw a.throw(new Error("A client_secret is required")),null;c=J.generateBasicAuth(e,i);break;case"client_secret_post":d.append("client_id",e),i&&d.append("client_secret",i);break}let h=yield this._metadataService.getTokenEndpoint(!1);a.debug("got token endpoint");let p=yield this._jsonService.postForm(h,{body:d,basicAuth:c,timeoutInSeconds:n,initCredentials:this._settings.fetchRequestCredentials});return a.debug("got response"),p})}revoke(t){return l(this,null,function*(){var e;let i=this._logger.create("revoke");t.token||i.throw(new Error("A token is required"));let n=yield this._metadataService.getRevocationEndpoint(!1);i.debug(`got revocation endpoint, revoking ${(e=t.token_type_hint)!=null?e:"default token type"}`);let r=new URLSearchParams;for(let[s,o]of Object.entries(t))o!=null&&r.set(s,o);r.set("client_id",this._settings.client_id),this._settings.client_secret&&r.set("client_secret",this._settings.client_secret),yield this._jsonService.postForm(n,{body:r}),i.debug("got response")})}},Kn=class{constructor(t,e,i){this._settings=t,this._metadataService=e,this._claimsService=i,this._logger=new w("ResponseValidator"),this._userInfoService=new Jn(this._settings,this._metadataService),this._tokenClient=new Ti(this._settings,this._metadataService)}validateSigninResponse(t,e){return l(this,null,function*(){let i=this._logger.create("validateSigninResponse");this._processSigninState(t,e),i.debug("state processed"),yield this._processCode(t,e),i.debug("code processed"),t.isOpenId&&this._validateIdTokenAttributes(t),i.debug("tokens validated"),yield this._processClaims(t,e?.skipUserInfo,t.isOpenId),i.debug("claims processed")})}validateCredentialsResponse(t,e){return l(this,null,function*(){let i=this._logger.create("validateCredentialsResponse");t.isOpenId&&t.id_token&&this._validateIdTokenAttributes(t),i.debug("tokens validated"),yield this._processClaims(t,e,t.isOpenId),i.debug("claims processed")})}validateRefreshResponse(t,e){return l(this,null,function*(){var i,n;let r=this._logger.create("validateRefreshResponse");t.userState=e.data,(i=t.session_state)!=null||(t.session_state=e.session_state),(n=t.scope)!=null||(t.scope=e.scope),t.isOpenId&&t.id_token&&(this._validateIdTokenAttributes(t,e.id_token),r.debug("ID Token validated")),t.id_token||(t.id_token=e.id_token,t.profile=e.profile);let s=t.isOpenId&&!!t.id_token;yield this._processClaims(t,!1,s),r.debug("claims processed")})}validateSignoutResponse(t,e){let i=this._logger.create("validateSignoutResponse");if(e.id!==t.state&&i.throw(new Error("State does not match")),i.debug("state validated"),t.userState=e.data,t.error)throw i.warn("Response was error",t.error),new de(t)}_processSigninState(t,e){var i;let n=this._logger.create("_processSigninState");if(e.id!==t.state&&n.throw(new Error("State does not match")),e.client_id||n.throw(new Error("No client_id on state")),e.authority||n.throw(new Error("No authority on state")),this._settings.authority!==e.authority&&n.throw(new Error("authority mismatch on settings vs. signin state")),this._settings.client_id&&this._settings.client_id!==e.client_id&&n.throw(new Error("client_id mismatch on settings vs. signin state")),n.debug("state validated"),t.userState=e.data,t.url_state=e.url_state,(i=t.scope)!=null||(t.scope=e.scope),t.error)throw n.warn("Response was error",t.error),new de(t);e.code_verifier&&!t.code&&n.throw(new Error("Expected code in response"))}_processClaims(t,e=!1,i=!0){return l(this,null,function*(){let n=this._logger.create("_processClaims");if(t.profile=this._claimsService.filterProtocolClaims(t.profile),e||!this._settings.loadUserInfo||!t.access_token){n.debug("not loading user info");return}n.debug("loading user info");let r=yield this._userInfoService.getClaims(t.access_token);n.debug("user info claims received from user info endpoint"),i&&r.sub!==t.profile.sub&&n.throw(new Error("subject from UserInfo response does not match subject in ID Token")),t.profile=this._claimsService.mergeClaims(t.profile,this._claimsService.filterProtocolClaims(r)),n.debug("user info claims received, updated profile:",t.profile)})}_processCode(t,e){return l(this,null,function*(){let i=this._logger.create("_processCode");if(t.code){i.debug("Validating code");let n=yield this._tokenClient.exchangeCode(E({client_id:e.client_id,client_secret:e.client_secret,code:t.code,redirect_uri:e.redirect_uri,code_verifier:e.code_verifier},e.extraTokenParams));Object.assign(t,n)}else i.debug("No code to process")})}_validateIdTokenAttributes(t,e){var i;let n=this._logger.create("_validateIdTokenAttributes");n.debug("decoding ID Token JWT");let r=kt.decode((i=t.id_token)!=null?i:"");if(r.sub||n.throw(new Error("ID Token is missing a subject claim")),e){let s=kt.decode(e);r.sub!==s.sub&&n.throw(new Error("sub in id_token does not match current sub")),r.auth_time&&r.auth_time!==s.auth_time&&n.throw(new Error("auth_time in id_token does not match original auth_time")),r.azp&&r.azp!==s.azp&&n.throw(new Error("azp in id_token does not match original azp")),!r.azp&&s.azp&&n.throw(new Error("azp not in id_token, but present in original id_token"))}t.profile=r}},Ce=class{constructor(t){this.id=t.id||J.generateUUIDv4(),this.data=t.data,t.created&&t.created>0?this.created=t.created:this.created=j.getEpochTime(),this.request_type=t.request_type,this.url_state=t.url_state}toStorageString(){return new w("State").create("toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type,url_state:this.url_state})}static fromStorageString(t){return w.createStatic("State","fromStorageString"),new Ce(JSON.parse(t))}static clearStaleState(t,e){return l(this,null,function*(){let i=w.createStatic("State","clearStaleState"),n=j.getEpochTime()-e,r=yield t.getAllKeys();i.debug("got keys",r);for(let s=0;s<r.length;s++){let o=r[s],a=yield t.get(o),d=!1;if(a)try{let c=Ce.fromStorageString(a);i.debug("got item from key:",o,c.created),c.created<=n&&(d=!0)}catch(c){i.error("Error parsing state for key:",o,c),d=!0}else i.debug("no item in storage for key:",o),d=!0;d&&(i.debug("removed item for key:",o),t.remove(o))}})}},Vt=class extends Ce{constructor(t){super(t),t.code_verifier===!0?this.code_verifier=J.generateCodeVerifier():t.code_verifier&&(this.code_verifier=t.code_verifier),this.code_verifier&&(this.code_challenge=J.generateCodeChallenge(this.code_verifier)),this.authority=t.authority,this.client_id=t.client_id,this.redirect_uri=t.redirect_uri,this.scope=t.scope,this.client_secret=t.client_secret,this.extraTokenParams=t.extraTokenParams,this.response_mode=t.response_mode,this.skipUserInfo=t.skipUserInfo}toStorageString(){return new w("SigninState").create("toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type,url_state:this.url_state,code_verifier:this.code_verifier,authority:this.authority,client_id:this.client_id,redirect_uri:this.redirect_uri,scope:this.scope,client_secret:this.client_secret,extraTokenParams:this.extraTokenParams,response_mode:this.response_mode,skipUserInfo:this.skipUserInfo})}static fromStorageString(t){w.createStatic("SigninState","fromStorageString");let e=JSON.parse(t);return new Vt(e)}},Xn=class{constructor(f){var _=f,{url:t,authority:e,client_id:i,redirect_uri:n,response_type:r,scope:s,state_data:o,response_mode:a,request_type:d,client_secret:c,nonce:h,url_state:p,resource:g,skipUserInfo:m,extraQueryParams:b,extraTokenParams:A,disablePKCE:I}=_,u=M(_,["url","authority","client_id","redirect_uri","response_type","scope","state_data","response_mode","request_type","client_secret","nonce","url_state","resource","skipUserInfo","extraQueryParams","extraTokenParams","disablePKCE"]);if(this._logger=new w("SigninRequest"),!t)throw this._logger.error("ctor: No url passed"),new Error("url");if(!i)throw this._logger.error("ctor: No client_id passed"),new Error("client_id");if(!n)throw this._logger.error("ctor: No redirect_uri passed"),new Error("redirect_uri");if(!r)throw this._logger.error("ctor: No response_type passed"),new Error("response_type");if(!s)throw this._logger.error("ctor: No scope passed"),new Error("scope");if(!e)throw this._logger.error("ctor: No authority passed"),new Error("authority");this.state=new Vt({data:o,request_type:d,url_state:p,code_verifier:!I,client_id:i,authority:e,redirect_uri:n,response_mode:a,client_secret:c,scope:s,extraTokenParams:A,skipUserInfo:m});let v=new URL(t);v.searchParams.append("client_id",i),v.searchParams.append("redirect_uri",n),v.searchParams.append("response_type",r),v.searchParams.append("scope",s),h&&v.searchParams.append("nonce",h);let k=this.state.id;p&&(k=`${k}${Dt}${p}`),v.searchParams.append("state",k),this.state.code_challenge&&(v.searchParams.append("code_challenge",this.state.code_challenge),v.searchParams.append("code_challenge_method","S256")),g&&(Array.isArray(g)?g:[g]).forEach(y=>v.searchParams.append("resource",y));for(let[C,y]of Object.entries(E(E({response_mode:a},u),b)))y!=null&&v.searchParams.append(C,y.toString());this.url=v.href}},Qn="openid",xt=class{constructor(t){if(this.access_token="",this.token_type="",this.profile={},this.state=t.get("state"),this.session_state=t.get("session_state"),this.state){let e=decodeURIComponent(this.state).split(Dt);this.state=e[0],e.length>1&&(this.url_state=e.slice(1).join(Dt))}this.error=t.get("error"),this.error_description=t.get("error_description"),this.error_uri=t.get("error_uri"),this.code=t.get("code")}get expires_in(){if(this.expires_at!==void 0)return this.expires_at-j.getEpochTime()}set expires_in(t){typeof t=="string"&&(t=Number(t)),t!==void 0&&t>=0&&(this.expires_at=Math.floor(t)+j.getEpochTime())}get isOpenId(){var t;return((t=this.scope)==null?void 0:t.split(" ").includes(Qn))||!!this.id_token}},Yn=class{constructor({url:t,state_data:e,id_token_hint:i,post_logout_redirect_uri:n,extraQueryParams:r,request_type:s,client_id:o}){if(this._logger=new w("SignoutRequest"),!t)throw this._logger.error("ctor: No url passed"),new Error("url");let a=new URL(t);i&&a.searchParams.append("id_token_hint",i),o&&a.searchParams.append("client_id",o),n&&(a.searchParams.append("post_logout_redirect_uri",n),e&&(this.state=new Ce({data:e,request_type:s}),a.searchParams.append("state",this.state.id)));for(let[d,c]of Object.entries(E({},r)))c!=null&&a.searchParams.append(d,c.toString());this.url=a.href}},Zn=class{constructor(t){this.state=t.get("state"),this.error=t.get("error"),this.error_description=t.get("error_description"),this.error_uri=t.get("error_uri")}},er=["nbf","jti","auth_time","nonce","acr","amr","azp","at_hash"],tr=["sub","iss","aud","exp","iat"],ir=class{constructor(t){this._settings=t,this._logger=new w("ClaimsService")}filterProtocolClaims(t){let e=E({},t);if(this._settings.filterProtocolClaims){let i;Array.isArray(this._settings.filterProtocolClaims)?i=this._settings.filterProtocolClaims:i=er;for(let n of i)tr.includes(n)||delete e[n]}return e}mergeClaims(t,e){let i=E({},t);for(let[n,r]of Object.entries(e))for(let s of Array.isArray(r)?r:[r]){let o=i[n];o===void 0?i[n]=s:Array.isArray(o)?o.includes(s)||o.push(s):i[n]!==s&&(typeof s=="object"&&this._settings.mergeClaims?i[n]=this.mergeClaims(o,s):i[n]=[o,s])}return i}},nr=class{constructor(t,e){this._logger=new w("OidcClient"),this.settings=t instanceof Tt?t:new Tt(t),this.metadataService=e??new Hn(this.settings),this._claimsService=new ir(this.settings),this._validator=new Kn(this.settings,this.metadataService,this._claimsService),this._tokenClient=new Ti(this.settings,this.metadataService)}createSigninRequest(k){return l(this,arguments,function*({state:t,request:e,request_uri:i,request_type:n,id_token_hint:r,login_hint:s,skipUserInfo:o,nonce:a,url_state:d,response_type:c=this.settings.response_type,scope:h=this.settings.scope,redirect_uri:p=this.settings.redirect_uri,prompt:g=this.settings.prompt,display:m=this.settings.display,max_age:b=this.settings.max_age,ui_locales:A=this.settings.ui_locales,acr_values:I=this.settings.acr_values,resource:u=this.settings.resource,response_mode:f=this.settings.response_mode,extraQueryParams:_=this.settings.extraQueryParams,extraTokenParams:v=this.settings.extraTokenParams}){let C=this._logger.create("createSigninRequest");if(c!=="code")throw new Error("Only the Authorization Code flow (with PKCE) is supported");let y=yield this.metadataService.getAuthorizationEndpoint();C.debug("Received authorization endpoint",y);let x=new Xn({url:y,authority:this.settings.authority,client_id:this.settings.client_id,redirect_uri:p,response_type:c,scope:h,state_data:t,url_state:d,prompt:g,display:m,max_age:b,ui_locales:A,id_token_hint:r,login_hint:s,acr_values:I,resource:u,request:e,request_uri:i,extraQueryParams:_,extraTokenParams:v,request_type:n,response_mode:f,client_secret:this.settings.client_secret,skipUserInfo:o,nonce:a,disablePKCE:this.settings.disablePKCE});yield this.clearStaleState();let D=x.state;return yield this.settings.stateStore.set(D.id,D.toStorageString()),x})}readSigninResponseState(t,e=!1){return l(this,null,function*(){let i=this._logger.create("readSigninResponseState"),n=new xt(It.readParams(t,this.settings.response_mode));if(!n.state)throw i.throw(new Error("No state in response")),null;let r=yield this.settings.stateStore[e?"remove":"get"](n.state);if(!r)throw i.throw(new Error("No matching state found in storage")),null;return{state:Vt.fromStorageString(r),response:n}})}processSigninResponse(t){return l(this,null,function*(){let e=this._logger.create("processSigninResponse"),{state:i,response:n}=yield this.readSigninResponseState(t,!0);return e.debug("received state from storage; validating response"),yield this._validator.validateSigninResponse(n,i),n})}processResourceOwnerPasswordCredentials(r){return l(this,arguments,function*({username:t,password:e,skipUserInfo:i=!1,extraTokenParams:n={}}){let s=yield this._tokenClient.exchangeCredentials(E({username:t,password:e},n)),o=new xt(new URLSearchParams);return Object.assign(o,s),yield this._validator.validateCredentialsResponse(o,i),o})}useRefreshToken(i){return l(this,arguments,function*({state:t,timeoutInSeconds:e}){var n;let r=this._logger.create("useRefreshToken"),s;if(this.settings.refreshTokenAllowedScope===void 0)s=t.scope;else{let d=this.settings.refreshTokenAllowedScope.split(" ");s=(((n=t.scope)==null?void 0:n.split(" "))||[]).filter(h=>d.includes(h)).join(" ")}let o=yield this._tokenClient.exchangeRefreshToken({refresh_token:t.refresh_token,resource:t.resource,scope:s,timeoutInSeconds:e}),a=new xt(new URLSearchParams);return Object.assign(a,o),r.debug("validating response",a),yield this._validator.validateRefreshResponse(a,L(E({},t),{scope:s})),a})}createSignoutRequest(){return l(this,arguments,function*({state:t,id_token_hint:e,client_id:i,request_type:n,post_logout_redirect_uri:r=this.settings.post_logout_redirect_uri,extraQueryParams:s=this.settings.extraQueryParams}={}){let o=this._logger.create("createSignoutRequest"),a=yield this.metadataService.getEndSessionEndpoint();if(!a)throw o.throw(new Error("No end session endpoint")),null;o.debug("Received end session endpoint",a),!i&&r&&!e&&(i=this.settings.client_id);let d=new Yn({url:a,id_token_hint:e,client_id:i,post_logout_redirect_uri:r,state_data:t,extraQueryParams:s,request_type:n});yield this.clearStaleState();let c=d.state;return c&&(o.debug("Signout request has state to persist"),yield this.settings.stateStore.set(c.id,c.toStorageString())),d})}readSignoutResponseState(t,e=!1){return l(this,null,function*(){let i=this._logger.create("readSignoutResponseState"),n=new Zn(It.readParams(t,this.settings.response_mode));if(!n.state){if(i.debug("No state in response"),n.error)throw i.warn("Response was error:",n.error),new de(n);return{state:void 0,response:n}}let r=yield this.settings.stateStore[e?"remove":"get"](n.state);if(!r)throw i.throw(new Error("No matching state found in storage")),null;return{state:Ce.fromStorageString(r),response:n}})}processSignoutResponse(t){return l(this,null,function*(){let e=this._logger.create("processSignoutResponse"),{state:i,response:n}=yield this.readSignoutResponseState(t,!0);return i?(e.debug("Received state from storage; validating response"),this._validator.validateSignoutResponse(n,i)):e.debug("No state from storage; skipping response validation"),n})}clearStaleState(){return this._logger.create("clearStaleState"),Ce.clearStaleState(this.settings.stateStore,this.settings.staleStateAgeInSeconds)}revokeToken(t,e){return l(this,null,function*(){return this._logger.create("revokeToken"),yield this._tokenClient.revoke({token:t,token_type_hint:e})})}},rr=class{constructor(t){this._userManager=t,this._logger=new w("SessionMonitor"),this._start=e=>l(this,null,function*(){let i=e.session_state;if(!i)return;let n=this._logger.create("_start");if(e.profile?(this._sub=e.profile.sub,this._sid=e.profile.sid,n.debug("session_state",i,", sub",this._sub)):(this._sub=void 0,this._sid=void 0,n.debug("session_state",i,", anonymous user")),this._checkSessionIFrame){this._checkSessionIFrame.start(i);return}try{let r=yield this._userManager.metadataService.getCheckSessionIframe();if(r){n.debug("initializing check session iframe");let s=this._userManager.settings.client_id,o=this._userManager.settings.checkSessionIntervalInSeconds,a=this._userManager.settings.stopCheckSessionOnError,d=new jn(this._callback,s,r,o,a);yield d.load(),this._checkSessionIFrame=d,d.start(i)}else n.warn("no check session iframe found in the metadata")}catch(r){n.error("Error from getCheckSessionIframe:",r instanceof Error?r.message:r)}}),this._stop=()=>{let e=this._logger.create("_stop");if(this._sub=void 0,this._sid=void 0,this._checkSessionIFrame&&this._checkSessionIFrame.stop(),this._userManager.settings.monitorAnonymousSession){let i=setInterval(()=>l(this,null,function*(){clearInterval(i);try{let n=yield this._userManager.querySessionStatus();if(n){let r={session_state:n.session_state,profile:n.sub&&n.sid?{sub:n.sub,sid:n.sid}:null};this._start(r)}}catch(n){e.error("error from querySessionStatus",n instanceof Error?n.message:n)}}),1e3)}},this._callback=()=>l(this,null,function*(){let e=this._logger.create("_callback");try{let i=yield this._userManager.querySessionStatus(),n=!0;i&&this._checkSessionIFrame?i.sub===this._sub?(n=!1,this._checkSessionIFrame.start(i.session_state),i.sid===this._sid?e.debug("same sub still logged in at OP, restarting check session iframe; session_state",i.session_state):(e.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state",i.session_state),this._userManager.events._raiseUserSessionChanged())):e.debug("different subject signed into OP",i.sub):e.debug("subject no longer signed into OP"),n?this._sub?this._userManager.events._raiseUserSignedOut():this._userManager.events._raiseUserSignedIn():e.debug("no change in session detected, no event to raise")}catch(i){this._sub&&(e.debug("Error calling queryCurrentSigninSession; raising signed out event",i),this._userManager.events._raiseUserSignedOut())}}),t||this._logger.throw(new Error("No user manager passed")),this._userManager.events.addUserLoaded(this._start),this._userManager.events.addUserUnloaded(this._stop),this._init().catch(e=>{this._logger.error(e)})}_init(){return l(this,null,function*(){this._logger.create("_init");let t=yield this._userManager.getUser();if(t)this._start(t);else if(this._userManager.settings.monitorAnonymousSession){let e=yield this._userManager.querySessionStatus();if(e){let i={session_state:e.session_state,profile:e.sub&&e.sid?{sub:e.sub,sid:e.sid}:null};this._start(i)}}})}},Xe=class{constructor(t){var e;this.id_token=t.id_token,this.session_state=(e=t.session_state)!=null?e:null,this.access_token=t.access_token,this.refresh_token=t.refresh_token,this.token_type=t.token_type,this.scope=t.scope,this.profile=t.profile,this.expires_at=t.expires_at,this.state=t.userState,this.url_state=t.url_state}get expires_in(){if(this.expires_at!==void 0)return this.expires_at-j.getEpochTime()}set expires_in(t){t!==void 0&&(this.expires_at=Math.floor(t)+j.getEpochTime())}get expired(){let t=this.expires_in;if(t!==void 0)return t<=0}get scopes(){var t,e;return(e=(t=this.scope)==null?void 0:t.split(" "))!=null?e:[]}toStorageString(){return new w("User").create("toStorageString"),JSON.stringify({id_token:this.id_token,session_state:this.session_state,access_token:this.access_token,refresh_token:this.refresh_token,token_type:this.token_type,scope:this.scope,profile:this.profile,expires_at:this.expires_at})}static fromStorageString(t){return w.createStatic("User","fromStorageString"),new Xe(JSON.parse(t))}},xi="oidc-client",Mi=class{constructor(){this._abort=new re("Window navigation aborted"),this._disposeHandlers=new Set,this._window=null}navigate(t){return l(this,null,function*(){let e=this._logger.create("navigate");if(!this._window)throw new Error("Attempted to navigate on a disposed window");e.debug("setting URL in window"),this._window.location.replace(t.url);let{url:i,keepOpen:n}=yield new Promise((r,s)=>{let o=a=>{var d;let c=a.data,h=(d=t.scriptOrigin)!=null?d:window.location.origin;if(!(a.origin!==h||c?.source!==xi)){try{let p=It.readParams(c.url,t.response_mode).get("state");if(p||e.warn("no state found in response url"),a.source!==this._window&&p!==t.state)return}catch(p){this._dispose(),s(new Error("Invalid response from window"))}r(c)}};window.addEventListener("message",o,!1),this._disposeHandlers.add(()=>window.removeEventListener("message",o,!1)),this._disposeHandlers.add(this._abort.addHandler(a=>{this._dispose(),s(a)}))});return e.debug("got response from window"),this._dispose(),n||this.close(),{url:i}})}_dispose(){this._logger.create("_dispose");for(let t of this._disposeHandlers)t();this._disposeHandlers.clear()}static _notifyParent(t,e,i=!1,n=window.location.origin){t.postMessage({source:xi,url:e,keepOpen:i},n)}},Pi={location:!1,toolbar:!1,height:640,closePopupWindowAfterInSeconds:-1},Ri="_blank",sr=60,or=2,Vi=10,ar=class extends Tt{constructor(t){let{popup_redirect_uri:e=t.redirect_uri,popup_post_logout_redirect_uri:i=t.post_logout_redirect_uri,popupWindowFeatures:n=Pi,popupWindowTarget:r=Ri,redirectMethod:s="assign",redirectTarget:o="self",iframeNotifyParentOrigin:a=t.iframeNotifyParentOrigin,iframeScriptOrigin:d=t.iframeScriptOrigin,silent_redirect_uri:c=t.redirect_uri,silentRequestTimeoutInSeconds:h=Vi,automaticSilentRenew:p=!0,validateSubOnSilentRenew:g=!0,includeIdTokenInSilentRenew:m=!1,monitorSession:b=!1,monitorAnonymousSession:A=!1,checkSessionIntervalInSeconds:I=or,query_status_response_type:u="code",stopCheckSessionOnError:f=!0,revokeTokenTypes:_=["access_token","refresh_token"],revokeTokensOnSignout:v=!1,includeIdTokenInSilentSignout:k=!1,accessTokenExpiringNotificationTimeInSeconds:C=sr,userStore:y}=t;if(super(t),this.popup_redirect_uri=e,this.popup_post_logout_redirect_uri=i,this.popupWindowFeatures=n,this.popupWindowTarget=r,this.redirectMethod=s,this.redirectTarget=o,this.iframeNotifyParentOrigin=a,this.iframeScriptOrigin=d,this.silent_redirect_uri=c,this.silentRequestTimeoutInSeconds=h,this.automaticSilentRenew=p,this.validateSubOnSilentRenew=g,this.includeIdTokenInSilentRenew=m,this.monitorSession=b,this.monitorAnonymousSession=A,this.checkSessionIntervalInSeconds=I,this.stopCheckSessionOnError=f,this.query_status_response_type=u,this.revokeTokenTypes=_,this.revokeTokensOnSignout=v,this.includeIdTokenInSilentSignout=k,this.accessTokenExpiringNotificationTimeInSeconds=C,y)this.userStore=y;else{let x=typeof window<"u"?window.sessionStorage:new Qe;this.userStore=new Ye({store:x})}}},Mt=class t extends Mi{constructor({silentRequestTimeoutInSeconds:e=Vi}){super(),this._logger=new w("IFrameWindow"),this._timeoutInSeconds=e,this._frame=Mt.createHiddenIframe(),this._window=this._frame.contentWindow}static createHiddenIframe(){let e=window.document.createElement("iframe");return e.style.visibility="hidden",e.style.position="fixed",e.style.left="-1000px",e.style.top="0",e.width="0",e.height="0",window.document.body.appendChild(e),e}navigate(e){return l(this,null,function*(){this._logger.debug("navigate: Using timeout of:",this._timeoutInSeconds);let i=setTimeout(()=>this._abort.raise(new Pt("IFrame timed out without a response")),this._timeoutInSeconds*1e3);return this._disposeHandlers.add(()=>clearTimeout(i)),yield ht(t.prototype,this,"navigate").call(this,e)})}close(){var e;this._frame&&(this._frame.parentNode&&(this._frame.addEventListener("load",i=>{var n;let r=i.target;(n=r.parentNode)==null||n.removeChild(r),this._abort.raise(new Error("IFrame removed from DOM"))},!0),(e=this._frame.contentWindow)==null||e.location.replace("about:blank")),this._frame=null),this._window=null}static notifyParent(e,i){return super._notifyParent(window.parent,e,!1,i)}},lr=class{constructor(t){this._settings=t,this._logger=new w("IFrameNavigator")}prepare(e){return l(this,arguments,function*({silentRequestTimeoutInSeconds:t=this._settings.silentRequestTimeoutInSeconds}){return new Mt({silentRequestTimeoutInSeconds:t})})}callback(t){return l(this,null,function*(){this._logger.create("callback"),Mt.notifyParent(t,this._settings.iframeNotifyParentOrigin)})}},cr=500,dr=1e3,Ai=class t extends Mi{constructor({popupWindowTarget:e=Ri,popupWindowFeatures:i={}}){super(),this._logger=new w("PopupWindow");let n=Ci.center(E(E({},Pi),i));this._window=window.open(void 0,e,Ci.serialize(n)),i.closePopupWindowAfterInSeconds&&i.closePopupWindowAfterInSeconds>0&&setTimeout(()=>{if(!this._window||typeof this._window.closed!="boolean"||this._window.closed){this._abort.raise(new Error("Popup blocked by user"));return}this.close()},i.closePopupWindowAfterInSeconds*dr)}navigate(e){return l(this,null,function*(){var i;(i=this._window)==null||i.focus();let n=setInterval(()=>{(!this._window||this._window.closed)&&this._abort.raise(new Error("Popup closed by user"))},cr);return this._disposeHandlers.add(()=>clearInterval(n)),yield ht(t.prototype,this,"navigate").call(this,e)})}close(){this._window&&(this._window.closed||(this._window.close(),this._abort.raise(new Error("Popup closed")))),this._window=null}static notifyOpener(e,i){if(!window.opener)throw new Error("No window.opener. Can't complete notification.");return super._notifyParent(window.opener,e,i)}},ur=class{constructor(t){this._settings=t,this._logger=new w("PopupNavigator")}prepare(i){return l(this,arguments,function*({popupWindowFeatures:t=this._settings.popupWindowFeatures,popupWindowTarget:e=this._settings.popupWindowTarget}){return new Ai({popupWindowFeatures:t,popupWindowTarget:e})})}callback(i,n){return l(this,arguments,function*(t,{keepOpen:e=!1}){this._logger.create("callback"),Ai.notifyOpener(t,e)})}},hr=class{constructor(t){this._settings=t,this._logger=new w("RedirectNavigator")}prepare(i){return l(this,arguments,function*({redirectMethod:t=this._settings.redirectMethod,redirectTarget:e=this._settings.redirectTarget}){var n;this._logger.create("prepare");let r=window.self;e==="top"&&(r=(n=window.top)!=null?n:window.self);let s=r.location[t].bind(r.location),o;return{navigate:a=>l(this,null,function*(){this._logger.create("navigate");let d=new Promise((c,h)=>{o=h});return s(a.url),yield d}),close:()=>{this._logger.create("close"),o?.(new Error("Redirect aborted")),r.stop()}}})}callback(){return l(this,null,function*(){})}},pr=class extends Fn{constructor(t){super({expiringNotificationTimeInSeconds:t.accessTokenExpiringNotificationTimeInSeconds}),this._logger=new w("UserManagerEvents"),this._userLoaded=new re("User loaded"),this._userUnloaded=new re("User unloaded"),this._silentRenewError=new re("Silent renew error"),this._userSignedIn=new re("User signed in"),this._userSignedOut=new re("User signed out"),this._userSessionChanged=new re("User session changed")}load(t,e=!0){super.load(t),e&&this._userLoaded.raise(t)}unload(){super.unload(),this._userUnloaded.raise()}addUserLoaded(t){return this._userLoaded.addHandler(t)}removeUserLoaded(t){return this._userLoaded.removeHandler(t)}addUserUnloaded(t){return this._userUnloaded.addHandler(t)}removeUserUnloaded(t){return this._userUnloaded.removeHandler(t)}addSilentRenewError(t){return this._silentRenewError.addHandler(t)}removeSilentRenewError(t){return this._silentRenewError.removeHandler(t)}_raiseSilentRenewError(t){this._silentRenewError.raise(t)}addUserSignedIn(t){return this._userSignedIn.addHandler(t)}removeUserSignedIn(t){this._userSignedIn.removeHandler(t)}_raiseUserSignedIn(){this._userSignedIn.raise()}addUserSignedOut(t){return this._userSignedOut.addHandler(t)}removeUserSignedOut(t){this._userSignedOut.removeHandler(t)}_raiseUserSignedOut(){this._userSignedOut.raise()}addUserSessionChanged(t){return this._userSessionChanged.addHandler(t)}removeUserSessionChanged(t){this._userSessionChanged.removeHandler(t)}_raiseUserSessionChanged(){this._userSessionChanged.raise()}},gr=class{constructor(t){this._userManager=t,this._logger=new w("SilentRenewService"),this._isStarted=!1,this._retryTimer=new j("Retry Silent Renew"),this._tokenExpiring=()=>l(this,null,function*(){let e=this._logger.create("_tokenExpiring");try{yield this._userManager.signinSilent(),e.debug("silent token renewal successful")}catch(i){if(i instanceof Pt){e.warn("ErrorTimeout from signinSilent:",i,"retry in 5s"),this._retryTimer.init(5);return}e.error("Error from signinSilent:",i),this._userManager.events._raiseSilentRenewError(i)}})}start(){return l(this,null,function*(){let t=this._logger.create("start");if(!this._isStarted){this._isStarted=!0,this._userManager.events.addAccessTokenExpiring(this._tokenExpiring),this._retryTimer.addHandler(this._tokenExpiring);try{yield this._userManager.getUser()}catch(e){t.error("getUser error",e)}}})}stop(){this._isStarted&&(this._retryTimer.cancel(),this._retryTimer.removeHandler(this._tokenExpiring),this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring),this._isStarted=!1)}},fr=class{constructor(t,e){this.refresh_token=t.refresh_token,this.id_token=t.id_token,this.session_state=t.session_state,this.scope=t.scope,this.profile=t.profile,this.resource=e,this.data=t.state}},Oi=class{constructor(t,e,i,n){this._logger=new w("UserManager"),this.settings=new ar(t),this._client=new nr(t),this._redirectNavigator=e??new hr(this.settings),this._popupNavigator=i??new ur(this.settings),this._iframeNavigator=n??new lr(this.settings),this._events=new pr(this.settings),this._silentRenewService=new gr(this),this.settings.automaticSilentRenew&&this.startSilentRenew(),this._sessionMonitor=null,this.settings.monitorSession&&(this._sessionMonitor=new rr(this))}get events(){return this._events}get metadataService(){return this._client.metadataService}getUser(){return l(this,null,function*(){let t=this._logger.create("getUser"),e=yield this._loadUser();return e?(t.info("user loaded"),this._events.load(e,!1),e):(t.info("user not found in storage"),null)})}removeUser(){return l(this,null,function*(){let t=this._logger.create("removeUser");yield this.storeUser(null),t.info("user removed from storage"),this._events.unload()})}signinRedirect(){return l(this,arguments,function*(t={}){this._logger.create("signinRedirect");let r=t,{redirectMethod:e}=r,i=M(r,["redirectMethod"]),n=yield this._redirectNavigator.prepare({redirectMethod:e});yield this._signinStart(E({request_type:"si:r"},i),n)})}signinRedirectCallback(){return l(this,arguments,function*(t=window.location.href){let e=this._logger.create("signinRedirectCallback"),i=yield this._signinEnd(t);return i.profile&&i.profile.sub?e.info("success, signed in subject",i.profile.sub):e.info("no subject"),i})}signinResourceOwnerCredentials(n){return l(this,arguments,function*({username:t,password:e,skipUserInfo:i=!1}){let r=this._logger.create("signinResourceOwnerCredential"),s=yield this._client.processResourceOwnerPasswordCredentials({username:t,password:e,skipUserInfo:i,extraTokenParams:this.settings.extraTokenParams});r.debug("got signin response");let o=yield this._buildUser(s);return o.profile&&o.profile.sub?r.info("success, signed in subject",o.profile.sub):r.info("no subject"),o})}signinPopup(){return l(this,arguments,function*(t={}){let e=this._logger.create("signinPopup"),d=t,{popupWindowFeatures:i,popupWindowTarget:n}=d,r=M(d,["popupWindowFeatures","popupWindowTarget"]),s=this.settings.popup_redirect_uri;s||e.throw(new Error("No popup_redirect_uri configured"));let o=yield this._popupNavigator.prepare({popupWindowFeatures:i,popupWindowTarget:n}),a=yield this._signin(E({request_type:"si:p",redirect_uri:s,display:"popup"},r),o);return a&&(a.profile&&a.profile.sub?e.info("success, signed in subject",a.profile.sub):e.info("no subject")),a})}signinPopupCallback(){return l(this,arguments,function*(t=window.location.href,e=!1){let i=this._logger.create("signinPopupCallback");yield this._popupNavigator.callback(t,{keepOpen:e}),i.info("success")})}signinSilent(){return l(this,arguments,function*(t={}){var e;let i=this._logger.create("signinSilent"),h=t,{silentRequestTimeoutInSeconds:n,resource:r}=h,s=M(h,["silentRequestTimeoutInSeconds","resource"]),o=yield this._loadUser();if(o?.refresh_token){i.debug("using refresh token");let p=new fr(o,r);return yield this._useRefreshToken(p)}let a=this.settings.silent_redirect_uri;a||i.throw(new Error("No silent_redirect_uri configured"));let d;o&&this.settings.validateSubOnSilentRenew&&(i.debug("subject prior to silent renew:",o.profile.sub),d=o.profile.sub);let c=yield this._iframeNavigator.prepare({silentRequestTimeoutInSeconds:n});return o=yield this._signin(E({request_type:"si:s",redirect_uri:a,prompt:"none",id_token_hint:this.settings.includeIdTokenInSilentRenew?o?.id_token:void 0},s),c,d),o&&((e=o.profile)!=null&&e.sub?i.info("success, signed in subject",o.profile.sub):i.info("no subject")),o})}_useRefreshToken(t){return l(this,null,function*(){let e=yield this._client.useRefreshToken({state:t,timeoutInSeconds:this.settings.silentRequestTimeoutInSeconds}),i=new Xe(E(E({},t),e));return yield this.storeUser(i),this._events.load(i),i})}signinSilentCallback(){return l(this,arguments,function*(t=window.location.href){let e=this._logger.create("signinSilentCallback");yield this._iframeNavigator.callback(t),e.info("success")})}signinCallback(){return l(this,arguments,function*(t=window.location.href){let{state:e}=yield this._client.readSigninResponseState(t);switch(e.request_type){case"si:r":return yield this.signinRedirectCallback(t);case"si:p":return yield this.signinPopupCallback(t);case"si:s":return yield this.signinSilentCallback(t);default:throw new Error("invalid response_type in state")}})}signoutCallback(){return l(this,arguments,function*(t=window.location.href,e=!1){let{state:i}=yield this._client.readSignoutResponseState(t);if(i)switch(i.request_type){case"so:r":yield this.signoutRedirectCallback(t);break;case"so:p":yield this.signoutPopupCallback(t,e);break;case"so:s":yield this.signoutSilentCallback(t);break;default:throw new Error("invalid response_type in state")}})}querySessionStatus(){return l(this,arguments,function*(t={}){let e=this._logger.create("querySessionStatus"),d=t,{silentRequestTimeoutInSeconds:i}=d,n=M(d,["silentRequestTimeoutInSeconds"]),r=this.settings.silent_redirect_uri;r||e.throw(new Error("No silent_redirect_uri configured"));let s=yield this._loadUser(),o=yield this._iframeNavigator.prepare({silentRequestTimeoutInSeconds:i}),a=yield this._signinStart(E({request_type:"si:s",redirect_uri:r,prompt:"none",id_token_hint:this.settings.includeIdTokenInSilentRenew?s?.id_token:void 0,response_type:this.settings.query_status_response_type,scope:"openid",skipUserInfo:!0},n),o);try{let c=yield this._client.processSigninResponse(a.url);return e.debug("got signin response"),c.session_state&&c.profile.sub?(e.info("success for subject",c.profile.sub),{session_state:c.session_state,sub:c.profile.sub,sid:c.profile.sid}):(e.info("success, user not authenticated"),null)}catch(c){if(this.settings.monitorAnonymousSession&&c instanceof de)switch(c.error){case"login_required":case"consent_required":case"interaction_required":case"account_selection_required":return e.info("success for anonymous user"),{session_state:c.session_state}}throw c}})}_signin(t,e,i){return l(this,null,function*(){let n=yield this._signinStart(t,e);return yield this._signinEnd(n.url,i)})}_signinStart(t,e){return l(this,null,function*(){let i=this._logger.create("_signinStart");try{let n=yield this._client.createSigninRequest(t);return i.debug("got signin request"),yield e.navigate({url:n.url,state:n.state.id,response_mode:n.state.response_mode,scriptOrigin:this.settings.iframeScriptOrigin})}catch(n){throw i.debug("error after preparing navigator, closing navigator window"),e.close(),n}})}_signinEnd(t,e){return l(this,null,function*(){let i=this._logger.create("_signinEnd"),n=yield this._client.processSigninResponse(t);return i.debug("got signin response"),yield this._buildUser(n,e)})}_buildUser(t,e){return l(this,null,function*(){let i=this._logger.create("_buildUser"),n=new Xe(t);if(e){if(e!==n.profile.sub)throw i.debug("current user does not match user returned from signin. sub from signin:",n.profile.sub),new de(L(E({},t),{error:"login_required"}));i.debug("current user matches user returned from signin")}return yield this.storeUser(n),i.debug("user stored"),this._events.load(n),n})}signoutRedirect(){return l(this,arguments,function*(t={}){let e=this._logger.create("signoutRedirect"),s=t,{redirectMethod:i}=s,n=M(s,["redirectMethod"]),r=yield this._redirectNavigator.prepare({redirectMethod:i});yield this._signoutStart(E({request_type:"so:r",post_logout_redirect_uri:this.settings.post_logout_redirect_uri},n),r),e.info("success")})}signoutRedirectCallback(){return l(this,arguments,function*(t=window.location.href){let e=this._logger.create("signoutRedirectCallback"),i=yield this._signoutEnd(t);return e.info("success"),i})}signoutPopup(){return l(this,arguments,function*(t={}){let e=this._logger.create("signoutPopup"),a=t,{popupWindowFeatures:i,popupWindowTarget:n}=a,r=M(a,["popupWindowFeatures","popupWindowTarget"]),s=this.settings.popup_post_logout_redirect_uri,o=yield this._popupNavigator.prepare({popupWindowFeatures:i,popupWindowTarget:n});yield this._signout(E({request_type:"so:p",post_logout_redirect_uri:s,state:s==null?void 0:{}},r),o),e.info("success")})}signoutPopupCallback(){return l(this,arguments,function*(t=window.location.href,e=!1){let i=this._logger.create("signoutPopupCallback");yield this._popupNavigator.callback(t,{keepOpen:e}),i.info("success")})}_signout(t,e){return l(this,null,function*(){let i=yield this._signoutStart(t,e);return yield this._signoutEnd(i.url)})}_signoutStart(){return l(this,arguments,function*(t={},e){var i;let n=this._logger.create("_signoutStart");try{let r=yield this._loadUser();n.debug("loaded current user from storage"),this.settings.revokeTokensOnSignout&&(yield this._revokeInternal(r));let s=t.id_token_hint||r&&r.id_token;s&&(n.debug("setting id_token_hint in signout request"),t.id_token_hint=s),yield this.removeUser(),n.debug("user removed, creating signout request");let o=yield this._client.createSignoutRequest(t);return n.debug("got signout request"),yield e.navigate({url:o.url,state:(i=o.state)==null?void 0:i.id,scriptOrigin:this.settings.iframeScriptOrigin})}catch(r){throw n.debug("error after preparing navigator, closing navigator window"),e.close(),r}})}_signoutEnd(t){return l(this,null,function*(){let e=this._logger.create("_signoutEnd"),i=yield this._client.processSignoutResponse(t);return e.debug("got signout response"),i})}signoutSilent(){return l(this,arguments,function*(t={}){var e;let i=this._logger.create("signoutSilent"),d=t,{silentRequestTimeoutInSeconds:n}=d,r=M(d,["silentRequestTimeoutInSeconds"]),s=this.settings.includeIdTokenInSilentSignout?(e=yield this._loadUser())==null?void 0:e.id_token:void 0,o=this.settings.popup_post_logout_redirect_uri,a=yield this._iframeNavigator.prepare({silentRequestTimeoutInSeconds:n});yield this._signout(E({request_type:"so:s",post_logout_redirect_uri:o,id_token_hint:s},r),a),i.info("success")})}signoutSilentCallback(){return l(this,arguments,function*(t=window.location.href){let e=this._logger.create("signoutSilentCallback");yield this._iframeNavigator.callback(t),e.info("success")})}revokeTokens(t){return l(this,null,function*(){let e=yield this._loadUser();yield this._revokeInternal(e,t)})}_revokeInternal(i){return l(this,arguments,function*(t,e=this.settings.revokeTokenTypes){let n=this._logger.create("_revokeInternal");if(!t)return;let r=e.filter(s=>typeof t[s]=="string");if(!r.length){n.debug("no need to revoke due to no token(s)");return}for(let s of r)yield this._client.revokeToken(t[s],s),n.info(`${s} revoked successfully`),s!=="access_token"&&(t[s]=null);yield this.storeUser(t),n.debug("user stored"),this._events.load(t)})}startSilentRenew(){this._logger.create("startSilentRenew"),this._silentRenewService.start()}stopSilentRenew(){this._silentRenewService.stop()}get _userStoreKey(){return`user:${this.settings.authority}:${this.settings.client_id}`}_loadUser(){return l(this,null,function*(){let t=this._logger.create("_loadUser"),e=yield this.settings.userStore.get(this._userStoreKey);return e?(t.debug("user storageString loaded"),Xe.fromStorageString(e)):(t.debug("no user storageString"),null)})}storeUser(t){return l(this,null,function*(){let e=this._logger.create("storeUser");if(t){e.debug("storing user");let i=t.toStorageString();yield this.settings.userStore.set(this._userStoreKey,i)}else this._logger.debug("removing user"),yield this.settings.userStore.remove(this._userStoreKey)})}clearStaleState(){return l(this,null,function*(){yield this._client.clearStaleState()})}}});var ue,B,Ut=S(()=>{"use strict";ue="auth-js:oidc_manager:redirect_url",B={loginRequired:!1,loadUserInfo:!1,retrieveUserSession:!0,automaticSilentRenew:!0,automaticLoginOn401:!0,automaticInjectToken:{headerName:"Authorization",include:t=>{let e=new URL(t,"http://default-base");return e.hostname.startsWith("api")||e.pathname.startsWith("/api")||!1}},scope:"openid profile email phone",desktopNavigationType:"REDIRECT",logLevel:0,internal:{response_type:"code",redirect_uri:"?oidc-callback=login",post_logout_redirect_uri:"?oidc-callback=logout",popup_redirect_uri:"oidc/callback/popup_redirect.html",popup_post_logout_redirect_uri:"oidc/callback/popup_redirect.html",silent_redirect_uri:"oidc/callback/silent_redirect.html",mobileWindowPresentationStyle:"popover"}}});var xe,he,pe,se,Ze,Ui=S(()=>{"use strict";Q();xe=()=>window.localStorage,he=()=>window.Capacitor?.Plugins.Storage,pe=()=>window.Capacitor?.Plugins.Preferences,se=()=>window.Capacitor?.Plugins.SecureStoragePlugin,Ze=class{#e=new T("MobileStorage");constructor(){if(!se()){let e=`[@badisi/auth-js] This application is currently using an unsafe storage.

`;e+="\u24D8 Please follow the recommended guide and use `capacitor-secure-storage-plugin` instead.",this.#e.notif(e)}se()?this.#e.debug("Using `capacitor-secure-storage-plugin` implementation"):pe()?this.#e.debug("Using `@capacitor/preferences` implementation"):he()?this.#e.debug("Using `@capacitor/storage` implementation"):this.#e.debug("Using `localStorage` implementation")}get length(){return l(null,null,function*(){let e=se();if(e)return(yield e.keys()).value.length;let i=pe();if(i)return(yield i.keys()).keys.length;let n=he();return n?(yield n.keys()).keys.length:xe().length})}key(e){return l(this,null,function*(){let i=se();if(i)return(yield i.keys()).value[e];let n=pe();if(n)return(yield n.keys()).keys[e];let r=he();return r?(yield r.keys()).keys[e]:xe().key(e)})}clear(){return l(this,null,function*(){this.#e.debug("clear");let e=se();if(e){yield e.clear();return}let i=pe();if(i){yield i.clear();return}let n=he();if(n){yield n.clear();return}xe().clear()})}getItem(e){return l(this,null,function*(){this.#e.debug(`getItem('${e}')`);let i=se();if(i)try{return(yield i.get({key:e})).value}catch(s){return null}let n=pe();if(n)return(yield n.get({key:e})).value;let r=he();return r?(yield r.get({key:e})).value:xe().getItem(e)})}setItem(e,i){return l(this,null,function*(){this.#e.debug(`setItem('${e}')`);let n=se();if(n){yield n.set({key:e,value:i});return}let r=pe();if(r){yield r.set({key:e,value:i});return}let s=he();if(s){yield s.set({key:e,value:i});return}xe().setItem(e,i)})}removeItem(e){return l(this,null,function*(){this.#e.debug(`removeItem('${e}')`);let i=se();if(i){try{yield i.remove({key:e})}catch(s){}return}let n=pe();if(n){yield n.remove({key:e});return}let r=he();if(r){yield r.remove({key:e});return}xe().removeItem(e)})}}});var et,Li=S(()=>{"use strict";Q();et=class{#e=new T("OIDCAuthGuard");#t;constructor(e){this.#t=e}validate(e,i){return l(this,null,function*(){let n=i?.fallbackUrl??this.#t.getSettings().authGuardFallbackUrl;if(n=n?.trim()!==""?n:void 0,yield this.#t.isAuthenticated()){let s=yield this.#i(i?.validator);return!s&&n?n:s}else return n??(yield this.#t.login({redirectUrl:e}))})}#i(e){return l(this,null,function*(){if(typeof e=="function"){let i=yield this.#t.getUserProfile(),n=yield this.#t.getAccessTokenDecoded();return yield Promise.resolve(e(i,n))}else if(e)return this.#e.error("`authGuardValidator` must be a function"),!1;return!0})}}});var tt,Ni=S(()=>{"use strict";Q();tt=class{#e=new T("OIDCAuthInterceptor");#t;#i;#a=window.fetch;#s=XMLHttpRequest.prototype.open;#l=XMLHttpRequest.prototype.send;constructor(e,i){this.#e.debug("init"),this.#t=e,this.#i=i,this.#g(),this.#p()}#u(e){try{return new URL(e).href}catch(i){return new URL(`${location.origin}${e.startsWith("/")?"":"/"}${e}`).href}}#n(e,i){let n=this.#u(e);if(typeof i=="function")return i(n);if(typeof i=="string"){let r=i.replace(/\//g,"\\/").replace(/\./g,"\\.").replace(/\*\*/g,"*").replace(/\*/g,".*");return new RegExp(r).exec(n)!==null}else return i.exec(n)!==null}#h(e,i){let n=typeof i=="boolean"?i:!1;if(n){let r=this.#i.metadataService._metadata;if(!r&&e.includes(this.#t.getSettings().authorityUrl))this.#e.debug("matching authority domain but no metadata available yet"),n=!1;else if(r&&this.#t.isRenewing())this.#e.debug("matching authority domain but no token available yet"),n=!1;else if(r){let s=[r.authorization_endpoint,r.token_endpoint].find(o=>o&&e.includes(o));s&&(this.#e.debug("matching blacklisted authority url:",s),n=!1)}}if(typeof i=="object"){let{include:r,exclude:s}=i;if(Array.isArray(r)){let o=r.find(a=>this.#n(e,a));o&&(this.#e.debug("matching include pattern:",o),n=!0)}else r&&(n=this.#n(e,r),n&&this.#e.debug("matching include pattern:",r));if(Array.isArray(s)){let o=s.some(a=>this.#n(e,a));o&&(this.#e.debug("matching exclude pattern:",o),n=!1)}else s&&this.#n(e,s)&&(this.#e.debug("matching exclude pattern:",s),n=!1)}return n}#c(e){let i=this.#t.getSettings().automaticInjectToken??!1;return i!==!1&&this.#h(e,i)}#d(){let e=this.#t.getSettings().automaticInjectToken;return typeof e!="boolean"&&e?.headerName?e.headerName:"Authorization"}#g(e=!0){let i=this.#e.createChild("monkeyPathFetch");i.debug(e?"enabling..":"disabling.."),window.fetch&&(e?window.fetch=(n,r)=>l(this,null,function*(){let s=n instanceof Request?n.url:n.toString();if(this.#e.debug("received FETCH url:",s),this.#c(s)){let a=yield this.#t.getAccessToken();if(r&&a){let d=this.#d();this.#e.debug(`adding "${d}" bearer to header request`),Array.isArray(r.headers)?r.headers.push([d,`Bearer ${a}`]):r.headers instanceof Headers?r.headers.append(d,`Bearer ${a}`):r.headers=L(E({},r.headers),{[d]:`Bearer ${a}`})}}let o=yield this.#a.apply(window,[n,r]);return o.status===401&&(this.#t.getSettings().automaticLoginOn401??!1)&&((yield this.#t.isAuthenticated())||(yield this.#t.login())),o}):window.fetch=this.#a,i.debug("done"))}#p(e=!0){let i=this.#e.createChild("monkeyPatchXmlHttpRequest");if(i.debug(e?"enabling..":"disabling.."),XMLHttpRequest.prototype.open&&XMLHttpRequest.prototype.send){if(e){let n=this;XMLHttpRequest.prototype.open=function(r,s,...o){this.url=s,n.#s.apply(this,[r,s,...o])},XMLHttpRequest.prototype.send=function(r){let s=typeof this.url=="string"?this.url:this.url?.href;n.#e.debug("received XHR url:",s);let o=this.onreadystatechange;this.onreadystatechange=d=>{o?.apply(this,[d]),this.readyState===XMLHttpRequest.DONE&&this.status===401&&(n.#t.getSettings().automaticLoginOn401??!1)&&n.#t.isAuthenticated().then(h=>{h||n.#t.login()})};let a=s?n.#c(s):!1;this.readyState===XMLHttpRequest.OPENED&&a?n.#t.getAccessToken().then(d=>{if(d){let c=n.#d();n.#e.debug(`adding "${c}" bearer to header request`),this.setRequestHeader(c,`Bearer ${d}`)}}).catch(d=>{n.#e.error(d)}).finally(()=>{n.#l.apply(this,[r])}):n.#l.apply(this,[r])}}else XMLHttpRequest.prototype.open=this.#s,XMLHttpRequest.prototype.send=this.#l;i.debug("done")}}}});var mr,vr,Ae,Lt,it,Fi=S(()=>{"use strict";Q();mr=10*1e3,vr=()=>window.Capacitor?.Plugins.App,Ae=()=>window.Capacitor?.Plugins.Browser,Lt=()=>{},it=class{constructor(e,i){this.redirectUrl=e;this.params=i;if(!Se()&&!we())throw this.#e.notif("\u24D8 Please follow the installation guide and install either `Capacitor` or `Cordova` dependency."),this.#e.getError("Required core dependency `Capacitor` or `Cordova` not found");if(!Lt()&&!Ae())throw this.#e.notif("\u24D8 Please follow the installation guide and install `@capacitor/browser` plugin."),this.#e.getError("Required browser plugin not found");Lt()?this.#e.debug("Using `@badisi/capacitor-browsertab` implementation"):Ae()&&this.#e.debug("Using `@capacitor/browser` implementation")}redirectUrl;params;#e=new T("MobileWindow");#t=this.#e.createChild("navigate");#i;#a;#s=window.handleOpenURL;#l;#u;#n;#h=!0;#c=!1;navigate(e){return l(this,null,function*(){return this.#t.debug(e.url),this.#h=!1,this.#c=!1,new Promise((i,n)=>{this.#u=i,this.#n=n,this.#o().then(()=>{Lt()?this.#v(e):Ae()&&this.#m(e)})})})}close(){return l(this,null,function*(){let e=this.#e.createChild("cleanup");e.debug("begin"),this.#h||(yield Ae()?.close().catch(i=>{e.error(i)})),e.debug("success")})}#d(){return l(this,null,function*(){let e=this.#e.createChild("cleanup");e.debug("begin"),window.handleOpenURL=this.#s,yield this.#a?.remove(),yield this.#i?.remove(),clearTimeout(this.#l),e.debug("success")})}#g(e){return l(this,null,function*(){this.#t.error("error response:",e),yield this.close(),yield this.#d(),this.#n?.(new Error(e)),this.#c=!0})}#p(e){return l(this,null,function*(){this.#t.debug("successful response:",e),yield this.close(),yield this.#d(),this.#u?.({url:e}),this.#c=!0})}#m(e){return l(this,null,function*(){this.#a=yield Ae()?.addListener("browserFinished",()=>{this.#h=!0,window.setTimeout(()=>{this.#c||(this.#d(),this.#n?.("Capacitor browser closed by user"))},1e3)}),yield Ae()?.open({url:e.url,toolbarColor:this.params.mobileWindowToolbarColor,presentationStyle:this.params.mobileWindowPresentationStyle,width:this.params.mobileWindowWidth,height:this.params.mobileWindowWidth})})}#v(e){return l(this,null,function*(){})}#o(){return l(this,null,function*(){let e=this.#e.createChild("installCustomUrlSchemeHandler");this.#l=window.setTimeout(()=>{this.#g("Installing custom url scheme handler, timed out without a response")},mr),yield this.#d(),Se()?(e.debug("listening to Capacitor `appUrlOpen` event"),this.#i=yield vr()?.addListener("appUrlOpen",({url:i})=>{ne(i,this.redirectUrl)&&this.#p(i)})):we()&&(e.debug("waiting for Cordova `handleOpenURL` callback"),window.handleOpenURL=i=>{this.#s?.(i),ne(i,this.redirectUrl)&&this.#p(i)}),e.debug("success")})}}});var nt,ji=S(()=>{"use strict";Q();Fi();nt=class{#e=new T("MobileNavigator");prepare(e,i){return this.#e.debug("prepare"),new it(e,i)}}});var rt,Hi=S(()=>{"use strict";Ot();ji();rt=class extends Oi{constructor(i){super(E({authority:i.authorityUrl,client_id:i.clientId,scope:i.scope,loadUserInfo:i.loadUserInfo,automaticSilentRenew:i.automaticSilentRenew},i.internal));this.libSettings=i;this.#e=new nt}libSettings;#e;signoutMobile(){return l(this,arguments,function*(i={}){let n=this._logger.create("signout"),p=i,{mobileWindowToolbarColor:r,mobileWindowPresentationStyle:s,mobileWindowWidth:o,mobileWindowHeight:a}=p,d=M(p,["mobileWindowToolbarColor","mobileWindowPresentationStyle","mobileWindowWidth","mobileWindowHeight"]),c={mobileWindowToolbarColor:r??this.libSettings.internal?.mobileWindowToolbarColor,mobileWindowPresentationStyle:s??this.libSettings.internal?.mobileWindowPresentationStyle,mobileWindowWidth:o??this.libSettings.internal?.mobileWindowWidth,mobileWindowHeight:a??this.libSettings.internal?.mobileWindowHeight},h=this.#e.prepare(this.settings.post_logout_redirect_uri,c);yield this._signout(E({request_type:"so:m",post_logout_redirect_uri:this.settings.post_logout_redirect_uri},d),h),n.info("success")})}signinMobile(){return l(this,arguments,function*(i={}){let n=this._logger.create("signin"),g=i,{mobileWindowToolbarColor:r,mobileWindowPresentationStyle:s,mobileWindowWidth:o,mobileWindowHeight:a}=g,d=M(g,["mobileWindowToolbarColor","mobileWindowPresentationStyle","mobileWindowWidth","mobileWindowHeight"]),c={mobileWindowToolbarColor:r??this.libSettings.internal?.mobileWindowToolbarColor,mobileWindowPresentationStyle:s??this.libSettings.internal?.mobileWindowPresentationStyle,mobileWindowWidth:o??this.libSettings.internal?.mobileWindowWidth,mobileWindowHeight:a??this.libSettings.internal?.mobileWindowHeight},h=this.#e.prepare(this.settings.redirect_uri,c),p=yield this._signin(E({request_type:"si:m",redirect_uri:this.settings.redirect_uri},d),h);p.profile.sub?n.info("success, signed in subject",p.profile.sub):n.info("no subject")})}}});var st,Bi=S(()=>{"use strict";Q();Ot();Ut();Ui();Li();Ni();Hi();st=class extends be{#e=new T("OIDCAuthManager");#t=new F;#i=new F;#a=new F;#s=new F;#l=new F;#u=new F;#n=new F;#h=[];#c;#d;#g;#p;#m=!1;#v=!1;#o;#r=B;#w;set user(e){this.#w!==e&&(this.#w=e,this.#c=e?e.id_token:void 0,this.#d=e?e.access_token:void 0,this.#g=e?.profile??void 0,this.#p=e?{expired:e.expired,expires_in:e.expires_in,expires_at:e.expires_at,token_type:e.token_type,scope:e.scope,scopes:e.scopes,session_state:e.session_state}:void 0,this.#m=!!(e&&!e.expired),this.#t.notify(this.#c),this.#i.notify(this.#d),this.#a.notify(this.#g),this.#s.notify(this.#p),this.#l.notify(this.#m))}init(e){return l(this,null,function*(){let i=e.logLevel??B.logLevel;ce.setLogger(console),ce.setLevel(i),T.setLogLevel(i);let n=Ee();if(n&&!e.mobileScheme)throw this.#e.getError("Parameter `mobileScheme` is required for mobile platform");let r=n?`${e.mobileScheme}://localhost/`:le();if(this.#r=Te({},B,{internal:{userStore:new Ye({store:n?new Ze:new Qe}),redirect_uri:`${r}${B.internal.redirect_uri}`,post_logout_redirect_uri:`${r}${B.internal.post_logout_redirect_uri}`,popup_redirect_uri:`${r}${B.internal.popup_redirect_uri}`,popup_post_logout_redirect_uri:`${r}${B.internal.popup_post_logout_redirect_uri}`,silent_redirect_uri:`${r}${B.internal.silent_redirect_uri}`}},e),this.#A(),this.#o=new rt(this.#r),(this.#r.automaticLoginOn401||this.#r.automaticInjectToken)&&new tt(this,this.#o),this.#h.push(this.#o.events.addUserLoaded(s=>{this.user=s}),this.#o.events.addUserUnloaded(()=>{this.#w&&(this.user=null,this.#r.loginRequired&&location.reload())}),this.#o.events.addSilentRenewError(()=>l(this,null,function*(){yield this.#y()}))),ne(location.href,this.#r.internal?.redirect_uri))yield this.#S(()=>l(this,null,function*(){let s=sessionStorage.getItem(ue);yield this.#E(()=>this.#o.signinRedirectCallback(location.href),s),sessionStorage.removeItem(ue)}));else if(ne(location.href,this.#r.internal?.post_logout_redirect_uri))yield this.#S(()=>l(this,null,function*(){let s=sessionStorage.getItem(ue);yield this.#C(()=>this.#o.signoutRedirectCallback(location.href),s),sessionStorage.removeItem(ue)}));else if(this.#r.retrieveUserSession||this.#r.loginRequired){let s=yield this.#o.getUser();!s||s.expired?!n&&this.#r.retrieveUserSession?yield this.#S(()=>this.#x().catch(o=>l(this,null,function*(){let{error:a,message:d}=o;if(this.#r.loginRequired&&(a?.includes("_required")||d.includes("_required")))yield this.login();else if(this.#e.warn("User's session cannot be retrieved:",d),this.#l.notify(!1),this.#r.loginRequired)throw o}))):this.#r.loginRequired?yield this.login():this.user=null:this.user=s}else this.user=null})}logout(e){return l(this,null,function*(){let i=e?.redirectUrl??location.href;if(Ee())yield this.#C(()=>this.#o.signoutMobile(e),i);else switch(e?.desktopNavigationType??this.#r.desktopNavigationType){case"POPUP":yield this.#C(()=>this.#o.signoutPopup(e),i);break;case"REDIRECT":default:sessionStorage.setItem(ue,i),yield this.#o?.signoutRedirect(e);break}})}login(e){return l(this,null,function*(){let i=e?.redirectUrl??location.href;if(Ee())yield this.#E(()=>this.#o.signinMobile(e),i);else switch(e?.desktopNavigationType??this.#r.desktopNavigationType){case"POPUP":yield this.#E(()=>this.#o.signinPopup(e),i);break;case"REDIRECT":default:sessionStorage.setItem(ue,i),yield this.#o?.signinRedirect(e);break}return this.#m})}renew(e){return l(this,null,function*(){return this.#x(e).catch(i=>{this.#e.error(i)})})}getSettings(){return this.#r}isRenewing(){return this.#v}isAuthenticated(){return l(this,null,function*(){return yield this.#f("isAuthenticated()"),this.#m})}runGuard(e,i){return l(this,null,function*(){return new et(this).validate(e,i)})}getUserProfile(){return l(this,null,function*(){return yield this.#f("getUserProfile()"),this.#g})}getUserSession(){return l(this,null,function*(){return yield this.#f("getUserSession()"),this.#p})}getIdToken(){return l(this,null,function*(){return yield this.#f("getIdToken()"),this.#c})}getIdTokenDecoded(){return l(this,null,function*(){return yield this.#f("getIdTokenDecoded()"),ie(this.#c)})}getAccessToken(){return l(this,null,function*(){return yield this.#f("getAccessToken()"),this.#d})}getAccessTokenDecoded(){return l(this,null,function*(){return yield this.#f("getAccessTokenDecoded()"),ie(this.#d)})}destroy(){this.#t.unsubscribe(),this.#i.unsubscribe(),this.#a.unsubscribe(),this.#s.unsubscribe(),this.#l.unsubscribe(),this.#u.unsubscribe(),this.#n.unsubscribe(),this.#h.forEach(e=>{e()})}onIdTokenChanged(e,i){return this.#t.add(e,i)}onAccessTokenChanged(e,i){return this.#i.add(e,i)}onUserProfileChanged(e,i){return this.#a.add(e,i)}onUserSessionChanged(e,i){return this.#s.add(e,i)}onAuthenticatedChanged(e,i){return this.#l.add(e,i)}onRenewingChanged(e,i){return this.#u.add(e,i)}onRedirect(e,i){return this.#n.add(e,i)}#A(){[this.#r.internal?.silent_redirect_uri,this.#r.internal?.popup_redirect_uri].forEach(e=>{let i=new RegExp(/^.*\/(.*).html$/gm).exec(e??"")?.[1],n=new Error(`${e??"redirect uri"} was not found.`);if(n.stack=void 0,ne(location.href,e))throw this.#e.notif("\u24D8 Encountered an error that usually means you forgot to include the redirect html files in your application assets."),n;if(i&&location.href.includes(`/${i}.html`))throw this.#e.notif("\u24D8 Encountered an error that usually means your redirect urls are misconfigured."),n})}#f(e){return l(this,null,function*(){let i=Date.now();for(;this.#v;){if(Date.now()>i+5e3){this.#e.error(`\`${e}\``,"timed out waiting for renew to finish.");break}yield new Promise(n=>window.setTimeout(n,100))}})}#k(e){let i=We(e??"/");this.#r.loginRequired&&location.origin===i.origin&&location.reload()}#_(e){this.#v=e,this.#u.notify(e)}#S(e){return l(this,null,function*(){this.#r.loginRequired?yield e():e()})}#b(e,i){return l(this,null,function*(){i&&(this.#e.error(i),yield this.#y());let n=We(e??"/");location.origin===n.origin?(history.replaceState(history.state,"",n.href),this.#n.notify(n)):location.href=n.href})}#y(){return l(this,null,function*(){this.user=null,yield Promise.all([this.#o?.clearStaleState(),this.#o?.removeUser()])})}#x(e){return l(this,null,function*(){this.#_(!0);try{yield this.#o?.signinSilent(e)}catch(i){throw yield this.#y(),i}finally{this.#_(!1)}})}#E(e,i){return l(this,null,function*(){try{this.#_(!0),yield e().catch(n=>{let r=n;throw r.message==="Attempted to navigate on a disposed window"&&(this.#e.notif("\u24D8 Encountered an error that may be due to an ad blocker."),r.stack=void 0),r}),yield this.#b(i)}catch(n){throw yield this.#b("/",n),n}finally{this.#_(!1)}})}#C(e,i){return l(this,null,function*(){try{yield e().catch(n=>{let r=n;throw r.message==="Attempted to navigate on a disposed window"&&(this.#e.notif("\u24D8 Encountered an error that may be due to an ad blocker."),r.stack=void 0),r}),yield this.#b(i),yield this.#y()}catch(n){throw i="/",yield this.#b(i,n),n}finally{this.#k(i)}})}}});var Nt,qi=S(()=>{"use strict";Q();Bi();Nt=(t,e="@badisi/auth-js")=>l(null,null,function*(){return T.setLibName(e),yield Ct(t,st)})});var Pe,$i=S(()=>{"use strict";Pe=class{manager;constructor(e){this.manager=e}login(e){return l(this,null,function*(){return this.manager.login(e)})}logout(e){return l(this,null,function*(){return this.manager.logout(e)})}renew(e){return l(this,null,function*(){return this.manager.renew(e)})}isRenewing(){return this.manager.isRenewing()}isAuthenticated(){return l(this,null,function*(){return this.manager.isAuthenticated()})}getSettings(){return this.manager.getSettings()}getUserProfile(){return l(this,null,function*(){return this.manager.getUserProfile()})}getUserSession(){return l(this,null,function*(){return this.manager.getUserSession()})}getIdToken(){return l(this,null,function*(){return this.manager.getIdToken()})}getIdTokenDecoded(){return l(this,null,function*(){return this.manager.getIdTokenDecoded()})}getAccessToken(){return l(this,null,function*(){return this.manager.getAccessToken()})}getAccessTokenDecoded(){return l(this,null,function*(){return this.manager.getAccessTokenDecoded()})}runGuard(e,i){return l(this,null,function*(){return this.manager.runGuard(e,i)})}}});var Ft=S(()=>{"use strict";qi();$i();Q();});var jt,_r,br,Ht=S(()=>{"use strict";te();Ft();jt=new je("AUTH_MANAGER"),_r=t=>l(null,null,function*(){return{provide:jt,useValue:yield Nt(t,"@badisi/ngx-auth"),multi:!1}}),br=t=>ei([t])});var ge,Bt=S(()=>{"use strict";te();yt();Ft();Dn();Ht();te();ge=class t extends Pe{#e=[];#t=new ae(1);#i=new ae(1);#a=new ae(1);#s=new ae(1);#l=new ae(1);#u=new ae(1);#n=N(ti);#h=N(_e);constructor(){super(N(jt)),this.#c()}ngOnDestroy(){this.#e.forEach(e=>{e.unsubscribe()})}isRenewing$=this.#u.asObservable().pipe(X());isAuthenticated$=this.#l.asObservable().pipe(X());userProfile$=this.#a.asObservable().pipe(X());userSession$=this.#s.asObservable().pipe(X());idToken$=this.#t.asObservable().pipe(X());idTokenDecoded$=this.#t.asObservable().pipe(X(),pt(e=>ie(e)));accessToken$=this.#i.asObservable().pipe(X());accessTokenDecoded$=this.#i.asObservable().pipe(X(),pt(e=>ie(e)));#c(){this.#e.push(this.manager.onIdTokenChanged(e=>{this.#n.run(()=>{this.#t.next(e)})}),this.manager.onAccessTokenChanged(e=>{this.#n.run(()=>{this.#i.next(e)})}),this.manager.onUserProfileChanged(e=>{this.#n.run(()=>{this.#a.next(e)})}),this.manager.onUserSessionChanged(e=>{this.#n.run(()=>{this.#s.next(e)})}),this.manager.onAuthenticatedChanged(e=>{this.#n.run(()=>{this.#l.next(e)})}),this.manager.onRenewingChanged(e=>{this.#n.run(()=>{this.#u.next(e)})}),this.manager.onRedirect(e=>{this.#h.getCurrentNavigation()||this.#n.run(()=>{let i=e.href.replace(le(),"");i.startsWith("#")&&(i=i.slice(1)),this.#h.navigateByUrl(i)})}))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=gt({token:t,factory:t.\u0275fac,providedIn:"root"})}});var ke,Gi=S(()=>{"use strict";te();yt();Bt();ke=t=>(e,i)=>l(null,null,function*(){let n=N(ge),r=N(_e),s=Array.isArray(i)?r.getCurrentNavigation()?.extractedUrl.toString():i.url,o=yield n.runGuard(s??location.href,t);return typeof o=="string"?r.parseUrl(o):o})});var zi=S(()=>{"use strict";Gi();Ht();Bt();});var qt=S(()=>{"use strict";zi();});var Ki,Ji=S(()=>{Ki={name:"@badisi/auth-js",version:"1.1.6",description:"Authentication and authorization support for web based desktop and mobile applications.",homepage:"https://github.com/Badisi/auth-js/tree/main/libs/auth-js",license:"GPL-3.0-only",author:"Badisi",sideEffects:!1,repository:{type:"git",url:"git+https://github.com/Badisi/auth-js.git"},keywords:["ionic","capacitor","cordova","hybrid","authentication","authorization","oidc","openidconnect","openid","security","identity","oauth2","oauth","auth","authn","web","mobile"],scripts:{lint:"nx run auth-js:lint",test:"nx run auth-js:test","test:ci":"nx run auth-js:test",build:"nx run auth-js:build",release:"node ../../scripts/release.mjs --projects=auth-js --verbose","release:dry-run":"npm run release -- --dry-run"},dependencies:{"jwt-decode":"^3.1.2","oidc-client-ts":"2.4.0"},devDependencies:{"@types/cordova":"^11.0.3"},publishConfig:{access:"public"},exports:{".":{development:"./core/index.ts",import:{types:"./core/index.d.mts",default:"./core/index.mjs"},require:{types:"./core/index.d.cts",default:"./core/index.cjs"}},"./oidc":{development:"./oidc/index.ts",import:{types:"./oidc/index.d.mts",default:"./oidc/index.mjs"},require:{types:"./oidc/index.d.cts",default:"./oidc/index.cjs"}},"./iife":"./core/index.iife.js","./iife.min":"./core/index.iife.min.js","./oidc/iife":"./oidc/index.iife.js","./oidc/iife.min":"./oidc/index.iife.min.js","./package.json":"./package.json"}}});var Qi,Xi=S(()=>{Qi={name:"@badisi/auth-vue",version:"1.0.7",description:"Authentication and authorization support for Vue.js based desktop and mobile applications.",homepage:"https://github.com/Badisi/auth-js/tree/main/libs/auth-vue",license:"GPL-3.0-only",author:"Badisi",sideEffects:!1,repository:{type:"git",url:"git+https://github.com/Badisi/auth-js.git"},keywords:["vue","vue.js","ionic","capacitor","cordova","hybrid","authentication","authorization","oidc","openidconnect","openid","security","identity","oauth2","oauth","auth","authn","web","mobile"],scripts:{lint:"nx run auth-vue:lint",test:"nx run auth-vue:test","test:ci":"nx run auth-vue:test",build:"nx run auth-vue:build",release:"node ../../scripts/release.mjs --projects=auth-vue --verbose","release:dry-run":"npm run release -- --dry-run"},dependencies:{"@badisi/auth-js":"1.1.6"},peerDependencies:{vue:">= 3","vue-router":">= 4"},publishConfig:{access:"public"},main:"./index.cjs",module:"./index.mjs",types:"./index.d.cts",exports:{".":{development:"./core/index.ts",import:{types:"./index.d.mts",default:"./index.mjs"},require:{types:"./index.d.cts",default:"./index.cjs"}},"./iife":"./index.iife.js","./iife.min":"./index.iife.min.js","./package.json":"./package.json"}}});var Zi,Yi=S(()=>{Zi={name:"@badisi/ngx-auth",version:"4.0.7",description:"Authentication and authorization support for Angular based desktop and mobile applications.",homepage:"https://github.com/Badisi/auth-js/tree/main/libs/ngx-auth",license:"GPL-3.0-only",author:"Badisi",repository:{type:"git",url:"git+https://github.com/Badisi/auth-js.git"},keywords:["angular","ionic","capacitor","cordova","hybrid","authentication","authorization","oidc","openidconnect","openid","security","identity","oauth2","oauth","auth","authn","web","mobile"],scripts:{lint:"nx run ngx-auth:lint",test:"nx run ngx-auth:test","test:ci":"nx run ngx-auth:test",build:"nx run ngx-auth:build",release:"node ../../scripts/release.mjs --projects=ngx-auth --verbose","release:dry-run":"npm run release -- --dry-run"},dependencies:{"@hug/ngx-schematics-utilities":"^12.2.0","@badisi/auth-js":"1.1.6",tslib:"^2.8.1"},peerDependencies:{"@angular/common":">= 15","@angular/core":">= 15","@angular/router":">= 15",rxjs:"^6.5.3 || ^7.4.0"},publishConfig:{access:"public"},schematics:"./schematics/collection.json","ng-add":{save:"dependencies"}}});var en,Re,Er,Cr,xr,tn,ot=S(()=>{"use strict";Ji();Xi();Yi();Ut();en=[{label:"VanillaJS",demoUrl:"https://badisi.github.io/auth-js/demo-app/auth-js",version:Ki.version},{label:"Angular",demoUrl:"https://badisi.github.io/auth-js/demo-app/ngx-auth",version:Zi.version},{label:"Vue.js",demoUrl:"https://badisi.github.io/auth-js/demo-app/auth-vue",version:Qi.version}],Re=L(E({},B),{automaticInjectToken:{headerName:"Authorization",include:["/api"]}}),Er={name:"Auth0",otherSettings:{apiUrl:"https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|631b171682c639d40cb84d5c",apiHeaders:"",roles:"view-profile"},librarySettings:L(E({},Re),{authorityUrl:"https://dev-fijd1e9x.us.auth0.com",clientId:"kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt",mobileScheme:"demo-app",loadUserInfo:!0,scope:"openid profile email phone offline_access read:current_user",internal:{extraQueryParams:{audience:"https://dev-fijd1e9x.us.auth0.com/api/v2/"}}})},Cr={name:"Zitadel",otherSettings:{apiUrl:"http://localhost:8080/api/my-api",apiHeaders:"",roles:"view-profile"},librarySettings:L(E({},Re),{authorityUrl:"https://auth-js-0pdipf.zitadel.cloud",clientId:"178200751804317953@demo-app",mobileScheme:"demo-app",loadUserInfo:!0,scope:"openid profile email phone offline_access",internal:{extraQueryParams:{login_hint:"demo"}}})},xr={name:"Keycloak (local)",otherSettings:{apiUrl:"http://localhost:8080/api/my-api",apiHeaders:"",roles:"view-profile"},librarySettings:L(E({},Re),{authorityUrl:"http://localhost:8080/auth/realms/demo",clientId:"demo-app",mobileScheme:"demo-app",loadUserInfo:!0})},tn=(t=!1)=>[Er,Cr,...t?[xr]:[]]});var nn,$t=S(()=>{"use strict";nn=[{name:"authorityUrl",label:"Authority url",type:"string",required:!0},{name:"clientId",label:"Client id",type:"string",required:!0},{name:"mobileScheme",label:"Custom mobile scheme name",type:"string"},{name:"scope",label:"Scope",type:"string",placeholder:"ex: openid profile email phone offline_access"},{name:"internal.extraQueryParams",label:"Extra query params",type:"json",placeholder:'ex: {"audience":"value"}'},{name:"authGuardFallbackUrl",label:"AuthGuard fallback url",type:"string",placeholder:"ex: forbidden"},{name:"desktopNavigationType",label:"Desktop navigation type",type:"list",values:[{label:"REDIRECT",value:"REDIRECT"},{label:"POPUP",value:"POPUP"}]},{name:"logLevel",label:"Log level",type:"list",values:[{label:"NONE",value:0},{label:"ERROR",value:1},{label:"WARN",value:2},{label:"INFO",value:3},{label:"DEBUG",value:4}]},{name:"loginRequired",label:"Login required",type:"boolean"},{name:"retrieveUserSession",label:"Retrieve user's session",type:"boolean"},{name:"loadUserInfo",label:"Load user's info",type:"boolean"},{name:"automaticSilentRenew",label:"Automatic silent renew",type:"boolean"},{name:"automaticInjectToken",label:"Automatic inject token",type:"boolean"},{name:"automaticInjectToken.headerName",label:"Header name",type:"string"},{name:"automaticInjectToken.include",label:"Include url(s)",type:"string",placeholder:"ex: http://localhost, /pathname"},{name:"automaticInjectToken.exclude",label:"Exclude url(s)",type:"string",placeholder:"ex: http://localhost, /pathname"},{name:"automaticLoginOn401",label:"Automatic login on 401",type:"boolean"}]});var rn,sn=S(()=>{"use strict";ot();$t();rn=class{#e="auth-js:playground:settings";#t=nn;#i;constructor(e){this.#t.forEach((i,n)=>{i._sortIndex=n}),this.#i={currentTabIndex:0,currentSettingsIndex:0,settings:tn(e)}}getLibrarySettingsDefinition(){return this.#t}getLibraryImplementations(){return en}getSettings(){return this.get().settings}addOrUpdateSettings(e,i){let n=this.get(),r=i;return i!==void 0?n.settings[i]=e:(n.settings.push(e),r=n.settings.sort((o,a)=>o.name.localeCompare(a.name)).indexOf(e)),this.saveDemoAppSettings(n),r}deleteCurrentSettings(){let e=this.get(),i=e.currentSettingsIndex;i>=0&&i<e.settings.length&&(e.settings.splice(i,1),this.saveDemoAppSettings(e))}setCurrentTabIndex(e){let i=this.get();i.currentTabIndex=e,this.saveDemoAppSettings(i)}setCurrentSettingsIndex(e){let i=this.get();i.currentSettingsIndex=e,this.saveDemoAppSettings(i)}getCurrentSettings(){let e=this.get(),i=e.currentSettingsIndex;return i>=0&&i<e.settings.length?e.settings[i]:e.settings[0]}get(){let e=sessionStorage.getItem(this.#e);if(e){let i=E(E({},this.#i),JSON.parse(e));return this.#i.settings.forEach(n=>{i.settings.find(r=>r.name===n.name)||i.settings.push(n)}),i.settings=i.settings.sort((n,r)=>n.name.localeCompare(r.name)),i}return E({},this.#i)}saveDemoAppSettings(e){delete e.librarySettingsDefinition,sessionStorage.setItem(this.#e,JSON.stringify(e))}}});var Ar,kr,ln,ha,pa,Oe,Ve,Ir,Dr,Tr,at,cn,ga,lt,on,an,Wt,fa,Mr,Pr,Rr,Vr,Gt,ma,dn=S(()=>{"use strict";Ar=t=>{let e=new Map;e.set("web",{name:"web"});let i=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},n=(s,o)=>{i.platforms.set(s,o)},r=s=>{i.platforms.has(s)&&(i.currentPlatform=i.platforms.get(s))};return i.addPlatform=n,i.setPlatform=r,i},kr=t=>t.CapacitorPlatforms=Ar(t),ln=kr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ha=ln.addPlatform,pa=ln.setPlatform,Oe=(function(t){return t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE",t})(Oe||{}),Ve=class extends Error{constructor(e,i,n){super(e),this.message=e,this.code=i,this.data=n}},Ir=t=>{var e,i;return t?.androidBridge?"android":!((i=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||i===void 0)&&i.bridge?"ios":"web"},Dr=t=>{var e,i,n,r,s;let o=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},d=a.Plugins=a.Plugins||{},c=t.CapacitorPlatforms,h=()=>o!==null?o.name:Ir(t),p=((e=c?.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||h,g=()=>p()!=="web",m=((i=c?.currentPlatform)===null||i===void 0?void 0:i.isNativePlatform)||g,b=y=>{let x=v.get(y);return!!(x?.platforms.has(p())||u(y))},A=((n=c?.currentPlatform)===null||n===void 0?void 0:n.isPluginAvailable)||b,I=y=>{var x;return(x=a.PluginHeaders)===null||x===void 0?void 0:x.find(D=>D.name===y)},u=((r=c?.currentPlatform)===null||r===void 0?void 0:r.getPluginHeader)||I,f=y=>t.console.error(y),_=(y,x,D)=>Promise.reject(`${D} does not have an implementation of "${x}".`),v=new Map,k=(y,x={})=>{let D=v.get(y);if(D)return console.warn(`Capacitor plugin "${y}" already registered. Cannot register plugins twice.`),D.proxy;let V=p(),P=u(y),U,oe=()=>l(null,null,function*(){return!U&&V in x?U=typeof x[V]=="function"?U=yield x[V]():U=x[V]:o!==null&&!U&&"web"in x&&(U=typeof x.web=="function"?U=yield x.web():U=x.web),U}),Ie=(R,O)=>{var q,Z;if(P){let ee=P?.methods.find(H=>O===H.name);if(ee)return ee.rtype==="promise"?H=>a.nativePromise(y,O.toString(),H):(H,Le)=>a.nativeCallback(y,O.toString(),H,Le);if(R)return(q=R[O])===null||q===void 0?void 0:q.bind(R)}else{if(R)return(Z=R[O])===null||Z===void 0?void 0:Z.bind(R);throw new Ve(`"${y}" plugin is not implemented on ${V}`,Oe.Unimplemented)}},Y=R=>{let O,q=(...Z)=>{let ee=oe().then(H=>{let Le=Ie(H,R);if(Le){let Ne=Le(...Z);return O=Ne?.remove,Ne}else throw new Ve(`"${y}.${R}()" is not implemented on ${V}`,Oe.Unimplemented)});return R==="addListener"&&(ee.remove=()=>l(null,null,function*(){return O()})),ee};return q.toString=()=>`${R.toString()}() { [capacitor code] }`,Object.defineProperty(q,"name",{value:R,writable:!1,configurable:!1}),q},ve=Y("addListener"),Ue=Y("removeListener"),dt=(R,O)=>{let q=ve({eventName:R},O),Z=()=>l(null,null,function*(){let H=yield q;Ue({eventName:R,callbackId:H},O)}),ee=new Promise(H=>q.then(()=>H({remove:Z})));return ee.remove=()=>l(null,null,function*(){console.warn("Using addListener() without 'await' is deprecated."),yield Z()}),ee},ut=new Proxy({},{get(R,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return P?dt:ve;case"removeListener":return Ue;default:return Y(O)}}});return d[y]=ut,v.set(y,{name:y,proxy:ut,platforms:new Set([...Object.keys(x),...P?[V]:[]])}),ut},C=((s=c?.currentPlatform)===null||s===void 0?void 0:s.registerPlugin)||k;return a.convertFileSrc||(a.convertFileSrc=y=>y),a.getPlatform=p,a.handleError=f,a.isNativePlatform=m,a.isPluginAvailable=A,a.pluginMethodNoop=_,a.registerPlugin=C,a.Exception=Ve,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},Tr=t=>t.Capacitor=Dr(t),at=Tr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),cn=at.registerPlugin,ga=at.Plugins,lt=class{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,i){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(i);let r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r);let s=()=>l(this,null,function*(){return this.removeListener(e,i)}),o=Promise.resolve({remove:s});return Object.defineProperty(o,"remove",{value:()=>l(this,null,function*(){console.warn("Using addListener() without 'await' is deprecated."),yield s()})}),o}removeAllListeners(){return l(this,null,function*(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}})}notifyListeners(e,i){let n=this.listeners[e];n&&n.forEach(r=>r(i))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,i){this.windowListeners[i]={registered:!1,windowEventName:e,pluginEventName:i,handler:n=>{this.notifyListeners(i,n)}}}unimplemented(e="not implemented"){return new at.Exception(e,Oe.Unimplemented)}unavailable(e="not available"){return new at.Exception(e,Oe.Unavailable)}removeListener(e,i){return l(this,null,function*(){let n=this.listeners[e];if(!n)return;let r=n.indexOf(i);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])})}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}},on=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),an=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Wt=class extends lt{getCookies(){return l(this,null,function*(){let e=document.cookie,i={};return e.split(";").forEach(n=>{if(n.length<=0)return;let[r,s]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=an(r).trim(),s=an(s).trim(),i[r]=s}),i})}setCookie(e){return l(this,null,function*(){try{let i=on(e.key),n=on(e.value),r=`; expires=${(e.expires||"").replace("expires=","")}`,s=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${i}=${n||""}${r}; path=${s}; ${o};`}catch(i){return Promise.reject(i)}})}deleteCookie(e){return l(this,null,function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(i){return Promise.reject(i)}})}clearCookies(){return l(this,null,function*(){try{let e=document.cookie.split(";")||[];for(let i of e)document.cookie=i.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})}clearAllCookies(){return l(this,null,function*(){try{yield this.clearCookies()}catch(e){return Promise.reject(e)}})}},fa=cn("CapacitorCookies",{web:()=>new Wt}),Mr=t=>l(null,null,function*(){return new Promise((e,i)=>{let n=new FileReader;n.onload=()=>{let r=n.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},n.onerror=r=>i(r),n.readAsDataURL(t)})}),Pr=(t={})=>{let e=Object.keys(t);return Object.keys(t).map(r=>r.toLocaleLowerCase()).reduce((r,s,o)=>(r[s]=t[e[o]],r),{})},Rr=(t,e=!0)=>t?Object.entries(t).reduce((n,r)=>{let[s,o]=r,a,d;return Array.isArray(o)?(d="",o.forEach(c=>{a=e?encodeURIComponent(c):c,d+=`${s}=${a}&`}),d.slice(0,-1)):(a=e?encodeURIComponent(o):o,d=`${s}=${a}`),`${n}&${d}`},"").substr(1):null,Vr=(t,e={})=>{let i=Object.assign({method:t.method||"GET",headers:t.headers},e),r=Pr(t.headers)["content-type"]||"";if(typeof t.data=="string")i.body=t.data;else if(r.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[o,a]of Object.entries(t.data||{}))s.set(o,a);i.body=s.toString()}else if(r.includes("multipart/form-data")||t.data instanceof FormData){let s=new FormData;if(t.data instanceof FormData)t.data.forEach((a,d)=>{s.append(d,a)});else for(let a of Object.keys(t.data))s.append(a,t.data[a]);i.body=s;let o=new Headers(i.headers);o.delete("content-type"),i.headers=o}else(r.includes("application/json")||typeof t.data=="object")&&(i.body=JSON.stringify(t.data));return i},Gt=class extends lt{request(e){return l(this,null,function*(){let i=Vr(e,e.webFetchExtra),n=Rr(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,s=yield fetch(r,i),o=s.headers.get("content-type")||"",{responseType:a="text"}=s.ok?e:{};o.includes("application/json")&&(a="json");let d,c;switch(a){case"arraybuffer":case"blob":c=yield s.blob(),d=yield Mr(c);break;case"json":d=yield s.json();break;default:d=yield s.text()}let h={};return s.headers.forEach((p,g)=>{h[g]=p}),{data:d,headers:h,status:s.status,url:s.url}})}get(e){return l(this,null,function*(){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))})}post(e){return l(this,null,function*(){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))})}put(e){return l(this,null,function*(){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))})}patch(e){return l(this,null,function*(){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})}delete(e){return l(this,null,function*(){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})}},ma=cn("CapacitorHttp",{web:()=>new Gt})});var fe,un,K,me=S(()=>{"use strict";dn();fe=(t,e=[])=>{let i=/^( *)("[\w-]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg,n=(r,s,o,a,d)=>{let c=s||"",h=o?o.replace(/[": ]/g,""):void 0;if(h&&(c+=`<span class="json-key">${h}</span>: `),a&&(c+=`<span class="${a.startsWith('"')?"json-string":"json-value"}">${a}</span>`,h&&e.includes(h))){let p=new Date(Number(a)*1e3),g=`${p.toDateString()}, ${p.toLocaleTimeString()}`;g&&(c+=` <span class="json-date">(${g})</span>`)}return c+(d||"")};return t?JSON.stringify(t,null,2).replace(/&/g,"&amp;").replace(/\\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(i,n):""},un=()=>(t,e)=>{let{otherSettings:i,librarySettings:n}=window.appSettings.getCurrentSettings(),r=i?(i.roles??"").split(","):[],s;if(n.authorityUrl.includes("auth0"))s=e["http://ngx-auth.com/roles"];else if(n.authorityUrl.includes("zitadel")){let a=e["urn:zitadel:iam:org:project:roles"];s=Object.keys(a??{})}else s=e?.resource_access?.account?.roles;return r.every(a=>(s??[]).includes(a))?!0:"forbidden"},K=`
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
`});var hn,zt,pn=S(()=>{"use strict";me();hn=document.createElement("template");hn.innerHTML=`
    <style>
        ${K}

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
`;zt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(hn.content,!0)),this.isAuthenticated=!1,this.userSession=void 0,this.accessToken=void 0,this.accessTokenDecoded=void 0,this.idToken=void 0,this.idTokenDecoded=void 0,this.userProfile=void 0}set isAuthenticated(e){e!==null&&this.update("#isAuthenticated",typeof e=="boolean"?String(e):e)}set userSession(e){this.update("#userSession",fe(e,["expires_at"]))}set accessToken(e){this.update("#accessToken",e)}set accessTokenDecoded(e){let i=typeof e!="string"?fe(e,["exp","iat","auth_time"]):"(no decoded info as it is not a JWT token)";this.update("#accessTokenDecoded",i)}set idToken(e){this.update("#idToken",e)}set idTokenDecoded(e){this.update("#idTokenDecoded",fe(e,["exp","iat","auth_time"]))}set userProfile(e){this.update("#userProfile",fe(e))}connectedCallback(){}disconnectedCallback(){}update(e,i){let n=this.shadowRoot?.querySelector(e);n&&(i==null||i===""?n.closest(".info")?.classList.add("hidden"):(n.closest(".info")?.classList.remove("hidden"),n.innerHTML=i))}};window.customElements.define("demo-app-debug",zt)});var gn,Jt,fn=S(()=>{"use strict";me();gn=document.createElement("template");gn.innerHTML=`
    <style>
        ${K}

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
                <span class="icon">\u{1F6E1}\uFE0F</span>Auth-js
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
`;Jt=class extends HTMLElement{listeners=[];implSelectEl;settingsSelectEl;statusEl;loginButtonEl;logoutButtonEl;silentRenewButtonEl;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(gn.content,!0)),this.implSelectEl=this.shadowRoot?.querySelector("#implementation-select"),this.settingsSelectEl=this.shadowRoot?.querySelector("#setting-select"),this.statusEl=this.shadowRoot?.querySelector(".status"),this.loginButtonEl=this.shadowRoot?.querySelector("#login-button"),this.logoutButtonEl=this.shadowRoot?.querySelector("#logout-button"),this.silentRenewButtonEl=this.shadowRoot?.querySelector("#silent-renew-button")}set isRenewing(e){this.statusEl&&this.statusEl.classList[e?"add":"remove"]("loading")}set isAuthenticated(e){this.statusEl&&e!==null&&e!==void 0&&(this.statusEl.classList.remove("loading"),this.statusEl.title=e?"Authenticated":"Not authenticated",this.statusEl.classList[e?"add":"remove"]("authenticated"),this.statusEl.classList[e?"remove":"add"]("not-authenticated"))}connectedCallback(){if(window.location.href.includes(":4200")){let i=document.createElement("option");i.textContent="localhost",this.implSelectEl?.appendChild(i)}else{window.appSettings.getLibraryImplementations().forEach(n=>{let r=document.createElement("option");r.value=n.label,r.textContent=n.label,this.implSelectEl?.appendChild(r)});let i=()=>{let n=this.implSelectEl?.selectedIndex;n!==void 0&&(window.location.href=window.appSettings.getLibraryImplementations()[n].demoUrl)};this.implSelectEl?.addEventListener("change",i),this.listeners.push(()=>{this.implSelectEl?.removeEventListener("change",i)})}window.appSettings.getSettings().forEach(i=>{let n=document.createElement("option");n.value=i.name,n.textContent=i.name,this.settingsSelectEl?.appendChild(n)}),this.refreshImplementation(),this.refreshSettings(),this.addEventListeners();let e=i=>{let n=i.options[i.selectedIndex].text||"",r=document.createElement("span");r.textContent=n;let s=window.getComputedStyle(i);r.style.font=s.font,r.style.fontSize=s.fontSize,r.style.fontFamily=s.fontFamily,r.style.fontWeight=s.fontWeight,r.style.letterSpacing=s.letterSpacing,r.style.whiteSpace="nowrap",r.style.position="absolute",r.style.visibility="hidden",r.style.top="-9999px",document.body.appendChild(r);let o=r.offsetWidth;r.remove();let a=/iP(hone|ad|od)/.test(navigator.userAgent)&&!!/WebKit/.exec(navigator.userAgent)&&!/CriOS|FxiOS/.exec(navigator.userAgent)?40:navigator.userAgent.includes("Chrome")?25:35,d=Math.ceil(o+a);i.style.width=`${d}px`};window.requestAnimationFrame(()=>{this.implSelectEl&&e(this.implSelectEl),this.settingsSelectEl&&e(this.settingsSelectEl)})}disconnectedCallback(){this.listeners.forEach(e=>{e()})}addEventListeners(){let e=()=>{this.settingsSelectEl&&(window.appSettings.setCurrentSettingsIndex(this.settingsSelectEl.selectedIndex),location.reload())};this.settingsSelectEl?.addEventListener("change",e);let i=()=>this.dispatchEvent(new Event("login",{bubbles:!0,composed:!0}));this.loginButtonEl?.addEventListener("click",i);let n=()=>this.dispatchEvent(new Event("logout",{bubbles:!0,composed:!0}));this.logoutButtonEl?.addEventListener("click",n);let r=()=>this.dispatchEvent(new Event("silentRenew",{bubbles:!0,composed:!0}));this.silentRenewButtonEl?.addEventListener("click",r),this.listeners.push(()=>{this.settingsSelectEl?.removeEventListener("change",e)},()=>{this.loginButtonEl?.removeEventListener("click",i)},()=>{this.logoutButtonEl?.removeEventListener("click",n)},()=>{this.silentRenewButtonEl?.removeEventListener("click",r)})}refreshImplementation(){let e=window.appSettings.getLibraryImplementations();if(window.location.href.includes(":4200"))this.implSelectEl&&(this.implSelectEl.selectedIndex=0);else{let i=e.findIndex(n=>window.location.href.includes(n.demoUrl));this.implSelectEl&&(this.implSelectEl.selectedIndex=i!==-1?i:0)}}refreshSettings(){this.settingsSelectEl&&(this.settingsSelectEl.selectedIndex=window.appSettings.get().currentSettingsIndex)}};window.customElements.define("demo-app-header",Jt)});var mn,Kt,vn=S(()=>{"use strict";me();mn=document.createElement("template");mn.innerHTML=`
    <style>
        ${K}

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
`;Kt=class extends HTMLElement{listeners=[];tabsContentEl;demoAppHeaderEl;tabs=[];views=[];currentTabIndex=-1;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(mn.content,!0)),this.tabsContentEl=this.shadowRoot?.querySelector(".tabs-content"),this.demoAppHeaderEl=this.shadowRoot?.querySelector("demo-app-header")}set isRenewing(e){this.demoAppHeaderEl&&(this.demoAppHeaderEl.isRenewing=e)}set isAuthenticated(e){this.demoAppHeaderEl&&(this.demoAppHeaderEl.isAuthenticated=e)}connectedCallback(){this.drawTabs(),this.showView(window.appSettings.get().currentTabIndex)}disconnectedCallback(){this.listeners.forEach(e=>{e()})}drawTabs(){let e=this.shadowRoot?.querySelector("#views"),i=this.shadowRoot?.querySelector("#tabs");e&&i&&(this.views=e.assignedElements(),this.views.forEach((n,r)=>{n.style.display="none";let s=document.createElement("a");s.id=`${(n.getAttribute("tabLabel")??"?").toLowerCase()}-button`,s.textContent=n.getAttribute("tabLabel")??"?";let o=()=>{this.showView(r)};s.addEventListener("click",o),this.listeners.push(()=>{s.removeEventListener("click",o)}),i.appendChild(s),this.tabs.push(s)}))}showView(e){this.currentTabIndex!==e&&(this.currentTabIndex=e,this.tabs.forEach((i,n)=>{i.classList[n!==e?"remove":"add"]("selected")}),this.views.forEach((i,n)=>{i.style.display=n!==e?"none":"flex"}),this.tabsContentEl?.scrollTo(0,0),window.appSettings.setCurrentTabIndex(e))}};window.customElements.define("demo-app-main",Kt)});var _n,Xt,bn=S(()=>{"use strict";me();_n=document.createElement("template");_n.innerHTML=`
    <style>
        ${K}

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
`;Xt=class extends HTMLElement{listeners=[];apiStatusEl;apiResponseEl;apiUrlEl;apiHeadersEl;apiBtnEl;guardsHomeBtnEl;guardsPublicBtnEl;guardsPrivateBtnEl;guardsProtectedBtnEl;guardsQueryParamsEl;guardsRolesEl;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(_n.content,!0)),this.apiStatusEl=this.shadowRoot?.querySelector("#api-status"),this.apiResponseEl=this.shadowRoot?.querySelector("#api-response"),this.apiUrlEl=this.shadowRoot?.querySelector("#api-url-input"),this.apiHeadersEl=this.shadowRoot?.querySelector("#api-headers-input"),this.apiBtnEl=this.shadowRoot?.querySelector("#api-get-button"),this.guardsHomeBtnEl=this.shadowRoot?.querySelector("#guards-home-button"),this.guardsPublicBtnEl=this.shadowRoot?.querySelector("#guards-public-button"),this.guardsPrivateBtnEl=this.shadowRoot?.querySelector("#guards-private-button"),this.guardsProtectedBtnEl=this.shadowRoot?.querySelector("#guards-protected-button"),this.guardsQueryParamsEl=this.shadowRoot?.querySelector("#guards-query-params-input"),this.guardsRolesEl=this.shadowRoot?.querySelector("#guards-roles-input")}connectedCallback(){let e=g=>{if("key"in g&&g.key!=="Enter")return!0;{let m=this.apiHeadersEl?.value.split(",").reduce((A,I)=>{if(I){let u=/^"?([^"]*)"?$/,f=I.split(":"),_=u.exec(f[0]?.trim())?.[1]??"",v=u.exec(f[1]?.trim())?.[1]??"";_&&(A[_]=v)}return A},{}),b=new CustomEvent("api",{bubbles:!0,composed:!0,detail:{url:this.apiUrlEl?.value,headers:m}});return this.dispatchEvent(b)}};this.apiBtnEl?.addEventListener("click",e),this.apiUrlEl?.addEventListener("keydown",e),this.apiHeadersEl?.addEventListener("keydown",e);let i=()=>{this.saveSettings({apiUrl:this.apiUrlEl?.value})};this.apiUrlEl?.addEventListener("input",i);let n=()=>{this.saveSettings({apiHeaders:this.apiHeadersEl?.value})};this.apiHeadersEl?.addEventListener("input",n);let r=()=>{this.saveSettings({queryParams:this.guardsQueryParamsEl?.value})};this.guardsQueryParamsEl?.addEventListener("input",r);let s=()=>{this.saveSettings({roles:this.guardsRolesEl?.value})};this.guardsRolesEl?.addEventListener("input",s);let o=g=>{let m={};return this.guardsQueryParamsEl?.value.split("&").forEach(b=>{let A=b.split("=");A.length===2&&(m[A[0]]=A[1])}),this.dispatchEvent(new CustomEvent(g,{bubbles:!0,composed:!0,detail:{queryParams:m}}))},a=()=>o("home");this.guardsHomeBtnEl?.addEventListener("click",a);let d=()=>o("public");this.guardsPublicBtnEl?.addEventListener("click",d);let c=()=>o("private");this.guardsPrivateBtnEl?.addEventListener("click",c);let h=g=>"key"in g&&g.key!=="Enter"?!0:o("protected");this.guardsProtectedBtnEl?.addEventListener("click",h),this.guardsRolesEl?.addEventListener("keydown",h),this.listeners.push(()=>this.apiBtnEl?.removeEventListener("click",e),()=>this.apiUrlEl?.removeEventListener("keydown",e),()=>this.apiHeadersEl?.removeEventListener("keydown",e),()=>this.apiUrlEl?.removeEventListener("input",i),()=>this.apiHeadersEl?.removeEventListener("input",n),()=>this.guardsQueryParamsEl?.removeEventListener("input",r),()=>this.guardsRolesEl?.removeEventListener("input",s),()=>this.guardsHomeBtnEl?.removeEventListener("click",a),()=>this.guardsPrivateBtnEl?.removeEventListener("click",c),()=>this.guardsProtectedBtnEl?.removeEventListener("click",h),()=>this.guardsRolesEl?.removeEventListener("keydown",h));let{otherSettings:p}=window.appSettings.getCurrentSettings();this.apiUrlEl&&(this.apiUrlEl.value=p?.apiUrl??""),this.apiHeadersEl&&(this.apiHeadersEl.value=p?.apiHeaders??""),this.guardsQueryParamsEl&&(this.guardsQueryParamsEl.value=p?.queryParams??""),this.guardsRolesEl&&(this.guardsRolesEl.value=p?.roles??"")}disconnectedCallback(){this.listeners.forEach(e=>{e()})}setApiStatus(e,i){this.apiStatusEl?.classList.remove(i?"success":"error"),this.apiStatusEl?.classList.add(i?"error":"success"),this.apiResponseEl&&(this.apiResponseEl.innerHTML=fe(e))}saveSettings(e){let i=window.appSettings.getCurrentSettings();i.otherSettings=E(E({},i.otherSettings),e),window.appSettings.addOrUpdateSettings(i,window.appSettings.get().currentSettingsIndex)}};window.customElements.define("demo-app-playground",Xt)});var yn,Qt,wn=S(()=>{"use strict";me();ot();yn=document.createElement("template");yn.innerHTML=`
    <style>
        ${K}

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
`;Qt=class extends HTMLElement{listeners=[];formEl;formContentEl;selectEl;settingsNameEl;formIsDirty=!1;formIsNew=!1;constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot?.appendChild(document.importNode(yn.content,!0))}connectedCallback(){this.formEl=this.shadowRoot?.querySelector("form"),this.formContentEl=this.shadowRoot?.querySelector(".form-content"),this.selectEl=this.shadowRoot?.querySelector("#setting-select"),this.settingsNameEl=this.shadowRoot?.querySelector("#settingsName");let e=p=>{!this.formIsDirty&&p.target.id!=="setting-select"&&(this.formIsDirty=!0,this.classList.add("dirty"))};this.formEl?.addEventListener("input",e),this.listeners.push(()=>{this.formEl?.removeEventListener("input",e)}),this.refreshSelect();let i=()=>{this.selectEl&&this.loadSettings(this.selectEl.selectedIndex)};this.selectEl?.addEventListener("change",i),this.listeners.push(()=>{this.selectEl?.removeEventListener("change",i)});let n=this.shadowRoot?.querySelector("#add-settings-button"),r=()=>{this.add()};n?.addEventListener("click",r),this.listeners.push(()=>n?.removeEventListener("click",r));let s=this.shadowRoot?.querySelector("#delete-settings-button"),o=()=>{this.delete()};s?.addEventListener("click",o),this.listeners.push(()=>s?.removeEventListener("click",o));let a=this.shadowRoot?.querySelector("#save-settings-button"),d=()=>{this.saveAndReload()};a?.addEventListener("click",d),this.listeners.push(()=>a?.removeEventListener("click",d));let c=this.shadowRoot?.querySelector("#cancel-settings-button"),h=()=>{this.cancel()};c?.addEventListener("click",h),this.listeners.push(()=>c?.removeEventListener("click",h)),this.refreshFormContent(window.appSettings.getCurrentSettings())}disconnectedCallback(){this.listeners.forEach(e=>{e()})}loadSettings(e){window.appSettings.setCurrentSettingsIndex(e),location.reload()}add(){let e="New settings",i=document.createElement("option");i.selected=!0,i.value=e,i.textContent=e,this.selectEl?.appendChild(i),this.formIsNew=!0,this.formIsDirty=!0,this.classList.add("dirty"),this.refreshFormContent({name:e,librarySettings:Re})}delete(){window.appSettings.deleteCurrentSettings(),window.appSettings.setCurrentSettingsIndex(0),location.reload()}cancel(){this.formIsNew=!1,this.formIsDirty=!1,this.classList.remove("dirty"),this.refreshSelect(),this.refreshFormContent(window.appSettings.getCurrentSettings())}setPathValue(e,i,n){let r=i.split(".");r.reduce((s,o,a)=>(a===r.length-1?(typeof n=="string"&&n.trim()===""&&(n=void 0),s[o]=n):(!(o in s)||typeof s[o]!="object"||s[o]===null)&&(s[o]={}),s[o]),e)}getPathValue(e,i){return i.split(".").reduce((n,r)=>n&&typeof n=="object"&&r in n?n[r]:void 0,e)}refreshSelect(){this.selectEl&&(this.selectEl.innerHTML="");let{settings:e,currentSettingsIndex:i}=window.appSettings.get();e.forEach((n,r)=>{let s=document.createElement("option");s.selected=r===i,s.value=n.name,s.textContent=n.name,this.selectEl?.appendChild(s)})}refreshFormContent(e){if(this.formContentEl&&(this.formContentEl.innerHTML=""),this.settingsNameEl){let i=window.appSettings.getLibrarySettingsDefinition(),{name:n,librarySettings:r}=e;this.settingsNameEl.value=n,i.sort((o,a)=>(a._sortIndex||0)-(o._sortIndex||0)).forEach(o=>{let a=document.createElement("div");this.formContentEl?.prepend(a);let d=document.createElement("label");d.htmlFor=o.name.replace(".",""),d.textContent=`${o.label}${o.required?" *":""}`;let c=document.createElement(o.type==="list"?"select":"input");switch(c.id=o.name.replace(".",""),c.name=o.name.replace(".",""),c.required=o.required===!0,o.type){case"boolean":c.checked=this.getPathValue(r,o.name),c.type="checkbox",a.appendChild(c),a.appendChild(d);break;case"list":o.values?.forEach(h=>{let p=document.createElement("option");p.value=String(h.value),p.textContent=h.label,c.appendChild(p)}),c.value=this.getPathValue(r,o.name),c.classList.add("flex"),a.classList.add("input","column"),a.appendChild(d),a.appendChild(c);break;default:{let h=this.getPathValue(r,o.name);o.type==="json"?c.value=h?JSON.stringify(h):"":c.value=h??"",o.placeholder&&(c.placeholder=o.placeholder),a.classList.add("input","column"),a.appendChild(d),a.appendChild(c);break}}});let s=this.shadowRoot?.querySelector("#automaticInjectToken");s&&(s.onclick=()=>{if(!s.checked){let o=this.shadowRoot?.querySelector("#automaticInjectTokenheaderName");o&&(o.disabled=!0,o.value="");let a=this.shadowRoot?.querySelector("#automaticInjectTokeninclude");a&&(a.disabled=!0,a.value="");let d=this.shadowRoot?.querySelector("#automaticInjectTokenexclude");d&&(d.disabled=!0,d.value="")}})}}saveAndReload(){if(this.formEl?.reportValidity()&&this.settingsNameEl){let e=window.appSettings.getLibrarySettingsDefinition(),i=this.formIsNew?{name:"",librarySettings:{}}:window.appSettings.getCurrentSettings();if(i.name=this.settingsNameEl.value,e.sort((r,s)=>(r._sortIndex||0)-(s._sortIndex||0)).forEach(r=>{let s=this.shadowRoot?.querySelector(`#${r.name.replace(".","")}`),o;switch(r.type){case"boolean":o=s.checked;break;case"list":o=s.value;break;case"json":try{let a=s.value;a&&a.trim()!==""&&(o=JSON.parse(a))}catch(a){console.error(a)}break;default:o=s.value;break}this.setPathValue(i.librarySettings,r.name,o)}),!this.shadowRoot?.querySelector("#automaticInjectToken")?.checked)i.librarySettings.automaticInjectToken=!1;else{let r=i.librarySettings.automaticInjectToken;typeof r=="object"&&((!r.headerName||r.headerName.trim()==="")&&(!r.include||r.include.trim()==="")&&(!r.exclude||r.exclude.trim()==="")?r=!0:(r.include&&(r.include=r.include.split(",")),r.exclude&&(r.exclude=r.exclude.split(","))),i.librarySettings.automaticInjectToken=r)}if(this.formIsNew){let r=window.appSettings.addOrUpdateSettings(i);this.selectEl&&r&&window.appSettings.setCurrentSettingsIndex(r)}else window.appSettings.addOrUpdateSettings(i,window.appSettings.get().currentSettingsIndex);location.reload()}}};window.customElements.define("demo-app-settings",Qt)});var Sn=S(()=>{"use strict";pn();fn();vn();bn();wn();me();ot();sn();$t()});var Or,En,Ur,Cn,xn=S(()=>{"use strict";te();te();Or=new je("",{factory:()=>En}),En="always",Ur=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=mt({type:t});static \u0275inj=ft({})}return t})(),Cn=(()=>{class t{static withConfig(i){return{ngModule:t,providers:[{provide:Or,useValue:i.callSetDisabledState??En}]}}static \u0275fac=function(n){return new(n||t)};static \u0275mod=mt({type:t});static \u0275inj=ft({imports:[Ur]})}return t})()});var Lr,ct,An=S(()=>{"use strict";Tn();Mn();te();xn();yt();qt();te();Lr=["demoAppPlayground"],ct=class t{demoAppPlaygroundEl;authService=N(ge);httpClient=N(ci);router=N(_e);callPrivateApi(e){let{url:i,headers:n}=e.detail;if(i){let r=this.demoAppPlaygroundEl.nativeElement;this.httpClient.get(i,n?{headers:new li(n)}:{}).subscribe({next:s=>{r.setApiStatus(s,!1)},error:s=>{r.setApiStatus(s,!0)}})}}navigate(e,i){return l(this,null,function*(){let{queryParams:n}=i.detail;yield this.router.navigate([e],{queryParams:n})})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=ni({type:t,selectors:[["app-demo"]],viewQuery:function(i,n){if(i&1&&ri(Lr,5),i&2){let r;si(r=oi())&&(n.demoAppPlaygroundEl=r.first)}},decls:15,vars:27,consts:[["demoAppPlayground",""],[3,"login","logout","silentRenew","isRenewing","isAuthenticated"],["tabLabel","Playground",3,"api","home","public","private","protected"],["tabLabel","Debug",3,"isAuthenticated","userProfile","userSession","idToken","idTokenDecoded","accessToken","accessTokenDecoded"],["tabLabel","Settings"]],template:function(i,n){i&1&&(_t(0,"demo-app-main",1),$(1,"async"),$(2,"async"),Be("login",function(){return n.authService.login()})("logout",function(){return n.authService.logout({redirectUrl:"/"})})("silentRenew",function(){return n.authService.renew()}),_t(3,"demo-app-playground",2,0),Be("api",function(s){return n.callPrivateApi(s)})("home",function(s){return n.navigate("/",s)})("public",function(s){return n.navigate("public",s)})("private",function(s){return n.navigate("private",s)})("protected",function(s){return n.navigate("protected",s)}),He(5,"router-outlet"),bt(),He(6,"demo-app-debug",3),$(7,"async"),$(8,"async"),$(9,"async"),$(10,"async"),$(11,"async"),$(12,"async"),$(13,"async"),He(14,"demo-app-settings",4),bt()),i&2&&(vt("isRenewing",W(1,9,n.authService.isRenewing$))("isAuthenticated",W(2,11,n.authService.isAuthenticated$)),ii(6),vt("isAuthenticated",W(7,13,n.authService.isAuthenticated$))("userProfile",W(8,15,n.authService.userProfile$))("userSession",W(9,17,n.authService.userSession$))("idToken",W(10,19,n.authService.idToken$))("idTokenDecoded",W(11,21,n.authService.idTokenDecoded$))("accessToken",W(12,23,n.authService.accessToken$))("accessTokenDecoded",W(13,25,n.authService.accessTokenDecoded$)))},dependencies:[Cn,di,ai],styles:[`.flex{flex:1}.hidden{display:none!important}.row{display:flex;flex-direction:row}.column{display:flex;flex-direction:column}.card{border:1px solid rgba(0,0,0,.12);border-radius:4px;background-color:#fff;margin:12px 6px}.card .card-status{display:block;width:10px;height:10px;border-radius:50%;margin-left:8px;background-color:#f2f2f2}.card .card-status.error{background-color:#ef5350}.card .card-status.success{background-color:#66bb6a}.card .card-title{padding:16px;font-size:20px;font-weight:500;color:#000000de;align-items:center}.card .box{height:200px;border-top:1px solid lightgray;word-break:break-all;overflow:auto;background-color:#f2f2f2;padding:12px}.card .box pre{margin:0}.card .card-actions{padding:0 14px 8px;min-height:50px}.card .card-actions .input{display:flex;align-items:center}.card .card-actions .input:not(:last-child){margin-bottom:8px}.card .card-actions .input label{width:125px;text-align:right;margin-right:14px}.card .card-actions .input input{padding:4px}.json-key{color:#7c4dff}.json-value{color:#437aed}.json-string{color:#53a053}.json-date{color:#c838c6}input{color:#5e35b1;padding:10px;border:1px solid rgba(0,0,0,.1215686275);border-radius:4px;font-size:14px}input:invalid{border-color:#f44336}input[type=checkbox]{margin-right:10px}select{color:#5e35b1;padding:8px 6px;border:1px solid rgba(0,0,0,.1215686275);border-radius:4px}button{cursor:pointer}@media only screen and (max-width:600px){:host{padding:0 0 24px!important}:host .card{border-left:0;border-right:0;border-radius:0;margin:0 0 6px}}
`],encapsulation:3})}});var Yt,kn,In=S(()=>{"use strict";qt();Sn();An();Yt=ke({validator:un()}),kn=[{path:"",component:ct,children:[{path:"forbidden",loadComponent:()=>import("./chunk-RH7B2XSW.js").then(t=>t.PageComponent),runGuardsAndResolvers:"always",data:{title:"ACCESS FORBIDDEN"}},{path:"public",loadComponent:()=>import("./chunk-RH7B2XSW.js").then(t=>t.PageComponent),runGuardsAndResolvers:"always",data:{title:"PUBLIC CONTENT"}},{path:"private",loadComponent:()=>import("./chunk-RH7B2XSW.js").then(t=>t.PageComponent),runGuardsAndResolvers:"always",canMatch:[ke()],canActivate:[ke()],canActivateChild:[ke()],data:{title:"PRIVATE CONTENT"}},{path:"protected",loadComponent:()=>import("./chunk-RH7B2XSW.js").then(t=>t.PageComponent),runGuardsAndResolvers:"always",canMatch:[Yt],canActivate:[Yt],canActivateChild:[Yt],data:{title:"PROTECTED CONTENT"}}]}]});var Wl,Nr=S(()=>{"use strict";In();Wl=[{path:"",children:kn},{path:"**",pathMatch:"full",redirectTo:""}]});export{_r as a,br as b,qt as c,rn as d,Sn as e,Wl as f,Nr as g};

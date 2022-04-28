"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[335],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),c=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,k=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(k,l(l({ref:t},s),{},{components:n})):a.createElement(k,l({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8215:function(e,t,n){n.d(t,{Z:function(){return r}});var a=n(7294);function r(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},9877:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7462),r=n(7294),o=n(2389),l=n(5979),i=n(6010),u="tabItem_LplD";function c(e){var t,n,o,c=e.lazy,s=e.block,p=e.defaultValue,d=e.values,m=e.groupId,k=e.className,v=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),f=null!=d?d:v.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),b=(0,l.lx)(f,(function(e,t){return e.value===t.value}));if(b.length>0)throw new Error('Docusaurus error: Duplicate values "'+b.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var g=null===p?p:null!=(t=null!=p?p:null==(n=v.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(o=v[0])?void 0:o.props.value;if(null!==g&&!f.some((function(e){return e.value===g})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+g+'" but none of its children has the corresponding value. Available values are: '+f.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var h=(0,l.UB)(),N=h.tabGroupChoices,y=h.setTabGroupChoices,w=(0,r.useState)(g),O=w[0],q=w[1],E=[],T=(0,l.o5)().blockElementScrollPositionUntilNextRender;if(null!=m){var j=N[m];null!=j&&j!==O&&f.some((function(e){return e.value===j}))&&q(j)}var x=function(e){var t=e.currentTarget,n=E.indexOf(t),a=f[n].value;a!==O&&(T(t),q(a),null!=m&&y(m,a))},C=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=E.indexOf(e.currentTarget)+1;n=E[a]||E[0];break;case"ArrowLeft":var r=E.indexOf(e.currentTarget)-1;n=E[r]||E[E.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":s},k)},f.map((function(e){var t=e.value,n=e.label,o=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:O===t?0:-1,"aria-selected":O===t,key:t,ref:function(e){return E.push(e)},onKeyDown:C,onFocus:x,onClick:x},o,{className:(0,i.Z)("tabs__item",u,null==o?void 0:o.className,{"tabs__item--active":O===t})}),null!=n?n:t)}))),c?(0,r.cloneElement)(v.filter((function(e){return e.props.value===O}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},v.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==O})}))))}function s(e){var t=(0,o.Z)();return r.createElement(c,(0,a.Z)({key:String(t)},e))}},3319:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return v},frontMatter:function(){return c},metadata:function(){return p},toc:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),l=n(9877),i=n(8215),u=["components"],c={title:"Configuration"},s=void 0,p={unversionedId:"documentation/configuration",id:"documentation/configuration",title:"Configuration",description:"Draft document..",source:"@site/docs/documentation/configuration.mdx",sourceDirName:"documentation",slug:"/documentation/configuration",permalink:"/auth-js/site/documentation/configuration",editUrl:"https://github.com/Badisi/auth-js/edit/main/projects/site/docs/documentation/configuration.mdx",tags:[],version:"current",frontMatter:{title:"Configuration"},sidebar:"docsSidebar",previous:{title:"Providers",permalink:"/auth-js/site/documentation/getting-started/providers"},next:{title:"Usage",permalink:"/auth-js/site/documentation/usage"}},d={},m=[{value:"Global",id:"global",level:2},{value:"<code>authorityUrl*</code>",id:"authorityurl",level:4},{value:"<code>clientId*</code>",id:"clientid",level:4},{value:"<code>loginRequired</code>",id:"loginrequired",level:4},{value:"<code>loadUserSession</code>",id:"loadusersession",level:4},{value:"<code>loadUserInfo</code>",id:"loaduserinfo",level:4},{value:"<code>automaticSilentRenew</code>",id:"automaticsilentrenew",level:4},{value:"<code>navigationType</code>",id:"navigationtype",level:4},{value:"<code>scope</code>",id:"scope",level:4},{value:"<code>logLevel</code>",id:"loglevel",level:4},{value:"<code>internal</code>",id:"internal",level:4},{value:"Angular",id:"angular",level:2},{value:"<code>automaticInjectToken</code>",id:"automaticinjecttoken",level:4},{value:"<code>automaticLoginOn401</code>",id:"automaticloginon401",level:4},{value:"<code>authGuardRedirectUrl</code>",id:"authguardredirecturl",level:4},{value:"Mobile",id:"mobile",level:2},{value:"<code>schemeUri</code>",id:"schemeuri",level:4}],k={toc:m};function v(e){var t=e.components,n=(0,r.Z)(e,u);return(0,o.kt)("wrapper",(0,a.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Draft document.."))),(0,o.kt)("br",null),(0,o.kt)(l.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"auth-js",label:"VanillaJS",default:!0,mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { initAuth } from '@badisi/auth-js';\n\nawait initAuth(settings: AuthSettings);\n"))),(0,o.kt)(i.Z,{value:"ngx-auth",label:"Angular",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { initAuth } from '@badisi/ngx-auth';\n\nawait initAuth(settings: AuthSettings);\n")))),(0,o.kt)("h2",{id:"global"},"Global"),(0,o.kt)("h4",{id:"authorityurl"},(0,o.kt)("inlineCode",{parentName:"h4"},"authorityUrl*")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": string",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"required"))),(0,o.kt)("h4",{id:"clientid"},(0,o.kt)("inlineCode",{parentName:"h4"},"clientId*")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": string",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"required"))),(0,o.kt)("h4",{id:"loginrequired"},(0,o.kt)("inlineCode",{parentName:"h4"},"loginRequired")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": boolean",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": true")),(0,o.kt)("h4",{id:"loadusersession"},(0,o.kt)("inlineCode",{parentName:"h4"},"loadUserSession")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": boolean",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": true")),(0,o.kt)("h4",{id:"loaduserinfo"},(0,o.kt)("inlineCode",{parentName:"h4"},"loadUserInfo")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": boolean",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": false")),(0,o.kt)("h4",{id:"automaticsilentrenew"},(0,o.kt)("inlineCode",{parentName:"h4"},"automaticSilentRenew")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": boolean",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": true")),(0,o.kt)("h4",{id:"navigationtype"},(0,o.kt)("inlineCode",{parentName:"h4"},"navigationType")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": enum - ",(0,o.kt)("em",{parentName:"p"},"Navigation.(REDIRECT, POPUP)"),(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": REDIRECT")),(0,o.kt)("h4",{id:"scope"},(0,o.kt)("inlineCode",{parentName:"h4"},"scope")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": string",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),': "openid profile email phone"')),(0,o.kt)("h4",{id:"loglevel"},(0,o.kt)("inlineCode",{parentName:"h4"},"logLevel")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": enum - ",(0,o.kt)("em",{parentName:"p"},"Log.(NONE, ERROR, WARN, INFO, DEBUG)"),(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": NONE")),(0,o.kt)("h4",{id:"internal"},(0,o.kt)("inlineCode",{parentName:"h4"},"internal")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": UserManagerSettings",(0,o.kt)("br",null))),(0,o.kt)("h2",{id:"angular"},"Angular"),(0,o.kt)("h4",{id:"automaticinjecttoken"},(0,o.kt)("inlineCode",{parentName:"h4"},"automaticInjectToken")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": boolean or custom object",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": see the examples")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Examples"',title:'"Examples"'},"// default: any url that starts with \"/api\"\nautomaticInjectToken: {\n  include: (url: string): boolean => {\n    const matches = new RegExp(/^.*?(?<!\\/)\\/(?!\\/)(.*$)/gm).exec(url);\n    return (matches?.[1]?.startsWith('api')) || false;\n  }\n}\n")),(0,o.kt)("h4",{id:"automaticloginon401"},(0,o.kt)("inlineCode",{parentName:"h4"},"automaticLoginOn401")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": boolean",(0,o.kt)("br",null),"\n",(0,o.kt)("strong",{parentName:"p"},"default"),": true")),(0,o.kt)("h4",{id:"authguardredirecturl"},(0,o.kt)("inlineCode",{parentName:"h4"},"authGuardRedirectUrl")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": string",(0,o.kt)("br",null))),(0,o.kt)("h2",{id:"mobile"},"Mobile"),(0,o.kt)("h4",{id:"schemeuri"},(0,o.kt)("inlineCode",{parentName:"h4"},"schemeUri")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"type"),": string",(0,o.kt)("br",null))))}v.isMDXComponent=!0}}]);
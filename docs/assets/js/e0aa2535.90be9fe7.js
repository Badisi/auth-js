"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[821],{6757:(e,t,n)=>{n.d(t,{A:()=>l});n(4041);var a=n(4357);const r={tabItem:"tabItem_OMyP"};var s=n(1085);function l(e){let{children:t,hidden:n,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,l),hidden:n,children:t})}},6908:(e,t,n)=>{n.d(t,{A:()=>w});var a=n(4041),r=n(4357),s=n(3e3),l=n(6090),i=n(4373),o=n(6853),u=n(3418),c=n(6738);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}(n);return function(e){const t=(0,u.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:n}=e;const r=(0,l.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o.aZ)(s),(0,a.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,s=h(e),[l,o]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:s}))),[u,d]=b({queryString:n,groupId:r}),[f,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,c.Dv)(n);return[r,(0,a.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:r}),g=(()=>{const e=u??f;return p({value:e,tabValues:s})?e:null})();(0,i.A)((()=>{g&&o(g)}),[g]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),m(e)}),[d,m,s]),tabValues:s}}var m=n(1927);const g={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var v=n(1085);function j(e){let{className:t,block:n,selectedValue:a,selectValue:l,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.a_)(),c=e=>{const t=e.currentTarget,n=o.indexOf(t),r=i[n].value;r!==a&&(u(t),l(r))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>{o.push(e)},onKeyDown:d,onClick:c,...s,className:(0,r.A)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function x(e){let{lazy:t,children:n,selectedValue:s}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===s));return e?(0,a.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function y(e){const t=f(e);return(0,v.jsxs)("div",{className:(0,r.A)("tabs-container",g.tabList),children:[(0,v.jsx)(j,{...t,...e}),(0,v.jsx)(x,{...t,...e})]})}function w(e){const t=(0,m.A)();return(0,v.jsx)(y,{...e,children:d(e.children)},String(t))}},6051:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>d});const a=JSON.parse('{"id":"getting-started/vanilla-js","title":"VanillaJS","description":"This guide explains how to set up your Vanilla javascript project to begin using @badisi/auth-js.","source":"@site/docs/getting-started/vanilla-js.mdx","sourceDirName":"getting-started","slug":"/getting-started/vanilla-js","permalink":"/auth-js/getting-started/vanilla-js","draft":false,"unlisted":false,"editUrl":"https://github.com/Badisi/auth-js/edit/main/apps/website/docs/getting-started/vanilla-js.mdx","tags":[],"version":"current","frontMatter":{"title":"VanillaJS"},"sidebar":"docsSidebar","previous":{"title":"Introduction","permalink":"/auth-js/getting-started/intro"},"next":{"title":"Angular","permalink":"/auth-js/getting-started/angular"}}');var r=n(1085),s=n(1184),l=n(6908),i=n(6757);const o={title:"VanillaJS"},u=void 0,c={},d=[{value:"Installation",id:"installation",level:3}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["This guide explains how to set up your Vanilla javascript project to begin using ",(0,r.jsx)(t.a,{href:"https://github.com/badisi/auth-js/tree/main/libs/auth-js",children:(0,r.jsx)(t.code,{children:"@badisi/auth-js"})}),"."]}),"\n",(0,r.jsx)(t.admonition,{title:"Before using this library",type:"info",children:(0,r.jsxs)(t.p,{children:["Make sure you properly configured your \ud83d\udc49 ",(0,r.jsx)(t.a,{href:"providers",children:"Authentication Provider"}),"."]})}),"\n",(0,r.jsx)(t.h3,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:["Install the library from the ",(0,r.jsx)(t.strong,{children:"NPM repository"})]}),"\n",(0,r.jsxs)(l.A,{children:[(0,r.jsx)(i.A,{value:"npm",label:"npm",default:!0,children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",children:"npm install @badisi/auth-js --save\n"})})}),(0,r.jsx)(i.A,{value:"yarn",label:"yarn",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",children:"yarn add @badisi/auth-js\n"})})})]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:"..."}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsx)(t.p,{children:"Coming soon.."})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},1184:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>i});var a=n(4041);const r={},s=a.createContext(r);function l(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);
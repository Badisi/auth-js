"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[138],{568:(e,t,r)=>{r.r(t),r.d(t,{default:()=>$});var s=r(4041),a=r(2514),n=r(9850),c=r(356),l=r(3198),o=r(9175);const u=["zero","one","two","few","many","other"];function h(e){return u.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:h(["one","other"]),select:e=>1===e?"one":"other"};function m(){const{i18n:{currentLocale:e}}=(0,a.A)();return(0,s.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:h(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function d(){const e=m();return{selectMessage:(t,r)=>function(e,t,r){const s=e.split("|");if(1===s.length)return s[0];s.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${s.length}: ${e}`);const a=r.select(t),n=r.pluralForms.indexOf(a);return s[Math.min(n,s.length-1)]}(r,t,e)}}var p=r(7626),g=r(6090),f=r(1927),x=r(4202);const y=function(){const e=(0,f.A)(),t=(0,g.W6)(),r=(0,g.zy)(),{siteConfig:{baseUrl:s}}=(0,a.A)(),n=e?new URLSearchParams(r.search):null,c=n?.get("q")||"",l=n?.get("ctx")||"",o=n?.get("version")||"",u=e=>{const t=new URLSearchParams(r.search);return e?t.set("q",e):t.delete("q"),t};return{searchValue:c,searchContext:l&&Array.isArray(x.Hg)&&x.Hg.some((e=>"string"==typeof e?e===l:e.path===l))?l:"",searchVersion:o,updateSearchPath:e=>{const r=u(e);t.replace({search:r.toString()})},updateSearchContext:e=>{const s=new URLSearchParams(r.search);s.set("ctx",e),t.replace({search:s.toString()})},generateSearchPageLink:e=>{const t=u(e);return`${s}search?${t.toString()}`}}};var C=r(3477),S=r(7153),j=r(81),w=r(48),A=r(6722),v=r(777),R=r(79);const I={searchContextInput:"searchContextInput_bNaS",searchQueryInput:"searchQueryInput_u9T3",searchResultItem:"searchResultItem_VQmd",searchResultItemPath:"searchResultItemPath_qzHo",searchResultItemSummary:"searchResultItemSummary_yaMU",searchQueryColumn:"searchQueryColumn_yVyD",searchContextColumn:"searchContextColumn_uUbr"};var b=r(7121),P=r(1085);function T(){const{siteConfig:{baseUrl:e},i18n:{currentLocale:t}}=(0,a.A)(),{selectMessage:r}=d(),{searchValue:n,searchContext:l,searchVersion:u,updateSearchPath:h,updateSearchContext:i}=y(),[m,g]=(0,s.useState)(n),[f,S]=(0,s.useState)(),j=`${e}${u}`,w=(0,s.useMemo)((()=>m?(0,o.T)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:m}):(0,o.T)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})),[m]);(0,s.useEffect)((()=>{h(m),m?(async()=>{const e=await(0,C.w)(j,l,m);S(e)})():S(void 0)}),[m,j,l]);const A=(0,s.useCallback)((e=>{g(e.target.value)}),[]);(0,s.useEffect)((()=>{n&&n!==m&&g(n)}),[n]);const[R,T]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{!async function(){(!Array.isArray(x.Hg)||l||x.dz)&&await(0,C.k)(j,l),T(!0)}()}),[l,j]),(0,P.jsxs)(s.Fragment,{children:[(0,P.jsxs)(c.A,{children:[(0,P.jsx)("meta",{property:"robots",content:"noindex, follow"}),(0,P.jsx)("title",{children:w})]}),(0,P.jsxs)("div",{className:"container margin-vert--lg",children:[(0,P.jsx)("h1",{children:w}),(0,P.jsxs)("div",{className:"row",children:[(0,P.jsx)("div",{className:(0,p.A)("col",{[I.searchQueryColumn]:Array.isArray(x.Hg),"col--9":Array.isArray(x.Hg),"col--12":!Array.isArray(x.Hg)}),children:(0,P.jsx)("input",{type:"search",name:"q",className:I.searchQueryInput,"aria-label":"Search",onChange:A,value:m,autoComplete:"off",autoFocus:!0})}),Array.isArray(x.Hg)?(0,P.jsx)("div",{className:(0,p.A)("col","col--3","padding-left--none",I.searchContextColumn),children:(0,P.jsxs)("select",{name:"search-context",className:I.searchContextInput,id:"context-selector",value:l,onChange:e=>i(e.target.value),children:[x.dz&&(0,P.jsx)("option",{value:"",children:(0,o.T)({id:"theme.SearchPage.searchContext.everywhere",message:"Everywhere"})}),x.Hg.map((e=>{const{label:r,path:s}=(0,b.p)(e,t);return(0,P.jsx)("option",{value:s,children:r},s)}))]})}):null]}),!R&&m&&(0,P.jsx)("div",{children:(0,P.jsx)(v.A,{})}),f&&(f.length>0?(0,P.jsx)("p",{children:r(f.length,(0,o.T)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:f.length}))}):(0,P.jsx)("p",{children:(0,o.T)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"})})),(0,P.jsx)("section",{children:f&&f.map((e=>(0,P.jsx)(_,{searchResult:e},e.document.i)))})]})]})}function _(e){let{searchResult:{document:t,type:r,page:s,tokens:a,metadata:n}}=e;const c=r===S.i.Title,o=r===S.i.Keywords,u=r===S.i.Description,h=u||o,i=c||h,m=r===S.i.Content,d=(c?t.b:s.b).slice(),p=m||h?t.s:t.t;i||d.push(s.t);let g="";if(x.CU&&a.length>0){const e=new URLSearchParams;for(const t of a)e.append("_highlight",t);g=`?${e.toString()}`}return(0,P.jsxs)("article",{className:I.searchResultItem,children:[(0,P.jsx)("h2",{children:(0,P.jsx)(l.A,{to:t.u+g+(t.h||""),dangerouslySetInnerHTML:{__html:m||h?(0,j.Z)(p,a):(0,w.C)(p,(0,A.g)(n,"t"),a,100)}})}),d.length>0&&(0,P.jsx)("p",{className:I.searchResultItemPath,children:(0,R.$)(d)}),(m||u)&&(0,P.jsx)("p",{className:I.searchResultItemSummary,dangerouslySetInnerHTML:{__html:(0,w.C)(t.t,(0,A.g)(n,"t"),a,100)}})]})}const $=function(){return(0,P.jsx)(n.A,{children:(0,P.jsx)(T,{})})}}}]);
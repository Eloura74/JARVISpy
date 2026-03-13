(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();function fS(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var S_={exports:{}},Wc={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dS=Symbol.for("react.transitional.element"),hS=Symbol.for("react.fragment");function M_(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:dS,type:t,key:i,ref:e!==void 0?e:null,props:n}}Wc.Fragment=hS;Wc.jsx=M_;Wc.jsxs=M_;S_.exports=Wc;var E=S_.exports,y_={exports:{}},Pe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Th=Symbol.for("react.transitional.element"),pS=Symbol.for("react.portal"),mS=Symbol.for("react.fragment"),gS=Symbol.for("react.strict_mode"),_S=Symbol.for("react.profiler"),vS=Symbol.for("react.consumer"),xS=Symbol.for("react.context"),SS=Symbol.for("react.forward_ref"),MS=Symbol.for("react.suspense"),yS=Symbol.for("react.memo"),E_=Symbol.for("react.lazy"),ES=Symbol.for("react.activity"),Wp=Symbol.iterator;function bS(t){return t===null||typeof t!="object"?null:(t=Wp&&t[Wp]||t["@@iterator"],typeof t=="function"?t:null)}var b_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T_=Object.assign,A_={};function Dr(t,e,n){this.props=t,this.context=e,this.refs=A_,this.updater=n||b_}Dr.prototype.isReactComponent={};Dr.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Dr.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function R_(){}R_.prototype=Dr.prototype;function Ah(t,e,n){this.props=t,this.context=e,this.refs=A_,this.updater=n||b_}var Rh=Ah.prototype=new R_;Rh.constructor=Ah;T_(Rh,Dr.prototype);Rh.isPureReactComponent=!0;var qp=Array.isArray;function If(){}var bt={H:null,A:null,T:null,S:null},C_=Object.prototype.hasOwnProperty;function Ch(t,e,n){var i=n.ref;return{$$typeof:Th,type:t,key:e,ref:i!==void 0?i:null,props:n}}function TS(t,e){return Ch(t.type,e,t.props)}function wh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Th}function AS(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Yp=/\/+/g;function vu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?AS(""+t.key):e.toString(36)}function RS(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(If,If):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Xs(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Th:case pS:r=!0;break;case E_:return r=t._init,Xs(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+vu(t,0):i,qp(a)?(n="",r!=null&&(n=r.replace(Yp,"$&/")+"/"),Xs(a,e,n,"",function(c){return c})):a!=null&&(wh(a)&&(a=TS(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(Yp,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(qp(t))for(var l=0;l<t.length;l++)i=t[l],s=o+vu(i,l),r+=Xs(i,e,n,s,a);else if(l=bS(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+vu(i,l++),r+=Xs(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return Xs(RS(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function sl(t,e,n){if(t==null)return t;var i=[],a=0;return Xs(t,i,"","",function(s){return e.call(n,s,a++)}),i}function CS(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Zp=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},wS={map:sl,forEach:function(t,e,n){sl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return sl(t,function(){e++}),e},toArray:function(t){return sl(t,function(e){return e})||[]},only:function(t){if(!wh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Pe.Activity=ES;Pe.Children=wS;Pe.Component=Dr;Pe.Fragment=mS;Pe.Profiler=_S;Pe.PureComponent=Ah;Pe.StrictMode=gS;Pe.Suspense=MS;Pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=bt;Pe.__COMPILER_RUNTIME={__proto__:null,c:function(t){return bt.H.useMemoCache(t)}};Pe.cache=function(t){return function(){return t.apply(null,arguments)}};Pe.cacheSignal=function(){return null};Pe.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=T_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!C_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Ch(t.type,a,i)};Pe.createContext=function(t){return t={$$typeof:xS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:vS,_context:t},t};Pe.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)C_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Ch(t,s,a)};Pe.createRef=function(){return{current:null}};Pe.forwardRef=function(t){return{$$typeof:SS,render:t}};Pe.isValidElement=wh;Pe.lazy=function(t){return{$$typeof:E_,_payload:{_status:-1,_result:t},_init:CS}};Pe.memo=function(t,e){return{$$typeof:yS,type:t,compare:e===void 0?null:e}};Pe.startTransition=function(t){var e=bt.T,n={};bt.T=n;try{var i=t(),a=bt.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(If,Zp)}catch(s){Zp(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),bt.T=e}};Pe.unstable_useCacheRefresh=function(){return bt.H.useCacheRefresh()};Pe.use=function(t){return bt.H.use(t)};Pe.useActionState=function(t,e,n){return bt.H.useActionState(t,e,n)};Pe.useCallback=function(t,e){return bt.H.useCallback(t,e)};Pe.useContext=function(t){return bt.H.useContext(t)};Pe.useDebugValue=function(){};Pe.useDeferredValue=function(t,e){return bt.H.useDeferredValue(t,e)};Pe.useEffect=function(t,e){return bt.H.useEffect(t,e)};Pe.useEffectEvent=function(t){return bt.H.useEffectEvent(t)};Pe.useId=function(){return bt.H.useId()};Pe.useImperativeHandle=function(t,e,n){return bt.H.useImperativeHandle(t,e,n)};Pe.useInsertionEffect=function(t,e){return bt.H.useInsertionEffect(t,e)};Pe.useLayoutEffect=function(t,e){return bt.H.useLayoutEffect(t,e)};Pe.useMemo=function(t,e){return bt.H.useMemo(t,e)};Pe.useOptimistic=function(t,e){return bt.H.useOptimistic(t,e)};Pe.useReducer=function(t,e,n){return bt.H.useReducer(t,e,n)};Pe.useRef=function(t){return bt.H.useRef(t)};Pe.useState=function(t){return bt.H.useState(t)};Pe.useSyncExternalStore=function(t,e,n){return bt.H.useSyncExternalStore(t,e,n)};Pe.useTransition=function(){return bt.H.useTransition()};Pe.version="19.2.4";y_.exports=Pe;var he=y_.exports;const DS=fS(he);var w_={exports:{}},qc={},D_={exports:{}},N_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,L){var j=U.length;U.push(L);e:for(;0<j;){var K=j-1>>>1,ne=U[K];if(0<a(ne,L))U[K]=L,U[j]=ne,j=K;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var L=U[0],j=U.pop();if(j!==L){U[0]=j;e:for(var K=0,ne=U.length,me=ne>>>1;K<me;){var de=2*(K+1)-1,Le=U[de],Je=de+1,it=U[Je];if(0>a(Le,j))Je<ne&&0>a(it,Le)?(U[K]=it,U[Je]=j,K=Je):(U[K]=Le,U[de]=j,K=de);else if(Je<ne&&0>a(it,j))U[K]=it,U[Je]=j,K=Je;else break e}}return L}function a(U,L){var j=U.sortIndex-L.sortIndex;return j!==0?j:U.id-L.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],d=1,p=null,u=3,h=!1,g=!1,y=!1,_=!1,f=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;function M(U){for(var L=n(c);L!==null;){if(L.callback===null)i(c);else if(L.startTime<=U)i(c),L.sortIndex=L.expirationTime,e(l,L);else break;L=n(c)}}function w(U){if(y=!1,M(U),!g)if(n(l)!==null)g=!0,A||(A=!0,H());else{var L=n(c);L!==null&&G(w,L.startTime-U)}}var A=!1,R=-1,x=5,T=-1;function F(){return _?!0:!(t.unstable_now()-T<x)}function D(){if(_=!1,A){var U=t.unstable_now();T=U;var L=!0;try{e:{g=!1,y&&(y=!1,m(R),R=-1),h=!0;var j=u;try{t:{for(M(U),p=n(l);p!==null&&!(p.expirationTime>U&&F());){var K=p.callback;if(typeof K=="function"){p.callback=null,u=p.priorityLevel;var ne=K(p.expirationTime<=U);if(U=t.unstable_now(),typeof ne=="function"){p.callback=ne,M(U),L=!0;break t}p===n(l)&&i(l),M(U)}else i(l);p=n(l)}if(p!==null)L=!0;else{var me=n(c);me!==null&&G(w,me.startTime-U),L=!1}}break e}finally{p=null,u=j,h=!1}L=void 0}}finally{L?H():A=!1}}}var H;if(typeof v=="function")H=function(){v(D)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,q=k.port2;k.port1.onmessage=D,H=function(){q.postMessage(null)}}else H=function(){f(D,0)};function G(U,L){R=f(function(){U(t.unstable_now())},L)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(U){switch(u){case 1:case 2:case 3:var L=3;break;default:L=u}var j=u;u=L;try{return U()}finally{u=j}},t.unstable_requestPaint=function(){_=!0},t.unstable_runWithPriority=function(U,L){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var j=u;u=U;try{return L()}finally{u=j}},t.unstable_scheduleCallback=function(U,L,j){var K=t.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?K+j:K):j=K,U){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=j+ne,U={id:d++,callback:L,priorityLevel:U,startTime:j,expirationTime:ne,sortIndex:-1},j>K?(U.sortIndex=j,e(c,U),n(l)===null&&U===n(c)&&(y?(m(R),R=-1):y=!0,G(w,j-K))):(U.sortIndex=ne,e(l,U),g||h||(g=!0,A||(A=!0,H()))),U},t.unstable_shouldYield=F,t.unstable_wrapCallback=function(U){var L=u;return function(){var j=u;u=L;try{return U.apply(this,arguments)}finally{u=j}}}})(N_);D_.exports=N_;var NS=D_.exports,U_={exports:{}},mn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var US=he;function L_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ca(){}var hn={d:{f:ca,r:function(){throw Error(L_(522))},D:ca,C:ca,L:ca,m:ca,X:ca,S:ca,M:ca},p:0,findDOMNode:null},LS=Symbol.for("react.portal");function OS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:LS,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var co=US.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Yc(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}mn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=hn;mn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(L_(299));return OS(t,e,null,n)};mn.flushSync=function(t){var e=co.T,n=hn.p;try{if(co.T=null,hn.p=2,t)return t()}finally{co.T=e,hn.p=n,hn.d.f()}};mn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,hn.d.C(t,e))};mn.prefetchDNS=function(t){typeof t=="string"&&hn.d.D(t)};mn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=Yc(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?hn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&hn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};mn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=Yc(e.as,e.crossOrigin);hn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&hn.d.M(t)};mn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=Yc(n,e.crossOrigin);hn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};mn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=Yc(e.as,e.crossOrigin);hn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else hn.d.m(t)};mn.requestFormReset=function(t){hn.d.r(t)};mn.unstable_batchedUpdates=function(t,e){return t(e)};mn.useFormState=function(t,e,n){return co.H.useFormState(t,e,n)};mn.useFormStatus=function(){return co.H.useHostTransitionStatus()};mn.version="19.2.4";function O_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(O_)}catch(t){console.error(t)}}O_(),U_.exports=mn;var IS=U_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xt=NS,I_=he,PS=IS;function J(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function P_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Go(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function F_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function B_(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Kp(t){if(Go(t)!==t)throw Error(J(188))}function FS(t){var e=t.alternate;if(!e){if(e=Go(t),e===null)throw Error(J(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return Kp(a),t;if(s===i)return Kp(a),e;s=s.sibling}throw Error(J(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(J(189))}}if(n.alternate!==i)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?t:e}function z_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=z_(t),e!==null)return e;t=t.sibling}return null}var Tt=Object.assign,BS=Symbol.for("react.element"),rl=Symbol.for("react.transitional.element"),to=Symbol.for("react.portal"),qs=Symbol.for("react.fragment"),H_=Symbol.for("react.strict_mode"),Pf=Symbol.for("react.profiler"),G_=Symbol.for("react.consumer"),Gi=Symbol.for("react.context"),Dh=Symbol.for("react.forward_ref"),Ff=Symbol.for("react.suspense"),Bf=Symbol.for("react.suspense_list"),Nh=Symbol.for("react.memo"),_a=Symbol.for("react.lazy"),zf=Symbol.for("react.activity"),zS=Symbol.for("react.memo_cache_sentinel"),Qp=Symbol.iterator;function Gr(t){return t===null||typeof t!="object"?null:(t=Qp&&t[Qp]||t["@@iterator"],typeof t=="function"?t:null)}var HS=Symbol.for("react.client.reference");function Hf(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===HS?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case qs:return"Fragment";case Pf:return"Profiler";case H_:return"StrictMode";case Ff:return"Suspense";case Bf:return"SuspenseList";case zf:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case to:return"Portal";case Gi:return t.displayName||"Context";case G_:return(t._context.displayName||"Context")+".Consumer";case Dh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nh:return e=t.displayName||null,e!==null?e:Hf(t.type)||"Memo";case _a:e=t._payload,t=t._init;try{return Hf(t(e))}catch{}}return null}var no=Array.isArray,Ne=I_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt=PS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,us={pending:!1,data:null,method:null,action:null},Gf=[],Ys=-1;function bi(t){return{current:t}}function Jt(t){0>Ys||(t.current=Gf[Ys],Gf[Ys]=null,Ys--)}function Mt(t,e){Ys++,Gf[Ys]=t.current,t.current=e}var Si=bi(null),bo=bi(null),Da=bi(null),hc=bi(null);function pc(t,e){switch(Mt(Da,e),Mt(bo,t),Mt(Si,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?ig(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=ig(e),t=ox(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Jt(Si),Mt(Si,t)}function pr(){Jt(Si),Jt(bo),Jt(Da)}function Vf(t){t.memoizedState!==null&&Mt(hc,t);var e=Si.current,n=ox(e,t.type);e!==n&&(Mt(bo,t),Mt(Si,n))}function mc(t){bo.current===t&&(Jt(Si),Jt(bo)),hc.current===t&&(Jt(hc),Io._currentValue=us)}var xu,Jp;function ts(t){if(xu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);xu=e&&e[1]||"",Jp=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xu+t+Jp}var Su=!1;function Mu(t,e){if(!t||Su)return"";Su=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(h){var u=h}Reflect.construct(t,[],p)}else{try{p.call()}catch(h){u=h}t.call(p.prototype)}}else{try{throw Error()}catch(h){u=h}(p=t())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(h){if(h&&u&&typeof h.stack=="string")return[h.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=i&&0<=a);break}}}finally{Su=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?ts(n):""}function GS(t,e){switch(t.tag){case 26:case 27:case 5:return ts(t.type);case 16:return ts("Lazy");case 13:return t.child!==e&&e!==null?ts("Suspense Fallback"):ts("Suspense");case 19:return ts("SuspenseList");case 0:case 15:return Mu(t.type,!1);case 11:return Mu(t.type.render,!1);case 1:return Mu(t.type,!0);case 31:return ts("Activity");default:return""}}function $p(t){try{var e="",n=null;do e+=GS(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var kf=Object.prototype.hasOwnProperty,Uh=Xt.unstable_scheduleCallback,yu=Xt.unstable_cancelCallback,VS=Xt.unstable_shouldYield,kS=Xt.unstable_requestPaint,On=Xt.unstable_now,XS=Xt.unstable_getCurrentPriorityLevel,V_=Xt.unstable_ImmediatePriority,k_=Xt.unstable_UserBlockingPriority,gc=Xt.unstable_NormalPriority,jS=Xt.unstable_LowPriority,X_=Xt.unstable_IdlePriority,WS=Xt.log,qS=Xt.unstable_setDisableYieldValue,Vo=null,In=null;function ba(t){if(typeof WS=="function"&&qS(t),In&&typeof In.setStrictMode=="function")try{In.setStrictMode(Vo,t)}catch{}}var Pn=Math.clz32?Math.clz32:KS,YS=Math.log,ZS=Math.LN2;function KS(t){return t>>>=0,t===0?32:31-(YS(t)/ZS|0)|0}var ol=256,ll=262144,cl=4194304;function ns(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Zc(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=ns(i):(r&=o,r!==0?a=ns(r):n||(n=o&~t,n!==0&&(a=ns(n))))):(o=i&~s,o!==0?a=ns(o):r!==0?a=ns(r):n||(n=i&~t,n!==0&&(a=ns(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function ko(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function QS(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function j_(){var t=cl;return cl<<=1,!(cl&62914560)&&(cl=4194304),t}function Eu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Xo(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function JS(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-Pn(n),p=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var h=u[d];h!==null&&(h.lane&=-536870913)}n&=~p}i!==0&&W_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function W_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-Pn(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function q_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Pn(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function Y_(t,e){var n=e&-e;return n=n&42?1:Lh(n),n&(t.suspendedLanes|e)?0:n}function Lh(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Oh(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function Z_(){var t=nt.p;return t!==0?t:(t=window.event,t===void 0?32:vx(t.type))}function em(t,e){var n=nt.p;try{return nt.p=t,e()}finally{nt.p=n}}var Xa=Math.random().toString(36).slice(2),tn="__reactFiber$"+Xa,Tn="__reactProps$"+Xa,Nr="__reactContainer$"+Xa,Xf="__reactEvents$"+Xa,$S="__reactListeners$"+Xa,eM="__reactHandles$"+Xa,tm="__reactResources$"+Xa,jo="__reactMarker$"+Xa;function Ih(t){delete t[tn],delete t[Tn],delete t[Xf],delete t[$S],delete t[eM]}function Zs(t){var e=t[tn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Nr]||n[tn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=lg(t);t!==null;){if(n=t[tn])return n;t=lg(t)}return e}t=n,n=t.parentNode}return null}function Ur(t){if(t=t[tn]||t[Nr]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function io(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(J(33))}function sr(t){var e=t[tm];return e||(e=t[tm]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Qt(t){t[jo]=!0}var K_=new Set,Q_={};function Ms(t,e){mr(t,e),mr(t+"Capture",e)}function mr(t,e){for(Q_[t]=e,t=0;t<e.length;t++)K_.add(e[t])}var tM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nm={},im={};function nM(t){return kf.call(im,t)?!0:kf.call(nm,t)?!1:tM.test(t)?im[t]=!0:(nm[t]=!0,!1)}function Wl(t,e,n){if(nM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function ul(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Ci(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function kn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function J_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function iM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function jf(t){if(!t._valueTracker){var e=J_(t)?"checked":"value";t._valueTracker=iM(t,e,""+t[e])}}function $_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=J_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function _c(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var aM=/[\n"\\]/g;function qn(t){return t.replace(aM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Wf(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+kn(e)):t.value!==""+kn(e)&&(t.value=""+kn(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?qf(t,r,kn(e)):n!=null?qf(t,r,kn(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+kn(o):t.removeAttribute("name")}function e0(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){jf(t);return}n=n!=null?""+kn(n):"",e=e!=null?""+kn(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),jf(t)}function qf(t,e,n){e==="number"&&_c(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function rr(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+kn(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function t0(t,e,n){if(e!=null&&(e=""+kn(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+kn(n):""}function n0(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(J(92));if(no(i)){if(1<i.length)throw Error(J(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=kn(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),jf(t)}function gr(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var sM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function am(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||sM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function i0(t,e,n){if(e!=null&&typeof e!="object")throw Error(J(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&am(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&am(t,s,e[s])}function Ph(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var rM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),oM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ql(t){return oM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Vi(){}var Yf=null;function Fh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ks=null,or=null;function sm(t){var e=Ur(t);if(e&&(t=e.stateNode)){var n=t[Tn]||null;e:switch(t=e.stateNode,e.type){case"input":if(Wf(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+qn(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[Tn]||null;if(!a)throw Error(J(90));Wf(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&$_(i)}break e;case"textarea":t0(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&rr(t,!!n.multiple,e,!1)}}}var bu=!1;function a0(t,e,n){if(bu)return t(e,n);bu=!0;try{var i=t(e);return i}finally{if(bu=!1,(Ks!==null||or!==null)&&(ou(),Ks&&(e=Ks,t=or,or=Ks=null,sm(e),t)))for(e=0;e<t.length;e++)sm(t[e])}}function To(t,e){var n=t.stateNode;if(n===null)return null;var i=n[Tn]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(J(231,e,typeof n));return n}var Qi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zf=!1;if(Qi)try{var Vr={};Object.defineProperty(Vr,"passive",{get:function(){Zf=!0}}),window.addEventListener("test",Vr,Vr),window.removeEventListener("test",Vr,Vr)}catch{Zf=!1}var Ta=null,Bh=null,Yl=null;function s0(){if(Yl)return Yl;var t,e=Bh,n=e.length,i,a="value"in Ta?Ta.value:Ta.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Yl=a.slice(t,1<i?1-i:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function fl(){return!0}function rm(){return!1}function An(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?fl:rm,this.isPropagationStopped=rm,this}return Tt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fl)},persist:function(){},isPersistent:fl}),e}var ys={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kc=An(ys),Wo=Tt({},ys,{view:0,detail:0}),lM=An(Wo),Tu,Au,kr,Qc=Tt({},Wo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==kr&&(kr&&t.type==="mousemove"?(Tu=t.screenX-kr.screenX,Au=t.screenY-kr.screenY):Au=Tu=0,kr=t),Tu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),om=An(Qc),cM=Tt({},Qc,{dataTransfer:0}),uM=An(cM),fM=Tt({},Wo,{relatedTarget:0}),Ru=An(fM),dM=Tt({},ys,{animationName:0,elapsedTime:0,pseudoElement:0}),hM=An(dM),pM=Tt({},ys,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),mM=An(pM),gM=Tt({},ys,{data:0}),lm=An(gM),_M={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function SM(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=xM[t])?!!e[t]:!1}function zh(){return SM}var MM=Tt({},Wo,{key:function(t){if(t.key){var e=_M[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?vM[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zh,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),yM=An(MM),EM=Tt({},Qc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cm=An(EM),bM=Tt({},Wo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zh}),TM=An(bM),AM=Tt({},ys,{propertyName:0,elapsedTime:0,pseudoElement:0}),RM=An(AM),CM=Tt({},Qc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),wM=An(CM),DM=Tt({},ys,{newState:0,oldState:0}),NM=An(DM),UM=[9,13,27,32],Hh=Qi&&"CompositionEvent"in window,uo=null;Qi&&"documentMode"in document&&(uo=document.documentMode);var LM=Qi&&"TextEvent"in window&&!uo,r0=Qi&&(!Hh||uo&&8<uo&&11>=uo),um=" ",fm=!1;function o0(t,e){switch(t){case"keyup":return UM.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function l0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Qs=!1;function OM(t,e){switch(t){case"compositionend":return l0(e);case"keypress":return e.which!==32?null:(fm=!0,um);case"textInput":return t=e.data,t===um&&fm?null:t;default:return null}}function IM(t,e){if(Qs)return t==="compositionend"||!Hh&&o0(t,e)?(t=s0(),Yl=Bh=Ta=null,Qs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return r0&&e.locale!=="ko"?null:e.data;default:return null}}var PM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!PM[t.type]:e==="textarea"}function c0(t,e,n,i){Ks?or?or.push(i):or=[i]:Ks=i,e=Ic(e,"onChange"),0<e.length&&(n=new Kc("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var fo=null,Ao=null;function FM(t){ax(t,0)}function Jc(t){var e=io(t);if($_(e))return t}function hm(t,e){if(t==="change")return e}var u0=!1;if(Qi){var Cu;if(Qi){var wu="oninput"in document;if(!wu){var pm=document.createElement("div");pm.setAttribute("oninput","return;"),wu=typeof pm.oninput=="function"}Cu=wu}else Cu=!1;u0=Cu&&(!document.documentMode||9<document.documentMode)}function mm(){fo&&(fo.detachEvent("onpropertychange",f0),Ao=fo=null)}function f0(t){if(t.propertyName==="value"&&Jc(Ao)){var e=[];c0(e,Ao,t,Fh(t)),a0(FM,e)}}function BM(t,e,n){t==="focusin"?(mm(),fo=e,Ao=n,fo.attachEvent("onpropertychange",f0)):t==="focusout"&&mm()}function zM(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Jc(Ao)}function HM(t,e){if(t==="click")return Jc(e)}function GM(t,e){if(t==="input"||t==="change")return Jc(e)}function VM(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Bn=typeof Object.is=="function"?Object.is:VM;function Ro(t,e){if(Bn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!kf.call(e,a)||!Bn(t[a],e[a]))return!1}return!0}function gm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function _m(t,e){var n=gm(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=gm(n)}}function d0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?d0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function h0(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=_c(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=_c(t.document)}return e}function Gh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var kM=Qi&&"documentMode"in document&&11>=document.documentMode,Js=null,Kf=null,ho=null,Qf=!1;function vm(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Qf||Js==null||Js!==_c(i)||(i=Js,"selectionStart"in i&&Gh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ho&&Ro(ho,i)||(ho=i,i=Ic(Kf,"onSelect"),0<i.length&&(e=new Kc("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Js)))}function Ya(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var $s={animationend:Ya("Animation","AnimationEnd"),animationiteration:Ya("Animation","AnimationIteration"),animationstart:Ya("Animation","AnimationStart"),transitionrun:Ya("Transition","TransitionRun"),transitionstart:Ya("Transition","TransitionStart"),transitioncancel:Ya("Transition","TransitionCancel"),transitionend:Ya("Transition","TransitionEnd")},Du={},p0={};Qi&&(p0=document.createElement("div").style,"AnimationEvent"in window||(delete $s.animationend.animation,delete $s.animationiteration.animation,delete $s.animationstart.animation),"TransitionEvent"in window||delete $s.transitionend.transition);function Es(t){if(Du[t])return Du[t];if(!$s[t])return t;var e=$s[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in p0)return Du[t]=e[n];return t}var m0=Es("animationend"),g0=Es("animationiteration"),_0=Es("animationstart"),XM=Es("transitionrun"),jM=Es("transitionstart"),WM=Es("transitioncancel"),v0=Es("transitionend"),x0=new Map,Jf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Jf.push("scrollEnd");function ci(t,e){x0.set(t,e),Ms(e,[t])}var vc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Gn=[],er=0,Vh=0;function $c(){for(var t=er,e=Vh=er=0;e<t;){var n=Gn[e];Gn[e++]=null;var i=Gn[e];Gn[e++]=null;var a=Gn[e];Gn[e++]=null;var s=Gn[e];if(Gn[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&S0(n,a,s)}}function eu(t,e,n,i){Gn[er++]=t,Gn[er++]=e,Gn[er++]=n,Gn[er++]=i,Vh|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function kh(t,e,n,i){return eu(t,e,n,i),xc(t)}function bs(t,e){return eu(t,null,null,e),xc(t)}function S0(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-Pn(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function xc(t){if(50<yo)throw yo=0,xd=null,Error(J(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var tr={};function qM(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Un(t,e,n,i){return new qM(t,e,n,i)}function Xh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ji(t,e){var n=t.alternate;return n===null?(n=Un(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function M0(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Kl(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")Xh(t)&&(r=1);else if(typeof t=="string")r=Jy(t,n,Si.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case zf:return t=Un(31,n,e,a),t.elementType=zf,t.lanes=s,t;case qs:return fs(n.children,a,s,e);case H_:r=8,a|=24;break;case Pf:return t=Un(12,n,e,a|2),t.elementType=Pf,t.lanes=s,t;case Ff:return t=Un(13,n,e,a),t.elementType=Ff,t.lanes=s,t;case Bf:return t=Un(19,n,e,a),t.elementType=Bf,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Gi:r=10;break e;case G_:r=9;break e;case Dh:r=11;break e;case Nh:r=14;break e;case _a:r=16,i=null;break e}r=29,n=Error(J(130,t===null?"null":typeof t,"")),i=null}return e=Un(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function fs(t,e,n,i){return t=Un(7,t,i,e),t.lanes=n,t}function Nu(t,e,n){return t=Un(6,t,null,e),t.lanes=n,t}function y0(t){var e=Un(18,null,null,0);return e.stateNode=t,e}function Uu(t,e,n){return e=Un(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var xm=new WeakMap;function Yn(t,e){if(typeof t=="object"&&t!==null){var n=xm.get(t);return n!==void 0?n:(e={value:t,source:e,stack:$p(e)},xm.set(t,e),e)}return{value:t,source:e,stack:$p(e)}}var nr=[],ir=0,Sc=null,Co=0,Xn=[],jn=0,za=null,mi=1,gi="";function Bi(t,e){nr[ir++]=Co,nr[ir++]=Sc,Sc=t,Co=e}function E0(t,e,n){Xn[jn++]=mi,Xn[jn++]=gi,Xn[jn++]=za,za=t;var i=mi;t=gi;var a=32-Pn(i)-1;i&=~(1<<a),n+=1;var s=32-Pn(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,mi=1<<32-Pn(e)+a|n<<a|i,gi=s+t}else mi=1<<s|n<<a|i,gi=t}function jh(t){t.return!==null&&(Bi(t,1),E0(t,1,0))}function Wh(t){for(;t===Sc;)Sc=nr[--ir],nr[ir]=null,Co=nr[--ir],nr[ir]=null;for(;t===za;)za=Xn[--jn],Xn[jn]=null,gi=Xn[--jn],Xn[jn]=null,mi=Xn[--jn],Xn[jn]=null}function b0(t,e){Xn[jn++]=mi,Xn[jn++]=gi,Xn[jn++]=za,mi=e.id,gi=e.overflow,za=t}var nn=null,Et=null,Ze=!1,Na=null,Zn=!1,$f=Error(J(519));function Ha(t){var e=Error(J(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw wo(Yn(e,t)),$f}function Sm(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[tn]=t,e[Tn]=i,n){case"dialog":je("cancel",e),je("close",e);break;case"iframe":case"object":case"embed":je("load",e);break;case"video":case"audio":for(n=0;n<Lo.length;n++)je(Lo[n],e);break;case"source":je("error",e);break;case"img":case"image":case"link":je("error",e),je("load",e);break;case"details":je("toggle",e);break;case"input":je("invalid",e),e0(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":je("invalid",e);break;case"textarea":je("invalid",e),n0(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||rx(e.textContent,n)?(i.popover!=null&&(je("beforetoggle",e),je("toggle",e)),i.onScroll!=null&&je("scroll",e),i.onScrollEnd!=null&&je("scrollend",e),i.onClick!=null&&(e.onclick=Vi),e=!0):e=!1,e||Ha(t,!0)}function Mm(t){for(nn=t.return;nn;)switch(nn.tag){case 5:case 31:case 13:Zn=!1;return;case 27:case 3:Zn=!0;return;default:nn=nn.return}}function Cs(t){if(t!==nn)return!1;if(!Ze)return Mm(t),Ze=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||bd(t.type,t.memoizedProps)),n=!n),n&&Et&&Ha(t),Mm(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(J(317));Et=og(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(J(317));Et=og(t)}else e===27?(e=Et,ja(t.type)?(t=Cd,Cd=null,Et=t):Et=e):Et=nn?Jn(t.stateNode.nextSibling):null;return!0}function ms(){Et=nn=null,Ze=!1}function Lu(){var t=Na;return t!==null&&(Sn===null?Sn=t:Sn.push.apply(Sn,t),Na=null),t}function wo(t){Na===null?Na=[t]:Na.push(t)}var ed=bi(null),Ts=null,ki=null;function xa(t,e,n){Mt(ed,e._currentValue),e._currentValue=n}function Wi(t){t._currentValue=ed.current,Jt(ed)}function td(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function nd(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),td(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(J(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),td(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Lr(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(J(387));if(r=r.memoizedProps,r!==null){var o=a.type;Bn(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===hc.current){if(r=a.alternate,r===null)throw Error(J(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Io):t=[Io])}a=a.return}t!==null&&nd(e,t,n,i),e.flags|=262144}function Mc(t){for(t=t.firstContext;t!==null;){if(!Bn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function gs(t){Ts=t,ki=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function an(t){return T0(Ts,t)}function dl(t,e){return Ts===null&&gs(t),T0(t,e)}function T0(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},ki===null){if(t===null)throw Error(J(308));ki=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else ki=ki.next=e;return n}var YM=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},ZM=Xt.unstable_scheduleCallback,KM=Xt.unstable_NormalPriority,Gt={$$typeof:Gi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function qh(){return{controller:new YM,data:new Map,refCount:0}}function qo(t){t.refCount--,t.refCount===0&&ZM(KM,function(){t.controller.abort()})}var po=null,id=0,_r=0,lr=null;function QM(t,e){if(po===null){var n=po=[];id=0,_r=vp(),lr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return id++,e.then(ym,ym),e}function ym(){if(--id===0&&po!==null){lr!==null&&(lr.status="fulfilled");var t=po;po=null,_r=0,lr=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function JM(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Em=Ne.S;Ne.S=function(t,e){zv=On(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&QM(t,e),Em!==null&&Em(t,e)};var ds=bi(null);function Yh(){var t=ds.current;return t!==null?t:vt.pooledCache}function Ql(t,e){e===null?Mt(ds,ds.current):Mt(ds,e.pool)}function A0(){var t=Yh();return t===null?null:{parent:Gt._currentValue,pool:t}}var Or=Error(J(460)),Zh=Error(J(474)),tu=Error(J(542)),yc={then:function(){}};function bm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function R0(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Vi,Vi),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Am(t),t;default:if(typeof e.status=="string")e.then(Vi,Vi);else{if(t=vt,t!==null&&100<t.shellSuspendCounter)throw Error(J(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Am(t),t}throw hs=e,Or}}function is(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(hs=n,Or):n}}var hs=null;function Tm(){if(hs===null)throw Error(J(459));var t=hs;return hs=null,t}function Am(t){if(t===Or||t===tu)throw Error(J(483))}var cr=null,Do=0;function hl(t){var e=Do;return Do+=1,cr===null&&(cr=[]),R0(cr,t,e)}function Xr(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function pl(t,e){throw e.$$typeof===BS?Error(J(525)):(t=Object.prototype.toString.call(e),Error(J(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function C0(t){function e(f,m){if(t){var v=f.deletions;v===null?(f.deletions=[m],f.flags|=16):v.push(m)}}function n(f,m){if(!t)return null;for(;m!==null;)e(f,m),m=m.sibling;return null}function i(f){for(var m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function a(f,m){return f=ji(f,m),f.index=0,f.sibling=null,f}function s(f,m,v){return f.index=v,t?(v=f.alternate,v!==null?(v=v.index,v<m?(f.flags|=67108866,m):v):(f.flags|=67108866,m)):(f.flags|=1048576,m)}function r(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function o(f,m,v,M){return m===null||m.tag!==6?(m=Nu(v,f.mode,M),m.return=f,m):(m=a(m,v),m.return=f,m)}function l(f,m,v,M){var w=v.type;return w===qs?d(f,m,v.props.children,M,v.key):m!==null&&(m.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===_a&&is(w)===m.type)?(m=a(m,v.props),Xr(m,v),m.return=f,m):(m=Kl(v.type,v.key,v.props,null,f.mode,M),Xr(m,v),m.return=f,m)}function c(f,m,v,M){return m===null||m.tag!==4||m.stateNode.containerInfo!==v.containerInfo||m.stateNode.implementation!==v.implementation?(m=Uu(v,f.mode,M),m.return=f,m):(m=a(m,v.children||[]),m.return=f,m)}function d(f,m,v,M,w){return m===null||m.tag!==7?(m=fs(v,f.mode,M,w),m.return=f,m):(m=a(m,v),m.return=f,m)}function p(f,m,v){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=Nu(""+m,f.mode,v),m.return=f,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case rl:return v=Kl(m.type,m.key,m.props,null,f.mode,v),Xr(v,m),v.return=f,v;case to:return m=Uu(m,f.mode,v),m.return=f,m;case _a:return m=is(m),p(f,m,v)}if(no(m)||Gr(m))return m=fs(m,f.mode,v,null),m.return=f,m;if(typeof m.then=="function")return p(f,hl(m),v);if(m.$$typeof===Gi)return p(f,dl(f,m),v);pl(f,m)}return null}function u(f,m,v,M){var w=m!==null?m.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return w!==null?null:o(f,m,""+v,M);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case rl:return v.key===w?l(f,m,v,M):null;case to:return v.key===w?c(f,m,v,M):null;case _a:return v=is(v),u(f,m,v,M)}if(no(v)||Gr(v))return w!==null?null:d(f,m,v,M,null);if(typeof v.then=="function")return u(f,m,hl(v),M);if(v.$$typeof===Gi)return u(f,m,dl(f,v),M);pl(f,v)}return null}function h(f,m,v,M,w){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return f=f.get(v)||null,o(m,f,""+M,w);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case rl:return f=f.get(M.key===null?v:M.key)||null,l(m,f,M,w);case to:return f=f.get(M.key===null?v:M.key)||null,c(m,f,M,w);case _a:return M=is(M),h(f,m,v,M,w)}if(no(M)||Gr(M))return f=f.get(v)||null,d(m,f,M,w,null);if(typeof M.then=="function")return h(f,m,v,hl(M),w);if(M.$$typeof===Gi)return h(f,m,v,dl(m,M),w);pl(m,M)}return null}function g(f,m,v,M){for(var w=null,A=null,R=m,x=m=0,T=null;R!==null&&x<v.length;x++){R.index>x?(T=R,R=null):T=R.sibling;var F=u(f,R,v[x],M);if(F===null){R===null&&(R=T);break}t&&R&&F.alternate===null&&e(f,R),m=s(F,m,x),A===null?w=F:A.sibling=F,A=F,R=T}if(x===v.length)return n(f,R),Ze&&Bi(f,x),w;if(R===null){for(;x<v.length;x++)R=p(f,v[x],M),R!==null&&(m=s(R,m,x),A===null?w=R:A.sibling=R,A=R);return Ze&&Bi(f,x),w}for(R=i(R);x<v.length;x++)T=h(R,f,x,v[x],M),T!==null&&(t&&T.alternate!==null&&R.delete(T.key===null?x:T.key),m=s(T,m,x),A===null?w=T:A.sibling=T,A=T);return t&&R.forEach(function(D){return e(f,D)}),Ze&&Bi(f,x),w}function y(f,m,v,M){if(v==null)throw Error(J(151));for(var w=null,A=null,R=m,x=m=0,T=null,F=v.next();R!==null&&!F.done;x++,F=v.next()){R.index>x?(T=R,R=null):T=R.sibling;var D=u(f,R,F.value,M);if(D===null){R===null&&(R=T);break}t&&R&&D.alternate===null&&e(f,R),m=s(D,m,x),A===null?w=D:A.sibling=D,A=D,R=T}if(F.done)return n(f,R),Ze&&Bi(f,x),w;if(R===null){for(;!F.done;x++,F=v.next())F=p(f,F.value,M),F!==null&&(m=s(F,m,x),A===null?w=F:A.sibling=F,A=F);return Ze&&Bi(f,x),w}for(R=i(R);!F.done;x++,F=v.next())F=h(R,f,x,F.value,M),F!==null&&(t&&F.alternate!==null&&R.delete(F.key===null?x:F.key),m=s(F,m,x),A===null?w=F:A.sibling=F,A=F);return t&&R.forEach(function(H){return e(f,H)}),Ze&&Bi(f,x),w}function _(f,m,v,M){if(typeof v=="object"&&v!==null&&v.type===qs&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case rl:e:{for(var w=v.key;m!==null;){if(m.key===w){if(w=v.type,w===qs){if(m.tag===7){n(f,m.sibling),M=a(m,v.props.children),M.return=f,f=M;break e}}else if(m.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===_a&&is(w)===m.type){n(f,m.sibling),M=a(m,v.props),Xr(M,v),M.return=f,f=M;break e}n(f,m);break}else e(f,m);m=m.sibling}v.type===qs?(M=fs(v.props.children,f.mode,M,v.key),M.return=f,f=M):(M=Kl(v.type,v.key,v.props,null,f.mode,M),Xr(M,v),M.return=f,f=M)}return r(f);case to:e:{for(w=v.key;m!==null;){if(m.key===w)if(m.tag===4&&m.stateNode.containerInfo===v.containerInfo&&m.stateNode.implementation===v.implementation){n(f,m.sibling),M=a(m,v.children||[]),M.return=f,f=M;break e}else{n(f,m);break}else e(f,m);m=m.sibling}M=Uu(v,f.mode,M),M.return=f,f=M}return r(f);case _a:return v=is(v),_(f,m,v,M)}if(no(v))return g(f,m,v,M);if(Gr(v)){if(w=Gr(v),typeof w!="function")throw Error(J(150));return v=w.call(v),y(f,m,v,M)}if(typeof v.then=="function")return _(f,m,hl(v),M);if(v.$$typeof===Gi)return _(f,m,dl(f,v),M);pl(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,m!==null&&m.tag===6?(n(f,m.sibling),M=a(m,v),M.return=f,f=M):(n(f,m),M=Nu(v,f.mode,M),M.return=f,f=M),r(f)):n(f,m)}return function(f,m,v,M){try{Do=0;var w=_(f,m,v,M);return cr=null,w}catch(R){if(R===Or||R===tu)throw R;var A=Un(29,R,null,f.mode);return A.lanes=M,A.return=f,A}finally{}}}var _s=C0(!0),w0=C0(!1),va=!1;function Kh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ad(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ua(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function La(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,tt&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=xc(t),S0(t,null,n),e}return eu(t,i,e,n),xc(t)}function mo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,q_(t,n)}}function Ou(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var sd=!1;function go(){if(sd){var t=lr;if(t!==null)throw t}}function _o(t,e,n,i){sd=!1;var a=t.updateQueue;va=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var p=a.baseState;r=0,d=c=l=null,o=s;do{var u=o.lane&-536870913,h=u!==o.lane;if(h?(qe&u)===u:(i&u)===u){u!==0&&u===_r&&(sd=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,y=o;u=e;var _=n;switch(y.tag){case 1:if(g=y.payload,typeof g=="function"){p=g.call(_,p,u);break e}p=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=y.payload,u=typeof g=="function"?g.call(_,p,u):g,u==null)break e;p=Tt({},p,u);break e;case 2:va=!0}}u=o.callback,u!==null&&(t.flags|=64,h&&(t.flags|=8192),h=a.callbacks,h===null?a.callbacks=[u]:h.push(u))}else h={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=h,l=p):d=d.next=h,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;h=o,o=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);d===null&&(l=p),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,s===null&&(a.shared.lanes=0),Va|=r,t.lanes=r,t.memoizedState=p}}function D0(t,e){if(typeof t!="function")throw Error(J(191,t));t.call(e)}function N0(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)D0(n[t],e)}var vr=bi(null),Ec=bi(0);function Rm(t,e){t=ta,Mt(Ec,t),Mt(vr,e),ta=t|e.baseLanes}function rd(){Mt(Ec,ta),Mt(vr,vr.current)}function Qh(){ta=Ec.current,Jt(vr),Jt(Ec)}var zn=bi(null),Qn=null;function Sa(t){var e=t.alternate;Mt(Ut,Ut.current&1),Mt(zn,t),Qn===null&&(e===null||vr.current!==null||e.memoizedState!==null)&&(Qn=t)}function od(t){Mt(Ut,Ut.current),Mt(zn,t),Qn===null&&(Qn=t)}function U0(t){t.tag===22?(Mt(Ut,Ut.current),Mt(zn,t),Qn===null&&(Qn=t)):Ma()}function Ma(){Mt(Ut,Ut.current),Mt(zn,zn.current)}function Nn(t){Jt(zn),Qn===t&&(Qn=null),Jt(Ut)}var Ut=bi(0);function bc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Ad(n)||Rd(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ji=0,Be=null,pt=null,zt=null,Tc=!1,ur=!1,vs=!1,Ac=0,No=0,fr=null,$M=0;function Ct(){throw Error(J(321))}function Jh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Bn(t[n],e[n]))return!1;return!0}function $h(t,e,n,i,a,s){return Ji=s,Be=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ne.H=t===null||t.memoizedState===null?cv:up,vs=!1,s=n(i,a),vs=!1,ur&&(s=O0(e,n,i,a)),L0(t),s}function L0(t){Ne.H=Uo;var e=pt!==null&&pt.next!==null;if(Ji=0,zt=pt=Be=null,Tc=!1,No=0,fr=null,e)throw Error(J(300));t===null||Vt||(t=t.dependencies,t!==null&&Mc(t)&&(Vt=!0))}function O0(t,e,n,i){Be=t;var a=0;do{if(ur&&(fr=null),No=0,ur=!1,25<=a)throw Error(J(301));if(a+=1,zt=pt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Ne.H=uv,s=e(n,i)}while(ur);return s}function ey(){var t=Ne.H,e=t.useState()[0];return e=typeof e.then=="function"?Yo(e):e,t=t.useState()[0],(pt!==null?pt.memoizedState:null)!==t&&(Be.flags|=1024),e}function ep(){var t=Ac!==0;return Ac=0,t}function tp(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function np(t){if(Tc){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Tc=!1}Ji=0,zt=pt=Be=null,ur=!1,No=Ac=0,fr=null}function dn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zt===null?Be.memoizedState=zt=t:zt=zt.next=t,zt}function Ot(){if(pt===null){var t=Be.alternate;t=t!==null?t.memoizedState:null}else t=pt.next;var e=zt===null?Be.memoizedState:zt.next;if(e!==null)zt=e,pt=t;else{if(t===null)throw Be.alternate===null?Error(J(467)):Error(J(310));pt=t,t={memoizedState:pt.memoizedState,baseState:pt.baseState,baseQueue:pt.baseQueue,queue:pt.queue,next:null},zt===null?Be.memoizedState=zt=t:zt=zt.next=t}return zt}function nu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Yo(t){var e=No;return No+=1,fr===null&&(fr=[]),t=R0(fr,t,e),e=Be,(zt===null?e.memoizedState:zt.next)===null&&(e=e.alternate,Ne.H=e===null||e.memoizedState===null?cv:up),t}function iu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Yo(t);if(t.$$typeof===Gi)return an(t)}throw Error(J(438,String(t)))}function ip(t){var e=null,n=Be.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=Be.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=nu(),Be.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=zS;return e.index++,n}function $i(t,e){return typeof e=="function"?e(t):e}function Jl(t){var e=Ot();return ap(e,pt,t)}function ap(t,e,n){var i=t.queue;if(i===null)throw Error(J(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,d=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(qe&p)===p:(Ji&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===_r&&(d=!0);else if((Ji&u)===u){c=c.next,u===_r&&(d=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=s):l=l.next=p,Be.lanes|=u,Va|=u;p=c.action,vs&&n(s,p),s=c.hasEagerState?c.eagerState:n(s,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,Be.lanes|=p,Va|=p;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!Bn(s,t.memoizedState)&&(Vt=!0,d&&(n=lr,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function Iu(t){var e=Ot(),n=e.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);Bn(s,e.memoizedState)||(Vt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function I0(t,e,n){var i=Be,a=Ot(),s=Ze;if(s){if(n===void 0)throw Error(J(407));n=n()}else n=e();var r=!Bn((pt||a).memoizedState,n);if(r&&(a.memoizedState=n,Vt=!0),a=a.queue,sp(B0.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||zt!==null&&zt.memoizedState.tag&1){if(i.flags|=2048,xr(9,{destroy:void 0},F0.bind(null,i,a,n,e),null),vt===null)throw Error(J(349));s||Ji&127||P0(i,e,n)}return n}function P0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Be.updateQueue,e===null?(e=nu(),Be.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function F0(t,e,n,i){e.value=n,e.getSnapshot=i,z0(e)&&H0(t)}function B0(t,e,n){return n(function(){z0(e)&&H0(t)})}function z0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Bn(t,n)}catch{return!0}}function H0(t){var e=bs(t,2);e!==null&&yn(e,t,2)}function ld(t){var e=dn();if(typeof t=="function"){var n=t;if(t=n(),vs){ba(!0);try{n()}finally{ba(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:t},e}function G0(t,e,n,i){return t.baseState=n,ap(t,pt,typeof i=="function"?i:$i)}function ty(t,e,n,i,a){if(su(t))throw Error(J(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Ne.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,V0(e,s)):(s.next=n.next,e.pending=n.next=s)}}function V0(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=Ne.T,r={};Ne.T=r;try{var o=n(a,i),l=Ne.S;l!==null&&l(r,o),Cm(t,e,o)}catch(c){cd(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),Ne.T=s}}else try{s=n(a,i),Cm(t,e,s)}catch(c){cd(t,e,c)}}function Cm(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){wm(t,e,i)},function(i){return cd(t,e,i)}):wm(t,e,n)}function wm(t,e,n){e.status="fulfilled",e.value=n,k0(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,V0(t,n)))}function cd(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,k0(e),e=e.next;while(e!==i)}t.action=null}function k0(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function X0(t,e){return e}function Dm(t,e){if(Ze){var n=vt.formState;if(n!==null){e:{var i=Be;if(Ze){if(Et){t:{for(var a=Et,s=Zn;a.nodeType!==8;){if(!s){a=null;break t}if(a=Jn(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Et=Jn(a.nextSibling),i=a.data==="F!";break e}}Ha(i)}i=!1}i&&(e=n[0])}}return n=dn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:X0,lastRenderedState:e},n.queue=i,n=rv.bind(null,Be,i),i.dispatch=n,i=ld(!1),s=cp.bind(null,Be,!1,i.queue),i=dn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=ty.bind(null,Be,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Nm(t){var e=Ot();return j0(e,pt,t)}function j0(t,e,n){if(e=ap(t,e,X0)[0],t=Jl($i)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Yo(e)}catch(r){throw r===Or?tu:r}else i=e;e=Ot();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&(Be.flags|=2048,xr(9,{destroy:void 0},ny.bind(null,a,n),null)),[i,s,t]}function ny(t,e){t.action=e}function Um(t){var e=Ot(),n=pt;if(n!==null)return j0(e,n,t);Ot(),e=e.memoizedState,n=Ot();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function xr(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=Be.updateQueue,e===null&&(e=nu(),Be.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function W0(){return Ot().memoizedState}function $l(t,e,n,i){var a=dn();Be.flags|=t,a.memoizedState=xr(1|e,{destroy:void 0},n,i===void 0?null:i)}function au(t,e,n,i){var a=Ot();i=i===void 0?null:i;var s=a.memoizedState.inst;pt!==null&&i!==null&&Jh(i,pt.memoizedState.deps)?a.memoizedState=xr(e,s,n,i):(Be.flags|=t,a.memoizedState=xr(1|e,s,n,i))}function Lm(t,e){$l(8390656,8,t,e)}function sp(t,e){au(2048,8,t,e)}function iy(t){Be.flags|=4;var e=Be.updateQueue;if(e===null)e=nu(),Be.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function q0(t){var e=Ot().memoizedState;return iy({ref:e,nextImpl:t}),function(){if(tt&2)throw Error(J(440));return e.impl.apply(void 0,arguments)}}function Y0(t,e){return au(4,2,t,e)}function Z0(t,e){return au(4,4,t,e)}function K0(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Q0(t,e,n){n=n!=null?n.concat([t]):null,au(4,4,K0.bind(null,e,t),n)}function rp(){}function J0(t,e){var n=Ot();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&Jh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function $0(t,e){var n=Ot();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&Jh(e,i[1]))return i[0];if(i=t(),vs){ba(!0);try{t()}finally{ba(!1)}}return n.memoizedState=[i,e],i}function op(t,e,n){return n===void 0||Ji&1073741824&&!(qe&261930)?t.memoizedState=e:(t.memoizedState=n,t=Gv(),Be.lanes|=t,Va|=t,n)}function ev(t,e,n,i){return Bn(n,e)?n:vr.current!==null?(t=op(t,n,i),Bn(t,e)||(Vt=!0),t):!(Ji&42)||Ji&1073741824&&!(qe&261930)?(Vt=!0,t.memoizedState=n):(t=Gv(),Be.lanes|=t,Va|=t,e)}function tv(t,e,n,i,a){var s=nt.p;nt.p=s!==0&&8>s?s:8;var r=Ne.T,o={};Ne.T=o,cp(t,!1,e,n);try{var l=a(),c=Ne.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=JM(l,i);vo(t,e,d,Fn(t))}else vo(t,e,i,Fn(t))}catch(p){vo(t,e,{then:function(){},status:"rejected",reason:p},Fn())}finally{nt.p=s,r!==null&&o.types!==null&&(r.types=o.types),Ne.T=r}}function ay(){}function ud(t,e,n,i){if(t.tag!==5)throw Error(J(476));var a=nv(t).queue;tv(t,a,e,us,n===null?ay:function(){return iv(t),n(i)})}function nv(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:us,baseState:us,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:us},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function iv(t){var e=nv(t);e.next===null&&(e=t.alternate.memoizedState),vo(t,e.next.queue,{},Fn())}function lp(){return an(Io)}function av(){return Ot().memoizedState}function sv(){return Ot().memoizedState}function sy(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Fn();t=Ua(n);var i=La(e,t,n);i!==null&&(yn(i,e,n),mo(i,e,n)),e={cache:qh()},t.payload=e;return}e=e.return}}function ry(t,e,n){var i=Fn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},su(t)?ov(e,n):(n=kh(t,e,n,i),n!==null&&(yn(n,t,i),lv(n,e,i)))}function rv(t,e,n){var i=Fn();vo(t,e,n,i)}function vo(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(su(t))ov(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,Bn(o,r))return eu(t,e,a,0),vt===null&&$c(),!1}catch{}finally{}if(n=kh(t,e,a,i),n!==null)return yn(n,t,i),lv(n,e,i),!0}return!1}function cp(t,e,n,i){if(i={lane:2,revertLane:vp(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},su(t)){if(e)throw Error(J(479))}else e=kh(t,n,i,2),e!==null&&yn(e,t,2)}function su(t){var e=t.alternate;return t===Be||e!==null&&e===Be}function ov(t,e){ur=Tc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function lv(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,q_(t,n)}}var Uo={readContext:an,use:iu,useCallback:Ct,useContext:Ct,useEffect:Ct,useImperativeHandle:Ct,useLayoutEffect:Ct,useInsertionEffect:Ct,useMemo:Ct,useReducer:Ct,useRef:Ct,useState:Ct,useDebugValue:Ct,useDeferredValue:Ct,useTransition:Ct,useSyncExternalStore:Ct,useId:Ct,useHostTransitionStatus:Ct,useFormState:Ct,useActionState:Ct,useOptimistic:Ct,useMemoCache:Ct,useCacheRefresh:Ct};Uo.useEffectEvent=Ct;var cv={readContext:an,use:iu,useCallback:function(t,e){return dn().memoizedState=[t,e===void 0?null:e],t},useContext:an,useEffect:Lm,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,$l(4194308,4,K0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $l(4194308,4,t,e)},useInsertionEffect:function(t,e){$l(4,2,t,e)},useMemo:function(t,e){var n=dn();e=e===void 0?null:e;var i=t();if(vs){ba(!0);try{t()}finally{ba(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=dn();if(n!==void 0){var a=n(e);if(vs){ba(!0);try{n(e)}finally{ba(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=ry.bind(null,Be,t),[i.memoizedState,t]},useRef:function(t){var e=dn();return t={current:t},e.memoizedState=t},useState:function(t){t=ld(t);var e=t.queue,n=rv.bind(null,Be,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:rp,useDeferredValue:function(t,e){var n=dn();return op(n,t,e)},useTransition:function(){var t=ld(!1);return t=tv.bind(null,Be,t.queue,!0,!1),dn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=Be,a=dn();if(Ze){if(n===void 0)throw Error(J(407));n=n()}else{if(n=e(),vt===null)throw Error(J(349));qe&127||P0(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Lm(B0.bind(null,i,s,t),[t]),i.flags|=2048,xr(9,{destroy:void 0},F0.bind(null,i,s,n,e),null),n},useId:function(){var t=dn(),e=vt.identifierPrefix;if(Ze){var n=gi,i=mi;n=(i&~(1<<32-Pn(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Ac++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=$M++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:lp,useFormState:Dm,useActionState:Dm,useOptimistic:function(t){var e=dn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=cp.bind(null,Be,!0,n),n.dispatch=e,[t,e]},useMemoCache:ip,useCacheRefresh:function(){return dn().memoizedState=sy.bind(null,Be)},useEffectEvent:function(t){var e=dn(),n={impl:t};return e.memoizedState=n,function(){if(tt&2)throw Error(J(440));return n.impl.apply(void 0,arguments)}}},up={readContext:an,use:iu,useCallback:J0,useContext:an,useEffect:sp,useImperativeHandle:Q0,useInsertionEffect:Y0,useLayoutEffect:Z0,useMemo:$0,useReducer:Jl,useRef:W0,useState:function(){return Jl($i)},useDebugValue:rp,useDeferredValue:function(t,e){var n=Ot();return ev(n,pt.memoizedState,t,e)},useTransition:function(){var t=Jl($i)[0],e=Ot().memoizedState;return[typeof t=="boolean"?t:Yo(t),e]},useSyncExternalStore:I0,useId:av,useHostTransitionStatus:lp,useFormState:Nm,useActionState:Nm,useOptimistic:function(t,e){var n=Ot();return G0(n,pt,t,e)},useMemoCache:ip,useCacheRefresh:sv};up.useEffectEvent=q0;var uv={readContext:an,use:iu,useCallback:J0,useContext:an,useEffect:sp,useImperativeHandle:Q0,useInsertionEffect:Y0,useLayoutEffect:Z0,useMemo:$0,useReducer:Iu,useRef:W0,useState:function(){return Iu($i)},useDebugValue:rp,useDeferredValue:function(t,e){var n=Ot();return pt===null?op(n,t,e):ev(n,pt.memoizedState,t,e)},useTransition:function(){var t=Iu($i)[0],e=Ot().memoizedState;return[typeof t=="boolean"?t:Yo(t),e]},useSyncExternalStore:I0,useId:av,useHostTransitionStatus:lp,useFormState:Um,useActionState:Um,useOptimistic:function(t,e){var n=Ot();return pt!==null?G0(n,pt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:ip,useCacheRefresh:sv};uv.useEffectEvent=q0;function Pu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Tt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var fd={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Fn(),a=Ua(i);a.payload=e,n!=null&&(a.callback=n),e=La(t,a,i),e!==null&&(yn(e,t,i),mo(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Fn(),a=Ua(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=La(t,a,i),e!==null&&(yn(e,t,i),mo(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Fn(),i=Ua(n);i.tag=2,e!=null&&(i.callback=e),e=La(t,i,n),e!==null&&(yn(e,t,n),mo(e,t,n))}};function Om(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!Ro(n,i)||!Ro(a,s):!0}function Im(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&fd.enqueueReplaceState(e,e.state,null)}function xs(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=Tt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function fv(t){vc(t)}function dv(t){console.error(t)}function hv(t){vc(t)}function Rc(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function Pm(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function dd(t,e,n){return n=Ua(n),n.tag=3,n.payload={element:null},n.callback=function(){Rc(t,e)},n}function pv(t){return t=Ua(t),t.tag=3,t}function mv(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){Pm(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Pm(e,n,i),typeof a!="function"&&(Oa===null?Oa=new Set([this]):Oa.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function oy(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&Lr(e,n,a,!0),n=zn.current,n!==null){switch(n.tag){case 31:case 13:return Qn===null?Uc():n.alternate===null&&wt===0&&(wt=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===yc?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),qu(t,i,a)),!1;case 22:return n.flags|=65536,i===yc?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),qu(t,i,a)),!1}throw Error(J(435,n.tag))}return qu(t,i,a),Uc(),!1}if(Ze)return e=zn.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==$f&&(t=Error(J(422),{cause:i}),wo(Yn(t,n)))):(i!==$f&&(e=Error(J(423),{cause:i}),wo(Yn(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=Yn(i,n),a=dd(t.stateNode,i,a),Ou(t,a),wt!==4&&(wt=2)),!1;var s=Error(J(520),{cause:i});if(s=Yn(s,n),Mo===null?Mo=[s]:Mo.push(s),wt!==4&&(wt=2),e===null)return!0;i=Yn(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=dd(n.stateNode,i,t),Ou(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Oa===null||!Oa.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=pv(a),mv(a,t,n,i),Ou(n,a),!1}n=n.return}while(n!==null);return!1}var fp=Error(J(461)),Vt=!1;function en(t,e,n,i){e.child=t===null?w0(e,null,n,i):_s(e,t.child,n,i)}function Fm(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return gs(e),i=$h(t,e,n,r,s,a),o=ep(),t!==null&&!Vt?(tp(t,e,a),ea(t,e,a)):(Ze&&o&&jh(e),e.flags|=1,en(t,e,i,a),e.child)}function Bm(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!Xh(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,gv(t,e,s,i,a)):(t=Kl(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!dp(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ro,n(r,i)&&t.ref===e.ref)return ea(t,e,a)}return e.flags|=1,t=ji(s,i),t.ref=e.ref,t.return=e,e.child=t}function gv(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(Ro(s,i)&&t.ref===e.ref)if(Vt=!1,e.pendingProps=i=s,dp(t,a))t.flags&131072&&(Vt=!0);else return e.lanes=t.lanes,ea(t,e,a)}return hd(t,e,n,i,a)}function _v(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return zm(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ql(e,s!==null?s.cachePool:null),s!==null?Rm(e,s):rd(),U0(e);else return i=e.lanes=536870912,zm(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Ql(e,s.cachePool),Rm(e,s),Ma(),e.memoizedState=null):(t!==null&&Ql(e,null),rd(),Ma());return en(t,e,a,n),e.child}function ao(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function zm(t,e,n,i,a){var s=Yh();return s=s===null?null:{parent:Gt._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Ql(e,null),rd(),U0(e),t!==null&&Lr(t,e,i,!0),e.childLanes=a,null}function ec(t,e){return e=Cc({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Hm(t,e,n){return _s(e,t.child,null,n),t=ec(e,e.pendingProps),t.flags|=2,Nn(e),e.memoizedState=null,t}function ly(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(Ze){if(i.mode==="hidden")return t=ec(e,i),e.lanes=536870912,ao(null,t);if(od(e),(t=Et)?(t=cx(t,Zn),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:za!==null?{id:mi,overflow:gi}:null,retryLane:536870912,hydrationErrors:null},n=y0(t),n.return=e,e.child=n,nn=e,Et=null)):t=null,t===null)throw Ha(e);return e.lanes=536870912,null}return ec(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(od(e),a)if(e.flags&256)e.flags&=-257,e=Hm(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(J(558));else if(Vt||Lr(t,e,n,!1),a=(n&t.childLanes)!==0,Vt||a){if(i=vt,i!==null&&(r=Y_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,bs(t,r),yn(i,t,r),fp;Uc(),e=Hm(t,e,n)}else t=s.treeContext,Et=Jn(r.nextSibling),nn=e,Ze=!0,Na=null,Zn=!1,t!==null&&b0(e,t),e=ec(e,i),e.flags|=4096;return e}return t=ji(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function tc(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(J(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function hd(t,e,n,i,a){return gs(e),n=$h(t,e,n,i,void 0,a),i=ep(),t!==null&&!Vt?(tp(t,e,a),ea(t,e,a)):(Ze&&i&&jh(e),e.flags|=1,en(t,e,n,a),e.child)}function Gm(t,e,n,i,a,s){return gs(e),e.updateQueue=null,n=O0(e,i,n,a),L0(t),i=ep(),t!==null&&!Vt?(tp(t,e,s),ea(t,e,s)):(Ze&&i&&jh(e),e.flags|=1,en(t,e,n,s),e.child)}function Vm(t,e,n,i,a){if(gs(e),e.stateNode===null){var s=tr,r=n.contextType;typeof r=="object"&&r!==null&&(s=an(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=fd,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},Kh(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?an(r):tr,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Pu(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&fd.enqueueReplaceState(s,s.state,null),_o(e,i,s,a),go(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=xs(n,o);s.props=l;var c=s.context,d=n.contextType;r=tr,typeof d=="object"&&d!==null&&(r=an(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&Im(e,s,i,r),va=!1;var u=e.memoizedState;s.state=u,_o(e,i,s,a),go(),c=e.memoizedState,o||u!==c||va?(typeof p=="function"&&(Pu(e,n,p,i),c=e.memoizedState),(l=va||Om(e,n,l,i,u,c,r))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,ad(t,e),r=e.memoizedProps,d=xs(n,r),s.props=d,p=e.pendingProps,u=s.context,c=n.contextType,l=tr,typeof c=="object"&&c!==null&&(l=an(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==p||u!==l)&&Im(e,s,i,l),va=!1,u=e.memoizedState,s.state=u,_o(e,i,s,a),go();var h=e.memoizedState;r!==p||u!==h||va||t!==null&&t.dependencies!==null&&Mc(t.dependencies)?(typeof o=="function"&&(Pu(e,n,o,i),h=e.memoizedState),(d=va||Om(e,n,d,i,u,h,l)||t!==null&&t.dependencies!==null&&Mc(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,h,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,h,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=h),s.props=i,s.state=h,s.context=l,i=d):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,tc(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=_s(e,t.child,null,a),e.child=_s(e,null,n,a)):en(t,e,n,a),e.memoizedState=s.state,t=e.child):t=ea(t,e,a),t}function km(t,e,n,i){return ms(),e.flags|=256,en(t,e,n,i),e.child}var Fu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Bu(t){return{baseLanes:t,cachePool:A0()}}function zu(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Ln),t}function vv(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:(Ut.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(Ze){if(a?Sa(e):Ma(),(t=Et)?(t=cx(t,Zn),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:za!==null?{id:mi,overflow:gi}:null,retryLane:536870912,hydrationErrors:null},n=y0(t),n.return=e,e.child=n,nn=e,Et=null)):t=null,t===null)throw Ha(e);return Rd(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(Ma(),a=e.mode,o=Cc({mode:"hidden",children:o},a),i=fs(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=Bu(n),i.childLanes=zu(t,r,n),e.memoizedState=Fu,ao(null,i)):(Sa(e),pd(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?(Sa(e),e.flags&=-257,e=Hu(t,e,n)):e.memoizedState!==null?(Ma(),e.child=t.child,e.flags|=128,e=null):(Ma(),o=i.fallback,a=e.mode,i=Cc({mode:"visible",children:i.children},a),o=fs(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,_s(e,t.child,null,n),i=e.child,i.memoizedState=Bu(n),i.childLanes=zu(t,r,n),e.memoizedState=Fu,e=ao(null,i));else if(Sa(e),Rd(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(J(419)),i.stack="",i.digest=r,wo({value:i,source:null,stack:null}),e=Hu(t,e,n)}else if(Vt||Lr(t,e,n,!1),r=(n&t.childLanes)!==0,Vt||r){if(r=vt,r!==null&&(i=Y_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,bs(t,i),yn(r,t,i),fp;Ad(o)||Uc(),e=Hu(t,e,n)}else Ad(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,Et=Jn(o.nextSibling),nn=e,Ze=!0,Na=null,Zn=!1,t!==null&&b0(e,t),e=pd(e,i.children),e.flags|=4096);return e}return a?(Ma(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=ji(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=ji(c,o):(o=fs(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,ao(null,i),i=e.child,o=t.child.memoizedState,o===null?o=Bu(n):(a=o.cachePool,a!==null?(l=Gt._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=A0(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=zu(t,r,n),e.memoizedState=Fu,ao(t.child,i)):(Sa(e),n=t.child,t=n.sibling,n=ji(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function pd(t,e){return e=Cc({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Cc(t,e){return t=Un(22,t,null,e),t.lanes=0,t}function Hu(t,e,n){return _s(e,t.child,null,n),t=pd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Xm(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),td(t.return,e,n)}function Gu(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function xv(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=Ut.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,Mt(Ut,r),en(t,e,i,n),i=Ze?Co:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Xm(t,n,e);else if(t.tag===19)Xm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&bc(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Gu(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&bc(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Gu(e,!0,n,null,s,i);break;case"together":Gu(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function ea(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Va|=e.lanes,!(n&e.childLanes))if(t!==null){if(Lr(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(J(153));if(e.child!==null){for(t=e.child,n=ji(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ji(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function dp(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Mc(t)))}function cy(t,e,n){switch(e.tag){case 3:pc(e,e.stateNode.containerInfo),xa(e,Gt,t.memoizedState.cache),ms();break;case 27:case 5:Vf(e);break;case 4:pc(e,e.stateNode.containerInfo);break;case 10:xa(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,od(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(Sa(e),e.flags|=128,null):n&e.child.childLanes?vv(t,e,n):(Sa(e),t=ea(t,e,n),t!==null?t.sibling:null);Sa(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(Lr(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return xv(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Mt(Ut,Ut.current),i)break;return null;case 22:return e.lanes=0,_v(t,e,n,e.pendingProps);case 24:xa(e,Gt,t.memoizedState.cache)}return ea(t,e,n)}function Sv(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Vt=!0;else{if(!dp(t,n)&&!(e.flags&128))return Vt=!1,cy(t,e,n);Vt=!!(t.flags&131072)}else Vt=!1,Ze&&e.flags&1048576&&E0(e,Co,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=is(e.elementType),e.type=t,typeof t=="function")Xh(t)?(i=xs(t,i),e.tag=1,e=Vm(null,e,t,i,n)):(e.tag=0,e=hd(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Dh){e.tag=11,e=Fm(null,e,t,i,n);break e}else if(a===Nh){e.tag=14,e=Bm(null,e,t,i,n);break e}}throw e=Hf(t)||t,Error(J(306,e,""))}}return e;case 0:return hd(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=xs(i,e.pendingProps),Vm(t,e,i,a,n);case 3:e:{if(pc(e,e.stateNode.containerInfo),t===null)throw Error(J(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,ad(t,e),_o(e,i,null,n);var r=e.memoizedState;if(i=r.cache,xa(e,Gt,i),i!==s.cache&&nd(e,[Gt],n,!0),go(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=km(t,e,i,n);break e}else if(i!==a){a=Yn(Error(J(424)),e),wo(a),e=km(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Et=Jn(t.firstChild),nn=e,Ze=!0,Na=null,Zn=!0,n=w0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ms(),i===a){e=ea(t,e,n);break e}en(t,e,i,n)}e=e.child}return e;case 26:return tc(t,e),t===null?(n=ug(e.type,null,e.pendingProps,null))?e.memoizedState=n:Ze||(n=e.type,t=e.pendingProps,i=Pc(Da.current).createElement(n),i[tn]=e,i[Tn]=t,rn(i,n,t),Qt(i),e.stateNode=i):e.memoizedState=ug(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Vf(e),t===null&&Ze&&(i=e.stateNode=ux(e.type,e.pendingProps,Da.current),nn=e,Zn=!0,a=Et,ja(e.type)?(Cd=a,Et=Jn(i.firstChild)):Et=a),en(t,e,e.pendingProps.children,n),tc(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&Ze&&((a=i=Et)&&(i=zy(i,e.type,e.pendingProps,Zn),i!==null?(e.stateNode=i,nn=e,Et=Jn(i.firstChild),Zn=!1,a=!0):a=!1),a||Ha(e)),Vf(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,bd(a,s)?i=null:r!==null&&bd(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=$h(t,e,ey,null,null,n),Io._currentValue=a),tc(t,e),en(t,e,i,n),e.child;case 6:return t===null&&Ze&&((t=n=Et)&&(n=Hy(n,e.pendingProps,Zn),n!==null?(e.stateNode=n,nn=e,Et=null,t=!0):t=!1),t||Ha(e)),null;case 13:return vv(t,e,n);case 4:return pc(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=_s(e,null,i,n):en(t,e,i,n),e.child;case 11:return Fm(t,e,e.type,e.pendingProps,n);case 7:return en(t,e,e.pendingProps,n),e.child;case 8:return en(t,e,e.pendingProps.children,n),e.child;case 12:return en(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,xa(e,e.type,i.value),en(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,gs(e),a=an(a),i=i(a),e.flags|=1,en(t,e,i,n),e.child;case 14:return Bm(t,e,e.type,e.pendingProps,n);case 15:return gv(t,e,e.type,e.pendingProps,n);case 19:return xv(t,e,n);case 31:return ly(t,e,n);case 22:return _v(t,e,n,e.pendingProps);case 24:return gs(e),i=an(Gt),t===null?(a=Yh(),a===null&&(a=vt,s=qh(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},Kh(e),xa(e,Gt,a)):(t.lanes&n&&(ad(t,e),_o(e,null,null,n),go()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),xa(e,Gt,i)):(i=s.cache,xa(e,Gt,i),i!==a.cache&&nd(e,[Gt],n,!0))),en(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(J(156,e.tag))}function wi(t){t.flags|=4}function Vu(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(Xv())t.flags|=8192;else throw hs=yc,Zh}else t.flags&=-16777217}function jm(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!hx(e))if(Xv())t.flags|=8192;else throw hs=yc,Zh}function ml(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?j_():536870912,t.lanes|=e,Sr|=e)}function jr(t,e){if(!Ze)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function yt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function uy(t,e,n){var i=e.pendingProps;switch(Wh(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return yt(e),null;case 1:return yt(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Wi(Gt),pr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Cs(e)?wi(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Lu())),yt(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(wi(e),s!==null?(yt(e),jm(e,s)):(yt(e),Vu(e,a,null,i,n))):s?s!==t.memoizedState?(wi(e),yt(e),jm(e,s)):(yt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&wi(e),yt(e),Vu(e,a,t,i,n)),null;case 27:if(mc(e),n=Da.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&wi(e);else{if(!i){if(e.stateNode===null)throw Error(J(166));return yt(e),null}t=Si.current,Cs(e)?Sm(e):(t=ux(a,i,n),e.stateNode=t,wi(e))}return yt(e),null;case 5:if(mc(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&wi(e);else{if(!i){if(e.stateNode===null)throw Error(J(166));return yt(e),null}if(s=Si.current,Cs(e))Sm(e);else{var r=Pc(Da.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[tn]=e,s[Tn]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(rn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&wi(e)}}return yt(e),Vu(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&wi(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(J(166));if(t=Da.current,Cs(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=nn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[tn]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||rx(t.nodeValue,n)),t||Ha(e,!0)}else t=Pc(t).createTextNode(i),t[tn]=e,e.stateNode=t}return yt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=Cs(e),n!==null){if(t===null){if(!i)throw Error(J(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(J(557));t[tn]=e}else ms(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;yt(e),t=!1}else n=Lu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Nn(e),e):(Nn(e),null);if(e.flags&128)throw Error(J(558))}return yt(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=Cs(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(J(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(J(317));a[tn]=e}else ms(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;yt(e),a=!1}else a=Lu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(Nn(e),e):(Nn(e),null)}return Nn(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),ml(e,e.updateQueue),yt(e),null);case 4:return pr(),t===null&&xp(e.stateNode.containerInfo),yt(e),null;case 10:return Wi(e.type),yt(e),null;case 19:if(Jt(Ut),i=e.memoizedState,i===null)return yt(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)jr(i,!1);else{if(wt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=bc(t),s!==null){for(e.flags|=128,jr(i,!1),t=s.updateQueue,e.updateQueue=t,ml(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)M0(n,t),n=n.sibling;return Mt(Ut,Ut.current&1|2),Ze&&Bi(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&On()>Dc&&(e.flags|=128,a=!0,jr(i,!1),e.lanes=4194304)}else{if(!a)if(t=bc(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,ml(e,t),jr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Ze)return yt(e),null}else 2*On()-i.renderingStartTime>Dc&&n!==536870912&&(e.flags|=128,a=!0,jr(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=On(),t.sibling=null,n=Ut.current,Mt(Ut,a?n&1|2:n&1),Ze&&Bi(e,i.treeForkCount),t):(yt(e),null);case 22:case 23:return Nn(e),Qh(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(yt(e),e.subtreeFlags&6&&(e.flags|=8192)):yt(e),n=e.updateQueue,n!==null&&ml(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&Jt(ds),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Wi(Gt),yt(e),null;case 25:return null;case 30:return null}throw Error(J(156,e.tag))}function fy(t,e){switch(Wh(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Wi(Gt),pr(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return mc(e),null;case 31:if(e.memoizedState!==null){if(Nn(e),e.alternate===null)throw Error(J(340));ms()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Nn(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(J(340));ms()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Jt(Ut),null;case 4:return pr(),null;case 10:return Wi(e.type),null;case 22:case 23:return Nn(e),Qh(),t!==null&&Jt(ds),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Wi(Gt),null;case 25:return null;default:return null}}function Mv(t,e){switch(Wh(e),e.tag){case 3:Wi(Gt),pr();break;case 26:case 27:case 5:mc(e);break;case 4:pr();break;case 31:e.memoizedState!==null&&Nn(e);break;case 13:Nn(e);break;case 19:Jt(Ut);break;case 10:Wi(e.type);break;case 22:case 23:Nn(e),Qh(),t!==null&&Jt(ds);break;case 24:Wi(Gt)}}function Zo(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){ct(e,e.return,o)}}function Ga(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(d){ct(a,l,d)}}}i=i.next}while(i!==s)}}catch(d){ct(e,e.return,d)}}function yv(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{N0(e,n)}catch(i){ct(t,t.return,i)}}}function Ev(t,e,n){n.props=xs(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){ct(t,e,i)}}function xo(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){ct(t,e,a)}}function _i(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){ct(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){ct(t,e,a)}else n.current=null}function bv(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){ct(t,t.return,a)}}function ku(t,e,n){try{var i=t.stateNode;Ly(i,t.type,n,e),i[Tn]=e}catch(a){ct(t,t.return,a)}}function Tv(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ja(t.type)||t.tag===4}function Xu(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Tv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ja(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function md(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Vi));else if(i!==4&&(i===27&&ja(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(md(t,e,n),t=t.sibling;t!==null;)md(t,e,n),t=t.sibling}function wc(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&ja(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(wc(t,e,n),t=t.sibling;t!==null;)wc(t,e,n),t=t.sibling}function Av(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);rn(e,i,n),e[tn]=t,e[Tn]=n}catch(s){ct(t,t.return,s)}}var zi=!1,Ht=!1,ju=!1,Wm=typeof WeakSet=="function"?WeakSet:Set,Kt=null;function dy(t,e){if(t=t.containerInfo,yd=Hc,t=h0(t),Gh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,d=0,p=t,u=null;t:for(;;){for(var h;p!==n||a!==0&&p.nodeType!==3||(o=r+a),p!==s||i!==0&&p.nodeType!==3||(l=r+i),p.nodeType===3&&(r+=p.nodeValue.length),(h=p.firstChild)!==null;)u=p,p=h;for(;;){if(p===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++d===i&&(l=r),(h=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=h}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ed={focusedElem:t,selectionRange:n},Hc=!1,Kt=e;Kt!==null;)if(e=Kt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Kt=t;else for(;Kt!==null;){switch(e=Kt,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=xs(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(y){ct(n,n.return,y)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Td(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Td(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(J(163))}if(t=e.sibling,t!==null){t.return=e.return,Kt=t;break}Kt=e.return}}function Rv(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Ni(t,n),i&4&&Zo(5,n);break;case 1:if(Ni(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){ct(n,n.return,r)}else{var a=xs(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){ct(n,n.return,r)}}i&64&&yv(n),i&512&&xo(n,n.return);break;case 3:if(Ni(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{N0(t,e)}catch(r){ct(n,n.return,r)}}break;case 27:e===null&&i&4&&Av(n);case 26:case 5:Ni(t,n),e===null&&i&4&&bv(n),i&512&&xo(n,n.return);break;case 12:Ni(t,n);break;case 31:Ni(t,n),i&4&&Dv(t,n);break;case 13:Ni(t,n),i&4&&Nv(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=My.bind(null,n),Gy(t,n))));break;case 22:if(i=n.memoizedState!==null||zi,!i){e=e!==null&&e.memoizedState!==null||Ht,a=zi;var s=Ht;zi=i,(Ht=e)&&!s?Fi(t,n,(n.subtreeFlags&8772)!==0):Ni(t,n),zi=a,Ht=s}break;case 30:break;default:Ni(t,n)}}function Cv(t){var e=t.alternate;e!==null&&(t.alternate=null,Cv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Ih(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var At=null,xn=!1;function Di(t,e,n){for(n=n.child;n!==null;)wv(t,e,n),n=n.sibling}function wv(t,e,n){if(In&&typeof In.onCommitFiberUnmount=="function")try{In.onCommitFiberUnmount(Vo,n)}catch{}switch(n.tag){case 26:Ht||_i(n,e),Di(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ht||_i(n,e);var i=At,a=xn;ja(n.type)&&(At=n.stateNode,xn=!1),Di(t,e,n),Eo(n.stateNode),At=i,xn=a;break;case 5:Ht||_i(n,e);case 6:if(i=At,a=xn,At=null,Di(t,e,n),At=i,xn=a,At!==null)if(xn)try{(At.nodeType===9?At.body:At.nodeName==="HTML"?At.ownerDocument.body:At).removeChild(n.stateNode)}catch(s){ct(n,e,s)}else try{At.removeChild(n.stateNode)}catch(s){ct(n,e,s)}break;case 18:At!==null&&(xn?(t=At,sg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),br(t)):sg(At,n.stateNode));break;case 4:i=At,a=xn,At=n.stateNode.containerInfo,xn=!0,Di(t,e,n),At=i,xn=a;break;case 0:case 11:case 14:case 15:Ga(2,n,e),Ht||Ga(4,n,e),Di(t,e,n);break;case 1:Ht||(_i(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Ev(n,e,i)),Di(t,e,n);break;case 21:Di(t,e,n);break;case 22:Ht=(i=Ht)||n.memoizedState!==null,Di(t,e,n),Ht=i;break;default:Di(t,e,n)}}function Dv(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{br(t)}catch(n){ct(e,e.return,n)}}}function Nv(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{br(t)}catch(n){ct(e,e.return,n)}}function hy(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Wm),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Wm),e;default:throw Error(J(435,t.tag))}}function gl(t,e){var n=hy(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=yy.bind(null,t,i);i.then(a,a)}})}function gn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(ja(o.type)){At=o.stateNode,xn=!1;break e}break;case 5:At=o.stateNode,xn=!1;break e;case 3:case 4:At=o.stateNode.containerInfo,xn=!0;break e}o=o.return}if(At===null)throw Error(J(160));wv(s,r,a),At=null,xn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Uv(e,t),e=e.sibling}var si=null;function Uv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:gn(e,t),_n(t),i&4&&(Ga(3,t,t.return),Zo(3,t),Ga(5,t,t.return));break;case 1:gn(e,t),_n(t),i&512&&(Ht||n===null||_i(n,n.return)),i&64&&zi&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=si;if(gn(e,t),_n(t),i&512&&(Ht||n===null||_i(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[jo]||s[tn]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),rn(s,i,n),s[tn]=t,Qt(s),i=s;break e;case"link":var r=dg("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),rn(s,i,n),a.head.appendChild(s);break;case"meta":if(r=dg("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),rn(s,i,n),a.head.appendChild(s);break;default:throw Error(J(468,i))}s[tn]=t,Qt(s),i=s}t.stateNode=i}else hg(a,t.type,t.stateNode);else t.stateNode=fg(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?hg(a,t.type,t.stateNode):fg(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&ku(t,t.memoizedProps,n.memoizedProps)}break;case 27:gn(e,t),_n(t),i&512&&(Ht||n===null||_i(n,n.return)),n!==null&&i&4&&ku(t,t.memoizedProps,n.memoizedProps);break;case 5:if(gn(e,t),_n(t),i&512&&(Ht||n===null||_i(n,n.return)),t.flags&32){a=t.stateNode;try{gr(a,"")}catch(g){ct(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,ku(t,a,n!==null?n.memoizedProps:a)),i&1024&&(ju=!0);break;case 6:if(gn(e,t),_n(t),i&4){if(t.stateNode===null)throw Error(J(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){ct(t,t.return,g)}}break;case 3:if(ac=null,a=si,si=Fc(e.containerInfo),gn(e,t),si=a,_n(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{br(e.containerInfo)}catch(g){ct(t,t.return,g)}ju&&(ju=!1,Lv(t));break;case 4:i=si,si=Fc(t.stateNode.containerInfo),gn(e,t),_n(t),si=i;break;case 12:gn(e,t),_n(t);break;case 31:gn(e,t),_n(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,gl(t,i)));break;case 13:gn(e,t),_n(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(ru=On()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,gl(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=zi,d=Ht;if(zi=c||a,Ht=d||l,gn(e,t),Ht=d,zi=c,_n(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||zi||Ht||as(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var p=l.memoizedProps.style,u=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){ct(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){ct(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var h=l.stateNode;a?rg(h,!0):rg(l.stateNode,!1)}catch(g){ct(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,gl(t,n))));break;case 19:gn(e,t),_n(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,gl(t,i)));break;case 30:break;case 21:break;default:gn(e,t),_n(t)}}function _n(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(Tv(i)){n=i;break}i=i.return}if(n==null)throw Error(J(160));switch(n.tag){case 27:var a=n.stateNode,s=Xu(t);wc(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(gr(r,""),n.flags&=-33);var o=Xu(t);wc(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=Xu(t);md(t,c,l);break;default:throw Error(J(161))}}catch(d){ct(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Lv(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Lv(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ni(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Rv(t,e.alternate,e),e=e.sibling}function as(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Ga(4,e,e.return),as(e);break;case 1:_i(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Ev(e,e.return,n),as(e);break;case 27:Eo(e.stateNode);case 26:case 5:_i(e,e.return),as(e);break;case 22:e.memoizedState===null&&as(e);break;case 30:as(e);break;default:as(e)}t=t.sibling}}function Fi(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:Fi(a,s,n),Zo(4,s);break;case 1:if(Fi(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){ct(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)D0(l[a],o)}catch(c){ct(i,i.return,c)}}n&&r&64&&yv(s),xo(s,s.return);break;case 27:Av(s);case 26:case 5:Fi(a,s,n),n&&i===null&&r&4&&bv(s),xo(s,s.return);break;case 12:Fi(a,s,n);break;case 31:Fi(a,s,n),n&&r&4&&Dv(a,s);break;case 13:Fi(a,s,n),n&&r&4&&Nv(a,s);break;case 22:s.memoizedState===null&&Fi(a,s,n),xo(s,s.return);break;case 30:break;default:Fi(a,s,n)}e=e.sibling}}function hp(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&qo(n))}function pp(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&qo(t))}function ti(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ov(t,e,n,i),e=e.sibling}function Ov(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:ti(t,e,n,i),a&2048&&Zo(9,e);break;case 1:ti(t,e,n,i);break;case 3:ti(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&qo(t)));break;case 12:if(a&2048){ti(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){ct(e,e.return,l)}}else ti(t,e,n,i);break;case 31:ti(t,e,n,i);break;case 13:ti(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?ti(t,e,n,i):So(t,e):s._visibility&2?ti(t,e,n,i):(s._visibility|=2,js(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&hp(r,e);break;case 24:ti(t,e,n,i),a&2048&&pp(e.alternate,e);break;default:ti(t,e,n,i)}}function js(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:js(s,r,o,l,a),Zo(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?js(s,r,o,l,a):So(s,r):(d._visibility|=2,js(s,r,o,l,a)),a&&c&2048&&hp(r.alternate,r);break;case 24:js(s,r,o,l,a),a&&c&2048&&pp(r.alternate,r);break;default:js(s,r,o,l,a)}e=e.sibling}}function So(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:So(n,i),a&2048&&hp(i.alternate,i);break;case 24:So(n,i),a&2048&&pp(i.alternate,i);break;default:So(n,i)}e=e.sibling}}var so=8192;function ws(t,e,n){if(t.subtreeFlags&so)for(t=t.child;t!==null;)Iv(t,e,n),t=t.sibling}function Iv(t,e,n){switch(t.tag){case 26:ws(t,e,n),t.flags&so&&t.memoizedState!==null&&$y(n,si,t.memoizedState,t.memoizedProps);break;case 5:ws(t,e,n);break;case 3:case 4:var i=si;si=Fc(t.stateNode.containerInfo),ws(t,e,n),si=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=so,so=16777216,ws(t,e,n),so=i):ws(t,e,n));break;default:ws(t,e,n)}}function Pv(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Wr(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];Kt=i,Bv(i,t)}Pv(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Fv(t),t=t.sibling}function Fv(t){switch(t.tag){case 0:case 11:case 15:Wr(t),t.flags&2048&&Ga(9,t,t.return);break;case 3:Wr(t);break;case 12:Wr(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,nc(t)):Wr(t);break;default:Wr(t)}}function nc(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];Kt=i,Bv(i,t)}Pv(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Ga(8,e,e.return),nc(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,nc(e));break;default:nc(e)}t=t.sibling}}function Bv(t,e){for(;Kt!==null;){var n=Kt;switch(n.tag){case 0:case 11:case 15:Ga(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:qo(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Kt=i;else e:for(n=t;Kt!==null;){i=Kt;var a=i.sibling,s=i.return;if(Cv(i),i===n){Kt=null;break e}if(a!==null){a.return=s,Kt=a;break e}Kt=s}}}var py={getCacheForType:function(t){var e=an(Gt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return an(Gt).controller.signal}},my=typeof WeakMap=="function"?WeakMap:Map,tt=0,vt=null,We=null,qe=0,lt=0,Dn=null,Aa=!1,Ir=!1,mp=!1,ta=0,wt=0,Va=0,ps=0,gp=0,Ln=0,Sr=0,Mo=null,Sn=null,gd=!1,ru=0,zv=0,Dc=1/0,Nc=null,Oa=null,kt=0,Ia=null,Mr=null,qi=0,_d=0,vd=null,Hv=null,yo=0,xd=null;function Fn(){return tt&2&&qe!==0?qe&-qe:Ne.T!==null?vp():Z_()}function Gv(){if(Ln===0)if(!(qe&536870912)||Ze){var t=ll;ll<<=1,!(ll&3932160)&&(ll=262144),Ln=t}else Ln=536870912;return t=zn.current,t!==null&&(t.flags|=32),Ln}function yn(t,e,n){(t===vt&&(lt===2||lt===9)||t.cancelPendingCommit!==null)&&(yr(t,0),Ra(t,qe,Ln,!1)),Xo(t,n),(!(tt&2)||t!==vt)&&(t===vt&&(!(tt&2)&&(ps|=n),wt===4&&Ra(t,qe,Ln,!1)),Ti(t))}function Vv(t,e,n){if(tt&6)throw Error(J(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||ko(t,e),a=i?vy(t,e):Wu(t,e,!0),s=i;do{if(a===0){Ir&&!i&&Ra(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!gy(n)){a=Wu(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=Mo;var l=o.current.memoizedState.isDehydrated;if(l&&(yr(o,r).flags|=256),r=Wu(o,r,!1),r!==2){if(mp&&!l){o.errorRecoveryDisabledLanes|=s,ps|=s,a=4;break e}s=Sn,Sn=a,s!==null&&(Sn===null?Sn=s:Sn.push.apply(Sn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){yr(t,0),Ra(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(J(345));case 4:if((e&4194048)!==e)break;case 6:Ra(i,e,Ln,!Aa);break e;case 2:Sn=null;break;case 3:case 5:break;default:throw Error(J(329))}if((e&62914560)===e&&(a=ru+300-On(),10<a)){if(Ra(i,e,Ln,!Aa),Zc(i,0,!0)!==0)break e;qi=e,i.timeoutHandle=lx(qm.bind(null,i,n,Sn,Nc,gd,e,Ln,ps,Sr,Aa,s,"Throttled",-0,0),a);break e}qm(i,n,Sn,Nc,gd,e,Ln,ps,Sr,Aa,s,null,-0,0)}}break}while(!0);Ti(t)}function qm(t,e,n,i,a,s,r,o,l,c,d,p,u,h){if(t.timeoutHandle=-1,p=e.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Vi},Iv(e,s,p);var g=(s&62914560)===s?ru-On():(s&4194048)===s?zv-On():0;if(g=eE(p,g),g!==null){qi=s,t.cancelPendingCommit=g(Zm.bind(null,t,e,s,n,i,a,r,o,l,d,p,null,u,h)),Ra(t,s,r,!c);return}}Zm(t,e,s,n,i,a,r,o,l)}function gy(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!Bn(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ra(t,e,n,i){e&=~gp,e&=~ps,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-Pn(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&W_(t,n,e)}function ou(){return tt&6?!0:(Ko(0),!1)}function _p(){if(We!==null){if(lt===0)var t=We.return;else t=We,ki=Ts=null,np(t),cr=null,Do=0,t=We;for(;t!==null;)Mv(t.alternate,t),t=t.return;We=null}}function yr(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,Py(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),qi=0,_p(),vt=t,We=n=ji(t.current,null),qe=e,lt=0,Dn=null,Aa=!1,Ir=ko(t,e),mp=!1,Sr=Ln=gp=ps=Va=wt=0,Sn=Mo=null,gd=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-Pn(i),s=1<<a;e|=t[a],i&=~s}return ta=e,$c(),n}function kv(t,e){Be=null,Ne.H=Uo,e===Or||e===tu?(e=Tm(),lt=3):e===Zh?(e=Tm(),lt=4):lt=e===fp?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Dn=e,We===null&&(wt=1,Rc(t,Yn(e,t.current)))}function Xv(){var t=zn.current;return t===null?!0:(qe&4194048)===qe?Qn===null:(qe&62914560)===qe||qe&536870912?t===Qn:!1}function jv(){var t=Ne.H;return Ne.H=Uo,t===null?Uo:t}function Wv(){var t=Ne.A;return Ne.A=py,t}function Uc(){wt=4,Aa||(qe&4194048)!==qe&&zn.current!==null||(Ir=!0),!(Va&134217727)&&!(ps&134217727)||vt===null||Ra(vt,qe,Ln,!1)}function Wu(t,e,n){var i=tt;tt|=2;var a=jv(),s=Wv();(vt!==t||qe!==e)&&(Nc=null,yr(t,e)),e=!1;var r=wt;e:do try{if(lt!==0&&We!==null){var o=We,l=Dn;switch(lt){case 8:_p(),r=6;break e;case 3:case 2:case 9:case 6:zn.current===null&&(e=!0);var c=lt;if(lt=0,Dn=null,ar(t,o,l,c),n&&Ir){r=0;break e}break;default:c=lt,lt=0,Dn=null,ar(t,o,l,c)}}_y(),r=wt;break}catch(d){kv(t,d)}while(!0);return e&&t.shellSuspendCounter++,ki=Ts=null,tt=i,Ne.H=a,Ne.A=s,We===null&&(vt=null,qe=0,$c()),r}function _y(){for(;We!==null;)qv(We)}function vy(t,e){var n=tt;tt|=2;var i=jv(),a=Wv();vt!==t||qe!==e?(Nc=null,Dc=On()+500,yr(t,e)):Ir=ko(t,e);e:do try{if(lt!==0&&We!==null){e=We;var s=Dn;t:switch(lt){case 1:lt=0,Dn=null,ar(t,e,s,1);break;case 2:case 9:if(bm(s)){lt=0,Dn=null,Ym(e);break}e=function(){lt!==2&&lt!==9||vt!==t||(lt=7),Ti(t)},s.then(e,e);break e;case 3:lt=7;break e;case 4:lt=5;break e;case 7:bm(s)?(lt=0,Dn=null,Ym(e)):(lt=0,Dn=null,ar(t,e,s,7));break;case 5:var r=null;switch(We.tag){case 26:r=We.memoizedState;case 5:case 27:var o=We;if(r?hx(r):o.stateNode.complete){lt=0,Dn=null;var l=o.sibling;if(l!==null)We=l;else{var c=o.return;c!==null?(We=c,lu(c)):We=null}break t}}lt=0,Dn=null,ar(t,e,s,5);break;case 6:lt=0,Dn=null,ar(t,e,s,6);break;case 8:_p(),wt=6;break e;default:throw Error(J(462))}}xy();break}catch(d){kv(t,d)}while(!0);return ki=Ts=null,Ne.H=i,Ne.A=a,tt=n,We!==null?0:(vt=null,qe=0,$c(),wt)}function xy(){for(;We!==null&&!VS();)qv(We)}function qv(t){var e=Sv(t.alternate,t,ta);t.memoizedProps=t.pendingProps,e===null?lu(t):We=e}function Ym(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Gm(n,e,e.pendingProps,e.type,void 0,qe);break;case 11:e=Gm(n,e,e.pendingProps,e.type.render,e.ref,qe);break;case 5:np(e);default:Mv(n,e),e=We=M0(e,ta),e=Sv(n,e,ta)}t.memoizedProps=t.pendingProps,e===null?lu(t):We=e}function ar(t,e,n,i){ki=Ts=null,np(e),cr=null,Do=0;var a=e.return;try{if(oy(t,a,e,n,qe)){wt=1,Rc(t,Yn(n,t.current)),We=null;return}}catch(s){if(a!==null)throw We=a,s;wt=1,Rc(t,Yn(n,t.current)),We=null;return}e.flags&32768?(Ze||i===1?t=!0:Ir||qe&536870912?t=!1:(Aa=t=!0,(i===2||i===9||i===3||i===6)&&(i=zn.current,i!==null&&i.tag===13&&(i.flags|=16384))),Yv(e,t)):lu(e)}function lu(t){var e=t;do{if(e.flags&32768){Yv(e,Aa);return}t=e.return;var n=uy(e.alternate,e,ta);if(n!==null){We=n;return}if(e=e.sibling,e!==null){We=e;return}We=e=t}while(e!==null);wt===0&&(wt=5)}function Yv(t,e){do{var n=fy(t.alternate,t);if(n!==null){n.flags&=32767,We=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){We=t;return}We=t=n}while(t!==null);wt=6,We=null}function Zm(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do cu();while(kt!==0);if(tt&6)throw Error(J(327));if(e!==null){if(e===t.current)throw Error(J(177));if(s=e.lanes|e.childLanes,s|=Vh,JS(t,n,s,r,o,l),t===vt&&(We=vt=null,qe=0),Mr=e,Ia=t,qi=n,_d=s,vd=a,Hv=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,Ey(gc,function(){return $v(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=Ne.T,Ne.T=null,a=nt.p,nt.p=2,r=tt,tt|=4;try{dy(t,e,n)}finally{tt=r,nt.p=a,Ne.T=i}}kt=1,Zv(),Kv(),Qv()}}function Zv(){if(kt===1){kt=0;var t=Ia,e=Mr,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Ne.T,Ne.T=null;var i=nt.p;nt.p=2;var a=tt;tt|=4;try{Uv(e,t);var s=Ed,r=h0(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&d0(o.ownerDocument.documentElement,o)){if(l!==null&&Gh(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var h=u.getSelection(),g=o.textContent.length,y=Math.min(l.start,g),_=l.end===void 0?y:Math.min(l.end,g);!h.extend&&y>_&&(r=_,_=y,y=r);var f=_m(o,y),m=_m(o,_);if(f&&m&&(h.rangeCount!==1||h.anchorNode!==f.node||h.anchorOffset!==f.offset||h.focusNode!==m.node||h.focusOffset!==m.offset)){var v=p.createRange();v.setStart(f.node,f.offset),h.removeAllRanges(),y>_?(h.addRange(v),h.extend(m.node,m.offset)):(v.setEnd(m.node,m.offset),h.addRange(v))}}}}for(p=[],h=o;h=h.parentNode;)h.nodeType===1&&p.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var M=p[o];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Hc=!!yd,Ed=yd=null}finally{tt=a,nt.p=i,Ne.T=n}}t.current=e,kt=2}}function Kv(){if(kt===2){kt=0;var t=Ia,e=Mr,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Ne.T,Ne.T=null;var i=nt.p;nt.p=2;var a=tt;tt|=4;try{Rv(t,e.alternate,e)}finally{tt=a,nt.p=i,Ne.T=n}}kt=3}}function Qv(){if(kt===4||kt===3){kt=0,kS();var t=Ia,e=Mr,n=qi,i=Hv;e.subtreeFlags&10256||e.flags&10256?kt=5:(kt=0,Mr=Ia=null,Jv(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(Oa=null),Oh(n),e=e.stateNode,In&&typeof In.onCommitFiberRoot=="function")try{In.onCommitFiberRoot(Vo,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=Ne.T,a=nt.p,nt.p=2,Ne.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{Ne.T=e,nt.p=a}}qi&3&&cu(),Ti(t),a=t.pendingLanes,n&261930&&a&42?t===xd?yo++:(yo=0,xd=t):yo=0,Ko(0)}}function Jv(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,qo(e)))}function cu(){return Zv(),Kv(),Qv(),$v()}function $v(){if(kt!==5)return!1;var t=Ia,e=_d;_d=0;var n=Oh(qi),i=Ne.T,a=nt.p;try{nt.p=32>n?32:n,Ne.T=null,n=vd,vd=null;var s=Ia,r=qi;if(kt=0,Mr=Ia=null,qi=0,tt&6)throw Error(J(331));var o=tt;if(tt|=4,Fv(s.current),Ov(s,s.current,r,n),tt=o,Ko(0,!1),In&&typeof In.onPostCommitFiberRoot=="function")try{In.onPostCommitFiberRoot(Vo,s)}catch{}return!0}finally{nt.p=a,Ne.T=i,Jv(t,e)}}function Km(t,e,n){e=Yn(n,e),e=dd(t.stateNode,e,2),t=La(t,e,2),t!==null&&(Xo(t,2),Ti(t))}function ct(t,e,n){if(t.tag===3)Km(t,t,n);else for(;e!==null;){if(e.tag===3){Km(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Oa===null||!Oa.has(i))){t=Yn(n,t),n=pv(2),i=La(e,n,2),i!==null&&(mv(n,i,e,t),Xo(i,2),Ti(i));break}}e=e.return}}function qu(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new my;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(mp=!0,a.add(n),t=Sy.bind(null,t,e,n),e.then(t,t))}function Sy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,vt===t&&(qe&n)===n&&(wt===4||wt===3&&(qe&62914560)===qe&&300>On()-ru?!(tt&2)&&yr(t,0):gp|=n,Sr===qe&&(Sr=0)),Ti(t)}function ex(t,e){e===0&&(e=j_()),t=bs(t,e),t!==null&&(Xo(t,e),Ti(t))}function My(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ex(t,n)}function yy(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(J(314))}i!==null&&i.delete(e),ex(t,n)}function Ey(t,e){return Uh(t,e)}var Lc=null,Ws=null,Sd=!1,Oc=!1,Yu=!1,Ca=0;function Ti(t){t!==Ws&&t.next===null&&(Ws===null?Lc=Ws=t:Ws=Ws.next=t),Oc=!0,Sd||(Sd=!0,Ty())}function Ko(t,e){if(!Yu&&Oc){Yu=!0;do for(var n=!1,i=Lc;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-Pn(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,Qm(i,s))}else s=qe,s=Zc(i,i===vt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||ko(i,s)||(n=!0,Qm(i,s));i=i.next}while(n);Yu=!1}}function by(){tx()}function tx(){Oc=Sd=!1;var t=0;Ca!==0&&Iy()&&(t=Ca);for(var e=On(),n=null,i=Lc;i!==null;){var a=i.next,s=nx(i,e);s===0?(i.next=null,n===null?Lc=a:n.next=a,a===null&&(Ws=n)):(n=i,(t!==0||s&3)&&(Oc=!0)),i=a}kt!==0&&kt!==5||Ko(t),Ca!==0&&(Ca=0)}function nx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-Pn(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=QS(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=vt,n=qe,n=Zc(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(lt===2||lt===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&yu(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||ko(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&yu(i),Oh(n)){case 2:case 8:n=k_;break;case 32:n=gc;break;case 268435456:n=X_;break;default:n=gc}return i=ix.bind(null,t),n=Uh(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&yu(i),t.callbackPriority=2,t.callbackNode=null,2}function ix(t,e){if(kt!==0&&kt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(cu()&&t.callbackNode!==n)return null;var i=qe;return i=Zc(t,t===vt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(Vv(t,i,e),nx(t,On()),t.callbackNode!=null&&t.callbackNode===n?ix.bind(null,t):null)}function Qm(t,e){if(cu())return null;Vv(t,e,!0)}function Ty(){Fy(function(){tt&6?Uh(V_,by):tx()})}function vp(){if(Ca===0){var t=_r;t===0&&(t=ol,ol<<=1,!(ol&261888)&&(ol=256)),Ca=t}return Ca}function Jm(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:ql(""+t)}function $m(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function Ay(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=Jm((a[Tn]||null).action),r=i.submitter;r&&(e=(e=r[Tn]||null)?Jm(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new Kc("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ca!==0){var l=r?$m(a,r):new FormData(a);ud(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?$m(a,r):new FormData(a),ud(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var Zu=0;Zu<Jf.length;Zu++){var Ku=Jf[Zu],Ry=Ku.toLowerCase(),Cy=Ku[0].toUpperCase()+Ku.slice(1);ci(Ry,"on"+Cy)}ci(m0,"onAnimationEnd");ci(g0,"onAnimationIteration");ci(_0,"onAnimationStart");ci("dblclick","onDoubleClick");ci("focusin","onFocus");ci("focusout","onBlur");ci(XM,"onTransitionRun");ci(jM,"onTransitionStart");ci(WM,"onTransitionCancel");ci(v0,"onTransitionEnd");mr("onMouseEnter",["mouseout","mouseover"]);mr("onMouseLeave",["mouseout","mouseover"]);mr("onPointerEnter",["pointerout","pointerover"]);mr("onPointerLeave",["pointerout","pointerover"]);Ms("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ms("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ms("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ms("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ms("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ms("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lo));function ax(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){vc(d)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){vc(d)}a.currentTarget=null,s=l}}}}function je(t,e){var n=e[Xf];n===void 0&&(n=e[Xf]=new Set);var i=t+"__bubble";n.has(i)||(sx(e,t,2,!1),n.add(i))}function Qu(t,e,n){var i=0;e&&(i|=4),sx(n,t,i,e)}var _l="_reactListening"+Math.random().toString(36).slice(2);function xp(t){if(!t[_l]){t[_l]=!0,K_.forEach(function(n){n!=="selectionchange"&&(wy.has(n)||Qu(n,!1,t),Qu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[_l]||(e[_l]=!0,Qu("selectionchange",!1,e))}}function sx(t,e,n,i){switch(vx(e)){case 2:var a=iE;break;case 8:a=aE;break;default:a=Ep}n=a.bind(null,e,n,t),a=void 0,!Zf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function Ju(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Zs(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}a0(function(){var c=s,d=Fh(n),p=[];e:{var u=x0.get(t);if(u!==void 0){var h=Kc,g=t;switch(t){case"keypress":if(Zl(n)===0)break e;case"keydown":case"keyup":h=yM;break;case"focusin":g="focus",h=Ru;break;case"focusout":g="blur",h=Ru;break;case"beforeblur":case"afterblur":h=Ru;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=om;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=uM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=TM;break;case m0:case g0:case _0:h=hM;break;case v0:h=RM;break;case"scroll":case"scrollend":h=lM;break;case"wheel":h=wM;break;case"copy":case"cut":case"paste":h=mM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=cm;break;case"toggle":case"beforetoggle":h=NM}var y=(e&4)!==0,_=!y&&(t==="scroll"||t==="scrollend"),f=y?u!==null?u+"Capture":null:u;y=[];for(var m=c,v;m!==null;){var M=m;if(v=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||v===null||f===null||(M=To(m,f),M!=null&&y.push(Oo(m,M,v))),_)break;m=m.return}0<y.length&&(u=new h(u,g,null,n,d),p.push({event:u,listeners:y}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",h=t==="mouseout"||t==="pointerout",u&&n!==Yf&&(g=n.relatedTarget||n.fromElement)&&(Zs(g)||g[Nr]))break e;if((h||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,h?(g=n.relatedTarget||n.toElement,h=c,g=g?Zs(g):null,g!==null&&(_=Go(g),y=g.tag,g!==_||y!==5&&y!==27&&y!==6)&&(g=null)):(h=null,g=c),h!==g)){if(y=om,M="onMouseLeave",f="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(y=cm,M="onPointerLeave",f="onPointerEnter",m="pointer"),_=h==null?u:io(h),v=g==null?u:io(g),u=new y(M,m+"leave",h,n,d),u.target=_,u.relatedTarget=v,M=null,Zs(d)===c&&(y=new y(f,m+"enter",g,n,d),y.target=v,y.relatedTarget=_,M=y),_=M,h&&g)t:{for(y=Dy,f=h,m=g,v=0,M=f;M;M=y(M))v++;M=0;for(var w=m;w;w=y(w))M++;for(;0<v-M;)f=y(f),v--;for(;0<M-v;)m=y(m),M--;for(;v--;){if(f===m||m!==null&&f===m.alternate){y=f;break t}f=y(f),m=y(m)}y=null}else y=null;h!==null&&eg(p,u,h,y,!1),g!==null&&_!==null&&eg(p,_,g,y,!0)}}e:{if(u=c?io(c):window,h=u.nodeName&&u.nodeName.toLowerCase(),h==="select"||h==="input"&&u.type==="file")var A=hm;else if(dm(u))if(u0)A=GM;else{A=zM;var R=BM}else h=u.nodeName,!h||h.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Ph(c.elementType)&&(A=hm):A=HM;if(A&&(A=A(t,c))){c0(p,A,n,d);break e}R&&R(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&qf(u,"number",u.value)}switch(R=c?io(c):window,t){case"focusin":(dm(R)||R.contentEditable==="true")&&(Js=R,Kf=c,ho=null);break;case"focusout":ho=Kf=Js=null;break;case"mousedown":Qf=!0;break;case"contextmenu":case"mouseup":case"dragend":Qf=!1,vm(p,n,d);break;case"selectionchange":if(kM)break;case"keydown":case"keyup":vm(p,n,d)}var x;if(Hh)e:{switch(t){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Qs?o0(t,n)&&(T="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(r0&&n.locale!=="ko"&&(Qs||T!=="onCompositionStart"?T==="onCompositionEnd"&&Qs&&(x=s0()):(Ta=d,Bh="value"in Ta?Ta.value:Ta.textContent,Qs=!0)),R=Ic(c,T),0<R.length&&(T=new lm(T,t,null,n,d),p.push({event:T,listeners:R}),x?T.data=x:(x=l0(n),x!==null&&(T.data=x)))),(x=LM?OM(t,n):IM(t,n))&&(T=Ic(c,"onBeforeInput"),0<T.length&&(R=new lm("onBeforeInput","beforeinput",null,n,d),p.push({event:R,listeners:T}),R.data=x)),Ay(p,t,c,n,d)}ax(p,e)})}function Oo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ic(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=To(t,n),a!=null&&i.unshift(Oo(t,a,s)),a=To(t,e),a!=null&&i.push(Oo(t,a,s))),t.tag===3)return i;t=t.return}return[]}function Dy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function eg(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=To(n,s),c!=null&&r.unshift(Oo(n,c,l))):a||(c=To(n,s),c!=null&&r.push(Oo(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var Ny=/\r\n?/g,Uy=/\u0000|\uFFFD/g;function tg(t){return(typeof t=="string"?t:""+t).replace(Ny,`
`).replace(Uy,"")}function rx(t,e){return e=tg(e),tg(t)===e}function ht(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||gr(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&gr(t,""+i);break;case"className":ul(t,"class",i);break;case"tabIndex":ul(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":ul(t,n,i);break;case"style":i0(t,i,s);break;case"data":if(e!=="object"){ul(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=ql(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&ht(t,e,"name",a.name,a,null),ht(t,e,"formEncType",a.formEncType,a,null),ht(t,e,"formMethod",a.formMethod,a,null),ht(t,e,"formTarget",a.formTarget,a,null)):(ht(t,e,"encType",a.encType,a,null),ht(t,e,"method",a.method,a,null),ht(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=ql(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=Vi);break;case"onScroll":i!=null&&je("scroll",t);break;case"onScrollEnd":i!=null&&je("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(J(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=ql(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":je("beforetoggle",t),je("toggle",t),Wl(t,"popover",i);break;case"xlinkActuate":Ci(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Ci(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Ci(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Ci(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Ci(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Ci(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Ci(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Ci(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Ci(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Wl(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=rM.get(n)||n,Wl(t,n,i))}}function Md(t,e,n,i,a,s){switch(n){case"style":i0(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(J(60));t.innerHTML=n}}break;case"children":typeof i=="string"?gr(t,i):(typeof i=="number"||typeof i=="bigint")&&gr(t,""+i);break;case"onScroll":i!=null&&je("scroll",t);break;case"onScrollEnd":i!=null&&je("scrollend",t);break;case"onClick":i!=null&&(t.onclick=Vi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Q_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[Tn]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):Wl(t,n,i)}}}function rn(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":je("error",t),je("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(J(137,e));default:ht(t,e,s,r,n,null)}}a&&ht(t,e,"srcSet",n.srcSet,n,null),i&&ht(t,e,"src",n.src,n,null);return;case"input":je("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(J(137,e));break;default:ht(t,e,i,d,n,null)}}e0(t,s,o,l,c,r,a,!1);return;case"select":je("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ht(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?rr(t,!!i,e,!1):n!=null&&rr(t,!!i,n,!0);return;case"textarea":je("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(J(91));break;default:ht(t,e,r,o,n,null)}n0(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:ht(t,e,l,i,n,null)}return;case"dialog":je("beforetoggle",t),je("toggle",t),je("cancel",t),je("close",t);break;case"iframe":case"object":je("load",t);break;case"video":case"audio":for(i=0;i<Lo.length;i++)je(Lo[i],t);break;case"image":je("error",t),je("load",t);break;case"details":je("toggle",t);break;case"embed":case"source":case"link":je("error",t),je("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(J(137,e));default:ht(t,e,c,i,n,null)}return;default:if(Ph(e)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Md(t,e,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ht(t,e,o,i,n,null))}function Ly(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,d=null;for(h in n){var p=n[h];if(n.hasOwnProperty(h)&&p!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(h)||ht(t,e,h,null,i,p)}}for(var u in i){var h=i[u];if(p=n[u],i.hasOwnProperty(u)&&(h!=null||p!=null))switch(u){case"type":s=h;break;case"name":a=h;break;case"checked":c=h;break;case"defaultChecked":d=h;break;case"value":r=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(J(137,e));break;default:h!==p&&ht(t,e,u,h,i,p)}}Wf(t,r,o,l,c,d,s,a);return;case"select":h=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":h=l;default:i.hasOwnProperty(s)||ht(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&ht(t,e,a,s,i,l)}e=o,n=r,i=h,u!=null?rr(t,!!n,u,!1):!!i!=!!n&&(e!=null?rr(t,!!n,e,!0):rr(t,!!n,n?[]:"",!1));return;case"textarea":h=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ht(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":h=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(J(91));break;default:a!==s&&ht(t,e,r,a,i,s)}t0(t,u,h);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:ht(t,e,g,null,i,u)}for(l in i)if(u=i[l],h=n[l],i.hasOwnProperty(l)&&u!==h&&(u!=null||h!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:ht(t,e,l,u,i,h)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in n)u=n[y],n.hasOwnProperty(y)&&u!=null&&!i.hasOwnProperty(y)&&ht(t,e,y,null,i,u);for(c in i)if(u=i[c],h=n[c],i.hasOwnProperty(c)&&u!==h&&(u!=null||h!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(J(137,e));break;default:ht(t,e,c,u,i,h)}return;default:if(Ph(e)){for(var _ in n)u=n[_],n.hasOwnProperty(_)&&u!==void 0&&!i.hasOwnProperty(_)&&Md(t,e,_,void 0,i,u);for(d in i)u=i[d],h=n[d],!i.hasOwnProperty(d)||u===h||u===void 0&&h===void 0||Md(t,e,d,u,i,h);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&ht(t,e,f,null,i,u);for(p in i)u=i[p],h=n[p],!i.hasOwnProperty(p)||u===h||u==null&&h==null||ht(t,e,p,u,i,h)}function ng(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Oy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&ng(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,p=l.initiatorType;d&&ng(p)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var yd=null,Ed=null;function Pc(t){return t.nodeType===9?t:t.ownerDocument}function ig(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ox(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function bd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var $u=null;function Iy(){var t=window.event;return t&&t.type==="popstate"?t===$u?!1:($u=t,!0):($u=null,!1)}var lx=typeof setTimeout=="function"?setTimeout:void 0,Py=typeof clearTimeout=="function"?clearTimeout:void 0,ag=typeof Promise=="function"?Promise:void 0,Fy=typeof queueMicrotask=="function"?queueMicrotask:typeof ag<"u"?function(t){return ag.resolve(null).then(t).catch(By)}:lx;function By(t){setTimeout(function(){throw t})}function ja(t){return t==="head"}function sg(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),br(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Eo(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Eo(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[jo]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&Eo(t.ownerDocument.body);n=a}while(n);br(e)}function rg(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Td(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Td(n),Ih(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function zy(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[jo])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Jn(t.nextSibling),t===null)break}return null}function Hy(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Jn(t.nextSibling),t===null))return null;return t}function cx(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Jn(t.nextSibling),t===null))return null;return t}function Ad(t){return t.data==="$?"||t.data==="$~"}function Rd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Gy(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Jn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Cd=null;function og(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Jn(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function lg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function ux(t,e,n){switch(e=Pc(n),t){case"html":if(t=e.documentElement,!t)throw Error(J(452));return t;case"head":if(t=e.head,!t)throw Error(J(453));return t;case"body":if(t=e.body,!t)throw Error(J(454));return t;default:throw Error(J(451))}}function Eo(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Ih(t)}var $n=new Map,cg=new Set;function Fc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ra=nt.d;nt.d={f:Vy,r:ky,D:Xy,C:jy,L:Wy,m:qy,X:Zy,S:Yy,M:Ky};function Vy(){var t=ra.f(),e=ou();return t||e}function ky(t){var e=Ur(t);e!==null&&e.tag===5&&e.type==="form"?iv(e):ra.r(t)}var Pr=typeof document>"u"?null:document;function fx(t,e,n){var i=Pr;if(i&&typeof e=="string"&&e){var a=qn(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),cg.has(a)||(cg.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),rn(e,"link",t),Qt(e),i.head.appendChild(e)))}}function Xy(t){ra.D(t),fx("dns-prefetch",t,null)}function jy(t,e){ra.C(t,e),fx("preconnect",t,e)}function Wy(t,e,n){ra.L(t,e,n);var i=Pr;if(i&&t&&e){var a='link[rel="preload"][as="'+qn(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+qn(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+qn(n.imageSizes)+'"]')):a+='[href="'+qn(t)+'"]';var s=a;switch(e){case"style":s=Er(t);break;case"script":s=Fr(t)}$n.has(s)||(t=Tt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),$n.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(Qo(s))||e==="script"&&i.querySelector(Jo(s))||(e=i.createElement("link"),rn(e,"link",t),Qt(e),i.head.appendChild(e)))}}function qy(t,e){ra.m(t,e);var n=Pr;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+qn(i)+'"][href="'+qn(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Fr(t)}if(!$n.has(s)&&(t=Tt({rel:"modulepreload",href:t},e),$n.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Jo(s)))return}i=n.createElement("link"),rn(i,"link",t),Qt(i),n.head.appendChild(i)}}}function Yy(t,e,n){ra.S(t,e,n);var i=Pr;if(i&&t){var a=sr(i).hoistableStyles,s=Er(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Qo(s)))o.loading=5;else{t=Tt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=$n.get(s))&&Sp(t,n);var l=r=i.createElement("link");Qt(l),rn(l,"link",t),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,ic(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function Zy(t,e){ra.X(t,e);var n=Pr;if(n&&t){var i=sr(n).hoistableScripts,a=Fr(t),s=i.get(a);s||(s=n.querySelector(Jo(a)),s||(t=Tt({src:t,async:!0},e),(e=$n.get(a))&&Mp(t,e),s=n.createElement("script"),Qt(s),rn(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function Ky(t,e){ra.M(t,e);var n=Pr;if(n&&t){var i=sr(n).hoistableScripts,a=Fr(t),s=i.get(a);s||(s=n.querySelector(Jo(a)),s||(t=Tt({src:t,async:!0,type:"module"},e),(e=$n.get(a))&&Mp(t,e),s=n.createElement("script"),Qt(s),rn(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function ug(t,e,n,i){var a=(a=Da.current)?Fc(a):null;if(!a)throw Error(J(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Er(n.href),n=sr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Er(n.href);var s=sr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(Qo(t)))&&!s._p&&(r.instance=s,r.state.loading=5),$n.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},$n.set(t,n),s||Qy(a,t,n,r.state))),e&&i===null)throw Error(J(528,""));return r}if(e&&i!==null)throw Error(J(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Fr(n),n=sr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(J(444,t))}}function Er(t){return'href="'+qn(t)+'"'}function Qo(t){return'link[rel="stylesheet"]['+t+"]"}function dx(t){return Tt({},t,{"data-precedence":t.precedence,precedence:null})}function Qy(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),rn(e,"link",n),Qt(e),t.head.appendChild(e))}function Fr(t){return'[src="'+qn(t)+'"]'}function Jo(t){return"script[async]"+t}function fg(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+qn(n.href)+'"]');if(i)return e.instance=i,Qt(i),i;var a=Tt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),Qt(i),rn(i,"style",a),ic(i,n.precedence,t),e.instance=i;case"stylesheet":a=Er(n.href);var s=t.querySelector(Qo(a));if(s)return e.state.loading|=4,e.instance=s,Qt(s),s;i=dx(n),(a=$n.get(a))&&Sp(i,a),s=(t.ownerDocument||t).createElement("link"),Qt(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),rn(s,"link",i),e.state.loading|=4,ic(s,n.precedence,t),e.instance=s;case"script":return s=Fr(n.src),(a=t.querySelector(Jo(s)))?(e.instance=a,Qt(a),a):(i=n,(a=$n.get(s))&&(i=Tt({},n),Mp(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),Qt(a),rn(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(J(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,ic(i,n.precedence,t));return e.instance}function ic(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Sp(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Mp(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var ac=null;function dg(t,e,n){if(ac===null){var i=new Map,a=ac=new Map;a.set(n,i)}else a=ac,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[jo]||s[tn]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function hg(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Jy(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function hx(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function $y(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=Er(i.href),s=e.querySelector(Qo(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Bc.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,Qt(s);return}s=e.ownerDocument||e,i=dx(i),(a=$n.get(a))&&Sp(i,a),s=s.createElement("link"),Qt(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),rn(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Bc.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var ef=0;function eE(t,e){return t.stylesheets&&t.count===0&&sc(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&sc(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&ef===0&&(ef=62500*Oy());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&sc(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>ef?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Bc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)sc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var zc=null;function sc(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,zc=new Map,e.forEach(tE,t),zc=null,Bc.call(t))}function tE(t,e){if(!(e.state.loading&4)){var n=zc.get(t);if(n)var i=n.get(null);else{n=new Map,zc.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Bc.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Io={$$typeof:Gi,Provider:null,Consumer:null,_currentValue:us,_currentValue2:us,_threadCount:0};function nE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Eu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Eu(0),this.hiddenUpdates=Eu(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function px(t,e,n,i,a,s,r,o,l,c,d,p){return t=new nE(t,e,n,r,l,c,d,p,o),e=1,s===!0&&(e|=24),s=Un(3,null,null,e),t.current=s,s.stateNode=t,e=qh(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},Kh(s),t}function mx(t){return t?(t=tr,t):tr}function gx(t,e,n,i,a,s){a=mx(a),i.context===null?i.context=a:i.pendingContext=a,i=Ua(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=La(t,i,e),n!==null&&(yn(n,t,e),mo(n,t,e))}function pg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function yp(t,e){pg(t,e),(t=t.alternate)&&pg(t,e)}function _x(t){if(t.tag===13||t.tag===31){var e=bs(t,67108864);e!==null&&yn(e,t,67108864),yp(t,67108864)}}function mg(t){if(t.tag===13||t.tag===31){var e=Fn();e=Lh(e);var n=bs(t,e);n!==null&&yn(n,t,e),yp(t,e)}}var Hc=!0;function iE(t,e,n,i){var a=Ne.T;Ne.T=null;var s=nt.p;try{nt.p=2,Ep(t,e,n,i)}finally{nt.p=s,Ne.T=a}}function aE(t,e,n,i){var a=Ne.T;Ne.T=null;var s=nt.p;try{nt.p=8,Ep(t,e,n,i)}finally{nt.p=s,Ne.T=a}}function Ep(t,e,n,i){if(Hc){var a=wd(i);if(a===null)Ju(t,e,i,Gc,n),gg(t,i);else if(rE(a,t,e,n,i))i.stopPropagation();else if(gg(t,i),e&4&&-1<sE.indexOf(t)){for(;a!==null;){var s=Ur(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=ns(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Pn(r);o.entanglements[1]|=l,r&=~l}Ti(s),!(tt&6)&&(Dc=On()+500,Ko(0))}}break;case 31:case 13:o=bs(s,2),o!==null&&yn(o,s,2),ou(),yp(s,2)}if(s=wd(i),s===null&&Ju(t,e,i,Gc,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else Ju(t,e,i,null,n)}}function wd(t){return t=Fh(t),bp(t)}var Gc=null;function bp(t){if(Gc=null,t=Zs(t),t!==null){var e=Go(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=F_(e),t!==null)return t;t=null}else if(n===31){if(t=B_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Gc=t,null}function vx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(XS()){case V_:return 2;case k_:return 8;case gc:case jS:return 32;case X_:return 268435456;default:return 32}default:return 32}}var Dd=!1,Pa=null,Fa=null,Ba=null,Po=new Map,Fo=new Map,ya=[],sE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function gg(t,e){switch(t){case"focusin":case"focusout":Pa=null;break;case"dragenter":case"dragleave":Fa=null;break;case"mouseover":case"mouseout":Ba=null;break;case"pointerover":case"pointerout":Po.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fo.delete(e.pointerId)}}function qr(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=Ur(e),e!==null&&_x(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function rE(t,e,n,i,a){switch(e){case"focusin":return Pa=qr(Pa,t,e,n,i,a),!0;case"dragenter":return Fa=qr(Fa,t,e,n,i,a),!0;case"mouseover":return Ba=qr(Ba,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return Po.set(s,qr(Po.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Fo.set(s,qr(Fo.get(s)||null,t,e,n,i,a)),!0}return!1}function xx(t){var e=Zs(t.target);if(e!==null){var n=Go(e);if(n!==null){if(e=n.tag,e===13){if(e=F_(n),e!==null){t.blockedOn=e,em(t.priority,function(){mg(n)});return}}else if(e===31){if(e=B_(n),e!==null){t.blockedOn=e,em(t.priority,function(){mg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function rc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=wd(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Yf=i,n.target.dispatchEvent(i),Yf=null}else return e=Ur(n),e!==null&&_x(e),t.blockedOn=n,!1;e.shift()}return!0}function _g(t,e,n){rc(t)&&n.delete(e)}function oE(){Dd=!1,Pa!==null&&rc(Pa)&&(Pa=null),Fa!==null&&rc(Fa)&&(Fa=null),Ba!==null&&rc(Ba)&&(Ba=null),Po.forEach(_g),Fo.forEach(_g)}function vl(t,e){t.blockedOn===e&&(t.blockedOn=null,Dd||(Dd=!0,Xt.unstable_scheduleCallback(Xt.unstable_NormalPriority,oE)))}var xl=null;function vg(t){xl!==t&&(xl=t,Xt.unstable_scheduleCallback(Xt.unstable_NormalPriority,function(){xl===t&&(xl=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(bp(i||n)===null)continue;break}var s=Ur(n);s!==null&&(t.splice(e,3),e-=3,ud(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function br(t){function e(l){return vl(l,t)}Pa!==null&&vl(Pa,t),Fa!==null&&vl(Fa,t),Ba!==null&&vl(Ba,t),Po.forEach(e),Fo.forEach(e);for(var n=0;n<ya.length;n++){var i=ya[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<ya.length&&(n=ya[0],n.blockedOn===null);)xx(n),n.blockedOn===null&&ya.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[Tn]||null;if(typeof s=="function")r||vg(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[Tn]||null)o=r.formAction;else if(bp(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),vg(n)}}}function Sx(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Tp(t){this._internalRoot=t}uu.prototype.render=Tp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(J(409));var n=e.current,i=Fn();gx(n,i,t,e,null,null)};uu.prototype.unmount=Tp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;gx(t.current,2,null,t,null,null),ou(),e[Nr]=null}};function uu(t){this._internalRoot=t}uu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Z_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ya.length&&e!==0&&e<ya[n].priority;n++);ya.splice(n,0,t),n===0&&xx(t)}};var xg=I_.version;if(xg!=="19.2.4")throw Error(J(527,xg,"19.2.4"));nt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(J(188)):(t=Object.keys(t).join(","),Error(J(268,t)));return t=FS(e),t=t!==null?z_(t):null,t=t===null?null:t.stateNode,t};var lE={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Ne,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Sl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Sl.isDisabled&&Sl.supportsFiber)try{Vo=Sl.inject(lE),In=Sl}catch{}}qc.createRoot=function(t,e){if(!P_(t))throw Error(J(299));var n=!1,i="",a=fv,s=dv,r=hv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=px(t,1,!1,null,null,n,i,null,a,s,r,Sx),t[Nr]=e.current,xp(t),new Tp(e)};qc.hydrateRoot=function(t,e,n){if(!P_(t))throw Error(J(299));var i=!1,a="",s=fv,r=dv,o=hv,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=px(t,1,!0,e,n??null,i,a,l,s,r,o,Sx),e.context=mx(null),n=e.current,i=Fn(),i=Lh(i),a=Ua(i),a.callback=null,La(n,a,i),n=i,e.current.lanes=n,Xo(e,n),Ti(e),t[Nr]=e.current,xp(t),new uu(e)};qc.version="19.2.4";function Mx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mx)}catch(t){console.error(t)}}Mx(),w_.exports=qc;var cE=w_.exports;class uE{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",lastNeuralLog:null,visionData:null,calendarInfo:null,travelInfo:null,activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null},audioLevel:0,sttEnabled:!0},this.listeners=new Set}setState(e){this.state={...this.state,...e},this.notify()}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this.state))}}const Te=new uE;class fE{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const e=window.location.protocol==="https:"?"wss:":"ws:",n=window.location.host,i=`${e}//${n}/ws`;console.log(`[WS] Tentative de connexion à ${i}...`),this.ws=new WebSocket(i),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,Te.setState({connection:"online"})},this.ws.onmessage=a=>{try{const s=JSON.parse(a.data);s.event!=="audio.level"&&console.debug(`[WS RECV] ${s.event}`,s.data),this.handleMessage(s)}catch(s){console.error("[WS] Erreur parsing message:",s)}},this.ws.onclose=()=>{Te.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=a=>{console.error("[WS] Erreur:",a)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const e=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${e/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),e)}}handleMessage(e){if(e.type==="system"){this.addInternalLog(e.message,"info");return}const n=e.event,i=e.data||{};if(n)switch(n){case"audio.speech_recognized":Te.setState({lastUserMessage:i.text,orbStatus:"thinking"});break;case"brain.thinking":Te.setState({brainStatus:i.status?"Analyse...":"En veille"}),i.status?Te.setState({orbStatus:"thinking"}):Te.state.orbStatus==="thinking"&&Te.setState({orbStatus:"idle"});break;case"brain.response_generated":Te.setState({lastJarvisMessage:i.text});break;case"audio.tts_started":Te.setState({ttsStatus:"Actif",orbStatus:"speaking"}),setTimeout(()=>{const a=Te.state;a.ttsStatus==="Actif"&&a.orbStatus==="speaking"&&(console.warn("[WS] Sécurité : Timeout TTS détecté, retour permanent en idle."),Te.setState({ttsStatus:"Inactif",orbStatus:"idle"}))},15e3);break;case"audio.tts_stopped":Te.setState({ttsStatus:"Inactif"}),Te.state.orbStatus==="speaking"&&Te.setState({orbStatus:"idle"});break;case"ui.show_web_results":Te.setState({webSearchResults:i});break;case"ui.hide_web_results":Te.setState({webSearchResults:null});break;case"memory.context_retrieved":Te.setState({lastNeuralLog:i});break;case"audio.stt_activated":console.debug("[WS] Micro activé, passage en mode listening."),Te.setState({orbStatus:"listening"});break;case"ui.show_vision":Te.setState({visionData:i});break;case"ui.show_emails":Te.setState({emailData:i});break;case"system.calendar":Te.setState({calendarInfo:i});break;case"printer.status":Te.setState({printData:{...Te.state.printData,[i.type]:i}});break;case"maps.travel_info":Te.setState({travelInfo:i,orbStatus:"idle"});break;default:console.debug(`[WS Event] ${n}`,i)}}send(e,n={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:e,data:n}))}addInternalLog(e,n){console.log(`[SYSTEM] ${e}`)}}const ro=new fE;class dE{constructor(){this.audioContext=null,this.analyser=null,this.dataArray=null,this.stream=null,this.isActive=!1}async start(){if(!this.isActive)try{this.stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this.audioContext=new(window.AudioContext||window.webkitAudioContext);const e=this.audioContext.createMediaStreamSource(this.stream);this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=256,e.connect(this.analyser),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount),this.isActive=!0,this._tick(),console.log("[AUDIO] Analyseur démarré.")}catch(e){console.error("[AUDIO] Impossible d'accéder au micro pour l'analyse visuelle:",e)}}_tick(){if(!this.isActive)return;this.analyser.getByteTimeDomainData(this.dataArray);let e=0;for(let s=0;s<this.dataArray.length;s++){const r=(this.dataArray[s]-128)/128;e+=r*r}const n=Math.sqrt(e/this.dataArray.length),i=Te.state.orbStatus;let a=n;i==="speaking"?(this.simTime=(this.simTime||0)+.15,a=.12+Math.abs(Math.sin(this.simTime))*.08):this.simTime=0,Te.setState({audioLevel:a}),n>.05?(i==="idle"&&Te.setState({orbStatus:"listening"}),this.silenceCounter=0):i==="listening"&&(this.silenceCounter=(this.silenceCounter||0)+1,this.silenceCounter>60&&(Te.setState({orbStatus:"idle"}),this.silenceCounter=0)),requestAnimationFrame(()=>this._tick())}stop(){this.isActive=!1,this.stream&&this.stream.getTracks().forEach(e=>e.stop()),this.audioContext&&this.audioContext.close()}}const hE=new dE,Ap=(t,e,n=800)=>{const i="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+",a=e.length;let s=0;const r=setInterval(()=>{t.innerText=e.split("").map((o,l)=>l<s?e[l]:i[Math.floor(Math.random()*i.length)]).join(""),s>=a&&(clearInterval(r),t.innerText=e),s+=a/(n/30)},30)};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rp="183",pE=0,Sg=1,mE=2,oc=1,gE=2,oo=3,ka=0,En=1,Hi=2,Yi=0,dr=1,Nd=2,Mg=3,yg=4,_E=5,rs=100,vE=101,xE=102,SE=103,ME=104,yE=200,EE=201,bE=202,TE=203,Ud=204,Ld=205,AE=206,RE=207,CE=208,wE=209,DE=210,NE=211,UE=212,LE=213,OE=214,Od=0,Id=1,Pd=2,Tr=3,Fd=4,Bd=5,zd=6,Hd=7,yx=0,IE=1,PE=2,Mi=0,Ex=1,bx=2,Tx=3,Ax=4,Rx=5,Cx=6,wx=7,Dx=300,Ss=301,Ar=302,tf=303,nf=304,fu=306,Gd=1e3,Xi=1001,Vd=1002,sn=1003,FE=1004,Ml=1005,un=1006,af=1007,ls=1008,Kn=1009,Nx=1010,Ux=1011,Bo=1012,Cp=1013,Ei=1014,vi=1015,na=1016,wp=1017,Dp=1018,zo=1020,Lx=35902,Ox=35899,Ix=1021,Px=1022,oi=1023,ia=1026,cs=1027,Fx=1028,Np=1029,Rr=1030,Up=1031,Lp=1033,lc=33776,cc=33777,uc=33778,fc=33779,kd=35840,Xd=35841,jd=35842,Wd=35843,qd=36196,Yd=37492,Zd=37496,Kd=37488,Qd=37489,Jd=37490,$d=37491,eh=37808,th=37809,nh=37810,ih=37811,ah=37812,sh=37813,rh=37814,oh=37815,lh=37816,ch=37817,uh=37818,fh=37819,dh=37820,hh=37821,ph=36492,mh=36494,gh=36495,_h=36283,vh=36284,xh=36285,Sh=36286,BE=3200,zE=0,HE=1,Ea="",Vn="srgb",Cr="srgb-linear",Vc="linear",ot="srgb",Ds=7680,Eg=519,GE=512,VE=513,kE=514,Op=515,XE=516,jE=517,Ip=518,WE=519,bg=35044,Tg="300 es",xi=2e3,kc=2001;function qE(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Xc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function YE(){const t=Xc("canvas");return t.style.display="block",t}const Ag={};function Rg(...t){const e="THREE."+t.shift();console.log(e,...t)}function Bx(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ie(...t){t=Bx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function et(...t){t=Bx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function jc(...t){const e=t.join(" ");e in Ag||(Ag[e]=!0,Ie(...t))}function ZE(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const KE={[Od]:Id,[Pd]:zd,[Fd]:Hd,[Tr]:Bd,[Id]:Od,[zd]:Pd,[Hd]:Fd,[Bd]:Tr};class Br{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sf=Math.PI/180,Mh=180/Math.PI;function $o(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[t&255]+ln[t>>8&255]+ln[t>>16&255]+ln[t>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[n&63|128]+ln[n>>8&255]+"-"+ln[n>>16&255]+ln[n>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function QE(t,e){return(t%e+e)%e}function rf(t,e,n){return(1-n)*t+n*e}function Yr(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function vn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class mt{constructor(e=0,n=0){mt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zr{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],p=i[a+3],u=s[r+0],h=s[r+1],g=s[r+2],y=s[r+3];if(p!==y||l!==u||c!==h||d!==g){let _=l*u+c*h+d*g+p*y;_<0&&(u=-u,h=-h,g=-g,y=-y,_=-_);let f=1-o;if(_<.9995){const m=Math.acos(_),v=Math.sin(m);f=Math.sin(f*m)/v,o=Math.sin(o*m)/v,l=l*f+u*o,c=c*f+h*o,d=d*f+g*o,p=p*f+y*o}else{l=l*f+u*o,c=c*f+h*o,d=d*f+g*o,p=p*f+y*o;const m=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=m,c*=m,d*=m,p*=m}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],p=s[r],u=s[r+1],h=s[r+2],g=s[r+3];return e[n]=o*g+d*p+l*h-c*u,e[n+1]=l*g+d*u+c*p-o*h,e[n+2]=c*g+d*h+o*u-l*p,e[n+3]=d*g-o*p-l*u-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),p=o(s/2),u=l(i/2),h=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*d*p+c*h*g,this._y=c*h*p-u*d*g,this._z=c*d*g+u*h*p,this._w=c*d*p-u*h*g;break;case"YXZ":this._x=u*d*p+c*h*g,this._y=c*h*p-u*d*g,this._z=c*d*g-u*h*p,this._w=c*d*p+u*h*g;break;case"ZXY":this._x=u*d*p-c*h*g,this._y=c*h*p+u*d*g,this._z=c*d*g+u*h*p,this._w=c*d*p-u*h*g;break;case"ZYX":this._x=u*d*p-c*h*g,this._y=c*h*p+u*d*g,this._z=c*d*g-u*h*p,this._w=c*d*p+u*h*g;break;case"YZX":this._x=u*d*p+c*h*g,this._y=c*h*p+u*d*g,this._z=c*d*g-u*h*p,this._w=c*d*p-u*h*g;break;case"XZY":this._x=u*d*p-c*h*g,this._y=c*h*p-u*d*g,this._z=c*d*g+u*h*p,this._w=c*d*p+u*h*g;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],p=n[10],u=i+o+p;if(u>0){const h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(d-l)*h,this._y=(s-c)*h,this._z=(r-a)*h}else if(i>o&&i>p){const h=2*Math.sqrt(1+i-o-p);this._w=(d-l)/h,this._x=.25*h,this._y=(a+r)/h,this._z=(s+c)/h}else if(o>p){const h=2*Math.sqrt(1+o-i-p);this._w=(s-c)/h,this._x=(a+r)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+p-i-o);this._w=(r-a)/h,this._x=(s+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,n=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Cg.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Cg.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),d=2*(o*n-s*a),p=2*(s*i-r*n);return this.x=n+l*c+r*p-o*d,this.y=i+l*d+o*c-s*p,this.z=a+l*p+s*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return of.copy(this).projectOnVector(e),this.sub(of)}reflect(e){return this.sub(of.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const of=new V,Cg=new zr;class He{constructor(e,n,i,a,s,r,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],p=i[7],u=i[2],h=i[5],g=i[8],y=a[0],_=a[3],f=a[6],m=a[1],v=a[4],M=a[7],w=a[2],A=a[5],R=a[8];return s[0]=r*y+o*m+l*w,s[3]=r*_+o*v+l*A,s[6]=r*f+o*M+l*R,s[1]=c*y+d*m+p*w,s[4]=c*_+d*v+p*A,s[7]=c*f+d*M+p*R,s[2]=u*y+h*m+g*w,s[5]=u*_+h*v+g*A,s[8]=u*f+h*M+g*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*r*d-n*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=d*r-o*c,u=o*l-d*s,h=c*s-r*l,g=n*p+i*u+a*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=p*y,e[1]=(a*c-d*i)*y,e[2]=(o*i-a*r)*y,e[3]=u*y,e[4]=(d*n-a*l)*y,e[5]=(a*s-o*n)*y,e[6]=h*y,e[7]=(i*l-c*n)*y,e[8]=(r*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(lf.makeScale(e,n)),this}rotate(e){return this.premultiply(lf.makeRotation(-e)),this}translate(e,n){return this.premultiply(lf.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lf=new He,wg=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dg=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function JE(){const t={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ot&&(a.r=Zi(a.r),a.g=Zi(a.g),a.b=Zi(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ot&&(a.r=hr(a.r),a.g=hr(a.g),a.b=hr(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Ea?Vc:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return jc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return jc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Cr]:{primaries:e,whitePoint:i,transfer:Vc,toXYZ:wg,fromXYZ:Dg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Vn},outputColorSpaceConfig:{drawingBufferColorSpace:Vn}},[Vn]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:wg,fromXYZ:Dg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Vn}}}),t}const Qe=JE();function Zi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function hr(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ns;class $E{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ns===void 0&&(Ns=Xc("canvas")),Ns.width=e.width,Ns.height=e.height;const a=Ns.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=Ns}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Xc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Zi(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Zi(n[i]/255)*255):n[i]=Zi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let eb=0;class Pp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eb++}),this.uuid=$o(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(cf(a[r].image)):s.push(cf(a[r]))}else s=cf(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function cf(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?$E.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}let tb=0;const uf=new V;class pn extends Br{constructor(e=pn.DEFAULT_IMAGE,n=pn.DEFAULT_MAPPING,i=Xi,a=Xi,s=un,r=ls,o=oi,l=Kn,c=pn.DEFAULT_ANISOTROPY,d=Ea){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tb++}),this.uuid=$o(),this.name="",this.source=new Pp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uf).x}get height(){return this.source.getSize(uf).y}get depth(){return this.source.getSize(uf).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ie(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Ie(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gd:e.x=e.x-Math.floor(e.x);break;case Xi:e.x=e.x<0?0:1;break;case Vd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gd:e.y=e.y-Math.floor(e.y);break;case Xi:e.y=e.y<0?0:1;break;case Vd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=Dx;pn.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,n=0,i=0,a=1){Lt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],d=l[4],p=l[8],u=l[1],h=l[5],g=l[9],y=l[2],_=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-y)<.01&&Math.abs(g-_)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+y)<.1&&Math.abs(g+_)<.1&&Math.abs(c+h+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,M=(h+1)/2,w=(f+1)/2,A=(d+u)/4,R=(p+y)/4,x=(g+_)/4;return v>M&&v>w?v<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(v),a=A/i,s=R/i):M>w?M<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(M),i=A/a,s=x/a):w<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(w),i=R/s,a=x/s),this.set(i,a,s,n),this}let m=Math.sqrt((_-g)*(_-g)+(p-y)*(p-y)+(u-d)*(u-d));return Math.abs(m)<.001&&(m=1),this.x=(_-g)/m,this.y=(p-y)/m,this.z=(u-d)/m,this.w=Math.acos((c+h+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nb extends Br{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Lt(0,0,e,n),this.scissorTest=!1,this.viewport=new Lt(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new pn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new Pp(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends nb{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class zx extends pn{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=sn,this.minFilter=sn,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ib extends pn{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=sn,this.minFilter=sn,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class It{constructor(e,n,i,a,s,r,o,l,c,d,p,u,h,g,y,_){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,d,p,u,h,g,y,_)}set(e,n,i,a,s,r,o,l,c,d,p,u,h,g,y,_){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=p,f[14]=u,f[3]=h,f[7]=g,f[11]=y,f[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,a=1/Us.setFromMatrixColumn(e,0).length(),s=1/Us.setFromMatrixColumn(e,1).length(),r=1/Us.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const u=r*d,h=r*p,g=o*d,y=o*p;n[0]=l*d,n[4]=-l*p,n[8]=c,n[1]=h+g*c,n[5]=u-y*c,n[9]=-o*l,n[2]=y-u*c,n[6]=g+h*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*d,h=l*p,g=c*d,y=c*p;n[0]=u+y*o,n[4]=g*o-h,n[8]=r*c,n[1]=r*p,n[5]=r*d,n[9]=-o,n[2]=h*o-g,n[6]=y+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*d,h=l*p,g=c*d,y=c*p;n[0]=u-y*o,n[4]=-r*p,n[8]=g+h*o,n[1]=h+g*o,n[5]=r*d,n[9]=y-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*d,h=r*p,g=o*d,y=o*p;n[0]=l*d,n[4]=g*c-h,n[8]=u*c+y,n[1]=l*p,n[5]=y*c+u,n[9]=h*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,h=r*c,g=o*l,y=o*c;n[0]=l*d,n[4]=y-u*p,n[8]=g*p+h,n[1]=p,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=h*p+g,n[10]=u-y*p}else if(e.order==="XZY"){const u=r*l,h=r*c,g=o*l,y=o*c;n[0]=l*d,n[4]=-p,n[8]=c*d,n[1]=u*p+y,n[5]=r*d,n[9]=h*p-g,n[2]=g*p-h,n[6]=o*d,n[10]=y*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ab,e,sb)}lookAt(e,n,i){const a=this.elements;return Cn.subVectors(e,n),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),ua.crossVectors(i,Cn),ua.lengthSq()===0&&(Math.abs(i.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),ua.crossVectors(i,Cn)),ua.normalize(),yl.crossVectors(Cn,ua),a[0]=ua.x,a[4]=yl.x,a[8]=Cn.x,a[1]=ua.y,a[5]=yl.y,a[9]=Cn.y,a[2]=ua.z,a[6]=yl.z,a[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],p=i[5],u=i[9],h=i[13],g=i[2],y=i[6],_=i[10],f=i[14],m=i[3],v=i[7],M=i[11],w=i[15],A=a[0],R=a[4],x=a[8],T=a[12],F=a[1],D=a[5],H=a[9],k=a[13],q=a[2],G=a[6],U=a[10],L=a[14],j=a[3],K=a[7],ne=a[11],me=a[15];return s[0]=r*A+o*F+l*q+c*j,s[4]=r*R+o*D+l*G+c*K,s[8]=r*x+o*H+l*U+c*ne,s[12]=r*T+o*k+l*L+c*me,s[1]=d*A+p*F+u*q+h*j,s[5]=d*R+p*D+u*G+h*K,s[9]=d*x+p*H+u*U+h*ne,s[13]=d*T+p*k+u*L+h*me,s[2]=g*A+y*F+_*q+f*j,s[6]=g*R+y*D+_*G+f*K,s[10]=g*x+y*H+_*U+f*ne,s[14]=g*T+y*k+_*L+f*me,s[3]=m*A+v*F+M*q+w*j,s[7]=m*R+v*D+M*G+w*K,s[11]=m*x+v*H+M*U+w*ne,s[15]=m*T+v*k+M*L+w*me,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],p=e[6],u=e[10],h=e[14],g=e[3],y=e[7],_=e[11],f=e[15],m=l*h-c*u,v=o*h-c*p,M=o*u-l*p,w=r*h-c*d,A=r*u-l*d,R=r*p-o*d;return n*(y*m-_*v+f*M)-i*(g*m-_*w+f*A)+a*(g*v-y*w+f*R)-s*(g*M-y*A+_*R)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=e[9],u=e[10],h=e[11],g=e[12],y=e[13],_=e[14],f=e[15],m=n*o-i*r,v=n*l-a*r,M=n*c-s*r,w=i*l-a*o,A=i*c-s*o,R=a*c-s*l,x=d*y-p*g,T=d*_-u*g,F=d*f-h*g,D=p*_-u*y,H=p*f-h*y,k=u*f-h*_,q=m*k-v*H+M*D+w*F-A*T+R*x;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/q;return e[0]=(o*k-l*H+c*D)*G,e[1]=(a*H-i*k-s*D)*G,e[2]=(y*R-_*A+f*w)*G,e[3]=(u*A-p*R-h*w)*G,e[4]=(l*F-r*k-c*T)*G,e[5]=(n*k-a*F+s*T)*G,e[6]=(_*M-g*R-f*v)*G,e[7]=(d*R-u*M+h*v)*G,e[8]=(r*H-o*F+c*x)*G,e[9]=(i*F-n*H-s*x)*G,e[10]=(g*A-y*M+f*m)*G,e[11]=(p*M-d*A-h*m)*G,e[12]=(o*T-r*D-l*x)*G,e[13]=(n*D-i*T+a*x)*G,e[14]=(y*v-g*w-_*m)*G,e[15]=(d*w-p*v+u*m)*G,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,d=r+r,p=o+o,u=s*c,h=s*d,g=s*p,y=r*d,_=r*p,f=o*p,m=l*c,v=l*d,M=l*p,w=i.x,A=i.y,R=i.z;return a[0]=(1-(y+f))*w,a[1]=(h+M)*w,a[2]=(g-v)*w,a[3]=0,a[4]=(h-M)*A,a[5]=(1-(u+f))*A,a[6]=(_+m)*A,a[7]=0,a[8]=(g+v)*R,a[9]=(_-m)*R,a[10]=(1-(u+y))*R,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let r=Us.set(a[0],a[1],a[2]).length();const o=Us.set(a[4],a[5],a[6]).length(),l=Us.set(a[8],a[9],a[10]).length();s<0&&(r=-r),ni.copy(this);const c=1/r,d=1/o,p=1/l;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=d,ni.elements[5]*=d,ni.elements[6]*=d,ni.elements[8]*=p,ni.elements[9]*=p,ni.elements[10]*=p,n.setFromRotationMatrix(ni),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=xi,l=!1){const c=this.elements,d=2*s/(n-e),p=2*s/(i-a),u=(n+e)/(n-e),h=(i+a)/(i-a);let g,y;if(l)g=s/(r-s),y=r*s/(r-s);else if(o===xi)g=-(r+s)/(r-s),y=-2*r*s/(r-s);else if(o===kc)g=-r/(r-s),y=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=xi,l=!1){const c=this.elements,d=2/(n-e),p=2/(i-a),u=-(n+e)/(n-e),h=-(i+a)/(i-a);let g,y;if(l)g=1/(r-s),y=r/(r-s);else if(o===xi)g=-2/(r-s),y=-(r+s)/(r-s);else if(o===kc)g=-1/(r-s),y=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Us=new V,ni=new It,ab=new V(0,0,0),sb=new V(1,1,1),ua=new V,yl=new V,Cn=new V,Ng=new It,Ug=new zr;class aa{constructor(e=0,n=0,i=0,a=aa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],p=a[2],u=a[6],h=a[10];switch(n){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,h),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Ng.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ng,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Ug.setFromEuler(this),this.setFromQuaternion(Ug,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}aa.DEFAULT_ORDER="XYZ";class Hx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rb=0;const Lg=new V,Ls=new zr,Ui=new It,El=new V,Zr=new V,ob=new V,lb=new zr,Og=new V(1,0,0),Ig=new V(0,1,0),Pg=new V(0,0,1),Fg={type:"added"},cb={type:"removed"},Os={type:"childadded",child:null},ff={type:"childremoved",child:null};class bn extends Br{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rb++}),this.uuid=$o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bn.DEFAULT_UP.clone();const e=new V,n=new aa,i=new zr,a=new V(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new It},normalMatrix:{value:new He}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Og,e)}rotateY(e){return this.rotateOnAxis(Ig,e)}rotateZ(e){return this.rotateOnAxis(Pg,e)}translateOnAxis(e,n){return Lg.copy(e).applyQuaternion(this.quaternion),this.position.add(Lg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Og,e)}translateY(e){return this.translateOnAxis(Ig,e)}translateZ(e){return this.translateOnAxis(Pg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?El.copy(e):El.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(Zr,El,this.up):Ui.lookAt(El,Zr,this.up),this.quaternion.setFromRotationMatrix(Ui),a&&(Ui.extractRotation(a.matrixWorld),Ls.setFromRotationMatrix(Ui),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fg),Os.child=e,this.dispatchEvent(Os),Os.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(cb),ff.child=e,this.dispatchEvent(ff),ff.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fg),Os.child=e,this.dispatchEvent(Os),Os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,e,ob),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,lb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),p=r(e.shapes),u=r(e.skeletons),h=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),h.length>0&&(i.animations=h),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}bn.DEFAULT_UP=new V(0,1,0);bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class bl extends bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ub={type:"move"};class df{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const y of e.hand.values()){const _=n.getJointPose(y,i),f=this._getHandJoint(c,y);_!==null&&(f.matrix.fromArray(_.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=_.radius),f.visible=_!==null}const d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),h=.02,g=.005;c.inputState.pinching&&u>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ub)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new bl;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Gx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fa={h:0,s:0,l:0},Tl={h:0,s:0,l:0};function hf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ut{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=Qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,Qe.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=Qe.workingColorSpace){if(e=QE(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=hf(r,s,e+1/3),this.g=hf(r,s,e),this.b=hf(r,s,e-1/3)}return Qe.colorSpaceToWorking(this,a),this}setStyle(e,n=Vn){function i(s){s!==void 0&&parseFloat(s)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ie("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Vn){const i=Gx[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vn){return Qe.workingToColorSpace(cn.copy(this),e),Math.round(Ye(cn.r*255,0,255))*65536+Math.round(Ye(cn.g*255,0,255))*256+Math.round(Ye(cn.b*255,0,255))}getHexString(e=Vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Qe.workingColorSpace){Qe.workingToColorSpace(cn.copy(this),n);const i=cn.r,a=cn.g,s=cn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const p=r-o;switch(c=d<=.5?p/(r+o):p/(2-r-o),r){case i:l=(a-s)/p+(a<s?6:0);break;case a:l=(s-i)/p+2;break;case s:l=(i-a)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=Qe.workingColorSpace){return Qe.workingToColorSpace(cn.copy(this),n),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=Vn){Qe.workingToColorSpace(cn.copy(this),e);const n=cn.r,i=cn.g,a=cn.b;return e!==Vn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(fa),this.setHSL(fa.h+e,fa.s+n,fa.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(fa),e.getHSL(Tl);const i=rf(fa.h,Tl.h,n),a=rf(fa.s,Tl.s,n),s=rf(fa.l,Tl.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new ut;ut.NAMES=Gx;class fb extends bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new aa,this.environmentIntensity=1,this.environmentRotation=new aa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ii=new V,Li=new V,pf=new V,Oi=new V,Is=new V,Ps=new V,Bg=new V,mf=new V,gf=new V,_f=new V,vf=new Lt,xf=new Lt,Sf=new Lt;class ri{constructor(e=new V,n=new V,i=new V){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),ii.subVectors(e,n),a.cross(ii);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){ii.subVectors(a,n),Li.subVectors(i,n),pf.subVectors(e,n);const r=ii.dot(ii),o=ii.dot(Li),l=ii.dot(pf),c=Li.dot(Li),d=Li.dot(pf),p=r*c-o*o;if(p===0)return s.set(0,0,0),null;const u=1/p,h=(c*l-o*d)*u,g=(r*d-o*l)*u;return s.set(1-h-g,g,h)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,Oi)===null?!1:Oi.x>=0&&Oi.y>=0&&Oi.x+Oi.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,Oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Oi.x),l.addScaledVector(r,Oi.y),l.addScaledVector(o,Oi.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return vf.setScalar(0),xf.setScalar(0),Sf.setScalar(0),vf.fromBufferAttribute(e,n),xf.fromBufferAttribute(e,i),Sf.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(vf,s.x),r.addScaledVector(xf,s.y),r.addScaledVector(Sf,s.z),r}static isFrontFacing(e,n,i,a){return ii.subVectors(i,n),Li.subVectors(e,n),ii.cross(Li).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),ii.cross(Li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ri.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return ri.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;Is.subVectors(a,i),Ps.subVectors(s,i),mf.subVectors(e,i);const l=Is.dot(mf),c=Ps.dot(mf);if(l<=0&&c<=0)return n.copy(i);gf.subVectors(e,a);const d=Is.dot(gf),p=Ps.dot(gf);if(d>=0&&p<=d)return n.copy(a);const u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(Is,r);_f.subVectors(e,s);const h=Is.dot(_f),g=Ps.dot(_f);if(g>=0&&h<=g)return n.copy(s);const y=h*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Ps,o);const _=d*g-h*p;if(_<=0&&p-d>=0&&h-g>=0)return Bg.subVectors(s,a),o=(p-d)/(p-d+(h-g)),n.copy(a).addScaledVector(Bg,o);const f=1/(_+y+u);return r=y*f,o=u*f,n.copy(i).addScaledVector(Is,r).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class el{constructor(e=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ai.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ai.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ai.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,ai):ai.fromBufferAttribute(s,r),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Al.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Al.copy(i.boundingBox)),Al.applyMatrix4(e.matrixWorld),this.union(Al)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kr),Rl.subVectors(this.max,Kr),Fs.subVectors(e.a,Kr),Bs.subVectors(e.b,Kr),zs.subVectors(e.c,Kr),da.subVectors(Bs,Fs),ha.subVectors(zs,Bs),Za.subVectors(Fs,zs);let n=[0,-da.z,da.y,0,-ha.z,ha.y,0,-Za.z,Za.y,da.z,0,-da.x,ha.z,0,-ha.x,Za.z,0,-Za.x,-da.y,da.x,0,-ha.y,ha.x,0,-Za.y,Za.x,0];return!Mf(n,Fs,Bs,zs,Rl)||(n=[1,0,0,0,1,0,0,0,1],!Mf(n,Fs,Bs,zs,Rl))?!1:(Cl.crossVectors(da,ha),n=[Cl.x,Cl.y,Cl.z],Mf(n,Fs,Bs,zs,Rl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ii=[new V,new V,new V,new V,new V,new V,new V,new V],ai=new V,Al=new el,Fs=new V,Bs=new V,zs=new V,da=new V,ha=new V,Za=new V,Kr=new V,Rl=new V,Cl=new V,Ka=new V;function Mf(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){Ka.fromArray(t,s);const o=a.x*Math.abs(Ka.x)+a.y*Math.abs(Ka.y)+a.z*Math.abs(Ka.z),l=e.dot(Ka),c=n.dot(Ka),d=i.dot(Ka);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Ft=new V,wl=new mt;let db=0;class Mn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:db++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=bg,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)wl.fromBufferAttribute(this,n),wl.applyMatrix3(e),this.setXY(n,wl.x,wl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.applyMatrix3(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.applyMatrix4(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.applyNormalMatrix(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.transformDirection(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Yr(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=vn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Yr(n,this.array)),n}setX(e,n){return this.normalized&&(n=vn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Yr(n,this.array)),n}setY(e,n){return this.normalized&&(n=vn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Yr(n,this.array)),n}setZ(e,n){return this.normalized&&(n=vn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Yr(n,this.array)),n}setW(e,n){return this.normalized&&(n=vn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=vn(n,this.array),i=vn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=vn(n,this.array),i=vn(i,this.array),a=vn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=vn(n,this.array),i=vn(i,this.array),a=vn(a,this.array),s=vn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bg&&(e.usage=this.usage),e}}class Vx extends Mn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class kx extends Mn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Ki extends Mn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const hb=new el,Qr=new V,yf=new V;class du{constructor(e=new V,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):hb.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qr.subVectors(e,this.center);const n=Qr.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Qr,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qr.copy(e.center).add(yf)),this.expandByPoint(Qr.copy(e.center).sub(yf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let pb=0;const Hn=new It,Ef=new bn,Hs=new V,wn=new el,Jr=new el,Zt=new V;class ui extends Br{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pb++}),this.uuid=$o(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qE(e)?kx:Vx)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,n,i){return Hn.makeTranslation(e,n,i),this.applyMatrix4(Hn),this}scale(e,n,i){return Hn.makeScale(e,n,i),this.applyMatrix4(Hn),this}lookAt(e){return Ef.lookAt(e),Ef.updateMatrix(),this.applyMatrix4(Ef.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ki(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new el);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];wn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new du);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Jr.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(wn.min,Jr.min),wn.expandByPoint(Zt),Zt.addVectors(wn.max,Jr.max),wn.expandByPoint(Zt)):(wn.expandByPoint(Jr.min),wn.expandByPoint(Jr.max))}wn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Zt.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Zt));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Zt.fromBufferAttribute(o,c),l&&(Hs.fromBufferAttribute(e,c),Zt.add(Hs)),a=Math.max(a,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new V,l[x]=new V;const c=new V,d=new V,p=new V,u=new mt,h=new mt,g=new mt,y=new V,_=new V;function f(x,T,F){c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,T),p.fromBufferAttribute(i,F),u.fromBufferAttribute(s,x),h.fromBufferAttribute(s,T),g.fromBufferAttribute(s,F),d.sub(c),p.sub(c),h.sub(u),g.sub(u);const D=1/(h.x*g.y-g.x*h.y);isFinite(D)&&(y.copy(d).multiplyScalar(g.y).addScaledVector(p,-h.y).multiplyScalar(D),_.copy(p).multiplyScalar(h.x).addScaledVector(d,-g.x).multiplyScalar(D),o[x].add(y),o[T].add(y),o[F].add(y),l[x].add(_),l[T].add(_),l[F].add(_))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let x=0,T=m.length;x<T;++x){const F=m[x],D=F.start,H=F.count;for(let k=D,q=D+H;k<q;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const v=new V,M=new V,w=new V,A=new V;function R(x){w.fromBufferAttribute(a,x),A.copy(w);const T=o[x];v.copy(T),v.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(A,T);const D=M.dot(l[x])<0?-1:1;r.setXYZW(x,v.x,v.y,v.z,D)}for(let x=0,T=m.length;x<T;++x){const F=m[x],D=F.start,H=F.count;for(let k=D,q=D+H;k<q;k+=3)R(e.getX(k+0)),R(e.getX(k+1)),R(e.getX(k+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,h=i.count;u<h;u++)i.setXYZ(u,0,0,0);const a=new V,s=new V,r=new V,o=new V,l=new V,c=new V,d=new V,p=new V;if(e)for(let u=0,h=e.count;u<h;u+=3){const g=e.getX(u+0),y=e.getX(u+1),_=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,y),r.fromBufferAttribute(n,_),d.subVectors(r,s),p.subVectors(a,s),d.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,_),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z)}else for(let u=0,h=n.count;u<h;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,s),p.subVectors(a,s),d.cross(p),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Zt.fromBufferAttribute(e,n),Zt.normalize(),e.setXYZ(n,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d);let h=0,g=0;for(let y=0,_=l.length;y<_;y++){o.isInterleavedBufferAttribute?h=l[y]*o.data.stride+o.offset:h=l[y]*d;for(let f=0;f<d;f++)u[g++]=c[h++]}return new Mn(u,d,p)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ui,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,p=c.length;d<p;d++){const u=c[d],h=e(u,i);l.push(h)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){const h=c[p];d.push(h.toJSON(e.data))}d.length>0&&(a[l]=d,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],p=s[c];for(let u=0,h=p.length;u<h;u++)d.push(p[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let mb=0;class tl extends Br{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mb++}),this.uuid=$o(),this.name="",this.type="Material",this.blending=dr,this.side=ka,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ud,this.blendDst=Ld,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=Tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ie(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Ie(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==dr&&(i.blending=this.blending),this.side!==ka&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ud&&(i.blendSrc=this.blendSrc),this.blendDst!==Ld&&(i.blendDst=this.blendDst),this.blendEquation!==rs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Tr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Pi=new V,bf=new V,Dl=new V,pa=new V,Tf=new V,Nl=new V,Af=new V;class Xx{constructor(e=new V,n=new V(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Pi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){bf.copy(e).add(n).multiplyScalar(.5),Dl.copy(n).sub(e).normalize(),pa.copy(this.origin).sub(bf);const s=e.distanceTo(n)*.5,r=-this.direction.dot(Dl),o=pa.dot(this.direction),l=-pa.dot(Dl),c=pa.lengthSq(),d=Math.abs(1-r*r);let p,u,h,g;if(d>0)if(p=r*l-o,u=r*o-l,g=s*d,p>=0)if(u>=-g)if(u<=g){const y=1/d;p*=y,u*=y,h=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=s,p=Math.max(0,-(r*u+o)),h=-p*p+u*(u+2*l)+c;else u=-s,p=Math.max(0,-(r*u+o)),h=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-r*s+o)),u=p>0?-s:Math.min(Math.max(-s,-l),s),h=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-s,-l),s),h=u*(u+2*l)+c):(p=Math.max(0,-(r*s+o)),u=p>0?s:Math.min(Math.max(-s,-l),s),h=-p*p+u*(u+2*l)+c);else u=r>0?-s:s,p=Math.max(0,-(r*u+o)),h=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),a&&a.copy(bf).addScaledVector(Dl,u),h}intersectSphere(e,n){Pi.subVectors(e.center,this.origin);const i=Pi.dot(this.direction),a=Pi.dot(Pi)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),p>=0?(o=(e.min.z-u.z)*p,l=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,l=(e.min.z-u.z)*p),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,n,i,a,s){Tf.subVectors(n,e),Nl.subVectors(i,e),Af.crossVectors(Tf,Nl);let r=this.direction.dot(Af),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;pa.subVectors(this.origin,e);const l=o*this.direction.dot(Nl.crossVectors(pa,Nl));if(l<0)return null;const c=o*this.direction.dot(Tf.cross(pa));if(c<0||l+c>r)return null;const d=-o*pa.dot(Af);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jx extends tl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new aa,this.combine=yx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zg=new It,Qa=new Xx,Ul=new du,Hg=new V,Ll=new V,Ol=new V,Il=new V,Rf=new V,Pl=new V,Gg=new V,Fl=new V;class sa extends bn{constructor(e=new ui,n=new jx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Pl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],p=s[l];d!==0&&(Rf.fromBufferAttribute(p,e),r?Pl.addScaledVector(Rf,d):Pl.addScaledVector(Rf.sub(n),d))}n.add(Pl)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ul.copy(i.boundingSphere),Ul.applyMatrix4(s),Qa.copy(e.ray).recast(e.near),!(Ul.containsPoint(Qa.origin)===!1&&(Qa.intersectSphere(Ul,Hg)===null||Qa.origin.distanceToSquared(Hg)>(e.far-e.near)**2))&&(zg.copy(s).invert(),Qa.copy(e.ray).applyMatrix4(zg),!(i.boundingBox!==null&&Qa.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Qa)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,p=s.attributes.normal,u=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,y=u.length;g<y;g++){const _=u[g],f=r[_.materialIndex],m=Math.max(_.start,h.start),v=Math.min(o.count,Math.min(_.start+_.count,h.start+h.count));for(let M=m,w=v;M<w;M+=3){const A=o.getX(M),R=o.getX(M+1),x=o.getX(M+2);a=Bl(this,f,e,i,c,d,p,A,R,x),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const g=Math.max(0,h.start),y=Math.min(o.count,h.start+h.count);for(let _=g,f=y;_<f;_+=3){const m=o.getX(_),v=o.getX(_+1),M=o.getX(_+2);a=Bl(this,r,e,i,c,d,p,m,v,M),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,y=u.length;g<y;g++){const _=u[g],f=r[_.materialIndex],m=Math.max(_.start,h.start),v=Math.min(l.count,Math.min(_.start+_.count,h.start+h.count));for(let M=m,w=v;M<w;M+=3){const A=M,R=M+1,x=M+2;a=Bl(this,f,e,i,c,d,p,A,R,x),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const g=Math.max(0,h.start),y=Math.min(l.count,h.start+h.count);for(let _=g,f=y;_<f;_+=3){const m=_,v=_+1,M=_+2;a=Bl(this,r,e,i,c,d,p,m,v,M),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}}}function gb(t,e,n,i,a,s,r,o){let l;if(e.side===En?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===ka,o),l===null)return null;Fl.copy(o),Fl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Fl);return c<n.near||c>n.far?null:{distance:c,point:Fl.clone(),object:t}}function Bl(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,Ll),t.getVertexPosition(l,Ol),t.getVertexPosition(c,Il);const d=gb(t,e,n,i,Ll,Ol,Il,Gg);if(d){const p=new V;ri.getBarycoord(Gg,Ll,Ol,Il,p),a&&(d.uv=ri.getInterpolatedAttribute(a,o,l,c,p,new mt)),s&&(d.uv1=ri.getInterpolatedAttribute(s,o,l,c,p,new mt)),r&&(d.normal=ri.getInterpolatedAttribute(r,o,l,c,p,new V),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new V,materialIndex:0};ri.getNormal(Ll,Ol,Il,u.normal),d.face=u,d.barycoord=p}return d}class _b extends pn{constructor(e=null,n=1,i=1,a,s,r,o,l,c=sn,d=sn,p,u){super(null,r,o,l,c,d,a,s,p,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cf=new V,vb=new V,xb=new He;class ss{constructor(e=new V(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=Cf.subVectors(i,n).cross(vb.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Cf),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||xb.getNormalMatrix(e),a=this.coplanarPoint(Cf).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ja=new du,Sb=new mt(.5,.5),zl=new V;class Wx{constructor(e=new ss,n=new ss,i=new ss,a=new ss,s=new ss,r=new ss){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=xi,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],p=s[5],u=s[6],h=s[7],g=s[8],y=s[9],_=s[10],f=s[11],m=s[12],v=s[13],M=s[14],w=s[15];if(a[0].setComponents(c-r,h-d,f-g,w-m).normalize(),a[1].setComponents(c+r,h+d,f+g,w+m).normalize(),a[2].setComponents(c+o,h+p,f+y,w+v).normalize(),a[3].setComponents(c-o,h-p,f-y,w-v).normalize(),i)a[4].setComponents(l,u,_,M).normalize(),a[5].setComponents(c-l,h-u,f-_,w-M).normalize();else if(a[4].setComponents(c-l,h-u,f-_,w-M).normalize(),n===xi)a[5].setComponents(c+l,h+u,f+_,w+M).normalize();else if(n===kc)a[5].setComponents(l,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ja.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ja)}intersectsSprite(e){Ja.center.set(0,0,0);const n=Sb.distanceTo(e.center);return Ja.radius=.7071067811865476+n,Ja.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ja)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(zl.x=a.normal.x>0?e.max.x:e.min.x,zl.y=a.normal.y>0?e.max.y:e.min.y,zl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(zl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mb extends tl{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vg=new It,yh=new Xx,Hl=new du,Gl=new V;class yb extends bn{constructor(e=new ui,n=new Mb){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hl.copy(i.boundingSphere),Hl.applyMatrix4(a),Hl.radius+=s,e.ray.intersectsSphere(Hl)===!1)return;Vg.copy(a).invert(),yh.copy(e.ray).applyMatrix4(Vg);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,p=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),h=Math.min(c.count,r.start+r.count);for(let g=u,y=h;g<y;g++){const _=c.getX(g);Gl.fromBufferAttribute(p,_),kg(Gl,_,l,a,e,n,this)}}else{const u=Math.max(0,r.start),h=Math.min(p.count,r.start+r.count);for(let g=u,y=h;g<y;g++)Gl.fromBufferAttribute(p,g),kg(Gl,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function kg(t,e,n,i,a,s,r){const o=yh.distanceSqToPoint(t);if(o<n){const l=new V;yh.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class qx extends pn{constructor(e=[],n=Ss,i,a,s,r,o,l,c,d){super(e,n,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ho extends pn{constructor(e,n,i=Ei,a,s,r,o=sn,l=sn,c,d=ia,p=1){if(d!==ia&&d!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:p};super(u,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Eb extends Ho{constructor(e,n=Ei,i=Ss,a,s,r=sn,o=sn,l,c=ia){const d={width:e,height:e,depth:1},p=[d,d,d,d,d,d];super(e,e,n,i,a,s,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Yx extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class nl extends ui{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],p=[];let u=0,h=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new Ki(c,3)),this.setAttribute("normal",new Ki(d,3)),this.setAttribute("uv",new Ki(p,2));function g(y,_,f,m,v,M,w,A,R,x,T){const F=M/R,D=w/x,H=M/2,k=w/2,q=A/2,G=R+1,U=x+1;let L=0,j=0;const K=new V;for(let ne=0;ne<U;ne++){const me=ne*D-k;for(let de=0;de<G;de++){const Le=de*F-H;K[y]=Le*m,K[_]=me*v,K[f]=q,c.push(K.x,K.y,K.z),K[y]=0,K[_]=0,K[f]=A>0?1:-1,d.push(K.x,K.y,K.z),p.push(de/R),p.push(1-ne/x),L+=1}}for(let ne=0;ne<x;ne++)for(let me=0;me<R;me++){const de=u+me+G*ne,Le=u+me+G*(ne+1),Je=u+(me+1)+G*(ne+1),it=u+(me+1)+G*ne;l.push(de,Le,it),l.push(Le,Je,it),j+=6}o.addGroup(h,j,T),h+=j,u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class hu extends ui{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,p=e/o,u=n/l,h=[],g=[],y=[],_=[];for(let f=0;f<d;f++){const m=f*u-r;for(let v=0;v<c;v++){const M=v*p-s;g.push(M,-m,0),y.push(0,0,1),_.push(v/o),_.push(1-f/l)}}for(let f=0;f<l;f++)for(let m=0;m<o;m++){const v=m+c*f,M=m+c*(f+1),w=m+1+c*(f+1),A=m+1+c*f;h.push(v,M,A),h.push(M,w,A)}this.setIndex(h),this.setAttribute("position",new Ki(g,3)),this.setAttribute("normal",new Ki(y,3)),this.setAttribute("uv",new Ki(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hu(e.width,e.height,e.widthSegments,e.heightSegments)}}function wr(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone():Array.isArray(a)?e[n][i]=a.slice():e[n][i]=a}}return e}function fn(t){const e={};for(let n=0;n<t.length;n++){const i=wr(t[n]);for(const a in i)e[a]=i[a]}return e}function bb(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Zx(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const Tb={clone:wr,merge:fn};var Ab=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends tl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ab,this.fragmentShader=Rb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=bb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Cb extends li{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class wb extends tl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=BE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Db extends tl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vl=new V,kl=new zr,di=new V;class Kx extends bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=xi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vl,kl,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vl,kl,di.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(Vl,kl,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vl,kl,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ma=new V,Xg=new mt,jg=new mt;class Wn extends Kx{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Mh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(sf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mh*2*Math.atan(Math.tan(sf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ma.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ma.x,ma.y).multiplyScalar(-e/ma.z),ma.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ma.x,ma.y).multiplyScalar(-e/ma.z)}getViewSize(e,n){return this.getViewBounds(e,Xg,jg),n.subVectors(jg,Xg)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(sf*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Qx extends Kx{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Gs=-90,Vs=1;class Nb extends bn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Wn(Gs,Vs,e,n);a.layers=this.layers,this.add(a);const s=new Wn(Gs,Vs,e,n);s.layers=this.layers,this.add(s);const r=new Wn(Gs,Vs,e,n);r.layers=this.layers,this.add(r);const o=new Wn(Gs,Vs,e,n);o.layers=this.layers,this.add(o);const l=new Wn(Gs,Vs,e,n);l.layers=this.layers,this.add(l);const c=new Wn(Gs,Vs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===xi)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kc)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(p,u,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ub extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Wg(t,e,n,i){const a=Lb(i);switch(n){case Ix:return t*e;case Fx:return t*e/a.components*a.byteLength;case Np:return t*e/a.components*a.byteLength;case Rr:return t*e*2/a.components*a.byteLength;case Up:return t*e*2/a.components*a.byteLength;case Px:return t*e*3/a.components*a.byteLength;case oi:return t*e*4/a.components*a.byteLength;case Lp:return t*e*4/a.components*a.byteLength;case lc:case cc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case uc:case fc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Xd:case Wd:return Math.max(t,16)*Math.max(e,8)/4;case kd:case jd:return Math.max(t,8)*Math.max(e,8)/2;case qd:case Yd:case Kd:case Qd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Zd:case Jd:case $d:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case eh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case th:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case nh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case ih:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case ah:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case sh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case rh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case oh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case lh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case ch:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case uh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case fh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case dh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case hh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ph:case mh:case gh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case _h:case vh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case xh:case Sh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Lb(t){switch(t){case Kn:case Nx:return{byteLength:1,components:1};case Bo:case Ux:case na:return{byteLength:2,components:1};case wp:case Dp:return{byteLength:2,components:4};case Ei:case Cp:case vi:return{byteLength:4,components:1};case Lx:case Ox:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rp}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Jx(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Ob(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,p=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,d),o.onUploadCallback();let h;if(c instanceof Float32Array)h=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=t.SHORT;else if(c instanceof Uint32Array)h=t.UNSIGNED_INT;else if(c instanceof Int32Array)h=t.INT;else if(c instanceof Int8Array)h=t.BYTE;else if(c instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const d=l.array,p=l.updateRanges;if(t.bindBuffer(c,o),p.length===0)t.bufferSubData(c,0,d);else{p.sort((h,g)=>h.start-g.start);let u=0;for(let h=1;h<p.length;h++){const g=p[u],y=p[h];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,p[u]=y)}p.length=u+1;for(let h=0,g=p.length;h<g;h++){const y=p[h];t.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var Ib=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Xb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Yb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$b=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,iT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,aT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,oT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fT="gl_FragColor = linearToOutputTexel( gl_FragColor );",dT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,pT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_T=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ST=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,MT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ET=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,AT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,RT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,CT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,DT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,NT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,UT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LT=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,OT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,IT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,PT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,BT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,GT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,VT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,XT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ZT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,QT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$T=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,iA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,aA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,uA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_A=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,SA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,EA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,AA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,RA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,CA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,DA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,UA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const OA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,IA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,GA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,VA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,XA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ZA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$A=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,t1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,n1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,s1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,c1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,d1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Ib,alphahash_pars_fragment:Pb,alphamap_fragment:Fb,alphamap_pars_fragment:Bb,alphatest_fragment:zb,alphatest_pars_fragment:Hb,aomap_fragment:Gb,aomap_pars_fragment:Vb,batching_pars_vertex:kb,batching_vertex:Xb,begin_vertex:jb,beginnormal_vertex:Wb,bsdfs:qb,iridescence_fragment:Yb,bumpmap_pars_fragment:Zb,clipping_planes_fragment:Kb,clipping_planes_pars_fragment:Qb,clipping_planes_pars_vertex:Jb,clipping_planes_vertex:$b,color_fragment:eT,color_pars_fragment:tT,color_pars_vertex:nT,color_vertex:iT,common:aT,cube_uv_reflection_fragment:sT,defaultnormal_vertex:rT,displacementmap_pars_vertex:oT,displacementmap_vertex:lT,emissivemap_fragment:cT,emissivemap_pars_fragment:uT,colorspace_fragment:fT,colorspace_pars_fragment:dT,envmap_fragment:hT,envmap_common_pars_fragment:pT,envmap_pars_fragment:mT,envmap_pars_vertex:gT,envmap_physical_pars_fragment:RT,envmap_vertex:_T,fog_vertex:vT,fog_pars_vertex:xT,fog_fragment:ST,fog_pars_fragment:MT,gradientmap_pars_fragment:yT,lightmap_pars_fragment:ET,lights_lambert_fragment:bT,lights_lambert_pars_fragment:TT,lights_pars_begin:AT,lights_toon_fragment:CT,lights_toon_pars_fragment:wT,lights_phong_fragment:DT,lights_phong_pars_fragment:NT,lights_physical_fragment:UT,lights_physical_pars_fragment:LT,lights_fragment_begin:OT,lights_fragment_maps:IT,lights_fragment_end:PT,logdepthbuf_fragment:FT,logdepthbuf_pars_fragment:BT,logdepthbuf_pars_vertex:zT,logdepthbuf_vertex:HT,map_fragment:GT,map_pars_fragment:VT,map_particle_fragment:kT,map_particle_pars_fragment:XT,metalnessmap_fragment:jT,metalnessmap_pars_fragment:WT,morphinstance_vertex:qT,morphcolor_vertex:YT,morphnormal_vertex:ZT,morphtarget_pars_vertex:KT,morphtarget_vertex:QT,normal_fragment_begin:JT,normal_fragment_maps:$T,normal_pars_fragment:eA,normal_pars_vertex:tA,normal_vertex:nA,normalmap_pars_fragment:iA,clearcoat_normal_fragment_begin:aA,clearcoat_normal_fragment_maps:sA,clearcoat_pars_fragment:rA,iridescence_pars_fragment:oA,opaque_fragment:lA,packing:cA,premultiplied_alpha_fragment:uA,project_vertex:fA,dithering_fragment:dA,dithering_pars_fragment:hA,roughnessmap_fragment:pA,roughnessmap_pars_fragment:mA,shadowmap_pars_fragment:gA,shadowmap_pars_vertex:_A,shadowmap_vertex:vA,shadowmask_pars_fragment:xA,skinbase_vertex:SA,skinning_pars_vertex:MA,skinning_vertex:yA,skinnormal_vertex:EA,specularmap_fragment:bA,specularmap_pars_fragment:TA,tonemapping_fragment:AA,tonemapping_pars_fragment:RA,transmission_fragment:CA,transmission_pars_fragment:wA,uv_pars_fragment:DA,uv_pars_vertex:NA,uv_vertex:UA,worldpos_vertex:LA,background_vert:OA,background_frag:IA,backgroundCube_vert:PA,backgroundCube_frag:FA,cube_vert:BA,cube_frag:zA,depth_vert:HA,depth_frag:GA,distance_vert:VA,distance_frag:kA,equirect_vert:XA,equirect_frag:jA,linedashed_vert:WA,linedashed_frag:qA,meshbasic_vert:YA,meshbasic_frag:ZA,meshlambert_vert:KA,meshlambert_frag:QA,meshmatcap_vert:JA,meshmatcap_frag:$A,meshnormal_vert:e1,meshnormal_frag:t1,meshphong_vert:n1,meshphong_frag:i1,meshphysical_vert:a1,meshphysical_frag:s1,meshtoon_vert:r1,meshtoon_frag:o1,points_vert:l1,points_frag:c1,shadow_vert:u1,shadow_frag:f1,sprite_vert:d1,sprite_frag:h1},ce={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},pi={basic:{uniforms:fn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:fn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ut(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:fn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:fn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:fn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:fn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:fn([ce.points,ce.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:fn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:fn([ce.common,ce.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:fn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:fn([ce.sprite,ce.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:fn([ce.common,ce.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:fn([ce.lights,ce.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};pi.physical={uniforms:fn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Xl={r:0,b:0,g:0},$a=new aa,p1=new It;function m1(t,e,n,i,a,s){const r=new ut(0);let o=a===!0?0:1,l,c,d=null,p=0,u=null;function h(m){let v=m.isScene===!0?m.background:null;if(v&&v.isTexture){const M=m.backgroundBlurriness>0;v=e.get(v,M)}return v}function g(m){let v=!1;const M=h(m);M===null?_(r,o):M&&M.isColor&&(_(M,1),v=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function y(m,v){const M=h(v);M&&(M.isCubeTexture||M.mapping===fu)?(c===void 0&&(c=new sa(new nl(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:wr(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),$a.copy(v.backgroundRotation),$a.x*=-1,$a.y*=-1,$a.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&($a.y*=-1,$a.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(p1.makeRotationFromEuler($a)),c.material.toneMapped=Qe.getTransfer(M.colorSpace)!==ot,(d!==M||p!==M.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,d=M,p=M.version,u=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new sa(new hu(2,2),new li({name:"BackgroundMaterial",uniforms:wr(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:ka,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(M.colorSpace)!==ot,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||p!==M.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,d=M,p=M.version,u=t.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,v){m.getRGB(Xl,Zx(t)),n.buffers.color.setClear(Xl.r,Xl.g,Xl.b,v,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(m,v=1){r.set(m),o=v,_(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,_(r,o)},render:g,addToRenderList:y,dispose:f}}function g1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(D,H,k,q,G){let U=!1;const L=p(D,q,k,H);s!==L&&(s=L,c(s.object)),U=h(D,q,k,G),U&&g(D,q,k,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(U||r)&&(r=!1,M(D,H,k,q),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function c(D){return t.bindVertexArray(D)}function d(D){return t.deleteVertexArray(D)}function p(D,H,k,q){const G=q.wireframe===!0;let U=i[H.id];U===void 0&&(U={},i[H.id]=U);const L=D.isInstancedMesh===!0?D.id:0;let j=U[L];j===void 0&&(j={},U[L]=j);let K=j[k.id];K===void 0&&(K={},j[k.id]=K);let ne=K[G];return ne===void 0&&(ne=u(l()),K[G]=ne),ne}function u(D){const H=[],k=[],q=[];for(let G=0;G<n;G++)H[G]=0,k[G]=0,q[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:k,attributeDivisors:q,object:D,attributes:{},index:null}}function h(D,H,k,q){const G=s.attributes,U=H.attributes;let L=0;const j=k.getAttributes();for(const K in j)if(j[K].location>=0){const me=G[K];let de=U[K];if(de===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(de=D.instanceColor)),me===void 0||me.attribute!==de||de&&me.data!==de.data)return!0;L++}return s.attributesNum!==L||s.index!==q}function g(D,H,k,q){const G={},U=H.attributes;let L=0;const j=k.getAttributes();for(const K in j)if(j[K].location>=0){let me=U[K];me===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(me=D.instanceColor));const de={};de.attribute=me,me&&me.data&&(de.data=me.data),G[K]=de,L++}s.attributes=G,s.attributesNum=L,s.index=q}function y(){const D=s.newAttributes;for(let H=0,k=D.length;H<k;H++)D[H]=0}function _(D){f(D,0)}function f(D,H){const k=s.newAttributes,q=s.enabledAttributes,G=s.attributeDivisors;k[D]=1,q[D]===0&&(t.enableVertexAttribArray(D),q[D]=1),G[D]!==H&&(t.vertexAttribDivisor(D,H),G[D]=H)}function m(){const D=s.newAttributes,H=s.enabledAttributes;for(let k=0,q=H.length;k<q;k++)H[k]!==D[k]&&(t.disableVertexAttribArray(k),H[k]=0)}function v(D,H,k,q,G,U,L){L===!0?t.vertexAttribIPointer(D,H,k,G,U):t.vertexAttribPointer(D,H,k,q,G,U)}function M(D,H,k,q){y();const G=q.attributes,U=k.getAttributes(),L=H.defaultAttributeValues;for(const j in U){const K=U[j];if(K.location>=0){let ne=G[j];if(ne===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor)),ne!==void 0){const me=ne.normalized,de=ne.itemSize,Le=e.get(ne);if(Le===void 0)continue;const Je=Le.buffer,it=Le.type,Q=Le.bytesPerElement,se=it===t.INT||it===t.UNSIGNED_INT||ne.gpuType===Cp;if(ne.isInterleavedBufferAttribute){const le=ne.data,ze=le.stride,we=ne.offset;if(le.isInstancedInterleavedBuffer){for(let Ue=0;Ue<K.locationSize;Ue++)f(K.location+Ue,le.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Ue=0;Ue<K.locationSize;Ue++)_(K.location+Ue);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let Ue=0;Ue<K.locationSize;Ue++)v(K.location+Ue,de/K.locationSize,it,me,ze*Q,(we+de/K.locationSize*Ue)*Q,se)}else{if(ne.isInstancedBufferAttribute){for(let le=0;le<K.locationSize;le++)f(K.location+le,ne.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let le=0;le<K.locationSize;le++)_(K.location+le);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let le=0;le<K.locationSize;le++)v(K.location+le,de/K.locationSize,it,me,de*Q,de/K.locationSize*le*Q,se)}}else if(L!==void 0){const me=L[j];if(me!==void 0)switch(me.length){case 2:t.vertexAttrib2fv(K.location,me);break;case 3:t.vertexAttrib3fv(K.location,me);break;case 4:t.vertexAttrib4fv(K.location,me);break;default:t.vertexAttrib1fv(K.location,me)}}}}m()}function w(){T();for(const D in i){const H=i[D];for(const k in H){const q=H[k];for(const G in q){const U=q[G];for(const L in U)d(U[L].object),delete U[L];delete q[G]}}delete i[D]}}function A(D){if(i[D.id]===void 0)return;const H=i[D.id];for(const k in H){const q=H[k];for(const G in q){const U=q[G];for(const L in U)d(U[L].object),delete U[L];delete q[G]}}delete i[D.id]}function R(D){for(const H in i){const k=i[H];for(const q in k){const G=k[q];if(G[D.id]===void 0)continue;const U=G[D.id];for(const L in U)d(U[L].object),delete U[L];delete G[D.id]}}}function x(D){for(const H in i){const k=i[H],q=D.isInstancedMesh===!0?D.id:0,G=k[q];if(G!==void 0){for(const U in G){const L=G[U];for(const j in L)d(L[j].object),delete L[j];delete G[U]}delete k[q],Object.keys(k).length===0&&delete i[H]}}}function T(){F(),r=!0,s!==a&&(s=a,c(s.object))}function F(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:T,resetDefaultState:F,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:_,disableUnusedAttributes:m}}function _1(t,e,n){let i;function a(c){i=c}function s(c,d){t.drawArrays(i,c,d),n.update(d,i,1)}function r(c,d,p){p!==0&&(t.drawArraysInstanced(i,c,d,p),n.update(d,i,p))}function o(c,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,p);let h=0;for(let g=0;g<p;g++)h+=d[g];n.update(h,i,1)}function l(c,d,p,u){if(p===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)r(c[g],d[g],u[g]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,p);let g=0;for(let y=0;y<p;y++)g+=d[y]*u[y];n.update(g,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function v1(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(R){return!(R!==oi&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const x=R===na&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Kn&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==vi&&!x)}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(Ie("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:_,maxAttributes:f,maxVertexUniforms:m,maxVaryings:v,maxFragmentUniforms:M,maxSamples:w,samples:A}}function x1(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new ss,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const h=p.length!==0||u||i!==0||a;return a=u,i=p.length,h},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){n=d(p,u,0)},this.setState=function(p,u,h){const g=p.clippingPlanes,y=p.clipIntersection,_=p.clipShadows,f=t.get(p);if(!a||g===null||g.length===0||s&&!_)s?d(null):c();else{const m=s?0:i,v=m*4;let M=f.clippingState||null;l.value=M,M=d(g,u,v,h);for(let w=0;w!==v;++w)M[w]=n[w];f.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(p,u,h,g){const y=p!==null?p.length:0;let _=null;if(y!==0){if(_=l.value,g!==!0||_===null){const f=h+y*4,m=u.matrixWorldInverse;o.getNormalMatrix(m),(_===null||_.length<f)&&(_=new Float32Array(f));for(let v=0,M=h;v!==y;++v,M+=4)r.copy(p[v]).applyMatrix4(m,o),r.normal.toArray(_,M),_[M+3]=r.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,_}}const wa=4,qg=[.125,.215,.35,.446,.526,.582],os=20,S1=256,$r=new Qx,Yg=new ut;let wf=null,Df=0,Nf=0,Uf=!1;const M1=new V;class Zg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=M1}=s;wf=this._renderer.getRenderTarget(),Df=this._renderer.getActiveCubeFace(),Nf=this._renderer.getActiveMipmapLevel(),Uf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wf,Df,Nf),this._renderer.xr.enabled=Uf,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ss||e.mapping===Ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wf=this._renderer.getRenderTarget(),Df=this._renderer.getActiveCubeFace(),Nf=this._renderer.getActiveMipmapLevel(),Uf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:un,minFilter:un,generateMipmaps:!1,type:na,format:oi,colorSpace:Cr,depthBuffer:!1},a=Kg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kg(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=y1(s)),this._blurMaterial=b1(s,e,n),this._ggxMaterial=E1(s,e,n)}return a}_compileMaterial(e){const n=new sa(new ui,e);this._renderer.compile(n,$r)}_sceneToCubeUV(e,n,i,a,s){const l=new Wn(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,h=p.toneMapping;p.getClearColor(Yg),p.toneMapping=Mi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(a),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new sa(new nl,new jx({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,_=y.material;let f=!1;const m=e.background;m?m.isColor&&(_.color.copy(m),e.background=null,f=!0):(_.color.copy(Yg),f=!0);for(let v=0;v<6;v++){const M=v%3;M===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[v],s.y,s.z)):M===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[v]));const w=this._cubeSize;ks(a,M*w,v>2?w:0,w,w),p.setRenderTarget(a),f&&p.render(y,l),p.render(e,l)}p.toneMapping=h,p.autoClear=u,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===Ss||e.mapping===Ar;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qg());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ks(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,$r)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,h=p*u,{_lodMax:g}=this,y=this._sizeLods[i],_=3*y*(i>g-wa?i-g+wa:0),f=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=g-n,ks(s,_,f,3*y,2*y),a.setRenderTarget(s),a.render(o,$r),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,ks(e,_,f,3*y,2*y),a.setRenderTarget(e),a.render(o,$r)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const d=3,p=this._lodMeshes[a];p.material=c;const u=c.uniforms,h=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*os-1),y=s/g,_=isFinite(s)?1+Math.floor(d*y):os;_>os&&Ie(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${os}`);const f=[];let m=0;for(let R=0;R<os;++R){const x=R/y,T=Math.exp(-x*x/2);f.push(T),R===0?m+=T:R<_&&(m+=2*T)}for(let R=0;R<f.length;R++)f[R]=f[R]/m;u.envMap.value=e.texture,u.samples.value=_,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-i;const M=this._sizeLods[a],w=3*M*(a>v-wa?a-v+wa:0),A=4*(this._cubeSize-M);ks(n,w,A,3*M,2*M),l.setRenderTarget(n),l.render(p,$r)}}function y1(t){const e=[],n=[],i=[];let a=t;const s=t-wa+1+qg.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-wa?l=qg[r-t+wa-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],h=6,g=6,y=3,_=2,f=1,m=new Float32Array(y*g*h),v=new Float32Array(_*g*h),M=new Float32Array(f*g*h);for(let A=0;A<h;A++){const R=A%3*2/3-1,x=A>2?0:-1,T=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];m.set(T,y*g*A),v.set(u,_*g*A);const F=[A,A,A,A,A,A];M.set(F,f*g*A)}const w=new ui;w.setAttribute("position",new Mn(m,y)),w.setAttribute("uv",new Mn(v,_)),w.setAttribute("faceIndex",new Mn(M,f)),i.push(new sa(w,null)),a>wa&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Kg(t,e,n){const i=new yi(t,e,n);return i.texture.mapping=fu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function E1(t,e,n){return new li({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:S1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function b1(t,e,n){const i=new Float32Array(os),a=new V(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:os,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Qg(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Jg(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function pu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class $x extends yi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new qx(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new nl(5,5,5),s=new li({name:"CubemapFromEquirect",uniforms:wr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:En,blending:Yi});s.uniforms.tEquirect.value=n;const r=new sa(a,s),o=n.minFilter;return n.minFilter===ls&&(n.minFilter=un),new Nb(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function T1(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,h=!1){return u==null?null:h?r(u):s(u)}function s(u){if(u&&u.isTexture){const h=u.mapping;if(h===tf||h===nf)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const y=new $x(g.height);return y.fromEquirectangularTexture(t,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const h=u.mapping,g=h===tf||h===nf,y=h===Ss||h===Ar;if(g||y){let _=n.get(u);const f=_!==void 0?_.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Zg(t)),_=g?i.fromEquirectangular(u,_):i.fromCubemap(u,_),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),_.texture;if(_!==void 0)return _.texture;{const m=u.image;return g&&m&&m.height>0||y&&m&&l(m)?(i===null&&(i=new Zg(t)),_=g?i.fromEquirectangular(u):i.fromCubemap(u),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),u.addEventListener("dispose",d),_.texture):null}}}return u}function o(u,h){return h===tf?u.mapping=Ss:h===nf&&(u.mapping=Ar),u}function l(u){let h=0;const g=6;for(let y=0;y<g;y++)u[y]!==void 0&&h++;return h===g}function c(u){const h=u.target;h.removeEventListener("dispose",c);const g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function d(u){const h=u.target;h.removeEventListener("dispose",d);const g=n.get(h);g!==void 0&&(n.delete(h),g.dispose())}function p(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:p}}function A1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&jc("WebGLRenderer: "+i+" extension not supported."),a}}}function R1(t,e,n,i){const a={},s=new WeakMap;function r(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const h=s.get(u);h&&(e.remove(h),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(p){const u=p.attributes;for(const h in u)e.update(u[h],t.ARRAY_BUFFER)}function c(p){const u=[],h=p.index,g=p.attributes.position;let y=0;if(g===void 0)return;if(h!==null){const m=h.array;y=h.version;for(let v=0,M=m.length;v<M;v+=3){const w=m[v+0],A=m[v+1],R=m[v+2];u.push(w,A,A,R,R,w)}}else{const m=g.array;y=g.version;for(let v=0,M=m.length/3-1;v<M;v+=3){const w=v+0,A=v+1,R=v+2;u.push(w,A,A,R,R,w)}}const _=new(g.count>=65535?kx:Vx)(u,1);_.version=y;const f=s.get(p);f&&e.remove(f),s.set(p,_)}function d(p){const u=s.get(p);if(u){const h=p.index;h!==null&&u.version<h.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function C1(t,e,n){let i;function a(u){i=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function l(u,h){t.drawElements(i,h,s,u*r),n.update(h,i,1)}function c(u,h,g){g!==0&&(t.drawElementsInstanced(i,h,s,u*r,g),n.update(h,i,g))}function d(u,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,u,0,g);let _=0;for(let f=0;f<g;f++)_+=h[f];n.update(_,i,1)}function p(u,h,g,y){if(g===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let f=0;f<u.length;f++)c(u[f]/r,h[f],y[f]);else{_.multiDrawElementsInstancedWEBGL(i,h,0,s,u,0,y,0,g);let f=0;for(let m=0;m<g;m++)f+=h[m]*y[m];n.update(f,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function w1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:et("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function D1(t,e,n){const i=new WeakMap,a=new Lt;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==p){let F=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",F)};var h=F;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),y===!0&&(M=2),_===!0&&(M=3);let w=o.attributes.position.count*M,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*A*4*p),x=new zx(R,w,A,p);x.type=vi,x.needsUpdate=!0;const T=M*4;for(let D=0;D<p;D++){const H=f[D],k=m[D],q=v[D],G=w*A*4*D;for(let U=0;U<H.count;U++){const L=U*T;g===!0&&(a.fromBufferAttribute(H,U),R[G+L+0]=a.x,R[G+L+1]=a.y,R[G+L+2]=a.z,R[G+L+3]=0),y===!0&&(a.fromBufferAttribute(k,U),R[G+L+4]=a.x,R[G+L+5]=a.y,R[G+L+6]=a.z,R[G+L+7]=0),_===!0&&(a.fromBufferAttribute(q,U),R[G+L+8]=a.x,R[G+L+9]=a.y,R[G+L+10]=a.z,R[G+L+11]=q.itemSize===4?a.w:1)}}u={count:p,texture:x,size:new mt(w,A)},i.set(o,u),o.addEventListener("dispose",F)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let _=0;_<c.length;_++)g+=c[_];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function N1(t,e,n,i,a){let s=new WeakMap;function r(c){const d=a.render.frame,p=c.geometry,u=e.get(c,p);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==d&&(h.update(),s.set(h,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const U1={[Ex]:"LINEAR_TONE_MAPPING",[bx]:"REINHARD_TONE_MAPPING",[Tx]:"CINEON_TONE_MAPPING",[Ax]:"ACES_FILMIC_TONE_MAPPING",[Cx]:"AGX_TONE_MAPPING",[wx]:"NEUTRAL_TONE_MAPPING",[Rx]:"CUSTOM_TONE_MAPPING"};function L1(t,e,n,i,a){const s=new yi(e,n,{type:t,depthBuffer:i,stencilBuffer:a}),r=new yi(e,n,{type:na,depthBuffer:!1,stencilBuffer:!1}),o=new ui;o.setAttribute("position",new Ki([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ki([0,2,0,0,2,0],2));const l=new Cb({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new sa(o,l),d=new Qx(-1,1,1,-1,0,1);let p=null,u=null,h=!1,g,y=null,_=[],f=!1;this.setSize=function(m,v){s.setSize(m,v),r.setSize(m,v);for(let M=0;M<_.length;M++){const w=_[M];w.setSize&&w.setSize(m,v)}},this.setEffects=function(m){_=m,f=_.length>0&&_[0].isRenderPass===!0;const v=s.width,M=s.height;for(let w=0;w<_.length;w++){const A=_[w];A.setSize&&A.setSize(v,M)}},this.begin=function(m,v){if(h||m.toneMapping===Mi&&_.length===0)return!1;if(y=v,v!==null){const M=v.width,w=v.height;(s.width!==M||s.height!==w)&&this.setSize(M,w)}return f===!1&&m.setRenderTarget(s),g=m.toneMapping,m.toneMapping=Mi,!0},this.hasRenderPass=function(){return f},this.end=function(m,v){m.toneMapping=g,h=!0;let M=s,w=r;for(let A=0;A<_.length;A++){const R=_[A];if(R.enabled!==!1&&(R.render(m,w,M,v),R.needsSwap!==!1)){const x=M;M=w,w=x}}if(p!==m.outputColorSpace||u!==m.toneMapping){p=m.outputColorSpace,u=m.toneMapping,l.defines={},Qe.getTransfer(p)===ot&&(l.defines.SRGB_TRANSFER="");const A=U1[u];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,m.setRenderTarget(y),m.render(c,d),y=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),r.dispose(),o.dispose(),l.dispose()}}const eS=new pn,Eh=new Ho(1,1),tS=new zx,nS=new ib,iS=new qx,$g=[],e_=[],t_=new Float32Array(16),n_=new Float32Array(9),i_=new Float32Array(4);function Hr(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=$g[a];if(s===void 0&&(s=new Float32Array(a),$g[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function jt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Wt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function mu(t,e){let n=e_[e];n===void 0&&(n=new Int32Array(e),e_[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function O1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function I1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2fv(this.addr,e),Wt(n,e)}}function P1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(jt(n,e))return;t.uniform3fv(this.addr,e),Wt(n,e)}}function F1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4fv(this.addr,e),Wt(n,e)}}function B1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Wt(n,e)}else{if(jt(n,i))return;i_.set(i),t.uniformMatrix2fv(this.addr,!1,i_),Wt(n,i)}}function z1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Wt(n,e)}else{if(jt(n,i))return;n_.set(i),t.uniformMatrix3fv(this.addr,!1,n_),Wt(n,i)}}function H1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Wt(n,e)}else{if(jt(n,i))return;t_.set(i),t.uniformMatrix4fv(this.addr,!1,t_),Wt(n,i)}}function G1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function V1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2iv(this.addr,e),Wt(n,e)}}function k1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(jt(n,e))return;t.uniform3iv(this.addr,e),Wt(n,e)}}function X1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4iv(this.addr,e),Wt(n,e)}}function j1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function W1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2uiv(this.addr,e),Wt(n,e)}}function q1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(jt(n,e))return;t.uniform3uiv(this.addr,e),Wt(n,e)}}function Y1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4uiv(this.addr,e),Wt(n,e)}}function Z1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Eh.compareFunction=n.isReversedDepthBuffer()?Ip:Op,s=Eh):s=eS,n.setTexture2D(e||s,a)}function K1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||nS,a)}function Q1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||iS,a)}function J1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||tS,a)}function $1(t){switch(t){case 5126:return O1;case 35664:return I1;case 35665:return P1;case 35666:return F1;case 35674:return B1;case 35675:return z1;case 35676:return H1;case 5124:case 35670:return G1;case 35667:case 35671:return V1;case 35668:case 35672:return k1;case 35669:case 35673:return X1;case 5125:return j1;case 36294:return W1;case 36295:return q1;case 36296:return Y1;case 35678:case 36198:case 36298:case 36306:case 35682:return Z1;case 35679:case 36299:case 36307:return K1;case 35680:case 36300:case 36308:case 36293:return Q1;case 36289:case 36303:case 36311:case 36292:return J1}}function eR(t,e){t.uniform1fv(this.addr,e)}function tR(t,e){const n=Hr(e,this.size,2);t.uniform2fv(this.addr,n)}function nR(t,e){const n=Hr(e,this.size,3);t.uniform3fv(this.addr,n)}function iR(t,e){const n=Hr(e,this.size,4);t.uniform4fv(this.addr,n)}function aR(t,e){const n=Hr(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function sR(t,e){const n=Hr(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function rR(t,e){const n=Hr(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function oR(t,e){t.uniform1iv(this.addr,e)}function lR(t,e){t.uniform2iv(this.addr,e)}function cR(t,e){t.uniform3iv(this.addr,e)}function uR(t,e){t.uniform4iv(this.addr,e)}function fR(t,e){t.uniform1uiv(this.addr,e)}function dR(t,e){t.uniform2uiv(this.addr,e)}function hR(t,e){t.uniform3uiv(this.addr,e)}function pR(t,e){t.uniform4uiv(this.addr,e)}function mR(t,e,n){const i=this.cache,a=e.length,s=mu(n,a);jt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Eh:r=eS;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function gR(t,e,n){const i=this.cache,a=e.length,s=mu(n,a);jt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||nS,s[r])}function _R(t,e,n){const i=this.cache,a=e.length,s=mu(n,a);jt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||iS,s[r])}function vR(t,e,n){const i=this.cache,a=e.length,s=mu(n,a);jt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||tS,s[r])}function xR(t){switch(t){case 5126:return eR;case 35664:return tR;case 35665:return nR;case 35666:return iR;case 35674:return aR;case 35675:return sR;case 35676:return rR;case 5124:case 35670:return oR;case 35667:case 35671:return lR;case 35668:case 35672:return cR;case 35669:case 35673:return uR;case 5125:return fR;case 36294:return dR;case 36295:return hR;case 36296:return pR;case 35678:case 36198:case 36298:case 36306:case 35682:return mR;case 35679:case 36299:case 36307:return gR;case 35680:case 36300:case 36308:case 36293:return _R;case 36289:case 36303:case 36311:case 36292:return vR}}class SR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=$1(n.type)}}class MR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=xR(n.type)}}class yR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const Lf=/(\w+)(\])?(\[|\.)?/g;function a_(t,e){t.seq.push(e),t.map[e.id]=e}function ER(t,e,n){const i=t.name,a=i.length;for(Lf.lastIndex=0;;){const s=Lf.exec(i),r=Lf.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){a_(n,c===void 0?new SR(o,t,e):new MR(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new yR(o),a_(n,p)),n=p}}}class dc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);ER(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function s_(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const bR=37297;let TR=0;function AR(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const r_=new He;function RR(t){Qe._getMatrix(r_,Qe.workingColorSpace,t);const e=`mat3( ${r_.elements.map(n=>n.toFixed(4))} )`;switch(Qe.getTransfer(t)){case Vc:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function o_(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+AR(t.getShaderSource(e),o)}else return s}function CR(t,e){const n=RR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const wR={[Ex]:"Linear",[bx]:"Reinhard",[Tx]:"Cineon",[Ax]:"ACESFilmic",[Cx]:"AgX",[wx]:"Neutral",[Rx]:"Custom"};function DR(t,e){const n=wR[e];return n===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const jl=new V;function NR(){Qe.getLuminanceCoefficients(jl);const t=jl.x.toFixed(4),e=jl.y.toFixed(4),n=jl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function UR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function LR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function OR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function lo(t){return t!==""}function l_(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function c_(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const IR=/^[ \t]*#include +<([\w\d./]+)>/gm;function bh(t){return t.replace(IR,FR)}const PR=new Map;function FR(t,e){let n=Ge[e];if(n===void 0){const i=PR.get(e);if(i!==void 0)n=Ge[i],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return bh(n)}const BR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function u_(t){return t.replace(BR,zR)}function zR(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function f_(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const HR={[oc]:"SHADOWMAP_TYPE_PCF",[oo]:"SHADOWMAP_TYPE_VSM"};function GR(t){return HR[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const VR={[Ss]:"ENVMAP_TYPE_CUBE",[Ar]:"ENVMAP_TYPE_CUBE",[fu]:"ENVMAP_TYPE_CUBE_UV"};function kR(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":VR[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const XR={[Ar]:"ENVMAP_MODE_REFRACTION"};function jR(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":XR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const WR={[yx]:"ENVMAP_BLENDING_MULTIPLY",[IE]:"ENVMAP_BLENDING_MIX",[PE]:"ENVMAP_BLENDING_ADD"};function qR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":WR[t.combine]||"ENVMAP_BLENDING_NONE"}function YR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function ZR(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=GR(n),c=kR(n),d=jR(n),p=qR(n),u=YR(n),h=UR(n),g=LR(s),y=a.createProgram();let _,f,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(lo).join(`
`),_.length>0&&(_+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(lo).join(`
`),f.length>0&&(f+=`
`)):(_=[f_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),f=[f_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Mi?"#define TONE_MAPPING":"",n.toneMapping!==Mi?Ge.tonemapping_pars_fragment:"",n.toneMapping!==Mi?DR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,CR("linearToOutputTexel",n.outputColorSpace),NR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(lo).join(`
`)),r=bh(r),r=l_(r,n),r=c_(r,n),o=bh(o),o=l_(o,n),o=c_(o,n),r=u_(r),o=u_(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,f=["#define varying in",n.glslVersion===Tg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Tg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=m+_+r,M=m+f+o,w=s_(a,a.VERTEX_SHADER,v),A=s_(a,a.FRAGMENT_SHADER,M);a.attachShader(y,w),a.attachShader(y,A),n.index0AttributeName!==void 0?a.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(y,0,"position"),a.linkProgram(y);function R(D){if(t.debug.checkShaderErrors){const H=a.getProgramInfoLog(y)||"",k=a.getShaderInfoLog(w)||"",q=a.getShaderInfoLog(A)||"",G=H.trim(),U=k.trim(),L=q.trim();let j=!0,K=!0;if(a.getProgramParameter(y,a.LINK_STATUS)===!1)if(j=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,y,w,A);else{const ne=o_(a,w,"vertex"),me=o_(a,A,"fragment");et("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(y,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+G+`
`+ne+`
`+me)}else G!==""?Ie("WebGLProgram: Program Info Log:",G):(U===""||L==="")&&(K=!1);K&&(D.diagnostics={runnable:j,programLog:G,vertexShader:{log:U,prefix:_},fragmentShader:{log:L,prefix:f}})}a.deleteShader(w),a.deleteShader(A),x=new dc(a,y),T=OR(a,y)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=a.getProgramParameter(y,bR)),F},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=TR++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=A,this}let KR=0;class QR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new JR(e),n.set(e,i)),i}}class JR{constructor(e){this.id=KR++,this.code=e,this.usedTimes=0}}function $R(t,e,n,i,a,s){const r=new Hx,o=new QR,l=new Set,c=[],d=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function y(x,T,F,D,H){const k=D.fog,q=H.geometry,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,U=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,L=e.get(x.envMap||G,U),j=L&&L.mapping===fu?L.image.height:null,K=h[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Ie("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ne=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,me=ne!==void 0?ne.length:0;let de=0;q.morphAttributes.position!==void 0&&(de=1),q.morphAttributes.normal!==void 0&&(de=2),q.morphAttributes.color!==void 0&&(de=3);let Le,Je,it,Q;if(K){const rt=pi[K];Le=rt.vertexShader,Je=rt.fragmentShader}else Le=x.vertexShader,Je=x.fragmentShader,o.update(x),it=o.getVertexShaderID(x),Q=o.getFragmentShaderID(x);const se=t.getRenderTarget(),le=t.state.buffers.depth.getReversed(),ze=H.isInstancedMesh===!0,we=H.isBatchedMesh===!0,Ue=!!x.map,qt=!!x.matcap,Ke=!!L,st=!!x.aoMap,gt=!!x.lightMap,Ve=!!x.bumpMap,Dt=!!x.normalMap,N=!!x.displacementMap,Pt=!!x.emissiveMap,at=!!x.metalnessMap,xt=!!x.roughnessMap,Ee=x.anisotropy>0,C=x.clearcoat>0,S=x.dispersion>0,I=x.iridescence>0,Z=x.sheen>0,$=x.transmission>0,Y=Ee&&!!x.anisotropyMap,ve=C&&!!x.clearcoatMap,re=C&&!!x.clearcoatNormalMap,Ce=C&&!!x.clearcoatRoughnessMap,De=I&&!!x.iridescenceMap,ee=I&&!!x.iridescenceThicknessMap,ie=Z&&!!x.sheenColorMap,xe=Z&&!!x.sheenRoughnessMap,Me=!!x.specularMap,pe=!!x.specularColorMap,ke=!!x.specularIntensityMap,O=$&&!!x.transmissionMap,oe=$&&!!x.thicknessMap,ae=!!x.gradientMap,_e=!!x.alphaMap,te=x.alphaTest>0,W=!!x.alphaHash,Se=!!x.extensions;let Oe=Mi;x.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Oe=t.toneMapping);const St={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:Le,fragmentShader:Je,defines:x.defines,customVertexShaderID:it,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:we,batchingColor:we&&H._colorsTexture!==null,instancing:ze,instancingColor:ze&&H.instanceColor!==null,instancingMorph:ze&&H.morphTexture!==null,outputColorSpace:se===null?t.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Cr,alphaToCoverage:!!x.alphaToCoverage,map:Ue,matcap:qt,envMap:Ke,envMapMode:Ke&&L.mapping,envMapCubeUVHeight:j,aoMap:st,lightMap:gt,bumpMap:Ve,normalMap:Dt,displacementMap:N,emissiveMap:Pt,normalMapObjectSpace:Dt&&x.normalMapType===HE,normalMapTangentSpace:Dt&&x.normalMapType===zE,metalnessMap:at,roughnessMap:xt,anisotropy:Ee,anisotropyMap:Y,clearcoat:C,clearcoatMap:ve,clearcoatNormalMap:re,clearcoatRoughnessMap:Ce,dispersion:S,iridescence:I,iridescenceMap:De,iridescenceThicknessMap:ee,sheen:Z,sheenColorMap:ie,sheenRoughnessMap:xe,specularMap:Me,specularColorMap:pe,specularIntensityMap:ke,transmission:$,transmissionMap:O,thicknessMap:oe,gradientMap:ae,opaque:x.transparent===!1&&x.blending===dr&&x.alphaToCoverage===!1,alphaMap:_e,alphaTest:te,alphaHash:W,combine:x.combine,mapUv:Ue&&g(x.map.channel),aoMapUv:st&&g(x.aoMap.channel),lightMapUv:gt&&g(x.lightMap.channel),bumpMapUv:Ve&&g(x.bumpMap.channel),normalMapUv:Dt&&g(x.normalMap.channel),displacementMapUv:N&&g(x.displacementMap.channel),emissiveMapUv:Pt&&g(x.emissiveMap.channel),metalnessMapUv:at&&g(x.metalnessMap.channel),roughnessMapUv:xt&&g(x.roughnessMap.channel),anisotropyMapUv:Y&&g(x.anisotropyMap.channel),clearcoatMapUv:ve&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(x.sheenRoughnessMap.channel),specularMapUv:Me&&g(x.specularMap.channel),specularColorMapUv:pe&&g(x.specularColorMap.channel),specularIntensityMapUv:ke&&g(x.specularIntensityMap.channel),transmissionMapUv:O&&g(x.transmissionMap.channel),thicknessMapUv:oe&&g(x.thicknessMap.channel),alphaMapUv:_e&&g(x.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Dt||Ee),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!q.attributes.uv&&(Ue||_e),fog:!!k,useFog:x.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||q.attributes.normal===void 0&&Dt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:le,skinning:H.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:de,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&F.length>0,shadowMapType:t.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Ue&&x.map.isVideoTexture===!0&&Qe.getTransfer(x.map.colorSpace)===ot,decodeVideoTextureEmissive:Pt&&x.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(x.emissiveMap.colorSpace)===ot,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Hi,flipSided:x.side===En,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function _(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const F in x.defines)T.push(F),T.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(f(T,x),m(T,x),T.push(t.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function f(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function m(x,T){r.disableAll(),T.instancing&&r.enable(0),T.instancingColor&&r.enable(1),T.instancingMorph&&r.enable(2),T.matcap&&r.enable(3),T.envMap&&r.enable(4),T.normalMapObjectSpace&&r.enable(5),T.normalMapTangentSpace&&r.enable(6),T.clearcoat&&r.enable(7),T.iridescence&&r.enable(8),T.alphaTest&&r.enable(9),T.vertexColors&&r.enable(10),T.vertexAlphas&&r.enable(11),T.vertexUv1s&&r.enable(12),T.vertexUv2s&&r.enable(13),T.vertexUv3s&&r.enable(14),T.vertexTangents&&r.enable(15),T.anisotropy&&r.enable(16),T.alphaHash&&r.enable(17),T.batching&&r.enable(18),T.dispersion&&r.enable(19),T.batchingColor&&r.enable(20),T.gradientMap&&r.enable(21),x.push(r.mask),r.disableAll(),T.fog&&r.enable(0),T.useFog&&r.enable(1),T.flatShading&&r.enable(2),T.logarithmicDepthBuffer&&r.enable(3),T.reversedDepthBuffer&&r.enable(4),T.skinning&&r.enable(5),T.morphTargets&&r.enable(6),T.morphNormals&&r.enable(7),T.morphColors&&r.enable(8),T.premultipliedAlpha&&r.enable(9),T.shadowMapEnabled&&r.enable(10),T.doubleSided&&r.enable(11),T.flipSided&&r.enable(12),T.useDepthPacking&&r.enable(13),T.dithering&&r.enable(14),T.transmission&&r.enable(15),T.sheen&&r.enable(16),T.opaque&&r.enable(17),T.pointsUvs&&r.enable(18),T.decodeVideoTexture&&r.enable(19),T.decodeVideoTextureEmissive&&r.enable(20),T.alphaToCoverage&&r.enable(21),x.push(r.mask)}function v(x){const T=h[x.type];let F;if(T){const D=pi[T];F=Tb.clone(D.uniforms)}else F=x.uniforms;return F}function M(x,T){let F=d.get(T);return F!==void 0?++F.usedTimes:(F=new ZR(t,T,x,a),c.push(F),d.set(T,F)),F}function w(x){if(--x.usedTimes===0){const T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),d.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function R(){o.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:v,acquireProgram:M,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:R}}function eC(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function tC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function d_(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function h_(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let h=0;return u.isInstancedMesh&&(h+=2),u.isSkinnedMesh&&(h+=1),h}function o(u,h,g,y,_,f){let m=t[e];return m===void 0?(m={id:u.id,object:u,geometry:h,material:g,materialVariant:r(u),groupOrder:y,renderOrder:u.renderOrder,z:_,group:f},t[e]=m):(m.id=u.id,m.object=u,m.geometry=h,m.material=g,m.materialVariant=r(u),m.groupOrder=y,m.renderOrder=u.renderOrder,m.z=_,m.group=f),e++,m}function l(u,h,g,y,_,f){const m=o(u,h,g,y,_,f);g.transmission>0?i.push(m):g.transparent===!0?a.push(m):n.push(m)}function c(u,h,g,y,_,f){const m=o(u,h,g,y,_,f);g.transmission>0?i.unshift(m):g.transparent===!0?a.unshift(m):n.unshift(m)}function d(u,h){n.length>1&&n.sort(u||tC),i.length>1&&i.sort(h||d_),a.length>1&&a.sort(h||d_)}function p(){for(let u=e,h=t.length;u<h;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:p,sort:d}}function nC(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new h_,t.set(i,[r])):a>=s.length?(r=new h_,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function iC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new V,color:new ut};break;case"SpotLight":n={position:new V,direction:new V,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new ut,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":n={color:new ut,position:new V,halfWidth:new V,halfHeight:new V};break}return t[e.id]=n,n}}}function aC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let sC=0;function rC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function oC(t){const e=new iC,n=aC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const a=new V,s=new It,r=new It;function o(c){let d=0,p=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let h=0,g=0,y=0,_=0,f=0,m=0,v=0,M=0,w=0,A=0,R=0;c.sort(rC);for(let T=0,F=c.length;T<F;T++){const D=c[T],H=D.color,k=D.intensity,q=D.distance;let G=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Rr?G=D.shadow.map.texture:G=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)d+=H.r*k,p+=H.g*k,u+=H.b*k;else if(D.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(D.sh.coefficients[U],k);R++}else if(D.isDirectionalLight){const U=e.get(D);if(U.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const L=D.shadow,j=n.get(D);j.shadowIntensity=L.intensity,j.shadowBias=L.bias,j.shadowNormalBias=L.normalBias,j.shadowRadius=L.radius,j.shadowMapSize=L.mapSize,i.directionalShadow[h]=j,i.directionalShadowMap[h]=G,i.directionalShadowMatrix[h]=D.shadow.matrix,m++}i.directional[h]=U,h++}else if(D.isSpotLight){const U=e.get(D);U.position.setFromMatrixPosition(D.matrixWorld),U.color.copy(H).multiplyScalar(k),U.distance=q,U.coneCos=Math.cos(D.angle),U.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),U.decay=D.decay,i.spot[y]=U;const L=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,L.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[y]=L.matrix,D.castShadow){const j=n.get(D);j.shadowIntensity=L.intensity,j.shadowBias=L.bias,j.shadowNormalBias=L.normalBias,j.shadowRadius=L.radius,j.shadowMapSize=L.mapSize,i.spotShadow[y]=j,i.spotShadowMap[y]=G,M++}y++}else if(D.isRectAreaLight){const U=e.get(D);U.color.copy(H).multiplyScalar(k),U.halfWidth.set(D.width*.5,0,0),U.halfHeight.set(0,D.height*.5,0),i.rectArea[_]=U,_++}else if(D.isPointLight){const U=e.get(D);if(U.color.copy(D.color).multiplyScalar(D.intensity),U.distance=D.distance,U.decay=D.decay,D.castShadow){const L=D.shadow,j=n.get(D);j.shadowIntensity=L.intensity,j.shadowBias=L.bias,j.shadowNormalBias=L.normalBias,j.shadowRadius=L.radius,j.shadowMapSize=L.mapSize,j.shadowCameraNear=L.camera.near,j.shadowCameraFar=L.camera.far,i.pointShadow[g]=j,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=D.shadow.matrix,v++}i.point[g]=U,g++}else if(D.isHemisphereLight){const U=e.get(D);U.skyColor.copy(D.color).multiplyScalar(k),U.groundColor.copy(D.groundColor).multiplyScalar(k),i.hemi[f]=U,f++}}_>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==h||x.pointLength!==g||x.spotLength!==y||x.rectAreaLength!==_||x.hemiLength!==f||x.numDirectionalShadows!==m||x.numPointShadows!==v||x.numSpotShadows!==M||x.numSpotMaps!==w||x.numLightProbes!==R)&&(i.directional.length=h,i.spot.length=y,i.rectArea.length=_,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=M+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,x.directionalLength=h,x.pointLength=g,x.spotLength=y,x.rectAreaLength=_,x.hemiLength=f,x.numDirectionalShadows=m,x.numPointShadows=v,x.numSpotShadows=M,x.numSpotMaps=w,x.numLightProbes=R,i.version=sC++)}function l(c,d){let p=0,u=0,h=0,g=0,y=0;const _=d.matrixWorldInverse;for(let f=0,m=c.length;f<m;f++){const v=c[f];if(v.isDirectionalLight){const M=i.directional[p];M.direction.setFromMatrixPosition(v.matrixWorld),a.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(_),p++}else if(v.isSpotLight){const M=i.spot[h];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(_),M.direction.setFromMatrixPosition(v.matrixWorld),a.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(_),h++}else if(v.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(_),r.identity(),s.copy(v.matrixWorld),s.premultiply(_),r.extractRotation(s),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),g++}else if(v.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(_),u++}else if(v.isHemisphereLight){const M=i.hemi[y];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(_),y++}}}return{setup:o,setupView:l,state:i}}function p_(t){const e=new oC(t),n=[],i=[];function a(d){c.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function r(d){i.push(d)}function o(){e.setup(n)}function l(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function lC(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new p_(t),e.set(a,[o])):s>=r.length?(o=new p_(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const cC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fC=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],dC=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],m_=new It,eo=new V,Of=new V;function hC(t,e,n){let i=new Wx;const a=new mt,s=new mt,r=new Lt,o=new wb,l=new Db,c={},d=n.maxTextureSize,p={[ka]:En,[En]:ka,[Hi]:Hi},u=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:cC,fragmentShader:uC}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const g=new ui;g.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new sa(g,u),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oc;let f=this.type;this.render=function(A,R,x){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||A.length===0)return;this.type===gE&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=oc);const T=t.getRenderTarget(),F=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),H=t.state;H.setBlending(Yi),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const k=f!==this.type;k&&R.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(G=>G.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,G=A.length;q<G;q++){const U=A[q],L=U.shadow;if(L===void 0){Ie("WebGLShadowMap:",U,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;a.copy(L.mapSize);const j=L.getFrameExtents();a.multiply(j),s.copy(L.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/j.x),a.x=s.x*j.x,L.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/j.y),a.y=s.y*j.y,L.mapSize.y=s.y));const K=t.state.buffers.depth.getReversed();if(L.camera._reversedDepth=K,L.map===null||k===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===oo){if(U.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new yi(a.x,a.y,{format:Rr,type:na,minFilter:un,magFilter:un,generateMipmaps:!1}),L.map.texture.name=U.name+".shadowMap",L.map.depthTexture=new Ho(a.x,a.y,vi),L.map.depthTexture.name=U.name+".shadowMapDepth",L.map.depthTexture.format=ia,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=sn,L.map.depthTexture.magFilter=sn}else U.isPointLight?(L.map=new $x(a.x),L.map.depthTexture=new Eb(a.x,Ei)):(L.map=new yi(a.x,a.y),L.map.depthTexture=new Ho(a.x,a.y,Ei)),L.map.depthTexture.name=U.name+".shadowMap",L.map.depthTexture.format=ia,this.type===oc?(L.map.depthTexture.compareFunction=K?Ip:Op,L.map.depthTexture.minFilter=un,L.map.depthTexture.magFilter=un):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=sn,L.map.depthTexture.magFilter=sn);L.camera.updateProjectionMatrix()}const ne=L.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<ne;me++){if(L.map.isWebGLCubeRenderTarget)t.setRenderTarget(L.map,me),t.clear();else{me===0&&(t.setRenderTarget(L.map),t.clear());const de=L.getViewport(me);r.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),H.viewport(r)}if(U.isPointLight){const de=L.camera,Le=L.matrix,Je=U.distance||de.far;Je!==de.far&&(de.far=Je,de.updateProjectionMatrix()),eo.setFromMatrixPosition(U.matrixWorld),de.position.copy(eo),Of.copy(de.position),Of.add(fC[me]),de.up.copy(dC[me]),de.lookAt(Of),de.updateMatrixWorld(),Le.makeTranslation(-eo.x,-eo.y,-eo.z),m_.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),L._frustum.setFromProjectionMatrix(m_,de.coordinateSystem,de.reversedDepth)}else L.updateMatrices(U);i=L.getFrustum(),M(R,x,L.camera,U,this.type)}L.isPointLightShadow!==!0&&this.type===oo&&m(L,x),L.needsUpdate=!1}f=this.type,_.needsUpdate=!1,t.setRenderTarget(T,F,D)};function m(A,R){const x=e.update(y);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new yi(a.x,a.y,{format:Rr,type:na})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(R,null,x,u,y,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(R,null,x,h,y,null)}function v(A,R,x,T){let F=null;const D=x.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)F=D;else if(F=x.isPointLight===!0?l:o,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const H=F.uuid,k=R.uuid;let q=c[H];q===void 0&&(q={},c[H]=q);let G=q[k];G===void 0&&(G=F.clone(),q[k]=G,R.addEventListener("dispose",w)),F=G}if(F.visible=R.visible,F.wireframe=R.wireframe,T===oo?F.side=R.shadowSide!==null?R.shadowSide:R.side:F.side=R.shadowSide!==null?R.shadowSide:p[R.side],F.alphaMap=R.alphaMap,F.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,F.map=R.map,F.clipShadows=R.clipShadows,F.clippingPlanes=R.clippingPlanes,F.clipIntersection=R.clipIntersection,F.displacementMap=R.displacementMap,F.displacementScale=R.displacementScale,F.displacementBias=R.displacementBias,F.wireframeLinewidth=R.wireframeLinewidth,F.linewidth=R.linewidth,x.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const H=t.properties.get(F);H.light=x}return F}function M(A,R,x,T,F){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&F===oo)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,A.matrixWorld);const k=e.update(A),q=A.material;if(Array.isArray(q)){const G=k.groups;for(let U=0,L=G.length;U<L;U++){const j=G[U],K=q[j.materialIndex];if(K&&K.visible){const ne=v(A,K,T,F);A.onBeforeShadow(t,A,R,x,k,ne,j),t.renderBufferDirect(x,null,k,ne,A,j),A.onAfterShadow(t,A,R,x,k,ne,j)}}}else if(q.visible){const G=v(A,q,T,F);A.onBeforeShadow(t,A,R,x,k,G,null),t.renderBufferDirect(x,null,k,G,A,null),A.onAfterShadow(t,A,R,x,k,G,null)}}const H=A.children;for(let k=0,q=H.length;k<q;k++)M(H[k],R,x,T,F)}function w(A){A.target.removeEventListener("dispose",w);for(const x in c){const T=c[x],F=A.target.uuid;F in T&&(T[F].dispose(),delete T[F])}}}function pC(t,e){function n(){let O=!1;const oe=new Lt;let ae=null;const _e=new Lt(0,0,0,0);return{setMask:function(te){ae!==te&&!O&&(t.colorMask(te,te,te,te),ae=te)},setLocked:function(te){O=te},setClear:function(te,W,Se,Oe,St){St===!0&&(te*=Oe,W*=Oe,Se*=Oe),oe.set(te,W,Se,Oe),_e.equals(oe)===!1&&(t.clearColor(te,W,Se,Oe),_e.copy(oe))},reset:function(){O=!1,ae=null,_e.set(-1,0,0,0)}}}function i(){let O=!1,oe=!1,ae=null,_e=null,te=null;return{setReversed:function(W){if(oe!==W){const Se=e.get("EXT_clip_control");W?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),oe=W;const Oe=te;te=null,this.setClear(Oe)}},getReversed:function(){return oe},setTest:function(W){W?se(t.DEPTH_TEST):le(t.DEPTH_TEST)},setMask:function(W){ae!==W&&!O&&(t.depthMask(W),ae=W)},setFunc:function(W){if(oe&&(W=KE[W]),_e!==W){switch(W){case Od:t.depthFunc(t.NEVER);break;case Id:t.depthFunc(t.ALWAYS);break;case Pd:t.depthFunc(t.LESS);break;case Tr:t.depthFunc(t.LEQUAL);break;case Fd:t.depthFunc(t.EQUAL);break;case Bd:t.depthFunc(t.GEQUAL);break;case zd:t.depthFunc(t.GREATER);break;case Hd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}_e=W}},setLocked:function(W){O=W},setClear:function(W){te!==W&&(te=W,oe&&(W=1-W),t.clearDepth(W))},reset:function(){O=!1,ae=null,_e=null,te=null,oe=!1}}}function a(){let O=!1,oe=null,ae=null,_e=null,te=null,W=null,Se=null,Oe=null,St=null;return{setTest:function(rt){O||(rt?se(t.STENCIL_TEST):le(t.STENCIL_TEST))},setMask:function(rt){oe!==rt&&!O&&(t.stencilMask(rt),oe=rt)},setFunc:function(rt,Ai,Ri){(ae!==rt||_e!==Ai||te!==Ri)&&(t.stencilFunc(rt,Ai,Ri),ae=rt,_e=Ai,te=Ri)},setOp:function(rt,Ai,Ri){(W!==rt||Se!==Ai||Oe!==Ri)&&(t.stencilOp(rt,Ai,Ri),W=rt,Se=Ai,Oe=Ri)},setLocked:function(rt){O=rt},setClear:function(rt){St!==rt&&(t.clearStencil(rt),St=rt)},reset:function(){O=!1,oe=null,ae=null,_e=null,te=null,W=null,Se=null,Oe=null,St=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},p={},u=new WeakMap,h=[],g=null,y=!1,_=null,f=null,m=null,v=null,M=null,w=null,A=null,R=new ut(0,0,0),x=0,T=!1,F=null,D=null,H=null,k=null,q=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,L=0;const j=t.getParameter(t.VERSION);j.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(j)[1]),U=L>=1):j.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),U=L>=2);let K=null,ne={};const me=t.getParameter(t.SCISSOR_BOX),de=t.getParameter(t.VIEWPORT),Le=new Lt().fromArray(me),Je=new Lt().fromArray(de);function it(O,oe,ae,_e){const te=new Uint8Array(4),W=t.createTexture();t.bindTexture(O,W),t.texParameteri(O,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(O,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Se=0;Se<ae;Se++)O===t.TEXTURE_3D||O===t.TEXTURE_2D_ARRAY?t.texImage3D(oe,0,t.RGBA,1,1,_e,0,t.RGBA,t.UNSIGNED_BYTE,te):t.texImage2D(oe+Se,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,te);return W}const Q={};Q[t.TEXTURE_2D]=it(t.TEXTURE_2D,t.TEXTURE_2D,1),Q[t.TEXTURE_CUBE_MAP]=it(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[t.TEXTURE_2D_ARRAY]=it(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Q[t.TEXTURE_3D]=it(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),se(t.DEPTH_TEST),r.setFunc(Tr),Ve(!1),Dt(Sg),se(t.CULL_FACE),st(Yi);function se(O){d[O]!==!0&&(t.enable(O),d[O]=!0)}function le(O){d[O]!==!1&&(t.disable(O),d[O]=!1)}function ze(O,oe){return p[O]!==oe?(t.bindFramebuffer(O,oe),p[O]=oe,O===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=oe),O===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=oe),!0):!1}function we(O,oe){let ae=h,_e=!1;if(O){ae=u.get(oe),ae===void 0&&(ae=[],u.set(oe,ae));const te=O.textures;if(ae.length!==te.length||ae[0]!==t.COLOR_ATTACHMENT0){for(let W=0,Se=te.length;W<Se;W++)ae[W]=t.COLOR_ATTACHMENT0+W;ae.length=te.length,_e=!0}}else ae[0]!==t.BACK&&(ae[0]=t.BACK,_e=!0);_e&&t.drawBuffers(ae)}function Ue(O){return g!==O?(t.useProgram(O),g=O,!0):!1}const qt={[rs]:t.FUNC_ADD,[vE]:t.FUNC_SUBTRACT,[xE]:t.FUNC_REVERSE_SUBTRACT};qt[SE]=t.MIN,qt[ME]=t.MAX;const Ke={[yE]:t.ZERO,[EE]:t.ONE,[bE]:t.SRC_COLOR,[Ud]:t.SRC_ALPHA,[DE]:t.SRC_ALPHA_SATURATE,[CE]:t.DST_COLOR,[AE]:t.DST_ALPHA,[TE]:t.ONE_MINUS_SRC_COLOR,[Ld]:t.ONE_MINUS_SRC_ALPHA,[wE]:t.ONE_MINUS_DST_COLOR,[RE]:t.ONE_MINUS_DST_ALPHA,[NE]:t.CONSTANT_COLOR,[UE]:t.ONE_MINUS_CONSTANT_COLOR,[LE]:t.CONSTANT_ALPHA,[OE]:t.ONE_MINUS_CONSTANT_ALPHA};function st(O,oe,ae,_e,te,W,Se,Oe,St,rt){if(O===Yi){y===!0&&(le(t.BLEND),y=!1);return}if(y===!1&&(se(t.BLEND),y=!0),O!==_E){if(O!==_||rt!==T){if((f!==rs||M!==rs)&&(t.blendEquation(t.FUNC_ADD),f=rs,M=rs),rt)switch(O){case dr:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Nd:t.blendFunc(t.ONE,t.ONE);break;case Mg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case yg:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:et("WebGLState: Invalid blending: ",O);break}else switch(O){case dr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Nd:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Mg:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yg:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",O);break}m=null,v=null,w=null,A=null,R.set(0,0,0),x=0,_=O,T=rt}return}te=te||oe,W=W||ae,Se=Se||_e,(oe!==f||te!==M)&&(t.blendEquationSeparate(qt[oe],qt[te]),f=oe,M=te),(ae!==m||_e!==v||W!==w||Se!==A)&&(t.blendFuncSeparate(Ke[ae],Ke[_e],Ke[W],Ke[Se]),m=ae,v=_e,w=W,A=Se),(Oe.equals(R)===!1||St!==x)&&(t.blendColor(Oe.r,Oe.g,Oe.b,St),R.copy(Oe),x=St),_=O,T=!1}function gt(O,oe){O.side===Hi?le(t.CULL_FACE):se(t.CULL_FACE);let ae=O.side===En;oe&&(ae=!ae),Ve(ae),O.blending===dr&&O.transparent===!1?st(Yi):st(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),s.setMask(O.colorWrite);const _e=O.stencilWrite;o.setTest(_e),_e&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Pt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?se(t.SAMPLE_ALPHA_TO_COVERAGE):le(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(O){F!==O&&(O?t.frontFace(t.CW):t.frontFace(t.CCW),F=O)}function Dt(O){O!==pE?(se(t.CULL_FACE),O!==D&&(O===Sg?t.cullFace(t.BACK):O===mE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):le(t.CULL_FACE),D=O}function N(O){O!==H&&(U&&t.lineWidth(O),H=O)}function Pt(O,oe,ae){O?(se(t.POLYGON_OFFSET_FILL),(k!==oe||q!==ae)&&(k=oe,q=ae,r.getReversed()&&(oe=-oe),t.polygonOffset(oe,ae))):le(t.POLYGON_OFFSET_FILL)}function at(O){O?se(t.SCISSOR_TEST):le(t.SCISSOR_TEST)}function xt(O){O===void 0&&(O=t.TEXTURE0+G-1),K!==O&&(t.activeTexture(O),K=O)}function Ee(O,oe,ae){ae===void 0&&(K===null?ae=t.TEXTURE0+G-1:ae=K);let _e=ne[ae];_e===void 0&&(_e={type:void 0,texture:void 0},ne[ae]=_e),(_e.type!==O||_e.texture!==oe)&&(K!==ae&&(t.activeTexture(ae),K=ae),t.bindTexture(O,oe||Q[O]),_e.type=O,_e.texture=oe)}function C(){const O=ne[K];O!==void 0&&O.type!==void 0&&(t.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function S(){try{t.compressedTexImage2D(...arguments)}catch(O){et("WebGLState:",O)}}function I(){try{t.compressedTexImage3D(...arguments)}catch(O){et("WebGLState:",O)}}function Z(){try{t.texSubImage2D(...arguments)}catch(O){et("WebGLState:",O)}}function $(){try{t.texSubImage3D(...arguments)}catch(O){et("WebGLState:",O)}}function Y(){try{t.compressedTexSubImage2D(...arguments)}catch(O){et("WebGLState:",O)}}function ve(){try{t.compressedTexSubImage3D(...arguments)}catch(O){et("WebGLState:",O)}}function re(){try{t.texStorage2D(...arguments)}catch(O){et("WebGLState:",O)}}function Ce(){try{t.texStorage3D(...arguments)}catch(O){et("WebGLState:",O)}}function De(){try{t.texImage2D(...arguments)}catch(O){et("WebGLState:",O)}}function ee(){try{t.texImage3D(...arguments)}catch(O){et("WebGLState:",O)}}function ie(O){Le.equals(O)===!1&&(t.scissor(O.x,O.y,O.z,O.w),Le.copy(O))}function xe(O){Je.equals(O)===!1&&(t.viewport(O.x,O.y,O.z,O.w),Je.copy(O))}function Me(O,oe){let ae=c.get(oe);ae===void 0&&(ae=new WeakMap,c.set(oe,ae));let _e=ae.get(O);_e===void 0&&(_e=t.getUniformBlockIndex(oe,O.name),ae.set(O,_e))}function pe(O,oe){const _e=c.get(oe).get(O);l.get(oe)!==_e&&(t.uniformBlockBinding(oe,_e,O.__bindingPointIndex),l.set(oe,_e))}function ke(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},K=null,ne={},p={},u=new WeakMap,h=[],g=null,y=!1,_=null,f=null,m=null,v=null,M=null,w=null,A=null,R=new ut(0,0,0),x=0,T=!1,F=null,D=null,H=null,k=null,q=null,Le.set(0,0,t.canvas.width,t.canvas.height),Je.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:se,disable:le,bindFramebuffer:ze,drawBuffers:we,useProgram:Ue,setBlending:st,setMaterial:gt,setFlipSided:Ve,setCullFace:Dt,setLineWidth:N,setPolygonOffset:Pt,setScissorTest:at,activeTexture:xt,bindTexture:Ee,unbindTexture:C,compressedTexImage2D:S,compressedTexImage3D:I,texImage2D:De,texImage3D:ee,updateUBOMapping:Me,uniformBlockBinding:pe,texStorage2D:re,texStorage3D:Ce,texSubImage2D:Z,texSubImage3D:$,compressedTexSubImage2D:Y,compressedTexSubImage3D:ve,scissor:ie,viewport:xe,reset:ke}}function mC(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,d=new WeakMap;let p;const u=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return h?new OffscreenCanvas(C,S):Xc("canvas")}function y(C,S,I){let Z=1;const $=Ee(C);if(($.width>I||$.height>I)&&(Z=I/Math.max($.width,$.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(Z*$.width),ve=Math.floor(Z*$.height);p===void 0&&(p=g(Y,ve));const re=S?g(Y,ve):p;return re.width=Y,re.height=ve,re.getContext("2d").drawImage(C,0,0,Y,ve),Ie("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+ve+")."),re}else return"data"in C&&Ie("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function _(C){return C.generateMipmaps}function f(C){t.generateMipmap(C)}function m(C){return C.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?t.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function v(C,S,I,Z,$=!1){if(C!==null){if(t[C]!==void 0)return t[C];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=S;if(S===t.RED&&(I===t.FLOAT&&(Y=t.R32F),I===t.HALF_FLOAT&&(Y=t.R16F),I===t.UNSIGNED_BYTE&&(Y=t.R8)),S===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(Y=t.R8UI),I===t.UNSIGNED_SHORT&&(Y=t.R16UI),I===t.UNSIGNED_INT&&(Y=t.R32UI),I===t.BYTE&&(Y=t.R8I),I===t.SHORT&&(Y=t.R16I),I===t.INT&&(Y=t.R32I)),S===t.RG&&(I===t.FLOAT&&(Y=t.RG32F),I===t.HALF_FLOAT&&(Y=t.RG16F),I===t.UNSIGNED_BYTE&&(Y=t.RG8)),S===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(Y=t.RG8UI),I===t.UNSIGNED_SHORT&&(Y=t.RG16UI),I===t.UNSIGNED_INT&&(Y=t.RG32UI),I===t.BYTE&&(Y=t.RG8I),I===t.SHORT&&(Y=t.RG16I),I===t.INT&&(Y=t.RG32I)),S===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(Y=t.RGB8UI),I===t.UNSIGNED_SHORT&&(Y=t.RGB16UI),I===t.UNSIGNED_INT&&(Y=t.RGB32UI),I===t.BYTE&&(Y=t.RGB8I),I===t.SHORT&&(Y=t.RGB16I),I===t.INT&&(Y=t.RGB32I)),S===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(Y=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(Y=t.RGBA16UI),I===t.UNSIGNED_INT&&(Y=t.RGBA32UI),I===t.BYTE&&(Y=t.RGBA8I),I===t.SHORT&&(Y=t.RGBA16I),I===t.INT&&(Y=t.RGBA32I)),S===t.RGB&&(I===t.UNSIGNED_INT_5_9_9_9_REV&&(Y=t.RGB9_E5),I===t.UNSIGNED_INT_10F_11F_11F_REV&&(Y=t.R11F_G11F_B10F)),S===t.RGBA){const ve=$?Vc:Qe.getTransfer(Z);I===t.FLOAT&&(Y=t.RGBA32F),I===t.HALF_FLOAT&&(Y=t.RGBA16F),I===t.UNSIGNED_BYTE&&(Y=ve===ot?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(Y=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(Y=t.RGB5_A1)}return(Y===t.R16F||Y===t.R32F||Y===t.RG16F||Y===t.RG32F||Y===t.RGBA16F||Y===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function M(C,S){let I;return C?S===null||S===Ei||S===zo?I=t.DEPTH24_STENCIL8:S===vi?I=t.DEPTH32F_STENCIL8:S===Bo&&(I=t.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ei||S===zo?I=t.DEPTH_COMPONENT24:S===vi?I=t.DEPTH_COMPONENT32F:S===Bo&&(I=t.DEPTH_COMPONENT16),I}function w(C,S){return _(C)===!0||C.isFramebufferTexture&&C.minFilter!==sn&&C.minFilter!==un?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function A(C){const S=C.target;S.removeEventListener("dispose",A),x(S),S.isVideoTexture&&d.delete(S)}function R(C){const S=C.target;S.removeEventListener("dispose",R),F(S)}function x(C){const S=i.get(C);if(S.__webglInit===void 0)return;const I=C.source,Z=u.get(I);if(Z){const $=Z[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(C),Object.keys(Z).length===0&&u.delete(I)}i.remove(C)}function T(C){const S=i.get(C);t.deleteTexture(S.__webglTexture);const I=C.source,Z=u.get(I);delete Z[S.__cacheKey],r.memory.textures--}function F(C){const S=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let $=0;$<S.__webglFramebuffer[Z].length;$++)t.deleteFramebuffer(S.__webglFramebuffer[Z][$]);else t.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)t.deleteFramebuffer(S.__webglFramebuffer[Z]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const I=C.textures;for(let Z=0,$=I.length;Z<$;Z++){const Y=i.get(I[Z]);Y.__webglTexture&&(t.deleteTexture(Y.__webglTexture),r.memory.textures--),i.remove(I[Z])}i.remove(C)}let D=0;function H(){D=0}function k(){const C=D;return C>=a.maxTextures&&Ie("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+a.maxTextures),D+=1,C}function q(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function G(C,S){const I=i.get(C);if(C.isVideoTexture&&at(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&I.__version!==C.version){const Z=C.image;if(Z===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(I,C,S);return}}else C.isExternalTexture&&(I.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+S)}function U(C,S){const I=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&I.__version!==C.version){Q(I,C,S);return}else C.isExternalTexture&&(I.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+S)}function L(C,S){const I=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&I.__version!==C.version){Q(I,C,S);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+S)}function j(C,S){const I=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&I.__version!==C.version){se(I,C,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+S)}const K={[Gd]:t.REPEAT,[Xi]:t.CLAMP_TO_EDGE,[Vd]:t.MIRRORED_REPEAT},ne={[sn]:t.NEAREST,[FE]:t.NEAREST_MIPMAP_NEAREST,[Ml]:t.NEAREST_MIPMAP_LINEAR,[un]:t.LINEAR,[af]:t.LINEAR_MIPMAP_NEAREST,[ls]:t.LINEAR_MIPMAP_LINEAR},me={[GE]:t.NEVER,[WE]:t.ALWAYS,[VE]:t.LESS,[Op]:t.LEQUAL,[kE]:t.EQUAL,[Ip]:t.GEQUAL,[XE]:t.GREATER,[jE]:t.NOTEQUAL};function de(C,S){if(S.type===vi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===un||S.magFilter===af||S.magFilter===Ml||S.magFilter===ls||S.minFilter===un||S.minFilter===af||S.minFilter===Ml||S.minFilter===ls)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(C,t.TEXTURE_WRAP_S,K[S.wrapS]),t.texParameteri(C,t.TEXTURE_WRAP_T,K[S.wrapT]),(C===t.TEXTURE_3D||C===t.TEXTURE_2D_ARRAY)&&t.texParameteri(C,t.TEXTURE_WRAP_R,K[S.wrapR]),t.texParameteri(C,t.TEXTURE_MAG_FILTER,ne[S.magFilter]),t.texParameteri(C,t.TEXTURE_MIN_FILTER,ne[S.minFilter]),S.compareFunction&&(t.texParameteri(C,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(C,t.TEXTURE_COMPARE_FUNC,me[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===sn||S.minFilter!==Ml&&S.minFilter!==ls||S.type===vi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(C,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,a.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Le(C,S){let I=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",A));const Z=S.source;let $=u.get(Z);$===void 0&&($={},u.set(Z,$));const Y=q(S);if(Y!==C.__cacheKey){$[Y]===void 0&&($[Y]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,I=!0),$[Y].usedTimes++;const ve=$[C.__cacheKey];ve!==void 0&&($[C.__cacheKey].usedTimes--,ve.usedTimes===0&&T(S)),C.__cacheKey=Y,C.__webglTexture=$[Y].texture}return I}function Je(C,S,I){return Math.floor(Math.floor(C/I)/S)}function it(C,S,I,Z){const Y=C.updateRanges;if(Y.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,I,Z,S.data);else{Y.sort((ee,ie)=>ee.start-ie.start);let ve=0;for(let ee=1;ee<Y.length;ee++){const ie=Y[ve],xe=Y[ee],Me=ie.start+ie.count,pe=Je(xe.start,S.width,4),ke=Je(ie.start,S.width,4);xe.start<=Me+1&&pe===ke&&Je(xe.start+xe.count-1,S.width,4)===pe?ie.count=Math.max(ie.count,xe.start+xe.count-ie.start):(++ve,Y[ve]=xe)}Y.length=ve+1;const re=t.getParameter(t.UNPACK_ROW_LENGTH),Ce=t.getParameter(t.UNPACK_SKIP_PIXELS),De=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let ee=0,ie=Y.length;ee<ie;ee++){const xe=Y[ee],Me=Math.floor(xe.start/4),pe=Math.ceil(xe.count/4),ke=Me%S.width,O=Math.floor(Me/S.width),oe=pe,ae=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(t.UNPACK_SKIP_ROWS,O),n.texSubImage2D(t.TEXTURE_2D,0,ke,O,oe,ae,I,Z,S.data)}C.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,re),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),t.pixelStorei(t.UNPACK_SKIP_ROWS,De)}}function Q(C,S,I){let Z=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=t.TEXTURE_3D);const $=Le(C,S),Y=S.source;n.bindTexture(Z,C.__webglTexture,t.TEXTURE0+I);const ve=i.get(Y);if(Y.version!==ve.__version||$===!0){n.activeTexture(t.TEXTURE0+I);const re=Qe.getPrimaries(Qe.workingColorSpace),Ce=S.colorSpace===Ea?null:Qe.getPrimaries(S.colorSpace),De=S.colorSpace===Ea||re===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let ee=y(S.image,!1,a.maxTextureSize);ee=xt(S,ee);const ie=s.convert(S.format,S.colorSpace),xe=s.convert(S.type);let Me=v(S.internalFormat,ie,xe,S.colorSpace,S.isVideoTexture);de(Z,S);let pe;const ke=S.mipmaps,O=S.isVideoTexture!==!0,oe=ve.__version===void 0||$===!0,ae=Y.dataReady,_e=w(S,ee);if(S.isDepthTexture)Me=M(S.format===cs,S.type),oe&&(O?n.texStorage2D(t.TEXTURE_2D,1,Me,ee.width,ee.height):n.texImage2D(t.TEXTURE_2D,0,Me,ee.width,ee.height,0,ie,xe,null));else if(S.isDataTexture)if(ke.length>0){O&&oe&&n.texStorage2D(t.TEXTURE_2D,_e,Me,ke[0].width,ke[0].height);for(let te=0,W=ke.length;te<W;te++)pe=ke[te],O?ae&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,pe.width,pe.height,ie,xe,pe.data):n.texImage2D(t.TEXTURE_2D,te,Me,pe.width,pe.height,0,ie,xe,pe.data);S.generateMipmaps=!1}else O?(oe&&n.texStorage2D(t.TEXTURE_2D,_e,Me,ee.width,ee.height),ae&&it(S,ee,ie,xe)):n.texImage2D(t.TEXTURE_2D,0,Me,ee.width,ee.height,0,ie,xe,ee.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){O&&oe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,_e,Me,ke[0].width,ke[0].height,ee.depth);for(let te=0,W=ke.length;te<W;te++)if(pe=ke[te],S.format!==oi)if(ie!==null)if(O){if(ae)if(S.layerUpdates.size>0){const Se=Wg(pe.width,pe.height,S.format,S.type);for(const Oe of S.layerUpdates){const St=pe.data.subarray(Oe*Se/pe.data.BYTES_PER_ELEMENT,(Oe+1)*Se/pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,Oe,pe.width,pe.height,1,ie,St)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,pe.width,pe.height,ee.depth,ie,pe.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,te,Me,pe.width,pe.height,ee.depth,0,pe.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ae&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,pe.width,pe.height,ee.depth,ie,xe,pe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,te,Me,pe.width,pe.height,ee.depth,0,ie,xe,pe.data)}else{O&&oe&&n.texStorage2D(t.TEXTURE_2D,_e,Me,ke[0].width,ke[0].height);for(let te=0,W=ke.length;te<W;te++)pe=ke[te],S.format!==oi?ie!==null?O?ae&&n.compressedTexSubImage2D(t.TEXTURE_2D,te,0,0,pe.width,pe.height,ie,pe.data):n.compressedTexImage2D(t.TEXTURE_2D,te,Me,pe.width,pe.height,0,pe.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ae&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,pe.width,pe.height,ie,xe,pe.data):n.texImage2D(t.TEXTURE_2D,te,Me,pe.width,pe.height,0,ie,xe,pe.data)}else if(S.isDataArrayTexture)if(O){if(oe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,_e,Me,ee.width,ee.height,ee.depth),ae)if(S.layerUpdates.size>0){const te=Wg(ee.width,ee.height,S.format,S.type);for(const W of S.layerUpdates){const Se=ee.data.subarray(W*te/ee.data.BYTES_PER_ELEMENT,(W+1)*te/ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,W,ee.width,ee.height,1,ie,xe,Se)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ie,xe,ee.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Me,ee.width,ee.height,ee.depth,0,ie,xe,ee.data);else if(S.isData3DTexture)O?(oe&&n.texStorage3D(t.TEXTURE_3D,_e,Me,ee.width,ee.height,ee.depth),ae&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ie,xe,ee.data)):n.texImage3D(t.TEXTURE_3D,0,Me,ee.width,ee.height,ee.depth,0,ie,xe,ee.data);else if(S.isFramebufferTexture){if(oe)if(O)n.texStorage2D(t.TEXTURE_2D,_e,Me,ee.width,ee.height);else{let te=ee.width,W=ee.height;for(let Se=0;Se<_e;Se++)n.texImage2D(t.TEXTURE_2D,Se,Me,te,W,0,ie,xe,null),te>>=1,W>>=1}}else if(ke.length>0){if(O&&oe){const te=Ee(ke[0]);n.texStorage2D(t.TEXTURE_2D,_e,Me,te.width,te.height)}for(let te=0,W=ke.length;te<W;te++)pe=ke[te],O?ae&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,ie,xe,pe):n.texImage2D(t.TEXTURE_2D,te,Me,ie,xe,pe);S.generateMipmaps=!1}else if(O){if(oe){const te=Ee(ee);n.texStorage2D(t.TEXTURE_2D,_e,Me,te.width,te.height)}ae&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ie,xe,ee)}else n.texImage2D(t.TEXTURE_2D,0,Me,ie,xe,ee);_(S)&&f(Z),ve.__version=Y.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function se(C,S,I){if(S.image.length!==6)return;const Z=Le(C,S),$=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture,t.TEXTURE0+I);const Y=i.get($);if($.version!==Y.__version||Z===!0){n.activeTexture(t.TEXTURE0+I);const ve=Qe.getPrimaries(Qe.workingColorSpace),re=S.colorSpace===Ea?null:Qe.getPrimaries(S.colorSpace),Ce=S.colorSpace===Ea||ve===re?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const De=S.isCompressedTexture||S.image[0].isCompressedTexture,ee=S.image[0]&&S.image[0].isDataTexture,ie=[];for(let W=0;W<6;W++)!De&&!ee?ie[W]=y(S.image[W],!0,a.maxCubemapSize):ie[W]=ee?S.image[W].image:S.image[W],ie[W]=xt(S,ie[W]);const xe=ie[0],Me=s.convert(S.format,S.colorSpace),pe=s.convert(S.type),ke=v(S.internalFormat,Me,pe,S.colorSpace),O=S.isVideoTexture!==!0,oe=Y.__version===void 0||Z===!0,ae=$.dataReady;let _e=w(S,xe);de(t.TEXTURE_CUBE_MAP,S);let te;if(De){O&&oe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,_e,ke,xe.width,xe.height);for(let W=0;W<6;W++){te=ie[W].mipmaps;for(let Se=0;Se<te.length;Se++){const Oe=te[Se];S.format!==oi?Me!==null?O?ae&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,0,0,Oe.width,Oe.height,Me,Oe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,ke,Oe.width,Oe.height,0,Oe.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ae&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,0,0,Oe.width,Oe.height,Me,pe,Oe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,ke,Oe.width,Oe.height,0,Me,pe,Oe.data)}}}else{if(te=S.mipmaps,O&&oe){te.length>0&&_e++;const W=Ee(ie[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,_e,ke,W.width,W.height)}for(let W=0;W<6;W++)if(ee){O?ae&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,ie[W].width,ie[W].height,Me,pe,ie[W].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,ke,ie[W].width,ie[W].height,0,Me,pe,ie[W].data);for(let Se=0;Se<te.length;Se++){const St=te[Se].image[W].image;O?ae&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,0,0,St.width,St.height,Me,pe,St.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,ke,St.width,St.height,0,Me,pe,St.data)}}else{O?ae&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Me,pe,ie[W]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,ke,Me,pe,ie[W]);for(let Se=0;Se<te.length;Se++){const Oe=te[Se];O?ae&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,0,0,Me,pe,Oe.image[W]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,ke,Me,pe,Oe.image[W])}}}_(S)&&f(t.TEXTURE_CUBE_MAP),Y.__version=$.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function le(C,S,I,Z,$,Y){const ve=s.convert(I.format,I.colorSpace),re=s.convert(I.type),Ce=v(I.internalFormat,ve,re,I.colorSpace),De=i.get(S),ee=i.get(I);if(ee.__renderTarget=S,!De.__hasExternalTextures){const ie=Math.max(1,S.width>>Y),xe=Math.max(1,S.height>>Y);$===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?n.texImage3D($,Y,Ce,ie,xe,S.depth,0,ve,re,null):n.texImage2D($,Y,Ce,ie,xe,0,ve,re,null)}n.bindFramebuffer(t.FRAMEBUFFER,C),Pt(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,$,ee.__webglTexture,0,N(S)):($===t.TEXTURE_2D||$>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Z,$,ee.__webglTexture,Y),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ze(C,S,I){if(t.bindRenderbuffer(t.RENDERBUFFER,C),S.depthBuffer){const Z=S.depthTexture,$=Z&&Z.isDepthTexture?Z.type:null,Y=M(S.stencilBuffer,$),ve=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Pt(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,N(S),Y,S.width,S.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,N(S),Y,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Y,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ve,t.RENDERBUFFER,C)}else{const Z=S.textures;for(let $=0;$<Z.length;$++){const Y=Z[$],ve=s.convert(Y.format,Y.colorSpace),re=s.convert(Y.type),Ce=v(Y.internalFormat,ve,re,Y.colorSpace);Pt(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,N(S),Ce,S.width,S.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,N(S),Ce,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Ce,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function we(C,S,I){const Z=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(S.depthTexture);if($.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Z){if($.__webglInit===void 0&&($.__webglInit=!0,S.depthTexture.addEventListener("dispose",A)),$.__webglTexture===void 0){$.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),de(t.TEXTURE_CUBE_MAP,S.depthTexture);const De=s.convert(S.depthTexture.format),ee=s.convert(S.depthTexture.type);let ie;S.depthTexture.format===ia?ie=t.DEPTH_COMPONENT24:S.depthTexture.format===cs&&(ie=t.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,ie,S.width,S.height,0,De,ee,null)}}else G(S.depthTexture,0);const Y=$.__webglTexture,ve=N(S),re=Z?t.TEXTURE_CUBE_MAP_POSITIVE_X+I:t.TEXTURE_2D,Ce=S.depthTexture.format===cs?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===ia)Pt(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Ce,re,Y,0,ve):t.framebufferTexture2D(t.FRAMEBUFFER,Ce,re,Y,0);else if(S.depthTexture.format===cs)Pt(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Ce,re,Y,0,ve):t.framebufferTexture2D(t.FRAMEBUFFER,Ce,re,Y,0);else throw new Error("Unknown depthTexture format")}function Ue(C){const S=i.get(C),I=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const Z=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const $=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",$)};Z.addEventListener("dispose",$),S.__depthDisposeCallback=$}S.__boundDepthTexture=Z}if(C.depthTexture&&!S.__autoAllocateDepthBuffer)if(I)for(let Z=0;Z<6;Z++)we(S.__webglFramebuffer[Z],C,Z);else{const Z=C.texture.mipmaps;Z&&Z.length>0?we(S.__webglFramebuffer[0],C,0):we(S.__webglFramebuffer,C,0)}else if(I){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=t.createRenderbuffer(),ze(S.__webglDepthbuffer[Z],C,!1);else{const $=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[Z];t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,Y)}}else{const Z=C.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),ze(S.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,Y)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function qt(C,S,I){const Z=i.get(C);S!==void 0&&le(Z.__webglFramebuffer,C,C.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&Ue(C)}function Ke(C){const S=C.texture,I=i.get(C),Z=i.get(S);C.addEventListener("dispose",R);const $=C.textures,Y=C.isWebGLCubeRenderTarget===!0,ve=$.length>1;if(ve||(Z.__webglTexture===void 0&&(Z.__webglTexture=t.createTexture()),Z.__version=S.version,r.memory.textures++),Y){I.__webglFramebuffer=[];for(let re=0;re<6;re++)if(S.mipmaps&&S.mipmaps.length>0){I.__webglFramebuffer[re]=[];for(let Ce=0;Ce<S.mipmaps.length;Ce++)I.__webglFramebuffer[re][Ce]=t.createFramebuffer()}else I.__webglFramebuffer[re]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){I.__webglFramebuffer=[];for(let re=0;re<S.mipmaps.length;re++)I.__webglFramebuffer[re]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(ve)for(let re=0,Ce=$.length;re<Ce;re++){const De=i.get($[re]);De.__webglTexture===void 0&&(De.__webglTexture=t.createTexture(),r.memory.textures++)}if(C.samples>0&&Pt(C)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let re=0;re<$.length;re++){const Ce=$[re];I.__webglColorRenderbuffer[re]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[re]);const De=s.convert(Ce.format,Ce.colorSpace),ee=s.convert(Ce.type),ie=v(Ce.internalFormat,De,ee,Ce.colorSpace,C.isXRRenderTarget===!0),xe=N(C);t.renderbufferStorageMultisample(t.RENDERBUFFER,xe,ie,C.width,C.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,I.__webglColorRenderbuffer[re])}t.bindRenderbuffer(t.RENDERBUFFER,null),C.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),ze(I.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Y){n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),de(t.TEXTURE_CUBE_MAP,S);for(let re=0;re<6;re++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)le(I.__webglFramebuffer[re][Ce],C,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce);else le(I.__webglFramebuffer[re],C,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);_(S)&&f(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ve){for(let re=0,Ce=$.length;re<Ce;re++){const De=$[re],ee=i.get(De);let ie=t.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,ee.__webglTexture),de(ie,De),le(I.__webglFramebuffer,C,De,t.COLOR_ATTACHMENT0+re,ie,0),_(De)&&f(ie)}n.unbindTexture()}else{let re=t.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(re=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(re,Z.__webglTexture),de(re,S),S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)le(I.__webglFramebuffer[Ce],C,S,t.COLOR_ATTACHMENT0,re,Ce);else le(I.__webglFramebuffer,C,S,t.COLOR_ATTACHMENT0,re,0);_(S)&&f(re),n.unbindTexture()}C.depthBuffer&&Ue(C)}function st(C){const S=C.textures;for(let I=0,Z=S.length;I<Z;I++){const $=S[I];if(_($)){const Y=m(C),ve=i.get($).__webglTexture;n.bindTexture(Y,ve),f(Y),n.unbindTexture()}}}const gt=[],Ve=[];function Dt(C){if(C.samples>0){if(Pt(C)===!1){const S=C.textures,I=C.width,Z=C.height;let $=t.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ve=i.get(C),re=S.length>1;if(re)for(let De=0;De<S.length;De++)n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const Ce=C.texture.mipmaps;Ce&&Ce.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let De=0;De<S.length;De++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=t.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=t.STENCIL_BUFFER_BIT)),re){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ve.__webglColorRenderbuffer[De]);const ee=i.get(S[De]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ee,0)}t.blitFramebuffer(0,0,I,Z,0,0,I,Z,$,t.NEAREST),l===!0&&(gt.length=0,Ve.length=0,gt.push(t.COLOR_ATTACHMENT0+De),C.depthBuffer&&C.resolveDepthBuffer===!1&&(gt.push(Y),Ve.push(Y),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ve)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,gt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),re)for(let De=0;De<S.length;De++){n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,ve.__webglColorRenderbuffer[De]);const ee=i.get(S[De]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,ee,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function N(C){return Math.min(a.maxSamples,C.samples)}function Pt(C){const S=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function at(C){const S=r.render.frame;d.get(C)!==S&&(d.set(C,S),C.update())}function xt(C,S){const I=C.colorSpace,Z=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||I!==Cr&&I!==Ea&&(Qe.getTransfer(I)===ot?(Z!==oi||$!==Kn)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",I)),S}function Ee(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=H,this.setTexture2D=G,this.setTexture2DArray=U,this.setTexture3D=L,this.setTextureCube=j,this.rebindTextures=qt,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function gC(t,e){function n(i,a=Ea){let s;const r=Qe.getTransfer(a);if(i===Kn)return t.UNSIGNED_BYTE;if(i===wp)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Dp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Lx)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Ox)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Nx)return t.BYTE;if(i===Ux)return t.SHORT;if(i===Bo)return t.UNSIGNED_SHORT;if(i===Cp)return t.INT;if(i===Ei)return t.UNSIGNED_INT;if(i===vi)return t.FLOAT;if(i===na)return t.HALF_FLOAT;if(i===Ix)return t.ALPHA;if(i===Px)return t.RGB;if(i===oi)return t.RGBA;if(i===ia)return t.DEPTH_COMPONENT;if(i===cs)return t.DEPTH_STENCIL;if(i===Fx)return t.RED;if(i===Np)return t.RED_INTEGER;if(i===Rr)return t.RG;if(i===Up)return t.RG_INTEGER;if(i===Lp)return t.RGBA_INTEGER;if(i===lc||i===cc||i===uc||i===fc)if(r===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===lc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===uc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===lc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===uc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===kd||i===Xd||i===jd||i===Wd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===kd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qd||i===Yd||i===Zd||i===Kd||i===Qd||i===Jd||i===$d)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qd||i===Yd)return r===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zd)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Kd)return s.COMPRESSED_R11_EAC;if(i===Qd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Jd)return s.COMPRESSED_RG11_EAC;if(i===$d)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===eh||i===th||i===nh||i===ih||i===ah||i===sh||i===rh||i===oh||i===lh||i===ch||i===uh||i===fh||i===dh||i===hh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===eh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===th)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===nh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ih)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ah)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===rh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===oh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===lh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ch)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===uh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===fh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===dh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hh)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ph||i===mh||i===gh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ph)return r===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===mh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===gh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_h||i===vh||i===xh||i===Sh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===_h)return s.COMPRESSED_RED_RGTC1_EXT;if(i===vh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const _C=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Yx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new li({vertexShader:_C,fragmentShader:vC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new sa(new hu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class SC extends Br{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,h=null,g=null;const y=typeof XRWebGLBinding<"u",_=new xC,f={},m=n.getContextAttributes();let v=null,M=null;const w=[],A=[],R=new mt;let x=null;const T=new Wn;T.viewport=new Lt;const F=new Wn;F.viewport=new Lt;const D=[T,F],H=new Ub;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=w[Q];return se===void 0&&(se=new df,w[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=w[Q];return se===void 0&&(se=new df,w[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=w[Q];return se===void 0&&(se=new df,w[Q]=se),se.getHandSpace()};function G(Q){const se=A.indexOf(Q.inputSource);if(se===-1)return;const le=w[se];le!==void 0&&(le.update(Q.inputSource,Q.frame,c||r),le.dispatchEvent({type:Q.type,data:Q.inputSource}))}function U(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",U),a.removeEventListener("inputsourceschange",L);for(let Q=0;Q<w.length;Q++){const se=A[Q];se!==null&&(A[Q]=null,w[Q].disconnect(se))}k=null,q=null,_.reset();for(const Q in f)delete f[Q];e.setRenderTarget(v),h=null,u=null,p=null,a=null,M=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(a,n)),p},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(Q){if(a=Q,a!==null){if(v=e.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",U),a.addEventListener("inputsourceschange",L),m.xrCompatible!==!0&&await n.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,ze=null,we=null;m.depth&&(we=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,le=m.stencil?cs:ia,ze=m.stencil?zo:Ei);const Ue={colorFormat:n.RGBA8,depthFormat:we,scaleFactor:s};p=this.getBinding(),u=p.createProjectionLayer(Ue),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new yi(u.textureWidth,u.textureHeight,{format:oi,type:Kn,depthTexture:new Ho(u.textureWidth,u.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const le={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(a,n,le),a.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),M=new yi(h.framebufferWidth,h.framebufferHeight,{format:oi,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),it.setContext(a),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function L(Q){for(let se=0;se<Q.removed.length;se++){const le=Q.removed[se],ze=A.indexOf(le);ze>=0&&(A[ze]=null,w[ze].disconnect(le))}for(let se=0;se<Q.added.length;se++){const le=Q.added[se];let ze=A.indexOf(le);if(ze===-1){for(let Ue=0;Ue<w.length;Ue++)if(Ue>=A.length){A.push(le),ze=Ue;break}else if(A[Ue]===null){A[Ue]=le,ze=Ue;break}if(ze===-1)break}const we=w[ze];we&&we.connect(le)}}const j=new V,K=new V;function ne(Q,se,le){j.setFromMatrixPosition(se.matrixWorld),K.setFromMatrixPosition(le.matrixWorld);const ze=j.distanceTo(K),we=se.projectionMatrix.elements,Ue=le.projectionMatrix.elements,qt=we[14]/(we[10]-1),Ke=we[14]/(we[10]+1),st=(we[9]+1)/we[5],gt=(we[9]-1)/we[5],Ve=(we[8]-1)/we[0],Dt=(Ue[8]+1)/Ue[0],N=qt*Ve,Pt=qt*Dt,at=ze/(-Ve+Dt),xt=at*-Ve;if(se.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(xt),Q.translateZ(at),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),we[10]===-1)Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ee=qt+at,C=Ke+at,S=N-xt,I=Pt+(ze-xt),Z=st*Ke/C*Ee,$=gt*Ke/C*Ee;Q.projectionMatrix.makePerspective(S,I,Z,$,Ee,C),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function me(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(a===null)return;let se=Q.near,le=Q.far;_.texture!==null&&(_.depthNear>0&&(se=_.depthNear),_.depthFar>0&&(le=_.depthFar)),H.near=F.near=T.near=se,H.far=F.far=T.far=le,(k!==H.near||q!==H.far)&&(a.updateRenderState({depthNear:H.near,depthFar:H.far}),k=H.near,q=H.far),H.layers.mask=Q.layers.mask|6,T.layers.mask=H.layers.mask&-5,F.layers.mask=H.layers.mask&-3;const ze=Q.parent,we=H.cameras;me(H,ze);for(let Ue=0;Ue<we.length;Ue++)me(we[Ue],ze);we.length===2?ne(H,T,F):H.projectionMatrix.copy(T.projectionMatrix),de(Q,H,ze)};function de(Q,se,le){le===null?Q.matrix.copy(se.matrixWorld):(Q.matrix.copy(le.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(se.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Mh*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&h===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(H)},this.getCameraTexture=function(Q){return f[Q]};let Le=null;function Je(Q,se){if(d=se.getViewerPose(c||r),g=se,d!==null){const le=d.views;h!==null&&(e.setRenderTargetFramebuffer(M,h.framebuffer),e.setRenderTarget(M));let ze=!1;le.length!==H.cameras.length&&(H.cameras.length=0,ze=!0);for(let Ke=0;Ke<le.length;Ke++){const st=le[Ke];let gt=null;if(h!==null)gt=h.getViewport(st);else{const Dt=p.getViewSubImage(u,st);gt=Dt.viewport,Ke===0&&(e.setRenderTargetTextures(M,Dt.colorTexture,Dt.depthStencilTexture),e.setRenderTarget(M))}let Ve=D[Ke];Ve===void 0&&(Ve=new Wn,Ve.layers.enable(Ke),Ve.viewport=new Lt,D[Ke]=Ve),Ve.matrix.fromArray(st.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(st.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(gt.x,gt.y,gt.width,gt.height),Ke===0&&(H.matrix.copy(Ve.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),ze===!0&&H.cameras.push(Ve)}const we=a.enabledFeatures;if(we&&we.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&y){p=i.getBinding();const Ke=p.getDepthInformation(le[0]);Ke&&Ke.isValid&&Ke.texture&&_.init(Ke,a.renderState)}if(we&&we.includes("camera-access")&&y){e.state.unbindTexture(),p=i.getBinding();for(let Ke=0;Ke<le.length;Ke++){const st=le[Ke].camera;if(st){let gt=f[st];gt||(gt=new Yx,f[st]=gt);const Ve=p.getCameraImage(st);gt.sourceTexture=Ve}}}}for(let le=0;le<w.length;le++){const ze=A[le],we=w[le];ze!==null&&we!==void 0&&we.update(ze,se,c||r)}Le&&Le(Q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const it=new Jx;it.setAnimationLoop(Je),this.setAnimationLoop=function(Q){Le=Q},this.dispose=function(){}}}const es=new aa,MC=new It;function yC(t,e){function n(_,f){_.matrixAutoUpdate===!0&&_.updateMatrix(),f.value.copy(_.matrix)}function i(_,f){f.color.getRGB(_.fogColor.value,Zx(t)),f.isFog?(_.fogNear.value=f.near,_.fogFar.value=f.far):f.isFogExp2&&(_.fogDensity.value=f.density)}function a(_,f,m,v,M){f.isMeshBasicMaterial?s(_,f):f.isMeshLambertMaterial?(s(_,f),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(_,f),p(_,f)):f.isMeshPhongMaterial?(s(_,f),d(_,f),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(_,f),u(_,f),f.isMeshPhysicalMaterial&&h(_,f,M)):f.isMeshMatcapMaterial?(s(_,f),g(_,f)):f.isMeshDepthMaterial?s(_,f):f.isMeshDistanceMaterial?(s(_,f),y(_,f)):f.isMeshNormalMaterial?s(_,f):f.isLineBasicMaterial?(r(_,f),f.isLineDashedMaterial&&o(_,f)):f.isPointsMaterial?l(_,f,m,v):f.isSpriteMaterial?c(_,f):f.isShadowMaterial?(_.color.value.copy(f.color),_.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(_,f){_.opacity.value=f.opacity,f.color&&_.diffuse.value.copy(f.color),f.emissive&&_.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(_.map.value=f.map,n(f.map,_.mapTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,n(f.alphaMap,_.alphaMapTransform)),f.bumpMap&&(_.bumpMap.value=f.bumpMap,n(f.bumpMap,_.bumpMapTransform),_.bumpScale.value=f.bumpScale,f.side===En&&(_.bumpScale.value*=-1)),f.normalMap&&(_.normalMap.value=f.normalMap,n(f.normalMap,_.normalMapTransform),_.normalScale.value.copy(f.normalScale),f.side===En&&_.normalScale.value.negate()),f.displacementMap&&(_.displacementMap.value=f.displacementMap,n(f.displacementMap,_.displacementMapTransform),_.displacementScale.value=f.displacementScale,_.displacementBias.value=f.displacementBias),f.emissiveMap&&(_.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,_.emissiveMapTransform)),f.specularMap&&(_.specularMap.value=f.specularMap,n(f.specularMap,_.specularMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest);const m=e.get(f),v=m.envMap,M=m.envMapRotation;v&&(_.envMap.value=v,es.copy(M),es.x*=-1,es.y*=-1,es.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),_.envMapRotation.value.setFromMatrix4(MC.makeRotationFromEuler(es)),_.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=f.reflectivity,_.ior.value=f.ior,_.refractionRatio.value=f.refractionRatio),f.lightMap&&(_.lightMap.value=f.lightMap,_.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,_.lightMapTransform)),f.aoMap&&(_.aoMap.value=f.aoMap,_.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,_.aoMapTransform))}function r(_,f){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,f.map&&(_.map.value=f.map,n(f.map,_.mapTransform))}function o(_,f){_.dashSize.value=f.dashSize,_.totalSize.value=f.dashSize+f.gapSize,_.scale.value=f.scale}function l(_,f,m,v){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,_.size.value=f.size*m,_.scale.value=v*.5,f.map&&(_.map.value=f.map,n(f.map,_.uvTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,n(f.alphaMap,_.alphaMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest)}function c(_,f){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,_.rotation.value=f.rotation,f.map&&(_.map.value=f.map,n(f.map,_.mapTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,n(f.alphaMap,_.alphaMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest)}function d(_,f){_.specular.value.copy(f.specular),_.shininess.value=Math.max(f.shininess,1e-4)}function p(_,f){f.gradientMap&&(_.gradientMap.value=f.gradientMap)}function u(_,f){_.metalness.value=f.metalness,f.metalnessMap&&(_.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,_.metalnessMapTransform)),_.roughness.value=f.roughness,f.roughnessMap&&(_.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,_.roughnessMapTransform)),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)}function h(_,f,m){_.ior.value=f.ior,f.sheen>0&&(_.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),_.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(_.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,_.sheenColorMapTransform)),f.sheenRoughnessMap&&(_.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,_.sheenRoughnessMapTransform))),f.clearcoat>0&&(_.clearcoat.value=f.clearcoat,_.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(_.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,_.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(_.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===En&&_.clearcoatNormalScale.value.negate())),f.dispersion>0&&(_.dispersion.value=f.dispersion),f.iridescence>0&&(_.iridescence.value=f.iridescence,_.iridescenceIOR.value=f.iridescenceIOR,_.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(_.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,_.iridescenceMapTransform)),f.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),f.transmission>0&&(_.transmission.value=f.transmission,_.transmissionSamplerMap.value=m.texture,_.transmissionSamplerSize.value.set(m.width,m.height),f.transmissionMap&&(_.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,_.transmissionMapTransform)),_.thickness.value=f.thickness,f.thicknessMap&&(_.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=f.attenuationDistance,_.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(_.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(_.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=f.specularIntensity,_.specularColor.value.copy(f.specularColor),f.specularColorMap&&(_.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,_.specularColorMapTransform)),f.specularIntensityMap&&(_.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,f){f.matcap&&(_.matcap.value=f.matcap)}function y(_,f){const m=e.get(f).light;_.referencePosition.value.setFromMatrixPosition(m.matrixWorld),_.nearDistance.value=m.shadow.camera.near,_.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function EC(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,v){const M=v.program;i.uniformBlockBinding(m,M)}function c(m,v){let M=a[m.id];M===void 0&&(g(m),M=d(m),a[m.id]=M,m.addEventListener("dispose",_));const w=v.program;i.updateUBOMapping(m,w);const A=e.render.frame;s[m.id]!==A&&(u(m),s[m.id]=A)}function d(m){const v=p();m.__bindingPointIndex=v;const M=t.createBuffer(),w=m.__size,A=m.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,w,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,M),M}function p(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){const v=a[m.id],M=m.uniforms,w=m.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let A=0,R=M.length;A<R;A++){const x=Array.isArray(M[A])?M[A]:[M[A]];for(let T=0,F=x.length;T<F;T++){const D=x[T];if(h(D,A,T,w)===!0){const H=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let q=0;for(let G=0;G<k.length;G++){const U=k[G],L=y(U);typeof U=="number"||typeof U=="boolean"?(D.__data[0]=U,t.bufferSubData(t.UNIFORM_BUFFER,H+q,D.__data)):U.isMatrix3?(D.__data[0]=U.elements[0],D.__data[1]=U.elements[1],D.__data[2]=U.elements[2],D.__data[3]=0,D.__data[4]=U.elements[3],D.__data[5]=U.elements[4],D.__data[6]=U.elements[5],D.__data[7]=0,D.__data[8]=U.elements[6],D.__data[9]=U.elements[7],D.__data[10]=U.elements[8],D.__data[11]=0):(U.toArray(D.__data,q),q+=L.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,H,D.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(m,v,M,w){const A=m.value,R=v+"_"+M;if(w[R]===void 0)return typeof A=="number"||typeof A=="boolean"?w[R]=A:w[R]=A.clone(),!0;{const x=w[R];if(typeof A=="number"||typeof A=="boolean"){if(x!==A)return w[R]=A,!0}else if(x.equals(A)===!1)return x.copy(A),!0}return!1}function g(m){const v=m.uniforms;let M=0;const w=16;for(let R=0,x=v.length;R<x;R++){const T=Array.isArray(v[R])?v[R]:[v[R]];for(let F=0,D=T.length;F<D;F++){const H=T[F],k=Array.isArray(H.value)?H.value:[H.value];for(let q=0,G=k.length;q<G;q++){const U=k[q],L=y(U),j=M%w,K=j%L.boundary,ne=j+K;M+=K,ne!==0&&w-ne<L.storage&&(M+=w-ne),H.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=M,M+=L.storage}}}const A=M%w;return A>0&&(M+=w-A),m.__size=M,m.__cache={},this}function y(m){const v={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(v.boundary=4,v.storage=4):m.isVector2?(v.boundary=8,v.storage=8):m.isVector3||m.isColor?(v.boundary=16,v.storage=12):m.isVector4?(v.boundary=16,v.storage=16):m.isMatrix3?(v.boundary=48,v.storage=48):m.isMatrix4?(v.boundary=64,v.storage=64):m.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ie("WebGLRenderer: Unsupported uniform value type.",m),v}function _(m){const v=m.target;v.removeEventListener("dispose",_);const M=r.indexOf(v.__bindingPointIndex);r.splice(M,1),t.deleteBuffer(a[v.id]),delete a[v.id],delete s[v.id]}function f(){for(const m in a)t.deleteBuffer(a[m]);r=[],a={},s={}}return{bind:l,update:c,dispose:f}}const bC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function TC(){return hi===null&&(hi=new _b(bC,16,16,Rr,na),hi.name="DFG_LUT",hi.minFilter=un,hi.magFilter=un,hi.wrapS=Xi,hi.wrapT=Xi,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class AC{constructor(e={}){const{canvas:n=YE(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:h=Kn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const y=h,_=new Set([Lp,Up,Np]),f=new Set([Kn,Ei,Bo,zo,wp,Dp]),m=new Uint32Array(4),v=new Int32Array(4);let M=null,w=null;const A=[],R=[];let x=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let F=!1;this._outputColorSpace=Vn;let D=0,H=0,k=null,q=-1,G=null;const U=new Lt,L=new Lt;let j=null;const K=new ut(0);let ne=0,me=n.width,de=n.height,Le=1,Je=null,it=null;const Q=new Lt(0,0,me,de),se=new Lt(0,0,me,de);let le=!1;const ze=new Wx;let we=!1,Ue=!1;const qt=new It,Ke=new V,st=new Lt,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function Dt(){return k===null?Le:1}let N=i;function Pt(b,P){return n.getContext(b,P)}try{const b={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Rp}`),n.addEventListener("webglcontextlost",Se,!1),n.addEventListener("webglcontextrestored",Oe,!1),n.addEventListener("webglcontextcreationerror",St,!1),N===null){const P="webgl2";if(N=Pt(P,b),N===null)throw Pt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw et("WebGLRenderer: "+b.message),b}let at,xt,Ee,C,S,I,Z,$,Y,ve,re,Ce,De,ee,ie,xe,Me,pe,ke,O,oe,ae,_e;function te(){at=new A1(N),at.init(),oe=new gC(N,at),xt=new v1(N,at,e,oe),Ee=new pC(N,at),xt.reversedDepthBuffer&&u&&Ee.buffers.depth.setReversed(!0),C=new w1(N),S=new eC,I=new mC(N,at,Ee,S,xt,oe,C),Z=new T1(T),$=new Ob(N),ae=new g1(N,$),Y=new R1(N,$,C,ae),ve=new N1(N,Y,$,ae,C),pe=new D1(N,xt,I),ie=new x1(S),re=new $R(T,Z,at,xt,ae,ie),Ce=new yC(T,S),De=new nC,ee=new lC(at),Me=new m1(T,Z,Ee,ve,g,l),xe=new hC(T,ve,xt),_e=new EC(N,C,xt,Ee),ke=new _1(N,at,C),O=new C1(N,at,C),C.programs=re.programs,T.capabilities=xt,T.extensions=at,T.properties=S,T.renderLists=De,T.shadowMap=xe,T.state=Ee,T.info=C}te(),y!==Kn&&(x=new L1(y,n.width,n.height,a,s));const W=new SC(T,N);this.xr=W,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const b=at.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=at.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Le},this.setPixelRatio=function(b){b!==void 0&&(Le=b,this.setSize(me,de,!1))},this.getSize=function(b){return b.set(me,de)},this.setSize=function(b,P,X=!0){if(W.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}me=b,de=P,n.width=Math.floor(b*Le),n.height=Math.floor(P*Le),X===!0&&(n.style.width=b+"px",n.style.height=P+"px"),x!==null&&x.setSize(n.width,n.height),this.setViewport(0,0,b,P)},this.getDrawingBufferSize=function(b){return b.set(me*Le,de*Le).floor()},this.setDrawingBufferSize=function(b,P,X){me=b,de=P,Le=X,n.width=Math.floor(b*X),n.height=Math.floor(P*X),this.setViewport(0,0,b,P)},this.setEffects=function(b){if(y===Kn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let P=0;P<b.length;P++)if(b[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(U)},this.getViewport=function(b){return b.copy(Q)},this.setViewport=function(b,P,X,z){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,P,X,z),Ee.viewport(U.copy(Q).multiplyScalar(Le).round())},this.getScissor=function(b){return b.copy(se)},this.setScissor=function(b,P,X,z){b.isVector4?se.set(b.x,b.y,b.z,b.w):se.set(b,P,X,z),Ee.scissor(L.copy(se).multiplyScalar(Le).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(b){Ee.setScissorTest(le=b)},this.setOpaqueSort=function(b){Je=b},this.setTransparentSort=function(b){it=b},this.getClearColor=function(b){return b.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(b=!0,P=!0,X=!0){let z=0;if(b){let B=!1;if(k!==null){const ue=k.texture.format;B=_.has(ue)}if(B){const ue=k.texture.type,ge=f.has(ue),fe=Me.getClearColor(),ye=Me.getClearAlpha(),Ae=fe.r,Fe=fe.g,Xe=fe.b;ge?(m[0]=Ae,m[1]=Fe,m[2]=Xe,m[3]=ye,N.clearBufferuiv(N.COLOR,0,m)):(v[0]=Ae,v[1]=Fe,v[2]=Xe,v[3]=ye,N.clearBufferiv(N.COLOR,0,v))}else z|=N.COLOR_BUFFER_BIT}P&&(z|=N.DEPTH_BUFFER_BIT),X&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",Oe,!1),n.removeEventListener("webglcontextcreationerror",St,!1),Me.dispose(),De.dispose(),ee.dispose(),S.dispose(),Z.dispose(),ve.dispose(),ae.dispose(),_e.dispose(),re.dispose(),W.dispose(),W.removeEventListener("sessionstart",Bp),W.removeEventListener("sessionend",zp),Wa.stop()};function Se(b){b.preventDefault(),Rg("WebGLRenderer: Context Lost."),F=!0}function Oe(){Rg("WebGLRenderer: Context Restored."),F=!1;const b=C.autoReset,P=xe.enabled,X=xe.autoUpdate,z=xe.needsUpdate,B=xe.type;te(),C.autoReset=b,xe.enabled=P,xe.autoUpdate=X,xe.needsUpdate=z,xe.type=B}function St(b){et("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function rt(b){const P=b.target;P.removeEventListener("dispose",rt),Ai(P)}function Ai(b){Ri(b),S.remove(b)}function Ri(b){const P=S.get(b).programs;P!==void 0&&(P.forEach(function(X){re.releaseProgram(X)}),b.isShaderMaterial&&re.releaseShaderCache(b))}this.renderBufferDirect=function(b,P,X,z,B,ue){P===null&&(P=gt);const ge=B.isMesh&&B.matrixWorld.determinant()<0,fe=sS(b,P,X,z,B);Ee.setMaterial(z,ge);let ye=X.index,Ae=1;if(z.wireframe===!0){if(ye=Y.getWireframeAttribute(X),ye===void 0)return;Ae=2}const Fe=X.drawRange,Xe=X.attributes.position;let Re=Fe.start*Ae,ft=(Fe.start+Fe.count)*Ae;ue!==null&&(Re=Math.max(Re,ue.start*Ae),ft=Math.min(ft,(ue.start+ue.count)*Ae)),ye!==null?(Re=Math.max(Re,0),ft=Math.min(ft,ye.count)):Xe!=null&&(Re=Math.max(Re,0),ft=Math.min(ft,Xe.count));const Nt=ft-Re;if(Nt<0||Nt===1/0)return;ae.setup(B,z,fe,X,ye);let Rt,dt=ke;if(ye!==null&&(Rt=$.get(ye),dt=O,dt.setIndex(Rt)),B.isMesh)z.wireframe===!0?(Ee.setLineWidth(z.wireframeLinewidth*Dt()),dt.setMode(N.LINES)):dt.setMode(N.TRIANGLES);else if(B.isLine){let on=z.linewidth;on===void 0&&(on=1),Ee.setLineWidth(on*Dt()),B.isLineSegments?dt.setMode(N.LINES):B.isLineLoop?dt.setMode(N.LINE_LOOP):dt.setMode(N.LINE_STRIP)}else B.isPoints?dt.setMode(N.POINTS):B.isSprite&&dt.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)jc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))dt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const on=B._multiDrawStarts,be=B._multiDrawCounts,Rn=B._multiDrawCount,$e=ye?$.get(ye).bytesPerElement:1,ei=S.get(z).currentProgram.getUniforms();for(let fi=0;fi<Rn;fi++)ei.setValue(N,"_gl_DrawID",fi),dt.render(on[fi]/$e,be[fi])}else if(B.isInstancedMesh)dt.renderInstances(Re,Nt,B.count);else if(X.isInstancedBufferGeometry){const on=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,be=Math.min(X.instanceCount,on);dt.renderInstances(Re,Nt,be)}else dt.render(Re,Nt)};function Fp(b,P,X){b.transparent===!0&&b.side===Hi&&b.forceSinglePass===!1?(b.side=En,b.needsUpdate=!0,al(b,P,X),b.side=ka,b.needsUpdate=!0,al(b,P,X),b.side=Hi):al(b,P,X)}this.compile=function(b,P,X=null){X===null&&(X=b),w=ee.get(X),w.init(P),R.push(w),X.traverseVisible(function(B){B.isLight&&B.layers.test(P.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),b!==X&&b.traverseVisible(function(B){B.isLight&&B.layers.test(P.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights();const z=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ue=B.material;if(ue)if(Array.isArray(ue))for(let ge=0;ge<ue.length;ge++){const fe=ue[ge];Fp(fe,X,B),z.add(fe)}else Fp(ue,X,B),z.add(ue)}),w=R.pop(),z},this.compileAsync=function(b,P,X=null){const z=this.compile(b,P,X);return new Promise(B=>{function ue(){if(z.forEach(function(ge){S.get(ge).currentProgram.isReady()&&z.delete(ge)}),z.size===0){B(b);return}setTimeout(ue,10)}at.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let gu=null;function aS(b){gu&&gu(b)}function Bp(){Wa.stop()}function zp(){Wa.start()}const Wa=new Jx;Wa.setAnimationLoop(aS),typeof self<"u"&&Wa.setContext(self),this.setAnimationLoop=function(b){gu=b,W.setAnimationLoop(b),b===null?Wa.stop():Wa.start()},W.addEventListener("sessionstart",Bp),W.addEventListener("sessionend",zp),this.render=function(b,P){if(P!==void 0&&P.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;const X=W.enabled===!0&&W.isPresenting===!0,z=x!==null&&(k===null||X)&&x.begin(T,k);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(P),P=W.getCamera()),b.isScene===!0&&b.onBeforeRender(T,b,P,k),w=ee.get(b,R.length),w.init(P),R.push(w),qt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),ze.setFromProjectionMatrix(qt,xi,P.reversedDepth),Ue=this.localClippingEnabled,we=ie.init(this.clippingPlanes,Ue),M=De.get(b,A.length),M.init(),A.push(M),W.enabled===!0&&W.isPresenting===!0){const ge=T.xr.getDepthSensingMesh();ge!==null&&_u(ge,P,-1/0,T.sortObjects)}_u(b,P,0,T.sortObjects),M.finish(),T.sortObjects===!0&&M.sort(Je,it),Ve=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ve&&Me.addToRenderList(M,b),this.info.render.frame++,we===!0&&ie.beginShadows();const B=w.state.shadowsArray;if(xe.render(B,b,P),we===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&x.hasRenderPass())===!1){const ge=M.opaque,fe=M.transmissive;if(w.setupLights(),P.isArrayCamera){const ye=P.cameras;if(fe.length>0)for(let Ae=0,Fe=ye.length;Ae<Fe;Ae++){const Xe=ye[Ae];Gp(ge,fe,b,Xe)}Ve&&Me.render(b);for(let Ae=0,Fe=ye.length;Ae<Fe;Ae++){const Xe=ye[Ae];Hp(M,b,Xe,Xe.viewport)}}else fe.length>0&&Gp(ge,fe,b,P),Ve&&Me.render(b),Hp(M,b,P)}k!==null&&H===0&&(I.updateMultisampleRenderTarget(k),I.updateRenderTargetMipmap(k)),z&&x.end(T),b.isScene===!0&&b.onAfterRender(T,b,P),ae.resetDefaultState(),q=-1,G=null,R.pop(),R.length>0?(w=R[R.length-1],we===!0&&ie.setGlobalState(T.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?M=A[A.length-1]:M=null};function _u(b,P,X,z){if(b.visible===!1)return;if(b.layers.test(P.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(P);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ze.intersectsSprite(b)){z&&st.setFromMatrixPosition(b.matrixWorld).applyMatrix4(qt);const ge=ve.update(b),fe=b.material;fe.visible&&M.push(b,ge,fe,X,st.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ze.intersectsObject(b))){const ge=ve.update(b),fe=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),st.copy(b.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),st.copy(ge.boundingSphere.center)),st.applyMatrix4(b.matrixWorld).applyMatrix4(qt)),Array.isArray(fe)){const ye=ge.groups;for(let Ae=0,Fe=ye.length;Ae<Fe;Ae++){const Xe=ye[Ae],Re=fe[Xe.materialIndex];Re&&Re.visible&&M.push(b,ge,Re,X,st.z,Xe)}}else fe.visible&&M.push(b,ge,fe,X,st.z,null)}}const ue=b.children;for(let ge=0,fe=ue.length;ge<fe;ge++)_u(ue[ge],P,X,z)}function Hp(b,P,X,z){const{opaque:B,transmissive:ue,transparent:ge}=b;w.setupLightsView(X),we===!0&&ie.setGlobalState(T.clippingPlanes,X),z&&Ee.viewport(U.copy(z)),B.length>0&&il(B,P,X),ue.length>0&&il(ue,P,X),ge.length>0&&il(ge,P,X),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Gp(b,P,X,z){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){const Re=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new yi(1,1,{generateMipmaps:!0,type:Re?na:Kn,minFilter:ls,samples:Math.max(4,xt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const ue=w.state.transmissionRenderTarget[z.id],ge=z.viewport||U;ue.setSize(ge.z*T.transmissionResolutionScale,ge.w*T.transmissionResolutionScale);const fe=T.getRenderTarget(),ye=T.getActiveCubeFace(),Ae=T.getActiveMipmapLevel();T.setRenderTarget(ue),T.getClearColor(K),ne=T.getClearAlpha(),ne<1&&T.setClearColor(16777215,.5),T.clear(),Ve&&Me.render(X);const Fe=T.toneMapping;T.toneMapping=Mi;const Xe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),we===!0&&ie.setGlobalState(T.clippingPlanes,z),il(b,X,z),I.updateMultisampleRenderTarget(ue),I.updateRenderTargetMipmap(ue),at.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ft=0,Nt=P.length;ft<Nt;ft++){const Rt=P[ft],{object:dt,geometry:on,material:be,group:Rn}=Rt;if(be.side===Hi&&dt.layers.test(z.layers)){const $e=be.side;be.side=En,be.needsUpdate=!0,Vp(dt,X,z,on,be,Rn),be.side=$e,be.needsUpdate=!0,Re=!0}}Re===!0&&(I.updateMultisampleRenderTarget(ue),I.updateRenderTargetMipmap(ue))}T.setRenderTarget(fe,ye,Ae),T.setClearColor(K,ne),Xe!==void 0&&(z.viewport=Xe),T.toneMapping=Fe}function il(b,P,X){const z=P.isScene===!0?P.overrideMaterial:null;for(let B=0,ue=b.length;B<ue;B++){const ge=b[B],{object:fe,geometry:ye,group:Ae}=ge;let Fe=ge.material;Fe.allowOverride===!0&&z!==null&&(Fe=z),fe.layers.test(X.layers)&&Vp(fe,P,X,ye,Fe,Ae)}}function Vp(b,P,X,z,B,ue){b.onBeforeRender(T,P,X,z,B,ue),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(T,P,X,z,b,ue),B.transparent===!0&&B.side===Hi&&B.forceSinglePass===!1?(B.side=En,B.needsUpdate=!0,T.renderBufferDirect(X,P,z,B,b,ue),B.side=ka,B.needsUpdate=!0,T.renderBufferDirect(X,P,z,B,b,ue),B.side=Hi):T.renderBufferDirect(X,P,z,B,b,ue),b.onAfterRender(T,P,X,z,B,ue)}function al(b,P,X){P.isScene!==!0&&(P=gt);const z=S.get(b),B=w.state.lights,ue=w.state.shadowsArray,ge=B.state.version,fe=re.getParameters(b,B.state,ue,P,X),ye=re.getProgramCacheKey(fe);let Ae=z.programs;z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,z.fog=P.fog;const Fe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;z.envMap=Z.get(b.envMap||z.environment,Fe),z.envMapRotation=z.environment!==null&&b.envMap===null?P.environmentRotation:b.envMapRotation,Ae===void 0&&(b.addEventListener("dispose",rt),Ae=new Map,z.programs=Ae);let Xe=Ae.get(ye);if(Xe!==void 0){if(z.currentProgram===Xe&&z.lightsStateVersion===ge)return Xp(b,fe),Xe}else fe.uniforms=re.getUniforms(b),b.onBeforeCompile(fe,T),Xe=re.acquireProgram(fe,ye),Ae.set(ye,Xe),z.uniforms=fe.uniforms;const Re=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=ie.uniform),Xp(b,fe),z.needsLights=oS(b),z.lightsStateVersion=ge,z.needsLights&&(Re.ambientLightColor.value=B.state.ambient,Re.lightProbe.value=B.state.probe,Re.directionalLights.value=B.state.directional,Re.directionalLightShadows.value=B.state.directionalShadow,Re.spotLights.value=B.state.spot,Re.spotLightShadows.value=B.state.spotShadow,Re.rectAreaLights.value=B.state.rectArea,Re.ltc_1.value=B.state.rectAreaLTC1,Re.ltc_2.value=B.state.rectAreaLTC2,Re.pointLights.value=B.state.point,Re.pointLightShadows.value=B.state.pointShadow,Re.hemisphereLights.value=B.state.hemi,Re.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Re.spotLightMatrix.value=B.state.spotLightMatrix,Re.spotLightMap.value=B.state.spotLightMap,Re.pointShadowMatrix.value=B.state.pointShadowMatrix),z.currentProgram=Xe,z.uniformsList=null,Xe}function kp(b){if(b.uniformsList===null){const P=b.currentProgram.getUniforms();b.uniformsList=dc.seqWithValue(P.seq,b.uniforms)}return b.uniformsList}function Xp(b,P){const X=S.get(b);X.outputColorSpace=P.outputColorSpace,X.batching=P.batching,X.batchingColor=P.batchingColor,X.instancing=P.instancing,X.instancingColor=P.instancingColor,X.instancingMorph=P.instancingMorph,X.skinning=P.skinning,X.morphTargets=P.morphTargets,X.morphNormals=P.morphNormals,X.morphColors=P.morphColors,X.morphTargetsCount=P.morphTargetsCount,X.numClippingPlanes=P.numClippingPlanes,X.numIntersection=P.numClipIntersection,X.vertexAlphas=P.vertexAlphas,X.vertexTangents=P.vertexTangents,X.toneMapping=P.toneMapping}function sS(b,P,X,z,B){P.isScene!==!0&&(P=gt),I.resetTextureUnits();const ue=P.fog,ge=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?P.environment:null,fe=k===null?T.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Cr,ye=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ae=Z.get(z.envMap||ge,ye),Fe=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Xe=!!X.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!X.morphAttributes.position,ft=!!X.morphAttributes.normal,Nt=!!X.morphAttributes.color;let Rt=Mi;z.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Rt=T.toneMapping);const dt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,on=dt!==void 0?dt.length:0,be=S.get(z),Rn=w.state.lights;if(we===!0&&(Ue===!0||b!==G)){const Yt=b===G&&z.id===q;ie.setState(z,b,Yt)}let $e=!1;z.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Rn.state.version||be.outputColorSpace!==fe||B.isBatchedMesh&&be.batching===!1||!B.isBatchedMesh&&be.batching===!0||B.isBatchedMesh&&be.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&be.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&be.instancing===!1||!B.isInstancedMesh&&be.instancing===!0||B.isSkinnedMesh&&be.skinning===!1||!B.isSkinnedMesh&&be.skinning===!0||B.isInstancedMesh&&be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&be.instancingMorph===!1&&B.morphTexture!==null||be.envMap!==Ae||z.fog===!0&&be.fog!==ue||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==ie.numPlanes||be.numIntersection!==ie.numIntersection)||be.vertexAlphas!==Fe||be.vertexTangents!==Xe||be.morphTargets!==Re||be.morphNormals!==ft||be.morphColors!==Nt||be.toneMapping!==Rt||be.morphTargetsCount!==on)&&($e=!0):($e=!0,be.__version=z.version);let ei=be.currentProgram;$e===!0&&(ei=al(z,P,B));let fi=!1,qa=!1,As=!1;const _t=ei.getUniforms(),$t=be.uniforms;if(Ee.useProgram(ei.program)&&(fi=!0,qa=!0,As=!0),z.id!==q&&(q=z.id,qa=!0),fi||G!==b){Ee.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),_t.setValue(N,"projectionMatrix",b.projectionMatrix),_t.setValue(N,"viewMatrix",b.matrixWorldInverse);const la=_t.map.cameraPosition;la!==void 0&&la.setValue(N,Ke.setFromMatrixPosition(b.matrixWorld)),xt.logarithmicDepthBuffer&&_t.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&_t.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),G!==b&&(G=b,qa=!0,As=!0)}if(be.needsLights&&(Rn.state.directionalShadowMap.length>0&&_t.setValue(N,"directionalShadowMap",Rn.state.directionalShadowMap,I),Rn.state.spotShadowMap.length>0&&_t.setValue(N,"spotShadowMap",Rn.state.spotShadowMap,I),Rn.state.pointShadowMap.length>0&&_t.setValue(N,"pointShadowMap",Rn.state.pointShadowMap,I)),B.isSkinnedMesh){_t.setOptional(N,B,"bindMatrix"),_t.setOptional(N,B,"bindMatrixInverse");const Yt=B.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),_t.setValue(N,"boneTexture",Yt.boneTexture,I))}B.isBatchedMesh&&(_t.setOptional(N,B,"batchingTexture"),_t.setValue(N,"batchingTexture",B._matricesTexture,I),_t.setOptional(N,B,"batchingIdTexture"),_t.setValue(N,"batchingIdTexture",B._indirectTexture,I),_t.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&_t.setValue(N,"batchingColorTexture",B._colorsTexture,I));const oa=X.morphAttributes;if((oa.position!==void 0||oa.normal!==void 0||oa.color!==void 0)&&pe.update(B,X,ei),(qa||be.receiveShadow!==B.receiveShadow)&&(be.receiveShadow=B.receiveShadow,_t.setValue(N,"receiveShadow",B.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&P.environment!==null&&($t.envMapIntensity.value=P.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=TC()),qa&&(_t.setValue(N,"toneMappingExposure",T.toneMappingExposure),be.needsLights&&rS($t,As),ue&&z.fog===!0&&Ce.refreshFogUniforms($t,ue),Ce.refreshMaterialUniforms($t,z,Le,de,w.state.transmissionRenderTarget[b.id]),dc.upload(N,kp(be),$t,I)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(dc.upload(N,kp(be),$t,I),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&_t.setValue(N,"center",B.center),_t.setValue(N,"modelViewMatrix",B.modelViewMatrix),_t.setValue(N,"normalMatrix",B.normalMatrix),_t.setValue(N,"modelMatrix",B.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Yt=z.uniformsGroups;for(let la=0,Rs=Yt.length;la<Rs;la++){const jp=Yt[la];_e.update(jp,ei),_e.bind(jp,ei)}}return ei}function rS(b,P){b.ambientLightColor.needsUpdate=P,b.lightProbe.needsUpdate=P,b.directionalLights.needsUpdate=P,b.directionalLightShadows.needsUpdate=P,b.pointLights.needsUpdate=P,b.pointLightShadows.needsUpdate=P,b.spotLights.needsUpdate=P,b.spotLightShadows.needsUpdate=P,b.rectAreaLights.needsUpdate=P,b.hemisphereLights.needsUpdate=P}function oS(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(b,P,X){const z=S.get(b);z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),S.get(b.texture).__webglTexture=P,S.get(b.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:X,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,P){const X=S.get(b);X.__webglFramebuffer=P,X.__useDefaultFramebuffer=P===void 0};const lS=N.createFramebuffer();this.setRenderTarget=function(b,P=0,X=0){k=b,D=P,H=X;let z=null,B=!1,ue=!1;if(b){const fe=S.get(b);if(fe.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),U.copy(b.viewport),L.copy(b.scissor),j=b.scissorTest,Ee.viewport(U),Ee.scissor(L),Ee.setScissorTest(j),q=-1;return}else if(fe.__webglFramebuffer===void 0)I.setupRenderTarget(b);else if(fe.__hasExternalTextures)I.rebindTextures(b,S.get(b.texture).__webglTexture,S.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Fe=b.depthTexture;if(fe.__boundDepthTexture!==Fe){if(Fe!==null&&S.has(Fe)&&(b.width!==Fe.image.width||b.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(b)}}const ye=b.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(ue=!0);const Ae=S.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ae[P])?z=Ae[P][X]:z=Ae[P],B=!0):b.samples>0&&I.useMultisampledRTT(b)===!1?z=S.get(b).__webglMultisampledFramebuffer:Array.isArray(Ae)?z=Ae[X]:z=Ae,U.copy(b.viewport),L.copy(b.scissor),j=b.scissorTest}else U.copy(Q).multiplyScalar(Le).floor(),L.copy(se).multiplyScalar(Le).floor(),j=le;if(X!==0&&(z=lS),Ee.bindFramebuffer(N.FRAMEBUFFER,z)&&Ee.drawBuffers(b,z),Ee.viewport(U),Ee.scissor(L),Ee.setScissorTest(j),B){const fe=S.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+P,fe.__webglTexture,X)}else if(ue){const fe=P;for(let ye=0;ye<b.textures.length;ye++){const Ae=S.get(b.textures[ye]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+ye,Ae.__webglTexture,X,fe)}}else if(b!==null&&X!==0){const fe=S.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,X)}q=-1},this.readRenderTargetPixels=function(b,P,X,z,B,ue,ge,fe=0){if(!(b&&b.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=S.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ge!==void 0&&(ye=ye[ge]),ye){Ee.bindFramebuffer(N.FRAMEBUFFER,ye);try{const Ae=b.textures[fe],Fe=Ae.format,Xe=Ae.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!xt.textureFormatReadable(Fe)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Xe)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=b.width-z&&X>=0&&X<=b.height-B&&N.readPixels(P,X,z,B,oe.convert(Fe),oe.convert(Xe),ue)}finally{const Ae=k!==null?S.get(k).__webglFramebuffer:null;Ee.bindFramebuffer(N.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(b,P,X,z,B,ue,ge,fe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=S.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ge!==void 0&&(ye=ye[ge]),ye)if(P>=0&&P<=b.width-z&&X>=0&&X<=b.height-B){Ee.bindFramebuffer(N.FRAMEBUFFER,ye);const Ae=b.textures[fe],Fe=Ae.format,Xe=Ae.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!xt.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Re),N.bufferData(N.PIXEL_PACK_BUFFER,ue.byteLength,N.STREAM_READ),N.readPixels(P,X,z,B,oe.convert(Fe),oe.convert(Xe),0);const ft=k!==null?S.get(k).__webglFramebuffer:null;Ee.bindFramebuffer(N.FRAMEBUFFER,ft);const Nt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ZE(N,Nt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Re),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ue),N.deleteBuffer(Re),N.deleteSync(Nt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,P=null,X=0){const z=Math.pow(2,-X),B=Math.floor(b.image.width*z),ue=Math.floor(b.image.height*z),ge=P!==null?P.x:0,fe=P!==null?P.y:0;I.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,ge,fe,B,ue),Ee.unbindTexture()};const cS=N.createFramebuffer(),uS=N.createFramebuffer();this.copyTextureToTexture=function(b,P,X=null,z=null,B=0,ue=0){let ge,fe,ye,Ae,Fe,Xe,Re,ft,Nt;const Rt=b.isCompressedTexture?b.mipmaps[ue]:b.image;if(X!==null)ge=X.max.x-X.min.x,fe=X.max.y-X.min.y,ye=X.isBox3?X.max.z-X.min.z:1,Ae=X.min.x,Fe=X.min.y,Xe=X.isBox3?X.min.z:0;else{const $t=Math.pow(2,-B);ge=Math.floor(Rt.width*$t),fe=Math.floor(Rt.height*$t),b.isDataArrayTexture?ye=Rt.depth:b.isData3DTexture?ye=Math.floor(Rt.depth*$t):ye=1,Ae=0,Fe=0,Xe=0}z!==null?(Re=z.x,ft=z.y,Nt=z.z):(Re=0,ft=0,Nt=0);const dt=oe.convert(P.format),on=oe.convert(P.type);let be;P.isData3DTexture?(I.setTexture3D(P,0),be=N.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(I.setTexture2DArray(P,0),be=N.TEXTURE_2D_ARRAY):(I.setTexture2D(P,0),be=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,P.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,P.unpackAlignment);const Rn=N.getParameter(N.UNPACK_ROW_LENGTH),$e=N.getParameter(N.UNPACK_IMAGE_HEIGHT),ei=N.getParameter(N.UNPACK_SKIP_PIXELS),fi=N.getParameter(N.UNPACK_SKIP_ROWS),qa=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Rt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Rt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ae),N.pixelStorei(N.UNPACK_SKIP_ROWS,Fe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Xe);const As=b.isDataArrayTexture||b.isData3DTexture,_t=P.isDataArrayTexture||P.isData3DTexture;if(b.isDepthTexture){const $t=S.get(b),oa=S.get(P),Yt=S.get($t.__renderTarget),la=S.get(oa.__renderTarget);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,la.__webglFramebuffer);for(let Rs=0;Rs<ye;Rs++)As&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(b).__webglTexture,B,Xe+Rs),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(P).__webglTexture,ue,Nt+Rs)),N.blitFramebuffer(Ae,Fe,ge,fe,Re,ft,ge,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||S.has(b)){const $t=S.get(b),oa=S.get(P);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,cS),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,uS);for(let Yt=0;Yt<ye;Yt++)As?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,$t.__webglTexture,B,Xe+Yt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,$t.__webglTexture,B),_t?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,oa.__webglTexture,ue,Nt+Yt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,oa.__webglTexture,ue),B!==0?N.blitFramebuffer(Ae,Fe,ge,fe,Re,ft,ge,fe,N.COLOR_BUFFER_BIT,N.NEAREST):_t?N.copyTexSubImage3D(be,ue,Re,ft,Nt+Yt,Ae,Fe,ge,fe):N.copyTexSubImage2D(be,ue,Re,ft,Ae,Fe,ge,fe);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _t?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(be,ue,Re,ft,Nt,ge,fe,ye,dt,on,Rt.data):P.isCompressedArrayTexture?N.compressedTexSubImage3D(be,ue,Re,ft,Nt,ge,fe,ye,dt,Rt.data):N.texSubImage3D(be,ue,Re,ft,Nt,ge,fe,ye,dt,on,Rt):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ue,Re,ft,ge,fe,dt,on,Rt.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ue,Re,ft,Rt.width,Rt.height,dt,Rt.data):N.texSubImage2D(N.TEXTURE_2D,ue,Re,ft,ge,fe,dt,on,Rt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Rn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,$e),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ei),N.pixelStorei(N.UNPACK_SKIP_ROWS,fi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,qa),ue===0&&P.generateMipmaps&&N.generateMipmap(be),Ee.unbindTexture()},this.initRenderTarget=function(b){S.get(b).__webglFramebuffer===void 0&&I.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?I.setTextureCube(b,0):b.isData3DTexture?I.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?I.setTexture2DArray(b,0):I.setTexture2D(b,0),Ee.unbindTexture()},this.resetState=function(){D=0,H=0,k=null,Ee.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=Qe._getUnpackColorSpace()}}const ga={mainCount:1100,haloCount:400,radius:1.6,basePointSize:5,haloPointSize:3.5,smoothing:.15,cameraZ:6.2};let Bt={idle:{r:0,g:.7,b:.95},listening:{r:0,g:.7,b:.95},thinking:{r:0,g:.7,b:.95},speaking:{r:.6,g:.4,b:1}};const RC=t=>{t==="hacker"?(Bt.idle={r:1,g:.6,b:0},Bt.listening={r:1,g:.7,b:.1},Bt.thinking={r:.2,g:1,b:.2},Bt.speaking={r:1,g:.4,b:0}):t==="bronze"?(Bt.idle={r:.8,g:.5,b:.2},Bt.listening={r:.9,g:.6,b:.3},Bt.thinking={r:1,g:.7,b:.4},Bt.speaking={r:1,g:.4,b:0}):t==="matrix"?(Bt.idle={r:0,g:1,b:.25},Bt.listening={r:.2,g:1,b:.4},Bt.thinking={r:.1,g:1,b:.3},Bt.speaking={r:.5,g:1,b:.5}):(Bt.idle={r:0,g:.7,b:.95},Bt.listening={r:0,g:.7,b:.95},Bt.thinking={r:0,g:.7,b:.95},Bt.speaking={r:.6,g:.4,b:1})},CC=`
attribute float aSize;
attribute vec3 aColor;
attribute float aAlpha;

uniform float uTime;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = aColor;
  vAlpha = aAlpha;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  // Echelle augmentée pour la visibilité (5.5 -> 10.0)
  gl_PointSize = aSize * (10.0 / -mvPosition.z);
  
  gl_Position = projectionMatrix * mvPosition;
}
`,wC=`
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);

  // Smoothstep plus doux pour eviter la disparition (0.3 -> 0.45)
  float dot = 1.0 - smoothstep(0.0, 0.45, dist);
  
  // Spark central un peu plus large
  float spark = 1.0 - smoothstep(0.0, 0.12, dist);

  vec3 color = vColor * (0.8 + spark * 0.4);
  float alpha = dot * vAlpha;

  if (alpha < 0.005) discard;

  gl_FragColor = vec4(color, alpha);
}
`;function g_(t){const e=new ui,n=t.count,i=new Float32Array(n*3),a=new Float32Array(n*3),s=new Float32Array(n*3),r=new Float32Array(n),o=new Float32Array(n),l=new Float32Array(n),c=new Float32Array(n),d=new Float32Array(n),p=new Float32Array(n);for(let h=0;h<n;h++){const g=h*3,y=t.radius*(.3+Math.random()*.7),_=Math.random()*Math.PI*2,f=Math.random()*Math.PI*2,m=Math.floor(Math.random()*5),v=Math.cos(_)*y,M=Math.sin(_)*y,w=Math.cos(y*2.5+f)*.12+(Math.random()-.5)*.05;i[g]=v,i[g+1]=M,i[g+2]=w,a[g]=v,a[g+1]=M,a[g+2]=w,l[h]=y,c[h]=_,d[h]=f,p[h]=m,o[h]=t.pointSize+m*1,s[g]=Bt.idle.r,s[g+1]=Bt.idle.g,s[g+2]=Bt.idle.b,r[h]=.45}e.setAttribute("position",new Mn(i,3)),e.setAttribute("aColor",new Mn(s,3)),e.setAttribute("aAlpha",new Mn(r,1)),e.setAttribute("aSize",new Mn(o,1));const u=new li({uniforms:{uTime:{value:0}},vertexShader:CC,fragmentShader:wC,transparent:!0,blending:Nd,depthTest:!1});return{geometry:e,material:u,points:new yb(e,u),pos:i,base:a,color:s,alpha:r,size:o,metaR:l,metaA:c,metaP:d,metaL:p}}function __(t,e,n,i,a=1){const s=Bt[i];for(let r=0;r<t.metaR.length;r++){const o=r*3,l=t.metaR[r],c=t.metaA[r],d=t.metaP[r],p=t.metaL[r],u=Math.sin(e*(.8+p*.3)-l*2.5+d)*(.06+n*.05),h=c+e*.03*(.3+p*.4),g=l*(1+n*.05+u*.02);t.pos[o]=Math.cos(h)*g*a,t.pos[o+1]=Math.sin(h)*g,t.pos[o+2]=t.base[o+2]+Math.cos(e+l+d)*(.1+n*.1);const y=.05;t.color[o]+=(s.r-t.color[o])*y,t.color[o+1]+=(s.g-t.color[o+1])*y,t.color[o+2]+=(s.b-t.color[o+2])*y;const _=.45+Math.abs(u)*.2+(i==="speaking"?n*.15:0);t.alpha[r]=t.alpha[r]*.9+_*.1;const f=5+p*1+(i==="speaking"?n*1.5:0);t.size[r]=t.size[r]*.9+f*.1}t.geometry.attributes.position.needsUpdate=!0,t.geometry.attributes.aColor.needsUpdate=!0,t.geometry.attributes.aAlpha.needsUpdate=!0,t.geometry.attributes.aSize.needsUpdate=!0,t.material.uniforms.uTime.value=e}const DC=({mode:t,size:e=540})=>{const n=he.useRef(null),i=he.useRef(0),a=he.useRef(null),s=he.useRef(t),r=he.useRef(0),o=he.useRef(0);return he.useEffect(()=>{s.current=t},[t]),he.useEffect(()=>{const l=()=>{const d=document.documentElement.getAttribute("data-theme")||"default";RC(d)};l();const c=new MutationObserver(l);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>c.disconnect()},[]),he.useEffect(()=>{const l=Te.subscribe(c=>{r.current=c.audioLevel||0});return()=>{typeof l=="function"&&l()}},[]),he.useEffect(()=>{if(!n.current)return;n.current.innerHTML="",console.log("[JarvisCore] V5.17-STABLE Initialisation");const l=new fb,c=new Wn(45,1,.1,100);c.position.z=ga.cameraZ;const d=new AC({alpha:!0,antialias:!0});d.setPixelRatio(Math.min(window.devicePixelRatio,2)),d.setSize(e,e);const p=d.domElement;n.current.appendChild(p),a.current=d;const u=g_({count:ga.mainCount,radius:ga.radius,pointSize:ga.basePointSize}),h=g_({count:ga.haloCount,radius:ga.radius*1.35,pointSize:ga.haloPointSize});l.add(h.points),l.add(u.points);const g=y=>{const _=y*.001,f=s.current,m=ga.smoothing;o.current+=(r.current-o.current)*m,__(h,_*.5,o.current*.4,f,1.05),__(u,_,o.current,f,1),u.points.rotation.y=_*.05,d.render(l,c),i.current=requestAnimationFrame(g)};return i.current=requestAnimationFrame(g),()=>{cancelAnimationFrame(i.current),d.dispose(),u.geometry.dispose(),u.material.dispose(),h.geometry.dispose(),h.material.dispose()}},[e]),E.jsxs("div",{className:`jarvis-core jarvis-core--${t}`,children:[E.jsx("div",{className:"jarvis-core__glow"}),E.jsx("div",{ref:n,className:"jarvis-core__canvas"}),E.jsxs("div",{className:"jarvis-core__label",children:[E.jsx("span",{className:"label-status",children:t==="idle"?"VEILLE":t==="thinking"?"ANALYSE":"RÉPONSE"}),E.jsx("span",{className:"label-id",children:"JARVIS-CORE // V5.17-FINAL"})]})]})},NC=()=>{const[t,e]=he.useState("OFFLINE"),[n,i]=he.useState("IDLE"),[a,s]=he.useState("INACTIVE"),[r,o]=he.useState("idle"),l=he.useRef(null);return he.useEffect(()=>{l.current&&Ap(l.current,"J.A.R.V.I.S. 0.3",1200);const c=Te.subscribe(d=>{e(d.connection||"OFFLINE"),i(d.brainStatus||"IDLE"),s(d.ttsStatus||"INACTIVE"),o(d.orbStatus||"idle")});return()=>c()},[]),E.jsxs("div",{className:"status-bar glass",children:[E.jsxs("div",{className:"status-logo",children:[E.jsx("div",{className:"mini-reactor"}),E.jsxs("span",{className:"logo-text",id:"main-logo",ref:l,children:["J.A.R.V.I.S. ",E.jsx("span",{className:"v",children:"0.3"})]})]}),E.jsxs("div",{className:"status-items",children:[E.jsxs("div",{className:"status-item",id:"stat-conn",children:[E.jsx("span",{className:`val ${t.toLowerCase()}`,children:t.toUpperCase()}),E.jsx("span",{className:"label",children:"UPLINK"})]}),E.jsxs("div",{className:"status-item",id:"stat-brain",children:[E.jsx("span",{className:`val ${r}`,children:n.toUpperCase()}),E.jsx("span",{className:"label",children:"NEURAL NET"})]}),E.jsxs("div",{className:"status-item",id:"stat-tts",children:[E.jsx("span",{className:`val ${a==="Actif"?"active":""}`,children:a.toUpperCase()}),E.jsx("span",{className:"label",children:"VOCAL LINK"})]})]})]})},UC=()=>{const[t,e]=he.useState([]);return he.useEffect(()=>{const n=Te.subscribe(i=>{i.lastNeuralLog&&e(a=>a.length>0&&a[0].query===i.lastNeuralLog.query&&a[0].memories===i.lastNeuralLog.memories?a:[i.lastNeuralLog,...a].slice(0,3))});return()=>n()},[]),E.jsxs("div",{className:"neural-log glass",children:[E.jsxs("div",{className:"card-header",children:[E.jsx("span",{className:"pulse-icon"})," COGNITIVE FEEDBACK"]}),E.jsx("div",{className:"card-body",children:E.jsx("div",{className:"neural-log-list hide-scroll",children:t.length===0?E.jsx("div",{className:"empty-log",children:"EN ATTENTE D'ACTIVITÉ COGNITIVE..."}):t.map((n,i)=>E.jsxs("div",{className:"neural-log-item",style:{animation:"fadeInBlur 0.4s ease-out forwards"},children:[E.jsxs("div",{className:"query-trigger",children:['CONTEXT SEARCH: "',n.query,'"']}),E.jsx("div",{className:"memory-results",children:n.memories&&n.memories.map((a,s)=>E.jsxs("div",{className:"memory-fragment",children:[E.jsx("span",{className:"memory-icon",children:"◈"})," ",a.content]},s))})]},`${n.query}-${i}`))})})]})},LC=()=>{const[t,e]=he.useState(!1),[n,i]=he.useState(null);if(he.useEffect(()=>{const _=Te.subscribe(f=>{var v,M;const m=((v=f.printData)==null?void 0:v.moonraker)||((M=f.printData)==null?void 0:M.bambu);m?(i(m),e(!0)):e(!1)});return()=>_()},[]),!t||!n)return null;const s=n.type==="moonraker"?"VZBOT STATS":"BAMBU STATS",r=n.fichier||n.fichier_en_cours||"Inconnu",o=n["avancement_%"]||0,l=n.extrudeur||n["extrudeur_°C"]||{},c=n.plateau||n["plateau_°C"]||{},d=l.actuel||0,p=l.cible||0,u=c.actuel||0,h=c.cible||0,g=(n.état||"IDLE").toUpperCase(),y=(n.état||"idle").toLowerCase();return E.jsxs("div",{className:"printer-widget glass margin-left-10px margin-right-10px",style:{animation:"slideInLeft 0.4s ease-out forwards"},children:[E.jsxs("div",{className:"card-header",children:[E.jsx("span",{className:"printer-icon",children:"Imprimante"})," ",E.jsx("span",{className:"printer-name",children:s})]}),E.jsxs("div",{className:"card-body",children:[E.jsxs("div",{className:"print-info",children:[E.jsx("div",{className:"print-file-name",id:"p-filename",children:r}),E.jsxs("div",{className:"print-progress-container",children:[E.jsx("div",{className:"print-progress-bar",id:"p-progress-bar",style:{width:`${o}%`}}),E.jsxs("span",{className:"print-progress-text",id:"p-progress-text",children:[o,"%"]})]})]}),E.jsxs("div",{className:"print-metrics",children:[E.jsxs("div",{className:"p-metric",children:[E.jsx("span",{className:"label",children:"EXTRUDEUR"}),E.jsxs("span",{className:"val",id:"p-temp-ext",children:[d,"°C / ",p,"°C"]})]}),E.jsxs("div",{className:"p-metric",children:[E.jsx("span",{className:"label",children:"PLATEAU"}),E.jsxs("span",{className:"val",id:"p-temp-bed",children:[u,"°C / ",h,"°C"]})]})]}),E.jsx("div",{className:`print-status-label state-${y}`,id:"p-status",children:g})]})]})},OC=()=>{const[t,e]=he.useState(null),[n,i]=he.useState(!1),[a,s]=he.useState(!1);he.useEffect(()=>{const l=Te.subscribe(c=>{c.travelInfo?(e(c.travelInfo),i(!0),s(!1)):n&&!a&&r()});return()=>l()},[n,a]);const r=()=>{s(!0),setTimeout(()=>{i(!1),s(!1),Te.getState().travelInfo&&Te.setState({travelInfo:null})},400)};if(!n||!t)return null;const o=t.api_key&&t.polyline?`https://maps.googleapis.com/maps/api/staticmap?size=600x300&scale=2&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-20|invert_lightness:true&path=${encodeURIComponent(`color:0x00d2ff|weight:5|enc:${t.polyline}`)}&markers=color:blue|label:S|${encodeURIComponent(t.origin)}&markers=color:red|label:D|${encodeURIComponent(t.destination)}&key=${t.api_key}`:null;return E.jsxs("div",{id:"travel-widget",className:`travel-widget glass-panel ${a?"fade-out":"slide-in"}`,children:[E.jsxs("div",{className:"widget-header",children:[E.jsx("div",{className:"location-icon",children:E.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),E.jsx("circle",{cx:"12",cy:"10",r:"3"})]})}),E.jsxs("div",{className:"header-text",children:[E.jsx("span",{className:"label",children:"TRANSIT INTELLIGENCE"}),E.jsx("h3",{id:"travel-destination",children:t.destination})]}),E.jsx("button",{id:"close-travel",className:"close-btn",onClick:r,children:"✕"})]}),E.jsxs("div",{className:"widget-body",children:[E.jsx("div",{id:"travel-map-container",className:`map-container ${o?"":"empty"}`,children:o?E.jsx("img",{id:"travel-map-img",src:o,alt:"Carte Trajet"}):E.jsx("div",{className:"map-placeholder",children:"ITINÉRAIRE SANS CARTE RÉTROCÉDÉ..."})}),E.jsxs("div",{className:"travel-stats",children:[E.jsxs("div",{className:"stat",children:[E.jsx("span",{className:"s-label",children:"DURÉE (TRAFIC)"}),E.jsx("span",{id:"travel-duration",className:"s-value",children:t.duration})]}),E.jsxs("div",{className:"stat highlight",children:[E.jsx("span",{className:"s-label",children:"DÉPART CONSEILLÉ"}),E.jsx("span",{id:"travel-departure",className:"s-value",children:t.suggested_departure?t.suggested_departure:"NOW"})]})]}),t.suggested_departure&&E.jsxs("div",{id:"travel-arrival-box",className:"arrival-target",children:["Cible :"," ",E.jsx("span",{id:"travel-arrival-target",children:t.arrival_target})]}),E.jsxs("div",{className:"route-info",children:[E.jsx("span",{className:"dist",id:"travel-distance",children:t.distance}),E.jsxs("span",{className:"via",id:"travel-origin",children:["Depuis: ",t.origin]})]})]}),E.jsx("div",{className:"widget-footer",children:E.jsxs("div",{className:"live-indicator",children:[E.jsx("span",{className:"dot pulse"})," LIVE TRAFFIC"]})})]})},v_={create:{label:"CRÉATION",color:"var(--primary)",title:"NOUVEAU RENDEZ-VOUS"},update:{label:"MODIFICATION",color:"var(--secondary)",title:"MISE À JOUR AGENDA"},delete:{label:"SUPPRESSION",color:"#ff4b2b",title:"SUPPRESSION AGENDA"}},IC=()=>{const[t,e]=he.useState(null),[n,i]=he.useState(!1);he.useEffect(()=>{const l=Te.subscribe(c=>{c.calendarInfo?(e(c.calendarInfo),i(!0)):i(!1)});return()=>l()},[]);const a=()=>{i(!1),Te.setState({calendarInfo:null})};if(!n||!t)return null;const s=v_[t.type]||v_.create,o=new Date(t.start).toLocaleString("fr-FR",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"});return E.jsxs("div",{className:"calendar-widget glass visible",children:[E.jsxs("div",{className:"calendar-widget__header",children:[E.jsx("div",{className:"calendar-icon",id:"cal-icon",children:"📅"}),E.jsx("span",{className:"calendar-title",id:"cal-title",children:s.title})]}),E.jsx("div",{className:"calendar-widget__content",children:E.jsxs("div",{className:"calendar-event-info",children:[E.jsx("div",{className:"event-action-tag",id:"cal-type",style:{color:s.color,borderColor:s.color},children:s.label}),E.jsx("div",{className:"event-label",children:"ÉVÉNEMENT"}),E.jsx("div",{className:"event-value",id:"cal-summary",children:t.summary||"Sans titre"}),E.jsx("div",{className:"event-label",children:"HORAIRES"}),E.jsx("div",{className:"event-value",id:"cal-time",children:o})]})}),E.jsxs("div",{className:"calendar-widget__footer",children:[E.jsx("button",{className:"cal-btn cancel",id:"cal-cancel",onClick:a,children:"ANNULER"}),E.jsx("button",{className:"cal-btn confirm",id:"cal-confirm",onClick:a,children:"CONFIRMER"})]})]})},PC=()=>{const[t,e]=he.useState(null),[n,i]=he.useState(!1);he.useEffect(()=>{const s=Te.subscribe(r=>{r.visionData&&r.visionData.data?(e(r.visionData),i(!0)):i(!1)});return()=>s()},[]);const a=()=>{i(!1),Te.setState({visionData:null})};return!n||!t?null:E.jsxs("div",{className:"vision-widget glass visible",children:[E.jsxs("div",{className:"vision-widget__header",children:[E.jsx("div",{className:"vision-icon",children:"👁️"}),E.jsx("span",{className:"vision-title",children:"VISION SYSTÈME"}),E.jsx("button",{className:"vision-close",id:"vision-close-btn",onClick:a,children:"×"})]}),E.jsx("div",{className:"vision-widget__content",children:E.jsx("img",{id:"vision-image",src:`data:${t.mime_type};base64,${t.data}`,alt:"Analyse JARVIS"})}),E.jsx("div",{className:"vision-widget__footer",children:E.jsx("span",{className:"vision-status",children:"ANALYSE EN COURS..."})})]})},FC=()=>{const[t,e]=he.useState(null),[n,i]=he.useState(!1);he.useEffect(()=>{const r=Te.subscribe(o=>{o.emailData&&Array.isArray(o.emailData)?(e(o.emailData),i(!0)):i(!1)});return()=>r()},[]);const a=()=>{i(!1),Te.setState({emailData:null})},s=r=>{try{return new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return r}};return!n||!t?null:E.jsxs("div",{className:"email-widget glass visible",children:[E.jsxs("div",{className:"email-widget__header",children:[E.jsx("div",{className:"email-icon",children:"✉️"}),E.jsx("span",{className:"email-title",children:"COURRIERS RÉCENTS"}),E.jsx("button",{className:"email-close",id:"email-close-btn",onClick:a,children:"×"})]}),E.jsx("div",{className:"email-widget__list",id:"email-list",children:t.map((r,o)=>E.jsxs("div",{className:"email-item",children:[E.jsxs("div",{className:"email-item__top",children:[E.jsx("span",{className:"email-sender",children:r.from}),E.jsx("span",{className:"email-date",children:s(r.date)})]}),E.jsx("div",{className:"email-subject",children:r.subject})]},o))}),E.jsx("div",{className:"email-widget__footer",children:E.jsx("span",{className:"email-status",children:"SOURCE : GMAIL PRIMARY"})})]})},BC=()=>{const[t,e]=he.useState(null);if(he.useEffect(()=>{const a=Te.subscribe(s=>{e(s.webSearchResults||null)});return()=>a()},[]),!t)return null;const{query:n,results:i}=t;return E.jsx("div",{className:"web-search-modal glass-modal",children:E.jsxs("div",{className:"web-search-content glass",children:[E.jsxs("div",{className:"web-search-header",children:[E.jsx("div",{className:"status-dot"}),E.jsxs("h2",{children:["RECHERCHE WEB ",E.jsxs("span",{className:"query-text",children:['"',n,'"']})]})]}),E.jsx("div",{className:"web-search-body hide-scroll",children:E.jsx("div",{className:"web-results-grid",children:i.map((a,s)=>E.jsxs("div",{className:"web-result-card glass",children:[E.jsx("div",{className:"web-result-id",children:a.id}),E.jsxs("div",{className:"web-result-content",children:[E.jsx("h3",{className:"web-result-title",children:a.title}),E.jsx("p",{className:"web-result-snippet",children:a.snippet}),E.jsx("div",{className:"web-result-url",children:a.url})]}),a.image?E.jsx("div",{className:"web-result-image",style:{backgroundImage:`url('${a.image}')`}}):E.jsx("div",{className:"web-result-image-placeholder",children:"N/A"})]},s))})}),E.jsx("div",{className:"web-search-footer",children:E.jsx("span",{className:"pulsing-text",children:"EN ATTENTE DE SÉLECTION VOCALE..."})})]})})},zC=()=>{const[t,e]=he.useState([]),[n,i]=he.useState(""),a=he.useRef(null),s=he.useRef(null),r=he.useRef(null);he.useEffect(()=>{const c=Te.subscribe(d=>{d.lastUserMessage&&d.lastUserMessage!==s.current&&(s.current=d.lastUserMessage,e(p=>[...p,{text:d.lastUserMessage,sender:"user",id:Date.now()+"-u"}])),d.lastJarvisMessage&&d.lastJarvisMessage!==r.current&&(r.current=d.lastJarvisMessage,e(p=>[...p,{text:d.lastJarvisMessage,sender:"jarvis",id:Date.now()+"-j"}]))});return()=>c()},[]),he.useEffect(()=>{a.current&&(a.current.scrollTop=a.current.scrollHeight)},[t]);const o=()=>{const c=n.trim();c&&(ro.send("ui.text_input",{text:c}),i(""))},l=c=>{c.key==="Enter"&&o()};return E.jsxs("div",{className:"chat-container",children:[E.jsx("div",{className:"chat-box",ref:a,children:t.map(c=>E.jsx("div",{className:`msg ${c.sender}`,style:{animation:"slideUpFade 0.3s ease-out forwards"},children:c.text},c.id))}),E.jsxs("div",{className:"chat-footer",children:[E.jsx("input",{type:"text",className:"chat-input",placeholder:"ACCURATE INPUT COMMAND...",value:n,onChange:c=>i(c.target.value),onKeyDown:l}),E.jsx("button",{className:"chat-send-btn",onClick:o,children:"➤"})]})]})},HC=()=>{const[t,e]=he.useState([{text:"Initialisation du noyau visuel...",type:"system",id:"init",time:new Date().toLocaleTimeString()}]),n=he.useRef(null);he.useEffect(()=>{const a=s=>{const{text:r,type:o}=s.detail;e(l=>[...l,{text:r,type:o||"system",id:Date.now()+Math.random().toString(),time:new Date().toLocaleTimeString()}].slice(-100))};return window.addEventListener("terminal-log",a),()=>window.removeEventListener("terminal-log",a)},[]),he.useEffect(()=>{n.current&&(n.current.scrollTop=n.current.scrollHeight)},[t]);const i=({log:a})=>{const s=he.useRef(null);he.useEffect(()=>{s.current&&!s.current.dataset.decrypted&&(Ap(s.current,a.text,600),s.current.dataset.decrypted="true")},[a.text]);let r="inherit";return a.type==="info"&&(r="var(--primary)"),a.type==="success"&&(r="var(--text-accent)"),a.type==="error"&&(r="#ff4444"),E.jsxs("div",{className:`log-line ${a.type}`,children:[E.jsxs("span",{className:"log-time",style:{color:"var(--text-dim)",marginRight:"8px"},children:["[",a.time,"]"]}),E.jsx("span",{className:"log-msg",ref:s,style:{color:r}})]})};return E.jsxs("div",{className:"terminal glass",children:[E.jsx("div",{className:"glass-edge"}),E.jsxs("div",{className:"terminal-header",children:[E.jsx("span",{className:"terminal-title",children:"FLUX DE DONNÉES"}),E.jsxs("div",{className:"terminal-controls",children:[E.jsx("span",{className:"dot red"}),E.jsx("span",{className:"dot yellow"}),E.jsx("span",{className:"dot green"})]})]}),E.jsx("div",{className:"terminal-content",ref:n,children:t.map(a=>E.jsx(i,{log:a},a.id))})]})},GC=()=>{const[t,e]=he.useState(!1),[n,i]=he.useState("general"),[a,s]=he.useState(!1),[r,o]=he.useState([]),[l,c]=he.useState([]),[d,p]=he.useState(!1),[u,h]=he.useState({gemini_api_key:"",tavily_api_key:"",kokoro_voice:"",openweather_api_key:"",default_city:"",ui_theme:localStorage.getItem("jarvis_theme")||"default",vision_enabled:!1,camera_index:"0",proactive_enabled:!1,presence_check_interval:30,absence_threshold:60,system_monitor_interval:60,gmail_enabled:!1,wa_default_phone:"",wa_notify_on_alerts:!1,ha_url:"",ha_token:"",moonraker_url:"",bambu_ip:"",bambu_serial:"",bambu_access_code:"",google_maps_api_key:"",loc_home:"",loc_work:"",toast_enabled:!1}),g=he.useRef(null);he.useEffect(()=>{const A=()=>{e(!0),y()};return window.addEventListener("open-settings",A),()=>window.removeEventListener("open-settings",A)},[]),he.useEffect(()=>{t&&g.current&&(g.current.open||g.current.showModal())},[t]),he.useEffect(()=>{n==="memory"&&t&&f()},[n,t]);const y=async()=>{try{const A=await fetch("/api/settings");if(A.ok){const x=await A.json();h(T=>({...T,gemini_api_key:x._raw_gemini||"",tavily_api_key:x._raw_tavily||"",ha_token:x._raw_ha_token||"",kokoro_voice:x.kokoro_voice||"",openweather_api_key:x._raw_openweather||x.openweather_api_key||"",default_city:x.default_city||"",ui_theme:localStorage.getItem("jarvis_theme")||"default",vision_enabled:x.vision_enabled==="true"||x.vision_enabled===!0,camera_index:x.camera_index||"0",proactive_enabled:x.proactive_enabled==="true"||x.proactive_enabled===!0,presence_check_interval:x.presence_check_interval||30,absence_threshold:x.absence_threshold||60,system_monitor_interval:x.system_monitor_interval||60,gmail_enabled:x.gmail_enabled==="true"||x.gmail_enabled===!0,wa_default_phone:x.wa_default_phone||"",wa_notify_on_alerts:x.wa_notify_on_alerts==="true"||x.wa_notify_on_alerts===!0,ha_url:x.ha_url||"",moonraker_url:x.moonraker_url||"",bambu_ip:x.bambu_ip||"",bambu_serial:x.bambu_serial||"",bambu_access_code:x._raw_bambu_access_code||x.bambu_access_code||"",google_maps_api_key:x._raw_google_maps||x.google_maps_api_key||"",toast_enabled:x.toast_enabled==="true"||x.toast_enabled===!0})),_(x.kokoro_voice)}const R=await fetch("/api/settings/locations");if(R.ok){const x=await R.json();h(T=>({...T,loc_home:x.home||"",loc_work:x.work||""}))}}catch(A){console.error("Failed to load settings",A)}},_=async A=>{try{const R=await fetch("/api/voices");if(R.ok){const x=await R.json();c(x.voices||[])}}catch(R){console.error("Failed to load voices",R)}},f=async()=>{p(!0);try{const A=await fetch("/api/memory");if(A.ok){const R=await A.json();o(R||[])}else o([])}catch(A){console.error("Failed to load memory",A),o([])}finally{p(!1)}},m=async A=>{if(window.confirm(`OUBLIER : ${A} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(A)}`,{method:"DELETE"})).ok&&f()}catch(R){console.error("Failed to delete memory",R)}},v=A=>{const{name:R,value:x,type:T,checked:F}=A.target;h(D=>({...D,[R]:T==="checkbox"?F:x}))},M=async()=>{var x,T;s(!0);const A={...u},R={home:A.loc_home,work:A.loc_work};delete A.loc_home,delete A.loc_work;try{const F=await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)});if(F.ok){const D=A.ui_theme||"default";localStorage.setItem("jarvis_theme",D),document.documentElement.setAttribute("data-theme",D),await fetch("/api/settings/locations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)}),w()}else{const D=await F.json().catch(()=>({}));alert(`ERREUR DE DÉPLOIEMENT: ${((T=(x=D.detail)==null?void 0:x[0])==null?void 0:T.msg)||"Format invalide"}`)}}catch{alert("ÉCHEC LIAISON")}finally{s(!1)}},w=()=>{g.current&&g.current.close(),e(!1)};return t?E.jsx("dialog",{className:"settings-modal glass-modal",ref:g,onClose:()=>e(!1),children:E.jsxs("div",{className:"modal-content glass",children:[E.jsxs("div",{className:"modal-header",children:[E.jsxs("div",{className:"header-main",children:[E.jsx("span",{className:"status-dot online"}),E.jsx("h2",{children:"CORE CONFIGURATION // 0.3"})]}),E.jsxs("div",{className:"tab-controls",children:[E.jsx("button",{className:`tab-btn ${n==="general"?"active":""}`,onClick:()=>i("general"),children:"NEURAL & KEYS"}),E.jsx("button",{className:`tab-btn ${n==="interfaces"?"active":""}`,onClick:()=>i("interfaces"),children:"INTERFACES"}),E.jsx("button",{className:`tab-btn ${n==="advanced"?"active":""}`,onClick:()=>i("advanced"),children:"SYSTEM & IO"}),E.jsx("button",{className:`tab-btn ${n==="memory"?"active":""}`,onClick:()=>i("memory"),children:"MEMORY"})]})]}),E.jsxs("form",{id:"settings-form",className:"modal-body hide-scroll",onSubmit:A=>A.preventDefault(),children:[E.jsxs("div",{className:`tab-pane ${n==="general"?"active":""}`,children:[E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"AI SERVICES // SECURITY"}),E.jsxs("div",{className:"form-grid",children:[E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"GEMINI API KEY"}),E.jsx("input",{type:"password",name:"gemini_api_key",value:u.gemini_api_key,onChange:v,placeholder:"AIzaSy..."})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"TAVILY API KEY"}),E.jsx("input",{type:"password",name:"tavily_api_key",value:u.tavily_api_key,onChange:v,placeholder:"tvly-..."})]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"VOICE SYNTHESIS // LOCAL ENGINE"}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"KOKORO VOICE PROFILE"}),E.jsxs("select",{name:"kokoro_voice",value:u.kokoro_voice,onChange:v,children:[E.jsx("option",{value:"",children:"SCANNING VOICES..."}),l.map(A=>E.jsx("option",{value:A,children:A.toUpperCase()},A))]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"ENVIRONMENTAL DATA"}),E.jsxs("div",{className:"form-grid",children:[E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"OPENWEATHER API"}),E.jsx("input",{type:"password",name:"openweather_api_key",value:u.openweather_api_key,onChange:v})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"CITY / LOCATION"}),E.jsx("input",{type:"text",name:"default_city",value:u.default_city,onChange:v})]})]})]})]}),E.jsxs("div",{className:`tab-pane ${n==="interfaces"?"active":""}`,children:[E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"UI & ESTHÉTIQUE"}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"THÈME SYSTÈME"}),E.jsxs("select",{name:"ui_theme",value:u.ui_theme,onChange:v,children:[E.jsx("option",{value:"default",children:"SYSTÈME BLEU (ORIGINAL)"}),E.jsx("option",{value:"bronze",children:"BRONZE ÉLÉGANT (PREMIUM)"}),E.jsx("option",{value:"hacker",children:"HACKER AMBER (TERMINAL)"}),E.jsx("option",{value:"matrix",children:"SYSTÈME MATRIX (LEGACY)"})]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"VISION & BIOMETRICS"}),E.jsxs("div",{className:"toggle-group",children:[E.jsxs("label",{className:"toggle-label",children:[E.jsx("input",{type:"checkbox",name:"vision_enabled",checked:u.vision_enabled,onChange:v}),E.jsx("span",{children:"ENABLE COMPUTER VISION (OPENCV)"})]}),E.jsxs("div",{className:"input-field small",children:[E.jsx("label",{children:"CAM_ID"}),E.jsx("input",{type:"number",name:"camera_index",value:u.camera_index,onChange:v,min:"0",step:"1"})]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"PROACTIVE INTELLIGENCE"}),E.jsx("div",{className:"toggle-group",children:E.jsxs("label",{className:"toggle-label",children:[E.jsx("input",{type:"checkbox",name:"proactive_enabled",checked:u.proactive_enabled,onChange:v}),E.jsx("span",{children:"ENABLE PROACTIVE ACTIONS"})]})}),E.jsxs("div",{className:"form-grid",children:[E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"PRESENCE CHECK (SEC)"}),E.jsx("input",{type:"number",name:"presence_check_interval",value:u.presence_check_interval,onChange:v,min:"1"})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"ABSENCE THRESHOLD (SEC)"}),E.jsx("input",{type:"number",name:"absence_threshold",value:u.absence_threshold,onChange:v,min:"30"})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"SYS MONITOR (SEC)"}),E.jsx("input",{type:"number",name:"system_monitor_interval",value:u.system_monitor_interval,onChange:v,min:"10"})]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"MESSAGING & COMMS"}),E.jsx("div",{className:"toggle-group",children:E.jsxs("label",{className:"toggle-label",children:[E.jsx("input",{type:"checkbox",name:"gmail_enabled",checked:u.gmail_enabled,onChange:v}),E.jsx("span",{children:"GMAIL SYNC (OAUTH2)"})]})}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"WA DEFAULT RECIPIENT"}),E.jsx("input",{type:"text",name:"wa_default_phone",value:u.wa_default_phone,onChange:v,placeholder:"+33..."})]}),E.jsx("div",{className:"toggle-group",children:E.jsxs("label",{className:"toggle-label",children:[E.jsx("input",{type:"checkbox",name:"wa_notify_on_alerts",checked:u.wa_notify_on_alerts,onChange:v}),E.jsx("span",{children:"PROACTIVE WHATSAPP ALERTS"})]})})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"HOME AUTOMATION // HA LIAISON"}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"HA CORE URL"}),E.jsx("input",{type:"text",name:"ha_url",value:u.ha_url,onChange:v,placeholder:"http://192.168.x.x:8123"})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"LONG-LIVED TOKEN"}),E.jsx("input",{type:"password",name:"ha_token",value:u.ha_token,onChange:v})]})]})]}),E.jsxs("div",{className:`tab-pane ${n==="advanced"?"active":""}`,children:[E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"3D ADDITIVE MANUFACTURING"}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"MOONRAKER HOST (KLIPPER)"}),E.jsx("input",{type:"text",name:"moonraker_url",value:u.moonraker_url,onChange:v})]}),E.jsxs("div",{className:"form-grid",children:[E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"BAMBU IP"}),E.jsx("input",{type:"text",name:"bambu_ip",value:u.bambu_ip,onChange:v})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"BAMBU SERIAL"}),E.jsx("input",{type:"text",name:"bambu_serial",value:u.bambu_serial,onChange:v})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"ACCESS CODE"}),E.jsx("input",{type:"password",name:"bambu_access_code",value:u.bambu_access_code,onChange:v})]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"GEOINT SERVICES"}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"GOOGLE MAPS MATRIX API"}),E.jsx("input",{type:"password",name:"google_maps_api_key",value:u.google_maps_api_key,onChange:v})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"FAVORITE PLACES (MAPS)"}),E.jsxs("div",{className:"form-grid",children:[E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"🏠 MAISON (ADRESSE)"}),E.jsx("input",{type:"text",name:"loc_home",value:u.loc_home,onChange:v,placeholder:"123 rue de..."})]}),E.jsxs("div",{className:"input-field",children:[E.jsx("label",{children:"🏢 TRAVAIL (ADRESSE)"}),E.jsx("input",{type:"text",name:"loc_work",value:u.loc_work,onChange:v,placeholder:"Zone indus..."})]})]})]}),E.jsxs("div",{className:"form-section",children:[E.jsx("div",{className:"section-label",children:"NOTIFICATIONS"}),E.jsx("div",{className:"toggle-group",children:E.jsxs("label",{className:"toggle-label",children:[E.jsx("input",{type:"checkbox",name:"toast_enabled",checked:u.toast_enabled,onChange:v}),E.jsx("span",{children:"ENABLE SYSTEM TOASTS (WIN)"})]})})]})]}),E.jsx("div",{className:`tab-pane ${n==="memory"?"active":""}`,children:E.jsxs("div",{className:"memory-container hide-scroll",children:[E.jsx("div",{className:"section-label",children:"NEURAL DATABASE // LONG TERM MEMORY"}),E.jsx("div",{className:"memory-list",children:d?E.jsx("div",{className:"loader",children:"SYNCHRONISATION..."}):r.length===0?E.jsx("p",{className:"empty",children:"AUCUNE DONNÉE MÉMORISÉE"}):r.map(A=>E.jsxs("div",{className:"memory-item",children:[E.jsx("div",{className:"m-key",children:A.key}),E.jsx("div",{className:"m-val",children:A.value}),E.jsx("button",{type:"button",className:"m-del",onClick:()=>m(A.key),children:"✕"})]},A.key))})]})})]}),E.jsxs("div",{className:"modal-footer",children:[E.jsxs("div",{className:"tech-log",children:["LIAISON SERVEUR: ",E.jsx("span",{className:"v",children:"STABLE"})]}),E.jsxs("div",{className:"action-btns",children:[E.jsx("button",{type:"button",className:"btn-cancel close-btn",onClick:w,children:"REFUSER"}),E.jsx("button",{type:"button",className:"btn-confirm",onClick:M,children:a?"SYNCHRONISATION...":"DÉPLOYER CONFIGURATION"})]})]})]})}):null},VC=()=>{const[t,e]=he.useState("idle");return he.useEffect(()=>{const n=Te.subscribe(i=>{e(i.orbStatus||"idle")});return()=>{n()}},[]),E.jsx(DC,{mode:t,audioLevel:0,size:540})};function kC(){const[t,e]=he.useState(!0),[n,i]=he.useState(!1);he.useRef({}),he.useEffect(()=>{console.log("[REACT APP] Initialisation J.A.R.V.I.S 0.3...");const o=localStorage.getItem("jarvis_theme")||"default";document.documentElement.setAttribute("data-theme",o),document.body.classList.add("booting"),setTimeout(()=>{e(!1),document.body.classList.remove("booting"),window.dispatchEvent(new CustomEvent("terminal-log",{detail:{text:"SYSTÈME: INITIALISATION DES NOYAUX NEURAUX...",type:"info"}})),setTimeout(()=>window.dispatchEvent(new CustomEvent("terminal-log",{detail:{text:"SYSTÈME: CHARGEMENT DES PROTOCOLES DE VISION...",type:"info"}})),400),setTimeout(()=>window.dispatchEvent(new CustomEvent("terminal-log",{detail:{text:"SYSTÈME: CONNEXION AU BUS DE DONNÉES ÉTABLIE.",type:"success"}})),800)},1500);const l=()=>{hE.start(),window.removeEventListener("click",l)};window.addEventListener("click",l);let c=null,d="",p="";const u=Te.subscribe(g=>{i(g.sttEnabled);const y=(g.lastUserMessage||"").toLowerCase(),_=g.lastUserMessage&&g.lastUserMessage!==d;g.travelInfo&&g.travelInfo!==c&&(c=g.travelInfo,p=g.lastUserMessage),g.visionData&&(Te.getState().visionData||(p=g.lastUserMessage)),g.emailData&&(Te.getState().emailData||(p=g.lastUserMessage)),g.calendarInfo&&g.calendarInfo.status==="success"&&!g.calendarInfo.confirmRequired&&setTimeout(()=>Te.setState({calendarInfo:null}),1e4);const f=["ferme","fermez","fermer","c'est bon","annule","quitter","merci jarvis"],m=["vision","image","photo","mail","courrier","message","fenêtre","celui-là"],v=f.some(A=>y.includes(A)),M=m.some(A=>y.includes(A));_&&(v&&M||y.includes("c'est bon")||y.includes("ça suffit"))?(Te.setState({visionData:null}),Te.setState({emailData:null}),Te.setState({travelInfo:null}),Te.setState({printData:{moonraker:null,bambu:null}}),d=g.lastUserMessage):_&&g.lastUserMessage!==p&&(Te.setState({visionData:null}),Te.setState({emailData:null}),Te.setState({travelInfo:null}),Te.setState({printData:{moonraker:null,bambu:null}})),g.lastUserMessage&&(d=g.lastUserMessage)});return ro.connect(),(()=>{document.querySelectorAll(".terminal-title, .section-label, h2, .label-id, .logo-text").forEach(g=>{Ap(g,g.innerText,800)})})(),()=>{u(),window.removeEventListener("click",l)}},[]);const a=()=>{const o=!n;Te.setState({sttEnabled:o}),window.dispatchEvent(new CustomEvent("terminal-log",{detail:{text:`SYSTÈME: ${o?"ACTIVATION":"DÉSACTIVATION"} DE L'ÉCOUTE...`,type:o?"success":"error"}})),o?ro.send("audio.start_stt"):(ro.send("audio.stop_stt"),Te.setState({orbStatus:"idle"}))},s=()=>{window.dispatchEvent(new CustomEvent("terminal-log",{detail:{text:"SYSTÈME: PROCÉDURE DE FERMETURE ÉTABLIE.",type:"error"}})),ro.send("system.shutdown"),document.body.style.pointerEvents="none",setTimeout(()=>{window.close(),document.body.innerHTML="<div style='color:var(--primary); font-family:var(--font-mono); display:flex; height:100vh; width:100vw; align-items:center; justify-content:center; background:#000;'>SYSTEM OFFLINE</div>"},2e3)},r=()=>{window.dispatchEvent(new CustomEvent("open-settings"))};return E.jsx(E.Fragment,{children:E.jsxs("div",{id:"app",className:"app-layout",children:[E.jsx(NC,{}),E.jsxs("aside",{className:"stage-left",children:[E.jsxs("div",{id:"analytics-mount",className:"glass",children:[E.jsx("div",{className:"card-header",children:"CORE TELEMETRY"}),E.jsxs("div",{className:"card-body",children:[E.jsxs("div",{className:"metric",children:["CPU ",E.jsx("span",{className:"v",children:"08.2%"})]}),E.jsxs("div",{className:"metric",children:["MEM ",E.jsx("span",{className:"v",children:"1.4 GB"})]}),E.jsxs("div",{className:"metric",children:["LAT ",E.jsx("span",{className:"v",children:"12 ms"})]})]}),E.jsxs("button",{className:"btn-glass",onClick:r,style:{width:"95%",margin:"10px auto",display:"block"},children:[E.jsx("span",{className:"btn-icon",children:"⚙️"}),E.jsx("span",{className:"btn-text",children:"SYSTÈME PROFIL"})]})]}),E.jsx(UC,{}),E.jsx(OC,{}),E.jsx(LC,{})]}),E.jsx("main",{id:"orb-mount",className:"orb-mount",children:E.jsx(VC,{})}),E.jsxs("aside",{className:"stage-right",children:[E.jsx(HC,{}),E.jsx(zC,{})]}),E.jsx(GC,{}),E.jsx(BC,{}),E.jsxs("div",{className:"center-widgets-container",children:[E.jsx(PC,{}),E.jsx(FC,{}),E.jsx(IC,{})]}),E.jsxs("div",{className:"system-controls",children:[E.jsx("button",{className:`btn-ctrl ${n?"":"muted"}`,onClick:a,title:"Toggle Micro",children:E.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),E.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"})]})}),E.jsx("button",{className:"btn-ctrl power",onClick:s,title:"Close App",children:E.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"})})})]})]})})}const x_=document.getElementById("root");x_?cE.createRoot(x_).render(E.jsx(DS.StrictMode,{children:E.jsx(kC,{})})):console.error("Impossible de trouver la div #root pour attacher l'application React J.A.R.V.I.S.");

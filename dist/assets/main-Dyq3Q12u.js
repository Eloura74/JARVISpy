var lS=Object.defineProperty;var cS=(e,t,n)=>t in e?lS(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var zr=(e,t,n)=>cS(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();class uS{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null},audioLevel:0},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const ze=new uS;class fS{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",n=window.location.host,i=`${t}//${n}/ws`;console.log(`[WS] Tentative de connexion à ${i}...`),this.ws=new WebSocket(i),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,ze.setState({connection:"online"})},this.ws.onmessage=a=>{try{const s=JSON.parse(a.data);this.handleMessage(s)}catch(s){console.error("[WS] Erreur parsing message:",s)}},this.ws.onclose=()=>{ze.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=a=>{console.error("[WS] Erreur:",a)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const n=t.event,i=t.data||{};if(n)switch(n){case"audio.speech_recognized":ze.setState({lastUserMessage:i.text,orbStatus:"thinking"});break;case"brain.thinking":ze.setState({brainStatus:i.status?"Analyse...":"En veille",orbStatus:i.status?"thinking":"idle"});break;case"brain.response_generated":ze.setState({lastJarvisMessage:i.text});break;case"audio.tts_started":ze.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":ze.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;case"ui.show_web_results":ze.setState({webSearchResults:i});break;case"ui.hide_web_results":ze.setState({webSearchResults:null});break;default:console.debug(`[WS Event] ${n}`,i)}}send(t,n={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:n}))}addInternalLog(t,n){console.log(`[SYSTEM] ${t}`)}}const g0=new fS;class hS{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
      <div class="status-bar glass">
        <div class="status-logo">
           <div class="mini-reactor"></div>
           <span class="logo-text">J.A.R.V.I.S. <span class="v">0.2</span></span>
        </div>
        
        <div class="status-items">
          <div class="status-item" id="stat-conn">
            <span class="val">OFFLINE</span>
            <span class="label">UPLINK</span>
          </div>
          <div class="status-item" id="stat-brain">
            <span class="val">IDLE</span>
            <span class="label">NEURAL NET</span>
          </div>
          <div class="status-item" id="stat-tts">
            <span class="val">INACTIVE</span>
            <span class="label">VOCAL LINK</span>
          </div>
        </div>
      </div>
    `}init(){const t=this.container.querySelector("#stat-conn .val"),n=this.container.querySelector("#stat-brain .val"),i=this.container.querySelector("#stat-tts .val");ze.subscribe(a=>{t.textContent=a.connection.toUpperCase(),t.className=`val ${a.connection}`,n.textContent=a.brainStatus.toUpperCase(),n.className=`val ${a.orbStatus}`,i.textContent=a.ttsStatus.toUpperCase(),i.className=`val ${a.ttsStatus==="Actif"?"active":""}`})}}var _0={exports:{}},Wc={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dS=Symbol.for("react.transitional.element"),pS=Symbol.for("react.fragment");function v0(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:dS,type:e,key:i,ref:t!==void 0?t:null,props:n}}Wc.Fragment=pS;Wc.jsx=v0;Wc.jsxs=v0;_0.exports=Wc;var to=_0.exports,x0={exports:{}},qc={},S0={exports:{}},M0={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(U,L){var X=U.length;U.push(L);t:for(;0<X;){var j=X-1>>>1,et=U[j];if(0<a(et,L))U[j]=L,U[X]=et,X=j;else break t}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var L=U[0],X=U.pop();if(X!==L){U[0]=X;t:for(var j=0,et=U.length,dt=et>>>1;j<dt;){var ft=2*(j+1)-1,Dt=U[ft],Kt=ft+1,ee=U[Kt];if(0>a(Dt,X))Kt<et&&0>a(ee,Dt)?(U[j]=ee,U[Kt]=X,j=Kt):(U[j]=Dt,U[ft]=X,j=ft);else if(Kt<et&&0>a(ee,X))U[j]=ee,U[Kt]=X,j=Kt;else break t}}return L}function a(U,L){var X=U.sortIndex-L.sortIndex;return X!==0?X:U.id-L.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();e.unstable_now=function(){return r.now()-o}}var l=[],c=[],h=1,p=null,u=3,d=!1,_=!1,y=!1,g=!1,f=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;function S(U){for(var L=n(c);L!==null;){if(L.callback===null)i(c);else if(L.startTime<=U)i(c),L.sortIndex=L.expirationTime,t(l,L);else break;L=n(c)}}function R(U){if(y=!1,S(U),!_)if(n(l)!==null)_=!0,C||(C=!0,B());else{var L=n(c);L!==null&&H(R,L.startTime-U)}}var C=!1,A=-1,M=5,b=-1;function F(){return g?!0:!(e.unstable_now()-b<M)}function w(){if(g=!1,C){var U=e.unstable_now();b=U;var L=!0;try{t:{_=!1,y&&(y=!1,m(A),A=-1),d=!0;var X=u;try{e:{for(S(U),p=n(l);p!==null&&!(p.expirationTime>U&&F());){var j=p.callback;if(typeof j=="function"){p.callback=null,u=p.priorityLevel;var et=j(p.expirationTime<=U);if(U=e.unstable_now(),typeof et=="function"){p.callback=et,S(U),L=!0;break e}p===n(l)&&i(l),S(U)}else i(l);p=n(l)}if(p!==null)L=!0;else{var dt=n(c);dt!==null&&H(R,dt.startTime-U),L=!1}}break t}finally{p=null,u=X,d=!1}L=void 0}}finally{L?B():C=!1}}}var B;if(typeof v=="function")B=function(){v(w)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,q=V.port2;V.port1.onmessage=w,B=function(){q.postMessage(null)}}else B=function(){f(w,0)};function H(U,L){A=f(function(){U(e.unstable_now())},L)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(U){U.callback=null},e.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<U?Math.floor(1e3/U):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_next=function(U){switch(u){case 1:case 2:case 3:var L=3;break;default:L=u}var X=u;u=L;try{return U()}finally{u=X}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(U,L){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var X=u;u=U;try{return L()}finally{u=X}},e.unstable_scheduleCallback=function(U,L,X){var j=e.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?j+X:j):X=j,U){case 1:var et=-1;break;case 2:et=250;break;case 5:et=1073741823;break;case 4:et=1e4;break;default:et=5e3}return et=X+et,U={id:h++,callback:L,priorityLevel:U,startTime:X,expirationTime:et,sortIndex:-1},X>j?(U.sortIndex=X,t(c,U),n(l)===null&&U===n(c)&&(y?(m(A),A=-1):y=!0,H(R,X-j))):(U.sortIndex=et,t(l,U),_||d||(_=!0,C||(C=!0,B()))),U},e.unstable_shouldYield=F,e.unstable_wrapCallback=function(U){var L=u;return function(){var X=u;u=L;try{return U.apply(this,arguments)}finally{u=X}}}})(M0);S0.exports=M0;var mS=S0.exports,y0={exports:{}},Nt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bd=Symbol.for("react.transitional.element"),gS=Symbol.for("react.portal"),_S=Symbol.for("react.fragment"),vS=Symbol.for("react.strict_mode"),xS=Symbol.for("react.profiler"),SS=Symbol.for("react.consumer"),MS=Symbol.for("react.context"),yS=Symbol.for("react.forward_ref"),ES=Symbol.for("react.suspense"),bS=Symbol.for("react.memo"),E0=Symbol.for("react.lazy"),TS=Symbol.for("react.activity"),Xp=Symbol.iterator;function AS(e){return e===null||typeof e!="object"?null:(e=Xp&&e[Xp]||e["@@iterator"],typeof e=="function"?e:null)}var b0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T0=Object.assign,A0={};function Cr(e,t,n){this.props=e,this.context=t,this.refs=A0,this.updater=n||b0}Cr.prototype.isReactComponent={};Cr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Cr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function R0(){}R0.prototype=Cr.prototype;function Td(e,t,n){this.props=e,this.context=t,this.refs=A0,this.updater=n||b0}var Ad=Td.prototype=new R0;Ad.constructor=Td;T0(Ad,Cr.prototype);Ad.isPureReactComponent=!0;var Wp=Array.isArray;function Of(){}var Me={H:null,A:null,T:null,S:null},C0=Object.prototype.hasOwnProperty;function Rd(e,t,n){var i=n.ref;return{$$typeof:bd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function RS(e,t){return Rd(e.type,t,e.props)}function Cd(e){return typeof e=="object"&&e!==null&&e.$$typeof===bd}function CS(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var qp=/\/+/g;function _u(e,t){return typeof e=="object"&&e!==null&&e.key!=null?CS(""+e.key):t.toString(36)}function wS(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Of,Of):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Vs(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case bd:case gS:r=!0;break;case E0:return r=e._init,Vs(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+_u(e,0):i,Wp(a)?(n="",r!=null&&(n=r.replace(qp,"$&/")+"/"),Vs(a,t,n,"",function(c){return c})):a!=null&&(Cd(a)&&(a=RS(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(qp,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(Wp(e))for(var l=0;l<e.length;l++)i=e[l],s=o+_u(i,l),r+=Vs(i,t,n,s,a);else if(l=AS(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+_u(i,l++),r+=Vs(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return Vs(wS(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function al(e,t,n){if(e==null)return e;var i=[],a=0;return Vs(e,i,"","",function(s){return t.call(n,s,a++)}),i}function DS(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Yp=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},US={map:al,forEach:function(e,t,n){al(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return al(e,function(){t++}),t},toArray:function(e){return al(e,function(t){return t})||[]},only:function(e){if(!Cd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Nt.Activity=TS;Nt.Children=US;Nt.Component=Cr;Nt.Fragment=_S;Nt.Profiler=xS;Nt.PureComponent=Td;Nt.StrictMode=vS;Nt.Suspense=ES;Nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Me;Nt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Me.H.useMemoCache(e)}};Nt.cache=function(e){return function(){return e.apply(null,arguments)}};Nt.cacheSignal=function(){return null};Nt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=T0({},e.props),a=e.key;if(t!=null)for(s in t.key!==void 0&&(a=""+t.key),t)!C0.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(i[s]=t[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Rd(e.type,a,i)};Nt.createContext=function(e){return e={$$typeof:MS,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:SS,_context:e},e};Nt.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)C0.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Rd(e,s,a)};Nt.createRef=function(){return{current:null}};Nt.forwardRef=function(e){return{$$typeof:yS,render:e}};Nt.isValidElement=Cd;Nt.lazy=function(e){return{$$typeof:E0,_payload:{_status:-1,_result:e},_init:DS}};Nt.memo=function(e,t){return{$$typeof:bS,type:e,compare:t===void 0?null:t}};Nt.startTransition=function(e){var t=Me.T,n={};Me.T=n;try{var i=e(),a=Me.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Of,Yp)}catch(s){Yp(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),Me.T=t}};Nt.unstable_useCacheRefresh=function(){return Me.H.useCacheRefresh()};Nt.use=function(e){return Me.H.use(e)};Nt.useActionState=function(e,t,n){return Me.H.useActionState(e,t,n)};Nt.useCallback=function(e,t){return Me.H.useCallback(e,t)};Nt.useContext=function(e){return Me.H.useContext(e)};Nt.useDebugValue=function(){};Nt.useDeferredValue=function(e,t){return Me.H.useDeferredValue(e,t)};Nt.useEffect=function(e,t){return Me.H.useEffect(e,t)};Nt.useEffectEvent=function(e){return Me.H.useEffectEvent(e)};Nt.useId=function(){return Me.H.useId()};Nt.useImperativeHandle=function(e,t,n){return Me.H.useImperativeHandle(e,t,n)};Nt.useInsertionEffect=function(e,t){return Me.H.useInsertionEffect(e,t)};Nt.useLayoutEffect=function(e,t){return Me.H.useLayoutEffect(e,t)};Nt.useMemo=function(e,t){return Me.H.useMemo(e,t)};Nt.useOptimistic=function(e,t){return Me.H.useOptimistic(e,t)};Nt.useReducer=function(e,t,n){return Me.H.useReducer(e,t,n)};Nt.useRef=function(e){return Me.H.useRef(e)};Nt.useState=function(e){return Me.H.useState(e)};Nt.useSyncExternalStore=function(e,t,n){return Me.H.useSyncExternalStore(e,t,n)};Nt.useTransition=function(){return Me.H.useTransition()};Nt.version="19.2.4";y0.exports=Nt;var Rn=y0.exports,w0={exports:{}},hn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var LS=Rn;function D0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function la(){}var un={d:{f:la,r:function(){throw Error(D0(522))},D:la,C:la,L:la,m:la,X:la,S:la,M:la},p:0,findDOMNode:null},NS=Symbol.for("react.portal");function OS(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:NS,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var lo=LS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Yc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=un;hn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(D0(299));return OS(e,t,null,n)};hn.flushSync=function(e){var t=lo.T,n=un.p;try{if(lo.T=null,un.p=2,e)return e()}finally{lo.T=t,un.p=n,un.d.f()}};hn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,un.d.C(e,t))};hn.prefetchDNS=function(e){typeof e=="string"&&un.d.D(e)};hn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Yc(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?un.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&un.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};hn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Yc(t.as,t.crossOrigin);un.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&un.d.M(e)};hn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Yc(n,t.crossOrigin);un.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};hn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Yc(t.as,t.crossOrigin);un.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else un.d.m(e)};hn.requestFormReset=function(e){un.d.r(e)};hn.unstable_batchedUpdates=function(e,t){return e(t)};hn.useFormState=function(e,t,n){return lo.H.useFormState(e,t,n)};hn.useFormStatus=function(){return lo.H.useHostTransitionStatus()};hn.version="19.2.4";function U0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(U0)}catch(e){console.error(e)}}U0(),w0.exports=hn;var PS=w0.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ge=mS,L0=Rn,IS=PS;function Q(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function N0(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ho(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function O0(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function P0(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Zp(e){if(Ho(e)!==e)throw Error(Q(188))}function FS(e){var t=e.alternate;if(!t){if(t=Ho(e),t===null)throw Error(Q(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return Zp(a),e;if(s===i)return Zp(a),t;s=s.sibling}throw Error(Q(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(Q(189))}}if(n.alternate!==i)throw Error(Q(190))}if(n.tag!==3)throw Error(Q(188));return n.stateNode.current===n?e:t}function I0(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=I0(e),t!==null)return t;e=e.sibling}return null}var ye=Object.assign,BS=Symbol.for("react.element"),sl=Symbol.for("react.transitional.element"),eo=Symbol.for("react.portal"),Ws=Symbol.for("react.fragment"),F0=Symbol.for("react.strict_mode"),Pf=Symbol.for("react.profiler"),B0=Symbol.for("react.consumer"),Hi=Symbol.for("react.context"),wd=Symbol.for("react.forward_ref"),If=Symbol.for("react.suspense"),Ff=Symbol.for("react.suspense_list"),Dd=Symbol.for("react.memo"),ma=Symbol.for("react.lazy"),Bf=Symbol.for("react.activity"),zS=Symbol.for("react.memo_cache_sentinel"),jp=Symbol.iterator;function Hr(e){return e===null||typeof e!="object"?null:(e=jp&&e[jp]||e["@@iterator"],typeof e=="function"?e:null)}var HS=Symbol.for("react.client.reference");function zf(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===HS?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ws:return"Fragment";case Pf:return"Profiler";case F0:return"StrictMode";case If:return"Suspense";case Ff:return"SuspenseList";case Bf:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case eo:return"Portal";case Hi:return e.displayName||"Context";case B0:return(e._context.displayName||"Context")+".Consumer";case wd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Dd:return t=e.displayName||null,t!==null?t:zf(e.type)||"Memo";case ma:t=e._payload,e=e._init;try{return zf(e(t))}catch{}}return null}var no=Array.isArray,Ct=L0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te=IS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ls={pending:!1,data:null,method:null,action:null},Hf=[],qs=-1;function Ei(e){return{current:e}}function je(e){0>qs||(e.current=Hf[qs],Hf[qs]=null,qs--)}function ve(e,t){qs++,Hf[qs]=e.current,e.current=t}var xi=Ei(null),Eo=Ei(null),Ca=Ei(null),hc=Ei(null);function dc(e,t){switch(ve(Ca,t),ve(Eo,e),ve(xi,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?eg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=eg(t),e=ax(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}je(xi),ve(xi,e)}function hr(){je(xi),je(Eo),je(Ca)}function Gf(e){e.memoizedState!==null&&ve(hc,e);var t=xi.current,n=ax(t,e.type);t!==n&&(ve(Eo,e),ve(xi,n))}function pc(e){Eo.current===e&&(je(xi),je(Eo)),hc.current===e&&(je(hc),Oo._currentValue=ls)}var vu,Kp;function $a(e){if(vu===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);vu=t&&t[1]||"",Kp=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+vu+e+Kp}var xu=!1;function Su(e,t){if(!e||xu)return"";xu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(d){var u=d}Reflect.construct(e,[],p)}else{try{p.call()}catch(d){u=d}e.call(p.prototype)}}else{try{throw Error()}catch(d){u=d}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(d){if(d&&u&&typeof d.stack=="string")return[d.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var h=`
`+l[i].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=i&&0<=a);break}}}finally{xu=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?$a(n):""}function GS(e,t){switch(e.tag){case 26:case 27:case 5:return $a(e.type);case 16:return $a("Lazy");case 13:return e.child!==t&&t!==null?$a("Suspense Fallback"):$a("Suspense");case 19:return $a("SuspenseList");case 0:case 15:return Su(e.type,!1);case 11:return Su(e.type.render,!1);case 1:return Su(e.type,!0);case 31:return $a("Activity");default:return""}}function Qp(e){try{var t="",n=null;do t+=GS(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Vf=Object.prototype.hasOwnProperty,Ud=Ge.unstable_scheduleCallback,Mu=Ge.unstable_cancelCallback,VS=Ge.unstable_shouldYield,kS=Ge.unstable_requestPaint,Ln=Ge.unstable_now,XS=Ge.unstable_getCurrentPriorityLevel,z0=Ge.unstable_ImmediatePriority,H0=Ge.unstable_UserBlockingPriority,mc=Ge.unstable_NormalPriority,WS=Ge.unstable_LowPriority,G0=Ge.unstable_IdlePriority,qS=Ge.log,YS=Ge.unstable_setDisableYieldValue,Go=null,Nn=null;function ya(e){if(typeof qS=="function"&&YS(e),Nn&&typeof Nn.setStrictMode=="function")try{Nn.setStrictMode(Go,e)}catch{}}var On=Math.clz32?Math.clz32:KS,ZS=Math.log,jS=Math.LN2;function KS(e){return e>>>=0,e===0?32:31-(ZS(e)/jS|0)|0}var rl=256,ol=262144,ll=4194304;function ts(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Zc(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=ts(i):(r&=o,r!==0?a=ts(r):n||(n=o&~e,n!==0&&(a=ts(n))))):(o=i&~s,o!==0?a=ts(o):r!==0?a=ts(r):n||(n=i&~e,n!==0&&(a=ts(n)))),a===0?0:t!==0&&t!==a&&!(t&s)&&(s=a&-a,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:a}function Vo(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function QS(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function V0(){var e=ll;return ll<<=1,!(ll&62914560)&&(ll=4194304),e}function yu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ko(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function JS(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var h=31-On(n),p=1<<h;o[h]=0,l[h]=-1;var u=c[h];if(u!==null)for(c[h]=null,h=0;h<u.length;h++){var d=u[h];d!==null&&(d.lane&=-536870913)}n&=~p}i!==0&&k0(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function k0(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-On(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function X0(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-On(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function W0(e,t){var n=t&-t;return n=n&42?1:Ld(n),n&(e.suspendedLanes|t)?0:n}function Ld(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Nd(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function q0(){var e=te.p;return e!==0?e:(e=window.event,e===void 0?32:mx(e.type))}function Jp(e,t){var n=te.p;try{return te.p=e,t()}finally{te.p=n}}var Va=Math.random().toString(36).slice(2),Je="__reactFiber$"+Va,yn="__reactProps$"+Va,wr="__reactContainer$"+Va,kf="__reactEvents$"+Va,$S="__reactListeners$"+Va,tM="__reactHandles$"+Va,$p="__reactResources$"+Va,Xo="__reactMarker$"+Va;function Od(e){delete e[Je],delete e[yn],delete e[kf],delete e[$S],delete e[tM]}function Ys(e){var t=e[Je];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wr]||n[Je]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=rg(e);e!==null;){if(n=e[Je])return n;e=rg(e)}return t}e=n,n=e.parentNode}return null}function Dr(e){if(e=e[Je]||e[wr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function io(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(Q(33))}function ir(e){var t=e[$p];return t||(t=e[$p]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ze(e){e[Xo]=!0}var Y0=new Set,Z0={};function xs(e,t){dr(e,t),dr(e+"Capture",t)}function dr(e,t){for(Z0[e]=t,e=0;e<t.length;e++)Y0.add(t[e])}var eM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),tm={},em={};function nM(e){return Vf.call(em,e)?!0:Vf.call(tm,e)?!1:eM.test(e)?em[e]=!0:(tm[e]=!0,!1)}function Wl(e,t,n){if(nM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function cl(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Ri(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Gn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function j0(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function iM(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xf(e){if(!e._valueTracker){var t=j0(e)?"checked":"value";e._valueTracker=iM(e,t,""+e[t])}}function K0(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=j0(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function gc(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var aM=/[\n"\\]/g;function Wn(e){return e.replace(aM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Wf(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Gn(t)):e.value!==""+Gn(t)&&(e.value=""+Gn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?qf(e,r,Gn(t)):n!=null?qf(e,r,Gn(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Gn(o):e.removeAttribute("name")}function Q0(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){Xf(e);return}n=n!=null?""+Gn(n):"",t=t!=null?""+Gn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Xf(e)}function qf(e,t,n){t==="number"&&gc(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function ar(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Gn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function J0(e,t,n){if(t!=null&&(t=""+Gn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Gn(n):""}function $0(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(Q(92));if(no(i)){if(1<i.length)throw Error(Q(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Gn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Xf(e)}function pr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var sM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function nm(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||sM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function t_(e,t,n){if(t!=null&&typeof t!="object")throw Error(Q(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&nm(e,a,i)}else for(var s in t)t.hasOwnProperty(s)&&nm(e,s,t[s])}function Pd(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var rM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),oM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ql(e){return oM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Gi(){}var Yf=null;function Id(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zs=null,sr=null;function im(e){var t=Dr(e);if(t&&(e=t.stateNode)){var n=e[yn]||null;t:switch(e=t.stateNode,t.type){case"input":if(Wf(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Wn(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[yn]||null;if(!a)throw Error(Q(90));Wf(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&K0(i)}break t;case"textarea":J0(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&ar(e,!!n.multiple,t,!1)}}}var Eu=!1;function e_(e,t,n){if(Eu)return e(t,n);Eu=!0;try{var i=e(t);return i}finally{if(Eu=!1,(Zs!==null||sr!==null)&&(ru(),Zs&&(t=Zs,e=sr,sr=Zs=null,im(t),e)))for(t=0;t<e.length;t++)im(e[t])}}function bo(e,t){var n=e.stateNode;if(n===null)return null;var i=n[yn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Q(231,t,typeof n));return n}var Ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zf=!1;if(Ki)try{var Gr={};Object.defineProperty(Gr,"passive",{get:function(){Zf=!0}}),window.addEventListener("test",Gr,Gr),window.removeEventListener("test",Gr,Gr)}catch{Zf=!1}var Ea=null,Fd=null,Yl=null;function n_(){if(Yl)return Yl;var e,t=Fd,n=t.length,i,a="value"in Ea?Ea.value:Ea.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return Yl=a.slice(e,1<i?1-i:void 0)}function Zl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ul(){return!0}function am(){return!1}function En(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ul:am,this.isPropagationStopped=am,this}return ye(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ul)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ul)},persist:function(){},isPersistent:ul}),t}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},jc=En(Ss),Wo=ye({},Ss,{view:0,detail:0}),lM=En(Wo),bu,Tu,Vr,Kc=ye({},Wo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bd,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Vr&&(Vr&&e.type==="mousemove"?(bu=e.screenX-Vr.screenX,Tu=e.screenY-Vr.screenY):Tu=bu=0,Vr=e),bu)},movementY:function(e){return"movementY"in e?e.movementY:Tu}}),sm=En(Kc),cM=ye({},Kc,{dataTransfer:0}),uM=En(cM),fM=ye({},Wo,{relatedTarget:0}),Au=En(fM),hM=ye({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),dM=En(hM),pM=ye({},Ss,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mM=En(pM),gM=ye({},Ss,{data:0}),rm=En(gM),_M={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function SM(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=xM[e])?!!t[e]:!1}function Bd(){return SM}var MM=ye({},Wo,{key:function(e){if(e.key){var t=_M[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Zl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?vM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bd,charCode:function(e){return e.type==="keypress"?Zl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),yM=En(MM),EM=ye({},Kc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),om=En(EM),bM=ye({},Wo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bd}),TM=En(bM),AM=ye({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),RM=En(AM),CM=ye({},Kc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wM=En(CM),DM=ye({},Ss,{newState:0,oldState:0}),UM=En(DM),LM=[9,13,27,32],zd=Ki&&"CompositionEvent"in window,co=null;Ki&&"documentMode"in document&&(co=document.documentMode);var NM=Ki&&"TextEvent"in window&&!co,i_=Ki&&(!zd||co&&8<co&&11>=co),lm=" ",cm=!1;function a_(e,t){switch(e){case"keyup":return LM.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function s_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var js=!1;function OM(e,t){switch(e){case"compositionend":return s_(t);case"keypress":return t.which!==32?null:(cm=!0,lm);case"textInput":return e=t.data,e===lm&&cm?null:e;default:return null}}function PM(e,t){if(js)return e==="compositionend"||!zd&&a_(e,t)?(e=n_(),Yl=Fd=Ea=null,js=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return i_&&t.locale!=="ko"?null:t.data;default:return null}}var IM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function um(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!IM[e.type]:t==="textarea"}function r_(e,t,n,i){Zs?sr?sr.push(i):sr=[i]:Zs=i,t=Oc(t,"onChange"),0<t.length&&(n=new jc("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var uo=null,To=null;function FM(e){ex(e,0)}function Qc(e){var t=io(e);if(K0(t))return e}function fm(e,t){if(e==="change")return t}var o_=!1;if(Ki){var Ru;if(Ki){var Cu="oninput"in document;if(!Cu){var hm=document.createElement("div");hm.setAttribute("oninput","return;"),Cu=typeof hm.oninput=="function"}Ru=Cu}else Ru=!1;o_=Ru&&(!document.documentMode||9<document.documentMode)}function dm(){uo&&(uo.detachEvent("onpropertychange",l_),To=uo=null)}function l_(e){if(e.propertyName==="value"&&Qc(To)){var t=[];r_(t,To,e,Id(e)),e_(FM,t)}}function BM(e,t,n){e==="focusin"?(dm(),uo=t,To=n,uo.attachEvent("onpropertychange",l_)):e==="focusout"&&dm()}function zM(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Qc(To)}function HM(e,t){if(e==="click")return Qc(t)}function GM(e,t){if(e==="input"||e==="change")return Qc(t)}function VM(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var In=typeof Object.is=="function"?Object.is:VM;function Ao(e,t){if(In(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!Vf.call(t,a)||!In(e[a],t[a]))return!1}return!0}function pm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function mm(e,t){var n=pm(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=pm(n)}}function c_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?c_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function u_(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=gc(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=gc(e.document)}return t}function Hd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var kM=Ki&&"documentMode"in document&&11>=document.documentMode,Ks=null,jf=null,fo=null,Kf=!1;function gm(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Kf||Ks==null||Ks!==gc(i)||(i=Ks,"selectionStart"in i&&Hd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),fo&&Ao(fo,i)||(fo=i,i=Oc(jf,"onSelect"),0<i.length&&(t=new jc("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Ks)))}function qa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Qs={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionrun:qa("Transition","TransitionRun"),transitionstart:qa("Transition","TransitionStart"),transitioncancel:qa("Transition","TransitionCancel"),transitionend:qa("Transition","TransitionEnd")},wu={},f_={};Ki&&(f_=document.createElement("div").style,"AnimationEvent"in window||(delete Qs.animationend.animation,delete Qs.animationiteration.animation,delete Qs.animationstart.animation),"TransitionEvent"in window||delete Qs.transitionend.transition);function Ms(e){if(wu[e])return wu[e];if(!Qs[e])return e;var t=Qs[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in f_)return wu[e]=t[n];return e}var h_=Ms("animationend"),d_=Ms("animationiteration"),p_=Ms("animationstart"),XM=Ms("transitionrun"),WM=Ms("transitionstart"),qM=Ms("transitioncancel"),m_=Ms("transitionend"),g_=new Map,Qf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Qf.push("scrollEnd");function oi(e,t){g_.set(e,t),xs(t,[e])}var _c=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},zn=[],Js=0,Gd=0;function Jc(){for(var e=Js,t=Gd=Js=0;t<e;){var n=zn[t];zn[t++]=null;var i=zn[t];zn[t++]=null;var a=zn[t];zn[t++]=null;var s=zn[t];if(zn[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&__(n,a,s)}}function $c(e,t,n,i){zn[Js++]=e,zn[Js++]=t,zn[Js++]=n,zn[Js++]=i,Gd|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Vd(e,t,n,i){return $c(e,t,n,i),vc(e)}function ys(e,t){return $c(e,null,null,t),vc(e)}function __(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,a&&t!==null&&(a=31-On(n),e=s.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),s):null}function vc(e){if(50<Mo)throw Mo=0,vh=null,Error(Q(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var $s={};function YM(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Dn(e,t,n,i){return new YM(e,t,n,i)}function kd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xi(e,t){var n=e.alternate;return n===null?(n=Dn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function v_(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function jl(e,t,n,i,a,s){var r=0;if(i=e,typeof e=="function")kd(e)&&(r=1);else if(typeof e=="string")r=Jy(e,n,xi.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Bf:return e=Dn(31,n,t,a),e.elementType=Bf,e.lanes=s,e;case Ws:return cs(n.children,a,s,t);case F0:r=8,a|=24;break;case Pf:return e=Dn(12,n,t,a|2),e.elementType=Pf,e.lanes=s,e;case If:return e=Dn(13,n,t,a),e.elementType=If,e.lanes=s,e;case Ff:return e=Dn(19,n,t,a),e.elementType=Ff,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Hi:r=10;break t;case B0:r=9;break t;case wd:r=11;break t;case Dd:r=14;break t;case ma:r=16,i=null;break t}r=29,n=Error(Q(130,e===null?"null":typeof e,"")),i=null}return t=Dn(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function cs(e,t,n,i){return e=Dn(7,e,i,t),e.lanes=n,e}function Du(e,t,n){return e=Dn(6,e,null,t),e.lanes=n,e}function x_(e){var t=Dn(18,null,null,0);return t.stateNode=e,t}function Uu(e,t,n){return t=Dn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var _m=new WeakMap;function qn(e,t){if(typeof e=="object"&&e!==null){var n=_m.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Qp(t)},_m.set(e,t),t)}return{value:e,source:t,stack:Qp(t)}}var tr=[],er=0,xc=null,Ro=0,Vn=[],kn=0,Fa=null,pi=1,mi="";function Fi(e,t){tr[er++]=Ro,tr[er++]=xc,xc=e,Ro=t}function S_(e,t,n){Vn[kn++]=pi,Vn[kn++]=mi,Vn[kn++]=Fa,Fa=e;var i=pi;e=mi;var a=32-On(i)-1;i&=~(1<<a),n+=1;var s=32-On(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,pi=1<<32-On(t)+a|n<<a|i,mi=s+e}else pi=1<<s|n<<a|i,mi=e}function Xd(e){e.return!==null&&(Fi(e,1),S_(e,1,0))}function Wd(e){for(;e===xc;)xc=tr[--er],tr[er]=null,Ro=tr[--er],tr[er]=null;for(;e===Fa;)Fa=Vn[--kn],Vn[kn]=null,mi=Vn[--kn],Vn[kn]=null,pi=Vn[--kn],Vn[kn]=null}function M_(e,t){Vn[kn++]=pi,Vn[kn++]=mi,Vn[kn++]=Fa,pi=t.id,mi=t.overflow,Fa=e}var $e=null,Se=null,qt=!1,wa=null,Yn=!1,Jf=Error(Q(519));function Ba(e){var t=Error(Q(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Co(qn(t,e)),Jf}function vm(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[Je]=e,t[yn]=i,n){case"dialog":Vt("cancel",t),Vt("close",t);break;case"iframe":case"object":case"embed":Vt("load",t);break;case"video":case"audio":for(n=0;n<Lo.length;n++)Vt(Lo[n],t);break;case"source":Vt("error",t);break;case"img":case"image":case"link":Vt("error",t),Vt("load",t);break;case"details":Vt("toggle",t);break;case"input":Vt("invalid",t),Q0(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Vt("invalid",t);break;case"textarea":Vt("invalid",t),$0(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||ix(t.textContent,n)?(i.popover!=null&&(Vt("beforetoggle",t),Vt("toggle",t)),i.onScroll!=null&&Vt("scroll",t),i.onScrollEnd!=null&&Vt("scrollend",t),i.onClick!=null&&(t.onclick=Gi),t=!0):t=!1,t||Ba(e,!0)}function xm(e){for($e=e.return;$e;)switch($e.tag){case 5:case 31:case 13:Yn=!1;return;case 27:case 3:Yn=!0;return;default:$e=$e.return}}function As(e){if(e!==$e)return!1;if(!qt)return xm(e),qt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Eh(e.type,e.memoizedProps)),n=!n),n&&Se&&Ba(e),xm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(317));Se=sg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(317));Se=sg(e)}else t===27?(t=Se,ka(e.type)?(e=Rh,Rh=null,Se=e):Se=t):Se=$e?Kn(e.stateNode.nextSibling):null;return!0}function ds(){Se=$e=null,qt=!1}function Lu(){var e=wa;return e!==null&&(_n===null?_n=e:_n.push.apply(_n,e),wa=null),e}function Co(e){wa===null?wa=[e]:wa.push(e)}var $f=Ei(null),Es=null,Vi=null;function _a(e,t,n){ve($f,t._currentValue),t._currentValue=n}function Wi(e){e._currentValue=$f.current,je($f)}function th(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function eh(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),th(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(Q(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),th(r,n,e),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ur(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(Q(387));if(r=r.memoizedProps,r!==null){var o=a.type;In(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===hc.current){if(r=a.alternate,r===null)throw Error(Q(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(Oo):e=[Oo])}a=a.return}e!==null&&eh(t,e,n,i),t.flags|=262144}function Sc(e){for(e=e.firstContext;e!==null;){if(!In(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ps(e){Es=e,Vi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function tn(e){return y_(Es,e)}function fl(e,t){return Es===null&&ps(e),y_(e,t)}function y_(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Vi===null){if(e===null)throw Error(Q(308));Vi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Vi=Vi.next=t;return n}var ZM=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},jM=Ge.unstable_scheduleCallback,KM=Ge.unstable_NormalPriority,Fe={$$typeof:Hi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function qd(){return{controller:new ZM,data:new Map,refCount:0}}function qo(e){e.refCount--,e.refCount===0&&jM(KM,function(){e.controller.abort()})}var ho=null,nh=0,mr=0,rr=null;function QM(e,t){if(ho===null){var n=ho=[];nh=0,mr=_p(),rr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return nh++,t.then(Sm,Sm),t}function Sm(){if(--nh===0&&ho!==null){rr!==null&&(rr.status="fulfilled");var e=ho;ho=null,mr=0,rr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function JM(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Mm=Ct.S;Ct.S=function(e,t){Iv=Ln(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&QM(e,t),Mm!==null&&Mm(e,t)};var us=Ei(null);function Yd(){var e=us.current;return e!==null?e:me.pooledCache}function Kl(e,t){t===null?ve(us,us.current):ve(us,t.pool)}function E_(){var e=Yd();return e===null?null:{parent:Fe._currentValue,pool:e}}var Lr=Error(Q(460)),Zd=Error(Q(474)),tu=Error(Q(542)),Mc={then:function(){}};function ym(e){return e=e.status,e==="fulfilled"||e==="rejected"}function b_(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Gi,Gi),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,bm(e),e;default:if(typeof t.status=="string")t.then(Gi,Gi);else{if(e=me,e!==null&&100<e.shellSuspendCounter)throw Error(Q(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,bm(e),e}throw fs=t,Lr}}function es(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(fs=n,Lr):n}}var fs=null;function Em(){if(fs===null)throw Error(Q(459));var e=fs;return fs=null,e}function bm(e){if(e===Lr||e===tu)throw Error(Q(483))}var or=null,wo=0;function hl(e){var t=wo;return wo+=1,or===null&&(or=[]),b_(or,e,t)}function kr(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function dl(e,t){throw t.$$typeof===BS?Error(Q(525)):(e=Object.prototype.toString.call(t),Error(Q(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function T_(e){function t(f,m){if(e){var v=f.deletions;v===null?(f.deletions=[m],f.flags|=16):v.push(m)}}function n(f,m){if(!e)return null;for(;m!==null;)t(f,m),m=m.sibling;return null}function i(f){for(var m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function a(f,m){return f=Xi(f,m),f.index=0,f.sibling=null,f}function s(f,m,v){return f.index=v,e?(v=f.alternate,v!==null?(v=v.index,v<m?(f.flags|=67108866,m):v):(f.flags|=67108866,m)):(f.flags|=1048576,m)}function r(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function o(f,m,v,S){return m===null||m.tag!==6?(m=Du(v,f.mode,S),m.return=f,m):(m=a(m,v),m.return=f,m)}function l(f,m,v,S){var R=v.type;return R===Ws?h(f,m,v.props.children,S,v.key):m!==null&&(m.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===ma&&es(R)===m.type)?(m=a(m,v.props),kr(m,v),m.return=f,m):(m=jl(v.type,v.key,v.props,null,f.mode,S),kr(m,v),m.return=f,m)}function c(f,m,v,S){return m===null||m.tag!==4||m.stateNode.containerInfo!==v.containerInfo||m.stateNode.implementation!==v.implementation?(m=Uu(v,f.mode,S),m.return=f,m):(m=a(m,v.children||[]),m.return=f,m)}function h(f,m,v,S,R){return m===null||m.tag!==7?(m=cs(v,f.mode,S,R),m.return=f,m):(m=a(m,v),m.return=f,m)}function p(f,m,v){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=Du(""+m,f.mode,v),m.return=f,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case sl:return v=jl(m.type,m.key,m.props,null,f.mode,v),kr(v,m),v.return=f,v;case eo:return m=Uu(m,f.mode,v),m.return=f,m;case ma:return m=es(m),p(f,m,v)}if(no(m)||Hr(m))return m=cs(m,f.mode,v,null),m.return=f,m;if(typeof m.then=="function")return p(f,hl(m),v);if(m.$$typeof===Hi)return p(f,fl(f,m),v);dl(f,m)}return null}function u(f,m,v,S){var R=m!==null?m.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return R!==null?null:o(f,m,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case sl:return v.key===R?l(f,m,v,S):null;case eo:return v.key===R?c(f,m,v,S):null;case ma:return v=es(v),u(f,m,v,S)}if(no(v)||Hr(v))return R!==null?null:h(f,m,v,S,null);if(typeof v.then=="function")return u(f,m,hl(v),S);if(v.$$typeof===Hi)return u(f,m,fl(f,v),S);dl(f,v)}return null}function d(f,m,v,S,R){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return f=f.get(v)||null,o(m,f,""+S,R);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case sl:return f=f.get(S.key===null?v:S.key)||null,l(m,f,S,R);case eo:return f=f.get(S.key===null?v:S.key)||null,c(m,f,S,R);case ma:return S=es(S),d(f,m,v,S,R)}if(no(S)||Hr(S))return f=f.get(v)||null,h(m,f,S,R,null);if(typeof S.then=="function")return d(f,m,v,hl(S),R);if(S.$$typeof===Hi)return d(f,m,v,fl(m,S),R);dl(m,S)}return null}function _(f,m,v,S){for(var R=null,C=null,A=m,M=m=0,b=null;A!==null&&M<v.length;M++){A.index>M?(b=A,A=null):b=A.sibling;var F=u(f,A,v[M],S);if(F===null){A===null&&(A=b);break}e&&A&&F.alternate===null&&t(f,A),m=s(F,m,M),C===null?R=F:C.sibling=F,C=F,A=b}if(M===v.length)return n(f,A),qt&&Fi(f,M),R;if(A===null){for(;M<v.length;M++)A=p(f,v[M],S),A!==null&&(m=s(A,m,M),C===null?R=A:C.sibling=A,C=A);return qt&&Fi(f,M),R}for(A=i(A);M<v.length;M++)b=d(A,f,M,v[M],S),b!==null&&(e&&b.alternate!==null&&A.delete(b.key===null?M:b.key),m=s(b,m,M),C===null?R=b:C.sibling=b,C=b);return e&&A.forEach(function(w){return t(f,w)}),qt&&Fi(f,M),R}function y(f,m,v,S){if(v==null)throw Error(Q(151));for(var R=null,C=null,A=m,M=m=0,b=null,F=v.next();A!==null&&!F.done;M++,F=v.next()){A.index>M?(b=A,A=null):b=A.sibling;var w=u(f,A,F.value,S);if(w===null){A===null&&(A=b);break}e&&A&&w.alternate===null&&t(f,A),m=s(w,m,M),C===null?R=w:C.sibling=w,C=w,A=b}if(F.done)return n(f,A),qt&&Fi(f,M),R;if(A===null){for(;!F.done;M++,F=v.next())F=p(f,F.value,S),F!==null&&(m=s(F,m,M),C===null?R=F:C.sibling=F,C=F);return qt&&Fi(f,M),R}for(A=i(A);!F.done;M++,F=v.next())F=d(A,f,M,F.value,S),F!==null&&(e&&F.alternate!==null&&A.delete(F.key===null?M:F.key),m=s(F,m,M),C===null?R=F:C.sibling=F,C=F);return e&&A.forEach(function(B){return t(f,B)}),qt&&Fi(f,M),R}function g(f,m,v,S){if(typeof v=="object"&&v!==null&&v.type===Ws&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case sl:t:{for(var R=v.key;m!==null;){if(m.key===R){if(R=v.type,R===Ws){if(m.tag===7){n(f,m.sibling),S=a(m,v.props.children),S.return=f,f=S;break t}}else if(m.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===ma&&es(R)===m.type){n(f,m.sibling),S=a(m,v.props),kr(S,v),S.return=f,f=S;break t}n(f,m);break}else t(f,m);m=m.sibling}v.type===Ws?(S=cs(v.props.children,f.mode,S,v.key),S.return=f,f=S):(S=jl(v.type,v.key,v.props,null,f.mode,S),kr(S,v),S.return=f,f=S)}return r(f);case eo:t:{for(R=v.key;m!==null;){if(m.key===R)if(m.tag===4&&m.stateNode.containerInfo===v.containerInfo&&m.stateNode.implementation===v.implementation){n(f,m.sibling),S=a(m,v.children||[]),S.return=f,f=S;break t}else{n(f,m);break}else t(f,m);m=m.sibling}S=Uu(v,f.mode,S),S.return=f,f=S}return r(f);case ma:return v=es(v),g(f,m,v,S)}if(no(v))return _(f,m,v,S);if(Hr(v)){if(R=Hr(v),typeof R!="function")throw Error(Q(150));return v=R.call(v),y(f,m,v,S)}if(typeof v.then=="function")return g(f,m,hl(v),S);if(v.$$typeof===Hi)return g(f,m,fl(f,v),S);dl(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,m!==null&&m.tag===6?(n(f,m.sibling),S=a(m,v),S.return=f,f=S):(n(f,m),S=Du(v,f.mode,S),S.return=f,f=S),r(f)):n(f,m)}return function(f,m,v,S){try{wo=0;var R=g(f,m,v,S);return or=null,R}catch(A){if(A===Lr||A===tu)throw A;var C=Dn(29,A,null,f.mode);return C.lanes=S,C.return=f,C}finally{}}}var ms=T_(!0),A_=T_(!1),ga=!1;function jd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ih(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Da(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ua(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,$t&2){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=vc(e),__(e,null,n),t}return $c(e,i,t,n),vc(e)}function po(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,X0(e,n)}}function Nu(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ah=!1;function mo(){if(ah){var e=rr;if(e!==null)throw e}}function go(e,t,n,i){ah=!1;var a=e.updateQueue;ga=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==r&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(s!==null){var p=a.baseState;r=0,h=c=l=null,o=s;do{var u=o.lane&-536870913,d=u!==o.lane;if(d?(Xt&u)===u:(i&u)===u){u!==0&&u===mr&&(ah=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var _=e,y=o;u=t;var g=n;switch(y.tag){case 1:if(_=y.payload,typeof _=="function"){p=_.call(g,p,u);break t}p=_;break t;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,u=typeof _=="function"?_.call(g,p,u):_,u==null)break t;p=ye({},p,u);break t;case 2:ga=!0}}u=o.callback,u!==null&&(e.flags|=64,d&&(e.flags|=8192),d=a.callbacks,d===null?a.callbacks=[u]:d.push(u))}else d={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=d,l=p):h=h.next=d,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;d=o,o=d.next,d.next=null,a.lastBaseUpdate=d,a.shared.pending=null}}while(!0);h===null&&(l=p),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=h,s===null&&(a.shared.lanes=0),Ha|=r,e.lanes=r,e.memoizedState=p}}function R_(e,t){if(typeof e!="function")throw Error(Q(191,e));e.call(t)}function C_(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)R_(n[e],t)}var gr=Ei(null),yc=Ei(0);function Tm(e,t){e=ta,ve(yc,e),ve(gr,t),ta=e|t.baseLanes}function sh(){ve(yc,ta),ve(gr,gr.current)}function Kd(){ta=yc.current,je(gr),je(yc)}var Fn=Ei(null),jn=null;function va(e){var t=e.alternate;ve(we,we.current&1),ve(Fn,e),jn===null&&(t===null||gr.current!==null||t.memoizedState!==null)&&(jn=e)}function rh(e){ve(we,we.current),ve(Fn,e),jn===null&&(jn=e)}function w_(e){e.tag===22?(ve(we,we.current),ve(Fn,e),jn===null&&(jn=e)):xa()}function xa(){ve(we,we.current),ve(Fn,Fn.current)}function wn(e){je(Fn),jn===e&&(jn=null),je(we)}var we=Ei(0);function Ec(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Th(n)||Ah(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Qi=0,Pt=null,fe=null,Pe=null,bc=!1,lr=!1,gs=!1,Tc=0,Do=0,cr=null,$M=0;function Te(){throw Error(Q(321))}function Qd(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!In(e[n],t[n]))return!1;return!0}function Jd(e,t,n,i,a,s){return Qi=s,Pt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ct.H=e===null||e.memoizedState===null?rv:cp,gs=!1,s=n(i,a),gs=!1,lr&&(s=U_(t,n,i,a)),D_(e),s}function D_(e){Ct.H=Uo;var t=fe!==null&&fe.next!==null;if(Qi=0,Pe=fe=Pt=null,bc=!1,Do=0,cr=null,t)throw Error(Q(300));e===null||Be||(e=e.dependencies,e!==null&&Sc(e)&&(Be=!0))}function U_(e,t,n,i){Pt=e;var a=0;do{if(lr&&(cr=null),Do=0,lr=!1,25<=a)throw Error(Q(301));if(a+=1,Pe=fe=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Ct.H=ov,s=t(n,i)}while(lr);return s}function ty(){var e=Ct.H,t=e.useState()[0];return t=typeof t.then=="function"?Yo(t):t,e=e.useState()[0],(fe!==null?fe.memoizedState:null)!==e&&(Pt.flags|=1024),t}function $d(){var e=Tc!==0;return Tc=0,e}function tp(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ep(e){if(bc){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bc=!1}Qi=0,Pe=fe=Pt=null,lr=!1,Do=Tc=0,cr=null}function cn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?Pt.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function Ue(){if(fe===null){var e=Pt.alternate;e=e!==null?e.memoizedState:null}else e=fe.next;var t=Pe===null?Pt.memoizedState:Pe.next;if(t!==null)Pe=t,fe=e;else{if(e===null)throw Pt.alternate===null?Error(Q(467)):Error(Q(310));fe=e,e={memoizedState:fe.memoizedState,baseState:fe.baseState,baseQueue:fe.baseQueue,queue:fe.queue,next:null},Pe===null?Pt.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}function eu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Yo(e){var t=Do;return Do+=1,cr===null&&(cr=[]),e=b_(cr,e,t),t=Pt,(Pe===null?t.memoizedState:Pe.next)===null&&(t=t.alternate,Ct.H=t===null||t.memoizedState===null?rv:cp),e}function nu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Yo(e);if(e.$$typeof===Hi)return tn(e)}throw Error(Q(438,String(e)))}function np(e){var t=null,n=Pt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Pt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=eu(),Pt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=zS;return t.index++,n}function Ji(e,t){return typeof t=="function"?t(e):t}function Ql(e){var t=Ue();return ip(t,fe,e)}function ip(e,t,n){var i=e.queue;if(i===null)throw Error(Q(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,h=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(Xt&p)===p:(Qi&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===mr&&(h=!0);else if((Qi&u)===u){c=c.next,u===mr&&(h=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=s):l=l.next=p,Pt.lanes|=u,Ha|=u;p=c.action,gs&&n(s,p),s=c.hasEagerState?c.eagerState:n(s,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,Pt.lanes|=p,Ha|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!In(s,e.memoizedState)&&(Be=!0,h&&(n=rr,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Ou(e){var t=Ue(),n=t.queue;if(n===null)throw Error(Q(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);In(s,t.memoizedState)||(Be=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function L_(e,t,n){var i=Pt,a=Ue(),s=qt;if(s){if(n===void 0)throw Error(Q(407));n=n()}else n=t();var r=!In((fe||a).memoizedState,n);if(r&&(a.memoizedState=n,Be=!0),a=a.queue,ap(P_.bind(null,i,a,e),[e]),a.getSnapshot!==t||r||Pe!==null&&Pe.memoizedState.tag&1){if(i.flags|=2048,_r(9,{destroy:void 0},O_.bind(null,i,a,n,t),null),me===null)throw Error(Q(349));s||Qi&127||N_(i,t,n)}return n}function N_(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Pt.updateQueue,t===null?(t=eu(),Pt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function O_(e,t,n,i){t.value=n,t.getSnapshot=i,I_(t)&&F_(e)}function P_(e,t,n){return n(function(){I_(t)&&F_(e)})}function I_(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!In(e,n)}catch{return!0}}function F_(e){var t=ys(e,2);t!==null&&xn(t,e,2)}function oh(e){var t=cn();if(typeof e=="function"){var n=e;if(e=n(),gs){ya(!0);try{n()}finally{ya(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:e},t}function B_(e,t,n,i){return e.baseState=n,ip(e,fe,typeof i=="function"?i:Ji)}function ey(e,t,n,i,a){if(au(e))throw Error(Q(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Ct.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,z_(t,s)):(s.next=n.next,t.pending=n.next=s)}}function z_(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=Ct.T,r={};Ct.T=r;try{var o=n(a,i),l=Ct.S;l!==null&&l(r,o),Am(e,t,o)}catch(c){lh(e,t,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),Ct.T=s}}else try{s=n(a,i),Am(e,t,s)}catch(c){lh(e,t,c)}}function Am(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Rm(e,t,i)},function(i){return lh(e,t,i)}):Rm(e,t,n)}function Rm(e,t,n){t.status="fulfilled",t.value=n,H_(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,z_(e,n)))}function lh(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,H_(t),t=t.next;while(t!==i)}e.action=null}function H_(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function G_(e,t){return t}function Cm(e,t){if(qt){var n=me.formState;if(n!==null){t:{var i=Pt;if(qt){if(Se){e:{for(var a=Se,s=Yn;a.nodeType!==8;){if(!s){a=null;break e}if(a=Kn(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Se=Kn(a.nextSibling),i=a.data==="F!";break t}}Ba(i)}i=!1}i&&(t=n[0])}}return n=cn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:G_,lastRenderedState:t},n.queue=i,n=iv.bind(null,Pt,i),i.dispatch=n,i=oh(!1),s=lp.bind(null,Pt,!1,i.queue),i=cn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=ey.bind(null,Pt,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function wm(e){var t=Ue();return V_(t,fe,e)}function V_(e,t,n){if(t=ip(e,t,G_)[0],e=Ql(Ji)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Yo(t)}catch(r){throw r===Lr?tu:r}else i=t;t=Ue();var a=t.queue,s=a.dispatch;return n!==t.memoizedState&&(Pt.flags|=2048,_r(9,{destroy:void 0},ny.bind(null,a,n),null)),[i,s,e]}function ny(e,t){e.action=t}function Dm(e){var t=Ue(),n=fe;if(n!==null)return V_(t,n,e);Ue(),t=t.memoizedState,n=Ue();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function _r(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Pt.updateQueue,t===null&&(t=eu(),Pt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function k_(){return Ue().memoizedState}function Jl(e,t,n,i){var a=cn();Pt.flags|=e,a.memoizedState=_r(1|t,{destroy:void 0},n,i===void 0?null:i)}function iu(e,t,n,i){var a=Ue();i=i===void 0?null:i;var s=a.memoizedState.inst;fe!==null&&i!==null&&Qd(i,fe.memoizedState.deps)?a.memoizedState=_r(t,s,n,i):(Pt.flags|=e,a.memoizedState=_r(1|t,s,n,i))}function Um(e,t){Jl(8390656,8,e,t)}function ap(e,t){iu(2048,8,e,t)}function iy(e){Pt.flags|=4;var t=Pt.updateQueue;if(t===null)t=eu(),Pt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function X_(e){var t=Ue().memoizedState;return iy({ref:t,nextImpl:e}),function(){if($t&2)throw Error(Q(440));return t.impl.apply(void 0,arguments)}}function W_(e,t){return iu(4,2,e,t)}function q_(e,t){return iu(4,4,e,t)}function Y_(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Z_(e,t,n){n=n!=null?n.concat([e]):null,iu(4,4,Y_.bind(null,t,e),n)}function sp(){}function j_(e,t){var n=Ue();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&Qd(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function K_(e,t){var n=Ue();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&Qd(t,i[1]))return i[0];if(i=e(),gs){ya(!0);try{e()}finally{ya(!1)}}return n.memoizedState=[i,t],i}function rp(e,t,n){return n===void 0||Qi&1073741824&&!(Xt&261930)?e.memoizedState=t:(e.memoizedState=n,e=Bv(),Pt.lanes|=e,Ha|=e,n)}function Q_(e,t,n,i){return In(n,t)?n:gr.current!==null?(e=rp(e,n,i),In(e,t)||(Be=!0),e):!(Qi&42)||Qi&1073741824&&!(Xt&261930)?(Be=!0,e.memoizedState=n):(e=Bv(),Pt.lanes|=e,Ha|=e,t)}function J_(e,t,n,i,a){var s=te.p;te.p=s!==0&&8>s?s:8;var r=Ct.T,o={};Ct.T=o,lp(e,!1,t,n);try{var l=a(),c=Ct.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var h=JM(l,i);_o(e,t,h,Pn(e))}else _o(e,t,i,Pn(e))}catch(p){_o(e,t,{then:function(){},status:"rejected",reason:p},Pn())}finally{te.p=s,r!==null&&o.types!==null&&(r.types=o.types),Ct.T=r}}function ay(){}function ch(e,t,n,i){if(e.tag!==5)throw Error(Q(476));var a=$_(e).queue;J_(e,a,t,ls,n===null?ay:function(){return tv(e),n(i)})}function $_(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ls,baseState:ls,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:ls},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function tv(e){var t=$_(e);t.next===null&&(t=e.alternate.memoizedState),_o(e,t.next.queue,{},Pn())}function op(){return tn(Oo)}function ev(){return Ue().memoizedState}function nv(){return Ue().memoizedState}function sy(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Pn();e=Da(n);var i=Ua(t,e,n);i!==null&&(xn(i,t,n),po(i,t,n)),t={cache:qd()},e.payload=t;return}t=t.return}}function ry(e,t,n){var i=Pn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},au(e)?av(t,n):(n=Vd(e,t,n,i),n!==null&&(xn(n,e,i),sv(n,t,i)))}function iv(e,t,n){var i=Pn();_o(e,t,n,i)}function _o(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(au(e))av(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,In(o,r))return $c(e,t,a,0),me===null&&Jc(),!1}catch{}finally{}if(n=Vd(e,t,a,i),n!==null)return xn(n,e,i),sv(n,t,i),!0}return!1}function lp(e,t,n,i){if(i={lane:2,revertLane:_p(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},au(e)){if(t)throw Error(Q(479))}else t=Vd(e,n,i,2),t!==null&&xn(t,e,2)}function au(e){var t=e.alternate;return e===Pt||t!==null&&t===Pt}function av(e,t){lr=bc=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function sv(e,t,n){if(n&4194048){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,X0(e,n)}}var Uo={readContext:tn,use:nu,useCallback:Te,useContext:Te,useEffect:Te,useImperativeHandle:Te,useLayoutEffect:Te,useInsertionEffect:Te,useMemo:Te,useReducer:Te,useRef:Te,useState:Te,useDebugValue:Te,useDeferredValue:Te,useTransition:Te,useSyncExternalStore:Te,useId:Te,useHostTransitionStatus:Te,useFormState:Te,useActionState:Te,useOptimistic:Te,useMemoCache:Te,useCacheRefresh:Te};Uo.useEffectEvent=Te;var rv={readContext:tn,use:nu,useCallback:function(e,t){return cn().memoizedState=[e,t===void 0?null:t],e},useContext:tn,useEffect:Um,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Jl(4194308,4,Y_.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jl(4194308,4,e,t)},useInsertionEffect:function(e,t){Jl(4,2,e,t)},useMemo:function(e,t){var n=cn();t=t===void 0?null:t;var i=e();if(gs){ya(!0);try{e()}finally{ya(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=cn();if(n!==void 0){var a=n(t);if(gs){ya(!0);try{n(t)}finally{ya(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=ry.bind(null,Pt,e),[i.memoizedState,e]},useRef:function(e){var t=cn();return e={current:e},t.memoizedState=e},useState:function(e){e=oh(e);var t=e.queue,n=iv.bind(null,Pt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:sp,useDeferredValue:function(e,t){var n=cn();return rp(n,e,t)},useTransition:function(){var e=oh(!1);return e=J_.bind(null,Pt,e.queue,!0,!1),cn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Pt,a=cn();if(qt){if(n===void 0)throw Error(Q(407));n=n()}else{if(n=t(),me===null)throw Error(Q(349));Xt&127||N_(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,Um(P_.bind(null,i,s,e),[e]),i.flags|=2048,_r(9,{destroy:void 0},O_.bind(null,i,s,n,t),null),n},useId:function(){var e=cn(),t=me.identifierPrefix;if(qt){var n=mi,i=pi;n=(i&~(1<<32-On(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Tc++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=$M++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:op,useFormState:Cm,useActionState:Cm,useOptimistic:function(e){var t=cn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=lp.bind(null,Pt,!0,n),n.dispatch=t,[e,t]},useMemoCache:np,useCacheRefresh:function(){return cn().memoizedState=sy.bind(null,Pt)},useEffectEvent:function(e){var t=cn(),n={impl:e};return t.memoizedState=n,function(){if($t&2)throw Error(Q(440));return n.impl.apply(void 0,arguments)}}},cp={readContext:tn,use:nu,useCallback:j_,useContext:tn,useEffect:ap,useImperativeHandle:Z_,useInsertionEffect:W_,useLayoutEffect:q_,useMemo:K_,useReducer:Ql,useRef:k_,useState:function(){return Ql(Ji)},useDebugValue:sp,useDeferredValue:function(e,t){var n=Ue();return Q_(n,fe.memoizedState,e,t)},useTransition:function(){var e=Ql(Ji)[0],t=Ue().memoizedState;return[typeof e=="boolean"?e:Yo(e),t]},useSyncExternalStore:L_,useId:ev,useHostTransitionStatus:op,useFormState:wm,useActionState:wm,useOptimistic:function(e,t){var n=Ue();return B_(n,fe,e,t)},useMemoCache:np,useCacheRefresh:nv};cp.useEffectEvent=X_;var ov={readContext:tn,use:nu,useCallback:j_,useContext:tn,useEffect:ap,useImperativeHandle:Z_,useInsertionEffect:W_,useLayoutEffect:q_,useMemo:K_,useReducer:Ou,useRef:k_,useState:function(){return Ou(Ji)},useDebugValue:sp,useDeferredValue:function(e,t){var n=Ue();return fe===null?rp(n,e,t):Q_(n,fe.memoizedState,e,t)},useTransition:function(){var e=Ou(Ji)[0],t=Ue().memoizedState;return[typeof e=="boolean"?e:Yo(e),t]},useSyncExternalStore:L_,useId:ev,useHostTransitionStatus:op,useFormState:Dm,useActionState:Dm,useOptimistic:function(e,t){var n=Ue();return fe!==null?B_(n,fe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:np,useCacheRefresh:nv};ov.useEffectEvent=X_;function Pu(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:ye({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var uh={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Pn(),a=Da(i);a.payload=t,n!=null&&(a.callback=n),t=Ua(e,a,i),t!==null&&(xn(t,e,i),po(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Pn(),a=Da(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=Ua(e,a,i),t!==null&&(xn(t,e,i),po(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Pn(),i=Da(n);i.tag=2,t!=null&&(i.callback=t),t=Ua(e,i,n),t!==null&&(xn(t,e,n),po(t,e,n))}};function Lm(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!Ao(n,i)||!Ao(a,s):!0}function Nm(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&uh.enqueueReplaceState(t,t.state,null)}function _s(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=ye({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function lv(e){_c(e)}function cv(e){console.error(e)}function uv(e){_c(e)}function Ac(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Om(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function fh(e,t,n){return n=Da(n),n.tag=3,n.payload={element:null},n.callback=function(){Ac(e,t)},n}function fv(e){return e=Da(e),e.tag=3,e}function hv(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){Om(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Om(t,n,i),typeof a!="function"&&(La===null?La=new Set([this]):La.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function oy(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ur(t,n,a,!0),n=Fn.current,n!==null){switch(n.tag){case 31:case 13:return jn===null?Uc():n.alternate===null&&Ae===0&&(Ae=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Mc?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),qu(e,i,a)),!1;case 22:return n.flags|=65536,i===Mc?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),qu(e,i,a)),!1}throw Error(Q(435,n.tag))}return qu(e,i,a),Uc(),!1}if(qt)return t=Fn.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==Jf&&(e=Error(Q(422),{cause:i}),Co(qn(e,n)))):(i!==Jf&&(t=Error(Q(423),{cause:i}),Co(qn(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=qn(i,n),a=fh(e.stateNode,i,a),Nu(e,a),Ae!==4&&(Ae=2)),!1;var s=Error(Q(520),{cause:i});if(s=qn(s,n),So===null?So=[s]:So.push(s),Ae!==4&&(Ae=2),t===null)return!0;i=qn(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=fh(n.stateNode,i,e),Nu(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(La===null||!La.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=fv(a),hv(a,e,n,i),Nu(n,a),!1}n=n.return}while(n!==null);return!1}var up=Error(Q(461)),Be=!1;function Qe(e,t,n,i){t.child=e===null?A_(t,null,n,i):ms(t,e.child,n,i)}function Pm(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return ps(t),i=Jd(e,t,n,r,s,a),o=$d(),e!==null&&!Be?(tp(e,t,a),$i(e,t,a)):(qt&&o&&Xd(t),t.flags|=1,Qe(e,t,i,a),t.child)}function Im(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!kd(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,dv(e,t,s,i,a)):(e=jl(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!fp(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ao,n(r,i)&&e.ref===t.ref)return $i(e,t,a)}return t.flags|=1,e=Xi(s,i),e.ref=t.ref,e.return=t,t.child=e}function dv(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(Ao(s,i)&&e.ref===t.ref)if(Be=!1,t.pendingProps=i=s,fp(e,a))e.flags&131072&&(Be=!0);else return t.lanes=e.lanes,$i(e,t,a)}return hh(e,t,n,i,a)}function pv(e,t,n,i){var a=i.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(t.flags&128){if(s=s!==null?s.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,t.child=null;return Fm(e,t,s,n,i)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Kl(t,s!==null?s.cachePool:null),s!==null?Tm(t,s):sh(),w_(t);else return i=t.lanes=536870912,Fm(e,t,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Kl(t,s.cachePool),Tm(t,s),xa(),t.memoizedState=null):(e!==null&&Kl(t,null),sh(),xa());return Qe(e,t,a,n),t.child}function ao(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Fm(e,t,n,i,a){var s=Yd();return s=s===null?null:{parent:Fe._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&Kl(t,null),sh(),w_(t),e!==null&&Ur(e,t,i,!0),t.childLanes=a,null}function $l(e,t){return t=Rc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bm(e,t,n){return ms(t,e.child,null,n),e=$l(t,t.pendingProps),e.flags|=2,wn(t),t.memoizedState=null,e}function ly(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(qt){if(i.mode==="hidden")return e=$l(t,i),t.lanes=536870912,ao(null,e);if(rh(t),(e=Se)?(e=rx(e,Yn),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Fa!==null?{id:pi,overflow:mi}:null,retryLane:536870912,hydrationErrors:null},n=x_(e),n.return=t,t.child=n,$e=t,Se=null)):e=null,e===null)throw Ba(t);return t.lanes=536870912,null}return $l(t,i)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(rh(t),a)if(t.flags&256)t.flags&=-257,t=Bm(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(Q(558));else if(Be||Ur(e,t,n,!1),a=(n&e.childLanes)!==0,Be||a){if(i=me,i!==null&&(r=W0(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,ys(e,r),xn(i,e,r),up;Uc(),t=Bm(e,t,n)}else e=s.treeContext,Se=Kn(r.nextSibling),$e=t,qt=!0,wa=null,Yn=!1,e!==null&&M_(t,e),t=$l(t,i),t.flags|=4096;return t}return e=Xi(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function tc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(Q(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function hh(e,t,n,i,a){return ps(t),n=Jd(e,t,n,i,void 0,a),i=$d(),e!==null&&!Be?(tp(e,t,a),$i(e,t,a)):(qt&&i&&Xd(t),t.flags|=1,Qe(e,t,n,a),t.child)}function zm(e,t,n,i,a,s){return ps(t),t.updateQueue=null,n=U_(t,i,n,a),D_(e),i=$d(),e!==null&&!Be?(tp(e,t,s),$i(e,t,s)):(qt&&i&&Xd(t),t.flags|=1,Qe(e,t,n,s),t.child)}function Hm(e,t,n,i,a){if(ps(t),t.stateNode===null){var s=$s,r=n.contextType;typeof r=="object"&&r!==null&&(s=tn(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=uh,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},jd(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?tn(r):$s,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Pu(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&uh.enqueueReplaceState(s,s.state,null),go(t,i,s,a),mo(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=_s(n,o);s.props=l;var c=s.context,h=n.contextType;r=$s,typeof h=="object"&&h!==null&&(r=tn(h));var p=n.getDerivedStateFromProps;h=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&Nm(t,s,i,r),ga=!1;var u=t.memoizedState;s.state=u,go(t,i,s,a),mo(),c=t.memoizedState,o||u!==c||ga?(typeof p=="function"&&(Pu(t,n,p,i),c=t.memoizedState),(l=ga||Lm(t,n,l,i,u,c,r))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,ih(e,t),r=t.memoizedProps,h=_s(n,r),s.props=h,p=t.pendingProps,u=s.context,c=n.contextType,l=$s,typeof c=="object"&&c!==null&&(l=tn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==p||u!==l)&&Nm(t,s,i,l),ga=!1,u=t.memoizedState,s.state=u,go(t,i,s,a),mo();var d=t.memoizedState;r!==p||u!==d||ga||e!==null&&e.dependencies!==null&&Sc(e.dependencies)?(typeof o=="function"&&(Pu(t,n,o,i),d=t.memoizedState),(h=ga||Lm(t,n,h,i,u,d,l)||e!==null&&e.dependencies!==null&&Sc(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,d,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,d,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=d),s.props=i,s.state=d,s.context=l,i=h):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,tc(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=ms(t,e.child,null,a),t.child=ms(t,null,n,a)):Qe(e,t,n,a),t.memoizedState=s.state,e=t.child):e=$i(e,t,a),e}function Gm(e,t,n,i){return ds(),t.flags|=256,Qe(e,t,n,i),t.child}var Iu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Fu(e){return{baseLanes:e,cachePool:E_()}}function Bu(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Un),e}function mv(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(we.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(qt){if(a?va(t):xa(),(e=Se)?(e=rx(e,Yn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Fa!==null?{id:pi,overflow:mi}:null,retryLane:536870912,hydrationErrors:null},n=x_(e),n.return=t,t.child=n,$e=t,Se=null)):e=null,e===null)throw Ba(t);return Ah(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(xa(),a=t.mode,o=Rc({mode:"hidden",children:o},a),i=cs(i,a,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=Fu(n),i.childLanes=Bu(e,r,n),t.memoizedState=Iu,ao(null,i)):(va(t),dh(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)t.flags&256?(va(t),t.flags&=-257,t=zu(e,t,n)):t.memoizedState!==null?(xa(),t.child=e.child,t.flags|=128,t=null):(xa(),o=i.fallback,a=t.mode,i=Rc({mode:"visible",children:i.children},a),o=cs(o,a,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,ms(t,e.child,null,n),i=t.child,i.memoizedState=Fu(n),i.childLanes=Bu(e,r,n),t.memoizedState=Iu,t=ao(null,i));else if(va(t),Ah(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(Q(419)),i.stack="",i.digest=r,Co({value:i,source:null,stack:null}),t=zu(e,t,n)}else if(Be||Ur(e,t,n,!1),r=(n&e.childLanes)!==0,Be||r){if(r=me,r!==null&&(i=W0(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,ys(e,i),xn(r,e,i),up;Th(o)||Uc(),t=zu(e,t,n)}else Th(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Se=Kn(o.nextSibling),$e=t,qt=!0,wa=null,Yn=!1,e!==null&&M_(t,e),t=dh(t,i.children),t.flags|=4096);return t}return a?(xa(),o=i.fallback,a=t.mode,l=e.child,c=l.sibling,i=Xi(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=Xi(c,o):(o=cs(o,a,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,ao(null,i),i=t.child,o=e.child.memoizedState,o===null?o=Fu(n):(a=o.cachePool,a!==null?(l=Fe._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=E_(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Bu(e,r,n),t.memoizedState=Iu,ao(e.child,i)):(va(t),n=e.child,e=n.sibling,n=Xi(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function dh(e,t){return t=Rc({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Rc(e,t){return e=Dn(22,e,null,t),e.lanes=0,e}function zu(e,t,n){return ms(t,e.child,null,n),e=dh(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Vm(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),th(e.return,t,n)}function Hu(e,t,n,i,a,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function gv(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=we.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,ve(we,r),Qe(e,t,i,n),i=qt?Ro:0,!o&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vm(e,n,t);else if(e.tag===19)Vm(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&Ec(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Hu(t,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Ec(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Hu(t,!0,n,null,s,i);break;case"together":Hu(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function $i(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ha|=t.lanes,!(n&t.childLanes))if(e!==null){if(Ur(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(Q(153));if(t.child!==null){for(e=t.child,n=Xi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Xi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function fp(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Sc(e)))}function cy(e,t,n){switch(t.tag){case 3:dc(t,t.stateNode.containerInfo),_a(t,Fe,e.memoizedState.cache),ds();break;case 27:case 5:Gf(t);break;case 4:dc(t,t.stateNode.containerInfo);break;case 10:_a(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,rh(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(va(t),t.flags|=128,null):n&t.child.childLanes?mv(e,t,n):(va(t),e=$i(e,t,n),e!==null?e.sibling:null);va(t);break;case 19:var a=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Ur(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return gv(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ve(we,we.current),i)break;return null;case 22:return t.lanes=0,pv(e,t,n,t.pendingProps);case 24:_a(t,Fe,e.memoizedState.cache)}return $i(e,t,n)}function _v(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Be=!0;else{if(!fp(e,n)&&!(t.flags&128))return Be=!1,cy(e,t,n);Be=!!(e.flags&131072)}else Be=!1,qt&&t.flags&1048576&&S_(t,Ro,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=es(t.elementType),t.type=e,typeof e=="function")kd(e)?(i=_s(e,i),t.tag=1,t=Hm(null,t,e,i,n)):(t.tag=0,t=hh(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===wd){t.tag=11,t=Pm(null,t,e,i,n);break t}else if(a===Dd){t.tag=14,t=Im(null,t,e,i,n);break t}}throw t=zf(e)||e,Error(Q(306,t,""))}}return t;case 0:return hh(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=_s(i,t.pendingProps),Hm(e,t,i,a,n);case 3:t:{if(dc(t,t.stateNode.containerInfo),e===null)throw Error(Q(387));i=t.pendingProps;var s=t.memoizedState;a=s.element,ih(e,t),go(t,i,null,n);var r=t.memoizedState;if(i=r.cache,_a(t,Fe,i),i!==s.cache&&eh(t,[Fe],n,!0),mo(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Gm(e,t,i,n);break t}else if(i!==a){a=qn(Error(Q(424)),t),Co(a),t=Gm(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Se=Kn(e.firstChild),$e=t,qt=!0,wa=null,Yn=!0,n=A_(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ds(),i===a){t=$i(e,t,n);break t}Qe(e,t,i,n)}t=t.child}return t;case 26:return tc(e,t),e===null?(n=lg(t.type,null,t.pendingProps,null))?t.memoizedState=n:qt||(n=t.type,e=t.pendingProps,i=Pc(Ca.current).createElement(n),i[Je]=t,i[yn]=e,nn(i,n,e),Ze(i),t.stateNode=i):t.memoizedState=lg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Gf(t),e===null&&qt&&(i=t.stateNode=ox(t.type,t.pendingProps,Ca.current),$e=t,Yn=!0,a=Se,ka(t.type)?(Rh=a,Se=Kn(i.firstChild)):Se=a),Qe(e,t,t.pendingProps.children,n),tc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&qt&&((a=i=Se)&&(i=zy(i,t.type,t.pendingProps,Yn),i!==null?(t.stateNode=i,$e=t,Se=Kn(i.firstChild),Yn=!1,a=!0):a=!1),a||Ba(t)),Gf(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Eh(a,s)?i=null:r!==null&&Eh(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=Jd(e,t,ty,null,null,n),Oo._currentValue=a),tc(e,t),Qe(e,t,i,n),t.child;case 6:return e===null&&qt&&((e=n=Se)&&(n=Hy(n,t.pendingProps,Yn),n!==null?(t.stateNode=n,$e=t,Se=null,e=!0):e=!1),e||Ba(t)),null;case 13:return mv(e,t,n);case 4:return dc(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=ms(t,null,i,n):Qe(e,t,i,n),t.child;case 11:return Pm(e,t,t.type,t.pendingProps,n);case 7:return Qe(e,t,t.pendingProps,n),t.child;case 8:return Qe(e,t,t.pendingProps.children,n),t.child;case 12:return Qe(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,_a(t,t.type,i.value),Qe(e,t,i.children,n),t.child;case 9:return a=t.type._context,i=t.pendingProps.children,ps(t),a=tn(a),i=i(a),t.flags|=1,Qe(e,t,i,n),t.child;case 14:return Im(e,t,t.type,t.pendingProps,n);case 15:return dv(e,t,t.type,t.pendingProps,n);case 19:return gv(e,t,n);case 31:return ly(e,t,n);case 22:return pv(e,t,n,t.pendingProps);case 24:return ps(t),i=tn(Fe),e===null?(a=Yd(),a===null&&(a=me,s=qd(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},jd(t),_a(t,Fe,a)):(e.lanes&n&&(ih(e,t),go(t,null,null,n),mo()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),_a(t,Fe,i)):(i=s.cache,_a(t,Fe,i),i!==a.cache&&eh(t,[Fe],n,!0))),Qe(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(Q(156,t.tag))}function Ci(e){e.flags|=4}function Gu(e,t,n,i,a){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(Gv())e.flags|=8192;else throw fs=Mc,Zd}else e.flags&=-16777217}function km(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!ux(t))if(Gv())e.flags|=8192;else throw fs=Mc,Zd}function pl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?V0():536870912,e.lanes|=t,vr|=t)}function Xr(e,t){if(!qt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function uy(e,t,n){var i=t.pendingProps;switch(Wd(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return xe(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Wi(Fe),hr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(As(t)?Ci(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Lu())),xe(t),null;case 26:var a=t.type,s=t.memoizedState;return e===null?(Ci(t),s!==null?(xe(t),km(t,s)):(xe(t),Gu(t,a,null,i,n))):s?s!==e.memoizedState?(Ci(t),xe(t),km(t,s)):(xe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Ci(t),xe(t),Gu(t,a,e,i,n)),null;case 27:if(pc(t),n=Ca.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Ci(t);else{if(!i){if(t.stateNode===null)throw Error(Q(166));return xe(t),null}e=xi.current,As(t)?vm(t):(e=ox(a,i,n),t.stateNode=e,Ci(t))}return xe(t),null;case 5:if(pc(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Ci(t);else{if(!i){if(t.stateNode===null)throw Error(Q(166));return xe(t),null}if(s=xi.current,As(t))vm(t);else{var r=Pc(Ca.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[Je]=t,s[yn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;t:switch(nn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Ci(t)}}return xe(t),Gu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Ci(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(Q(166));if(e=Ca.current,As(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=$e,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[Je]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||ix(e.nodeValue,n)),e||Ba(t,!0)}else e=Pc(e).createTextNode(i),e[Je]=t,t.stateNode=e}return xe(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=As(t),n!==null){if(e===null){if(!i)throw Error(Q(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(557));e[Je]=t}else ds(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;xe(t),e=!1}else n=Lu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(wn(t),t):(wn(t),null);if(t.flags&128)throw Error(Q(558))}return xe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=As(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(Q(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(Q(317));a[Je]=t}else ds(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;xe(t),a=!1}else a=Lu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(wn(t),t):(wn(t),null)}return wn(t),t.flags&128?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),pl(t,t.updateQueue),xe(t),null);case 4:return hr(),e===null&&vp(t.stateNode.containerInfo),xe(t),null;case 10:return Wi(t.type),xe(t),null;case 19:if(je(we),i=t.memoizedState,i===null)return xe(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)Xr(i,!1);else{if(Ae!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Ec(e),s!==null){for(t.flags|=128,Xr(i,!1),e=s.updateQueue,t.updateQueue=e,pl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)v_(n,e),n=n.sibling;return ve(we,we.current&1|2),qt&&Fi(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Ln()>wc&&(t.flags|=128,a=!0,Xr(i,!1),t.lanes=4194304)}else{if(!a)if(e=Ec(s),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,pl(t,e),Xr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!qt)return xe(t),null}else 2*Ln()-i.renderingStartTime>wc&&n!==536870912&&(t.flags|=128,a=!0,Xr(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(e=i.last,e!==null?e.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Ln(),e.sibling=null,n=we.current,ve(we,a?n&1|2:n&1),qt&&Fi(t,i.treeForkCount),e):(xe(t),null);case 22:case 23:return wn(t),Kd(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?n&536870912&&!(t.flags&128)&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),n=t.updateQueue,n!==null&&pl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&je(us),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Wi(Fe),xe(t),null;case 25:return null;case 30:return null}throw Error(Q(156,t.tag))}function fy(e,t){switch(Wd(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Wi(Fe),hr(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return pc(t),null;case 31:if(t.memoizedState!==null){if(wn(t),t.alternate===null)throw Error(Q(340));ds()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(wn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Q(340));ds()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return je(we),null;case 4:return hr(),null;case 10:return Wi(t.type),null;case 22:case 23:return wn(t),Kd(),e!==null&&je(us),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Wi(Fe),null;case 25:return null;default:return null}}function vv(e,t){switch(Wd(t),t.tag){case 3:Wi(Fe),hr();break;case 26:case 27:case 5:pc(t);break;case 4:hr();break;case 31:t.memoizedState!==null&&wn(t);break;case 13:wn(t);break;case 19:je(we);break;case 10:Wi(t.type);break;case 22:case 23:wn(t),Kd(),e!==null&&je(us);break;case 24:Wi(Fe)}}function Zo(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){oe(t,t.return,o)}}function za(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(h){oe(a,l,h)}}}i=i.next}while(i!==s)}}catch(h){oe(t,t.return,h)}}function xv(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{C_(t,n)}catch(i){oe(e,e.return,i)}}}function Sv(e,t,n){n.props=_s(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){oe(e,t,i)}}function vo(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(a){oe(e,t,a)}}function gi(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){oe(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){oe(e,t,a)}else n.current=null}function Mv(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){oe(e,e.return,a)}}function Vu(e,t,n){try{var i=e.stateNode;Ny(i,e.type,n,t),i[yn]=t}catch(a){oe(e,e.return,a)}}function yv(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ka(e.type)||e.tag===4}function ku(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||yv(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ka(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ph(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Gi));else if(i!==4&&(i===27&&ka(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(ph(e,t,n),e=e.sibling;e!==null;)ph(e,t,n),e=e.sibling}function Cc(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&ka(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Cc(e,t,n),e=e.sibling;e!==null;)Cc(e,t,n),e=e.sibling}function Ev(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);nn(t,i,n),t[Je]=e,t[yn]=n}catch(s){oe(e,e.return,s)}}var Bi=!1,Ie=!1,Xu=!1,Xm=typeof WeakSet=="function"?WeakSet:Set,Ye=null;function hy(e,t){if(e=e.containerInfo,Mh=zc,e=u_(e),Hd(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,h=0,p=e,u=null;e:for(;;){for(var d;p!==n||a!==0&&p.nodeType!==3||(o=r+a),p!==s||i!==0&&p.nodeType!==3||(l=r+i),p.nodeType===3&&(r+=p.nodeValue.length),(d=p.firstChild)!==null;)u=p,p=d;for(;;){if(p===e)break e;if(u===n&&++c===a&&(o=r),u===s&&++h===i&&(l=r),(d=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=d}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(yh={focusedElem:e,selectionRange:n},zc=!1,Ye=t;Ye!==null;)if(t=Ye,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ye=e;else for(;Ye!==null;){switch(t=Ye,s=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&s!==null){e=void 0,n=t,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var _=_s(n.type,a);e=i.getSnapshotBeforeUpdate(_,s),i.__reactInternalSnapshotBeforeUpdate=e}catch(y){oe(n,n.return,y)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)bh(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":bh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(Q(163))}if(e=t.sibling,e!==null){e.return=t.return,Ye=e;break}Ye=t.return}}function bv(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Di(e,n),i&4&&Zo(5,n);break;case 1:if(Di(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){oe(n,n.return,r)}else{var a=_s(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){oe(n,n.return,r)}}i&64&&xv(n),i&512&&vo(n,n.return);break;case 3:if(Di(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{C_(e,t)}catch(r){oe(n,n.return,r)}}break;case 27:t===null&&i&4&&Ev(n);case 26:case 5:Di(e,n),t===null&&i&4&&Mv(n),i&512&&vo(n,n.return);break;case 12:Di(e,n);break;case 31:Di(e,n),i&4&&Rv(e,n);break;case 13:Di(e,n),i&4&&Cv(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=My.bind(null,n),Gy(e,n))));break;case 22:if(i=n.memoizedState!==null||Bi,!i){t=t!==null&&t.memoizedState!==null||Ie,a=Bi;var s=Ie;Bi=i,(Ie=t)&&!s?Ii(e,n,(n.subtreeFlags&8772)!==0):Di(e,n),Bi=a,Ie=s}break;case 30:break;default:Di(e,n)}}function Tv(e){var t=e.alternate;t!==null&&(e.alternate=null,Tv(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Od(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ee=null,gn=!1;function wi(e,t,n){for(n=n.child;n!==null;)Av(e,t,n),n=n.sibling}function Av(e,t,n){if(Nn&&typeof Nn.onCommitFiberUnmount=="function")try{Nn.onCommitFiberUnmount(Go,n)}catch{}switch(n.tag){case 26:Ie||gi(n,t),wi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ie||gi(n,t);var i=Ee,a=gn;ka(n.type)&&(Ee=n.stateNode,gn=!1),wi(e,t,n),yo(n.stateNode),Ee=i,gn=a;break;case 5:Ie||gi(n,t);case 6:if(i=Ee,a=gn,Ee=null,wi(e,t,n),Ee=i,gn=a,Ee!==null)if(gn)try{(Ee.nodeType===9?Ee.body:Ee.nodeName==="HTML"?Ee.ownerDocument.body:Ee).removeChild(n.stateNode)}catch(s){oe(n,t,s)}else try{Ee.removeChild(n.stateNode)}catch(s){oe(n,t,s)}break;case 18:Ee!==null&&(gn?(e=Ee,ig(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),yr(e)):ig(Ee,n.stateNode));break;case 4:i=Ee,a=gn,Ee=n.stateNode.containerInfo,gn=!0,wi(e,t,n),Ee=i,gn=a;break;case 0:case 11:case 14:case 15:za(2,n,t),Ie||za(4,n,t),wi(e,t,n);break;case 1:Ie||(gi(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Sv(n,t,i)),wi(e,t,n);break;case 21:wi(e,t,n);break;case 22:Ie=(i=Ie)||n.memoizedState!==null,wi(e,t,n),Ie=i;break;default:wi(e,t,n)}}function Rv(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{yr(e)}catch(n){oe(t,t.return,n)}}}function Cv(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{yr(e)}catch(n){oe(t,t.return,n)}}function dy(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Xm),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Xm),t;default:throw Error(Q(435,e.tag))}}function ml(e,t){var n=dy(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=yy.bind(null,e,i);i.then(a,a)}})}function dn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(ka(o.type)){Ee=o.stateNode,gn=!1;break t}break;case 5:Ee=o.stateNode,gn=!1;break t;case 3:case 4:Ee=o.stateNode.containerInfo,gn=!0;break t}o=o.return}if(Ee===null)throw Error(Q(160));Av(s,r,a),Ee=null,gn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)wv(t,e),t=t.sibling}var ii=null;function wv(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:dn(t,e),pn(e),i&4&&(za(3,e,e.return),Zo(3,e),za(5,e,e.return));break;case 1:dn(t,e),pn(e),i&512&&(Ie||n===null||gi(n,n.return)),i&64&&Bi&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=ii;if(dn(t,e),pn(e),i&512&&(Ie||n===null||gi(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,a=a.ownerDocument||a;e:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[Xo]||s[Je]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),nn(s,i,n),s[Je]=e,Ze(s),i=s;break t;case"link":var r=ug("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}s=a.createElement(i),nn(s,i,n),a.head.appendChild(s);break;case"meta":if(r=ug("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}s=a.createElement(i),nn(s,i,n),a.head.appendChild(s);break;default:throw Error(Q(468,i))}s[Je]=e,Ze(s),i=s}e.stateNode=i}else fg(a,e.type,e.stateNode);else e.stateNode=cg(a,i,e.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?fg(a,e.type,e.stateNode):cg(a,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Vu(e,e.memoizedProps,n.memoizedProps)}break;case 27:dn(t,e),pn(e),i&512&&(Ie||n===null||gi(n,n.return)),n!==null&&i&4&&Vu(e,e.memoizedProps,n.memoizedProps);break;case 5:if(dn(t,e),pn(e),i&512&&(Ie||n===null||gi(n,n.return)),e.flags&32){a=e.stateNode;try{pr(a,"")}catch(_){oe(e,e.return,_)}}i&4&&e.stateNode!=null&&(a=e.memoizedProps,Vu(e,a,n!==null?n.memoizedProps:a)),i&1024&&(Xu=!0);break;case 6:if(dn(t,e),pn(e),i&4){if(e.stateNode===null)throw Error(Q(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(_){oe(e,e.return,_)}}break;case 3:if(ic=null,a=ii,ii=Ic(t.containerInfo),dn(t,e),ii=a,pn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{yr(t.containerInfo)}catch(_){oe(e,e.return,_)}Xu&&(Xu=!1,Dv(e));break;case 4:i=ii,ii=Ic(e.stateNode.containerInfo),dn(t,e),pn(e),ii=i;break;case 12:dn(t,e),pn(e);break;case 31:dn(t,e),pn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ml(e,i)));break;case 13:dn(t,e),pn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(su=Ln()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ml(e,i)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Bi,h=Ie;if(Bi=c||a,Ie=h||l,dn(t,e),Ie=h,Bi=c,pn(e),i&8192)t:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Bi||Ie||ns(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var p=l.memoizedProps.style,u=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(_){oe(l,l.return,_)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(_){oe(l,l.return,_)}}}else if(t.tag===18){if(n===null){l=t;try{var d=l.stateNode;a?ag(d,!0):ag(l.stateNode,!1)}catch(_){oe(l,l.return,_)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,ml(e,n))));break;case 19:dn(t,e),pn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ml(e,i)));break;case 30:break;case 21:break;default:dn(t,e),pn(e)}}function pn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(yv(i)){n=i;break}i=i.return}if(n==null)throw Error(Q(160));switch(n.tag){case 27:var a=n.stateNode,s=ku(e);Cc(e,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(pr(r,""),n.flags&=-33);var o=ku(e);Cc(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=ku(e);ph(e,c,l);break;default:throw Error(Q(161))}}catch(h){oe(e,e.return,h)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Dv(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Dv(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Di(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)bv(e,t.alternate,t),t=t.sibling}function ns(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:za(4,t,t.return),ns(t);break;case 1:gi(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Sv(t,t.return,n),ns(t);break;case 27:yo(t.stateNode);case 26:case 5:gi(t,t.return),ns(t);break;case 22:t.memoizedState===null&&ns(t);break;case 30:ns(t);break;default:ns(t)}e=e.sibling}}function Ii(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags;switch(s.tag){case 0:case 11:case 15:Ii(a,s,n),Zo(4,s);break;case 1:if(Ii(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){oe(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)R_(l[a],o)}catch(c){oe(i,i.return,c)}}n&&r&64&&xv(s),vo(s,s.return);break;case 27:Ev(s);case 26:case 5:Ii(a,s,n),n&&i===null&&r&4&&Mv(s),vo(s,s.return);break;case 12:Ii(a,s,n);break;case 31:Ii(a,s,n),n&&r&4&&Rv(a,s);break;case 13:Ii(a,s,n),n&&r&4&&Cv(a,s);break;case 22:s.memoizedState===null&&Ii(a,s,n),vo(s,s.return);break;case 30:break;default:Ii(a,s,n)}t=t.sibling}}function hp(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&qo(n))}function dp(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&qo(e))}function $n(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Uv(e,t,n,i),t=t.sibling}function Uv(e,t,n,i){var a=t.flags;switch(t.tag){case 0:case 11:case 15:$n(e,t,n,i),a&2048&&Zo(9,t);break;case 1:$n(e,t,n,i);break;case 3:$n(e,t,n,i),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&qo(e)));break;case 12:if(a&2048){$n(e,t,n,i),e=t.stateNode;try{var s=t.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){oe(t,t.return,l)}}else $n(e,t,n,i);break;case 31:$n(e,t,n,i);break;case 13:$n(e,t,n,i);break;case 23:break;case 22:s=t.stateNode,r=t.alternate,t.memoizedState!==null?s._visibility&2?$n(e,t,n,i):xo(e,t):s._visibility&2?$n(e,t,n,i):(s._visibility|=2,ks(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),a&2048&&hp(r,t);break;case 24:$n(e,t,n,i),a&2048&&dp(t.alternate,t);break;default:$n(e,t,n,i)}}function ks(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:ks(s,r,o,l,a),Zo(8,r);break;case 23:break;case 22:var h=r.stateNode;r.memoizedState!==null?h._visibility&2?ks(s,r,o,l,a):xo(s,r):(h._visibility|=2,ks(s,r,o,l,a)),a&&c&2048&&hp(r.alternate,r);break;case 24:ks(s,r,o,l,a),a&&c&2048&&dp(r.alternate,r);break;default:ks(s,r,o,l,a)}t=t.sibling}}function xo(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:xo(n,i),a&2048&&hp(i.alternate,i);break;case 24:xo(n,i),a&2048&&dp(i.alternate,i);break;default:xo(n,i)}t=t.sibling}}var so=8192;function Rs(e,t,n){if(e.subtreeFlags&so)for(e=e.child;e!==null;)Lv(e,t,n),e=e.sibling}function Lv(e,t,n){switch(e.tag){case 26:Rs(e,t,n),e.flags&so&&e.memoizedState!==null&&$y(n,ii,e.memoizedState,e.memoizedProps);break;case 5:Rs(e,t,n);break;case 3:case 4:var i=ii;ii=Ic(e.stateNode.containerInfo),Rs(e,t,n),ii=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=so,so=16777216,Rs(e,t,n),so=i):Rs(e,t,n));break;default:Rs(e,t,n)}}function Nv(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Wr(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Ye=i,Pv(i,e)}Nv(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ov(e),e=e.sibling}function Ov(e){switch(e.tag){case 0:case 11:case 15:Wr(e),e.flags&2048&&za(9,e,e.return);break;case 3:Wr(e);break;case 12:Wr(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ec(e)):Wr(e);break;default:Wr(e)}}function ec(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Ye=i,Pv(i,e)}Nv(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:za(8,t,t.return),ec(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,ec(t));break;default:ec(t)}e=e.sibling}}function Pv(e,t){for(;Ye!==null;){var n=Ye;switch(n.tag){case 0:case 11:case 15:za(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:qo(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Ye=i;else t:for(n=e;Ye!==null;){i=Ye;var a=i.sibling,s=i.return;if(Tv(i),i===n){Ye=null;break t}if(a!==null){a.return=s,Ye=a;break t}Ye=s}}}var py={getCacheForType:function(e){var t=tn(Fe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return tn(Fe).controller.signal}},my=typeof WeakMap=="function"?WeakMap:Map,$t=0,me=null,kt=null,Xt=0,re=0,Cn=null,ba=!1,Nr=!1,pp=!1,ta=0,Ae=0,Ha=0,hs=0,mp=0,Un=0,vr=0,So=null,_n=null,mh=!1,su=0,Iv=0,wc=1/0,Dc=null,La=null,He=0,Na=null,xr=null,qi=0,gh=0,_h=null,Fv=null,Mo=0,vh=null;function Pn(){return $t&2&&Xt!==0?Xt&-Xt:Ct.T!==null?_p():q0()}function Bv(){if(Un===0)if(!(Xt&536870912)||qt){var e=ol;ol<<=1,!(ol&3932160)&&(ol=262144),Un=e}else Un=536870912;return e=Fn.current,e!==null&&(e.flags|=32),Un}function xn(e,t,n){(e===me&&(re===2||re===9)||e.cancelPendingCommit!==null)&&(Sr(e,0),Ta(e,Xt,Un,!1)),ko(e,n),(!($t&2)||e!==me)&&(e===me&&(!($t&2)&&(hs|=n),Ae===4&&Ta(e,Xt,Un,!1)),bi(e))}function zv(e,t,n){if($t&6)throw Error(Q(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Vo(e,t),a=i?vy(e,t):Wu(e,t,!0),s=i;do{if(a===0){Nr&&!i&&Ta(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!gy(n)){a=Wu(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=So;var l=o.current.memoizedState.isDehydrated;if(l&&(Sr(o,r).flags|=256),r=Wu(o,r,!1),r!==2){if(pp&&!l){o.errorRecoveryDisabledLanes|=s,hs|=s,a=4;break t}s=_n,_n=a,s!==null&&(_n===null?_n=s:_n.push.apply(_n,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){Sr(e,0),Ta(e,t,0,!0);break}t:{switch(i=e,s=a,s){case 0:case 1:throw Error(Q(345));case 4:if((t&4194048)!==t)break;case 6:Ta(i,t,Un,!ba);break t;case 2:_n=null;break;case 3:case 5:break;default:throw Error(Q(329))}if((t&62914560)===t&&(a=su+300-Ln(),10<a)){if(Ta(i,t,Un,!ba),Zc(i,0,!0)!==0)break t;qi=t,i.timeoutHandle=sx(Wm.bind(null,i,n,_n,Dc,mh,t,Un,hs,vr,ba,s,"Throttled",-0,0),a);break t}Wm(i,n,_n,Dc,mh,t,Un,hs,vr,ba,s,null,-0,0)}}break}while(!0);bi(e)}function Wm(e,t,n,i,a,s,r,o,l,c,h,p,u,d){if(e.timeoutHandle=-1,p=t.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Gi},Lv(t,s,p);var _=(s&62914560)===s?su-Ln():(s&4194048)===s?Iv-Ln():0;if(_=tE(p,_),_!==null){qi=s,e.cancelPendingCommit=_(Ym.bind(null,e,t,s,n,i,a,r,o,l,h,p,null,u,d)),Ta(e,s,r,!c);return}}Ym(e,t,s,n,i,a,r,o,l)}function gy(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!In(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ta(e,t,n,i){t&=~mp,t&=~hs,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-On(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&k0(e,n,t)}function ru(){return $t&6?!0:(jo(0),!1)}function gp(){if(kt!==null){if(re===0)var e=kt.return;else e=kt,Vi=Es=null,ep(e),or=null,wo=0,e=kt;for(;e!==null;)vv(e.alternate,e),e=e.return;kt=null}}function Sr(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Iy(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),qi=0,gp(),me=e,kt=n=Xi(e.current,null),Xt=t,re=0,Cn=null,ba=!1,Nr=Vo(e,t),pp=!1,vr=Un=mp=hs=Ha=Ae=0,_n=So=null,mh=!1,t&8&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var a=31-On(i),s=1<<a;t|=e[a],i&=~s}return ta=t,Jc(),n}function Hv(e,t){Pt=null,Ct.H=Uo,t===Lr||t===tu?(t=Em(),re=3):t===Zd?(t=Em(),re=4):re=t===up?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Cn=t,kt===null&&(Ae=1,Ac(e,qn(t,e.current)))}function Gv(){var e=Fn.current;return e===null?!0:(Xt&4194048)===Xt?jn===null:(Xt&62914560)===Xt||Xt&536870912?e===jn:!1}function Vv(){var e=Ct.H;return Ct.H=Uo,e===null?Uo:e}function kv(){var e=Ct.A;return Ct.A=py,e}function Uc(){Ae=4,ba||(Xt&4194048)!==Xt&&Fn.current!==null||(Nr=!0),!(Ha&134217727)&&!(hs&134217727)||me===null||Ta(me,Xt,Un,!1)}function Wu(e,t,n){var i=$t;$t|=2;var a=Vv(),s=kv();(me!==e||Xt!==t)&&(Dc=null,Sr(e,t)),t=!1;var r=Ae;t:do try{if(re!==0&&kt!==null){var o=kt,l=Cn;switch(re){case 8:gp(),r=6;break t;case 3:case 2:case 9:case 6:Fn.current===null&&(t=!0);var c=re;if(re=0,Cn=null,nr(e,o,l,c),n&&Nr){r=0;break t}break;default:c=re,re=0,Cn=null,nr(e,o,l,c)}}_y(),r=Ae;break}catch(h){Hv(e,h)}while(!0);return t&&e.shellSuspendCounter++,Vi=Es=null,$t=i,Ct.H=a,Ct.A=s,kt===null&&(me=null,Xt=0,Jc()),r}function _y(){for(;kt!==null;)Xv(kt)}function vy(e,t){var n=$t;$t|=2;var i=Vv(),a=kv();me!==e||Xt!==t?(Dc=null,wc=Ln()+500,Sr(e,t)):Nr=Vo(e,t);t:do try{if(re!==0&&kt!==null){t=kt;var s=Cn;e:switch(re){case 1:re=0,Cn=null,nr(e,t,s,1);break;case 2:case 9:if(ym(s)){re=0,Cn=null,qm(t);break}t=function(){re!==2&&re!==9||me!==e||(re=7),bi(e)},s.then(t,t);break t;case 3:re=7;break t;case 4:re=5;break t;case 7:ym(s)?(re=0,Cn=null,qm(t)):(re=0,Cn=null,nr(e,t,s,7));break;case 5:var r=null;switch(kt.tag){case 26:r=kt.memoizedState;case 5:case 27:var o=kt;if(r?ux(r):o.stateNode.complete){re=0,Cn=null;var l=o.sibling;if(l!==null)kt=l;else{var c=o.return;c!==null?(kt=c,ou(c)):kt=null}break e}}re=0,Cn=null,nr(e,t,s,5);break;case 6:re=0,Cn=null,nr(e,t,s,6);break;case 8:gp(),Ae=6;break t;default:throw Error(Q(462))}}xy();break}catch(h){Hv(e,h)}while(!0);return Vi=Es=null,Ct.H=i,Ct.A=a,$t=n,kt!==null?0:(me=null,Xt=0,Jc(),Ae)}function xy(){for(;kt!==null&&!VS();)Xv(kt)}function Xv(e){var t=_v(e.alternate,e,ta);e.memoizedProps=e.pendingProps,t===null?ou(e):kt=t}function qm(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=zm(n,t,t.pendingProps,t.type,void 0,Xt);break;case 11:t=zm(n,t,t.pendingProps,t.type.render,t.ref,Xt);break;case 5:ep(t);default:vv(n,t),t=kt=v_(t,ta),t=_v(n,t,ta)}e.memoizedProps=e.pendingProps,t===null?ou(e):kt=t}function nr(e,t,n,i){Vi=Es=null,ep(t),or=null,wo=0;var a=t.return;try{if(oy(e,a,t,n,Xt)){Ae=1,Ac(e,qn(n,e.current)),kt=null;return}}catch(s){if(a!==null)throw kt=a,s;Ae=1,Ac(e,qn(n,e.current)),kt=null;return}t.flags&32768?(qt||i===1?e=!0:Nr||Xt&536870912?e=!1:(ba=e=!0,(i===2||i===9||i===3||i===6)&&(i=Fn.current,i!==null&&i.tag===13&&(i.flags|=16384))),Wv(t,e)):ou(t)}function ou(e){var t=e;do{if(t.flags&32768){Wv(t,ba);return}e=t.return;var n=uy(t.alternate,t,ta);if(n!==null){kt=n;return}if(t=t.sibling,t!==null){kt=t;return}kt=t=e}while(t!==null);Ae===0&&(Ae=5)}function Wv(e,t){do{var n=fy(e.alternate,e);if(n!==null){n.flags&=32767,kt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){kt=e;return}kt=e=n}while(e!==null);Ae=6,kt=null}function Ym(e,t,n,i,a,s,r,o,l){e.cancelPendingCommit=null;do lu();while(He!==0);if($t&6)throw Error(Q(327));if(t!==null){if(t===e.current)throw Error(Q(177));if(s=t.lanes|t.childLanes,s|=Gd,JS(e,n,s,r,o,l),e===me&&(kt=me=null,Xt=0),xr=t,Na=e,qi=n,gh=s,_h=a,Fv=i,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Ey(mc,function(){return Kv(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,t.subtreeFlags&13878||i){i=Ct.T,Ct.T=null,a=te.p,te.p=2,r=$t,$t|=4;try{hy(e,t,n)}finally{$t=r,te.p=a,Ct.T=i}}He=1,qv(),Yv(),Zv()}}function qv(){if(He===1){He=0;var e=Na,t=xr,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=Ct.T,Ct.T=null;var i=te.p;te.p=2;var a=$t;$t|=4;try{wv(t,e);var s=yh,r=u_(e.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&c_(o.ownerDocument.documentElement,o)){if(l!==null&&Hd(o)){var c=l.start,h=l.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var d=u.getSelection(),_=o.textContent.length,y=Math.min(l.start,_),g=l.end===void 0?y:Math.min(l.end,_);!d.extend&&y>g&&(r=g,g=y,y=r);var f=mm(o,y),m=mm(o,g);if(f&&m&&(d.rangeCount!==1||d.anchorNode!==f.node||d.anchorOffset!==f.offset||d.focusNode!==m.node||d.focusOffset!==m.offset)){var v=p.createRange();v.setStart(f.node,f.offset),d.removeAllRanges(),y>g?(d.addRange(v),d.extend(m.node,m.offset)):(v.setEnd(m.node,m.offset),d.addRange(v))}}}}for(p=[],d=o;d=d.parentNode;)d.nodeType===1&&p.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var S=p[o];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}zc=!!Mh,yh=Mh=null}finally{$t=a,te.p=i,Ct.T=n}}e.current=t,He=2}}function Yv(){if(He===2){He=0;var e=Na,t=xr,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=Ct.T,Ct.T=null;var i=te.p;te.p=2;var a=$t;$t|=4;try{bv(e,t.alternate,t)}finally{$t=a,te.p=i,Ct.T=n}}He=3}}function Zv(){if(He===4||He===3){He=0,kS();var e=Na,t=xr,n=qi,i=Fv;t.subtreeFlags&10256||t.flags&10256?He=5:(He=0,xr=Na=null,jv(e,e.pendingLanes));var a=e.pendingLanes;if(a===0&&(La=null),Nd(n),t=t.stateNode,Nn&&typeof Nn.onCommitFiberRoot=="function")try{Nn.onCommitFiberRoot(Go,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Ct.T,a=te.p,te.p=2,Ct.T=null;try{for(var s=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{Ct.T=t,te.p=a}}qi&3&&lu(),bi(e),a=e.pendingLanes,n&261930&&a&42?e===vh?Mo++:(Mo=0,vh=e):Mo=0,jo(0)}}function jv(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,qo(t)))}function lu(){return qv(),Yv(),Zv(),Kv()}function Kv(){if(He!==5)return!1;var e=Na,t=gh;gh=0;var n=Nd(qi),i=Ct.T,a=te.p;try{te.p=32>n?32:n,Ct.T=null,n=_h,_h=null;var s=Na,r=qi;if(He=0,xr=Na=null,qi=0,$t&6)throw Error(Q(331));var o=$t;if($t|=4,Ov(s.current),Uv(s,s.current,r,n),$t=o,jo(0,!1),Nn&&typeof Nn.onPostCommitFiberRoot=="function")try{Nn.onPostCommitFiberRoot(Go,s)}catch{}return!0}finally{te.p=a,Ct.T=i,jv(e,t)}}function Zm(e,t,n){t=qn(n,t),t=fh(e.stateNode,t,2),e=Ua(e,t,2),e!==null&&(ko(e,2),bi(e))}function oe(e,t,n){if(e.tag===3)Zm(e,e,n);else for(;t!==null;){if(t.tag===3){Zm(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(La===null||!La.has(i))){e=qn(n,e),n=fv(2),i=Ua(t,n,2),i!==null&&(hv(n,i,t,e),ko(i,2),bi(i));break}}t=t.return}}function qu(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new my;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(pp=!0,a.add(n),e=Sy.bind(null,e,t,n),t.then(e,e))}function Sy(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,me===e&&(Xt&n)===n&&(Ae===4||Ae===3&&(Xt&62914560)===Xt&&300>Ln()-su?!($t&2)&&Sr(e,0):mp|=n,vr===Xt&&(vr=0)),bi(e)}function Qv(e,t){t===0&&(t=V0()),e=ys(e,t),e!==null&&(ko(e,t),bi(e))}function My(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Qv(e,n)}function yy(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(Q(314))}i!==null&&i.delete(t),Qv(e,n)}function Ey(e,t){return Ud(e,t)}var Lc=null,Xs=null,xh=!1,Nc=!1,Yu=!1,Aa=0;function bi(e){e!==Xs&&e.next===null&&(Xs===null?Lc=Xs=e:Xs=Xs.next=e),Nc=!0,xh||(xh=!0,Ty())}function jo(e,t){if(!Yu&&Nc){Yu=!0;do for(var n=!1,i=Lc;i!==null;){if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-On(42|e)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,jm(i,s))}else s=Xt,s=Zc(i,i===me?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Vo(i,s)||(n=!0,jm(i,s));i=i.next}while(n);Yu=!1}}function by(){Jv()}function Jv(){Nc=xh=!1;var e=0;Aa!==0&&Py()&&(e=Aa);for(var t=Ln(),n=null,i=Lc;i!==null;){var a=i.next,s=$v(i,t);s===0?(i.next=null,n===null?Lc=a:n.next=a,a===null&&(Xs=n)):(n=i,(e!==0||s&3)&&(Nc=!0)),i=a}He!==0&&He!==5||jo(e),Aa!==0&&(Aa=0)}function $v(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-On(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=QS(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=me,n=Xt,n=Zc(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(re===2||re===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Mu(i),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Vo(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Mu(i),Nd(n)){case 2:case 8:n=H0;break;case 32:n=mc;break;case 268435456:n=G0;break;default:n=mc}return i=tx.bind(null,e),n=Ud(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Mu(i),e.callbackPriority=2,e.callbackNode=null,2}function tx(e,t){if(He!==0&&He!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(lu()&&e.callbackNode!==n)return null;var i=Xt;return i=Zc(e,e===me?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(zv(e,i,t),$v(e,Ln()),e.callbackNode!=null&&e.callbackNode===n?tx.bind(null,e):null)}function jm(e,t){if(lu())return null;zv(e,t,!0)}function Ty(){Fy(function(){$t&6?Ud(z0,by):Jv()})}function _p(){if(Aa===0){var e=mr;e===0&&(e=rl,rl<<=1,!(rl&261888)&&(rl=256)),Aa=e}return Aa}function Km(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ql(""+e)}function Qm(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Ay(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=Km((a[yn]||null).action),r=i.submitter;r&&(t=(t=r[yn]||null)?Km(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new jc("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Aa!==0){var l=r?Qm(a,r):new FormData(a);ch(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?Qm(a,r):new FormData(a),ch(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var Zu=0;Zu<Qf.length;Zu++){var ju=Qf[Zu],Ry=ju.toLowerCase(),Cy=ju[0].toUpperCase()+ju.slice(1);oi(Ry,"on"+Cy)}oi(h_,"onAnimationEnd");oi(d_,"onAnimationIteration");oi(p_,"onAnimationStart");oi("dblclick","onDoubleClick");oi("focusin","onFocus");oi("focusout","onBlur");oi(XM,"onTransitionRun");oi(WM,"onTransitionStart");oi(qM,"onTransitionCancel");oi(m_,"onTransitionEnd");dr("onMouseEnter",["mouseout","mouseover"]);dr("onMouseLeave",["mouseout","mouseover"]);dr("onPointerEnter",["pointerout","pointerover"]);dr("onPointerLeave",["pointerout","pointerover"]);xs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));xs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));xs("onBeforeInput",["compositionend","keypress","textInput","paste"]);xs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));xs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));xs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lo));function ex(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(h){_c(h)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(h){_c(h)}a.currentTarget=null,s=l}}}}function Vt(e,t){var n=t[kf];n===void 0&&(n=t[kf]=new Set);var i=e+"__bubble";n.has(i)||(nx(t,e,2,!1),n.add(i))}function Ku(e,t,n){var i=0;t&&(i|=4),nx(n,e,i,t)}var gl="_reactListening"+Math.random().toString(36).slice(2);function vp(e){if(!e[gl]){e[gl]=!0,Y0.forEach(function(n){n!=="selectionchange"&&(wy.has(n)||Ku(n,!1,e),Ku(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[gl]||(t[gl]=!0,Ku("selectionchange",!1,t))}}function nx(e,t,n,i){switch(mx(t)){case 2:var a=iE;break;case 8:a=aE;break;default:a=yp}n=a.bind(null,t,n,e),a=void 0,!Zf||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Qu(e,t,n,i,a){var s=i;if(!(t&1)&&!(t&2)&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Ys(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}e_(function(){var c=s,h=Id(n),p=[];t:{var u=g_.get(e);if(u!==void 0){var d=jc,_=e;switch(e){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":d=yM;break;case"focusin":_="focus",d=Au;break;case"focusout":_="blur",d=Au;break;case"beforeblur":case"afterblur":d=Au;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=sm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=uM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=TM;break;case h_:case d_:case p_:d=dM;break;case m_:d=RM;break;case"scroll":case"scrollend":d=lM;break;case"wheel":d=wM;break;case"copy":case"cut":case"paste":d=mM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=om;break;case"toggle":case"beforetoggle":d=UM}var y=(t&4)!==0,g=!y&&(e==="scroll"||e==="scrollend"),f=y?u!==null?u+"Capture":null:u;y=[];for(var m=c,v;m!==null;){var S=m;if(v=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||v===null||f===null||(S=bo(m,f),S!=null&&y.push(No(m,S,v))),g)break;m=m.return}0<y.length&&(u=new d(u,_,null,n,h),p.push({event:u,listeners:y}))}}if(!(t&7)){t:{if(u=e==="mouseover"||e==="pointerover",d=e==="mouseout"||e==="pointerout",u&&n!==Yf&&(_=n.relatedTarget||n.fromElement)&&(Ys(_)||_[wr]))break t;if((d||u)&&(u=h.window===h?h:(u=h.ownerDocument)?u.defaultView||u.parentWindow:window,d?(_=n.relatedTarget||n.toElement,d=c,_=_?Ys(_):null,_!==null&&(g=Ho(_),y=_.tag,_!==g||y!==5&&y!==27&&y!==6)&&(_=null)):(d=null,_=c),d!==_)){if(y=sm,S="onMouseLeave",f="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(y=om,S="onPointerLeave",f="onPointerEnter",m="pointer"),g=d==null?u:io(d),v=_==null?u:io(_),u=new y(S,m+"leave",d,n,h),u.target=g,u.relatedTarget=v,S=null,Ys(h)===c&&(y=new y(f,m+"enter",_,n,h),y.target=v,y.relatedTarget=g,S=y),g=S,d&&_)e:{for(y=Dy,f=d,m=_,v=0,S=f;S;S=y(S))v++;S=0;for(var R=m;R;R=y(R))S++;for(;0<v-S;)f=y(f),v--;for(;0<S-v;)m=y(m),S--;for(;v--;){if(f===m||m!==null&&f===m.alternate){y=f;break e}f=y(f),m=y(m)}y=null}else y=null;d!==null&&Jm(p,u,d,y,!1),_!==null&&g!==null&&Jm(p,g,_,y,!0)}}t:{if(u=c?io(c):window,d=u.nodeName&&u.nodeName.toLowerCase(),d==="select"||d==="input"&&u.type==="file")var C=fm;else if(um(u))if(o_)C=GM;else{C=zM;var A=BM}else d=u.nodeName,!d||d.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Pd(c.elementType)&&(C=fm):C=HM;if(C&&(C=C(e,c))){r_(p,C,n,h);break t}A&&A(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&qf(u,"number",u.value)}switch(A=c?io(c):window,e){case"focusin":(um(A)||A.contentEditable==="true")&&(Ks=A,jf=c,fo=null);break;case"focusout":fo=jf=Ks=null;break;case"mousedown":Kf=!0;break;case"contextmenu":case"mouseup":case"dragend":Kf=!1,gm(p,n,h);break;case"selectionchange":if(kM)break;case"keydown":case"keyup":gm(p,n,h)}var M;if(zd)t:{switch(e){case"compositionstart":var b="onCompositionStart";break t;case"compositionend":b="onCompositionEnd";break t;case"compositionupdate":b="onCompositionUpdate";break t}b=void 0}else js?a_(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(i_&&n.locale!=="ko"&&(js||b!=="onCompositionStart"?b==="onCompositionEnd"&&js&&(M=n_()):(Ea=h,Fd="value"in Ea?Ea.value:Ea.textContent,js=!0)),A=Oc(c,b),0<A.length&&(b=new rm(b,e,null,n,h),p.push({event:b,listeners:A}),M?b.data=M:(M=s_(n),M!==null&&(b.data=M)))),(M=NM?OM(e,n):PM(e,n))&&(b=Oc(c,"onBeforeInput"),0<b.length&&(A=new rm("onBeforeInput","beforeinput",null,n,h),p.push({event:A,listeners:b}),A.data=M)),Ay(p,e,c,n,h)}ex(p,t)})}function No(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Oc(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=bo(e,n),a!=null&&i.unshift(No(e,a,s)),a=bo(e,t),a!=null&&i.push(No(e,a,s))),e.tag===3)return i;e=e.return}return[]}function Dy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Jm(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=bo(n,s),c!=null&&r.unshift(No(n,c,l))):a||(c=bo(n,s),c!=null&&r.push(No(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var Uy=/\r\n?/g,Ly=/\u0000|\uFFFD/g;function $m(e){return(typeof e=="string"?e:""+e).replace(Uy,`
`).replace(Ly,"")}function ix(e,t){return t=$m(t),$m(e)===t}function ue(e,t,n,i,a,s){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||pr(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&pr(e,""+i);break;case"className":cl(e,"class",i);break;case"tabIndex":cl(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":cl(e,n,i);break;case"style":t_(e,i,s);break;case"data":if(t!=="object"){cl(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=ql(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&ue(e,t,"name",a.name,a,null),ue(e,t,"formEncType",a.formEncType,a,null),ue(e,t,"formMethod",a.formMethod,a,null),ue(e,t,"formTarget",a.formTarget,a,null)):(ue(e,t,"encType",a.encType,a,null),ue(e,t,"method",a.method,a,null),ue(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=ql(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Gi);break;case"onScroll":i!=null&&Vt("scroll",e);break;case"onScrollEnd":i!=null&&Vt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Q(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(Q(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=ql(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Vt("beforetoggle",e),Vt("toggle",e),Wl(e,"popover",i);break;case"xlinkActuate":Ri(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Ri(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Ri(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Ri(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Ri(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Ri(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Ri(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Ri(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Ri(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Wl(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=rM.get(n)||n,Wl(e,n,i))}}function Sh(e,t,n,i,a,s){switch(n){case"style":t_(e,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Q(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(Q(60));e.innerHTML=n}}break;case"children":typeof i=="string"?pr(e,i):(typeof i=="number"||typeof i=="bigint")&&pr(e,""+i);break;case"onScroll":i!=null&&Vt("scroll",e);break;case"onScrollEnd":i!=null&&Vt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Gi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Z0.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),s=e[yn]||null,s=s!=null?s[n]:null,typeof s=="function"&&e.removeEventListener(t,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,a);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Wl(e,n,i)}}}function nn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Vt("error",e),Vt("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Q(137,t));default:ue(e,t,s,r,n,null)}}a&&ue(e,t,"srcSet",n.srcSet,n,null),i&&ue(e,t,"src",n.src,n,null);return;case"input":Vt("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":a=h;break;case"type":r=h;break;case"checked":l=h;break;case"defaultChecked":c=h;break;case"value":s=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(Q(137,t));break;default:ue(e,t,i,h,n,null)}}Q0(e,s,o,l,c,r,a,!1);return;case"select":Vt("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ue(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?ar(e,!!i,t,!1):n!=null&&ar(e,!!i,n,!0);return;case"textarea":Vt("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(Q(91));break;default:ue(e,t,r,o,n,null)}$0(e,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:ue(e,t,l,i,n,null)}return;case"dialog":Vt("beforetoggle",e),Vt("toggle",e),Vt("cancel",e),Vt("close",e);break;case"iframe":case"object":Vt("load",e);break;case"video":case"audio":for(i=0;i<Lo.length;i++)Vt(Lo[i],e);break;case"image":Vt("error",e),Vt("load",e);break;case"details":Vt("toggle",e);break;case"embed":case"source":case"link":Vt("error",e),Vt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(Q(137,t));default:ue(e,t,c,i,n,null)}return;default:if(Pd(t)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&Sh(e,t,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ue(e,t,o,i,n,null))}function Ny(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,h=null;for(d in n){var p=n[d];if(n.hasOwnProperty(d)&&p!=null)switch(d){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(d)||ue(e,t,d,null,i,p)}}for(var u in i){var d=i[u];if(p=n[u],i.hasOwnProperty(u)&&(d!=null||p!=null))switch(u){case"type":s=d;break;case"name":a=d;break;case"checked":c=d;break;case"defaultChecked":h=d;break;case"value":r=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(Q(137,t));break;default:d!==p&&ue(e,t,u,d,i,p)}}Wf(e,r,o,l,c,h,s,a);return;case"select":d=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":d=l;default:i.hasOwnProperty(s)||ue(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&ue(e,t,a,s,i,l)}t=o,n=r,i=d,u!=null?ar(e,!!n,u,!1):!!i!=!!n&&(t!=null?ar(e,!!n,t,!0):ar(e,!!n,n?[]:"",!1));return;case"textarea":d=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ue(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":d=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(Q(91));break;default:a!==s&&ue(e,t,r,a,i,s)}J0(e,u,d);return;case"option":for(var _ in n)if(u=n[_],n.hasOwnProperty(_)&&u!=null&&!i.hasOwnProperty(_))switch(_){case"selected":e.selected=!1;break;default:ue(e,t,_,null,i,u)}for(l in i)if(u=i[l],d=n[l],i.hasOwnProperty(l)&&u!==d&&(u!=null||d!=null))switch(l){case"selected":e.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:ue(e,t,l,u,i,d)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in n)u=n[y],n.hasOwnProperty(y)&&u!=null&&!i.hasOwnProperty(y)&&ue(e,t,y,null,i,u);for(c in i)if(u=i[c],d=n[c],i.hasOwnProperty(c)&&u!==d&&(u!=null||d!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(Q(137,t));break;default:ue(e,t,c,u,i,d)}return;default:if(Pd(t)){for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!==void 0&&!i.hasOwnProperty(g)&&Sh(e,t,g,void 0,i,u);for(h in i)u=i[h],d=n[h],!i.hasOwnProperty(h)||u===d||u===void 0&&d===void 0||Sh(e,t,h,u,i,d);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&ue(e,t,f,null,i,u);for(p in i)u=i[p],d=n[p],!i.hasOwnProperty(p)||u===d||u==null&&d==null||ue(e,t,p,u,i,d)}function tg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Oy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&tg(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var h=l.transferSize,p=l.initiatorType;h&&tg(p)&&(l=l.responseEnd,r+=h*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(s+r)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Mh=null,yh=null;function Pc(e){return e.nodeType===9?e:e.ownerDocument}function eg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ax(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Eh(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ju=null;function Py(){var e=window.event;return e&&e.type==="popstate"?e===Ju?!1:(Ju=e,!0):(Ju=null,!1)}var sx=typeof setTimeout=="function"?setTimeout:void 0,Iy=typeof clearTimeout=="function"?clearTimeout:void 0,ng=typeof Promise=="function"?Promise:void 0,Fy=typeof queueMicrotask=="function"?queueMicrotask:typeof ng<"u"?function(e){return ng.resolve(null).then(e).catch(By)}:sx;function By(e){setTimeout(function(){throw e})}function ka(e){return e==="head"}function ig(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),yr(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")yo(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,yo(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[Xo]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&yo(e.ownerDocument.body);n=a}while(n);yr(t)}function ag(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function bh(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":bh(n),Od(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function zy(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Xo])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Kn(e.nextSibling),e===null)break}return null}function Hy(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Kn(e.nextSibling),e===null))return null;return e}function rx(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Kn(e.nextSibling),e===null))return null;return e}function Th(e){return e.data==="$?"||e.data==="$~"}function Ah(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Gy(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Kn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Rh=null;function sg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Kn(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function rg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function ox(e,t,n){switch(t=Pc(n),e){case"html":if(e=t.documentElement,!e)throw Error(Q(452));return e;case"head":if(e=t.head,!e)throw Error(Q(453));return e;case"body":if(e=t.body,!e)throw Error(Q(454));return e;default:throw Error(Q(451))}}function yo(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Od(e)}var Qn=new Map,og=new Set;function Ic(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var sa=te.d;te.d={f:Vy,r:ky,D:Xy,C:Wy,L:qy,m:Yy,X:jy,S:Zy,M:Ky};function Vy(){var e=sa.f(),t=ru();return e||t}function ky(e){var t=Dr(e);t!==null&&t.tag===5&&t.type==="form"?tv(t):sa.r(e)}var Or=typeof document>"u"?null:document;function lx(e,t,n){var i=Or;if(i&&typeof t=="string"&&t){var a=Wn(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),og.has(a)||(og.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),nn(t,"link",e),Ze(t),i.head.appendChild(t)))}}function Xy(e){sa.D(e),lx("dns-prefetch",e,null)}function Wy(e,t){sa.C(e,t),lx("preconnect",e,t)}function qy(e,t,n){sa.L(e,t,n);var i=Or;if(i&&e&&t){var a='link[rel="preload"][as="'+Wn(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Wn(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Wn(n.imageSizes)+'"]')):a+='[href="'+Wn(e)+'"]';var s=a;switch(t){case"style":s=Mr(e);break;case"script":s=Pr(e)}Qn.has(s)||(e=ye({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Qn.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(Ko(s))||t==="script"&&i.querySelector(Qo(s))||(t=i.createElement("link"),nn(t,"link",e),Ze(t),i.head.appendChild(t)))}}function Yy(e,t){sa.m(e,t);var n=Or;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+Wn(i)+'"][href="'+Wn(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Pr(e)}if(!Qn.has(s)&&(e=ye({rel:"modulepreload",href:e},t),Qn.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Qo(s)))return}i=n.createElement("link"),nn(i,"link",e),Ze(i),n.head.appendChild(i)}}}function Zy(e,t,n){sa.S(e,t,n);var i=Or;if(i&&e){var a=ir(i).hoistableStyles,s=Mr(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ko(s)))o.loading=5;else{e=ye({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Qn.get(s))&&xp(e,n);var l=r=i.createElement("link");Ze(l),nn(l,"link",e),l._p=new Promise(function(c,h){l.onload=c,l.onerror=h}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,nc(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function jy(e,t){sa.X(e,t);var n=Or;if(n&&e){var i=ir(n).hoistableScripts,a=Pr(e),s=i.get(a);s||(s=n.querySelector(Qo(a)),s||(e=ye({src:e,async:!0},t),(t=Qn.get(a))&&Sp(e,t),s=n.createElement("script"),Ze(s),nn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function Ky(e,t){sa.M(e,t);var n=Or;if(n&&e){var i=ir(n).hoistableScripts,a=Pr(e),s=i.get(a);s||(s=n.querySelector(Qo(a)),s||(e=ye({src:e,async:!0,type:"module"},t),(t=Qn.get(a))&&Sp(e,t),s=n.createElement("script"),Ze(s),nn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function lg(e,t,n,i){var a=(a=Ca.current)?Ic(a):null;if(!a)throw Error(Q(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Mr(n.href),n=ir(a).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Mr(n.href);var s=ir(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(Ko(e)))&&!s._p&&(r.instance=s,r.state.loading=5),Qn.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Qn.set(e,n),s||Qy(a,e,n,r.state))),t&&i===null)throw Error(Q(528,""));return r}if(t&&i!==null)throw Error(Q(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Pr(n),n=ir(a).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(Q(444,e))}}function Mr(e){return'href="'+Wn(e)+'"'}function Ko(e){return'link[rel="stylesheet"]['+e+"]"}function cx(e){return ye({},e,{"data-precedence":e.precedence,precedence:null})}function Qy(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),nn(t,"link",n),Ze(t),e.head.appendChild(t))}function Pr(e){return'[src="'+Wn(e)+'"]'}function Qo(e){return"script[async]"+e}function cg(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Wn(n.href)+'"]');if(i)return t.instance=i,Ze(i),i;var a=ye({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Ze(i),nn(i,"style",a),nc(i,n.precedence,e),t.instance=i;case"stylesheet":a=Mr(n.href);var s=e.querySelector(Ko(a));if(s)return t.state.loading|=4,t.instance=s,Ze(s),s;i=cx(n),(a=Qn.get(a))&&xp(i,a),s=(e.ownerDocument||e).createElement("link"),Ze(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),nn(s,"link",i),t.state.loading|=4,nc(s,n.precedence,e),t.instance=s;case"script":return s=Pr(n.src),(a=e.querySelector(Qo(s)))?(t.instance=a,Ze(a),a):(i=n,(a=Qn.get(s))&&(i=ye({},n),Sp(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),Ze(a),nn(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(Q(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(i=t.instance,t.state.loading|=4,nc(i,n.precedence,e));return t.instance}function nc(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function xp(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Sp(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ic=null;function ug(e,t,n){if(ic===null){var i=new Map,a=ic=new Map;a.set(n,i)}else a=ic,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[Xo]||s[Je]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function fg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Jy(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function ux(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function $y(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=Mr(i.href),s=t.querySelector(Ko(a));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Fc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,Ze(s);return}s=t.ownerDocument||t,i=cx(i),(a=Qn.get(a))&&xp(i,a),s=s.createElement("link"),Ze(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),nn(s,"link",i),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Fc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var $u=0;function tE(e,t){return e.stylesheets&&e.count===0&&ac(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&ac(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&$u===0&&($u=62500*Oy());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ac(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>$u?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Fc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ac(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Bc=null;function ac(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Bc=new Map,t.forEach(eE,e),Bc=null,Fc.call(e))}function eE(e,t){if(!(t.state.loading&4)){var n=Bc.get(e);if(n)var i=n.get(null);else{n=new Map,Bc.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Fc.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var Oo={$$typeof:Hi,Provider:null,Consumer:null,_currentValue:ls,_currentValue2:ls,_threadCount:0};function nE(e,t,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=yu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=yu(0),this.hiddenUpdates=yu(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function fx(e,t,n,i,a,s,r,o,l,c,h,p){return e=new nE(e,t,n,r,l,c,h,p,o),t=1,s===!0&&(t|=24),s=Dn(3,null,null,t),e.current=s,s.stateNode=e,t=qd(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},jd(s),e}function hx(e){return e?(e=$s,e):$s}function dx(e,t,n,i,a,s){a=hx(a),i.context===null?i.context=a:i.pendingContext=a,i=Da(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=Ua(e,i,t),n!==null&&(xn(n,e,t),po(n,e,t))}function hg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Mp(e,t){hg(e,t),(e=e.alternate)&&hg(e,t)}function px(e){if(e.tag===13||e.tag===31){var t=ys(e,67108864);t!==null&&xn(t,e,67108864),Mp(e,67108864)}}function dg(e){if(e.tag===13||e.tag===31){var t=Pn();t=Ld(t);var n=ys(e,t);n!==null&&xn(n,e,t),Mp(e,t)}}var zc=!0;function iE(e,t,n,i){var a=Ct.T;Ct.T=null;var s=te.p;try{te.p=2,yp(e,t,n,i)}finally{te.p=s,Ct.T=a}}function aE(e,t,n,i){var a=Ct.T;Ct.T=null;var s=te.p;try{te.p=8,yp(e,t,n,i)}finally{te.p=s,Ct.T=a}}function yp(e,t,n,i){if(zc){var a=Ch(i);if(a===null)Qu(e,t,i,Hc,n),pg(e,i);else if(rE(a,e,t,n,i))i.stopPropagation();else if(pg(e,i),t&4&&-1<sE.indexOf(e)){for(;a!==null;){var s=Dr(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=ts(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-On(r);o.entanglements[1]|=l,r&=~l}bi(s),!($t&6)&&(wc=Ln()+500,jo(0))}}break;case 31:case 13:o=ys(s,2),o!==null&&xn(o,s,2),ru(),Mp(s,2)}if(s=Ch(i),s===null&&Qu(e,t,i,Hc,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else Qu(e,t,i,null,n)}}function Ch(e){return e=Id(e),Ep(e)}var Hc=null;function Ep(e){if(Hc=null,e=Ys(e),e!==null){var t=Ho(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=O0(t),e!==null)return e;e=null}else if(n===31){if(e=P0(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Hc=e,null}function mx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(XS()){case z0:return 2;case H0:return 8;case mc:case WS:return 32;case G0:return 268435456;default:return 32}default:return 32}}var wh=!1,Oa=null,Pa=null,Ia=null,Po=new Map,Io=new Map,Sa=[],sE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pg(e,t){switch(e){case"focusin":case"focusout":Oa=null;break;case"dragenter":case"dragleave":Pa=null;break;case"mouseover":case"mouseout":Ia=null;break;case"pointerover":case"pointerout":Po.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Io.delete(t.pointerId)}}function qr(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=Dr(t),t!==null&&px(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function rE(e,t,n,i,a){switch(t){case"focusin":return Oa=qr(Oa,e,t,n,i,a),!0;case"dragenter":return Pa=qr(Pa,e,t,n,i,a),!0;case"mouseover":return Ia=qr(Ia,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return Po.set(s,qr(Po.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Io.set(s,qr(Io.get(s)||null,e,t,n,i,a)),!0}return!1}function gx(e){var t=Ys(e.target);if(t!==null){var n=Ho(t);if(n!==null){if(t=n.tag,t===13){if(t=O0(n),t!==null){e.blockedOn=t,Jp(e.priority,function(){dg(n)});return}}else if(t===31){if(t=P0(n),t!==null){e.blockedOn=t,Jp(e.priority,function(){dg(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function sc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ch(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Yf=i,n.target.dispatchEvent(i),Yf=null}else return t=Dr(n),t!==null&&px(t),e.blockedOn=n,!1;t.shift()}return!0}function mg(e,t,n){sc(e)&&n.delete(t)}function oE(){wh=!1,Oa!==null&&sc(Oa)&&(Oa=null),Pa!==null&&sc(Pa)&&(Pa=null),Ia!==null&&sc(Ia)&&(Ia=null),Po.forEach(mg),Io.forEach(mg)}function _l(e,t){e.blockedOn===t&&(e.blockedOn=null,wh||(wh=!0,Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority,oE)))}var vl=null;function gg(e){vl!==e&&(vl=e,Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority,function(){vl===e&&(vl=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(Ep(i||n)===null)continue;break}var s=Dr(n);s!==null&&(e.splice(t,3),t-=3,ch(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function yr(e){function t(l){return _l(l,e)}Oa!==null&&_l(Oa,e),Pa!==null&&_l(Pa,e),Ia!==null&&_l(Ia,e),Po.forEach(t),Io.forEach(t);for(var n=0;n<Sa.length;n++){var i=Sa[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Sa.length&&(n=Sa[0],n.blockedOn===null);)gx(n),n.blockedOn===null&&Sa.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[yn]||null;if(typeof s=="function")r||gg(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[yn]||null)o=r.formAction;else if(Ep(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),gg(n)}}}function _x(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function bp(e){this._internalRoot=e}cu.prototype.render=bp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Q(409));var n=t.current,i=Pn();dx(n,i,e,t,null,null)};cu.prototype.unmount=bp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dx(e.current,2,null,e,null,null),ru(),t[wr]=null}};function cu(e){this._internalRoot=e}cu.prototype.unstable_scheduleHydration=function(e){if(e){var t=q0();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Sa.length&&t!==0&&t<Sa[n].priority;n++);Sa.splice(n,0,e),n===0&&gx(e)}};var _g=L0.version;if(_g!=="19.2.4")throw Error(Q(527,_g,"19.2.4"));te.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Q(188)):(e=Object.keys(e).join(","),Error(Q(268,e)));return e=FS(t),e=e!==null?I0(e):null,e=e===null?null:e.stateNode,e};var lE={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Ct,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var xl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!xl.isDisabled&&xl.supportsFiber)try{Go=xl.inject(lE),Nn=xl}catch{}}qc.createRoot=function(e,t){if(!N0(e))throw Error(Q(299));var n=!1,i="",a=lv,s=cv,r=uv;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=fx(e,1,!1,null,null,n,i,null,a,s,r,_x),e[wr]=t.current,vp(e),new bp(t)};qc.hydrateRoot=function(e,t,n){if(!N0(e))throw Error(Q(299));var i=!1,a="",s=lv,r=cv,o=uv,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=fx(e,1,!0,t,n??null,i,a,l,s,r,o,_x),t.context=hx(null),n=t.current,i=Pn(),i=Ld(i),a=Da(i),a.callback=null,Ua(n,a,i),n=i,t.current.lanes=n,ko(t,n),bi(t),e[wr]=t.current,vp(e),new cu(t)};qc.version="19.2.4";function vx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vx)}catch(e){console.error(e)}}vx(),x0.exports=qc;var cE=x0.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Tp="183",uE=0,vg=1,fE=2,rc=1,hE=2,ro=3,Ga=0,Sn=1,zi=2,Yi=0,ur=1,Dh=2,xg=3,Sg=4,dE=5,as=100,pE=101,mE=102,gE=103,_E=104,vE=200,xE=201,SE=202,ME=203,Uh=204,Lh=205,yE=206,EE=207,bE=208,TE=209,AE=210,RE=211,CE=212,wE=213,DE=214,Nh=0,Oh=1,Ph=2,Er=3,Ih=4,Fh=5,Bh=6,zh=7,xx=0,UE=1,LE=2,Si=0,Sx=1,Mx=2,yx=3,Ex=4,bx=5,Tx=6,Ax=7,Rx=300,vs=301,br=302,tf=303,ef=304,uu=306,Hh=1e3,ki=1001,Gh=1002,en=1003,NE=1004,Sl=1005,on=1006,nf=1007,rs=1008,Zn=1009,Cx=1010,wx=1011,Fo=1012,Ap=1013,yi=1014,_i=1015,ea=1016,Rp=1017,Cp=1018,Bo=1020,Dx=35902,Ux=35899,Lx=1021,Nx=1022,si=1023,na=1026,os=1027,Ox=1028,wp=1029,Tr=1030,Dp=1031,Up=1033,oc=33776,lc=33777,cc=33778,uc=33779,Vh=35840,kh=35841,Xh=35842,Wh=35843,qh=36196,Yh=37492,Zh=37496,jh=37488,Kh=37489,Qh=37490,Jh=37491,$h=37808,td=37809,ed=37810,nd=37811,id=37812,ad=37813,sd=37814,rd=37815,od=37816,ld=37817,cd=37818,ud=37819,fd=37820,hd=37821,dd=36492,pd=36494,md=36495,gd=36283,_d=36284,vd=36285,xd=36286,OE=3200,PE=0,IE=1,Ma="",Hn="srgb",Ar="srgb-linear",Gc="linear",se="srgb",Cs=7680,Mg=519,FE=512,BE=513,zE=514,Lp=515,HE=516,GE=517,Np=518,VE=519,yg=35044,Eg="300 es",vi=2e3,Vc=2001;function kE(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function kc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function XE(){const e=kc("canvas");return e.style.display="block",e}const bg={};function Tg(...e){const t="THREE."+e.shift();console.log(t,...e)}function Px(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Lt(...e){e=Px(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Jt(...e){e=Px(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Xc(...e){const t=e.join(" ");t in bg||(bg[t]=!0,Lt(...e))}function WE(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const qE={[Nh]:Oh,[Ph]:Bh,[Ih]:zh,[Er]:Fh,[Oh]:Nh,[Bh]:Ph,[zh]:Ih,[Fh]:Er};class Ir{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const a=i[t];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],af=Math.PI/180,Sd=180/Math.PI;function Jo(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[e&255]+sn[e>>8&255]+sn[e>>16&255]+sn[e>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function Wt(e,t,n){return Math.max(t,Math.min(n,e))}function YE(e,t){return(e%t+t)%t}function sf(e,t,n){return(1-n)*e+n*t}function Yr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function mn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class he{constructor(t=0,n=0){he.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Wt(this.x,t.x,n.x),this.y=Wt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Wt(this.x,t,n),this.y=Wt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fr{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],h=i[a+2],p=i[a+3],u=s[r+0],d=s[r+1],_=s[r+2],y=s[r+3];if(p!==y||l!==u||c!==d||h!==_){let g=l*u+c*d+h*_+p*y;g<0&&(u=-u,d=-d,_=-_,y=-y,g=-g);let f=1-o;if(g<.9995){const m=Math.acos(g),v=Math.sin(m);f=Math.sin(f*m)/v,o=Math.sin(o*m)/v,l=l*f+u*o,c=c*f+d*o,h=h*f+_*o,p=p*f+y*o}else{l=l*f+u*o,c=c*f+d*o,h=h*f+_*o,p=p*f+y*o;const m=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=m,c*=m,h*=m,p*=m}}t[n]=l,t[n+1]=c,t[n+2]=h,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],h=i[a+3],p=s[r],u=s[r+1],d=s[r+2],_=s[r+3];return t[n]=o*_+h*p+l*d-c*u,t[n+1]=l*_+h*u+c*p-o*d,t[n+2]=c*_+h*d+o*u-l*p,t[n+3]=h*_-o*p-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(a/2),p=o(s/2),u=l(i/2),d=l(a/2),_=l(s/2);switch(r){case"XYZ":this._x=u*h*p+c*d*_,this._y=c*d*p-u*h*_,this._z=c*h*_+u*d*p,this._w=c*h*p-u*d*_;break;case"YXZ":this._x=u*h*p+c*d*_,this._y=c*d*p-u*h*_,this._z=c*h*_-u*d*p,this._w=c*h*p+u*d*_;break;case"ZXY":this._x=u*h*p-c*d*_,this._y=c*d*p+u*h*_,this._z=c*h*_+u*d*p,this._w=c*h*p-u*d*_;break;case"ZYX":this._x=u*h*p-c*d*_,this._y=c*d*p+u*h*_,this._z=c*h*_-u*d*p,this._w=c*h*p+u*d*_;break;case"YZX":this._x=u*h*p+c*d*_,this._y=c*d*p+u*h*_,this._z=c*h*_-u*d*p,this._w=c*h*p-u*d*_;break;case"XZY":this._x=u*h*p-c*d*_,this._y=c*d*p-u*h*_,this._z=c*h*_+u*d*p,this._w=c*h*p+u*d*_;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],h=n[6],p=n[10],u=i+o+p;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(r-a)*d}else if(i>o&&i>p){const d=2*Math.sqrt(1+i-o-p);this._w=(h-l)/d,this._x=.25*d,this._y=(a+r)/d,this._z=(s+c)/d}else if(o>p){const d=2*Math.sqrt(1+o-i-p);this._w=(s-c)/d,this._x=(a+r)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+p-i-o);this._w=(r-a)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+r*o+a*c-s*l,this._y=a*h+r*l+s*o-i*c,this._z=s*h+r*c+i*l-a*o,this._w=r*h-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(t=0,n=0,i=0){G.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Ag.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Ag.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){const n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),h=2*(o*n-s*a),p=2*(s*i-r*n);return this.x=n+l*c+r*p-o*h,this.y=i+l*h+o*c-s*p,this.z=a+l*p+s*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Wt(this.x,t.x,n.x),this.y=Wt(this.y,t.y,n.y),this.z=Wt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Wt(this.x,t,n),this.y=Wt(this.y,t,n),this.z=Wt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return rf.copy(this).projectOnVector(t),this.sub(rf)}reflect(t){return this.sub(rf.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const rf=new G,Ag=new Fr;class Ft{constructor(t,n,i,a,s,r,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){const h=this.elements;return h[0]=t,h[1]=a,h[2]=o,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],p=i[7],u=i[2],d=i[5],_=i[8],y=a[0],g=a[3],f=a[6],m=a[1],v=a[4],S=a[7],R=a[2],C=a[5],A=a[8];return s[0]=r*y+o*m+l*R,s[3]=r*g+o*v+l*C,s[6]=r*f+o*S+l*A,s[1]=c*y+h*m+p*R,s[4]=c*g+h*v+p*C,s[7]=c*f+h*S+p*A,s[2]=u*y+d*m+_*R,s[5]=u*g+d*v+_*C,s[8]=u*f+d*S+_*A,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return n*r*h-n*o*c-i*s*h+i*o*l+a*s*c-a*r*l}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*r-o*c,u=o*l-h*s,d=c*s-r*l,_=n*p+i*u+a*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return t[0]=p*y,t[1]=(a*c-h*i)*y,t[2]=(o*i-a*r)*y,t[3]=u*y,t[4]=(h*n-a*l)*y,t[5]=(a*s-o*n)*y,t[6]=d*y,t[7]=(i*l-c*n)*y,t[8]=(r*n-i*s)*y,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(of.makeScale(t,n)),this}rotate(t){return this.premultiply(of.makeRotation(-t)),this}translate(t,n){return this.premultiply(of.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const of=new Ft,Rg=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cg=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ZE(){const e={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===se&&(a.r=Zi(a.r),a.g=Zi(a.g),a.b=Zi(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===se&&(a.r=fr(a.r),a.g=fr(a.g),a.b=fr(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Ma?Gc:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Xc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Xc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Ar]:{primaries:t,whitePoint:i,transfer:Gc,toXYZ:Rg,fromXYZ:Cg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Hn},outputColorSpaceConfig:{drawingBufferColorSpace:Hn}},[Hn]:{primaries:t,whitePoint:i,transfer:se,toXYZ:Rg,fromXYZ:Cg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Hn}}}),e}const Zt=ZE();function Zi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function fr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let ws;class jE{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ws===void 0&&(ws=kc("canvas")),ws.width=t.width,ws.height=t.height;const a=ws.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=ws}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=kc("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Zi(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Zi(n[i]/255)*255):n[i]=Zi(n[i]);return{data:n,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let KE=0;class Op{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:KE++}),this.uuid=Jo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(lf(a[r].image)):s.push(lf(a[r]))}else s=lf(a);i.url=s}return n||(t.images[this.uuid]=i),i}}function lf(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?jE.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let QE=0;const cf=new G;class fn extends Ir{constructor(t=fn.DEFAULT_IMAGE,n=fn.DEFAULT_MAPPING,i=ki,a=ki,s=on,r=rs,o=si,l=Zn,c=fn.DEFAULT_ANISOTROPY,h=Ma){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=Jo(),this.name="",this.source=new Op(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(cf).x}get height(){return this.source.getSize(cf).y}get depth(){return this.source.getSize(cf).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Lt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Lt(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hh:t.x=t.x-Math.floor(t.x);break;case ki:t.x=t.x<0?0:1;break;case Gh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hh:t.y=t.y-Math.floor(t.y);break;case ki:t.y=t.y<0?0:1;break;case Gh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Rx;fn.DEFAULT_ANISOTROPY=1;class De{constructor(t=0,n=0,i=0,a=1){De.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s;const l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],d=l[5],_=l[9],y=l[2],g=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-y)<.01&&Math.abs(_-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+y)<.1&&Math.abs(_+g)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,S=(d+1)/2,R=(f+1)/2,C=(h+u)/4,A=(p+y)/4,M=(_+g)/4;return v>S&&v>R?v<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(v),a=C/i,s=A/i):S>R?S<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(S),i=C/a,s=M/a):R<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(R),i=A/s,a=M/s),this.set(i,a,s,n),this}let m=Math.sqrt((g-_)*(g-_)+(p-y)*(p-y)+(u-h)*(u-h));return Math.abs(m)<.001&&(m=1),this.x=(g-_)/m,this.y=(p-y)/m,this.z=(u-h)/m,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Wt(this.x,t.x,n.x),this.y=Wt(this.y,t.y,n.y),this.z=Wt(this.z,t.z,n.z),this.w=Wt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Wt(this.x,t,n),this.y=Wt(this.y,t,n),this.z=Wt(this.z,t,n),this.w=Wt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class JE extends Ir{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new De(0,0,t,n),this.scissorTest=!1,this.viewport=new De(0,0,t,n),this.textures=[];const a={width:t,height:n,depth:i.depth},s=new fn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},t.textures[n].image);this.textures[n].source=new Op(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mi extends JE{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Ix extends fn{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=en,this.minFilter=en,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $E extends fn{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=en,this.minFilter=en,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Le{constructor(t,n,i,a,s,r,o,l,c,h,p,u,d,_,y,g){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,h,p,u,d,_,y,g)}set(t,n,i,a,s,r,o,l,c,h,p,u,d,_,y,g){const f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=p,f[14]=u,f[3]=d,f[7]=_,f[11]=y,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,a=1/Ds.setFromMatrixColumn(t,0).length(),s=1/Ds.setFromMatrixColumn(t,1).length(),r=1/Ds.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),h=Math.cos(s),p=Math.sin(s);if(t.order==="XYZ"){const u=r*h,d=r*p,_=o*h,y=o*p;n[0]=l*h,n[4]=-l*p,n[8]=c,n[1]=d+_*c,n[5]=u-y*c,n[9]=-o*l,n[2]=y-u*c,n[6]=_+d*c,n[10]=r*l}else if(t.order==="YXZ"){const u=l*h,d=l*p,_=c*h,y=c*p;n[0]=u+y*o,n[4]=_*o-d,n[8]=r*c,n[1]=r*p,n[5]=r*h,n[9]=-o,n[2]=d*o-_,n[6]=y+u*o,n[10]=r*l}else if(t.order==="ZXY"){const u=l*h,d=l*p,_=c*h,y=c*p;n[0]=u-y*o,n[4]=-r*p,n[8]=_+d*o,n[1]=d+_*o,n[5]=r*h,n[9]=y-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){const u=r*h,d=r*p,_=o*h,y=o*p;n[0]=l*h,n[4]=_*c-d,n[8]=u*c+y,n[1]=l*p,n[5]=y*c+u,n[9]=d*c-_,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){const u=r*l,d=r*c,_=o*l,y=o*c;n[0]=l*h,n[4]=y-u*p,n[8]=_*p+d,n[1]=p,n[5]=r*h,n[9]=-o*h,n[2]=-c*h,n[6]=d*p+_,n[10]=u-y*p}else if(t.order==="XZY"){const u=r*l,d=r*c,_=o*l,y=o*c;n[0]=l*h,n[4]=-p,n[8]=c*h,n[1]=u*p+y,n[5]=r*h,n[9]=d*p-_,n[2]=_*p-d,n[6]=o*h,n[10]=y*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tb,t,eb)}lookAt(t,n,i){const a=this.elements;return Tn.subVectors(t,n),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),ca.crossVectors(i,Tn),ca.lengthSq()===0&&(Math.abs(i.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),ca.crossVectors(i,Tn)),ca.normalize(),Ml.crossVectors(Tn,ca),a[0]=ca.x,a[4]=Ml.x,a[8]=Tn.x,a[1]=ca.y,a[5]=Ml.y,a[9]=Tn.y,a[2]=ca.z,a[6]=Ml.z,a[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],p=i[5],u=i[9],d=i[13],_=i[2],y=i[6],g=i[10],f=i[14],m=i[3],v=i[7],S=i[11],R=i[15],C=a[0],A=a[4],M=a[8],b=a[12],F=a[1],w=a[5],B=a[9],V=a[13],q=a[2],H=a[6],U=a[10],L=a[14],X=a[3],j=a[7],et=a[11],dt=a[15];return s[0]=r*C+o*F+l*q+c*X,s[4]=r*A+o*w+l*H+c*j,s[8]=r*M+o*B+l*U+c*et,s[12]=r*b+o*V+l*L+c*dt,s[1]=h*C+p*F+u*q+d*X,s[5]=h*A+p*w+u*H+d*j,s[9]=h*M+p*B+u*U+d*et,s[13]=h*b+p*V+u*L+d*dt,s[2]=_*C+y*F+g*q+f*X,s[6]=_*A+y*w+g*H+f*j,s[10]=_*M+y*B+g*U+f*et,s[14]=_*b+y*V+g*L+f*dt,s[3]=m*C+v*F+S*q+R*X,s[7]=m*A+v*w+S*H+R*j,s[11]=m*M+v*B+S*U+R*et,s[15]=m*b+v*V+S*L+R*dt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],d=t[14],_=t[3],y=t[7],g=t[11],f=t[15],m=l*d-c*u,v=o*d-c*p,S=o*u-l*p,R=r*d-c*h,C=r*u-l*h,A=r*p-o*h;return n*(y*m-g*v+f*S)-i*(_*m-g*R+f*C)+a*(_*v-y*R+f*A)-s*(_*S-y*C+g*A)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],d=t[11],_=t[12],y=t[13],g=t[14],f=t[15],m=n*o-i*r,v=n*l-a*r,S=n*c-s*r,R=i*l-a*o,C=i*c-s*o,A=a*c-s*l,M=h*y-p*_,b=h*g-u*_,F=h*f-d*_,w=p*g-u*y,B=p*f-d*y,V=u*f-d*g,q=m*V-v*B+S*w+R*F-C*b+A*M;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/q;return t[0]=(o*V-l*B+c*w)*H,t[1]=(a*B-i*V-s*w)*H,t[2]=(y*A-g*C+f*R)*H,t[3]=(u*C-p*A-d*R)*H,t[4]=(l*F-r*V-c*b)*H,t[5]=(n*V-a*F+s*b)*H,t[6]=(g*S-_*A-f*v)*H,t[7]=(h*A-u*S+d*v)*H,t[8]=(r*B-o*F+c*M)*H,t[9]=(i*F-n*B-s*M)*H,t[10]=(_*C-y*S+f*m)*H,t[11]=(p*S-h*C-d*m)*H,t[12]=(o*b-r*w-l*M)*H,t[13]=(n*w-i*b+a*M)*H,t[14]=(y*v-_*R-g*m)*H,t[15]=(h*R-p*v+u*m)*H,this}scale(t){const n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,h=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+i,h*l-a*r,0,c*l-a*o,h*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,h=r+r,p=o+o,u=s*c,d=s*h,_=s*p,y=r*h,g=r*p,f=o*p,m=l*c,v=l*h,S=l*p,R=i.x,C=i.y,A=i.z;return a[0]=(1-(y+f))*R,a[1]=(d+S)*R,a[2]=(_-v)*R,a[3]=0,a[4]=(d-S)*C,a[5]=(1-(u+f))*C,a[6]=(g+m)*C,a[7]=0,a[8]=(_+v)*A,a[9]=(g-m)*A,a[10]=(1-(u+y))*A,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){const a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let r=Ds.set(a[0],a[1],a[2]).length();const o=Ds.set(a[4],a[5],a[6]).length(),l=Ds.set(a[8],a[9],a[10]).length();s<0&&(r=-r),ti.copy(this);const c=1/r,h=1/o,p=1/l;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=p,ti.elements[9]*=p,ti.elements[10]*=p,n.setFromRotationMatrix(ti),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,a,s,r,o=vi,l=!1){const c=this.elements,h=2*s/(n-t),p=2*s/(i-a),u=(n+t)/(n-t),d=(i+a)/(i-a);let _,y;if(l)_=s/(r-s),y=r*s/(r-s);else if(o===vi)_=-(r+s)/(r-s),y=-2*r*s/(r-s);else if(o===Vc)_=-r/(r-s),y=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=vi,l=!1){const c=this.elements,h=2/(n-t),p=2/(i-a),u=-(n+t)/(n-t),d=-(i+a)/(i-a);let _,y;if(l)_=1/(r-s),y=r/(r-s);else if(o===vi)_=-2/(r-s),y=-(r+s)/(r-s);else if(o===Vc)_=-1/(r-s),y=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const Ds=new G,ti=new Le,tb=new G(0,0,0),eb=new G(1,1,1),ca=new G,Ml=new G,Tn=new G,wg=new Le,Dg=new Fr;class ia{constructor(t=0,n=0,i=0,a=ia.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],h=a[9],p=a[2],u=a[6],d=a[10];switch(n){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Wt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Wt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return wg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wg,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Dg.setFromEuler(this),this.setFromQuaternion(Dg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ia.DEFAULT_ORDER="XYZ";class Fx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nb=0;const Ug=new G,Us=new Fr,Ui=new Le,yl=new G,Zr=new G,ib=new G,ab=new Fr,Lg=new G(1,0,0),Ng=new G(0,1,0),Og=new G(0,0,1),Pg={type:"added"},sb={type:"removed"},Ls={type:"childadded",child:null},uf={type:"childremoved",child:null};class Mn extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nb++}),this.uuid=Jo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mn.DEFAULT_UP.clone();const t=new G,n=new ia,i=new Fr,a=new G(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ft}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=Mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Us.setFromAxisAngle(t,n),this.quaternion.multiply(Us),this}rotateOnWorldAxis(t,n){return Us.setFromAxisAngle(t,n),this.quaternion.premultiply(Us),this}rotateX(t){return this.rotateOnAxis(Lg,t)}rotateY(t){return this.rotateOnAxis(Ng,t)}rotateZ(t){return this.rotateOnAxis(Og,t)}translateOnAxis(t,n){return Ug.copy(t).applyQuaternion(this.quaternion),this.position.add(Ug.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Lg,t)}translateY(t){return this.translateOnAxis(Ng,t)}translateZ(t){return this.translateOnAxis(Og,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?yl.copy(t):yl.set(t,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(Zr,yl,this.up):Ui.lookAt(yl,Zr,this.up),this.quaternion.setFromRotationMatrix(Ui),a&&(Ui.extractRotation(a.matrixWorld),Us.setFromRotationMatrix(Ui),this.quaternion.premultiply(Us.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Pg),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(sb),uf.child=t,this.dispatchEvent(uf),uf.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Pg),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,t,ib),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,ab,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,a=t.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const p=l[c];s(t.shapes,p)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),p=r(t.shapes),u=r(t.skeletons),d=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=a,i;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const a=t.children[i];this.add(a.clone())}return this}}Mn.DEFAULT_UP=new G(0,1,0);Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class El extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rb={type:"move"};class ff{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new El,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new El,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new El,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const y of t.hand.values()){const g=n.getJointPose(y,i),f=this._getHandJoint(c,y);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),d=.02,_=.005;c.inputState.pinching&&u>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rb)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new El;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const Bx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ua={h:0,s:0,l:0},bl={h:0,s:0,l:0};function hf(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class jt{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=Zt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Zt.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=Zt.workingColorSpace){if(t=YE(t,1),n=Wt(n,0,1),i=Wt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=hf(r,s,t+1/3),this.g=hf(r,s,t),this.b=hf(r,s,t-1/3)}return Zt.colorSpaceToWorking(this,a),this}setStyle(t,n=Hn){function i(s){s!==void 0&&parseFloat(s)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Lt("Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Hn){const i=Bx[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}copyLinearToSRGB(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Hn){return Zt.workingToColorSpace(rn.copy(this),t),Math.round(Wt(rn.r*255,0,255))*65536+Math.round(Wt(rn.g*255,0,255))*256+Math.round(Wt(rn.b*255,0,255))}getHexString(t=Hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Zt.workingColorSpace){Zt.workingToColorSpace(rn.copy(this),n);const i=rn.r,a=rn.g,s=rn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const p=r-o;switch(c=h<=.5?p/(r+o):p/(2-r-o),r){case i:l=(a-s)/p+(a<s?6:0);break;case a:l=(s-i)/p+2;break;case s:l=(i-a)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,n=Zt.workingColorSpace){return Zt.workingToColorSpace(rn.copy(this),n),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=Hn){Zt.workingToColorSpace(rn.copy(this),t);const n=rn.r,i=rn.g,a=rn.b;return t!==Hn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(ua),this.setHSL(ua.h+t,ua.s+n,ua.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ua),t.getHSL(bl);const i=sf(ua.h,bl.h,n),a=sf(ua.s,bl.s,n),s=sf(ua.l,bl.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new jt;jt.NAMES=Bx;class ob extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ia,this.environmentIntensity=1,this.environmentRotation=new ia,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ei=new G,Li=new G,df=new G,Ni=new G,Ns=new G,Os=new G,Ig=new G,pf=new G,mf=new G,gf=new G,_f=new De,vf=new De,xf=new De;class ai{constructor(t=new G,n=new G,i=new G){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),ei.subVectors(t,n),a.cross(ei);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){ei.subVectors(a,n),Li.subVectors(i,n),df.subVectors(t,n);const r=ei.dot(ei),o=ei.dot(Li),l=ei.dot(df),c=Li.dot(Li),h=Li.dot(df),p=r*c-o*o;if(p===0)return s.set(0,0,0),null;const u=1/p,d=(c*l-o*h)*u,_=(r*h-o*l)*u;return s.set(1-d-_,_,d)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ni.x),l.addScaledVector(r,Ni.y),l.addScaledVector(o,Ni.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return _f.setScalar(0),vf.setScalar(0),xf.setScalar(0),_f.fromBufferAttribute(t,n),vf.fromBufferAttribute(t,i),xf.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(_f,s.x),r.addScaledVector(vf,s.y),r.addScaledVector(xf,s.z),r}static isFrontFacing(t,n,i,a){return ei.subVectors(i,n),Li.subVectors(t,n),ei.cross(Li).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),ei.cross(Li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ai.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return ai.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return ai.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return ai.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ai.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,a=this.b,s=this.c;let r,o;Ns.subVectors(a,i),Os.subVectors(s,i),pf.subVectors(t,i);const l=Ns.dot(pf),c=Os.dot(pf);if(l<=0&&c<=0)return n.copy(i);mf.subVectors(t,a);const h=Ns.dot(mf),p=Os.dot(mf);if(h>=0&&p<=h)return n.copy(a);const u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),n.copy(i).addScaledVector(Ns,r);gf.subVectors(t,s);const d=Ns.dot(gf),_=Os.dot(gf);if(_>=0&&d<=_)return n.copy(s);const y=d*c-l*_;if(y<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(Os,o);const g=h*_-d*p;if(g<=0&&p-h>=0&&d-_>=0)return Ig.subVectors(s,a),o=(p-h)/(p-h+(d-_)),n.copy(a).addScaledVector(Ig,o);const f=1/(g+y+u);return r=y*f,o=u*f,n.copy(i).addScaledVector(Ns,r).addScaledVector(Os,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class $o{constructor(t=new G(1/0,1/0,1/0),n=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ni.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ni.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=ni.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ni):ni.fromBufferAttribute(s,r),ni.applyMatrix4(t.matrixWorld),this.expandByPoint(ni);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tl.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Tl.copy(i.boundingBox)),Tl.applyMatrix4(t.matrixWorld),this.union(Tl)}const a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ni),ni.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(jr),Al.subVectors(this.max,jr),Ps.subVectors(t.a,jr),Is.subVectors(t.b,jr),Fs.subVectors(t.c,jr),fa.subVectors(Is,Ps),ha.subVectors(Fs,Is),Ya.subVectors(Ps,Fs);let n=[0,-fa.z,fa.y,0,-ha.z,ha.y,0,-Ya.z,Ya.y,fa.z,0,-fa.x,ha.z,0,-ha.x,Ya.z,0,-Ya.x,-fa.y,fa.x,0,-ha.y,ha.x,0,-Ya.y,Ya.x,0];return!Sf(n,Ps,Is,Fs,Al)||(n=[1,0,0,0,1,0,0,0,1],!Sf(n,Ps,Is,Fs,Al))?!1:(Rl.crossVectors(fa,ha),n=[Rl.x,Rl.y,Rl.z],Sf(n,Ps,Is,Fs,Al))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ni).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ni).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Oi=[new G,new G,new G,new G,new G,new G,new G,new G],ni=new G,Tl=new $o,Ps=new G,Is=new G,Fs=new G,fa=new G,ha=new G,Ya=new G,jr=new G,Al=new G,Rl=new G,Za=new G;function Sf(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){Za.fromArray(e,s);const o=a.x*Math.abs(Za.x)+a.y*Math.abs(Za.y)+a.z*Math.abs(Za.z),l=t.dot(Za),c=n.dot(Za),h=i.dot(Za);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Oe=new G,Cl=new he;let lb=0;class vn{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lb++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=yg,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Cl.fromBufferAttribute(this,n),Cl.applyMatrix3(t),this.setXY(n,Cl.x,Cl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Oe.fromBufferAttribute(this,n),Oe.applyMatrix3(t),this.setXYZ(n,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Oe.fromBufferAttribute(this,n),Oe.applyMatrix4(t),this.setXYZ(n,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Oe.fromBufferAttribute(this,n),Oe.applyNormalMatrix(t),this.setXYZ(n,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Oe.fromBufferAttribute(this,n),Oe.transformDirection(t),this.setXYZ(n,Oe.x,Oe.y,Oe.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Yr(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=mn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Yr(n,this.array)),n}setX(t,n){return this.normalized&&(n=mn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Yr(n,this.array)),n}setY(t,n){return this.normalized&&(n=mn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Yr(n,this.array)),n}setZ(t,n){return this.normalized&&(n=mn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Yr(n,this.array)),n}setW(t,n){return this.normalized&&(n=mn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array),a=mn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array),a=mn(a,this.array),s=mn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yg&&(t.usage=this.usage),t}}class zx extends vn{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class Hx extends vn{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class ji extends vn{constructor(t,n,i){super(new Float32Array(t),n,i)}}const cb=new $o,Kr=new G,Mf=new G;class fu{constructor(t=new G,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):cb.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Kr.subVectors(t,this.center);const n=Kr.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Kr,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Mf.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Kr.copy(t.center).add(Mf)),this.expandByPoint(Kr.copy(t.center).sub(Mf))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ub=0;const Bn=new Le,yf=new Mn,Bs=new G,An=new $o,Qr=new $o,qe=new G;class li extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ub++}),this.uuid=Jo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(kE(t)?Hx:zx)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ft().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,n,i){return Bn.makeTranslation(t,n,i),this.applyMatrix4(Bn),this}scale(t,n,i){return Bn.makeScale(t,n,i),this.applyMatrix4(Bn),this}lookAt(t){return yf.lookAt(t),yf.updateMatrix(),this.applyMatrix4(yf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=t.length;a<s;a++){const r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ji(i,3))}else{const i=Math.min(t.length,n.count);for(let a=0;a<i;a++){const s=t[a];n.setXYZ(a,s.x,s.y,s.z||0)}t.length>n.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $o);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];An.setFromBufferAttribute(s),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fu);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Qr.setFromBufferAttribute(o),this.morphTargetsRelative?(qe.addVectors(An.min,Qr.min),An.expandByPoint(qe),qe.addVectors(An.max,Qr.max),An.expandByPoint(qe)):(An.expandByPoint(Qr.min),An.expandByPoint(Qr.max))}An.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)qe.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(qe));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)qe.fromBufferAttribute(o,c),l&&(Bs.fromBufferAttribute(t,c),qe.add(Bs)),a=Math.max(a,i.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let M=0;M<i.count;M++)o[M]=new G,l[M]=new G;const c=new G,h=new G,p=new G,u=new he,d=new he,_=new he,y=new G,g=new G;function f(M,b,F){c.fromBufferAttribute(i,M),h.fromBufferAttribute(i,b),p.fromBufferAttribute(i,F),u.fromBufferAttribute(s,M),d.fromBufferAttribute(s,b),_.fromBufferAttribute(s,F),h.sub(c),p.sub(c),d.sub(u),_.sub(u);const w=1/(d.x*_.y-_.x*d.y);isFinite(w)&&(y.copy(h).multiplyScalar(_.y).addScaledVector(p,-d.y).multiplyScalar(w),g.copy(p).multiplyScalar(d.x).addScaledVector(h,-_.x).multiplyScalar(w),o[M].add(y),o[b].add(y),o[F].add(y),l[M].add(g),l[b].add(g),l[F].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:t.count}]);for(let M=0,b=m.length;M<b;++M){const F=m[M],w=F.start,B=F.count;for(let V=w,q=w+B;V<q;V+=3)f(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const v=new G,S=new G,R=new G,C=new G;function A(M){R.fromBufferAttribute(a,M),C.copy(R);const b=o[M];v.copy(b),v.sub(R.multiplyScalar(R.dot(b))).normalize(),S.crossVectors(C,b);const w=S.dot(l[M])<0?-1:1;r.setXYZW(M,v.x,v.y,v.z,w)}for(let M=0,b=m.length;M<b;++M){const F=m[M],w=F.start,B=F.count;for(let V=w,q=w+B;V<q;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new vn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);const a=new G,s=new G,r=new G,o=new G,l=new G,c=new G,h=new G,p=new G;if(t)for(let u=0,d=t.count;u<d;u+=3){const _=t.getX(u+0),y=t.getX(u+1),g=t.getX(u+2);a.fromBufferAttribute(n,_),s.fromBufferAttribute(n,y),r.fromBufferAttribute(n,g),h.subVectors(r,s),p.subVectors(a,s),h.cross(p),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=n.count;u<d;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),h.subVectors(r,s),p.subVectors(a,s),h.cross(p),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)qe.fromBufferAttribute(t,n),qe.normalize(),t.setXYZ(n,qe.x,qe.y,qe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h);let d=0,_=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*h;for(let f=0;f<h;f++)u[_++]=c[d++]}return new vn(u,h,p)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new li,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,p=c.length;h<p;h++){const u=c[h],d=t(u,i);l.push(d)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){const d=c[p];h.push(d.toJSON(t.data))}h.length>0&&(a[l]=h,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const a=t.attributes;for(const c in a){const h=a[c];this.setAttribute(c,h.clone(n))}const s=t.morphAttributes;for(const c in s){const h=[],p=s[c];for(let u=0,d=p.length;u<d;u++)h.push(p[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let fb=0;class tl extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fb++}),this.uuid=Jo(),this.name="",this.type="Material",this.blending=ur,this.side=Ga,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uh,this.blendDst=Lh,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Lt(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Lt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==Ga&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Uh&&(i.blendSrc=this.blendSrc),this.blendDst!==Lh&&(i.blendDst=this.blendDst),this.blendEquation!==as&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Er&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Pi=new G,Ef=new G,wl=new G,da=new G,bf=new G,Dl=new G,Tf=new G;class Gx{constructor(t=new G,n=new G(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Pi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){Ef.copy(t).add(n).multiplyScalar(.5),wl.copy(n).sub(t).normalize(),da.copy(this.origin).sub(Ef);const s=t.distanceTo(n)*.5,r=-this.direction.dot(wl),o=da.dot(this.direction),l=-da.dot(wl),c=da.lengthSq(),h=Math.abs(1-r*r);let p,u,d,_;if(h>0)if(p=r*l-o,u=r*o-l,_=s*h,p>=0)if(u>=-_)if(u<=_){const y=1/h;p*=y,u*=y,d=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=s,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u=-s,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u<=-_?(p=Math.max(0,-(-r*s+o)),u=p>0?-s:Math.min(Math.max(-s,-l),s),d=-p*p+u*(u+2*l)+c):u<=_?(p=0,u=Math.min(Math.max(-s,-l),s),d=u*(u+2*l)+c):(p=Math.max(0,-(r*s+o)),u=p>0?s:Math.min(Math.max(-s,-l),s),d=-p*p+u*(u+2*l)+c);else u=r>0?-s:s,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),a&&a.copy(Ef).addScaledVector(wl,u),d}intersectSphere(t,n){Pi.subVectors(t.center,this.origin);const i=Pi.dot(this.direction),a=Pi.dot(Pi)-i*i,s=t.radius*t.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,n,i,a,s){bf.subVectors(n,t),Dl.subVectors(i,t),Tf.crossVectors(bf,Dl);let r=this.direction.dot(Tf),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;da.subVectors(this.origin,t);const l=o*this.direction.dot(Dl.crossVectors(da,Dl));if(l<0)return null;const c=o*this.direction.dot(bf.cross(da));if(c<0||l+c>r)return null;const h=-o*da.dot(Tf);return h<0?null:this.at(h/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vx extends tl{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ia,this.combine=xx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fg=new Le,ja=new Gx,Ul=new fu,Bg=new G,Ll=new G,Nl=new G,Ol=new G,Af=new G,Pl=new G,zg=new G,Il=new G;class aa extends Mn{constructor(t=new li,n=new Vx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(s&&o){Pl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],p=s[l];h!==0&&(Af.fromBufferAttribute(p,t),r?Pl.addScaledVector(Af,h):Pl.addScaledVector(Af.sub(n),h))}n.add(Pl)}return n}raycast(t,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ul.copy(i.boundingSphere),Ul.applyMatrix4(s),ja.copy(t.ray).recast(t.near),!(Ul.containsPoint(ja.origin)===!1&&(ja.intersectSphere(Ul,Bg)===null||ja.origin.distanceToSquared(Bg)>(t.far-t.near)**2))&&(Fg.copy(s).invert(),ja.copy(t.ray).applyMatrix4(Fg),!(i.boundingBox!==null&&ja.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,ja)))}_computeIntersections(t,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,y=u.length;_<y;_++){const g=u[_],f=r[g.materialIndex],m=Math.max(g.start,d.start),v=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let S=m,R=v;S<R;S+=3){const C=o.getX(S),A=o.getX(S+1),M=o.getX(S+2);a=Fl(this,f,t,i,c,h,p,C,A,M),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=g.materialIndex,n.push(a))}}else{const _=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let g=_,f=y;g<f;g+=3){const m=o.getX(g),v=o.getX(g+1),S=o.getX(g+2);a=Fl(this,r,t,i,c,h,p,m,v,S),a&&(a.faceIndex=Math.floor(g/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,y=u.length;_<y;_++){const g=u[_],f=r[g.materialIndex],m=Math.max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let S=m,R=v;S<R;S+=3){const C=S,A=S+1,M=S+2;a=Fl(this,f,t,i,c,h,p,C,A,M),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=g.materialIndex,n.push(a))}}else{const _=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let g=_,f=y;g<f;g+=3){const m=g,v=g+1,S=g+2;a=Fl(this,r,t,i,c,h,p,m,v,S),a&&(a.faceIndex=Math.floor(g/3),n.push(a))}}}}function hb(e,t,n,i,a,s,r,o){let l;if(t.side===Sn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===Ga,o),l===null)return null;Il.copy(o),Il.applyMatrix4(e.matrixWorld);const c=n.ray.origin.distanceTo(Il);return c<n.near||c>n.far?null:{distance:c,point:Il.clone(),object:e}}function Fl(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,Ll),e.getVertexPosition(l,Nl),e.getVertexPosition(c,Ol);const h=hb(e,t,n,i,Ll,Nl,Ol,zg);if(h){const p=new G;ai.getBarycoord(zg,Ll,Nl,Ol,p),a&&(h.uv=ai.getInterpolatedAttribute(a,o,l,c,p,new he)),s&&(h.uv1=ai.getInterpolatedAttribute(s,o,l,c,p,new he)),r&&(h.normal=ai.getInterpolatedAttribute(r,o,l,c,p,new G),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new G,materialIndex:0};ai.getNormal(Ll,Nl,Ol,u.normal),h.face=u,h.barycoord=p}return h}class db extends fn{constructor(t=null,n=1,i=1,a,s,r,o,l,c=en,h=en,p,u){super(null,r,o,l,c,h,a,s,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rf=new G,pb=new G,mb=new Ft;class is{constructor(t=new G(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const a=Rf.subVectors(i,n).cross(pb.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(Rf),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||mb.getNormalMatrix(t),a=this.coplanarPoint(Rf).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ka=new fu,gb=new he(.5,.5),Bl=new G;class kx{constructor(t=new is,n=new is,i=new is,a=new is,s=new is,r=new is){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=vi,i=!1){const a=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],h=s[4],p=s[5],u=s[6],d=s[7],_=s[8],y=s[9],g=s[10],f=s[11],m=s[12],v=s[13],S=s[14],R=s[15];if(a[0].setComponents(c-r,d-h,f-_,R-m).normalize(),a[1].setComponents(c+r,d+h,f+_,R+m).normalize(),a[2].setComponents(c+o,d+p,f+y,R+v).normalize(),a[3].setComponents(c-o,d-p,f-y,R-v).normalize(),i)a[4].setComponents(l,u,g,S).normalize(),a[5].setComponents(c-l,d-u,f-g,R-S).normalize();else if(a[4].setComponents(c-l,d-u,f-g,R-S).normalize(),n===vi)a[5].setComponents(c+l,d+u,f+g,R+S).normalize();else if(n===Vc)a[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ka.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ka)}intersectsSprite(t){Ka.center.set(0,0,0);const n=gb.distanceTo(t.center);return Ka.radius=.7071067811865476+n,Ka.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ka)}intersectsSphere(t){const n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Bl.x=a.normal.x>0?t.max.x:t.min.x,Bl.y=a.normal.y>0?t.max.y:t.min.y,Bl.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(Bl)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _b extends tl{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Hg=new Le,Md=new Gx,zl=new fu,Hl=new G;class vb extends Mn{constructor(t=new li,n=new _b){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,a=this.matrixWorld,s=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zl.copy(i.boundingSphere),zl.applyMatrix4(a),zl.radius+=s,t.ray.intersectsSphere(zl)===!1)return;Hg.copy(a).invert(),Md.copy(t.ray).applyMatrix4(Hg);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,p=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),d=Math.min(c.count,r.start+r.count);for(let _=u,y=d;_<y;_++){const g=c.getX(_);Hl.fromBufferAttribute(p,g),Gg(Hl,g,l,a,t,n,this)}}else{const u=Math.max(0,r.start),d=Math.min(p.count,r.start+r.count);for(let _=u,y=d;_<y;_++)Hl.fromBufferAttribute(p,_),Gg(Hl,_,l,a,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Gg(e,t,n,i,a,s,r){const o=Md.distanceSqToPoint(e);if(o<n){const l=new G;Md.closestPointToPoint(e,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class Xx extends fn{constructor(t=[],n=vs,i,a,s,r,o,l,c,h){super(t,n,i,a,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zo extends fn{constructor(t,n,i=yi,a,s,r,o=en,l=en,c,h=na,p=1){if(h!==na&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:n,depth:p};super(u,a,s,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Op(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class xb extends zo{constructor(t,n=yi,i=vs,a,s,r=en,o=en,l,c=na){const h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,n,i,a,s,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Wx extends fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class el extends li{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],p=[];let u=0,d=0;_("z","y","x",-1,-1,i,n,t,r,s,0),_("z","y","x",1,-1,i,n,-t,r,s,1),_("x","z","y",1,1,t,i,n,a,r,2),_("x","z","y",1,-1,t,i,-n,a,r,3),_("x","y","z",1,-1,t,n,i,a,s,4),_("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new ji(c,3)),this.setAttribute("normal",new ji(h,3)),this.setAttribute("uv",new ji(p,2));function _(y,g,f,m,v,S,R,C,A,M,b){const F=S/A,w=R/M,B=S/2,V=R/2,q=C/2,H=A+1,U=M+1;let L=0,X=0;const j=new G;for(let et=0;et<U;et++){const dt=et*w-V;for(let ft=0;ft<H;ft++){const Dt=ft*F-B;j[y]=Dt*m,j[g]=dt*v,j[f]=q,c.push(j.x,j.y,j.z),j[y]=0,j[g]=0,j[f]=C>0?1:-1,h.push(j.x,j.y,j.z),p.push(ft/A),p.push(1-et/M),L+=1}}for(let et=0;et<M;et++)for(let dt=0;dt<A;dt++){const ft=u+dt+H*et,Dt=u+dt+H*(et+1),Kt=u+(dt+1)+H*(et+1),ee=u+(dt+1)+H*et;l.push(ft,Dt,ee),l.push(Dt,Kt,ee),X+=6}o.addGroup(d,X,b),d+=X,u+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new el(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class hu extends li{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};const s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,h=l+1,p=t/o,u=n/l,d=[],_=[],y=[],g=[];for(let f=0;f<h;f++){const m=f*u-r;for(let v=0;v<c;v++){const S=v*p-s;_.push(S,-m,0),y.push(0,0,1),g.push(v/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let m=0;m<o;m++){const v=m+c*f,S=m+c*(f+1),R=m+1+c*(f+1),C=m+1+c*f;d.push(v,S,C),d.push(S,R,C)}this.setIndex(d),this.setAttribute("position",new ji(_,3)),this.setAttribute("normal",new ji(y,3)),this.setAttribute("uv",new ji(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hu(t.width,t.height,t.widthSegments,t.heightSegments)}}function Rr(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const a=e[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone():Array.isArray(a)?t[n][i]=a.slice():t[n][i]=a}}return t}function ln(e){const t={};for(let n=0;n<e.length;n++){const i=Rr(e[n]);for(const a in i)t[a]=i[a]}return t}function Sb(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function qx(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const Mb={clone:Rr,merge:ln};var yb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ri extends tl{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yb,this.fragmentShader=Eb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=Sb(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class bb extends ri{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Tb extends tl{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=OE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ab extends tl{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Gl=new G,Vl=new Fr,ui=new G;class Yx extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Gl,Vl,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gl,Vl,ui.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(Gl,Vl,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gl,Vl,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const pa=new G,Vg=new he,kg=new he;class Xn extends Yx{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Sd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(af*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sd*2*Math.atan(Math.tan(af*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){pa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pa.x,pa.y).multiplyScalar(-t/pa.z),pa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pa.x,pa.y).multiplyScalar(-t/pa.z)}getViewSize(t,n){return this.getViewBounds(t,Vg,kg),n.subVectors(kg,Vg)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(af*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Zx extends Yx{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const zs=-90,Hs=1;class Rb extends Mn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Xn(zs,Hs,t,n);a.layers=this.layers,this.add(a);const s=new Xn(zs,Hs,t,n);s.layers=this.layers,this.add(s);const r=new Xn(zs,Hs,t,n);r.layers=this.layers,this.add(r);const o=new Xn(zs,Hs,t,n);o.layers=this.layers,this.add(o);const l=new Xn(zs,Hs,t,n);l.layers=this.layers,this.add(l);const c=new Xn(zs,Hs,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(t===vi)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Vc)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,1,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,a),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(p,u,d),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Cb extends Xn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Xg(e,t,n,i){const a=wb(i);switch(n){case Lx:return e*t;case Ox:return e*t/a.components*a.byteLength;case wp:return e*t/a.components*a.byteLength;case Tr:return e*t*2/a.components*a.byteLength;case Dp:return e*t*2/a.components*a.byteLength;case Nx:return e*t*3/a.components*a.byteLength;case si:return e*t*4/a.components*a.byteLength;case Up:return e*t*4/a.components*a.byteLength;case oc:case lc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case cc:case uc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case kh:case Wh:return Math.max(e,16)*Math.max(t,8)/4;case Vh:case Xh:return Math.max(e,8)*Math.max(t,8)/2;case qh:case Yh:case jh:case Kh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Zh:case Qh:case Jh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case $h:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case td:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ed:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case nd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case id:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ad:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case sd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case rd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case od:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ld:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case cd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ud:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case fd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case hd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case dd:case pd:case md:return Math.ceil(e/4)*Math.ceil(t/4)*16;case gd:case _d:return Math.ceil(e/4)*Math.ceil(t/4)*8;case vd:case xd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function wb(e){switch(e){case Zn:case Cx:return{byteLength:1,components:1};case Fo:case wx:case ea:return{byteLength:2,components:1};case Rp:case Cp:return{byteLength:2,components:4};case yi:case Ap:case _i:return{byteLength:4,components:1};case Dx:case Ux:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tp}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function jx(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function Db(e){const t=new WeakMap;function n(o,l){const c=o.array,h=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=e.SHORT;else if(c instanceof Uint32Array)d=e.UNSIGNED_INT;else if(c instanceof Int32Array)d=e.INT;else if(c instanceof Int8Array)d=e.BYTE;else if(c instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const h=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,h);else{p.sort((d,_)=>d.start-_.start);let u=0;for(let d=1;d<p.length;d++){const _=p[u],y=p[d];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++u,p[u]=y)}p.length=u+1;for(let d=0,_=p.length;d<_;d++){const y=p[d];e.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var Ub=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lb=`#ifdef USE_ALPHAHASH
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
#endif`,Nb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ob=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ib=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fb=`#ifdef USE_AOMAP
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
#endif`,Bb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zb=`#ifdef USE_BATCHING
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
#endif`,Hb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xb=`#ifdef USE_IRIDESCENCE
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
#endif`,Wb=`#ifdef USE_BUMPMAP
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
#endif`,qb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$b=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,tT=`#define PI 3.141592653589793
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
} // validated`,eT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nT=`vec3 transformedNormal = objectNormal;
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
#endif`,iT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oT="gl_FragColor = linearToOutputTexel( gl_FragColor );",lT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cT=`#ifdef USE_ENVMAP
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
#endif`,uT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fT=`#ifdef USE_ENVMAP
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
#endif`,hT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dT=`#ifdef USE_ENVMAP
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
#endif`,pT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_T=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vT=`#ifdef USE_GRADIENTMAP
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
}`,xT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ST=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,MT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yT=`uniform bool receiveShadow;
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
#endif`,ET=`#ifdef USE_ENVMAP
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
#endif`,bT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,TT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,AT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,CT=`PhysicalMaterial material;
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
#endif`,wT=`uniform sampler2D dfgLUT;
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
}`,DT=`
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
#endif`,UT=`#if defined( RE_IndirectDiffuse )
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
#endif`,LT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,NT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,OT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,FT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,HT=`#if defined( USE_POINTS_UV )
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
#endif`,GT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,VT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,XT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,WT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qT=`#ifdef USE_MORPHTARGETS
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
#endif`,YT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,KT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$T=`#ifdef USE_NORMALMAP
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
#endif`,tA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,eA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,oA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mA=`float getShadowMask() {
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
}`,gA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_A=`#ifdef USE_SKINNING
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
#endif`,vA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xA=`#ifdef USE_SKINNING
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
#endif`,SA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,MA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,EA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bA=`#ifdef USE_TRANSMISSION
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
#endif`,TA=`#ifdef USE_TRANSMISSION
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
#endif`,AA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const DA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,UA=`uniform sampler2D t2D;
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
}`,LA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,OA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,PA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IA=`#include <common>
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
}`,FA=`#if DEPTH_PACKING == 3200
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
}`,BA=`#define DISTANCE
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
}`,zA=`#define DISTANCE
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
}`,HA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,GA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VA=`uniform float scale;
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
}`,kA=`uniform vec3 diffuse;
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
}`,XA=`#include <common>
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
}`,WA=`uniform vec3 diffuse;
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
}`,qA=`#define LAMBERT
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
}`,YA=`#define LAMBERT
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
}`,ZA=`#define MATCAP
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
}`,jA=`#define MATCAP
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
}`,KA=`#define NORMAL
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
}`,QA=`#define NORMAL
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
}`,JA=`#define PHONG
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
}`,$A=`#define PHONG
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
}`,t1=`#define STANDARD
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
}`,e1=`#define STANDARD
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
}`,n1=`#define TOON
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
}`,i1=`#define TOON
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
}`,a1=`uniform float size;
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
}`,s1=`uniform vec3 diffuse;
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
}`,r1=`#include <common>
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
}`,o1=`uniform vec3 color;
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
}`,l1=`uniform float rotation;
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
}`,c1=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:Ub,alphahash_pars_fragment:Lb,alphamap_fragment:Nb,alphamap_pars_fragment:Ob,alphatest_fragment:Pb,alphatest_pars_fragment:Ib,aomap_fragment:Fb,aomap_pars_fragment:Bb,batching_pars_vertex:zb,batching_vertex:Hb,begin_vertex:Gb,beginnormal_vertex:Vb,bsdfs:kb,iridescence_fragment:Xb,bumpmap_pars_fragment:Wb,clipping_planes_fragment:qb,clipping_planes_pars_fragment:Yb,clipping_planes_pars_vertex:Zb,clipping_planes_vertex:jb,color_fragment:Kb,color_pars_fragment:Qb,color_pars_vertex:Jb,color_vertex:$b,common:tT,cube_uv_reflection_fragment:eT,defaultnormal_vertex:nT,displacementmap_pars_vertex:iT,displacementmap_vertex:aT,emissivemap_fragment:sT,emissivemap_pars_fragment:rT,colorspace_fragment:oT,colorspace_pars_fragment:lT,envmap_fragment:cT,envmap_common_pars_fragment:uT,envmap_pars_fragment:fT,envmap_pars_vertex:hT,envmap_physical_pars_fragment:ET,envmap_vertex:dT,fog_vertex:pT,fog_pars_vertex:mT,fog_fragment:gT,fog_pars_fragment:_T,gradientmap_pars_fragment:vT,lightmap_pars_fragment:xT,lights_lambert_fragment:ST,lights_lambert_pars_fragment:MT,lights_pars_begin:yT,lights_toon_fragment:bT,lights_toon_pars_fragment:TT,lights_phong_fragment:AT,lights_phong_pars_fragment:RT,lights_physical_fragment:CT,lights_physical_pars_fragment:wT,lights_fragment_begin:DT,lights_fragment_maps:UT,lights_fragment_end:LT,logdepthbuf_fragment:NT,logdepthbuf_pars_fragment:OT,logdepthbuf_pars_vertex:PT,logdepthbuf_vertex:IT,map_fragment:FT,map_pars_fragment:BT,map_particle_fragment:zT,map_particle_pars_fragment:HT,metalnessmap_fragment:GT,metalnessmap_pars_fragment:VT,morphinstance_vertex:kT,morphcolor_vertex:XT,morphnormal_vertex:WT,morphtarget_pars_vertex:qT,morphtarget_vertex:YT,normal_fragment_begin:ZT,normal_fragment_maps:jT,normal_pars_fragment:KT,normal_pars_vertex:QT,normal_vertex:JT,normalmap_pars_fragment:$T,clearcoat_normal_fragment_begin:tA,clearcoat_normal_fragment_maps:eA,clearcoat_pars_fragment:nA,iridescence_pars_fragment:iA,opaque_fragment:aA,packing:sA,premultiplied_alpha_fragment:rA,project_vertex:oA,dithering_fragment:lA,dithering_pars_fragment:cA,roughnessmap_fragment:uA,roughnessmap_pars_fragment:fA,shadowmap_pars_fragment:hA,shadowmap_pars_vertex:dA,shadowmap_vertex:pA,shadowmask_pars_fragment:mA,skinbase_vertex:gA,skinning_pars_vertex:_A,skinning_vertex:vA,skinnormal_vertex:xA,specularmap_fragment:SA,specularmap_pars_fragment:MA,tonemapping_fragment:yA,tonemapping_pars_fragment:EA,transmission_fragment:bA,transmission_pars_fragment:TA,uv_pars_fragment:AA,uv_pars_vertex:RA,uv_vertex:CA,worldpos_vertex:wA,background_vert:DA,background_frag:UA,backgroundCube_vert:LA,backgroundCube_frag:NA,cube_vert:OA,cube_frag:PA,depth_vert:IA,depth_frag:FA,distance_vert:BA,distance_frag:zA,equirect_vert:HA,equirect_frag:GA,linedashed_vert:VA,linedashed_frag:kA,meshbasic_vert:XA,meshbasic_frag:WA,meshlambert_vert:qA,meshlambert_frag:YA,meshmatcap_vert:ZA,meshmatcap_frag:jA,meshnormal_vert:KA,meshnormal_frag:QA,meshphong_vert:JA,meshphong_frag:$A,meshphysical_vert:t1,meshphysical_frag:e1,meshtoon_vert:n1,meshtoon_frag:i1,points_vert:a1,points_frag:s1,shadow_vert:r1,shadow_frag:o1,sprite_vert:l1,sprite_frag:c1},lt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},di={basic:{uniforms:ln([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:ln([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new jt(0)},envMapIntensity:{value:1}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:ln([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:ln([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:ln([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:ln([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:ln([lt.points,lt.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:ln([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:ln([lt.common,lt.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:ln([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:ln([lt.sprite,lt.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distance:{uniforms:ln([lt.common,lt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distance_vert,fragmentShader:Bt.distance_frag},shadow:{uniforms:ln([lt.lights,lt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};di.physical={uniforms:ln([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const kl={r:0,b:0,g:0},Qa=new ia,u1=new Le;function f1(e,t,n,i,a,s){const r=new jt(0);let o=a===!0?0:1,l,c,h=null,p=0,u=null;function d(m){let v=m.isScene===!0?m.background:null;if(v&&v.isTexture){const S=m.backgroundBlurriness>0;v=t.get(v,S)}return v}function _(m){let v=!1;const S=d(m);S===null?g(r,o):S&&S.isColor&&(g(S,1),v=!0);const R=e.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(m,v){const S=d(v);S&&(S.isCubeTexture||S.mapping===uu)?(c===void 0&&(c=new aa(new el(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:Rr(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),Qa.copy(v.backgroundRotation),Qa.x*=-1,Qa.y*=-1,Qa.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Qa.y*=-1,Qa.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(u1.makeRotationFromEuler(Qa)),c.material.toneMapped=Zt.getTransfer(S.colorSpace)!==se,(h!==S||p!==S.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=S,p=S.version,u=e.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new aa(new hu(2,2),new ri({name:"BackgroundMaterial",uniforms:Rr(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:Ga,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(S.colorSpace)!==se,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||p!==S.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=S,p=S.version,u=e.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,v){m.getRGB(kl,qx(e)),n.buffers.color.setClear(kl.r,kl.g,kl.b,v,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(m,v=1){r.set(m),o=v,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,g(r,o)},render:_,addToRenderList:y,dispose:f}}function h1(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(w,B,V,q,H){let U=!1;const L=p(w,q,V,B);s!==L&&(s=L,c(s.object)),U=d(w,q,V,H),U&&_(w,q,V,H),H!==null&&t.update(H,e.ELEMENT_ARRAY_BUFFER),(U||r)&&(r=!1,S(w,B,V,q),H!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return e.createVertexArray()}function c(w){return e.bindVertexArray(w)}function h(w){return e.deleteVertexArray(w)}function p(w,B,V,q){const H=q.wireframe===!0;let U=i[B.id];U===void 0&&(U={},i[B.id]=U);const L=w.isInstancedMesh===!0?w.id:0;let X=U[L];X===void 0&&(X={},U[L]=X);let j=X[V.id];j===void 0&&(j={},X[V.id]=j);let et=j[H];return et===void 0&&(et=u(l()),j[H]=et),et}function u(w){const B=[],V=[],q=[];for(let H=0;H<n;H++)B[H]=0,V[H]=0,q[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:V,attributeDivisors:q,object:w,attributes:{},index:null}}function d(w,B,V,q){const H=s.attributes,U=B.attributes;let L=0;const X=V.getAttributes();for(const j in X)if(X[j].location>=0){const dt=H[j];let ft=U[j];if(ft===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(ft=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(ft=w.instanceColor)),dt===void 0||dt.attribute!==ft||ft&&dt.data!==ft.data)return!0;L++}return s.attributesNum!==L||s.index!==q}function _(w,B,V,q){const H={},U=B.attributes;let L=0;const X=V.getAttributes();for(const j in X)if(X[j].location>=0){let dt=U[j];dt===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(dt=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(dt=w.instanceColor));const ft={};ft.attribute=dt,dt&&dt.data&&(ft.data=dt.data),H[j]=ft,L++}s.attributes=H,s.attributesNum=L,s.index=q}function y(){const w=s.newAttributes;for(let B=0,V=w.length;B<V;B++)w[B]=0}function g(w){f(w,0)}function f(w,B){const V=s.newAttributes,q=s.enabledAttributes,H=s.attributeDivisors;V[w]=1,q[w]===0&&(e.enableVertexAttribArray(w),q[w]=1),H[w]!==B&&(e.vertexAttribDivisor(w,B),H[w]=B)}function m(){const w=s.newAttributes,B=s.enabledAttributes;for(let V=0,q=B.length;V<q;V++)B[V]!==w[V]&&(e.disableVertexAttribArray(V),B[V]=0)}function v(w,B,V,q,H,U,L){L===!0?e.vertexAttribIPointer(w,B,V,H,U):e.vertexAttribPointer(w,B,V,q,H,U)}function S(w,B,V,q){y();const H=q.attributes,U=V.getAttributes(),L=B.defaultAttributeValues;for(const X in U){const j=U[X];if(j.location>=0){let et=H[X];if(et===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(et=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(et=w.instanceColor)),et!==void 0){const dt=et.normalized,ft=et.itemSize,Dt=t.get(et);if(Dt===void 0)continue;const Kt=Dt.buffer,ee=Dt.type,K=Dt.bytesPerElement,at=ee===e.INT||ee===e.UNSIGNED_INT||et.gpuType===Ap;if(et.isInterleavedBufferAttribute){const ot=et.data,It=ot.stride,At=et.offset;if(ot.isInstancedInterleavedBuffer){for(let wt=0;wt<j.locationSize;wt++)f(j.location+wt,ot.meshPerAttribute);w.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let wt=0;wt<j.locationSize;wt++)g(j.location+wt);e.bindBuffer(e.ARRAY_BUFFER,Kt);for(let wt=0;wt<j.locationSize;wt++)v(j.location+wt,ft/j.locationSize,ee,dt,It*K,(At+ft/j.locationSize*wt)*K,at)}else{if(et.isInstancedBufferAttribute){for(let ot=0;ot<j.locationSize;ot++)f(j.location+ot,et.meshPerAttribute);w.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let ot=0;ot<j.locationSize;ot++)g(j.location+ot);e.bindBuffer(e.ARRAY_BUFFER,Kt);for(let ot=0;ot<j.locationSize;ot++)v(j.location+ot,ft/j.locationSize,ee,dt,ft*K,ft/j.locationSize*ot*K,at)}}else if(L!==void 0){const dt=L[X];if(dt!==void 0)switch(dt.length){case 2:e.vertexAttrib2fv(j.location,dt);break;case 3:e.vertexAttrib3fv(j.location,dt);break;case 4:e.vertexAttrib4fv(j.location,dt);break;default:e.vertexAttrib1fv(j.location,dt)}}}}m()}function R(){b();for(const w in i){const B=i[w];for(const V in B){const q=B[V];for(const H in q){const U=q[H];for(const L in U)h(U[L].object),delete U[L];delete q[H]}}delete i[w]}}function C(w){if(i[w.id]===void 0)return;const B=i[w.id];for(const V in B){const q=B[V];for(const H in q){const U=q[H];for(const L in U)h(U[L].object),delete U[L];delete q[H]}}delete i[w.id]}function A(w){for(const B in i){const V=i[B];for(const q in V){const H=V[q];if(H[w.id]===void 0)continue;const U=H[w.id];for(const L in U)h(U[L].object),delete U[L];delete H[w.id]}}}function M(w){for(const B in i){const V=i[B],q=w.isInstancedMesh===!0?w.id:0,H=V[q];if(H!==void 0){for(const U in H){const L=H[U];for(const X in L)h(L[X].object),delete L[X];delete H[U]}delete V[q],Object.keys(V).length===0&&delete i[B]}}}function b(){F(),r=!0,s!==a&&(s=a,c(s.object))}function F(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:b,resetDefaultState:F,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:m}}function d1(e,t,n){let i;function a(c){i=c}function s(c,h){e.drawArrays(i,c,h),n.update(h,i,1)}function r(c,h,p){p!==0&&(e.drawArraysInstanced(i,c,h,p),n.update(h,i,p))}function o(c,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,p);let d=0;for(let _=0;_<p;_++)d+=h[_];n.update(d,i,1)}function l(c,h,p,u){if(p===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<c.length;_++)r(c[_],h[_],u[_]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,p);let _=0;for(let y=0;y<p;y++)_+=h[y]*u[y];n.update(_,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function p1(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(A){return!(A!==si&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const M=A===ea&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Zn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==_i&&!M)}function l(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(Lt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),v=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),R=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:m,maxVaryings:v,maxFragmentUniforms:S,maxSamples:R,samples:C}}function m1(e){const t=this;let n=null,i=0,a=!1,s=!1;const r=new is,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const d=p.length!==0||u||i!==0||a;return a=u,i=p.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){n=h(p,u,0)},this.setState=function(p,u,d){const _=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,f=e.get(p);if(!a||_===null||_.length===0||s&&!g)s?h(null):c();else{const m=s?0:i,v=m*4;let S=f.clippingState||null;l.value=S,S=h(_,u,v,d);for(let R=0;R!==v;++R)S[R]=n[R];f.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(p,u,d,_){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=l.value,_!==!0||g===null){const f=d+y*4,m=u.matrixWorldInverse;o.getNormalMatrix(m),(g===null||g.length<f)&&(g=new Float32Array(f));for(let v=0,S=d;v!==y;++v,S+=4)r.copy(p[v]).applyMatrix4(m,o),r.normal.toArray(g,S),g[S+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}const Ra=4,Wg=[.125,.215,.35,.446,.526,.582],ss=20,g1=256,Jr=new Zx,qg=new jt;let Cf=null,wf=0,Df=0,Uf=!1;const _1=new G;class Yg{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=_1}=s;Cf=this._renderer.getRenderTarget(),wf=this._renderer.getActiveCubeFace(),Df=this._renderer.getActiveMipmapLevel(),Uf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Cf,wf,Df),this._renderer.xr.enabled=Uf,t.scissorTest=!1,Gs(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===vs||t.mapping===br?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Cf=this._renderer.getRenderTarget(),wf=this._renderer.getActiveCubeFace(),Df=this._renderer.getActiveMipmapLevel(),Uf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:on,minFilter:on,generateMipmaps:!1,type:ea,format:si,colorSpace:Ar,depthBuffer:!1},a=Zg(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zg(t,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=v1(s)),this._blurMaterial=S1(s,t,n),this._ggxMaterial=x1(s,t,n)}return a}_compileMaterial(t){const n=new aa(new li,t);this._renderer.compile(n,Jr)}_sceneToCubeUV(t,n,i,a,s){const l=new Xn(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,d=p.toneMapping;p.getClearColor(qg),p.toneMapping=Si,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(a),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new aa(new el,new Vx({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,g=y.material;let f=!1;const m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,f=!0):(g.color.copy(qg),f=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):S===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const R=this._cubeSize;Gs(a,S*R,v>2?R:0,R,R),p.setRenderTarget(a),f&&p.render(y,l),p.render(t,l)}p.toneMapping=d,p.autoClear=u,t.background=m}_textureToCubeUV(t,n){const i=this._renderer,a=t.mapping===vs||t.mapping===br;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kg()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jg());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Gs(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Jr)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(t,s-1,s);n.autoClear=i}_applyGGXFilter(t,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),u=0+c*1.25,d=p*u,{_lodMax:_}=this,y=this._sizeLods[i],g=3*y*(i>_-Ra?i-_+Ra:0),f=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=_-n,Gs(s,g,f,3*y,2*y),a.setRenderTarget(s),a.render(o,Jr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,Gs(t,g,f,3*y,2*y),a.setRenderTarget(t),a.render(o,Jr)}_blur(t,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Jt("blur direction must be either latitudinal or longitudinal!");const h=3,p=this._lodMeshes[a];p.material=c;const u=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ss-1),y=s/_,g=isFinite(s)?1+Math.floor(h*y):ss;g>ss&&Lt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ss}`);const f=[];let m=0;for(let A=0;A<ss;++A){const M=A/y,b=Math.exp(-M*M/2);f.push(b),A===0?m+=b:A<g&&(m+=2*b)}for(let A=0;A<f.length;A++)f[A]=f[A]/m;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:v}=this;u.dTheta.value=_,u.mipInt.value=v-i;const S=this._sizeLods[a],R=3*S*(a>v-Ra?a-v+Ra:0),C=4*(this._cubeSize-S);Gs(n,R,C,3*S,2*S),l.setRenderTarget(n),l.render(p,Jr)}}function v1(e){const t=[],n=[],i=[];let a=e;const s=e-Ra+1+Wg.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let l=1/o;r>e-Ra?l=Wg[r-e+Ra-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,p=1+c,u=[h,h,p,h,p,p,h,h,p,p,h,p],d=6,_=6,y=3,g=2,f=1,m=new Float32Array(y*_*d),v=new Float32Array(g*_*d),S=new Float32Array(f*_*d);for(let C=0;C<d;C++){const A=C%3*2/3-1,M=C>2?0:-1,b=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];m.set(b,y*_*C),v.set(u,g*_*C);const F=[C,C,C,C,C,C];S.set(F,f*_*C)}const R=new li;R.setAttribute("position",new vn(m,y)),R.setAttribute("uv",new vn(v,g)),R.setAttribute("faceIndex",new vn(S,f)),i.push(new aa(R,null)),a>Ra&&a--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function Zg(e,t,n){const i=new Mi(e,t,n);return i.texture.mapping=uu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gs(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function x1(e,t,n){return new ri({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:g1,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:du(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function S1(e,t,n){const i=new Float32Array(ss),a=new G(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:du(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function jg(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:du(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Kg(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function du(){return`

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
	`}class Kx extends Mi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new Xx(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new el(5,5,5),s=new ri({name:"CubemapFromEquirect",uniforms:Rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Sn,blending:Yi});s.uniforms.tEquirect.value=n;const r=new aa(a,s),o=n.minFilter;return n.minFilter===rs&&(n.minFilter=on),new Rb(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}}function M1(e){let t=new WeakMap,n=new WeakMap,i=null;function a(u,d=!1){return u==null?null:d?r(u):s(u)}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===tf||d===ef)if(t.has(u)){const _=t.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const y=new Kx(_.height);return y.fromEquirectangularTexture(e,u),t.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const d=u.mapping,_=d===tf||d===ef,y=d===vs||d===br;if(_||y){let g=n.get(u);const f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Yg(e)),g=_?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{const m=u.image;return _&&m&&m.height>0||y&&m&&l(m)?(i===null&&(i=new Yg(e)),g=_?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===tf?u.mapping=vs:d===ef&&(u.mapping=br),u}function l(u){let d=0;const _=6;for(let y=0;y<_;y++)u[y]!==void 0&&d++;return d===_}function c(u){const d=u.target;d.removeEventListener("dispose",c);const _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const _=n.get(d);_!==void 0&&(n.delete(d),_.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:p}}function y1(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const a=e.getExtension(i);return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&Xc("WebGLRenderer: "+i+" extension not supported."),a}}}function E1(e,t,n,i){const a={},s=new WeakMap;function r(p){const u=p.target;u.index!==null&&t.remove(u.index);for(const _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",r),delete a[u.id];const d=s.get(u);d&&(t.remove(d),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(p){const u=p.attributes;for(const d in u)t.update(u[d],e.ARRAY_BUFFER)}function c(p){const u=[],d=p.index,_=p.attributes.position;let y=0;if(_===void 0)return;if(d!==null){const m=d.array;y=d.version;for(let v=0,S=m.length;v<S;v+=3){const R=m[v+0],C=m[v+1],A=m[v+2];u.push(R,C,C,A,A,R)}}else{const m=_.array;y=_.version;for(let v=0,S=m.length/3-1;v<S;v+=3){const R=v+0,C=v+1,A=v+2;u.push(R,C,C,A,A,R)}}const g=new(_.count>=65535?Hx:zx)(u,1);g.version=y;const f=s.get(p);f&&t.remove(f),s.set(p,g)}function h(p){const u=s.get(p);if(u){const d=p.index;d!==null&&u.version<d.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function b1(e,t,n){let i;function a(u){i=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function l(u,d){e.drawElements(i,d,s,u*r),n.update(d,i,1)}function c(u,d,_){_!==0&&(e.drawElementsInstanced(i,d,s,u*r,_),n.update(d,i,_))}function h(u,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,u,0,_);let g=0;for(let f=0;f<_;f++)g+=d[f];n.update(g,i,1)}function p(u,d,_,y){if(_===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<u.length;f++)c(u[f]/r,d[f],y[f]);else{g.multiDrawElementsInstancedWEBGL(i,d,0,s,u,0,y,0,_);let f=0;for(let m=0;m<_;m++)f+=d[m]*y[m];n.update(f,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function T1(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:Jt("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function A1(e,t,n){const i=new WeakMap,a=new De;function s(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==p){let F=function(){M.dispose(),i.delete(o),o.removeEventListener("dispose",F)};var d=F;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),y===!0&&(S=2),g===!0&&(S=3);let R=o.attributes.position.count*S,C=1;R>t.maxTextureSize&&(C=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const A=new Float32Array(R*C*4*p),M=new Ix(A,R,C,p);M.type=_i,M.needsUpdate=!0;const b=S*4;for(let w=0;w<p;w++){const B=f[w],V=m[w],q=v[w],H=R*C*4*w;for(let U=0;U<B.count;U++){const L=U*b;_===!0&&(a.fromBufferAttribute(B,U),A[H+L+0]=a.x,A[H+L+1]=a.y,A[H+L+2]=a.z,A[H+L+3]=0),y===!0&&(a.fromBufferAttribute(V,U),A[H+L+4]=a.x,A[H+L+5]=a.y,A[H+L+6]=a.z,A[H+L+7]=0),g===!0&&(a.fromBufferAttribute(q,U),A[H+L+8]=a.x,A[H+L+9]=a.y,A[H+L+10]=a.z,A[H+L+11]=q.itemSize===4?a.w:1)}}u={count:p,texture:M,size:new he(R,C)},i.set(o,u),o.addEventListener("dispose",F)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let _=0;for(let g=0;g<c.length;g++)_+=c[g];const y=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(e,"morphTargetBaseInfluence",y),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:s}}function R1(e,t,n,i,a){let s=new WeakMap;function r(c){const h=a.render.frame,p=c.geometry,u=t.get(c,p);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return u}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:r,dispose:o}}const C1={[Sx]:"LINEAR_TONE_MAPPING",[Mx]:"REINHARD_TONE_MAPPING",[yx]:"CINEON_TONE_MAPPING",[Ex]:"ACES_FILMIC_TONE_MAPPING",[Tx]:"AGX_TONE_MAPPING",[Ax]:"NEUTRAL_TONE_MAPPING",[bx]:"CUSTOM_TONE_MAPPING"};function w1(e,t,n,i,a){const s=new Mi(t,n,{type:e,depthBuffer:i,stencilBuffer:a}),r=new Mi(t,n,{type:ea,depthBuffer:!1,stencilBuffer:!1}),o=new li;o.setAttribute("position",new ji([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new ji([0,2,0,0,2,0],2));const l=new bb({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new aa(o,l),h=new Zx(-1,1,1,-1,0,1);let p=null,u=null,d=!1,_,y=null,g=[],f=!1;this.setSize=function(m,v){s.setSize(m,v),r.setSize(m,v);for(let S=0;S<g.length;S++){const R=g[S];R.setSize&&R.setSize(m,v)}},this.setEffects=function(m){g=m,f=g.length>0&&g[0].isRenderPass===!0;const v=s.width,S=s.height;for(let R=0;R<g.length;R++){const C=g[R];C.setSize&&C.setSize(v,S)}},this.begin=function(m,v){if(d||m.toneMapping===Si&&g.length===0)return!1;if(y=v,v!==null){const S=v.width,R=v.height;(s.width!==S||s.height!==R)&&this.setSize(S,R)}return f===!1&&m.setRenderTarget(s),_=m.toneMapping,m.toneMapping=Si,!0},this.hasRenderPass=function(){return f},this.end=function(m,v){m.toneMapping=_,d=!0;let S=s,R=r;for(let C=0;C<g.length;C++){const A=g[C];if(A.enabled!==!1&&(A.render(m,R,S,v),A.needsSwap!==!1)){const M=S;S=R,R=M}}if(p!==m.outputColorSpace||u!==m.toneMapping){p=m.outputColorSpace,u=m.toneMapping,l.defines={},Zt.getTransfer(p)===se&&(l.defines.SRGB_TRANSFER="");const C=C1[u];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,m.setRenderTarget(y),m.render(c,h),y=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),r.dispose(),o.dispose(),l.dispose()}}const Qx=new fn,yd=new zo(1,1),Jx=new Ix,$x=new $E,tS=new Xx,Qg=[],Jg=[],$g=new Float32Array(16),t0=new Float32Array(9),e0=new Float32Array(4);function Br(e,t,n){const i=e[0];if(i<=0||i>0)return e;const a=t*n;let s=Qg[a];if(s===void 0&&(s=new Float32Array(a),Qg[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Ve(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function ke(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function pu(e,t){let n=Jg[t];n===void 0&&(n=new Int32Array(t),Jg[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function D1(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function U1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2fv(this.addr,t),ke(n,t)}}function L1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ve(n,t))return;e.uniform3fv(this.addr,t),ke(n,t)}}function N1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4fv(this.addr,t),ke(n,t)}}function O1(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ke(n,t)}else{if(Ve(n,i))return;e0.set(i),e.uniformMatrix2fv(this.addr,!1,e0),ke(n,i)}}function P1(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ke(n,t)}else{if(Ve(n,i))return;t0.set(i),e.uniformMatrix3fv(this.addr,!1,t0),ke(n,i)}}function I1(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ke(n,t)}else{if(Ve(n,i))return;$g.set(i),e.uniformMatrix4fv(this.addr,!1,$g),ke(n,i)}}function F1(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function B1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2iv(this.addr,t),ke(n,t)}}function z1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3iv(this.addr,t),ke(n,t)}}function H1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4iv(this.addr,t),ke(n,t)}}function G1(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function V1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2uiv(this.addr,t),ke(n,t)}}function k1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3uiv(this.addr,t),ke(n,t)}}function X1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4uiv(this.addr,t),ke(n,t)}}function W1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(yd.compareFunction=n.isReversedDepthBuffer()?Np:Lp,s=yd):s=Qx,n.setTexture2D(t||s,a)}function q1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||$x,a)}function Y1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||tS,a)}function Z1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||Jx,a)}function j1(e){switch(e){case 5126:return D1;case 35664:return U1;case 35665:return L1;case 35666:return N1;case 35674:return O1;case 35675:return P1;case 35676:return I1;case 5124:case 35670:return F1;case 35667:case 35671:return B1;case 35668:case 35672:return z1;case 35669:case 35673:return H1;case 5125:return G1;case 36294:return V1;case 36295:return k1;case 36296:return X1;case 35678:case 36198:case 36298:case 36306:case 35682:return W1;case 35679:case 36299:case 36307:return q1;case 35680:case 36300:case 36308:case 36293:return Y1;case 36289:case 36303:case 36311:case 36292:return Z1}}function K1(e,t){e.uniform1fv(this.addr,t)}function Q1(e,t){const n=Br(t,this.size,2);e.uniform2fv(this.addr,n)}function J1(e,t){const n=Br(t,this.size,3);e.uniform3fv(this.addr,n)}function $1(e,t){const n=Br(t,this.size,4);e.uniform4fv(this.addr,n)}function tR(e,t){const n=Br(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function eR(e,t){const n=Br(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function nR(e,t){const n=Br(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function iR(e,t){e.uniform1iv(this.addr,t)}function aR(e,t){e.uniform2iv(this.addr,t)}function sR(e,t){e.uniform3iv(this.addr,t)}function rR(e,t){e.uniform4iv(this.addr,t)}function oR(e,t){e.uniform1uiv(this.addr,t)}function lR(e,t){e.uniform2uiv(this.addr,t)}function cR(e,t){e.uniform3uiv(this.addr,t)}function uR(e,t){e.uniform4uiv(this.addr,t)}function fR(e,t,n){const i=this.cache,a=t.length,s=pu(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),ke(i,s));let r;this.type===e.SAMPLER_2D_SHADOW?r=yd:r=Qx;for(let o=0;o!==a;++o)n.setTexture2D(t[o]||r,s[o])}function hR(e,t,n){const i=this.cache,a=t.length,s=pu(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),ke(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||$x,s[r])}function dR(e,t,n){const i=this.cache,a=t.length,s=pu(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),ke(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||tS,s[r])}function pR(e,t,n){const i=this.cache,a=t.length,s=pu(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),ke(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||Jx,s[r])}function mR(e){switch(e){case 5126:return K1;case 35664:return Q1;case 35665:return J1;case 35666:return $1;case 35674:return tR;case 35675:return eR;case 35676:return nR;case 5124:case 35670:return iR;case 35667:case 35671:return aR;case 35668:case 35672:return sR;case 35669:case 35673:return rR;case 5125:return oR;case 36294:return lR;case 36295:return cR;case 36296:return uR;case 35678:case 36198:case 36298:case 36306:case 35682:return fR;case 35679:case 36299:case 36307:return hR;case 35680:case 36300:case 36308:case 36293:return dR;case 36289:case 36303:case 36311:case 36292:return pR}}class gR{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=j1(n.type)}}class _R{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=mR(n.type)}}class vR{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(t,n[o.id],i)}}}const Lf=/(\w+)(\])?(\[|\.)?/g;function n0(e,t){e.seq.push(t),e.map[t.id]=t}function xR(e,t,n){const i=e.name,a=i.length;for(Lf.lastIndex=0;;){const s=Lf.exec(i),r=Lf.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){n0(n,c===void 0?new gR(o,e,t):new _R(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new vR(o),n0(n,p)),n=p}}}class fc{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);xR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(t,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){const a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){const i=[];for(let a=0,s=t.length;a!==s;++a){const r=t[a];r.id in n&&i.push(r)}return i}}function i0(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const SR=37297;let MR=0;function yR(e,t){const n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const a0=new Ft;function ER(e){Zt._getMatrix(a0,Zt.workingColorSpace,e);const t=`mat3( ${a0.elements.map(n=>n.toFixed(4))} )`;switch(Zt.getTransfer(e)){case Gc:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function s0(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+yR(e.getShaderSource(t),o)}else return s}function bR(e,t){const n=ER(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const TR={[Sx]:"Linear",[Mx]:"Reinhard",[yx]:"Cineon",[Ex]:"ACESFilmic",[Tx]:"AgX",[Ax]:"Neutral",[bx]:"Custom"};function AR(e,t){const n=TR[t];return n===void 0?(Lt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xl=new G;function RR(){Zt.getLuminanceCoefficients(Xl);const e=Xl.x.toFixed(4),t=Xl.y.toFixed(4),n=Xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CR(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oo).join(`
`)}function wR(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function DR(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=e.getActiveAttrib(t,a),r=s.name;let o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function oo(e){return e!==""}function r0(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function o0(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const UR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ed(e){return e.replace(UR,NR)}const LR=new Map;function NR(e,t){let n=Bt[t];if(n===void 0){const i=LR.get(t);if(i!==void 0)n=Bt[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ed(n)}const OR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function l0(e){return e.replace(OR,PR)}function PR(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function c0(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const IR={[rc]:"SHADOWMAP_TYPE_PCF",[ro]:"SHADOWMAP_TYPE_VSM"};function FR(e){return IR[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const BR={[vs]:"ENVMAP_TYPE_CUBE",[br]:"ENVMAP_TYPE_CUBE",[uu]:"ENVMAP_TYPE_CUBE_UV"};function zR(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":BR[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const HR={[br]:"ENVMAP_MODE_REFRACTION"};function GR(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":HR[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const VR={[xx]:"ENVMAP_BLENDING_MULTIPLY",[UE]:"ENVMAP_BLENDING_MIX",[LE]:"ENVMAP_BLENDING_ADD"};function kR(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":VR[e.combine]||"ENVMAP_BLENDING_NONE"}function XR(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function WR(e,t,n,i){const a=e.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=FR(n),c=zR(n),h=GR(n),p=kR(n),u=XR(n),d=CR(n),_=wR(s),y=a.createProgram();let g,f,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(oo).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(oo).join(`
`),f.length>0&&(f+=`
`)):(g=[c0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oo).join(`
`),f=[c0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Si?"#define TONE_MAPPING":"",n.toneMapping!==Si?Bt.tonemapping_pars_fragment:"",n.toneMapping!==Si?AR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,bR("linearToOutputTexel",n.outputColorSpace),RR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(oo).join(`
`)),r=Ed(r),r=r0(r,n),r=o0(r,n),o=Ed(o),o=r0(o,n),o=o0(o,n),r=l0(r),o=l0(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",n.glslVersion===Eg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Eg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=m+g+r,S=m+f+o,R=i0(a,a.VERTEX_SHADER,v),C=i0(a,a.FRAGMENT_SHADER,S);a.attachShader(y,R),a.attachShader(y,C),n.index0AttributeName!==void 0?a.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(y,0,"position"),a.linkProgram(y);function A(w){if(e.debug.checkShaderErrors){const B=a.getProgramInfoLog(y)||"",V=a.getShaderInfoLog(R)||"",q=a.getShaderInfoLog(C)||"",H=B.trim(),U=V.trim(),L=q.trim();let X=!0,j=!0;if(a.getProgramParameter(y,a.LINK_STATUS)===!1)if(X=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,y,R,C);else{const et=s0(a,R,"vertex"),dt=s0(a,C,"fragment");Jt("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(y,a.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+H+`
`+et+`
`+dt)}else H!==""?Lt("WebGLProgram: Program Info Log:",H):(U===""||L==="")&&(j=!1);j&&(w.diagnostics={runnable:X,programLog:H,vertexShader:{log:U,prefix:g},fragmentShader:{log:L,prefix:f}})}a.deleteShader(R),a.deleteShader(C),M=new fc(a,y),b=DR(a,y)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=a.getProgramParameter(y,SR)),F},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=MR++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=C,this}let qR=0;class YR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new ZR(t),n.set(t,i)),i}}class ZR{constructor(t){this.id=qR++,this.code=t,this.usedTimes=0}}function jR(e,t,n,i,a,s){const r=new Fx,o=new YR,l=new Set,c=[],h=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function y(M,b,F,w,B){const V=w.fog,q=B.geometry,H=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?w.environment:null,U=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,L=t.get(M.envMap||H,U),X=L&&L.mapping===uu?L.image.height:null,j=d[M.type];M.precision!==null&&(u=i.getMaxPrecision(M.precision),u!==M.precision&&Lt("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const et=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,dt=et!==void 0?et.length:0;let ft=0;q.morphAttributes.position!==void 0&&(ft=1),q.morphAttributes.normal!==void 0&&(ft=2),q.morphAttributes.color!==void 0&&(ft=3);let Dt,Kt,ee,K;if(j){const ae=di[j];Dt=ae.vertexShader,Kt=ae.fragmentShader}else Dt=M.vertexShader,Kt=M.fragmentShader,o.update(M),ee=o.getVertexShaderID(M),K=o.getFragmentShaderID(M);const at=e.getRenderTarget(),ot=e.state.buffers.depth.getReversed(),It=B.isInstancedMesh===!0,At=B.isBatchedMesh===!0,wt=!!M.map,Xe=!!M.matcap,Yt=!!L,ie=!!M.aoMap,de=!!M.lightMap,zt=!!M.bumpMap,Re=!!M.normalMap,D=!!M.displacementMap,Ne=!!M.emissiveMap,ne=!!M.metalnessMap,ge=!!M.roughnessMap,Mt=M.anisotropy>0,T=M.clearcoat>0,x=M.dispersion>0,O=M.iridescence>0,Z=M.sheen>0,J=M.transmission>0,Y=Mt&&!!M.anisotropyMap,gt=T&&!!M.clearcoatMap,st=T&&!!M.clearcoatNormalMap,Tt=T&&!!M.clearcoatRoughnessMap,Rt=O&&!!M.iridescenceMap,$=O&&!!M.iridescenceThicknessMap,nt=Z&&!!M.sheenColorMap,_t=Z&&!!M.sheenRoughnessMap,xt=!!M.specularMap,ht=!!M.specularColorMap,Ht=!!M.specularIntensityMap,N=J&&!!M.transmissionMap,rt=J&&!!M.thicknessMap,it=!!M.gradientMap,mt=!!M.alphaMap,tt=M.alphaTest>0,W=!!M.alphaHash,vt=!!M.extensions;let Ut=Si;M.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Ut=e.toneMapping);const _e={shaderID:j,shaderType:M.type,shaderName:M.name,vertexShader:Dt,fragmentShader:Kt,defines:M.defines,customVertexShaderID:ee,customFragmentShaderID:K,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:At,batchingColor:At&&B._colorsTexture!==null,instancing:It,instancingColor:It&&B.instanceColor!==null,instancingMorph:It&&B.morphTexture!==null,outputColorSpace:at===null?e.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Ar,alphaToCoverage:!!M.alphaToCoverage,map:wt,matcap:Xe,envMap:Yt,envMapMode:Yt&&L.mapping,envMapCubeUVHeight:X,aoMap:ie,lightMap:de,bumpMap:zt,normalMap:Re,displacementMap:D,emissiveMap:Ne,normalMapObjectSpace:Re&&M.normalMapType===IE,normalMapTangentSpace:Re&&M.normalMapType===PE,metalnessMap:ne,roughnessMap:ge,anisotropy:Mt,anisotropyMap:Y,clearcoat:T,clearcoatMap:gt,clearcoatNormalMap:st,clearcoatRoughnessMap:Tt,dispersion:x,iridescence:O,iridescenceMap:Rt,iridescenceThicknessMap:$,sheen:Z,sheenColorMap:nt,sheenRoughnessMap:_t,specularMap:xt,specularColorMap:ht,specularIntensityMap:Ht,transmission:J,transmissionMap:N,thicknessMap:rt,gradientMap:it,opaque:M.transparent===!1&&M.blending===ur&&M.alphaToCoverage===!1,alphaMap:mt,alphaTest:tt,alphaHash:W,combine:M.combine,mapUv:wt&&_(M.map.channel),aoMapUv:ie&&_(M.aoMap.channel),lightMapUv:de&&_(M.lightMap.channel),bumpMapUv:zt&&_(M.bumpMap.channel),normalMapUv:Re&&_(M.normalMap.channel),displacementMapUv:D&&_(M.displacementMap.channel),emissiveMapUv:Ne&&_(M.emissiveMap.channel),metalnessMapUv:ne&&_(M.metalnessMap.channel),roughnessMapUv:ge&&_(M.roughnessMap.channel),anisotropyMapUv:Y&&_(M.anisotropyMap.channel),clearcoatMapUv:gt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:$&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:_t&&_(M.sheenRoughnessMap.channel),specularMapUv:xt&&_(M.specularMap.channel),specularColorMapUv:ht&&_(M.specularColorMap.channel),specularIntensityMapUv:Ht&&_(M.specularIntensityMap.channel),transmissionMapUv:N&&_(M.transmissionMap.channel),thicknessMapUv:rt&&_(M.thicknessMap.channel),alphaMapUv:mt&&_(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Re||Mt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!q.attributes.uv&&(wt||mt),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||q.attributes.normal===void 0&&Re===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ot,skinning:B.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:ft,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:e.shadowMap.enabled&&F.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ut,decodeVideoTexture:wt&&M.map.isVideoTexture===!0&&Zt.getTransfer(M.map.colorSpace)===se,decodeVideoTextureEmissive:Ne&&M.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(M.emissiveMap.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===zi,flipSided:M.side===Sn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:vt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&M.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function g(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const F in M.defines)b.push(F),b.push(M.defines[F]);return M.isRawShaderMaterial===!1&&(f(b,M),m(b,M),b.push(e.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function f(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function m(M,b){r.disableAll(),b.instancing&&r.enable(0),b.instancingColor&&r.enable(1),b.instancingMorph&&r.enable(2),b.matcap&&r.enable(3),b.envMap&&r.enable(4),b.normalMapObjectSpace&&r.enable(5),b.normalMapTangentSpace&&r.enable(6),b.clearcoat&&r.enable(7),b.iridescence&&r.enable(8),b.alphaTest&&r.enable(9),b.vertexColors&&r.enable(10),b.vertexAlphas&&r.enable(11),b.vertexUv1s&&r.enable(12),b.vertexUv2s&&r.enable(13),b.vertexUv3s&&r.enable(14),b.vertexTangents&&r.enable(15),b.anisotropy&&r.enable(16),b.alphaHash&&r.enable(17),b.batching&&r.enable(18),b.dispersion&&r.enable(19),b.batchingColor&&r.enable(20),b.gradientMap&&r.enable(21),M.push(r.mask),r.disableAll(),b.fog&&r.enable(0),b.useFog&&r.enable(1),b.flatShading&&r.enable(2),b.logarithmicDepthBuffer&&r.enable(3),b.reversedDepthBuffer&&r.enable(4),b.skinning&&r.enable(5),b.morphTargets&&r.enable(6),b.morphNormals&&r.enable(7),b.morphColors&&r.enable(8),b.premultipliedAlpha&&r.enable(9),b.shadowMapEnabled&&r.enable(10),b.doubleSided&&r.enable(11),b.flipSided&&r.enable(12),b.useDepthPacking&&r.enable(13),b.dithering&&r.enable(14),b.transmission&&r.enable(15),b.sheen&&r.enable(16),b.opaque&&r.enable(17),b.pointsUvs&&r.enable(18),b.decodeVideoTexture&&r.enable(19),b.decodeVideoTextureEmissive&&r.enable(20),b.alphaToCoverage&&r.enable(21),M.push(r.mask)}function v(M){const b=d[M.type];let F;if(b){const w=di[b];F=Mb.clone(w.uniforms)}else F=M.uniforms;return F}function S(M,b){let F=h.get(b);return F!==void 0?++F.usedTimes:(F=new WR(e,b,M,a),c.push(F),h.set(b,F)),F}function R(M){if(--M.usedTimes===0){const b=c.indexOf(M);c[b]=c[c.length-1],c.pop(),h.delete(M.cacheKey),M.destroy()}}function C(M){o.remove(M)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:v,acquireProgram:S,releaseProgram:R,releaseShaderCache:C,programs:c,dispose:A}}function KR(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function QR(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function u0(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function f0(){const e=[];let t=0;const n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,_,y,g,f){let m=e[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:_,materialVariant:r(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:f},e[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=_,m.materialVariant=r(u),m.groupOrder=y,m.renderOrder=u.renderOrder,m.z=g,m.group=f),t++,m}function l(u,d,_,y,g,f){const m=o(u,d,_,y,g,f);_.transmission>0?i.push(m):_.transparent===!0?a.push(m):n.push(m)}function c(u,d,_,y,g,f){const m=o(u,d,_,y,g,f);_.transmission>0?i.unshift(m):_.transparent===!0?a.unshift(m):n.unshift(m)}function h(u,d){n.length>1&&n.sort(u||QR),i.length>1&&i.sort(d||u0),a.length>1&&a.sort(d||u0)}function p(){for(let u=t,d=e.length;u<d;u++){const _=e[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:p,sort:h}}function JR(){let e=new WeakMap;function t(i,a){const s=e.get(i);let r;return s===void 0?(r=new f0,e.set(i,[r])):a>=s.length?(r=new f0,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function $R(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new G,color:new jt};break;case"SpotLight":n={position:new G,direction:new G,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new G,color:new jt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new G,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":n={color:new jt,position:new G,halfWidth:new G,halfHeight:new G};break}return e[t.id]=n,n}}}function tC(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let eC=0;function nC(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function iC(e){const t=new $R,n=tC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);const a=new G,s=new Le,r=new Le;function o(c){let h=0,p=0,u=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,_=0,y=0,g=0,f=0,m=0,v=0,S=0,R=0,C=0,A=0;c.sort(nC);for(let b=0,F=c.length;b<F;b++){const w=c[b],B=w.color,V=w.intensity,q=w.distance;let H=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Tr?H=w.shadow.map.texture:H=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)h+=B.r*V,p+=B.g*V,u+=B.b*V;else if(w.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(w.sh.coefficients[U],V);A++}else if(w.isDirectionalLight){const U=t.get(w);if(U.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const L=w.shadow,X=n.get(w);X.shadowIntensity=L.intensity,X.shadowBias=L.bias,X.shadowNormalBias=L.normalBias,X.shadowRadius=L.radius,X.shadowMapSize=L.mapSize,i.directionalShadow[d]=X,i.directionalShadowMap[d]=H,i.directionalShadowMatrix[d]=w.shadow.matrix,m++}i.directional[d]=U,d++}else if(w.isSpotLight){const U=t.get(w);U.position.setFromMatrixPosition(w.matrixWorld),U.color.copy(B).multiplyScalar(V),U.distance=q,U.coneCos=Math.cos(w.angle),U.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),U.decay=w.decay,i.spot[y]=U;const L=w.shadow;if(w.map&&(i.spotLightMap[R]=w.map,R++,L.updateMatrices(w),w.castShadow&&C++),i.spotLightMatrix[y]=L.matrix,w.castShadow){const X=n.get(w);X.shadowIntensity=L.intensity,X.shadowBias=L.bias,X.shadowNormalBias=L.normalBias,X.shadowRadius=L.radius,X.shadowMapSize=L.mapSize,i.spotShadow[y]=X,i.spotShadowMap[y]=H,S++}y++}else if(w.isRectAreaLight){const U=t.get(w);U.color.copy(B).multiplyScalar(V),U.halfWidth.set(w.width*.5,0,0),U.halfHeight.set(0,w.height*.5,0),i.rectArea[g]=U,g++}else if(w.isPointLight){const U=t.get(w);if(U.color.copy(w.color).multiplyScalar(w.intensity),U.distance=w.distance,U.decay=w.decay,w.castShadow){const L=w.shadow,X=n.get(w);X.shadowIntensity=L.intensity,X.shadowBias=L.bias,X.shadowNormalBias=L.normalBias,X.shadowRadius=L.radius,X.shadowMapSize=L.mapSize,X.shadowCameraNear=L.camera.near,X.shadowCameraFar=L.camera.far,i.pointShadow[_]=X,i.pointShadowMap[_]=H,i.pointShadowMatrix[_]=w.shadow.matrix,v++}i.point[_]=U,_++}else if(w.isHemisphereLight){const U=t.get(w);U.skyColor.copy(w.color).multiplyScalar(V),U.groundColor.copy(w.groundColor).multiplyScalar(V),i.hemi[f]=U,f++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=u;const M=i.hash;(M.directionalLength!==d||M.pointLength!==_||M.spotLength!==y||M.rectAreaLength!==g||M.hemiLength!==f||M.numDirectionalShadows!==m||M.numPointShadows!==v||M.numSpotShadows!==S||M.numSpotMaps!==R||M.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=y,i.rectArea.length=g,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+R-C,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,M.directionalLength=d,M.pointLength=_,M.spotLength=y,M.rectAreaLength=g,M.hemiLength=f,M.numDirectionalShadows=m,M.numPointShadows=v,M.numSpotShadows=S,M.numSpotMaps=R,M.numLightProbes=A,i.version=eC++)}function l(c,h){let p=0,u=0,d=0,_=0,y=0;const g=h.matrixWorldInverse;for(let f=0,m=c.length;f<m;f++){const v=c[f];if(v.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(v.matrixWorld),a.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(g),p++}else if(v.isSpotLight){const S=i.spot[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(v.matrixWorld),a.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(g),d++}else if(v.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),r.identity(),s.copy(v.matrixWorld),s.premultiply(g),r.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),_++}else if(v.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),u++}else if(v.isHemisphereLight){const S=i.hemi[y];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:i}}function h0(e){const t=new iC(e),n=[],i=[];function a(h){c.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function r(h){i.push(h)}function o(){t.setup(n)}function l(h){t.setupView(n,h)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function aC(e){let t=new WeakMap;function n(a,s=0){const r=t.get(a);let o;return r===void 0?(o=new h0(e),t.set(a,[o])):s>=r.length?(o=new h0(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const sC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rC=`uniform sampler2D shadow_pass;
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
}`,oC=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],lC=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],d0=new Le,$r=new G,Nf=new G;function cC(e,t,n){let i=new kx;const a=new he,s=new he,r=new De,o=new Tb,l=new Ab,c={},h=n.maxTextureSize,p={[Ga]:Sn,[Sn]:Ga,[zi]:zi},u=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:sC,fragmentShader:rC}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const _=new li;_.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new aa(_,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rc;let f=this.type;this.render=function(C,A,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;this.type===hE&&(Lt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=rc);const b=e.getRenderTarget(),F=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Yi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const V=f!==this.type;V&&A.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(H=>H.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,H=C.length;q<H;q++){const U=C[q],L=U.shadow;if(L===void 0){Lt("WebGLShadowMap:",U,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;a.copy(L.mapSize);const X=L.getFrameExtents();a.multiply(X),s.copy(L.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(s.x=Math.floor(h/X.x),a.x=s.x*X.x,L.mapSize.x=s.x),a.y>h&&(s.y=Math.floor(h/X.y),a.y=s.y*X.y,L.mapSize.y=s.y));const j=e.state.buffers.depth.getReversed();if(L.camera._reversedDepth=j,L.map===null||V===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===ro){if(U.isPointLight){Lt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Mi(a.x,a.y,{format:Tr,type:ea,minFilter:on,magFilter:on,generateMipmaps:!1}),L.map.texture.name=U.name+".shadowMap",L.map.depthTexture=new zo(a.x,a.y,_i),L.map.depthTexture.name=U.name+".shadowMapDepth",L.map.depthTexture.format=na,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=en,L.map.depthTexture.magFilter=en}else U.isPointLight?(L.map=new Kx(a.x),L.map.depthTexture=new xb(a.x,yi)):(L.map=new Mi(a.x,a.y),L.map.depthTexture=new zo(a.x,a.y,yi)),L.map.depthTexture.name=U.name+".shadowMap",L.map.depthTexture.format=na,this.type===rc?(L.map.depthTexture.compareFunction=j?Np:Lp,L.map.depthTexture.minFilter=on,L.map.depthTexture.magFilter=on):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=en,L.map.depthTexture.magFilter=en);L.camera.updateProjectionMatrix()}const et=L.map.isWebGLCubeRenderTarget?6:1;for(let dt=0;dt<et;dt++){if(L.map.isWebGLCubeRenderTarget)e.setRenderTarget(L.map,dt),e.clear();else{dt===0&&(e.setRenderTarget(L.map),e.clear());const ft=L.getViewport(dt);r.set(s.x*ft.x,s.y*ft.y,s.x*ft.z,s.y*ft.w),B.viewport(r)}if(U.isPointLight){const ft=L.camera,Dt=L.matrix,Kt=U.distance||ft.far;Kt!==ft.far&&(ft.far=Kt,ft.updateProjectionMatrix()),$r.setFromMatrixPosition(U.matrixWorld),ft.position.copy($r),Nf.copy(ft.position),Nf.add(oC[dt]),ft.up.copy(lC[dt]),ft.lookAt(Nf),ft.updateMatrixWorld(),Dt.makeTranslation(-$r.x,-$r.y,-$r.z),d0.multiplyMatrices(ft.projectionMatrix,ft.matrixWorldInverse),L._frustum.setFromProjectionMatrix(d0,ft.coordinateSystem,ft.reversedDepth)}else L.updateMatrices(U);i=L.getFrustum(),S(A,M,L.camera,U,this.type)}L.isPointLightShadow!==!0&&this.type===ro&&m(L,M),L.needsUpdate=!1}f=this.type,g.needsUpdate=!1,e.setRenderTarget(b,F,w)};function m(C,A){const M=t.update(y);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Mi(a.x,a.y,{format:Tr,type:ea})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(A,null,M,u,y,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(A,null,M,d,y,null)}function v(C,A,M,b){let F=null;const w=M.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(w!==void 0)F=w;else if(F=M.isPointLight===!0?l:o,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const B=F.uuid,V=A.uuid;let q=c[B];q===void 0&&(q={},c[B]=q);let H=q[V];H===void 0&&(H=F.clone(),q[V]=H,A.addEventListener("dispose",R)),F=H}if(F.visible=A.visible,F.wireframe=A.wireframe,b===ro?F.side=A.shadowSide!==null?A.shadowSide:A.side:F.side=A.shadowSide!==null?A.shadowSide:p[A.side],F.alphaMap=A.alphaMap,F.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,F.map=A.map,F.clipShadows=A.clipShadows,F.clippingPlanes=A.clippingPlanes,F.clipIntersection=A.clipIntersection,F.displacementMap=A.displacementMap,F.displacementScale=A.displacementScale,F.displacementBias=A.displacementBias,F.wireframeLinewidth=A.wireframeLinewidth,F.linewidth=A.linewidth,M.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const B=e.properties.get(F);B.light=M}return F}function S(C,A,M,b,F){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&F===ro)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,C.matrixWorld);const V=t.update(C),q=C.material;if(Array.isArray(q)){const H=V.groups;for(let U=0,L=H.length;U<L;U++){const X=H[U],j=q[X.materialIndex];if(j&&j.visible){const et=v(C,j,b,F);C.onBeforeShadow(e,C,A,M,V,et,X),e.renderBufferDirect(M,null,V,et,C,X),C.onAfterShadow(e,C,A,M,V,et,X)}}}else if(q.visible){const H=v(C,q,b,F);C.onBeforeShadow(e,C,A,M,V,H,null),e.renderBufferDirect(M,null,V,H,C,null),C.onAfterShadow(e,C,A,M,V,H,null)}}const B=C.children;for(let V=0,q=B.length;V<q;V++)S(B[V],A,M,b,F)}function R(C){C.target.removeEventListener("dispose",R);for(const M in c){const b=c[M],F=C.target.uuid;F in b&&(b[F].dispose(),delete b[F])}}}function uC(e,t){function n(){let N=!1;const rt=new De;let it=null;const mt=new De(0,0,0,0);return{setMask:function(tt){it!==tt&&!N&&(e.colorMask(tt,tt,tt,tt),it=tt)},setLocked:function(tt){N=tt},setClear:function(tt,W,vt,Ut,_e){_e===!0&&(tt*=Ut,W*=Ut,vt*=Ut),rt.set(tt,W,vt,Ut),mt.equals(rt)===!1&&(e.clearColor(tt,W,vt,Ut),mt.copy(rt))},reset:function(){N=!1,it=null,mt.set(-1,0,0,0)}}}function i(){let N=!1,rt=!1,it=null,mt=null,tt=null;return{setReversed:function(W){if(rt!==W){const vt=t.get("EXT_clip_control");W?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),rt=W;const Ut=tt;tt=null,this.setClear(Ut)}},getReversed:function(){return rt},setTest:function(W){W?at(e.DEPTH_TEST):ot(e.DEPTH_TEST)},setMask:function(W){it!==W&&!N&&(e.depthMask(W),it=W)},setFunc:function(W){if(rt&&(W=qE[W]),mt!==W){switch(W){case Nh:e.depthFunc(e.NEVER);break;case Oh:e.depthFunc(e.ALWAYS);break;case Ph:e.depthFunc(e.LESS);break;case Er:e.depthFunc(e.LEQUAL);break;case Ih:e.depthFunc(e.EQUAL);break;case Fh:e.depthFunc(e.GEQUAL);break;case Bh:e.depthFunc(e.GREATER);break;case zh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}mt=W}},setLocked:function(W){N=W},setClear:function(W){tt!==W&&(tt=W,rt&&(W=1-W),e.clearDepth(W))},reset:function(){N=!1,it=null,mt=null,tt=null,rt=!1}}}function a(){let N=!1,rt=null,it=null,mt=null,tt=null,W=null,vt=null,Ut=null,_e=null;return{setTest:function(ae){N||(ae?at(e.STENCIL_TEST):ot(e.STENCIL_TEST))},setMask:function(ae){rt!==ae&&!N&&(e.stencilMask(ae),rt=ae)},setFunc:function(ae,Ti,Ai){(it!==ae||mt!==Ti||tt!==Ai)&&(e.stencilFunc(ae,Ti,Ai),it=ae,mt=Ti,tt=Ai)},setOp:function(ae,Ti,Ai){(W!==ae||vt!==Ti||Ut!==Ai)&&(e.stencilOp(ae,Ti,Ai),W=ae,vt=Ti,Ut=Ai)},setLocked:function(ae){N=ae},setClear:function(ae){_e!==ae&&(e.clearStencil(ae),_e=ae)},reset:function(){N=!1,rt=null,it=null,mt=null,tt=null,W=null,vt=null,Ut=null,_e=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let h={},p={},u=new WeakMap,d=[],_=null,y=!1,g=null,f=null,m=null,v=null,S=null,R=null,C=null,A=new jt(0,0,0),M=0,b=!1,F=null,w=null,B=null,V=null,q=null;const H=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,L=0;const X=e.getParameter(e.VERSION);X.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(X)[1]),U=L>=1):X.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),U=L>=2);let j=null,et={};const dt=e.getParameter(e.SCISSOR_BOX),ft=e.getParameter(e.VIEWPORT),Dt=new De().fromArray(dt),Kt=new De().fromArray(ft);function ee(N,rt,it,mt){const tt=new Uint8Array(4),W=e.createTexture();e.bindTexture(N,W),e.texParameteri(N,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(N,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let vt=0;vt<it;vt++)N===e.TEXTURE_3D||N===e.TEXTURE_2D_ARRAY?e.texImage3D(rt,0,e.RGBA,1,1,mt,0,e.RGBA,e.UNSIGNED_BYTE,tt):e.texImage2D(rt+vt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,tt);return W}const K={};K[e.TEXTURE_2D]=ee(e.TEXTURE_2D,e.TEXTURE_2D,1),K[e.TEXTURE_CUBE_MAP]=ee(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[e.TEXTURE_2D_ARRAY]=ee(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),K[e.TEXTURE_3D]=ee(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),at(e.DEPTH_TEST),r.setFunc(Er),zt(!1),Re(vg),at(e.CULL_FACE),ie(Yi);function at(N){h[N]!==!0&&(e.enable(N),h[N]=!0)}function ot(N){h[N]!==!1&&(e.disable(N),h[N]=!1)}function It(N,rt){return p[N]!==rt?(e.bindFramebuffer(N,rt),p[N]=rt,N===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=rt),N===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=rt),!0):!1}function At(N,rt){let it=d,mt=!1;if(N){it=u.get(rt),it===void 0&&(it=[],u.set(rt,it));const tt=N.textures;if(it.length!==tt.length||it[0]!==e.COLOR_ATTACHMENT0){for(let W=0,vt=tt.length;W<vt;W++)it[W]=e.COLOR_ATTACHMENT0+W;it.length=tt.length,mt=!0}}else it[0]!==e.BACK&&(it[0]=e.BACK,mt=!0);mt&&e.drawBuffers(it)}function wt(N){return _!==N?(e.useProgram(N),_=N,!0):!1}const Xe={[as]:e.FUNC_ADD,[pE]:e.FUNC_SUBTRACT,[mE]:e.FUNC_REVERSE_SUBTRACT};Xe[gE]=e.MIN,Xe[_E]=e.MAX;const Yt={[vE]:e.ZERO,[xE]:e.ONE,[SE]:e.SRC_COLOR,[Uh]:e.SRC_ALPHA,[AE]:e.SRC_ALPHA_SATURATE,[bE]:e.DST_COLOR,[yE]:e.DST_ALPHA,[ME]:e.ONE_MINUS_SRC_COLOR,[Lh]:e.ONE_MINUS_SRC_ALPHA,[TE]:e.ONE_MINUS_DST_COLOR,[EE]:e.ONE_MINUS_DST_ALPHA,[RE]:e.CONSTANT_COLOR,[CE]:e.ONE_MINUS_CONSTANT_COLOR,[wE]:e.CONSTANT_ALPHA,[DE]:e.ONE_MINUS_CONSTANT_ALPHA};function ie(N,rt,it,mt,tt,W,vt,Ut,_e,ae){if(N===Yi){y===!0&&(ot(e.BLEND),y=!1);return}if(y===!1&&(at(e.BLEND),y=!0),N!==dE){if(N!==g||ae!==b){if((f!==as||S!==as)&&(e.blendEquation(e.FUNC_ADD),f=as,S=as),ae)switch(N){case ur:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Dh:e.blendFunc(e.ONE,e.ONE);break;case xg:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Sg:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Jt("WebGLState: Invalid blending: ",N);break}else switch(N){case ur:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Dh:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case xg:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sg:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",N);break}m=null,v=null,R=null,C=null,A.set(0,0,0),M=0,g=N,b=ae}return}tt=tt||rt,W=W||it,vt=vt||mt,(rt!==f||tt!==S)&&(e.blendEquationSeparate(Xe[rt],Xe[tt]),f=rt,S=tt),(it!==m||mt!==v||W!==R||vt!==C)&&(e.blendFuncSeparate(Yt[it],Yt[mt],Yt[W],Yt[vt]),m=it,v=mt,R=W,C=vt),(Ut.equals(A)===!1||_e!==M)&&(e.blendColor(Ut.r,Ut.g,Ut.b,_e),A.copy(Ut),M=_e),g=N,b=!1}function de(N,rt){N.side===zi?ot(e.CULL_FACE):at(e.CULL_FACE);let it=N.side===Sn;rt&&(it=!it),zt(it),N.blending===ur&&N.transparent===!1?ie(Yi):ie(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);const mt=N.stencilWrite;o.setTest(mt),mt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ne(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?at(e.SAMPLE_ALPHA_TO_COVERAGE):ot(e.SAMPLE_ALPHA_TO_COVERAGE)}function zt(N){F!==N&&(N?e.frontFace(e.CW):e.frontFace(e.CCW),F=N)}function Re(N){N!==uE?(at(e.CULL_FACE),N!==w&&(N===vg?e.cullFace(e.BACK):N===fE?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ot(e.CULL_FACE),w=N}function D(N){N!==B&&(U&&e.lineWidth(N),B=N)}function Ne(N,rt,it){N?(at(e.POLYGON_OFFSET_FILL),(V!==rt||q!==it)&&(V=rt,q=it,r.getReversed()&&(rt=-rt),e.polygonOffset(rt,it))):ot(e.POLYGON_OFFSET_FILL)}function ne(N){N?at(e.SCISSOR_TEST):ot(e.SCISSOR_TEST)}function ge(N){N===void 0&&(N=e.TEXTURE0+H-1),j!==N&&(e.activeTexture(N),j=N)}function Mt(N,rt,it){it===void 0&&(j===null?it=e.TEXTURE0+H-1:it=j);let mt=et[it];mt===void 0&&(mt={type:void 0,texture:void 0},et[it]=mt),(mt.type!==N||mt.texture!==rt)&&(j!==it&&(e.activeTexture(it),j=it),e.bindTexture(N,rt||K[N]),mt.type=N,mt.texture=rt)}function T(){const N=et[j];N!==void 0&&N.type!==void 0&&(e.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{e.compressedTexImage2D(...arguments)}catch(N){Jt("WebGLState:",N)}}function O(){try{e.compressedTexImage3D(...arguments)}catch(N){Jt("WebGLState:",N)}}function Z(){try{e.texSubImage2D(...arguments)}catch(N){Jt("WebGLState:",N)}}function J(){try{e.texSubImage3D(...arguments)}catch(N){Jt("WebGLState:",N)}}function Y(){try{e.compressedTexSubImage2D(...arguments)}catch(N){Jt("WebGLState:",N)}}function gt(){try{e.compressedTexSubImage3D(...arguments)}catch(N){Jt("WebGLState:",N)}}function st(){try{e.texStorage2D(...arguments)}catch(N){Jt("WebGLState:",N)}}function Tt(){try{e.texStorage3D(...arguments)}catch(N){Jt("WebGLState:",N)}}function Rt(){try{e.texImage2D(...arguments)}catch(N){Jt("WebGLState:",N)}}function $(){try{e.texImage3D(...arguments)}catch(N){Jt("WebGLState:",N)}}function nt(N){Dt.equals(N)===!1&&(e.scissor(N.x,N.y,N.z,N.w),Dt.copy(N))}function _t(N){Kt.equals(N)===!1&&(e.viewport(N.x,N.y,N.z,N.w),Kt.copy(N))}function xt(N,rt){let it=c.get(rt);it===void 0&&(it=new WeakMap,c.set(rt,it));let mt=it.get(N);mt===void 0&&(mt=e.getUniformBlockIndex(rt,N.name),it.set(N,mt))}function ht(N,rt){const mt=c.get(rt).get(N);l.get(rt)!==mt&&(e.uniformBlockBinding(rt,mt,N.__bindingPointIndex),l.set(rt,mt))}function Ht(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),h={},j=null,et={},p={},u=new WeakMap,d=[],_=null,y=!1,g=null,f=null,m=null,v=null,S=null,R=null,C=null,A=new jt(0,0,0),M=0,b=!1,F=null,w=null,B=null,V=null,q=null,Dt.set(0,0,e.canvas.width,e.canvas.height),Kt.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:at,disable:ot,bindFramebuffer:It,drawBuffers:At,useProgram:wt,setBlending:ie,setMaterial:de,setFlipSided:zt,setCullFace:Re,setLineWidth:D,setPolygonOffset:Ne,setScissorTest:ne,activeTexture:ge,bindTexture:Mt,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Rt,texImage3D:$,updateUBOMapping:xt,uniformBlockBinding:ht,texStorage2D:st,texStorage3D:Tt,texSubImage2D:Z,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:gt,scissor:nt,viewport:_t,reset:Ht}}function fC(e,t,n,i,a,s,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap;let p;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,x){return d?new OffscreenCanvas(T,x):kc("canvas")}function y(T,x,O){let Z=1;const J=Mt(T);if((J.width>O||J.height>O)&&(Z=O/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Y=Math.floor(Z*J.width),gt=Math.floor(Z*J.height);p===void 0&&(p=_(Y,gt));const st=x?_(Y,gt):p;return st.width=Y,st.height=gt,st.getContext("2d").drawImage(T,0,0,Y,gt),Lt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+gt+")."),st}else return"data"in T&&Lt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function g(T){return T.generateMipmaps}function f(T){e.generateMipmap(T)}function m(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(T,x,O,Z,J=!1){if(T!==null){if(e[T]!==void 0)return e[T];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Y=x;if(x===e.RED&&(O===e.FLOAT&&(Y=e.R32F),O===e.HALF_FLOAT&&(Y=e.R16F),O===e.UNSIGNED_BYTE&&(Y=e.R8)),x===e.RED_INTEGER&&(O===e.UNSIGNED_BYTE&&(Y=e.R8UI),O===e.UNSIGNED_SHORT&&(Y=e.R16UI),O===e.UNSIGNED_INT&&(Y=e.R32UI),O===e.BYTE&&(Y=e.R8I),O===e.SHORT&&(Y=e.R16I),O===e.INT&&(Y=e.R32I)),x===e.RG&&(O===e.FLOAT&&(Y=e.RG32F),O===e.HALF_FLOAT&&(Y=e.RG16F),O===e.UNSIGNED_BYTE&&(Y=e.RG8)),x===e.RG_INTEGER&&(O===e.UNSIGNED_BYTE&&(Y=e.RG8UI),O===e.UNSIGNED_SHORT&&(Y=e.RG16UI),O===e.UNSIGNED_INT&&(Y=e.RG32UI),O===e.BYTE&&(Y=e.RG8I),O===e.SHORT&&(Y=e.RG16I),O===e.INT&&(Y=e.RG32I)),x===e.RGB_INTEGER&&(O===e.UNSIGNED_BYTE&&(Y=e.RGB8UI),O===e.UNSIGNED_SHORT&&(Y=e.RGB16UI),O===e.UNSIGNED_INT&&(Y=e.RGB32UI),O===e.BYTE&&(Y=e.RGB8I),O===e.SHORT&&(Y=e.RGB16I),O===e.INT&&(Y=e.RGB32I)),x===e.RGBA_INTEGER&&(O===e.UNSIGNED_BYTE&&(Y=e.RGBA8UI),O===e.UNSIGNED_SHORT&&(Y=e.RGBA16UI),O===e.UNSIGNED_INT&&(Y=e.RGBA32UI),O===e.BYTE&&(Y=e.RGBA8I),O===e.SHORT&&(Y=e.RGBA16I),O===e.INT&&(Y=e.RGBA32I)),x===e.RGB&&(O===e.UNSIGNED_INT_5_9_9_9_REV&&(Y=e.RGB9_E5),O===e.UNSIGNED_INT_10F_11F_11F_REV&&(Y=e.R11F_G11F_B10F)),x===e.RGBA){const gt=J?Gc:Zt.getTransfer(Z);O===e.FLOAT&&(Y=e.RGBA32F),O===e.HALF_FLOAT&&(Y=e.RGBA16F),O===e.UNSIGNED_BYTE&&(Y=gt===se?e.SRGB8_ALPHA8:e.RGBA8),O===e.UNSIGNED_SHORT_4_4_4_4&&(Y=e.RGBA4),O===e.UNSIGNED_SHORT_5_5_5_1&&(Y=e.RGB5_A1)}return(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function S(T,x){let O;return T?x===null||x===yi||x===Bo?O=e.DEPTH24_STENCIL8:x===_i?O=e.DEPTH32F_STENCIL8:x===Fo&&(O=e.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===yi||x===Bo?O=e.DEPTH_COMPONENT24:x===_i?O=e.DEPTH_COMPONENT32F:x===Fo&&(O=e.DEPTH_COMPONENT16),O}function R(T,x){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==en&&T.minFilter!==on?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function C(T){const x=T.target;x.removeEventListener("dispose",C),M(x),x.isVideoTexture&&h.delete(x)}function A(T){const x=T.target;x.removeEventListener("dispose",A),F(x)}function M(T){const x=i.get(T);if(x.__webglInit===void 0)return;const O=T.source,Z=u.get(O);if(Z){const J=Z[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(T),Object.keys(Z).length===0&&u.delete(O)}i.remove(T)}function b(T){const x=i.get(T);e.deleteTexture(x.__webglTexture);const O=T.source,Z=u.get(O);delete Z[x.__cacheKey],r.memory.textures--}function F(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let J=0;J<x.__webglFramebuffer[Z].length;J++)e.deleteFramebuffer(x.__webglFramebuffer[Z][J]);else e.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)e.deleteFramebuffer(x.__webglFramebuffer[Z]);else e.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&e.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&e.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&e.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=T.textures;for(let Z=0,J=O.length;Z<J;Z++){const Y=i.get(O[Z]);Y.__webglTexture&&(e.deleteTexture(Y.__webglTexture),r.memory.textures--),i.remove(O[Z])}i.remove(T)}let w=0;function B(){w=0}function V(){const T=w;return T>=a.maxTextures&&Lt("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+a.maxTextures),w+=1,T}function q(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function H(T,x){const O=i.get(T);if(T.isVideoTexture&&ne(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const Z=T.image;if(Z===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{K(O,T,x);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,O.__webglTexture,e.TEXTURE0+x)}function U(T,x){const O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){K(O,T,x);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,O.__webglTexture,e.TEXTURE0+x)}function L(T,x){const O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){K(O,T,x);return}n.bindTexture(e.TEXTURE_3D,O.__webglTexture,e.TEXTURE0+x)}function X(T,x){const O=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){at(O,T,x);return}n.bindTexture(e.TEXTURE_CUBE_MAP,O.__webglTexture,e.TEXTURE0+x)}const j={[Hh]:e.REPEAT,[ki]:e.CLAMP_TO_EDGE,[Gh]:e.MIRRORED_REPEAT},et={[en]:e.NEAREST,[NE]:e.NEAREST_MIPMAP_NEAREST,[Sl]:e.NEAREST_MIPMAP_LINEAR,[on]:e.LINEAR,[nf]:e.LINEAR_MIPMAP_NEAREST,[rs]:e.LINEAR_MIPMAP_LINEAR},dt={[FE]:e.NEVER,[VE]:e.ALWAYS,[BE]:e.LESS,[Lp]:e.LEQUAL,[zE]:e.EQUAL,[Np]:e.GEQUAL,[HE]:e.GREATER,[GE]:e.NOTEQUAL};function ft(T,x){if(x.type===_i&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===on||x.magFilter===nf||x.magFilter===Sl||x.magFilter===rs||x.minFilter===on||x.minFilter===nf||x.minFilter===Sl||x.minFilter===rs)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,j[x.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,j[x.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,j[x.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,et[x.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,et[x.minFilter]),x.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,dt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===en||x.minFilter!==Sl&&x.minFilter!==rs||x.type===_i&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,a.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Dt(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",C));const Z=x.source;let J=u.get(Z);J===void 0&&(J={},u.set(Z,J));const Y=q(x);if(Y!==T.__cacheKey){J[Y]===void 0&&(J[Y]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,O=!0),J[Y].usedTimes++;const gt=J[T.__cacheKey];gt!==void 0&&(J[T.__cacheKey].usedTimes--,gt.usedTimes===0&&b(x)),T.__cacheKey=Y,T.__webglTexture=J[Y].texture}return O}function Kt(T,x,O){return Math.floor(Math.floor(T/O)/x)}function ee(T,x,O,Z){const Y=T.updateRanges;if(Y.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,x.width,x.height,O,Z,x.data);else{Y.sort(($,nt)=>$.start-nt.start);let gt=0;for(let $=1;$<Y.length;$++){const nt=Y[gt],_t=Y[$],xt=nt.start+nt.count,ht=Kt(_t.start,x.width,4),Ht=Kt(nt.start,x.width,4);_t.start<=xt+1&&ht===Ht&&Kt(_t.start+_t.count-1,x.width,4)===ht?nt.count=Math.max(nt.count,_t.start+_t.count-nt.start):(++gt,Y[gt]=_t)}Y.length=gt+1;const st=e.getParameter(e.UNPACK_ROW_LENGTH),Tt=e.getParameter(e.UNPACK_SKIP_PIXELS),Rt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,x.width);for(let $=0,nt=Y.length;$<nt;$++){const _t=Y[$],xt=Math.floor(_t.start/4),ht=Math.ceil(_t.count/4),Ht=xt%x.width,N=Math.floor(xt/x.width),rt=ht,it=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ht),e.pixelStorei(e.UNPACK_SKIP_ROWS,N),n.texSubImage2D(e.TEXTURE_2D,0,Ht,N,rt,it,O,Z,x.data)}T.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,st),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Tt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Rt)}}function K(T,x,O){let Z=e.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=e.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=e.TEXTURE_3D);const J=Dt(T,x),Y=x.source;n.bindTexture(Z,T.__webglTexture,e.TEXTURE0+O);const gt=i.get(Y);if(Y.version!==gt.__version||J===!0){n.activeTexture(e.TEXTURE0+O);const st=Zt.getPrimaries(Zt.workingColorSpace),Tt=x.colorSpace===Ma?null:Zt.getPrimaries(x.colorSpace),Rt=x.colorSpace===Ma||st===Tt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let $=y(x.image,!1,a.maxTextureSize);$=ge(x,$);const nt=s.convert(x.format,x.colorSpace),_t=s.convert(x.type);let xt=v(x.internalFormat,nt,_t,x.colorSpace,x.isVideoTexture);ft(Z,x);let ht;const Ht=x.mipmaps,N=x.isVideoTexture!==!0,rt=gt.__version===void 0||J===!0,it=Y.dataReady,mt=R(x,$);if(x.isDepthTexture)xt=S(x.format===os,x.type),rt&&(N?n.texStorage2D(e.TEXTURE_2D,1,xt,$.width,$.height):n.texImage2D(e.TEXTURE_2D,0,xt,$.width,$.height,0,nt,_t,null));else if(x.isDataTexture)if(Ht.length>0){N&&rt&&n.texStorage2D(e.TEXTURE_2D,mt,xt,Ht[0].width,Ht[0].height);for(let tt=0,W=Ht.length;tt<W;tt++)ht=Ht[tt],N?it&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,ht.width,ht.height,nt,_t,ht.data):n.texImage2D(e.TEXTURE_2D,tt,xt,ht.width,ht.height,0,nt,_t,ht.data);x.generateMipmaps=!1}else N?(rt&&n.texStorage2D(e.TEXTURE_2D,mt,xt,$.width,$.height),it&&ee(x,$,nt,_t)):n.texImage2D(e.TEXTURE_2D,0,xt,$.width,$.height,0,nt,_t,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&rt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,xt,Ht[0].width,Ht[0].height,$.depth);for(let tt=0,W=Ht.length;tt<W;tt++)if(ht=Ht[tt],x.format!==si)if(nt!==null)if(N){if(it)if(x.layerUpdates.size>0){const vt=Xg(ht.width,ht.height,x.format,x.type);for(const Ut of x.layerUpdates){const _e=ht.data.subarray(Ut*vt/ht.data.BYTES_PER_ELEMENT,(Ut+1)*vt/ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,Ut,ht.width,ht.height,1,nt,_e)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,ht.width,ht.height,$.depth,nt,ht.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,tt,xt,ht.width,ht.height,$.depth,0,ht.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?it&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,ht.width,ht.height,$.depth,nt,_t,ht.data):n.texImage3D(e.TEXTURE_2D_ARRAY,tt,xt,ht.width,ht.height,$.depth,0,nt,_t,ht.data)}else{N&&rt&&n.texStorage2D(e.TEXTURE_2D,mt,xt,Ht[0].width,Ht[0].height);for(let tt=0,W=Ht.length;tt<W;tt++)ht=Ht[tt],x.format!==si?nt!==null?N?it&&n.compressedTexSubImage2D(e.TEXTURE_2D,tt,0,0,ht.width,ht.height,nt,ht.data):n.compressedTexImage2D(e.TEXTURE_2D,tt,xt,ht.width,ht.height,0,ht.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?it&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,ht.width,ht.height,nt,_t,ht.data):n.texImage2D(e.TEXTURE_2D,tt,xt,ht.width,ht.height,0,nt,_t,ht.data)}else if(x.isDataArrayTexture)if(N){if(rt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,xt,$.width,$.height,$.depth),it)if(x.layerUpdates.size>0){const tt=Xg($.width,$.height,x.format,x.type);for(const W of x.layerUpdates){const vt=$.data.subarray(W*tt/$.data.BYTES_PER_ELEMENT,(W+1)*tt/$.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,W,$.width,$.height,1,nt,_t,vt)}x.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,nt,_t,$.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,xt,$.width,$.height,$.depth,0,nt,_t,$.data);else if(x.isData3DTexture)N?(rt&&n.texStorage3D(e.TEXTURE_3D,mt,xt,$.width,$.height,$.depth),it&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,nt,_t,$.data)):n.texImage3D(e.TEXTURE_3D,0,xt,$.width,$.height,$.depth,0,nt,_t,$.data);else if(x.isFramebufferTexture){if(rt)if(N)n.texStorage2D(e.TEXTURE_2D,mt,xt,$.width,$.height);else{let tt=$.width,W=$.height;for(let vt=0;vt<mt;vt++)n.texImage2D(e.TEXTURE_2D,vt,xt,tt,W,0,nt,_t,null),tt>>=1,W>>=1}}else if(Ht.length>0){if(N&&rt){const tt=Mt(Ht[0]);n.texStorage2D(e.TEXTURE_2D,mt,xt,tt.width,tt.height)}for(let tt=0,W=Ht.length;tt<W;tt++)ht=Ht[tt],N?it&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,nt,_t,ht):n.texImage2D(e.TEXTURE_2D,tt,xt,nt,_t,ht);x.generateMipmaps=!1}else if(N){if(rt){const tt=Mt($);n.texStorage2D(e.TEXTURE_2D,mt,xt,tt.width,tt.height)}it&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,nt,_t,$)}else n.texImage2D(e.TEXTURE_2D,0,xt,nt,_t,$);g(x)&&f(Z),gt.__version=Y.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function at(T,x,O){if(x.image.length!==6)return;const Z=Dt(T,x),J=x.source;n.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+O);const Y=i.get(J);if(J.version!==Y.__version||Z===!0){n.activeTexture(e.TEXTURE0+O);const gt=Zt.getPrimaries(Zt.workingColorSpace),st=x.colorSpace===Ma?null:Zt.getPrimaries(x.colorSpace),Tt=x.colorSpace===Ma||gt===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Rt=x.isCompressedTexture||x.image[0].isCompressedTexture,$=x.image[0]&&x.image[0].isDataTexture,nt=[];for(let W=0;W<6;W++)!Rt&&!$?nt[W]=y(x.image[W],!0,a.maxCubemapSize):nt[W]=$?x.image[W].image:x.image[W],nt[W]=ge(x,nt[W]);const _t=nt[0],xt=s.convert(x.format,x.colorSpace),ht=s.convert(x.type),Ht=v(x.internalFormat,xt,ht,x.colorSpace),N=x.isVideoTexture!==!0,rt=Y.__version===void 0||Z===!0,it=J.dataReady;let mt=R(x,_t);ft(e.TEXTURE_CUBE_MAP,x);let tt;if(Rt){N&&rt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,Ht,_t.width,_t.height);for(let W=0;W<6;W++){tt=nt[W].mipmaps;for(let vt=0;vt<tt.length;vt++){const Ut=tt[vt];x.format!==si?xt!==null?N?it&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,0,0,Ut.width,Ut.height,xt,Ut.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,Ht,Ut.width,Ut.height,0,Ut.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,0,0,Ut.width,Ut.height,xt,ht,Ut.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,Ht,Ut.width,Ut.height,0,xt,ht,Ut.data)}}}else{if(tt=x.mipmaps,N&&rt){tt.length>0&&mt++;const W=Mt(nt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,Ht,W.width,W.height)}for(let W=0;W<6;W++)if($){N?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,nt[W].width,nt[W].height,xt,ht,nt[W].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ht,nt[W].width,nt[W].height,0,xt,ht,nt[W].data);for(let vt=0;vt<tt.length;vt++){const _e=tt[vt].image[W].image;N?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,0,0,_e.width,_e.height,xt,ht,_e.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,Ht,_e.width,_e.height,0,xt,ht,_e.data)}}else{N?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,xt,ht,nt[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ht,xt,ht,nt[W]);for(let vt=0;vt<tt.length;vt++){const Ut=tt[vt];N?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,0,0,xt,ht,Ut.image[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,Ht,xt,ht,Ut.image[W])}}}g(x)&&f(e.TEXTURE_CUBE_MAP),Y.__version=J.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ot(T,x,O,Z,J,Y){const gt=s.convert(O.format,O.colorSpace),st=s.convert(O.type),Tt=v(O.internalFormat,gt,st,O.colorSpace),Rt=i.get(x),$=i.get(O);if($.__renderTarget=x,!Rt.__hasExternalTextures){const nt=Math.max(1,x.width>>Y),_t=Math.max(1,x.height>>Y);J===e.TEXTURE_3D||J===e.TEXTURE_2D_ARRAY?n.texImage3D(J,Y,Tt,nt,_t,x.depth,0,gt,st,null):n.texImage2D(J,Y,Tt,nt,_t,0,gt,st,null)}n.bindFramebuffer(e.FRAMEBUFFER,T),Ne(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,J,$.__webglTexture,0,D(x)):(J===e.TEXTURE_2D||J>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Z,J,$.__webglTexture,Y),n.bindFramebuffer(e.FRAMEBUFFER,null)}function It(T,x,O){if(e.bindRenderbuffer(e.RENDERBUFFER,T),x.depthBuffer){const Z=x.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,Y=S(x.stencilBuffer,J),gt=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ne(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,D(x),Y,x.width,x.height):O?e.renderbufferStorageMultisample(e.RENDERBUFFER,D(x),Y,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,Y,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,gt,e.RENDERBUFFER,T)}else{const Z=x.textures;for(let J=0;J<Z.length;J++){const Y=Z[J],gt=s.convert(Y.format,Y.colorSpace),st=s.convert(Y.type),Tt=v(Y.internalFormat,gt,st,Y.colorSpace);Ne(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,D(x),Tt,x.width,x.height):O?e.renderbufferStorageMultisample(e.RENDERBUFFER,D(x),Tt,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,Tt,x.width,x.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function At(T,x,O){const Z=x.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(x.depthTexture);if(J.__renderTarget=x,(!J.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z){if(J.__webglInit===void 0&&(J.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),J.__webglTexture===void 0){J.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,J.__webglTexture),ft(e.TEXTURE_CUBE_MAP,x.depthTexture);const Rt=s.convert(x.depthTexture.format),$=s.convert(x.depthTexture.type);let nt;x.depthTexture.format===na?nt=e.DEPTH_COMPONENT24:x.depthTexture.format===os&&(nt=e.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,nt,x.width,x.height,0,Rt,$,null)}}else H(x.depthTexture,0);const Y=J.__webglTexture,gt=D(x),st=Z?e.TEXTURE_CUBE_MAP_POSITIVE_X+O:e.TEXTURE_2D,Tt=x.depthTexture.format===os?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(x.depthTexture.format===na)Ne(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Tt,st,Y,0,gt):e.framebufferTexture2D(e.FRAMEBUFFER,Tt,st,Y,0);else if(x.depthTexture.format===os)Ne(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Tt,st,Y,0,gt):e.framebufferTexture2D(e.FRAMEBUFFER,Tt,st,Y,0);else throw new Error("Unknown depthTexture format")}function wt(T){const x=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=Z}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let Z=0;Z<6;Z++)At(x.__webglFramebuffer[Z],T,Z);else{const Z=T.texture.mipmaps;Z&&Z.length>0?At(x.__webglFramebuffer[0],T,0):At(x.__webglFramebuffer,T,0)}else if(O){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=e.createRenderbuffer(),It(x.__webglDepthbuffer[Z],T,!1);else{const J=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer[Z];e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,Y)}}else{const Z=T.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=e.createRenderbuffer(),It(x.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,Y)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Xe(T,x,O){const Z=i.get(T);x!==void 0&&ot(Z.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),O!==void 0&&wt(T)}function Yt(T){const x=T.texture,O=i.get(T),Z=i.get(x);T.addEventListener("dispose",A);const J=T.textures,Y=T.isWebGLCubeRenderTarget===!0,gt=J.length>1;if(gt||(Z.__webglTexture===void 0&&(Z.__webglTexture=e.createTexture()),Z.__version=x.version,r.memory.textures++),Y){O.__webglFramebuffer=[];for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[st]=[];for(let Tt=0;Tt<x.mipmaps.length;Tt++)O.__webglFramebuffer[st][Tt]=e.createFramebuffer()}else O.__webglFramebuffer[st]=e.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let st=0;st<x.mipmaps.length;st++)O.__webglFramebuffer[st]=e.createFramebuffer()}else O.__webglFramebuffer=e.createFramebuffer();if(gt)for(let st=0,Tt=J.length;st<Tt;st++){const Rt=i.get(J[st]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=e.createTexture(),r.memory.textures++)}if(T.samples>0&&Ne(T)===!1){O.__webglMultisampledFramebuffer=e.createFramebuffer(),O.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let st=0;st<J.length;st++){const Tt=J[st];O.__webglColorRenderbuffer[st]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,O.__webglColorRenderbuffer[st]);const Rt=s.convert(Tt.format,Tt.colorSpace),$=s.convert(Tt.type),nt=v(Tt.internalFormat,Rt,$,Tt.colorSpace,T.isXRRenderTarget===!0),_t=D(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,_t,nt,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+st,e.RENDERBUFFER,O.__webglColorRenderbuffer[st])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=e.createRenderbuffer(),It(O.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Y){n.bindTexture(e.TEXTURE_CUBE_MAP,Z.__webglTexture),ft(e.TEXTURE_CUBE_MAP,x);for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0)for(let Tt=0;Tt<x.mipmaps.length;Tt++)ot(O.__webglFramebuffer[st][Tt],T,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt);else ot(O.__webglFramebuffer[st],T,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);g(x)&&f(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(gt){for(let st=0,Tt=J.length;st<Tt;st++){const Rt=J[st],$=i.get(Rt);let nt=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(nt=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(nt,$.__webglTexture),ft(nt,Rt),ot(O.__webglFramebuffer,T,Rt,e.COLOR_ATTACHMENT0+st,nt,0),g(Rt)&&f(nt)}n.unbindTexture()}else{let st=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(st=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(st,Z.__webglTexture),ft(st,x),x.mipmaps&&x.mipmaps.length>0)for(let Tt=0;Tt<x.mipmaps.length;Tt++)ot(O.__webglFramebuffer[Tt],T,x,e.COLOR_ATTACHMENT0,st,Tt);else ot(O.__webglFramebuffer,T,x,e.COLOR_ATTACHMENT0,st,0);g(x)&&f(st),n.unbindTexture()}T.depthBuffer&&wt(T)}function ie(T){const x=T.textures;for(let O=0,Z=x.length;O<Z;O++){const J=x[O];if(g(J)){const Y=m(T),gt=i.get(J).__webglTexture;n.bindTexture(Y,gt),f(Y),n.unbindTexture()}}}const de=[],zt=[];function Re(T){if(T.samples>0){if(Ne(T)===!1){const x=T.textures,O=T.width,Z=T.height;let J=e.COLOR_BUFFER_BIT;const Y=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,gt=i.get(T),st=x.length>1;if(st)for(let Rt=0;Rt<x.length;Rt++)n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const Tt=T.texture.mipmaps;Tt&&Tt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Rt=0;Rt<x.length;Rt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=e.STENCIL_BUFFER_BIT)),st){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,gt.__webglColorRenderbuffer[Rt]);const $=i.get(x[Rt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,$,0)}e.blitFramebuffer(0,0,O,Z,0,0,O,Z,J,e.NEAREST),l===!0&&(de.length=0,zt.length=0,de.push(e.COLOR_ATTACHMENT0+Rt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(de.push(Y),zt.push(Y),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,zt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,de))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),st)for(let Rt=0;Rt<x.length;Rt++){n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.RENDERBUFFER,gt.__webglColorRenderbuffer[Rt]);const $=i.get(x[Rt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.TEXTURE_2D,$,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[x])}}}function D(T){return Math.min(a.maxSamples,T.samples)}function Ne(T){const x=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ne(T){const x=r.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function ge(T,x){const O=T.colorSpace,Z=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==Ar&&O!==Ma&&(Zt.getTransfer(O)===se?(Z!==si||J!==Zn)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",O)),x}function Mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=B,this.setTexture2D=H,this.setTexture2DArray=U,this.setTexture3D=L,this.setTextureCube=X,this.rebindTextures=Xe,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function hC(e,t){function n(i,a=Ma){let s;const r=Zt.getTransfer(a);if(i===Zn)return e.UNSIGNED_BYTE;if(i===Rp)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Cp)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Dx)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ux)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Cx)return e.BYTE;if(i===wx)return e.SHORT;if(i===Fo)return e.UNSIGNED_SHORT;if(i===Ap)return e.INT;if(i===yi)return e.UNSIGNED_INT;if(i===_i)return e.FLOAT;if(i===ea)return e.HALF_FLOAT;if(i===Lx)return e.ALPHA;if(i===Nx)return e.RGB;if(i===si)return e.RGBA;if(i===na)return e.DEPTH_COMPONENT;if(i===os)return e.DEPTH_STENCIL;if(i===Ox)return e.RED;if(i===wp)return e.RED_INTEGER;if(i===Tr)return e.RG;if(i===Dp)return e.RG_INTEGER;if(i===Up)return e.RGBA_INTEGER;if(i===oc||i===lc||i===cc||i===uc)if(r===se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===oc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===lc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===cc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===uc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===oc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===lc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===cc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===uc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Vh||i===kh||i===Xh||i===Wh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Vh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===kh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Xh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qh||i===Yh||i===Zh||i===jh||i===Kh||i===Qh||i===Jh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qh||i===Yh)return r===se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zh)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===jh)return s.COMPRESSED_R11_EAC;if(i===Kh)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Qh)return s.COMPRESSED_RG11_EAC;if(i===Jh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===$h||i===td||i===ed||i===nd||i===id||i===ad||i===sd||i===rd||i===od||i===ld||i===cd||i===ud||i===fd||i===hd)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===$h)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===td)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ed)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===nd)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===id)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ad)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sd)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rd)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===od)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ld)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cd)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ud)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fd)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hd)return r===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===dd||i===pd||i===md)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===dd)return r===se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===md)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===gd||i===_d||i===vd||i===xd)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===gd)return s.COMPRESSED_RED_RGTC1_EXT;if(i===_d)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===vd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const dC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pC=`
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

}`;class mC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new Wx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new ri({vertexShader:dC,fragmentShader:pC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new aa(new hu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gC extends Ir{constructor(t,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,d=null,_=null;const y=typeof XRWebGLBinding<"u",g=new mC,f={},m=n.getContextAttributes();let v=null,S=null;const R=[],C=[],A=new he;let M=null;const b=new Xn;b.viewport=new De;const F=new Xn;F.viewport=new De;const w=[b,F],B=new Cb;let V=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let at=R[K];return at===void 0&&(at=new ff,R[K]=at),at.getTargetRaySpace()},this.getControllerGrip=function(K){let at=R[K];return at===void 0&&(at=new ff,R[K]=at),at.getGripSpace()},this.getHand=function(K){let at=R[K];return at===void 0&&(at=new ff,R[K]=at),at.getHandSpace()};function H(K){const at=C.indexOf(K.inputSource);if(at===-1)return;const ot=R[at];ot!==void 0&&(ot.update(K.inputSource,K.frame,c||r),ot.dispatchEvent({type:K.type,data:K.inputSource}))}function U(){a.removeEventListener("select",H),a.removeEventListener("selectstart",H),a.removeEventListener("selectend",H),a.removeEventListener("squeeze",H),a.removeEventListener("squeezestart",H),a.removeEventListener("squeezeend",H),a.removeEventListener("end",U),a.removeEventListener("inputsourceschange",L);for(let K=0;K<R.length;K++){const at=C[K];at!==null&&(C[K]=null,R[K].disconnect(at))}V=null,q=null,g.reset();for(const K in f)delete f[K];t.setRenderTarget(v),d=null,u=null,p=null,a=null,S=null,ee.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(a,n)),p},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(K){if(a=K,a!==null){if(v=t.getRenderTarget(),a.addEventListener("select",H),a.addEventListener("selectstart",H),a.addEventListener("selectend",H),a.addEventListener("squeeze",H),a.addEventListener("squeezestart",H),a.addEventListener("squeezeend",H),a.addEventListener("end",U),a.addEventListener("inputsourceschange",L),m.xrCompatible!==!0&&await n.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,It=null,At=null;m.depth&&(At=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ot=m.stencil?os:na,It=m.stencil?Bo:yi);const wt={colorFormat:n.RGBA8,depthFormat:At,scaleFactor:s};p=this.getBinding(),u=p.createProjectionLayer(wt),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Mi(u.textureWidth,u.textureHeight,{format:si,type:Zn,depthTexture:new zo(u.textureWidth,u.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ot={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(a,n,ot),a.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Mi(d.framebufferWidth,d.framebufferHeight,{format:si,type:Zn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),ee.setContext(a),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function L(K){for(let at=0;at<K.removed.length;at++){const ot=K.removed[at],It=C.indexOf(ot);It>=0&&(C[It]=null,R[It].disconnect(ot))}for(let at=0;at<K.added.length;at++){const ot=K.added[at];let It=C.indexOf(ot);if(It===-1){for(let wt=0;wt<R.length;wt++)if(wt>=C.length){C.push(ot),It=wt;break}else if(C[wt]===null){C[wt]=ot,It=wt;break}if(It===-1)break}const At=R[It];At&&At.connect(ot)}}const X=new G,j=new G;function et(K,at,ot){X.setFromMatrixPosition(at.matrixWorld),j.setFromMatrixPosition(ot.matrixWorld);const It=X.distanceTo(j),At=at.projectionMatrix.elements,wt=ot.projectionMatrix.elements,Xe=At[14]/(At[10]-1),Yt=At[14]/(At[10]+1),ie=(At[9]+1)/At[5],de=(At[9]-1)/At[5],zt=(At[8]-1)/At[0],Re=(wt[8]+1)/wt[0],D=Xe*zt,Ne=Xe*Re,ne=It/(-zt+Re),ge=ne*-zt;if(at.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ge),K.translateZ(ne),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),At[10]===-1)K.projectionMatrix.copy(at.projectionMatrix),K.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const Mt=Xe+ne,T=Yt+ne,x=D-ge,O=Ne+(It-ge),Z=ie*Yt/T*Mt,J=de*Yt/T*Mt;K.projectionMatrix.makePerspective(x,O,Z,J,Mt,T),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function dt(K,at){at===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(at.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(a===null)return;let at=K.near,ot=K.far;g.texture!==null&&(g.depthNear>0&&(at=g.depthNear),g.depthFar>0&&(ot=g.depthFar)),B.near=F.near=b.near=at,B.far=F.far=b.far=ot,(V!==B.near||q!==B.far)&&(a.updateRenderState({depthNear:B.near,depthFar:B.far}),V=B.near,q=B.far),B.layers.mask=K.layers.mask|6,b.layers.mask=B.layers.mask&-5,F.layers.mask=B.layers.mask&-3;const It=K.parent,At=B.cameras;dt(B,It);for(let wt=0;wt<At.length;wt++)dt(At[wt],It);At.length===2?et(B,b,F):B.projectionMatrix.copy(b.projectionMatrix),ft(K,B,It)};function ft(K,at,ot){ot===null?K.matrix.copy(at.matrixWorld):(K.matrix.copy(ot.matrixWorld),K.matrix.invert(),K.matrix.multiply(at.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(at.projectionMatrix),K.projectionMatrixInverse.copy(at.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Sd*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(K){return f[K]};let Dt=null;function Kt(K,at){if(h=at.getViewerPose(c||r),_=at,h!==null){const ot=h.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let It=!1;ot.length!==B.cameras.length&&(B.cameras.length=0,It=!0);for(let Yt=0;Yt<ot.length;Yt++){const ie=ot[Yt];let de=null;if(d!==null)de=d.getViewport(ie);else{const Re=p.getViewSubImage(u,ie);de=Re.viewport,Yt===0&&(t.setRenderTargetTextures(S,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(S))}let zt=w[Yt];zt===void 0&&(zt=new Xn,zt.layers.enable(Yt),zt.viewport=new De,w[Yt]=zt),zt.matrix.fromArray(ie.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(ie.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(de.x,de.y,de.width,de.height),Yt===0&&(B.matrix.copy(zt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),It===!0&&B.cameras.push(zt)}const At=a.enabledFeatures;if(At&&At.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&y){p=i.getBinding();const Yt=p.getDepthInformation(ot[0]);Yt&&Yt.isValid&&Yt.texture&&g.init(Yt,a.renderState)}if(At&&At.includes("camera-access")&&y){t.state.unbindTexture(),p=i.getBinding();for(let Yt=0;Yt<ot.length;Yt++){const ie=ot[Yt].camera;if(ie){let de=f[ie];de||(de=new Wx,f[ie]=de);const zt=p.getCameraImage(ie);de.sourceTexture=zt}}}}for(let ot=0;ot<R.length;ot++){const It=C[ot],At=R[ot];It!==null&&At!==void 0&&At.update(It,at,c||r)}Dt&&Dt(K,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),_=null}const ee=new jx;ee.setAnimationLoop(Kt),this.setAnimationLoop=function(K){Dt=K},this.dispose=function(){}}}const Ja=new ia,_C=new Le;function vC(e,t){function n(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,qx(e)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function a(g,f,m,v,S){f.isMeshBasicMaterial?s(g,f):f.isMeshLambertMaterial?(s(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(g,f),p(g,f)):f.isMeshPhongMaterial?(s(g,f),h(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(g,f),u(g,f),f.isMeshPhysicalMaterial&&d(g,f,S)):f.isMeshMatcapMaterial?(s(g,f),_(g,f)):f.isMeshDepthMaterial?s(g,f):f.isMeshDistanceMaterial?(s(g,f),y(g,f)):f.isMeshNormalMaterial?s(g,f):f.isLineBasicMaterial?(r(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,m,v):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,n(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Sn&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,n(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Sn&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,n(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,n(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const m=t.get(f),v=m.envMap,S=m.envMapRotation;v&&(g.envMap.value=v,Ja.copy(S),Ja.x*=-1,Ja.y*=-1,Ja.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ja.y*=-1,Ja.z*=-1),g.envMapRotation.value.setFromMatrix4(_C.makeRotationFromEuler(Ja)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,g.aoMapTransform))}function r(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,m,v){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*m,g.scale.value=v*.5,f.map&&(g.map.value=f.map,n(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function p(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function d(g,f,m){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Sn&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,f){f.matcap&&(g.matcap.value=f.matcap)}function y(g,f){const m=t.get(f).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function xC(e,t,n,i){let a={},s={},r=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,v){const S=v.program;i.uniformBlockBinding(m,S)}function c(m,v){let S=a[m.id];S===void 0&&(_(m),S=h(m),a[m.id]=S,m.addEventListener("dispose",g));const R=v.program;i.updateUBOMapping(m,R);const C=t.render.frame;s[m.id]!==C&&(u(m),s[m.id]=C)}function h(m){const v=p();m.__bindingPointIndex=v;const S=e.createBuffer(),R=m.__size,C=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,R,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,S),S}function p(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){const v=a[m.id],S=m.uniforms,R=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let C=0,A=S.length;C<A;C++){const M=Array.isArray(S[C])?S[C]:[S[C]];for(let b=0,F=M.length;b<F;b++){const w=M[b];if(d(w,C,b,R)===!0){const B=w.__offset,V=Array.isArray(w.value)?w.value:[w.value];let q=0;for(let H=0;H<V.length;H++){const U=V[H],L=y(U);typeof U=="number"||typeof U=="boolean"?(w.__data[0]=U,e.bufferSubData(e.UNIFORM_BUFFER,B+q,w.__data)):U.isMatrix3?(w.__data[0]=U.elements[0],w.__data[1]=U.elements[1],w.__data[2]=U.elements[2],w.__data[3]=0,w.__data[4]=U.elements[3],w.__data[5]=U.elements[4],w.__data[6]=U.elements[5],w.__data[7]=0,w.__data[8]=U.elements[6],w.__data[9]=U.elements[7],w.__data[10]=U.elements[8],w.__data[11]=0):(U.toArray(w.__data,q),q+=L.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(m,v,S,R){const C=m.value,A=v+"_"+S;if(R[A]===void 0)return typeof C=="number"||typeof C=="boolean"?R[A]=C:R[A]=C.clone(),!0;{const M=R[A];if(typeof C=="number"||typeof C=="boolean"){if(M!==C)return R[A]=C,!0}else if(M.equals(C)===!1)return M.copy(C),!0}return!1}function _(m){const v=m.uniforms;let S=0;const R=16;for(let A=0,M=v.length;A<M;A++){const b=Array.isArray(v[A])?v[A]:[v[A]];for(let F=0,w=b.length;F<w;F++){const B=b[F],V=Array.isArray(B.value)?B.value:[B.value];for(let q=0,H=V.length;q<H;q++){const U=V[q],L=y(U),X=S%R,j=X%L.boundary,et=X+j;S+=j,et!==0&&R-et<L.storage&&(S+=R-et),B.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=L.storage}}}const C=S%R;return C>0&&(S+=R-C),m.__size=S,m.__cache={},this}function y(m){const v={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(v.boundary=4,v.storage=4):m.isVector2?(v.boundary=8,v.storage=8):m.isVector3||m.isColor?(v.boundary=16,v.storage=12):m.isVector4?(v.boundary=16,v.storage=16):m.isMatrix3?(v.boundary=48,v.storage=48):m.isMatrix4?(v.boundary=64,v.storage=64):m.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Lt("WebGLRenderer: Unsupported uniform value type.",m),v}function g(m){const v=m.target;v.removeEventListener("dispose",g);const S=r.indexOf(v.__bindingPointIndex);r.splice(S,1),e.deleteBuffer(a[v.id]),delete a[v.id],delete s[v.id]}function f(){for(const m in a)e.deleteBuffer(a[m]);r=[],a={},s={}}return{bind:l,update:c,dispose:f}}const SC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fi=null;function MC(){return fi===null&&(fi=new db(SC,16,16,Tr,ea),fi.name="DFG_LUT",fi.minFilter=on,fi.magFilter=on,fi.wrapS=ki,fi.wrapT=ki,fi.generateMipmaps=!1,fi.needsUpdate=!0),fi}class yC{constructor(t={}){const{canvas:n=XE(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Zn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=r;const y=d,g=new Set([Up,Dp,wp]),f=new Set([Zn,yi,Fo,Bo,Rp,Cp]),m=new Uint32Array(4),v=new Int32Array(4);let S=null,R=null;const C=[],A=[];let M=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let F=!1;this._outputColorSpace=Hn;let w=0,B=0,V=null,q=-1,H=null;const U=new De,L=new De;let X=null;const j=new jt(0);let et=0,dt=n.width,ft=n.height,Dt=1,Kt=null,ee=null;const K=new De(0,0,dt,ft),at=new De(0,0,dt,ft);let ot=!1;const It=new kx;let At=!1,wt=!1;const Xe=new Le,Yt=new G,ie=new De,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function Re(){return V===null?Dt:1}let D=i;function Ne(E,P){return n.getContext(E,P)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Tp}`),n.addEventListener("webglcontextlost",vt,!1),n.addEventListener("webglcontextrestored",Ut,!1),n.addEventListener("webglcontextcreationerror",_e,!1),D===null){const P="webgl2";if(D=Ne(P,E),D===null)throw Ne(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw Jt("WebGLRenderer: "+E.message),E}let ne,ge,Mt,T,x,O,Z,J,Y,gt,st,Tt,Rt,$,nt,_t,xt,ht,Ht,N,rt,it,mt;function tt(){ne=new y1(D),ne.init(),rt=new hC(D,ne),ge=new p1(D,ne,t,rt),Mt=new uC(D,ne),ge.reversedDepthBuffer&&u&&Mt.buffers.depth.setReversed(!0),T=new T1(D),x=new KR,O=new fC(D,ne,Mt,x,ge,rt,T),Z=new M1(b),J=new Db(D),it=new h1(D,J),Y=new E1(D,J,T,it),gt=new R1(D,Y,J,it,T),ht=new A1(D,ge,O),nt=new m1(x),st=new jR(b,Z,ne,ge,it,nt),Tt=new vC(b,x),Rt=new JR,$=new aC(ne),xt=new f1(b,Z,Mt,gt,_,l),_t=new cC(b,gt,ge),mt=new xC(D,T,ge,Mt),Ht=new d1(D,ne,T),N=new b1(D,ne,T),T.programs=st.programs,b.capabilities=ge,b.extensions=ne,b.properties=x,b.renderLists=Rt,b.shadowMap=_t,b.state=Mt,b.info=T}tt(),y!==Zn&&(M=new w1(y,n.width,n.height,a,s));const W=new gC(b,D);this.xr=W,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=ne.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ne.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Dt},this.setPixelRatio=function(E){E!==void 0&&(Dt=E,this.setSize(dt,ft,!1))},this.getSize=function(E){return E.set(dt,ft)},this.setSize=function(E,P,k=!0){if(W.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}dt=E,ft=P,n.width=Math.floor(E*Dt),n.height=Math.floor(P*Dt),k===!0&&(n.style.width=E+"px",n.style.height=P+"px"),M!==null&&M.setSize(n.width,n.height),this.setViewport(0,0,E,P)},this.getDrawingBufferSize=function(E){return E.set(dt*Dt,ft*Dt).floor()},this.setDrawingBufferSize=function(E,P,k){dt=E,ft=P,Dt=k,n.width=Math.floor(E*k),n.height=Math.floor(P*k),this.setViewport(0,0,E,P)},this.setEffects=function(E){if(y===Zn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let P=0;P<E.length;P++)if(E[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(U)},this.getViewport=function(E){return E.copy(K)},this.setViewport=function(E,P,k,z){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,P,k,z),Mt.viewport(U.copy(K).multiplyScalar(Dt).round())},this.getScissor=function(E){return E.copy(at)},this.setScissor=function(E,P,k,z){E.isVector4?at.set(E.x,E.y,E.z,E.w):at.set(E,P,k,z),Mt.scissor(L.copy(at).multiplyScalar(Dt).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(E){Mt.setScissorTest(ot=E)},this.setOpaqueSort=function(E){Kt=E},this.setTransparentSort=function(E){ee=E},this.getClearColor=function(E){return E.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(E=!0,P=!0,k=!0){let z=0;if(E){let I=!1;if(V!==null){const ct=V.texture.format;I=g.has(ct)}if(I){const ct=V.texture.type,pt=f.has(ct),ut=xt.getClearColor(),St=xt.getClearAlpha(),Et=ut.r,Ot=ut.g,Gt=ut.b;pt?(m[0]=Et,m[1]=Ot,m[2]=Gt,m[3]=St,D.clearBufferuiv(D.COLOR,0,m)):(v[0]=Et,v[1]=Ot,v[2]=Gt,v[3]=St,D.clearBufferiv(D.COLOR,0,v))}else z|=D.COLOR_BUFFER_BIT}P&&(z|=D.DEPTH_BUFFER_BIT),k&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",vt,!1),n.removeEventListener("webglcontextrestored",Ut,!1),n.removeEventListener("webglcontextcreationerror",_e,!1),xt.dispose(),Rt.dispose(),$.dispose(),x.dispose(),Z.dispose(),gt.dispose(),it.dispose(),mt.dispose(),st.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ip),W.removeEventListener("sessionend",Fp),Xa.stop()};function vt(E){E.preventDefault(),Tg("WebGLRenderer: Context Lost."),F=!0}function Ut(){Tg("WebGLRenderer: Context Restored."),F=!1;const E=T.autoReset,P=_t.enabled,k=_t.autoUpdate,z=_t.needsUpdate,I=_t.type;tt(),T.autoReset=E,_t.enabled=P,_t.autoUpdate=k,_t.needsUpdate=z,_t.type=I}function _e(E){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ae(E){const P=E.target;P.removeEventListener("dispose",ae),Ti(P)}function Ti(E){Ai(E),x.remove(E)}function Ai(E){const P=x.get(E).programs;P!==void 0&&(P.forEach(function(k){st.releaseProgram(k)}),E.isShaderMaterial&&st.releaseShaderCache(E))}this.renderBufferDirect=function(E,P,k,z,I,ct){P===null&&(P=de);const pt=I.isMesh&&I.matrixWorld.determinant()<0,ut=nS(E,P,k,z,I);Mt.setMaterial(z,pt);let St=k.index,Et=1;if(z.wireframe===!0){if(St=Y.getWireframeAttribute(k),St===void 0)return;Et=2}const Ot=k.drawRange,Gt=k.attributes.position;let bt=Ot.start*Et,le=(Ot.start+Ot.count)*Et;ct!==null&&(bt=Math.max(bt,ct.start*Et),le=Math.min(le,(ct.start+ct.count)*Et)),St!==null?(bt=Math.max(bt,0),le=Math.min(le,St.count)):Gt!=null&&(bt=Math.max(bt,0),le=Math.min(le,Gt.count));const Ce=le-bt;if(Ce<0||Ce===1/0)return;it.setup(I,z,ut,k,St);let be,ce=Ht;if(St!==null&&(be=J.get(St),ce=N,ce.setIndex(be)),I.isMesh)z.wireframe===!0?(Mt.setLineWidth(z.wireframeLinewidth*Re()),ce.setMode(D.LINES)):ce.setMode(D.TRIANGLES);else if(I.isLine){let an=z.linewidth;an===void 0&&(an=1),Mt.setLineWidth(an*Re()),I.isLineSegments?ce.setMode(D.LINES):I.isLineLoop?ce.setMode(D.LINE_LOOP):ce.setMode(D.LINE_STRIP)}else I.isPoints?ce.setMode(D.POINTS):I.isSprite&&ce.setMode(D.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Xc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ce.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const an=I._multiDrawStarts,yt=I._multiDrawCounts,bn=I._multiDrawCount,Qt=St?J.get(St).bytesPerElement:1,Jn=x.get(z).currentProgram.getUniforms();for(let ci=0;ci<bn;ci++)Jn.setValue(D,"_gl_DrawID",ci),ce.render(an[ci]/Qt,yt[ci])}else if(I.isInstancedMesh)ce.renderInstances(bt,Ce,I.count);else if(k.isInstancedBufferGeometry){const an=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,yt=Math.min(k.instanceCount,an);ce.renderInstances(bt,Ce,yt)}else ce.render(bt,Ce)};function Pp(E,P,k){E.transparent===!0&&E.side===zi&&E.forceSinglePass===!1?(E.side=Sn,E.needsUpdate=!0,il(E,P,k),E.side=Ga,E.needsUpdate=!0,il(E,P,k),E.side=zi):il(E,P,k)}this.compile=function(E,P,k=null){k===null&&(k=E),R=$.get(k),R.init(P),A.push(R),k.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(R.pushLight(I),I.castShadow&&R.pushShadow(I))}),E!==k&&E.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(R.pushLight(I),I.castShadow&&R.pushShadow(I))}),R.setupLights();const z=new Set;return E.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const ct=I.material;if(ct)if(Array.isArray(ct))for(let pt=0;pt<ct.length;pt++){const ut=ct[pt];Pp(ut,k,I),z.add(ut)}else Pp(ct,k,I),z.add(ct)}),R=A.pop(),z},this.compileAsync=function(E,P,k=null){const z=this.compile(E,P,k);return new Promise(I=>{function ct(){if(z.forEach(function(pt){x.get(pt).currentProgram.isReady()&&z.delete(pt)}),z.size===0){I(E);return}setTimeout(ct,10)}ne.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let mu=null;function eS(E){mu&&mu(E)}function Ip(){Xa.stop()}function Fp(){Xa.start()}const Xa=new jx;Xa.setAnimationLoop(eS),typeof self<"u"&&Xa.setContext(self),this.setAnimationLoop=function(E){mu=E,W.setAnimationLoop(E),E===null?Xa.stop():Xa.start()},W.addEventListener("sessionstart",Ip),W.addEventListener("sessionend",Fp),this.render=function(E,P){if(P!==void 0&&P.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;const k=W.enabled===!0&&W.isPresenting===!0,z=M!==null&&(V===null||k)&&M.begin(b,V);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(P),P=W.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,P,V),R=$.get(E,A.length),R.init(P),A.push(R),Xe.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),It.setFromProjectionMatrix(Xe,vi,P.reversedDepth),wt=this.localClippingEnabled,At=nt.init(this.clippingPlanes,wt),S=Rt.get(E,C.length),S.init(),C.push(S),W.enabled===!0&&W.isPresenting===!0){const pt=b.xr.getDepthSensingMesh();pt!==null&&gu(pt,P,-1/0,b.sortObjects)}gu(E,P,0,b.sortObjects),S.finish(),b.sortObjects===!0&&S.sort(Kt,ee),zt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,zt&&xt.addToRenderList(S,E),this.info.render.frame++,At===!0&&nt.beginShadows();const I=R.state.shadowsArray;if(_t.render(I,E,P),At===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&M.hasRenderPass())===!1){const pt=S.opaque,ut=S.transmissive;if(R.setupLights(),P.isArrayCamera){const St=P.cameras;if(ut.length>0)for(let Et=0,Ot=St.length;Et<Ot;Et++){const Gt=St[Et];zp(pt,ut,E,Gt)}zt&&xt.render(E);for(let Et=0,Ot=St.length;Et<Ot;Et++){const Gt=St[Et];Bp(S,E,Gt,Gt.viewport)}}else ut.length>0&&zp(pt,ut,E,P),zt&&xt.render(E),Bp(S,E,P)}V!==null&&B===0&&(O.updateMultisampleRenderTarget(V),O.updateRenderTargetMipmap(V)),z&&M.end(b),E.isScene===!0&&E.onAfterRender(b,E,P),it.resetDefaultState(),q=-1,H=null,A.pop(),A.length>0?(R=A[A.length-1],At===!0&&nt.setGlobalState(b.clippingPlanes,R.state.camera)):R=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function gu(E,P,k,z){if(E.visible===!1)return;if(E.layers.test(P.layers)){if(E.isGroup)k=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(P);else if(E.isLight)R.pushLight(E),E.castShadow&&R.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||It.intersectsSprite(E)){z&&ie.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Xe);const pt=gt.update(E),ut=E.material;ut.visible&&S.push(E,pt,ut,k,ie.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||It.intersectsObject(E))){const pt=gt.update(E),ut=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ie.copy(E.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),ie.copy(pt.boundingSphere.center)),ie.applyMatrix4(E.matrixWorld).applyMatrix4(Xe)),Array.isArray(ut)){const St=pt.groups;for(let Et=0,Ot=St.length;Et<Ot;Et++){const Gt=St[Et],bt=ut[Gt.materialIndex];bt&&bt.visible&&S.push(E,pt,bt,k,ie.z,Gt)}}else ut.visible&&S.push(E,pt,ut,k,ie.z,null)}}const ct=E.children;for(let pt=0,ut=ct.length;pt<ut;pt++)gu(ct[pt],P,k,z)}function Bp(E,P,k,z){const{opaque:I,transmissive:ct,transparent:pt}=E;R.setupLightsView(k),At===!0&&nt.setGlobalState(b.clippingPlanes,k),z&&Mt.viewport(U.copy(z)),I.length>0&&nl(I,P,k),ct.length>0&&nl(ct,P,k),pt.length>0&&nl(pt,P,k),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function zp(E,P,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[z.id]===void 0){const bt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[z.id]=new Mi(1,1,{generateMipmaps:!0,type:bt?ea:Zn,minFilter:rs,samples:Math.max(4,ge.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}const ct=R.state.transmissionRenderTarget[z.id],pt=z.viewport||U;ct.setSize(pt.z*b.transmissionResolutionScale,pt.w*b.transmissionResolutionScale);const ut=b.getRenderTarget(),St=b.getActiveCubeFace(),Et=b.getActiveMipmapLevel();b.setRenderTarget(ct),b.getClearColor(j),et=b.getClearAlpha(),et<1&&b.setClearColor(16777215,.5),b.clear(),zt&&xt.render(k);const Ot=b.toneMapping;b.toneMapping=Si;const Gt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),R.setupLightsView(z),At===!0&&nt.setGlobalState(b.clippingPlanes,z),nl(E,k,z),O.updateMultisampleRenderTarget(ct),O.updateRenderTargetMipmap(ct),ne.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let le=0,Ce=P.length;le<Ce;le++){const be=P[le],{object:ce,geometry:an,material:yt,group:bn}=be;if(yt.side===zi&&ce.layers.test(z.layers)){const Qt=yt.side;yt.side=Sn,yt.needsUpdate=!0,Hp(ce,k,z,an,yt,bn),yt.side=Qt,yt.needsUpdate=!0,bt=!0}}bt===!0&&(O.updateMultisampleRenderTarget(ct),O.updateRenderTargetMipmap(ct))}b.setRenderTarget(ut,St,Et),b.setClearColor(j,et),Gt!==void 0&&(z.viewport=Gt),b.toneMapping=Ot}function nl(E,P,k){const z=P.isScene===!0?P.overrideMaterial:null;for(let I=0,ct=E.length;I<ct;I++){const pt=E[I],{object:ut,geometry:St,group:Et}=pt;let Ot=pt.material;Ot.allowOverride===!0&&z!==null&&(Ot=z),ut.layers.test(k.layers)&&Hp(ut,P,k,St,Ot,Et)}}function Hp(E,P,k,z,I,ct){E.onBeforeRender(b,P,k,z,I,ct),E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),I.onBeforeRender(b,P,k,z,E,ct),I.transparent===!0&&I.side===zi&&I.forceSinglePass===!1?(I.side=Sn,I.needsUpdate=!0,b.renderBufferDirect(k,P,z,I,E,ct),I.side=Ga,I.needsUpdate=!0,b.renderBufferDirect(k,P,z,I,E,ct),I.side=zi):b.renderBufferDirect(k,P,z,I,E,ct),E.onAfterRender(b,P,k,z,I,ct)}function il(E,P,k){P.isScene!==!0&&(P=de);const z=x.get(E),I=R.state.lights,ct=R.state.shadowsArray,pt=I.state.version,ut=st.getParameters(E,I.state,ct,P,k),St=st.getProgramCacheKey(ut);let Et=z.programs;z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?P.environment:null,z.fog=P.fog;const Ot=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;z.envMap=Z.get(E.envMap||z.environment,Ot),z.envMapRotation=z.environment!==null&&E.envMap===null?P.environmentRotation:E.envMapRotation,Et===void 0&&(E.addEventListener("dispose",ae),Et=new Map,z.programs=Et);let Gt=Et.get(St);if(Gt!==void 0){if(z.currentProgram===Gt&&z.lightsStateVersion===pt)return Vp(E,ut),Gt}else ut.uniforms=st.getUniforms(E),E.onBeforeCompile(ut,b),Gt=st.acquireProgram(ut,St),Et.set(St,Gt),z.uniforms=ut.uniforms;const bt=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(bt.clippingPlanes=nt.uniform),Vp(E,ut),z.needsLights=aS(E),z.lightsStateVersion=pt,z.needsLights&&(bt.ambientLightColor.value=I.state.ambient,bt.lightProbe.value=I.state.probe,bt.directionalLights.value=I.state.directional,bt.directionalLightShadows.value=I.state.directionalShadow,bt.spotLights.value=I.state.spot,bt.spotLightShadows.value=I.state.spotShadow,bt.rectAreaLights.value=I.state.rectArea,bt.ltc_1.value=I.state.rectAreaLTC1,bt.ltc_2.value=I.state.rectAreaLTC2,bt.pointLights.value=I.state.point,bt.pointLightShadows.value=I.state.pointShadow,bt.hemisphereLights.value=I.state.hemi,bt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,bt.spotLightMatrix.value=I.state.spotLightMatrix,bt.spotLightMap.value=I.state.spotLightMap,bt.pointShadowMatrix.value=I.state.pointShadowMatrix),z.currentProgram=Gt,z.uniformsList=null,Gt}function Gp(E){if(E.uniformsList===null){const P=E.currentProgram.getUniforms();E.uniformsList=fc.seqWithValue(P.seq,E.uniforms)}return E.uniformsList}function Vp(E,P){const k=x.get(E);k.outputColorSpace=P.outputColorSpace,k.batching=P.batching,k.batchingColor=P.batchingColor,k.instancing=P.instancing,k.instancingColor=P.instancingColor,k.instancingMorph=P.instancingMorph,k.skinning=P.skinning,k.morphTargets=P.morphTargets,k.morphNormals=P.morphNormals,k.morphColors=P.morphColors,k.morphTargetsCount=P.morphTargetsCount,k.numClippingPlanes=P.numClippingPlanes,k.numIntersection=P.numClipIntersection,k.vertexAlphas=P.vertexAlphas,k.vertexTangents=P.vertexTangents,k.toneMapping=P.toneMapping}function nS(E,P,k,z,I){P.isScene!==!0&&(P=de),O.resetTextureUnits();const ct=P.fog,pt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?P.environment:null,ut=V===null?b.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Ar,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Et=Z.get(z.envMap||pt,St),Ot=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Gt=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),bt=!!k.morphAttributes.position,le=!!k.morphAttributes.normal,Ce=!!k.morphAttributes.color;let be=Si;z.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(be=b.toneMapping);const ce=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,an=ce!==void 0?ce.length:0,yt=x.get(z),bn=R.state.lights;if(At===!0&&(wt===!0||E!==H)){const We=E===H&&z.id===q;nt.setState(z,E,We)}let Qt=!1;z.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==bn.state.version||yt.outputColorSpace!==ut||I.isBatchedMesh&&yt.batching===!1||!I.isBatchedMesh&&yt.batching===!0||I.isBatchedMesh&&yt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&yt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&yt.instancing===!1||!I.isInstancedMesh&&yt.instancing===!0||I.isSkinnedMesh&&yt.skinning===!1||!I.isSkinnedMesh&&yt.skinning===!0||I.isInstancedMesh&&yt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&yt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&yt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&yt.instancingMorph===!1&&I.morphTexture!==null||yt.envMap!==Et||z.fog===!0&&yt.fog!==ct||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==nt.numPlanes||yt.numIntersection!==nt.numIntersection)||yt.vertexAlphas!==Ot||yt.vertexTangents!==Gt||yt.morphTargets!==bt||yt.morphNormals!==le||yt.morphColors!==Ce||yt.toneMapping!==be||yt.morphTargetsCount!==an)&&(Qt=!0):(Qt=!0,yt.__version=z.version);let Jn=yt.currentProgram;Qt===!0&&(Jn=il(z,P,I));let ci=!1,Wa=!1,bs=!1;const pe=Jn.getUniforms(),Ke=yt.uniforms;if(Mt.useProgram(Jn.program)&&(ci=!0,Wa=!0,bs=!0),z.id!==q&&(q=z.id,Wa=!0),ci||H!==E){Mt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),pe.setValue(D,"projectionMatrix",E.projectionMatrix),pe.setValue(D,"viewMatrix",E.matrixWorldInverse);const oa=pe.map.cameraPosition;oa!==void 0&&oa.setValue(D,Yt.setFromMatrixPosition(E.matrixWorld)),ge.logarithmicDepthBuffer&&pe.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&pe.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),H!==E&&(H=E,Wa=!0,bs=!0)}if(yt.needsLights&&(bn.state.directionalShadowMap.length>0&&pe.setValue(D,"directionalShadowMap",bn.state.directionalShadowMap,O),bn.state.spotShadowMap.length>0&&pe.setValue(D,"spotShadowMap",bn.state.spotShadowMap,O),bn.state.pointShadowMap.length>0&&pe.setValue(D,"pointShadowMap",bn.state.pointShadowMap,O)),I.isSkinnedMesh){pe.setOptional(D,I,"bindMatrix"),pe.setOptional(D,I,"bindMatrixInverse");const We=I.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),pe.setValue(D,"boneTexture",We.boneTexture,O))}I.isBatchedMesh&&(pe.setOptional(D,I,"batchingTexture"),pe.setValue(D,"batchingTexture",I._matricesTexture,O),pe.setOptional(D,I,"batchingIdTexture"),pe.setValue(D,"batchingIdTexture",I._indirectTexture,O),pe.setOptional(D,I,"batchingColorTexture"),I._colorsTexture!==null&&pe.setValue(D,"batchingColorTexture",I._colorsTexture,O));const ra=k.morphAttributes;if((ra.position!==void 0||ra.normal!==void 0||ra.color!==void 0)&&ht.update(I,k,Jn),(Wa||yt.receiveShadow!==I.receiveShadow)&&(yt.receiveShadow=I.receiveShadow,pe.setValue(D,"receiveShadow",I.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&P.environment!==null&&(Ke.envMapIntensity.value=P.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=MC()),Wa&&(pe.setValue(D,"toneMappingExposure",b.toneMappingExposure),yt.needsLights&&iS(Ke,bs),ct&&z.fog===!0&&Tt.refreshFogUniforms(Ke,ct),Tt.refreshMaterialUniforms(Ke,z,Dt,ft,R.state.transmissionRenderTarget[E.id]),fc.upload(D,Gp(yt),Ke,O)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(fc.upload(D,Gp(yt),Ke,O),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&pe.setValue(D,"center",I.center),pe.setValue(D,"modelViewMatrix",I.modelViewMatrix),pe.setValue(D,"normalMatrix",I.normalMatrix),pe.setValue(D,"modelMatrix",I.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const We=z.uniformsGroups;for(let oa=0,Ts=We.length;oa<Ts;oa++){const kp=We[oa];mt.update(kp,Jn),mt.bind(kp,Jn)}}return Jn}function iS(E,P){E.ambientLightColor.needsUpdate=P,E.lightProbe.needsUpdate=P,E.directionalLights.needsUpdate=P,E.directionalLightShadows.needsUpdate=P,E.pointLights.needsUpdate=P,E.pointLightShadows.needsUpdate=P,E.spotLights.needsUpdate=P,E.spotLightShadows.needsUpdate=P,E.rectAreaLights.needsUpdate=P,E.hemisphereLights.needsUpdate=P}function aS(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(E,P,k){const z=x.get(E);z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),x.get(E.texture).__webglTexture=P,x.get(E.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,P){const k=x.get(E);k.__webglFramebuffer=P,k.__useDefaultFramebuffer=P===void 0};const sS=D.createFramebuffer();this.setRenderTarget=function(E,P=0,k=0){V=E,w=P,B=k;let z=null,I=!1,ct=!1;if(E){const ut=x.get(E);if(ut.__useDefaultFramebuffer!==void 0){Mt.bindFramebuffer(D.FRAMEBUFFER,ut.__webglFramebuffer),U.copy(E.viewport),L.copy(E.scissor),X=E.scissorTest,Mt.viewport(U),Mt.scissor(L),Mt.setScissorTest(X),q=-1;return}else if(ut.__webglFramebuffer===void 0)O.setupRenderTarget(E);else if(ut.__hasExternalTextures)O.rebindTextures(E,x.get(E.texture).__webglTexture,x.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ot=E.depthTexture;if(ut.__boundDepthTexture!==Ot){if(Ot!==null&&x.has(Ot)&&(E.width!==Ot.image.width||E.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(E)}}const St=E.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(ct=!0);const Et=x.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Et[P])?z=Et[P][k]:z=Et[P],I=!0):E.samples>0&&O.useMultisampledRTT(E)===!1?z=x.get(E).__webglMultisampledFramebuffer:Array.isArray(Et)?z=Et[k]:z=Et,U.copy(E.viewport),L.copy(E.scissor),X=E.scissorTest}else U.copy(K).multiplyScalar(Dt).floor(),L.copy(at).multiplyScalar(Dt).floor(),X=ot;if(k!==0&&(z=sS),Mt.bindFramebuffer(D.FRAMEBUFFER,z)&&Mt.drawBuffers(E,z),Mt.viewport(U),Mt.scissor(L),Mt.setScissorTest(X),I){const ut=x.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,ut.__webglTexture,k)}else if(ct){const ut=P;for(let St=0;St<E.textures.length;St++){const Et=x.get(E.textures[St]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+St,Et.__webglTexture,k,ut)}}else if(E!==null&&k!==0){const ut=x.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ut.__webglTexture,k)}q=-1},this.readRenderTargetPixels=function(E,P,k,z,I,ct,pt,ut=0){if(!(E&&E.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=x.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pt!==void 0&&(St=St[pt]),St){Mt.bindFramebuffer(D.FRAMEBUFFER,St);try{const Et=E.textures[ut],Ot=Et.format,Gt=Et.type;if(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ut),!ge.textureFormatReadable(Ot)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable(Gt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=E.width-z&&k>=0&&k<=E.height-I&&D.readPixels(P,k,z,I,rt.convert(Ot),rt.convert(Gt),ct)}finally{const Et=V!==null?x.get(V).__webglFramebuffer:null;Mt.bindFramebuffer(D.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(E,P,k,z,I,ct,pt,ut=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=x.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pt!==void 0&&(St=St[pt]),St)if(P>=0&&P<=E.width-z&&k>=0&&k<=E.height-I){Mt.bindFramebuffer(D.FRAMEBUFFER,St);const Et=E.textures[ut],Ot=Et.format,Gt=Et.type;if(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ut),!ge.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const bt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,bt),D.bufferData(D.PIXEL_PACK_BUFFER,ct.byteLength,D.STREAM_READ),D.readPixels(P,k,z,I,rt.convert(Ot),rt.convert(Gt),0);const le=V!==null?x.get(V).__webglFramebuffer:null;Mt.bindFramebuffer(D.FRAMEBUFFER,le);const Ce=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await WE(D,Ce,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,bt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ct),D.deleteBuffer(bt),D.deleteSync(Ce),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,P=null,k=0){const z=Math.pow(2,-k),I=Math.floor(E.image.width*z),ct=Math.floor(E.image.height*z),pt=P!==null?P.x:0,ut=P!==null?P.y:0;O.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,pt,ut,I,ct),Mt.unbindTexture()};const rS=D.createFramebuffer(),oS=D.createFramebuffer();this.copyTextureToTexture=function(E,P,k=null,z=null,I=0,ct=0){let pt,ut,St,Et,Ot,Gt,bt,le,Ce;const be=E.isCompressedTexture?E.mipmaps[ct]:E.image;if(k!==null)pt=k.max.x-k.min.x,ut=k.max.y-k.min.y,St=k.isBox3?k.max.z-k.min.z:1,Et=k.min.x,Ot=k.min.y,Gt=k.isBox3?k.min.z:0;else{const Ke=Math.pow(2,-I);pt=Math.floor(be.width*Ke),ut=Math.floor(be.height*Ke),E.isDataArrayTexture?St=be.depth:E.isData3DTexture?St=Math.floor(be.depth*Ke):St=1,Et=0,Ot=0,Gt=0}z!==null?(bt=z.x,le=z.y,Ce=z.z):(bt=0,le=0,Ce=0);const ce=rt.convert(P.format),an=rt.convert(P.type);let yt;P.isData3DTexture?(O.setTexture3D(P,0),yt=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(O.setTexture2DArray(P,0),yt=D.TEXTURE_2D_ARRAY):(O.setTexture2D(P,0),yt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const bn=D.getParameter(D.UNPACK_ROW_LENGTH),Qt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Jn=D.getParameter(D.UNPACK_SKIP_PIXELS),ci=D.getParameter(D.UNPACK_SKIP_ROWS),Wa=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,be.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,be.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Et),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ot),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Gt);const bs=E.isDataArrayTexture||E.isData3DTexture,pe=P.isDataArrayTexture||P.isData3DTexture;if(E.isDepthTexture){const Ke=x.get(E),ra=x.get(P),We=x.get(Ke.__renderTarget),oa=x.get(ra.__renderTarget);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,We.__webglFramebuffer),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,oa.__webglFramebuffer);for(let Ts=0;Ts<St;Ts++)bs&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,x.get(E).__webglTexture,I,Gt+Ts),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,x.get(P).__webglTexture,ct,Ce+Ts)),D.blitFramebuffer(Et,Ot,pt,ut,bt,le,pt,ut,D.DEPTH_BUFFER_BIT,D.NEAREST);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(I!==0||E.isRenderTargetTexture||x.has(E)){const Ke=x.get(E),ra=x.get(P);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,rS),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,oS);for(let We=0;We<St;We++)bs?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ke.__webglTexture,I,Gt+We):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ke.__webglTexture,I),pe?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ra.__webglTexture,ct,Ce+We):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ra.__webglTexture,ct),I!==0?D.blitFramebuffer(Et,Ot,pt,ut,bt,le,pt,ut,D.COLOR_BUFFER_BIT,D.NEAREST):pe?D.copyTexSubImage3D(yt,ct,bt,le,Ce+We,Et,Ot,pt,ut):D.copyTexSubImage2D(yt,ct,bt,le,Et,Ot,pt,ut);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else pe?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(yt,ct,bt,le,Ce,pt,ut,St,ce,an,be.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(yt,ct,bt,le,Ce,pt,ut,St,ce,be.data):D.texSubImage3D(yt,ct,bt,le,Ce,pt,ut,St,ce,an,be):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ct,bt,le,pt,ut,ce,an,be.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ct,bt,le,be.width,be.height,ce,be.data):D.texSubImage2D(D.TEXTURE_2D,ct,bt,le,pt,ut,ce,an,be);D.pixelStorei(D.UNPACK_ROW_LENGTH,bn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Jn),D.pixelStorei(D.UNPACK_SKIP_ROWS,ci),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Wa),ct===0&&P.generateMipmaps&&D.generateMipmap(yt),Mt.unbindTexture()},this.initRenderTarget=function(E){x.get(E).__webglFramebuffer===void 0&&O.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?O.setTextureCube(E,0):E.isData3DTexture?O.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?O.setTexture2DArray(E,0):O.setTexture2D(E,0),Mt.unbindTexture()},this.resetState=function(){w=0,B=0,V=null,Mt.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Zt._getUnpackColorSpace()}}const EC={idle:new jt("#00d9ff"),listening:new jt("#2affb9"),thinking:new jt("#69a8ff"),speaking:new jt("#e8fdff")},hi={mainCount:1400,haloCount:500,radius:1.65,depth:1.2,basePointSize:7,haloPointSize:4.5,smoothing:.12,cameraZ:5.6},bC=`
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;

uniform float uTime;
uniform float uPixelRatio;

varying float vAlpha;
varying vec3 vColor;

void main() {
  vAlpha = aAlpha;
  vColor = aColor;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  float depthScale = 1.0 / max(0.35, -mvPosition.z * 0.22);
  gl_PointSize = aSize * uPixelRatio * depthScale;

  gl_Position = projectionMatrix * mvPosition;
}
`,TC=`
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);

  float soft = 1.0 - smoothstep(0.18, 0.5, dist);
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);

  vec3 color = vColor * (0.7 + glow * 0.6);
  float alpha = soft * vAlpha;

  gl_FragColor = vec4(color, alpha);
}
`;function p0({count:e,radius:t,depth:n,pointSize:i,opacity:a}){const s=new Float32Array(e*3),r=new Float32Array(e*3),o=new Float32Array(e*3),l=new Float32Array(e),c=new Float32Array(e),h=new Float32Array(e),p=new Float32Array(e),u=new Float32Array(e),d=new Float32Array(e);for(let f=0;f<e;f++){const m=f*3,v=Math.random()*Math.PI*2,S=Math.pow(Math.random(),.75)*t,R=(Math.random()-.5)*n,C=(Math.random()-.5)*.8;s[m]=Math.cos(v)*S,s[m+1]=Math.sin(v)*S+C*.15,s[m+2]=R,r[m]=s[m],r[m+1]=s[m+1],r[m+2]=s[m+2],l[f]=i+Math.random()*i*.8,c[f]=a*(.35+Math.random()*.65),h[f]=S,p[f]=v,u[f]=Math.random()*Math.PI*2,d[f]=.6+Math.random()*1.8}const _=new li;_.setAttribute("position",new vn(r,3)),_.setAttribute("aColor",new vn(o,3)),_.setAttribute("aSize",new vn(l,1)),_.setAttribute("aAlpha",new vn(c,1));const y=new ri({vertexShader:bC,fragmentShader:TC,uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)}},transparent:!0,depthWrite:!1,blending:Dh});return{points:new vb(_,y),geometry:_,material:y,base:s,pos:r,color:o,size:l,alpha:c,metaR:h,metaA:p,metaP:u,metaL:d}}function m0(e,t,n,i,a=1){const s=EC[i],r=i==="speaking",o=i==="listening",l=i==="thinking",c=r?1.4:o?7.2:l?2.1:.8,h=r?.95:o?.52:l?.18:.05,p=r?2.6:o?1.55:l?.75:.35;for(let u=0;u<e.metaR.length;u++){const d=u*3,_=e.metaR[u],y=e.metaA[u],g=e.metaP[u],f=e.metaL[u],m=Math.sin(t*(c+f*.42)-_*(r?1.8:o?5.8:3.2)+g)*(h+n*.75*p),v=Math.sin(t*(r?.18:1.9)+g*2)*.22+Math.cos(t*.34+_*2.2)*.1,S=y+t*.05*(.35+f*.45)+v,A=_*((r?1.3:o?1.02:1)+m*(r?.72:o?.34:.12)),M=r?.95+n*.72:o?.86+n*.28:.92,b=r?1.08-n*.16:o?1.02:1,F=Math.sin(t*(o?8.5:2)+_*5+g)*(.05+n*(r?.32:.22));e.pos[d]=Math.cos(S)*A*a*b,e.pos[d+1]=Math.sin(S)*A*M+F,e.pos[d+2]=e.base[d+2]+Math.cos(t*(1.4+f)+_*3+g)*(.22+n*(r?1:.65));const B=.82+(r?1+n*1.8:n*.65)+Math.max(0,m)*.65;e.color[d]=s.r*B,e.color[d+1]=s.g*B,e.color[d+2]=s.b*B,e.alpha[u]=Math.min(1,.3+n*(r?.95:.65)+Math.abs(m)*.72);const V=(r?9.5:o?8.5:5.4)+f*3.8+n*(r?28:18)+Math.abs(m)*13;e.size[u]=e.size[u]*.9+V*.1}e.geometry.attributes.position.needsUpdate=!0,e.geometry.attributes.aColor.needsUpdate=!0,e.geometry.attributes.aAlpha.needsUpdate=!0,e.geometry.attributes.aSize.needsUpdate=!0,e.material.uniforms.uTime.value=t}const AC=({mode:e,size:t=540})=>{const n=Rn.useRef(null),i=Rn.useRef(0),a=Rn.useRef(null),s=Rn.useRef(null),r=Rn.useRef(null),o=Rn.useRef(null),l=Rn.useRef(null),c=Rn.useRef(0),h=Rn.useRef(0);return Rn.useEffect(()=>ze.subscribe(u=>{c.current=u.audioLevel||0}),[]),Rn.useEffect(()=>{if(!n.current)return;const p=t,u=t,d=new ob,_=new Xn(45,p/u,.1,100);_.position.z=hi.cameraZ;const y=new yC({alpha:!0,antialias:!0});y.setPixelRatio(Math.min(window.devicePixelRatio,2)),y.setSize(p,u),y.domElement.style.width="100%",y.domElement.style.height="100%",n.current.innerHTML="",n.current.appendChild(y.domElement);const g=p0({count:hi.mainCount,radius:hi.radius,depth:hi.depth,pointSize:hi.basePointSize,opacity:.55}),f=p0({count:hi.haloCount,radius:hi.radius*1.35,depth:hi.depth*1.6,pointSize:hi.haloPointSize,opacity:.22});d.add(f.points),d.add(g.points);const m=v=>{const S=v*.001,R=hi.smoothing;h.current+=(c.current-h.current)*R;let C=h.current;if(e==="speaking"){const A=Math.sin(S*6)*.12,M=Math.sin(S*15)*.08,b=Math.sin(S*26)*.04,F=.2+A+M+b+Math.random()*.05;C=Math.max(C,F)}m0(f,S*.65,C*.82,e,1.12+Math.sin(S*2)*.05),m0(g,S,C,e,1),g.points.rotation.y=S*.18,g.points.rotation.x=Math.sin(S*.35)*.12,f.points.rotation.y=-S*.08,f.points.rotation.x=Math.cos(S*.22)*.08,y.render(d,_),i.current=requestAnimationFrame(m)};return i.current=requestAnimationFrame(m),a.current=y,s.current=d,r.current=_,o.current=g,l.current=f,()=>{cancelAnimationFrame(i.current),d.remove(g.points),d.remove(f.points),g.geometry.dispose(),g.material.dispose(),f.geometry.dispose(),f.material.dispose(),y.dispose()}},[e,t]),to.jsxs("div",{className:`jarvis-core jarvis-core--${e}`,children:[to.jsx("div",{className:"jarvis-core__glow"}),to.jsx("div",{ref:n,className:"jarvis-core__canvas"}),to.jsxs("div",{className:"jarvis-core__label",children:[e==="idle"&&"VEILLE",e==="listening"&&"ÉCOUTE",e==="thinking"&&"ANALYSE",e==="speaking"&&"RÉPONSE"]})]})};class RC{constructor(t){zr(this,"container");zr(this,"root");zr(this,"currentOrbStatus");zr(this,"currentAudioLevel");this.container=document.getElementById(t),this.root=cE.createRoot(this.container),this.currentOrbStatus=ze.state.orbStatus,this.currentAudioLevel=0,this.init()}init(){this.render(),ze.subscribe(t=>{t.orbStatus!==this.currentOrbStatus&&(this.currentOrbStatus=t.orbStatus,this.render())})}render(){this.root.render(to.jsx(AC,{mode:this.currentOrbStatus,audioLevel:this.currentAudioLevel,size:540}))}}class CC{constructor(){this.audioContext=null,this.analyser=null,this.dataArray=null,this.stream=null,this.isActive=!1}async start(){if(!this.isActive)try{this.stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this.audioContext=new(window.AudioContext||window.webkitAudioContext);const t=this.audioContext.createMediaStreamSource(this.stream);this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=256,t.connect(this.analyser),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount),this.isActive=!0,this._tick(),console.log("[AUDIO] Analyseur démarré.")}catch(t){console.error("[AUDIO] Impossible d'accéder au micro pour l'analyse visuelle:",t)}}_tick(){if(!this.isActive)return;this.analyser.getByteTimeDomainData(this.dataArray);let t=0;for(let a=0;a<this.dataArray.length;a++){const s=(this.dataArray[a]-128)/128;t+=s*s}const n=Math.sqrt(t/this.dataArray.length);ze.setState({audioLevel:n});const i=ze.state.orbStatus;n>.05?(i==="idle"&&ze.setState({orbStatus:"listening"}),this.silenceCounter=0):i==="listening"&&(this.silenceCounter=(this.silenceCounter||0)+1,this.silenceCounter>60&&(ze.setState({orbStatus:"idle"}),this.silenceCounter=0)),requestAnimationFrame(()=>this._tick())}stop(){this.isActive=!1,this.stream&&this.stream.getTracks().forEach(t=>t.stop()),this.audioContext&&this.audioContext.close()}}const wC=new CC;class DC{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
      <div class="terminal glass">
        <div class="terminal-header">
          <span class="terminal-title">FLUX DE DONNÉES</span>
          <div class="terminal-controls">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
        </div>
        <div class="terminal-content">
          <div class="log-line system">Initialisation du noyau visuel...</div>
        </div>
      </div>
    `}init(){}addLog(t,n="system"){const i=document.createElement("div");i.className=`log-line ${n}`;const a=new Date().toLocaleTimeString();i.innerHTML=`<span class="log-time">[${a}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(i),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class UC{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,ze.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(g0.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,n){const i=this.box.lastElementChild;if(i&&i.textContent===t&&i.classList.contains(n))return;const a=document.createElement("div");a.className=`msg ${n}`,a.textContent=t,this.box.appendChild(a),this.box.scrollTop=this.box.scrollHeight,a.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class LC{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
      <dialog class="settings-modal glass-modal">
        <div class="modal-content glass">
          <div class="modal-header">
            <div class="header-main">
              <span class="status-dot online"></span>
              <h2>CORE CONFIGURATION // 0.2</h2>
            </div>
            <div class="tab-controls">
              <button class="tab-btn active" data-tab="general">NEURAL & KEYS</button>
              <button class="tab-btn" data-tab="interfaces">INTERFACES</button>
              <button class="tab-btn" data-tab="advanced">SYSTEM & IO</button>
              <button class="tab-btn" data-tab="memory">MEMORY</button>
            </div>
          </div>
          
          <form id="settings-form" class="modal-body hide-scroll">
            <!-- TAB: NEURAL & KEYS -->
            <div class="tab-pane active" id="pane-general">
              <div class="form-section">
                <div class="section-label">AI SERVICES // SECURITY</div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>GEMINI API KEY</label>
                    <input type="password" name="gemini_api_key" placeholder="AIzaSy..." />
                  </div>
                  <div class="input-field">
                    <label>TAVILY API KEY</label>
                    <input type="password" name="tavily_api_key" placeholder="tvly-..." />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">VOICE SYNTHESIS // LOCAL ENGINE</div>
                <div class="input-field">
                  <label>KOKORO VOICE PROFILE</label>
                  <select name="kokoro_voice" id="tts-voice">
                     <option value="">SCANNING VOICES...</option>
                  </select>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">ENVIRONMENTAL DATA</div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>OPENWEATHER API</label>
                    <input type="password" name="openweather_api_key" />
                  </div>
                  <div class="input-field">
                    <label>CITY / LOCATION</label>
                    <input type="text" name="default_city" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- TAB: INTERFACES -->
            <div class="tab-pane" id="pane-interfaces">
              <div class="form-section">
                <div class="section-label">VISION & BIOMETRICS</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="vision_enabled">
                    <span>ENABLE COMPUTER VISION (OPENCV)</span>
                  </label>
                  <div class="input-field small">
                    <label>CAM_ID</label>
                    <input type="number" name="camera_index" min="0" step="1" />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">MESSAGING & COMMS</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="gmail_enabled">
                    <span>GMAIL SYNC (OAUTH2)</span>
                  </label>
                </div>
                <div class="input-field">
                  <label>WA DEFAULT RECIPIENT</label>
                  <input type="text" name="wa_default_phone" placeholder="+33..." />
                </div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="wa_notify_on_alerts">
                    <span>PROACTIVE WHATSAPP ALERTS</span>
                  </label>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">HOME AUTOMATION // HA LIAISON</div>
                <div class="input-field">
                  <label>HA CORE URL</label>
                  <input type="text" name="ha_url" placeholder="http://192.168.x.x:8123" />
                </div>
                <div class="input-field">
                  <label>LONG-LIVED TOKEN</label>
                  <input type="password" name="ha_token" />
                </div>
              </div>
            </div>

            <!-- TAB: ADVANCED (3D PRINTING & MAPS) -->
            <div class="tab-pane" id="pane-advanced">
              <div class="form-section">
                <div class="section-label">3D ADDITIVE MANUFACTURING</div>
                <div class="input-field">
                  <label>MOONRAKER HOST (KLIPPER)</label>
                  <input type="text" name="moonraker_url" />
                </div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>BAMBU IP</label>
                    <input type="text" name="bambu_ip" />
                  </div>
                  <div class="input-field">
                    <label>BAMBU SERIAL</label>
                    <input type="text" name="bambu_serial" />
                  </div>
                  <div class="input-field">
                    <label>ACCESS CODE</label>
                    <input type="password" name="bambu_access_code" />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">GEOINT SERVICES</div>
                <div class="input-field">
                  <label>GOOGLE MAPS MATRIX API</label>
                  <input type="password" name="google_maps_api_key" />
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">NOTIFICATIONS</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="toast_enabled">
                    <span>ENABLE SYSTEM TOASTS (WIN)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- TAB: MEMORY -->
            <div class="tab-pane" id="pane-memory">
              <div class="memory-container hide-scroll">
                <div class="section-label">NEURAL DATABASE // LONG TERM MEMORY</div>
                <div id="memory-list" class="memory-list">
                  <p class="empty">ACCURATE DATA SCAN IN PROGRESS...</p>
                </div>
              </div>
            </div>
          </form>

          <div class="modal-footer">
            <div class="tech-log">LIAISON SERVEUR: <span class="v">STABLE</span></div>
            <div class="action-btns">
              <button type="button" class="btn-cancel close-btn">REFUSER</button>
              <button type="button" class="btn-confirm" id="save-btn">DÉPLOYER CONFIGURATION</button>
            </div>
          </div>
        </div>
      </dialog>
    `}async init(){this.saveBtn=this.container.querySelector("#save-btn"),this.closeBtn=this.container.querySelector(".close-btn"),this.tabBtns=this.container.querySelectorAll(".tab-btn"),this.panes=this.container.querySelectorAll(".tab-pane"),this.voiceSelect=this.container.querySelector("#tts-voice"),this.memoryList=this.container.querySelector("#memory-list"),this.closeBtn.addEventListener("click",()=>this.modal.close()),this.saveBtn.addEventListener("click",()=>this.saveSettings()),this.tabBtns.forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))})}switchTab(t){this.tabBtns.forEach(n=>n.classList.toggle("active",n.dataset.tab===t)),this.panes.forEach(n=>n.classList.toggle("active",n.id===`pane-${t}`)),t==="memory"&&this.loadMemory()}async loadSettings(){try{const t=await fetch("/api/settings");if(!t.ok)return;const n=await t.json();this.form.querySelectorAll("input, select").forEach(a=>{const s=a.name;let r=n[s]||n[`_raw_${s}`.replace("api_key","")]||"";s==="gemini_api_key"&&(r=n._raw_gemini||""),s==="tavily_api_key"&&(r=n._raw_tavily||""),s==="ha_token"&&(r=n._raw_ha_token||""),a.type==="checkbox"?a.checked=r==="true":a.value=r}),await this.loadVoices(n.kokoro_voice)}catch(t){console.error(t)}}async loadVoices(t){try{const n=await fetch("/api/voices");if(n.ok){const i=await n.json();this.voiceSelect.innerHTML="",i.voices.forEach(a=>{const s=document.createElement("option");s.value=a,s.textContent=a.toUpperCase(),a===t&&(s.selected=!0),this.voiceSelect.appendChild(s)})}}catch{}}async loadMemory(){this.memoryList.innerHTML='<div class="loader">SYNCHRONISATION...</div>';try{const t=await fetch("/api/memory");if(!t.ok)return;const n=await t.json();if(this.memoryList.innerHTML="",n.length===0){this.memoryList.innerHTML='<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';return}n.forEach(i=>{const a=document.createElement("div");a.className="memory-item",a.innerHTML=`
          <div class="m-key">${i.key}</div>
          <div class="m-val">${i.value}</div>
          <button class="m-del" data-key="${i.key}">✕</button>
        `,a.querySelector(".m-del").onclick=()=>this.deleteMemory(i.key),this.memoryList.appendChild(a)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(i=>{t[i.name]=i.type==="checkbox"?i.checked?"true":"false":i.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class NC{constructor(t){this.container=document.getElementById(t),this.mounted=!1,this.init()}init(){ze.subscribe(t=>{this.render(t.webSearchResults)})}render(t){if(!t){this.mounted&&(this.container.innerHTML="",this.mounted=!1);return}const{query:n,results:i}=t,a=i.map(s=>`
        <div class="web-result-card glass">
          <div class="web-result-id">${s.id}</div>
          <div class="web-result-content">
            <h3 class="web-result-title">${this.escapeHtml(s.title)}</h3>
            <p class="web-result-snippet">${this.escapeHtml(s.snippet)}</p>
            <div class="web-result-url">${this.escapeHtml(s.url)}</div>
          </div>
          ${s.image?`<div class="web-result-image" style="background-image: url('${s.image}')"></div>`:'<div class="web-result-image-placeholder">N/A</div>'}
        </div>
      `).join("");this.container.innerHTML=`
      <div class="web-search-modal glass-modal">
        <div class="web-search-content glass">
          <div class="web-search-header">
            <div class="status-dot"></div>
            <h2>RECHERCHE WEB <span class="query-text">"${this.escapeHtml(n)}"</span></h2>
          </div>
          <div class="web-search-body hide-scroll">
            <div class="web-results-grid">
              ${a}
            </div>
          </div>
          <div class="web-search-footer">
            <span class="pulsing-text">EN ATTENTE DE SÉLECTION VOCALE...</span>
          </div>
        </div>
      </div>
    `,this.mounted=!0}escapeHtml(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}class OC{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new hS("status-mount"),this.orb=new RC("orb-mount"),this.terminal=new DC("terminal-mount"),this.chat=new UC("chat-mount"),this.settings=new LC("settings-mount"),this.websearch=new NC("websearch-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),g0.connect();const t=()=>{wC.start(),window.removeEventListener("click",t)};window.addEventListener("click",t),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new OC;

!function(){function t(t){var e=t.getBoundingClientRect();return{width:e.width,height:e.height,top:e.top,right:e.right,bottom:e.bottom,left:e.left,x:e.left,y:e.top}}function e(t){if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e?e.defaultView:window}return t}function n(t){var n=e(t);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function r(t){return t instanceof e(t).Element||t instanceof Element}function o(t){return t instanceof e(t).HTMLElement||t instanceof HTMLElement}function i(t){return t?(t.nodeName||"").toLowerCase():null}function a(t){return(r(t)?t.ownerDocument:t.document).documentElement}function s(e){return t(a(e)).left+n(e).scrollLeft}function c(t){return e(t).getComputedStyle(t)}function l(t){var e=c(t),n=e.overflow,r=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function u(r,c,u){void 0===u&&(u=!1);var f,p,d=a(c),h=t(r),m=o(c),v={scrollLeft:0,scrollTop:0},g={x:0,y:0};return(m||!m&&!u)&&(("body"!==i(c)||l(d))&&(v=(f=c)!==e(f)&&o(f)?{scrollLeft:(p=f).scrollLeft,scrollTop:p.scrollTop}:n(f)),o(c)?((g=t(c)).x+=c.clientLeft,g.y+=c.clientTop):d&&(g.x=s(d))),{x:h.left+v.scrollLeft-g.x,y:h.top+v.scrollTop-g.y,width:h.width,height:h.height}}function f(t){return{x:t.offsetLeft,y:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight}}function p(t){return"html"===i(t)?t:t.assignedSlot||t.parentNode||t.host||a(t)}function d(t,n){void 0===n&&(n=[]);var r=function t(e){return["html","body","#document"].indexOf(i(e))>=0?e.ownerDocument.body:o(e)&&l(e)?e:t(p(e))}(t),a="body"===i(r),s=e(r),c=a?[s].concat(s.visualViewport||[],l(r)?r:[]):r,u=n.concat(c);return a?u:u.concat(d(p(c)))}function h(t){return["table","td","th"].indexOf(i(t))>=0}function m(t){if(!o(t)||"fixed"===c(t).position)return null;var e=t.offsetParent;if(e){var n=a(e);if("body"===i(e)&&"static"===c(e).position&&"static"!==c(n).position)return n}return e}function v(t){for(var n=e(t),r=m(t);r&&h(r)&&"static"===c(r).position;)r=m(r);return r&&"body"===i(r)&&"static"===c(r).position?n:r||function(t){for(var e=p(t);o(e)&&["html","body"].indexOf(i(e))<0;){var n=c(e);if("none"!==n.transform||"none"!==n.perspective||n.willChange&&"auto"!==n.willChange)return e;e=e.parentNode}return null}(t)||n}var g="top",b="bottom",y="right",w=[g,b,y,"left"],x=w.reduce((function(t,e){return t.concat([e+"-start",e+"-end"])}),[]),O=[].concat(w,["auto"]).reduce((function(t,e){return t.concat([e,e+"-start",e+"-end"])}),[]),j=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function E(t){var e=new Map,n=new Set,r=[];return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){n.has(t.name)||function t(o){n.add(o.name),[].concat(o.requires||[],o.requiresIfExists||[]).forEach((function(r){if(!n.has(r)){var o=e.get(r);o&&t(o)}})),r.push(o)}(t)})),r}function k(t){return t.split("-")[0]}function A(t){return Object.assign(Object.assign({},t),{},{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function L(r,i){return"viewport"===i?A(function(t){var n=e(t),r=a(t),o=n.visualViewport,i=r.clientWidth,c=r.clientHeight,l=0,u=0;return o&&(i=o.width,c=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(l=o.offsetLeft,u=o.offsetTop)),{width:i,height:c,x:l+s(t),y:u}}(r)):o(i)?function(e){var n=t(e);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(i):A(function(t){var e=a(t),r=n(t),o=t.ownerDocument.body,i=Math.max(e.scrollWidth,e.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),l=Math.max(e.scrollHeight,e.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),u=-r.scrollLeft+s(t),f=-r.scrollTop;return"rtl"===c(o||e).direction&&(u+=Math.max(e.clientWidth,o?o.clientWidth:0)-i),{width:i,height:l,x:u,y:f}}(a(r)))}function M(t){var e=d(p(t)),n=["absolute","fixed"].indexOf(c(t).position)>=0&&o(t)?v(t):t;return r(n)?e.filter((function(t){return r(t)&&function(t,e){var n=Boolean(e.getRootNode&&e.getRootNode().host);if(t.contains(e))return!0;if(n){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}(t,n)&&"body"!==i(t)})):[]}function S(t){return t.split("-")[1]}function T(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function D(t){var e,n=t.reference,r=t.element,o=t.placement,i=o?k(o):null,a=o?S(o):null,s=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2;switch(i){case g:e={x:s,y:n.y-r.height};break;case b:e={x:s,y:n.y+n.height};break;case y:e={x:n.x+n.width,y:c};break;case"left":e={x:n.x-r.width,y:c};break;default:e={x:n.x,y:n.y}}var l=i?T(i):null;if(null!=l){var u="y"===l?"height":"width";switch(a){case"start":e[l]=Math.floor(e[l])-Math.floor(n[u]/2-r[u]/2);break;case"end":e[l]=Math.floor(e[l])+Math.ceil(n[u]/2-r[u]/2)}}return e}function P(e,n){void 0===n&&(n={});var o,i=n,s=i.placement,c=void 0===s?e.placement:s,l=i.boundary,u=void 0===l?"clippingParents":l,f=i.rootBoundary,p=void 0===f?"viewport":f,d=i.elementContext,h=void 0===d?"popper":d,m=i.altBoundary,v=void 0!==m&&m,x=i.padding,O=void 0===x?0:x,j=function(t){return Object.assign(Object.assign({},{top:0,right:0,bottom:0,left:0}),t)}("number"!=typeof O?O:(o=O,w.reduce((function(t,e){return t[e]=o,t}),{}))),E="popper"===h?"reference":"popper",k=e.elements.reference,S=e.rects.popper,T=e.elements[v?E:h],P=function(t,e,n){var r="clippingParents"===e?M(t):[].concat(e),o=[].concat(r,[n]),i=o[0],a=o.reduce((function(e,n){var r=L(t,n);return e.top=Math.max(r.top,e.top),e.right=Math.min(r.right,e.right),e.bottom=Math.min(r.bottom,e.bottom),e.left=Math.max(r.left,e.left),e}),L(t,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}(r(T)?T:T.contextElement||a(e.elements.popper),u,p),R=t(k),B=D({reference:R,element:S,strategy:"absolute",placement:c}),C=A(Object.assign(Object.assign({},S),B)),H="popper"===h?C:R,W={top:P.top-H.top+j.top,bottom:H.bottom-P.bottom+j.bottom,left:P.left-H.left+j.left,right:H.right-P.right+j.right},I=e.modifiersData.offset;if("popper"===h&&I){var N=I[c];Object.keys(W).forEach((function(t){var e=[y,b].indexOf(t)>=0?1:-1,n=[g,b].indexOf(t)>=0?"y":"x";W[t]+=N[n]*e}))}return W}var R={placement:"bottom",modifiers:[],strategy:"absolute"};function B(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function C(t){void 0===t&&(t={});var e=t,n=e.defaultModifiers,o=void 0===n?[]:n,i=e.defaultOptions,a=void 0===i?R:i;return function(t,e,n){void 0===n&&(n=a);var i,s,c={placement:"bottom",orderedModifiers:[],options:Object.assign(Object.assign({},R),a),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],p=!1,h={state:c,setOptions:function(n){m(),c.options=Object.assign(Object.assign(Object.assign({},a),c.options),n),c.scrollParents={reference:r(t)?d(t):t.contextElement?d(t.contextElement):[],popper:d(e)};var i=function(t){var e=E(t);return j.reduce((function(t,n){return t.concat(e.filter((function(t){return t.phase===n})))}),[])}(function(t){var e=t.reduce((function(t,e){var n=t[e.name];return t[e.name]=n?Object.assign(Object.assign(Object.assign({},n),e),{},{options:Object.assign(Object.assign({},n.options),e.options),data:Object.assign(Object.assign({},n.data),e.data)}):e,t}),{});return Object.keys(e).map((function(t){return e[t]}))}([].concat(o,c.options.modifiers)));return c.orderedModifiers=i.filter((function(t){return t.enabled})),c.orderedModifiers.forEach((function(t){var e=t.name,n=t.options,r=void 0===n?{}:n,o=t.effect;if("function"==typeof o){var i=o({state:c,name:e,instance:h,options:r});l.push(i||function(){})}})),h.update()},forceUpdate:function(){if(!p){var t=c.elements,e=t.reference,n=t.popper;if(B(e,n)){c.rects={reference:u(e,v(n),"fixed"===c.options.strategy),popper:f(n)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach((function(t){return c.modifiersData[t.name]=Object.assign({},t.data)}));for(var r=0;r<c.orderedModifiers.length;r++)if(!0!==c.reset){var o=c.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,l=o.name;"function"==typeof i&&(c=i({state:c,options:s,name:l,instance:h})||c)}else c.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(t){h.forceUpdate(),t(c)}))},function(){return s||(s=new Promise((function(t){Promise.resolve().then((function(){s=void 0,t(i())}))}))),s}),destroy:function(){m(),p=!0}};if(!B(t,e))return h;function m(){l.forEach((function(t){return t()})),l=[]}return h.setOptions(n).then((function(t){!p&&n.onFirstUpdate&&n.onFirstUpdate(t)})),h}}var H={passive:!0};var W={top:"auto",right:"auto",bottom:"auto",left:"auto"};function I(t){var n,r=t.popper,o=t.popperRect,i=t.placement,s=t.offsets,c=t.position,l=t.gpuAcceleration,u=t.adaptive,f=function(t){var e=t.x,n=t.y,r=window.devicePixelRatio||1;return{x:Math.round(e*r)/r||0,y:Math.round(n*r)/r||0}}(s),p=f.x,d=f.y,h=s.hasOwnProperty("x"),m=s.hasOwnProperty("y"),w="left",x=g,O=window;if(u){var j=v(r);j===e(r)&&(j=a(r)),i===g&&(x=b,d-=j.clientHeight-o.height,d*=l?1:-1),"left"===i&&(w=y,p-=j.clientWidth-o.width,p*=l?1:-1)}var E,k=Object.assign({position:c},u&&W);return l?Object.assign(Object.assign({},k),{},((E={})[x]=m?"0":"",E[w]=h?"0":"",E.transform=(O.devicePixelRatio||1)<2?"translate("+p+"px, "+d+"px)":"translate3d("+p+"px, "+d+"px, 0)",E)):Object.assign(Object.assign({},k),{},((n={})[x]=m?d+"px":"",n[w]=h?p+"px":"",n.transform="",n))}var N=[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var n=t.state,r=t.instance,o=t.options,i=o.scroll,a=void 0===i||i,s=o.resize,c=void 0===s||s,l=e(n.elements.popper),u=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&u.forEach((function(t){t.addEventListener("scroll",r.update,H)})),c&&l.addEventListener("resize",r.update,H),function(){a&&u.forEach((function(t){t.removeEventListener("scroll",r.update,H)})),c&&l.removeEventListener("resize",r.update,H)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,n=t.name;e.modifiersData[n]=D({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,n=t.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s={placement:k(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign(Object.assign({},e.styles.popper),I(Object.assign(Object.assign({},s),{},{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:a})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign(Object.assign({},e.styles.arrow),I(Object.assign(Object.assign({},s),{},{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1})))),e.attributes.popper=Object.assign(Object.assign({},e.attributes.popper),{},{"data-popper-placement":e.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var n=e.styles[t]||{},r=e.attributes[t]||{},a=e.elements[t];o(a)&&i(a)&&(Object.assign(a.style,n),Object.keys(r).forEach((function(t){var e=r[t];!1===e?a.removeAttribute(t):a.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach((function(t){var r=e.elements[t],a=e.attributes[t]||{},s=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:n[t]).reduce((function(t,e){return t[e]="",t}),{});o(r)&&i(r)&&(Object.assign(r.style,s),Object.keys(a).forEach((function(t){r.removeAttribute(t)})))}))}},requires:["computeStyles"]}],U={left:"right",right:"left",bottom:"top",top:"bottom"};function q(t){return t.replace(/left|right|bottom|top/g,(function(t){return U[t]}))}var V={start:"end",end:"start"};function $(t){return t.replace(/start|end/g,(function(t){return V[t]}))}var _={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,c=n.fallbackPlacements,l=n.padding,u=n.boundary,f=n.rootBoundary,p=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=e.options.placement,j=k(v),E=c||(j===v||!h?[q(v)]:function(t){if("auto"===k(t))return[];var e=q(t);return[$(t),e,$(e)]}(v)),A=[v].concat(E).reduce((function(t,n){return t.concat("auto"===k(n)?function(t,e){void 0===e&&(e={});var n=e,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?O:c,u=S(r),f=u?s?x:x.filter((function(t){return S(t)===u})):w,p=f.filter((function(t){return l.indexOf(t)>=0}));0===p.length&&(p=f);var d=p.reduce((function(e,n){return e[n]=P(t,{placement:n,boundary:o,rootBoundary:i,padding:a})[k(n)],e}),{});return Object.keys(d).sort((function(t,e){return d[t]-d[e]}))}(e,{placement:n,boundary:u,rootBoundary:f,padding:l,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),L=e.rects.reference,M=e.rects.popper,T=new Map,D=!0,R=A[0],B=0;B<A.length;B++){var C=A[B],H=k(C),W="start"===S(C),I=[g,b].indexOf(H)>=0,N=I?"width":"height",U=P(e,{placement:C,boundary:u,rootBoundary:f,altBoundary:p,padding:l}),V=I?W?y:"left":W?b:g;L[N]>M[N]&&(V=q(V));var _=q(V),z=[];if(i&&z.push(U[H]<=0),s&&z.push(U[V]<=0,U[_]<=0),z.every((function(t){return t}))){R=C,D=!1;break}T.set(C,z)}if(D)for(var F=function(t){var e=A.find((function(e){var n=T.get(e);if(n)return n.slice(0,t).every((function(t){return t}))}));if(e)return R=e,"break"},X=h?3:1;X>0;X--){if("break"===F(X))break}e.placement!==R&&(e.modifiersData[r]._skip=!0,e.placement=R,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function z(t,e,n){return Math.max(t,Math.min(e,n))}var F={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,r=t.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,p=n.padding,d=n.tether,h=void 0===d||d,m=n.tetherOffset,w=void 0===m?0:m,x=P(e,{boundary:c,rootBoundary:l,padding:p,altBoundary:u}),O=k(e.placement),j=S(e.placement),E=!j,A=T(O),L="x"===A?"y":"x",M=e.modifiersData.popperOffsets,D=e.rects.reference,R=e.rects.popper,B="function"==typeof w?w(Object.assign(Object.assign({},e.rects),{},{placement:e.placement})):w,C={x:0,y:0};if(M){if(i){var H="y"===A?g:"left",W="y"===A?b:y,I="y"===A?"height":"width",N=M[A],U=M[A]+x[H],q=M[A]-x[W],V=h?-R[I]/2:0,$="start"===j?D[I]:R[I],_="start"===j?-R[I]:-D[I],F=e.elements.arrow,X=h&&F?f(F):{width:0,height:0},Y=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},K=Y[H],G=Y[W],J=z(0,D[I],X[I]),Q=E?D[I]/2-V-J-K-B:$-J-K-B,Z=E?-D[I]/2+V+J+G+B:_+J+G+B,tt=e.elements.arrow&&v(e.elements.arrow),et=tt?"y"===A?tt.clientTop||0:tt.clientLeft||0:0,nt=e.modifiersData.offset?e.modifiersData.offset[e.placement][A]:0,rt=M[A]+Q-nt-et,ot=M[A]+Z-nt,it=z(h?Math.min(U,rt):U,N,h?Math.max(q,ot):q);M[A]=it,C[A]=it-N}if(s){var at="x"===A?g:"left",st="x"===A?b:y,ct=M[L],lt=z(ct+x[at],ct,ct-x[st]);M[L]=lt,C[L]=lt-ct}e.modifiersData[r]=C}},requiresIfExists:["offset"]};function X(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}(t,e)||K(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function K(t,e){if(t){if("string"==typeof t)return G(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(t,e):void 0}}function G(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var J,Q=C({defaultModifiers:[].concat((J=N,function(t){if(Array.isArray(t))return G(t)}(J)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(J)||K(J)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),[_,F])}),Z={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function tt(t){return t.replace(/[&<>"']/g,(function(t){return Z[t]}))}function et(t,e){if(!e)return tt(t);var n="("+function(t){return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")}(e)+")";return tt(t.replace(new RegExp(n,"gi"),"<mark>$1</mark>")).replace(/&lt;(\/?mark)&gt;/g,"<$1>")}var nt=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.input=e.input,this.lookup=e.lookup,this.onSelect=e.onSelect,this.silent=!0===e.silent,this.highlight=!0===e.highlight,this.cache=!0===e.cache,this.noResultsMessage=e.noResultsMessage||"-- no corresponding results --",this.cachedResults=[],this.emptyResults=[],this.popper=null,this.selected=null,this.showing=!1;var r,o,i="id_".concat(this.input.id);this.template=(r='<ul role="listbox" class="autocomplete" id="'.concat(i,'"></ul>'),(o=document.createElement("template")).innerHTML=r.trim(),o.content.firstChild),this.input.parentNode.append(this.template),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("role","combobox"),this.input.setAttribute("aria-owns",i),this.input.setAttribute("aria-autocomplete","list"),this.input.setAttribute("aria-expanded","false"),this.input.addEventListener("input",(function(){var t=n.input.value.trim();n.selected=null,t?n.suggest(t):n.showing&&n.destroy()})),this.input.addEventListener("focusout",(function(){setTimeout((function(){n.destroy()}),200)})),this.input.addEventListener("keydown",(function(t){if(["ArrowUp","ArrowDown","Escape","Enter","Tab"].includes(t.key)){var e=["ArrowUp","ArrowDown"].includes(t.key);switch(e&&n.selected&&n.selected.classList.remove("selected","mouseover"),t.key){case"ArrowUp":var r=n.template.lastChild;n.selected=n.selected&&n.selected.previousElementSibling||r,n.selected.classList.contains("no-results")||t.preventDefault();break;case"ArrowDown":var o=n.template.firstChild;n.selected=n.selected&&n.selected.nextElementSibling||o;break;case"Escape":n.destroy();break;case"Enter":n.selected&&!n.selected.classList.contains("mouseover")&&(t.preventDefault(),n.triggerOnSelect(n.selected));break;case"Tab":n.selected&&!t.shiftKey&&(n.input.value=n.selected.textContent)}e&&n.selected&&!n.selected.classList.contains("no-results")&&(n.selected.classList.add("selected"),n.input.value=n.selected.textContent,n.input.setAttribute("aria-activedescendant",n.selected.id))}})),this.template.addEventListener("click",(function(t){t.stopPropagation(),n.triggerOnSelect(t.target.closest("li"))})),this.template.addEventListener("mouseover",(function(t){"LI"!==t.target.tagName||t.target.classList.contains("no-results")||(Array.from(n.template.childNodes).forEach((function(e){return e!==t.target&&e.classList.remove("selected","mouseover")})),n.selected=t.target,n.selected.classList.add("selected","mouseover"))}))}var e,n,r;return e=t,(n=[{key:"suggest",value:function(t){var e=this;if(this.cache){if(this.emptyResults.filter((function(e){return t.startsWith(Object.keys(e)[0])})).length)return void this.render([]);var n=X(this.cachedResults.filter((function(e){return e[t]})),1)[0];if(n)return void this.render(n[t])}this.lookup(t).then((function(n){var r,o,i,a=n.map((function(n){return{name:e.highlight?et(n.name,t):tt(n.name),value:tt(n.value)}}));e.cache&&(a.length?e.cachedResults:e.emptyResults).push((i=a,(o=t)in(r={})?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i,r)),e.render(a)}))}},{key:"render",value:function(t){if(this.popper||(this.popper=this.create()),t.length){this.template.innerHTML="";var e,n=function(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=K(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw i}}}}(t.entries());try{for(n.s();!(e=n.n()).done;){var r=X(e.value,2),o=r[0],i=r[1];this.template.innerHTML+='<li role="option" data-value="'.concat(i.value,'" id="cb-opt-').concat(o,'">').concat(i.name,"</li>")}}catch(t){n.e(t)}finally{n.f()}}else{if(this.silent)return void this.destroy();this.template.querySelector(".no-results")||(this.template.innerHTML='<li role="alert" aria-live="assertive" class=\'no-results\'>'.concat(this.noResultsMessage,"</li>"))}this.showing=!0,this.template.style.display="block",this.input.setAttribute("aria-expanded","true")}},{key:"destroy",value:function(){this.popper&&(this.input.setAttribute("aria-expanded","false"),this.template.style.display="none",this.template.innerHTML="",this.selected=null,this.showing=!1,this.popper.destroy(),this.popper=null)}},{key:"create",value:function(){return Q(this.input,this.template,{placement:"bottom-start"})}},{key:"triggerOnSelect",value:function(t){if(!t.classList.contains("no-results")){this.destroy(),this.input.value=t.textContent;var e=t.getAttribute("data-value");e&&this.onSelect&&this.onSelect(e)}}}])&&Y(e.prototype,n),r&&Y(e,r),t}();globalThis.AutoComplete=nt}();
//# sourceMappingURL=autocomplete.js.map

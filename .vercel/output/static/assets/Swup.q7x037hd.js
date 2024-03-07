const A=new WeakMap;function L(e,t,i,s){if(!e&&!A.has(t))return!1;const n=A.get(t)??new WeakMap;A.set(t,n);const o=n.get(i)??new Set;n.set(i,o);const r=o.has(s);return e?o.add(s):o.delete(s),r&&e}function j(e,t){let i=e.target;if(i instanceof Text&&(i=i.parentElement),i instanceof Element&&e.currentTarget instanceof Element){const s=i.closest(t);if(s&&e.currentTarget.contains(s))return s}}function W(e,t,i,s={}){const{signal:n,base:o=document}=s;if(n?.aborted)return;const{once:r,...a}=s,l=o instanceof Document?o.documentElement:o,c=!!(typeof s=="object"?s.capture:s),h=m=>{const g=j(m,e);if(g){const f=Object.assign(m,{delegateTarget:g});i.call(l,f),r&&(l.removeEventListener(t,h,a),L(!1,l,i,u))}},u=JSON.stringify({selector:e,type:t,capture:c});L(!0,l,i,u)||l.addEventListener(t,h,a),n?.addEventListener("abort",()=>{L(!1,l,i,u)})}function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e},p.apply(this,arguments)}const R=(e,t)=>String(e).toLowerCase().replace(/[\s/_.]+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+|-+$/g,"")||t||"",v=({hash:e}={})=>window.location.pathname+window.location.search+(e?window.location.hash:""),B=(e,t={})=>{const i=p({url:e=e||v({hash:!0}),random:Math.random(),source:"swup"},t);window.history.pushState(i,"",e)},S=(e=null,t={})=>{e=e||v({hash:!0});const i=p({},window.history.state||{},{url:e,random:Math.random(),source:"swup"},t);window.history.replaceState(i,"",e)},_=(e,t,i,s)=>{const n=new AbortController;return s=p({},s,{signal:n.signal}),W(e,t,i,s),{destroy:()=>n.abort()}};let y=class $ extends URL{constructor(t,i=document.baseURI){super(t.toString(),i),Object.setPrototypeOf(this,$.prototype)}get url(){return this.pathname+this.search}static fromElement(t){const i=t.getAttribute("href")||t.getAttribute("xlink:href")||"";return new $(i)}static fromUrl(t){return new $(t)}};class P extends Error{constructor(t,i){super(t),this.url=void 0,this.status=void 0,this.aborted=void 0,this.timedOut=void 0,this.name="FetchError",this.url=i.url,this.status=i.status,this.aborted=i.aborted||!1,this.timedOut=i.timedOut||!1}}async function F(e,t={}){var i;e=y.fromUrl(e).url;const{visit:s=this.visit}=t,n=p({},this.options.requestHeaders,t.headers),o=(i=t.timeout)!=null?i:this.options.timeout,r=new AbortController,{signal:a}=r;t=p({},t,{headers:n,signal:a});let l,c=!1,h=null;o&&o>0&&(h=setTimeout(()=>{c=!0,r.abort("timeout")},o));try{l=await this.hooks.call("fetch:request",s,{url:e,options:t},(w,{url:E,options:k})=>fetch(E,k)),h&&clearTimeout(h)}catch(w){throw c?(this.hooks.call("fetch:timeout",s,{url:e}),new P(`Request timed out: ${e}`,{url:e,timedOut:c})):w?.name==="AbortError"||a.aborted?new P(`Request aborted: ${e}`,{url:e,aborted:!0}):w}const{status:u,url:d}=l,m=await l.text();if(u===500)throw this.hooks.call("fetch:error",s,{status:u,response:l,url:d}),new P(`Server error: ${d}`,{status:u,url:d});if(!m)throw new P(`Empty response: ${d}`,{status:u,url:d});const{url:g}=y.fromUrl(d),f={url:g,html:m};return!s.cache.write||t.method&&t.method!=="GET"||e!==g||this.cache.set(f.url,f),f}class z{constructor(t){this.swup=void 0,this.pages=new Map,this.swup=t}get size(){return this.pages.size}get all(){const t=new Map;return this.pages.forEach((i,s)=>{t.set(s,p({},i))}),t}has(t){return this.pages.has(this.resolve(t))}get(t){const i=this.pages.get(this.resolve(t));return i&&p({},i)}set(t,i){i=p({},i,{url:t=this.resolve(t)}),this.pages.set(t,i),this.swup.hooks.callSync("cache:set",void 0,{page:i})}update(t,i){t=this.resolve(t);const s=p({},this.get(t),i,{url:t});this.pages.set(t,s)}delete(t){this.pages.delete(this.resolve(t))}clear(){this.pages.clear(),this.swup.hooks.callSync("cache:clear",void 0,void 0)}prune(t){this.pages.forEach((i,s)=>{t(s,i)&&this.delete(s)})}resolve(t){const{url:i}=y.fromUrl(t);return this.swup.resolveUrl(i)}}const H=(e,t=document)=>t.querySelector(e),T=(e,t=document)=>Array.from(t.querySelectorAll(e)),N=()=>new Promise(e=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{e()})})});function M(e){return!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function"}function K(e,t=[]){return new Promise((i,s)=>{const n=e(...t);M(n)?n.then(i,s):i(n)})}const q=e=>window.CSS&&window.CSS.escape?CSS.escape(e):e,V=e=>1e3*Number(e.slice(0,-1).replace(",","."));class G{constructor(t){this.swup=void 0,this.swupClasses=["to-","is-changing","is-rendering","is-popstate","is-animating","is-leaving"],this.swup=t}get selectors(){const{scope:t}=this.swup.visit.animation;return t==="containers"?this.swup.visit.containers:t==="html"?["html"]:Array.isArray(t)?t:[]}get selector(){return this.selectors.join(",")}get targets(){return this.selector.trim()?T(this.selector):[]}add(...t){this.targets.forEach(i=>i.classList.add(...t))}remove(...t){this.targets.forEach(i=>i.classList.remove(...t))}clear(){this.targets.forEach(t=>{const i=t.className.split(" ").filter(s=>this.isSwupClass(s));t.classList.remove(...i)})}isSwupClass(t){return this.swupClasses.some(i=>t.startsWith(i))}}class D{constructor(t,i){this.id=void 0,this.state=void 0,this.from=void 0,this.to=void 0,this.containers=void 0,this.animation=void 0,this.trigger=void 0,this.cache=void 0,this.history=void 0,this.scroll=void 0;const{to:s,from:n=t.currentPageUrl,hash:o,el:r,event:a}=i;this.id=Math.random(),this.state=1,this.from={url:n},this.to={url:s,hash:o},this.containers=t.options.containers,this.animation={animate:!0,wait:!1,name:void 0,native:t.options.native,scope:t.options.animationScope,selector:t.options.animationSelector},this.trigger={el:r,event:a},this.cache={read:t.options.cache,write:t.options.cache},this.history={action:"push",popstate:!1,direction:void 0},this.scroll={reset:!0,target:void 0}}advance(t){this.state<t&&(this.state=t)}abort(){this.state=8}get done(){return this.state>=7}}function J(e){return new D(this,e)}class X{constructor(t){this.swup=void 0,this.registry=new Map,this.hooks=["animation:out:start","animation:out:await","animation:out:end","animation:in:start","animation:in:await","animation:in:end","animation:skip","cache:clear","cache:set","content:replace","content:scroll","enable","disable","fetch:request","fetch:error","fetch:timeout","history:popstate","link:click","link:self","link:anchor","link:newtab","page:load","page:view","scroll:top","scroll:anchor","visit:start","visit:transition","visit:abort","visit:end"],this.swup=t,this.init()}init(){this.hooks.forEach(t=>this.create(t))}create(t){this.registry.has(t)||this.registry.set(t,new Map)}exists(t){return this.registry.has(t)}get(t){const i=this.registry.get(t);if(i)return i;console.error(`Unknown hook '${t}'`)}clear(){this.registry.forEach(t=>t.clear())}on(t,i,s={}){const n=this.get(t);if(!n)return console.warn(`Hook '${t}' not found.`),()=>{};const o=p({},s,{id:n.size+1,hook:t,handler:i});return n.set(i,o),()=>this.off(t,i)}before(t,i,s={}){return this.on(t,i,p({},s,{before:!0}))}replace(t,i,s={}){return this.on(t,i,p({},s,{replace:!0}))}once(t,i,s={}){return this.on(t,i,p({},s,{once:!0}))}off(t,i){const s=this.get(t);s&&i?s.delete(i)||console.warn(`Handler for hook '${t}' not found.`):s&&s.clear()}async call(t,i,s,n){const[o,r,a]=this.parseCallArgs(t,i,s,n),{before:l,handler:c,after:h}=this.getHandlers(t,a);await this.run(l,o,r);const[u]=await this.run(c,o,r,!0);return await this.run(h,o,r),this.dispatchDomEvent(t,o,r),u}callSync(t,i,s,n){const[o,r,a]=this.parseCallArgs(t,i,s,n),{before:l,handler:c,after:h}=this.getHandlers(t,a);this.runSync(l,o,r);const[u]=this.runSync(c,o,r,!0);return this.runSync(h,o,r),this.dispatchDomEvent(t,o,r),u}parseCallArgs(t,i,s,n){return i instanceof D||typeof i!="object"&&typeof s!="function"?[i,s,n]:[void 0,i,s]}async run(t,i=this.swup.visit,s,n=!1){const o=[];for(const{hook:r,handler:a,defaultHandler:l,once:c}of t)if(i==null||!i.done){c&&this.off(r,a);try{const h=await K(a,[i,s,l]);o.push(h)}catch(h){if(n)throw h;console.error(`Error in hook '${r}':`,h)}}return o}runSync(t,i=this.swup.visit,s,n=!1){const o=[];for(const{hook:r,handler:a,defaultHandler:l,once:c}of t)if(i==null||!i.done){c&&this.off(r,a);try{const h=a(i,s,l);o.push(h),M(h)&&console.warn(`Swup will not await Promises in handler for synchronous hook '${r}'.`)}catch(h){if(n)throw h;console.error(`Error in hook '${r}':`,h)}}return o}getHandlers(t,i){const s=this.get(t);if(!s)return{found:!1,before:[],handler:[],after:[],replaced:!1};const n=Array.from(s.values()),o=this.sortRegistrations,r=n.filter(({before:u,replace:d})=>u&&!d).sort(o),a=n.filter(({replace:u})=>u).filter(u=>!0).sort(o),l=n.filter(({before:u,replace:d})=>!u&&!d).sort(o),c=a.length>0;let h=[];if(i&&(h=[{id:0,hook:t,handler:i}],c)){const u=a.length-1,d=m=>{const g=a[m-1];return g?(f,w)=>g.handler(f,w,d(m-1)):i};h=[{id:0,hook:t,handler:a[u].handler,defaultHandler:d(u)}]}return{found:!0,before:r,handler:h,after:l,replaced:c}}sortRegistrations(t,i){var s,n;return((s=t.priority)!=null?s:0)-((n=i.priority)!=null?n:0)||t.id-i.id||0}dispatchDomEvent(t,i,s){if(i!=null&&i.done)return;const n={hook:t,args:s,visit:i||this.swup.visit};document.dispatchEvent(new CustomEvent("swup:any",{detail:n,bubbles:!0})),document.dispatchEvent(new CustomEvent(`swup:${t}`,{detail:n,bubbles:!0}))}}const Q=e=>{if(e&&e.charAt(0)==="#"&&(e=e.substring(1)),!e)return null;const t=decodeURIComponent(e);let i=document.getElementById(e)||document.getElementById(t)||H(`a[name='${q(e)}']`)||H(`a[name='${q(t)}']`);return i||e!=="top"||(i=document.body),i},b="transition",U="animation";async function Y({elements:e,selector:t}){if(t===!1&&!e)return;let i=[];if(e)i=Array.from(e);else if(t&&(i=T(t,document.body),!i.length))return void console.warn(`[swup] No elements found matching animationSelector \`${t}\``);const s=i.map(n=>function(o){const{type:r,timeout:a,propCount:l}=function(c,h){const u=window.getComputedStyle(c),d=C(u,`${b}Delay`),m=C(u,`${b}Duration`),g=I(d,m),f=C(u,`${U}Delay`),w=C(u,`${U}Duration`),E=I(f,w);let k=null,x=0,O=0;return x=Math.max(g,E),k=x>0?g>E?b:U:null,O=k?k===b?m.length:w.length:0,{type:k,timeout:x,propCount:O}}(o);return!(!r||!a)&&new Promise(c=>{const h=`${r}end`,u=performance.now();let d=0;const m=()=>{o.removeEventListener(h,g),c()},g=f=>{if(f.target===o){if(!function(w){return[`${b}end`,`${U}end`].includes(w.type)}(f))throw new Error("Not a transition or animation event.");(performance.now()-u)/1e3<f.elapsedTime||++d>=l&&m()}};setTimeout(()=>{d<l&&m()},a+1),o.addEventListener(h,g)})}(n));s.filter(Boolean).length>0?await Promise.all(s):t&&console.warn(`[swup] No CSS animation duration defined on elements matching \`${t}\``)}function C(e,t){return(e[t]||"").split(", ")}function I(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((i,s)=>V(i)+V(e[s])))}function Z(e,t={},i={}){if(typeof e!="string")throw new Error("swup.navigate() requires a URL parameter");if(this.shouldIgnoreVisit(e,{el:i.el,event:i.event}))return void window.location.assign(e);const{url:s,hash:n}=y.fromUrl(e),o=this.createVisit(p({},i,{to:s,hash:n}));this.performNavigation(o,t)}async function tt(e,t={}){if(this.navigating){if(this.visit.state>=6)return e.state=2,void(this.onVisitEnd=()=>this.performNavigation(e,t));await this.hooks.call("visit:abort",this.visit,void 0),delete this.visit.to.document,this.visit.state=8}this.navigating=!0,this.visit=e;const{el:i}=e.trigger;t.referrer=t.referrer||this.currentPageUrl,t.animate===!1&&(e.animation.animate=!1),e.animation.animate||this.classes.clear();const s=t.history||i?.getAttribute("data-swup-history")||void 0;s&&["push","replace"].includes(s)&&(e.history.action=s);const n=t.animation||i?.getAttribute("data-swup-animation")||void 0;var o,r;n&&(e.animation.name=n),typeof t.cache=="object"?(e.cache.read=(o=t.cache.read)!=null?o:e.cache.read,e.cache.write=(r=t.cache.write)!=null?r:e.cache.write):t.cache!==void 0&&(e.cache={read:!!t.cache,write:!!t.cache}),delete t.cache;try{await this.hooks.call("visit:start",e,void 0),e.state=3;const a=this.hooks.call("page:load",e,{options:t},async(l,c)=>{let h;return l.cache.read&&(h=this.cache.get(l.to.url)),c.page=h||await this.fetchPage(l.to.url,c.options),c.cache=!!h,c.page});if(a.then(({html:l})=>{e.advance(5),e.to.html=l,e.to.document=new DOMParser().parseFromString(l,"text/html")}),!e.history.popstate){const l=e.to.url+e.to.hash;e.history.action==="replace"||e.to.url===this.currentPageUrl?S(l):(this.currentHistoryIndex++,B(l,{index:this.currentHistoryIndex}))}if(this.currentPageUrl=v(),e.history.popstate&&this.classes.add("is-popstate"),e.animation.name&&this.classes.add(`to-${R(e.animation.name)}`),e.animation.wait&&await a,e.done||(await this.hooks.call("visit:transition",e,void 0,async()=>{if(!e.animation.animate)return await this.hooks.call("animation:skip",void 0),void await this.renderPage(e,await a);e.advance(4),await this.animatePageOut(e),e.animation.native&&document.startViewTransition?await document.startViewTransition(async()=>await this.renderPage(e,await a)).finished:await this.renderPage(e,await a),await this.animatePageIn(e)}),e.done))return;await this.hooks.call("visit:end",e,void 0,()=>this.classes.clear()),e.state=7,this.navigating=!1,this.onVisitEnd&&(this.onVisitEnd(),this.onVisitEnd=void 0)}catch(a){if(!a||a!=null&&a.aborted)return void(e.state=8);e.state=9,console.error(a),this.options.skipPopStateHandling=()=>(window.location.assign(e.to.url+e.to.hash),!0),window.history.back()}finally{delete e.to.document}}const et=async function(e){await this.hooks.call("animation:out:start",e,void 0,()=>{this.classes.add("is-changing","is-animating","is-leaving")}),await this.hooks.call("animation:out:await",e,{skip:!1},(t,{skip:i})=>{if(!i)return this.awaitAnimations({selector:t.animation.selector})}),await this.hooks.call("animation:out:end",e,void 0)},it=function(e){var t;const i=e.to.document;if(!i)return!1;const s=((t=i.querySelector("title"))==null?void 0:t.innerText)||"";document.title=s;const n=T('[data-swup-persist]:not([data-swup-persist=""])'),o=e.containers.map(r=>{const a=document.querySelector(r),l=i.querySelector(r);return a&&l?(a.replaceWith(l.cloneNode(!0)),!0):(a||console.warn(`[swup] Container missing in current document: ${r}`),l||console.warn(`[swup] Container missing in incoming document: ${r}`),!1)}).filter(Boolean);return n.forEach(r=>{const a=r.getAttribute("data-swup-persist"),l=H(`[data-swup-persist="${a}"]`);l&&l!==r&&l.replaceWith(r)}),o.length===e.containers.length},st=function(e){const t={behavior:"auto"},{target:i,reset:s}=e.scroll,n=i??e.to.hash;let o=!1;return n&&(o=this.hooks.callSync("scroll:anchor",e,{hash:n,options:t},(r,{hash:a,options:l})=>{const c=this.getAnchorElement(a);return c&&c.scrollIntoView(l),!!c})),s&&!o&&(o=this.hooks.callSync("scroll:top",e,{options:t},(r,{options:a})=>(window.scrollTo(p({top:0,left:0},a)),!0))),o},nt=async function(e){if(e.done)return;const t=this.hooks.call("animation:in:await",e,{skip:!1},(i,{skip:s})=>{if(!s)return this.awaitAnimations({selector:i.animation.selector})});await N(),await this.hooks.call("animation:in:start",e,void 0,()=>{this.classes.remove("is-animating")}),await t,await this.hooks.call("animation:in:end",e,void 0)},ot=async function(e,t){if(e.done)return;e.advance(6);const{url:i}=t;this.isSameResolvedUrl(v(),i)||(S(i),this.currentPageUrl=v(),e.to.url=this.currentPageUrl),await this.hooks.call("content:replace",e,{page:t},(s,{})=>{if(this.classes.remove("is-leaving"),s.animation.animate&&this.classes.add("is-rendering"),!this.replaceContent(s))throw new Error("[swup] Container mismatch, aborting");s.animation.animate&&(this.classes.add("is-changing","is-animating","is-rendering"),s.animation.name&&this.classes.add(`to-${R(s.animation.name)}`))}),await this.hooks.call("content:scroll",e,void 0,()=>this.scrollToContent(e)),await this.hooks.call("page:view",e,{url:this.currentPageUrl,title:document.title})},rt=function(e){var t;if(t=e,!!t?.isSwupPlugin){if(e.swup=this,!e._checkRequirements||e._checkRequirements())return e._beforeMount&&e._beforeMount(),e.mount(),this.plugins.push(e),this.plugins}else console.error("Not a swup plugin instance",e)};function at(e){const t=this.findPlugin(e);if(t)return t.unmount(),t._afterUnmount&&t._afterUnmount(),this.plugins=this.plugins.filter(i=>i!==t),this.plugins;console.error("No such plugin",t)}function lt(e){return this.plugins.find(t=>t===e||t.name===e||t.name===`Swup${String(e)}`)}function ct(e){if(typeof this.options.resolveUrl!="function")return console.warn("[swup] options.resolveUrl expects a callback function."),e;const t=this.options.resolveUrl(e);return t&&typeof t=="string"?t.startsWith("//")||t.startsWith("http")?(console.warn("[swup] options.resolveUrl needs to return a relative url"),e):t:(console.warn("[swup] options.resolveUrl needs to return a url"),e)}function ht(e,t){return this.resolveUrl(e)===this.resolveUrl(t)}const ut={animateHistoryBrowsing:!1,animationSelector:'[class*="transition-"]',animationScope:"html",cache:!0,containers:["#swup"],ignoreVisit:(e,{el:t}={})=>!(t==null||!t.closest("[data-no-swup]")),linkSelector:"a[href]",linkToSelf:"scroll",native:!1,plugins:[],resolveUrl:e=>e,requestHeaders:{"X-Requested-With":"swup",Accept:"text/html, application/xhtml+xml"},skipPopStateHandling:e=>{var t;return((t=e.state)==null?void 0:t.source)!=="swup"},timeout:0};class dt{constructor(t={}){var i,s;this.version="4.6.0",this.options=void 0,this.defaults=ut,this.plugins=[],this.visit=void 0,this.cache=void 0,this.hooks=void 0,this.classes=void 0,this.currentPageUrl=v(),this.currentHistoryIndex=void 0,this.clickDelegate=void 0,this.navigating=!1,this.onVisitEnd=void 0,this.use=rt,this.unuse=at,this.findPlugin=lt,this.log=()=>{},this.navigate=Z,this.performNavigation=tt,this.createVisit=J,this.delegateEvent=_,this.fetchPage=F,this.awaitAnimations=Y,this.renderPage=ot,this.replaceContent=it,this.animatePageIn=nt,this.animatePageOut=et,this.scrollToContent=st,this.getAnchorElement=Q,this.getCurrentUrl=v,this.resolveUrl=ct,this.isSameResolvedUrl=ht,this.options=p({},this.defaults,t),this.handleLinkClick=this.handleLinkClick.bind(this),this.handlePopState=this.handlePopState.bind(this),this.cache=new z(this),this.classes=new G(this),this.hooks=new X(this),this.visit=this.createVisit({to:""}),this.currentHistoryIndex=(i=(s=window.history.state)==null?void 0:s.index)!=null?i:1,this.checkRequirements()&&this.enable()}checkRequirements(){return typeof Promise<"u"||(console.warn("Promise is not supported"),!1)}async enable(){var t;const{linkSelector:i}=this.options;this.clickDelegate=this.delegateEvent(i,"click",this.handleLinkClick),window.addEventListener("popstate",this.handlePopState),this.options.animateHistoryBrowsing&&(window.history.scrollRestoration="manual"),this.options.native=this.options.native&&!!document.startViewTransition,this.options.plugins.forEach(s=>this.use(s)),((t=window.history.state)==null?void 0:t.source)!=="swup"&&S(null,{index:this.currentHistoryIndex}),await N(),await this.hooks.call("enable",void 0,void 0,()=>{const s=document.documentElement;s.classList.add("swup-enabled"),s.classList.toggle("swup-native",this.options.native)})}async destroy(){this.clickDelegate.destroy(),window.removeEventListener("popstate",this.handlePopState),this.cache.clear(),this.options.plugins.forEach(t=>this.unuse(t)),await this.hooks.call("disable",void 0,void 0,()=>{const t=document.documentElement;t.classList.remove("swup-enabled"),t.classList.remove("swup-native")}),this.hooks.clear()}shouldIgnoreVisit(t,{el:i,event:s}={}){const{origin:n,url:o,hash:r}=y.fromUrl(t);return n!==window.location.origin||!(!i||!this.triggerWillOpenNewWindow(i))||!!this.options.ignoreVisit(o+r,{el:i,event:s})}handleLinkClick(t){const i=t.delegateTarget,{href:s,url:n,hash:o}=y.fromElement(i);if(this.shouldIgnoreVisit(s,{el:i,event:t}))return;if(this.navigating&&n===this.visit.to.url)return void t.preventDefault();const r=this.createVisit({to:n,hash:o,el:i,event:t});t.metaKey||t.ctrlKey||t.shiftKey||t.altKey?this.hooks.callSync("link:newtab",r,{href:s}):t.button===0&&this.hooks.callSync("link:click",r,{el:i,event:t},()=>{var a;const l=(a=r.from.url)!=null?a:"";t.preventDefault(),n&&n!==l?this.isSameResolvedUrl(n,l)||this.performNavigation(r):o?this.hooks.callSync("link:anchor",r,{hash:o},()=>{S(n+o),this.scrollToContent(r)}):this.hooks.callSync("link:self",r,void 0,()=>{this.options.linkToSelf==="navigate"?this.performNavigation(r):(S(n),this.scrollToContent(r))})})}handlePopState(t){var i,s,n,o;const r=(i=(s=t.state)==null?void 0:s.url)!=null?i:window.location.href;if(this.options.skipPopStateHandling(t)||this.isSameResolvedUrl(v(),this.currentPageUrl))return;const{url:a,hash:l}=y.fromUrl(r),c=this.createVisit({to:a,hash:l,event:t});c.history.popstate=!0;const h=(n=(o=t.state)==null?void 0:o.index)!=null?n:0;h&&h!==this.currentHistoryIndex&&(c.history.direction=h-this.currentHistoryIndex>0?"forwards":"backwards",this.currentHistoryIndex=h),c.animation.animate=!1,c.scroll.reset=!1,c.scroll.target=!1,this.options.animateHistoryBrowsing&&(c.animation.animate=!0,c.scroll.reset=!0),this.hooks.callSync("history:popstate",c,{event:t},()=>{this.performNavigation(c)})}triggerWillOpenNewWindow(t){return!!t.matches('[download], [target="_blank"]')}}const pt=Object.freeze(Object.defineProperty({__proto__:null,default:dt},Symbol.toStringTag,{value:"Module"}));export{pt as S,dt as _,y as l,v as n,N as w};

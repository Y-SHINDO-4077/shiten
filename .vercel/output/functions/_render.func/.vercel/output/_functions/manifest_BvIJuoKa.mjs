import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_HsTSqLAI.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"article/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/article","isIndex":true,"type":"page","pattern":"^\\/article\\/?$","segments":[[{"content":"article","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/article/index.astro","pathname":"/article","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/assets/page.0lQYdXOA.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://shiten-murex.vercel.app/","base":"/","trailingSlash":"ignore","compressHTML":false,"componentMetadata":[["/Users/yutaroshindo/shiten/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/yutaroshindo/shiten/src/pages/article/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/yutaroshindo/shiten/src/pages/article/index.astro",{"propagation":"none","containsHead":true}],["/Users/yutaroshindo/shiten/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000empty-middleware":"_empty-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_BvIJuoKa.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_QQkaUDkX.mjs","\u0000@astro-page:src/pages/article/index@_@astro":"chunks/index_szW4ZdXm.mjs","\u0000@astro-page:src/pages/article/[...slug]@_@astro":"chunks/_.._5uONWC9B.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_V1w90BFu.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_Mqgn7Yew.mjs","/Users/yutaroshindo/shiten/node_modules/@swup/astro/dist/client/SwupBodyClassPlugin.js":"assets/SwupBodyClassPlugin.gAnWOPS8.js","/Users/yutaroshindo/shiten/node_modules/@swup/astro/dist/client/SwupFadeTheme.js":"assets/SwupFadeTheme._032ZeYq.js","/astro/hoisted.js?q=0":"assets/hoisted.zQwZGxhG.js","astro:scripts/page.js":"assets/page.0lQYdXOA.js","/Users/yutaroshindo/shiten/node_modules/@swup/astro/dist/client/SwupHeadPlugin.js":"assets/SwupHeadPlugin.ly5s1JLx.js","/Users/yutaroshindo/shiten/node_modules/@swup/astro/dist/client/SwupA11yPlugin.js":"assets/SwupA11yPlugin.BfI2ApuR.js","/Users/yutaroshindo/shiten/node_modules/@swup/astro/dist/client/SwupPreloadPlugin.js":"assets/SwupPreloadPlugin.DsGWvH8J.js","astro:scripts/before-hydration.js":""},"assets":["/assets/card_img.HiQkPs_z.jpg","/assets/about_info_img_03.pK3uI_bX.jpg","/assets/logo.mBvat_6b.svg","/assets/about_info_img_02.n5jvMB32.jpg","/assets/about_img_01.oLddpCxw.jpg","/assets/about_img_02.ovK4PY1-.jpg","/assets/about_info_img_01.3EeBexO6.jpg","/assets/about_info_img_04.FeLg53vJ.jpg","/assets/aichi_map.yHn9XIdD.png","/assets/top_icon_03.FRowO_gJ.svg","/assets/top_icon_02.HUAKJfTu.svg","/assets/top_icon_05.aLNHBr0C.svg","/assets/top_icon_01.79_sYt4A.svg","/assets/top_icon_04.vRbmNq0G.svg","/assets/top_icon_06.-wjXEia3.svg","/assets/PAGETOP.lnqkKVWI.svg","/assets/ear-listen-solid.AJK2QLVE.svg","/assets/circle-info-solid.L6LmDESd.svg","/assets/map-point-wave.FAsN3M-J.svg","/assets/Arrow.8w0oUPU2.svg","/assets/url_logo.DCMgKe_R.svg","/assets/line_logo.O--q5pXk.svg","/assets/facebook_logo.95nyOM9c.svg","/assets/x_logo.5qfWAFRf.svg","/assets/menu_icon_01.zJGbvXkS.svg","/assets/menu_icon_03.msOFQLki.svg","/assets/menu_icon_04.mXDnmmwL.svg","/assets/menu_icon_02.E44tHHVN.svg","/assets/menu_icon_05.oDmtUVp9.svg","/assets/menu_icon_06.xTOINUGU.svg","/assets/house-solid.p3TupR1R.svg","/OGP.png","/favicon.png","/mv_pc.jpg","/mv_sp.jpg","/assets/Swup.cJ7eU8uv.js","/assets/SwupA11yPlugin.BfI2ApuR.js","/assets/SwupBodyClassPlugin.gAnWOPS8.js","/assets/SwupFadeTheme._032ZeYq.js","/assets/SwupHeadPlugin.ly5s1JLx.js","/assets/SwupPreloadPlugin.DsGWvH8J.js","/assets/index.modern.tDqvxRAW.js","/assets/page.0lQYdXOA.js","/assets/page.0lQYdXOA.js","/article/index.html","/index.html","/about/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };

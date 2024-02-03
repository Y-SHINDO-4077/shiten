import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderSlot, k as renderHead, u as unescapeHTML } from '../astro_HsTSqLAI.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_PBjL_1Xw.mjs';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_PBjL_1Xw.mjs'
    ).then(n => n.g).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$9 = createAstro("https://example.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/yutaroshindo/shiten/node_modules/astro/components/Image.astro", void 0);

const $$Astro$8 = createAstro("https://example.com");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}>
	${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })}
	<img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}>
</picture>`;
}, "/Users/yutaroshindo/shiten/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///Users/yutaroshindo/shiten/.vercel/output/static/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$7 = createAstro("https://example.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/blog-placeholder-1.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="generator"${addAttribute(Astro2.generator, "content")}>

<!-- Canonical URL -->
<link rel="canonical"${addAttribute(canonicalURL, "href")}>

<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title"${addAttribute(title, "content")}>
<meta name="description"${addAttribute(description, "content")}>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url"${addAttribute(Astro2.url, "content")}>
<meta property="og:title"${addAttribute(title, "content")}>
<meta property="og:description"${addAttribute(description, "content")}>
<meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url"${addAttribute(Astro2.url, "content")}>
<meta property="twitter:title"${addAttribute(title, "content")}>
<meta property="twitter:description"${addAttribute(description, "content")}>
<meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "/Users/yutaroshindo/shiten/src/components/BaseHead.astro", void 0);

const Logo = new Proxy({"src":"/assets/logo.mBvat_6b.svg","width":308,"height":59,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/logo.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$6 = createAstro("https://example.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="l-header">
	<div class="p-header__title">
		<a href="/">
			${renderComponent($$result, "Image", $$Image, { "src": Logo, "alt": "SHITEN" })}
			<p class="p-header__subtitle">いままで知らなかった、まちの視点</p>
		</a>
	</div>
	<button class="p-hamburger js-hamburgerButton">
		<span class="p-hamburger__bar p-hamburger__bar--primary"></span>
		<span class="p-hamburger__bar p-hamburger__bar--secondary"></span>
		<span class="p-hamburger__bar p-hamburger__bar--territary"></span>
		<span class="p-hamburger__menu">MENU</span>
	</button>
	<nav class="p-header__navigation">
		<ul class="p-header__navigation-list l-section-inner">
			<li class="p-header__navigation-item"><a href="/article">視点の専門家に聞く</a></li>
			<li class="p-header__navigation-item"><a href="/about">SHITENとは</a></li>
			<li class="p-header__navigation-item"><a href="/terms">利用規約</a></li>
			<li class="p-header__navigation-item"><a href="/privacy">プライバシーポリシー</a></li>
			<li class="p-header__navigation-item"><a href="/contact">Contact</a></li>
		</ul>
	</nav>
</header>`;
}, "/Users/yutaroshindo/shiten/src/components/Header.astro", void 0);

const $$Astro$5 = createAstro("https://example.com");
const $$ContentWrapper = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ContentWrapper;
  return renderTemplate`${maybeRenderHead()}<div class="l-section-inner">
  ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "/Users/yutaroshindo/shiten/src/components/ContentWrapper.astro", void 0);

const $$Astro$4 = createAstro("https://example.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const today = /* @__PURE__ */ new Date();
  return renderTemplate`${maybeRenderHead()}<footer class="l-footer">
	${renderComponent($$result, "ContentWrapper", $$ContentWrapper, {}, { "default": ($$result2) => renderTemplate`
		<div class="p-footer">
			<div class="p-footer__logo">
				<a href="/">
					${renderComponent($$result2, "Image", $$Image, { "src": Logo, "alt": "SHITEN", "width": "208", "height": "48" })}
				</a>
			</div>
			<ul class="p-footer__navigation">
					<li class="p-footer__navigation-item"><a href="/article">視点の専門家に聞く</a></li>
					<li class="p-footer__navigation-item"><a href="/about">SHITENとは</a></li>
					<li class="p-footer__navigation-item"><a href="/terms">利用規約</a></li>
					<li class="p-footer__navigation-item"><a href="/privacy">プライバシーポリシー</a></li>
					<li class="p-footer__navigation-item"><a href="/contact">Contact</a></li>
			</ul>
		</div>
		<p class="p-footer__copyright">
			<small>&copy; ${today.getFullYear()} SHITEN. All rights reserved.</small>
		</p>
	` })}
</footer>`;
}, "/Users/yutaroshindo/shiten/src/components/Footer.astro", void 0);

const SITE_TITLE = "SHITEN";
const SITE_DESCRIPTION = "SHITEN いままで知らなかった、まちの視点";

const $$Astro$3 = createAstro("https://example.com");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  return renderTemplate`<html lang="ja">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
		
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
	${renderHead()}</head>
	<body>
		${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}
		<main class="l-main">
			${renderSlot($$result, $$slots["default"])}
		</main>
		${renderComponent($$result, "Footer", $$Footer, {})}
	</body></html>`;
}, "/Users/yutaroshindo/shiten/src/layouts/BaseLayout.astro", void 0);

const Ear = new Proxy({"src":"/assets/ear-listen-solid.AJK2QLVE.svg","width":60,"height":60,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/ear-listen-solid.svg";
							}
							
							return target[name];
						}
					});

const Info = new Proxy({"src":"/assets/circle-info-solid.L6LmDESd.svg","width":60,"height":60,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/circle-info-solid.svg";
							}
							
							return target[name];
						}
					});

const Map = new Proxy({"src":"/assets/map-point-wave.FAsN3M-J.svg","width":60,"height":57,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/map-point-wave.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro("https://example.com");
const $$Heading = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Heading;
  const IconArray = [
    {
      icon: "ear",
      src: Ear
    },
    {
      icon: "info",
      src: Info
    },
    {
      icon: "map",
      src: Map
    }
  ];
  const { heading, type, icon = "ear", className } = Astro2.props;
  return renderTemplate`${type === "h1" ? renderTemplate`${maybeRenderHead()}<h1${addAttribute(`c-heading-h1 ${className}`, "class")}><span class="c-heading-h1__icon">${IconArray.find((item) => item.icon === icon)?.src && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": IconArray.find((item) => item.icon === icon)?.src, "alt": "" })}`}</span>
		${unescapeHTML(heading)}</h1>` : type === "h2" ? renderTemplate`<h2${addAttribute(`c-heading-h2 ${className}`, "class")}><span class="c-heading-h2__icon">${IconArray.find((item) => item.icon === icon)?.src && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": IconArray.find((item) => item.icon === icon)?.src, "alt": "" })}`}</span>
		${unescapeHTML(heading)}</h2>` : renderTemplate`<h3${addAttribute(`c-heading-h3 ${className}`, "class")}><span class="c-heading-h3__icon">${IconArray.find((item) => item.icon === icon)?.src && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": IconArray.find((item) => item.icon === icon)?.src, "alt": "" })}`}</span>
		${unescapeHTML(heading)}</h3>`}`;
}, "/Users/yutaroshindo/shiten/src/components/Heading.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$Text = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Text;
  const { className, lineHeight = "base" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(`c-paragraph  c-paragraph--${lineHeight} ${className}`, "class")}>
	${renderSlot($$result, $$slots["default"])}
</p>`;
}, "/Users/yutaroshindo/shiten/src/components/Text.astro", void 0);

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate`
	${renderComponent($$result2, "ContentWrapper", $$ContentWrapper, {}, { "default": ($$result3) => renderTemplate`
		${maybeRenderHead()}<section class="p-top-info u-margin__top--sp56 u-margin__top144">
			${renderComponent($$result3, "Heading", $$Heading, { "type": "h2", "heading": `<img src=${Logo.src} alt="SHITEN" width="320" height="72" />\u3068\u306F`, "icon": "info" })}
			${renderComponent($$result3, "Text", $$Text, { "lineHeight": "loose", "className": "u-margin__top--sp24 u-margin__top32" }, { "default": ($$result4) => renderTemplate`
				暮らしているまちを楽しむには、どうしたらいいのだろう。<br>
				まちを楽しむには「視点」が必要なのでは？
				<br>
				そのような仮説に基づいて、記事を更新したり、みなさんの
				<br>Instagramでの投稿に基づいてMAP化したりして楽しむまちのポータルメディアです。
			` })}
		</section>
	` })}
` })}`;
}, "/Users/yutaroshindo/shiten/src/pages/about.astro", void 0);

const $$file = "/Users/yutaroshindo/shiten/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ContentWrapper as $, Logo as L, SITE_TITLE as S, $$Heading as a, $$Text as b, SITE_DESCRIPTION as c, $$BaseLayout as d, $$Image as e, about as f, getConfiguredImageService as g, imageConfig as i };

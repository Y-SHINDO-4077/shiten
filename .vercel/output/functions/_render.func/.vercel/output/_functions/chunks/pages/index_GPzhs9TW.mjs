import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, u as unescapeHTML, F as Fragment } from '../astro_HsTSqLAI.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$ContentWrapper, a as $$Heading, b as $$Text, S as SITE_TITLE, c as SITE_DESCRIPTION, d as $$BaseLayout, L as Logo, e as $$Image } from './about_Gp2UJqGI.mjs';
/* empty css                          */

const $$Astro$5 = createAstro("https://example.com");
const $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}>
	${date.toLocaleDateString("ja", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
</time>`;
}, "/Users/yutaroshindo/shiten/src/components/FormattedDate.astro", void 0);

const $$Astro$4 = createAstro("https://example.com");
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Card;
  const { url, title, image, role, description, date } = Astro2.props;
  const articleDate = new Date(date);
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="p-card">
	<div class="p-card__image">
		<img${addAttribute(image, "src")} alt="">
	</div>
	<p class="p-card__role">${role}</p>
	<h3 class="p-card__title">
		${title}
		<span class="p-card__compellation">さん</span>
	</h3>
	${renderComponent($$result, "Fragment", Fragment, { "class": "p-card__description" }, { "default": ($$result2) => renderTemplate`${unescapeHTML(description)}` })}
	<p class="p-card__date">
		${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": articleDate })}
	</p>
</a>`;
}, "/Users/yutaroshindo/shiten/src/components/Card.astro", void 0);

const CardImg = new Proxy({"src":"/assets/card_img.vSIfJCPI.jpg","width":744,"height":430,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/card_img.jpg";
							}
							
							return target[name];
						}
					});

const $$Astro$3 = createAstro("https://example.com");
const prerender$1 = false;
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$1;
  let response = await fetch("https://dooshin.net/shiten_wp/wp-json/wp/v2/posts?context=embed&acf_format=standard");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let posts = await response.json();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `\u8996\u70B9\u306E\u5C02\u9580\u5BB6\u306B\u805E\u304F | ${SITE_TITLE}`, "description": SITE_DESCRIPTION }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead()}<section class="u-margin__top144 u-margin__bottom96">
		${renderComponent($$result2, "ContentWrapper", $$ContentWrapper, {}, { "default": ($$result3) => renderTemplate`
			${renderComponent($$result3, "Heading", $$Heading, { "type": "h1", "heading": "\u8996\u70B9\u306E\u5C02\u9580\u5BB6\u306B\u805E\u304F", "icon": "ear", "className": "u-margin__inline" })}
			${renderComponent($$result3, "Text", $$Text, { "className": "u-margin__top32" }, { "default": ($$result4) => renderTemplate`まちを楽しむには「視点」が必要なのでは？面白いマニアックなまちの見方、楽しめるまちの見方を持っている方々の記事はこちらから。` })}
			<ul class="l-grid u-margin__top72">
				${posts.map((post) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`
							<li class="i-grid__item">
								${renderComponent($$result4, "Card", $$Card, { "title": post.title.rendered, "url": `/article/${post.slug}`, "image": post.thumbnail_url ? post.thumbnail_url.url : { CardImg }, "role": `${post.acf.role}`, "description": post.excerpt.rendered, "date": post.date, "title": post.acf.name })}
							</li>
						` })}`)}
			</ul>
		` })}
	</section>
` })}`;
}, "/Users/yutaroshindo/shiten/src/pages/article/index.astro", void 0);

const $$file$1 = "/Users/yutaroshindo/shiten/src/pages/article/index.astro";
const $$url$1 = "/article";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	prerender: prerender$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://example.com");
const $$Mv = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Mv;
  let response = await fetch("https://dooshin.net/shiten_wp/wp-json/wp/v2/posts?per_page=3&context=embed&acf_format=standard");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let posts = await response.json();
  return renderTemplate(_a || (_a = __template(["", '<div class="p-mv">\n	', `
</div>



<script type="module">
	import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

	const slideLength = document.querySelectorAll('.p-mv .swiper-slide').length;
	window.addEventListener('DOMContentLoaded', () => {
		startAnimation(0);
	});
	const startAnimation = index => {
		let activeSlide = document.querySelectorAll('.p-mv .content')[index];
		activeSlide.classList.add('is-animated');
	};
	// \u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u7D42\u4E86
	const finishAnimation = () => {
		let activeSlides = document.querySelectorAll('.p-mv .content');
		activeSlides.forEach(activeSlides => {
			activeSlides.classList.remove('is-animated');
		});
	};

	const mySwiper = new Swiper('.p-mv .swiper', {
		loop: true,
		loopAdditionalSlides: 2,
		speed: 2000,
		effect: 'fade',
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
			waitForTransition: false,
		},
		followFinger: false,
		observeParents: true,
		on: {
			slideChange: swiper => {
				finishAnimation();
			},
			slideChangeTransitionStart: swiper => {
				startAnimation(swiper.realIndex);
			},
		},
	});
<\/script>`])), maybeRenderHead(), renderComponent($$result, "ContentWrapper", $$ContentWrapper, {}, { "default": ($$result2) => renderTemplate`
		<div class="swiper">
			<div class="swiper-wrapper">
				${posts.map((post) => {
    return renderTemplate`<div class="swiper-slide">
								<div class="slide">
									<div class="slide-media">
										<img${addAttribute(post.thumbnail_url.url, "src")} alt="" class="p-mv__icon">
									</div>
								</div>
							</div>`;
  })}
				${posts.map((post) => {
    return renderTemplate`<div class="swiper-slide">
								<div class="slide">
									<div class="slide-media">
										<img${addAttribute(post.thumbnail_url.url, "src")} alt="" class="p-mv__icon">
									</div>
								</div>
							</div>`;
  })}
			</div>

			<div class="content-wrapper">
				${posts.map((post) => {
    let posttitle = post.title.rendered;
    let pattern = " ";
    let posttitleArray = [];
    if (posttitle.match(pattern)) {
      posttitleArray = posttitle.split(pattern);
    } else {
      posttitleArray = [posttitle];
    }
    return renderTemplate`<div class="content">
								<a class="content-link"${addAttribute(`/article/${post.slug}`, "href")}>
									<p class="content-text">
										<span class="content-text__marker">
											${posttitleArray.slice(0, 2).map((word) => renderTemplate`<span class="content-text__markerBg">${word}</span>`)}
										</span>
									</p>
								</a>
							</div>`;
  })}
				${posts.map((post) => {
    let posttitle = post.title.rendered;
    let pattern = " ";
    let posttitleArray = [];
    if (posttitle.match(pattern)) {
      posttitleArray = posttitle.split(pattern);
    } else {
      posttitleArray = [posttitle];
    }
    return renderTemplate`<div class="content">
								<a class="content-link"${addAttribute(`/article/${post.slug}`, "href")}>
									<p class="content-text">
										<span class="content-text__marker">
											${posttitleArray.slice(0, 2).map((word) => renderTemplate`<span class="content-text__markerBg">${word}</span>`)}
										</span>
									</p>
								</a>
							</div>`;
  })}
			</div>
		</div>
	` }));
}, "/Users/yutaroshindo/shiten/src/components/mv.astro", void 0);

const Arrow = new Proxy({"src":"/assets/Arrow.8w0oUPU2.svg","width":61,"height":15,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/Arrow.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro("https://example.com");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const { url, title, className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")}${addAttribute(`c-button ${className}`, "class")}>
	${title}
	<span class="c-button__arrow">
		<img${addAttribute(Arrow.src, "src")} alt="">
	</span>
</a>`;
}, "/Users/yutaroshindo/shiten/src/components/Button.astro", void 0);

const AboutImg01 = new Proxy({"src":"/assets/about_img_01.YBh4Bc7Z.jpg","width":744,"height":480,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/about_img_01.jpg";
							}
							
							return target[name];
						}
					});

const AboutImg02 = new Proxy({"src":"/assets/about_img_02.JCB-d38_.jpg","width":744,"height":480,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/about_img_02.jpg";
							}
							
							return target[name];
						}
					});

const AboutImg03 = new Proxy({"src":"/assets/about_img_03.GlDIyaQV.jpg","width":744,"height":480,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/about_img_03.jpg";
							}
							
							return target[name];
						}
					});

const AichiMap = new Proxy({"src":"/assets/aichi_map.aFmO78Qs.png","width":2027,"height":1325,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yutaroshindo/shiten/src/assets/images/aichi_map.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let response = await fetch("https://dooshin.net/shiten_wp/wp-json/wp/v2/posts?context=embed&acf_format=standard");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let posts = await response.json();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate`
	${renderComponent($$result2, "MV", $$Mv, {})}
	${renderComponent($$result2, "ContentWrapper", $$ContentWrapper, {}, { "default": ($$result3) => renderTemplate`
		${maybeRenderHead()}<section class="p-top-articles u-margin__top--sp56 u-margin__top144">
			${renderComponent($$result3, "Heading", $$Heading, { "type": "h2", "heading": "\u8996\u70B9\u306E\u5C02\u9580\u5BB6\u306B\u805E\u304F", "icon": "ear" })}
			${renderComponent($$result3, "Text", $$Text, { "className": "u-margin__top--sp24 u-margin__top32" }, { "default": ($$result4) => renderTemplate`まちを楽しむには「視点」が必要なのでは？面白いマニアックなまちの見方、楽しめるまちの見方を持っている方々の記事はこちらから。 ` })}
			<div class="l-grid u-margin__top40">
				${posts.map((post) => renderTemplate`<article class="l-grid__item">
							${renderComponent($$result3, "Card", $$Card, { "title": post.title.rendered, "url": `/article/${post.slug}`, "image": post.thumbnail_url ? post.thumbnail_url.url : { CardImg }, "role": `${post.acf.role}`, "description": post.excerpt.rendered, "date": post.date, "title": post.acf.name })}
						</article>`)}
			</div>
			<div class="p-button u-center">
				${renderComponent($$result3, "Button", $$Button, { "url": "/article", "title": "\u4E00\u89A7\u306F\u3053\u3061\u3089", "className": "u-margin__topsp44  u-margin__top64" })}
			</div>
		</section>
		<section class="p-top-info u-margin__top--sp56 u-margin__top144">
			${renderComponent($$result3, "Heading", $$Heading, { "type": "h2", "heading": `<img src=${Logo.src} alt="SHITEN" width="320" height="72" />\u3068\u306F`, "icon": "info" })}
			${renderComponent($$result3, "Text", $$Text, { "lineHeight": "loose", "className": "u-margin__top--sp24 u-margin__top32" }, { "default": ($$result4) => renderTemplate`
				暮らしているまちを楽しむには、どうしたらいいのだろう。<br>
				まちを楽しむには「視点」が必要なのでは？
				<br>
				そのような仮説に基づいて、記事を更新したり、みなさんの
				<br>Instagramでの投稿に基づいてMAP化したりして楽しむまちのポータルメディアです。
			` })}
			<div class="p-button u-center">
				${renderComponent($$result3, "Button", $$Button, { "url": "/about", "title": "\u8A73\u3057\u304F\u306F\u3053\u3061\u3089", "className": "u-margin__topsp44  u-margin__top64" })}
			</div>
		</section>
		<section class="p-top-map u-margin__top--sp56 u-margin__top144 u-margin__bottom--sp56 u-margin__bottom96">
			${renderComponent($$result3, "Heading", $$Heading, { "type": "h2", "heading": "\u307F\u3093\u306A\u306E\u8996\u70B9MAP", "icon": "map" })}
			<div class="p-top-map__insta u-margin__top--sp16 u-margin__top24">
				<div class="l-grid">
					<div class="l-grid__item">
						${renderComponent($$result3, "Image", $$Image, { "src": AboutImg01, "alt": "" })}
					</div>
					<div class="l-grid__item">
						${renderComponent($$result3, "Image", $$Image, { "src": AboutImg02, "alt": "" })}
					</div>
					<div class="l-grid__item">
						${renderComponent($$result3, "Image", $$Image, { "src": AboutImg03, "alt": "" })}
					</div>
					<div class="l-grid__item">
						${renderComponent($$result3, "Image", $$Image, { "src": AboutImg01, "alt": "" })}
					</div>
					<div class="l-grid__item">
						${renderComponent($$result3, "Image", $$Image, { "src": AboutImg02, "alt": "" })}
					</div>
					<div class="l-grid__item">
						${renderComponent($$result3, "Image", $$Image, { "src": AboutImg03, "alt": "" })}
					</div>
				</div>
			</div>
			<div class="u-margin__top64 u-margin__top--sp96 p-map">
				${renderComponent($$result3, "Image", $$Image, { "src": AichiMap, "alt": "\u611B\u77E5\u770C\u306E\u5730\u56F3" })}
			</div>
		</section>
	` })}
` })}`;
}, "/Users/yutaroshindo/shiten/src/pages/index.astro", void 0);

const $$file = "/Users/yutaroshindo/shiten/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$FormattedDate as $, index as a, index$1 as i };

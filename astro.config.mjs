import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// import sitemap from '@astrojs/sitemap';

import swup from '@swup/astro';

import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://shiten-murex.vercel.app/',
	integrations: [
		//sitemap(),
		relativeLinks(),
		swup({
			smoothScrolling: false,
			updateBodyClass: true,
			reloadScripts: false,
		}),
	],
	vite: {
		server: {
			fs: {
				strict: false,
			},
		},
	},
	base: '/',
	outDir: './dist',
	output: 'server',
	adapter: vercel({
		edgeMiddleware: true,
		webAnalytics: {
			enabled: true,
		},
		maxDuration: 8,
	}),
	compressHTML: false,
	trailingSlash: 'ignore',
	build: {
		assets: 'assets',
		inlineStylesheets: 'always',
		cssCodeSplit: false,
	},
});

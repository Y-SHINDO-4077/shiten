import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import sitemap from '@astrojs/sitemap';

import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [sitemap(), relativeLinks()],
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
	adapter: vercel(),
	compressHTML: false,
	trailingSlash: 'ignore',
	build: {
		assets: 'assets',
		inlineStylesheets: 'always',
		cssCodeSplit: false,
	},
});

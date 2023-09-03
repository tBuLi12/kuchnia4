import adapterStatic from '@sveltejs/adapter-static';
import adapterAuto from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter:
			process.env.VITE_SK_ADAPTER === 'static'
				? adapterStatic({ fallback: 'index.html' })
				: adapterAuto(),
		csrf: { checkOrigin: false }
	}
};

export default config;

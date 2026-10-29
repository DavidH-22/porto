import adapterNode from '@sveltejs/adapter-node';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Cek apakah build ditujukan untuk Cloudflare
const isCloudflare = process.env.BUILD_TARGET === 'cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Pakai adapter-cloudflare jika BUILD_TARGET=cloudflare, selain itu pakai adapter-node
		adapter: isCloudflare ? adapterCloudflare() : adapterNode()
	}
};

export default config;
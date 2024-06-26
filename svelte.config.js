import adapter from '@sveltejs/adapter-auto';
import autoImport from 'sveltekit-autoimport';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	preprocess:[
		autoImport({
			components: [
				{ name: './src/components', flat: true },
				{ name: './src/lib/components', flat: true }
			 ],
			mapping:{
				Icon: `import Icon from '@iconify/svelte'`
			}
		}),
	]
};

export default config;

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoImport from 'sveltekit-autoimport';

export default defineConfig({
	plugins: [
		autoImport({
			components: [{ name: './src/components', flat: true } ],
			mapping:{
				Icon: `import Icon from '@iconify/svelte'`
			}
		}),
		sveltekit()
	]
});

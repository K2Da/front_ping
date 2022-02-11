import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    appDir: 'app',
    paths: { base: '/center_pin_g' },
    serviceWorker: { register: false },
  },
};

export default config;

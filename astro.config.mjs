import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import clickDirective from './astro-directive/register.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://civictechlab.org',
  integrations: [react(), mdx(), clickDirective()],
});

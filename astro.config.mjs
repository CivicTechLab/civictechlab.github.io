import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import clickDirective from './astro-directive/register.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [react(), mdx(), sitemap(), clickDirective()],
});

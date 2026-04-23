import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Cambiar SITE al dominio final cuando se publique (ej: https://pl-abogados.com)
// Si se despliega con GitHub Pages bajo adsbythomas/Estudio, el sitio queda en
// https://adsbythomas.github.io/Estudio/  → en ese caso setear base: '/Estudio'.
const SITE = process.env.SITE_URL || 'https://adsbythomas.github.io';
const BASE = process.env.BASE_PATH || '/Estudio';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

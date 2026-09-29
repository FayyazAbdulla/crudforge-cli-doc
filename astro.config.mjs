// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

/** Brand violet sampled from CRUDForge logo artwork. */
const BRAND = '#791EFF';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.crudforge.dev',
  integrations: [
    starlight({
      title: 'CRUDForge',
      description:
        'Generate Fuse Angular CRUD apps from JDL — Keycloak auth, IAM overlay, and clean admin UX.',
      favicon: '/favicon.png',
      logo: {
        src: './src/assets/logo.png',
        alt: 'CRUDForge',
        replacesTitle: true,
      },
      social: [
        {
          icon: 'github',
          label: 'CRUDForge CLI',
          href: 'https://github.com/TeamCodeMe/crud-fordge',
        },
      ],
      customCss: ['./src/styles/brand.css'],
      editLink: {
        baseUrl: 'https://github.com/TeamCodeMe/crud-fordge-doc/edit/main/',
      },
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Install', slug: 'getting-started/install' },
            { label: 'Generate your first app', slug: 'getting-started/first-app' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'CLI commands', slug: 'guides/cli' },
            { label: 'Configuration', slug: 'guides/configuration' },
            { label: 'Keycloak & IAM', slug: 'guides/auth-keycloak' },
            { label: 'Session & disabled account', slug: 'guides/session' },
            { label: 'QA & Playwright', slug: 'guides/qa' },
            { label: 'Branding & theme', slug: 'guides/branding' },
          ],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
        {
          label: 'Agent team',
          items: [
            { label: 'How agents work here', slug: 'agents/overview' },
            { label: 'Roles & handoffs', slug: 'agents/roles' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: BRAND },
        },
      ],
    }),
  ],
});

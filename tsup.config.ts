import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles/tokens.css'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'react-i18next',
    '@radix-ui/react-dialog',
    '@radix-ui/react-tabs',
    'lucide-react',
    '@icons-pack/react-simple-icons',
    'clsx',
    'tailwind-merge',
  ],
  minify: true,
});

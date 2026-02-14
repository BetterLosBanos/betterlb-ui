# @betterlb/ui

A shared UI component library for BetterLB portals (municipal and university).

## Installation

```bash
npm install @betterlb/ui
```

## Features

- **Config-driven components**: No hardcoded LGU settings - pass configuration as props
- **TypeScript**: Full type safety with strict mode enabled
- **Tailwind CSS**: Design tokens included via CSS variables
- **Accessible**: WCAG AA compliant components
- **React 19**: Built for latest React with peer dependencies

## Usage

### 1. Import Design Tokens

In your app's CSS file:

```css
@import '@betterlb/ui/styles';
```

### 2. Configure Your LGU

Create a config object matching the `LGUConfig` interface:

```typescript
import { LGUConfig } from '@betterlb/ui';

const config: LGUConfig = {
  lgu: {
    name: 'Los Baños',
    fullName: 'Municipality of Los Baños',
    province: 'Laguna',
    region: 'CALABARZON',
    regionCode: 'IV-A',
    type: 'municipality',
    logoPath: '/logos/your-logo.png',
    officialWebsite: 'https://losbanos.gov.ph',
    provinceWebsite: 'https://laguna.gov.ph',
  },
  portal: {
    name: 'BetterLB',
    domain: 'betterlb.ph',
    baseUrl: 'https://betterlb.ph',
    tagline: 'Your Gateway to Los Baños',
    description: 'Community-run portal',
    brandColor: '#2563eb',
    navbarTagline: 'Municipality of Los Baños',
    footerBrandName: 'BetterLB',
    footerTagline: 'For the People',
    logoWhitePath: '/logos/white-logo.png',
  },
  location: {
    coordinates: { lat: 14.1843, lon: 121.2413 },
    weather: { defaultCity: 'Los Banos' },
  },
  features: {
    openLGU: true,
    transparency: true,
    tourism: false,
    statistics: true,
  },
};
```

### 3. Use Components

```tsx
import { Navbar, Footer, SidebarLayout } from '@betterlb/ui';
import { config } from './config';

function App() {
  return (
    <>
      <Navbar
        config={config}
        mainNavigation={navigation}
        languages={languages}
      />
      <main>
        {/* Your content */}
      </main>
      <Footer
        config={config}
        navigation={footerNavigation}
      />
    </>
  );
}
```

## Components

### Layout

- **Navbar**: Top navigation with mobile responsive menu
- **Footer**: Multi-column footer with social links
- **SidebarLayout**: Admin-style layout with collapsible sidebar

### UI Components

- **Button**: Primary, secondary, outline, ghost, link variants
- **Card**: Content cards with header, body, footer, image, avatar
- **Badge**: Status indicators with color variants
- **Dialog**: Modal dialogs using Radix UI
- **Tabs**: Tabbed content using Radix UI
- **Pagination**: Paginated list controls
- **EmptyState**: Empty result states with call-to-action

## Utilities

- `cn()`: Merge Tailwind classes
- `formatDate()`: Philippine locale date formatting
- `truncateText()`: Text truncation
- `getRandomNumber()`: Random number generation

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Type check
npx tsc --noEmit
```

## Peer Dependencies

You must install these in your project:

- `react@^19.0.0`
- `react-dom@^19.0.0`
- `react-router-dom@^6.22.0`
- `react-i18next@^15.0.0`
- `@radix-ui/react-dialog@^1.0.5`
- `@radix-ui/react-tabs@^1.0.4`
- `lucide-react@^0.470.0`
- `@icons-pack/react-simple-icons@^13.7.0`
- `clsx@^2.1.0`
- `tailwind-merge@^2.2.0`

## License

MIT

## Author

BetterLB - Community Open Source Initiative

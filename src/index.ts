// ============================================================================
// TYPES
// ============================================================================
export type { LGUConfig, NavigationItem, FooterNavigation } from './types';

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================
export { default as Navbar } from './components/Navbar';
export type { NavbarProps } from './components/Navbar';

export { default as Footer } from './components/Footer';
export type { FooterProps } from './components/Footer';

export { default as SidebarLayout } from './components/SidebarLayout';
export type { SidebarLayoutProps } from './components/SidebarLayout';

// ============================================================================
// UI COMPONENTS
// ============================================================================
export { default as Button } from './components/ui/Button';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardImage,
  CardAvatar,
  CardTitle,
  CardDescription,
  CardContactInfo,
  CardGrid,
  CardList,
  CardDivider,
} from './components/ui/Card';
export type {
  CardProps,
  CardTitleProps,
  CardGridProps,
  ContactInfo,
} from './components/ui/Card';

export { Badge } from './components/ui/Badge';
export type { BadgeProps, BadgeVariant } from './components/ui/Badge';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/Dialog';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';

export {
  PaginationControls,
} from './components/ui/Pagination';
export type { PaginationProps } from './components/ui/Pagination';

export { EmptyState } from './components/ui/EmptyState';
export type { EmptyStateProps } from './components/ui/EmptyState';

// ============================================================================
// UTILITIES
// ============================================================================
export { cn, formatDate, truncateText, getRandomNumber } from './lib/utils';

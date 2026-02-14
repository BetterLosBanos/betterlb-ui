import * as react from 'react';
import { FC, ReactNode, ButtonHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { LucideIcon } from 'lucide-react';
import { ClassValue } from 'clsx';

/**
 * LGU Configuration Interface
 *
 * Defines the structure for local government unit configuration.
 * This allows the UI components to be flexible across different LGUs.
 */
interface LGUConfig {
    lgu: {
        name: string;
        fullName: string;
        province: string;
        districtEngineeringOffice?: string;
        region: string;
        regionCode: string;
        type: 'municipality' | 'city' | 'university';
        logoPath: string;
        officialWebsite: string;
        provinceWebsite: string;
    };
    portal: {
        name: string;
        domain: string;
        baseUrl: string;
        tagline: string;
        description: string;
        brandColor: string;
        navbarTagline: string;
        footerBrandName: string;
        footerTagline: string;
        logoWhitePath: string;
    };
    location: {
        coordinates: {
            lat: number;
            lon: number;
        };
        weather: {
            defaultCity: string;
        };
    };
    transparency?: {
        procurement?: {
            organizationName: string;
            externalDashboard: string;
        };
        infrastructure?: {
            searchString: string;
            exactMatchTargets: string[];
        };
    };
    dataPaths?: Record<string, string>;
    features: {
        openLGU: boolean;
        transparency: boolean;
        tourism: boolean;
        statistics: boolean;
    };
}
/**
 * Navigation item interface
 */
interface NavigationItem {
    label: string;
    href: string;
    children?: NavigationItem[];
}
/**
 * Footer navigation interface
 */
interface FooterNavigation {
    brand: {
        title: string;
        description: string;
        cost: string;
    };
    mainSections: Array<{
        title: string;
        links: Array<{
            label: string;
            href: string;
            target?: string;
        }>;
    }>;
    socialLinks: Array<{
        label: string;
        href: string;
        target?: string;
    }>;
}

interface NavbarProps {
    config: LGUConfig;
    mainNavigation: NavigationItem[];
    languages: Record<string, {
        nativeName: string;
    }>;
}
declare const Navbar: FC<NavbarProps>;

interface FooterProps {
    config: LGUConfig;
    navigation: FooterNavigation;
}
declare const Footer: FC<FooterProps>;

interface SidebarLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
    header?: {
        title: string;
        subtitle?: string;
        actions?: ReactNode;
    };
    headerNode?: ReactNode;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    className?: string;
}
declare function SidebarLayout({ children, sidebar, header, headerNode, collapsible, defaultCollapsed, className, }: SidebarLayoutProps): react_jsx_runtime.JSX.Element;

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isLoading?: boolean;
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

/**
 * Contact information for display in cards.
 */
interface ContactInfo {
    /** Physical address location */
    address?: string | null;
    /** Phone number(s) - supports multiple numbers as an array */
    phone?: string | string[] | null;
    /** Email address for contact */
    email?: string | null;
    /** Website URL (with or without protocol) */
    website?: string | null;
}
/**
 * Props for main Card component.
 */
interface CardProps extends HTMLAttributes<HTMLElement> {
    /** Card content to be displayed */
    children: ReactNode;
    /** Visual style variant for card */
    variant?: 'default' | 'featured' | 'slate' | 'compact';
    /** Enable hover effects (elevation and border color change) */
    hover?: boolean;
}
/**
 * Props for CardTitle component.
 */
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Title text or content */
    children: ReactNode;
    /** Semantic heading level for accessibility */
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
/**
 * Props for CardGrid component.
 */
interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
    /** Cards to display in grid */
    children: ReactNode;
    /** Number of columns (responsive breakpoints applied automatically) */
    columns?: 1 | 2 | 3 | 4;
}
/**
 * Card - Main Container Component
 */
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLElement>>;
declare const CardHeader: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => react_jsx_runtime.JSX.Element;
declare const CardContent: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => react_jsx_runtime.JSX.Element;
declare const CardFooter: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => react_jsx_runtime.JSX.Element;
declare const CardImage: ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => react_jsx_runtime.JSX.Element;
declare const CardAvatar: ({ name, size, className, }: {
    name: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare const CardTitle: ({ children, level, className, ...props }: CardTitleProps) => react_jsx_runtime.JSX.Element;
declare const CardDescription: ({ children, className, }: {
    children: ReactNode;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare const CardContactInfo: ({ contact, compact, }: {
    contact: ContactInfo;
    compact?: boolean;
}) => react_jsx_runtime.JSX.Element;
declare const CardGrid: ({ children, columns, className, }: CardGridProps) => react_jsx_runtime.JSX.Element;
declare const CardList: ({ children, className, }: {
    children: ReactNode;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare const CardDivider: ({ className }: {
    className?: string;
}) => react_jsx_runtime.JSX.Element;

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'slate' | 'outline';
interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
    dot?: boolean;
}
declare function Badge({ children, variant, className, dot, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare const Dialog: react.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: react.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: react.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DialogContent: react.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: react.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & react.RefAttributes<HTMLHeadingElement>, "ref"> & react.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: react.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>, "ref"> & react.RefAttributes<HTMLParagraphElement>>;

declare const Tabs: react.ForwardRefExoticComponent<TabsPrimitive.TabsProps & react.RefAttributes<HTMLDivElement>>;
declare const TabsList: react.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: react.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: react.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    resultsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onResultsPerPageChange: (limit: number) => void;
}
declare function PaginationControls({ currentPage, totalPages, resultsPerPage, totalItems, onPageChange, onResultsPerPageChange, }: PaginationProps): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    title?: string;
    message?: string;
    actionHref?: string;
    actionLabel?: string;
    icon?: LucideIcon;
}
declare function EmptyState({ title, message, actionHref, actionLabel, // Default value
icon: Icon, }: EmptyStateProps): react_jsx_runtime.JSX.Element;

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Format a date to Philippine locale format
 */
declare function formatDate(date: Date): string;
/**
 * Truncate text to a maximum length
 */
declare function truncateText(text: string, maxLength: number): string;
/**
 * Generate a random number between min and max (inclusive)
 */
declare const getRandomNumber: (min: number, max: number) => number;

export { Badge, type BadgeProps, type BadgeVariant, Button, Card, CardAvatar, CardContactInfo, CardContent, CardDescription, CardDivider, CardFooter, CardGrid, type CardGridProps, CardHeader, CardImage, CardList, type CardProps, CardTitle, type CardTitleProps, type ContactInfo, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, EmptyState, type EmptyStateProps, Footer, type FooterNavigation, type FooterProps, type LGUConfig, Navbar, type NavbarProps, type NavigationItem, PaginationControls, type PaginationProps, SidebarLayout, type SidebarLayoutProps, Tabs, TabsContent, TabsList, TabsTrigger, cn, formatDate, getRandomNumber, truncateText };

/**
 * LGU Configuration Interface
 *
 * Defines the structure for local government unit configuration.
 * This allows the UI components to be flexible across different LGUs.
 */
export interface LGUConfig {
  lgu: {
    name: string;
    fullName: string;
    province: string;
    districtEngineeringOffice?: string;
    region: string;
    regionCode: string;
    type: "municipality" | "city" | "university";
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
    coordinates: { lat: number; lon: number };
    weather: { defaultCity: string };
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
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

/**
 * Footer navigation interface
 */
export interface FooterNavigation {
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

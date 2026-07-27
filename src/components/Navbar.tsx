import { FC, useEffect, useId, useRef, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "./ui/Button";

import { LGUConfig, NavigationItem } from "../types";
import { cn } from "../lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

export interface NavbarProps {
  config: LGUConfig;
  mainNavigation: NavigationItem[];
  languages: Record<string, { nativeName: string }>;
}

const Navbar: FC<NavbarProps> = ({ config, mainNavigation, languages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(
    null,
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const mobileMenuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (prev) setActiveMobileSubmenu(null);
      return !prev;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMobileSubmenu(null);
    setOpenDropdown(null);
  };

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  const isActiveRoute = (href: string) => {
    const path = location.pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    return path === target || (target !== "" && path.startsWith(target + "/"));
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveMobileSubmenu(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-xs"
      aria-label="Primary"
    >
      {/* 1. TOP BAR: Responsive & Aligned Right */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-end gap-3 sm:gap-4 md:gap-6">
            <Link
              to="/join-us"
              className={cn(
                "text-primary-600 hover:text-primary-700 hidden rounded-sm text-[10px] font-bold tracking-widest whitespace-nowrap uppercase md:inline-flex md:text-xs",
                focusRing,
              )}
            >
              🚀 Join Us
            </Link>
            <Link
              to="/about"
              className={cn(
                "hover:text-primary-600 hidden rounded-sm text-[10px] font-bold tracking-widest whitespace-nowrap text-slate-500 uppercase md:inline-flex md:text-xs",
                focusRing,
              )}
            >
              About
            </Link>
            <a
              href={config.lgu.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "hover:text-primary-600 inline-flex rounded-sm text-[9px] font-bold tracking-widest whitespace-nowrap text-slate-500 uppercase sm:text-[10px] md:text-xs",
                focusRing,
              )}
            >
              <span className="inline sm:hidden">Gov.ph</span>
              <span className="hidden sm:inline">Official Gov.ph</span>
            </a>
            <a
              href="https://hotlines.bettergov.ph/"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "hover:text-primary-600 inline-flex rounded-sm text-[9px] font-bold tracking-widest whitespace-nowrap text-slate-500 uppercase sm:text-[10px] md:text-xs",
                focusRing,
              )}
            >
              Hotlines
            </a>
            <div className="flex shrink-0 items-center border-l border-slate-200 pl-2">
              <select
                aria-label="Select Language"
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className={cn(
                  "cursor-pointer rounded-sm bg-transparent text-[9px] font-bold tracking-widest text-slate-500 uppercase sm:text-[10px] md:text-xs",
                  focusRing,
                )}
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV: Desktop Dropdowns + Mobile Toggle */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            to="/"
            className={cn(
              "group flex max-w-[60%] min-w-0 items-center rounded-sm md:max-w-md",
              focusRing,
            )}
            onClick={closeMenu}
          >
            <img
              src={config.lgu.logoPath}
              alt={`${config.portal.name} logo`}
              className="mr-3 h-10 w-10 shrink-0 transition-transform group-hover:scale-105 md:h-12 md:w-12"
            />
            <div className="flex min-w-0 flex-col justify-center">
              <div className="text-lg leading-none font-black tracking-tighter text-slate-900 md:text-xl">
                {config.portal.name}
              </div>
              <div className="line-clamp-2 text-[9px] leading-tight font-medium text-slate-500 md:line-clamp-1 md:text-xs md:leading-normal">
                {config.portal.navbarTagline}
              </div>
            </div>
          </Link>

          <div className="hidden items-center space-x-1 lg:flex xl:space-x-4">
            {mainNavigation.map((item) => {
              const active = isActiveRoute(item.href);
              const hasChildren = Boolean(item.children?.length);
              const isDropdownOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() =>
                    hasChildren && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                  onFocus={() => hasChildren && setOpenDropdown(item.label)}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenDropdown(null);
                      (event.currentTarget.querySelector("a") as HTMLElement | null)?.focus();
                    }
                  }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 border-b-2 px-3 py-2 text-sm font-bold tracking-widest uppercase transition-all",
                      active
                        ? "text-primary-600 border-primary-600"
                        : "hover:text-primary-600 border-transparent text-slate-600",
                      focusRing,
                    )}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? isDropdownOpen : undefined}
                  >
                    {t(`navbar.${item.label.toLowerCase()}`)}
                    {hasChildren && (
                      <ChevronDownIcon
                        className={cn(
                          "h-3 w-3 transition-transform",
                          isDropdownOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {hasChildren && isDropdownOpen && (
                    <div
                      role="menu"
                      aria-label={item.label}
                      className="animate-in fade-in slide-in-from-top-2 absolute top-full left-0 w-64 rounded-b-xl border border-slate-100 bg-white py-2 shadow-xl duration-200"
                    >
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          role="menuitem"
                          to={child.href}
                          className={cn(
                            "hover:bg-primary-50 hover:text-primary-700 block px-5 py-3 text-xs font-bold tracking-wider text-slate-600 uppercase transition-colors",
                            focusRing,
                          )}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              to="/search"
              className={cn(
                "hover:text-primary-600 ml-4 rounded-sm p-3 text-slate-600 transition-colors",
                focusRing,
              )}
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <Link
              to="/search"
              className={cn("rounded-sm p-3 text-slate-600", focusRing)}
              aria-label="Search"
            >
              <SearchIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Button
              ref={menuButtonRef}
              onClick={toggleMenu}
              variant="ghost"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              className="rounded-xl bg-slate-50 p-3 text-slate-900"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id={mobileMenuId}
          className="animate-in slide-in-from-right fixed inset-0 top-[104px] z-40 overflow-y-auto bg-white duration-300 lg:hidden"
        >
          <div className="flex flex-col p-4 pb-20">
            {mainNavigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isSubOpen = activeMobileSubmenu === item.label;
              const submenuId = `${mobileMenuId}-${item.label}`;

              return (
                <div
                  key={item.label}
                  className="border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex-1 rounded-sm p-4 text-lg font-bold transition-colors",
                        isActiveRoute(item.href)
                          ? "text-primary-600"
                          : "text-slate-900",
                        focusRing,
                      )}
                    >
                      {t(`navbar.${item.label.toLowerCase()}`)}
                    </Link>
                    {hasChildren && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveMobileSubmenu(isSubOpen ? null : item.label);
                        }}
                        variant="ghost"
                        className="p-4 text-slate-400"
                        aria-label={`${isSubOpen ? "Collapse" : "Expand"} ${item.label} submenu`}
                        aria-expanded={isSubOpen}
                        aria-controls={submenuId}
                      >
                        <ChevronDownIcon
                          className={cn(
                            "h-6 w-6 transition-transform",
                            isSubOpen && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                  </div>

                  {hasChildren && isSubOpen && (
                    <div
                      id={submenuId}
                      className="animate-in slide-in-from-top-2 mx-2 mb-2 overflow-hidden rounded-2xl bg-slate-50"
                    >
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={closeMenu}
                          className={cn(
                            "block border-b border-white p-4 text-sm font-bold text-slate-600 last:border-0",
                            focusRing,
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-4 space-y-1 border-t border-slate-100 pt-4">
              <Link
                to="/join-us"
                onClick={closeMenu}
                className={cn(
                  "text-primary-600 block rounded-sm p-4 text-xs font-black tracking-widest uppercase",
                  focusRing,
                )}
              >
                🚀 Join the Revolution
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className={cn(
                  "block rounded-sm p-4 text-xs font-bold tracking-widest text-slate-500 uppercase",
                  focusRing,
                )}
              >
                About Better LB
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className={cn(
                  "block rounded-sm p-4 text-xs font-bold tracking-widest text-slate-500 uppercase",
                  focusRing,
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

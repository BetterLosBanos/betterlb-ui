import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";

import { cn } from "../../lib/utils";

interface SelectPickerOption {
  label: string;
  value: string;
}

interface SelectPickerProps {
  options: SelectPickerOption[];
  onSelect: (options: SelectPickerOption[]) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  selectedValues?: string[];
  "aria-label"?: string;
}

const SelectPicker = ({
  options,
  onSelect,
  placeholder = "Select...",
  className,
  size = "md",
  disabled = false,
  searchable = true,
  clearable = true,
  selectedValues = [],
  "aria-label": ariaLabel,
}: SelectPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<SelectPickerOption[]>(
    [],
  );
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const listboxId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const selected = options.filter((opt) =>
      selectedValues.includes(opt.value),
    );
    setSelectedOptions(selected);
  }, [selectedValues, options]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
  }, [isOpen, searchTerm]);

  useEffect(() => {
    if (!isOpen) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen]);

  const handleSelect = (option: SelectPickerOption) => {
    let updated: SelectPickerOption[];
    if (selectedOptions.some((o) => o.value === option.value)) {
      updated = selectedOptions.filter((o) => o.value !== option.value);
    } else {
      updated = [...selectedOptions, option];
    }
    setSelectedOptions(updated);
    onSelect(updated);
  };

  const handleClear = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
    onSelect([]);
    triggerRef.current?.focus();
  };

  const checkDropdownPosition = () => {
    if (!triggerRef.current) return "bottom";
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 240;
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) return "top";
    return "bottom";
  };

  const closeDropdown = (returnFocus = false) => {
    setIsOpen(false);
    setSearchTerm("");
    if (returnFocus) triggerRef.current?.focus();
  };

  const openDropdown = () => {
    if (disabled) return;
    setDropdownPosition(checkDropdownPosition());
    setIsOpen(true);
    if (searchable) setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) closeDropdown();
    else openDropdown();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const moveActive = (delta: number) => {
    if (filteredOptions.length === 0) return;
    setActiveIndex((current) => {
      const next = (current + delta + filteredOptions.length) % filteredOptions.length;
      return next;
    });
  };

  const handleListKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDropdown(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveActive(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveActive(-1);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(Math.max(0, filteredOptions.length - 1));
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option) handleSelect(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    const handleResizeOrScroll = () => {
      if (isOpen) setDropdownPosition(checkDropdownPosition());
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [isOpen]);

  const sizes = { sm: "h-9 text-sm", md: "h-11 text-base", lg: "h-14 text-lg" };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-white text-left transition-all",
            "focus-visible:ring-primary-500/20 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:outline-none",
            sizes[size],
            disabled
              ? "cursor-not-allowed bg-gray-50 opacity-60"
              : "hover:border-gray-400",
            isOpen && "border-primary-500 ring-primary-500/20 ring-2",
            clearable && selectedOptions.length > 0 ? "pr-16" : "pr-10",
            "px-3",
          )}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!isOpen) openDropdown();
            }
            if (e.key === "Escape" && isOpen) {
              e.preventDefault();
              closeDropdown();
            }
          }}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-label={ariaLabel ?? placeholder}
        >
          <span
            className={cn(
              "truncate",
              selectedOptions.length > 0 ? "text-gray-900" : "text-gray-500",
            )}
          >
            {selectedOptions.length > 0
              ? selectedOptions.map((o) => o.label).join(", ")
              : placeholder}
          </span>
          <ChevronDownIcon
            className={cn(
              "pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform duration-200",
              clearable && selectedOptions.length > 0 && "right-10",
              isOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        {clearable && selectedOptions.length > 0 && !disabled && (
          <button
            type="button"
            className="absolute top-1/2 right-8 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <XIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 max-h-60 w-full overflow-hidden rounded-lg border bg-white shadow-lg",
            dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1",
          )}
          onKeyDown={handleListKeyDown}
        >
          {searchable && (
            <div className="border-b border-gray-200 p-2">
              <div className="relative">
                <SearchIcon
                  className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="focus-visible:ring-primary-500 focus-visible:border-primary-500 w-full rounded-md border border-gray-300 py-2 pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  placeholder="Search options..."
                  aria-label="Search options"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          )}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              <ul
                id={listboxId}
                role="listbox"
                aria-multiselectable="true"
                aria-label={ariaLabel ?? placeholder}
                className="py-1"
              >
                {filteredOptions.map((option, index) => {
                  const selected = selectedOptions.some(
                    (o) => o.value === option.value,
                  );
                  return (
                    <li
                      key={option.value}
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      className={cn(
                        "cursor-pointer px-3 py-2 text-sm transition-colors",
                        "hover:bg-primary-50 hover:text-primary-700",
                        selected && "bg-primary-100 text-primary-700",
                        index === activeIndex &&
                          "ring-primary-500 ring-2 ring-inset",
                      )}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setActiveIndex(index)}
                      role="option"
                      aria-selected={selected}
                      id={`${listboxId}-option-${option.value}`}
                    >
                      {option.label}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-3 py-2 text-center text-sm text-gray-500" role="status">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPicker;

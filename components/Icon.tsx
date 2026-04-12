"use client";

// Icon component — renders Flaticon UIcons exclusively.
// Bold Rounded (`fi-br-*`): UI elements, navigation, buttons, labels.
// Solid Rounded (`fi-sr-*`): active/filled states, status icons, emphasis.
// Never use outline, thin, or sharp variants.

export type IconName =
  | "home"
  | "book"
  | "books"
  | "file"
  | "document"
  | "info"
  | "menu-burger"
  | "cross"
  | "search"
  | "user"
  | "users"
  | "users-alt"
  | "bulb"
  | "check"
  | "checkbox"
  | "arrow-right"
  | "layers"
  | "palette"
  | "message-sms"
  | "arrow-trend-up"
  | "settings"
  | "chatbot"
  | "grid"
  | "apps"
  | "computer"
  | "globe"
  | "wrench"
  | "up-right-from-square"
  | "sparkles"
  | "compass"
  | "navigation"
  | "clock"
  | "video-camera"
  | "vault"
  | "resources"
  | "text";

export type BrandIconName = "discord" | "youtube" | "behance" | "flaticon" | "github";

// Maps icon names to Flaticon UIcons class suffixes.
// All icons use Bold Rounded (fi-br-) by default; active/status icons use Solid Rounded (fi-sr-).
const iconClassMap: Record<IconName | BrandIconName, string> = {
  home: "fi fi-br-home",
  book: "fi fi-br-book-alt",
  books: "fi fi-br-book-alt",
  file: "fi fi-br-file",
  document: "fi fi-br-document",
  info: "fi fi-br-info",
  "menu-burger": "fi fi-br-menu-burger",
  cross: "fi fi-br-cross",
  search: "fi fi-br-search",
  user: "fi fi-br-user",
  users: "fi fi-br-users",
  "users-alt": "fi fi-br-users",
  bulb: "fi fi-br-bulb",
  check: "fi fi-sr-check-circle",
  checkbox: "fi fi-sr-check-circle",
  "arrow-right": "fi fi-br-arrow-right",
  layers: "fi fi-br-layers",
  palette: "fi fi-br-paint-brush",
  "message-sms": "fi fi-br-comment-alt",
  "arrow-trend-up": "fi fi-br-chart-line-up",
  settings: "fi fi-br-settings",
  chatbot: "fi fi-br-comment-alt",
  grid: "fi fi-br-grid",
  apps: "fi fi-br-apps",
  computer: "fi fi-br-computer",
  globe: "fi fi-br-globe",
  wrench: "fi fi-br-wrench",
  "up-right-from-square": "fi fi-br-arrow-up-right",
  sparkles: "fi fi-br-magic-wand",
  compass: "fi fi-br-compass",
  navigation: "fi fi-br-navigation",
  clock: "fi fi-br-clock",
  "video-camera": "fi fi-br-video-camera",
  vault: "fi fi-br-shield",
  resources: "fi fi-br-box-open",
  text: "fi fi-br-text",
  // Brand icons — closest Flaticon equivalents
  discord: "fi fi-br-comment",
  youtube: "fi fi-br-video-camera",
  behance: "fi fi-br-briefcase",
  flaticon: "fi fi-br-grid",
  github: "fi fi-br-code-branch",
};

interface IconProps {
  name: IconName | BrandIconName;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

export default function Icon({
  name,
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  const baseClass = iconClassMap[name] ?? "fi fi-br-info";
  return (
    <i
      className={`${baseClass} ${className}`.trim()}
      style={{ color: "var(--muted-foreground)", ...style }}
      aria-hidden={ariaHidden}
    />
  );
}

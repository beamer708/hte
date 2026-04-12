"use client";

// Icon system — Flaticon UIcons exclusively.
//
// Three approved styles:
//   bold   (fi fi-br-)  — navigation, labels, general UI, buttons
//   solid  (fi fi-sr-)  — active states, status indicators, selected items
//   filled (fi fi-rr-)  — decorative, cards, feature highlights, empty states
//
// Usage:
//   <Icon name="home" />                          — bold, muted color
//   <Icon name="home" variant="solid" active />   — solid, green (#52D973)
//   <Icon name="resource" variant="filled" />     — filled, muted color
//
// All icons output an <i> tag with an explicit fontSize.
// Color defaults to #888888 (muted). Pass `active` for #52D973 or override via `style`.

export type Variant = "bold" | "solid" | "filled";

// Canonical icon names used throughout the app
export type IconName =
  // Navigation
  | "home"
  | "resources"
  | "branding"
  | "discord-nav"
  | "server-growth"
  | "roleplay"
  | "about"
  | "menu-burger"
  | "cross"
  // Auth / user
  | "user"
  | "logout"
  | "discord-login"
  | "user-profile"
  | "avatar"
  // Admin
  | "settings"
  | "beta"
  | "toggle-on"
  | "toggle-off"
  | "users"
  | "revoke"
  | "blacklist"
  | "clock"
  | "analytics"
  // Status
  | "check"
  | "error"
  | "warning"
  | "pending"
  | "lock"
  | "unlock"
  // Actions
  | "copy"
  | "trash"
  | "edit"
  | "save"
  | "search"
  | "filter"
  | "sort"
  | "refresh"
  | "download"
  | "external-link"
  | "send"
  | "add"
  // Content / resources
  | "resource-card"
  | "youtube"
  | "globe"
  | "community"
  | "document"
  | "announcement"
  | "tag"
  | "star"
  // AI assistant
  | "assistant"
  | "loading"
  | "clear"
  // Discord / forum
  | "staff-application"
  | "suggestion"
  | "forum-post"
  | "role"
  | "bot"
  // Legacy aliases kept for backward compatibility
  | "book"
  | "books"
  | "file"
  | "info"
  | "users-alt"
  | "bulb"
  | "check-circle"
  | "checkbox"
  | "arrow-right"
  | "layers"
  | "palette"
  | "message-sms"
  | "arrow-trend-up"
  | "chatbot"
  | "grid"
  | "apps"
  | "computer"
  | "wrench"
  | "up-right-from-square"
  | "sparkles"
  | "compass"
  | "navigation"
  | "video-camera"
  | "vault"
  | "text"
  | "paper-plane";

// Brand icon aliases
export type BrandIconName = "discord" | "youtube-brand" | "behance" | "flaticon" | "github";

// Maps each icon name to its Flaticon suffix (the part after fi-br-/fi-sr-/fi-rr-)
// The same suffix works with any of the three approved prefixes.
const suffixMap: Record<IconName | BrandIconName, string> = {
  // Navigation
  home: "home",
  resources: "box-open",
  branding: "paint-brush",
  "discord-nav": "comment-alt",
  "server-growth": "chart-line-up",
  roleplay: "shield",
  about: "info",
  "menu-burger": "menu-burger",
  cross: "cross",
  // Auth / user
  user: "user",
  logout: "sign-out",
  "discord-login": "comment-alt",
  "user-profile": "user-pen",
  avatar: "user-headset",
  // Admin
  settings: "settings",
  beta: "test-tube",
  "toggle-on": "toggle-on",
  "toggle-off": "toggle-off",
  users: "users",
  revoke: "ban",
  blacklist: "shield-exclamation",
  clock: "clock",
  analytics: "chart-histogram",
  // Status
  check: "check-circle",
  error: "cross-circle",
  warning: "exclamation",
  pending: "time-half-past",
  lock: "lock",
  unlock: "lock-open-alt",
  // Actions
  copy: "copy",
  trash: "trash",
  edit: "edit",
  save: "disk",
  search: "search",
  filter: "filter",
  sort: "sort",
  refresh: "refresh",
  download: "download",
  "external-link": "arrow-up-right",
  send: "paper-plane",
  add: "plus",
  // Content / resources
  "resource-card": "box-open",
  youtube: "play-circle",
  globe: "globe",
  community: "users",
  document: "document",
  announcement: "megaphone",
  tag: "tag",
  star: "star",
  // AI assistant
  assistant: "comment-alt",
  loading: "spinner",
  clear: "eraser",
  // Discord / forum
  "staff-application": "id-card",
  suggestion: "bulb",
  "forum-post": "comment-dots",
  role: "badge",
  bot: "robot",
  // Legacy aliases
  book: "book-alt",
  books: "book-alt",
  file: "file",
  info: "info",
  "users-alt": "users",
  bulb: "bulb",
  "check-circle": "check-circle",
  checkbox: "check-circle",
  "arrow-right": "arrow-right",
  layers: "layers",
  palette: "paint-brush",
  "message-sms": "comment-alt",
  "arrow-trend-up": "chart-line-up",
  chatbot: "comment-alt",
  grid: "grid",
  apps: "apps",
  computer: "computer",
  wrench: "wrench",
  "up-right-from-square": "arrow-up-right",
  sparkles: "magic-wand",
  compass: "compass",
  navigation: "navigation",
  "video-camera": "video-camera",
  vault: "shield",
  text: "text",
  "paper-plane": "paper-plane",
  // Brand
  discord: "comment-alt",
  "youtube-brand": "video-camera",
  behance: "briefcase",
  flaticon: "grid",
  github: "code-branch",
};

// Default variant for each icon name.
// Defaults to "bold" unless overridden here.
const defaultVariant: Partial<Record<IconName | BrandIconName, Variant>> = {
  check: "solid",
  "check-circle": "solid",
  checkbox: "solid",
  error: "solid",
  warning: "solid",
  pending: "solid",
  lock: "solid",
  unlock: "solid",
  "toggle-on": "solid",
  "resource-card": "filled",
  youtube: "filled",
  globe: "filled",
  community: "filled",
  document: "filled",
};

const prefixMap: Record<Variant, string> = {
  bold: "fi fi-br-",
  solid: "fi fi-sr-",
  filled: "fi fi-rr-",
};

// Size standards (px)
export const ICON_SIZES = {
  nav: 18,
  button: 16,
  sectionHeader: 22,
  card: 24,
  tableAction: 14,
  statusBadge: 12,
  adminHeader: 20,
  emptyState: 48,
  shutdownLock: 64,
} as const;

// Color standards
export const ICON_COLORS = {
  default: "#888888",
  active: "#52D973",
  hover: "#F5F5F0",
  success: "#52D973",
  error: "#E24B4A",
  warning: "#EF9F27",
  disabled: "#444444",
} as const;

interface IconProps {
  name: IconName | BrandIconName;
  /** Override the icon style. Defaults to the icon's natural style (solid for status, bold for UI). */
  variant?: Variant;
  /** Shorthand for variant="solid" + color="#52D973" */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

export default function Icon({
  name,
  variant,
  active = false,
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  const resolvedVariant = active ? "solid" : (variant ?? defaultVariant[name] ?? "bold");
  const prefix = prefixMap[resolvedVariant];
  const suffix = suffixMap[name] ?? "info";
  const baseClass = `${prefix}${suffix}`;

  const defaultColor = active ? ICON_COLORS.active : ICON_COLORS.default;

  return (
    <i
      className={`${baseClass}${className ? ` ${className}` : ""}`}
      style={{ color: defaultColor, ...style }}
      aria-hidden={ariaHidden}
    />
  );
}

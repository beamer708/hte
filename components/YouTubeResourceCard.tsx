"use client";

import { Resource, getYouTubeThumbnail } from "@/lib/resources";
import Icon from "@/components/Icon";

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-label="YouTube" aria-hidden="true">
    <path
      fill="#FF0000"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    />
  </svg>
);

interface YouTubeResourceCardProps {
  resource: Resource;
}

export default function YouTubeResourceCard({ resource }: YouTubeResourceCardProps) {
  const thumbnailUrl = resource.thumbnailUrl || getYouTubeThumbnail(resource.url);

  return (
    <article className="resource-card group block overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0d0d0d]">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={resource.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 hidden h-full w-full items-center justify-center bg-[#0d0d0d]">
              <Icon name="video-camera" className="text-4xl text-muted-foreground/30" />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#0d0d0d]">
            <Icon name="video-camera" className="text-4xl text-muted-foreground/30" />
          </div>
        )}
        {resource.isNew && (
          <div className="absolute top-2 left-2 z-10">
            <span className="resource-tag">New</span>
          </div>
        )}
        {/* YouTube badge with official SVG logo */}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1.5 rounded border border-border/60 bg-background/80 px-2 py-1 backdrop-blur-sm">
            <YouTubeLogo />
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">YouTube</span>
          </div>
        </div>
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        <div className="mb-2">
          <span className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {resource.category}
          </span>
        </div>
        <h3 className="mb-2 text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {resource.title}
        </h3>
        {/* Curator label */}
        <p className="mb-4 text-xs text-muted-foreground italic">
          {resource.description}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-border/40 pt-4">
          {/* Channel name with YouTube logo */}
          <div className="flex min-w-0 items-center gap-1.5">
            <YouTubeLogo />
            <span className="truncate text-xs text-muted-foreground">
              {resource.channelName || resource.creator}
            </span>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-foreground hover:text-accent transition-colors"
            aria-label={`Watch ${resource.title} on YouTube`}
          >
            Watch
            <Icon name="up-right-from-square" className="text-xs text-muted-foreground" />
          </a>
        </div>
      </div>
    </article>
  );
}

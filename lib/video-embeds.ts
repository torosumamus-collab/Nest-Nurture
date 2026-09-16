/**
 * Video embed shortcodes for post Markdown.
 *
 * Instead of pasting raw <iframe>/<video> HTML into every post, write one
 * of these on its own line (with a blank line above and below it):
 *
 *   {{youtube dQw4w9WgXcQ}}
 *   {{vimeo 76979871}}
 *   {{video /videos/clip.mp4}}
 *   {{video /videos/clip.mp4 poster=/images/covers/clip-poster.jpg}}
 *
 * expandVideoShortcodes() rewrites these into the actual embed markup
 * before the Markdown is handed to remark, so remark-html (sanitize: false)
 * just passes the generated HTML straight through. Styling lives in
 * app/globals.css under `.video-embed`, so the look is consistent and only
 * needs to be updated in one place.
 */

const SHORTCODE_RE = /\{\{\s*(youtube|vimeo|video)\s+([^\n}]+?)\s*\}\}/g;

function escapeAttr(value: string): string {
  return value.replace(/"/g, "&quot;");
}

function youtubeEmbed(id: string): string {
  const cleanId = id.trim();
  return `<div class="video-embed" data-video-type="youtube">
  <iframe
    src="https://www.youtube.com/embed/${escapeAttr(cleanId)}"
    title="YouTube video player"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>`;
}

function vimeoEmbed(id: string): string {
  const cleanId = id.trim();
  return `<div class="video-embed" data-video-type="vimeo">
  <iframe
    src="https://player.vimeo.com/video/${escapeAttr(cleanId)}"
    title="Vimeo video player"
    loading="lazy"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>`;
}

function nativeVideoEmbed(args: string): string {
  // args looks like: "/videos/clip.mp4" or "/videos/clip.mp4 poster=/images/x.jpg"
  const parts = args.split(/\s+/).filter(Boolean);
  const src = parts[0] ?? "";
  const posterPart = parts.find((p) => p.startsWith("poster="));
  const poster = posterPart ? posterPart.slice("poster=".length) : null;

  return `<div class="video-embed" data-video-type="native">
  <video controls playsinline preload="metadata"${poster ? ` poster="${escapeAttr(poster)}"` : ""}>
    <source src="${escapeAttr(src)}" />
    Your browser does not support embedded video.
  </video>
</div>`;
}

export function expandVideoShortcodes(markdown: string): string {
  return markdown.replace(SHORTCODE_RE, (_match, type: string, args: string) => {
    switch (type) {
      case "youtube":
        return youtubeEmbed(args);
      case "vimeo":
        return vimeoEmbed(args);
      case "video":
        return nativeVideoEmbed(args);
      default:
        return _match;
    }
  });
}

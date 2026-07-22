import fs from "fs";
import path from "path";

const authors = [
  { slug: "claire-whitfield", initials: "CW", bg: "#D9A5A5" },
  { slug: "amara-osei", initials: "AO", bg: "#A8C3A0" },
  { slug: "priya-anand", initials: "PA", bg: "#6B584C" },
];

const dir = path.join(process.cwd(), "public", "images", "authors");
fs.mkdirSync(dir, { recursive: true });

authors.forEach((a) => {
  const svg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="${a.bg}"/>
  <text x="100" y="118" font-family="Georgia, serif" font-size="64" fill="#FFF9F5" text-anchor="middle">${a.initials}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${a.slug}.svg`), svg);
});
console.log("done");

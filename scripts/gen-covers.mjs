import fs from "fs";
import path from "path";

const covers = [
  { slug: "gentle-newborn-sleep-first-weeks", palette: ["#A8C3A0", "#F2E9E4"] },
  { slug: "third-trimester-what-actually-helps", palette: ["#D9A5A5", "#FFF9F5"] },
  { slug: "toddler-tantrums-calm-response", palette: ["#F2E9E4", "#A8C3A0"] },
  { slug: "matrescence-identity-shift-motherhood", palette: ["#6B584C", "#F2E9E4"] },
  { slug: "five-minute-self-care-for-tired-mothers", palette: ["#D9A5A5", "#F2E9E4"] },
  { slug: "building-calm-family-dinner-rituals", palette: ["#A8C3A0", "#FFF9F5"] },
  { slug: "first-trimester-symptoms-what-is-normal", palette: ["#D9A5A5", "#A8C3A0"] },
  { slug: "returning-to-work-after-maternity-leave", palette: ["#6B584C", "#D9A5A5"] },
];

const dir = path.join(process.cwd(), "public", "images", "covers");
fs.mkdirSync(dir, { recursive: true });

function shapeSet(seed, c1, c2) {
  // Deterministic-ish soft organic shapes per seed
  const rand = (n) => {
    const x = Math.sin(seed * 999 + n * 37.13) * 10000;
    return x - Math.floor(x);
  };
  let shapes = "";
  for (let i = 0; i < 4; i++) {
    const cx = 80 + rand(i) * 640;
    const cy = 80 + rand(i + 10) * 400;
    const r = 90 + rand(i + 20) * 160;
    const fill = i % 2 === 0 ? c1 : c2;
    shapes += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" opacity="0.35"/>`;
  }
  return shapes;
}

covers.forEach((c, i) => {
  const [c1, c2] = c.palette;
  const svg = `<svg width="1200" height="800" viewBox="0 0 800 533" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="533" fill="#FFF9F5"/>
  <g>${shapeSet(i + 1, c1, c2)}</g>
  <rect width="800" height="533" fill="url(#grain)" opacity="0.03"/>
  <defs>
    <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="none"/>
      <circle cx="1" cy="1" r="0.6" fill="#6B584C"/>
    </pattern>
  </defs>
</svg>`;
  fs.writeFileSync(path.join(dir, `${c.slug}.svg`), svg);
});

// Generic fallback / OG image
fs.writeFileSync(
  path.join(process.cwd(), "public", "images", "og-default.jpg.svg"),
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#FFF9F5"/><circle cx="220" cy="180" r="180" fill="#A8C3A0" opacity="0.35"/><circle cx="980" cy="470" r="220" fill="#D9A5A5" opacity="0.35"/><text x="600" y="330" font-family="Georgia, serif" font-size="64" fill="#3A322C" text-anchor="middle">Nest &amp; Nurture</text></svg>`
);

console.log("Generated", covers.length, "cover placeholders");

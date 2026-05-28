import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://questroofing.com";
const phone = "602-399-6455";
const phoneHref = "tel:6023996455";
const email = "info@questroofing.com";
const logo = "https://questroofing.com/wp-content/uploads/2024/12/Untitled-design-92-1.png";
const today = "2026-05-29";

const services = [
  {
    slug: "roof-repair",
    title: "Roof Repair in Phoenix, AZ | Quest Roofing",
    h1: "Roof Repair in Phoenix, AZ",
    meta: "Licensed Phoenix roof repair for leaks, storm damage, tile, shingle, foam and metal roofs. Get a free Quest Roofing inspection.",
    name: "Roof Repair",
    intro: "Quest Roofing handles roof repair for Phoenix-area homes with photo-backed inspections and written estimates. If the roof can be repaired instead of replaced, the recommendation should be clear before work starts.",
    signs: ["Ceiling stains after rain", "Broken or slipped tiles", "Lifted shingles or exposed fasteners", "Foam roof cracks or worn coating", "Flashing or penetration leaks"],
    process: ["Inspect the leak source and surrounding roof area", "Document problem areas with photos", "Explain repair scope, materials, timing, and price", "Complete approved repair work and cleanup", "Review the work and warranty details"],
    faq: [
      ["Can Quest repair a roof instead of replacing it?", "Yes. The site messaging is repair-first when repair is the right fix, with written estimates instead of vague verbal guesses."],
      ["Do roof repairs include a free inspection?", "Yes. Roof repair requests can start with a free inspection and a written estimate."]
    ]
  },
  {
    slug: "residential-roof-replacement",
    title: "Roof Replacement Phoenix AZ | Quest Roofing",
    h1: "Residential Roof Replacement in Phoenix, AZ",
    meta: "Phoenix residential roof replacement for tile, shingle, foam and metal systems. Licensed Quest Roofing offers free written estimates.",
    name: "Residential Roof Replacement",
    intro: "Quest Roofing replaces residential roofing systems across the Phoenix metro when repair is no longer the right long-term answer. The estimate should spell out materials, scope, timing, cleanup, and warranty coverage.",
    signs: ["Roof near the end of its expected life", "Multiple recurring leaks", "Aged underlayment beneath tile", "Storm damage across several roof areas", "Large sections of worn shingles or foam"],
    process: ["Inspect the existing roof system", "Review repair versus replacement options", "Prepare a written replacement scope", "Coordinate tear-off, installation, cleanup, and permits where needed", "Close out with warranty documentation"],
    faq: [
      ["How much does a roof replacement cost?", "Most replacements depend on size, material, access, and complexity. A written estimate gives the real project number before work starts."],
      ["Which roof systems does Quest replace?", "Tile, shingle, foam, and metal roofing are all part of Quest Roofing's service mix."]
    ]
  },
  {
    slug: "roof-inspection",
    title: "Roof Inspection Phoenix AZ | Quest Roofing",
    h1: "Roof Inspection in Phoenix, AZ",
    meta: "Free Phoenix roof inspections with photos and written estimates from licensed Quest Roofing. Tile, shingle, foam and metal roofs.",
    name: "Roof Inspection",
    intro: "A roof inspection should make the condition of the roof easier to understand. Quest Roofing uses photos and written estimates so homeowners can see what is wrong and what the next step should be.",
    signs: ["Buying or selling a home", "Recent monsoon wind or rain", "Interior staining", "Aging tile underlayment", "Foam roof surface wear"],
    process: ["Review roof type and access points", "Inspect likely leak and wear areas", "Photograph notable findings", "Explain repair or replacement choices", "Provide a written estimate when work is needed"],
    faq: [
      ["Are inspections free?", "Yes. Roof inspection requests can start with a free inspection."],
      ["Will I get photos?", "Inspections are photo-backed so the problem areas are easier to understand."]
    ]
  },
  {
    slug: "storm-hail-damage-repair",
    title: "Storm Damage Roof Repair Phoenix AZ | Quest Roofing",
    h1: "Storm and Hail Damage Roof Repair in Phoenix, AZ",
    meta: "Phoenix storm damage roof repair for monsoon leaks, wind damage, tile, shingle, foam and metal roofs. Free Quest inspection.",
    name: "Storm and Hail Damage Repair",
    intro: "Monsoon wind, heavy rain, and hail can expose weak points fast. Quest Roofing inspects storm damage, documents roof conditions, and explains the repair scope before work begins.",
    signs: ["Fresh leaks after a storm", "Missing or shifted roofing material", "Impact marks or cracked tiles", "Damaged flashing", "Debris-driven roof punctures"],
    process: ["Prioritize active leaks when possible", "Inspect storm-hit sections", "Document visible damage", "Separate urgent repair from longer-term replacement needs", "Prepare a written estimate"],
    faq: [
      ["Can Quest respond to active leaks?", "Active leaks should be called in quickly. During monsoon conditions, urgent roof leaks are prioritized when scheduling allows."],
      ["Does storm damage always mean replacement?", "No. A proper inspection should separate repairable issues from larger replacement needs."]
    ]
  },
  {
    slug: "tile-roofing",
    title: "Tile Roofing Phoenix AZ | Quest Roofing",
    h1: "Tile Roofing in Phoenix, AZ",
    meta: "Phoenix tile roofing repair, underlayment replacement and new tile installation from licensed Quest Roofing. Free written estimates.",
    name: "Tile Roofing",
    intro: "Tile roofing is common across Arizona homes, but the tile is only one part of the system. Quest Roofing handles tile repair, underlayment replacement, and new tile installation.",
    signs: ["Cracked or missing tiles", "Aging underlayment", "Leaks around valleys or penetrations", "Visible slipped tiles", "Storm movement or impact damage"],
    process: ["Inspect tiles, flashings, penetrations, and underlayment clues", "Identify repairable areas", "Explain underlayment concerns when present", "Prepare a written tile roofing estimate", "Complete approved repair or replacement work"],
    faq: [
      ["How long can tile roofs last?", "Tile roofs can last for decades, but the underlayment beneath the tile usually needs attention much sooner."],
      ["Do you repair tile roofs?", "Yes. Tile repair and tile replacement are part of Quest Roofing's listed services."]
    ]
  },
  {
    slug: "shingle-roofing",
    title: "Shingle Roofing Phoenix AZ | Quest Roofing",
    h1: "Shingle Roofing in Phoenix, AZ",
    meta: "Phoenix shingle roofing repair and replacement using GAF and Owens Corning materials. Licensed Quest Roofing, free estimates.",
    name: "Shingle Roofing",
    intro: "Quest Roofing installs and repairs architectural asphalt shingle systems using GAF and Owens Corning materials. A written estimate should clarify whether repair or replacement makes sense.",
    signs: ["Lifted or missing shingles", "Granule loss", "Storm damage", "Leaks at flashing", "A roof near the end of its expected life"],
    process: ["Inspect shingle field and edges", "Check penetrations and flashings", "Document damage or wear", "Recommend repair or replacement", "Review materials and timing"],
    faq: [
      ["What shingle materials does Quest mention?", "Quest's service copy mentions GAF and Owens Corning materials."],
      ["How long do shingle roofs last in Arizona?", "Arizona heat shortens shingle life compared with milder climates, so inspections matter as the roof ages."]
    ]
  },
  {
    slug: "foam-roofing",
    title: "Foam Roofing Phoenix AZ | Quest Roofing",
    h1: "Foam Roofing in Phoenix, AZ",
    meta: "Phoenix foam roofing and recoats for flat and low-slope roofs. Licensed Quest Roofing offers inspections and written estimates.",
    name: "Foam Roofing",
    intro: "Foam roofing is common for flat and low-slope Arizona roofs. Quest Roofing handles spray polyurethane foam roofing and recoats when the surface needs renewed protection.",
    signs: ["Cracks in coating", "Ponding or worn low spots", "Sun-damaged surface", "Leaks on flat roof sections", "Roof approaching recoat timing"],
    process: ["Inspect foam surface condition", "Look for cracks, punctures, and drainage concerns", "Explain repair versus recoat options", "Provide written scope and pricing", "Complete approved foam roofing work"],
    faq: [
      ["How long does foam roofing last?", "Foam roof life depends heavily on coating condition, drainage, and recoat timing."],
      ["Do foam recoats cost less than replacement?", "Recoats are often a smaller project than full replacement when the foam system is still sound."]
    ]
  },
  {
    slug: "metal-roofing",
    title: "Metal Roofing Phoenix AZ | Quest Roofing",
    h1: "Metal Roofing in Phoenix, AZ",
    meta: "Phoenix metal roofing repair and replacement for standing seam and exposed-fastener systems. Get a free Quest Roofing estimate.",
    name: "Metal Roofing",
    intro: "Quest Roofing works with standing seam and exposed-fastener metal roof systems. Metal roofing can handle Arizona heat well, but fasteners, seams, and flashings still need careful inspection.",
    signs: ["Loose or aging fasteners", "Leaks near penetrations", "Panel movement", "Damaged trim or flashing", "Storm-related impact concerns"],
    process: ["Inspect seams, panels, fasteners, and flashings", "Document repair points", "Explain material and system options", "Prepare written estimate", "Complete approved repair or replacement"],
    faq: [
      ["How long can metal roofing last?", "Metal roof life depends on the system, fasteners, flashing details, and maintenance."],
      ["Does Quest handle metal roofing?", "Yes. Metal roofing is listed among Quest Roofing's services."]
    ]
  }
];

const cities = [
  ["phoenix", "Phoenix", "Phoenix is the broadest metro target. Homeowners search across central, north, and surrounding Phoenix areas for roof repair, replacement, inspections, and storm response.", ["Tile and shingle systems both appear throughout Phoenix neighborhoods", "Flat and foam roof sections are common on many desert homes", "Monsoon wind and heat exposure make written inspections important"]],
  ["scottsdale", "Scottsdale", "Scottsdale roofing work often involves tile, foam, and metal systems where appearance, HOA expectations, and clear documentation matter.", ["Tile roofs are common across many Scottsdale homes", "Foam and flat roof sections need coating attention", "Written scopes help homeowners compare repair versus replacement clearly"]],
  ["paradise-valley", "Paradise Valley", "Paradise Valley homeowners tend to value clean process, documentation, and roof systems that match higher-end residential properties.", ["Tile and specialty roof details need careful inspection", "Leak diagnosis should document valleys, penetrations, and transitions", "Clear written estimates matter before approving work"]],
  ["gilbert", "Gilbert", "Gilbert is a strong East Valley market for Quest Roofing because it is close to Queen Creek and has many residential roof types.", ["Tile and shingle roofs are common", "Monsoon leaks can show up around penetrations", "East Valley scheduling keeps this area practical for the crew"]],
  ["queen-creek", "Queen Creek", "Queen Creek is Quest Roofing's home base, making it the most natural service area for inspections, repairs, and replacements.", ["Local proximity supports faster scheduling", "Tile, shingle, foam, and metal systems are all relevant", "Homeowners can ask for written estimates and inspection photos"]],
  ["mesa", "Mesa", "Mesa has a wide mix of older and newer residential roofs, making roof repair, replacement, inspections, tile, shingle, and foam service pages important.", ["Older roof systems may need careful repair-versus-replace review", "Tile underlayment concerns are common in Arizona", "Foam and flat roof sections need coating attention"]],
  ["chandler", "Chandler", "Chandler is a priority East Valley city for Quest Roofing, with homeowners needing clear repair guidance, written estimates, and roof system options.", ["Tile and shingle systems are common", "Storm-season leak response matters", "Written estimates help avoid pressure selling"]],
  ["tempe", "Tempe", "Tempe roofing searches include repair, inspection, shingle, tile, foam, and replacement needs across a dense East Valley market.", ["Mixed roof ages make inspection detail important", "Flat and low-slope sections appear on many properties", "Clear scope helps homeowners compare options"]]
].map(([slug, name, intro, localNotes]) => ({
  slug,
  name,
  title: `Roofing Company in ${name}, AZ | Quest Roofing`,
  h1: `Roofing Company in ${name}, AZ`,
  meta: `Licensed roofing company serving ${name}, AZ. Roof repair, replacement, tile, shingle, foam, metal roofing and free estimates.`,
  intro,
  localNotes
}));

const layout = ({ title, meta, canonical, h1, eyebrow, body, schema, pathPrefix = ".." }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${meta}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#2458ad">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${logo}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Quest Roofing">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${meta}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${logo}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${meta}">
  <meta name="twitter:image" content="${logo}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${pathPrefix}/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <div class="site-shell">
    <header class="site-header" id="top">
      <div class="container header-inner">
        <a class="brand" href="${pathPrefix}/index.html" aria-label="Quest Roofing home">
          <span class="brand-mark"><img src="${logo}" alt="Quest Roofing" width="92" height="92"></span>
          <span class="brand-copy"><strong>Quest Roofing</strong><span>Queen Creek, Arizona</span></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
        <nav class="site-nav" id="site-nav" aria-label="Primary">
          <a href="${pathPrefix}/index.html#services">Services</a>
          <a href="${pathPrefix}/index.html#areas">Areas</a>
          <a href="${pathPrefix}/index.html#reviews">Reviews</a>
          <a class="nav-cta" href="${pathPrefix}/index.html#estimate">Request Quote</a>
        </nav>
      </div>
    </header>
    <main>
      <section class="seo-hero">
        <div class="container seo-layout">
          <div>
            <p class="eyebrow">${eyebrow}</p>
            <h1>${h1}</h1>
            <p>${meta}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="${pathPrefix}/index.html#estimate">Get My Free Estimate</a>
              <a class="button button-ghost button-ghost-light" href="${phoneHref}">Call ${phone}</a>
            </div>
          </div>
          <aside class="seo-aside">
            <p class="panel-label">Quest Roofing</p>
            <ul class="contact-points">
              <li><span>Phone</span><a href="${phoneHref}">${phone}</a></li>
              <li><span>Email</span><a href="mailto:${email}">${email}</a></li>
              <li><span>Status</span><strong>AZ ROC #355136</strong></li>
            </ul>
          </aside>
        </div>
      </section>
      ${body}
    </main>
    <footer class="site-footer">
      <div class="container footer-inner footer-inner-wide">
        <div>
          <p class="footer-brand">Quest Roofing</p>
          <p class="footer-copy">Licensed roofing contractor based in Queen Creek, Arizona.</p>
        </div>
        <nav class="footer-seo-links" aria-label="SEO footer links">
          <div><strong>Services</strong>${services.map((service) => `<a href="${pathPrefix}/services/${service.slug}/">${service.name}</a>`).join("")}</div>
          <div><strong>Cities</strong>${cities.map((city) => `<a href="${pathPrefix}/roofing-${city.slug}-az/">${city.name}</a>`).join("")}</div>
        </nav>
        <p class="footer-meta"><span>AZ ROC #355136</span><span>GAF Certified</span><span>Copyright 2026 Quest Roofing</span></p>
      </div>
    </footer>
  </div>
  <script src="${pathPrefix}/script.js"></script>
</body>
</html>
`;

const businessSchema = {
  "@type": "RoofingContractor",
  "@id": `${siteUrl}/#business`,
  name: "Quest Roofing",
  url: `${siteUrl}/`,
  logo,
  telephone: "+1-602-399-6455",
  email,
  address: { "@type": "PostalAddress", addressLocality: "Queen Creek", addressRegion: "AZ", addressCountry: "US" },
  identifier: "AZ ROC #355136"
};

const breadcrumbSchema = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

const pageSchema = ({ canonical, title, meta, breadcrumbs = [], extra = [] }) => ({
  "@context": "https://schema.org",
  "@graph": [
    businessSchema,
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description: meta, about: { "@id": `${siteUrl}/#business` }, inLanguage: "en-US" },
    ...(breadcrumbs.length ? [breadcrumbSchema(breadcrumbs)] : []),
    ...extra
  ]
});

const section = (heading, content) => `<section class="section-band section-light seo-section"><div class="container"><h2>${heading}</h2>${content}</div></section>`;
const list = (items) => `<ul class="seo-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const faqHtml = (faq) => `<div class="faq-list">${faq.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;

services.forEach((service) => {
  const canonical = `${siteUrl}/services/${service.slug}/`;
  const cityLinkList = cities.map((city) => `<a href="../../roofing-${city.slug}-az/">${city.name}</a>`).join(", ");
  const body = [
    section(`What ${service.name} includes`, `<p>${service.intro}</p>${list(service.process)}`),
    section(`Signs you may need ${service.name.toLowerCase()}`, list(service.signs)),
    section("Service areas", `<p>Quest Roofing prioritizes Queen Creek and the East Valley, with premium secondary service across Scottsdale, Paradise Valley, Fountain Hills, and select North Phoenix projects.</p><p class="seo-link-row">${cityLinkList}</p>`),
    section(`${service.name} FAQ`, faqHtml(service.faq))
  ].join("");
  const schema = pageSchema({
    canonical,
    title: service.title,
    meta: service.meta,
    breadcrumbs: [
      { name: "Home", url: `${siteUrl}/` },
      { name: "Services", url: `${siteUrl}/#services` },
      { name: service.name, url: canonical }
    ],
    extra: [
      { "@type": "Service", name: service.name, provider: { "@id": `${siteUrl}/#business` }, areaServed: cities.map((city) => ({ "@type": "City", name: city.name })) },
      { "@type": "FAQPage", mainEntity: service.faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
    ]
  });
  const html = layout({ title: service.title, meta: service.meta, canonical, h1: service.h1, eyebrow: "Roofing Service", body, schema, pathPrefix: "../.." });
  const file = join("services", service.slug, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
});

cities.forEach((city) => {
  const canonical = `${siteUrl}/roofing-${city.slug}-az/`;
  const serviceLinkList = services.map((service) => `<a href="../services/${service.slug}/">${service.name}</a>`).join(", ");
  const faq = [
    [`Does Quest Roofing serve ${city.name}?`, `Yes. Quest Roofing serves ${city.name} as part of its Arizona roofing service area, with Queen Creek and the East Valley as the primary base.`],
    [`What roofing services are available in ${city.name}?`, "Quest Roofing lists roof repair, roof replacement, roof inspection, tile, shingle, foam, and metal roofing services."],
    [`Can I get a written estimate in ${city.name}?`, "Yes. Inspection photos and written estimates help make the scope clear before work starts."]
  ];
  const body = [
    section(`Roofing services in ${city.name}`, `<p>${city.intro}</p><p class="seo-link-row">${serviceLinkList}</p>`),
    section(`${city.name} roof concerns`, list(city.localNotes)),
    section(`Why ${city.name} homeowners call Quest`, `<p>Quest Roofing keeps recommendations direct: inspect the roof, explain what is wrong, and provide a written estimate instead of a vague verbal guess. The public site lists AZ ROC #355136, GAF certification, and warranty-backed work.</p>`),
    section(`${city.name} roofing FAQ`, faqHtml(faq))
  ].join("");
  const schema = pageSchema({
    canonical,
    title: city.title,
    meta: city.meta,
    breadcrumbs: [
      { name: "Home", url: `${siteUrl}/` },
      { name: "Service Areas", url: `${siteUrl}/#areas` },
      { name: city.name, url: canonical }
    ],
    extra: [
      { "@type": "Service", name: `Roofing services in ${city.name}, AZ`, provider: { "@id": `${siteUrl}/#business` }, areaServed: { "@type": "City", name: city.name } },
      { "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
    ]
  });
  const html = layout({ title: city.title, meta: city.meta, canonical, h1: city.h1, eyebrow: "Service Area", body, schema, pathPrefix: ".." });
  const file = join(`roofing-${city.slug}-az`, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
});

const urls = [
  ["", "1.0"],
  ...services.map((service) => [`services/${service.slug}/`, "0.9"]),
  ...cities.map((city) => [`roofing-${city.slug}-az/`, "0.85"])
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([path, priority]) => `  <url>
    <loc>${siteUrl}/${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync("sitemap.xml", sitemap);

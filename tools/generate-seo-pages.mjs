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

const officialServiceSlugs = [
  "roof-repair",
  "tile-roofing",
  "shingle-roofing",
  "metal-roofing",
  "foam-roofing",
  "roof-inspection"
];

const publishedServices = officialServiceSlugs.map((slug) => services.find((service) => service.slug === slug));
const serviceLabel = (service) => service.slug === "roof-inspection" ? "Free Inspection" : service.name;

const cities = [
  ["phoenix", "Phoenix", "Phoenix is the broadest metro target. Homeowners search across central, north, and surrounding Phoenix areas for roof repair, replacement, inspections, and storm response.", ["Tile and shingle systems both appear throughout Phoenix neighborhoods", "Flat and foam roof sections are common on many desert homes", "Monsoon wind and heat exposure make written inspections important"]],
  ["scottsdale", "Scottsdale", "Scottsdale roofing work often involves tile, foam, and metal systems where appearance, HOA expectations, and clear documentation matter.", ["Tile roofs are common across many Scottsdale homes", "Foam and flat roof sections need coating attention", "Written scopes help homeowners compare repair versus replacement clearly"]],
  ["paradise-valley", "Paradise Valley", "Paradise Valley homeowners tend to value clean process, documentation, and roof systems that match higher-end residential properties.", ["Tile and specialty roof details need careful inspection", "Leak diagnosis should document valleys, penetrations, and transitions", "Clear written estimates matter before approving work"]],
  ["gilbert", "Gilbert", "Gilbert is a nearby Phoenix-area market for Quest Roofing because it is close to Queen Creek and has many residential roof types.", ["Tile and shingle roofs are common", "Monsoon leaks can show up around penetrations", "Local scheduling keeps this area practical for the crew"]],
  ["queen-creek", "Queen Creek", "Queen Creek is Quest Roofing's home base, making it the most natural service area for inspections, repairs, and replacements.", ["Local proximity supports faster scheduling", "Tile, shingle, foam, and metal systems are all relevant", "Homeowners can ask for written estimates and inspection photos"]],
  ["mesa", "Mesa", "Mesa has a wide mix of older and newer residential roofs, making roof repair, replacement, inspections, tile, shingle, and foam service pages important.", ["Older roof systems may need careful repair-versus-replace review", "Tile underlayment concerns are common in Arizona", "Foam and flat roof sections need coating attention"]],
  ["chandler", "Chandler", "Chandler homeowners need clear repair guidance, written estimates, and roof system options from a nearby Arizona roofing contractor.", ["Tile and shingle systems are common", "Storm-season leak response matters", "Written estimates help avoid pressure selling"]],
  ["tempe", "Tempe", "Tempe roofing searches include repair, inspection, shingle, tile, foam, and replacement needs across a dense Phoenix-area market.", ["Mixed roof ages make inspection detail important", "Flat and low-slope sections appear on many properties", "Clear scope helps homeowners compare options"]]
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
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${pathPrefix}/tokens.css">
  <link rel="stylesheet" href="${pathPrefix}/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <div class="site-shell">
    <header class="site-header" id="top">
      <div class="top-bar">
        <div class="container top-bar-inner">
          <p>AZ ROC #355136 - GAF Certified - Free written estimates</p>
          <div class="top-bar-actions">
            <a href="${phoneHref}">${phone}</a>
            <a href="mailto:${email}">${email}</a>
          </div>
        </div>
      </div>
      <div class="container header-inner">
        <a class="brand" href="${pathPrefix}/index.html" aria-label="Quest Roofing home">
          <span class="brand-mark"><img src="${logo}" alt="Quest Roofing" width="92" height="92"></span>
          <span class="brand-copy"><strong>Quest Roofing</strong><span>Queen Creek, Arizona</span></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
        <nav class="site-nav" id="site-nav" aria-label="Primary">
          <div class="nav-group">
            <button class="nav-trigger" type="button" aria-haspopup="true" aria-expanded="false">About</button>
            <div class="nav-menu" aria-label="About pages">
              <a href="${pathPrefix}/about-us/our-team/index.html">Our Team</a>
              <a href="${pathPrefix}/about-us/completed-projects/index.html">Completed Projects</a>
              <a href="${pathPrefix}/about-us/core-values/index.html">Core Values</a>
              <a href="${pathPrefix}/about-us/community-outreach/index.html">Community Outreach</a>
              <a href="${pathPrefix}/about-us/reviews/index.html">Reviews</a>
            </div>
          </div>
          <div class="nav-group">
            <button class="nav-trigger" type="button" aria-haspopup="true" aria-expanded="false">Services</button>
            <div class="nav-menu" aria-label="Service pages">
              <a href="${pathPrefix}/index.html#services">Services Overview</a>
              ${publishedServices.map((service) => `<a href="${pathPrefix}/services/${service.slug}/index.html">${serviceLabel(service)}</a>`).join("\n              ")}
            </div>
          </div>
          <a href="${pathPrefix}/index.html#process">Process</a>
          <a href="${pathPrefix}/index.html#why-quest">Why Quest</a>
          <a href="${pathPrefix}/gallery/index.html">Gallery</a>
          <a href="${pathPrefix}/resources/design-your-roof/index.html">Resources</a>
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
            <ul class="hero-badges" aria-label="Quest Roofing credentials">
              <li>AZ ROC #355136</li>
              <li>GAF Certified</li>
              <li>Written estimates</li>
            </ul>
          </div>
          <aside class="seo-aside">
            <p class="panel-label">Quest Roofing proof</p>
            <h2>Documented roof help before work starts.</h2>
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
          <p class="footer-meta"><span>AZ ROC #355136</span><span>GAF Certified</span><span>Copyright 2026 Quest Roofing</span></p>
        </div>
        <nav class="footer-seo-links" aria-label="SEO footer links">
          <div><strong>Services</strong>${publishedServices.map((service) => `<a href="${pathPrefix}/services/${service.slug}/index.html">${serviceLabel(service)}</a>`).join("")}</div>
          <div><strong>Cities</strong>${cities.map((city) => `<a href="${pathPrefix}/roofing-${city.slug}-az/index.html">${city.name}</a>`).join("")}</div>
        </nav>
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
const proofPanel = (title, text, pathPrefix) => `
<section class="seo-proof-band">
  <div class="container seo-proof-grid">
    <div class="seo-photo-card" aria-hidden="true"></div>
    <div class="seo-proof-copy">
      <p class="eyebrow">Inspection proof</p>
      <h2>${title}</h2>
      <p>${text}</p>
      <ul class="seo-proof-list">
        <li><strong>License:</strong> AZ ROC #355136</li>
        <li><strong>Estimate:</strong> written scope before approval</li>
        <li><strong>Coverage:</strong> Queen Creek-based service across greater Phoenix</li>
      </ul>
      <a class="button button-primary" href="${pathPrefix}/index.html#estimate">Request a written estimate</a>
    </div>
  </div>
</section>`;

publishedServices.forEach((service) => {
  const canonical = `${siteUrl}/services/${service.slug}/`;
  const cityLinkList = cities.map((city) => `<a href="../../roofing-${city.slug}-az/index.html">${city.name}</a>`).join(", ");
  const body = [
    proofPanel(`${service.name} should start with documentation.`, "The stronger contractor experience is simple: visible license information, roof-condition photos, and a scope that explains what is being repaired or replaced before the job is scheduled.", "../.."),
    section(`What ${service.name} includes`, `<p>${service.intro}</p>${list(service.process)}`),
    section(`Signs you may need ${service.name.toLowerCase()}`, `<div class="seo-card-grid">${service.signs.map((sign) => `<article><span></span><h3>${sign}</h3><p>Document this during inspection so the estimate is tied to the actual roof condition.</p></article>`).join("")}</div>`),
    section("How Quest keeps the request clear", `<div class="seo-card-grid seo-card-grid-3"><article><h3>Photo-backed inspection</h3><p>Roof concerns are easier to evaluate when the homeowner can see the problem areas.</p></article><article><h3>Repair-versus-replace context</h3><p>The estimate should explain whether a targeted repair is enough or whether the system needs larger work.</p></article><article><h3>Closeout expectations</h3><p>Cleanup, workmanship coverage, and manufacturer materials are part of the project conversation.</p></article></div>`),
    section("Service areas", `<p>Quest Roofing is based in Queen Creek and serves homeowners across the greater Phoenix area, including Scottsdale, Paradise Valley, Fountain Hills, and Phoenix-area communities.</p><p class="seo-link-row">${cityLinkList}</p>`),
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
  const serviceLinkList = publishedServices.map((service) => `<a href="../services/${service.slug}/index.html">${serviceLabel(service)}</a>`).join(", ");
  const faq = [
    [`Does Quest Roofing serve ${city.name}?`, `Yes. Quest Roofing serves ${city.name} as part of its Arizona roofing service area from its Queen Creek base.`],
    [`What roofing services are available in ${city.name}?`, "Quest Roofing lists roof repair, roof inspection, tile, shingle, foam, and metal roofing services."],
    [`Can I get a written estimate in ${city.name}?`, "Yes. Inspection photos and written estimates help make the scope clear before work starts."]
  ];
  const body = [
    proofPanel(`${city.name} roofing calls need local clarity.`, `Quest positions ${city.name} requests around direct roof documentation, written estimates, and practical scheduling from its Queen Creek base.`, ".."),
    section(`Roofing services in ${city.name}`, `<p>${city.intro}</p><p class="seo-link-row">${serviceLinkList}</p>`),
    section(`${city.name} roof concerns`, `<div class="seo-card-grid">${city.localNotes.map((note) => `<article><span></span><h3>${note}</h3><p>Quest can review this during inspection and put the recommendation in writing.</p></article>`).join("")}</div>`),
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

const cardGrid = (cards) => `<div class="seo-card-grid seo-card-grid-3">${cards.map(({ title, text }) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
const roofSystemGrid = () => cardGrid([
  { title: "Tile roofing", text: "Good for Arizona style and heat, but underlayment, valleys, and broken tiles need careful review." },
  { title: "Shingle roofing", text: "A practical residential option where ventilation, heat exposure, flashing, and storm wear affect life span." },
  { title: "Foam and flat roofing", text: "Strong low-slope options when drainage, coating condition, and recoat timing are managed correctly." },
  { title: "Metal roofing", text: "Durable in the desert when seams, fasteners, edges, and penetrations are inspected and maintained." }
]);

const supportPages = [
  {
    path: "about-us/our-team/",
    title: "Our Team | Quest Roofing",
    h1: "Roofing help from a Queen Creek team.",
    eyebrow: "About Quest",
    meta: "Meet Quest Roofing, a licensed Queen Creek roofing contractor focused on photo-backed inspections and written estimates.",
    body: (pathPrefix) => [
      proofPanel("The team page should make the contractor feel accountable.", "Quest's public story is strongest when it shows how the homeowner moves from first call to documented roof decision.", pathPrefix),
      section("How the team works", `<p>Quest Roofing should feel reachable before the first appointment: clear contact paths, a documented inspection, and recommendations explained in plain language.</p>${cardGrid([
        { title: "First contact", text: "Collect roof type, service area, visible concerns, leak timing, and photos when available." },
        { title: "Field inspection", text: "Review the roof condition and document visible findings instead of relying on vague statements." },
        { title: "Estimate handoff", text: "Explain repair, replacement, materials, timing, and cleanup in a written scope." }
      ])}`),
      section("Who homeowners interact with", `<p>The page is structured around roles rather than invented staff bios. Add real names and photos only when Quest has approved them.</p>${cardGrid([
        { title: "Scheduling", text: "Coordinates the request and helps set realistic appointment expectations." },
        { title: "Inspection", text: "Looks at the roof system, photographs concern areas, and explains what was found." },
        { title: "Project closeout", text: "Confirms approved work, cleanup expectations, and warranty or material notes." }
      ])}`),
      section("Before the appointment", `<p>Homeowners can make the first visit sharper by gathering roof age, leak history, storm timing, HOA notes, and interior stain photos.</p><p class="seo-link-row"><a href="${pathPrefix}/resources/design-your-roof/index.html">Compare roof systems</a><a href="${pathPrefix}/resources/roofing-glossary/index.html">Read the glossary</a></p>`)
    ].join("")
  },
  {
    path: "about-us/completed-projects/",
    title: "Completed Roofing Projects | Quest Roofing",
    h1: "Project proof belongs in the open.",
    eyebrow: "Completed projects",
    meta: "Completed roofing project examples and inspection-oriented proof points from Quest Roofing.",
    body: (pathPrefix) => [
      proofPanel("A projects page should show conditions, scope, and closeout.", "This page is ready for real Quest project photos without fabricating project addresses, dates, or customer names.", pathPrefix),
      section("Project categories", `${cardGrid([
        { title: "Tile repair and underlayment", text: "Document cracked tile, valley concerns, underlayment age, repair limits, and completed closeout photos." },
        { title: "Shingle replacement", text: "Show roof plane condition, material selection, tear-off scope, flashing work, and final shingle installation." },
        { title: "Foam or flat roof recoat", text: "Track coating wear, ponding areas, penetration details, surface prep, and finished protective coating." },
        { title: "Storm damage repair", text: "Organize visible damage, temporary leak control, repair scope, and post-repair roof details." },
        { title: "Metal roofing", text: "Capture panel, seam, trim, flashing, and fastener details for homeowners comparing system options." },
        { title: "Inspection-only findings", text: "Some of the most useful proof is a clear inspection that prevents unnecessary work." }
      ])}`),
      section("Project proof template", `<p>Each future project should answer four questions: what roof system was inspected, what problem was found, what scope was approved, and what closeout proof was captured.</p>${cardGrid([
        { title: "Before", text: "Roof condition photo, visible issue, and homeowner concern." },
        { title: "During", text: "Material, access, prep, tear-off, repair, or installation detail." },
        { title: "After", text: "Finished work, cleanup, and the warranty or workmanship note that applies." }
      ])}`),
      section("Related services", `<p class="seo-link-row"><a href="${pathPrefix}/services/roof-repair/index.html">Roof repair</a><a href="${pathPrefix}/services/roof-inspection/index.html">Free inspection</a><a href="${pathPrefix}/services/tile-roofing/index.html">Tile roofing</a></p>`)
    ].join("")
  },
  {
    path: "about-us/core-values/",
    title: "Core Values | Quest Roofing",
    h1: "Clear scope. Honest guidance. Clean closeout.",
    eyebrow: "Core values",
    meta: "Quest Roofing values for clear communication, documented estimates, repair-first guidance, and respectful jobsite cleanup.",
    body: (pathPrefix) => [
      proofPanel("Values should be visible in the estimate, not only the headline.", "Quest's values translate into documentation, direct recommendations, and a cleaner handoff for homeowners.", pathPrefix),
      section("The working standard", `${cardGrid([
        { title: "Repair-first when appropriate", text: "If a targeted repair solves the problem, the recommendation should not jump straight to replacement." },
        { title: "Replacement when justified", text: "If the system is past practical repair, the estimate should explain the reason in plain language." },
        { title: "Written accountability", text: "Photos, materials, timeline, and price should be visible before work begins." },
        { title: "Respectful cleanup", text: "The yard, driveway, access path, and final walkthrough matter as part of the job." },
        { title: "Local roof knowledge", text: "Arizona heat, monsoon rain, tile underlayment, and flat roof coating all shape the recommendation." },
        { title: "No pressure language", text: "Homeowners should understand the roof condition well enough to make a calm decision." }
      ])}`),
      section("What this means during a roof call", `<p>Quest should be able to explain the problem area, the proposed fix, the material or system involved, and the next step without hiding behind jargon.</p><p class="seo-link-row"><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing glossary</a><a href="${pathPrefix}/index.html#estimate">Request a written estimate</a></p>`)
    ].join("")
  },
  {
    path: "about-us/community-outreach/",
    title: "Community Outreach | Quest Roofing",
    h1: "Community-first roofing support without made-up claims.",
    eyebrow: "Community Outreach",
    meta: "Quest Roofing community outreach page for homeowner education, storm readiness, and practical roof guidance in Arizona.",
    body: (pathPrefix) => [
      proofPanel("Community pages should be useful before they are promotional.", "Until Quest has approved specific sponsorships or outreach events, this page focuses on homeowner education and storm-readiness resources.", pathPrefix),
      section("Useful local support", `${cardGrid([
        { title: "Storm readiness", text: "Help homeowners know what to check before monsoon season and when to call after wind or hail." },
        { title: "Estimate education", text: "Make roofing terms, roof systems, and repair-versus-replace decisions easier to understand." },
        { title: "Neighborhood roof questions", text: "Support HOAs, property managers, and homeowners who need clear roof documentation." }
      ])}`),
      section("No fabricated partnerships", `<p>This page intentionally avoids claiming donations, sponsorships, school projects, or nonprofit work unless Quest approves real details. That is the right long-term trust move.</p>${cardGrid([
        { title: "Add real events later", text: "Use event name, date, location, photos, and what Quest actually contributed." },
        { title: "Add education resources now", text: "Storm checklists, roof terminology, and service guides help local homeowners immediately." },
        { title: "Keep claims verifiable", text: "Community proof should be as documented as a roof estimate." }
      ])}`),
      section("Homeowner resources", `<p class="seo-link-row"><a href="${pathPrefix}/resources/design-your-roof/index.html">Design your roof</a><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing glossary</a><a href="${pathPrefix}/services/roof-inspection/index.html">Free inspection</a></p>`)
    ].join("")
  },
  {
    path: "about-us/reviews/",
    title: "Reviews | Quest Roofing",
    h1: "Reviews should prove the process.",
    eyebrow: "Homeowner stories",
    meta: "Quest Roofing reviews focused on communication, clean work, and honest recommendations.",
    body: (pathPrefix) => [
      proofPanel("Review pages should explain what a good roofing experience feels like.", "The strongest reviews mention communication, cleanup, cost transparency, and whether the recommendation matched the actual roof issue.", pathPrefix),
      section("Review themes homeowners compare", `${cardGrid([
        { title: "Communication", text: "Calls are returned, the appointment is clear, and the homeowner knows what happens next." },
        { title: "Clean work", text: "The jobsite is treated like part of the project, not an afterthought." },
        { title: "Honest recommendation", text: "Repair, replacement, or monitoring is explained with roof-condition evidence." },
        { title: "Written scope", text: "The estimate gives enough detail to compare options and approve the work confidently." },
        { title: "Storm response", text: "After monsoon damage, urgency and documentation both matter." },
        { title: "Closeout", text: "The homeowner understands what was completed and what warranty or material notes apply." }
      ])}`),
      section("Add verified review sources", `<p>When Quest provides approved review feeds or screenshots, place the source, date, and service type here. Do not inflate counts or invent star ratings.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#reviews">Homepage review section</a><a href="${pathPrefix}/index.html#estimate">Request an estimate</a></p>`)
    ].join("")
  },
  {
    path: "gallery/",
    manual: true,
    title: "Roofing Gallery | Quest Roofing",
    h1: "A gallery for roof conditions, repairs, and completed work.",
    eyebrow: "Gallery",
    meta: "Quest Roofing gallery structure for roof inspections, repair details, and completed Arizona roofing work.",
    body: (pathPrefix) => [
      proofPanel("A roofing gallery should do more than look pretty.", "Use this page to show roof conditions, repair details, and finished work so the homeowner sees proof before calling.", pathPrefix),
      section("Gallery categories", `${cardGrid([
        { title: "Tile details", text: "Broken tile, slipped tile, valley work, underlayment clues, and finished replacement areas." },
        { title: "Shingle details", text: "Granule loss, lifted shingles, flashing, tear-off prep, and installed architectural shingles." },
        { title: "Foam and flat details", text: "Coating cracks, ponding patterns, penetration repairs, surface prep, and finished recoats." },
        { title: "Storm damage", text: "Wind movement, impact marks, debris damage, urgent leak points, and completed repair details." },
        { title: "Metal roofing", text: "Panel details, seams, fasteners, trim, and roof-to-wall transitions." },
        { title: "Cleanup and closeout", text: "Final roof condition, yard cleanup, and handoff photos after approved work." }
      ])}`),
      section("Photo standards", `<p>Each gallery entry should include roof system, concern, service area, scope type, and whether the image is before, during, or after work.</p>${roofSystemGrid()}`),
      section("Start from what you are seeing", `<p class="seo-link-row"><a href="${pathPrefix}/services/roof-inspection/index.html">Roof inspection</a><a href="${pathPrefix}/services/roof-repair/index.html">Roof repair</a><a href="${pathPrefix}/services/tile-roofing/index.html">Tile roofing</a></p>`)
    ].join("")
  },
  {
    path: "resources/design-your-roof/",
    title: "Design Your Roof | Quest Roofing",
    h1: "Compare roofing options before the estimate.",
    eyebrow: "Resources",
    meta: "Roof material planning resource for tile, shingle, foam, and metal roofing decisions in Arizona.",
    body: (pathPrefix) => [
      proofPanel("Roof design starts with the roof you actually have.", "Tile, shingle, foam, flat, and metal each solve different Arizona roof needs. The right choice depends on slope, age, budget, HOA expectations, and heat exposure.", pathPrefix),
      section("Compare roof systems", roofSystemGrid()),
      section("Questions to answer before choosing", `${cardGrid([
        { title: "What is the roof slope?", text: "Flat and low-slope sections need different systems than steep shingle or tile areas." },
        { title: "What is failing?", text: "Underlayment, coating, flashing, fasteners, and surface material call for different fixes." },
        { title: "What does the neighborhood require?", text: "HOA expectations, color, profile, and visible roof style can affect the final recommendation." },
        { title: "How long will you own the home?", text: "A short-term repair and a long-term replacement may both be valid, depending on your plan." },
        { title: "What has leaked before?", text: "Past leak history helps the inspection focus on valleys, penetrations, transitions, and drainage." },
        { title: "What proof do you need?", text: "Photos and a written scope help compare estimates without pressure." }
      ])}`),
      section("Bring this to the estimate", `<p>Roof age, leak history, photos, storm timing, HOA notes, and preferred roof material make the first conversation more useful.</p><p class="seo-link-row"><a href="${pathPrefix}/services/tile-roofing/index.html">Tile</a><a href="${pathPrefix}/services/shingle-roofing/index.html">Shingle</a><a href="${pathPrefix}/services/foam-roofing/index.html">Foam</a><a href="${pathPrefix}/services/metal-roofing/index.html">Metal</a></p>`)
    ].join("")
  },
  {
    path: "resources/roofing-glossary/",
    title: "Roofing Glossary | Quest Roofing",
    h1: "Plain-English roofing terms.",
    eyebrow: "Resources",
    meta: "Simple roofing glossary for Arizona homeowners comparing estimates and inspection findings.",
    body: (pathPrefix) => [
      proofPanel("A glossary makes estimates easier to compare.", "A written estimate is easier to understand when the homeowner knows what part of the roof is being repaired or replaced.", pathPrefix),
      section("Common estimate terms", `${cardGrid([
        { title: "Underlayment", text: "The protective layer beneath tile that often matters more than the tile surface itself." },
        { title: "Flashing", text: "Metal or roof detail used around walls, edges, chimneys, and transitions to control water." },
        { title: "Penetration", text: "Anything passing through the roof surface, such as vents, pipes, skylights, or equipment." },
        { title: "Valley", text: "The area where roof planes meet and water concentrates during rain." },
        { title: "Coating", text: "The protective top layer used on foam and some flat roof systems." },
        { title: "Decking", text: "The structural roof surface below the roofing assembly." },
        { title: "Fastener", text: "Screws, nails, or other attachments that can loosen or age over time." },
        { title: "Ridge", text: "The high line where two roof planes meet." },
        { title: "Scope", text: "The written description of what work is included, excluded, and priced." }
      ])}`),
      section("Why these terms matter", `<p>When a contractor says the problem is flashing, underlayment, coating, or decking, the estimate should connect that term to a specific roof condition photo.</p><p class="seo-link-row"><a href="${pathPrefix}/services/roof-inspection/index.html">Schedule an inspection</a><a href="${pathPrefix}/resources/design-your-roof/index.html">Compare roof systems</a></p>`)
    ].join("")
  },
  {
    path: "contact/",
    title: "Contact Quest Roofing",
    h1: "Contact Quest Roofing.",
    eyebrow: "Contact",
    meta: "Contact Quest Roofing for a free inspection or written roofing estimate from a Queen Creek-based Arizona roofing contractor.",
    body: (pathPrefix) => [
      proofPanel("A contact page should help the homeowner make a clean request.", `Call ${phone} or email ${email} to start a roof inspection request.`, pathPrefix),
      section("Fastest ways to start", `${cardGrid([
        { title: "Call", text: `${phone} for urgent leaks, scheduling questions, or a direct estimate request.` },
        { title: "Email", text: `${email} with your name, address or cross streets, service need, and photos if available.` },
        { title: "Estimate form", text: "Use the homepage form when you want to organize the request by roof service and contact details." }
      ])}`),
      section("What to send", `<p>Include your address or nearest cross streets, roof type if known, leak location, storm timing, interior stain photos, exterior roof photos if safe, and whether the property is residential or commercial.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Open estimate form</a><a href="tel:6023996455">Call ${phone}</a><a href="mailto:${email}">Email Quest</a></p>`),
      section("Common request paths", `<p class="seo-link-row"><a href="${pathPrefix}/services/roof-repair/index.html">Roof repair</a><a href="${pathPrefix}/services/roof-inspection/index.html">Free inspection</a><a href="${pathPrefix}/services/tile-roofing/index.html">Tile roofing</a><a href="${pathPrefix}/services/foam-roofing/index.html">Foam roofing</a></p>`)
    ].join("")
  }
];

supportPages.forEach((page) => {
  if (page.manual) {
    return;
  }

  const canonical = `${siteUrl}/${page.path}`;
  const pathPrefix = page.path.split("/").length > 2 ? "../.." : "..";
  const body = `${page.body(pathPrefix)}${section("Start a request", `<p>Use the main estimate form when you are ready to talk through the roof condition with Quest.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Request an estimate</a></p>`)}`;
  const schema = pageSchema({
    canonical,
    title: page.title,
    meta: page.meta,
    breadcrumbs: [
      { name: "Home", url: `${siteUrl}/` },
      { name: page.eyebrow, url: canonical }
    ]
  });
  const html = layout({ title: page.title, meta: page.meta, canonical, h1: page.h1, eyebrow: page.eyebrow, body, schema, pathPrefix });
  const file = join(page.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
});

const urls = [
  ["", "1.0"],
  ...publishedServices.map((service) => [`services/${service.slug}/`, "0.9"]),
  ...cities.map((city) => [`roofing-${city.slug}-az/`, "0.85"]),
  ...supportPages.map((page) => [page.path, "0.75"])
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

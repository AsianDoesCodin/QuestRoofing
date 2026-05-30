import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://questroofing.com";
const phone = "602-399-6455";
const phoneHref = "tel:6023996455";
const email = "info@questroofing.com";
const logo = "https://questroofing.com/wp-content/uploads/2024/12/Untitled-design-92-1.png";
const socialImage = `${siteUrl}/assets/quest-roofing-real/quest-roofing-social-card.jpg`;
const today = "2026-05-30";

const services = [
  {
    slug: "roof-repair",
    title: "Roof Repair in Phoenix, AZ | Quest Roofing",
    h1: "Roof Repair in Phoenix, AZ",
    meta: "We repair Phoenix-area roof leaks, storm damage, tile, shingle, foam, and metal roofs with free inspections and written estimates.",
    name: "Roof Repair",
    intro: "We repair Phoenix-area roofs with photo-backed inspections and written estimates. If a targeted repair can solve the problem, we will explain that option clearly before you approve any work.",
    signs: ["Ceiling stains after rain", "Broken or slipped tiles", "Lifted shingles or exposed fasteners", "Foam roof cracks or worn coating", "Flashing or penetration leaks"],
    process: ["Inspect the leak source and surrounding roof area", "Document problem areas with photos", "Explain repair scope, materials, timing, and price", "Complete approved repair work and cleanup", "Review the work and warranty details"],
    faq: [
      ["Can Quest repair a roof instead of replacing it?", "Yes. When repair is the right fix, we will show you why and put the recommendation in writing instead of pushing a vague replacement pitch."],
      ["Do roof repairs include a free inspection?", "Yes. We can start roof repair requests with a free inspection and a written estimate."]
    ]
  },
  {
    slug: "roof-inspection",
    title: "Roof Inspection Phoenix AZ | Quest Roofing",
    h1: "Roof Inspection in Phoenix, AZ",
    meta: "We provide free Phoenix roof inspections with photos and written estimates for tile, shingle, foam, and metal roofs.",
    name: "Roof Inspection",
    intro: "Our roof inspections make the condition of your roof easier to understand. We use photos and written estimates so you can see what is wrong, what can wait, and what needs attention now.",
    signs: ["Buying or selling a home", "Recent monsoon wind or rain", "Interior staining", "Aging tile underlayment", "Foam roof surface wear"],
    process: ["Review roof type and access points", "Inspect likely leak and wear areas", "Photograph notable findings", "Explain repair or replacement choices", "Provide a written estimate when work is needed"],
    faq: [
      ["Are inspections free?", "Yes. We can start roof inspection requests with a free inspection."],
      ["Will I get photos?", "Yes. We back inspections with photos so problem areas are easier to understand."]
    ]
  },
  {
    slug: "tile-roofing",
    title: "Tile Roofing Phoenix AZ | Quest Roofing",
    h1: "Tile Roofing in Phoenix, AZ",
    meta: "We handle Phoenix tile roof repair, underlayment replacement, and new tile installation with free written estimates.",
    name: "Tile Roofing",
    intro: "Tile roofing is common across Arizona homes, but the tile is only one part of the system. We handle tile repair, underlayment replacement, and new tile installation with clear scope before work begins.",
    signs: ["Cracked or missing tiles", "Aging underlayment", "Leaks around valleys or penetrations", "Visible slipped tiles", "Storm movement or impact damage"],
    process: ["Inspect tiles, flashings, penetrations, and underlayment clues", "Identify repairable areas", "Explain underlayment concerns when present", "Prepare a written tile roofing estimate", "Complete approved repair or replacement work"],
    faq: [
      ["How long can tile roofs last?", "Tile roofs can last for decades, but the underlayment beneath the tile usually needs attention much sooner."],
      ["Do you repair tile roofs?", "Yes. We repair tile roofs, replace damaged tile, and handle larger tile roofing work when the system needs it."]
    ]
  },
  {
    slug: "shingle-roofing",
    title: "Shingle Roofing Phoenix AZ | Quest Roofing",
    h1: "Shingle Roofing in Phoenix, AZ",
    meta: "We repair and replace Phoenix shingle roofs using GAF and Owens Corning materials, with free written estimates.",
    name: "Shingle Roofing",
    intro: "We install and repair architectural asphalt shingle systems using GAF and Owens Corning materials. Our written estimate clarifies whether repair or replacement makes the most sense for your roof.",
    signs: ["Lifted or missing shingles", "Granule loss", "Storm damage", "Leaks at flashing", "A roof near the end of its expected life"],
    process: ["Inspect shingle field and edges", "Check penetrations and flashings", "Document damage or wear", "Recommend repair or replacement", "Review materials and timing"],
    faq: [
      ["What shingle materials do you use?", "We work with GAF and Owens Corning materials for shingle roofing projects."],
      ["How long do shingle roofs last in Arizona?", "Arizona heat shortens shingle life compared with milder climates, so inspections matter as the roof ages."]
    ]
  },
  {
    slug: "foam-roofing",
    title: "Foam Roofing Phoenix AZ | Quest Roofing",
    h1: "Foam Roofing in Phoenix, AZ",
    meta: "We provide Phoenix foam roofing and recoats for flat and low-slope roofs with inspections and written estimates.",
    name: "Foam Roofing",
    intro: "Foam roofing is a strong option for flat and low-slope Arizona roofs. We handle spray polyurethane foam roofing and recoats when the surface needs renewed protection.",
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
    meta: "We repair and replace Phoenix metal roofs, including standing seam and exposed-fastener systems. Get a free estimate.",
    name: "Metal Roofing",
    intro: "We work with standing seam and exposed-fastener metal roof systems. Metal roofing can handle Arizona heat well, but fasteners, seams, and flashings still need careful inspection.",
    signs: ["Loose or aging fasteners", "Leaks near penetrations", "Panel movement", "Damaged trim or flashing", "Storm-related impact concerns"],
    process: ["Inspect seams, panels, fasteners, and flashings", "Document repair points", "Explain material and system options", "Prepare written estimate", "Complete approved repair or replacement"],
    faq: [
      ["How long can metal roofing last?", "Metal roof life depends on the system, fasteners, flashing details, and maintenance."],
      ["Do you handle metal roofing?", "Yes. We repair and replace metal roofing systems, including standing seam and exposed-fastener roofs."]
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
  ["phoenix", "Phoenix", "We help Phoenix homeowners with roof repair, replacement, inspections, and storm response across central, north, and surrounding Phoenix neighborhoods.", ["Tile and shingle systems both appear throughout Phoenix neighborhoods", "Flat and foam roof sections are common on many desert homes", "Monsoon wind and heat exposure make written inspections important"]],
  ["scottsdale", "Scottsdale", "We help Scottsdale homeowners protect tile, foam, and metal roof systems where appearance, HOA expectations, and clear documentation all matter.", ["Tile roofs are common across many Scottsdale homes", "Foam and flat roof sections need coating attention", "Written scopes help homeowners compare repair versus replacement clearly"]],
  ["paradise-valley", "Paradise Valley", "We help Paradise Valley homeowners with a clean process, careful documentation, and roof systems that fit higher-end residential properties.", ["Tile and specialty roof details need careful inspection", "We check valleys, penetrations, and transitions during leak diagnosis", "Clear written estimates matter before approving work"]],
  ["gilbert", "Gilbert", "We serve Gilbert from our Queen Creek base and help homeowners with tile, shingle, foam, metal, repair, and replacement needs.", ["Tile and shingle roofs are common", "Monsoon leaks can show up around penetrations", "Local scheduling keeps this area practical for the crew"]],
  ["queen-creek", "Queen Creek", "Queen Creek is our home base, so local inspections, repairs, and replacements are a natural part of the way we serve Arizona homeowners.", ["Local proximity supports faster scheduling", "Tile, shingle, foam, and metal systems are all relevant", "Homeowners can ask for written estimates and inspection photos"]],
  ["mesa", "Mesa", "We help Mesa homeowners with older and newer roof systems, including repair, replacement, inspections, tile, shingle, foam, and metal roofing.", ["Older roof systems may need careful repair-versus-replace review", "Tile underlayment concerns are common in Arizona", "Foam and flat roof sections need coating attention"]],
  ["chandler", "Chandler", "We help Chandler homeowners get clear repair guidance, written estimates, and roof system options from a nearby Arizona roofing contractor.", ["Tile and shingle systems are common", "Storm-season leak response matters", "Written estimates help avoid pressure selling"]],
  ["tempe", "Tempe", "We help Tempe homeowners compare repair, inspection, shingle, tile, foam, and replacement options with a clear written scope.", ["Mixed roof ages make inspection detail important", "Flat and low-slope sections appear on many properties", "Clear scope helps homeowners compare options"]]
].map(([slug, name, intro, localNotes]) => ({
  slug,
  name,
  title: `Roofing Company in ${name}, AZ | Quest Roofing`,
  h1: `Roofing Company in ${name}, AZ`,
  meta: `We serve ${name}, AZ with roof repair, replacement, tile, shingle, foam, metal roofing, and free written estimates.`,
  intro,
  localNotes
}));

const layout = ({ title, meta, canonical, body, schema, pathPrefix = "..", bodyClass = "", intro = "" }) => `<!DOCTYPE html>
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
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${meta}">
  <meta name="twitter:image" content="${socialImage}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${pathPrefix}/tokens.css">
  <link rel="stylesheet" href="${pathPrefix}/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
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
    <main class="subpage-main">
${intro}
${body}
    </main>
    <footer class="site-footer">
      <div class="container footer-inner footer-inner-wide">
        <div>
          <p class="footer-brand">Quest Roofing</p>
          <p class="footer-copy">We are a licensed roofing contractor based in Queen Creek, Arizona.</p>
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

const section = (heading, content, className = "") => `<section class="section-band section-light seo-section${className ? ` ${className}` : ""}"><div class="container"><h2>${heading}</h2>${content}</div></section>`;
const list = (items) => `<ul class="seo-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const faqHtml = (faq) => `<div class="faq-list">${faq.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;

const estimateLink = (pathPrefix, label = "Request a written estimate") => `<a class="subpage-text-link" href="${pathPrefix}/index.html#estimate">${label}</a>`;
const callLink = `<a class="subpage-text-link" href="${phoneHref}">Call ${phone}</a>`;
const keyedList = (items, className) => `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const serviceDesigns = {
  "roof-repair": {
    shape: "triage",
    label: "Repair triage",
    summary: "We start by separating active leaks, visible damage, and repairable roof details so the estimate does not jump straight to replacement.",
    panelTitle: "First things we isolate",
    prompt: "Send photos of the leak area if you have them. We will still verify the roof condition before quoting work."
  },
  "tile-roofing": {
    shape: "photo-led",
    label: "Tile system review",
    summary: "We look past the tile surface and check underlayment clues, valleys, penetrations, and tile movement before recommending repair or replacement.",
    panelTitle: "Tile work has layers",
    prompt: "The visible tile matters, but the system underneath often decides the scope."
  },
  "shingle-roofing": {
    shape: "comparison",
    label: "Shingle decision guide",
    summary: "We compare repair, partial replacement, and full replacement based on shingle field condition, flashing, roof age, and heat exposure.",
    panelTitle: "Repair or replace?",
    prompt: "We explain which path fits the roof instead of making every shingle call sound the same."
  },
  "metal-roofing": {
    shape: "spec",
    label: "Metal roof details",
    summary: "We inspect seams, fasteners, panels, flashings, trim, and penetrations because metal roof performance depends on the details.",
    panelTitle: "Details we document",
    prompt: "Metal roofing can be durable in Arizona, but only when the weak points are handled cleanly."
  },
  "foam-roofing": {
    shape: "coating",
    label: "Foam and flat roof review",
    summary: "We look at coating wear, drainage, cracks, punctures, ponding, and recoat timing before we quote foam or flat roof work.",
    panelTitle: "Surface condition first",
    prompt: "A recoat can be the right answer when the existing foam system is still sound."
  },
  "roof-inspection": {
    shape: "checklist",
    label: "Inspection workbench",
    summary: "We use photos, plain-language notes, and a written estimate when work is needed so the roof condition is easier to compare.",
    panelTitle: "What the inspection should answer",
    prompt: "The goal is clarity: what is wrong, what can wait, and what needs attention."
  }
};

const serviceIntroPanel = (service, design, pathPrefix) => {
  if (design.shape === "triage") {
    return `<div class="service-diagnostic-board">
      <p class="panel-label">${design.panelTitle}</p>
      ${service.signs.slice(0, 4).map((sign, index) => `<article><span>0${index + 1}</span><strong>${sign}</strong></article>`).join("")}
      <p>${design.prompt}</p>
    </div>`;
  }

  if (design.shape === "photo-led") {
    return `<figure class="service-photo-proof service-photo-proof-tile">
      <span>${design.panelTitle}</span>
      <figcaption>${design.prompt}</figcaption>
    </figure>`;
  }

  if (design.shape === "comparison") {
    return `<div class="service-compare-board">
      <div><span>Repair</span><p>Localized damage, clear leak source, and useful remaining roof life.</p></div>
      <div><span>Replace</span><p>Widespread wear, repeated leaks, or system age that makes patching a poor value.</p></div>
      ${estimateLink(pathPrefix, "Compare options with us")}
    </div>`;
  }

  if (design.shape === "spec") {
    return `<div class="service-spec-sheet">
      <p class="panel-label">${design.panelTitle}</p>
      ${service.signs.map((sign) => `<div><span>${sign}</span><strong>Inspect and document</strong></div>`).join("")}
    </div>`;
  }

  if (design.shape === "coating") {
    return `<div class="service-coating-board">
      <p class="panel-label">${design.panelTitle}</p>
      <div class="coating-layers" aria-hidden="true"><span></span><span></span><span></span></div>
      ${keyedList(service.signs.slice(0, 4), "service-mini-list")}
      <p>${design.prompt}</p>
    </div>`;
  }

  return `<div class="service-checklist-board">
    <p class="panel-label">${design.panelTitle}</p>
    ${service.process.slice(0, 5).map((item) => `<label><input type="checkbox" checked disabled><span>${item}</span></label>`).join("")}
  </div>`;
};

const serviceIntro = (service, pathPrefix) => {
  const design = serviceDesigns[service.slug];
  return `<section class="subpage-intro service-intro service-intro-${design.shape}" aria-labelledby="page-title">
    <div class="container service-intro-grid">
      <div class="subpage-intro-copy">
        <p class="eyebrow">${design.label}</p>
        <h1 id="page-title">${service.h1}</h1>
        <p>${design.summary}</p>
        <div class="subpage-action-row">
          ${estimateLink(pathPrefix)}
          ${callLink}
        </div>
      </div>
      ${serviceIntroPanel(service, design, pathPrefix)}
    </div>
  </section>`;
};

const cityDesigns = {
  phoenix: { shape: "heat-index", label: "Phoenix roof conditions", panelTitle: "Heat, monsoon rain, and mixed roof systems" },
  scottsdale: { shape: "hoa-grid", label: "Scottsdale roof decisions", panelTitle: "Appearance and documentation both matter" },
  "paradise-valley": { shape: "detail-led", label: "Paradise Valley roof details", panelTitle: "Careful scopes for higher-expectation properties" },
  gilbert: { shape: "route", label: "Gilbert service path", panelTitle: "Nearby scheduling from our Queen Creek base" },
  "queen-creek": { shape: "home-base", label: "Our home base", panelTitle: "Queen Creek calls stay close to the crew" },
  mesa: { shape: "audit", label: "Mesa roof audit", panelTitle: "Older and newer systems need different questions" },
  chandler: { shape: "matrix", label: "Chandler roof planning", panelTitle: "Repair guidance without pressure" },
  tempe: { shape: "check", label: "Tempe roof checklist", panelTitle: "Mixed roof ages, flat sections, and clear scope" }
};

const cityIntro = (city, pathPrefix) => {
  const design = cityDesigns[city.slug];
  return `<section class="subpage-intro city-intro city-intro-${design.shape}" aria-labelledby="page-title">
    <div class="container city-intro-grid">
      <div class="subpage-intro-copy">
        <p class="eyebrow">${design.label}</p>
        <h1 id="page-title">${city.h1}</h1>
        <p>${city.intro}</p>
        <div class="city-link-line">
          ${publishedServices.map((service) => `<a href="${pathPrefix}/services/${service.slug}/index.html">${serviceLabel(service)}</a>`).join("")}
        </div>
      </div>
      <aside class="city-context-card">
        <p class="panel-label">${design.panelTitle}</p>
        ${keyedList(city.localNotes, "city-note-list")}
        ${estimateLink(pathPrefix, `Request a ${city.name} estimate`)}
      </aside>
    </div>
  </section>`;
};

const supportIntro = (page, pathPrefix) => {
  const supportSlug = page.path.replace(/\/$/, "").replace(/\//g, "-");
  const baseCopy = `<div class="subpage-intro-copy"><p class="eyebrow">${page.eyebrow}</p><h1 id="page-title">${page.h1}</h1><p>${page.meta}</p></div>`;

  if (page.path === "about-us/our-team/") {
    return `<section class="subpage-intro support-intro team-intro" aria-labelledby="page-title"><div class="container team-intro-grid">${baseCopy}<ol class="team-flow"><li><span>Call</span><strong>We gather the roof concern.</strong></li><li><span>Inspect</span><strong>We document what we find.</strong></li><li><span>Estimate</span><strong>We explain the written scope.</strong></li></ol></div></section>`;
  }

  if (page.path === "about-us/core-values/") {
    return `<section class="subpage-intro support-intro values-intro" aria-labelledby="page-title"><div class="container values-intro-grid">${baseCopy}<div class="values-statement"><p>We would rather earn the project with clear evidence than pressure you into a decision.</p>${estimateLink(pathPrefix, "See the process")}</div></div></section>`;
  }

  if (page.path === "about-us/community-outreach/") {
    return `<section class="subpage-intro support-intro community-intro" aria-labelledby="page-title"><div class="container community-intro-grid">${baseCopy}<div class="community-resource-board"><a href="${pathPrefix}/resources/design-your-roof/index.html">Roof planning</a><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing terms</a><a href="${pathPrefix}/services/roof-inspection/index.html">Storm readiness</a></div></div></section>`;
  }

  if (page.path === "about-us/reviews/") {
    return `<section class="subpage-intro support-intro reviews-intro" aria-labelledby="page-title"><div class="container reviews-intro-grid">${baseCopy}<div class="review-proof-note"><p class="panel-label">Review standard</p><p>We only want public proof that can be verified, so the page stays trustworthy instead of inflated.</p><a href="${pathPrefix}/index.html#reviews">Go to review section</a></div></div></section>`;
  }

  if (page.path === "resources/design-your-roof/") {
    return `<section class="subpage-intro support-intro roof-design-intro" aria-labelledby="page-title"><div class="container roof-design-intro-grid">${baseCopy}<div class="roof-system-switcher"><a href="${pathPrefix}/services/tile-roofing/index.html">Tile</a><a href="${pathPrefix}/services/shingle-roofing/index.html">Shingle</a><a href="${pathPrefix}/services/foam-roofing/index.html">Foam</a><a href="${pathPrefix}/services/metal-roofing/index.html">Metal</a></div></div></section>`;
  }

  if (page.path === "resources/roofing-glossary/") {
    return `<section class="subpage-intro support-intro glossary-intro" aria-labelledby="page-title"><div class="container glossary-intro-grid">${baseCopy}<div class="glossary-term-cloud"><span>Underlayment</span><span>Flashing</span><span>Valley</span><span>Coating</span><span>Decking</span><span>Scope</span></div></div></section>`;
  }

  if (page.path === "contact/") {
    return `<section class="subpage-intro support-intro contact-intro" aria-labelledby="page-title"><div class="container contact-intro-grid">${baseCopy}<div class="contact-start-panel"><a href="${phoneHref}"><span>Call</span><strong>${phone}</strong></a><a href="mailto:${email}"><span>Email</span><strong>${email}</strong></a><a href="${pathPrefix}/index.html#estimate"><span>Form</span><strong>Open estimate request</strong></a></div></div></section>`;
  }

  return `<section class="subpage-intro support-intro support-intro-${supportSlug}" aria-labelledby="page-title"><div class="container support-intro-grid">${baseCopy}${estimateLink(pathPrefix)}</div></section>`;
};

const supportFinalCta = (page, pathPrefix) => {
  if (page.path === "contact/") {
    return section("Ready to send the details?", `<p>Use the form, call us, or email photos. We will help organize the request around roof condition and timing.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Open estimate form</a><a href="${phoneHref}">Call ${phone}</a><a href="mailto:${email}">Email photos</a></p>`, "seo-section-cta");
  }

  if (page.path.startsWith("resources/")) {
    return section("Use this during the estimate", `<p>Bring the roof age, leak history, photos, storm timing, and material questions. We will connect the guide back to your actual roof.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Request an estimate</a><a href="${pathPrefix}/services/roof-inspection/index.html">Schedule an inspection</a></p>`, "seo-section-cta");
  }

  return section("Start with documented proof", `<p>When you are ready, we can inspect the roof, show you what we find, and put the recommendation in writing.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Request an estimate</a><a href="${phoneHref}">Call ${phone}</a></p>`, "seo-section-cta");
};

publishedServices.forEach((service) => {
  const canonical = `${siteUrl}/services/${service.slug}/`;
  const cityLinkList = cities.map((city) => `<a href="../../roofing-${city.slug}-az/index.html">${city.name}</a>`).join(", ");
  const body = [
    section(`What ${service.name} includes`, `<p>${service.intro}</p>${list(service.process)}`),
    section(`Signs you may need ${service.name.toLowerCase()}`, `<div class="seo-card-grid">${service.signs.map((sign) => `<article><span></span><h3>${sign}</h3><p>We document this during inspection so your estimate is tied to the actual roof condition.</p></article>`).join("")}</div>`),
    section("How we keep the request clear", `<div class="seo-card-grid seo-card-grid-3"><article><h3>Photo-backed inspection</h3><p>We make roof concerns easier to evaluate by showing you the problem areas.</p></article><article><h3>Repair-versus-replace context</h3><p>We explain whether a targeted repair is enough or whether the system needs larger work.</p></article><article><h3>Closeout expectations</h3><p>We discuss cleanup, workmanship coverage, and manufacturer materials as part of the project conversation.</p></article></div>`),
    section("Service areas", `<p>We are based in Queen Creek and serve homeowners across the greater Phoenix area, including Scottsdale, Paradise Valley, Fountain Hills, and Phoenix-area communities.</p><p class="seo-link-row">${cityLinkList}</p>`),
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
  const html = layout({
    title: service.title,
    meta: service.meta,
    canonical,
    body,
    schema,
    pathPrefix: "../..",
    intro: serviceIntro(service, "../.."),
    bodyClass: `subpage subpage-service subpage-${service.slug}`
  });
  const file = join("services", service.slug, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
});

cities.forEach((city) => {
  const canonical = `${siteUrl}/roofing-${city.slug}-az/`;
  const serviceLinkList = publishedServices.map((service) => `<a href="../services/${service.slug}/index.html">${serviceLabel(service)}</a>`).join(", ");
  const faq = [
    [`Does Quest Roofing serve ${city.name}?`, `Yes. We serve ${city.name} as part of our Arizona roofing service area from our Queen Creek base.`],
    [`What roofing services are available in ${city.name}?`, "We offer roof repair, roof inspection, tile, shingle, foam, and metal roofing services."],
    [`Can I get a written estimate in ${city.name}?`, "Yes. We use inspection photos and written estimates so the scope is clear before work starts."]
  ];
  const body = [
    section(`Roofing services in ${city.name}`, `<p>${city.intro}</p><p class="seo-link-row">${serviceLinkList}</p>`),
    section(`${city.name} roof concerns`, `<div class="seo-card-grid">${city.localNotes.map((note) => `<article><span></span><h3>${note}</h3><p>We explain what we find and put our recommendation in writing.</p></article>`).join("")}</div>`),
    section(`Why ${city.name} homeowners call Quest`, `<p>We keep recommendations direct: we inspect the roof, explain what is wrong, and provide a written estimate instead of a vague verbal guess. We also make AZ ROC #355136, GAF certification, and workmanship expectations easy to find.</p>`),
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
  const html = layout({
    title: city.title,
    meta: city.meta,
    canonical,
    body,
    schema,
    pathPrefix: "..",
    intro: cityIntro(city, ".."),
    bodyClass: `subpage subpage-city subpage-${city.slug}`
  });
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
    h1: "Roofing help from our Queen Creek team.",
    eyebrow: "About Quest",
    meta: "Meet our Queen Creek roofing team. We focus on photo-backed inspections, straight recommendations, and written estimates.",
    body: (pathPrefix) => [
      section("How our team works", `<p>We stay reachable before the first appointment with clear contact paths, documented inspections, and recommendations explained in plain language.</p>${cardGrid([
        { title: "First contact", text: "We collect roof type, service area, visible concerns, leak timing, and photos when available." },
        { title: "Field inspection", text: "We review the roof condition and document visible findings instead of relying on vague statements." },
        { title: "Estimate handoff", text: "We explain repair, replacement, materials, timing, and cleanup in a written scope." }
      ])}`),
      section("Who you interact with", `<p>We keep the process practical: scheduling, inspection, estimate, approved work, and closeout each have a clear purpose.</p>${cardGrid([
        { title: "Scheduling", text: "We coordinate the request and help set realistic appointment expectations." },
        { title: "Inspection", text: "We look at the roof system, photograph concern areas, and explain what we found." },
        { title: "Project closeout", text: "We confirm approved work, cleanup expectations, and warranty or material notes." }
      ])}`),
      section("Before the appointment", `<p>You can make the first visit sharper by gathering roof age, leak history, storm timing, HOA notes, and interior stain photos.</p><p class="seo-link-row"><a href="${pathPrefix}/resources/design-your-roof/index.html">Compare roof systems</a><a href="${pathPrefix}/resources/roofing-glossary/index.html">Read the glossary</a></p>`)
    ].join("")
  },
  {
    path: "about-us/completed-projects/",
    manual: true,
    title: "Completed Roofing Projects | Quest Roofing",
    h1: "We put project proof in the open.",
    eyebrow: "Completed projects",
    meta: "See how we document roofing projects with condition photos, clear scopes, and closeout details."
  },
  {
    path: "about-us/core-values/",
    title: "Core Values | Quest Roofing",
    h1: "Clear scope. Honest guidance. Clean closeout.",
    eyebrow: "Core values",
    meta: "Our roofing values are clear communication, documented estimates, repair-first guidance, and respectful jobsite cleanup.",
    body: (pathPrefix) => [
      section("Our working standard", `${cardGrid([
        { title: "Repair-first when appropriate", text: "If a targeted repair solves the problem, we will not jump straight to replacement." },
        { title: "Replacement when justified", text: "If the system is past practical repair, we explain the reason in plain language." },
        { title: "Written accountability", text: "We put photos, materials, timeline, and price in front of you before work begins." },
        { title: "Respectful cleanup", text: "We treat the yard, driveway, access path, and final walkthrough as part of the job." },
        { title: "Local roof knowledge", text: "We account for Arizona heat, monsoon rain, tile underlayment, and flat roof coating when we recommend a fix." },
        { title: "No pressure language", text: "We want you to understand the roof condition well enough to make a calm decision." }
      ])}`),
      section("What this means during a roof call", `<p>We explain the problem area, the proposed fix, the material or system involved, and the next step without hiding behind jargon.</p><p class="seo-link-row"><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing glossary</a><a href="${pathPrefix}/index.html#estimate">Request a written estimate</a></p>`)
    ].join("")
  },
  {
    path: "about-us/community-outreach/",
    title: "Community Outreach | Quest Roofing",
    h1: "We support our community with useful roof guidance.",
    eyebrow: "Community Outreach",
    meta: "Our community outreach focuses on homeowner education, storm readiness, and practical roof guidance in Arizona.",
    body: (pathPrefix) => [
      section("Useful local support", `${cardGrid([
        { title: "Storm readiness", text: "We help homeowners know what to check before monsoon season and when to call after wind or hail." },
        { title: "Estimate education", text: "We make roofing terms, roof systems, and repair-versus-replace decisions easier to understand." },
        { title: "Neighborhood roof questions", text: "We support HOAs, property managers, and homeowners who need clear roof documentation." }
      ])}`),
      section("Trustworthy community proof", `<p>We do not claim donations, sponsorships, school projects, or nonprofit work unless we can back them with real details. That keeps trust stronger long term.</p>${cardGrid([
        { title: "Real events", text: "When we share an event, we include the name, date, location, photos, and what we actually contributed." },
        { title: "Helpful resources", text: "Storm checklists, roof terminology, and service guides help local homeowners immediately." },
        { title: "Verifiable claims", text: "We hold community proof to the same standard as a roof estimate: make it clear and document it." }
      ])}`),
      section("Homeowner resources", `<p class="seo-link-row"><a href="${pathPrefix}/resources/design-your-roof/index.html">Design your roof</a><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing glossary</a><a href="${pathPrefix}/services/roof-inspection/index.html">Free inspection</a></p>`)
    ].join("")
  },
  {
    path: "about-us/reviews/",
    title: "Reviews | Quest Roofing",
    h1: "Our reviews prove the process.",
    eyebrow: "Homeowner stories",
    meta: "Our roofing reviews focus on communication, clean work, cost clarity, and honest recommendations.",
    body: (pathPrefix) => [
      section("Review themes homeowners compare", `${cardGrid([
        { title: "Communication", text: "We return calls, clarify appointments, and make sure the homeowner knows what happens next." },
        { title: "Clean work", text: "We treat the jobsite like part of the project, not an afterthought." },
        { title: "Honest recommendation", text: "We explain repair, replacement, or monitoring with roof-condition evidence." },
        { title: "Written scope", text: "We give enough estimate detail to compare options and approve the work confidently." },
        { title: "Storm response", text: "After monsoon damage, urgency and documentation both matter." },
        { title: "Closeout", text: "We make sure the homeowner understands what was completed and what warranty or material notes apply." }
      ])}`),
      section("Verified review sources", `<p>We only want to publish review counts, ratings, and customer details when they come from approved review feeds or screenshots. That keeps our proof clean and believable.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#reviews">Homepage review section</a><a href="${pathPrefix}/index.html#estimate">Request an estimate</a></p>`)
    ].join("")
  },
  {
    path: "gallery/",
    manual: true,
    title: "Roofing Gallery | Quest Roofing",
    h1: "We show roof conditions, repairs, and completed work.",
    eyebrow: "Gallery",
    meta: "Browse our roofing gallery for roof inspections, repair details, and completed Arizona roofing work."
  },
  {
    path: "resources/design-your-roof/",
    title: "Design Your Roof | Quest Roofing",
    h1: "Compare roofing options before we estimate the work.",
    eyebrow: "Resources",
    meta: "Use our roof material planning resource to compare tile, shingle, foam, and metal roofing decisions in Arizona.",
    body: (pathPrefix) => [
      section("Compare roof systems", roofSystemGrid()),
      section("Questions to answer before choosing", `${cardGrid([
        { title: "What is the roof slope?", text: "Flat and low-slope sections need different systems than steep shingle or tile areas." },
        { title: "What is failing?", text: "Underlayment, coating, flashing, fasteners, and surface material call for different fixes." },
        { title: "What does the neighborhood require?", text: "HOA expectations, color, profile, and visible roof style can affect our final recommendation." },
        { title: "How long will you own the home?", text: "A short-term repair and a long-term replacement may both be valid, depending on your plan." },
        { title: "What has leaked before?", text: "Past leak history helps us focus the inspection on valleys, penetrations, transitions, and drainage." },
        { title: "What proof do you need?", text: "Photos and a written scope help compare estimates without pressure." }
      ])}`),
      section("Bring this to the estimate", `<p>Roof age, leak history, photos, storm timing, HOA notes, and preferred roof material help us make the first conversation more useful.</p><p class="seo-link-row"><a href="${pathPrefix}/services/tile-roofing/index.html">Tile</a><a href="${pathPrefix}/services/shingle-roofing/index.html">Shingle</a><a href="${pathPrefix}/services/foam-roofing/index.html">Foam</a><a href="${pathPrefix}/services/metal-roofing/index.html">Metal</a></p>`)
    ].join("")
  },
  {
    path: "resources/roofing-glossary/",
    title: "Roofing Glossary | Quest Roofing",
    h1: "Plain-English roofing terms.",
    eyebrow: "Resources",
    meta: "Use our simple roofing glossary to compare estimates and understand inspection findings before approving roof work.",
    body: (pathPrefix) => [
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
      section("Why these terms matter", `<p>When we say the problem is flashing, underlayment, coating, or decking, we want the estimate to connect that term to a specific roof condition photo.</p><p class="seo-link-row"><a href="${pathPrefix}/services/roof-inspection/index.html">Schedule an inspection</a><a href="${pathPrefix}/resources/design-your-roof/index.html">Compare roof systems</a></p>`)
    ].join("")
  },
  {
    path: "contact/",
    title: "Contact Quest Roofing",
    h1: "Talk with us about your roof.",
    eyebrow: "Contact",
    meta: "Contact us for a free inspection or written roofing estimate from our Queen Creek-based Arizona roofing team.",
    body: (pathPrefix) => [
      section("Fastest ways to start", `${cardGrid([
        { title: "Call", text: `Call ${phone} for urgent leaks, scheduling questions, or a direct estimate request.` },
        { title: "Email", text: `Email ${email} with your name, address or cross streets, service need, and photos if available.` },
        { title: "Estimate form", text: "Use the homepage form when you want us to organize the request by roof service and contact details." }
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
  const supportSlug = page.path.replace(/\/$/, "").replace(/\//g, "-");
  const body = `${page.body(pathPrefix)}${supportFinalCta(page, pathPrefix)}`;
  const schema = pageSchema({
    canonical,
    title: page.title,
    meta: page.meta,
    breadcrumbs: [
      { name: "Home", url: `${siteUrl}/` },
      { name: page.eyebrow, url: canonical }
    ]
  });
  const html = layout({
    title: page.title,
    meta: page.meta,
    canonical,
    body,
    schema,
    pathPrefix,
    intro: supportIntro(page, pathPrefix),
    bodyClass: `subpage subpage-support subpage-${supportSlug}`
  });
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

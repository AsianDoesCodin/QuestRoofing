import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://questroofing.com";
const phone = "602-399-6455";
const phoneHref = "tel:6023996455";
const email = "info@questroofing.com";
const logo = "https://questroofing.com/wp-content/uploads/2024/12/Untitled-design-92-1.png";
const socialImage = `${siteUrl}/assets/quest-roofing-real/quest-roofing-social-card.jpg`;
const today = "2026-05-29";

const services = [
  {
    slug: "roof-repair",
    title: "Roof Repair in Phoenix, AZ | Quest Roofing",
    h1: "Roof Repair in Phoenix, AZ",
    meta: "We repair Phoenix-area roof leaks, storm damage, tile, shingle, foam, and metal roofs with free inspections.",
    name: "Roof Repair",
    intro: "We repair Phoenix-area roofs with photo-backed inspections and written estimates. If a repair makes more sense than replacement, we say that clearly before work starts.",
    signs: ["Ceiling stains after rain", "Broken or slipped tiles", "Lifted shingles or exposed fasteners", "Foam roof cracks or worn coating", "Flashing or penetration leaks"],
    process: ["We inspect the leak source and surrounding roof area", "We document problem areas with photos", "We explain repair scope, materials, timing, and price", "We complete approved repair work and cleanup", "We review the work and warranty details"],
    faq: [
      ["Can you repair a roof instead of replacing it?", "Yes. When repair is the right fix, we keep the recommendation repair-first and put the scope in writing."],
      ["Do roof repairs include a free inspection?", "Yes. We can start roof repair requests with a free inspection and a written estimate."]
    ]
  },
  {
    slug: "roof-inspection",
    title: "Roof Inspection Phoenix AZ | Quest Roofing",
    h1: "Roof Inspection in Phoenix, AZ",
    meta: "We inspect Phoenix-area tile, shingle, foam, and metal roofs with photos and written estimates.",
    name: "Roof Inspection",
    intro: "We use roof inspections to make the condition of the roof easier to understand. We show photos, explain what we found, and put the next step in writing when work is needed.",
    signs: ["You are buying or selling a home", "You had recent monsoon wind or rain", "You see interior staining", "You are worried about aging tile underlayment", "You see foam roof surface wear"],
    process: ["We review roof type and access points", "We inspect likely leak and wear areas", "We photograph notable findings", "We explain repair or replacement choices", "We provide a written estimate when work is needed"],
    faq: [
      ["Are inspections free?", "Yes. We can start roof inspection requests with a free inspection."],
      ["Will I get photos?", "Yes. We document problem areas with photos so the condition is easier to understand."]
    ]
  },
  {
    slug: "tile-roofing",
    title: "Tile Roofing Phoenix AZ | Quest Roofing",
    h1: "Tile Roofing in Phoenix, AZ",
    meta: "We repair tile roofs, replace underlayment, and install new tile roofing across the Phoenix area.",
    name: "Tile Roofing",
    intro: "We work on tile roofs across Arizona homes, and we look beyond the visible tile. We repair tile, replace underlayment, and install new tile roofing when the system needs it.",
    signs: ["Cracked or missing tiles", "Aging underlayment", "Leaks around valleys or penetrations", "Visible slipped tiles", "Storm movement or impact damage"],
    process: ["We inspect tiles, flashings, penetrations, and underlayment clues", "We identify repairable areas", "We explain underlayment concerns when present", "We prepare a written tile roofing estimate", "We complete approved repair or replacement work"],
    faq: [
      ["How long can tile roofs last?", "Tile roofs can last for decades, but the underlayment beneath the tile usually needs attention much sooner."],
      ["Do you repair tile roofs?", "Yes. We handle tile repair, tile replacement, and underlayment-related tile work."]
    ]
  },
  {
    slug: "shingle-roofing",
    title: "Shingle Roofing Phoenix AZ | Quest Roofing",
    h1: "Shingle Roofing in Phoenix, AZ",
    meta: "We repair and replace Phoenix-area shingle roofs using GAF and Owens Corning materials.",
    name: "Shingle Roofing",
    intro: "We install and repair architectural asphalt shingle systems using GAF and Owens Corning materials. We use the written estimate to clarify whether repair or replacement makes sense.",
    signs: ["Lifted or missing shingles", "Granule loss", "Storm damage", "Leaks at flashing", "A roof near the end of its expected life"],
    process: ["We inspect shingle field and edges", "We check penetrations and flashings", "We document damage or wear", "We recommend repair or replacement", "We review materials and timing"],
    faq: [
      ["What shingle materials do you work with?", "We mention GAF and Owens Corning materials because those are the shingle systems we want homeowners to compare clearly."],
      ["How long do shingle roofs last in Arizona?", "Arizona heat shortens shingle life compared with milder climates, so inspections matter as the roof ages."]
    ]
  },
  {
    slug: "foam-roofing",
    title: "Foam Roofing Phoenix AZ | Quest Roofing",
    h1: "Foam Roofing in Phoenix, AZ",
    meta: "We inspect, repair, and recoat Phoenix-area foam roofs on flat and low-slope roof sections.",
    name: "Foam Roofing",
    intro: "We work on spray polyurethane foam roofing and recoats for flat and low-slope Arizona roofs. When the surface needs renewed protection, we document the condition first.",
    signs: ["Cracks in coating", "Ponding or worn low spots", "Sun-damaged surface", "Leaks on flat roof sections", "Roof approaching recoat timing"],
    process: ["We inspect foam surface condition", "We look for cracks, punctures, and drainage concerns", "We explain repair versus recoat options", "We provide written scope and pricing", "We complete approved foam roofing work"],
    faq: [
      ["How long does foam roofing last?", "Foam roof life depends heavily on coating condition, drainage, and recoat timing."],
      ["Do foam recoats cost less than replacement?", "Recoats are often a smaller project than full replacement when the foam system is still sound."]
    ]
  },
  {
    slug: "metal-roofing",
    title: "Metal Roofing Phoenix AZ | Quest Roofing",
    h1: "Metal Roofing in Phoenix, AZ",
    meta: "We repair and replace Phoenix-area metal roofing, including standing seam and exposed-fastener systems.",
    name: "Metal Roofing",
    intro: "We work with standing seam and exposed-fastener metal roof systems. Metal roofing can handle Arizona heat well, but we still inspect fasteners, seams, and flashings carefully.",
    signs: ["Loose or aging fasteners", "Leaks near penetrations", "Panel movement", "Damaged trim or flashing", "Storm-related impact concerns"],
    process: ["We inspect seams, panels, fasteners, and flashings", "We document repair points", "We explain material and system options", "We prepare a written estimate", "We complete approved repair or replacement"],
    faq: [
      ["How long can metal roofing last?", "Metal roof life depends on the system, fasteners, flashing details, and maintenance."],
      ["Do you handle metal roofing?", "Yes. We include metal roofing in our service list."]
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
const serviceTheme = (slug) => slug.replace("-roofing", "").replace("roof-", "");

const cities = [
  ["phoenix", "Phoenix", "We help Phoenix homeowners across central, north, and surrounding neighborhoods with roof repair, replacement, inspections, and storm response.", ["We inspect tile and shingle systems across Phoenix neighborhoods", "We check flat and foam roof sections on desert homes", "We document monsoon wind and heat exposure before we price work"]],
  ["scottsdale", "Scottsdale", "We help Scottsdale homeowners document tile, foam, and metal roof concerns where appearance, HOA expectations, and clean scope matter.", ["We inspect tile roofs across Scottsdale homes", "We review foam and flat roof coating condition", "We write clear scopes so repair and replacement options are easier to compare"]],
  ["paradise-valley", "Paradise Valley", "We help Paradise Valley homeowners protect higher-end roof systems with clean inspections, written scope, and careful documentation.", ["We inspect tile and specialty roof details carefully", "We document valleys, penetrations, and transitions during leak diagnosis", "We put the scope in writing before work is approved"]],
  ["gilbert", "Gilbert", "We serve Gilbert from our Queen Creek base, so inspections, repairs, and replacements stay practical for nearby residential roofs.", ["We inspect common tile and shingle roofs", "We check penetrations after monsoon leaks", "We keep nearby scheduling practical for our crew"]],
  ["queen-creek", "Queen Creek", "We are based in Queen Creek, so this is our home market for roof inspections, repairs, and replacements.", ["We can schedule local roof requests efficiently", "We work on tile, shingle, foam, and metal systems here", "We provide written estimates and inspection photos"]],
  ["mesa", "Mesa", "We help Mesa homeowners with older and newer residential roof systems, from repair calls to replacement planning.", ["We review older roof systems for repair-versus-replace decisions", "We inspect tile underlayment concerns common in Arizona", "We check foam and flat roof coating condition"]],
  ["chandler", "Chandler", "We help Chandler homeowners get clear repair guidance, written estimates, and roof system options from a nearby Arizona contractor.", ["We inspect common tile and shingle systems", "We respond to storm-season leak concerns", "We write estimates clearly so homeowners do not feel pressured"]],
  ["tempe", "Tempe", "We help Tempe homeowners sort through repair, inspection, shingle, tile, foam, and replacement needs in a dense Phoenix-area market.", ["We document mixed roof ages during inspection", "We check flat and low-slope roof sections", "We write clear scope so homeowners can compare options"]]
].map(([slug, name, intro, localNotes]) => ({
  slug,
  name,
  title: `Roofing Company in ${name}, AZ | Quest Roofing`,
  h1: `Roofing Company in ${name}, AZ`,
  meta: `We serve ${name}, AZ with roof repair, replacement, tile, shingle, foam, metal roofing, and free estimates.`,
  intro,
  localNotes
}));

const layout = ({ title, meta, canonical, h1, eyebrow, body, schema, pathPrefix = "..", bodyClass = "", mainClass = "", heroClass = "seo-hero", asideClass = "", asideLabel = "Our proof", asideTitle = "We document the roof before work starts." }) => `<!DOCTYPE html>
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
    <main${mainClass ? ` class="${mainClass}"` : ""}>
      <section class="${heroClass}">
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
          <aside class="seo-aside${asideClass ? ` ${asideClass}` : ""}">
            <p class="panel-label">${asideLabel}</p>
            <h2>${asideTitle}</h2>
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
      <p class="eyebrow">How we document</p>
      <h2>${title}</h2>
      <p>${text}</p>
      <ul class="seo-proof-list">
        <li><strong>License:</strong> We show AZ ROC #355136</li>
        <li><strong>Estimate:</strong> We put the scope in writing before approval</li>
        <li><strong>Coverage:</strong> We serve greater Phoenix from Queen Creek</li>
      </ul>
      <a class="button button-primary" href="${pathPrefix}/index.html#estimate">Request a written estimate</a>
    </div>
  </div>
</section>`;

publishedServices.forEach((service) => {
  const canonical = `${siteUrl}/services/${service.slug}/`;
  const cityLinkList = cities.map((city) => `<a href="../../roofing-${city.slug}-az/index.html">${city.name}</a>`).join(", ");
  const body = [
    proofPanel(`We start ${service.name.toLowerCase()} with documentation.`, "We show license information, roof-condition photos, and a written scope so you know what we are repairing or replacing before the job is scheduled.", "../.."),
    section(`What ${service.name} includes`, `<p>${service.intro}</p>${list(service.process)}`),
    section(`Signs you may need ${service.name.toLowerCase()}`, `<div class="seo-card-grid">${service.signs.map((sign) => `<article><span></span><h3>${sign}</h3><p>We document this during inspection so the estimate is tied to the actual roof condition.</p></article>`).join("")}</div>`),
    section("How we keep the request clear", `<div class="seo-card-grid seo-card-grid-3"><article><h3>Photo-backed inspection</h3><p>We make roof concerns easier to evaluate by showing the problem areas.</p></article><article><h3>Repair-versus-replace context</h3><p>We explain whether a targeted repair is enough or whether the system needs larger work.</p></article><article><h3>Closeout expectations</h3><p>We discuss cleanup, workmanship coverage, and manufacturer materials as part of the project conversation.</p></article></div>`),
    section("Where we work", `<p>We are based in Queen Creek and serve homeowners across the greater Phoenix area, including Scottsdale, Paradise Valley, Fountain Hills, and Phoenix-area communities.</p><p class="seo-link-row">${cityLinkList}</p>`),
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
    h1: service.h1,
    eyebrow: "Roofing Service",
    body,
    schema,
    pathPrefix: "../..",
    bodyClass: `service-page service-page-${serviceTheme(service.slug)}`,
    heroClass: "seo-hero service-hero",
    asideClass: "service-aside",
    asideLabel: "Service snapshot",
    asideTitle: `We handle ${serviceLabel(service).toLowerCase()} with photos and written scope.`
  });
  const file = join("services", service.slug, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
});

cities.forEach((city) => {
  const canonical = `${siteUrl}/roofing-${city.slug}-az/`;
  const serviceLinkList = publishedServices.map((service) => `<a href="../services/${service.slug}/index.html">${serviceLabel(service)}</a>`).join(", ");
  const faq = [
    [`Do you serve ${city.name}?`, `Yes. We serve ${city.name} from our Queen Creek base.`],
    [`What roofing services are available in ${city.name}?`, "We handle roof repair, roof inspection, tile, shingle, foam, and metal roofing services."],
    [`Can I get a written estimate in ${city.name}?`, "Yes. We use inspection photos and written estimates so the scope is clear before work starts."]
  ];
  const body = [
    proofPanel(`We keep ${city.name} roofing calls clear.`, `We handle ${city.name} requests with roof documentation, written estimates, and practical scheduling from our Queen Creek base.`, ".."),
    section(`Roofing services in ${city.name}`, `<p>${city.intro}</p><p class="seo-link-row">${serviceLinkList}</p>`),
    section(`${city.name} roof concerns`, `<div class="seo-card-grid">${city.localNotes.map((note) => `<article><span></span><h3>${note}</h3><p>We review this during inspection and put the recommendation in writing.</p></article>`).join("")}</div>`),
    section(`Why ${city.name} homeowners call us`, `<p>We keep recommendations direct: we inspect the roof, explain what is wrong, and provide a written estimate instead of a vague verbal guess. We also make AZ ROC #355136, GAF certification, and warranty-backed work easy to verify.</p>`),
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
    h1: city.h1,
    eyebrow: "Service Area",
    body,
    schema,
    pathPrefix: "..",
    bodyClass: `area-page area-page-${city.slug}`,
    heroClass: "page-intro area-intro",
    asideClass: "area-aside",
    asideLabel: "Area snapshot",
    asideTitle: `We serve ${city.name} from our Queen Creek base.`
  });
  const file = join(`roofing-${city.slug}-az`, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
});

const cardGrid = (cards) => `<div class="seo-card-grid seo-card-grid-3">${cards.map(({ title, text }) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
const roofSystemGrid = () => cardGrid([
  { title: "Tile roofing", text: "We like tile for Arizona style and heat, but we still review underlayment, valleys, and broken tiles carefully." },
  { title: "Shingle roofing", text: "We treat shingle roofing as a practical residential option where ventilation, heat exposure, flashing, and storm wear affect life span." },
  { title: "Foam and flat roofing", text: "We look at foam and flat roofing as low-slope options that depend on drainage, coating condition, and recoat timing." },
  { title: "Metal roofing", text: "We value metal roofing in the desert when seams, fasteners, edges, and penetrations are inspected and maintained." }
]);

const supportPages = [
  {
    path: "about-us/our-team/",
    title: "Our Team | Quest Roofing",
    h1: "Roofing help from our Queen Creek team.",
    eyebrow: "About Quest",
    meta: "We are a licensed Queen Creek roofing contractor focused on photo-backed inspections and written estimates.",
    body: (pathPrefix) => [
      proofPanel("We make the contractor feel accountable before the appointment.", "We move from the first call to a documented roof decision with clear contact, inspection photos, and written scope.", pathPrefix),
      section("How we work", `<p>We keep the first appointment practical: we confirm the roof concern, inspect visible problem areas, and explain recommendations in plain language.</p>${cardGrid([
        { title: "First contact", text: "We collect roof type, service area, visible concerns, leak timing, and photos when available." },
        { title: "Field inspection", text: "We review the roof condition and document visible findings instead of relying on vague statements." },
        { title: "Estimate handoff", text: "We explain repair, replacement, materials, timing, and cleanup in a written scope." }
      ])}`),
      section("Who you work with", `<p>We keep the handoff simple so you know who is helping with scheduling, inspection, and project closeout.</p>${cardGrid([
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
    h1: "Project proof belongs in the open.",
    eyebrow: "Completed projects",
    meta: "Completed roofing project examples and inspection-oriented proof points from Quest Roofing.",
    body: (pathPrefix) => [
      proofPanel("We show roof conditions, scope, and closeout proof.", "We use real project photos and avoid adding addresses, dates, or customer names unless those details are approved for public use.", pathPrefix),
      section("Project categories", `${cardGrid([
        { title: "Tile repair and underlayment", text: "Document cracked tile, valley concerns, underlayment age, repair limits, and completed closeout photos." },
        { title: "Shingle replacement", text: "Show roof plane condition, material selection, tear-off scope, flashing work, and final shingle installation." },
        { title: "Foam or flat roof recoat", text: "Track coating wear, ponding areas, penetration details, surface prep, and finished protective coating." },
        { title: "Storm damage repair", text: "Organize visible damage, temporary leak control, repair scope, and post-repair roof details." },
        { title: "Metal roofing", text: "We capture panel, seam, trim, flashing, and fastener details when we compare system options." },
        { title: "Inspection-only findings", text: "Some of the most useful proof is a clear inspection that prevents unnecessary work." }
      ])}`),
      section("How we document project proof", `<p>We want each project entry to answer four questions: what roof system we inspected, what problem we found, what scope was approved, and what closeout proof we captured.</p>${cardGrid([
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
    meta: "We value clear communication, documented estimates, repair-first guidance, and respectful jobsite cleanup.",
    body: (pathPrefix) => [
      proofPanel("We put our values inside the estimate, not just the headline.", "We turn our values into documentation, direct recommendations, and a cleaner handoff for you.", pathPrefix),
      section("Our working standard", `${cardGrid([
        { title: "Repair-first when appropriate", text: "If a targeted repair solves the problem, we do not jump straight to replacement." },
        { title: "Replacement when justified", text: "If the system is past practical repair, we explain the reason in plain language." },
        { title: "Written accountability", text: "We make photos, materials, timeline, and price visible before work begins." },
        { title: "Respectful cleanup", text: "We treat the yard, driveway, access path, and final walkthrough as part of the job." },
        { title: "Local roof knowledge", text: "We factor Arizona heat, monsoon rain, tile underlayment, and flat roof coating into the recommendation." },
        { title: "No pressure language", text: "We want you to understand the roof condition well enough to make a calm decision." }
      ])}`),
      section("What this means during a roof call", `<p>We explain the problem area, proposed fix, material or system involved, and next step without hiding behind jargon.</p><p class="seo-link-row"><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing glossary</a><a href="${pathPrefix}/index.html#estimate">Request a written estimate</a></p>`)
    ].join("")
  },
  {
    path: "about-us/community-outreach/",
    title: "Community Outreach | Quest Roofing",
    h1: "We help our community understand their roofs.",
    eyebrow: "Community Outreach",
    meta: "We share homeowner education, storm readiness, and practical roof guidance for Arizona communities.",
    body: (pathPrefix) => [
      proofPanel("We make this page useful before we make it promotional.", "We use this space for practical roof education, storm-readiness guidance, and clear next steps for local homeowners.", pathPrefix),
      section("How we support local homeowners", `${cardGrid([
        { title: "Storm readiness", text: "We help you know what to check before monsoon season and when to call after wind or hail." },
        { title: "Estimate education", text: "We make roofing terms, roof systems, and repair-versus-replace decisions easier to understand." },
        { title: "Neighborhood roof questions", text: "We support HOAs, property managers, and homeowners who need clear roof documentation." }
      ])}`),
      section("What we can help with now", `<p>We can help you read roof warning signs, prepare before storm season, and understand what a written estimate is saying.</p>${cardGrid([
        { title: "Storm checklist", text: "We help you look for missing tile, lifted shingles, exposed penetrations, and interior stains after weather moves through." },
        { title: "Roof terms", text: "We explain underlayment, flashing, valleys, coating, decking, and other words that show up in estimates." },
        { title: "Documented next steps", text: "We keep community guidance tied to the same standard we use on roof estimates: clear, useful, and verifiable." }
      ])}`),
      section("Homeowner resources", `<p class="seo-link-row"><a href="${pathPrefix}/resources/design-your-roof/index.html">Design your roof</a><a href="${pathPrefix}/resources/roofing-glossary/index.html">Roofing glossary</a><a href="${pathPrefix}/services/roof-inspection/index.html">Free inspection</a></p>`)
    ].join("")
  },
  {
    path: "about-us/reviews/",
    title: "Reviews | Quest Roofing",
    h1: "We want reviews to prove the process.",
    eyebrow: "Homeowner stories",
    meta: "We focus our reviews around communication, clean work, and honest recommendations.",
    body: (pathPrefix) => [
      proofPanel("We want a good roofing experience to feel clear.", "We pay attention to communication, cleanup, cost transparency, and whether our recommendation matches the actual roof issue.", pathPrefix),
      section("What we want homeowners to compare", `${cardGrid([
        { title: "Communication", text: "We return calls, clarify the appointment, and explain what happens next." },
        { title: "Clean work", text: "We treat the jobsite like part of the project, not an afterthought." },
        { title: "Honest recommendation", text: "We explain repair, replacement, or monitoring with roof-condition evidence." },
        { title: "Written scope", text: "We write estimates with enough detail for you to compare options and approve work confidently." },
        { title: "Storm response", text: "After monsoon damage, we balance urgency with documentation." },
        { title: "Closeout", text: "We explain what was completed and what warranty or material notes apply." }
      ])}`),
      section("Where to start", `<p>Read the homepage review section, then ask us to document your roof with photos and a written scope before you approve work.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#reviews">Homepage review section</a><a href="${pathPrefix}/index.html#estimate">Request an estimate</a></p>`)
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
      proofPanel("We use the gallery for roof proof, not decoration.", "We show roof conditions, repair details, and finished work so you can see how we document projects before calling.", pathPrefix),
      section("Gallery categories", `${cardGrid([
        { title: "Tile details", text: "Broken tile, slipped tile, valley work, underlayment clues, and finished replacement areas." },
        { title: "Shingle details", text: "Granule loss, lifted shingles, flashing, tear-off prep, and installed architectural shingles." },
        { title: "Foam and flat details", text: "Coating cracks, ponding patterns, penetration repairs, surface prep, and finished recoats." },
        { title: "Storm damage", text: "Wind movement, impact marks, debris damage, urgent leak points, and completed repair details." },
        { title: "Metal roofing", text: "Panel details, seams, fasteners, trim, and roof-to-wall transitions." },
        { title: "Cleanup and closeout", text: "Final roof condition, yard cleanup, and handoff photos after approved work." }
      ])}`),
      section("Photo standards", `<p>We try to make each gallery entry clear about roof system, concern, service area, scope type, and whether the image is before, during, or after work.</p>${roofSystemGrid()}`),
      section("Start from what you are seeing", `<p class="seo-link-row"><a href="${pathPrefix}/services/roof-inspection/index.html">Roof inspection</a><a href="${pathPrefix}/services/roof-repair/index.html">Roof repair</a><a href="${pathPrefix}/services/tile-roofing/index.html">Tile roofing</a></p>`)
    ].join("")
  },
  {
    path: "resources/design-your-roof/",
    title: "Design Your Roof | Quest Roofing",
    h1: "Compare roofing options before the estimate.",
    eyebrow: "Resources",
    meta: "We help you compare tile, shingle, foam, and metal roofing decisions before the estimate.",
    body: (pathPrefix) => [
      proofPanel("We start roof design with the roof you actually have.", "We compare tile, shingle, foam, flat, and metal options against slope, age, budget, HOA expectations, and heat exposure.", pathPrefix),
      section("Compare roof systems", roofSystemGrid()),
      section("Questions to answer before choosing", `${cardGrid([
        { title: "What is the roof slope?", text: "We match flat and low-slope sections to different systems than steep shingle or tile areas." },
        { title: "What is failing?", text: "We look at underlayment, coating, flashing, fasteners, and surface material before recommending a fix." },
        { title: "What does the neighborhood require?", text: "We factor HOA expectations, color, profile, and visible roof style into the conversation." },
        { title: "How long will you own the home?", text: "We can compare short-term repairs and long-term replacement depending on your plan." },
        { title: "What has leaked before?", text: "We use past leak history to focus the inspection on valleys, penetrations, transitions, and drainage." },
        { title: "What proof do you need?", text: "We use photos and written scope to help you compare estimates without pressure." }
      ])}`),
      section("Bring this to the estimate", `<p>Send us roof age, leak history, photos, storm timing, HOA notes, and preferred roof material so the first conversation is more useful.</p><p class="seo-link-row"><a href="${pathPrefix}/services/tile-roofing/index.html">Tile</a><a href="${pathPrefix}/services/shingle-roofing/index.html">Shingle</a><a href="${pathPrefix}/services/foam-roofing/index.html">Foam</a><a href="${pathPrefix}/services/metal-roofing/index.html">Metal</a></p>`)
    ].join("")
  },
  {
    path: "resources/roofing-glossary/",
    title: "Roofing Glossary | Quest Roofing",
    h1: "Plain-English roofing terms.",
    eyebrow: "Resources",
    meta: "We explain common roofing terms so Arizona homeowners can compare estimates and inspection findings.",
    body: (pathPrefix) => [
      proofPanel("We make estimates easier to compare.", "We explain the words that show which part of the roof we are repairing or replacing.", pathPrefix),
      section("Common estimate terms", `${cardGrid([
        { title: "Underlayment", text: "We use this word for the protective layer beneath tile that often matters more than the tile surface itself." },
        { title: "Flashing", text: "We use this word for metal or roof detail around walls, edges, chimneys, and transitions that control water." },
        { title: "Penetration", text: "We use this word for anything passing through the roof surface, such as vents, pipes, skylights, or equipment." },
        { title: "Valley", text: "We use this word for the area where roof planes meet and water concentrates during rain." },
        { title: "Coating", text: "We use this word for the protective top layer on foam and some flat roof systems." },
        { title: "Decking", text: "We use this word for the structural roof surface below the roofing assembly." },
        { title: "Fastener", text: "We use this word for screws, nails, or other attachments that can loosen or age over time." },
        { title: "Ridge", text: "We use this word for the high line where two roof planes meet." },
        { title: "Scope", text: "We use this word for the written description of what work is included, excluded, and priced." }
      ])}`),
      section("Why these terms matter", `<p>When we mention flashing, underlayment, coating, or decking, we connect that term to a specific roof condition photo whenever possible.</p><p class="seo-link-row"><a href="${pathPrefix}/services/roof-inspection/index.html">Schedule an inspection</a><a href="${pathPrefix}/resources/design-your-roof/index.html">Compare roof systems</a></p>`)
    ].join("")
  },
  {
    path: "contact/",
    title: "Contact Quest Roofing",
    h1: "Contact Quest Roofing.",
    eyebrow: "Contact",
    meta: "Contact us for a free inspection or written roofing estimate from our Queen Creek-based team.",
    body: (pathPrefix) => [
      proofPanel("We make roof requests easier to start.", `Call ${phone} or email ${email} to start a roof inspection request.`, pathPrefix),
      section("Fastest ways to start", `${cardGrid([
        { title: "Call", text: `Call ${phone} for urgent leaks, scheduling questions, or a direct estimate request.` },
        { title: "Email", text: `Email ${email} with your name, address or cross streets, service need, and photos if available.` },
        { title: "Estimate form", text: "Use our homepage form when you want to organize the request by roof service and contact details." }
      ])}`),
      section("What to send", `<p>Send us your address or nearest cross streets, roof type if known, leak location, storm timing, interior stain photos, exterior roof photos if safe, and whether the property is residential or commercial.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Open estimate form</a><a href="tel:6023996455">Call ${phone}</a><a href="mailto:${email}">Email us</a></p>`),
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
  const pageStem = page.path.replace(/\/$/, "").replace(/\//g, "-");
  const familyClass = page.path.startsWith("resources/") ? "resource-page" : page.path.startsWith("contact/") ? "contact-page" : "about-page";
  const introClass = page.path.startsWith("resources/") ? "page-intro resource-intro" : page.path.startsWith("contact/") ? "page-intro contact-intro" : "page-intro about-intro";
  const body = `${page.body(pathPrefix)}${section("Start a request", `<p>Use our main estimate form when you are ready to talk through the roof condition with us.</p><p class="seo-link-row"><a href="${pathPrefix}/index.html#estimate">Request an estimate</a></p>`)}`;
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
    h1: page.h1,
    eyebrow: page.eyebrow,
    body,
    schema,
    pathPrefix,
    bodyClass: `${familyClass} support-page support-page-${pageStem}`,
    heroClass: introClass,
    asideClass: "support-aside",
    asideLabel: page.path.startsWith("resources/") ? "Guide snapshot" : page.path.startsWith("contact/") ? "Contact snapshot" : "Page snapshot",
    asideTitle: page.path.startsWith("contact/") ? `We answer at ${phone} or ${email}.` : "We keep the page focused on what you need next."
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

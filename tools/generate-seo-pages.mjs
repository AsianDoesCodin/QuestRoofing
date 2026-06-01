import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://questroofing.com";
const lastmod = "2026-06-01";
const phone = "602-399-6455";
const phoneHref = "tel:6023996455";
const email = "info@questroofing.com";
const favicon = "https://questroofing.com/wp-content/uploads/2024/12/Untitled-design-92-1.png";
const logoPath = "assets/images/quest-roofing-wordmark.png";
const socialImage = `${siteUrl}/assets/quest-roofing-real/quest-roofing-social-card.jpg`;
const cacheVersion = "2026-06-02-hero-bg-no-services-09";
const rocUrl = "https://azroc.my.site.com/AZRoc/s/contractor-search?licenseId=a0ocs000004dh2nAAA";
const gafUrl = "https://www.gaf.ca/en-ca/roofing-contractors/residential/usa/az/queen-creek/quest-roofing-llc-1149593";

const asset = (prefix, path) => prefix ? `${prefix}/${path}` : path;
const versionedAsset = (prefix, path) => `${asset(prefix, path)}?v=${cacheVersion}`;
const home = (prefix, hash = "") => `${prefix ? `${prefix}/index.html` : ""}${hash ? `#${hash}` : ""}`;
const link = (prefix, path) => asset(prefix, path);

const images = {
  consultant: ["assets/quest-roofing-real/roof-consultant-tile-roof.jpg", "Quest Roofing consultant documenting a tile roof", 1600, 900],
  inspection: ["assets/quest-roofing-real/inspection-on-tile-roof.jpg", "Roof inspection on a tile roof in Arizona", 1600, 900],
  drone: ["assets/quest-roofing-real/hero-roof-replacement-drone.jpg", "Aerial view of a Quest Roofing replacement project", 1600, 900],
  protection: ["assets/quest-roofing-real/project-overhead-protection.jpg", "Overhead view of roof project protection and staging", 1600, 900],
  staged: ["assets/quest-roofing-real/tile-staged-underlayment.jpg", "Tile staged during underlayment work", 1200, 1600],
  battens: ["assets/quest-roofing-real/tile-battens-install-day.jpg", "Battens and underlayment being installed on a tile roof", 1200, 1600],
  underlayment: ["assets/quest-roofing-real/underlayment-rolls-clean-deck.jpg", "Underlayment rolls staged on a clean roof deck", 1500, 2000],
  flashing: ["assets/quest-roofing-real/flashing-repair-detail.jpg", "Close-up flashing repair detail on a roof", 1600, 1200],
  pipe: ["assets/quest-roofing-real/pipe-flashing-detail.jpg", "Pipe flashing detail documented during roof work", 1200, 1600],
  metal: ["assets/quest-roofing-real/metal-valley-flashing-detail.jpg", "Metal valley flashing detail on a roof", 1500, 2000],
  deck: ["assets/quest-roofing-real/roof-deck-repair-open-area.jpg", "Open roof deck repair area documented before closeout", 1500, 2000],
  shingle: ["assets/quest-roofing-real/shingle-roof-finished.jpg", "Finished shingle roof surface with vents visible", 1200, 1600],
  tileFinished: ["assets/quest-roofing-real/finished-tile-roof-slope.jpg", "Finished tile roof slope in Arizona sun", 1200, 1600]
};

const img = (key, prefix = "", attrs = "") => {
  const [src, alt, width, height] = images[key];
  const positions = {
    consultant: "center 38%",
    inspection: "center 34%",
    drone: "center 54%",
    protection: "center center",
    staged: "center 42%",
    battens: "center center",
    underlayment: "center 45%",
    flashing: "center center",
    pipe: "center center",
    metal: "center center",
    deck: "center center",
    shingle: "center center",
    tileFinished: "center center"
  };
  return `<img src="${asset(prefix, src)}" alt="${alt}" width="${width}" height="${height}" style="--image-position:${positions[key] || "center center"}"${attrs}>`;
};

const mediaFrame = (key, prefix = "", attrs = "") => `<div class="media-frame">${img(key, prefix, attrs)}</div>`;
const mediaFigure = (className, key, prefix, attrs, caption) => `<figure class="image-card image-card--overlay ${className}">${mediaFrame(key, prefix, attrs)}<figcaption class="caption">${caption}</figcaption></figure>`;

const services = [
  {
    slug: "roof-repair",
    nav: "Roof Repair",
    title: "Roof Repair in Greater Phoenix | Quest Roofing",
    h1: "Roof repair in Greater Phoenix.",
    meta: "Roof repair for Queen Creek and Greater Phoenix homeowners, with photo-backed inspections and written estimates.",
    image: "flashing",
    intro: "Active leaks, ceiling stains, flashing issues, slipped tiles, lifted shingles, and foam cracks all need a clear inspection before a repair scope makes sense.",
    signs: [["Active leak", "Water entering the home or new staining after rain."], ["Ceiling stains", "Interior marks that need to be traced to real roof details."], ["Flashing concern", "Wall, valley, pipe, or transition areas where water control depends on detail work."], ["Broken or slipped tile", "Tile movement that can expose underlayment."], ["Lifted shingles", "Missing tabs, loose edges, or storm movement."], ["Foam coating wear", "Cracks, punctures, or worn coating on low-slope sections."]],
    documents: ["Visible leak source and surrounding roof condition", "Flashing, penetrations, tile, shingle, or foam details", "Repairable items versus larger system concerns", "Written repair scope before work is approved"],
    context: "A targeted repair can be the right answer when the problem is isolated. If the roof condition points to larger work, Quest explains why before scheduling anything.",
    faq: [["Can Quest repair a roof instead of replacing it?", "Yes. When repair is the right fit, Quest documents the issue and explains the targeted scope in writing."], ["What should I do for an active leak?", "Call 602-399-6455 and describe the leak location, timing, and visible interior damage."]]
  },
  {
    slug: "tile-roofing",
    nav: "Tile Roofing",
    title: "Tile Roofing in Greater Phoenix | Quest Roofing",
    h1: "Tile roofing for Arizona homes.",
    meta: "Tile roofing inspections, repairs, underlayment work, and written estimates for Queen Creek and Greater Phoenix homes.",
    image: "staged",
    intro: "Arizona tile roofs need more than a surface check. Quest reviews tiles, underlayment clues, battens, valleys, flashing, and finished roof details.",
    signs: [["Broken or missing tiles", "Open areas that can expose the roof system below."], ["Underlayment wear", "Aging material beneath tile that may drive the real scope."], ["Valley or penetration leak", "Water entry around high-flow areas or roof openings."], ["Slipped rows", "Tile movement that changes water path and roof appearance."], ["Storm movement", "Post-monsoon shifts, impact marks, or loose material."], ["Finished surface concerns", "Visible tile damage that needs a clean repair plan."]],
    documents: ["Tile condition, staged areas, and vulnerable rows", "Underlayment clues and battens when visible", "Valleys, penetrations, flashing, and transitions", "Repair or replacement path with a written scope"],
    context: "Tile can last a long time, but underlayment and details often decide the project. Quest separates what is cosmetic, repairable, and system-level.",
    faq: [["Do you repair tile roofs?", "Yes. Quest handles tile roof repairs and larger tile roofing work when the inspection supports it."], ["Is tile roof work always full replacement?", "No. Quest explains targeted repairs when they fit and larger scope when the roof system calls for it."]]
  },
  {
    slug: "shingle-roofing",
    nav: "Shingle Roofing",
    title: "Shingle Roofing in Greater Phoenix | Quest Roofing",
    h1: "Shingle roofing with clear scope.",
    meta: "Shingle roof repair and replacement guidance for Queen Creek and Greater Phoenix homeowners.",
    image: "shingle",
    intro: "Shingle roof decisions depend on surface wear, missing tabs, flashing, ventilation details, heat exposure, and whether repair still makes practical sense.",
    signs: [["Missing shingles", "Open or lifted sections that leave the roof vulnerable."], ["Aging asphalt", "Curling, surface wear, or visible deterioration after heat exposure."], ["Flashing leaks", "Water entry around walls, vents, valleys, or penetrations."], ["Storm movement", "Loose tabs or exposed sections after wind."], ["Replacement planning", "A broader decision when repairs no longer solve the roof condition."], ["Finished surface review", "Documentation of the final shingle field and roof details."]],
    documents: ["Shingle field condition and missing or lifted areas", "Vents, valleys, edges, and flashing details", "Repairable issues compared with replacement indicators", "Written material and scope notes before work is approved"],
    context: "Quest keeps the decision grounded: fix the section when that is enough, or explain replacement when widespread wear makes patching a poor value.",
    faq: [["How do I know if shingles need repair or replacement?", "Quest documents roof condition and explains whether the concern is isolated or widespread."], ["Do you inspect flashing on shingle roofs?", "Yes. Flashing, penetrations, edges, and roof transitions are part of the review."]]
  },
  {
    slug: "metal-roofing",
    nav: "Metal Roofing",
    title: "Metal Roofing in Greater Phoenix | Quest Roofing",
    h1: "Metal roofing details documented.",
    meta: "Metal roof repair and replacement guidance for Queen Creek and Greater Phoenix homes.",
    image: "metal",
    intro: "Metal roofing can perform well in Arizona when seams, fasteners, trim, valleys, and penetrations are inspected and detailed correctly.",
    signs: [["Loose fasteners", "Fastener movement or aging that can lead to water entry."], ["Panel movement", "Metal expansion, contraction, or loose sections that need review."], ["Valley detail concern", "High-flow areas where clean metal work matters."], ["Penetration leak", "Openings around pipes or equipment that need documented flashing."], ["Trim damage", "Edges, transitions, or visible finish concerns."], ["Storm impact", "Post-wind or debris concerns that need inspection photos."]],
    documents: ["Panel field, seams, fasteners, and trim", "Valleys, penetrations, and edge conditions", "Visible movement, damage, or leak paths", "Written options for repair or replacement"],
    context: "Metal roof performance depends on small details. Quest documents those details before recommending a repair, replacement section, or larger project.",
    faq: [["Do you work on standing seam and exposed-fastener roofs?", "Yes. Quest reviews metal roof details and explains the scope before work is approved."], ["Can metal roof leaks be repaired?", "Often, but the right answer depends on seams, fasteners, flashing, and surrounding roof condition."]]
  },
  {
    slug: "foam-roofing",
    nav: "Foam Roofing",
    title: "Foam Roofing in Greater Phoenix | Quest Roofing",
    h1: "Foam roofing and flat roof recoats.",
    meta: "Foam roofing inspections, recoats, and flat roof guidance for Queen Creek and Greater Phoenix homeowners.",
    image: "underlayment",
    intro: "Flat and low-slope roofs need attention to coating wear, cracks, ponding, punctures, drainage, and waterproofing concerns.",
    signs: [["Cracked coating", "Open areas that may expose the roof system to water and sun."], ["Ponding water", "Low spots or drainage concerns that need review."], ["Sun-damaged surface", "A worn or chalky surface that may need renewed protection."], ["Leak on flat section", "Interior water entry tied to a low-slope roof area."], ["Recoat planning", "A surface that may need coating work before larger damage develops."], ["Coverage concern", "Areas where waterproofing continuity needs to be verified."]],
    documents: ["Coating condition, cracks, punctures, and worn areas", "Drainage and ponding observations", "Repair versus recoat context", "Written foam or flat roof scope when work is needed"],
    context: "A recoat may be appropriate when the existing system is sound. Quest documents the surface before recommending that path.",
    faq: [["Do foam roofs always need replacement?", "No. Some foam and flat roof surfaces are candidates for repair or recoat when the system is still sound."], ["What do you check on flat roofs?", "Quest looks at drainage, coating wear, cracks, punctures, penetrations, and visible waterproofing concerns."]]
  },
  {
    slug: "roof-inspection",
    nav: "Free Inspection",
    title: "Free Roof Inspection in Greater Phoenix | Quest Roofing",
    h1: "Free roof inspections with written next steps.",
    meta: "Free roof inspections for Queen Creek and Greater Phoenix homeowners, with photos, written explanations, and clear estimate scope.",
    image: "inspection",
    intro: "A useful inspection should answer what is wrong, what can wait, and what needs attention, with photos and a written explanation.",
    signs: [["Not sure yet", "You know something looks off but need a roof professional to document it."], ["Recent storm", "Wind or rain raised concerns about tiles, shingles, flashing, or flat sections."], ["Planning ahead", "You want context before a roof decision becomes urgent."], ["Interior stain", "A ceiling mark needs to be tied to a real roof condition."], ["Material comparison", "Tile, shingle, metal, or foam options need practical explanation."], ["Property preparation", "Photos and roof history can make the first visit more useful."]],
    documents: ["Photos of visible findings and roof concern areas", "Plain-language explanation of the roof condition", "Repair or replacement options when relevant", "Written estimate before approved work is scheduled"],
    context: "The inspection is built for clarity. Quest documents what it sees, explains what it means, and gives the homeowner a clear next step.",
    faq: [["Do you offer free inspections and written estimates?", "Yes. Quest can start with an inspection request and provide a written estimate so the scope is clear before work begins."], ["What should I prepare?", "Roof age, leak history, storm timing, interior photos, exterior photos if safe, and address or cross streets are helpful."]]
  }
];

const issueDiagnosticCard = ([heading, text], index) => `<article class="issue-card issue-card--diagnostic"><span class="issue-card-icon" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div><h3>${heading}</h3><p>${text}</p><a href="#estimate">Request inspection <span aria-hidden="true">&rarr;</span></a></div></article>`;

const cities = [
  ["queen-creek", "Queen Creek", "Queen Creek roofing from a local base.", "Quest is based in Queen Creek, so local tile roofs, newer subdivisions, dust, heat, and storm exposure are part of the everyday inspection conversation.", [["Tile roof checks", "Concrete and clay tile roofs need attention to underlayment clues, valleys, and slipped rows."], ["Newer home questions", "Newer roof systems still need documentation when storms, leaks, or material concerns show up."], ["Dust and heat exposure", "Arizona conditions can make small roof details age faster than homeowners expect."]]],
  ["gilbert", "Gilbert", "Gilbert roofing with photo-backed scope.", "Gilbert homes commonly include tile, shingle, and flat roof sections, so Quest starts with inspection photos and a written scope before work is approved.", [["Monsoon leak paths", "Wind-driven rain often shows up around penetrations, valleys, and roof transitions."], ["Tile and shingle mix", "Different roof areas may need different repair or replacement conversations."], ["Written estimate clarity", "A clear scope helps homeowners compare roof recommendations without pressure."]]],
  ["chandler", "Chandler", "Chandler roof inspections and estimates.", "Chandler homeowners often need practical answers after monsoon leaks, tile movement, shingle wear, or flat roof coating concerns.", [["Storm-season leaks", "Quest documents the affected roof area instead of guessing from a ceiling stain alone."], ["Tile and shingle systems", "The repair path depends on the actual material, age, and surrounding roof condition."], ["Clear next step", "The written estimate explains what is included before work is scheduled."]]],
  ["mesa", "Mesa", "Mesa roofing for mixed roof ages.", "Mesa has older and newer roof systems, so Quest looks carefully at material condition, underlayment clues, flat sections, and repair-versus-replace context.", [["Older roof review", "Aging materials need a careful inspection before anyone recommends a large scope."], ["Flat and foam sections", "Low-slope areas need coating, drainage, crack, and penetration checks."], ["Tile underlayment", "Tile roofs can look sound while the system beneath needs attention."]]],
  ["tempe", "Tempe", "Tempe roofing with clear documentation.", "Tempe roof calls can involve mixed ages, shingle wear, tile details, foam sections, and access variation, so written scope matters.", [["Mixed roof ages", "Older repairs and newer materials may need to be evaluated together."], ["Low-slope details", "Flat sections need inspection around drainage, coating, and penetrations."], ["Scope comparison", "Photos make it easier to compare repair and replacement recommendations."]]],
  ["scottsdale", "Scottsdale", "Scottsdale roofing with detail-focused scope.", "Scottsdale homes often need careful tile, flat section, flashing, and finish-detail review, especially when appearance and documentation both matter.", [["Tile system detail", "Tile work should account for underlayment, valleys, staged rows, and visible finish."], ["Flat roof sections", "Foam and low-slope areas need coating and drainage review."], ["Premium finish expectations", "Quest documents the roof condition and scope so the finished work is easier to evaluate."]]],
  ["paradise-valley", "Paradise Valley", "Paradise Valley roof work documented before approval.", "Paradise Valley roof decisions often involve premium homes, tile systems, detail work, flat sections, and a strong need for clear documentation.", [["Detail work", "Transitions, valleys, penetrations, and finish lines should be inspected closely."], ["Tile and flat sections", "Multiple roof systems may appear on the same property and require different scopes."], ["Owner confidence", "Written scope and photos help owners approve work without relying on vague claims."]]],
  ["phoenix", "Phoenix", "Phoenix roofing for heat, wind, and mixed roof types.", "Phoenix roof work can involve mixed roof types, flat and foam sections, heat exposure, monsoon wind, older neighborhoods, and roof access variation.", [["Flat and foam sections", "Low-slope areas need attention to coating condition, drainage, and penetrations."], ["Heat exposure", "Arizona sun can accelerate surface wear, flashing stress, and shingle aging."], ["Monsoon wind", "Loose materials and exposed areas should be documented quickly after storm concerns."]]]
].map(([slug, name, h1, intro, concerns]) => ({
  slug,
  name,
  h1,
  intro,
  concerns,
  title: `Roofing Company in ${name}, AZ | Quest Roofing`,
  meta: `Quest Roofing serves ${name}, Arizona with roof repair, inspections, replacement planning, tile, shingle, foam, and metal roofing.`
}));

function roc(className = "credential-link") {
  return `<a class="${className}" href="${rocUrl}" target="_blank" rel="noopener">AZ ROC #355136</a>`;
}

function gaf(className = "credential-link") {
  return `<a class="${className}" href="${gafUrl}" target="_blank" rel="noopener">GAF Certified</a>`;
}

const businessSchema = {
  "@type": "RoofingContractor",
  "@id": `${siteUrl}/#business`,
  name: "Quest Roofing",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/${logoPath}`,
  image: socialImage,
  telephone: "+1-602-399-6455",
  email,
  address: { "@type": "PostalAddress", addressLocality: "Queen Creek", addressRegion: "AZ", addressCountry: "US" },
  identifier: "AZ ROC #355136",
  areaServed: cities.map((city) => ({ "@type": "City", name: city.name })),
  knowsAbout: services.map((service) => service.nav)
};

const faqSchema = (faq) => ({
  "@type": "FAQPage",
  mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }))
});

const pageSchema = (canonical, title, meta, extra = []) => ({
  "@context": "https://schema.org",
  "@graph": [
    businessSchema,
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description: meta, about: { "@id": `${siteUrl}/#business` }, inLanguage: "en-US" },
    ...extra
  ]
});

function header(prefix = "") {
  return `<header class="site-header" id="top">
    <div class="top-bar"><div class="container top-bar-inner"><p>${roc()} / ${gaf()} / Free written estimates / Licensed, Bonded, Insured</p><div class="top-bar-actions"><a href="${phoneHref}">${phone}</a><a href="mailto:${email}">${email}</a></div></div></div>
    <div class="header-main">
      <div class="header-brand-panel">
        <a class="brand-lockup" href="${prefix ? `${prefix}/index.html` : "index.html"}" aria-label="Quest Roofing home"><img class="brand-wordmark" src="${versionedAsset(prefix, logoPath)}" alt="Quest Roofing" width="1184" height="624"><span class="brand-location">Queen Creek, Arizona</span></a>
      </div>
      <div class="header-nav-panel">
        <a class="header-call" href="${phoneHref}">Call</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
        <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
          <a href="${link(prefix, "services/roof-repair/index.html")}">Services</a>
          <a href="${home(prefix, "process")}">Process</a>
          <a href="${link(prefix, "gallery/index.html")}">Gallery</a>
          <a href="${home(prefix, "service-area")}">Service Area</a>
          <a href="${home(prefix, "reviews")}">Reviews</a>
          <a href="${home(prefix, "faq")}">FAQ</a>
          <a href="${link(prefix, "contact/index.html")}">Contact</a>
          <a class="nav-cta" href="${home(prefix, "estimate")}">Schedule Free Inspection</a>
        </nav>
      </div>
    </div>
  </header>`;
}

function footer(prefix = "") {
  const footerServices = services.map((service) => `<a href="${link(prefix, `services/${service.slug}/index.html`)}">${service.nav}</a>`).join("\n");
  const footerCities = cities.map((city) => `<a href="${link(prefix, `roofing-${city.slug}-az/index.html`)}">${city.name}</a>`).join("\n");
  return `<footer class="site-footer">
    <div class="container footer-layout">
      <div><a class="footer-brand-lockup" href="${prefix ? `${prefix}/index.html` : "index.html"}" aria-label="Quest Roofing home"><img class="footer-brand-wordmark" src="${versionedAsset(prefix, logoPath)}" alt="Quest Roofing" width="1184" height="624"><span class="footer-brand-location">Queen Creek, Arizona</span></a><p>Queen Creek, Arizona roofing contractor serving the Greater Phoenix area with photo-backed inspections and written estimates.</p><ul class="footer-contact"><li><span>Phone</span><a href="${phoneHref}">${phone}</a></li><li><span>Email</span><a href="mailto:${email}">${email}</a></li><li><span>License</span>${roc()}</li><li><span>Credential</span>${gaf()}</li><li><span>Trust</span><strong>Licensed, Bonded, Insured</strong></li></ul></div>
      <nav class="footer-link-grid" aria-label="Footer navigation"><div><strong>Services</strong>
${footerServices}</div><div><strong>Cities</strong>
${footerCities}</div><div><strong>Company</strong>
<a href="${link(prefix, "gallery/index.html")}">Gallery</a>
<a href="${link(prefix, "about-us/reviews/index.html")}">Reviews</a>
<a href="${link(prefix, "resources/design-your-roof/index.html")}">Roof Planning</a>
<a href="${link(prefix, "resources/roofing-glossary/index.html")}">Roofing Glossary</a>
<a href="${link(prefix, "contact/index.html")}">Contact</a></div></nav>
    </div>
    <div class="container footer-bottom"><span>Copyright <span id="footer-year">2026</span> Quest Roofing</span><a href="#top">Back to top</a></div>
  </footer><div class="mobile-cta-bar" aria-label="Quick contact"><a href="${phoneHref}">Call</a><a href="${home(prefix, "estimate")}">Free Inspection</a></div>`;
}

function layout({ title, meta, canonical, body, schema, prefix = "", bodyClass = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${meta}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0B1D33">
  <meta name="geo.region" content="US-AZ">
  <meta name="geo.placename" content="Queen Creek">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${favicon}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Quest Roofing">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${meta}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${meta}">
  <meta name="twitter:image" content="${socialImage}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${versionedAsset(prefix, "tokens.css")}">
  <link rel="stylesheet" href="${versionedAsset(prefix, "styles.css")}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell">${header(prefix)}${body}${footer(prefix)}</div>
  <script src="${versionedAsset(prefix, "script.js")}" defer></script>
</body>
</html>
`;
}

function cardGrid(cards) {
  return `<div class="seo-card-grid">${cards.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
}

function section(heading, copy, content, className = "", id = "") {
  return `<section class="section-band ${className}"${id ? ` id="${id}"` : ""}><div class="container"><div class="section-heading"><h2>${heading}</h2>${copy ? `<p>${copy}</p>` : ""}</div>${content}</div></section>`;
}

function inlineCta(prefix) {
  return `<div class="inline-cta"><strong>Need a documented roof answer?</strong><a class="button button-primary" href="${home(prefix, "estimate")}">Schedule Free Inspection</a><a class="button button-secondary" href="${phoneHref}">Call ${phone}</a></div>`;
}

function homepage() {
  const title = "Queen Creek Roofing Contractor | Quest Roofing";
  const meta = "Quest Roofing helps Queen Creek and Greater Phoenix homeowners with roof repair, replacement, tile, shingle, foam, metal roofing, and free written estimates.";
  const faq = [
    ["Do you offer free inspections and written estimates?", "Yes. Quest can start with an inspection request and provide a written estimate so the scope is clear before work begins."],
    ["How do I know if I need repair or replacement?", "Quest documents the roof condition and explains repair and replacement options before you approve work."],
    ["What roofing systems do you work on?", "Quest works with roof repair, tile roofing, shingle roofing, metal roofing, foam roofing, and inspections."],
    ["Where do you work?", "Quest is based in Queen Creek and serves the Greater Phoenix area, including the nearby communities listed on the site."],
    ["What should I do if I have an active leak?", "Call 602-399-6455 and describe the leak, location, and visible damage."]
  ];
  const issueCards = [
    ["Active leak", "Water spots, ceiling damage, or roof leaks after rain.", "flashing"],
    ["Tile roof concern", "Broken tiles, underlayment wear, lifted rows, or flashing details.", "staged"],
    ["Shingle replacement", "Aging asphalt shingles, missing tabs, or full replacement planning.", "shingle"],
    ["Flat or foam roof", "Recoats, ponding, cracks, waterproofing, and reflective roof coverage.", "underlayment"],
    ["Storm or wind damage", "Loose materials, exposed areas, or post-monsoon roof concerns.", "protection"],
    ["Not sure yet", "Start with an inspection and written explanation.", "inspection"]
  ];
  const gallery = [["protection", "Property protection"], ["staged", "Tile staged for underlayment"], ["battens", "Battens and underlayment"], ["flashing", "Flashing detail"], ["pipe", "Pipe flashing detail"], ["shingle", "Finished shingle surface"], ["consultant", "On-roof documentation"]];
  const schema = { "@context": "https://schema.org", "@graph": [businessSchema, { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: "Quest Roofing", publisher: { "@id": `${siteUrl}/#business` }, inLanguage: "en-US" }, { "@type": "WebPage", "@id": `${siteUrl}/#webpage`, url: `${siteUrl}/`, name: title, description: meta, about: { "@id": `${siteUrl}/#business` }, inLanguage: "en-US" }, faqSchema(faq)] };
  const body = `<main id="main">
    <section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">Queen Creek Roofing Contractor</p><h1>Roof repair and replacement without the runaround.</h1><p class="hero-lead">Quest Roofing helps Queen Creek and Greater Phoenix homeowners understand their roof before they approve work - with photo-backed inspections, written scopes, and clear repair or replacement options.</p><ul class="trust-pills"><li>${roc()}</li><li>${gaf()}</li><li>Licensed, Bonded, Insured</li><li>Free written estimates</li></ul><div class="hero-actions"><a class="button button-primary" href="#estimate">Schedule Free Roof Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div><p class="hero-microcopy">Start with photos, a written scope, and a clear next step.</p></div></div></section>
    <section class="proof-strip"><div class="container proof-strip-grid"><article><span>License</span><strong>${roc()}</strong></article><article><span>Credential</span><strong>${gaf()}</strong></article><article><span>Trust</span><strong>Licensed, Bonded &amp; Insured</strong></article><article><span>Base</span><strong>Queen Creek-based</strong></article><article><span>Coverage</span><strong>Greater Phoenix Service Area</strong></article></div><!-- Client proof needed here: Google rating / BBB badge / review count / financing / warranty. --></section>
    ${section("What roof issue are you dealing with?", "Choose the closest concern. Quest can inspect, document, and explain the right repair or replacement path.", `<div class="issue-grid issue-grid--diagnostic">${issueCards.map(issueDiagnosticCard).join("")}</div>`, "section-issues")}
    <section class="section-band section-human" id="story"><div class="container split-layout">${mediaFigure("story-photo", "consultant", "", " loading=\"lazy\" decoding=\"async\"", "Inspection photos you can review before approving work.")}<div class="story-copy"><p class="eyebrow">People before paperwork</p><h2>Straight answers before roof work starts.</h2><p>Roof decisions are expensive. Quest makes the process easier by documenting what we see, explaining what can wait, and putting the approved scope in writing.</p><ul class="check-list"><li>Inspection photos you can review</li><li>Repair and replacement options explained clearly</li><li>Written estimate before scheduling work</li></ul></div></div></section>
    <section class="section-band section-gallery-teaser" id="gallery-preview"><div class="container"><div class="section-heading"><p class="eyebrow">Project proof</p><h2>Real roof work, documented.</h2><p>Quest uses project photos to make the condition, scope, and finished work easier to understand.</p></div><div class="editorial-gallery">${gallery.map(([photo, caption], i) => `<figure class="image-card image-card--overlay ${i === 0 || i === 6 ? "gallery-feature" : ""}">${mediaFrame(photo, "", " loading=\"lazy\" decoding=\"async\"")}<figcaption class="caption">${caption}</figcaption></figure>`).join("")}</div><div class="section-action"><a class="button button-secondary button-on-dark" href="gallery/index.html">View Project Gallery</a></div></div></section>
    <section class="section-band section-process" id="process"><div class="container"><div class="section-heading section-heading-light"><p class="eyebrow">Process</p><h2>A clearer roofing process.</h2><p>Every step is built around documentation, written scope, and homeowner understanding.</p></div><ol class="process-track"><li><span>1</span><h3>Request</h3><p>Tell us what you are seeing or schedule an inspection.</p></li><li><span>2</span><h3>Inspect</h3><p>Quest documents the roof condition with photos.</p></li><li><span>3</span><h3>Estimate</h3><p>You receive a written scope with clear repair or replacement options.</p></li><li><span>4</span><h3>Build</h3><p>Approved work is scheduled, completed, cleaned up, and reviewed.</p></li></ol></div></section>
    ${estimateSection()}
    <section class="section-band section-reviews" id="reviews"><div class="container review-layout"><div class="section-heading"><p class="eyebrow">Homeowner feedback</p><h2>Homeowner feedback that speaks to the work.</h2><p>Published here without star ratings or platform badges until review source details are approved.</p></div><!-- Replace with verified Google/CRM reviews when approved by client. --><div class="review-stack"><blockquote><p>"I had a leak that caused serious issues in my living room ceiling. From inspection to final repair they were professional, efficient, and transparent about costs."</p><footer>Kristin M.</footer></blockquote><blockquote><p>"Quest Roofing did an outstanding job installing a new roof on our home. They walked us through the process, helped us choose materials, and stuck to the timeline."</p><footer>Joshua S.</footer></blockquote></div></div></section>
    <section class="section-band section-area" id="service-area"><div class="container area-layout"><div><p class="eyebrow">Service area</p><h2>Queen Creek-based. Serving the Greater Phoenix area.</h2><p>Quest is based in Queen Creek and serves nearby Phoenix-area communities with roof inspections, repairs, replacements, and written estimates.</p></div><div class="area-panel"><div class="map-card"><span>Queen Creek</span><strong>Greater Phoenix</strong><em>Documented inspections and written estimates across nearby communities.</em></div><div class="city-pills">${cities.map((city) => `<a href="roofing-${city.slug}-az/index.html">${city.name}</a>`).join("")}</div></div></div></section>
    <section class="section-band section-faq" id="faq"><div class="container faq-layout"><div class="section-heading"><p class="eyebrow">FAQ</p><h2>Questions homeowners ask before they book.</h2></div><div class="faq-list">${faq.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
    <section class="final-cta"><div class="container final-cta-inner"><p class="eyebrow">Ready for a documented roof inspection?</p><h2>Start with photos, a written scope, and a clear answer.</h2><p>Whether you are dealing with a leak, aging materials, or a full replacement decision, Quest Roofing can help you understand the next step before work begins.</p><div class="hero-actions"><a class="button button-primary" href="#estimate">Schedule Free Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div></section>
  </main>`;
  return layout({ title, meta, canonical: `${siteUrl}/`, body, schema, bodyClass: "home" });
}

function estimateSection() {
  return `<section class="section-band section-estimate" id="estimate"><div class="container estimate-layout"><div class="estimate-copy"><p class="eyebrow">Free estimate</p><h2>Get your free roof estimate.</h2><p>Send the basics and Quest Roofing will have what it needs to start the conversation.</p><ul class="contact-points"><li><span>Phone</span><a href="${phoneHref}">${phone}</a></li><li><span>Email</span><a href="mailto:${email}">${email}</a></li><li><span>Coverage</span><strong>Queen Creek-based service across Greater Phoenix</strong></li></ul></div><form class="estimate-form" name="quest-estimate" method="POST" data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data" data-estimate-form><input type="hidden" name="form-name" value="quest-estimate"><p class="bot-field"><label>Do not fill this out <input name="bot-field"></label></p><div class="form-progress" aria-label="Estimate request progress"><button class="form-step-tab is-active" type="button" data-step-target="1">Roof</button><button class="form-step-tab" type="button" data-step-target="2">Contact</button><button class="form-step-tab" type="button" data-step-target="3">Details</button></div><p class="form-announcer" aria-live="polite" data-step-status>Step 1 of 3: roof need.</p><section class="form-step is-active" data-step="1"><h3>Roof need</h3><fieldset><legend>Service needed <span aria-hidden="true">*</span></legend><div class="choice-grid">${["Roof Repair", "Tile Roofing", "Shingle Roofing", "Metal Roofing", "Foam Roofing", "Free Inspection", "Not Sure"].map((item) => `<label><input type="radio" name="service_needed" value="${item}" required><span>${item}</span></label>`).join("")}</div></fieldset><fieldset><legend>Urgency <span aria-hidden="true">*</span></legend><div class="choice-grid choice-grid-tight">${["Active leak", "Recent storm", "Planning ahead", "Not sure"].map((item) => `<label><input type="radio" name="urgency" value="${item}" required><span>${item}</span></label>`).join("")}</div></fieldset><div class="form-actions"><button class="button button-primary" type="button" data-next-step>Next</button></div></section><section class="form-step" data-step="2" hidden><h3>Contact</h3><label><span>Full name <b aria-hidden="true">*</b></span><input type="text" name="full_name" autocomplete="name" required></label><label><span>Phone <b aria-hidden="true">*</b></span><input type="tel" name="phone" autocomplete="tel" required></label><label><span>Email <b aria-hidden="true">*</b></span><input type="email" name="email" autocomplete="email" required></label><div class="form-actions"><button class="button button-secondary" type="button" data-prev-step>Back</button><button class="button button-primary" type="button" data-next-step>Next</button></div></section><section class="form-step" data-step="3" hidden><h3>Property and details</h3><label><span>Address or nearest cross streets <b aria-hidden="true">*</b></span><input type="text" name="property_location" autocomplete="street-address" required></label><label><span>Project details <b aria-hidden="true">*</b></span><textarea name="project_details" rows="5" required></textarea></label><label><span>Optional roof photo</span><input type="file" name="roof_photo" accept="image/*"></label><p class="form-note">For urgent roof leaks, call <a href="${phoneHref}">${phone}</a>.</p><div class="form-actions"><button class="button button-secondary" type="button" data-prev-step>Back</button><button class="button button-primary" type="submit">Submit Estimate Request</button></div><p class="form-status" aria-live="polite"></p></section></form></div></section>`;
}

function servicePage(service) {
  const prefix = "../..";
  const canonical = `${siteUrl}/services/${service.slug}/`;
  const body = `<main id="main" class="subpage-main"><section class="subpage-hero service-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">${service.nav}</p><h1>${service.h1}</h1><p>${service.intro}</p><div class="hero-actions"><a class="button button-primary" href="${home(prefix, "estimate")}">Request Free Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div>${mediaFigure("subpage-photo", service.image, prefix, " loading=\"eager\" decoding=\"async\"", "Real Quest Roofing project documentation.")}</div></section>${section(`Signs you may need ${service.nav.toLowerCase()}.`, "Common roof clues are easier to evaluate when the inspection is tied to photos.", cardGrid(service.signs), "section-sand")}${inlineCta(prefix)}${section("What Quest documents.", "The scope should connect to real roof conditions, not vague sales language.", `<div class="document-grid">${service.documents.map((item) => `<article><span></span><p>${item}</p></article>`).join("")}</div>`)}${section("Repair versus replacement context.", "", `<div class="split-copy"><p>${service.context}</p>${mediaFigure("split-media", service.image === "flashing" ? "deck" : service.image, prefix, " loading=\"lazy\" decoding=\"async\"", "Scope decisions start with visible roof condition.")}</div>`, "section-clay")}${inlineCta(prefix)}${section(`${service.nav} FAQ.`, "", `<div class="faq-list">${service.faq.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`)}</main>`;
  const schema = pageSchema(canonical, service.title, service.meta, [{ "@type": "Service", name: service.nav, provider: { "@id": `${siteUrl}/#business` }, areaServed: cities.map((city) => ({ "@type": "City", name: city.name })) }, faqSchema(service.faq)]);
  return layout({ title: service.title, meta: service.meta, canonical, body, schema, prefix, bodyClass: `subpage service-page service-${service.slug}` });
}

function cityPage(city) {
  const prefix = "..";
  const canonical = `${siteUrl}/roofing-${city.slug}-az/`;
  const faq = [[`Does Quest Roofing serve ${city.name}?`, `Yes. Quest serves ${city.name} as part of its Greater Phoenix service area from a Queen Creek base.`], [`What roof concerns are common in ${city.name}?`, city.concerns.map(([title]) => title).join(", ") + " are common reasons homeowners request an inspection."], [`Can I get a written estimate in ${city.name}?`, "Yes. Quest uses inspection photos and written estimates so the scope is clear before approved work is scheduled."]];
  const body = `<main id="main" class="subpage-main"><section class="subpage-hero city-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">${city.name} roof service</p><h1>${city.h1}</h1><p>${city.intro}</p><div class="hero-actions"><a class="button button-primary" href="${home(prefix, "estimate")}">Request Free Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div><aside class="city-proof-card"><span>Quest service area</span><strong>${city.name}</strong><p>Photo-backed inspections, written scopes, and clear roofing options.</p><div class="mini-proof"><span>${roc("credential-inline")}</span><span>${gaf("credential-inline")}</span></div></aside></div></section>${section(`${city.name} roof concerns.`, "Each city page uses local roof context without pretending every concern is the same.", cardGrid(city.concerns), "section-sand")}${inlineCta(prefix)}${section(`Roofing services in ${city.name}.`, "Quest handles the core roof systems represented across this site.", `<div class="service-link-grid">${services.map((service) => `<a href="${link(prefix, `services/${service.slug}/index.html`)}"><strong>${service.nav}</strong><span>${service.documents[0]}</span></a>`).join("")}</div>`)}${section(`How ${city.name} requests stay clear.`, "", `<ol class="subpage-process"><li><span>1</span><p>Tell Quest what you are seeing.</p></li><li><span>2</span><p>The roof condition is documented with photos.</p></li><li><span>3</span><p>You review a written estimate before approved work begins.</p></li></ol>`, "section-clay")}${section(`${city.name} roofing FAQ.`, "", `<div class="faq-list">${faq.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`)}</main>`;
  const schema = pageSchema(canonical, city.title, city.meta, [{ "@type": "Service", name: `Roofing services in ${city.name}, AZ`, provider: { "@id": `${siteUrl}/#business` }, areaServed: { "@type": "City", name: city.name } }, faqSchema(faq)]);
  return layout({ title: city.title, meta: city.meta, canonical, body, schema, prefix, bodyClass: `subpage city-page city-${city.slug}` });
}

const supportPages = [
  ["about-us/our-team/", "Our Team | Quest Roofing", "Roofing help organized around documentation.", "About Quest", "Learn how Quest Roofing handles scheduling, roof inspection, written estimates, and project closeout from Queen Creek, Arizona.", [["Scheduling", "We collect roof type, visible concerns, leak timing, and photos when available."], ["Inspection", "We document roof condition instead of relying on vague verbal guesses."], ["Estimate handoff", "We explain repair, replacement, materials, and timing in a written scope."]]],
  ["about-us/core-values/", "Core Values | Quest Roofing", "Clear scope. Honest guidance. Clean closeout.", "Core values", "Quest Roofing values clear communication, documented estimates, repair-first guidance when appropriate, and respectful project closeout.", [["Repair-first when appropriate", "If a targeted repair solves the problem, we explain that path."], ["Replacement when justified", "If the system needs larger work, we show the reason clearly."], ["Written accountability", "Photos and written scope help homeowners approve work calmly."]]],
  ["about-us/community-outreach/", "Community Outreach | Quest Roofing", "Useful roof guidance for local homeowners.", "Community outreach", "Quest Roofing supports homeowners with storm readiness, roofing education, and practical local roof guidance.", [["Storm readiness", "Know what to watch before and after monsoon weather."], ["Estimate education", "Use plain-language roof terms to compare scopes."], ["Verifiable proof", "Community claims should be documented before they are published."]]],
  ["resources/design-your-roof/", "Design Your Roof | Quest Roofing", "Compare roof systems before approving work.", "Roof planning", "Compare tile, shingle, foam, and metal roof decisions before requesting a roofing estimate from Quest Roofing.", [["Tile roofing", "Good Arizona fit when underlayment, valleys, and tile condition are documented."], ["Shingle roofing", "Practical residential option when heat, flashing, and roof age are considered."], ["Foam roofing", "Useful for flat and low-slope roofs when coating and drainage are managed."], ["Metal roofing", "Detail-driven system where seams, fasteners, and flashing matter."]]],
  ["resources/roofing-glossary/", "Roofing Glossary | Quest Roofing", "Plain-English roofing terms.", "Roofing glossary", "Understand roofing terms like underlayment, flashing, valley, coating, decking, and written scope before approving work.", [["Underlayment", "Protective layer beneath tile that often drives the real roof scope."], ["Flashing", "Metal or roof detail used around walls, edges, valleys, and penetrations."], ["Valley", "Where roof planes meet and water concentrates during rain."], ["Coating", "Protective top layer used on foam and some flat roof systems."], ["Decking", "Structural roof surface below the roofing assembly."], ["Scope", "Written description of what work is included and priced."]]]
].map(([path, title, h1, eyebrow, meta, cards]) => ({ path, title, h1, eyebrow, meta, cards }));

function supportPage(page) {
  const prefix = page.path.split("/").filter(Boolean).length > 1 ? "../.." : "..";
  const canonical = `${siteUrl}/${page.path}`;
  const body = `<main id="main" class="subpage-main"><section class="subpage-hero support-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}</h1><p>${page.meta}</p><div class="hero-actions"><a class="button button-primary" href="${home(prefix, "estimate")}">Schedule Free Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div>${mediaFigure("subpage-photo", "inspection", prefix, " loading=\"eager\" decoding=\"async\"", "Photo-backed roofing documentation from Quest Roofing.")}</div></section>${section("Useful details.", "", cardGrid(page.cards), "section-sand")}${inlineCta(prefix)}</main>`;
  return layout({ title: page.title, meta: page.meta, canonical, body, schema: pageSchema(canonical, page.title, page.meta), prefix, bodyClass: `subpage support-page ${page.path.replace(/\//g, "-")}` });
}

function galleryPage(path = "gallery/") {
  const prefix = path.split("/").filter(Boolean).length > 1 ? "../.." : "..";
  const title = path.startsWith("about-us") ? "Completed Roofing Projects | Quest Roofing" : "Roofing Gallery | Quest Roofing";
  const h1 = path.startsWith("about-us") ? "Real roof work with visible project proof." : "Real roof work, organized for review.";
  const meta = "Browse real Quest Roofing project photos showing roof inspections, repair details, underlayment, flashing, and finished surfaces.";
  const photos = [["protection", "Property protection"], ["staged", "Tile staged for underlayment"], ["battens", "Battens and underlayment"], ["underlayment", "Clean deck preparation"], ["flashing", "Flashing repair detail"], ["pipe", "Pipe flashing detail"], ["metal", "Metal valley flashing"], ["deck", "Deck repair area"], ["shingle", "Finished shingle surface"], ["tileFinished", "Finished tile roof slope"], ["consultant", "On-roof documentation"], ["inspection", "Inspection context"]];
  const canonical = `${siteUrl}/${path}`;
  const body = `<main id="main" class="subpage-main"><section class="subpage-hero support-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">Gallery</p><h1>${h1}</h1><p>${meta}</p><div class="hero-actions"><a class="button button-primary" href="${home(prefix, "estimate")}">Schedule Free Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div>${mediaFigure("subpage-photo", "protection", prefix, " loading=\"eager\" decoding=\"async\"", "Project documentation and roof detail photos.")}</div></section>${section("Browse project documentation.", "", `<div class="gallery-wall">${photos.map(([photo, caption], index) => `<a class="image-card image-card--overlay ${index % 5 === 0 ? "wide" : ""}" href="${asset(prefix, images[photo][0])}" target="_blank" rel="noopener">${mediaFrame(photo, prefix, " loading=\"lazy\" decoding=\"async\"")}<span class="caption">${caption}</span></a>`).join("")}</div>`, "section-gallery-page")}${inlineCta(prefix)}</main>`;
  return layout({ title, meta, canonical, body, schema: pageSchema(canonical, title, meta), prefix, bodyClass: "subpage gallery-page" });
}

function reviewsPage() {
  const prefix = "../..";
  const title = "Reviews | Quest Roofing";
  const meta = "Quest Roofing shares homeowner feedback focused on communication, clean work, cost clarity, and written scope.";
  const canonical = `${siteUrl}/about-us/reviews/`;
  const body = `<main id="main" class="subpage-main"><section class="subpage-hero support-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">Reviews</p><h1>Homeowner feedback without inflated proof.</h1><p>${meta}</p><div class="hero-actions"><a class="button button-primary" href="${home(prefix, "estimate")}">Schedule Free Inspection</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div></div></section>${section("Homeowner feedback that speaks to the work.", "Published without star ratings or platform badges until review source details are approved.", `<!-- Replace with verified Google/CRM reviews when approved by client. --><div class="review-stack"><blockquote><p>"I had a leak that caused serious issues in my living room ceiling. From inspection to final repair they were professional, efficient, and transparent about costs."</p><footer>Kristin M.</footer></blockquote><blockquote><p>"Quest Roofing did an outstanding job installing a new roof on our home. They walked us through the process, helped us choose materials, and stuck to the timeline."</p><footer>Joshua S.</footer></blockquote></div><div class="inline-note">Review counts, platform badges, and rating claims should be added only after the client approves the source.</div>`, "section-sand")}${inlineCta(prefix)}</main>`;
  return layout({ title, meta, canonical, body, schema: pageSchema(canonical, title, meta), prefix, bodyClass: "subpage reviews-page" });
}

function contactPage() {
  const prefix = "..";
  const title = "Contact Quest Roofing";
  const meta = "Contact Quest Roofing for a free inspection or written roofing estimate in Queen Creek and the Greater Phoenix area.";
  const canonical = `${siteUrl}/contact/`;
  const body = `<main id="main" class="subpage-main"><section class="subpage-hero support-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">Contact</p><h1>Talk with Quest Roofing about your roof.</h1><p>${meta}</p><div class="hero-actions"><a class="button button-primary" href="${home(prefix, "estimate")}">Submit Estimate Request</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div>${mediaFigure("subpage-photo", "inspection", prefix, " loading=\"eager\" decoding=\"async\"", "Send details so the first conversation starts clearer.")}</div></section>${section("Fastest ways to start.", "", `<div class="contact-grid"><a href="${phoneHref}"><span>Call</span><strong>${phone}</strong><em>Use for active leaks or scheduling questions.</em></a><a href="mailto:${email}"><span>Email</span><strong>${email}</strong><em>Send your name, roof concern, and photos if available.</em></a><a href="${home(prefix, "estimate")}"><span>Form</span><strong>Submit Estimate Request</strong><em>Use the guided homepage form for a written request.</em></a></div>`, "section-sand")}${section("What to send.", "", `<p class="wide-copy">Include your address or nearest cross streets, roof type if known, leak location, storm timing, interior stain photos, exterior roof photos if safe, and the service you think you need.</p>`, "section-sand")}</main>`;
  return layout({ title, meta, canonical, body, schema: pageSchema(canonical, title, meta), prefix, bodyClass: "subpage contact-page" });
}

function notFoundPage() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Page Not Found | Quest Roofing</title><meta name="robots" content="noindex, follow"><meta name="theme-color" content="#0B1D33"><link rel="icon" href="${favicon}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="${versionedAsset("", "tokens.css")}"><link rel="stylesheet" href="${versionedAsset("", "styles.css")}"></head><body class="subpage"><a class="skip-link" href="#main">Skip to content</a><div class="site-shell">${header(".")}<main id="main" class="subpage-main"><section class="subpage-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">404</p><h1>Page not found.</h1><p>The page may have moved. Start from the homepage, service pages, or call Quest Roofing directly.</p><div class="hero-actions"><a class="button button-primary" href="index.html">Go Home</a><a class="button button-secondary button-on-dark" href="${phoneHref}">Call ${phone}</a></div></div></div></section></main>${footer(".")}</div><script src="${versionedAsset("", "script.js")}" defer></script></body></html>`;
}

const tokensCss = `/* Hallmark - pre-emit critique: P5 H5 E5 S5 R5 V5 | Quest Roofing documented Arizona trust */
:root {
  --font-display: "Sora", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --color-deep-navy: #0B1D33;
  --color-strong-navy: #132B45;
  --color-quest-blue: #12A8D8;
  --color-roof-orange: #E85D24;
  --color-burnt-clay: #B95B35;
  --color-desert-sand: #F6EFE4;
  --color-warm-off-white: #FFFDF8;
  --color-asphalt-gray: #3C4652;
  --color-muted-line: #D9D2C5;
  --color-trust-green: #2F7D4F;
  --color-white: #FFFFFF;
  --color-ink: var(--color-deep-navy);
  --color-ink-soft: var(--color-asphalt-gray);
  --color-surface: var(--color-white);
  --color-page: var(--color-warm-off-white);
  --color-panel: var(--color-desert-sand);
  --color-line: var(--color-muted-line);
  --color-accent: var(--color-roof-orange);
  --color-accent-strong: var(--color-burnt-clay);
  --color-focus: var(--color-trust-green);
  --color-on-dark: var(--color-warm-off-white);
  --color-on-dark-soft: #DDE5E8;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --text-xs: 0.76rem;
  --text-sm: 0.88rem;
  --text-base: 1rem;
  --text-lg: 1.12rem;
  --text-xl: 1.28rem;
  --text-2xl: clamp(1.55rem, 2.1vw, 2.1rem);
  --text-3xl: clamp(2rem, 3.4vw, 3.1rem);
  --text-display: clamp(2.55rem, 5.4vw, 5rem);
  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-card: 1.25rem;
  --radius-panel: 1.5rem;
  --radius-pill: 999px;
  --rule: 1px;
  --shadow-card: 0 18px 50px rgb(11 29 51 / 0.12);
  --shadow-panel: 0 28px 80px rgb(11 29 51 / 0.2);
  --shadow-button: 0 14px 30px rgb(232 93 36 / 0.28);
  --focus-ring: 0 0 0 3px rgb(47 125 79 / 0.34);
  --dur-fast: 150ms;
  --dur-base: 240ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
`;

const stylesCss = `/* Hallmark - macrostructure: documented contractor trust - tone: premium Arizona practical - anchor hue: roof orange */
@import url("tokens.css?v=${cacheVersion}");
*,*::before,*::after{box-sizing:border-box}html,body{margin:0;overflow-x:clip;background:var(--color-page)}html{scroll-behavior:smooth;scroll-padding-top:7.5rem}body{color:var(--color-ink);font-family:var(--font-body);font-size:var(--text-base);line-height:1.62;text-rendering:optimizeLegibility}body.nav-open{overflow:hidden}img{display:block;max-width:100%;height:auto}a{color:inherit;text-decoration:none}button,input,select,textarea{font:inherit}button{cursor:pointer}:focus-visible{outline:3px solid var(--color-focus);outline-offset:3px}.skip-link{position:fixed;top:var(--space-3);left:var(--space-3);z-index:100;transform:translateY(-150%);border-radius:var(--radius-pill);background:var(--color-accent);color:var(--color-white);padding:var(--space-3) var(--space-5);font-weight:800}.skip-link:focus{transform:translateY(0)}.container{width:min(100% - 2rem,76rem);margin-inline:auto}.site-shell{min-height:100vh;overflow-x:clip}.site-header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--color-warm-off-white),transparent 4%);border-bottom:var(--rule) solid color-mix(in srgb,var(--color-line),transparent 20%);backdrop-filter:blur(18px)}.top-bar{background:var(--color-deep-navy);color:var(--color-on-dark-soft);font-size:var(--text-sm)}.top-bar-inner,.top-bar-actions,.header-inner,.brand,.site-nav,.hero-actions,.footer-bottom{display:flex;align-items:center}.top-bar-inner{justify-content:space-between;gap:var(--space-4);min-height:2.45rem}.top-bar p{margin:0}.top-bar-actions{gap:var(--space-5);font-weight:700;color:var(--color-white)}.credential-link,.credential-inline{text-decoration:underline;text-decoration-thickness:.08em;text-underline-offset:.2em}.credential-link:hover,.credential-link:focus-visible,.credential-inline:hover,.credential-inline:focus-visible{color:var(--color-accent)}.header-inner{justify-content:space-between;gap:var(--space-5);min-height:5rem}.brand{gap:var(--space-3);min-width:0}.brand-mark{display:grid;place-items:center;width:3.2rem;height:3.2rem;border-radius:var(--radius-md);background:var(--color-deep-navy);padding:.38rem;box-shadow:var(--shadow-card);flex:0 0 auto}.brand-mark img{width:100%;height:100%;object-fit:contain}.brand-copy{display:grid;line-height:1.1}.brand-copy strong,h1,h2,h3{font-family:var(--font-display);line-height:1.05;letter-spacing:0}.brand-copy strong{font-size:var(--text-lg)}.brand-copy span{color:var(--color-ink-soft);font-size:var(--text-sm);font-weight:700}.site-nav{gap:var(--space-4);font-size:var(--text-sm);font-weight:800}.site-nav a{min-height:2.75rem;display:inline-flex;align-items:center;border-radius:var(--radius-pill);padding-inline:var(--space-3)}.site-nav a:hover,.site-nav a:focus-visible{color:var(--color-accent)}.nav-cta,.button{border:0;border-radius:var(--radius-pill);min-height:2.9rem;display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);padding:.8rem 1.25rem;font-weight:850;line-height:1.1;text-align:center;transition:transform var(--dur-fast) var(--ease-out),background-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}.nav-cta,.button-primary{background:var(--color-accent);color:var(--color-white);box-shadow:var(--shadow-button)}.button-secondary{border:var(--rule) solid color-mix(in srgb,var(--color-deep-navy),transparent 72%);background:var(--color-warm-off-white);color:var(--color-deep-navy)}.button-on-dark{border-color:color-mix(in srgb,var(--color-white),transparent 74%);background:color-mix(in srgb,var(--color-white),transparent 90%);color:var(--color-white)}.button:hover,.button:focus-visible,.nav-cta:hover,.nav-cta:focus-visible{transform:translateY(-1px)}.nav-toggle,.header-call{display:none}.hero{position:relative;overflow:hidden;background:radial-gradient(circle at 78% 22%,color-mix(in srgb,var(--color-accent),transparent 84%),transparent 32%),linear-gradient(135deg,var(--color-deep-navy) 0%,var(--color-strong-navy) 58%,var(--color-deep-navy) 100%);color:var(--color-on-dark);padding:clamp(4.5rem,8vw,7rem) 0 clamp(3rem,6vw,5rem)}.hero-grid,.split-layout,.estimate-layout,.review-layout,.area-layout,.subpage-hero-grid,.footer-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,5vw,4rem);align-items:center}.hero-copy{max-width:42rem}.eyebrow{margin:0 0 var(--space-3);color:var(--color-accent);font-size:var(--text-sm);font-weight:900;text-transform:uppercase;letter-spacing:.06em}.hero h1,.subpage-hero h1{margin:0;color:inherit;font-size:var(--text-display);overflow-wrap:anywhere}.hero-lead,.subpage-hero p,.section-heading p,.story-copy p,.estimate-copy p,.final-cta p{max-width:48rem;font-size:var(--text-lg)}.hero-lead{color:var(--color-on-dark-soft)}.trust-pills,.check-list,.contact-points,.footer-contact{padding:0;margin:var(--space-6) 0;list-style:none}.trust-pills{display:flex;flex-wrap:wrap;gap:var(--space-2)}.trust-pills li{border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 78%);border-radius:var(--radius-pill);background:color-mix(in srgb,var(--color-white),transparent 90%);color:var(--color-on-dark);padding:.5rem .8rem;font-size:var(--text-sm);font-weight:800}.hero-actions{flex-wrap:wrap;gap:var(--space-3)}.hero-microcopy{margin:var(--space-4) 0 0;color:var(--color-on-dark-soft);font-weight:700}.hero-visual{position:relative;min-height:34rem}.hero-photo-card,.story-photo,.subpage-photo{overflow:hidden;margin:0;border-radius:var(--radius-panel);background:var(--color-surface);box-shadow:var(--shadow-panel)}.hero-photo-card{position:absolute;inset:0;transform:rotate(1deg)}.hero-photo-card img,.story-photo img,.subpage-photo img{width:100%;height:100%;min-height:100%;object-fit:cover}.hero-photo-card figcaption,.story-photo figcaption,.subpage-photo figcaption{position:absolute;left:var(--space-4);right:var(--space-4);bottom:var(--space-4);border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-deep-navy),transparent 10%);color:var(--color-on-dark);padding:var(--space-3) var(--space-4);font-weight:800}.proof-float{position:absolute;width:min(18rem,54%);border-radius:var(--radius-card);background:var(--color-warm-off-white);color:var(--color-deep-navy);box-shadow:var(--shadow-card);padding:var(--space-4)}.proof-float strong,.proof-float span{display:block}.proof-float-one{top:var(--space-6);left:calc(var(--space-4)*-1)}.proof-float-two{right:calc(var(--space-3)*-1);bottom:var(--space-8)}.proof-strip{background:var(--color-warm-off-white);border-bottom:var(--rule) solid var(--color-line);padding:var(--space-5) 0}.proof-strip-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--space-3)}.proof-strip article{border:var(--rule) solid var(--color-line);border-radius:var(--radius-card);background:var(--color-surface);padding:var(--space-4)}.proof-strip span,.contact-points span,.footer-contact span,.map-card span,.city-proof-card span,.gallery-wall span,.contact-grid span{display:block;color:var(--color-accent-strong);font-size:var(--text-xs);font-weight:900;text-transform:uppercase;letter-spacing:.06em}.proof-strip strong{display:block;margin-top:var(--space-1)}.section-band{position:relative;padding:clamp(3.5rem,7vw,7rem) 0;background:var(--color-warm-off-white)}.section-sand,.section-human,.section-area,.section-gallery-page{background:var(--color-desert-sand)}.section-clay{background:color-mix(in srgb,var(--color-desert-sand),var(--color-burnt-clay) 8%)}.section-heading{max-width:48rem;margin-bottom:var(--space-10)}.section-heading h2,.story-copy h2,.estimate-copy h2,.final-cta h2{margin:0;color:var(--color-deep-navy);font-size:var(--text-3xl);overflow-wrap:anywhere}.section-heading p,.story-copy p,.estimate-copy p,.split-copy p,.wide-copy{color:var(--color-ink-soft)}.issue-grid,.service-card-grid,.seo-card-grid,.document-grid,.service-link-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-5)}.issue-card,.service-card,.seo-card-grid article,.document-grid article,.service-link-grid a,.review-stack blockquote,.estimate-form,.area-panel,.city-proof-card,.inline-note,.contact-grid a{border:var(--rule) solid color-mix(in srgb,var(--color-line),transparent 15%);border-radius:var(--radius-card);background:var(--color-surface);box-shadow:var(--shadow-card)}.issue-card,.service-card{overflow:hidden}.issue-card img,.service-card img{width:100%;height:13rem;object-fit:cover}.issue-card div,.service-card div,.seo-card-grid article,.document-grid article,.service-link-grid a{padding:var(--space-5)}.issue-card h3,.service-card h3,.seo-card-grid h3,.service-link-grid strong{margin:0 0 var(--space-2);color:var(--color-deep-navy);font-size:var(--text-xl)}.issue-card p,.service-card p,.seo-card-grid p,.service-link-grid span{margin:0;color:var(--color-ink-soft)}.issue-card a,.service-card a,.service-link-grid a{color:var(--color-accent-strong);font-weight:900}.story-photo,.subpage-photo{position:relative;min-height:32rem}.check-list{display:grid;gap:var(--space-3)}.check-list li{position:relative;padding-left:2rem;color:var(--color-deep-navy);font-weight:800}.check-list li::before,.document-grid article span{content:"";position:absolute;width:.8rem;height:.8rem;border-radius:50%;background:var(--color-trust-green)}.check-list li::before{left:0;top:.55rem}.section-gallery-teaser,.section-process,.final-cta{overflow:hidden;background:var(--color-deep-navy);color:var(--color-on-dark)}.section-gallery-teaser .section-heading h2,.section-process .section-heading h2,.final-cta h2{color:var(--color-on-dark)}.section-gallery-teaser .section-heading p,.section-process .section-heading p,.final-cta p{color:var(--color-on-dark-soft)}.editorial-gallery,.gallery-wall{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-flow:dense;gap:var(--space-4)}.editorial-gallery figure,.gallery-wall a{position:relative;overflow:hidden;min-height:16rem;margin:0;border-radius:var(--radius-card);background:var(--color-strong-navy)}.editorial-gallery .gallery-feature,.gallery-wall .wide{grid-column:span 2;grid-row:span 2}.editorial-gallery img,.gallery-wall img{width:100%;height:100%;object-fit:cover}.editorial-gallery figcaption,.gallery-wall span{position:absolute;left:var(--space-3);bottom:var(--space-3);border-radius:var(--radius-pill);background:color-mix(in srgb,var(--color-deep-navy),transparent 8%);color:var(--color-white);padding:.45rem .75rem}.section-action{margin-top:var(--space-8)}.process-track,.subpage-process{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--space-5);padding:0;margin:0;list-style:none}.process-track li,.subpage-process li{position:relative;border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 84%);border-radius:var(--radius-card);background:color-mix(in srgb,var(--color-white),transparent 92%);padding:var(--space-5)}.process-track span,.subpage-process span{display:grid;place-items:center;width:2.5rem;height:2.5rem;border-radius:50%;background:var(--color-accent);color:var(--color-white);font-weight:900}.process-track h3{color:var(--color-white)}.process-track p{color:var(--color-on-dark-soft)}.estimate-layout{align-items:start}.contact-points{display:grid;gap:var(--space-3)}.contact-points li,.footer-contact li{border-top:var(--rule) solid var(--color-line);padding-top:var(--space-3)}.contact-points a,.footer-contact a{color:var(--color-deep-navy);font-weight:900}.estimate-form{padding:var(--space-6)}.bot-field,.form-step[hidden]{display:none}.form-progress{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-2);margin-bottom:var(--space-4)}.form-step-tab{min-height:2.75rem;border:var(--rule) solid var(--color-line);border-radius:var(--radius-pill);background:var(--color-desert-sand);color:var(--color-ink-soft);font-weight:900}.form-step-tab.is-active{background:var(--color-deep-navy);color:var(--color-white)}.form-announcer,.form-note,.form-status{color:var(--color-ink-soft);font-weight:700}.form-step{display:grid;gap:var(--space-4)}.form-step h3{margin:0;font-size:var(--text-2xl)}.estimate-form fieldset{min-width:0;margin:0;padding:0;border:0}.estimate-form legend,.estimate-form label span{display:block;margin-bottom:var(--space-2);color:var(--color-deep-navy);font-weight:900}.choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-2)}.choice-grid label{min-height:3rem;display:flex;align-items:center;gap:var(--space-2);border:var(--rule) solid var(--color-line);border-radius:var(--radius-md);padding:var(--space-3);background:var(--color-warm-off-white);font-weight:800}input,select,textarea{width:100%;min-height:3rem;border:var(--rule) solid var(--color-line);border-radius:var(--radius-md);background:var(--color-warm-off-white);color:var(--color-deep-navy);padding:.8rem 1rem}textarea{resize:vertical}input:focus,select:focus,textarea:focus{outline:none;box-shadow:var(--focus-ring);border-color:var(--color-focus)}.form-actions{display:flex;flex-wrap:wrap;gap:var(--space-3)}.review-layout{align-items:start}.review-stack{display:grid;gap:var(--space-4)}.review-stack blockquote{margin:0;padding:var(--space-6)}.review-stack p{margin:0 0 var(--space-4);color:var(--color-deep-navy);font-size:var(--text-lg)}.review-stack footer{color:var(--color-accent-strong);font-weight:900}.area-layout{align-items:start}.area-panel{padding:var(--space-5)}.map-card{min-height:18rem;border-radius:var(--radius-card);background:linear-gradient(135deg,color-mix(in srgb,var(--color-accent),transparent 78%),transparent 38%),linear-gradient(160deg,var(--color-deep-navy),var(--color-strong-navy));color:var(--color-on-dark);padding:var(--space-6)}.map-card strong{display:block;margin:var(--space-3) 0;font-family:var(--font-display);font-size:var(--text-3xl)}.map-card em{font-style:normal;color:var(--color-on-dark-soft)}.city-pills{display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-4)}.city-pills a{border:var(--rule) solid var(--color-line);border-radius:var(--radius-pill);background:var(--color-warm-off-white);padding:.55rem .8rem;font-weight:900}.faq-layout{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:var(--space-8);align-items:start}.faq-list{display:grid;gap:var(--space-3)}.faq-item{border:var(--rule) solid var(--color-line);border-radius:var(--radius-card);background:var(--color-surface);padding:var(--space-4)}.faq-item summary{cursor:pointer;color:var(--color-deep-navy);font-weight:900}.faq-item p{color:var(--color-ink-soft)}.final-cta{padding:clamp(4rem,8vw,7rem) 0}.final-cta-inner{max-width:48rem}.site-footer{background:var(--color-deep-navy);color:var(--color-on-dark-soft);padding:var(--space-16) 0 calc(var(--space-8) + 4rem)}.footer-layout{align-items:start}.footer-brand{margin:0;color:var(--color-white);font-family:var(--font-display);font-size:var(--text-2xl);font-weight:900}.footer-about p{max-width:32rem}.footer-contact{display:grid;gap:var(--space-3)}.footer-contact li{border-color:color-mix(in srgb,var(--color-white),transparent 84%)}.footer-contact a,.footer-contact strong{color:var(--color-white)}.footer-link-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-6)}.footer-link-grid div{display:grid;gap:var(--space-2)}.footer-link-grid strong{color:var(--color-white);font-family:var(--font-display)}.footer-link-grid a:hover,.footer-link-grid a:focus-visible,.footer-bottom a:hover,.footer-bottom a:focus-visible{color:var(--color-accent)}.footer-bottom{justify-content:space-between;gap:var(--space-4);margin-top:var(--space-10);border-top:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 84%);padding-top:var(--space-4)}.mobile-cta-bar{position:fixed;left:var(--space-3);right:var(--space-3);bottom:var(--space-3);z-index:60;display:none;grid-template-columns:1fr 1fr;gap:var(--space-2);border-radius:var(--radius-pill);background:var(--color-deep-navy);padding:var(--space-2);box-shadow:var(--shadow-panel)}.mobile-cta-bar a{min-height:2.9rem;display:grid;place-items:center;border-radius:var(--radius-pill);background:var(--color-accent);color:var(--color-white);font-weight:900}.mobile-cta-bar a:first-child{background:var(--color-warm-off-white);color:var(--color-deep-navy)}.subpage-hero{background:linear-gradient(112deg,var(--color-deep-navy),var(--color-strong-navy));color:var(--color-on-dark);padding:clamp(4rem,8vw,7rem) 0}.subpage-hero p{color:var(--color-on-dark-soft)}.city-proof-card,.inline-note{padding:var(--space-6)}.city-proof-card strong{display:block;margin:var(--space-2) 0;font-family:var(--font-display);font-size:var(--text-3xl)}.mini-proof{display:flex;flex-wrap:wrap;gap:var(--space-2)}.mini-proof span{border-radius:var(--radius-pill);background:var(--color-desert-sand);padding:.45rem .7rem;font-size:var(--text-sm);font-weight:900}.inline-cta{width:min(100% - 2rem,76rem);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);border-radius:var(--radius-panel);background:var(--color-deep-navy);color:var(--color-on-dark);padding:var(--space-4);transform:translateY(-50%)}.document-grid article{position:relative;min-height:9rem}.document-grid article span{top:var(--space-5);left:var(--space-5)}.document-grid article p{margin:var(--space-6) 0 0;color:var(--color-deep-navy);font-weight:800}.split-copy{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:var(--space-8);align-items:center}.split-copy p,.wide-copy{font-size:var(--text-lg)}.split-copy figure{position:relative;overflow:hidden;min-height:24rem;margin:0;border-radius:var(--radius-panel);box-shadow:var(--shadow-card)}.split-copy img{width:100%;height:100%;object-fit:cover}.split-copy figcaption{position:absolute;left:var(--space-3);bottom:var(--space-3);border-radius:var(--radius-pill);background:color-mix(in srgb,var(--color-deep-navy),transparent 10%);color:var(--color-white);padding:.45rem .75rem;font-weight:900}.contact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-4)}.contact-grid a{padding:var(--space-5)}.contact-grid strong,.contact-grid em{display:block}.contact-grid strong{margin:var(--space-2) 0;color:var(--color-deep-navy);font-family:var(--font-display);font-size:var(--text-xl)}.contact-grid em{color:var(--color-ink-soft);font-style:normal}@media (max-width:68rem){.top-bar{display:none}.header-inner{min-height:4.5rem}.header-call,.nav-toggle{display:inline-flex;align-items:center;justify-content:center;min-width:2.75rem;min-height:2.75rem;border-radius:var(--radius-pill);font-weight:900}.header-call{margin-left:auto;background:var(--color-deep-navy);color:var(--color-white);padding-inline:var(--space-4)}.nav-toggle{position:relative;border:var(--rule) solid var(--color-line);background:var(--color-warm-off-white)}.nav-toggle span{position:absolute;width:1.2rem;height:.14rem;border-radius:var(--radius-pill);background:var(--color-deep-navy);transition:transform var(--dur-fast) var(--ease-out)}.nav-toggle span:first-child{transform:translateY(-.25rem)}.nav-toggle span:last-child{transform:translateY(.25rem)}.nav-toggle[aria-expanded=true] span:first-child{transform:rotate(45deg)}.nav-toggle[aria-expanded=true] span:last-child{transform:rotate(-45deg)}.site-nav{position:fixed;inset:4.5rem 0 auto 0;display:grid;gap:var(--space-2);max-height:calc(100vh - 4.5rem);overflow:auto;background:var(--color-warm-off-white);border-bottom:var(--rule) solid var(--color-line);padding:var(--space-4);transform:translateY(-120%);transition:transform var(--dur-base) var(--ease-out)}.site-nav.is-open{transform:translateY(0)}.site-nav a{justify-content:center;border:var(--rule) solid var(--color-line);background:var(--color-surface)}.hero{background:var(--color-deep-navy)}.hero-grid,.split-layout,.estimate-layout,.review-layout,.area-layout,.subpage-hero-grid,.footer-layout,.faq-layout,.split-copy{grid-template-columns:1fr}.hero-visual{min-height:28rem}.proof-strip-grid,.issue-grid,.service-card-grid,.seo-card-grid,.document-grid,.service-link-grid,.process-track,.subpage-process,.footer-link-grid,.contact-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.editorial-gallery,.gallery-wall{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:42rem){html{scroll-padding-top:5rem}body{padding-bottom:5rem}.container{width:min(100% - 1.25rem,76rem)}.brand-copy span{display:none}.brand-mark{width:2.75rem;height:2.75rem}.hero,.subpage-hero{padding-top:var(--space-16)}.hero h1,.subpage-hero h1{font-size:clamp(2.2rem,13vw,3.2rem)}.hero-actions,.form-actions,.inline-cta{align-items:stretch;flex-direction:column}.button{width:100%}.hero-visual{min-height:24rem}.proof-float{position:static;width:auto;margin-top:var(--space-3)}.hero-photo-card{position:relative;min-height:20rem}.proof-strip-grid,.issue-grid,.service-card-grid,.seo-card-grid,.document-grid,.service-link-grid,.process-track,.subpage-process,.footer-link-grid,.contact-grid,.choice-grid,.editorial-gallery,.gallery-wall{grid-template-columns:1fr}.editorial-gallery .gallery-feature,.gallery-wall .wide{grid-column:auto;grid-row:auto}.story-photo,.subpage-photo{min-height:22rem}.estimate-form{padding:var(--space-4)}.form-progress{grid-template-columns:1fr}.inline-cta{transform:none;margin-block:var(--space-4)}.mobile-cta-bar{display:grid}}@media (prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:1ms!important;animation-duration:1ms!important;animation-iteration-count:1!important}}
`;

const stickyCtaCss = `.mobile-cta-bar{transform:translateY(calc(100% + 1rem));opacity:0;pointer-events:none;transition:transform var(--dur-base) var(--ease-out),opacity var(--dur-base) var(--ease-out)}.mobile-cta-bar.is-visible{transform:translateY(0);opacity:1;pointer-events:auto}`;
const heroSplitCss = `.hero{background:radial-gradient(circle at 78% 22%,color-mix(in srgb,var(--color-accent),transparent 84%),transparent 32%),linear-gradient(135deg,var(--color-deep-navy) 0%,var(--color-strong-navy) 58%,var(--color-deep-navy) 100%);color:var(--color-on-dark);padding:clamp(3.25rem,5.8vw,5.4rem) 0 clamp(2.75rem,5vw,4.5rem)}.hero-grid{grid-template-columns:minmax(0,1.12fr) minmax(18rem,.88fr);gap:clamp(1.5rem,4vw,3.5rem)}.hero-copy{max-width:46.5rem}.hero h1{max-width:46rem;font-size:clamp(3.5rem,5vw,5.15rem);line-height:.98}.hero-lead{margin-top:var(--space-5)}.hero .trust-pills{margin:var(--space-5) 0}.hero-photo-card.image-card{transform:none;border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 78%);box-shadow:0 34px 90px rgb(0 0 0 / .28)}.hero-photo-card figcaption{right:auto;max-width:min(24rem,calc(100% - 2rem))}.hero .proof-float{z-index:2;border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 70%);background:color-mix(in srgb,var(--color-warm-off-white),transparent 6%)}.hero .proof-float-one{top:var(--space-4);left:var(--space-4);width:min(15rem,42%)}.hero .proof-float-two{right:var(--space-4);bottom:var(--space-4)}@media (max-width:68rem){.hero{background:radial-gradient(circle at 78% 18%,color-mix(in srgb,var(--color-accent),transparent 88%),transparent 34%),linear-gradient(135deg,var(--color-deep-navy),var(--color-strong-navy));padding-top:var(--space-12)}.hero-grid{grid-template-columns:1fr}.hero h1{font-size:clamp(3rem,8vw,4.9rem)}}@media (max-width:42rem){.hero h1{font-size:clamp(2rem,10.5vw,2.65rem);line-height:1.02}.hero .proof-float{border-color:var(--color-line);background:var(--color-warm-off-white)}}`;
const mobileHeroCss = `@media (max-width:42rem){.hero,.subpage-hero{padding-top:var(--space-10)}.hero h1,.subpage-hero h1{font-size:clamp(2rem,10.5vw,2.65rem)}.hero-lead{font-size:1rem}.trust-pills{margin:var(--space-4) 0}.trust-pills li{padding:.42rem .68rem}}`;
const imageCardCss = `.image-card{display:block;overflow:hidden;border-radius:var(--radius-panel);background:var(--color-warm-off-white);isolation:isolate}.image-card .media-frame{aspect-ratio:16/10;overflow:hidden;padding:0}.image-card img{width:100%;height:100%;min-height:0;object-fit:cover;object-position:var(--image-position,center center);display:block}.image-card--overlay{position:relative;background:var(--color-strong-navy)}.image-card--overlay::after{content:"";position:absolute;inset:auto 0 0;height:45%;background:linear-gradient(180deg,transparent,rgb(11 29 51 / .72));pointer-events:none}.image-card--overlay .caption{position:absolute;z-index:1;left:var(--space-3);right:auto;bottom:var(--space-3);max-width:min(28rem,calc(100% - 1.5rem));border-radius:var(--radius-pill);background:rgb(11 29 51 / .92);color:var(--color-white);box-shadow:0 10px 28px rgb(11 29 51 / .18);padding:.6rem .85rem;font-size:var(--text-sm);font-weight:900;line-height:1.25}.hero-visual{display:grid;align-content:center;min-height:0}.hero-photo-card.image-card{position:relative;inset:auto;transform:rotate(1deg);box-shadow:var(--shadow-panel)}.hero-photo-card .media-frame{aspect-ratio:16/10}.story-photo.image-card,.subpage-photo.image-card,.split-copy .image-card{position:relative;min-height:0;box-shadow:var(--shadow-panel)}.story-photo .media-frame,.subpage-photo .media-frame,.split-copy .media-frame{aspect-ratio:16/10}.service-hero .subpage-photo .media-frame{aspect-ratio:4/3}.issue-card.image-card,.service-card.image-card{border-radius:var(--radius-card);background:var(--color-surface)}.issue-card .media-frame,.service-card .media-frame{aspect-ratio:16/10;padding:0}.issue-card .image-card-body,.service-card .image-card-body{padding:var(--space-5)}.issue-card .media-frame img,.service-card .media-frame img{height:100%}.editorial-gallery .image-card,.gallery-wall .image-card{position:relative;min-height:0;border-radius:var(--radius-card)}.editorial-gallery .media-frame,.gallery-wall .media-frame{aspect-ratio:4/3}.editorial-gallery .gallery-feature,.gallery-wall .wide{grid-column:auto;grid-row:auto}.editorial-gallery .gallery-feature .media-frame,.gallery-wall .wide .media-frame{height:auto;min-height:0;aspect-ratio:4/3}.split-copy figure{min-height:0}.editorial-gallery figure,.gallery-wall a{min-height:0}.hero .proof-float-two{bottom:var(--space-4)}@media (max-width:68rem){.hero-visual{min-height:0}.hero-photo-card.image-card{transform:none}.proof-float{max-width:18rem}}@media (max-width:42rem){.hero-visual{min-height:0}.hero-photo-card.image-card,.story-photo.image-card,.subpage-photo.image-card{min-height:0}.hero-photo-card .media-frame,.story-photo .media-frame,.subpage-photo .media-frame,.split-copy .media-frame,.issue-card .media-frame,.service-card .media-frame,.editorial-gallery .media-frame,.gallery-wall .media-frame{aspect-ratio:4/3}.image-card--overlay .caption{left:var(--space-3);right:var(--space-3);max-width:none}.hero .proof-float{max-width:none}}`;

const homepageCurrentCss = `.issue-grid--diagnostic{align-items:stretch}.issue-card--diagnostic{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-4);min-height:12.5rem;padding:var(--space-5);background:radial-gradient(circle at 100% 0,color-mix(in srgb,var(--color-accent),transparent 88%),transparent 36%),var(--color-surface)}.issue-card--diagnostic .issue-card-icon{display:grid;place-items:center;width:2.75rem;height:2.75rem;border:var(--rule) solid color-mix(in srgb,var(--color-accent),transparent 42%);border-radius:50%;color:var(--color-accent-strong);font-size:var(--text-sm);font-weight:900}.issue-card--diagnostic div{display:grid;align-content:start;gap:var(--space-3);min-width:0;padding:0}.issue-card--diagnostic h3{margin-bottom:0}.issue-card--diagnostic a{align-self:end;justify-self:start}.home .hero{min-height:clamp(39rem,72vh,50rem);display:grid;align-items:center;background:linear-gradient(90deg,rgb(11 29 51 / .96) 0%,rgb(11 29 51 / .9) 38%,rgb(11 29 51 / .58) 68%,rgb(11 29 51 / .7) 100%),linear-gradient(180deg,rgb(11 29 51 / .18),rgb(11 29 51 / .32)),url("assets/quest-roofing-real/roof-consultant-tile-roof.jpg") center 38% / cover no-repeat}.home .hero-grid{grid-template-columns:minmax(0,47rem)}.home .hero-copy{max-width:47rem}.home .hero h1{max-width:11ch}.home .hero-lead{max-width:44rem}@media (max-width:68rem){.home .hero{min-height:auto;background:linear-gradient(180deg,rgb(11 29 51 / .94) 0%,rgb(11 29 51 / .86) 52%,rgb(11 29 51 / .74) 100%),url("assets/quest-roofing-real/roof-consultant-tile-roof.jpg") center 35% / cover no-repeat}}@media (max-width:42rem){.issue-card--diagnostic{grid-template-columns:1fr;min-height:0}}`;
const headerSplitCss = `.site-header{background:var(--color-warm-off-white);border-bottom:var(--rule) solid var(--color-line);backdrop-filter:none}.header-main{display:grid;grid-template-columns:clamp(18rem,32vw,27.5rem) minmax(0,1fr);min-height:5.5rem;background:var(--color-warm-off-white)}.header-brand-panel{position:relative;display:flex;align-items:center;min-width:0;padding:var(--space-3) clamp(var(--space-12),6vw,var(--space-24)) var(--space-3) clamp(var(--space-6),5vw,var(--space-20));background:radial-gradient(circle at 22% 35%,color-mix(in srgb,var(--color-white),transparent 84%),transparent 29%),linear-gradient(135deg,var(--color-deep-navy) 0%,var(--color-strong-navy) 55%,var(--color-quest-blue) 120%);color:var(--color-white);clip-path:polygon(0 0,calc(100% - 4.5rem) 0,100% 50%,calc(100% - 4.5rem) 100%,0 100%);overflow:hidden}.header-brand-panel::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,color-mix(in srgb,var(--color-white),transparent 88%),transparent 38%,color-mix(in srgb,var(--color-accent),transparent 86%));pointer-events:none}.header-brand-panel .brand{position:relative;z-index:1;color:var(--color-white);gap:var(--space-3);min-width:0}.header-brand-panel .brand-mark{width:3.35rem;height:3.35rem;border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 76%);background:color-mix(in srgb,var(--color-deep-navy),transparent 8%);box-shadow:0 18px 40px rgb(0 0 0 / .2)}.header-brand-panel .brand-copy{min-width:0}.header-brand-panel .brand-copy strong{color:var(--color-white);white-space:nowrap}.header-brand-panel .brand-copy span{color:var(--color-on-dark-soft);white-space:nowrap}.header-nav-panel{display:flex;align-items:center;justify-content:flex-end;min-width:0;gap:var(--space-4);padding-inline:clamp(var(--space-4),4vw,var(--space-20)) clamp(var(--space-6),5vw,var(--space-20));background:linear-gradient(90deg,color-mix(in srgb,var(--color-desert-sand),transparent 54%),var(--color-warm-off-white) 22%)}.header-nav-panel .site-nav{display:flex;align-items:center;justify-content:flex-end;min-width:0;gap:clamp(.35rem,.8vw,var(--space-3));font-size:clamp(.79rem,.82vw,var(--text-sm));font-weight:900}.header-nav-panel .site-nav a{min-height:2.65rem;white-space:nowrap;padding-inline:clamp(.45rem,.75vw,var(--space-3));color:var(--color-deep-navy)}.header-nav-panel .site-nav a:hover,.header-nav-panel .site-nav a:focus-visible{color:var(--color-accent)}.header-nav-panel .site-nav .nav-cta{margin-left:clamp(.35rem,.9vw,var(--space-3));padding-inline:clamp(.85rem,1.4vw,1.25rem);background:var(--color-accent);color:var(--color-white)}.header-nav-panel .site-nav .nav-cta:hover,.header-nav-panel .site-nav .nav-cta:focus-visible{color:var(--color-white);background:color-mix(in srgb,var(--color-accent),var(--color-deep-navy) 10%)}.footer-brand-lockup{display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)}.footer-brand-lockup .footer-brand{margin:0}.footer-brand-mark{width:3.4rem;height:3.4rem;border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 80%);background:color-mix(in srgb,var(--color-white),transparent 92%)}@media (max-width:76rem){.top-bar{display:none}.header-main{display:flex;align-items:center;min-height:4.75rem;padding:.55rem var(--space-3);background:var(--color-warm-off-white)}.header-brand-panel{flex:1 1 auto;min-width:0;clip-path:none;border-radius:var(--radius-pill);padding:.5rem var(--space-3);background:linear-gradient(135deg,var(--color-deep-navy),var(--color-strong-navy) 68%,color-mix(in srgb,var(--color-quest-blue),var(--color-strong-navy) 35%));box-shadow:0 14px 34px rgb(11 29 51 / .16)}.header-brand-panel::before{opacity:.7}.header-brand-panel .brand{gap:.65rem}.header-brand-panel .brand-mark{width:2.6rem;height:2.6rem;border-radius:var(--radius-md);padding:.32rem}.header-brand-panel .brand-copy strong{font-size:clamp(.98rem,2.5vw,1.1rem)}.header-brand-panel .brand-copy span{font-size:.76rem;color:var(--color-on-dark-soft)}.header-nav-panel{flex:0 0 auto;gap:var(--space-2);padding:0 0 0 var(--space-2);background:transparent}.header-call,.nav-toggle{display:inline-flex;align-items:center;justify-content:center;min-height:2.75rem;border-radius:var(--radius-pill);font-weight:900}.header-call{background:var(--color-deep-navy);color:var(--color-white);padding-inline:var(--space-4)}.nav-toggle{position:relative;min-width:2.75rem;border:var(--rule) solid var(--color-line);background:var(--color-warm-off-white)}.nav-toggle span{position:absolute;width:1.2rem;height:.14rem;border-radius:var(--radius-pill);background:var(--color-deep-navy);transition:transform var(--dur-fast) var(--ease-out)}.nav-toggle span:first-child{transform:translateY(-.25rem)}.nav-toggle span:last-child{transform:translateY(.25rem)}.nav-toggle[aria-expanded=true] span:first-child{transform:rotate(45deg)}.nav-toggle[aria-expanded=true] span:last-child{transform:rotate(-45deg)}.header-nav-panel .site-nav{position:fixed;inset:4.75rem var(--space-3) auto var(--space-3);z-index:51;display:grid;gap:var(--space-2);max-height:calc(100vh - 5.5rem);overflow:auto;border:var(--rule) solid var(--color-line);border-radius:var(--radius-card);background:var(--color-warm-off-white);box-shadow:var(--shadow-panel);padding:var(--space-3);transform:translateY(-140%);transition:transform var(--dur-base) var(--ease-out)}.header-nav-panel .site-nav.is-open{transform:translateY(0)}.header-nav-panel .site-nav a{justify-content:center;min-height:2.95rem;border:var(--rule) solid var(--color-line);border-radius:var(--radius-pill);background:var(--color-surface);padding-inline:var(--space-3);font-size:var(--text-sm)}.header-nav-panel .site-nav .nav-cta{margin-left:0;border-color:transparent;background:var(--color-accent);color:var(--color-white)}}@media (max-width:42rem){.header-main{min-height:4.55rem;padding:.5rem .65rem}.header-brand-panel{padding:.45rem .7rem}.header-brand-panel .brand-copy span{display:none}.header-brand-panel .brand-mark{width:2.45rem;height:2.45rem}.header-call{padding-inline:.95rem}.header-nav-panel{gap:.45rem;padding-left:.45rem}.nav-toggle{min-width:2.65rem}.header-nav-panel .site-nav{inset:4.55rem .65rem auto .65rem}.site-header .brand-copy strong{font-size:clamp(.95rem,4.2vw,1.05rem)}}`;

const headerLogoCss = `.header-main{grid-template-columns:clamp(20rem,34vw,32.5rem) minmax(0,1fr);min-height:6rem;background:var(--color-warm-off-white)}.header-brand-panel{position:relative;display:flex;align-items:stretch;min-width:0;padding:0;background:linear-gradient(135deg,var(--color-warm-off-white) 0%,var(--color-desert-sand) 100%);clip-path:none;color:var(--color-deep-navy);overflow:hidden}.header-brand-panel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:.625rem;background:linear-gradient(180deg,var(--color-quest-blue),var(--color-deep-navy));pointer-events:none}.header-brand-panel::after{content:"";position:absolute;right:-3.25rem;top:0;width:6.5rem;height:100%;background:linear-gradient(135deg,color-mix(in srgb,var(--color-quest-blue),transparent 82%),color-mix(in srgb,var(--color-accent),transparent 88%));transform:skewX(-24deg);pointer-events:none}.brand-lockup{position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-width:0;width:100%;min-height:6rem;padding:var(--space-4) clamp(var(--space-8),4vw,var(--space-16)) var(--space-4) clamp(var(--space-8),5vw,var(--space-20));text-decoration:none}.brand-lockup:focus-visible{outline:3px solid var(--color-focus);outline-offset:-6px}.brand-wordmark{display:block;width:clamp(14.75rem,22vw,22.5rem);height:auto;max-height:4.2rem;object-fit:contain;object-position:left center}.brand-location{display:block;margin-top:.1rem;color:var(--color-strong-navy);font-size:var(--text-xs);font-weight:900;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}.header-nav-panel{background:linear-gradient(90deg,color-mix(in srgb,var(--color-desert-sand),transparent 62%),var(--color-warm-off-white) 20%)}.footer-brand-lockup{position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;justify-content:center;max-width:min(100%,19rem);margin-bottom:var(--space-4);border:var(--rule) solid color-mix(in srgb,var(--color-white),transparent 52%);border-radius:var(--radius-card);background:linear-gradient(135deg,var(--color-warm-off-white),var(--color-desert-sand));padding:.8rem 1rem;box-shadow:0 18px 44px rgb(0 0 0 / .16);overflow:hidden}.footer-brand-lockup::before{content:"";position:absolute;left:0;top:0;bottom:0;width:.35rem;background:linear-gradient(180deg,var(--color-quest-blue),var(--color-accent))}.footer-brand-wordmark{position:relative;z-index:1;display:block;width:min(15rem,100%);height:auto;object-fit:contain}.footer-brand-location{position:relative;z-index:1;margin-top:.15rem;color:var(--color-strong-navy);font-size:var(--text-xs);font-weight:900;letter-spacing:.04em;text-transform:uppercase}@media (max-width:76rem){.header-main{display:flex;align-items:center;min-height:4.9rem;padding:.55rem var(--space-3);background:var(--color-warm-off-white)}.header-brand-panel{flex:1 1 auto;align-items:center;min-width:0;border-radius:0;background:transparent;box-shadow:none;overflow:visible}.header-brand-panel::before,.header-brand-panel::after{display:none}.brand-lockup{min-height:3.75rem;padding:.35rem 0;justify-content:center}.brand-wordmark{width:clamp(11rem,35vw,15.5rem);max-height:3.1rem}.brand-location{font-size:.68rem;color:var(--color-ink-soft)}.header-nav-panel{flex:0 0 auto;background:transparent}.header-nav-panel .site-nav{inset:4.9rem var(--space-3) auto var(--space-3)}}@media (max-width:42rem){.header-main{min-height:4.6rem;padding:.5rem .65rem}.brand-wordmark{width:clamp(9.6rem,44vw,12.25rem);max-height:2.75rem}.brand-location{display:none}.header-brand-panel{padding:0}.header-nav-panel .site-nav{inset:4.6rem .65rem auto .65rem}}`;

const headerLogoFitCss = `.header-main{grid-template-columns:clamp(20rem,28vw,26rem) minmax(0,1fr);min-height:7rem}.brand-lockup{min-height:7rem;padding:var(--space-3) clamp(var(--space-6),3.5vw,var(--space-12)) var(--space-3) clamp(var(--space-8),4.5vw,var(--space-16))}.brand-wordmark{width:auto;height:clamp(4.8rem,5.8vw,5.6rem);max-width:min(100%,20rem);max-height:none}.brand-location{margin-top:.2rem}@media (max-width:76rem){.header-main{min-height:5rem}.brand-lockup{min-height:3.9rem}.brand-wordmark{width:auto;height:clamp(3rem,8vw,3.65rem);max-width:min(100%,14rem)}}@media (max-width:42rem){.header-main{min-height:4.7rem}.brand-wordmark{height:2.85rem;max-width:10.75rem}}`;

const headerSlashCss = `.header-main{grid-template-columns:clamp(18.75rem,28vw,26.875rem) minmax(0,1fr);min-height:6.25rem;background:var(--color-warm-off-white)}.header-brand-panel{align-items:stretch;background:linear-gradient(135deg,var(--color-desert-sand) 0%,var(--color-warm-off-white) 100%);clip-path:polygon(0 0,100% 0,calc(100% - 2.75rem) 100%,0 100%);box-shadow:inset -1px 0 0 color-mix(in srgb,var(--color-line),transparent 42%);overflow:hidden}.header-brand-panel::before{display:block;width:.45rem;background:linear-gradient(180deg,var(--color-quest-blue),var(--color-accent));opacity:.95}.header-brand-panel::after{content:"";position:absolute;top:-.8rem;right:1.35rem;width:var(--rule);height:calc(100% + 1.6rem);background:color-mix(in srgb,var(--color-deep-navy),transparent 86%);transform:rotate(24deg);transform-origin:center;pointer-events:none}.brand-lockup{min-height:6.25rem;padding:.7rem clamp(var(--space-8),3.2vw,var(--space-12)) .65rem clamp(var(--space-8),4.5vw,var(--space-16))}.brand-wordmark{width:clamp(13.75rem,20vw,20rem);height:auto;max-height:4.65rem;object-fit:contain;object-position:left center}.brand-location{margin-top:.05rem;font-size:.72rem;line-height:1.1}.header-nav-panel{background:var(--color-warm-off-white);padding-left:clamp(var(--space-10),5vw,var(--space-18))}@media (max-width:76rem){.header-main{display:flex;min-height:5rem;padding:.55rem var(--space-3)}.header-brand-panel{clip-path:none;background:transparent;box-shadow:none;overflow:visible}.header-brand-panel::before,.header-brand-panel::after{display:none}.brand-lockup{min-height:3.9rem;padding:.35rem 0}.brand-wordmark{width:auto;height:clamp(3rem,8vw,3.65rem);max-width:min(100%,14rem)}.brand-location{margin-top:.08rem;font-size:.68rem;line-height:1.1}.header-nav-panel{padding-left:var(--space-2)}}@media (max-width:42rem){.header-main{min-height:4.7rem;padding:.5rem .65rem}.brand-wordmark{height:2.85rem;max-width:10.75rem}.brand-location{display:none}.header-nav-panel{padding-left:.45rem}}`;

const headerVisibleSlashCss = `.header-main{display:grid;grid-template-columns:clamp(18.75rem,28vw,26.875rem) 2.75rem minmax(0,1fr);align-items:stretch;min-height:6.25rem;background:var(--color-warm-off-white)}.header-brand-panel{align-items:stretch;clip-path:none;background:linear-gradient(135deg,var(--color-warm-off-white) 0%,var(--color-desert-sand) 100%);box-shadow:none;overflow:visible}.header-brand-panel::before{display:block;width:.45rem;background:linear-gradient(180deg,var(--color-quest-blue),var(--color-accent));opacity:1}.header-brand-panel::after{display:none}.brand-lockup{min-height:6.25rem;padding:.7rem clamp(var(--space-8),3.2vw,var(--space-12)) .65rem clamp(var(--space-8),4.5vw,var(--space-16))}.brand-wordmark{width:clamp(13.75rem,20vw,20rem);height:auto;max-height:4.65rem;object-fit:contain;object-position:left center}.header-slash{position:relative;display:block;align-self:stretch;min-width:0;background:var(--color-warm-off-white);overflow:visible}.header-slash::before{content:"";position:absolute;z-index:2;top:.55rem;bottom:.55rem;left:50%;width:.7rem;transform:translateX(-50%) skewX(-24deg);transform-origin:center;border-radius:var(--radius-pill);background:linear-gradient(180deg,var(--color-quest-blue) 0%,var(--color-deep-navy) 54%,var(--color-accent) 100%);box-shadow:0 0 0 var(--rule) color-mix(in srgb,var(--color-deep-navy),transparent 86%),0 10px 26px color-mix(in srgb,var(--color-deep-navy),transparent 82%)}.header-nav-panel{background:var(--color-warm-off-white);padding-left:clamp(var(--space-5),2.5vw,var(--space-10))}@media (max-width:76rem){.header-main{display:flex;align-items:center;min-height:5rem;padding:.55rem var(--space-3)}.header-slash{display:none}.header-brand-panel{background:transparent;box-shadow:none;overflow:visible}.header-brand-panel::before,.header-brand-panel::after{display:none}.brand-lockup{min-height:3.9rem;padding:.35rem 0}.brand-wordmark{width:auto;height:clamp(3rem,8vw,3.65rem);max-width:min(100%,14rem)}.header-nav-panel{padding-left:var(--space-2)}}@media (max-width:42rem){.header-main{min-height:4.7rem;padding:.5rem .65rem}.brand-wordmark{height:2.85rem;max-width:10.75rem}.brand-location{display:none}.header-nav-panel{padding-left:.45rem}}`;

const headerColorPanelCss = `.header-main{display:grid;grid-template-columns:clamp(20rem,30vw,31.25rem) minmax(0,1fr);align-items:stretch;min-height:6.25rem;overflow:hidden;background:var(--color-warm-off-white)}.header-brand-panel{position:relative;display:flex;align-items:stretch;min-width:0;padding:0;background:radial-gradient(circle at 18% 28%,color-mix(in srgb,var(--color-quest-blue),transparent 70%),transparent 34%),linear-gradient(135deg,#ddf3fa 0%,#c9eaf5 55%,#eaf8fc 100%);clip-path:polygon(0 0,100% 0,calc(100% - 4rem) 100%,0 100%);color:var(--color-deep-navy);box-shadow:none;overflow:hidden}.header-brand-panel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:.45rem;background:linear-gradient(180deg,var(--color-quest-blue),var(--color-accent));opacity:1;pointer-events:none}.header-brand-panel::after{content:"";position:absolute;top:.7rem;bottom:.7rem;right:3.45rem;width:.38rem;transform:skewX(-24deg);border-radius:var(--radius-pill);background:linear-gradient(180deg,var(--color-quest-blue) 0%,var(--color-deep-navy) 55%,var(--color-accent) 100%);box-shadow:0 8px 20px color-mix(in srgb,var(--color-deep-navy),transparent 84%);pointer-events:none}.brand-lockup{position:relative;z-index:1;width:100%;min-height:6.25rem;padding:.7rem clamp(var(--space-16),4vw,var(--space-24)) .65rem clamp(var(--space-8),4.5vw,var(--space-16));background:transparent}.brand-wordmark{width:clamp(14.375rem,20vw,21.25rem);height:auto;max-height:4.75rem;object-fit:contain;object-position:left center}.brand-location{margin-top:.05rem;color:var(--color-strong-navy);font-size:.72rem;line-height:1.1}.header-slash{display:none}.header-nav-panel{background:var(--color-warm-off-white);padding-left:clamp(var(--space-5),3vw,var(--space-12))}@media (max-width:76rem){.header-main{display:flex;align-items:center;min-height:5rem;padding:.55rem var(--space-3);overflow:visible;background:var(--color-warm-off-white)}.header-brand-panel{flex:1 1 auto;align-items:center;clip-path:none;border-radius:var(--radius-md);background:linear-gradient(135deg,#ddf3fa 0%,#eaf8fc 100%);box-shadow:none;overflow:hidden}.header-brand-panel::before{display:block;width:.3rem}.header-brand-panel::after{display:none}.brand-lockup{min-height:3.9rem;padding:.35rem .7rem}.brand-wordmark{width:auto;height:clamp(3rem,8vw,3.65rem);max-width:min(100%,14rem)}.brand-location{margin-top:.08rem;font-size:.68rem;line-height:1.1}.header-nav-panel{padding-left:var(--space-2)}}@media (max-width:42rem){.header-main{min-height:4.7rem;padding:.5rem .65rem}.header-brand-panel{border-radius:.8rem}.brand-lockup{padding:.3rem .55rem}.brand-wordmark{height:2.85rem;max-width:10.75rem}.brand-location{display:none}.header-nav-panel{padding-left:.45rem}}`;

const scriptJs = `(() => {
  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    const closeNav = () => { navToggle.setAttribute("aria-expanded", "false"); navToggle.setAttribute("aria-label", "Open navigation"); siteNav.classList.remove("is-open"); document.body.classList.remove("nav-open"); };
    const openNav = () => { navToggle.setAttribute("aria-expanded", "true"); navToggle.setAttribute("aria-label", "Close navigation"); siteNav.classList.add("is-open"); document.body.classList.add("nav-open"); };
    navToggle.addEventListener("click", () => navToggle.getAttribute("aria-expanded") === "true" ? closeNav() : openNav());
    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeNav(); });
    document.addEventListener("click", (event) => { const target = event.target; if (target instanceof Element && !siteNav.contains(target) && !navToggle.contains(target)) closeNav(); });
  }
  const mobileCta = document.querySelector(".mobile-cta-bar");
  if (mobileCta) {
    const updateMobileCta = () => {
      const active = document.activeElement;
      const formFocused = active instanceof Element && Boolean(active.closest("[data-estimate-form]"));
      mobileCta.classList.toggle("is-visible", window.scrollY > 360 && !formFocused);
    };
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
    document.addEventListener("focusin", updateMobileCta);
    document.addEventListener("focusout", () => window.setTimeout(updateMobileCta, 0));
    updateMobileCta();
  }
  document.querySelectorAll(".faq-list").forEach((list) => {
    list.querySelectorAll("details").forEach((item) => {
      item.addEventListener("toggle", () => { if (item.open) list.querySelectorAll("details").forEach((other) => { if (other !== item) other.open = false; }); });
    });
  });
  document.querySelectorAll("[data-estimate-form]").forEach((form) => {
    const steps = Array.from(form.querySelectorAll("[data-step]"));
    const tabs = Array.from(form.querySelectorAll("[data-step-target]"));
    const status = form.querySelector(".form-status");
    const stepStatus = form.querySelector("[data-step-status]");
    let activeStep = 1;
    const fieldsForStep = (stepNumber) => {
      const step = form.querySelector('[data-step="' + stepNumber + '"]');
      return step ? Array.from(step.querySelectorAll("input, select, textarea")) : [];
    };
    const setStep = (stepNumber) => {
      activeStep = Math.min(Math.max(stepNumber, 1), steps.length);
      steps.forEach((step) => { const isActive = Number(step.dataset.step) === activeStep; step.classList.toggle("is-active", isActive); step.hidden = !isActive; });
      tabs.forEach((tab) => { const isActive = Number(tab.dataset.stepTarget) === activeStep; tab.classList.toggle("is-active", isActive); tab.setAttribute("aria-current", isActive ? "step" : "false"); });
      if (stepStatus) {
        const labels = ["roof need", "contact", "property and details"];
        stepStatus.textContent = "Step " + activeStep + " of " + steps.length + ": " + labels[activeStep - 1] + ".";
      }
    };
    const validateStep = (stepNumber) => {
      const invalid = fieldsForStep(stepNumber).find((field) => !field.checkValidity());
      if (invalid) { invalid.reportValidity(); return false; }
      return true;
    };
    const validateAll = () => {
      for (let index = 1; index <= steps.length; index += 1) {
        if (!validateStep(index)) { setStep(index); return false; }
      }
      return true;
    };
    form.querySelectorAll("[data-next-step]").forEach((button) => button.addEventListener("click", () => { if (validateStep(activeStep)) setStep(activeStep + 1); }));
    form.querySelectorAll("[data-prev-step]").forEach((button) => button.addEventListener("click", () => setStep(activeStep - 1)));
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      const nextStep = Number(tab.dataset.stepTarget);
      if (nextStep <= activeStep) {
        setStep(nextStep);
        return;
      }
      if (nextStep === activeStep + 1 && validateStep(activeStep)) {
        setStep(nextStep);
      }
    }));
    form.addEventListener("submit", (event) => {
      if (!validateAll()) { event.preventDefault(); if (status) status.textContent = "Complete the required fields before submitting your estimate request."; return; }
      const isLocal = window.location.protocol === "file:" || ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
      if (!isLocal) { if (status) status.textContent = "Submitting your estimate request."; return; }
      event.preventDefault();
      const formData = new FormData(form);
      const lines = ["Quest Roofing estimate request", "", "Service needed: " + (formData.get("service_needed") || ""), "Urgency: " + (formData.get("urgency") || ""), "Name: " + (formData.get("full_name") || ""), "Phone: " + (formData.get("phone") || ""), "Email: " + (formData.get("email") || ""), "Property location: " + (formData.get("property_location") || ""), "", "Project details:", String(formData.get("project_details") || "")];
      const mailto = "mailto:info@questroofing.com?subject=" + encodeURIComponent("Estimate request from website") + "&body=" + encodeURIComponent(lines.join("\\n"));
      if (status) status.textContent = "Your request is ready. Email info@questroofing.com or call 602-399-6455.";
      window.location.href = mailto;
    });
    setStep(1);
  });
})();
`;

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

write("tokens.css", tokensCss);
write("styles.css", stylesCss + stickyCtaCss + heroSplitCss + mobileHeroCss + imageCardCss + homepageCurrentCss + headerSplitCss + headerLogoCss + headerLogoFitCss + headerSlashCss + headerVisibleSlashCss + headerColorPanelCss);
write("script.js", scriptJs);
write("index.html", homepage());
services.forEach((service) => write(join("services", service.slug, "index.html"), servicePage(service)));
cities.forEach((city) => write(join(`roofing-${city.slug}-az`, "index.html"), cityPage(city)));
supportPages.forEach((page) => write(join(page.path, "index.html"), supportPage(page)));
write(join("about-us", "completed-projects", "index.html"), galleryPage("about-us/completed-projects/"));
write(join("about-us", "reviews", "index.html"), reviewsPage());
write(join("gallery", "index.html"), galleryPage("gallery/"));
write(join("contact", "index.html"), contactPage());
write("404.html", notFoundPage());

const sitemapUrls = [
  ["", "1.0"],
  ...services.map((service) => [`services/${service.slug}/`, "0.9"]),
  ...cities.map((city) => [`roofing-${city.slug}-az/`, "0.85"]),
  ...supportPages.map((page) => [page.path, "0.75"]),
  ["about-us/completed-projects/", "0.75"],
  ["about-us/reviews/", "0.75"],
  ["gallery/", "0.75"],
  ["contact/", "0.75"]
];

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(([path, priority]) => `  <url>
    <loc>${siteUrl}/${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`);

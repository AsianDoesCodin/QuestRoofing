from __future__ import annotations

import html
import json
import re
import shutil
import zipfile
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from xml.etree import ElementTree as ET


SITE_URL = "https://www.questroofing.com"
SITE_ROOT = Path(__file__).resolve().parents[1]
BLOG_SOURCE_DIR = SITE_ROOT / "BLOGS"
BLOG_OUTPUT_DIR = SITE_ROOT / "blog"
STYLE_VERSION = "2026-06-08-lighthouse-05"
SCRIPT_VERSION = "2026-06-08-lighthouse-05"
LOGO_VERSION = "2026-06-08-lighthouse-05"
SOCIAL_IMAGE = f"{SITE_URL}/assets/roofing-tile-process/quest-roofing-social-card.jpg"
PHONE = "602-399-6455"
PHONE_HREF = "tel:6023996455"
EMAIL = "info@questroofing.com"
ROC_URL = "https://azroc.my.site.com/AZRoc/s/contractor-search?licenseId=a0ocs000004dh2nAAA"
GAF_URL = "https://www.gaf.ca/en-ca/roofing-contractors/residential/usa/az/queen-creek/quest-roofing-llc-1149593"
GENERATED_ON = "2026-06-08"

WORD_NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

IMAGE_LIBRARY = {
    "default": ("assets/roofing-tile-process/quest-roofing-home-exterior.jpg", "Quest Roofing project home exterior in Arizona", 1600, 1000, "center center"),
    "tile": ("assets/roofing-tile-process/finished-tile-roof-slope.jpg", "Finished tile roof slope in Arizona sun", 1200, 900, "center center"),
    "inspection": ("assets/roofing-tile-process/roof-pipe-flashing-detail.jpg", "Pipe flashing detail on a tile roof", 1200, 900, "center center"),
    "storm": ("assets/roofing-tile-process/tile-roof-flashing-repair.jpg", "Tile roof flashing repair in progress", 1400, 1050, "center center"),
    "maintenance": ("assets/roofing-tile-process/tile-stacks-and-battens.jpg", "Tile stacks and battens staged during roof work", 1200, 900, "center center"),
    "calendar": ("assets/roofing-tile-process/tile-roof-underlayment-rows.jpg", "Tile roof underlayment rows prepared for installation", 1400, 1050, "center center"),
    "seasonal": ("assets/roofing-tile-process/crew-installing-tile-roof.jpg", "Crew installing tile roofing under Arizona sun", 1400, 1050, "center center"),
    "leak": ("assets/roofing-tile-process/roof-pipe-flashing-detail.jpg", "Pipe flashing detail on a tile roof", 1200, 900, "center center"),
    "replacement": ("assets/roofing-tile-process/roof-deck-repair-open-area.jpg", "Open roof deck repair area before tile replacement", 1200, 900, "center center"),
    "systems": ("assets/roofing-tile-process/crew-installing-tile-roof.jpg", "Crew installing tile roofing under Arizona sun", 1400, 1050, "center center"),
    "coating": ("assets/roofing-tile-process/underlayment-roll-detail.jpg", "Underlayment roll detail on a roof deck", 1200, 900, "center center"),
}

BLOG_INDEX_IMAGE_VARIANTS = {
    "maintenance": "assets/roofing-tile-process/tile-stacks-and-battens-blog-700.webp",
    "calendar": "assets/roofing-tile-process/tile-roof-underlayment-rows-blog-500.webp",
    "storm": "assets/roofing-tile-process/tile-roof-flashing-repair-blog-500.webp",
}

BLOG_INDEX_IMAGE_DIMENSIONS = {
    "maintenance": (700, 525),
    "calendar": (500, 375),
    "storm": (500, 375),
}


@dataclass
class BlogPost:
    source: Path
    published: str
    title: str
    meta_title: str
    meta_description: str
    slug: str
    category: str
    image_key: str
    paragraphs: list[str]
    excerpt: str
    reading_minutes: int

    @property
    def url_path(self) -> str:
        return f"blog/{self.slug}/"

    @property
    def canonical(self) -> str:
        return f"{SITE_URL}/{self.url_path}"

    @property
    def date_label(self) -> str:
        parsed = date.fromisoformat(self.published)
        return f"{parsed.strftime('%B')} {parsed.day}, {parsed.year}"


def normalize_text(value: str) -> str:
    replacements = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u00a0": " ",
        "\u2026": "...",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    return re.sub(r"\s+", " ", value).strip()


def paragraph_text(paragraph: ET.Element) -> str:
    pieces: list[str] = []
    for node in paragraph.iter():
        tag = node.tag.rsplit("}", 1)[-1]
        if tag == "t" and node.text:
            pieces.append(node.text)
        elif tag == "tab":
            pieces.append(" ")
        elif tag == "br":
            pieces.append("\n")
    return normalize_text("".join(pieces))


def docx_paragraphs(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as archive:
        document_xml = archive.read("word/document.xml")
    root = ET.fromstring(document_xml)
    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:body/w:p", WORD_NS):
        text = paragraph_text(paragraph)
        if text:
            paragraphs.append(text)
    return paragraphs


def slugify(value: str) -> str:
    value = normalize_text(value).lower()
    value = re.sub(r"\b([a-z0-9]+)'s\b", r"\1", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def clean_file_title(filename: str) -> tuple[str, str]:
    match = re.search(r"(20\d{2}-\d{2}-\d{2})\s+-\s+Quest Roofing\s+-\s+(.+)\.docx$", filename)
    if not match:
        return GENERATED_ON, Path(filename).stem
    title = normalize_text(match.group(2).replace("_", ":"))
    title = re.sub(r"[\s,;:.-]+$", "", title)
    return match.group(1), title


def choose_category(title: str) -> tuple[str, str]:
    haystack = title.lower()
    if "calendar" in haystack:
        return "Roof Maintenance", "calendar"
    if "seasonal" in haystack:
        return "Roof Maintenance", "seasonal"
    if "myth" in haystack:
        return "Storm & Leak Prep", "storm"
    if "find and contain" in haystack or "roof leak" in haystack:
        return "Storm & Leak Prep", "leak"
    if any(word in haystack for word in ["coating", "energy", "shingle", "foam", "metal"]):
        return "Roof Systems", "systems"
    if any(word in haystack for word in ["maintenance", "calendar", "summer sun", "seasonal roof care"]):
        return "Roof Maintenance", "maintenance"
    if any(word in haystack for word in ["replacement", "financing"]):
        return "Replacement Planning", "replacement"
    if any(word in haystack for word in ["monsoon", "storm", "hail", "wind", "leak"]):
        return "Storm & Leak Prep", "storm"
    if "tile" in haystack:
        return "Tile Roofing", "tile"
    if "inspection" in haystack:
        return "Roof Inspections", "inspection"
    return "Roofing Tips", "default"


def parse_post(path: Path) -> BlogPost:
    published, file_title = clean_file_title(path.name)
    raw_paragraphs = docx_paragraphs(path)
    if len(raw_paragraphs) < 3:
        raise ValueError(f"{path.name} does not contain enough usable blog content.")

    meta_title = file_title
    meta_description = ""
    body: list[str] = []
    for paragraph in raw_paragraphs:
        if paragraph.lower().startswith("meta title:"):
            meta_title = normalize_text(paragraph.split(":", 1)[1])
        elif paragraph.lower().startswith("meta description:"):
            meta_description = normalize_text(paragraph.split(":", 1)[1])
        else:
            body.append(paragraph)

    title = file_title
    if not meta_description:
        meta_description = next((p for p in body if len(p) > 90), file_title)

    if body and slugify(body[0]) == slugify(title):
        body = body[1:]

    excerpt = meta_description
    word_count = sum(len(re.findall(r"\b\w+\b", paragraph)) for paragraph in body)
    reading_minutes = max(3, round(word_count / 190))
    category, image_key = choose_category(f"{title} {meta_title}")

    return BlogPost(
        source=path,
        published=published,
        title=title,
        meta_title=meta_title,
        meta_description=meta_description.rstrip(".") + ".",
        slug=slugify(title),
        category=category,
        image_key=image_key,
        paragraphs=body,
        excerpt=excerpt.rstrip(".") + ".",
        reading_minutes=reading_minutes,
    )


def attr(value: str) -> str:
    return html.escape(value, quote=True)


def text(value: str) -> str:
    return html.escape(value)


def asset(prefix: str, path: str) -> str:
    return f"{prefix}/{path}" if prefix else path


def roc_link(class_name: str = "credential-link") -> str:
    return f'<a class="{class_name}" href="{ROC_URL}" target="_blank" rel="noopener">AZ ROC #355136</a>'


def gaf_link(class_name: str = "credential-link") -> str:
    return f'<a class="{class_name}" href="{GAF_URL}" target="_blank" rel="noopener">GAF Certified</a>'


def business_schema() -> dict:
    return {
        "@type": "RoofingContractor",
        "@id": f"{SITE_URL}/#business",
        "name": "Quest Roofing",
        "url": f"{SITE_URL}/",
        "logo": f"{SITE_URL}/assets/images/quest-roofing-wordmark.png",
        "image": SOCIAL_IMAGE,
        "telephone": "+1-602-399-6455",
        "email": EMAIL,
        "address": {"@type": "PostalAddress", "addressLocality": "Queen Creek", "addressRegion": "AZ", "addressCountry": "US"},
        "identifier": "AZ ROC #355136",
        "areaServed": [{"@type": "City", "name": city} for city in ["Queen Creek", "Gilbert", "Chandler", "Mesa", "Tempe", "Scottsdale", "Paradise Valley", "Phoenix"]],
        "knowsAbout": ["Roof Repair", "Tile Roofing", "Shingle Roofing", "Metal Roofing", "Foam Roofing", "Roof Inspection", "Storm Damage", "Roof Maintenance"],
    }


def page_head(prefix: str, title_value: str, description: str, canonical_path: str, schema: dict) -> str:
    canonical = f"{SITE_URL}/{canonical_path}"
    return f"""<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{text(title_value)}</title>
  <meta name="description" content="{attr(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0B1D33">
  <meta name="geo.region" content="US-AZ">
  <meta name="geo.placename" content="Queen Creek">
  <link rel="canonical" href="{canonical}">
  <link rel="icon" href="{asset(prefix, "favicon.ico")}" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="{asset(prefix, "favicon-32x32.png")}">
  <link rel="apple-touch-icon" href="{asset(prefix, "apple-touch-icon.png")}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Quest Roofing">
  <meta property="og:title" content="{attr(title_value)}">
  <meta property="og:description" content="{attr(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SOCIAL_IMAGE}">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{attr(title_value)}">
  <meta name="twitter:description" content="{attr(description)}">
  <meta name="twitter:image" content="{SOCIAL_IMAGE}">
  <link rel="stylesheet" href="{asset(prefix, "tokens.css")}?v={LOGO_VERSION}">
  <link rel="stylesheet" href="{asset(prefix, "styles.css")}?v={STYLE_VERSION}">
  <script type="application/ld+json">{json.dumps(schema, separators=(",", ":"))}</script>
</head>"""


def header(prefix: str) -> str:
    return f"""<header class="site-header" id="top">
    <div class="top-bar"><div class="container top-bar-inner"><p>{roc_link()} / {gaf_link()} / Free written estimates / Licensed, Bonded, Insured</p><div class="top-bar-actions"><a href="{PHONE_HREF}">{PHONE}</a><a href="mailto:{EMAIL}">{EMAIL}</a></div></div></div>
    <div class="header-main">
      <div class="header-brand-panel">
        <a class="brand-lockup" href="{asset(prefix, "index.html")}"><img class="brand-wordmark" src="{asset(prefix, "assets/images/quest-roofing-wordmark.png")}?v={LOGO_VERSION}" alt="Quest Roofing" width="1184" height="624"><span class="brand-location">Queen Creek, Arizona</span></a><div class="header-proof-cards" aria-label="Quest Roofing credentials and contact"><a class="header-proof-card" href="{ROC_URL}" target="_blank" rel="noopener"><span>License</span><strong>AZ ROC #355136</strong></a><a class="header-proof-card" href="{GAF_URL}" target="_blank" rel="noopener"><span>Credential</span><strong>GAF Certified</strong></a><a class="header-proof-card" href="{asset(prefix, "request-estimate/index.html")}"><span>Estimate</span><strong>Free written estimates</strong><em>Licensed, bonded, insured</em></a><a class="header-proof-card header-proof-card-phone" href="{PHONE_HREF}"><span>Call us</span><strong>{PHONE}</strong></a></div>
      </div>
      <div class="header-nav-panel">
        <a class="header-call" href="{PHONE_HREF}">Call</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
        <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
          <div class="nav-dropdown"><a class="nav-parent" href="{asset(prefix, "services/roof-repair/index.html")}" aria-haspopup="true">Services</a><div class="nav-menu" aria-label="Services submenu"><a href="{asset(prefix, "services/tile-roofing/index.html")}">Tile Roofing</a><a href="{asset(prefix, "services/shingle-roofing/index.html")}">Shingle Roofing</a><a href="{asset(prefix, "services/metal-roofing/index.html")}">Metal Roofing</a><a href="{asset(prefix, "services/foam-roofing/index.html")}">Foam Roofing</a><a href="{asset(prefix, "services/roof-repair/index.html")}">Roof Repair</a><a href="{asset(prefix, "services/roof-inspection/index.html")}">Free Inspection</a><a href="{asset(prefix, "services/storm-damage-roof-repair/index.html")}">Storm & Emergency</a><a href="{asset(prefix, "services/roof-insurance-claims/index.html")}">Insurance Claims</a><a href="{asset(prefix, "services/roof-maintenance/index.html")}">Maintenance</a></div></div>
          <a href="{asset(prefix, "process/index.html")}">Process</a>
          <a href="{asset(prefix, "gallery/index.html")}">Gallery</a>
          <div class="nav-dropdown"><a class="nav-parent" href="{asset(prefix, "service-area/index.html")}" aria-haspopup="true">Service Area</a><div class="nav-menu" aria-label="Service Area submenu"><a href="{asset(prefix, "roofing-queen-creek-az/index.html")}">Queen Creek</a><a href="{asset(prefix, "roofing-gilbert-az/index.html")}">Gilbert</a><a href="{asset(prefix, "roofing-chandler-az/index.html")}">Chandler</a><a href="{asset(prefix, "roofing-mesa-az/index.html")}">Mesa</a><a href="{asset(prefix, "roofing-tempe-az/index.html")}">Tempe</a><a href="{asset(prefix, "roofing-scottsdale-az/index.html")}">Scottsdale</a><a href="{asset(prefix, "roofing-paradise-valley-az/index.html")}">Paradise Valley</a><a href="{asset(prefix, "roofing-phoenix-az/index.html")}">Phoenix</a></div></div>
          <a href="{asset(prefix, "reviews/index.html")}">Reviews</a>
          <a href="{asset(prefix, "faq/index.html")}">FAQ</a>
          <a href="{asset(prefix, "blog/index.html")}">Blog</a>
          <a href="{asset(prefix, "contact/index.html")}">Contact</a>
          <a class="nav-cta" href="{asset(prefix, "request-estimate/index.html")}">Request Estimate</a>
        </nav>
      </div>
    </div>
  </header>"""


def footer(prefix: str) -> str:
    return f"""<footer class="site-footer">
    <div class="container footer-layout">
      <div><a class="footer-brand-lockup" href="{asset(prefix, "index.html")}"><img class="footer-brand-wordmark" src="{asset(prefix, "assets/images/quest-roofing-wordmark.png")}?v={LOGO_VERSION}" alt="Quest Roofing" width="1184" height="624"><span class="footer-brand-location">Queen Creek, Arizona</span></a><p>Queen Creek, Arizona roofing contractor serving the Greater Phoenix area with photo-backed inspections and written estimates.</p><ul class="footer-contact"><li><span>Phone</span><a href="{PHONE_HREF}">{PHONE}</a></li><li><span>Email</span><a href="mailto:{EMAIL}">{EMAIL}</a></li><li><span>License</span>{roc_link()}</li><li><span>Credential</span>{gaf_link()}</li><li><span>Trust</span><strong>Licensed, Bonded, Insured</strong></li></ul></div>
      <nav class="footer-link-grid" aria-label="Footer navigation"><div><strong>Services</strong>
<a href="{asset(prefix, "services/roof-repair/index.html")}">Roof Repair</a>
<a href="{asset(prefix, "services/tile-roofing/index.html")}">Tile Roofing</a>
<a href="{asset(prefix, "services/shingle-roofing/index.html")}">Shingle Roofing</a>
<a href="{asset(prefix, "services/metal-roofing/index.html")}">Metal Roofing</a>
<a href="{asset(prefix, "services/foam-roofing/index.html")}">Foam Roofing</a>
<a href="{asset(prefix, "services/roof-inspection/index.html")}">Free Inspection</a>
<a href="{asset(prefix, "services/storm-damage-roof-repair/index.html")}">Storm & Emergency</a>
<a href="{asset(prefix, "services/roof-insurance-claims/index.html")}">Insurance Claims</a>
<a href="{asset(prefix, "services/roof-maintenance/index.html")}">Maintenance</a></div><div><strong>Cities</strong>
<a href="{asset(prefix, "roofing-queen-creek-az/index.html")}">Queen Creek</a>
<a href="{asset(prefix, "roofing-gilbert-az/index.html")}">Gilbert</a>
<a href="{asset(prefix, "roofing-chandler-az/index.html")}">Chandler</a>
<a href="{asset(prefix, "roofing-mesa-az/index.html")}">Mesa</a>
<a href="{asset(prefix, "roofing-tempe-az/index.html")}">Tempe</a>
<a href="{asset(prefix, "roofing-scottsdale-az/index.html")}">Scottsdale</a>
<a href="{asset(prefix, "roofing-paradise-valley-az/index.html")}">Paradise Valley</a>
<a href="{asset(prefix, "roofing-phoenix-az/index.html")}">Phoenix</a></div><div><strong>Company</strong>
<a href="{asset(prefix, "gallery/index.html")}">Gallery</a>
<a href="{asset(prefix, "reviews/index.html")}">Reviews</a>
<a href="{asset(prefix, "resources/design-your-roof/index.html")}">Roof Planning</a>
<a href="{asset(prefix, "resources/roofing-glossary/index.html")}">Roofing Glossary</a>
<a href="{asset(prefix, "blog/index.html")}">Blog</a>
<a href="{asset(prefix, "contact/index.html")}">Contact</a></div></nav>
    </div>
    <div class="container footer-bottom"><span>Copyright <span id="footer-year">2026</span> Quest Roofing</span><a href="#top">Back to top</a></div>
  </footer><div class="mobile-cta-bar" aria-label="Quick contact"><a href="{PHONE_HREF}">Call</a><a href="{asset(prefix, "request-estimate/index.html")}">Free Inspection</a></div>"""


def image_figure(post: BlogPost, prefix: str, eager: bool = False, blog_index_variant: bool = False) -> str:
    image_path, alt, width, height, position = IMAGE_LIBRARY[post.image_key]
    source_path = BLOG_INDEX_IMAGE_VARIANTS.get(post.image_key) if blog_index_variant else None
    if blog_index_variant and post.image_key in BLOG_INDEX_IMAGE_DIMENSIONS:
        width, height = BLOG_INDEX_IMAGE_DIMENSIONS[post.image_key]
    loading = "eager" if eager else "lazy"
    source_markup = f'<source srcset="{asset(prefix, source_path)}" type="image/webp">' if source_path else ""
    return f"""<figure class="image-card image-card--overlay subpage-photo blog-hero-photo"><div class="media-frame"><picture>{source_markup}<img src="{asset(prefix, image_path)}" alt="{attr(alt)}" width="{width}" height="{height}" style="--image-position:{position}" loading="{loading}" decoding="async"></picture></div><figcaption class="caption">{text(post.category)} guidance from Quest Roofing.</figcaption></figure>"""


def card_image(post: BlogPost, prefix: str, eager: bool = False, blog_index_variant: bool = False) -> str:
    image_path, alt, width, height, position = IMAGE_LIBRARY[post.image_key]
    source_path = BLOG_INDEX_IMAGE_VARIANTS.get(post.image_key) if blog_index_variant else None
    if blog_index_variant and post.image_key in BLOG_INDEX_IMAGE_DIMENSIONS:
        width, height = BLOG_INDEX_IMAGE_DIMENSIONS[post.image_key]
    loading = "eager" if eager else "lazy"
    source_markup = f'<source srcset="{asset(prefix, source_path)}" type="image/webp">' if source_path else ""
    return f"""<a class="blog-card-media" href="{asset(prefix, post.url_path + "index.html")}" aria-label="Read {attr(post.title)}"><picture>{source_markup}<img src="{asset(prefix, image_path)}" alt="{attr(alt)}" width="{width}" height="{height}" style="--image-position:{position}" loading="{loading}" decoding="async"></picture></a>"""


def is_bullet(paragraph: str) -> bool:
    return paragraph.startswith("- ") or paragraph.startswith("• ")


def is_heading(paragraph: str) -> bool:
    if is_bullet(paragraph):
        return False
    if paragraph.endswith((".", "?", "!", ",", ":")):
        return False
    if len(paragraph) > 115:
        return False
    lower = paragraph.lower()
    sentence_starters = ("here are", "some common", "focus on", "this includes")
    return not lower.startswith(sentence_starters)


def render_article_body(post: BlogPost) -> str:
    blocks: list[str] = []
    pending_bullets: list[str] = []
    emitted_intro = False

    def flush_bullets() -> None:
        if pending_bullets:
            blocks.append("<ul>" + "".join(f"<li>{text(item)}</li>" for item in pending_bullets) + "</ul>")
            pending_bullets.clear()

    for paragraph in post.paragraphs:
        if slugify(paragraph) == slugify(post.title):
            continue
        if is_bullet(paragraph):
            pending_bullets.append(paragraph[2:].strip())
            continue
        flush_bullets()
        if is_heading(paragraph):
            blocks.append(f"<h2>{text(paragraph)}</h2>")
        elif not emitted_intro:
            blocks.append(f'<p class="article-lede">{text(paragraph)}</p>')
            emitted_intro = True
        else:
            blocks.append(f"<p>{text(paragraph)}</p>")
    flush_bullets()
    return "\n        ".join(blocks)


def blog_card(post: BlogPost, prefix: str) -> str:
    return f"""<article class="blog-card">
            {card_image(post, prefix)}
            <div class="blog-card-meta"><span>{text(post.category)}</span><time datetime="{post.published}">{post.date_label}</time></div>
            <h2><a href="{asset(prefix, post.url_path + "index.html")}">{text(post.title)}</a></h2>
            <p>{text(post.excerpt)}</p>
            <a class="blog-card-link" href="{asset(prefix, post.url_path + "index.html")}">Read article <span aria-hidden="true">-&gt;</span></a>
          </article>"""


def carousel_card(post: BlogPost, prefix: str, index: int, blog_index_variant: bool = False) -> str:
    return f"""<article class="blog-card blog-carousel-card" data-carousel-slide="{index}">
              {card_image(post, prefix, blog_index_variant=blog_index_variant)}
              <div class="blog-card-meta"><span>{text(post.category)}</span><time datetime="{post.published}">{post.date_label}</time></div>
              <h3><a href="{asset(prefix, post.url_path + "index.html")}">{text(post.title)}</a></h3>
              <p>{text(post.excerpt)}</p>
              <a class="blog-card-link" href="{asset(prefix, post.url_path + "index.html")}">Read article <span aria-hidden="true">-&gt;</span></a>
            </article>"""


def compact_article_link(post: BlogPost, prefix: str) -> str:
    return f"""<li><a href="{asset(prefix, post.url_path + "index.html")}"><span>{text(post.title)}</span><time datetime="{post.published}">{post.date_label}</time></a></li>"""


def related_posts(posts: list[BlogPost], current: BlogPost) -> list[BlogPost]:
    same_category = [post for post in posts if post.category == current.category and post.slug != current.slug]
    fallback = [post for post in posts if post.slug != current.slug]
    return (same_category + fallback)[:3]


def blog_index(posts: list[BlogPost]) -> str:
    prefix = ".."
    latest = posts[0]
    carousel_posts = posts[1:5]
    more_posts = posts[5:]
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            business_schema(),
            {
                "@type": "CollectionPage",
                "@id": f"{SITE_URL}/blog/#webpage",
                "url": f"{SITE_URL}/blog/",
                "name": "Roofing Blog | Quest Roofing",
                "description": "Roofing guides for Queen Creek homeowners covering monsoon prep, roof maintenance, tile repair, inspections, leaks, coatings, and replacement planning.",
                "about": {"@id": f"{SITE_URL}/#business"},
                "inLanguage": "en-US",
            },
            {
                "@type": "ItemList",
                "itemListElement": [
                    {"@type": "ListItem", "position": index + 1, "url": post.canonical, "name": post.title}
                    for index, post in enumerate(posts)
                ],
            },
        ],
    }
    carousel_cards = "\n            ".join(carousel_card(post, prefix, index, blog_index_variant=True) for index, post in enumerate(carousel_posts))
    more_links = "\n              ".join(compact_article_link(post, prefix) for post in more_posts)
    return f"""<!DOCTYPE html>
<html lang="en">
{page_head(prefix, "Roofing Blog | Quest Roofing", "Roofing guides for Queen Creek homeowners covering monsoon prep, roof maintenance, tile repair, inspections, leaks, coatings, and replacement planning.", "blog/", schema)}
<body class="subpage blog-index-page">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell">{header(prefix)}<main id="main" class="subpage-main">
    <section class="blog-intro-banner" aria-labelledby="blog-page-title"><div class="container blog-intro-banner-inner"><div><p class="eyebrow">Roofing Blog</p><h1 id="blog-page-title">Roofing guidance for Queen Creek homes.</h1><p>Practical roof maintenance, monsoon prep, repair, inspection, and replacement planning articles from Quest Roofing.</p></div><div class="hero-actions"><a class="button button-primary" href="{asset(prefix, latest.url_path + "index.html")}">Read Latest Article</a><a class="button button-secondary button-on-dark" href="{asset(prefix, "request-estimate/index.html")}">Free Inspection</a></div></div></section>
    <section class="section-band section-sand blog-feature-band"><div class="container blog-feature blog-feature--with-media"><div><p class="eyebrow">Latest Article</p><h2><a href="{asset(prefix, latest.url_path + "index.html")}">{text(latest.title)}</a></h2><p>{text(latest.excerpt)}</p><div class="blog-card-meta"><span>{text(latest.category)}</span><time datetime="{latest.published}">{latest.date_label}</time><span>{latest.reading_minutes} min read</span></div><a class="button button-primary" href="{asset(prefix, latest.url_path + "index.html")}">Read Latest Article</a></div>{image_figure(latest, prefix, True, blog_index_variant=True)}</div></section>
    <section class="section-band blog-carousel-band" aria-labelledby="past-articles-title"><div class="container blog-carousel" data-blog-carousel><div class="blog-carousel-header"><div><p class="eyebrow">Past Articles</p><h2 id="past-articles-title">Recent Queen Creek roofing reads.</h2></div><div class="blog-carousel-controls" aria-label="Past article carousel controls"><button class="blog-carousel-button" type="button" data-carousel-prev aria-label="Previous articles"><span aria-hidden="true">&lt;</span></button><button class="blog-carousel-button" type="button" data-carousel-next aria-label="Next articles"><span aria-hidden="true">&gt;</span></button></div></div><div class="blog-carousel-track" data-carousel-track>
            {carousel_cards}
          </div></div></section>
    <section class="section-band section-sand blog-more-band"><div class="container"><div class="blog-more-header"><p class="eyebrow">More Articles</p><h2>All roofing topics.</h2><p>Additional roof care topics remain linked here for readers and search engines.</p></div><ul class="blog-more-list">
              {more_links}
            </ul></div></section>
    <section class="final-cta"><div class="container final-cta-inner"><p class="eyebrow">Need a roof answer now?</p><h2>Start with photos, a written scope, and a clear next step.</h2><p>Quest Roofing helps Queen Creek and Greater Phoenix homeowners understand roof problems before approving work.</p><div class="hero-actions"><a class="button button-primary" href="{asset(prefix, "request-estimate/index.html")}">Request Estimate</a><a class="button button-secondary button-on-dark" href="{PHONE_HREF}">Call {PHONE}</a></div></div></section>
  </main>{footer(prefix)}</div>
  <script src="{asset(prefix, "script.js")}?v={SCRIPT_VERSION}" defer></script>
</body>
</html>
"""


def blog_post_page(post: BlogPost, posts: list[BlogPost]) -> str:
    prefix = "../.."
    related = related_posts(posts, post)
    related_cards = "\n            ".join(blog_card(item, prefix) for item in related)
    article_schema = {
        "@context": "https://schema.org",
        "@graph": [
            business_schema(),
            {
                "@type": "BlogPosting",
                "@id": f"{post.canonical}#blogposting",
                "mainEntityOfPage": {"@id": f"{post.canonical}#webpage"},
                "headline": post.title,
                "description": post.meta_description,
                "image": SOCIAL_IMAGE,
                "datePublished": post.published,
                "dateModified": post.published,
                "author": {"@type": "Organization", "name": "Quest Roofing", "@id": f"{SITE_URL}/#business"},
                "publisher": {"@id": f"{SITE_URL}/#business"},
                "inLanguage": "en-US",
            },
            {
                "@type": "WebPage",
                "@id": f"{post.canonical}#webpage",
                "url": post.canonical,
                "name": post.meta_title,
                "description": post.meta_description,
                "about": {"@id": f"{SITE_URL}/#business"},
                "inLanguage": "en-US",
            },
        ],
    }
    body = render_article_body(post)
    return f"""<!DOCTYPE html>
<html lang="en">
{page_head(prefix, f"{post.meta_title} | Quest Roofing", post.meta_description, post.url_path, article_schema)}
<body class="subpage blog-post-page">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell">{header(prefix)}<main id="main" class="subpage-main">
    <article>
      <section class="subpage-hero blog-hero"><div class="container subpage-hero-grid"><div><p class="eyebrow">{text(post.category)}</p><h1>{text(post.title)}</h1><p>{text(post.excerpt)}</p><div class="article-meta"><time datetime="{post.published}">{post.date_label}</time><span>{post.reading_minutes} min read</span><a href="{asset(prefix, "blog/index.html")}">All articles</a></div></div>{image_figure(post, prefix, True)}</div></section>
      <section class="section-band blog-article-band"><div class="container blog-article-layout"><div class="article-content">
        {body}
      </div><aside class="article-sidebar" aria-label="Roofing help"><div class="article-sidebar-panel"><p class="eyebrow">Need help?</p><h2>Get a documented roof inspection.</h2><p>Send roof photos or request a visit so Quest can explain the issue and the next step in writing.</p><a class="button button-primary" href="{asset(prefix, "request-estimate/index.html")}">Request Free Inspection</a><a class="button button-secondary" href="{PHONE_HREF}">Call {PHONE}</a></div></aside></div></section>
    </article>
    <section class="section-band section-sand"><div class="container"><div class="section-heading"><p class="eyebrow">Related Reading</p><h2>More Queen Creek roof guidance.</h2></div><div class="blog-list-grid blog-list-grid--compact">
            {related_cards}
          </div></div></section>
    <section class="final-cta"><div class="container final-cta-inner"><p class="eyebrow">Ready for a documented roof answer?</p><h2>Start with photos, a written scope, and a clear next step.</h2><p>Quest Roofing helps Queen Creek and Greater Phoenix homeowners understand roof problems before approving work.</p><div class="hero-actions"><a class="button button-primary" href="{asset(prefix, "request-estimate/index.html")}">Request Estimate</a><a class="button button-secondary button-on-dark" href="{PHONE_HREF}">Call {PHONE}</a></div></div></section>
  </main>{footer(prefix)}</div>
  <script src="{asset(prefix, "script.js")}?v={SCRIPT_VERSION}" defer></script>
</body>
</html>
"""


BLOG_CSS = """

/* Blog index and article pages */
.blog-intro-banner {
  background: linear-gradient(112deg, var(--color-deep-navy), var(--color-strong-navy));
  color: var(--color-on-dark);
  padding: clamp(.85rem, 1.6vw, 1.2rem) 0;
}

.blog-intro-banner-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(1rem, 2.4vw, 2rem);
  align-items: center;
}

.blog-intro-banner h1 {
  max-width: 34ch;
  margin: 0;
  color: inherit;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2.2vw, 2.15rem);
  line-height: 1.04;
}

.blog-intro-banner p:not(.eyebrow) {
  max-width: 52rem;
  margin: var(--space-2) 0 0;
  color: var(--color-on-dark-soft);
  font-size: .96rem;
}

.blog-intro-banner .hero-actions {
  justify-content: flex-end;
}

.blog-hero .subpage-hero-grid {
  align-items: stretch;
}

.blog-hero .blog-hero-photo {
  min-height: 26rem;
}

.article-meta,
.blog-card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .55rem;
  color: var(--color-ink-soft);
  font-size: var(--text-sm);
  font-weight: 900;
}

.blog-hero .article-meta {
  margin-top: var(--space-5);
  color: var(--color-on-dark-soft);
}

.blog-hero .article-meta a {
  color: var(--color-on-dark);
  text-decoration: underline;
  text-decoration-thickness: .08em;
  text-underline-offset: .2em;
}

.article-meta span,
.blog-card-meta span,
.blog-card-meta time {
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-quest-blue), transparent 86%);
  color: var(--color-deep-navy);
  padding: .35rem .65rem;
}

.blog-hero .article-meta span,
.blog-hero .article-meta time {
  background: color-mix(in srgb, var(--color-white), transparent 88%);
  color: var(--color-on-dark);
}

.blog-feature {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-5);
}

.blog-feature--with-media {
  grid-template-columns: minmax(0, .9fr) minmax(18rem, 1.1fr);
  align-items: center;
}

.blog-feature--with-media .blog-hero-photo {
  min-height: 20rem;
}

.blog-feature h2 {
  max-width: 18ch;
  margin: 0 0 var(--space-4);
  color: var(--color-deep-navy);
  font-size: var(--text-3xl);
}

.blog-feature p {
  max-width: 54rem;
  color: var(--color-ink-soft);
  font-size: var(--text-lg);
}

.blog-feature .button {
  margin-top: var(--space-5);
}

.blog-card-media {
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: calc(var(--radius-card) - 1px) calc(var(--radius-card) - 1px) 0 0;
  background: var(--color-deep-navy);
}

.blog-card-media picture {
  height: 100%;
}

.blog-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--image-position, center center);
  transition: transform var(--dur-base) var(--ease-out);
}

.blog-card:has(.blog-card-media) {
  overflow: hidden;
  padding: 0;
}

.blog-card:has(.blog-card-media) > .blog-card-meta,
.blog-card:has(.blog-card-media) > h2,
.blog-card:has(.blog-card-media) > h3,
.blog-card:has(.blog-card-media) > p,
.blog-card:has(.blog-card-media) > .blog-card-link {
  margin-inline: var(--space-5);
}

.blog-card:has(.blog-card-media) > .blog-card-meta {
  margin-top: var(--space-5);
}

.blog-card:has(.blog-card-media) > .blog-card-link {
  margin-bottom: var(--space-5);
}

.blog-card:hover .blog-card-media img,
.blog-card:focus-within .blog-card-media img {
  transform: scale(1.025);
}

.blog-list-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-5);
}

.blog-list-grid--compact {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.blog-card {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  min-height: 20rem;
  border: var(--rule) solid color-mix(in srgb, var(--color-line), transparent 15%);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  padding: var(--space-5);
}

.blog-card h2 {
  margin: 0;
  color: var(--color-deep-navy);
  font-size: var(--text-xl);
  line-height: 1.15;
}

.blog-card h3 {
  margin: 0;
  color: var(--color-deep-navy);
  font-size: var(--text-xl);
  line-height: 1.15;
}

.blog-card p {
  margin: 0;
  color: var(--color-ink-soft);
}

.blog-card-link {
  align-self: end;
  color: var(--color-accent-strong);
  font-weight: 900;
}

.blog-carousel-band {
  background: var(--color-warm-off-white);
  overflow: hidden;
  padding-block: clamp(3rem, 5vw, 4.5rem);
}

.blog-carousel-header,
.blog-more-header {
  max-width: 48rem;
  margin-bottom: var(--space-6);
}

.blog-carousel-header {
  display: flex;
  max-width: none;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-4);
}

.blog-carousel-header h2,
.blog-more-header h2 {
  margin: 0;
  color: var(--color-deep-navy);
  font-size: var(--text-3xl);
}

.blog-more-header p {
  margin: var(--space-2) 0 0;
  color: var(--color-ink-soft);
}

.blog-carousel-controls {
  display: flex;
  gap: var(--space-2);
}

.blog-carousel-button {
  display: inline-grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border: var(--rule) solid color-mix(in srgb, var(--color-deep-navy), transparent 72%);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-deep-navy);
  font-size: var(--text-xl);
  font-weight: 900;
  line-height: 1;
  box-shadow: var(--shadow-card);
}

.blog-carousel-button:hover,
.blog-carousel-button:focus-visible {
  background: var(--color-deep-navy);
  color: var(--color-white);
}

.blog-carousel-track {
  --carousel-gap: var(--space-5);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(17rem, 31vw, 24rem);
  gap: var(--carousel-gap);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-behavior: smooth;
  scroll-padding-inline: 1px;
  scroll-snap-type: inline mandatory;
  padding: .15rem .15rem var(--space-3);
  scrollbar-width: none;
}

.blog-carousel-track::-webkit-scrollbar {
  display: none;
}

.blog-carousel-card {
  min-height: 0;
  scroll-snap-align: start;
}

.blog-more-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  padding: 0;
  margin: 0;
  list-style: none;
}

.blog-more-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 4rem;
  border: var(--rule) solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  padding: var(--space-3) var(--space-4);
  box-shadow: var(--shadow-card);
}

.blog-more-list span {
  color: var(--color-deep-navy);
  font-weight: 900;
}

.blog-more-list time {
  flex: 0 0 auto;
  color: var(--color-ink-soft);
  font-size: var(--text-sm);
  font-weight: 800;
}

.blog-more-band {
  padding-block: clamp(3rem, 5vw, 4.5rem);
}

.blog-article-band {
  background: var(--color-warm-off-white);
  padding-top: clamp(2.5rem, 4vw, 3.5rem);
}

.blog-article-layout {
  display: grid;
  grid-template-columns: minmax(0, 44rem) minmax(18rem, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.article-content {
  max-width: 44rem;
}

.article-content .article-lede {
  color: var(--color-deep-navy);
  font-size: var(--text-xl);
  font-weight: 750;
}

.article-content h2 {
  margin: var(--space-10) 0 var(--space-4);
  color: var(--color-deep-navy);
  font-size: var(--text-2xl);
}

.article-content p,
.article-content li {
  color: var(--color-ink-soft);
  font-size: var(--text-lg);
}

.article-content ul {
  display: grid;
  gap: var(--space-2);
  margin: var(--space-4) 0 var(--space-6);
  padding-left: 1.25rem;
}

.article-content li::marker {
  color: var(--color-accent);
}

.article-sidebar {
  position: sticky;
  top: 8rem;
}

.article-sidebar-panel {
  display: grid;
  gap: var(--space-4);
  border: var(--rule) solid color-mix(in srgb, var(--color-line), transparent 15%);
  border-radius: var(--radius-card);
  background: var(--color-desert-sand);
  padding: var(--space-5);
  box-shadow: var(--shadow-card);
}

.article-sidebar-panel h2 {
  margin: 0;
  color: var(--color-deep-navy);
  font-size: var(--text-2xl);
}

.article-sidebar-panel p {
  margin: 0;
  color: var(--color-ink-soft);
}

@media (min-width: 42.01rem) {
  .blog-post-page .blog-hero {
    padding-block: clamp(3.25rem, 5.5vw, 5rem);
  }

  .blog-post-page .blog-hero h1 {
    font-size: clamp(3rem, 4.4vw, 4.15rem);
    line-height: 1.04;
  }

  .blog-post-page .blog-hero .blog-hero-photo {
    min-height: 23rem;
  }
}

@media (max-width: 76rem) {
  .blog-intro-banner-inner,
  .blog-feature--with-media {
    grid-template-columns: 1fr;
  }

  .blog-intro-banner .hero-actions {
    justify-content: flex-start;
  }

  .blog-carousel-track {
    grid-auto-columns: clamp(17rem, 46vw, 23rem);
  }

  .blog-more-list {
    grid-template-columns: 1fr;
  }

  .blog-list-grid,
  .blog-list-grid--compact {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .blog-article-layout {
    grid-template-columns: 1fr;
  }

  .article-sidebar {
    position: static;
  }
}

@media (max-width: 42rem) {
  .blog-intro-banner {
    padding: .85rem 0 1rem;
  }

  .blog-intro-banner-inner {
    gap: var(--space-3);
  }

  .blog-intro-banner h1 {
    max-width: none;
    font-size: 1.5rem;
    line-height: 1.08;
  }

  .blog-intro-banner p:not(.eyebrow) {
    max-width: 32ch;
    font-size: .92rem;
  }

  .blog-intro-banner .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: .55rem;
  }

  .blog-intro-banner .button {
    min-height: 2.25rem;
    padding: .55rem .62rem;
    font-size: .84rem;
  }

  .blog-carousel-header {
    align-items: start;
  }

  .blog-carousel-track {
    grid-auto-columns: minmax(17rem, calc(100% - 1rem));
  }

  .blog-more-list a {
    align-items: flex-start;
    flex-direction: column;
    gap: .25rem;
  }

  .header-main {
    display: block;
    position: relative;
    min-height: 4.7rem;
  }

  .header-brand-panel {
    width: calc(100% - 3.5rem);
    max-width: none;
    min-width: 0;
    overflow: hidden;
  }

  .header-nav-panel {
    display: flex;
    justify-content: flex-end;
    min-width: 0;
    position: absolute;
    top: .85rem;
    right: .65rem;
    z-index: 5;
    padding: 0;
    background: transparent;
  }

  .header-call {
    display: none;
  }

  .nav-toggle {
    border: 0;
    background: var(--color-deep-navy) !important;
    box-shadow: 0 12px 26px rgb(11 29 51 / .22);
    flex: 0 0 2.65rem;
    display: inline-flex !important;
    position: fixed;
    top: .95rem;
    right: .75rem;
    z-index: 120;
    width: 2.65rem;
    min-width: 2.65rem;
    min-height: 2.65rem;
  }

  .nav-toggle span {
    background: var(--color-white);
  }

  .blog-list-grid,
  .blog-list-grid--compact {
    grid-template-columns: 1fr;
  }

  .blog-hero h1 {
    max-width: 12ch;
    font-size: 2.28rem;
    line-height: 1.06;
  }

  .blog-hero p {
    max-width: 29ch;
  }

  .blog-hero .hero-actions .button {
    width: 100%;
  }

  .blog-card {
    min-height: 0;
  }

  .blog-hero .blog-hero-photo {
    min-height: 0;
  }
}
"""


def append_blog_css() -> None:
    styles_path = SITE_ROOT / "styles.css"
    current = styles_path.read_text(encoding="utf-8")
    marker = "/* Blog index and article pages */"
    if marker in current:
        current = re.sub(r"\n/\* Blog index and article pages \*/.*\Z", "", current, flags=re.S)
    styles_path.write_text(current.rstrip() + BLOG_CSS, encoding="utf-8")


def relative_prefix(html_path: Path) -> str:
    relative = html_path.relative_to(SITE_ROOT)
    depth = len(relative.parts) - 1
    return "/".join([".."] * depth)


def add_blog_links_to_existing_pages() -> None:
    for html_path in SITE_ROOT.rglob("*.html"):
        if ".git" in html_path.parts or "blog" in html_path.relative_to(SITE_ROOT).parts:
            continue
        prefix = relative_prefix(html_path)
        blog_href = asset(prefix, "blog/index.html")
        old_blog_href = asset(prefix, "blogs/index.html")
        faq_href = asset(prefix, "faq/index.html")
        contact_href = asset(prefix, "contact/index.html")
        glossary_href = asset(prefix, "resources/roofing-glossary/index.html")
        content = html_path.read_text(encoding="utf-8")
        content = re.sub(r'\n\s*<button class="nav-toggle mobile-nav-toggle"[^>]*><span></span><span></span></button>', "", content)
        content = content.replace(f'<a href="{old_blog_href}">Blogs</a>\n          ', "")
        content = content.replace(f'<a href="{old_blog_href}">Blogs</a>\n', "")
        content = content.replace(f'<a href="{old_blog_href}">Blog</a>\n          ', "")
        content = content.replace(f'<a href="{old_blog_href}">Blog</a>\n', "")
        if blog_href not in content:
            content = content.replace(
                f'<a href="{faq_href}">FAQ</a>\n          <a href="{contact_href}">Contact</a>',
                f'<a href="{faq_href}">FAQ</a>\n          <a href="{blog_href}">Blog</a>\n          <a href="{contact_href}">Contact</a>',
            )
            content = content.replace(
                f'<a href="{glossary_href}">Roofing Glossary</a>\n<a href="{contact_href}">Contact</a>',
                f'<a href="{glossary_href}">Roofing Glossary</a>\n<a href="{blog_href}">Blog</a>\n<a href="{contact_href}">Contact</a>',
            )
        html_path.write_text(content, encoding="utf-8")


def update_sitemap(posts: list[BlogPost]) -> None:
    sitemap_path = SITE_ROOT / "sitemap.xml"
    sitemap = sitemap_path.read_text(encoding="utf-8")
    sitemap = re.sub(r"\s*<url>\s*<loc>https://(?:www\.)?questroofing\.com/blogs?/.*?</url>", "", sitemap, flags=re.S)
    entries = [
        ("blog/", GENERATED_ON, "weekly", "0.75"),
        *[(post.url_path, post.published, "monthly", "0.65") for post in posts],
    ]
    entry_xml = "\n".join(
        f"""  <url>
    <loc>{SITE_URL}/{path}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>"""
        for path, lastmod, changefreq, priority in entries
    )
    sitemap = sitemap.replace("</urlset>", f"{entry_xml}\n</urlset>")
    sitemap_path.write_text(sitemap, encoding="utf-8")


def main() -> None:
    posts = sorted((parse_post(path) for path in BLOG_SOURCE_DIR.glob("*.docx")), key=lambda post: post.published, reverse=True)
    if not posts:
        raise SystemExit(f"No .docx blog posts found in {BLOG_SOURCE_DIR}")

    if BLOG_OUTPUT_DIR.exists():
        shutil.rmtree(BLOG_OUTPUT_DIR)
    BLOG_OUTPUT_DIR.mkdir(parents=True)
    (BLOG_OUTPUT_DIR / "index.html").write_text(blog_index(posts), encoding="utf-8")
    for post in posts:
        post_dir = BLOG_OUTPUT_DIR / post.slug
        post_dir.mkdir(parents=True)
        (post_dir / "index.html").write_text(blog_post_page(post, posts), encoding="utf-8")

    add_blog_links_to_existing_pages()
    append_blog_css()
    update_sitemap(posts)

    print(f"Generated {len(posts)} blog posts in {BLOG_OUTPUT_DIR.relative_to(SITE_ROOT)}")


if __name__ == "__main__":
    main()

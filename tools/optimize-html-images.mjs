import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const siteRoot = process.cwd();
const skippedDirectories = new Set([".git", ".hallmark", ".vercel", "node_modules", "output", "outputs", "Real-Assets"]);
const imagePattern = /<img\b(?![^>]*\bdata-no-webp\b)[^>]*\bsrc=(["'])([^"']+\.(?:jpe?g|png)(?:[?#][^"']*)?)\1[^>]*>/gi;
const removableHeadTags = [
  /\r?\n\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g,
  /\r?\n\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*/g,
  /\r?\n\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet">\s*/g,
];

function listHtmlFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        files.push(...listHtmlFiles(path.join(directory, entry.name)));
      }
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path.join(directory, entry.name));
    }
  }
  return files;
}

function splitUrl(url) {
  const match = url.match(/^([^?#]+)(.*)$/);
  return {
    pathname: match ? match[1] : url,
    suffix: match ? match[2] : "",
  };
}

function isExternalUrl(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith("data:");
}

function isAlreadyInPicture(content, startIndex) {
  const before = content.slice(0, startIndex);
  return before.lastIndexOf("<picture") > before.lastIndexOf("</picture>");
}

function webpPathFor(htmlFile, imageUrl) {
  if (isExternalUrl(imageUrl)) {
    return null;
  }
  const { pathname, suffix } = splitUrl(imageUrl);
  const webpUrl = `${pathname.replace(/\.(?:jpe?g|png)$/i, ".webp")}${suffix}`;
  const imageFile = path.resolve(path.dirname(htmlFile), pathname);
  const webpFile = imageFile.replace(/\.(?:jpe?g|png)$/i, ".webp");
  if (!webpFile.startsWith(siteRoot) || !existsSync(webpFile) || !statSync(webpFile).isFile()) {
    return null;
  }
  return webpUrl;
}

let changedFiles = 0;
let wrappedImages = 0;
let removedHeadTags = 0;

for (const htmlFile of listHtmlFiles(siteRoot)) {
  const content = readFileSync(htmlFile, "utf8");
  let cleaned = content;
  for (const pattern of removableHeadTags) {
    cleaned = cleaned.replace(pattern, () => {
      removedHeadTags += 1;
      return "\n";
    });
  }
  let replacements = 0;
  const next = cleaned.replace(imagePattern, (imgTag, _quote, imageUrl, offset) => {
    if (isAlreadyInPicture(cleaned, offset)) {
      return imgTag;
    }
    const webpUrl = webpPathFor(htmlFile, imageUrl);
    if (!webpUrl) {
      return imgTag;
    }
    replacements += 1;
    return `<picture><source srcset="${webpUrl}" type="image/webp">${imgTag}</picture>`;
  });

  if (next !== content) {
    writeFileSync(htmlFile, next, "utf8");
    changedFiles += 1;
    wrappedImages += replacements;
  }
}

console.log(`Wrapped ${wrappedImages} images with WebP sources and removed ${removedHeadTags} third-party head tags across ${changedFiles} HTML files.`);

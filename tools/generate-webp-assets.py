from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


SITE_ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = SITE_ROOT / "assets"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_WEBP_EDGE = 1100
JPEG_QUALITY = 68
WORDMARK_MAX_EDGE = 360
WORDMARK_QUALITY = 76
SCRIPT_MTIME = Path(__file__).stat().st_mtime


def should_update(source: Path, target: Path) -> bool:
    return not target.exists() or target.stat().st_mtime < max(source.stat().st_mtime, SCRIPT_MTIME)


def save_webp(source: Path, target: Path) -> tuple[int, int]:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((MAX_WEBP_EDGE, MAX_WEBP_EDGE), Image.Resampling.LANCZOS)
        if source.name == "quest-roofing-wordmark.png":
            image.thumbnail((WORDMARK_MAX_EDGE, WORDMARK_MAX_EDGE), Image.Resampling.LANCZOS)
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGBA")
            image.save(target, "WEBP", quality=WORDMARK_QUALITY, method=6)
        elif source.suffix.lower() == ".png":
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGBA")
            image.save(target, "WEBP", lossless=True, method=6)
        else:
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGB")
            image.save(target, "WEBP", quality=JPEG_QUALITY, method=6)
    return source.stat().st_size, target.stat().st_size


def main() -> None:
    created = 0
    total_before = 0
    total_after = 0

    for source in sorted(ASSET_ROOT.rglob("*")):
        if source.suffix.lower() not in IMAGE_EXTENSIONS:
            continue
        target = source.with_suffix(".webp")
        if not should_update(source, target):
            continue
        before, after = save_webp(source, target)
        created += 1
        total_before += before
        total_after += after

    saved = total_before - total_after
    print(
        f"Generated {created} WebP assets; "
        f"{total_before / 1024:.1f}KB source -> {total_after / 1024:.1f}KB WebP "
        f"({saved / 1024:.1f}KB saved)."
    )


if __name__ == "__main__":
    main()

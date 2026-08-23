#!/usr/bin/env python3
"""Generate WhatsApp/OG share card and favicons."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "app"
NAVY = (7, 27, 51)
CYAN = (0, 168, 181)
WHITE = (255, 255, 255)
PHOTO = PUBLIC / "images" / "surfland" / "hero.jpg"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"


def cover(im: Image.Image, width: int, height: int) -> Image.Image:
    scale = max(width / im.width, height / im.height)
    resized = im.resize(
        (max(1, int(im.width * scale)), max(1, int(im.height * scale))),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def make_og() -> None:
    photo = cover(Image.open(PHOTO).convert("RGB"), 1200, 630)
    overlay = Image.new("RGB", (1200, 630), NAVY)
    faded = Image.blend(photo, overlay, 0.42)
    shade = Image.new("L", (1200, 630), 0)
    shade_draw = ImageDraw.Draw(shade)
    for y in range(630):
        shade_draw.line([(0, y), (1200, y)], fill=int(40 + (y / 629) * 150))
    shade = shade.filter(ImageFilter.GaussianBlur(1))
    card = Image.composite(overlay, faded, shade)
    draw = ImageDraw.Draw(card)

    title = ImageFont.truetype(BOLD, 92)
    subtitle = ImageFont.truetype(REGULAR, 34)
    kicker = ImageFont.truetype(BOLD, 20)

    draw.text((80, 86), "SURFLAND BRASIL · GAROPABA", font=kicker, fill=CYAN)
    draw.text((80, 250), "GUARD", font=title, fill=WHITE)
    guard_w = draw.textlength("GUARD", font=title)
    draw.text((80 + guard_w, 250), "OS", font=title, fill=CYAN)
    draw.text(
        (80, 380),
        "O sistema operacional do guarda-vidas",
        font=subtitle,
        fill=(220, 232, 238),
    )
    draw.rectangle((80, 470, 168, 476), fill=CYAN)

    dest = PUBLIC / "og.jpg"
    card.save(dest, "JPEG", quality=88, optimize=True)
    print(f"wrote {dest}")


def make_mark(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = max(6, int(size * 0.22))
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=NAVY + (255,))
    inset = size * 0.20
    stroke = max(2, int(size * 0.10))
    draw.ellipse((inset, inset, size - inset, size - inset), outline=CYAN + (255,), width=stroke)
    cut = max(2, int(size * 0.12))
    arm = max(3, int(size * 0.18))
    cx = cy = size / 2
    draw.rectangle((cx - cut / 2, inset - 1, cx + cut / 2, inset + arm), fill=NAVY + (255,))
    draw.rectangle((cx - cut / 2, size - inset - arm, cx + cut / 2, size - inset + 1), fill=NAVY + (255,))
    draw.rectangle((inset - 1, cy - cut / 2, inset + arm, cy + cut / 2), fill=NAVY + (255,))
    draw.rectangle((size - inset - arm, cy - cut / 2, size - inset + 1, cy + cut / 2), fill=NAVY + (255,))
    return img


def make_icons() -> None:
    mark_512 = make_mark(512)
    apple = make_mark(180)
    ico_sizes = [16, 32, 48]
    ico_images = [make_mark(s) for s in ico_sizes]

    mark_512.save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
    )
    apple.save(PUBLIC / "apple-touch-icon.png", "PNG")
    make_mark(32).save(APP / "icon.png", "PNG")
    (APP / "favicon.ico").write_bytes((PUBLIC / "favicon.ico").read_bytes())
    apple.save(APP / "apple-icon.png", "PNG")
    print("wrote favicons")


if __name__ == "__main__":
    make_og()
    make_icons()

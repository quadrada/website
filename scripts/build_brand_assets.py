"""Generate web-ready logo files from the original badge in brand/q_quadrada.png.

Run from the repo root: python3 scripts/build_brand_assets.py (needs Pillow).
"""

from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

SOURCE = Path("brand/q_quadrada.png")
ASSETS_DIR = Path("src/assets/brand")
APP_DIR = Path("src/app")

# Measured on the source image (1735x1735).
BADGE_CENTER = (867, 725)
BADGE_RADIUS = 900
SHIELD_BOX = (450, 212, 1297, 1297)
SHIELD_ORANGE = (245, 114, 21)
BACKGROUND = (255, 250, 245)
SUPERSAMPLE = 4


def circle_mask(size: int) -> Image.Image:
    """Return an anti-aliased circular alpha mask of `size` x `size`."""
    big = Image.new("L", (size * SUPERSAMPLE, size * SUPERSAMPLE), 0)
    ImageDraw.Draw(big).ellipse((0, 0, big.width - 1, big.height - 1), fill=255)
    return big.resize((size, size), Image.LANCZOS)


def build_medallion(logo: Image.Image) -> Image.Image:
    """Full badge on a white disc with a transparent outside."""
    diameter = BADGE_RADIUS * 2
    canvas = Image.new("RGB", (diameter, diameter), "white")
    offset = (BADGE_RADIUS - BADGE_CENTER[0], BADGE_RADIUS - BADGE_CENTER[1])
    canvas.paste(logo, offset)
    _erase_outer_arc(canvas)
    medallion = canvas.convert("RGBA")
    medallion.putalpha(circle_mask(diameter))
    return medallion


def _erase_outer_arc(canvas: Image.Image) -> None:
    # The source has a faint grey circle outline that would show inside our larger disc.
    pixels = canvas.load()
    center = BADGE_RADIUS
    for y in range(canvas.height):
        for x in range(canvas.width):
            red, green, blue = pixels[x, y]
            is_light_grey = min(red, green, blue) > 150 and max(red, green, blue) - min(red, green, blue) < 30
            if is_light_grey and (x - center) ** 2 + (y - center) ** 2 > 800**2:
                pixels[x, y] = (255, 255, 255)


def build_shield(logo: Image.Image) -> Image.Image:
    """Orange Q shield only, with the white surround made transparent."""
    shield = logo.crop(SHIELD_BOX).convert("RGBA")
    marker = (0, 255, 0, 0)
    for corner in [(0, 0), (shield.width - 1, 0), (0, shield.height - 1), (shield.width - 1, shield.height - 1)]:
        ImageDraw.floodfill(shield, corner, marker, thresh=60)

    is_inside = [pixel != marker for pixel in shield.getdata()]
    keep = _largest_component(is_inside, shield.width, shield.height)
    outside = Image.new("L", shield.size, 0)
    outside.putdata([0 if kept else 255 for kept in keep])
    edge = ImageChops.subtract(outside.filter(ImageFilter.MaxFilter(5)), outside)

    pixels, edge_pixels, outside_pixels = shield.load(), edge.load(), outside.load()
    for y in range(shield.height):
        for x in range(shield.width):
            if outside_pixels[x, y]:
                pixels[x, y] = (0, 0, 0, 0)
            elif edge_pixels[x, y]:
                # Recover anti-aliasing: blend factor from the blue channel (orange 21 → white 255).
                blue = pixels[x, y][2]
                alpha = round(255 * max(0, min(1, (255 - blue) / (255 - SHIELD_ORANGE[2]))))
                pixels[x, y] = (*SHIELD_ORANGE, alpha)
    return shield


def _largest_component(mask: list[bool], width: int, height: int) -> list[bool]:
    # Drops fragments of the circular lettering that fall inside the shield's crop box.
    labels = [0] * len(mask)
    best_label, best_size, label = 0, 0, 0
    for start, filled in enumerate(mask):
        if not filled or labels[start]:
            continue
        label += 1
        labels[start] = label
        stack, size = [start], 0
        while stack:
            index = stack.pop()
            size += 1
            x, y = index % width, index // width
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                neighbour = ny * width + nx
                if 0 <= nx < width and 0 <= ny < height and mask[neighbour] and not labels[neighbour]:
                    labels[neighbour] = label
                    stack.append(neighbour)
        if size > best_size:
            best_label, best_size = label, size
    return [value == best_label for value in labels]


def fit_on_square(image: Image.Image, size: int, padding: float, background=None) -> Image.Image:
    """Center `image` on a square canvas, scaled to leave `padding` (fraction) around it."""
    canvas = Image.new("RGBA", (size, size), background or (0, 0, 0, 0))
    scale = size * (1 - 2 * padding) / max(image.size)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)
    canvas.alpha_composite(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return canvas


def build_social_preview(medallion: Image.Image) -> Image.Image:
    """1200x630 image shown when the site link is shared."""
    preview = Image.new("RGBA", (1200, 630), (*BACKGROUND, 255))
    badge = medallion.resize((540, 540), Image.LANCZOS)
    preview.alpha_composite(badge, ((1200 - 540) // 2, (630 - 540) // 2))
    return preview.convert("RGB")


def main() -> None:
    logo = Image.open(SOURCE).convert("RGB")
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    medallion = build_medallion(logo)
    medallion.resize((960, 960), Image.LANCZOS).save(ASSETS_DIR / "quadrada-badge.png", optimize=True)

    shield = build_shield(logo)
    shield.thumbnail((400, 400), Image.LANCZOS)
    shield.save(ASSETS_DIR / "quadrada-shield.png", optimize=True)

    fit_on_square(shield, 512, 0.04).save(APP_DIR / "icon.png", optimize=True)
    fit_on_square(shield, 180, 0.12, (*BACKGROUND, 255)).convert("RGB").save(APP_DIR / "apple-icon.png", optimize=True)
    build_social_preview(medallion).save(APP_DIR / "opengraph-image.png", optimize=True)


if __name__ == "__main__":
    main()

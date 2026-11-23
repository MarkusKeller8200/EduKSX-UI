"""EduKSX-Logo 240 × 56 – Generator (#59, ersetzt markussxch #14; Freigabe Markus 23.11.2026).

Icon «EduKSX» (vier Bausteine, aus icons/build.py) + Wortmarke «EduKSX» in Inter 700 (M6), als Pfade gesetzt –
die SVG brauchen keine Schrift. Farben aus tokens/tokens.json (brand-*, background), hell und dunkel.

Aufruf:  python3 icons/logo/build_logo.py          SVG nach icons/logo/
         node icons/logo/raster.mjs                PNG 240 × 56 und 480 × 112 (braucht Playwright mit Chromium)
Braucht fontTools mit Brotli (nur zum Erzeugen, nicht Teil des Pakets): pip install fonttools brotli
"""

import json
import os
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

HIER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HIER, "..", ".."))
sys.path.insert(0, os.path.join(REPO, "icons"))
from build import ICONS, attrs  # noqa: E402

FONT = os.path.join(REPO, "site", "public", "fonts", "inter-latin-opsz-normal.woff2")
W, H = 240, 56

# Raster: Icon-Inhalt (3.5–20.5 im 24er-Raster) × 2 = 34 px, vertikal zentriert; Wortmarke ab x = 52
ICON_SCALE = 2.0
ICON_X = 6 - 3.5 * ICON_SCALE
ICON_Y = (H - 17 * ICON_SCALE) / 2 - 3.5 * ICON_SCALE
TEXT_X = 52
CAP = 25.0  # Versalhöhe der Wortmarke in px (Icon 34 px, Verhältnis wie Kopfzeile)

SEGMENTE = [("E", "brand-violet"), ("du", "brand-neutral"), ("K", "brand-orange"), ("SX", "brand-blue")]
ROLLE = {"e": "brand-violet", "k": "brand-orange", "sx": "brand-blue", "base": "brand-neutral"}


def farben(dunkel):
    t = json.load(open(os.path.join(REPO, "tokens", "tokens.json")))["color"]
    return {
        k: (v["$extensions"]["ch.eduksx"]["dark"] if dunkel else v["$value"])
        for k, v in t.items()
        if k.startswith("brand-") or k == "background"
    }


def schrift():
    f = TTFont(FONT)
    instantiateVariableFont(f, {"wght": 700, "opsz": 32}, inplace=True)
    return f


def wortmarke(f, c):
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    upm = f["head"].unitsPerEm
    cap = f["OS/2"].sCapHeight
    s = CAP / cap
    baseline = H / 2 + CAP / 2
    x = TEXT_X
    teile = []
    for text, rolle in SEGMENTE:
        d = []
        for ch in text:
            name = cmap[ord(ch)]
            pen = SVGPathPen(gs)
            gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
            d.append(pen.getCommands())
            x += gs[name].width * s
        teile.append(f'<path fill="{c[rolle]}" d="{" ".join(d)}"/>')
    return teile, x, upm


def icon(c):
    out = []
    for tag, role, a, mode in ICONS["eduksx"]["els"]:
        col = c[ROLLE[role]]
        style = (
            f'fill="none" stroke="{col}" stroke-width="1.75" stroke-linejoin="round"' if mode == "s" else f'fill="{col}"'
        )
        out.append(f"<{tag} {attrs(a)} {style}/>")
    return f'<g transform="translate({ICON_X:g} {ICON_Y:g}) scale({ICON_SCALE:g})">\n    ' + "\n    ".join(out) + "\n  </g>"


def logo(f, variante):
    dunkel = variante == "dunkel"
    c = farben(dunkel)
    teile, ende, _ = wortmarke(f, c)
    bg = {"hell": "", "weiss": '<rect width="240" height="56" fill="#ffffff"/>\n  ',
          "dunkel": f'<rect width="240" height="56" fill="{c["background"]}"/>\n  '}[variante]
    body = bg + icon(c) + '\n  <g aria-hidden="true">\n    ' + "\n    ".join(teile) + "\n  </g>"
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">\n'
        f"  <title>EduKSX</title>\n  {body}\n</svg>\n"
    )
    return svg, ende


def main():
    f = schrift()
    for v in ("hell", "weiss", "dunkel"):
        svg, ende = logo(f, v)
        if ende > W - 6:
            raise SystemExit(f"Wortmarke zu breit: endet bei {ende:.1f} px")
        with open(os.path.join(HIER, f"eduksx-logo-240x56-{v}.svg"), "w") as fh:
            fh.write(svg)
    print(f"3 Logos → {HIER} (Wortmarke endet bei {ende:.1f} px von {W})")


if __name__ == "__main__":
    main()

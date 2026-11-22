"""EduKSX Icon-Set – Generator (Icons freigegeben 09.11., 13.11. und 22.11.2026 durch Markus Keller; Planner, Shop, Portal und neun neue Icons 22.11.2026).

Übernommen aus dem Repo markussxch (docs/brand/icons/eduksx); massgebliche Quelle ist seit 22.11.2026
EduKSX-UI (icons/). Motive und Farben nur nach neuer Freigabe ändern.

Jedes Icon ist auf einem 24er-Raster gezeichnet (Strichstärke 1.75, runde Enden).
Rollen: "base" = neutrale Linie, "k" = Orange (EduKSX-Primärakzent), "sx" = Blau, "e" = Violett.
Aufruf: python3 icons/build.py [ZIELORDNER]   (Standard: Ordner dieser Datei)
        python3 icons/build.py --ts src/components/eduksx-icons.data.ts  (Daten für EduksxIcon)
Ausgaben je Icon:
  svg/<slug>.svg              einfarbig (currentColor) für die Oberfläche, 24×24
  svg/<slug>-color.svg        farbig ohne Kachel, für helle Flächen
  svg/<slug>-tile-dark.svg    App-Icon-Kachel dunkel
  svg/<slug>-tile-light.svg   App-Icon-Kachel hell
  svg/<slug>-maskable-*.svg   App-Icon für das Web-Manifest (purpose «maskable»), randlos, hell und dunkel
PNG und favicon.ico erzeugt danach icons/raster.mjs (node icons/raster.mjs).
Farben aus CI-Manual v1.0 / Markenfortschreibung v1.1.
"""

import json
import math
import os
import sys

LIGHT = {"base": "#222222", "e": "#7952B3", "k": "#FF8A00", "sx": "#007EBB", "tile": "#F2F5F8"}
DARK = {"base": "#F2F5F8", "e": "#B59AFF", "k": "#FF8A00", "sx": "#32B8F2", "tile": "#222222"}
SW = 1.75


def gear_path(cx, cy, r_out, r_in, teeth, tooth_frac=0.42):
    pts = []
    step = 2 * math.pi / teeth
    for i in range(teeth):
        a = i * step - math.pi / 2
        half = step * tooth_frac / 2
        # Zahn: aussen schmaler als innen
        for ang, r in [
            (a - step / 2 + 0.0001, r_in),
            (a - half * 1.25, r_in),
            (a - half * 0.8, r_out),
            (a + half * 0.8, r_out),
            (a + half * 1.25, r_in),
        ]:
            pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
    d = "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + "Z"
    return d


# Element: (tag, role, attrs, mode) – mode "s" = Linie, "f" = Fläche
ICONS = {
    "eduksx": {
        "name": "EduKSX",
        "meaning": "Modulare Produktfamilie – E · du · K · SX als vier Bausteine",
        "els": [
            ("rect", "e", dict(x=3.5, y=3.5, width=7.5, height=7.5, rx=2), "f"),
            ("rect", "base", dict(x=13, y=3.5, width=7.5, height=7.5, rx=2), "s"),
            ("rect", "k", dict(x=3.5, y=13, width=7.5, height=7.5, rx=2), "f"),
            ("rect", "sx", dict(x=13, y=13, width=7.5, height=7.5, rx=2), "f"),
        ],
    },
    "eduksx-glossary": {
        "name": "EduKSX-Glossary",
        "meaning": "Offenes Buch mit A–Z: Begriffe und Abkürzungen",
        "els": [
            ("path", "base", dict(d="M12 6.6C9.8 5.1 6.9 4.7 3 5.2v13.3c3.9-.5 6.8-.1 9 1.4 2.2-1.5 5.1-1.9 9-1.4V5.2c-3.9-.5-6.8-.1-9 1.4Z"), "s"),
            ("path", "base", dict(d="M12 6.6v13.3"), "s"),
            ("path", "k", dict(d="M5.6 15.2 7.4 9.6l1.8 5.6M6.2 13.4h2.4"), "s"),
            ("path", "sx", dict(d="M14.6 9.8h3.2l-3.2 5.2h3.2"), "s"),
        ],
    },
    "eduksx-codex": {
        "name": "EduKSX-Codex",
        "meaning": "Waage: systematische Rechtssammlungen",
        "els": [
            ("path", "base", dict(d="M12 5v14.5M8 19.5h8M4 8h16"), "s"),
            ("circle", "sx", dict(cx=12, cy=4.4, r=1.4), "f"),
            ("path", "base", dict(d="M6.5 8 4 13.6M6.5 8 9 13.6M17.5 8 15 13.6M17.5 8 20 13.6"), "s"),
            ("path", "k", dict(d="M3.2 13.6h6.6a3.3 3.3 0 0 1-6.6 0ZM14.2 13.6h6.6a3.3 3.3 0 0 1-6.6 0Z"), "f"),
        ],
    },
    "eduksx-core": {
        "name": "EduKSX-Core",
        "meaning": "Kern: gemeinsame Basis aller Module",
        "els": [
            ("path", "base", dict(d="M12 2.9 19.9 7.45v9.1L12 21.1l-7.9-4.55v-9.1Z"), "s"),
            ("path", "e", dict(d="M12 7.6 15.8 9.8v4.4L12 16.4l-3.8-2.2V9.8Z"), "s"),
            ("circle", "k", dict(cx=12, cy=12, r=1.9), "f"),
        ],
    },
    "eduksx-ident": {
        "name": "EduKSX-Ident",
        "meaning": "Ausweis: Identitäten und Konten",
        "els": [
            ("rect", "base", dict(x=2.75, y=5, width=18.5, height=14, rx=2.5), "s"),
            ("circle", "k", dict(cx=8.5, cy=10.4, r=2), "s"),
            ("path", "k", dict(d="M5.4 16.2c.6-1.7 1.8-2.6 3.1-2.6s2.5.9 3.1 2.6"), "s"),
            ("path", "sx", dict(d="M14.3 10.2h4M14.3 13.8h2.8"), "s"),
        ],
    },
    "eduksx-shop": {
        "name": "EduKSX-Shop",
        "meaning": "Einkaufswagen mit Häkchen: Lehrmittel bestellen (seit 22.11.2026, vorher Tasche)",
        "els": [
            ("path", "base", dict(d="M2.6 3.6h2.1l2.3 11a1.8 1.8 0 0 0 1.8 1.4h8.4a1.8 1.8 0 0 0 1.75-1.4L20.9 7.6H5.6"), "s"),
            ("path", "sx", dict(d="M10.2 12.1l1.5 1.5 3-3"), "s"),
            ("circle", "k", dict(cx=9.6, cy=19.6, r=1.6), "f"),
            ("circle", "k", dict(cx=17.2, cy=19.6, r=1.6), "f"),
        ],
    },
    "eduksx-licence": {
        "name": "EduKSX-Licence",
        "meaning": "Schlüssel: Lizenzen verwalten und zuweisen",
        "els": [
            ("circle", "k", dict(cx=7.4, cy=12, r=4.6), "s"),
            ("circle", "sx", dict(cx=7.4, cy=12, r=1.5), "f"),
            ("path", "base", dict(d="M12 12h9.2M18.6 12v3.6M15.6 12v2.6"), "s"),
        ],
    },
    "eduksx-portal": {
        "name": "EduKSX-Portal",
        "meaning": "Elternteil und Kind: Elternportal (seit 22.11.2026, vorher Torbogen)",
        "els": [
            ("circle", "base", dict(cx=8, cy=6.6, r=2.9), "s"),
            ("path", "base", dict(d="M3.5 20.5v-2a4.5 4.5 0 0 1 9 0v2"), "s"),
            ("circle", "k", dict(cx=17.8, cy=11.4, r=2), "s"),
            ("path", "k", dict(d="M15 20.5v-1a2.8 2.8 0 0 1 5.6 0v1"), "s"),
            ("circle", "sx", dict(cx=17.8, cy=4.6, r=1.1), "f"),
        ],
    },
    "eduksx-connect": {
        "name": "EduKSX-Connect",
        "meaning": "Verbundene Knoten: Schnittstellen zu Umsystemen",
        "els": [
            ("path", "base", dict(d="M8.3 7.4h7.4M7.2 9.1l3.4 6.3M16.8 9.1l-3.4 6.3"), "s"),
            ("circle", "e", dict(cx=5.8, cy=7.2, r=2.6), "f"),
            ("circle", "sx", dict(cx=18.2, cy=7.2, r=2.6), "f"),
            ("circle", "k", dict(cx=12, cy=17.8, r=2.6), "f"),
        ],
    },
    "eduksx-services": {
        "name": "EduKSX-Services",
        "meaning": "Zahnrad: eigenständige digitale Dienste",
        "els": [
            ("path", "base", dict(d=gear_path(12, 12, 9.2, 6.9, 8)), "s"),
            ("circle", "k", dict(cx=12, cy=12, r=2.7), "f"),
        ],
    },
    "eduksx-sign": {
        "name": "EduKSX-Sign",
        "meaning": "Feder und Unterschrift: digital unterschreiben",
        "els": [
            ("path", "base", dict(d="M7.8 16.2 8.9 11.6 16.6 3.9a1.8 1.8 0 0 1 2.5 0l1 1a1.8 1.8 0 0 1 0 2.5l-7.7 7.7Z"), "s"),
            ("path", "base", dict(d="M14.9 5.6l3.5 3.5"), "s"),
            ("path", "k", dict(d="M3.2 20.2c1.3-1.6 2.6-1.6 3.6 0s2.3 1.6 3.6 0"), "s"),
            ("path", "sx", dict(d="M13.6 20.2h7.2"), "s"),
        ],
    },
    "eduksx-time": {
        "name": "EduKSX-Time",
        "meaning": "Uhr: Zeit erfassen und planen",
        "els": [
            ("circle", "base", dict(cx=12, cy=12, r=8.8), "s"),
            ("path", "k", dict(d="M12 7v5l3.4 2.1"), "s"),
            ("circle", "sx", dict(cx=12, cy=12, r=1.1), "f"),
        ],
    },
}


# Ergänzung, freigegeben 13.11.2026 durch Markus Keller (Module aus dem Modulregister von EduKSX-Architektur)
EXTRA = {
    "eduksx-intranet": {
        "name": "EduKSX-Intranet",
        "meaning": "Haus mit Bausteinen: interne Plattform, die Module und Wissen zusammenbringt",
        "els": [
            ("path", "base", dict(d="M3.5 10.5 12 3.8l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19Z"), "s"),
            ("rect", "k", dict(x=8, y=11, width=3.4, height=3.4, rx=0.8), "f"),
            ("rect", "sx", dict(x=12.6, y=11, width=3.4, height=3.4, rx=0.8), "f"),
            ("rect", "e", dict(x=8, y=15.6, width=3.4, height=3.4, rx=0.8), "f"),
            ("rect", "base", dict(x=12.6, y=15.6, width=3.4, height=3.4, rx=0.8), "f"),
        ],
    },
    "eduksx-timetable": {
        "name": "EduKSX-Timetable",
        "meaning": "Raster mit Kalenderkopf: Stundenpläne für Klassen, Lehrpersonen und Räume",
        "els": [
            ("rect", "base", dict(x=3.5, y=5, width=17, height=15.5, rx=2.5), "s"),
            ("path", "base", dict(d="M8 3.2v3.4M16 3.2v3.4M9.2 9.5v11M14.8 9.5v11M3.5 15h17"), "s"),
            ("path", "sx", dict(d="M4.4 9.5h15.2"), "s"),
            ("rect", "k", dict(x=10.4, y=10.7, width=3.2, height=3.1, rx=0.6), "f"),
        ],
    },
    "eduksx-staffing": {
        "name": "EduKSX-Staffing",
        "meaning": "Person mit Kalender: Einsatzplanung von Mitarbeitenden und Lehrpersonen",
        "els": [
            ("circle", "k", dict(cx=8.5, cy=7.8, r=3), "s"),
            ("path", "k", dict(d="M3 19.5c.6-3.4 2.8-5.4 5.5-5.4 1.4 0 2.6.5 3.6 1.5"), "s"),
            ("rect", "base", dict(x=13, y=12.5, width=8, height=8, rx=1.6), "s"),
            ("path", "base", dict(d="M13 15.5h8"), "s"),
            ("circle", "sx", dict(cx=17, cy=18, r=1), "f"),
        ],
    },
    "eduksx-ops": {
        "name": "EduKSX-Ops",
        "meaning": "Bildschirm mit Puls: Leitstand für Instanzen, Versionen und Zustand",
        "els": [
            ("rect", "base", dict(x=2.75, y=4, width=18.5, height=12.5, rx=2), "s"),
            ("path", "base", dict(d="M9 20.5h6M12 16.5v4"), "s"),
            ("path", "k", dict(d="M5.8 11h3l1.6-3.2 2.4 6 1.8-3.8h3.6"), "s"),
            ("circle", "sx", dict(cx=17.9, cy=7, r=0.9), "f"),
        ],
    },
}


# Ergänzung, freigegeben 22.11.2026 durch Markus Keller (#30; Entwurf aus EduKSX-Prototyp tools/seite_bauen.py)
EXTRA_FLOW = {
    "eduksx-flow": {
        "name": "EduKSX-Flow",
        "meaning": "Flussdiagramm: Abläufe mit Entscheidungen planen und verfolgen",
        "els": [
            ("rect", "k", dict(x=8, y=2.5, width=8, height=5, rx=1.5), "s"),
            ("path", "base", dict(d="M12 7.5v2.5"), "s"),
            ("path", "e", dict(d="M12 10l3.2 3.2L12 16.4 8.8 13.2z"), "s"),
            ("path", "base", dict(d="M8.8 13.2H5.5v3.3M15.2 13.2h3.3v3.3"), "s"),
            ("rect", "base", dict(x=2.5, y=16.5, width=6, height=5, rx=1.5), "s"),
            ("rect", "base", dict(x=15.5, y=16.5, width=6, height=5, rx=1.5), "s"),
            ("circle", "sx", dict(cx=18.5, cy=19, r=1), "f"),
        ],
    },
}


# Ergänzung, freigegeben 22.11.2026 durch Markus Keller (#49, Entwurf A «Zeitbalken»)
EXTRA_PLANNER = {
    "eduksx-planner": {
        "name": "EduKSX-Planner",
        "meaning": "Zeitbalken auf einer Achse: Jahresplanung mit Vorhaben und Zeiträumen",
        "els": [
            ("path", "base", dict(d="M4 3.5v16.5h16.5"), "s"),
            ("rect", "k", dict(x=6.5, y=5.5, width=7, height=2.8, rx=1.2), "f"),
            ("rect", "sx", dict(x=10, y=10.2, width=8.5, height=2.8, rx=1.2), "f"),
            ("rect", "e", dict(x=8, y=14.9, width=6, height=2.8, rx=1.2), "f"),
            ("path", "base", dict(d="M16 5.2v3.4"), "s"),
        ],
    },
}


# Ergänzung, freigegeben 22.11.2026 durch Markus Keller (#52; Motive aus dem Artifact «Icon-Set v2», im UI-Stil neu gezeichnet)
EXTRA_NEU = {
    "eduksx-websnapshot": {
        "name": "EduKSX-WebSnapshot",
        "meaning": "Browserfenster mit Objektiv: Webseiten sichern",
        "els": [
            ("rect", "base", dict(x=2.75, y=4, width=18.5, height=16, rx=2.5), "s"),
            ("path", "base", dict(d="M2.75 8.6h18.5"), "s"),
            ("circle", "base", dict(cx=5.6, cy=6.3, r=0.8), "f"),
            ("circle", "base", dict(cx=8.2, cy=6.3, r=0.8), "f"),
            ("circle", "k", dict(cx=12, cy=14.3, r=3.4), "s"),
            ("circle", "sx", dict(cx=12, cy=14.3, r=1.2), "f"),
        ],
    },
    "eduksx-api": {
        "name": "EduKSX-API",
        "meaning": "Klammern mit Daten: Programmierschnittstelle",
        "els": [
            ("path", "base", dict(d="M8 4.5h-.8a2 2 0 0 0-2 2V10l-2 2 2 2v3.5a2 2 0 0 0 2 2H8M16 4.5h.8a2 2 0 0 1 2 2V10l2 2-2 2v3.5a2 2 0 0 1-2 2H16"), "s"),
            ("circle", "k", dict(cx=9, cy=12, r=1.15), "f"),
            ("circle", "sx", dict(cx=12, cy=12, r=1.15), "f"),
            ("circle", "e", dict(cx=15, cy=12, r=1.15), "f"),
        ],
    },
    "eduksx-aiconverter": {
        "name": "EduKSX-AIConverter",
        "meaning": "Gegenläufige Pfeile mit Funken: Inhalte mit KI umwandeln",
        "els": [
            ("path", "base", dict(d="M3.5 7.5h10M10.8 4.6l2.9 2.9-2.9 2.9"), "s"),
            ("path", "base", dict(d="M20.5 16.5h-10M13.2 13.6l-2.9 2.9 2.9 2.9"), "s"),
            ("path", "k", dict(d="M18.6 3.6c.3 1.7 1 2.4 2.7 2.7-1.7.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7Z"), "f"),
            ("circle", "sx", dict(cx=5.2, cy=16.5, r=1.2), "f"),
        ],
    },
    "eduksx-mcp": {
        "name": "EduKSX-MCP",
        "meaning": "Stecker: KI-Werkzeuge anbinden (Model Context Protocol)",
        "els": [
            ("path", "base", dict(d="M9 3v4.2M15 3v4.2"), "s"),
            ("path", "base", dict(d="M6.2 7.2h11.6v3a5.8 5.8 0 0 1-11.6 0Z"), "s"),
            ("path", "k", dict(d="M12 16v5"), "s"),
            ("circle", "sx", dict(cx=12, cy=10.6, r=1.2), "f"),
        ],
    },
    "eduksx-bill": {
        "name": "EduKSX-Bill",
        "meaning": "Beleg mit Summe: Rechnungen stellen und verbuchen",
        "els": [
            ("path", "base", dict(d="M5.5 3h13v17.5l-2.15-1.4-2.2 1.4-2.15-1.4-2.15 1.4-2.2-1.4-2.15 1.4Z"), "s"),
            ("path", "sx", dict(d="M8.8 7.6h6.4M8.8 11h6.4"), "s"),
            ("rect", "k", dict(x=8.8, y=13.8, width=4.4, height=2.6, rx=0.8), "f"),
        ],
    },
    "eduksx-ticket": {
        "name": "EduKSX-Ticket",
        "meaning": "Ticket mit Abriss: Anliegen und Supportfälle",
        "els": [
            ("path", "base", dict(d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5Z"), "s"),
            ("path", "k", dict(d="M14.5 7.2v1.3M14.5 11.35v1.3M14.5 15.5v1.3"), "s"),
            ("circle", "sx", dict(cx=9, cy=12, r=1.6), "f"),
        ],
    },
    "eduksx-booking": {
        "name": "EduKSX-Booking",
        "meaning": "Kalender mit Häkchen: Räume und Geräte reservieren",
        "els": [
            ("rect", "base", dict(x=3.5, y=5, width=17, height=15.5, rx=2.5), "s"),
            ("path", "base", dict(d="M8 3.2v3.4M16 3.2v3.4"), "s"),
            ("path", "sx", dict(d="M4.4 9.5h15.2"), "s"),
            ("path", "k", dict(d="M8.8 14.6l2.2 2.2 4.2-4.2"), "s"),
        ],
    },
    "eduksx-checklist": {
        "name": "EduKSX-Checklist",
        "meaning": "Liste mit Häkchen: Aufgaben abhaken",
        "els": [
            ("path", "k", dict(d="M3.4 6.4l1.6 1.6 3-3M3.4 12.4l1.6 1.6 3-3"), "s"),
            ("rect", "sx", dict(x=3.6, y=16.8, width=3.8, height=3.8, rx=1), "s"),
            ("path", "base", dict(d="M11 6.6h9.5M11 12.6h9.5M11 18.7h9.5"), "s"),
        ],
    },
    "eduksx-absence": {
        "name": "EduKSX-Absence",
        "meaning": "Person mit Minus: Abwesenheiten erfassen",
        "els": [
            ("circle", "base", dict(cx=9, cy=7.8, r=3.6), "s"),
            ("path", "base", dict(d="M3 20.5c.4-3.8 2.8-6 6-6s5.6 2.2 6 6"), "s"),
            ("path", "k", dict(d="M16.2 10.2h5"), "s"),
            ("circle", "sx", dict(cx=18.7, cy=15.6, r=1.1), "f"),
        ],
    },
}


ICONS.update(EXTRA)
ICONS.update(EXTRA_FLOW)
ICONS.update(EXTRA_PLANNER)
ICONS.update(EXTRA_NEU)
DRAFTS = {}  # neue Entwürfe hier eintragen; erscheinen nicht in EduksxIcon


def attrs(d):
    return " ".join(f'{k.replace("_", "-")}="{v}"' for k, v in d.items())


def glyph(els, colors, mono=False, sw=SW):
    out = []
    for tag, role, a, mode in els:
        c = "currentColor" if mono else colors[role]
        if mode == "s":
            style = f'fill="none" stroke="{c}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"'
        else:
            style = f'fill="{c}"'
        out.append(f"<{tag} {attrs(a)} {style}/>")
    return "\n  ".join(out)


def svg(body, vb="0 0 24 24", title=""):
    t = f"<title>{title}</title>\n  " if title else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img">\n  {t}{body}\n</svg>\n'


def tile(els, colors, title, border=False):
    # 48er Kachel, Glyphe 24 → um Faktor 1.25 vergrössert und zentriert (30 px Glyphenfläche)
    s = 1.25
    off = (48 - 24 * s) / 2
    rect = f'<rect width="48" height="48" rx="11" fill="{colors["tile"]}"/>'
    if border:
        rect += '\n  <rect x="0.25" y="0.25" width="47.5" height="47.5" rx="10.75" fill="none" stroke="#222222" stroke-opacity=".1" stroke-width=".5"/>'
    g = glyph(els, colors, sw=SW)
    return svg(f'{rect}\n  <g transform="translate({off} {off}) scale({s})">\n  {g}\n  </g>', "0 0 48 48", title)


def maskable(els, colors, title):
    # Maskable-App-Icon (Web-Manifest «purpose: maskable»): Fläche randlos, Motiv kleiner als bei der Kachel, damit es
    # in der sicheren Zone (Kreis mit 80 % Durchmesser) liegt – Launcher schneiden Kreis, Tropfen oder Quadrat aus.
    s = 1.1
    off = (48 - 24 * s) / 2
    rect = f'<rect width="48" height="48" fill="{colors["tile"]}"/>'
    g = glyph(els, colors, sw=SW)
    return svg(f'{rect}\n  <g transform="translate({off:g} {off:g}) scale({s})">\n  {g}\n  </g>', "0 0 48 48", title)


def main(out="dist"):
    os.makedirs(f"{out}/svg", exist_ok=True)
    for slug, ic in {**ICONS, **DRAFTS}.items():
        t = ic["name"]
        files = {
            f"{slug}.svg": svg(glyph(ic["els"], LIGHT, mono=True), title=t),
            f"{slug}-color.svg": svg(glyph(ic["els"], LIGHT), title=t),
            f"{slug}-tile-dark.svg": tile(ic["els"], DARK, t),
            f"{slug}-tile-light.svg": tile(ic["els"], LIGHT, t, border=True),
            f"{slug}-maskable-dark.svg": maskable(ic["els"], DARK, t),
            f"{slug}-maskable-light.svg": maskable(ic["els"], LIGHT, t),
        }
        for fn, content in files.items():
            with open(f"{out}/svg/{fn}", "w") as f:
                f.write(content)
    print(f"{len(ICONS)} Icons + {len(DRAFTS)} Entwürfe × 6 Varianten → {out}/svg")




def write_ts(path):
    """Schreibt die Icon-Daten als TypeScript für den Baustein EduksxIcon."""
    lines = [
        "// AUTOMATISCH ERZEUGT aus icons/build.py – nicht von Hand ändern.",
        "// Neu erzeugen: python3 icons/build.py --ts src/components/eduksx-icons.data.ts",
        "",
        'export type EduksxIconRole = "base" | "e" | "k" | "sx";',
        "export type EduksxIconElement = {",
        '  tag: "path" | "rect" | "circle";',
        "  role: EduksxIconRole;",
        "  fill: boolean;",
        "  attrs: Record<string, string | number>;",
        "};",
        "export type EduksxIconDef = { name: string; meaning: string; elements: EduksxIconElement[] };",
        "",
        "export const eduksxIcons = {",
    ]
    for slug, ic in ICONS.items():
        key = "eduksx" if slug == "eduksx" else slug.replace("eduksx-", "")
        lines.append(f"  {json.dumps(key)}: {{")
        lines.append(f"    name: {json.dumps(ic['name'], ensure_ascii=False)},")
        lines.append(f"    meaning: {json.dumps(ic['meaning'], ensure_ascii=False)},")
        lines.append("    elements: [")
        for tag, role, a, mode in ic["els"]:
            lines.append(
                f"      {{ tag: {json.dumps(tag)}, role: {json.dumps(role)}, fill: {'true' if mode == 'f' else 'false'}, attrs: {json.dumps(a)} }},"
            )
        lines.append("    ],")
        lines.append("  },")
    lines.append("} satisfies Record<string, EduksxIconDef>;")
    lines.append("")
    lines.append("export type EduksxIconName = keyof typeof eduksxIcons;")
    with open(path, "w") as f:
        f.write("\n".join(lines) + "\n")
    print(f"TypeScript → {path}")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args[:1] == ["--ts"]:
        write_ts(args[1])
    else:
        main(*(args[:1] or [os.path.dirname(os.path.abspath(__file__))]))

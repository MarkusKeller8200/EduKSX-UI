// AUTOMATISCH ERZEUGT aus icons/build.py – nicht von Hand ändern.
// Neu erzeugen: python3 icons/build.py --ts src/components/eduksx-icons.data.ts

export type EduksxIconRole = "base" | "e" | "k" | "sx";
export type EduksxIconElement = {
  tag: "path" | "rect" | "circle";
  role: EduksxIconRole;
  fill: boolean;
  attrs: Record<string, string | number>;
};
export type EduksxIconDef = { name: string; meaning: string; elements: EduksxIconElement[] };

export const eduksxIcons = {
  "eduksx": {
    name: "EduKSX",
    meaning: "Modulare Produktfamilie – E · du · K · SX als vier Bausteine",
    elements: [
      { tag: "rect", role: "e", fill: true, attrs: {"x": 3.5, "y": 3.5, "width": 7.5, "height": 7.5, "rx": 2} },
      { tag: "rect", role: "base", fill: false, attrs: {"x": 13, "y": 3.5, "width": 7.5, "height": 7.5, "rx": 2} },
      { tag: "rect", role: "k", fill: true, attrs: {"x": 3.5, "y": 13, "width": 7.5, "height": 7.5, "rx": 2} },
      { tag: "rect", role: "sx", fill: true, attrs: {"x": 13, "y": 13, "width": 7.5, "height": 7.5, "rx": 2} },
    ],
  },
  "glossary": {
    name: "EduKSX-Glossary",
    meaning: "Offenes Buch mit A–Z: Begriffe und Abkürzungen",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M12 6.6C9.8 5.1 6.9 4.7 3 5.2v13.3c3.9-.5 6.8-.1 9 1.4 2.2-1.5 5.1-1.9 9-1.4V5.2c-3.9-.5-6.8-.1-9 1.4Z"} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M12 6.6v13.3"} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M5.6 15.2 7.4 9.6l1.8 5.6M6.2 13.4h2.4"} },
      { tag: "path", role: "sx", fill: false, attrs: {"d": "M14.6 9.8h3.2l-3.2 5.2h3.2"} },
    ],
  },
  "codex": {
    name: "EduKSX-Codex",
    meaning: "Waage: systematische Rechtssammlungen",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M12 5v14.5M8 19.5h8M4 8h16"} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 12, "cy": 4.4, "r": 1.4} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M6.5 8 4 13.6M6.5 8 9 13.6M17.5 8 15 13.6M17.5 8 20 13.6"} },
      { tag: "path", role: "k", fill: true, attrs: {"d": "M3.2 13.6h6.6a3.3 3.3 0 0 1-6.6 0ZM14.2 13.6h6.6a3.3 3.3 0 0 1-6.6 0Z"} },
    ],
  },
  "core": {
    name: "EduKSX-Core",
    meaning: "Kern: gemeinsame Basis aller Module",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M12 2.9 19.9 7.45v9.1L12 21.1l-7.9-4.55v-9.1Z"} },
      { tag: "path", role: "e", fill: false, attrs: {"d": "M12 7.6 15.8 9.8v4.4L12 16.4l-3.8-2.2V9.8Z"} },
      { tag: "circle", role: "k", fill: true, attrs: {"cx": 12, "cy": 12, "r": 1.9} },
    ],
  },
  "ident": {
    name: "EduKSX-Ident",
    meaning: "Ausweis: Identitäten und Konten",
    elements: [
      { tag: "rect", role: "base", fill: false, attrs: {"x": 2.75, "y": 5, "width": 18.5, "height": 14, "rx": 2.5} },
      { tag: "circle", role: "k", fill: false, attrs: {"cx": 8.5, "cy": 10.4, "r": 2} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M5.4 16.2c.6-1.7 1.8-2.6 3.1-2.6s2.5.9 3.1 2.6"} },
      { tag: "path", role: "sx", fill: false, attrs: {"d": "M14.3 10.2h4M14.3 13.8h2.8"} },
    ],
  },
  "shop": {
    name: "EduKSX-Shop",
    meaning: "Tasche: Lehrmittel bestellen",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M4.6 8.4h14.8l-1.1 11.1a1.6 1.6 0 0 1-1.6 1.5H7.3a1.6 1.6 0 0 1-1.6-1.5Z"} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M8.8 8.4V7a3.2 3.2 0 0 1 6.4 0v1.4"} },
      { tag: "path", role: "sx", fill: false, attrs: {"d": "M9.2 13.6l1.9 1.9 3.7-3.8"} },
    ],
  },
  "licence": {
    name: "EduKSX-Licence",
    meaning: "Schlüssel: Lizenzen verwalten und zuweisen",
    elements: [
      { tag: "circle", role: "k", fill: false, attrs: {"cx": 7.4, "cy": 12, "r": 4.6} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 7.4, "cy": 12, "r": 1.5} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M12 12h9.2M18.6 12v3.6M15.6 12v2.6"} },
    ],
  },
  "portal": {
    name: "EduKSX-Portal",
    meaning: "Torbogen: zentraler Einstieg",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M6 20V10.2a6 6 0 0 1 12 0V20M3.5 20h17"} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M8.6 15.2h6.2M12.4 12.8l2.4 2.4-2.4 2.4"} },
    ],
  },
  "connect": {
    name: "EduKSX-Connect",
    meaning: "Verbundene Knoten: Schnittstellen zu Umsystemen",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M8.3 7.4h7.4M7.2 9.1l3.4 6.3M16.8 9.1l-3.4 6.3"} },
      { tag: "circle", role: "e", fill: true, attrs: {"cx": 5.8, "cy": 7.2, "r": 2.6} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 18.2, "cy": 7.2, "r": 2.6} },
      { tag: "circle", role: "k", fill: true, attrs: {"cx": 12, "cy": 17.8, "r": 2.6} },
    ],
  },
  "services": {
    name: "EduKSX-Services",
    meaning: "Zahnrad: eigenständige digitale Dienste",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M9.36 5.62 L10.59 5.25 L10.79 2.88 L13.21 2.88 L13.41 5.25 L14.64 5.63 L15.78 6.23 L17.59 4.70 L19.30 6.41 L17.77 8.22 L18.38 9.36 L18.75 10.59 L21.12 10.79 L21.12 13.21 L18.75 13.41 L18.37 14.64 L17.77 15.78 L19.30 17.59 L17.59 19.30 L15.78 17.77 L14.64 18.38 L13.41 18.75 L13.21 21.12 L10.79 21.12 L10.59 18.75 L9.36 18.37 L8.22 17.77 L6.41 19.30 L4.70 17.59 L6.23 15.78 L5.62 14.64 L5.25 13.41 L2.88 13.21 L2.88 10.79 L5.25 10.59 L5.63 9.36 L6.23 8.22 L4.70 6.41 L6.41 4.70 L8.22 6.23Z"} },
      { tag: "circle", role: "k", fill: true, attrs: {"cx": 12, "cy": 12, "r": 2.7} },
    ],
  },
  "sign": {
    name: "EduKSX-Sign",
    meaning: "Feder und Unterschrift: digital unterschreiben",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M7.8 16.2 8.9 11.6 16.6 3.9a1.8 1.8 0 0 1 2.5 0l1 1a1.8 1.8 0 0 1 0 2.5l-7.7 7.7Z"} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M14.9 5.6l3.5 3.5"} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M3.2 20.2c1.3-1.6 2.6-1.6 3.6 0s2.3 1.6 3.6 0"} },
      { tag: "path", role: "sx", fill: false, attrs: {"d": "M13.6 20.2h7.2"} },
    ],
  },
  "time": {
    name: "EduKSX-Time",
    meaning: "Uhr: Zeit erfassen und planen",
    elements: [
      { tag: "circle", role: "base", fill: false, attrs: {"cx": 12, "cy": 12, "r": 8.8} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M12 7v5l3.4 2.1"} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 12, "cy": 12, "r": 1.1} },
    ],
  },
  "intranet": {
    name: "EduKSX-Intranet",
    meaning: "Haus mit Bausteinen: interne Plattform, die Module und Wissen zusammenbringt",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M3.5 10.5 12 3.8l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19Z"} },
      { tag: "rect", role: "k", fill: true, attrs: {"x": 8, "y": 11, "width": 3.4, "height": 3.4, "rx": 0.8} },
      { tag: "rect", role: "sx", fill: true, attrs: {"x": 12.6, "y": 11, "width": 3.4, "height": 3.4, "rx": 0.8} },
      { tag: "rect", role: "e", fill: true, attrs: {"x": 8, "y": 15.6, "width": 3.4, "height": 3.4, "rx": 0.8} },
      { tag: "rect", role: "base", fill: true, attrs: {"x": 12.6, "y": 15.6, "width": 3.4, "height": 3.4, "rx": 0.8} },
    ],
  },
  "timetable": {
    name: "EduKSX-Timetable",
    meaning: "Raster mit Kalenderkopf: Stundenpläne für Klassen, Lehrpersonen und Räume",
    elements: [
      { tag: "rect", role: "base", fill: false, attrs: {"x": 3.5, "y": 5, "width": 17, "height": 15.5, "rx": 2.5} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M8 3.2v3.4M16 3.2v3.4M9.2 9.5v11M14.8 9.5v11M3.5 15h17"} },
      { tag: "path", role: "sx", fill: false, attrs: {"d": "M4.4 9.5h15.2"} },
      { tag: "rect", role: "k", fill: true, attrs: {"x": 10.4, "y": 10.7, "width": 3.2, "height": 3.1, "rx": 0.6} },
    ],
  },
  "staffing": {
    name: "EduKSX-Staffing",
    meaning: "Person mit Kalender: Einsatzplanung von Mitarbeitenden und Lehrpersonen",
    elements: [
      { tag: "circle", role: "k", fill: false, attrs: {"cx": 8.5, "cy": 7.8, "r": 3} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M3 19.5c.6-3.4 2.8-5.4 5.5-5.4 1.4 0 2.6.5 3.6 1.5"} },
      { tag: "rect", role: "base", fill: false, attrs: {"x": 13, "y": 12.5, "width": 8, "height": 8, "rx": 1.6} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M13 15.5h8"} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 17, "cy": 18, "r": 1} },
    ],
  },
  "ops": {
    name: "EduKSX-Ops",
    meaning: "Bildschirm mit Puls: Leitstand für Instanzen, Versionen und Zustand",
    elements: [
      { tag: "rect", role: "base", fill: false, attrs: {"x": 2.75, "y": 4, "width": 18.5, "height": 12.5, "rx": 2} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M9 20.5h6M12 16.5v4"} },
      { tag: "path", role: "k", fill: false, attrs: {"d": "M5.8 11h3l1.6-3.2 2.4 6 1.8-3.8h3.6"} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 17.9, "cy": 7, "r": 0.9} },
    ],
  },
  "flow": {
    name: "EduKSX-Flow",
    meaning: "Flussdiagramm: Abläufe mit Entscheidungen planen und verfolgen",
    elements: [
      { tag: "rect", role: "k", fill: false, attrs: {"x": 8, "y": 2.5, "width": 8, "height": 5, "rx": 1.5} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M12 7.5v2.5"} },
      { tag: "path", role: "e", fill: false, attrs: {"d": "M12 10l3.2 3.2L12 16.4 8.8 13.2z"} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M8.8 13.2H5.5v3.3M15.2 13.2h3.3v3.3"} },
      { tag: "rect", role: "base", fill: false, attrs: {"x": 2.5, "y": 16.5, "width": 6, "height": 5, "rx": 1.5} },
      { tag: "rect", role: "base", fill: false, attrs: {"x": 15.5, "y": 16.5, "width": 6, "height": 5, "rx": 1.5} },
      { tag: "circle", role: "sx", fill: true, attrs: {"cx": 18.5, "cy": 19, "r": 1} },
    ],
  },
  "planner": {
    name: "EduKSX-Planner",
    meaning: "Zeitbalken auf einer Achse: Jahresplanung mit Vorhaben und Zeiträumen",
    elements: [
      { tag: "path", role: "base", fill: false, attrs: {"d": "M4 3.5v16.5h16.5"} },
      { tag: "rect", role: "k", fill: true, attrs: {"x": 6.5, "y": 5.5, "width": 7, "height": 2.8, "rx": 1.2} },
      { tag: "rect", role: "sx", fill: true, attrs: {"x": 10, "y": 10.2, "width": 8.5, "height": 2.8, "rx": 1.2} },
      { tag: "rect", role: "e", fill: true, attrs: {"x": 8, "y": 14.9, "width": 6, "height": 2.8, "rx": 1.2} },
      { tag: "path", role: "base", fill: false, attrs: {"d": "M16 5.2v3.4"} },
    ],
  },
} satisfies Record<string, EduksxIconDef>;

export type EduksxIconName = keyof typeof eduksxIcons;

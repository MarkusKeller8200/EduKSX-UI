// Quelltext als Text laden (Vite `?raw`), z. B. für Prüfungen auf feste Farben.
declare module '*?raw' {
    const text: string;
    export default text;
}

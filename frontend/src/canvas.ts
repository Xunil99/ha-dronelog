/** Ohne Canvas-Kontext (z. B. in Tests mit happy-dom) werden Diagramme und Heatmap übersprungen. */
export function canvasSupported(): boolean {
  try {
    return document.createElement("canvas").getContext("2d") !== null;
  } catch {
    return false;
  }
}

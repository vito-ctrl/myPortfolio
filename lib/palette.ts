export const OPEN_PALETTE_EVENT = 'open-command-palette';

export function openCommandPalette() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
  }
}

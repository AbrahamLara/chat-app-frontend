// Themes as string enums since the app state theme should only be either of these string values.
export enum THEME {
  DARK = 'Dark',
  LIGHT = 'Light'
}

// The application theme background color hexes.
export const ThemeHexes = {
  [THEME.DARK]: '#121212',
  [THEME.LIGHT]: '#fff'
};

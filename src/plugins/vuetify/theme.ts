import colors from 'vuetify/lib/util/colors';
import { ThemeOptions } from 'vuetify/types/services/theme';

const customThemeConfig: ThemeOptions = {
  themes: {
    dark: {
      accent: colors.blue.accent1,
    },
    light: {
      accent: colors.blue.accent1,
    },
  },
};

export default customThemeConfig;

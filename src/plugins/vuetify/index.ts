import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import customThemeConfig from '@/plugins/vuetify/theme';

Vue.use(Vuetify);

export default new Vuetify({
  theme: customThemeConfig,
});

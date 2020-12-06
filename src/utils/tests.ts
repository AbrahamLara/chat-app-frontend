/**
 * Resolves a vuetify warning of not being able to locate a data-app attribute on an element because vuetify
 * components should be wrapped by a v-app component.
 *
 * Ex: [Vuetify] Unable to locate target [data-app] in "v-menu"
 */
function resolveVuetifyAppDataWarning() {
  const app = document.createElement('div');
  app.setAttribute('data-app', 'true');
  document.body.append(app);
}

export { resolveVuetifyAppDataWarning };

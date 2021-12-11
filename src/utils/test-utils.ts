import VueRouter, { RouteConfig } from 'vue-router';
import Vuex from 'vuex';
import { AppState } from '@/store/store-states';
import appMutations from '@/store/mutations';
import appActions from '@/store/actions';
import appModules from '@/store/modules';
import { DEFAULT_ROOT_STATE } from '@/store';
import { FormAlertMessage } from '@/utils/alerts-utils';
import { createLocalVue } from '@vue/test-utils';
import VueCookies from 'vue-cookies';
import Vue from 'vue';
import Vuetify from 'vuetify';

/**
 * Describes the available options for setting up a local vue instance for a test file.
 */
interface LocalVueSetupOptions {
  /**
   * Indicates that vuex plugin should be used.
   */
  useVuex?: boolean;

  /**
   * Indicates that vuetify plugin should be used.
   */
  useVuetify?: boolean;

  /**
   * Indicates that vue cookies plugin should be used.
   */
  useVueCookies?: boolean;

  /**
   * Indicates that vue router plugin should be used.
   */
  useVueRouter?: boolean;
}

/**
 * Resolves a vuetify warning of not being able to locate a data-app attribute on an element because vuetify
 * components should be wrapped by a v-app component.
 *
 * ```
 * Ex: [Vuetify] Unable to locate target [data-app] in "v-menu"
 * ```
 */
export function resolveVuetifyAppDataWarning() {
  const app = document.createElement('div');
  app.setAttribute('data-app', 'true');
  document.body.append(app);
}

/**
 * Create a Vuex store instance for testing.
 *
 * TODO: Reuse to create store in main.ts.
 *
 * @param vx The Vuex value
 * @param customState A state object that modifies the default state
 */
export function createStore(
  vx: typeof Vuex,
  customState: Partial<AppState> = {}
) {
  const mutations = appMutations;
  const actions = appActions;
  const modules = appModules;

  return new vx.Store({
    state: { ...DEFAULT_ROOT_STATE, ...customState },
    actions,
    mutations,
    modules,
  });
}

/**
 * Creates a VueRouter instance for testing.
 *
 * TODO: Reuse to create router in main.ts.
 *
 * @param vr The VueRouter value
 * @param routes The route config. If not provided, then a default config is provided.
 */
export function createRouter(
  vr: typeof VueRouter,
  routes: RouteConfig[] = [{ path: '/' }]
) {
  return new vr({ routes, mode: 'history' });
}

/**
 * Creates a form error message for testing.
 */
export function createFormAlertMessage(
  field: string,
  message: string
): FormAlertMessage {
  return { field, message };
}

/**
 * Creates a local vue instance with options to use any vue plugins.
 */
export function createLocalVueInstance(options: LocalVueSetupOptions = {}) {
  const { useVueCookies, useVuex, useVuetify, useVueRouter } = options;
  const localVue = createLocalVue();

  if (useVueCookies) {
    Vue.use(VueCookies);
  }
  if (useVuex) {
    localVue.use(Vuex);
  }
  if (useVuetify) {
    Vue.use(Vuetify);
  }
  if (useVueRouter) {
    localVue.use(VueRouter);
  }

  return localVue;
}

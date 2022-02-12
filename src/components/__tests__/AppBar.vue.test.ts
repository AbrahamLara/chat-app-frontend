import { mount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import Vuetify from 'vuetify';
import AppBar from '@/components/AppBar.vue';
import { AppState } from '@/store/store-states';
import { namespaceAuth } from '@/store/modules';
import { ADD_ERROR, ADD_SUCCESS } from '@/store/constants/alerts-constants';
import { createAlertMessage } from '@/utils/alerts-utils';
import VueRouter from 'vue-router';
import { THEME } from '@/utils/theme-utils';
import {
  createLocalVueInstance,
  createRouter,
  createStore,
} from '@/utils/test-utils';
import { SET_IS_AUTHENTICATED } from '@/store/constants/auth-constants';

const localVue = createLocalVueInstance({
  useVuetify: true,
  useVueRouter: true,
  useVuex: true,
  useVueCookies: true,
});

async function expectAlertsToClearFor(
  btnId: string,
  wrapper: Wrapper<any>,
  store: Store<AppState>
) {
  const state = store.state as AppState;

  // Make sure there are no alerts by default.
  expect(state.auth?.alerts.errors.length).toEqual(0);
  expect(state.auth?.alerts.successes.length).toEqual(0);

  // Add error and success alerts to state.
  store.commit(namespaceAuth(ADD_ERROR), createAlertMessage('error1'));
  store.commit(namespaceAuth(ADD_SUCCESS), createAlertMessage('success1'));

  // Expect state to contain both newly added alerts.
  expect(state.auth?.alerts.errors.length).toEqual(1);
  expect(state.auth?.alerts.successes.length).toEqual(1);

  // Manually trigger the click event for the provided btn id.
  await wrapper.find(`#${btnId}`).trigger('click');

  // Expect there to be no alerts after triggering the click.
  expect(state.auth?.alerts.errors.length).toEqual(0);
  expect(state.auth?.alerts.successes.length).toEqual(0);
}

describe('AppBar.vue', () => {
  let wrapper: Wrapper<any>;
  let store: Store<AppState>;
  let router: VueRouter;

  beforeEach(() => {
    const vuetify = new Vuetify();
    store = createStore(Vuex);
    router = createRouter(VueRouter);

    wrapper = mount(AppBar, {
      localVue,
      vuetify,
      store,
      router,
    });
  });

  it('does not render dark mode classes', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders dark mode classes', async () => {
    await wrapper.setProps({ theme: THEME.DARK });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders the logout button', async () => {
    await wrapper.setProps({ authenticated: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('clears alerts when clicking sign in button', async () => {
    await expectAlertsToClearFor('signin-btn', wrapper, store);
  });

  it('clears alerts when clicking sign up button', async () => {
    await expectAlertsToClearFor('signup-btn', wrapper, store);
  });

  it('un-authenticates the user when clicking logout', async () => {
    // Make sure user is not authenticated by default.
    expect(store.state.auth?.isAuthenticated).toBeFalsy();

    // Manually set user as authenticated.
    store.commit(namespaceAuth(SET_IS_AUTHENTICATED), true);

    // Expect the isAuthenticated state to be true.
    expect(store.state.auth?.isAuthenticated).toBeTruthy();

    // Set the current route to '/test'
    await router.push('/test');

    // Create a cookie.
    await wrapper.vm.$cookies.set('token', 'cookie');

    // Make sure the cookie exists.
    const cookie1 = await wrapper.vm.$cookies.get('token');
    expect(cookie1).not.toBeNull();

    // Make the logout button visible by passing authenticated as true.
    await wrapper.setProps({ authenticated: true });

    // Manually trigger the logout button.
    await wrapper.find('#logout-btn').trigger('click');

    const cookie2 = await wrapper.vm.$cookies.get('token');
    // Expect the cookie to be null since it was removed after clicking logout.
    expect(cookie2).toBeNull();

    // Expect the user to no longer be authenticated after clicking logout.
    expect(store.state.auth?.isAuthenticated).toBeFalsy();

    // Expect the current route to be '/' after clicking logout.
    expect(router.currentRoute.path).toBe('/');
  });
});

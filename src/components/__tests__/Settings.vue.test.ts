/* eslint-disable @typescript-eslint/no-empty-function */
import Vuex, { Store } from 'vuex';
import Vuetify from 'vuetify';
import Settings from '@/components/Settings.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { createStore, resolveVuetifyAppDataWarning } from '@/utils/test-utils';
import { RootState } from '@/store/store-states';
import { THEME } from '@/utils/theme-utils';
import Vue from 'vue';

resolveVuetifyAppDataWarning();

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuetify);

describe('Settings.vue', () => {
  let wrapper: Wrapper<any>;
  let store: Store<RootState>;

  beforeEach(() => {
    const vuetify = new Vuetify();
    store = createStore(Vuex);

    wrapper = mount(Settings, {
      localVue,
      vuetify,
      store,
    });
  });

  it('shows menu when button is clicked', async () => {
    // The menu should not be shown.
    expect(wrapper.vm.showMenu).toBeFalsy();
    // Find the button and click it to show the menu.
    await wrapper.find('#settings-btn').trigger('click');
    await wrapper.vm.$nextTick();
    // The menu should be shown now.
    expect(wrapper.vm.showMenu).toBeTruthy();
  });

  it('attaches and removes system theme listener correctly', () => {
    // Expect light theme as default.
    expect(store.state.theme).toBe(THEME.LIGHT);

    let callback: any = null;
    // Create a mock MediaQueryList object with event listener methods.
    const mockMediaQueryList = {
      // Set to true so that when the system listener is added, the theme is set to dark.
      matches: true,
      addEventListener: (_: any, cb: any) => (callback = cb),
      // Remove callback function on call.
      removeEventListener: () => (callback = null),
    } as any;

    // Mock window.matchMedia.
    window.matchMedia = jest.fn(() => mockMediaQueryList);

    wrapper.vm.addSystemThemeListener();

    wrapper.vm.$nextTick();

    // Expect theme to be dark after adding system listener.
    expect(store.state.theme).toBe(THEME.DARK);
    // Pass is mock event that will cause theme to be set to light
    callback({ matches: false });

    wrapper.vm.$nextTick();

    // Expect theme to be light after firing callback function.
    expect(store.state.theme).toBe(THEME.LIGHT);

    wrapper.vm.removeSystemThemeListener();
    // Expect callback function to be removed.
    expect(callback).toBeNull();
  });

  it('updates theme when calling handleTheme', async () => {
    // The default theme should be light.
    expect(store.state.theme).toEqual(THEME.LIGHT);
    // Update the theme state to dark.
    const expectedTheme1 = THEME.DARK;
    await wrapper.vm.handleTheme(expectedTheme1);
    // The theme state should now be dark.
    expect(store.state.theme).toEqual(expectedTheme1);
    // Update the theme state back to light.
    const expectedTheme2 = THEME.LIGHT;
    await wrapper.vm.handleTheme(expectedTheme2);
    // The theme state should now be light.
    expect(store.state.theme).toEqual(expectedTheme2);
  });

  it('adding system theme listener auto updates theme state and removing the listener no longer updates it', async () => {
    // Expect default theme should be light.
    expect(store.state.theme).toEqual(THEME.LIGHT);

    // Create a mock MediaQueryList object.
    const mockMediaQueryList = {
      // Mock the system theme being dark by setting 'matches' to true.
      matches: true,
      onchange: () => {},
    } as any;
    // Mock addEventListener that will add an onchange method to update app theme.
    mockMediaQueryList.addEventListener = jest.fn(() => {
      mockMediaQueryList.onchange = (theme: THEME) =>
        wrapper.vm.updateAppTheme(theme);
    });
    // Mock removeEventListener that will reset the onchange method to no longer listen to system theme changes.
    mockMediaQueryList.removeEventListener = jest.fn(
      () => (mockMediaQueryList.onchange = () => {})
    );
    // Mock window.matchMedia.
    window.matchMedia = jest.fn(() => mockMediaQueryList);

    // Mock system theme changing to dark mode.
    mockMediaQueryList.onchange(THEME.DARK);
    // Expect theme not to have updated since we haven't added the listener.
    expect(store.state.theme).not.toBe(THEME.DARK);

    await wrapper.vm.addSystemThemeListener();
    // Expect theme state to have been updated to dark.
    expect(store.state.theme).toEqual(THEME.DARK);

    // Mock system theme changing to light mode.
    mockMediaQueryList.onchange(THEME.LIGHT);
    // Expect theme to have updated since we added the listener.
    expect(store.state.theme).toEqual(THEME.LIGHT);

    await wrapper.vm.removeSystemThemeListener();
    // Expect matchMedia property to be null as a result of removing the listener.
    expect(wrapper.vm.matchMedia).toBeNull();

    // Mock system theme changing back to dark mode.
    mockMediaQueryList.onchange(THEME.DARK);
    // The theme state shouldn't have updated since we removed the listener.
    expect(store.state.theme).toEqual(THEME.LIGHT);
  });
});

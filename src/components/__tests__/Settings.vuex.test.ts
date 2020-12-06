/* eslint-disable @typescript-eslint/no-empty-function */
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import appActions from '@/store/actions';
import Settings from '@/components/Settings.vue';
import appMutations from '@/store/mutations';
import { THEME } from '@/utils/theme';
import { AppState } from '@/store/states';

const localVue = createLocalVue();
localVue.use(Vuex);

Vue.use(Vuetify);

describe('Settings.vuex.test.ts', () => {
  let wrapper: Wrapper<any>;
  let store: Store<AppState>;

  beforeEach(() => {
    const mutations = appMutations;
    const actions = appActions;
    store = new Vuex.Store({
      // Default store state.
      state: { theme: THEME.LIGHT },
      mutations,
      actions
    });
    wrapper = shallowMount(Settings, { localVue, store });
  });

  it('dispatches "setTheme" when calling setAppTheme', async () => {
    // The default theme should be light.
    expect(store.state.theme).toEqual(THEME.LIGHT);
    // Update the theme state to dark.
    const expectedTheme1 = THEME.DARK;
    await wrapper.vm.updateAppTheme(expectedTheme1);
    // The theme state should now be dark.
    expect(store.state.theme).toEqual(expectedTheme1);
    // Update the theme state back to light.
    const expectedTheme2 = THEME.LIGHT;
    await wrapper.vm.updateAppTheme(expectedTheme2);
    // The theme state should now be light.
    expect(store.state.theme).toEqual(expectedTheme2);
  });

  it('updates theme state when calling handleTheme', async () => {
    // The default theme should be light.
    expect(store.state.theme).toEqual(THEME.LIGHT);
    // Update the theme state to dark.
    const expectedTheme1 = THEME.DARK;
    wrapper.vm.handleTheme(expectedTheme1);
    await wrapper.vm.$nextTick();
    // The theme state should now be dark.
    expect(store.state.theme).toEqual(expectedTheme1);
    // Update the theme state back to light.
    const expectedTheme2 = THEME.LIGHT;
    wrapper.vm.handleTheme(expectedTheme2);
    await wrapper.vm.$nextTick();
    // The theme state should now be light.
    expect(store.state.theme).toEqual(expectedTheme2);
  });

  it('adding system theme listener auto updates theme state and removing the listener no longer updates it', () => {
    // The default theme should be light.
    expect(store.state.theme).toEqual(THEME.LIGHT);
    // The matchMedia class property should be null by default.
    expect(wrapper.vm.matchMedia).toBeNull();
    // Create a mock MediaQueryList object.
    const mockMediaQueryList = {
      // Mock the system theme being dark by setting 'matches' to true.
      matches: true,
      onchange: () => {}
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
    // The theme state shouldn't have updated since we haven't added the listener.
    expect(store.state.theme).toEqual(THEME.LIGHT);

    wrapper.vm.addSystemThemeListener();
    // window.matchMedia should've been called.
    expect(window.matchMedia).toHaveBeenCalled();
    // The method to add an event listener to the match media object should've been called.
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalled();
    // The theme state should have been updated to dark since calling addSystemThemeListener also determines if the
    // system theme is dark mode and we mocked the media query matching.
    expect(store.state.theme).toEqual(THEME.DARK);
    // The matchMedia class property should no longer be null.
    expect(wrapper.vm.matchMedia).not.toBeNull();

    // Mock system theme changing to light mode.
    mockMediaQueryList.onchange(THEME.LIGHT);
    // The theme state should have updated since we added the listener.
    expect(store.state.theme).toEqual(THEME.LIGHT);

    wrapper.vm.removeSystemThemeListener();
    // The method to remove an event listener from the match media object should've been called.
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled();
    // The matchMedia class property should be null as a result of removing the listener.
    expect(wrapper.vm.matchMedia).toBeNull();

    // Mock system theme changing back to dark mode.
    mockMediaQueryList.onchange(THEME.DARK);
    // The theme state shouldn't have updated since we removed the listener.
    expect(store.state.theme).toEqual(THEME.LIGHT);
  });
});

import Vue from 'vue';
import Vuetify from 'vuetify';
import Settings from '@/components/Settings.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { resolveVuetifyAppDataWarning } from '@/utils/tests';

resolveVuetifyAppDataWarning();

const localVue = createLocalVue();
Vue.use(Vuetify);

describe('Settings.vue.test.ts', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const vuetify = new Vuetify();
    wrapper = mount(Settings, { localVue, vuetify });
  });

  it('renders settings button correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows menu when button is clicked', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const mockClickEvent = { stopPropagation: () => {} };
    jest.spyOn(mockClickEvent, 'stopPropagation');
    // Find the menu component.
    const menu = wrapper.find('.v-menu');
    expect(menu.exists()).toBeTruthy();
    // The menu should not be shown.
    expect(wrapper.vm.showMenu).toBeFalsy();
    // Find the button and click it to show the menu.
    const button = menu.find('.v-btn');
    button.vm.$emit('click', mockClickEvent);
    await wrapper.vm.$nextTick();
    // The click event calls stopPropagation.
    expect(mockClickEvent.stopPropagation).toHaveBeenCalledTimes(1);
    // The menu element should've updated to reflect it being shown.
    const updatedMenu = wrapper.find('.v-menu');
    expect(updatedMenu.element).toMatchSnapshot();
    // The menu should be shown now.
    expect(wrapper.vm.showMenu).toBeTruthy();
  });

  it('attaches and removes system theme listener correctly', () => {
    // Mock the handleSystemTheme method since we aren't testing vuex.
    wrapper.vm.updateAppTheme = jest.fn();
    // The matchMedia class property should be null by default.
    expect(wrapper.vm.matchMedia).toBeNull();
    // Create a mock MediaQueryList object with event listener methods.
    const mockMediaQueryList = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as any;
    // Mock window.matchMedia.
    window.matchMedia = jest.fn(() => mockMediaQueryList);

    wrapper.vm.addSystemThemeListener();
    // window.matchMedia should've been called.
    expect(window.matchMedia).toHaveBeenCalled();
    // The method to add an event listener to the match media object should've been called.
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalled();
    // The updateAppTheme method should've been called as a result of calling addSystemThemeListener.
    expect(wrapper.vm.updateAppTheme).toHaveBeenCalled();
    // The matchMedia class property should no longer be null.
    expect(wrapper.vm.matchMedia).not.toBeNull();

    wrapper.vm.removeSystemThemeListener();
    // The method to remove an event listener from the match media object should've been called.
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled();
    // The matchMedia class property should be null as a result of removing the listener.
    expect(wrapper.vm.matchMedia).toBeNull();
  });
});

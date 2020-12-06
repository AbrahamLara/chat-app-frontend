import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import AppBar from '@/components/AppBar.vue';
import { createLocalVue, mount, ThisTypedMountOptions } from '@vue/test-utils';
import { THEME } from '@/utils/theme';

const localVue = createLocalVue();
Vue.use(VueRouter);
Vue.use(Vuetify);

describe('AppBar.vue.test.ts', () => {
  const mountFunction = function(options: ThisTypedMountOptions<any>) {
    const vuetify = new Vuetify();
    const router = new VueRouter();
    return mount(AppBar, {
      localVue,
      vuetify,
      router,
      ...options
    });
  };

  it('renders light mode correctly', () => {
    const wrapper = mountFunction({ propsData: { theme: THEME.LIGHT } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders dark mode correctly', () => {
    const wrapper = mountFunction({ propsData: { theme: THEME.DARK } });
    expect(wrapper.element).toMatchSnapshot();
  });
});

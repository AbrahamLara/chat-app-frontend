import Vue from 'vue';
import Vuetify from 'vuetify';
import Splash from '@/views/Splash.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';

const localVue = createLocalVue();
Vue.use(Vuetify);

describe('Splash.vue', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const vuetify = new Vuetify();

    wrapper = mount(Splash, { localVue, vuetify });
  });

  it('renders splash view correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('contains about view', () => {
    expect(wrapper.find('.about-container').exists()).toBeTruthy();
  });
});

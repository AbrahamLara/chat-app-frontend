import Vuetify from 'vuetify';
import Splash from '@/views/SplashPage.vue';
import { mount, Wrapper } from '@vue/test-utils';
import { createLocalVueInstance } from '@/utils/test-utils';

const localVue = createLocalVueInstance({ useVuetify: true });

describe('SplashPage.vue', () => {
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

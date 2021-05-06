import About from '../About.vue';
import { createLocalVue, mount } from '@vue/test-utils';

const localVue = createLocalVue();

describe('About.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(About, { localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

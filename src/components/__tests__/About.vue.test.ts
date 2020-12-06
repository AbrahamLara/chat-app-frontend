import About from '../About.vue';
import { createLocalVue, mount } from '@vue/test-utils';

const localVue = createLocalVue();

describe('About.vue.test.ts', () => {
  it('renders correctly', () => {
    expect(mount(About, { localVue })).toMatchSnapshot();
  });
});

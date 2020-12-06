import { mount } from '@vue/test-utils';
import NotFound from '@/views/NotFound.vue';

describe('NotFound.vue.test.ts', () => {
  it('renders not found view correctly', () => {
    expect(mount(NotFound).element).toMatchSnapshot();
  });
});

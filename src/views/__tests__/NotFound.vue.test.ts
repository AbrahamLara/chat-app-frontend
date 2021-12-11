import { mount } from '@vue/test-utils';
import NotFound from '@/views/NotFoundPage.vue';

describe('NotFoundPage.vue', () => {
  it('renders not found view correctly', () => {
    expect(mount(NotFound).element).toMatchSnapshot();
  });
});

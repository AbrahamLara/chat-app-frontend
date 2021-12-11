import { mount, Wrapper } from '@vue/test-utils';
import Vuetify from 'vuetify';
import RegexRulesTester from '@/components/RegexRulesTester.vue';
import { PASSWORD_REGEX_RULES } from '@/utils/auth-utils';
import { createLocalVueInstance } from '@/utils/test-utils';

const localVue = createLocalVueInstance({ useVuetify: true });

describe('RegexRulesTester.vue', () => {
  let wrapper: Wrapper<any>;

  beforeAll(() => {
    const vuetify = new Vuetify();

    wrapper = mount(RegexRulesTester, {
      localVue,
      vuetify,
      propsData: { rules: PASSWORD_REGEX_RULES, text: 'Testing1!' },
    });
  });

  it('handles valid password', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

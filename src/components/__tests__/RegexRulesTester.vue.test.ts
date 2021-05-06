import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import RegexRulesTester from '@/components/RegexRulesTester.vue';
import { PASSWORD_REGEX_RULES } from '@/utils/auth-utils';

const localVue = createLocalVue();
Vue.use(Vuetify);

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

import { mount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';
import AuthPage from '@/views/AuthPage.vue';
import {
  createLocalVueInstance,
  createRouter,
  createStore,
} from '@/utils/test-utils';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

const localVue = createLocalVueInstance({
  useVueRouter: true,
  useVuetify: true,
});

describe('AuthPage.vue', () => {
  let wrapper: Wrapper<any>;
  let router: VueRouter;

  beforeAll(() => {
    const vuetify = new Vuetify();
    const store = createStore(Vuex);

    router = createRouter(VueRouter, [
      {
        path: '/auth',
        component: AuthPage,
        children: [
          {
            path: 'signup',
            component: SignUp,
          },
          {
            path: 'signin',
            component: SignIn,
          },
        ],
      },
    ]);
    wrapper = mount(AuthPage, {
      localVue,
      router,
      store,
      vuetify,
    });
  });

  it('renders SignIn page', async () => {
    // Expect SignIn component to not be rendered.
    expect(wrapper.findComponent(SignIn).exists()).toBeFalsy();
    // Update current path to sign in page.
    await wrapper.vm.$router.push('/auth/signin');
    await wrapper.vm.$nextTick();
    // Expect SignIn component to be rendered.
    expect(wrapper.findComponent(SignIn).exists()).toBeTruthy();
  });

  it('renders SignUp page', async () => {
    // Expect SignIn component to not be rendered.
    expect(wrapper.findComponent(SignUp).exists()).toBeFalsy();
    // Update current path to sign in page.
    await wrapper.vm.$router.push('/auth/signup');
    await wrapper.vm.$nextTick();
    // Expect SignIn component to be rendered.
    expect(wrapper.findComponent(SignUp).exists()).toBeTruthy();
  });
});

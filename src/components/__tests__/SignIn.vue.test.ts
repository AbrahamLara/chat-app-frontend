import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import SignIn from '@/components/SignIn.vue';
import mockFetch from '../../../__mocks__/cross-fetch';
import { AppState } from '@/store/store-states';
import { mount, Wrapper } from '@vue/test-utils';
import {
  createFormAlertMessage,
  createLocalVueInstance,
  createRouter,
  createStore,
} from '@/utils/test-utils';
import { namespaceAuth } from '@/store/modules';
import { SET_ERRORS } from '@/store/constants/alerts-constants';
import { createAlertMessage } from '@/utils/alerts-utils';

jest.mock('cross-fetch');

const MOCK_TOKEN = '1234567890';
const MOCK_SIGN_IN_PATH = '/mock/auth/signin';

const localVue = createLocalVueInstance({
  useVuex: true,
  useVuetify: true,
  useVueRouter: true,
  useVueCookies: true,
});

describe('SignIn.vue', () => {
  const BANNER_ERROR = 'banner error';

  let wrapper: Wrapper<any>;
  let store: Store<AppState>;
  let router: VueRouter;

  beforeEach(() => {
    const vuetify = new Vuetify();
    store = createStore(Vuex);
    router = createRouter(VueRouter);

    wrapper = mount(SignIn, {
      localVue,
      vuetify,
      store,
      router,
    });
  });

  it('unsubscribes from listener when destroyed', async () => {
    // Spy on the unsubscribe model attribute.
    const spy = jest.spyOn(wrapper.vm, 'unsubscribe');
    // Destroy the component to unsubscribe from listener.
    await wrapper.vm.$destroy();
    // Expect unsubscribe to have been called after destroying the component.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('handles error alerts based on interaction', async () => {
    // Expect no login errors in the form.
    expect(wrapper.html()).toMatchSnapshot();

    // Add errors to state.
    store.commit(namespaceAuth(SET_ERRORS), {
      errors: [
        createAlertMessage(BANNER_ERROR),
        createFormAlertMessage('email', 'email error'),
        createFormAlertMessage('password', 'password error'),
      ],
    });

    await wrapper.vm.$nextTick();

    // Expect login errors in the form after errors were added to state.
    expect(wrapper.html()).toMatchSnapshot();

    // Spy on the resetLoginError method.
    const spy = jest.spyOn(wrapper.vm, 'resetLoginError');

    // Trigger keydown event for both login inputs.
    await wrapper.find('#email-input').trigger('keydown');
    await wrapper.find('#password-input').trigger('keydown');

    // Expect the spy to have been called twice since we triggered keydown for both inputs.
    expect(spy).toBeCalledTimes(2);
    spy.mockRestore();

    // Expect no input errors in the form after the user has focused on each input with an error.
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles authentication process upon successful login', async () => {
    // Mock login api fetch JSON response to provide a token.
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: MOCK_TOKEN }),
      })
    );

    // Set the current path to sign in path
    await router.push(MOCK_SIGN_IN_PATH);

    // Expect the alert banner to be hidden.
    expect(wrapper.find('#alert-banner').exists()).toBeFalsy();

    // Add banner error.
    store.commit(namespaceAuth(SET_ERRORS), {
      errors: [createAlertMessage(BANNER_ERROR)],
    });

    await wrapper.vm.$nextTick();

    // Expect updated alert banner appear since there was a general error message.
    expect(wrapper.find('#alert-banner').exists()).toBeTruthy();
    // Set isValidLoginForm to true to enabled the submit button.
    await wrapper.setData({ isValidLoginForm: true });

    await wrapper.find('#submit-btn').trigger('click');

    // We have to wait at least two ticks to complete updates.
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Expect the alert banner to be hidden since submit button was clicked.
    expect(wrapper.find('#alert-banner').exists()).toBeFalsy();
    // Expect the token cookie to have been set.
    expect(await wrapper.vm.$cookies.get('token')).toEqual(MOCK_TOKEN);
    // Expect current path to have changed.
    expect(wrapper.vm.$route.path).toBe('/chat');

    jest.clearAllMocks();
  });
});

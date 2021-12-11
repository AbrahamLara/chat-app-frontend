import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import { mount, Wrapper } from '@vue/test-utils';
import { RootState } from '@/store/store-states';
import {
  createFormAlertMessage,
  createLocalVueInstance,
  createRouter,
  createStore,
} from '@/utils/test-utils';
import SignUp from '@/components/SignUp.vue';
import { namespaceAlerts } from '@/store/modules';
import { SET_ERRORS } from '@/store/constants/alerts-constants';
import { createAlertMessage } from '@/utils/alerts-utils';
import mockFetch from '../../../__mocks__/cross-fetch';
import { DEFAULT_REGISTER_FORM_FIELDS } from '@/utils/auth-utils';

jest.mock('cross-fetch');

const MOCK_SIGN_UP_PATH = '/mock/auth/signup';

const localVue = createLocalVueInstance({
  useVuetify: true,
  useVuex: true,
  useVueRouter: true,
});

describe('SignUp.vue', () => {
  const BANNER_ERROR = 'banner error';

  let wrapper: Wrapper<any>;
  let store: Store<RootState>;
  let router: VueRouter;

  beforeEach(() => {
    const vuetify = new Vuetify();
    store = createStore(Vuex);
    router = createRouter(VueRouter);

    wrapper = mount(SignUp, {
      localVue,
      vuetify,
      store,
      router,
    });
  });

  it('unsubscribes from listener when destroyed', async () => {
    // Mount the component.
    await wrapper.vm.$mount();
    // Spy on the unsubscribe model attribute.
    const spy = jest.spyOn(wrapper.vm, 'unsubscribe');
    // Destroy the component to unsubscribe from listener.
    await wrapper.vm.$destroy();
    // Expect unsubscribe to have been called after destroying the component.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('validates confirmation password as the user types', async () => {
    const DEFAULT_REGISTER_VALUES = {
      registerValues: {
        ...DEFAULT_REGISTER_FORM_FIELDS,
        password: 'testing',
        confPassword: 'test',
      },
    };

    // Give password and confirmation password inputs values.
    await wrapper.setData(DEFAULT_REGISTER_VALUES);
    // Expect no confirmation password error.
    expect(wrapper.vm.registerErrors.confPassword).toBeFalsy();

    await wrapper.find('#conf-password-input').trigger('keyup');
    // Expect a confirmation password error.
    expect(wrapper.vm.registerErrors.confPassword).toBeTruthy();

    // Update confirmation password to math password input value.
    DEFAULT_REGISTER_VALUES.registerValues.confPassword = 'testing';
    // Update register values with new confirmation password value.
    await wrapper.setData(DEFAULT_REGISTER_VALUES);

    await wrapper.find('#conf-password-input').trigger('keyup');
    // Expect no confirmation password error.
    expect(wrapper.vm.registerErrors.confPassword).toBeFalsy();
  });

  it('handles error alerts based on interaction', async () => {
    // Mount the component in order to set the listener.
    await wrapper.vm.$mount();

    // Expect no register errors in the form.
    expect(wrapper.html()).toMatchSnapshot();

    // Add errors to state.
    store.commit(namespaceAlerts(SET_ERRORS), {
      errors: [
        createAlertMessage(BANNER_ERROR),
        createFormAlertMessage('name', 'name error'),
        createFormAlertMessage('email', 'email error'),
        createFormAlertMessage('password', 'password error'),
        createFormAlertMessage('confPassword', 'conf password error'),
      ],
    });

    await wrapper.vm.$nextTick();

    // Expect register errors in the form after errors were added to state.
    expect(wrapper.html()).toMatchSnapshot();

    // Spy on the resetRegisterError method.
    const spy = jest.spyOn(wrapper.vm, 'resetRegisterError');

    // Trigger keydown event for both login inputs.
    await wrapper.find('#name-input').trigger('keydown');
    await wrapper.find('#email-input').trigger('keydown');
    await wrapper.find('#password-input').trigger('keydown');
    await wrapper.find('#conf-password-input').trigger('keydown');

    // Expect the spy to have been called 4 times since we triggered keydown for each input.
    expect(spy).toBeCalledTimes(4);
    spy.mockRestore();

    // Expect no input errors in the form after the user has focused on each input with an error.
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles register process upon clicking submit', async () => {
    // Mock register api fetch JSON response to provide a success message.
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'success message' }),
      })
    );

    // Mount the component in order to set the listener.
    await wrapper.vm.$mount();

    // Set the current path to sign in path
    await router.push(MOCK_SIGN_UP_PATH);

    // Expect the alert banner to be hidden.
    expect(wrapper.find('#alert-banner.error').exists()).toBeFalsy();

    // Add banner error.
    store.commit(namespaceAlerts(SET_ERRORS), {
      errors: [createAlertMessage(BANNER_ERROR)],
    });

    await wrapper.vm.$nextTick();

    // Expect updated alert banner appear since there was a general error message.
    expect(wrapper.find('#alert-banner.error').exists()).toBeTruthy();
    // Set isValidRegisterForm to true to enabled the submit button.
    await wrapper.setData({ isValidRegisterForm: true });

    await wrapper.find('#submit-btn').trigger('click');

    // We have to wait at least two ticks to complete updates.
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Expect the alert banner to be hidden since submit button was clicked.
    expect(wrapper.find('#alert-banner.success').exists()).toBeTruthy();
    // Expect the submit button to be disabled after a successful register.
    expect(wrapper.find('#submit-btn.v-btn--disabled').exists()).toBeTruthy();

    jest.clearAllMocks();
  });
});

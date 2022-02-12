import {
  createLocalVueInstance,
  createRouter,
  createStore,
  resolveVuetifyAppDataWarning,
} from '@/utils/test-utils';
import { mount, Wrapper } from '@vue/test-utils';
import Vuetify from 'vuetify';
import ChatPage from '@/views/ChatPage.vue';
import Vuex, { Store } from 'vuex';
import { AppState } from '@/store/store-states';
import VueRouter from 'vue-router';
import CreateChatDialog from '@/components/CreateDialog.vue';
import mockFetch from '../../../__mocks__/cross-fetch';

jest.mock('cross-fetch');

const MOCK_CHATS = [
  {
    name: 'A chat title',
    message: {
      author: 'Roy Speer',
      text: 'message',
      createAt: new Date().getUTCDate(),
    },
  },
  {
    name: 'Hello, world!',
    message: {
      author: 'Mark Wood',
      text: 'message',
      createAt: new Date().getUTCDate(),
    },
  },
  {
    name: 'Some club',
    message: {
      author: 'Nicholas Gonzalez',
      text: 'message',
      createAt: new Date().getUTCDate(),
    },
  },
];

const localVue = createLocalVueInstance({
  useVuetify: true,
  useVueRouter: true,
  useVueCookies: true,
  useVuex: true,
});

resolveVuetifyAppDataWarning();

describe('ChatPage.vue', () => {
  let wrapper: Wrapper<any>;
  let store: Store<AppState>;
  let router: VueRouter;

  beforeEach(() => {
    const vuetify = new Vuetify();
    store = createStore(Vuex);

    // Mock fetching the user's chat list before the component mounts.
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ chats: [] }),
      })
    );

    wrapper = mount(ChatPage, {
      localVue,
      vuetify,
      store,
      router,
    });
  });

  it('can render the user chat list', async () => {
    // Wait for the next tick to see updates made after the fetch call on mount.
    await wrapper.vm.$nextTick();

    // Expect the chat list to be empty.
    expect(wrapper.html().includes('No chats to display!')).toEqual(true);

    // Add a mock chats list.
    wrapper.vm.chats = MOCK_CHATS;

    await wrapper.vm.$nextTick();

    // Fetch the user chat items from the dom.
    const userChatItemWrapperArray = wrapper.findAll('.user-chat-item');

    // Expect the dom tp have multiple user chat items rendered.
    expect(userChatItemWrapperArray.length).toBeGreaterThan(0);

    // Expect the rendered chat items to include the correct mock information.
    for (let index = 0; index < userChatItemWrapperArray.length; index++) {
      const userChatItemHTML = userChatItemWrapperArray.at(index).html();
      const mockChat = MOCK_CHATS[index];

      expect(userChatItemHTML.includes(mockChat.name));
      expect(userChatItemHTML.includes(mockChat.message.author));
      expect(userChatItemHTML.includes(mockChat.message.text));
    }
  });

  it('renders the "create chat" dialog when clicking "new chat" button', async () => {
    const createDialogComponent = wrapper.findComponent(CreateChatDialog);

    // Expect the "create chat" dialog component to exist in the page.
    expect(createDialogComponent.exists()).toEqual(true);

    // Expect the dialog card not to exist yet since the buttons hasn't been clicked yet.
    expect(createDialogComponent.find('.create-dialog__card').exists()).toEqual(
      false
    );

    // Click the button to open the dialog.
    await createDialogComponent
      .find('#create-dialog__create-btn')
      .trigger('click');

    await wrapper.vm.$nextTick();

    // Expect the dialog to now exist.
    expect(createDialogComponent.find('.create-dialog__card').exists()).toEqual(
      true
    );
  });
});

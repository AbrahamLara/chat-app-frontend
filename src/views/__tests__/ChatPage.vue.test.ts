import {
  createLocalVueInstance,
  createRouter,
  createStore,
} from '@/utils/test-utils';
import { mount, Wrapper } from '@vue/test-utils';
import Vuetify from 'vuetify';
import ChatPage from '@/views/ChatPage.vue';
import Vuex, { Store } from 'vuex';
import { RootState } from '@/store/store-states';
import VueRouter from 'vue-router';
import UserList from '@/components/UserList.vue';
import { UserItem } from '@/utils/misc-utils';

const localVue = createLocalVueInstance({
  useVuetify: true,
  useVueRouter: true,
  useVueCookies: true,
  useVuex: true,
});

const MOCK_USER_SEARCH_RESULTS: UserItem[] = [
  {
    name: 'User 1',
    timeStamp: 1636416075544,
  },
  {
    name: 'User 2',
    timeStamp: 1636416075544,
  },
  {
    name: 'User 3',
    timeStamp: 1636416075544,
  },
];

describe('ChatPage.vue', () => {
  let wrapper: Wrapper<any>;
  let store: Store<RootState>;
  let router: VueRouter;

  beforeEach(() => {
    const vuetify = new Vuetify();
    store = createStore(Vuex);
    router = createRouter(VueRouter);

    wrapper = mount(ChatPage, {
      localVue,
      vuetify,
      store,
      router,
    });
  });

  it('renders the user search results', async () => {
    // There should only be a message conveying an empty list.
    expect(wrapper.findComponent(UserList).html()).toMatchSnapshot();

    // Mock the page having user search results.
    wrapper.vm.users = MOCK_USER_SEARCH_RESULTS;

    await wrapper.vm.$nextTick();

    // There should now be more 3 results in the list.
    expect(wrapper.findComponent(UserList).html()).toMatchSnapshot();
  });
});

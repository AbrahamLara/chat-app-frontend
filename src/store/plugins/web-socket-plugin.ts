import { Socket } from 'socket.io-client';
import { Commit, Store } from 'vuex';
import { AppState } from '@/store/store-states';
import {
  namespaceAuth,
  namespaceChats,
  namespaceMessages,
} from '@/store/modules';
import {
  EMIT_CHAT_CREATED,
  SET_CHAT,
  SET_CHATS_LIST,
  SET_USER_TYPING,
} from '@/store/constants/chats-constants';
import {
  SET_IS_AUTHENTICATED,
  SET_USER_PROFILE,
} from '@/store/constants/auth-constants';
import { ChatCreatedData, UserChatItem } from '@/utils/chat-utils';
import { UserProfile } from '@/utils/auth-utils';
import {
  SendChatMessageData,
  UserTypingMessageData,
} from '@/utils/message-utils';
import {
  ADD_MESSAGE,
  EMIT_CHAT_UPDATE,
} from '@/store/constants/message-constants';

/**
 * This plugin handles emitting and listening to events that update the user on real-time actions occurring on the
 * page such as users sending/typing messages to the chat.
 */
export default function createWebSocketPlugin(socket: Socket) {
  return (store: Store<AppState>) => {
    store.subscribe((mutation, state) => {
      const { payload } = mutation;
      const { id: currentUserID } = state.auth?.user || {};

      switch (mutation.type) {
        case namespaceAuth(SET_IS_AUTHENTICATED):
          // If the user is unauthenticated, then we should remove all the listeners.
          if (!payload) {
            socket.removeAllListeners();
          }
          break;
        case namespaceAuth(SET_USER_PROFILE):
          // Once we have the user's profile, set a listener that will inform the user they were recently added to a
          // group chat.
          socket.on(
            `user:chat:joined--${(payload as UserProfile).id}`,
            (data: ChatCreatedData) => {
              store.commit(namespaceChats(SET_CHAT), data);
            }
          );
          break;
        case namespaceChats(EMIT_CHAT_CREATED):
          socket.emit('chat:created', payload);
          break;
        case namespaceMessages(EMIT_CHAT_UPDATE):
          socket.emit('chat:update:send', payload);
          break;
        case namespaceChats(SET_CHATS_LIST):
          (payload as UserChatItem[]).forEach(chat => {
            if (currentUserID) {
              setUserChatUpdateListener(
                socket,
                store.commit,
                chat,
                currentUserID
              );
            }
          });
          break;
        case namespaceChats(SET_CHAT):
          if (currentUserID) {
            setUserChatUpdateListener(
              socket,
              store.commit,
              payload,
              currentUserID
            );
          }
          break;
        default:
          // Do nothing.
          break;
      }
    });
  };
}

/**
 * Sets a chat update listener for the provided chat item so that users may know in real-time if users are typing a
 * message or have sent a message to receive.
 */
function setUserChatUpdateListener(
  socket: Socket,
  commit: Commit,
  chat: UserChatItem,
  userID: string
) {
  socket.on(`chat:update:receive--${chat.id}`, data => {
    if (
      'isTyping' in data &&
      (data as UserTypingMessageData).user.id !== userID
    ) {
      commit(namespaceChats(SET_USER_TYPING), data);
    } else if (
      'author' in data &&
      (data as SendChatMessageData).message.author.id !== userID
    ) {
      commit(namespaceMessages(ADD_MESSAGE), data);
    }
  });
}

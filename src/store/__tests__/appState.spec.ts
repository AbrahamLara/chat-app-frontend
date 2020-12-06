import appMutations from '@/store/mutations';
import { AppState } from '@/store/states';
import { SET_THEME } from '@/store/actions';
import { THEME } from '@/utils/theme';

let DEFAULT_APP_STATE: AppState;

async function mockAppAction(
  action: string,
  payload: unknown,
  appState: AppState,
  expectedAppState: AppState
) {
  appMutations[action](appState, payload);
  // The app state should now reflect the new app state.
  expect(appState).toEqual(expectedAppState);
}

describe('AppState', () => {
  beforeEach(() => {
    DEFAULT_APP_STATE = { theme: THEME.LIGHT };
  });

  it('sets app theme to dark mode by mutating state', () => {
    // Set app theme to dark mode by mutating.
    appMutations[SET_THEME](DEFAULT_APP_STATE, THEME.DARK);
    expect(DEFAULT_APP_STATE.theme).toEqual(THEME.DARK);
  });

  it('sets app theme to dark mode through action call', () => {
    // Mock expected app state.
    const expectedAppState = { theme: THEME.DARK };
    // Set app theme to dark mode as an action.
    mockAppAction(SET_THEME, THEME.DARK, DEFAULT_APP_STATE, expectedAppState);
  });
});

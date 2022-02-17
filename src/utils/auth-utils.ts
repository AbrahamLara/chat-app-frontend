import { UserState } from '@/store/store-states';
import { DEFAULT_ALERTS_STATE } from '@/store/modules/alerts-module';
import { cloneObject } from '@/utils/misc-utils';

/**
 * Login form fields definition.
 */
export interface LoginFormFields {
  email: string;
  password: string;
}
export type LoginField = keyof LoginFormFields;

/**
 * Registered form fields definition.
 */
export interface RegisterFormFields extends LoginFormFields {
  name: string;
  /**
   * The confirmation password that should match the value of the password field.
   */
  confPassword: string;
}
export type RegisterFormField = keyof RegisterFormFields;

/**
 * The representation of a regex rule that has passed or not.
 */
export interface RegexRule {
  regex: RegExp;

  /**
   * The rule the represents regex being tested.
   */
  rule: string;

  /**
   * Determines if the regex test passed or not.
   */
  passed?: boolean;
}

export interface UserProfile {
  /**
   * The id of the authenticated user.
   */
  id: string;

  /**
   * The name of the authenticated user.
   */
  name: string;

  /**
   * The email of the authenticated user.
   */
  email: string;
}

/**
 * Password regex also used in the backend.
 * [PASSWORD_REGEX](https://github.com/AbrahamLara/chat-app-backend/blob/6757dd186701f4581f931c957d8bccd7840d4d3d/utils/misc.ts#L22-L41)
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\-_]).{8,}$/;

/**
 * Email regex also used in the backend.
 * [EMAIL_REGEX](https://github.com/AbrahamLara/chat-app-backend/blob/6757dd186701f4581f931c957d8bccd7840d4d3d/utils/misc.ts#L43-L48)
 */
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// The rules for validating the email text field.
export const EMAIL_FORM_RULES = [
  (email: string) => Boolean(email) || 'Email is required',
  (email: string) => EMAIL_REGEX.test(email) || 'Email must be valid.',
];

// The rules for validating the password text field.
export const PASSWORD_FORM_RULES = [
  (password: string) => Boolean(password) || 'Password is required',
  (password: string) =>
    PASSWORD_REGEX.test(password) || 'Password must be valid.',
];

// The rules for validating the password regex.
export const PASSWORD_REGEX_RULES: RegexRule[] = [
  { rule: '8 characters minimum', regex: /.{8,}/ },
  { rule: '1 uppercase character', regex: /[A-Z]/ },
  { rule: '1 lowercase character', regex: /[a-z]/ },
  { rule: '1 number', regex: /[0-9]/ },
  {
    rule: '1 special character: !, @, #, $, %, ^, &, *, -, _',
    regex: /[!@#$%^&*\-_]/,
  },
];

export const DEFAULT_USER_PROFILE = {
  id: '',
  name: '',
  email: '',
};

export const DEFAULT_USER_STATE: UserState = {
  ...cloneObject(DEFAULT_ALERTS_STATE),
  isAuthenticated: false,
  user: DEFAULT_USER_PROFILE,
};

export const DEFAULT_LOGIN_FORM_FIELDS: LoginFormFields = {
  email: '',
  password: '',
};

export const DEFAULT_REGISTER_FORM_FIELDS: RegisterFormFields = {
  name: '',
  email: '',
  password: '',
  confPassword: '',
};

export const INVALID_TOKEN_MESSAGE = 'The provided token is invalid';

/**
 * Determines if the provided object is a message about an invalid token.
 */
export function isInvalidTokenMessage(data: Record<string, string>) {
  return data.message === 'The provided token is invalid';
}

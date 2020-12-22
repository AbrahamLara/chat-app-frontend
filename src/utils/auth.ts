export interface RegexRule {
  regex: RegExp;

  rule: string;

  passed?: boolean;
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
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EMAIL_FORM_RULES = [
  (email: string) => !!email || 'Email is required',
  (email: string) => EMAIL_REGEX.test(email) || 'Email must be valid.',
];

export const PASSWORD_FORM_RULES = [
  (password: string) => !!password || 'Password is required',
  (password: string) =>
    PASSWORD_REGEX.test(password) || 'Password must be valid.',
];

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

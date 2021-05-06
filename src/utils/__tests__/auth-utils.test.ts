import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/auth-utils';

describe('auth-utils.ts', () => {
  it('verifies valid passwords', () => {
    expect(RegExp(PASSWORD_REGEX).test('Testing&34!')).toBeTruthy();
    expect(RegExp(PASSWORD_REGEX).test('CamelCase$1')).toBeTruthy();
    expect(RegExp(PASSWORD_REGEX).test('aaaaaaaa')).toBeFalsy();
    expect(RegExp(PASSWORD_REGEX).test('AAAAAAAAA')).toBeFalsy();
    expect(RegExp(PASSWORD_REGEX).test('1111111!!!!aaaaa')).toBeFalsy();
    expect(RegExp(PASSWORD_REGEX).test('!!!!!Between!!!!')).toBeFalsy();
  });

  it('verifies valid emails', () => {
    expect(RegExp(EMAIL_REGEX).test('abc.def@mail.cc')).toBeTruthy();
    expect(RegExp(EMAIL_REGEX).test('abc.def@mail-archive.com')).toBeTruthy();
    expect(RegExp(EMAIL_REGEX).test('abc.def@mail.c')).toBeFalsy();
    expect(RegExp(EMAIL_REGEX).test('abc.def@mail')).toBeFalsy();
    expect(RegExp(EMAIL_REGEX).test('abc.def@mail..com')).toBeFalsy();
  });
});

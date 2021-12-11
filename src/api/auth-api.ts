import fetch from 'cross-fetch';
import { LoginFormFields, RegisterFormFields } from '@/utils/auth-utils';

const AUTH_API_URL = '/api/auth';

const BASE_FETCH_SETTINGS = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * This function handles making a login request in order to login the user to the platform.
 *
 * @param loginForm login form values.
 */
export async function loginUser(loginForm: LoginFormFields) {
  return fetch(`${AUTH_API_URL}/login`, {
    ...BASE_FETCH_SETTINGS,
    body: JSON.stringify(loginForm),
  });
}

/**
 * This function handles making a register request in order to register the user to the platform.
 *
 * @param registerForm register form values.
 */
export async function registerUser(registerForm: RegisterFormFields) {
  return fetch(`${AUTH_API_URL}/register`, {
    ...BASE_FETCH_SETTINGS,
    body: JSON.stringify(registerForm),
  });
}

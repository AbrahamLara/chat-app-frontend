<template>
  <form-card>
    <v-card-title>Sign In form</v-card-title>
    <v-card-text>
      <v-alert
        id="alert-banner"
        v-if="alertBarOptions.visible"
        :type="alertBarOptions.type"
        border="left"
        dense
      >
        {{ alertBarOptions.message }}
      </v-alert>
      <v-form v-model="isValidLoginForm" class="form-card pa-3">
        <v-text-field
          id="email-input"
          v-model="loginValues.email"
          prepend-inner-icon="mdi-email"
          label="Email"
          aria-required="true"
          type="email"
          autocomplete="email"
          :success="Boolean(loginValues.email)"
          :error-messages="loginErrors.email"
          :rules="emailRules"
          @keydown="loginErrors.email && resetLoginError('email')"
          autofocus
          required
        ></v-text-field>
        <v-text-field
          id="password-input"
          v-model="loginValues.password"
          prepend-inner-icon="mdi-lock"
          label="Password"
          aria-required="true"
          autocomplete="password"
          :success="Boolean(loginValues.password)"
          :error-messages="loginErrors.password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          @keydown="loginErrors.password && resetLoginError('password')"
          required
        ></v-text-field>
        <v-btn
          id="submit-btn"
          color="primary"
          elevation="0"
          :disabled="!isValidLoginForm"
          @click="handleSubmitClick"
          block
          tile
        >
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </form-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { MutationPayload } from 'vuex';
import { Component } from 'vue-property-decorator';
import {
  DEFAULT_LOGIN_FORM_FIELDS,
  EMAIL_FORM_RULES,
  LoginField,
} from '@/utils/auth-utils';
import { Action } from '@/utils/decorators';
import { AUTH_NAMESPACE, namespaceAuth } from '@/store/modules';
import { AppState } from '@/store/store-states';
import {
  DEFAULT_ALERT_BAR_OPTIONS,
  FormAlertMessage,
} from '@/utils/alerts-utils';
import { ADD_ERROR, SET_ERRORS } from '@/store/constants/alerts-constants';
import { getFormCard } from '@/utils/dynamic-imports';
import {
  LOGIN_USER,
  SET_IS_AUTHENTICATED,
} from '@/store/constants/auth-constants';

@Component({
  name: 'SignIn',
  components: { 'form-card': getFormCard },
})
export default class SignIn extends Vue {
  @Action(LOGIN_USER, AUTH_NAMESPACE) private submitLoginForm!: Function;

  /**
   * Rules to determine a valid email input.
   */
  private readonly emailRules = EMAIL_FORM_RULES;

  /**
   * Rules to determine a valid password input.
   */
  private readonly passwordRules = [
    (password: string) => !!password || 'Password is required',
  ];

  /**
   * The values of each form field.
   */
  loginValues = { ...DEFAULT_LOGIN_FORM_FIELDS };

  /**
   * The error messages to display on the form.
   */
  loginErrors = { ...DEFAULT_LOGIN_FORM_FIELDS };

  /**
   * To control the style and content of the alert bar in the form.
   */
  alertBarOptions = { ...DEFAULT_ALERT_BAR_OPTIONS };

  /**
   * Determines if the password field value should be visible.
   */
  showPassword = false;

  /**
   * Determines if the form is valid to submit.
   */
  isValidLoginForm = false;

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  mounted() {
    this.unsubscribe = this.$store.subscribe(this.setStateListener);
  }

  beforeDestroy() {
    this.unsubscribe();
  }

  /**
   * Handles getting alerts set in state and displaying them in the form.
   */
  setStateListener(mutation: MutationPayload, state: AppState) {
    switch (mutation.type) {
      case namespaceAuth(ADD_ERROR):
      case namespaceAuth(SET_ERRORS):
        if (state.auth) {
          state.auth.alerts.errors.forEach(
            ({ field, message }: FormAlertMessage) => {
              if (field) {
                this.loginErrors[field as LoginField] = message;
              } else {
                this.alertBarOptions = {
                  visible: true,
                  type: 'error',
                  message,
                };
              }
            }
          );
        }
        break;
      case namespaceAuth(SET_IS_AUTHENTICATED):
        this.$router.push('/chat');
        break;
      default:
        break;
    }
  }

  /**
   * This function handles submitting the login form values in order to login the user.
   */
  handleSubmitClick() {
    // Reset the alert banner options if it's currently visible.
    if (this.alertBarOptions.visible) {
      this.alertBarOptions = { ...DEFAULT_ALERT_BAR_OPTIONS };
    }

    this.submitLoginForm(this.loginValues);
  }

  /**
   * Resets login error message.
   */
  resetLoginError(type: LoginField) {
    this.loginErrors[type] = '';
  }
}
</script>

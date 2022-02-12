<template>
  <form-card>
    <v-card-title>Sign Up form</v-card-title>
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
      <v-form v-model="isValidRegisterForm" class="form-card pa-3">
        <v-text-field
          id="name-input"
          v-model="registerValues.name"
          prepend-inner-icon="mdi-account"
          label="Full Name"
          aria-required="true"
          type="text"
          autocomplete="name"
          :success="Boolean(registerValues.name)"
          :error-messages="registerErrors.name"
          :rules="nameRules"
          @keydown="registerErrors.name && resetRegisterError('name')"
          autofocus
          required
        ></v-text-field>
        <v-text-field
          id="email-input"
          v-model="registerValues.email"
          prepend-inner-icon="mdi-email"
          label="Email"
          aria-required="true"
          type="email"
          autocomplete="email"
          :success="Boolean(registerValues.email)"
          :error-messages="registerErrors.email"
          :rules="emailRules"
          @keydown="registerErrors.email && resetRegisterError('email')"
          required
        ></v-text-field>
        <v-text-field
          id="password-input"
          v-model="registerValues.password"
          prepend-inner-icon="mdi-lock"
          label="Password"
          aria-required="true"
          autocomplete="new-password"
          :success="Boolean(registerValues.password)"
          :error-messages="registerErrors.password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          @keydown="registerErrors.password && resetRegisterError('password')"
          required
        ></v-text-field>
        <v-expand-transition>
          <regex-rules-tester
            v-show="showPasswordRules"
            :rules="passwordRegexRules"
            :text="registerValues.password"
          ></regex-rules-tester>
        </v-expand-transition>
        <v-text-field
          id="conf-password-input"
          v-model="registerValues.confPassword"
          prepend-inner-icon="mdi-lock"
          label="Confirm password"
          aria-required="true"
          autocomplete="new-password"
          :success="Boolean(registerValues.confPassword)"
          :error-messages="registerErrors.confPassword"
          :type="showPassword ? 'text' : 'password'"
          @blur="handleConfPasswordMatch"
          @keydown="
            registerErrors.confPassword && resetRegisterError('confPassword')
          "
          required
        ></v-text-field>
        <v-btn
          id="submit-btn"
          color="primary"
          block
          elevation="0"
          :disabled="!isValidRegisterForm || disableSubmitBtn"
          tile
          @click="handleSubmitClick"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </form-card>
</template>

<style scoped lang="sass">
@use '../styles/vuetify-vars' as v

//noinspection Stylelint
@media screen and (min-width: map-get(v.$grid-breakpoints, 'md'))
  .auth-form-container
    width: 400px
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {
  DEFAULT_REGISTER_FORM_FIELDS,
  EMAIL_FORM_RULES,
  PASSWORD_FORM_RULES,
  PASSWORD_REGEX,
  PASSWORD_REGEX_RULES,
  RegisterFormField,
} from '@/utils/auth-utils';
import { Action } from '@/utils/decorators';
import {
  DEFAULT_ALERT_BAR_OPTIONS,
  FormAlertMessage,
} from '@/utils/alerts-utils';
import { MutationPayload } from 'vuex';
import { AppState } from '@/store/store-states';
import { AUTH_NAMESPACE, namespaceAuth } from '@/store/modules';
import {
  ADD_ERROR,
  ADD_SUCCESS,
  SET_ERRORS,
} from '@/store/constants/alerts-constants';
import { getFormCard, getRegexRulesTester } from '@/utils/dynamic-imports';
import { REGISTER_USER } from '@/store/constants/auth-constants';

@Component({
  name: 'SignUp',
  components: {
    'regex-rules-tester': getRegexRulesTester,
    'form-card': getFormCard,
  },
})
export default class SignUp extends Vue {
  @Action(REGISTER_USER, AUTH_NAMESPACE) submitRegisterForm!: Function;

  /**
   * Rules to determine a valid name input.
   */
  private readonly nameRules = [
    (name: string) => !!name || 'Please enter your full name.',
  ];

  /**
   * Rules to determine a valid email input.
   */
  private readonly emailRules = EMAIL_FORM_RULES;

  /**
   * Rules to determine a valid password input.
   */
  private readonly passwordRules = PASSWORD_FORM_RULES;

  /**
   * Rules to determine if the confirmation password matches the password input.
   */
  private readonly passwordRegexRules = PASSWORD_REGEX_RULES;

  /**
   * The values of each form field.
   */
  registerValues = { ...DEFAULT_REGISTER_FORM_FIELDS };

  /**
   * The error messages to display on the form.
   */
  registerErrors = { ...DEFAULT_REGISTER_FORM_FIELDS };

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
  isValidRegisterForm = false;

  /**
   * Indicates that the user has not entered a valid password.
   */
  passwordRegexTestFailed = true;

  /**
   * Determines it the submit button should be manually disabled.
   */
  disableSubmitBtn = false;

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  mounted() {
    this.unsubscribe = this.$store.subscribe(this.setAlertsListener);
  }

  beforeDestroy() {
    this.unsubscribe();
  }

  /**
   * Handles getting alerts set in state and displaying them in the form.
   */
  setAlertsListener(mutation: MutationPayload, state: AppState) {
    switch (mutation.type) {
      case namespaceAuth(SET_ERRORS):
      case namespaceAuth(ADD_ERROR):
        if (state.auth) {
          state.auth.alerts.errors.forEach(
            ({ field, message }: FormAlertMessage) => {
              if (field) {
                this.registerErrors[field as RegisterFormField] = message;
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
      case namespaceAuth(ADD_SUCCESS):
        if (state.auth) {
          this.alertBarOptions = {
            visible: true,
            type: 'success',
            // We should only expect 1 success message on this page, so use the latest item in the array.
            message: state.auth.alerts.successes[0].message,
          };
        }

        // Prevent the user from being able to register again. This should force them to visit the login page. This is
        // intentional for this project in order to for users to visit the login page to test. Ideally the user would be
        // logged in after successfully registering.
        this.disableSubmitBtn = true;
        break;
      default:
        break;
    }
  }

  /**
   * Determines if the password rules sheet component should be shown. If the user has not entered a secure password,
   * then the rules will be displayed.
   */
  get showPasswordRules() {
    const password = this.registerValues.password;
    return Boolean(password) && !RegExp(PASSWORD_REGEX).test(password);
  }

  /**
   * Handles when the conf password doesn't match the original.
   */
  handleConfPasswordMatch() {
    const { password, confPassword } = this.registerValues;

    this.registerErrors.confPassword =
      password !== confPassword ? 'Please enter your password again' : '';
  }

  /**
   * This function handles submitting the login form values in order to login the user.
   */
  handleSubmitClick() {
    // Reset the alert bar options if it's currently visible.
    if (this.alertBarOptions.visible) {
      this.alertBarOptions = { ...DEFAULT_ALERT_BAR_OPTIONS };
    }

    this.submitRegisterForm(this.registerValues);
  }

  /**
   * Resets login error message.
   */
  resetRegisterError(type: RegisterFormField) {
    this.registerErrors[type] = '';
  }
}
</script>

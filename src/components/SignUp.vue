<template>
  <form-card>
    <v-card-title>Sign Up form</v-card-title>
    <v-card-text>
      <v-form v-model="validForm" class="form-card pa-3">
        <v-text-field
          autofocus
          v-model="formFields.name"
          :success="!!formFields.name"
          :rules="nameRules"
          prepend-inner-icon="mdi-account"
          label="Full Name"
          aria-required="true"
          type="text"
          autocomplete="name"
          required
        ></v-text-field>
        <v-text-field
          v-model="formFields.email"
          :success="!!formFields.email"
          :rules="emailRules"
          prepend-inner-icon="mdi-email"
          label="Email"
          aria-required="true"
          type="email"
          autocomplete="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="formFields.password"
          :success="!!formFields.password"
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @keyup="handleConfPasswordMatch"
          prepend-inner-icon="mdi-lock"
          label="Password"
          aria-required="true"
          autocomplete="new-password"
          required
        ></v-text-field>
        <v-expand-transition>
          <regex-rules-tester
            v-show="showPasswordRegexRules"
            :rules="passwordRegexRules"
            :text="formFields.password"
          ></regex-rules-tester>
        </v-expand-transition>
        <v-text-field
          v-model="formFields.confPassword"
          :success="!!formFields.confPassword"
          :type="showPassword ? 'text' : 'password'"
          :error="!!confPasswordErrorMsg"
          :error-messages="confPasswordErrorMsg"
          @keyup="handleConfPasswordMatch"
          prepend-inner-icon="mdi-lock"
          label="Confirm password"
          aria-required="true"
          autocomplete="new-password"
          required
        ></v-text-field>
        <v-btn color="primary" block elevation="0" :disabled="!validForm" tile>
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </form-card>
</template>

<style scoped lang="sass">
@import '~vuetify/src/components/VStepper/_variables.scss'

.auth-form-container
  @media screen and (min-width: map-get($grid-breakpoints, 'md'))
    width: 400px
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {
  EMAIL_FORM_RULES,
  PASSWORD_FORM_RULES,
  PASSWORD_REGEX,
  PASSWORD_REGEX_RULES,
} from '@/utils/auth';
import RegexRulesTester from '@/components/RegexRulesTester.vue';
import FormCard from '@/components/FormCard.vue';

@Component({
  name: 'SignUp',
  components: {
    'regex-rules-tester': RegexRulesTester,
    'form-card': FormCard,
  },
})
export default class SignUp extends Vue {
  private readonly nameRules = [
    (name: string) => !!name || 'Please enter your full name.',
  ];

  private readonly emailRules = EMAIL_FORM_RULES;

  private readonly passwordRules = PASSWORD_FORM_RULES;

  private readonly passwordRegexRules = PASSWORD_REGEX_RULES;

  // The values of each form field.
  formFields = {
    name: '',
    email: '',
    password: '',
    confPassword: '',
  };

  // Determines if the password field value should be visible.
  showPassword = false;

  // Determines if the form is valid to submit.
  validForm = false;

  // The conf password error message to show if conf password doesn't match the original.
  confPasswordErrorMsg = '';

  // Indicates that the user has not entered a valid password.
  passwordRegexTestFailed = true;

  /**
   * Determines if the password rules sheet component should be shown. If the user has not entered a secure password,
   * then the rules will be displayed.
   */
  get showPasswordRegexRules() {
    const password = this.formFields.password;
    return !!password && !RegExp(PASSWORD_REGEX).test(password);
  }

  // Handles when the conf password doesn't match the original.
  handleConfPasswordMatch() {
    const { password, confPassword } = this.formFields;

    this.confPasswordErrorMsg =
      password !== confPassword ? 'Please enter your password again' : '';
  }

  // Will navigate the user to the provided route programmatically.
  navigateTo(route: string) {
    this.$router.push(route);
  }
}
</script>

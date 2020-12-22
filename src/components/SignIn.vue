<template>
  <form-card>
    <v-card-title>Sign In form</v-card-title>
    <v-card-text>
      <v-form v-model="validForm" class="form-card pa-3">
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
          prepend-inner-icon="mdi-lock"
          label="Password"
          aria-required="true"
          autocomplete="password"
          required
        ></v-text-field>
        <v-btn color="primary" block elevation="0" :disabled="!validForm" tile>
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </form-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FormCard from '@/components/FormCard';
import { EMAIL_FORM_RULES } from '@/utils/auth';

@Component({
  name: 'SignIn',
  components: { 'form-card': FormCard },
})
export default class SignIn extends Vue {
  private readonly emailRules = EMAIL_FORM_RULES;
  private readonly passwordRules = [
    (password: string) => !!password || 'Password is required',
  ];

  // The values of each form field.
  formFields = {
    email: '',
    password: '',
  };

  // Determines if the password field value should be visible.
  showPassword = false;

  // Determines if the form is valid to submit.
  validForm = false;
}
</script>

<style scoped></style>

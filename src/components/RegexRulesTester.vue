<template>
  <v-sheet>
    <div
      :key="result.rule"
      v-for="result in results"
      :class="result.passed ? 'success--text' : 'error--text'"
    >
      <v-icon :color="result.passed ? 'success' : 'error'">{{
        result.passed ? 'mdi-check-circle' : 'mdi-alert'
      }}</v-icon>
      {{ result.rule }}
    </div>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { RegexRule } from '@/utils/auth-utils';

@Component({ name: 'RegexRulesTester' })
export default class RegexRulesTester extends Vue {
  @Prop({ type: Array }) rules!: RegexRule[];
  @Prop({ type: String, default: '' }) text!: string;

  /**
   * The results of running each test.
   */
  get results() {
    return this.rules.map(rule => ({
      ...rule,
      passed: RegExp(rule.regex).test(this.text),
    }));
  }
}
</script>

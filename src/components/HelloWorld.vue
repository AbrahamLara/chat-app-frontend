<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({ name: 'HelloWorld' })
export default class HelloWorld extends Vue {
  @Prop({ default: 'default message' }) msg!: string;
}
</script>

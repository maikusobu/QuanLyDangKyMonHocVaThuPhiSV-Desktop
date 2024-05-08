<template>
  <Title :term="currentTerm" :year="currentYear"></Title>
</template>

<script setup lang="ts">
import Title from './components/Title.vue';
import { useRegistrationStore } from './stores/registration';

const registrationStore = useRegistrationStore();
const currentTerm = registrationStore.currentTerm.term.toString();
const currentYear =
  (registrationStore.currentTerm.year - 1).toString() +
  '-' +
  registrationStore.currentTerm.year.toString();
</script>

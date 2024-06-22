<template>
  <RouterView />
  <!--  <AddressBar v-if="isDevMode" />-->
</template>

<script setup>
import AddressBar from './components/AddressBar.dev.vue';

const isDevMode = process.env.NODE_ENV === 'development';
</script>

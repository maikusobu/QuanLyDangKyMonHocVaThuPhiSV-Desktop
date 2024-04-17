<template>
  <RouterView />

  <AddressBar v-if="isDevMode" />
</template>

<script setup>
import Login from './views/Login.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
import DashboardLayout from './layouts/DashboardLayout.vue';
import AddressBar from './components/AddressBar.dev.vue';

const isDevMode = process.env.NODE_ENV === 'development';
</script>

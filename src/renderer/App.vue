<template>
  <EmptyLayout v-if="this.$route.meta.layout === 'EmptyLayout'">
    <RouterView />
  </EmptyLayout>
  <DashboardLayout v-else>
    <RouterView />
  </DashboardLayout>
</template>

<script setup>
import EmptyLayout from './layouts/EmptyLayout.vue';
import DashboardLayout from './layouts/DashboardLayout.vue';
</script>

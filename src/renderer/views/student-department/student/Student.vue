<script lang="ts" setup>
import Table from './components/Table.vue';
import FunctionBar from './components/FunctionBar.vue';
import EditModal from './components/EditModal.vue';
import { Suspense } from 'vue';
</script>

<template>
  <FunctionBar />
  <Suspense>
    <Table />
  </Suspense>
  <EditModal />
</template>

<style scoped></style>

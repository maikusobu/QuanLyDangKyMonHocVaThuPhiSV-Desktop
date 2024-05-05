<script lang="ts" setup>
import Table from './components/Table.vue';
import FunctionBar from './components/FunctionBar.vue';
import EditModal from './components/EditModal.vue';
import SkeletonTable from './components/SkeletonTable.vue';
import { Suspense } from 'vue';
</script>

<template>
  <FunctionBar />
  <Suspense>
    <template #default>
      <Table />
    </template>
    <template #fallback>
      <SkeletonTable />
    </template>
  </Suspense>
  <EditModal />
</template>

<style scoped></style>

<template>
  <div class="grow flex flex-col gap-8 items-center p-[40px]">
    <FunctionBar />
    <Table />
    <EditModal />
  </div>
</template>

<script setup>
import FunctionBar from './components/FunctionBar.vue';
import Table from './components/Table.vue';
import EditModal from './components/EditModal.vue';
</script>

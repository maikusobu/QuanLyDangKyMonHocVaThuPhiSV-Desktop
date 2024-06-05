<template>
  <div
    class="border border-red-700 grow flex flex-col gap-8 items-center p-[40px]"
  >
    <FunctionBar />
    <Table />
  </div>
</template>

<script setup>
import FunctionBar from './components/FuncitonBar.vue';
import Table from './components/Table.vue';
</script>

<template>
  <div class="grow flex flex-col gap-8 items-center p-[40px]">
    <FunctionBar />
    <div class="flex h-[calc(100vh-300px)] w-full">
      <MajorList />
      <ProgramItemTable />
    </div>
    <EditProgramItemModal />
  </div>
</template>

<script setup>
import FunctionBar from './components/FunctionBar.vue';
import MajorList from './components/MajorList.vue';
import ProgramItemTable from './components/ProgramItemTable.vue';
import EditProgramItemModal from './components/EditProgramItemModal.vue';
</script>

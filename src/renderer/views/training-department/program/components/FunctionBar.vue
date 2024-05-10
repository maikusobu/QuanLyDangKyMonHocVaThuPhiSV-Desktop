<template>
  <div class="w-full flex items-center justify-between gap-[50px]">
    <AddProgramItemModal />
    <div>
      <span class="font-bold">Ngành học:</span>
      {{ programStore.currentProgram?.major.name }}
    </div>
  </div>
</template>

<script setup>
import AddProgramItemModal from './AddProgramItemModal.vue';
import { useProgramStore } from '../stores/program';

const programStore = useProgramStore();
</script>

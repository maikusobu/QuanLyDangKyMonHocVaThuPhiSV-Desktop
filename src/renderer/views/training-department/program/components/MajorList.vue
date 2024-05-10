<template>
  <div class="overflow-y-scroll w-[250px]">
    <div class="p-4 font-bold text-center">Chương trình học</div>
    <ul>
      <li
        v-for="major in programStore.majors"
        :key="major.id"
        class="p-4 hover:bg-base-grey-300 cursor-pointer w-full"
        :class="{
          'bg-base-grey-300': programStore.currentProgram?.majorId === major.id,
        }"
        @click="() => programStore.getProgramByMajorId(major.id)"
      >
        {{ major.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProgramStore } from '../stores/program.ts';
const programStore = useProgramStore();
programStore.getMajors();
</script>

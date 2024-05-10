<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Mã môn học</th>
          <th>Tên môn học</th>
          <th>Học kì</th>
          <th>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="programItem in programStore.currentProgram?.programItems"
          :key="programItem.id"
          class="hover:!bg-secondary-100"
          @click="() => handleRowClick(programItem)"
        >
          <td>{{ programItem.course?.id }}</td>
          <td>{{ programItem.course?.name }}</td>
          <td>
            {{
              programItem.term === 'first'
                ? 'học kì 1'
                : programStore.term === 'second'
                  ? 'học kì 2'
                  : 'học kì hè'
            }}
          </td>
          <td>{{ programItem.note }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useProgramStore } from '../stores/program';
const programStore = useProgramStore();

programStore.getProgramByMajorId(programStore.majors[0]?.id);

const handleRowClick = (programItem) => {
  programStore.setCurrentProgramItem(programItem);
  document.getElementById('edit_program_item_modal').showModal();
};
</script>

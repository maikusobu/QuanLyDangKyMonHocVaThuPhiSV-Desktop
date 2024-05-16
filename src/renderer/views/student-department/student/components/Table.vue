<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-pin-rows table-zebra">
      <thead>
        <tr>
          <th class="w-[10%] overflow-hidden">MSSV</th>
          <th class="w-[25%] overflow-hidden">Họ và tên</th>
          <th class="w-[15%] overflow-hidden">Giới tính</th>
          <th class="w-[30%] overflow-hidden">Chuyên ngành</th>
          <th class="w-[20%] overflow-hidden">Đối tượng ưu tiên</th>
        </tr>
      </thead>
      <tbody v-if="studentStore.students.length > 0">
        <Row
          v-for="(student, index) in studentStore.students"
          :key="student.id"
          :isLast="index === studentStore.students.length - 1"
          :isLengthOver13="studentStore.students.length > 8"
          :student="student"
          @click="handleRowClick(student)"
        />
      </tbody>
    </table>
    <div
      v-if="studentStore.students.length === 0"
      class="w-[32%] mr-auto ml-auto"
    >
      <img :src="notFound" alt="notfound" class="object-cover" />
    </div>
  </div>
</template>
<script setup>
import { useStudentStore } from '../stores/student';
import Row from './Row.vue';
import notFound from '../../../../../assets/images/9169206.jpg';

const handleRowClick = (student) => {
  studentStore.selectStudent(student);
  document.getElementById('edit_modal_student').showModal();
};
const studentStore = useStudentStore();
</script>
<style scoped>
table {
  table-layout: fixed;
}
</style>

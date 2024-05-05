<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-pin-rows table-zebra">
      <thead>
        <tr>
          <th>MSSV</th>
          <th>Họ và tên</th>
          <th>Giới tính</th>
          <th>Chuyên ngành</th>
          <th>Đối tượng ưu tiên</th>
        </tr>
      </thead>
      <tbody v-if="studentStore.students.length > 0">
        <Row
          v-for="(student, index) in studentStore.students"
          :key="student.id"
          :isLast="index === studentStore.students.length - 1"
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
import Table from '../../../training-department/course/components/Table.vue';
import Row from './Row.vue';
import notFound from '../../../../../assets/images/9169206.jpg';

const handleRowClick = (student) => {
  studentStore.selectStudent(student);
  document.getElementById('edit_modal_student').showModal();
};
const studentStore = useStudentStore();
await studentStore.getPriorities();
await studentStore.getMajors();
await studentStore.getProvince();
</script>
<style scoped></style>

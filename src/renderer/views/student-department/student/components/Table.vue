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
      <tbody>
        <Row
          v-for="(student, index) in studentStore.students"
          :key="student.id"
          :isLast="index === studentStore.students.length - 1"
          :student="student"
          @click="handleRowClick"
        >
        </Row>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useStudentStore } from '../stores/student';
import Table from '../../../training-department/course/components/Table.vue';
import Row from './Row.vue';

const studentStore = useStudentStore();
await studentStore.fetchStudents('');
await studentStore.getPriorities();
await studentStore.getMajors();
await studentStore.getProvince();
const handleRowClick = (student) => {
  studentStore.selectStudent(student);
  document.getElementById('edit_modal_student').showModal();
};
</script>
<style scoped></style>

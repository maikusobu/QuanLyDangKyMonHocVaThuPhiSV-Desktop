<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-zebra">
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
        <tr
          v-for="student in studentStore.students"
          :key="student.id"
          class="hover:!bg-secondary-100 cursor-pointer"
          @click="() => handleRowClick(student)"
        >
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ resolveGender(student.gender) }}</td>
          <td>{{ student.major.name }}</td>
          <td>{{ student.priority.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useStudentStore } from '../stores/student';
import Table from '../../../training-department/course/components/Table.vue';

const studentStore = useStudentStore();
await studentStore.fetchStudents('');
await studentStore.getPriorities();
await studentStore.getMajors();
await studentStore.getProvince();
const handleRowClick = (student) => {
  studentStore.selectStudent(student);
  document.getElementById('edit_modal_student').showModal();
};
const resolveGender = (gender) => {
  return gender === 'male' ? 'Nam' : 'Nữ';
};
</script>
<style scoped></style>

<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Mã môn học</th>
          <th>Tên môn học</th>
          <th>Số tiết</th>
          <th>Khoa</th>
          <th>Loại môn học</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="course in courseStore.courses"
          :key="course.id"
          class="hover:!bg-secondary-100"
          @click="() => handleRowClick(course)"
        >
          <td>{{ course.id }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.numberOfPeriods }}</td>
          <td>{{ course.faculty.name }}</td>
          <td>{{ course.courseType.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useCourseStore } from '../stores/course';
const courseStore = useCourseStore();

courseStore.getCourses();

const handleRowClick = (course) => {
  courseStore.setCurrentCourse(course);
  document.getElementById('edit_course_modal').showModal();
};
</script>

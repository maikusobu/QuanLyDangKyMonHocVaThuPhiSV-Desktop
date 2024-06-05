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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="availableCourseItem in availableCourseStore
            .currentAvailableCourse?.availableCourseItems"
          :key="availableCourseItem.id"
          class="hover:!bg-secondary-100"
        >
          <td>{{ availableCourseItem.course?.id }}</td>
          <td>{{ availableCourseItem.course?.name }}</td>
          <td>
            {{ availableCourseItem.course?.numberOfPeriods }}
          </td>
          <td>{{ availableCourseItem.course?.faculty.name }}</td>
          <td>{{ availableCourseItem.course?.courseType.name }}</td>
          <td>
            <button
              class="btn btn-sm bg-error-text text-base-white hover:bg-delete-button-hover"
              @click="() => handleDelete(availableCourseItem)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useAvailableCourseStore } from '../stores/availableCourse';

const availableCourseStore = useAvailableCourseStore();

availableCourseStore.getAvailableCourseByYearAndTerm();

const handleDelete = async (availableCourseItem) => {
  await availableCourseStore.deleteAvailableCourseItem(
    availableCourseItem.courseId,
    availableCourseItem.availableCourseId
  );
};
</script>

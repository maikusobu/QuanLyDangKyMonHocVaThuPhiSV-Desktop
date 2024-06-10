<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    :disabled="!availableCourseStore.currentAvailableCourse?.available"
    @click="showModal"
  >
    Thêm môn học mở
  </button>

  <dialog id="add_available_course_item_modal" class="modal">
    <div class="modal-box min-w-[900px] w p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Thêm môn học vào chương trình</h1>
      <button class="flex items-center gap-2">
        <img :src="plusCircleIcon" alt="add icon" />
        <p>Nhập từ CSV</p>
      </button>

      <form
        class="overflow-x-auto w-full flex flex-col gap-10"
        @submit.prevent="handleSubmit"
      >
        <div class="flex">
          <img
            :src="searchIcon"
            alt="search icon"
            class="bg-base-silver pl-4 rounded-l"
          />
          <input
            type="search"
            placeholder="Tìm kiếm tên môn học"
            class="input bg-base-silver max-w-[500px] placeholder:text-black focus:border-transparent"
            :value="availableCourseStore.searchQuery"
            @input="availableCourseStore.updateSearchQuery($event.target.value)"
          />
        </div>

        <div class="overflow-x-auto w-full h-[300px]">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    :checked="
                      localFormData.selectedCourseIds.length ===
                      availableCourseStore.courses.length
                    "
                    @change="handleSelectAll"
                  />
                </th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Số tiết</th>
                <th>Khoa</th>
                <th>Loại môn học</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="course in availableCourseStore.courses"
                :key="course.id"
                class="hover:!bg-secondary-100 hover:cursor-pointer"
              >
                <td>
                  <input
                    type="checkbox"
                    name="selectedCourseIds"
                    :value="course.id"
                    v-model="localFormData.selectedCourseIds"
                    :checked="
                      localFormData.selectedCourseIds.includes(course.id)
                    "
                  />
                </td>
                <td>{{ course.id }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.numberOfPeriods }}</td>
                <td>{{ course.faculty.name }}</td>
                <td>{{ course.courseType.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          class="row-start-4 btn w-[200px] bg-secondary-400 text-base-white hover:bg-secondary-300"
        >
          Lưu lại
        </button>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { reactive } from 'vue';
import searchIcon from '../../../../../assets/images/searchIcon.svg';
import plusCircleIcon from '../../../../../assets/images/plusCircleIcon.svg';
import { useAvailableCourseStore } from '../stores/availableCourse.ts';

const availableCourseStore = useAvailableCourseStore();

const handleSelectAll = () => {
  if (
    localFormData.selectedCourseIds.length ===
    availableCourseStore.courses.length
  ) {
    localFormData.selectedCourseIds = [];
  } else {
    localFormData.selectedCourseIds = availableCourseStore.courses.map(
      (course) => course.id
    );
  }
};

const handleCloseModal = () => {
  localFormData.selectedCourseIds = [];
  document.getElementById('add_available_course_item_modal').close();
};

const handleSave = async () => {
  await availableCourseStore.addAvailableCourseItems({
    courses: localFormData.selectedCourseIds,
    availableCourseId:
      availableCourseStore.currentAvailableCourse?.availableCourseId,
  });

  handleCloseModal();
};

const handleSubmit = (event) => {
  event.preventDefault();
  handleSave();
};

const showModal = () => {
  document.getElementById('add_available_course_item_modal').showModal();
};

const localFormData = reactive({
  selectedCourseIds: [],
});
</script>

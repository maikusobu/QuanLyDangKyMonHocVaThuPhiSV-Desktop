<template>
  <dialog id="edit_course_modal" class="modal">
    <div class="modal-box max-w-[900px] p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Chỉnh sửa môn học</h1>
      <button class="flex items-center gap-2">
        <img :src="plusCircleIcon" alt="add icon" />
        <p>Nhập từ CSV</p>
      </button>
      <form class="mt-8 grid grid-cols-2 gap-10" @submit="handleSubmit">
        <label class="flex flex-col col-span-2">
          Tên môn học
          <input
            :value="courseStore.currentCourse?.name"
            name="name"
            type="text"
            class="input input-bordered"
          />
        </label>
        <label class="flex flex-col">
          Số tiết
          <input
            :value="courseStore.currentCourse?.numberOfPeriods"
            name="numberOfPeriods"
            type="number"
            class="input input-bordered"
          />
        </label>
        <label class="flex flex-col">
          Khoa
          <select name="facultyId" class="select select-bordered">
            <option
              v-for="faculty in courseStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
              :selected="faculty.id === courseStore.currentCourse?.facultyId"
            >
              {{ faculty.name }}
            </option>
          </select>
        </label>
        <label class="flex flex-col">
          loại môn học
          <select name="courseTypeId" class="select select-bordered">
            <option
              v-for="courseType in courseStore.courseTypes"
              :key="courseType.id"
              :value="courseType.id"
              :selected="
                courseType.id === courseStore.currentCourse?.courseTypeId
              "
            >
              {{ courseType.name }}
            </option>
          </select>
        </label>

        <button
          class="row-start-4 btn w-[200px] bg-secondary-400 text-base-white hover:bg-secondary-300"
          type="submit"
        >
          Lưu lại
        </button>

        <button
          class="row-start-4 btn w-[200px] bg-error-text text-base-white hover:bg-delete-button-hover"
          @click="handleDelete"
        >
          Xóa
        </button>

        <ul class="row-start-5 text-error-text">
          <li v-for="errorMessage in courseStore.errorMessages">
            {{ errorMessage }}
          </li>
        </ul>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import plusCircleIcon from '../../../../../assets/images/plusCircleIcon.svg';
import { useCourseStore } from '../stores/course';
const courseStore = useCourseStore();

courseStore.getFaculties();
courseStore.getCourseTypes();

const handleCloseModal = () => {
  courseStore.setCurrentCourse(null);
  courseStore.clearErrorMessages();
};

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  courseStore.updateCourse(data);
};

const handleDelete = (e) => {
  courseStore.deleteCourse(courseStore.currentCourse?.id);
  update_modal.close();
};
</script>

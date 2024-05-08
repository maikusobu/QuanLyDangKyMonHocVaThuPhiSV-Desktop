<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_course_modal.showModal()"
  >
    Thêm môn học
  </button>
  <dialog id="create_course_modal" class="modal">
    <div class="modal-box max-w-[900px] p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Thêm môn học</h1>
      <button class="flex items-center gap-2">
        <img :src="plusCircleIcon" alt="add icon" />
        <p>Nhập từ CSV</p>
      </button>
      <form class="mt-8 grid grid-cols-2 gap-10" @submit="handleSubmit">
        <label class="flex flex-col col-span-2">
          Tên môn học
          <input class="input input-bordered" name="name" type="text" />
        </label>
        <label class="flex flex-col">
          Số tiết
          <input
            class="input input-bordered"
            name="numberOfPeriods"
            type="number"
          />
        </label>
        <label class="flex flex-col">
          Khoa
          <select class="select select-bordered" name="facultyId">
            <option
              v-for="faculty in courseStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
            >
              {{ faculty.name }}
            </option>
          </select>
        </label>
        <label class="flex flex-col">
          loại môn học
          <select class="select select-bordered" name="courseTypeId">
            <option
              v-for="courseType in courseStore.courseTypes"
              :key="courseType.id"
              :value="courseType.id"
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
  courseStore.clearErrorMessages();
};
const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  courseStore.addCourse(data);

  e.target.reset();
};
</script>

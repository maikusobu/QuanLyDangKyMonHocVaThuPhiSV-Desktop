<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    @click="showModal"
    :disabled="!availableCourseStore.currentAvailableCourse?.available"
  >
    {{
      availableCourseStore.currentAvailableCourse?.available
        ? 'Khóa danh sách'
        : 'Đã khóa danh sách'
    }}
  </button>

  <dialog id="close_available_course_modal" class="modal">
    <div class="modal-box min-w-[900px] w p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl text-center">
        Xác nhận khóa danh sách môn học mở?
      </h1>

      <div class="w-full flex justify-around mt-10">
        <button
          type="submit"
          class="row-start-4 btn w-[200px] bg-success text-base-white hover:bg-secondary-300"
          @click="handleSave"
        >
          Đồng ý
        </button>

        <button
          class="row-start-4 btn w-[200px] bg-base-grey-200 text-base-white hover:bg-secondary-300"
          @click="handleCloseModal"
        >
          Hủy
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { reactive } from 'vue';
import searchIcon from '../../../../../assets/images/searchIcon.svg';
import plusCircleIcon from '../../../../../assets/images/plusCircleIcon.svg';
import { useAvailableCourseStore } from '../stores/availableCourse';

const availableCourseStore = useAvailableCourseStore();

const handleSave = async () => {
  await availableCourseStore.closeAvailableCourse(
    availableCourseStore.currentAvailableCourse?.availableCourseId
  );

  handleCloseModal();
};

const showModal = () => {
  document.getElementById('close_available_course_modal').showModal();
};

const handleCloseModal = () => {
  document.getElementById('close_available_course_modal').close();
};
</script>

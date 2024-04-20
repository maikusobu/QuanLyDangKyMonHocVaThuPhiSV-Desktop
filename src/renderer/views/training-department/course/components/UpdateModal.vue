<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_modal.showModal()"
  >
    Chỉnh sửa
  </button>
  <dialog id="create_modal" class="modal">
    <div class="modal-box max-w-[900px] p-20">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Chỉnh sửa môn học</h1>
      <button class="flex items-center gap-2">
        <img :src="plusCircleIcon" alt="add icon" />
        <p>Nhập từ CSV</p>
      </button>
      <form class="mt-8 grid grid-cols-2 gap-10">
        <label class="flex flex-col col-span-2">
          Tên môn học
          <input type="text" class="input input-bordered" />
        </label>
        <label class="flex flex-col">
          Số tiết
          <input
            type="number"
            min="0"
            pattern="[0-9]*"
            class="input input-bordered"
          />
        </label>
        <label class="flex flex-col">
          Khoa
          <select class="select select-bordered">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </label>
        <label class="flex flex-col">
          loại môn học
          <select class="select select-bordered">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </label>
        <button
          class="row-start-4 btn w-[200px] bg-secondary-400 text-base-white hover:bg-secondary-300"
          type="submit"
        >
          Lưu lại
        </button>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import plusCircleIcon from '../../../../assets/images/plusCircleIcon.svg';
</script>

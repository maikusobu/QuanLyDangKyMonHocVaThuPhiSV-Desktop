<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_modal.showModal()"
  >
    Thêm môn học
  </button>
  <dialog id="create_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
    </div>
  </dialog>
</template>

<script setup></script>

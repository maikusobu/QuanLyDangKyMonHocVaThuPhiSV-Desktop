<script lang="ts" setup>
import Table from './Table.vue';
import Row from './Row.vue';
</script>

<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_modal_opencourse.showModal()"
  >
    Đăng ký
  </button>
  <dialog id="create_modal_opencourse" class="modal">
    <div class="modal-box min-w-[900px] w p-15">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <form>
        <table class="table table-pin-rows table-zebra mt-4">
          <thead>
            <tr>
              <th></th>
              <th class="w-[10%] overflow-hidden">Mã môn</th>
              <th class="w-[25%] overflow-hidden">Tên môn</th>
              <th class="w-[15%] overflow-hidden">loại</th>
              <th class="w-[30%] overflow-hidden">tín chỉ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input class="checkbox" type="checkbox" />
              </td>
              <td class="w-[10%] overflow-hidden">1</td>
              <td class="w-[25%] overflow-hidden">Khoa hoc</td>
              <td class="w-[15%] overflow-hidden">Lý thuyết</td>
              <td class="w-[30%] overflow-hidden">4</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </dialog>
</template>

<style scoped></style>

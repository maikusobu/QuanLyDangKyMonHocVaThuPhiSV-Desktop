<script lang="ts" setup>
import Row from './Row.vue';
</script>

<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-pin-rows table-zebra">
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
        <tr v-for="index in new Array(12).fill(0)" class="skeleton">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

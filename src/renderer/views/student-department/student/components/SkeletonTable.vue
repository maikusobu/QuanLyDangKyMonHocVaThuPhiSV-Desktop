<script lang="ts" setup></script>

<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-pin-rows table-zebra">
      <thead>
        <tr>
          <th class="w-[10%] overflow-hidden">MSSV</th>
          <th class="w-[25%] overflow-hidden">Họ và tên</th>
          <th class="w-[15%] overflow-hidden">Giới tính</th>
          <th class="w-[30%] overflow-hidden">Chuyên ngành</th>
          <th class="w-[20%] overflow-hidden">Đối tượng ưu tiên</th>
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

<style scoped>
table {
  table-layout: fixed;
}
</style>

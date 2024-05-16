<script setup>
import notFound from '../../../../../assets/images/9169206.jpg';
</script>

<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-pin-rows table-zebra">
      <thead>
        <tr>
          <th class="w-[10%] overflow-hidden">Ma môn</th>
          <th class="w-[25%] overflow-hidden">Tên Môn</th>
          <th class="w-[15%] overflow-hidden">Loại môn</th>
          <th class="w-[30%] overflow-hidden">Số tiết</th>
          <th class="w-[20%] overflow-hidden">Khoa</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <!--    <div-->
    <!--      v-if="studentStore.students.length === 0"-->
    <!--      class="w-[32%] mr-auto ml-auto"-->
    <!--    >-->
    <!--      <img :src="notFound" alt="notfound" class="object-cover" />-->
    <!--    </div>-->
  </div>
</template>

<style scoped></style>

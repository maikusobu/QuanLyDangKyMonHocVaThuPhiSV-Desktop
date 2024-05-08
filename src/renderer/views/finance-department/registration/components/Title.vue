<template>
  <div class="flex justify-between items-center m-5">
    <h1 class="text-2xl font-bold flex-grow">
      Danh sách sinh viên đăng ký học phần
    </h1>
    <div class="flex items-end">
      <p class="text-2xl mr-5">
        Học kỳ: <span class="font-semibold">{{ term }}</span>
      </p>
      <p class="text-2xl">
        Năm học: <span class="font-semibold">{{ year }}</span>
      </p>
    </div>
  </div>
</template>

<style></style>

<script setup>
defineProps({
  term: String,
  year: String,
});
</script>

<script lang="ts" setup>
import ListMajor from './components/ListMajor.vue';
import ListOpenCourse from './components/ListOpenCourse.vue';
import { getTermYear } from '../../../../utils/resolveCurrentTerm';

const currentTerm = getTermYear();
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="center">
      <h1>Đăng ký môn học</h1>
      <div>
        <p>
          Học kỳ hiện tại: <span>{{ currentTerm.term }}</span> - Năm học:
          <span>{{ currentTerm.year }}</span>
        </p>
      </div>
    </div>
    <div
      class="border-accent-content/5 border h-[calc(100vh-300px)] w-full flex"
    >
      <ListMajor />
    </div>
  </div>
</template>

<style scoped></style>

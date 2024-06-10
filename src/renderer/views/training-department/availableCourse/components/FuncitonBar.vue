<template>
  <div class="flex items-center gap-[50px]">
    <label>
      Năm học:
      <select
        class="select select-bordered"
        v-model="availableCourseStore.year"
        @change="availableCourseStore.getAvailableCourseByYearAndTerm"
      >
        <option
          v-for="year in getYears()"
          :key="year"
          :value="year"
          :selected="year === new Date().getFullYear()"
        >
          {{ year }}
        </option>
      </select>
    </label>

    <label>
      Học kì:
      <select
        class="select select-bordered"
        v-model="availableCourseStore.term"
        @change="availableCourseStore.getAvailableCourseByYearAndTerm"
      >
        <option value="first">Học kì 1</option>
        <option value="second">Học kì 2</option>
        <option value="third">Học kì 3</option>
      </select>
    </label>

    <AddAvailableCourseItemModal />

    <CloseAvailableCourseModal />
  </div>
</template>

<script setup>
import { useAvailableCourseStore } from '../stores/availableCourse.ts';
import AddAvailableCourseItemModal from './AddAvailableCourseItemModal.vue';
import CloseAvailableCourseModal from './CloseAvailableCourseModal.vue';

const availableCourseStore = useAvailableCourseStore();

const getYears = () => {
  const years = [];

  const currentYear = new Date().getFullYear();

  for (let i = 4; i >= -1; i--) {
    years.push(currentYear - i);
  }

  return years;
};
</script>

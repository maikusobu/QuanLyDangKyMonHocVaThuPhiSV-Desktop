<template>
  <div class="flex items-center justify-evenly">
    <CreateModal />
    <div class="flex">
      <select v-model="studentStore.search.typeQuery">
        <option value="name">Tên</option>
        <option value="mssv">Mã số sinh viên</option>
      </select>
      <img
        :src="searchIcon"
        alt="search icon"
        class="bg-base-silver pl-4 rounded-l"
      />
      <input
        v-model="studentStore.search.query"
        class="input bg-base-silver max-w-[500px] placeholder:text-black focus:border-transparent"
        placeholder="Tìm kiếm sinh viên"
        type="search"
      />
    </div>
  </div>
</template>

<script setup>
import searchIcon from '../../../../../assets/images/searchIcon.svg';
import CreateModal from './CreateModal.vue';
import { useStudentStore } from '../stores/student';
import { ref, watchEffect, watch } from 'vue';

const studentStore = useStudentStore();

function debounce(fn, delay) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce(async (query) => {
  await studentStore.fetchStudents(query, true);
}, 500);

watchEffect(() => {
  debouncedSearch(studentStore.search.query);
  console.log(studentStore.search.query);
});
watch(
  () => studentStore.search.typeQuery,
  () => {
    studentStore.search.query = '';
  }
);
</script>

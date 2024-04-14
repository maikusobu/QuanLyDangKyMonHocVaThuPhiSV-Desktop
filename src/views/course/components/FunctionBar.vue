<template>
  <div class="flex items-center gap-[50px]">
    <CreateModal />
    <div class="flex">
      <img
        :src="searchIcon"
        alt="search icon"
        class="bg-base-silver pl-4 rounded-l"
      />
      <input
        type="text"
        placeholder="Tìm kiếm mã hoặc tên môn học"
        class="input bg-base-silver max-w-[500px] placeholder:text-black focus:border-transparent"
      />
    </div>
  </div>
</template>

<script setup>
import searchIcon from '../../../assets/images/searchIcon.svg';
import CreateModal from './CreateModal.vue';
</script>

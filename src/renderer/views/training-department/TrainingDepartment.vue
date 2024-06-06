<template>
  <div class="flex overflow-x-scroll">
    <SideBar
      title="phòng đào tạo"
      :routes="[
        { name: 'Bảng điều khiển', path: '/training-department' },
        { name: 'môn học', path: '/training-department/course' },
        { name: 'chương trình học', path: '/training-department/program' },
        { name: 'môn học mở', path: '/training-department/available-course' },
      ]"
    />
    <div class="flex flex-col grow">
      <Topbar />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import SideBar from '../../components/SideBar.vue';
import Topbar from '../../components/TopBar.vue';
</script>

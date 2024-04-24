<template>
  <div class="flex">
    <SideBar
      title="phòng đào tạo"
      :routes="[
        { name: 'bảng điều khiển', path: '/training-department' },
        { name: 'môn học', path: '/training-department/course' },
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

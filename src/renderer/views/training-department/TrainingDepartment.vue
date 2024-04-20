<template>
  <div class="flex">
    <SideBar
      title="phòng đào tạo"
      :routes="[
        { name: 'dashboard', path: '/training-department' },
        { name: 'courses', path: '/training-department/course' },
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

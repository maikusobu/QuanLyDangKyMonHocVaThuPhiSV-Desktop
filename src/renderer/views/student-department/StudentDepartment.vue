<template>
  <div class="flex">
    <SideBar
      :routes="[
        { name: 'bảng điều khiển', path: '/student-department' },
        { name: 'Sinh viên', path: '/student-department/student' },
      ]"
      title="phòng công tác sinh viên"
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

<template>
  <div class="flex">
    <SideBar
      title="phòng kế hoạch tài chính"
      :routes="[
        { name: 'bảng điều khiển', path: '/finance-department' },
        { name: 'đăng ký học phần', path: '/finance-department/registration' },
        { name: 'biên lai học phí', path: '/finance-department/history' },
        { name: 'báo cáo học phí', path: '/finance-department/report' },
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

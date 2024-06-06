<template>
  <div class="flex overflow-x-scroll">
    <SideBar
      :routes="[
        { name: 'Bảng điều khiển', path: '/finance-department' },
        { name: 'Biên lai học phí', path: '/finance-department/payment' },
        { name: 'Báo cáo học phí', path: '/finance-department/report' },
      ]"
      title="phòng kế hoạch tài chính"
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

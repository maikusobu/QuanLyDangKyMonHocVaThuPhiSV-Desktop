<template>
  <div class="flex">
    <SideBar />
    <div class="flex flex-col grow">
      <Topbar />
      <slot />
    </div>
  </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import Topbar from '../components/TopBar.vue';
</script>

<template>
  <nav class="border w-full h-[95px] flex items-center justify-end">
    <div class="flex items-center gap-[43px] mr-[127px]">
      <p>ID: {{ session?.id }}</p>
      <button
        class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
        @click="logout"
      >
        Đăng xuất
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import getSession from '../../utils/getSession';
const router = useRouter();
const session = getSession();

const logout = () => {
  window.electron.store.delete('token');
  router.push('/');
};
</script>

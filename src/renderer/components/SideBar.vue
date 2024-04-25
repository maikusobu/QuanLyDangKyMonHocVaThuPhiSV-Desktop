<template>
  <aside class="h-screen min-w-[241px] w-[241px] bg-primary-400">
    <img :src="uitLogo" alt="logo" class="scale-50" />
    <div class="flex justify-center">
      <p class="text-white font-bold uppercase">{{ title }}</p>
    </div>
    <hr class="my-6" />
    <ul class="px-4">
      <li
        v-for="route in routes"
        :key="route.name"
        class="text-white capitalize flex items-center justify-between px-6 py-3 hover:bg-primary-500 cursor-pointer"
        :class="{
          'bg-secondary-300': router.currentRoute.value.path === route.path,
        }"
        @click="router.push(route.path)"
      >
        {{ route.name }}
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import uitLogo from '../../assets/images/uitLogo.svg';

const router = useRouter();

defineProps({
  title: String,
  routes: [
    {
      name: String,
      path: String,
    },
  ],
});
</script>

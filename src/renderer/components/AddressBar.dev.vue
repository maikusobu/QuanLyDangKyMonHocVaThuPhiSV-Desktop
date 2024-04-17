<template>
  <form :onSubmit="onSubmit" class="absolute bottom-0 left-0 flex">
    <input
      type="text"
      placeholder="tìm url"
      class="input input-xs input-bordered input-info w-full max-w-xs !rounded-none"
      :value="url"
      :onChange="onChange"
    />

    <button class="btn btn-xs btn-outline btn-info !rounded-none" type="submit">
      Tìm
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const url = ref('');
const router = useRouter();

const onChange = (e: Event) => {
  url.value = (e.target as HTMLInputElement).value;
};

const onSubmit = (e: Event) => {
  e.preventDefault();
  router.push(url.value.trim());
  url.value = '';
};
</script>

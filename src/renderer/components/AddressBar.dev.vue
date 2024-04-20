<template>
  <div class="absolute bottom-0 left-0">
    <form :onSubmit="onSubmit" class="flex">
      <input
        type="text"
        placeholder="tìm url"
        class="input input-xs input-bordered input-info w-full max-w-xs !rounded-none"
        :value="url"
        :onChange="onChange"
      />

      <button
        class="btn btn-xs btn-outline bg-white btn-info !rounded-none"
        type="submit"
      >
        Tìm
      </button>
    </form>
    <div>
      <button
        class="btn btn-xs btn-outline bg-white btn-info !rounded-none"
        @click="() => router.push('/training-department')"
      >
        phòng đào tạo
      </button>
      <button
        class="btn btn-xs btn-outline bg-white btn-info !rounded-none"
        @click="() => router.push('/student-department')"
      >
        phòng công tác sinh viên
      </button>
      <button
        class="btn btn-xs btn-outline bg-white btn-info !rounded-none"
        @click="() => router.push('/finance-department')"
      >
        phòng kế hoạch tài chính
      </button>
    </div>
  </div>
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

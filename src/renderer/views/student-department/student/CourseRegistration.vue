<script lang="ts" setup>
import ListMajor from './components/ListMajor.vue';
import { onMounted } from 'vue';
import { useRegistrationStore } from './stores/registration';
import { getTermYear } from '../../../../utils/resolveCurrentTerm';

const currentTerm = getTermYear();
const registrationStore = useRegistrationStore();
onMounted(async () => {
  await registrationStore.getCurrentTermYearRegistration();
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-40">
      <div class="center px-5">
        <h1 class="font-bold text-2xl">Đăng ký môn học</h1>
        <div>
          <p>
            Học kỳ hiện tại:
            <span class="font-bold">{{ currentTerm.term }}</span> - Năm học:
            <span class="font-bold">{{ currentTerm.year }}</span>
          </p>
        </div>
      </div>
      <div>
        <button
          v-if="registrationStore.isAvailable"
          class="btn btn-block btn-primary"
          type="button"
          @click="registrationStore.closeCurrentState()"
        >
          Chốt đăng ký học phần
        </button>
      </div>
    </div>
    <div
      class="border-accent-content/5 border h-[calc(100vh-300px)] w-full flex"
    >
      <ListMajor />
    </div>
  </div>
</template>

<style scoped></style>

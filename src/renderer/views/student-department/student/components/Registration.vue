<script lang="ts" setup>
import { useRegistrationStore } from '../stores/registration';
import ListOpenCourse from './ListOpenCourse.vue';
import type { MajorWithCourse } from '../stores/registration';
import CreateRegistration from './CreateRegistration.vue';

const registrationStore = useRegistrationStore();
defineProps<{
  id?: string;
  majorName?: string;
  majors?: MajorWithCourse[];
}>();
</script>

<template>
  <div
    v-if="
      majors && majors.findIndex((major) => major.name === majorName) !== -1
    "
  >
    <div>
      <div class="flex">
        <div>
          <div>Ngành học: {{ majorName }}</div>
          <h3>Đã đăng ký</h3>
        </div>
        <button class="btn btn-error">Xóa</button>
      </div>
      <ListOpenCourse
        :courses="majors.find((major) => major.name === majorName).courses"
      />
    </div>
  </div>
  <div v-else>
    <div class="flex justify-around">
      <div class="">
        <div>Ngành học: {{ majorName }}</div>
        <h3>Chưa đăng ký</h3>
      </div>
      <CreateRegistration />
    </div>
  </div>
</template>

<style scoped></style>

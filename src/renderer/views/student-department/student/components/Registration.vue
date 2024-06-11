<script lang="ts" setup>
import { useRegistrationStore } from '../stores/registration';

import type { OpenCourse } from '../stores/registration';
import CreateRegistration from './CreateRegistration.vue';
import ListOpenCourse from './ListOpenCourse.vue';

const registrationStore = useRegistrationStore();
const props = defineProps<{
  id?: string;
  majorName?: string;
  _id?: string;
  courses?: OpenCourse[];
}>();
const handleDelete = async () => {
  await registrationStore.deleteRegistration(props._id);
};
</script>

<template>
  <div v-if="courses && _id">
    <div>
      <div class="flex justify-around">
        <div>
          <div>Ngành học: {{ majorName }}</div>
          <h3>Đã đăng ký</h3>
        </div>
        <button class="btn btn-error" @click="handleDelete">Xóa</button>
      </div>
      <ListOpenCourse :courses="courses" />
    </div>
  </div>
  <div v-else>
    <div class="flex justify-around">
      <div class="">
        <div>Ngành học: {{ majorName }}</div>
        <h3>Chưa đăng ký</h3>
      </div>
      <CreateRegistration :id="id" />
    </div>
  </div>
</template>

<style scoped></style>

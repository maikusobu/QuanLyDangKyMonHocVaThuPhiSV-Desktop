<script lang="ts" setup>
import { useStudentStore } from '../stores/student';
import { onMounted, ref } from 'vue';
import { useRegistrationStore } from '../stores/registration';
import Registration from './Registration.vue';

const majorName = ref('');
const studentStore = useStudentStore();
const registrationStore = useRegistrationStore();
const majors = studentStore.majors;
const setMajor = (major_Name: string) => {
  majorName.value = major_Name;
};
onMounted(async () => {
  majors && setMajor(majors[0]?.name || '');
});
</script>

<template>
  <div class="p-4 w-[300px] overflow-y-scroll relative pt-0">
    <h1 class="text-2xl font-bold mb-2 sticky top-0 bg-white px-2">
      Ngành học
    </h1>
    <div class="">
      <ul class="flex flex-col flex-nowrap">
        <li
          v-for="major in majors"
          :key="major.id"
          :class="{
            'bg-blue-400': major.name === majorName,
            'hover:bg-blue-200': major.name !== majorName,
          }"
          class="text-[15px] cursor-pointer py-3 px-2"
          @click="setMajor(major.name)"
        >
          {{ major.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="w-[calc(100%-300px)]">
    <Registration
      v-if="registrationStore.isAvailable"
      :id="majors.find((item) => item.name === majorName)?.id.toString()"
      :_id="
        registrationStore.currentTermYearRegistration.find(
          (item) => item.major.name === majorName
        )?._id
      "
      :courses="
        registrationStore.currentTermYearRegistration.find(
          (item) => item.major.name === majorName
        )?.courses
      "
      :majorName="majorName"
    />
    <div v-else>
      <h3 class="text-indigo-700 font-bold text-center">
        Chốt đăng ký học đã đóng trong học kỳ này, xin đợi sang học kỳ sau
      </h3>
    </div>
  </div>
</template>

<style scoped></style>

<template>
  <div class="flex">
    <SideBar
      :routes="[
        { name: 'bảng điều khiển', path: '/student-department' },
        { name: 'Sinh viên', path: '/student-department/student' },
        {
          name: 'Đăng ký môn học',
          path: '/student-department/course-registration',
        },
      ]"
      title="phòng công tác sinh viên"
    />
    <div class="flex flex-col grow">
      <Topbar />
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SideBar from '../../components/SideBar.vue';
import Topbar from '../../components/TopBar.vue';
import { useStudentStore } from './student/stores/student';

const studentStore = useStudentStore();
const loading = ref(true);

onMounted(async () => {
  await studentStore.getMajors();
  await studentStore.getCourseTypes();
  await studentStore.getPriorities();
  await studentStore.getProvince();
  loading.value = false;
});
</script>

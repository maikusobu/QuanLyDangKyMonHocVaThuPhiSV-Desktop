<script lang="ts" setup>
import Table from './Table.vue';
import { onMounted } from 'vue';
import {
  type MajorWithCourse,
  useRegistrationStore,
} from '../stores/registration';

const registrationStore = useRegistrationStore();
onMounted(async () => {
  await registrationStore.getOpenCourses();
});
const props = defineProps<{
  id?: string;
}>();
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const checkboxes = form.querySelectorAll('.checkbox');
  const courseIds = Array.from(checkboxes)
    .filter((checkbox) => (checkbox as HTMLInputElement).checked)
    .map((checkbox) => (checkbox as HTMLInputElement).value)
    .map((id) => parseInt(id));
  await registrationStore.submitRegistration(parseInt(props.id), courseIds);
};
</script>

<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_modal_opencourse.showModal()"
  >
    Đăng ký
  </button>
  <dialog id="create_modal_opencourse" class="modal">
    <div class="modal-box min-w-[900px] w p-15">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <form @submit.prevent="handleSubmit">
        <table class="table table-pin-rows table-zebra mt-4">
          <thead>
            <tr>
              <th></th>
              <th class="w-[10%] overflow-hidden">Mã môn</th>
              <th class="w-[25%] overflow-hidden">Tên môn</th>
              <th class="w-[15%] overflow-hidden">loại</th>
              <th class="w-[30%] overflow-hidden">tín chỉ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="course in registrationStore.openCourses"
              :key="course.id"
            >
              <td>
                <input :value="course.id" class="checkbox" type="checkbox" />
              </td>
              <td class="w-[10%] overflow-hidden">{{ course.id }}</td>
              <td class="w-[25%] overflow-hidden">{{ course.name }}</td>
              <td class="w-[15%] overflow-hidden">
                {{ course.courseType.name }}
              </td>
              <td class="w-[30%] overflow-hidden">
                {{ course.numberOfPeriods }}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          class="btn w-[90px] bg-secondary-400 text-base-white hover:bg-secondary-300"
          type="submit"
        >
          Đăng ký
        </button>
      </form>
    </div>
  </dialog>
</template>

<style scoped></style>

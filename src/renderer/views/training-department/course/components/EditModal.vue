<template>
  <dialog id="edit_course_modal" class="modal">
    <div class="modal-box max-w-[900px] p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Chỉnh sửa môn học</h1>
      <Form class="mt-8 grid grid-cols-2 gap-10" @submit="handleSubmit">
        <label class="flex flex-col col-span-2">
          Tên môn học
          <Field
            v-model="localFormData.name"
            name="name"
            type="text"
            class="input input-bordered"
          />
          <p
            v-if="courseStore.errorMessages['name']"
            class="text-red-700 text-[12px]"
          >
            {{ courseStore.errorMessages['name'] }}
          </p>
        </label>
        <label class="flex flex-col">
          Số tiết
          <Field
            v-model="localFormData.numberOfPeriods"
            name="numberOfPeriods"
            type="number"
            class="input input-bordered"
          />
          <p
            v-if="courseStore.errorMessages['numberOfPeriods']"
            class="text-red-700 text-[12px]"
          >
            {{ courseStore.errorMessages['name'] }}
          </p>
        </label>
        <label class="flex flex-col">
          Khoa
          <Field
            as="select"
            name="facultyId"
            class="select select-bordered"
            v-model="localFormData.facultyId"
          >
            <option
              v-for="faculty in courseStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
            >
              {{ faculty.name }}
            </option>
          </Field>
        </label>
        <label class="flex flex-col">
          loại môn học
          <Field
            as="select"
            name="courseTypeId"
            class="select select-bordered"
            v-model="localFormData.courseTypeId"
          >
            <option
              v-for="courseType in courseStore.courseTypes"
              :key="courseType.id"
              :value="courseType.id"
            >
              {{ courseType.name }}
            </option>
          </Field>
        </label>
        <button
          class="row-start-4 btn w-[200px] bg-secondary-400 text-base-white hover:bg-secondary-300"
          type="submit"
        >
          Lưu lại
        </button>
        <button
          class="row-start-4 btn w-[200px] bg-error-text text-base-white hover:bg-delete-button-hover"
          @click="handleDelete"
        >
          Xóa
        </button>
      </Form>
    </div>
  </dialog>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import { useCourseStore } from '../stores/course';
import { reactive, watch } from 'vue';
const courseStore = useCourseStore();

courseStore.getFaculties();
courseStore.getCourseTypes();

const handleCloseModal = () => {
  courseStore.setCurrentCourse(null);
  courseStore.clearErrorMessages();
  document.getElementById('edit_course_modal').close();
};
const handleSubmit = async (value) => {
  await courseStore.updateCourse(value);

  if (Object.keys(courseStore.errorMessages).length === 0) {
    handleCloseModal();
  }
};
const handleDelete = async () => {
  await courseStore.deleteCourse(courseStore.currentCourse?.id);

  if (Object.keys(courseStore.errorMessages).length === 0) {
    handleCloseModal();
  }
};

const localFormData = reactive({
  name: null,
  numberOfPeriods: null,
  facultyId: null,
  courseTypeId: null,
});

watch(
  () => courseStore.currentCourse,
  (newVal) => {
    if (newVal) {
      Object.assign(localFormData, newVal);
    } else {
      Object.assign(localFormData, {
        name: null,
        numberOfPeriods: null,
        facultyId: null,
        courseTypeId: null,
      });
    }
  }
);
</script>

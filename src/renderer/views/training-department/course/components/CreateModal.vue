// TODO: fix the select field
<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_course_modal.showModal()"
  >
    Thêm môn học
  </button>
  <dialog id="create_course_modal" class="modal">
    <div class="modal-box max-w-[900px] p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Thêm môn học</h1>
      <button class="flex items-center gap-2">
        <img :src="plusCircleIcon" alt="add icon" />
        <p>Nhập từ CSV</p>
      </button>
      <Form class="mt-8 grid grid-cols-2 gap-10" @submit="handleSubmit">
        <label class="flex flex-col col-span-2">
          Tên môn học
          <Field class="input input-bordered" name="name" type="text" />
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
            class="input input-bordered"
            name="numberOfPeriods"
            type="number"
          />
          <p
            v-if="courseStore.errorMessages['numberOfPeriods']"
            class="text-red-700 text-[12px]"
          >
            {{ courseStore.errorMessages['numberOfPeriods'] }}
          </p>
        </label>
        <label class="flex flex-col">
          Khoa
          <Field
            v-slot="{ value }"
            as="select"
            class="select select-bordered"
            name="facultyId"
          >
            <option
              v-for="(faculty, index) in courseStore.faculties"
              :key="faculty.id"
              :value="faculty.id"
              :selected="index === 0"
              v-bind="value"
            >
              {{ faculty.name }}
            </option>
          </Field>
        </label>
        <label class="flex flex-col">
          Loại môn học
          <Field
            v-slot="{ value }"
            as="select"
            class="select select-bordered"
            name="courseTypeId"
          >
            <option
              v-for="(courseType, index) in courseStore.courseTypes"
              :key="courseType.id"
              :value="courseType.id"
              :selected="index === 0"
              v-bind="value"
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
      </Form>
    </div>
  </dialog>
</template>

<script setup>
import plusCircleIcon from '../../../../../assets/images/plusCircleIcon.svg';
import { useCourseStore } from '../stores/course';
import { Form, Field } from 'vee-validate';

const courseStore = useCourseStore();

courseStore.getFaculties();
courseStore.getCourseTypes();

const handleCloseModal = () => {
  courseStore.clearErrorMessages();
  document.getElementById('create_course_modal').close();
};
const handleSubmit = async (value, { resetForm }) => {
  await courseStore.addCourse(value);
  if (Object.keys(courseStore.errorMessages).length === 0) {
    resetForm();
    handleCloseModal();
  }
};
</script>

<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="add_program_item_modal.showModal()"
  >
    Thêm môn học vào chương trình
  </button>
  <dialog id="add_program_item_modal" class="modal">
    <div class="modal-box min-w-[900px] w p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Thêm môn học vào chương trình</h1>
      <button class="flex items-center gap-2">
        <img :src="plusCircleIcon" alt="add icon" />
        <p>Nhập từ CSV</p>
      </button>
      <Form class="mt-8 grid grid-cols-4 gap-10" @submit="handleSubmit">
        <label>
          Học kì
          <Field as="select" class="select select-bordered" name="term">
            <option value="first">học kì 1</option>
            <option value="second">học kì 2</option>
            <option value="third">học kì 3</option>
          </Field>

          <p
            v-if="programStore.errorMessages['term']"
            class="text-red-700 text-[12px]"
          >
            {{ programStore.errorMessages['term'] }}
          </p>
        </label>

        <label class="flex flex-col col-span-3">
          Ghi chú
          <Field class="input input-bordered" name="note" type="text" />
          <p
            v-if="programStore.errorMessages['note']"
            class="text-red-700 text-[12px]"
          >
            {{ programStore.errorMessages['note'] }}
          </p>
        </label>
        <label class="row-start-2 col-span-4">
          Môn học
          <div class="overflow-x-auto w-full h-[300px] border">
            <div class="flex">
              <img
                :src="searchIcon"
                alt="search icon"
                class="bg-base-silver pl-4 rounded-l"
              />
              <input
                type="search"
                placeholder="Tìm kiếm tên môn học"
                class="input bg-base-silver max-w-[500px] placeholder:text-black focus:border-transparent"
                :value="programStore.searchQuery"
                @input="programStore.updateSearchQuery($event.target.value)"
              />
            </div>
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Mã môn học</th>
                  <th>Tên môn học</th>
                  <th>Số tiết</th>
                  <th>Khoa</th>
                  <th>Loại môn học</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="course in programStore.courses"
                  :key="course.id"
                  class="hover:!bg-secondary-100 hover:cursor-pointer"
                  :class="{ '!bg-secondary-100': course.id === localCourseId }"
                  @click="() => handleRowClick(course)"
                >
                  <td>{{ course.id }}</td>
                  <td>{{ course.name }}</td>
                  <td>{{ course.numberOfPeriods }}</td>
                  <td>{{ course.faculty.name }}</td>
                  <td>{{ course.courseType.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p
            v-if="programStore.errorMessages['courseId']"
            class="text-red-700 text-[12px]"
          >
            {{ programStore.errorMessages['courseId'] }}
          </p>
        </label>
        <button
          class="btn w-[200px] bg-secondary-400 text-base-white hover:bg-secondary-300"
          type="submit"
        >
          Lưu lại
        </button>
      </Form>
    </div>
  </dialog>
</template>

<script setup>
import searchIcon from '../../../../../assets/images/searchIcon.svg';
import plusCircleIcon from '../../../../../assets/images/plusCircleIcon.svg';
import { useProgramStore } from '../stores/program';
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';

const programStore = useProgramStore();

programStore.getCourses();

const handleCloseModal = () => {
  programStore.clearErrorMessages();
  document.getElementById('add_program_item_modal').close();
};
const handleSubmit = async (value, { resetForm }) => {
  await programStore.addProgramItem({
    ...value,
    courseId: localCourseId.value,
    programId: programStore.currentProgram.id,
  });

  if (Object.keys(programStore.errorMessages).length === 0) {
    resetForm();
    localCourseId.value = null;
    handleCloseModal();
  }
};
const handleRowClick = (course) => {
  localCourseId.value = course.id;
};

const localCourseId = ref(null);
</script>

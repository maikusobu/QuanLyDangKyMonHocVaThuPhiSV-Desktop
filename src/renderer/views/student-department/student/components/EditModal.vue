<template>
  <dialog id="edit_modal_student" class="modal">
    <div class="modal-box min-w-[900px] w p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Chỉnh sửa thông tin sinh viên</h1>
      <Form class="mt-8 grid grid-cols-4 gap-10" @submit="handleSubmit">
        <label class="flex flex-col col-span-2">
          Họ và tên
          <Field
            v-model="localStudent.name"
            class="input input-bordered"
            name="name"
            type="text"
          />
          <p
            v-if="studentStore.errorMessages['name']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['name'] }}
          </p>
        </label>

        <label class="flex flex-col">
          Ngày sinh
          <Field
            v-model="localStudent.dateOfBirth"
            class="input input-bordered"
            name="dateOfBirth"
            type="date"
          />

          <p
            v-if="studentStore.errorMessages['dateOfBirth']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['dateOfBirth'] }}
          </p>
        </label>
        <label>
          Đối tượng ưu tiên
          <Field
            v-model="localStudent.priorityId"
            as="select"
            class="select select-bordered"
            name="priorityId"
          >
            <option disabled value="">Chọn đối tượng ưu tiên</option>
            <option
              v-for="priority in studentStore.priorities"
              :key="priority.id"
              :disabled="
                (priority.id === 3 && !localStudent.district.isMinor) ||
                (priority.id === 4 && localStudent.district.isMinor)
              "
              :value="priority.id"
            >
              {{ priority.name }}
            </option>
          </Field>

          <p
            v-if="studentStore.errorMessages['priorityId']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['priorityId'] }}
          </p>
        </label>
        <label class="flex flex-col">
          Địa chỉ

          <select
            v-model="localStudent.district.provinceId"
            class="select select-bordered"
            @change="studentStore.getDistrict($event.target.value)"
          >
            <option>Chọn tỉnh thành</option>
            <option
              v-for="province in studentStore.provinces"
              :key="province.id"
              :value="province.id"
            >
              {{ province.name }}
            </option>
          </select>
        </label>
        <label class="flex flex-col">
          <br />
          <Field
            v-model="localStudent.districtId"
            as="select"
            class="select select-bordered"
            name="districtId"
          >
            <option>Chọn quận/huyện</option>
            <option
              v-for="district in studentStore.districts"
              :key="district.id"
              :value="district.id"
            >
              {{ district.name }}
            </option>
          </Field>

          <p
            v-if="studentStore.errorMessages['districtId']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['districtId'] }}
          </p>
        </label>
        <label class="flex flex-col col-span-2">
          <br />
          <Field
            v-model="localStudent.address"
            class="input input-bordered"
            name="address"
            type="text"
          />
          <p
            v-if="studentStore.errorMessages['address']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['address'] }}
          </p>
        </label>
        <label class="flex flex-col">
          Giới tính
          <Field
            v-model="localStudent.gender"
            as="select"
            class="select select-bordered"
            name="gender"
          >
            <option disabled selected value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </Field>

          <p
            v-if="studentStore.errorMessages['gender']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['gender'] }}
          </p>
        </label>

        <label>
          Chuyên ngành
          <Field
            v-model="localStudent.majorId"
            as="select"
            class="select select-bordered"
            name="majorId"
          >
            <option disabled selected value="">Chọn chuyên ngành</option>
            <option
              v-for="major in studentStore.majors"
              :key="major.id"
              :value="major.id"
            >
              {{ major.name }}
            </option>
          </Field>

          <p
            v-if="studentStore.errorMessages['majorId']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['majorId'] }}
          </p>
        </label>
        <div class="col-span-3 flex gap-10">
          <button
            class="row-start-4 btn w-[200px] bg-secondary-400 text-base-white hover:bg-secondary-300"
            type="submit"
          >
            Lưu lại
          </button>
          <button
            class="row-start-4 btn w-[200px] bg-error-text text-base-white hover:bg-delete-button-hover"
            type="button"
            @click="handleDelete"
          >
            Xóa
          </button>
        </div>
      </Form>
    </div>
  </dialog>
</template>

<script setup>
import { useStudentStore } from '../stores/student';
import { Form, Field } from 'vee-validate';
import { reactive, watch } from 'vue';

const studentStore = useStudentStore();

const localStudent = reactive({
  id: '',
  name: '',
  dateOfBirth: '',
  priorityId: '',
  districtId: '',
  majorId: '',
  gender: '',
  address: '',
  district: {
    provinceId: '',
    isMinor: false,
  },
});

watch(
  () => studentStore.currentStudent,
  async (newVal) => {
    if (newVal) {
      newVal['dateOfBirth'] =
        studentStore.currentStudent['dateOfBirth'].split('T')[0];
      Object.assign(localStudent, studentStore.currentStudent);
      await studentStore.getProvince();
      await studentStore.getDistrict(newVal.district.provinceId);
    } else {
      Object.assign(localStudent, {
        name: '',
        dateOfBirth: '',
        priorityId: '',
        districtId: '',
        gender: '',
        address: '',
        district: {
          provinceId: '',
        },
      });
    }
  },
  { immediate: true }
);
const handleCloseModal = () => {
  studentStore.clearErrorMessages();
  studentStore.selectStudent(null);
};
const handleDelete = async () => {
  await studentStore.deleteStudent(localStudent.id);
  if (Object.keys(studentStore.errorMessages).length === 0) {
    document.getElementById('edit_modal_student').close();
    handleCloseModal();
  }
};
const handleSubmit = async (value) => {
  await studentStore.updateStudent(value);
  if (Object.keys(studentStore.errorMessages).length === 0) {
    document.getElementById('edit_modal_student').close();
    await studentStore.fetchStudents(studentStore.search.query);
    handleCloseModal();
  }
};
</script>

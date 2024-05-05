<template>
  <button
    class="btn bg-secondary-400 text-base-white hover:bg-secondary-300"
    onclick="create_modal_student.showModal()"
  >
    Lập sinh viên
  </button>
  <dialog id="create_modal_student" class="modal">
    <div class="modal-box min-w-[900px] w p-20">
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
      <Form class="mt-8 grid grid-cols-4 gap-10" @submit="handleSubmit">
        <label class="flex flex-col col-span-2">
          Họ và tên
          <Field class="input input-bordered" name="name" type="text" />
          <p
            v-if="studentStore.errorMessages['name']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['name'] }}
          </p>
        </label>

        <label class="flex flex-col">
          Ngày sinh
          <Field class="input input-bordered" name="dateOfBirth" type="date" />

          <p
            v-if="studentStore.errorMessages['dateOfBirth']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['dateOfBirth'] }}
          </p>
        </label>
        <label>
          Đối tượng ưu tiên
          <Field as="select" class="select select-bordered" name="priorityId">
            <option disabled value="">Chọn đối tượng ưu tiên</option>
            <option
              v-for="priority in studentStore.priorities"
              :key="priority.id"
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
          <Field as="select" class="select select-bordered" name="districtId">
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
          <Field class="input input-bordered" name="address" type="text" />
          <p
            v-if="studentStore.errorMessages['address']"
            class="text-red-700 text-[12px]"
          >
            {{ studentStore.errorMessages['address'] }}
          </p>
        </label>
        <label class="flex flex-col">
          Giới tính
          <Field as="select" class="select select-bordered" name="gender">
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
          <Field as="select" class="select select-bordered" name="majorId">
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
import { useStudentStore } from '../stores/student';
import { Form, Field } from 'vee-validate';

const studentStore = useStudentStore();

const handleCloseModal = () => {
  studentStore.clearErrorMessages();
};

const handleSubmit = async (value) => {
  await studentStore.addStudent(value);
  if (Object.keys(studentStore.errorMessages).length === 0) {
    document.getElementById('create_modal_student').close();
    handleCloseModal();
  }
};
</script>

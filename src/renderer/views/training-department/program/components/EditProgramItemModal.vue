<template>
  <dialog id="edit_program_item_modal" class="modal">
    <div class="modal-box min-w-[900px] w p-20">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal"
        >
          ✕
        </button>
      </form>
      <h1 class="font-semibold text-3xl">Chỉnh sửa môn chương trình học</h1>
      <Form class="mt-8 grid grid-cols-4 gap-10" @submit="handleSubmit">
        <label>
          Học kì
          <Field
            as="select"
            class="select select-bordered"
            name="term"
            v-model="localFormData.term"
          >
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
          <Field
            class="input input-bordered"
            name="note"
            type="text"
            v-model="localFormData.note"
          />
          <p
            v-if="programStore.errorMessages['note']"
            class="text-red-700 text-[12px]"
          >
            {{ programStore.errorMessages['note'] }}
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
import { Form, Field } from 'vee-validate';
import { useProgramStore } from '../stores/program';
import { reactive, watch } from 'vue';

const programStore = useProgramStore();

const handleCloseModal = () => {
  programStore.clearErrorMessages();
  programStore.setCurrentProgramItem(null);
  document.getElementById('edit_program_item_modal').close();
};
const handleSubmit = async (value) => {
  await programStore.updateProgramItem(value);

  if (Object.keys(programStore.errorMessages).length === 0) {
    handleCloseModal();
  }
};
const handleDelete = async () => {
  await programStore.deleteProgramItem(programStore.currentProgramItem?.id);

  if (Object.keys(programStore.errorMessages).length === 0) {
    handleCloseModal();
  }
};

const localFormData = reactive({
  term: null,
  note: null,
});

watch(
  () => programStore.currentProgramItem,
  (newVal) => {
    if (newVal) {
      Object.assign(localFormData, programStore.currentProgramItem);
    } else {
      Object.assign(localFormData, {
        term: null,
        note: null,
      });
    }
  }
);
</script>

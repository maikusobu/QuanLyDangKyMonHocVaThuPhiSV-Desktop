<template>
  <tr
    ref="endOftable"
    class="hover:!bg-secondary-100 cursor-pointer"
    @click="handleRowClick"
  >
    <td>{{ student.id }}</td>
    <td>{{ student.name }}</td>
    <td>{{ resolveGender(student.gender) }}</td>
    <td>{{ student.major.name }}</td>
    <td>{{ student.priority.name }}</td>
  </tr>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import type { Student } from '../stores/student';
import { useStudentStore } from '../stores/student';

const studentStore = useStudentStore();
const props = defineProps({
  student: Object as () => Student,
  isLast: Boolean,
});
const endOftable = ref(null);
const emit = defineEmits(['row-click']);

const handleRowClick = () => {
  emit('row-click', props.student);
};

const resolveGender = (gender: string) => {
  return gender === 'male' ? 'Nam' : 'Nữ';
};
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && props.isLast) {
      studentStore.page++;
      studentStore.fetchStudents(studentStore.search.query, false);
      observer.unobserve(entries[0].target);
    }
  });
  observer.observe(endOftable.value);
});
</script>

<style scoped></style>

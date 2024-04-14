<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
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
          v-for="course in dummyData"
          :key="course.id"
          class="hover:!bg-secondary-100"
        >
          <td>{{ course.id }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.numberOfPeriods }}</td>
          <td>{{ course.faculty }}</td>
          <td>{{ course.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const dummyData = [
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 1,
    name: 'Lập trình hướng đối tượng',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu và giải thuật',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
  {
    id: 3,
    name: 'Nhập môn công nghệ phần mềm',
    numberOfPeriods: 3,
    faculty: 'Công nghệ phần mềm',
    type: 'lý thuyết',
  },
];
</script>

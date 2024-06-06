<template>
  <div class="flex items-center gap-[50px]">
    <label>
      Năm học:
      <select
        class="select select-bordered"
        v-model="reportStore.year"
        @change="reportStore.getReports"
      >
        <option
          v-for="year in getYears()"
          :key="year"
          :value="year"
          :selected="year === new Date().getFullYear()"
        >
          {{ year }}
        </option>
      </select>
    </label>

    <label>
      Học kì:
      <select
        class="select select-bordered"
        v-model="reportStore.term"
        @change="reportStore.getReports"
      >
        <option value="first">Học kì 1</option>
        <option value="second">Học kì 2</option>
        <option value="third">Học kì 3</option>
      </select>
    </label>

    <label>
      Trạng thái:
      <select
        class="select select-bordered"
        v-model="reportStore.status"
        @change="reportStore.getReports"
      >
        <option value="ALL">Tất cả</option>
        <option value="PAID">Đã đóng đủ</option>
        <option value="PENDING">Chưa đóng đủ</option>
      </select>
    </label>

    <div class="flex">
      <img
        :src="searchIcon"
        alt="search icon"
        class="bg-base-silver pl-4 rounded-l"
      />
      <input
        type="search"
        placeholder="Tìm kiếm họ tên sinh viên"
        class="input bg-base-silver max-w-[500px] placeholder:text-black focus:border-transparent"
        v-model="reportStore.studentName"
        @input="reportStore.getReports"
      />
    </div>
  </div>
</template>

<script setup>
import searchIcon from '../../../../../assets/images/searchIcon.svg';
import { useReportStore } from '../stores/report.ts';

const reportStore = useReportStore();

const getYears = () => {
  const years = [];

  const currentYear = new Date().getFullYear();

  for (let i = 4; i >= 0; i--) {
    years.push(currentYear - i);
  }

  return years;
};
</script>

<template>
  <div class="flex items-center gap-[50px]">
    <label>
      Năm học:
      <select
        class="select select-bordered"
        v-model="paymentStore.year"
        @change="paymentStore.getPayments"
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
        v-model="paymentStore.term"
        @change="paymentStore.getPayments"
      >
        <option value="first">Học kì 1</option>
        <option value="second">Học kì 2</option>
        <option value="third">Học kì 3</option>
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
        v-model="paymentStore.studentName"
        @input="paymentStore.getPayments"
      />
    </div>
  </div>
</template>

<script setup>
import searchIcon from '../../../../../assets/images/searchIcon.svg';
import { usePaymentStore } from '../stores/payment.ts';

const paymentStore = usePaymentStore();

const getYears = () => {
  const years = [];

  const currentYear = new Date().getFullYear();

  for (let i = 4; i >= 0; i--) {
    years.push(currentYear - i);
  }

  return years;
};
</script>

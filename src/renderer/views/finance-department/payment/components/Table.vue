<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Mã biên lai</th>
          <th>Mã số sinh viên</th>
          <th>Họ tên</th>
          <th>Ngày lập biên lai</th>
          <th>Số tiền thu</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="payment in paymentStore.payments"
          :key="payment.id"
          class="hover:!bg-secondary-100"
        >
          <td>{{ payment?.id }}</td>
          <td>{{ payment?.studentId }}</td>
          <td>{{ payment?.studentName }}</td>
          <td>{{ formateDateString(payment?.paymentDate) }}</td>
          <td>{{ payment?.amount?.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { usePaymentStore } from '../stores/payment.ts';
import formateDateString from '../../../../../utils/formatDateString';

const paymentStore = usePaymentStore();

paymentStore.getPayments();
</script>

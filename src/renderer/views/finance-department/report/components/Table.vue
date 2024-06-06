<template>
  <div class="overflow-x-auto w-full h-[calc(100vh-300px)]">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Mã thu học phí</th>
          <th>Mã số sinh viên</th>
          <th>Họ tên</th>
          <th>Số tiền đăng ký</th>
          <th>Số tiền thực tế</th>
          <th>Số tiền còn nợ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="report in reportStore.reports"
          :key="report.id"
          class="hover:!bg-secondary-100"
        >
          <td>{{ report?.id }}</td>
          <td>{{ report?.studentId }}</td>
          <td>{{ report?.studentName }}</td>
          <td>{{ report?.totalRegister.toLocaleString() }}</td>
          <td>{{ report?.totalActual.toLocaleString() }}</td>
          <td
            :class="
              report?.totalActual - report?.totalPaid > 0
                ? 'text-error-text'
                : 'text-green-500'
            "
          >
            {{ (report?.totalActual - report?.totalPaid).toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useReportStore } from '../stores/report.ts';

const reportStore = useReportStore();

reportStore.getReports();
</script>

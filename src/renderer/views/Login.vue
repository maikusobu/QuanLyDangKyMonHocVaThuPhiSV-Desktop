<template>
  <main
    class="flex flex-col justify-center items-center h-screen w-screen gap-[30px]"
  >
    <h1 class="text-[22px] font-bold mb-8 uppercase text-center flex flex-col">
      <span>Hệ thống quản lý học phí và</span>
      <span>đăng ký học phần</span>
    </h1>
    <div class="card border shadow-xl w-[512px] h-[420px]">
      <div class="card-body flex flex-col items-center">
        <div class="w-full flex justify-center">
          <img :src="uitLogo" alt="UIT Logo" class="w-[100px] h-[100px]" />
        </div>
        <form @submit.prevent class="card-body flex flex-col gap-[13px]">
          <input
            type="text"
            placeholder="Email"
            class="input input-bordered input-md w-full max-w-xs"
            v-model="email"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            v-model="password"
            class="input input-bordered input-md w-full max-w-xs"
          />
          <div
            v-show="authError"
            class="text-[9px] font-light text-red-600 -my-[5px]"
          >
            Thông tin đăng nhập không hợp lệ, vui lòng thử lại:
          </div>
          <button
            @click="login"
            class="btn btn-wide bg-secondary-400 text-base-white hover:bg-secondary-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import uitLogo from '../../assets/images/uitLogo.svg';
import { ref } from 'vue';

const authError = ref(false);
const email = ref('');
const password = ref('');

async function login(e) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Authentication Failed');
    }

    // Login success, routing and store token

    console.log('Login successful', data);
    authError.value = false;
  } catch (error) {
    authError.value = true;
  }
}
</script>

<style scoped></style>

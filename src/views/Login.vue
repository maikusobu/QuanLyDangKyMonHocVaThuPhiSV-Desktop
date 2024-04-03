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
          <img
            src="../../../src/assets/uit.svg"
            alt=""
            class="w-[100px] h-[100px]"
          />
        </div>
        <form class="card-body flex flex-col gap-[13px]">
          <input
            type="text"
            placeholder="Tài khoản"
            class="input input-bordered input-md w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Mật khẩu"
            class="input input-bordered input-md w-full max-w-xs"
          />
          <div class="text-[9px] font-light text-error-text -my-[5px]">
            Thông tin đăng nhập không hợp lệ, vui lòng thử lại
          </div>
          <button
            class="btn btn-wide bg-secondary-400 text-base-white hover:bg-secondary-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup></script>

import { useToast } from 'vue-toastification';
const vueToast = useToast();

export const toast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success'
) => {
  switch (type) {
    case 'success':
      vueToast.success(message);
      break;
    case 'error':
      vueToast.error(message);
      break;
    case 'warning':
      vueToast.warning(message);
      break;
    case 'info':
      vueToast.info(message);
      break;
  }
};

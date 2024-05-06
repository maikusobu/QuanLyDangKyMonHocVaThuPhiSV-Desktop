export const toast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success'
) => {
  new Notification(type, { body: message });
};

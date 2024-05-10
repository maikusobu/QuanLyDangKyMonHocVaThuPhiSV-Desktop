/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import '../index.css';
import 'vue-toastification/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { PluginOptions } from 'vue-toastification';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Toast, {
    position: 'bottom-right',
    newestOnTop: true,
    maxToasts: 20,
    closeButton: true,
    closeOnClick: true,
    icon: true,
    timeout: 4000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  } as PluginOptions)
  .mount('#app');

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite'
);

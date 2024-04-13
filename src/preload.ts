import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electron', {
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: string, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    delete(key: string) {
      ipcRenderer.send('electron-store-delete', key);
    },
    clear() {
      ipcRenderer.send('electron-store-clear');
    },
  },
});

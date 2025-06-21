import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  saveFile: async (fileData: any, fileName: string, dirName: string, previousFileName?: string) => {
    return ipcRenderer.invoke('save-file', { fileData, fileName, dirName, previousFileName });
  },
  getFileUrl: async (storeKey: string) => {
    return ipcRenderer.invoke('get-file-url', { storeKey });
  },
  setStoreKey: async (storeKey: string, value: any) => {
    return ipcRenderer.invoke('set-store-key', { storeKey, value });
  },
  getStoreKey: async (storeKey: string) => {
    return ipcRenderer.invoke('get-store-key', { storeKey });
  },
  openExternal: (url: string) => {
    ipcRenderer.send('open-external', url);
  }
}); 
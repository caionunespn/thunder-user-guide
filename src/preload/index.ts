import { contextBridge, ipcRenderer } from 'electron';

// Expor APIs de forma segura para o processo de renderização
contextBridge.exposeInMainWorld('electron', {
  // APIs para manipulação de arquivos
  saveFile: async (fileData: any, fileName: string, dirName: string, previousFileName?: string) => {
    return ipcRenderer.invoke('save-file', { fileData, fileName, dirName, previousFileName });
  },
  getFileUrl: async (storeKey: string) => {
    return ipcRenderer.invoke('get-file-url', { storeKey });
  },

  // APIs para manipulação do store
  setStoreKey: async (storeKey: string, value: any) => {
    return ipcRenderer.invoke('set-store-key', { storeKey, value });
  },
  getStoreKey: async (storeKey: string) => {
    return ipcRenderer.invoke('get-store-key', { storeKey });
  },

  // API para abrir links externos
  openExternal: (url: string) => {
    ipcRenderer.send('open-external', url);
  }
}); 
export interface ElectronAPI {
  saveFile: (fileData: any, fileName: string, dirName: string, previousFileName?: string) => Promise<any>;
  getFileUrl: (storeKey: string) => Promise<any>;
  setStoreKey: (storeKey: string, value: any) => Promise<void>;
  getStoreKey: (storeKey: string) => Promise<any>;
  openExternal: (url: string) => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

declare namespace JSX {
  interface WebViewHTMLAttributes<T> extends React.HTMLAttributes<T> {
    webpreferences?: string;
    allowpopups?: string;
    partition?: string;
  }
}

export { }; 
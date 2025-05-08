const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs/promises');

let mainWindow = null;
let store = null;

// Get the absolute path to the project root
const projectRoot = path.join(__dirname, '../../');

async function initializeStoreAndStart() {
  const Store = await import('electron-store');
  store = new Store.default({
    cwd: path.join(app.getPath('userData'), 'files')
  });
  setupIpcHandlers();
  createWindow();
}

async function ensureDirIsCreated(dirName) {
  try {
    const userDataPath = app.getPath('userData');
    const targetDir = path.join(userDataPath, 'files', dirName);

    try {
      await fs.access(targetDir);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.mkdir(targetDir, { recursive: true });
        await fs.access(targetDir);
      } else {
        throw err;
      }
    }

    const testFile = path.join(targetDir, '.test');
    await fs.writeFile(testFile, 'test');
    await fs.unlink(testFile);

    return targetDir;
  } catch (err) {
    console.error('Error ensuring directory exists:', err);
    throw err;
  }
}

function setupIpcHandlers() {
  ipcMain.handle('save-file', async (_event, { fileData, fileName, dirName, previousFileName }) => {
    try {
      if (!fileData || !fileName || !dirName) throw new Error('Missing file data, name or dirName');

      const targetDir = await ensureDirIsCreated(dirName);
      const filePath = path.join(targetDir, fileName);

      if (previousFileName) {
        const previousFilePath = path.join(targetDir, previousFileName);
        try {
          await fs.access(previousFilePath);
          await fs.unlink(previousFilePath);
        } catch { }
      }

      let buffer;
      if (Buffer.isBuffer(fileData)) {
        buffer = fileData;
      } else if (typeof fileData === 'string' && fileData.startsWith('data:')) {
        buffer = Buffer.from(fileData.split(',')[1], 'base64');
      } else if (typeof fileData === 'string') {
        buffer = Buffer.from(fileData, 'base64');
      } else if (ArrayBuffer.isView(fileData)) {
        buffer = Buffer.from(fileData.buffer);
      } else {
        throw new Error('Invalid file data format');
      }

      await fs.writeFile(filePath, buffer);
      return `file://${filePath}`;
    } catch (err) {
      console.error('Error saving file:', err);
      throw err;
    }
  });

  ipcMain.handle('get-file-url', async (_event, { storeKey }) => {
    try {
      const filePath = store.get(storeKey);
      if (!filePath) return null;

      const url = filePath.replace('file://', '');
      await fs.access(url);
      return filePath;
    } catch (err) {
      if (err.code === 'ENOENT') return null;
      throw err;
    }
  });

  ipcMain.handle('set-store-key', async (_event, { storeKey, value }) => {
    try {
      store.set(storeKey, JSON.stringify(value));
    } catch (err) {
      console.error('Error setting store key:', err);
      throw err;
    }
  });

  ipcMain.handle('get-store-key', async (_event, { storeKey }) => {
    try {
      const value = store.get(storeKey);
      return value === null ? null : JSON.parse(value);
    } catch {
      return store.get(storeKey);
    }
  });

  ipcMain.on('open-external', (_event, url) => {
    shell.openExternal(url);
  });
}

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development';

  const iconPath = isDev
    ? path.join(__dirname, '..', '..', 'public', 'icons', 'png', '512x512.png')
    : path.join(process.resourcesPath, 'assets', 'icons', 'png', '512x512.png');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: false,
      webSecurity: true,
      webviewTag: true,
      preload: path.join(__dirname, '../preload/index.js')
    }
  });

  // Set referrer policy for web content
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Referrer-Policy'] = 'no-referrer-when-downgrade';
    callback({ requestHeaders: details.requestHeaders });
  });

  // Handle navigation to external URLs
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle navigation within the app
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http://localhost:5173') && !url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Load the app
  if (isDev) {
    const devServerUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
    mainWindow.loadURL(devServerUrl);
  } else {
    const indexPath = path.join(__dirname, '..', '..', 'dist', 'index.html');
    console.log('Loading production index.html from:', indexPath);
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  initializeStoreAndStart();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

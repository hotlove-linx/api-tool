import { app, BrowserWindow, Menu, Tray } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
const isDevelopment = process.env.NODE_ENV !== 'production'

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
// 托盘对象
let appTray = null;

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1300,
    minWidth: 1000,
    height: 770,
    minHeight: 670,
    resizable: false,
    // width: 310,
    // height: 380,
    opacity: 1,
    frame: false, //设置为无边框
    transparent: true, //使用透明窗口
    backgroundColor: '#ffffff',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.openDevTools();

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  let trayMenuTemplate = [
    {
      label: '退出',
      click: () => {
        app.quit();
      },
    },
  ];

  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  if (isDevelopment) {
    // 系统托盘图标目录
    // let trayIcon = path.join(__dirname, '/'); // app是选取的目录
    let trayIcon = process.env.VITE_PUBLIC; // app是选取的目录
    appTray = new Tray(path.join(trayIcon, 'e-do16.ico')); // app.ico是app目录下的ico文件
  } else {
    // 系统托盘图标目录
    let trayIcon = path.join(__dirname, '/'); // app是选取的目录
    appTray = new Tray(path.join(trayIcon, 'e-do16.ico')); // app.ico是app目录下的ico文件
  }
  // 设置此托盘图标的悬停提示内容
  appTray.setToolTip('edo');

  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  // 单击右下角小图标显示应用
  appTray.on('click', () => {
    if (win !== null) {
      win.show();
    }
  });


  win.on('closed', () => {
    win = null;
  });

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

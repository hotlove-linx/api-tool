import { app, BrowserWindow, Menu, Tray } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
const isDevelopment = process.env.NODE_ENV !== "production";
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let appTray = null;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1300,
    minWidth: 1e3,
    height: 770,
    minHeight: 670,
    resizable: false,
    // width: 310,
    // height: 380,
    opacity: 1,
    frame: false,
    //设置为无边框
    transparent: true,
    //使用透明窗口
    backgroundColor: "#ffffff",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.openDevTools();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  let trayMenuTemplate = [
    {
      label: "退出",
      click: () => {
        app.quit();
      }
    }
  ];
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  if (isDevelopment) {
    let trayIcon = process.env.VITE_PUBLIC;
    appTray = new Tray(path.join(trayIcon, "e-do16.ico"));
  } else {
    let trayIcon = path.join(__dirname, "/");
    appTray = new Tray(path.join(trayIcon, "e-do16.ico"));
  }
  appTray.setToolTip("edo");
  appTray.setContextMenu(contextMenu);
  appTray.on("click", () => {
    if (win !== null) {
      win.show();
    }
  });
  win.on("closed", () => {
    win = null;
  });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};

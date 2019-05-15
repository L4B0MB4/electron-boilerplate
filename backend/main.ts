const { app, BrowserWindow } = require("electron");
const path = require("path");

const url = require("url");

/*
  load React-Dev-Server or build
*/
const REACT_URL =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, "/../index.html"),
    protocol: "file:",
    slashes: true
  });

let win: Electron.BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js") // using the preload script to choose which functions to enable in the Browser
    }
  });

  win.loadURL(REACT_URL);

  // and load the index.html of the app.
  //win.loadFile("index.html");
  // Open the DevTools.
  win.webContents.openDevTools();
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

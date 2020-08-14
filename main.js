const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain } = require("electron");

const connectDB = require("./config/db");
const User = require("./models/User");
const Measurement = require("./models/Measurement");

// Database
connectDB();

let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createMainWindow);

// Load users from database
ipcMain.on("users:load", sendUsers);

async function sendUsers() {
  try {
    const users = await User.find().sort({ created: 1 });
    mainWindow.webContents.send("users:get", JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
}

// Create new user
ipcMain.on("user:add", async (e, user) => {
  try {
    await User.create(user);
    sendUsers();
  } catch (err) {
    console.log(err);
  }
});

// Edit user
ipcMain.on("user:edit", async (e, id, name, lastname, email, phone) => {
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { name: name, lastname: lastname, email: email, phone: phone }
    );
    sendUsers();
  } catch (err) {
    console.log(err);
  }
});

// Delete user
ipcMain.on("user:delete", async (e, _id) => {
  try {
    await User.findByIdAndDelete({ _id: _id });
    sendUsers();
  } catch (err) {
    console.log(err);
  }
});

ipcMain.on("logs:load", sendLogs);

// Send Logs
async function sendLogs() {
  try {
    const logs = await Measurement.find().sort({ created: 1 });
    mainWindow.webContents.send("logs:get", JSON.stringify(logs));
  } catch (err) {
    console.log(err);
  }
}

// Add new measurement to user
ipcMain.on("logs:add", async (e, item) => {
  try {
    await Measurement.create(item);
    sendLogs();
  } catch (err) {
    console.log(err);
  }
});

// Delete log
ipcMain.on("logs:delete", async (e, _id) => {
  try {
    await Measurement.findOneAndRemove({ _id: _id });
    sendLogs();
  } catch (err) {
    console.log(err);
  }
});

// User logs
ipcMain.on("userLogs:load", async (e, _id) => {
  try {
    const userLogs = await Measurement.find({ userId: _id }).sort({
      created: 1,
    });
    mainWindow.webContents.send("userLogs:get", JSON.stringify(userLogs));
  } catch (err) {
    console.log(err);
  }
});

// Send Logs
/* async function sendUserLogs() {
  try {
    const userLogs = await Measurement.find().sort({ created: 1 });
    mainWindow.webContents.send("userLogs:get", JSON.stringify(userLogs));
  } catch (err) {
    console.log(err);
  }
} */

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;

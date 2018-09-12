const electron = require('electron')
const Menu = electron.Menu
const app = electron.app
const ipc = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const remote = electron.remote
function createMenu(flag)
{
  let menuItem=[];
  if(flag) {
    menuItem = [
      {
        label: 'Show Widget',
        click () {
          widgetWindow.show();
        }
      }
    ]
  }else {
    menuItem = [
      {
        label: 'Hide Widget',
        click () {
          widgetWindow.hide()
        }
      }
    ]
  }
  const template = [
    {
      label: 'Widget',
      submenu: menuItem
    }
  ];
  return template;
}

let mainWindow, widgetWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: electron.screen.width, height: electron.screen.height });
  mainWindow.loadURL('http://localhost:3000');
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => mainWindow = null);
  widgetWindow = new BrowserWindow({
    width: 200,
    height: 200,
    alwaysOnTop:true,
    resizable:false,
    show: false,
    movable:true,
    frame:false
  });
  widgetWindow.setPosition(1150, 0)
  // widgetWindow.webContents.openDevTools()
  widgetWindow.on('show',()=>{
    const menu = Menu.buildFromTemplate(createMenu(false))
    Menu.setApplicationMenu(menu)
  })
  widgetWindow.on('hide',()=>{
    const menu = Menu.buildFromTemplate(createMenu(true))
    Menu.setApplicationMenu(menu)
  })
  widgetWindow.loadURL('http://localhost:3000/Widget');

  ipc.on('onWindowClose', (event, arg) => {
    widgetWindow.hide()
  })
  ipc.on('webContentChange', (event, arg) => {
    mainWindow.webContents.send(arg)
  })
  ipc.on('request-update-label-in-second-window', (event, arg) => {
    widgetWindow.webContents.send('action-update-label', arg);
  });
  const menu = Menu.buildFromTemplate(createMenu(true))
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
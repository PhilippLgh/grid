const path = require('path')
const { menubar } = require('menubar')
const { Menu, shell } = require('electron')
const {
  registerGlobalPluginManager
} = require('./modules/Plugins/PluginManager')
const { registerGlobalAppManager } = require('./modules/Apps/AppManager')
const { registerGlobalUserConfig } = require('./modules/Config')
const { registerPackageProtocol } = require('@philipplgh/electron-app-manager')
registerPackageProtocol()
registerGlobalUserConfig()

const preloadPath = path.join(__dirname, 'modules', 'Electron', 'preload.js')

const makePath = p =>
  (process.os !== 'windows' ? 'file://' : '') + path.normalize(p)

const mb = menubar({
  index: makePath(`${__dirname}/../grid-ui/public/nano.html`),
  browserWindow: {
    alwaysOnTop: true, // good for debugging
    transparent: true,
    backgroundColor: '#00FFFFFF',
    frame: false,
    resizable: false,
    width: 320,
    height: 420,
    webPreferences: {
      preload: preloadPath
    }
  },
  icon: path.resolve(`${__dirname}/build/IconTemplate.png`)
})

mb.on('ready', () => {
  const pluginManager = registerGlobalPluginManager()
  const appManager = registerGlobalAppManager()

  /* for testing:
  appManager.launch({
    name: 'grid-ui',
    args: {
      scope: {
        component: 'terminal',
        client: 'geth'
      }
    }
  })
  */

  mb.showWindow()
  /*
  mb.window.webContents.openDevTools({
    mode: 'detach'
  })
  */
})

// right-click menu for tray
mb.on('after-create-window', function() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Feedback',
      click: () => {
        shell.openExternal(
          'https://docs.google.com/forms/d/e/1FAIpQLSeJ4BtbvDVSnIFCKG6TmJo_tbSZql-NBZHes_-M6SyTDTjP0Q/viewform'
        )
        mb.hideWindow()
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        mb.app.quit()
      }
    }
  ])
  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(contextMenu)
  })
})

const {app, BrowserWindow} = require("electron")
const path = require("path")

const createWindow = () => {
	const win = new BrowserWindow({
        show: false,
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: "#2f3241",
            symbolColor: "#74b1be"
        },
		width: 800,
		height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
	})
  
	win.loadFile('build/index.html')
    win.once("ready-to-show", () => {
        win.show()
    })
}

app.whenReady().then(() => {
	createWindow()

    // OS X standard behavior
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) createWindow()
    })
})

// OS X standard behavior
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})
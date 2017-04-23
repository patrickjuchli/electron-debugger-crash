/**
 * This example crashes when reading a specific JS file
 * using the Chrome Debugging Protocol's "Debugger.getScriptSource".
 * 
 * The file is coming from `twitter.com`:
 * `https://abs.twimg.com/k/en-gb/7.pages_front.en-gb.58ce57d023c3cda5d28a.js`
 */
const { app, BrowserWindow } = require("electron");

let window;

app.once("ready", () => {
    window = new BrowserWindow();
    const cd = window.webContents.debugger;
    cd.attach();
    cd.on("message", (event, method, params) => {
        if (method === "Debugger.scriptParsed") {
            console.log("get source of", params.url);
            cd.sendCommand("Debugger.getScriptSource", {
                scriptId: params.scriptId
            });
        }
    })
    cdp.sendCommand("Debugger.enable");
    window.webContents.loadURL("http://twitter.com");
});

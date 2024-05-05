import {AutoJsDebugServer, Device} from "../src/server/autojs-debug";
export function showInformationMessage(message: string) {
 console.log(message);
}
const server = new AutoJsDebugServer(9317);
server
    .on('connect', () => {
        const servers = server.getIPs().join(":" + server.getPort() + " or ") + ":" + server.getPort();
        console.log(servers);
        // const showQrcode = "Show QR code"
        // showInformationMessage(`Auto.js Autox.js \r\n server running on ${servers}`, showQrcode).then((result) => {
        //     if (result === showQrcode) {
        //         vscode.commands.executeCommand("extension.showQrCode")
        //     }
        // });
    })
    .on('connected', () => {
        showInformationMessage('Auto.js Server already running');
    })
    .on('disconnect', () => {
        showInformationMessage('Auto.js Server stopped');
    })
    .on('adb:tracking_start', () => {
        showInformationMessage(`ADB: Tracking start`);
    })
    .on('adb:tracking_started', () => {
        showInformationMessage(`ADB: Tracking already running`);
    })
    .on('adb:tracking_stop', () => {
        showInformationMessage(`ADB: Tracking stop`);
    })
    .on('adb:tracking_error', () => {
        showInformationMessage(`ADB: Tracking error`);
    })
    .on('new_device', (device: Device) => {
        let messageShown = false;
        const showMessage = () => {
            if (messageShown)
                return;
            showInformationMessage('New device attached: ' + device);
            messageShown = true;
        };
        setTimeout(showMessage, 1000);
        device.on('data:device_name', showMessage);
        // device.send("hello","打开连接");
    })
    .on('cmd', (cmd: string, url: string) => {
        console.log(cmd, url);
        // switch (cmd) {
        //     case "save":
        //         extension.saveProject(url);
        //         break;
        //     case "rerun":
        //         extension.stopAll();
        //         setTimeout(function () {
        //             extension.run(url);
        //         }, 1000);
        //         break;
        //     default:
        //         break;
        // }
    })

server.listen()

// import {AutoJsDebugServer, Device} from "./autojs-debug";
//
// const server = new AutoJsDebugServer(9317);
// let recentDevice = null;
// export function showInformationMessage(message: string) {
//  console.log(message);
// }
// server
//     .on('connect', () => {
//         const servers = server.getIPs().join(":" + server.getPort() + " or ") + ":" + server.getPort();
//         const showQrcode = "Show QR code"
//         console.log(servers);
//         // showInformationMessage(`Auto.js Autox.js \r\n server running on ${servers}`, showQrcode)
//         // .then((result) => {
//         //     if (result === showQrcode) {
//                 // vscodeexecuteCommand("extension.showQrCode")
//             // }
//         // });
//     })
//     .on('connected', () => {
//         showInformationMessage('Auto.js Server already running');
//     })
//     .on('disconnect', () => {
//         showInformationMessage('Auto.js Server stopped');
//     })
//     .on('adb:tracking_start', () => {
//         showInformationMessage(`ADB: Tracking start`);
//     })
//     .on('adb:tracking_started', () => {
//         showInformationMessage(`ADB: Tracking already running`);
//     })
//     .on('adb:tracking_stop', () => {
//         showInformationMessage(`ADB: Tracking stop`);
//     })
//     .on('adb:tracking_error', () => {
//         showInformationMessage(`ADB: Tracking error`);
//     })
//     .on('new_device', (device: Device) => {
//         let messageShown = false;
//         const showMessage = () => {
//             if (messageShown)
//                 return;
//             showInformationMessage('New device attached: ' + device);
//             messageShown = true;
//         };
//         setTimeout(showMessage, 1000);
//         device.on('data:device_name', showMessage);
//         // device.send("hello","打开连接");
//     })
//     .on('cmd', (cmd: string, url: string) => {
//         // switch (cmd) {
//         //     case "save":
//         //         extension.saveProject(url);
//         //         break;
//         //     case "rerun":
//         //         extension.stopAll();
//         //         setTimeout(function () {
//         //             extension.run(url);
//         //         }, 1000);
//         //         break;
//         //     default:
//         //         break;
//         // }
//     })
//
//
import {AutoJsDebugServer, Device} from "./autojs-debug";

export class Extension {
    server: AutoJsDebugServer;
    recentDevice: Device;

    runOnDevice(data) {
        this.selectDevice(device => this.runOn(device, data));
    }

    selectDevice(callback) {
        let devices: Array<Device> = this.server.devices;
        if (this.recentDevice) {
            const i = devices.indexOf(this.recentDevice);
            if (i > 0) {
                devices = devices.slice(0);
                devices[i] = devices[0];
                devices[0] = this.recentDevice;
            }
        } else {
            this.recentDevice = devices[0];
        }
        const names = devices.map(device => device.toString());
        console.log(names);
        let device = this.recentDevice;
        callback(device);
        // vscode.window.showQuickPick(names)
        //   .then(select => {
        //     const device = devices[names.indexOf(select)];
        //     recentDevice = device;
        //   });
    }

    runOn(target: AutoJsDebugServer | Device, data) {
        // const editor = vscode.window.activeTextEditor;
        target.sendCommand('run', data);
        // {
        //   'id': editor.document.fileName,
        //   'name': editor.document.fileName,
        //   'script': editor.document.getText()
        // }
    }
}

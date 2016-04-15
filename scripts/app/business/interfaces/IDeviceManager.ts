namespace OpenhabUI.Business.Interfaces {
  export interface IDeviceManager {
  getState(deviceName: string): ng.IPromise<string>;
  sendCommand(deviceName: string, command: string): ng.IPromise<any>;
}
}

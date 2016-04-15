namespace OpenhabUI.Directives.switchDevice {
  export function switchDevice(): ng.IDirective {
    return {
      restrict: "E",
      scope: {
        deviceName: "=",
        deviceState: "@",
        deviceLabel: "=",
        deviceCommand: "=",
        wattDeviceName: "=?",
        deviceType: "=?"
      },
      controllerAs: "vm",
      controller: OpenhabUI.Directives.switchDevice.SwitchDeviceDirectiveController,
      templateUrl: "./scripts/app/views/switchDevice.html",
      replace: true
    };
  }
}

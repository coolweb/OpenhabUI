namespace OpenhabUI.Directives.temperatureDevice {
  export function temperatureDevice(): ng.IDirective {
    return {
      restrict: "E",
      scope: {
        deviceName: "=",
        deviceState: "@",
        deviceLabel: "=",
        deviceCommand: "=",
      },
      controllerAs: "vm",
      controller: OpenhabUI.Directives.temperatureDevice.TemperatureDeviceDirectiveController,
      templateUrl: "./scripts/app/views/temperatureDevice.html",
      replace: true
    };
  }
}

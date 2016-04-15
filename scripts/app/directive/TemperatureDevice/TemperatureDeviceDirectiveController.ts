namespace OpenhabUI.Directives.temperatureDevice {
  export class TemperatureDeviceDirectiveController extends BaseDeviceController {
    static $inject = ["$log", "ouiDeviceManager", "$scope", "$mdToast", "$timeout", "$q"];

    constructor($log: ng.ILogService,
      ouiDeviceManager: OpenhabUI.Business.Interfaces.IDeviceManager,
      $scope: OpenhabUI.Directives.temperatureDevice.ITemperatureDeviceDirectiveScope,
      $mdToast: ng.material.IToastService,
      $timeout: ng.ITimeoutService,
      $q: ng.IQService) {
      super($log, ouiDeviceManager, $scope, $mdToast, $timeout, $q);
      this.deviceStateDefaultValue = "0.0";
    }
  }
}

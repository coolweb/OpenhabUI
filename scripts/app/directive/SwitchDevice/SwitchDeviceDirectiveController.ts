namespace OpenhabUI.Directives.switchDevice {
  export class SwitchDeviceDirectiveController extends BaseDeviceController {
    static $inject = ["$log", "ouiDeviceManager", "$scope", "$mdToast", "$timeout", "$q"];

    constructor($log: ng.ILogService,
      ouiDeviceManager: OpenhabUI.Business.Interfaces.IDeviceManager,
      $scope: OpenhabUI.Directives.switchDevice.ISwicthDeviceDirectiveScope,
      $mdToast: ng.material.IToastService,
      $timeout: ng.ITimeoutService,
      $q: ng.IQService) {
      super($log, ouiDeviceManager, $scope, $mdToast, $timeout, $q);
      $scope.wattDeviceValue = "0.0";
      this.deviceStateDefaultValue = "off";
    }

    protected refresh(): ng.IPromise<any> {
      let defered = this.$q.defer<any>();

      super.refresh()
        .then(() => {
        if ((<ISwicthDeviceDirectiveScope>this.$scope).wattDeviceName
          !== undefined) {
          this.$scope.isLoading = true;
          this.refreshDeviceState(
            (<ISwicthDeviceDirectiveScope>this.$scope).wattDeviceName)
            .then(() => {
            this.$scope.isLoading = false;
          });
        }

        defered.resolve();
      },
        () => {
          this.$scope.isLoading = false;
          defered.reject();
        });

      return defered.promise;
    }

    /**
    * Switch the value of the device.
    */
    public switchDevice() {
      if (this.$scope.deviceState === "offline") {
        this.$log.info("Cannot set device state because it's offline");
        return;
      }

      this.$log.info("Switch device state");
      if (this.$scope.deviceState === "on") {
        super.SetDeviceState("off");
      } else {
        super.SetDeviceState("on");
      }
    }

    protected refreshDeviceState(deviceName: string): ng.IPromise<any> {
      let defered = this.$q.defer<any>();

      super.refreshDeviceState(deviceName)
        .then((state: string) => {
        if (deviceName ===
          (<ISwicthDeviceDirectiveScope>this.$scope).wattDeviceName) {
          (<ISwicthDeviceDirectiveScope>this.$scope).wattDeviceValue = state;
        }
      },
        () => {
          defered.reject();
        });

      return defered.promise;
    }
  }
}

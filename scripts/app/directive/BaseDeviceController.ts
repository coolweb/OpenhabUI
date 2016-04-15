namespace OpenhabUI.Directives {
  export abstract class BaseDeviceController {
    private watchDeviceStateListener: any;
    protected deviceStateDefaultValue: string;

    constructor(protected $log: ng.ILogService,
      protected ouiDeviceManager: OpenhabUI.Business.Interfaces.IDeviceManager,
      protected $scope: OpenhabUI.Directives.IBaseDeviceScope,
      protected $mdToast: ng.material.IToastService,
      protected $timeout: ng.ITimeoutService,
      protected $q: ng.IQService) {
      $scope.isLoading = true;
      $scope.isInError = false;
      this.deviceStateDefaultValue = "";

      if ($scope.deviceType === undefined) {
        $scope.deviceType = "plug";
      }

      this.$timeout(() => this.refresh(), 2000);
    }

    public watchDeviceState(newValue: string, oldValue: string) {
      if (newValue !== undefined && oldValue !== undefined) {
        if (newValue !== oldValue) {
          if (newValue === "on" || newValue === "off") {
            this.$log.debug("Device state was changed on UI " + newValue);
            this.ouiDeviceManager.sendCommand(
              this.$scope.deviceCommand,
              newValue.toUpperCase());
          }
        }
      }
    }

    protected refresh(): ng.IPromise<any> {
      let defered = this.$q.defer<any>();
      this.$scope.isLoading = true;

      let getDeviceStateCallback = () => {
        this.$scope.isLoading = false;
        this.$timeout(() => this.refresh(), 10000);
      };

      let getDeviceStateErrorCallback =
        () => {
          this.$scope.isLoading = false;
          this.$timeout(() => this.refresh(), 10000);
        };

      this.refreshDeviceState(this.$scope.deviceName)
        .then(() => getDeviceStateCallback(),
        () => getDeviceStateErrorCallback());

      return defered.promise;
    }

    protected refreshDeviceState(deviceName: string): ng.IPromise<any> {
      let defer = this.$q.defer<any>();

      this.ouiDeviceManager.getState(deviceName)
        .then((state: string) => {
        if (deviceName === this.$scope.deviceName) {
          this.setDeviceStateProperty(state);
        }

        this.$scope.isInError = false;
        defer.resolve(state);
      }, (reason: OpenhabUI.model.ProgramError) => {
          this.$scope.isInError = true;

          if (deviceName === this.$scope.deviceName) {
            this.setDeviceStateProperty(this.deviceStateDefaultValue);
          }

          this.$scope.errorMessage = reason.errorText;
          defer.reject();
        });

      return defer.promise;
    }

    /**
    * Set device value, if the device is in error state
    * it'll show the error.
    * @param state The state value to set.
    */
    public SetDeviceState(state: string) {
      if (this.$scope.isInError) {
        this.showError();
        return;
      }

      this.$scope.deviceState = state;
    }

    /**
    * set the deviceState property on the scope and before desactivate the watch
    */
    protected setDeviceStateProperty(deviceState: string) {
      if (this.watchDeviceStateListener !== undefined) {
        this.watchDeviceStateListener();
        this.watchDeviceStateListener = undefined;
      }

      this.$scope.deviceState = deviceState;

      this.watchDeviceStateListener =
      this.$scope.$watch<string>("deviceState", (newValue: string, oldValue) =>
        this.watchDeviceState(newValue, oldValue));
    }

    public showError() {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(this.$scope.errorMessage)
          .action("ok")
          .hideDelay(0)
          .position("top right")
        );
    }
  }
}

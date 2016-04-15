namespace OpenhabUI.Business {
  export class DeviceManager
    implements OpenhabUI.Business.Interfaces.IDeviceManager {
    static $inject = ["$log", "$q", "ouiOpenhabRepository"];

    constructor(private $log: ng.ILogService,
      private $q: ng.IQService,
      private ouiOpenhabRepository: OpenhabUI.Data.Interfaces.IOpenhabRepository) {
    }

    getState(deviceName: string): ng.IPromise<string> {
      let defer = this.$q.defer<string>();
      let logMessage = "";
      this.$log.debug("Retrieve state of device " + deviceName);

      this.ouiOpenhabRepository.getItemState(deviceName)
        .then((response: ng.IHttpPromiseCallbackArg<string>) => {
        logMessage = "Retrieved state of device "
        + deviceName + " state :" + response.data;
        this.$log.info(logMessage);

        defer.resolve(response.data);
      },
        (reason: ng.IHttpPromiseCallbackArg<OpenhabUI.model.ProgramError>) => {
          let error = new OpenhabUI.model.ProgramError();
          if (reason.status === 404) {
            error.errorCode = OpenhabUI.model.ErrorCodeEnum.DeviceNotFound;
            error.errorText = "Device " + deviceName + " not found";
          } else {
            if (reason.status === -1) {
              error.errorCode = OpenhabUI.model.ErrorCodeEnum.TechnicalError;
              error.errorText = "Impossible d'obtenir le statut de l'appareil " +
              deviceName;
            } else {
              error.errorCode = OpenhabUI.model.ErrorCodeEnum.Unknown;
              error.errorText = reason.statusText;
            }
          }

          this.$log.error("Impossible d'obtenir le statut de l'appareil " +
            deviceName);
          defer.reject(error);
        });

      return defer.promise;
    }

    sendCommand(deviceName: string, command: string): ng.IPromise<any> {
      let defer = this.$q.defer<any>();
      let logMessage = "";
      this.$log.debug("Send command " + command +
        " to device " + deviceName);

      this.ouiOpenhabRepository.sendCommand(deviceName, command)
        .then((response: ng.IHttpPromiseCallbackArg<string>) => {
        this.$log.info("Command send to device " + deviceName);
        defer.resolve();
      },
        (reason: ng.IHttpPromiseCallbackArg<OpenhabUI.model.ProgramError>) => {
          let error = new OpenhabUI.model.ProgramError();
          if (reason.status === 404) {
            error.errorCode = OpenhabUI.model.ErrorCodeEnum.DeviceNotFound;
            error.errorText = "Device " + deviceName + " not found";
          } else {
            if (reason.status === -1) {
              error.errorCode = OpenhabUI.model.ErrorCodeEnum.TechnicalError;
              error.errorText = "Impossible d'envoyer la commande " + command;
              deviceName;
            } else {
              error.errorCode = OpenhabUI.model.ErrorCodeEnum.Unknown;
              error.errorText = reason.statusText;
            }
          }

          this.$log.error("Impossible d'envoyer la commande " + command);
          defer.reject(error);
        });

      return defer.promise;
    }
  }
}

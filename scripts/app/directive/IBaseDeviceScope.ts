namespace OpenhabUI.Directives {
  export interface IBaseDeviceScope extends ng.IScope {
  deviceName: string;
  deviceState: string;
  deviceLabel: string;
  deviceCommand: string;
  deviceType: string;
  isLoading: boolean;
  isInError: boolean;
  errorMessage: string;
}
}

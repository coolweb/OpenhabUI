namespace OpenhabUI {
  let app = angular.module("OpenhabUI", ["ng", "ngMaterial"]);

  app.config(["$httpProvider", ($httpProvider) => {
  $httpProvider.defaults.headers.common["Authorization"] =
  "Basic " + window.btoa("***REMOVED***:***REMOVED***");

  $httpProvider.defaults.headers.common["Content-Type"] =
    "application/json";
}]);

  app.config(function($mdThemingProvider: ng.material.IThemingProvider) {
    $mdThemingProvider.theme("default")
      .accentPalette("green")
      .dark();
  });

  // data
  app.service("ouiOpenhabRepository",
    OpenhabUI.Data.OpenhabRepository);

  // business
  app.service("ouiDeviceManager",
    OpenhabUI.Business.DeviceManager);

  // directive
  app.directive("switchDevice", OpenhabUI.Directives.switchDevice.switchDevice);
  app.directive("temperatureDevice", OpenhabUI.Directives.temperatureDevice.temperatureDevice);
}

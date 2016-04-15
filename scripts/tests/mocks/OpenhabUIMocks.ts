namespace OpenhabUI.Tests.Mocks {
  let dataModule = angular.module("ouiDataMocks", []);

  dataModule.service("ouiOpenhabRepository", ["$q",
    ($q: ng.IQService) => {
      let repository = jasmine.createSpyObj("fake", ["getItemState"]);
      let repositoryMock: OpenhabUI.Tests.Mocks.Data.IOpenhabRepositoryMock;
      repositoryMock = repository;

      let getItemDefered = $q.defer<ng.IHttpPromiseCallbackArg<string>>();
      (<jasmine.Spy> repositoryMock.getItemState)
        .and.returnValue(getItemDefered.promise);
      repositoryMock.getItemStateDefered = getItemDefered;

      return repositoryMock;
    }]);
}

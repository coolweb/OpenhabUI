namespace OpenhabUI.Tests.Mocks.Data {
  export interface IOpenhabRepositoryMock extends
  OpenhabUI.Data.Interfaces.IOpenhabRepository {
  getItemStateDefered: ng.IDeferred<ng.IHttpPromiseCallbackArg<string>>;
}
}

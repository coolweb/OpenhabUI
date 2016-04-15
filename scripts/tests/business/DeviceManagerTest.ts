namespace OpenhabUI.Tests.Business {
  describe("DeviceManager", () => {
    let target: OpenhabUI.Business.DeviceManager;
    let $rootScope: ng.IRootScopeService;
    let ouiOpenhabRepository: OpenhabUI.Tests.Mocks.Data.IOpenhabRepositoryMock;

    beforeEach(() => {
      angular.mock.module("ouiDataMocks");
    });

    beforeEach(inject((
      _ouiOpenhabRepository_: OpenhabUI.Tests.Mocks.Data.IOpenhabRepositoryMock,
      $log: ng.ILogService,
      $q: ng.IQService,
      _$rootScope_: ng.IRootScopeService) => {
      $rootScope = _$rootScope_;
      ouiOpenhabRepository = _ouiOpenhabRepository_;
      target = new OpenhabUI.Business.DeviceManager(
        $log,
        $q,
        ouiOpenhabRepository
        );
    }));

    describe("getState", () => {
      describe("When item exists", () => {
        it("should returns the state", () => {
          let state = "";

          target.getState("test")
            .then((value: string) => {
            state = value;
          });

          ouiOpenhabRepository.getItemStateDefered.resolve({ data: "test" });
          $rootScope.$digest();

          expect(state).toBe("test");
        });
      });

      describe("When item doesn't exists", () => {
        it("should reject with error not found", () => {
          let error: OpenhabUI.model.ProgramError;

          target.getState("test")
            .then((value: string) => {
          }, (err: OpenhabUI.model.ProgramError) => {
              error = err;
            });

          ouiOpenhabRepository.getItemStateDefered.reject({
            data: "not found",
            status: 404
          });
          $rootScope.$digest();

          expect(error.errorCode)
            .toBe(OpenhabUI.model.ErrorCodeEnum.DeviceNotFound);
        });
      });
    });
  });
}

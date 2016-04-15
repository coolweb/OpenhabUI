namespace OpenhabUI.Tests.Data {
  describe("OpenhabRepository", () => {
    let openhabUrl = "http://192.168.1.6";
    let openhabPort = "8080";
    let $httpBackend: ng.IHttpBackendService;
    let target: OpenhabUI.Data.OpenhabRepository;

    beforeEach(inject(function($log: ng.ILogService,
      _$http_: ng.IHttpService,
      _$httpBackend_: ng.IHttpBackendService,
      $q: ng.IQService) {
      let apiUrl = openhabUrl + ":" + openhabPort + "/rest";
      $httpBackend = _$httpBackend_;
      $httpBackend.when("GET",
        apiUrl + "/items/Switch_Fauteil/state"
        )
        .respond("ON");

      $httpBackend.when("GET",
        apiUrl + "/items/ErrorItem/state"
        )
        .respond(500, "error");

      target = new OpenhabUI.Data.OpenhabRepository(
        $log,
        _$http_,
        $q
        );
    }));

    describe("getItemState", () => {
      describe("when item exists", () => {
        it("should return the state", () => {
          // arrange
          let result: string;
          let itemName = "Switch_Fauteil";

          // act
          target.getItemState(itemName)
            .then((response: ng.IHttpPromiseCallbackArg<string>) => {
            result = response.data;
          });
          $httpBackend.flush();

          // assert
          expect(result).toBe("ON", "Item state should be ON");
        });
      });

      describe("when error", () => {
        it("should reject the promise", () => {
          // arrange
          let result: string;
          let itemName = "ErrorItem";

          // act
          target.getItemState(itemName)
            .then(() => { }, (reason: any) => {
            result = reason.data;
          });
          $httpBackend.flush();

          // assert
          expect(result).toBe("error", "The error text should be send");
        });
      });
    });
  });
}

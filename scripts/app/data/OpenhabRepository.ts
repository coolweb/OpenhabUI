namespace OpenhabUI.Data {
  export class OpenhabRepository implements
    OpenhabUI.Data.Interfaces.IOpenhabRepository {
    private openhabHost = "192.168.1.6";
    private openhabPort = "8080";
    private user = "";
    private password = "";

    static $inject = ["$log", "$http", "$q"];

    constructor(private $log: ng.ILogService,
      private $http: ng.IHttpService,
      private $q: ng.IQService) {
    }

    /**
    * Retrieve the state of an item.
    * @param itemName The name of the item to retrieve the state.
    * @returns A promise with the state of the item.
    */
    getItemState(itemName: string): ng.IHttpPromise<string> {
      this.$log.debug("OpenhabRepository getItemState " + itemName);

      let defer = this.$q.defer();
      let apiUrl = "http://" + this.openhabHost + ":" + this.openhabPort +
        "/rest/items/" + itemName + "/state";

      return this.$http.get(apiUrl);
    }

    /**
    * Send a command to an item.
    * @param itemName The name of the iem to which to send the command.
    * @param command The command to send.
    * @param a promise indicating that the command is send.
    */
    sendCommand(itemName: string, command: string): ng.IHttpPromise<any> {
      this.$log.debug("OpenhabRepository sendCommand " + itemName + command);

      let defer = this.$q.defer();
      let apiUrl = "http://" + this.openhabHost + ":" + this.openhabPort +
        "/rest/items/" + itemName;

      return this.$http.post(apiUrl, command, {headers: {"Content-Type": "text/plain"}});
    }
  }
}

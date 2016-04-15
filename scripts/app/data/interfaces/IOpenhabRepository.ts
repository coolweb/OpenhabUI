namespace OpenhabUI.Data.Interfaces {
  export interface IOpenhabRepository {
    /**
    * Retrieve the state of an item.
    * @param itemName The name of the item to retrieve the state.
    * @returns A promise with the state of the item.
    */
    getItemState(itemName: string): ng.IHttpPromise<string>;

    /**
    * Send a command to an item.
    * @param itemName The name of the iem to which to send the command.
    * @param command The command to send.
    * @param a promise indicating that the command is send.
    */
    sendCommand(itemName: string, command: string): ng.IHttpPromise<any>;
  }
}

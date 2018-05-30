
const { EmptyMessage, NumberMessage } = require("../protocol/api/api_pb");

class GrpcClient {

  constructor(options) {
    this.hostname = options.hostname;
    this.port = options.port;

    const { WalletClient, DatabaseClient } = require("../protocol/api/api_grpc_pb");
    const caller = require('grpc-caller');

    /**
     * @type {WalletClient}
     */
    this.walletApi = caller(`${this.hostname}:${this.port}`, WalletClient);

    /**
     * @type {DatabaseClient}
     */
    this.databaseApi = caller(`${this.hostname}:${this.port}`, DatabaseClient);
  }

  /**
   * Retrieve all connected witnesses
   *
   * @returns {Promise<*>}
   */
  async getWitnesses() {
    return await this.walletApi.listWitnesses(new EmptyMessage())
      .then(x => x.getWitnessesList());
  }

  /**
   * Retrieve all connected nodes
   *
   * @returns {Promise<*>}
   */
  async getNodes() {
    return await this.walletApi.listNodes(new EmptyMessage())
      .then(x => x.getNodesList());
  }

  /**
   * Retrieve all accounts
   *
   * @returns {Promise<*>}
   */
  async getAccounts() {
    return await this.walletApi.listAccounts(new EmptyMessage())
      .then(x => x.getAccountsList());
  }


  /**
   * Retrieves a block by the given number
   *
   * @param {number} number block number
   * @returns {Promise<*>}
   */
  async getBlockByNumber(number) {
    let message = new NumberMessage();
    message.setNum(number);
    return await this.walletApi.getBlockByNum(message);
  }

    /**
   * Retrieves latest block
   *
   * @returns {Promise<*>}
   */
  async getNowBlock() {
    return await this.databaseApi.getNowBlock();
  }
}

module.exports = GrpcClient;

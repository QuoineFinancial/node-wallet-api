const { Block, Transaction, Account } = require("../protocol/core/Tron_pb");
const { getBase58CheckAddress, signTransaction, privateKeyToAddress, SHA256 } = require("../utils/crypto");
const { base64DecodeFromString, byteArray2hexStr, bytesToString } = require("../utils/bytes");

const normalizeBlock = raw => ({
  parentHash: byteArray2hexStr(raw.getBlockHeader().getRawData().getParenthash()),
  number: raw.getBlockHeader().getRawData().getNumber(),
  witnessAddress: getBase58CheckAddress(Array.from(raw.getBlockHeader().getRawData().getWitnessAddress())),
  time: raw.getBlockHeader().getRawData().getTimestamp(),
  transactionsCount: raw.getTransactionsList().length,
  contractType: Transaction.Contract.ContractType,
  transactions: raw.getTransactionsList().map(deserializeTransaction),
});

const getAddressFromPrivateKey = privateKeyToAddress.bind(null);

module.exports = { normalizeBlock, getAddressFromPrivateKey };

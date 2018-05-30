const { Block, Transaction, Account } = require("../protocol/core/Tron_pb");

const block = raw => ({
  parentHash: byteArray2hexStr(raw.getBlockHeader().getRawData().getParenthash()),
  number: raw.getBlockHeader().getRawData().getNumber(),
  witnessAddress: getBase58CheckAddress(Array.from(raw.getBlockHeader().getRawData().getWitnessAddress())),
  time: raw.getBlockHeader().getRawData().getTimestamp(),
  transactionsCount: raw.getTransactionsList().length,
  contractType: Transaction.Contract.ContractType,
  transactions: raw.getTransactionsList().map(deserializeTransaction),
});

module.exports = { block };

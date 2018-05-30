const GrpcClient = require("./client/grpc");
const HttpClient = require("./client/http");
const normalize = require("./client/normalize");

module.exports = {
  GrpcClient,
  HttpClient,
  normalize,
};

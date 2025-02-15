const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../../backend/python-grpc/proto/task.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

const client = new taskProto.TaskService(process.env.GRPC_SERVER || 'localhost:50051', grpc.credentials.createInsecure());

module.exports = client;

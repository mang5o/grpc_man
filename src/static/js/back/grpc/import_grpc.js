const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protobuf = require('protobufjs')
const serializer = require('proto3-json-serializer')
const protos = require('google-proto-files')

var importGrpc = function(filePath){
    let root = protobuf.loadSync(filePath.filePaths)
    return root
}

module.exports = importGrpc
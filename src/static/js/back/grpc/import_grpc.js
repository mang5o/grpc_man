const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protobuf = require('protobufjs')
const serializer = require('proto3-json-serializer')
const protos = require('google-proto-files')

var importGrpc = function(filePath){
    console.log(filePath.filePaths)
    let root = protobuf.loadSync(filePath.filePaths)
    console.log(root)
    return root
}

module.exports = importGrpc
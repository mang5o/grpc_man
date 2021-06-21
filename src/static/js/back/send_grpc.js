const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// var sendGrpc = function(doubleVal){
//   let PROTO_PATH = __dirname + '/../src/components/test_proto/test.proto';
//   let packageDefinition = protoLoader.loadSync(
//     PROTO_PATH,
//     {keepCase: true,
//      longs: String,
//      enums: String,
//      defaults: true,
//      oneofs: true
//     });
//     let test_proto = grpc.loadPackageDefinition(packageDefinition);
//     let client = new test_proto['TestService']('localhost:1106', grpc.credentials.createInsecure());
//     let test_double = doubleVal;
//     client['Test']({'test_double': test_double}, function(err, response) {
//         console.log(response);
//       });
// }

// var sendGrpc = function(importstr){ //Import test
//   let PROTO_PATH = __dirname + '/../src/components/test_proto/test.proto';
//   let packageDefinition = protoLoader.loadSync(
//     PROTO_PATH,
//     {keepCase: true,
//      longs: String,
//      enums: String,
//      defaults: true,
//      oneofs: true
//     });
//     let test_proto = grpc.loadPackageDefinition(packageDefinition);
//     let client = new test_proto['TestService']('localhost:1106', grpc.credentials.createInsecure());
//     let test_double = importstr;
//     client['ImportTest']({imported_message: { imported_string: importstr }}, function(err, response) {
//         console.log(response);
//       });
// }

var sendGrpc = function(sessionName, protoName, packageDefinitionPar, service, serverHost, serverPort, rpc, msgPar){
  let PROTO_PATH = __dirname + '/../appdata/'+sessionName+'/proto/' + protoName
  let packageDefinition = protoLoader.loadSync(PROTO_PATH, packageDefinitionPar)
  let loaded = grpc.loadPackageDefinition(packageDefinition)
  let client = new loaded[service](serverHost + ":" + serverPort, grpc.credentials.createInsecure());
  client[rpc](msgPar, function(err,response){
    console.log(response);
  })
}

module.exports = sendGrpc
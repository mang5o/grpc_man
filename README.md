Manage all gRPC processes efficiently through gRPC client simulator.

# What is this project?
When many people test gRPC services, they bother to create their own client sources. gRPC process always has `.proto` files, which allows us to know the form of requests and responses efficiently. This program automatically creates request forms with `.proto` files and helps you communicate with it. Ultimately, I want it to be a management program like Postman.

### Commands
```
npm install            # Project setup & Install dependencies
npm run electron:serve # Project complie
npm run electron:build # Project build (Error)
```

### Preview
| Loading .proto files | Modification sessions |
|----------------------|-----------------------|
|![gif1](https://raw.githubusercontent.com/mang5o/grpc_man/readme_static/readme_gif_1.gif)|![gif2](https://raw.githubusercontent.com/mang5o/grpc_man/readme_static/readme_gif_2.gif)|


| .proto files | View |
|----------------------|-----------------------|
|[png1](https://raw.githubusercontent.com/mang5o/grpc_man/readme_static/readme_preview_1.png)|[png2](https://raw.githubusercontent.com/mang5o/grpc_man/readme_static/readme_preview_2.png)|


### TODO
- [x] Reading .proto files
- [x] Generating form from .proto files
- [x] Function to send gRPC request with nodeJS
- [ ] Implementation stable .proto loading process 
- [ ] Making request data with this project
- [ ] Functions and views to save and analyze responses
- [ ] Refining the design of views
- [ ] Solving errors for packaging process

### Related
| Stack | Description |
|----------------------|-----------------------|
|NodeJS|Backend of this project|
|ElectronJS|Backend for make application|
|VueJS|Frontend for this project|



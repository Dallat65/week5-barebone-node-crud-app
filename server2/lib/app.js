"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const engine2_1 = require("./engine2");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/data/get") {
        // res.end(JSON.stringify({ name: "hello" }));
        return (0, engine2_1.createServer)(req, res);
    }
});
server.listen(3001, () => console.log(`Server is paying attention on port ${3001}`));

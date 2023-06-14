import http, { IncomingMessage, Server, ServerResponse, } from "http";
import {createServer} from "./engine2";
/*
implement your server code here
*/



const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/data/get") {
      // res.end(JSON.stringify({ name: "hello" }));
    return createServer(req, res);
     
    }
  }
);

server.listen(3001, ()=> console.log(`Server is paying attention on port ${3001}`));
 
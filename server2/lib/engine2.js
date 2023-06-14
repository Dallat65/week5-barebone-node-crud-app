"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// ===========GET WEB PAGE DATA============
const createServer = (req, res) => {
    let datas = "";
    req.on("data", (chunk) => {
        datas += chunk;
    });
    req.on("end", async () => {
        let work = JSON.parse(datas);
        let { url } = JSON.parse(datas);
        const result = await puppeteer_1.default.launch();
        const page = await result.newPage();
        await page.goto(url);
        const title = await page.title();
        const imageUrls = await page.evaluate(() => {
            // return document.querySelector("img")?.src;
            let srcs = Array.from(document.querySelectorAll("img")).map((a) => a.getAttribute("src"));
            return srcs;
        });
        const description = await page.evaluate(() => {
            const metaDescription = document.querySelector('meta[name = "description');
            return metaDescription ? metaDescription.getAttribute("content") : "";
        });
        // await result.close()
        work = {
            title: title,
            description: description,
            imageUrls: imageUrls
        };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            message: work
        }));
    });
};
exports.createServer = createServer;

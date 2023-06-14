import fs from 'fs';
import path from 'path';
import {IncomingMessage, ServerResponse} from "http";
import puppeteer from 'puppeteer';

interface Webpages {
    title: string,
    description: string,
    imageUrls : string[]
}


// ===========GET WEB PAGE DATA============

export const createServer = (req: IncomingMessage, res: ServerResponse)=> {
    let datas = "";
    req.on("data", (chunk) =>{
        datas += chunk;
    })
    req.on("end", async() =>{
        let work = JSON.parse(datas)

        let {url} = JSON.parse(datas)
        const result = await puppeteer.launch()
        const page = await result.newPage()
        await page.goto(url)
        const title = await page.title();
        const imageUrls = await page.evaluate(() =>{
            // return document.querySelector("img")?.src;
            let srcs = Array.from(document.querySelectorAll("img")).map((a) => a.getAttribute("src"));
            return srcs

        })
        const description = await page.evaluate(() =>{
            const metaDescription = document.querySelector('meta[name = "description');
            return metaDescription ? metaDescription.getAttribute("content") : "";

        })
        // await result.close()
        work = {
            title : title,
            description: description,
            imageUrls: imageUrls
        
        }
        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({
            success: true,
            message: work
        }))
       
    })
}
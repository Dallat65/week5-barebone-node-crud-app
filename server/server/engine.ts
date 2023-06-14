import fs from 'fs';
import path from 'path';
import {IncomingMessage, ServerResponse } from "http";

interface Organizations{
    organization: string,
    createdAt: string,
    updatedAt: string,
    products: string[],
    marketValue: string,
    address: string,
    ceo: string,
    country: string,
    id: number,
    noOfEmployees:number,
    employees: string[]
  }


//======== ADD/CREATE DATA ===========
export const createData = (req: IncomingMessage, res: ServerResponse) => {
    let datas = "";
    req.on("data", (chunk) => {
        datas += chunk;
    })

    req.on("end", () => {
        let work = JSON.parse(datas)
        let databaseFolder = path.join(__dirname, "database")
        let databaseFile = path.join(databaseFolder, "database.json")

        if (!fs.existsSync(databaseFolder)){
            fs.mkdirSync(databaseFolder)
        }
        if (!fs.existsSync(databaseFile)){
            fs.writeFileSync(databaseFile, " ")
        }
    return fs.readFile (path.join(__dirname, "database/database.json"), "utf-8", (err, info) => {
            if (err){
                res.writeHead(500, {"content-Type": "application/json"});
                res.end(JSON.stringify({
                    success: false,
                    error:err
                }))
            }else {
                let organization: Organizations[] = []

                try{
                    organization = JSON.parse(info)
                }catch(parseError) {
                    organization = []
                }
                work.createdAt = new Date();
                work.noOfEmployees = work.employees.length;
                if(organization.length === 0){
                    work.id = 1
                }else {
                    let ids = organization.map((a => a.id))
                    let newId = Math.max(...ids)
                    work.id = newId + 1
                }
                organization.push(work)
                console.log(organization)
                fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err) => {
                    if (err){
                        res.writeHead(500, {"content-Type": "application/json"});
                        res.end(JSON.stringify({
                            success: false,
                            error:err
                        }))
                    }else{
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(
                            JSON.stringify({
                                success: true,
                                message: work
                            })
                        )
                    }
                })
            }
        })
    })
}

//=============GET ALL/READ DATA====================
export const fetchAllData = (req: IncomingMessage, res: ServerResponse) => {
    // read and return all data from database to frontend
    return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, info) =>{
        if(err){
            res.writeHead(500, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({
                success: false, 
                error: err
            }))
        }else {
            res.writeHead(200, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({
                success: true, 
                data: JSON.parse(info)
            }))
            
        }
    })
}
 //==============UPDATE/PUT DATA====================
export const upDateData=(req:IncomingMessage, res:ServerResponse)=>{
    let datas="";
    req.on("data",(chunk)=>{
         datas+=chunk;
        

    })
    req.on("end", ()=>{
        let work = JSON.parse(datas)
        return fs.readFile (path.join(__dirname, "database/database.json"), "utf-8", (err, info) => {
            if (err){
                res.writeHead(500, {"content-Type": "application/json"});
                res.end(JSON.stringify({
                    success: false,
                    error:err
                }))
            }else {
                let organization: Organizations[] = JSON.parse(info)
                let upDated = organization.findIndex((a)=> a.id === work.id)
                organization[upDated] = work
                fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err) => {
                    if (err){
                        res.writeHead(500, {"content-Type": "application/json"});
                        res.end(JSON.stringify({
                            success: false,
                            error:err
                        }))
                    }else{
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(
                            JSON.stringify({
                                success: true,
                                message: work
                            })
                        )
                    }
                })
            }
       })
    })
}

//===================== DELETE DATA=====================

export const deleteData = (req: IncomingMessage, res: ServerResponse) => {
    let datas ="";
    req.on("data", (chunk) =>{
        datas +=chunk;
    })
    req.on("end", () => {
        let work = JSON.parse(datas)
        console.log(work);
    
        return fs.readFile(path.join (__dirname, "database/database.json"), "utf-8", (err, info) => {
            if (err){
             res.writeHead(500, {"Content-Type" : "application/json"});
             res.end(JSON.stringify({
                success : false,
                error : err
             }))   
            }else {
                let organization: Organizations[] = JSON.parse(info)
                let deleted = organization.findIndex((a)=> a.id === work.id)
                organization[deleted] = work;
                organization.splice(deleted, 1);

                fs.writeFile(path.join (__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err) =>{
                    if (err){
                        res.writeHead(500, {"Content-Type" : "application/json"});
                        res.end(JSON.stringify({
                            succcess : false,
                            error: err
                        }))
                    } else {
                        res.writeHead(200, {"Content-Type" : "application/json"});
                        res.end(JSON.stringify({
                            success : true,
                            message : organization
                        }))
                    }
                 })
            }
        })
    })
    

}

const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { json } = require("stream/consumers");

module.exports=class Home{
    constructor(houseName,pricePerNight,location,Rating,Photo,id){
    this.houseName=houseName;
    this.pricePerNight=pricePerNight;
    this.location=location;
    this.Rating=Rating;
    this.Photo=Photo;
    this.id=id;
    }
    
    save(){
         Home.fetchAll(registerHomes=>{
        registerHomes.push(this);
        const filePath = path.join(rootDir,"data","homes.json");
        fs.writeFile(filePath,JSON.stringify(registerHomes),err=>{console.log(err);});
         })
    }
    static fetchAll(callback){
        const filePath = path.join(rootDir,"data","homes.json");
        fs.readFile(filePath,(err,data)=>{
            let home =[];
            if(err){
                callback(home);
            }else{
                if(data.toString()){
                home=JSON.parse(data);
                 }
                  callback(home);
            }
        })
    }
    static findById(homeId,callback){
        const filePath = path.join(rootDir,"data","homes.json");
        let homeFound;
        Home.fetchAll(homes=>{
             homeFound=homes.find(home=>home.id==homeId);
        callback(homeFound);
        })
    }
}
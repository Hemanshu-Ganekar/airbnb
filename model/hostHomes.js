const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Home = require('./home');
module.exports= class hostHomes{
   static  editHome(id,updatedHome,callback){
     const dataPath = path.join(rootDir,"data","homes.json");
          
            Home.fetchAll(homes=>{
                   let index;
                   index=homes.findIndex(home=>home.id==id);
                   if(index==-1){console.log("not found"); return callback();};
                   homes[index]={id:id,...updatedHome};
                   fs.writeFile(dataPath,JSON.stringify(homes),(err)=>{
                    if(err)console.log(err);
                    callback(homes[index]);
                   })
            })
            
     }
    static deleteHostedHome(id, callback) {
             const dataPath = path.join(rootDir, "data", "homes.json");
     
             Home.fetchAll(homes => {
                 let newList=[];
                 
                 newList = homes.filter(home => home.id !== id);
                 fs.writeFile(dataPath, JSON.stringify(newList), (err) => {
                     if (err) { console.log(err); }
                 callback();
                 });
                 
             })
         }
}
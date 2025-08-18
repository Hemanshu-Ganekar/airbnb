const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");
const home = new Home;
const {getDB}=require("../utils/database");

module.exports = class favourite {

    static async addfavourite(id) {
                const db=getDB();
    let favId=await db.collection('favourites').findOne({id:id});
    if(!favId){
    return  db.collection('favourites').insertOne({id:id});
    }else{
        console.log("Favourite already exist!!");
      return null;
    }  
}
    static deleteFavourite(id) {
           const db=getDB();
    return  db.collection('favourites').deleteOne({id:id});
    }
    static async showFav() {
        let favHomes = [];
        const db=getDB();
     const favIds= await db.collection('favourites').find().toArray();
     const homes = await Home.fetchAll();
     favIds.forEach(favId => {
        const home = homes.find(h=>String(h._id)==String(favId.id));
        if(home){
        favHomes.push(home);
        }
    });
    return favHomes;
    }
}
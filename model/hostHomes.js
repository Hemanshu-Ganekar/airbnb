const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Home = require('./home');
const {getDB} = require('../utils/database');
const { ObjectId } = require("mongodb");

module.exports= class hostHomes{
   static  editHome(id,updatedHome){
      const db=getDB();
      return db.collection('homes').updateOne({_id:new ObjectId(id)},{$set:updatedHome});     
     }
    static deleteHostedHome(id) {
        const db=getDB();
        console.log(id);
        return db.collection('homes').deleteOne({_id:new ObjectId(id)});
         }
}
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Home = require('./home');
const db = require('../utils/database');

module.exports= class hostHomes{
   static  editHome(id,updatedHome){
  return db.execute(`
    UPDATE homes
    set houseName=?,
    pricePerNight=?,
    location=?,
    Rating=?,
    Photo=?,
    description=?
    WHERE id=?
    `,[
        updatedHome.houseName,
        updatedHome.pricePerNight,
        updatedHome.location,
        updatedHome.Rating,
        updatedHome.Photo,
        updatedHome.description,
        id
    ])          
     }
    static deleteHostedHome(id, callback) {
        return db.execute('DELETE FROM homes WHERE id=?',[id]);
         }
}
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { json } = require("stream/consumers");
const db = require('../utils/database');

module.exports=class Home{
    constructor(houseName,pricePerNight,location,Rating,Photo,description){
    this.houseName=houseName;
    this.pricePerNight=pricePerNight;
    this.location=location;
    this.Rating=Rating;
    this.Photo=Photo;
    this.description=description;
    }
    
    save(){
        return db.execute('INSERT INTO homes (houseName,pricePerNight,location,Rating,Photo,description) Value (?,?,?,?,?,?)',[this.houseName,this.pricePerNight,this.location,this.Rating,this.Photo,this.description]);
    }
    static fetchAll(){
    return db.execute("SELECT * FROM homes");
    }
    static findById(homeId){
   return db.execute('SELECT*FROM homes WHERE id=?',[homeId]);
    }
}
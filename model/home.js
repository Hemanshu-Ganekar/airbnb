const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { json } = require("stream/consumers");
const {getDB}=require("../utils/database");
const { ObjectId } = require("mongodb");

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
     const db=getDB();
     return db.collection('homes').insertOne(this);
    }
    static fetchAll(){
     const db=getDB();
    return db.collection('homes').find().toArray();
    }
    static findById(homeId){
        const db=getDB();

    return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();
    }
}
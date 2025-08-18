const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");
const home = new Home;
const {getDB}=require("../utils/database");


module.exports = class bookings {

    static async addbookings(id) {
                          const db=getDB();
    let favId=await db.collection('bookings').findOne({id:id});
    if(!favId){
    return  db.collection('bookings').insertOne({id:id});
    }else{
        console.log("booking already exist!!");
      return null;
    }             
    }
    static deletebookings(id) {
     const db=getDB();
    return  db.collection('bookings').deleteOne({id:id});
    }
    static async showbook() {
     let bookHomes = [];
        const db=getDB();
     const bookIds= await db.collection('bookings').find().toArray();
     const homes = await Home.fetchAll();
     bookIds.forEach(bookId => {
        const home = homes.find(h=>String(h._id)==String(bookId.id));
        if(home){
        bookHomes.push(home);
        }
    });
    return bookHomes;
    }

}

const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");
const home = new Home;
const db = require('../utils/database');

module.exports = class bookings {

    static addbookings(id) {
          return  db.execute('INSERT INTO bookings (id) VALUES (?)',[Number(id)]);
    }
    static deletebookings(id) {
            return db.execute('DELETE FROM bookings WHERE id=?',[Number(id)]);
    }
    static async showbook() {
   
             let bookHomes = [];
            let [books,fields]=await db.execute('SELECT*FROM bookings')
             
             for(let book of books){
                 const [home]= await db.execute('SELECT*FROM homes WHERE id=?',[book.id]);
    
                 bookHomes.push(home[0]);
             }
            
             return bookHomes;

    }

}

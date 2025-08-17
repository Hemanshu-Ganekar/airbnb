const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");
const home = new Home;
const db = require('../utils/database');

module.exports = class favourite {

    static addfavourite(id) {
    return  db.execute('INSERT INTO favourite (id) VALUES (?)',[Number(id)]);
    }
    static deleteFavourite(id) {
     return db.execute('DELETE FROM favourite WHERE id=?',[Number(id)]);
    }
    static async showFav() {
        let favHomes = [];
       let [favs,fields]=await db.execute('SELECT*FROM favourite')
        for(let fav of favs){
            const [home]= await db.execute('SELECT * FROM homes where id=?',[fav.id]);
            favHomes.push(home[0]);
        }
        return favHomes;
    }
}

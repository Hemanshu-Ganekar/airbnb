const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");
const home = new Home;

module.exports = class favourite {
    static getfavourite(callback) {
        const favPath = path.join(rootDir, "data", "favourite.json");
        fs.readFile(favPath, (err, data) => {
            let favIds = [];
             if (!err && data.length > 0) {
            favIds = JSON.parse(data);

        } callback(favIds);
        })
    }
    static addfavourite(id, callback) {
        const favPath = path.join(rootDir, "data", "favourite.json");

        favourite.getfavourite(favIds => {
            favIds.push(id);
            fs.writeFile(favPath, JSON.stringify(favIds), (err) => {
                if (err) { console.log(err); }
            });
            callback();
        })
    }
    static deleteFavourite(id, callback) {
        const favPath = path.join(rootDir, "data", "favourite.json");

        favourite.getfavourite(favIds => {
            let newFav=[];
            
            newFav = favIds.filter(favId => favId.id !== id);
            fs.writeFile(favPath, JSON.stringify(newFav), (err) => {
                if (err) { console.log(err); }
            callback();
            });
            
        })
    }
    static showFav(callback) {
        const favPath = path.join(rootDir, "data", "favourite.json");
        const dataPath = path.join(rootDir, "data", "data.json");
        let favHomes = [];
        Home.fetchAll(homes => {
            favourite.getfavourite(favIds => {
                homes.forEach(home => {
                    favIds.forEach(favId => {
                        if (favId.id == home.id) {
                            favHomes.push(home);
                        }
                    })
                });
                callback(favHomes);

            })
        })

    }

}

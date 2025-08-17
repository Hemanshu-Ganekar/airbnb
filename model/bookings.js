const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");
const home = new Home;

module.exports = class bookings {
    static getbookings(callback) {
        const bookPath = path.join(rootDir, "data", "bookings.json");
        fs.readFile(bookPath, (err, data) => {
            let bookIds = [];
             if (!err && data.length > 0) {
            bookIds = JSON.parse(data);

        } callback(bookIds);
        })
    }
    static addbookings(id, callback) {
        const bookPath = path.join(rootDir, "data", "bookings.json");

        bookings.getbookings(bookIds => {
            bookIds.push(id);
            fs.writeFile(bookPath, JSON.stringify(bookIds), (err) => {
                if (err) { console.log(err); }
            });
            callback();
        })
    }
    static deletebookings(id, callback) {
        const bookPath = path.join(rootDir, "data", "bookings.json");

        bookings.getbookings(bookIds => {
            let newbook=[];
            
            newbook = bookIds.filter(bookId => bookId.id !== id);
            fs.writeFile(bookPath, JSON.stringify(newbook), (err) => {
                if (err) { console.log(err); }
            callback();
            });
            
        })
    }
    static showbook(callback) {
        const bookPath = path.join(rootDir, "data", "bookings.json");
        const dataPath = path.join(rootDir, "data", "data.json");
        let bookHomes = [];
        Home.fetchAll(homes => {
            bookings.getbookings(bookIds => {
                homes.forEach(home => {
                    bookIds.forEach(bookId => {
                        if (bookId.id == home.id) {
                            bookHomes.push(home);
                        }
                    })
                });
                callback(bookHomes);

            })
        })

    }

}

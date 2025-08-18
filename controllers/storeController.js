const Home = require("../model/home");
const Fav = require("../model/favourite");
const bookings = require("../model/bookings");

const homeList = (req, res, next) => {
    Home.fetchAll().then((registerHomes)=>{
        res.render('store/homeList', { registerHomes: registerHomes, currentPage:"home" });
    })
   
}
exports.homeList = homeList;


const favourite = (req, res, next) => {
    Fav.showFav().then((favHomes) => {
        res.render('store/favourite', { favHomes:favHomes, currentPage:"favourite" });

    })
}
exports.favourite = favourite;

const details = (req, res, next) => {
    const homeid = req.params.homeid;
    Home.findById(homeid).then((homeFound) => {
        if (!homeFound) {
            console.log("Home not Found!!");
            res.redirect("/");
        } else {
            console.log(homeFound);
            res.render('store/details', { homeFound:homeFound,currentPage:"home" });
        }
    })
}
exports.details = details;

const addFavourite = (req, res, next) => {
  
    const id = req.body.id;
    Fav.addfavourite(id)
    .then(() => {
        res.redirect("/");
    });
}
exports.addFavourite = addFavourite;

const deleteFavourite = (req, res, next) => {
    const id = req.body.id;

    if (!id) {
        return res.status(400).send("No ID provided");
    }

    Fav.deleteFavourite(id).then(() => {
        res.redirect("/favourite");
    });
};
exports.deleteFavourite = deleteFavourite;

// booking
const addBookings = (req, res, next) => {
    const id = req.body.id; 
    bookings.addbookings(id).then(() => {
        res.redirect("/");
    });
}
exports.addBookings = addBookings;

const deleteBookings = (req, res, next) => {
    const id = req.body.id;

    if (!id) {
        return res.status(400).send("No ID provided");
    }

    bookings.deletebookings(id).then(() => {
        res.redirect("/bookings");
    });
};

exports.deleteBookings = deleteBookings;

const showBookings = (req, res, next) => {
    bookings.showbook().then((bookHomes) => {
        
        res.render('store/bookings', { bookHomes:bookHomes,currentPage:"bookings" });

    })
}
exports.showBookings = showBookings;

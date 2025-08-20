const Home = require("../model/home");
const Fav = require("../model/favourite");
const bookings = require("../model/bookings");

const homeList = (req, res, next) => {
    Home.find().then((registerHomes)=>{
        res.render('store/homeList', { registerHomes: registerHomes, currentPage:"home" });
    })
   
}
exports.homeList = homeList;


const favourite = async (req, res, next) => {
    let favHomes=[];
    // let favIds = await Fav.find();
    // Ids= favIds.map(favId=>favId.id);
    // favHomes = await Home.find({_id:{$in:Ids}});
    // res.render('store/favourite', {favHomes:favHomes,currentPage:"favourite" });
    Fav.find().populate('id')
    .then((favIds)=>{
        const favHomes=favIds.map(fav=>fav.id);
     res.render('store/favourite', {favHomes:favHomes,currentPage:"favourite" });

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
            res.render('store/details', { homeFound:homeFound,currentPage:"home" });
        }
    })
}
exports.details = details;

const addFavourite = (req, res, next) => {
    const id = req.body.id;
    const exist=Fav.findOne({id:id})
    .then((exist)=>{
    if(!exist){
        let fav = new Fav({id:id});
        fav.save();
    }
    res.redirect("/");
    })
}
exports.addFavourite = addFavourite;

const deleteFavourite = (req, res, next) => {
    const id = req.body.id;

    if (!id) {
        return res.status(400).send("No ID provided");
    }

    Fav.deleteOne({id:id}).then(() => {
        res.redirect("/favourite");
    });
};
exports.deleteFavourite = deleteFavourite;

// booking
const addBookings = (req, res, next) => {
     const id = req.body.id;
    const exist=bookings.findOne({id:id})
    .then((exist)=>{
    if(!exist){
        let book = new bookings({id:id});
        book.save();
    }
    res.redirect("/");
    })    
}
exports.addBookings = addBookings;

const deleteBookings = (req, res, next) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).send("No ID provided");
    }
    bookings.deleteOne({id:id}).then(() => {
        res.redirect("/bookings");
    });
};

exports.deleteBookings = deleteBookings;

const showBookings = async (req, res, next) => {
        let bookHomes=[];

bookings.find().populate('id')
    .then((bookIds)=>{
        const bookHomes=bookIds.map(fav=>fav.id);
        res.render('store/bookings', { bookHomes:bookHomes,currentPage:"bookings" });
    })

}
exports.showBookings = showBookings;

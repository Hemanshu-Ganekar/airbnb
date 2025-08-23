const Home = require("../model/home");
const user = require("../model/user");

const homeList = async (req, res, next) => {
    const registerHomes = await Home.find();
    const userType = await req.session.isLoggedIn ? req.session.user.userType : "guest";
    const isLoggedIn = await req.session.isLoggedIn || false;
    console.log(isLoggedIn);
    res.render('store/homeList', { registerHomes: registerHomes, currentPage:"home",isLoggedIn:isLoggedIn  , userType:userType });
}
exports.homeList = homeList;

const details = (req, res, next) => {
    const homeid = req.params.homeid;
    Home.findById(homeid).then((homeFound) => {
        if (!homeFound) {
            console.log("Home not Found!!");
            res.redirect("/");
        } else {
            res.render('store/details', { homeFound:homeFound,currentPage:"home",isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType });
        }
    })
}
exports.details = details;


//favourite
const favourite = async (req, res, next) => {
    let favHomes=[];
    const userId = await user.findById(req.session.user._id);
    for(let favourite of userId.favourite){
     const home = await Home.findById(favourite);
     favHomes.push(home);
    };
    console.log(favHomes);
     res.render('store/favourite', {favHomes:favHomes,currentPage:"favourite",isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType  });
}
exports.favourite = favourite;

const addFavourite = async (req, res, next) => {
    const id = req.body.id;
    let userId = await user.findById(req.session.user._id);
    const exist= await userId.favourite.forEach(fav => {
        if(fav == id){
            return true;
        }
    });

    if(!exist){
        userId.favourite.push(id);
        await userId.save();
    }
    res.redirect("/");
}
exports.addFavourite = addFavourite;

const deleteFavourite = async (req, res, next) => {
    const id = req.body.id;
    const userId = await user.findById(req.session.user._id);
    if (!userId) {
        return res.status(400).send("No ID provided");
    }
     userId.favourite = userId.favourite.filter(fav => fav.toString() !== id);
    await userId.save();
        res.redirect("/favourite");
    
};
exports.deleteFavourite = deleteFavourite;

// booking
const addBookings = async (req, res, next) => {
     const id = req.body.id;
     const userId = await user.findById(req.session.user._id);
     const exist = await userId.bookings.forEach(book => {
        if (book == id) {
            return true;
        }
    });

    if (!exist) {
        userId.bookings.push(id);
        await userId.save();
    }
    res.redirect("/");
}
exports.addBookings = addBookings;

const deleteBookings = async (req, res, next) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).send("No ID provided");
    }
    const userId = await user.findById(req.session.user._id);
    if (!userId) {
        return res.status(400).send("No ID provided");
    }
    userId.bookings = userId.bookings.filter(book => book.toString() !== id);
    await userId.save();
    res.redirect("/bookings");
};

exports.deleteBookings = deleteBookings;

const showBookings = async (req, res, next) => {
        let bookHomes=[];
    const userId = await user.findById(req.session.user._id);
    for (const book of userId.bookings) {
        const booking = await Home.findById(book);
        if(booking){
        bookHomes.push(booking);
            }
    }
    console.log(bookHomes);
    if (bookHomes.length === 0) {
        return res.render('store/bookings', { bookHomes: [], currentPage: "bookings", isLoggedIn: req.session.isLoggedIn, userType:req.session.user.userType });
    }
    res.render('store/bookings', { bookHomes:bookHomes,currentPage:"bookings",isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType });
}
exports.showBookings = showBookings;


const Home = require("../model/home");
const hostHomes = require("../model/hostHomes");
const PostHome = (req, res, next) => {
  const { houseName, pricePerNight, location, Rating, Photo, description } = req.body;

  const home = new Home({houseName, pricePerNight, location, Rating, Photo,description});
  home.save().then(()=>{
    console.log("home added!!");
  });
      res.render('host/homeAdded');
}
const getHome = (req, res, next) => {
  res.render('host/editHome', { edit: "false" });
}
exports.PostHome = PostHome;
exports.getHome = getHome;

const hostedHomes = (req, res, next) => {
  Home.find().then((registerHomes) => {
    res.render('host/hostedHomes', { registerHomes: registerHomes, currentPage: "hostedHomes" });

  })
}
exports.hostedHomes = hostedHomes;

const getEditHome = (req, res, next) => {
  const id = req.params.id;
  Home.findById(id).then((homes) => {
    res.render("host/editHome", { home: homes, edit: "true" });
  })
}
exports.getEditHome = getEditHome;

const postEditHome = (req, res, next) => {
  const { houseName, pricePerNight, location, Rating, Photo, id ,description } = req.body;
  Home.findById(id)
  .then((home)=>{
    if(!home){
      console.log("home not found!!");
      res.redirect("/host/hostedHomes");
    }
   home.houseName=houseName;
   home.pricePerNight=pricePerNight;
   home.location=location;
   home.Rating=Rating;
   home.Photo=Photo;
   home.description=description;
   return home.save();
  })
  .then(() => {
    res.redirect('/host/hostedHomes');
  })
}
exports.postEditHome = postEditHome;

const deleteHostedHome = (req, res, next) => {
  const id = req.body.id;
  Home.findByIdAndDelete(id).then(() => {
    res.redirect('/host/hostedHomes');
  })
}
exports.deleteHostedHome = deleteHostedHome;
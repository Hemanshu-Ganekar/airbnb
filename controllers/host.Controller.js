
const Home = require("../model/home");
const hostHomes = require("../model/hostHomes");
const PostHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, pricePerNight, location, Rating, Photo, description } = req.body;

  const home = new Home(houseName, pricePerNight, location, Rating, Photo,description)
  home.save().then(()=>{
    console.log("home added!!");
  })
  res.render('host/homeAdded');
}
const getHome = (req, res, next) => {
  res.render('host/editHome', { edit: "false" });
}
exports.PostHome = PostHome;
exports.getHome = getHome;

const hostedHomes = (req, res, next) => {
  Home.fetchAll().then((registerHomes) => {
    res.render('host/hostedHomes', { registerHomes: registerHomes, currentPage: "hostedHomes" });

  })
}
exports.hostedHomes = hostedHomes;

const getEditHome = (req, res, next) => {
  const id = req.params.id;
  Home.findById(id).then((homes) => {
    console.log(homes);
    res.render("host/editHome", { home: homes, edit: "true" });
  })
}
exports.getEditHome = getEditHome;

const postEditHome = (req, res, next) => {
  const { houseName, pricePerNight, location, Rating, Photo, id ,description } = req.body;
  hostHomes.editHome(id, { houseName, pricePerNight, location, Rating, Photo ,description }).then(() => {
    res.redirect('/host/hostedHomes');
  })
}
exports.postEditHome = postEditHome;

const deleteHostedHome = (req, res, next) => {
  const id = req.body.id;
  hostHomes.deleteHostedHome(id).then(() => {
    res.redirect('/host/hostedHomes');
  })
}
exports.deleteHostedHome = deleteHostedHome;
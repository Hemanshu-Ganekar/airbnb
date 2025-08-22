const Home = require("../model/home");
const user = require("../model/user");
const PostHome = async (req, res, next) => {
  const { houseName, pricePerNight, location, Rating, Photo, description } = req.body;
  const userId = await user.findById(req.session.user._id);
  const home = new Home({ houseName, pricePerNight, location, Rating, Photo, description });
  await home.save();
  console.log(home._id);
  userId.hostedHomes.push(home._id);
  await userId.save();
  console.log("home added!!");
  res.render('host/homeAdded');
}
const getHome = (req, res, next) => {
  res.render('host/editHome', { edit: "false",isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType });
}
exports.PostHome = PostHome;
exports.getHome = getHome;

const hostedHomes = async (req, res, next) => {
  const userId = await user.findById(req.session.user._id);
  console.log(userId);
  const registerHomes = [];
  for(let hosted of userId.hostedHomes){
    const home = await Home.findById(hosted);
    if(home){
      registerHomes.push(home);
    }
     }
     console.log(registerHomes);
    res.render('host/hostedHomes', { registerHomes: registerHomes, currentPage: "hostedHomes" ,isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType});

}
exports.hostedHomes = hostedHomes;

const getEditHome = (req, res, next) => {
  const id = req.params.id;
  Home.findById(id).then((homes) => {
    res.render("host/editHome", { home: homes, edit: "true" ,isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType});
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

const deleteHostedHome = async (req, res, next) => {
  const id = req.body.id;
  const userId = await user.findById(req.session.user._id);
  Home.findByIdAndDelete(id).then(() => {
    res.redirect('/host/hostedHomes');
  })
  userId.hostedHomes = userId.hostedHomes.filter(home => home.toString() !== id);
  await userId.save();
}
exports.deleteHostedHome = deleteHostedHome;
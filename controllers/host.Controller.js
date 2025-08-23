const Home = require("../model/home");
const user = require("../model/user");
const fs = require('fs');
const PostHome = async (req, res, next) => {
  const { houseName, pricePerNight, location, Rating, description } = req.body;
  const userId = await user.findById(req.session.user._id);
  const home = new Home({ houseName, pricePerNight, location, Rating, Photo: req.file.path, description });
  await home.save();
  console.log(req.file);
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

const getEditHome = async (req, res, next) => {
  const id = req.params.id;
  const currentUser = await user.findById(req.session.user._id);

const homeToUpdate = currentUser.hostedHomes.filter(homeId => homeId.toString() === id);
console.log(homeToUpdate);                                //security measure
if (homeToUpdate.length === 0) {                //security measure 
  console.log("Unauthorized Edit Attempt!!");       //security measure
  return res.redirect('/PageNotFound');         //security measure
}

  Home.findById(id).then((homes) => {
    res.render("host/editHome", { home: homes, edit: "true" ,isLoggedIn:req.session.isLoggedIn , userType:req.session.user.userType});
  })
}
exports.getEditHome = getEditHome;

const postEditHome = async (req, res, next) => {
  const { houseName, pricePerNight, location, Rating, id ,description } = req.body;
 
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

   if(req.file){
     fs.unlink(home.Photo, (err) => {
       if (err) {
         console.error("Error deleting old photo:", err);
       }
     });
     home.Photo=req.file.path;
   }
   home.description=description;
   return home.save();
  })
  .then(() => {
    res.redirect('/host/hostedHomes');
  })
}
exports.postEditHome = postEditHome;

const deleteHostedHome = async (req, res, next) => {
  const id = await req.body.id;

                                            const currentUser = await user.findById(req.session.user._id);
                                            const homeToUpdate = currentUser.hostedHomes.filter(homeId => homeId.toString() === id);
                                            console.log(homeToUpdate);                                //security measure
                                            if (homeToUpdate.length === 0) {                //security measure
                                              console.log("Unauthorized Delete Attempt!!");       //security measure
                                              return res.redirect('/PageNotFound');         //security measure
                                            }

  const userId = await user.findById(req.session.user._id);
  const home = await Home.findById(id);
  fs.unlink(home.Photo, (err) => {
    if (err) {
      console.error("Error deleting old photo:", err);
    }
  });
  await Home.findByIdAndDelete(id);
  userId.hostedHomes = userId.hostedHomes.filter(home => home.toString() !== id);
  await userId.save();
    res.redirect('/host/hostedHomes');

}
exports.deleteHostedHome = deleteHostedHome;
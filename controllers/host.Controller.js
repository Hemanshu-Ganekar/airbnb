
const Home = require("../model/home");
const hostHomes = require("../model/hostHomes");
 const PostHome=(req, res, next) => {
  const {houseName,pricePerNight,location,Rating,Photo}=req.body;
   const id= Date.now().toString()+houseName[0];  
  const home = new Home(houseName,pricePerNight,location,Rating,Photo,id)

  home.save();
  res.render('host/homeAdded');
}
const getHome = (req, res, next) => {
  res.render('host/editHome',{edit:"false"});
}
exports.PostHome=PostHome;
exports.getHome=getHome;

const hostedHomes = (req, res, next) => {
  Home.fetchAll(registerHomes=>{
  res.render('host/hostedHomes',{registerHomes:registerHomes,currentPage:"hostedHomes"});
  
 })
}
exports.hostedHomes=hostedHomes;

const getEditHome=(req,res,next)=>{
   const id=req.params.id;
   Home.findById(id,(home)=>{
        res.render("host/editHome", { home: home, edit: "true" });
   })
}
exports.getEditHome=getEditHome;

const postEditHome=(req,res,next)=>{
const {houseName,pricePerNight,location,Rating,Photo,id} = req.body;
hostHomes.editHome(id,{houseName,pricePerNight,location,Rating,Photo},(update)=>{
  
  res.redirect('/host/hostedHomes');

})
}
exports.postEditHome=postEditHome;
 const deleteHostedHome = (req,res,next)=>{
 const id=req.body.id;
 hostHomes.deleteHostedHome(id,()=>{
  res.redirect('/host/hostedHomes');
 })
 }
 exports.deleteHostedHome=deleteHostedHome;
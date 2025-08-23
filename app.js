// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

//Local Module
const storeRouter = require("./routes/storeRouter")
const {hostRouter} = require("./routes/hostRouter")
const {authRouter} = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const notFound = require('./controllers/notFound');
const { default: mongoose, Mongoose } = require('mongoose');
const app = express();
const store=new MongoDBStore({
  uri:"mongodb+srv://hemanshuganekar:RoHeHeVi-111@kgcluster.tywknhp.mongodb.net/airbnb?retryWrites=true&w=majority&appName=KGCluster",
  collection:'session',
})
const storage = multer.diskStorage({
  destination : (req,file ,cd)=>{
    cd(null, 'uploads/');
  },
  filename : (req,file,cd)=>{
    cd(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
  }
});
app.set("view engine","ejs");
app.set('views','views');
app.use('/uploads',express.static(path.join(rootDir,"uploads")));
app.use('/host/uploads',express.static(path.join(rootDir,"uploads")));
app.use('/home/uploads',express.static(path.join(rootDir,"uploads")));

app.use(express.urlencoded());
app.use(multer({storage}).single('Photo'));

app.use(session({
 secret:'3.142 is the value of pi',
 resave:false,
 saveUninitialized:true,
 store:store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  isLoggedIn: false,
}));
app.use('/home', (req, res, next) => {
  if (req.session.user && req.session.user.userType === 'host' && req.session.isLoggedIn) {
    return res.redirect('/host/hostedHomes');
  }
  next();
});

app.use('/favourite', (req, res, next) => {
  if (req.session.user && req.session.user.userType === 'host' && req.session.isLoggedIn) {
    return res.redirect('/host/hostedHomes');
  }
  next();
});

app.use('/bookings', (req, res, next) => {
  if (req.session.user && req.session.user.userType === 'host' && req.session.isLoggedIn) {
    return res.redirect('/host/hostedHomes');
  }
  next();
});
app.use("/",[storeRouter]);
app.use("/host", (req,res,next)=>{
  if(!req.session.isLoggedIn){
   return res.redirect("/auth/login");
}
next();
});
app.use("/host", hostRouter);
app.use("/auth",authRouter);
app.use(express.static(path.join(rootDir,"public")));
app.use(notFound.notfound);

const PORT = 3000;
const DB_Path="mongodb+srv://hemanshuganekar:RoHeHeVi-111@kgcluster.tywknhp.mongodb.net/airbnb?retryWrites=true&w=majority&appName=KGCluster";
mongoose.connect(DB_Path).then(()=>{
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
}).catch((err)=>{
      console.log("Error while connecting the DB!!");
})
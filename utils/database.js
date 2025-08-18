const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL="mongodb+srv://hemanshuganekar:RoHeHeVi-111@kgcluster.tywknhp.mongodb.net/?retryWrites=true&w=majority&appName=KGCluster";
let _db;
const mongoConnect=(callback)=>{ 
    MongoClient.connect(MONGO_URL).then((client)=>{
    _db=client.db("airbnb");
    callback();
}).catch((error)=>{
    console.log("error while connecting to mongo ",error);
})}
const getDB=()=>{
    if(!_db){
        throw error;
    }
    return _db;
}
exports.getDB=getDB;
exports.mongoConnect=mongoConnect;
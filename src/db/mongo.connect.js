const mongoose = require("mongoose");
require("dotenv").config()
mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("mongo started");
  })
  .catch((err) => console.log(err.message));
mongoose.connection.on("connected", ()=>{
    console.log("connected to mongo db")
})

mongoose.connection.on("error", (err)=>{
    console.log(err.message)
})

mongoose.connection.on("disconnected", ()=>{
    console.log("db disconnected")
})

process.on("SIGINT", async ()=>{
    await mongoose.connection.close();
    process.exit(0);
})
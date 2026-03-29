const mongoose = require("mongoose");

async function connectDB() {

   await mongoose.connect("mongodb+srv://mohdkaif8672:ArWewnwpIVmyH7Yb@cluster0.opfmb.mongodb.net/notsey")
   console.log("Connected to db..")
    
}

module.exports = connectDB
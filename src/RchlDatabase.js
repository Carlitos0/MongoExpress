const mongoose = require("mongoose");

(async ()=>{
    try {
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/Bd_biblioteca_EcFinal");
        console.log(`App connected to ${db.connection.name}`);
    } catch (error) {
        console.log("Error message:",error)
    }
})();
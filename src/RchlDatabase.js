const mongoose = require("mongoose");

const {MONGODB_HOST,BIBLIOTECA_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${BIBLIOTECA_MONGODB_DATABASE}`;

(async ()=>{
    try {
        const db = await mongoose.connect(MONGODB_URI);
        console.log(`App connected to ${db.connection.name}`);
    } catch (error) {
        console.log("Error message:",error)
    }
})();
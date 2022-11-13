const mongoose = require("mongoose");

const {USER,PASSWORD,CLUSTER,DBNAME} = process.env;
const MONGODB_URI = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}/${DBNAME}?retryWrites=true&w=majority`;

(async ()=>{
    try {
        const db = await mongoose.connect(MONGODB_URI);
        console.log(`App connected to ${db.connection.name}`);
    } catch (error) {
        console.log("Error message:",error)
    }
})();
const {Schema,model} = require("mongoose");

const EditorialSchema = new Schema({
    codEditorial:{type:String,require:true},
    editorial:{type:String,require:true},
},{
    timestamps:true
});

module.exports = model("Editorial",EditorialSchema);


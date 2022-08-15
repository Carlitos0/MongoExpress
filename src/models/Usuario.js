const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    codUser: {type:String, require:true},
    login: {type:String, require:true},
    password: {type:String, require:true},  
},{
    timestamps: true
});

module.exports = model("Usuario",UserSchema);

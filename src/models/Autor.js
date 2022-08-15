const {Schema,model} =  require("mongoose");

const AutorSchema = new Schema({
    codAutor: {type:String,required:true},
    apellidos: {type:String,required:true},
    nombres: {type:String,required:true},
    pais: {type:String,required:true},
},{
    timestamps:true
});

module.exports = model("Autor",AutorSchema);
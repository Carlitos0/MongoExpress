const autorCtr = {};
const Autor = require("../models/Autor")

autorCtr.renderAllAutores  = async (req,res) => {
    const autores = await Autor.find().lean();
    res.render("autores/allAutores",{
        autores,
        success_msg:req.flash("success_msg"),
        error_msg:req.flash("error_msg"),
    });
}

autorCtr.renderAddAutores = (req,res) => {
    res.render("autores/addAutores",{
        success_msg:req.flash("success_msg"),
        error_msg:req.flash("error_msg")
    });
}

autorCtr.renderEditForm = async (req,res) =>{
    const autor = await Autor.findById(req.params.id).lean();
    res.render("autores/editAutor",{autor});
}

autorCtr.createAutor = async (req,res) => {
    const {codAutor,apellidos,nombres,pais} = req.body;
    const datosBody = Object.values(req.body)
    let ct = 0;
    for(let i = 0; i < datosBody.length ; i++){
        if(datosBody[i].trim() == ""){
            ct=1
        }
    }
    if(ct == 1){
        req.flash("error_msg","Los campos no deben estar vacíos");
        res.redirect("/autores/add");
    }else{
        const newAutor = new Autor({codAutor,apellidos,nombres,pais});
        await newAutor.save()
            .then(sv => {
                req.flash('success_msg', `Se añadio correctamente el registro de ${sv.nombres}`);
                res.redirect("/autores");
            })
            .catch(err => {
                req.flash('error_msg', "No se pudo añadir el registro");
                res.redirect("/autores");
            })
    }
} 

autorCtr.deleteAutor = async (req,res) => {
    const id = req.params.id;
    await Autor.findByIdAndDelete(id)
        .then(sv => {
            req.flash('success_msg', `Se elimino el registro de código ${sv.codAutor}`);
            res.redirect("/autores");
        })
        .catch(err => {
            req.flash('error_msg', "No se pudo eliminar el registro");
            res.redirect("/autores")
        })
}

autorCtr.updateAutor = async (req,res) => {
    const {codAutor,apellidos,nombres,pais} = req.body;
    const datosBody = Object.values(req.body)
    let ct = 0;
    for(let i = 0; i < datosBody.length ; i++){
        if(datosBody[i].trim() == ""){
            ct=1
        }
    }
    if(ct == 1){
        req.flash("error_msg","Error: Los campos a actualizar no deben estar vacíos");
        res.redirect("/autores");
    }else{
        await Autor.findByIdAndUpdate(req.params.id,{codAutor,apellidos,nombres,pais})
            .then(sv => {
                req.flash('success_msg', `Se actualizo el registro con codigo ${sv.codAutor}`)
                res.redirect("/autores");
            })
            .catch(err => {
                req.flash('error_msg', "No se pudo actualizar el registro");
                res.redirect("/autores")
            })
    }
}

module.exports = autorCtr;
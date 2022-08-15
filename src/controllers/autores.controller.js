const autorCtr = {};
const Autor = require("../models/Autor")

autorCtr.renderAllAutores  = async (req,res) => {
    const autores = await Autor.find().lean();
    res.render("autores/allAutores",{autores});
}

autorCtr.renderAddAutores = (req,res) => {
    res.render("autores/addAutores");
}

autorCtr.renderEditForm = async (req,res) =>{
    const autor = await Autor.findById(req.params.id).lean();
    res.render("autores/editAutor",{autor});
}

autorCtr.createAutor = async (req,res) => {
    const {codAutor,apellidos,nombres,pais} = req.body;
    const newAutor = new Autor({codAutor,apellidos,nombres,pais});
    await newAutor.save()
        /* .then(sv => console.log(`Se añadio el registro`))
        .catch(err => console.log(err)) */
    req.flash('success_msg', "Se añadio correctamente el registro");
    res.redirect("/autores");
} 

autorCtr.deleteAutor = async (req,res) => {
    const id = req.params.id;
    await Autor.findByIdAndDelete(id)
        /* .then(sv => console.log(`Se elimino el registro de Id ${id}`))
        .catch(err => console.log(err)) */
    req.flash('success_msg', "Se elimino el registro correctamente")
    res.redirect("/autores")
}

autorCtr.updateAutor = async (req,res) => {
    const {codAutor,apellidos,nombres,pais} = req.body;
    await Autor.findByIdAndUpdate(req.params.id,{codAutor,apellidos,nombres,pais})
        /* .then(sv => console.log(`Se actualizo el registro con codigo ${codAutor}`))
        .catch(err => console.log(err)) */
    req.flash('success_msg', "Se actualizó correctamente el Autor")
    res.redirect("/autores");
}

module.exports = autorCtr;
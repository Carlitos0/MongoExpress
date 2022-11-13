const editorialCtr = {};
const Editorial = require("../models/Editorial");
/* const {success_msg} = process.env; */

editorialCtr.renderAllEditorials  = async (req,res) =>{
    const editoriales = await Editorial.find().lean();
    res.render("editoriales/allEditorials",{
        editoriales,
        success_msg: req.flash("success_msg"),
        error_msg: req.flash("error_msg"),
    });
}

editorialCtr.renderAddEditorial = (req,res) => {
    res.render("editoriales/addEditorial",{
        error_msg: req.flash("error_msg")
    });
}

editorialCtr.renderEditForm = async (req,res) => {
    const editorial = await Editorial.findById(req.params.id).lean();
    res.render("editoriales/editEditorial",{editorial});
}

async function existeCodigoEdit(codEditorial){
    const existe = await Editorial.findOne({codEditorial:codEditorial});
    if(existe){
        return true
    }else{ 
        return false 
    }
}

editorialCtr.addEditorial = async (req,res) => {
    const {codEditorial,editorial} = req.body;
    const dataBody = Object.values(req.body);
    const existe = await existeCodigoEdit(codEditorial);
    let ct = 0;
    for(let i = 0; i < dataBody.length ; i++){
        if(dataBody[i].trim() == ""){
            ct = 1;
        }
    }
    if(existe){
        req.flash("error_msg",`El codigo ingresado ya existe  `)
    }
    if(ct == 1){
        req.flash("error_msg",`Los campos no deben estar vacíos`)
        res.redirect("/editoriales/add")
    }else{
        const newEditorial = new Editorial({codEditorial,editorial});
        await newEditorial.save()
            .then(sv => {
                req.flash("success_msg",`Se añadió correctamente la editorial ${sv.editorial}`)
                res.redirect("/editoriales");
            })
            .catch(err =>{
                req.flash("error_msg",`Hubo un error al agregar la editorial`);
                res.render("editoriales/allEditorials");
            })
    }
}

editorialCtr.updateEditorial = async (req,res) => {
    const {codEditorial,editorial} = req.body;
    const dataBody = Object.values(req.body);
    let ct = 0;
    for(let i = 0; i < dataBody.length ; i++){
        if(dataBody[i].trim() == ""){
            ct = 1;
        }
    }
    if(ct == 1){
        req.flash("error_msg","Error: Los campos a actualizar no deben estar vacíos");
        res.redirect("/editoriales");
    }else{
        await Editorial.findByIdAndUpdate(req.params.id,{codEditorial,editorial});
        req.flash("success_msg","Se actualizó correctamente");
        res.redirect("/editoriales");
    }
}

editorialCtr.deleteEditorial = async (req,res) => {
    const id = req.params.id;
    await Editorial.findByIdAndDelete(id)
        .then(sv => {
            req.flash("success_msg",`Se Elimino el registro ${sv.codEditorial} correctamente`);
            res.redirect("/editoriales");
        })
        .catch(err => {
            req.flash("error_msg",`Hubo un error al eliminar la editorial`);
            res.redirect("editoriales");
        })
}

module.exports = editorialCtr;
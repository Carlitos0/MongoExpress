const editorialCtr = {};
const Editorial = require("../models/Editorial");

editorialCtr.renderAllEditorials  = async (req,res) =>{
    const editoriales = await Editorial.find().lean();
    res.render("editoriales/allEditorials",{editoriales});
}

editorialCtr.renderAddEditorial = (req,res) => {
    res.render("editoriales/addEditorial");
}

editorialCtr.addEditorial = async (req,res) => {
    const {codEditorial,editorial} = req.body;
    const newEditorial = new Editorial({codEditorial,editorial});
    await newEditorial.save()
        .then(sv => console.log(`Se añadió correctamente la editorial ${editorial}`))
        .catch(err => console.log(`Error: ${err}`))
    res.redirect("/editoriales");
}

editorialCtr.renderEditForm = async (req,res) => {
    const editorial = await Editorial.findById(req.params.id).lean();
    res.render("editoriales/editEditorial",{editorial});
}

editorialCtr.updateEditorial = async (req,res) => {
    const {codEditorial,editorial} = req.body
    await Editorial.findByIdAndUpdate(req.params.id,{codEditorial,editorial});
    res.redirect("/editoriales");
}

editorialCtr.deleteEditorial = async (req,res) => {
    const id = req.params.id;
    await Editorial.findByIdAndDelete(id);
    res.redirect("/editoriales");
}

module.exports = editorialCtr;
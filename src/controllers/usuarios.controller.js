const userCtr = {};
const User = require("../models/Usuario");

userCtr.renderAllUsers = async (req,res) => {
    const usuarios = await User.find().lean();
    res.render("usuarios/allUsuarios",{
        usuarios,
        success_msg: req.flash("success_msg"),
        error_msg: req.flash("error_msg"),
    });
}

userCtr.renderEditForm = async (req,res) => {
    const user =  await User.findById(req.params.id).lean();
    res.render("usuarios/editUsuario",{user});
}

userCtr.addUser = async (req,res) => {
    const {codUser,login,password} = req.body;
    const dataBody = Object.values(req.body);
    let ct = 0;
    for(i=0; i < dataBody.length ; i++){
        if(dataBody[i].trim() == ""){
            ct = 1;
        }
    }
    if(ct == 1){
        req.flash("error_msg",`Los campos no deben estar vacíos`)
        res.redirect("/usuarios");
    }else{
        const newUser = new User({codUser,login,password});
        await newUser.save();
        req.flash("success_msg",`Se añadio el nuevo usuario`)
        res.redirect("/usuarios");    
    }
}


userCtr.updateUser = async (req,res) => {
    const {codUser,login,password} = req.body;
    const dataBody = Object.values(req.body);
    let ct = 0;
    for(i=0; i < dataBody.length ; i++){
        if(dataBody[i].trim() == ""){
            ct = 1;
        }
    }
    if(ct == 1){
        req.flash("error_msg",`Error al Actualizar: Los campos no deben estar vacíos`)
        res.redirect("/usuarios");
    }else{
        await User.findByIdAndUpdate(req.params.id,{codUser,login,password})
            .then(sv => req.flash("success_msg",`Se actualizó correctamente el usuario ${sv.login}`))
        res.redirect("/usuarios");
    }
}

userCtr.deleteUser = async (req,res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id)
        .then(sv => {
            req.flash("success_msg",`Registro eliminado correctamente`)
            res.redirect("/usuarios");
        })
        .catch(err => {
            req.flash("error_msg",`No se pudo eliminar el registro`)
            res.redirect("/usuarios");
        })
}

module.exports = userCtr;
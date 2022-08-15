const userCtr = {};
const User = require("../models/Usuario");

userCtr.renderAllUsers = async (req,res) => {
    const usuarios = await User.find().lean();
    res.render("usuarios/allUsuarios",{usuarios});
}

userCtr.addUser = async (req,res) => {
    const {codUser,login,password} = req.body;
    const newUser = new User({codUser,login,password});
    await newUser.save();
    res.redirect("/usuarios");
}

userCtr.renderEditForm = async (req,res) => {
    const user =  await User.findById(req.params.id).lean();
    res.render("usuarios/editUsuario",{user});
}

userCtr.updateUser = async (req,res) => {
    const {codUser,login,password} = req.body;
    await User.findByIdAndUpdate(req.params.id,{codUser,login,password});
    res.redirect("/usuarios");
}

userCtr.deleteUser = async (req,res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.redirect("/usuarios");
}

module.exports = userCtr;
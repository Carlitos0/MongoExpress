const indexCtr = {};
const User = require("../models/Usuario");

indexCtr.InicialPage = (req,res) =>{
    res.render("index");
}

indexCtr.renderRegister = (req,res) => {
    res.render("usuarios/register");
}

indexCtr.signup = async (req,res) => {
    const errors =[];
    /* const {login,password} = req.body */
    const body = req.body;
    const user = await User.findOne({login:body.login});
    const pwd = user?user.password:"";
    const pwdVerification = body.password == pwd?true:false;
    /* console.log(user)
    console.log(pwdVerification); */
    if(user && pwdVerification){
        req.flash("success_msg","Validacion Correcta: Ingreso satisfactorio")
        res.redirect("/autores");
    }
    else{
        errors.push({text: "Credenciales incorrectas"});
        res.render("index",{
            errors
        })
    }
    /* console.log(user[0].login.includes(login))
    console.log(user.includes(login)); */
    /* for(let i = 0; i < user.length ; i++){
        if(user[i].login.includes(login) && user[i].password.includes(password)){
            res.redirect("/autores")
            break
        }else{
            if(login != user[i].login || password != user[i].password){
                errors.push({text: "Credenciales incorrectas"});
            }
        }
    } */
    /* if(errors.length > 0){
        res.render("index",{
            errors
        })
    } */
}

indexCtr.ValidateSingin = async (req,res) =>{
    const errors = [];
    const success = [];
    const {codUser,login,password} = req.body;
    const user = await User.find({}).lean();
    for(let i = 0; i< user.length ; i++){
        if(codUser == user[i].codUser){
            errors.push({text: "Este codigo de usuario está en uso"})
        }
        if(login == user[i].login){
            errors.push({text: "Este nombre usuario está en uso"})    
        }
    }
    if(password.length < 5){
        errors.push({text: "La contraseña debe tener como mínimo 5 caracteres o ya está en uso"})
    } 
    if(errors.length > 0){
        res.render("usuarios/register",{
            errors,
            login,
            codUser,
            password
        });
    }
    else{
        const newUser = new User({codUser,login,password});
        await newUser.save();
        success.push({text:"Cuenta creada satisfactoriamente"})
        res.render("index",{
            success
        });
    }
}

module.exports = indexCtr;

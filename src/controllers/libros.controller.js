const librosCrt = {};
const Autor = require("../models/Autor");
const Editorial = require("../models/Editorial");
const Libro = require("../models/Libro");

librosCrt.allLibros = async (req,res) => {
    const libros = await Libro.find().populate("editorial").populate("autor").lean();
    res.render("libros/allLibros",{
        libros,
        success_msg: req.flash("success_msg"),
        error_msg: req.flash("error_msg"),
    });
}
/* ----------------FUCTIONS---------------- */
async function idAutor(codAutor) {
    const auth = await Autor.findOne({codAutor});
    return auth;
}
async function IdEditorial(codEditorial) {
    const editorial = await Editorial.findOne({codEditorial});
    return editorial;
}
/* ---------------------------------------- */
librosCrt.autorId = async (req,res) => {
    const id = req.params.id;
    const autor = await Autor.findById(id);
    const autorid = await idAutor('00001');
    console.log(autorid.id);
    res.send(autor);
}
/* ---------------------------------------- */
librosCrt.renderLibroForm = async (req,res) => {
    const libros = await Libro.find().populate('editorial').populate('autor').lean();
    const editorial = await Editorial.find().lean();
    const autores = await Autor.find().lean();
    res.render("libros/addLibros",{
        libros,
        editorial,
        autores,
        error_msg: req.flash("error_msg"),
    })
}

librosCrt.addLibro = async (req,res) => {
    const {codLibro,titulo,editorial,autor} = req.body;
    const dataBody = Object.values(req.body);
    let ct = 0;
    for(i=0; i < dataBody.length ; i++){
        if(dataBody[i].trim() == ""){
            ct = 1;
        }
    }
    if(ct == 1){
        req.flash("error_msg","Hay campos sin completar o estan vacíos")
        res.redirect("/libros/add");
    }else{
        let editorial_id = await IdEditorial(editorial);
        let autor_id = await  idAutor(autor);
        const newLibro =  new Libro({codLibro,titulo,editorial:editorial_id.id,autor:autor_id.id})
        await newLibro.save()
            .then(rs => {
                req.flash("success_msg",`Se añadio correctamente el libro ${rs.titulo}`)
                res.redirect("/libros");
            })
            .catch(err => {
                req.flash("error_msg","No se pudo añadir el libro")
                res.redirect("/libros");
            })
    }
}

librosCrt.renderEditForm = async (req,res) => {
    const libro = await Libro.findById(req.params.id).populate('editorial').populate('autor').lean();
    const editorial = await Editorial.find().lean();
    const autores = await Autor.find().lean().lean();
    res.render("libros/editLibros",{libro,editorial,autores,error_msg: req.flash("error_msg"),});
}

librosCrt.updateLibro = async (req,res) => {
    const id = req.params.id;
    const {codLibro,titulo,editorial,autor} = req.body;
    const dataBody = Object.values(req.body);
    let ct = 0;
    for(i=0; i < dataBody.length ; i++){
        if(dataBody[i].trim() == ""){
            ct = 1
        }
    }
    if(ct == 1){
        req.flash("error_msg",`Error al Actualizar libro: No puede haber campos vacíos`)
        res.redirect("/libros");
    }else{
        let newEditorial = await IdEditorial(editorial);
        let newAutor = await idAutor(autor);
        await Libro.findByIdAndUpdate(id,{codLibro,titulo,editorial:newEditorial.id,autor:newAutor.id})
            .then(sv => {
                req.flash("success_msg",`Se eliminó correctamente el libro ${sv.titulo}`)
                res.redirect("/libros");
            })
            .catch(err => {
                req.flash("error_msg",`No se pudo actualizar el registro`)
                res.redirect("/libros");
            })
    }
}

librosCrt.deleteLibro = async (req,res) => {
    const id = req.params.id;
    await Libro.findByIdAndDelete(id)
        .then(sv => {
            req.flash("success_msg",`Se eliminó correctamente el libro ${sv.titulo}`)
            res.redirect("/libros");
        })
        .catch(err => {
            req.flash("error_msg",`No se pudo eliminar el libro`)
            res.redirect("/libros");
        })
}


module.exports = librosCrt;

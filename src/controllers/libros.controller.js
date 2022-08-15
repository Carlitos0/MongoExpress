const librosCrt = {};
const Autor = require("../models/Autor");
const Editorial = require("../models/Editorial");
const Libro = require("../models/Libro");

librosCrt.allLibros = async (req,res) => {
    const libros = await Libro.find().populate("editorial").populate("autor").lean();
    res.render("libros/allLibros",{libros});
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

librosCrt.renderAutorForm = async (req,res) => {
    const libros = await Libro.find().populate('editorial').populate('autor').lean();
    const editorial = await Editorial.find().lean();
    const autores = await Autor.find().lean();
    res.render("libros/addLibros",{libros,editorial,autores})
}

librosCrt.addLibro = async (req,res) => {
    const {codLibro,titulo,editorial,autor} = req.body;
    let editorial_id = await IdEditorial(editorial);
    let autor_id = await  idAutor(autor);
    const newLibro =  new Libro({codLibro,titulo,editorial:editorial_id.id,autor:autor_id.id})
    await newLibro.save()
        .then(rs => console.log(`Se añadio correctament ${rs}`))
        .catch(err => console.log(err))
    res.redirect("/libros");
}

librosCrt.renderEditForm = async (req,res) => {
    const libro = await Libro.findById(req.params.id).populate('editorial').populate('autor').lean();
    const editorial = await Editorial.find().lean();
    const autores = await Autor.find().lean().lean();
    res.render("libros/editLibros",{libro,editorial,autores});
}

librosCrt.updateLibro = async (req,res) => {
    const id = req.params.id;
    const {codLibro,titulo,editorial,autor} = req.body;
    let newEditorial = await IdEditorial(editorial);
    let newAutor = await idAutor(autor);
    /* console.log(newEditorial.id,newAutor.id); */
    await Libro.findByIdAndUpdate(id,{codLibro,titulo,editorial:newEditorial.id,autor:newAutor.id});
    res.redirect("/libros");
}

librosCrt.deleteLibro = async (req,res) => {
    const id = req.params.id;
    await Libro.findByIdAndDelete(id);
    res.redirect("/libros");
}


module.exports = librosCrt;

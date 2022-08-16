const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodovr = require("method-override");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
// Initialization
const app = express();

//Configuraciones
app.set("port", process.env.PORT || 5000);
app.set("views",path.join(__dirname,"views"));
app.engine(".hbs",exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"),"layouts"),
    partialsDir: path.join(app.get("views"),"partials"),
    extname: ".hbs",

}));
app.set("view engine", ".hbs");


// Configurando Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(methodovr("_method"));
app.use(cookieParser("SecretStringForCookies"));
app.use(session({
    secret: "SecretStringForCookies",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized : true
}));
app.use(flash());

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/autor.routes"));
app.use(require("./routes/editorial.routes"));
app.use(require("./routes/usuario.routes"));
app.use(require("./routes/libro.routes"));


// Varibales Globales
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Archivos Estativos
app.use(express.static(path.join(__dirname,"public")));

module.exports = app;


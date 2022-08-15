const app = require("./RchlServer");
require("./RchlDatabase");


app.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`)
})



const { Schema, model } = require("mongoose");

const LibroSchema = new Schema({
  codLibro: { type: String, require: true },
  titulo: { type: String, require: true },
  editorial: {
    type: Schema.Types.ObjectId,
    ref: 'Editorial' ,
    require: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'Autor',
    require: true,
  },
});

module.exports = model("Libro",LibroSchema);

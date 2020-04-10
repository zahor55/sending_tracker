const mongoose	= require('mongoose');
const doc	= require('./docs.js').schema;
const schema   	= {
	 nameOfWord: { type: String, required:true,unique:true },
	 docFile: [doc],
}
const word_schema = new mongoose.Schema(schema)
const words 	=	mongoose.model('shows',word_schema)
module.exports 	= words;
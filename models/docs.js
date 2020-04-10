const mongoose	= require('mongoose');
const schema   	= {
	 name: { type: String, required:true },	
	 desc: {type:String},					
	 id: { type:Number,required:true,unique: true },
}
const doc_schema = new mongoose.Schema(schema)
const docs 	=mongoose.model('docs',doc_schema)
module.exports 	= docs;
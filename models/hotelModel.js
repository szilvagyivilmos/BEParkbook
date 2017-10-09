var mongoose=require('mongoose'),
    Schema= mongoose.Schema
var hotelModel = new Schema({
    name:{
        type: String
    },
    country: {type: String},
    full: {type:Boolean, default:false},
    stars:{type: Number}
})

module.exports=mongoose.model('Hotel',hotelModel)



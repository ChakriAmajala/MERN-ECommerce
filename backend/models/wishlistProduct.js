
const mongoose = require('mongoose')

const addToWishlist = mongoose.Schema({
   productId : {
        ref : 'product',
        type : String,
   },
   quantity : Number,
   userId : String,
},{
    timestamps : true
})


const addToWishlistModel = mongoose.model("addToWishlist",addToWishlist)

module.exports = addToWishlistModel

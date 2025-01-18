

const addToWishlistModel = require("../../models/wishlistProduct")

const addToWishlistController = async(req,res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductInWishlist = await addToWishlistModel.findOne({ productId : productId, userId : currentUser })

        console.log("isProductInWishlist   ",isProductInWishlist)

        if(isProductInWishlist){
            return res.json({
                message : "Already exits in Add to wishlist",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToWishlist = new addToWishlistModel(payload)
        const saveProduct = await newAddToWishlist.save()


        return res.json({
            data : saveProduct,
            message : "Product Added in wishlist",
            success : true,
            error : false
        })
        

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = addToWishlistController
